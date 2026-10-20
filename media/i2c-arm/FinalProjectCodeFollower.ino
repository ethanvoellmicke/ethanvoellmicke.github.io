#include <math.h>
#include <Wire.h>


// ================= MODE FLAGS FROM LEADER =================
volatile bool manualControl = false;
volatile bool autoSweep = false;
volatile bool stabilize = false;
volatile bool zero = false;


// ================= HARDWARE =================
const int encA = 6;
const int encB = 15;
const int inMotorA = 2;
const int inMotorB = 3;
const int enMotor  = 17;
const int potPin   = 14;


// ================= CONTROL =================
const int gearRatio   = 50;
const int pulsePerRev = 14;


volatile int count = 0;
unsigned long counter = 0;


float pos = 0.0;
float ref = 0;
int command = 0;


const float K_P = 3;
const float DEAD_BAND = 0.8;


// ================= SWEEP STATE =================
float sweepRef = 0;
bool sweepUp = true;
unsigned long lastSweepUpdate = 0;


// ================= I2C CALLBACKS =================
void requestEvent() {
  long posSend = count;
  Wire.write((byte*)&posSend, sizeof(long));
}


void receiveMode(int bytesReceived) {
  if (bytesReceived >= 3) {
    manualControl = Wire.read() != 0;
    autoSweep     = Wire.read() != 0;
    stabilize     = Wire.read() != 0;
    zero = Wire.read() !=0;


    if (zero) {
      count = 0;
      ref = 0;
    }
  }
}


// ================= SETUP =================
void setup() {
  pinMode(encA, INPUT_PULLUP);
  pinMode(encB, INPUT_PULLUP);
  pinMode(enMotor, OUTPUT);
  pinMode(inMotorA, OUTPUT);
  pinMode(inMotorB, OUTPUT);
  pinMode(potPin, INPUT);


  attachInterrupt(digitalPinToInterrupt(encA), encoderACounter, RISING);
  attachInterrupt(digitalPinToInterrupt(encB), encoderBCounter, RISING);


  Serial.begin(9600);


  Wire.begin(8);
  Wire.onRequest(requestEvent);
  Wire.onReceive(receiveMode);
}


// ================= MAIN LOOP =================
void loop() {


  // ----- ENCODER → ANGLE -----
  count %= (gearRatio * pulsePerRev);
  pos = 360.0 * count / gearRatio / pulsePerRev;
  if (pos < 0.0) pos += 360.0;


  // ================= MODE LOGIC =================


  // ✅ MANUAL MODE
  if (manualControl) {
    int potVal = analogRead(potPin);
    ref = map(potVal, 0, 1023, 10, 270);
  }


  // ✅ SWEEP MODE (INLINE)
  else if (autoSweep) {


    if (millis() - lastSweepUpdate > 30) {
      if (sweepUp) sweepRef += 1;
      else         sweepRef -= 1;


      if (sweepRef >= 180) sweepUp = false;
      if (sweepRef <= 0)   sweepUp = true;


      lastSweepUpdate = millis();
    }


    ref = sweepRef;
  }


  // ✅ STABILIZE MODE (HUMAN STILL MOVES BOTTOM)
  else if (stabilize) {
    int potVal = analogRead(potPin);
    ref = map(potVal, 0, 1023, 10, 270);
  }


  // ================= CONTROL LAW =================


  float error = ref - pos;
  if (error > 180.0) error -= 360.0;
  if (error < -180.0) error += 360.0;


  if (fabs(error) < DEAD_BAND) {
    analogWrite(enMotor, 0);
    digitalWrite(inMotorA, LOW);
    digitalWrite(inMotorB, LOW);
    return;
  }


  command = K_P * error;


  if (command < 0) {
    command = -command;
    digitalWrite(inMotorA, HIGH);
    digitalWrite(inMotorB, LOW);
  } else {
    digitalWrite(inMotorA, LOW);
    digitalWrite(inMotorB, HIGH);
  }


  command = constrain(command, 0, 255);
  analogWrite(enMotor, command);


  // ================= DEBUG =================
  if (millis() - counter > 100) {
    Serial.print("ref: ");
    Serial.print(ref);
    Serial.print(" pos: ");
    Serial.print(pos);
    Serial.print(" mode: ");


    if (manualControl) Serial.println("MANUAL");
    else if (autoSweep) Serial.println("SWEEP");
    else if (stabilize) Serial.println("STABILIZE");


    counter = millis();
  }
}


// ================= ENCODER ISRs =================
void encoderACounter() {
  if (digitalRead(encB) == HIGH) count++;
  else                           count--;
}


void encoderBCounter() {
  if (digitalRead(encA) == HIGH) count--;
  else                           count++;
}