#include <math.h>
#include <Wire.h>
//booleans to signify which mode
volatile bool man = false;
volatile bool autoS = false;
volatile bool stab = false;
volatile bool zero = false;

volatile int count = 0;     // if the interrupt will change this value, it must be volatile
unsigned long counter = 0;  // timer to generate reference
//pin numbers and constant values
const int encA = 6;
const int encB = 15;
const int inMotorA = 2;
const int inMotorB = 3;
const int enMotor = 17;
const int potPin = 14;  // potentiometer pin
const int gearRatio = 50;
const int pulsePerRev = 14;
//floats for position reference
float err;

float pos = 0.0;
float ref = 0;
int command = 0;
const float K_P = 3.25;

const float DEAD_BAND = 0.5;  // deadband range (degrees), stops motor if motor is within this much to reference

//SWEEP
float sweepRef = 0;
bool sweepUp = true;
unsigned long lastSweepUpdate = 0;

void setup() {  // sets up pins
  pinMode(encA, INPUT_PULLUP);
  pinMode(encB, INPUT_PULLUP);
  pinMode(enMotor, OUTPUT);
  pinMode(inMotorA, OUTPUT);
  pinMode(inMotorB, OUTPUT);
  pinMode(potPin, INPUT);
  //interrupts
  attachInterrupt(digitalPinToInterrupt(encA), encoderACounter, RISING);
  attachInterrupt(digitalPinToInterrupt(encB), encoderBCounter, RISING);

  Serial.begin(9600);

  Wire.begin();
  Wire.setClock(10000);
}

// MAIN LOOP
void loop() {

  // ALWAYS check for Serial text commands to change mode
  handleSerialModeCommand();

  // MANUAL CONTROL MODE
  if (man) {
    manual();
  }

  // AUTO SWEEP
  else if (autoS) {
    autoSweep();
  }

  //STABILIZE
  else if (stab) {
    stabilize();
  }  // end loop

  //logging data to debug
  static unsigned long lastLog = 0;
  if (millis() - lastLog > 500) {
    lastLog = millis();
    Serial.print(millis() / 1000);
    Serial.print(',');
    Serial.print(ref);  // J2 reference, potentiometer
    Serial.print(',');
    Serial.print(pos);  // J2 position
    Serial.print(',');
    Serial.println(err);  // J2 tracking error
  }
}


//Motions

//MANUAL CONTROL
void manual() {
  // takes encoder and converts it to an angle
  count %= (gearRatio * pulsePerRev);  // count = count % 700
  pos = 360.0 * count / gearRatio / pulsePerRev;
  if (pos < 0.0) pos += 360.0;  // keeps pos positive, if pos = -5, pos is 355


  // creates a reference from potentiometer
  int potVal = analogRead(potPin);
  ref = map(potVal, 0, 1023, 1, 360);

  // Anti-wrap
  float err = ref - pos;          // reference is the potentiometer location, pos is the position of the motor
  if (err > 180.0) err -= 360.0;  //takes shortest path to target, if motor is 350 degrees and needs to go to 10, should add 20 degrees, not take long path
  if (err < -180.0) err += 360.0;


  // Deadband
  if (fabs(err) < DEAD_BAND) {  // checks if motor is within a certain length to reference, can be anything like 1 degree or half a degree
    analogWrite(enMotor, 0);
    digitalWrite(inMotorA, LOW);
    digitalWrite(inMotorB, LOW);
    command = 0;  // if within deadband, no action for motor
  } else {
    // Proportional control
    command = K_P * err;  // amplitude times difference
    if (command < 0) {
      command *= -1;                 // command = command * -1
      digitalWrite(inMotorA, HIGH);  //rotates direction A
      digitalWrite(inMotorB, LOW);
    } else {
      digitalWrite(inMotorA, LOW);  // rotates direction B
      digitalWrite(inMotorB, HIGH);
    }
    command = constrain(command, 0, 255);  // limits PWM to 255
    analogWrite(enMotor, command);
  }
  // Follower reading
  long followerPos = 0;
  Wire.requestFrom(8, sizeof(long));  // this bit takes follower pos of motor via I2C
  if (Wire.available() == sizeof(long)) {
    Wire.readBytes((char*)&followerPos, sizeof(long));
    //Serial.print("Follower Position: ");
    //Serial.println(followerPos);// can uncomment to see follower position
  }
}

//SWEEPING CODE
void autoSweep() {
  //updates sweep every 30ms
  if (millis() - lastSweepUpdate > 30) {
    if (sweepUp) sweepRef += 1;  // if sweeping up, add 1
    else sweepRef -= 1;          // else subtract 1

    if (sweepRef >= 180) sweepUp = false;  // stops sweep up once hits 180, sweeps other way
    if (sweepRef <= 0) sweepUp = true;     // stops sweeping other way to sweep up

    lastSweepUpdate = millis();  // time update
  }

  ref = sweepRef;  // sets ref as whatever sweep is

  // takes encoder and converts it to an angle
  count %= (gearRatio * pulsePerRev);  // count = count % 700
  pos = 360.0 * count / gearRatio / pulsePerRev;
  if (pos < 0.0) pos += 360.0;  // keeps pos positive, if pos = -5, pos is 355

  // Anti-wrap
  float err = ref - pos;          // reference is the potentiometer location, pos is the position of the motor
  if (err > 180.0) err -= 360.0;  //takes shortest path to target, if motor is 350 degrees and needs to go to 10, should add 20 degrees, not take long path
  if (err < -180.0) err += 360.0;


  // Deadband
  if (fabs(err) < DEAD_BAND) {  // checks if motor is within a certain length to reference, can be anything like 1 degree or half a degree
    analogWrite(enMotor, 0);
    digitalWrite(inMotorA, LOW);
    digitalWrite(inMotorB, LOW);
    return;
  }

  command = K_P * err;// amplitude times difference

  if (command < 0) {// sets motor direction based on command sign
    command = -command;
    digitalWrite(inMotorA, HIGH);
    digitalWrite(inMotorB, LOW);
  } else {
    digitalWrite(inMotorA, LOW);
    digitalWrite(inMotorB, HIGH);
  }

  command = constrain(command, 0, 255);// limits PWM to 255
  analogWrite(enMotor, command);
}


//STABILIZE MODE - stabilize uses followers pot since it is bottom arm
void stabilize() {

  long followerCount = 0;

  Wire.requestFrom(8, sizeof(long));// requests follower count from other arduino
  if (Wire.available() == sizeof(long)) {
    Wire.readBytes((char*)&followerCount, sizeof(long));
  }

  float theta1 = 360.0 * followerCount / gearRatio / pulsePerRev;// converts follower count to theta for reference
  if (theta1 < 0.0) theta1 += 360.0;// keeps theta positive, if -20 degrees, makes it 340



  //conversion for stabilize is based on this eqn: theta2 = -asin((L1/L2) * sin(theta1))
  float theta1_rad = theta1 * DEG_TO_RAD;// converts from degrees to radian
  float inside = (2.5 * sin(theta1_rad)) / 1.7;//L1 is 2.5 and L2 is 1.7
  inside = constrain(inside, -1.0, 1.0);// need to set inside to set a constraint
  float theta2_rad = -asin(inside);// arcsin has a range of -1 - 1, meaning only values between those are valid for math
  ref = theta2_rad * RAD_TO_DEG;// sets reference based on follower arm

  // takes encoder and converts it to an angle
  count %= (gearRatio * pulsePerRev);  // count = count % 700
  pos = 360.0 * count / gearRatio / pulsePerRev;
  if (pos < 0.0) pos += 360.0;  // keeps pos positive, if pos = -5, pos is 355

  // Anti-wrap
  float err = ref - pos;          // reference is the potentiometer location, pos is the position of the motor
  if (err > 180.0) err -= 360.0;  //takes shortest path to target, if motor is 350 degrees and needs to go to 10, should add 20 degrees, not take long path
  if (err < -180.0) err += 360.0;

  // Deadband
  if (fabs(err) < DEAD_BAND) {  // checks if motor is within a certain length to reference, can be anything like 1 degree or half a degree
    stopMotor();// used stopMotor here, does the same as other deadband codes above, should change for formality?
    return;
  }

  command = K_P * err;// amplitude times difference between motor and reference

  if (command < 0) {// sets motor direction based on command sign
    command = -command;
    digitalWrite(inMotorA, HIGH);
    digitalWrite(inMotorB, LOW);
  } else {
    digitalWrite(inMotorA, LOW);
    digitalWrite(inMotorB, HIGH);
  }
  command = constrain(command, 0, 255);// sets PWM max
  analogWrite(enMotor, command);
}


//ISRs , stores count when motor turns
void encoderACounter() {
  if (digitalRead(encB) == HIGH)
    count++;
  else
    count--;
}
void encoderBCounter() {
  if (digitalRead(encA) == HIGH)
    count--;
  else
    count++;
}

// SERIAL INPUT, checks serial for char input, sets booleans for certain inputs
void handleSerialModeCommand() {
  if (Serial.available() > 0) {
    char c = Serial.read();
    if (c == 'm' || c == 'M') {// manual control mode
      man = true;
      autoS = false;
      stab = false;
      sendMode();
      Serial.println("Mode set to MANUAL CONTROL");
    } else if (c == 'a' || c == 'A') {// auto sweep mode
      man = false;
      autoS = true;
      stab = false;
      sendMode();
      Serial.println("Mode set to AUTO SWEEP");
    } else if (c == 's' || c == 'S') {// stabilize mode
      man = false;
      autoS = false;
      stab = true;
      sendMode();
      Serial.println("Mode set to STABILIZE");
    } else if (c == 'x' || c == 'X') {// stop mode
      Serial.println("Mode commands:");
      Serial.println("  m = manual control");
      Serial.println("  a = auto sweep");
      Serial.println("  s = stabilize");
      stopMotor();
      man = false;
      autoS = false;
      stab = false;
      zero = true;
      sendMode();
      zero = false;
    }
  }
}

// STOP MOTOR
void stopMotor() {
  analogWrite(enMotor, 0);
  digitalWrite(inMotorA, LOW);
  digitalWrite(inMotorB, LOW);
}

// SEND MODES
void sendMode() {
  Wire.beginTransmission(8);
  Wire.write((byte)man);
  Wire.write((byte)autoS);
  Wire.write((byte)stab);
  Wire.write((byte)zero);
  Wire.endTransmission();
}
