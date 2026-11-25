
/*******************************************************************************
 * Pendulum balancing: Serial Monitor gain-tuning copy
 * Based on the provided PendulumBalancing_ControlFramework.ino.
 * Arduino Uno + SimpleFOC Shield. No swing-up.
 *
 * Serial Monitor: 115200 baud; Newline
 *
 * Commands:
 *   P 1.0     Set pendulum angle gain Kp
 *   D 0.2     Set pendulum velocity gain Kd
 *   M -0.5    Set motor position gain
 *   V -0.1    Set motor velocity gain
 *   L 1.0     Set voltage limit (0 to 2 V)
 *   C         Capture current motor center (disarmed)
 *   A         ARM within 10 degrees of upright
 *   X         DISARM / zero voltage
 *   S         Show current values
 *   Q         Toggle telemetry
 *   H         Help
 *
 * Starts disarmed.
 * FOC alignment may move the motor during startup.
 ******************************************************************************/

#include <SimpleFOC.h>
#include <Wire.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

// -----------------------------------------------------------------------------
// Hardware setup
// -----------------------------------------------------------------------------

BLDCMotor motor = BLDCMotor(7);
BLDCDriver3PWM driver = BLDCDriver3PWM(5, 9, 6, 8);
MagneticSensorI2C encoder = MagneticSensorI2C(AS5600_I2C);

const int pendulumPin = A0;

// -----------------------------------------------------------------------------
// Pendulum calibration
// -----------------------------------------------------------------------------

const int down_adc = 243;
int up_adc = 0;

const float adc_to_radians = _PI / 512.0f;

const float balance_angle_limit = 20.0f * DEG_TO_RAD;
const float arm_angle_limit = 10.0f * DEG_TO_RAD;

// -----------------------------------------------------------------------------
// Controller gains
// -----------------------------------------------------------------------------

float Kp = 0.0f;
float Kd = 0.0f;

float K_motor_pos = 0.0f;
float K_motor_vel = 0.0f;

// -----------------------------------------------------------------------------
// Voltage limits
// -----------------------------------------------------------------------------

const float control_voltage_ceiling = 5.0f;
float control_voltage_limit = 5.0f;

// -----------------------------------------------------------------------------
// Velocity filters
// -----------------------------------------------------------------------------

float pvel_f = 0.0f;
float mvel_f = 0.0f;

const float pvel_alpha = 0.10f;
const float mvel_alpha = 0.15f;

// -----------------------------------------------------------------------------
// Global control state
// -----------------------------------------------------------------------------

unsigned long last_control_time = 0;
unsigned long last_telemetry_time = 0;

float last_pendulum_angle = 0.0f;
float target_motor_angle = 0.0f;

float pendulum_angle = 0.0f;
float motor_pos_error = 0.0f;
float target_voltage = 0.0f;

bool armed = false;
bool telemetry = false;

// Serial command buffer
char command_buf[26];
uint8_t command_len = 0;

// -----------------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------------

int wrap10bit(int x) {
  while (x < 0) x += 1024;
  while (x > 1023) x -= 1024;
  return x;
}

int adcDiffSigned(int a, int b) {
  int d = a - b;
  if (d > 512) d -= 1024;
  if (d < -512) d += 1024;
  return d;
}

// -----------------------------------------------------------------------------
// Controller
// -----------------------------------------------------------------------------

float controller(float p_angle, float p_vel,
                 float m_pos_err, float m_vel,
                 float dt) {

  (void)dt;

  const float m_pos_deadband = 0.03f;
  const float output_deadband_voltage = 0.10f;

  const float hold_angle_th = 0.6f * DEG_TO_RAD;
  const float hold_pvel_th = 0.20f;
  const float hold_mvel_th = 0.35f;

  // Motor position deadband
  if (fabs(m_pos_err) < m_pos_deadband) {
    m_pos_err = 0.0f;
  }

  // Four-state feedback controller
  float u = Kp * p_angle
          + Kd * p_vel
          + K_motor_pos * m_pos_err
          + K_motor_vel * m_vel;

  // Quiet hold near upright
  if (fabs(p_angle) < hold_angle_th &&
      fabs(p_vel) < hold_pvel_th &&
      fabs(m_vel) < hold_mvel_th) {
    u = 0.0f;
  }

  // Output deadband
  if (fabs(u) < output_deadband_voltage) {
    u = 0.0f;
  }

  // Voltage clamp
  if (u > control_voltage_limit) {
    u = control_voltage_limit;
  }

  if (u < -control_voltage_limit) {
    u = -control_voltage_limit;
  }

  return u;
}

// -----------------------------------------------------------------------------
// Serial help
// -----------------------------------------------------------------------------

void printHelp() {
  Serial.println(F("P n, D n, M n, V n : set four gains"));
  Serial.println(F("L n : voltage cap 0..2 V"));
  Serial.println(F("A : ARM near upright; X : STOP"));
  Serial.println(F("C : set motor center while stopped"));
  Serial.println(F("S : status; Q : telemetry; H : help"));
}

// -----------------------------------------------------------------------------
// Print status
// -----------------------------------------------------------------------------

void printStatus() {
  Serial.print(F("Armed="));
  Serial.print(armed ? 1 : 0);

  Serial.print(F(" Kp="));
  Serial.print(Kp, 3);

  Serial.print(F(" Kd="));
  Serial.print(Kd, 3);

  Serial.print(F(" KmP="));
  Serial.print(K_motor_pos, 3);

  Serial.print(F(" KmV="));
  Serial.print(K_motor_vel, 3);

  Serial.print(F(" limit="));
  Serial.print(control_voltage_limit, 2);
  Serial.println(F("V"));

  Serial.print(F("Pend angle deg="));
  Serial.print(pendulum_angle * RAD_TO_DEG, 2);

  Serial.print(F(" motor err rad="));
  Serial.print(motor_pos_error, 2);

  Serial.print(F(" motor vel="));
  Serial.print(mvel_f, 2);

  Serial.print(F(" output V="));
  Serial.println(target_voltage, 2);
}

// -----------------------------------------------------------------------------
// Process Serial Monitor commands
// -----------------------------------------------------------------------------

void processCommand(char *line) {

  while (*line == ' ' || *line == '\t') {
    ++line;
  }

  if (*line == 0) return;

  char op = *line++;

  if (op >= 'a' && op <= 'z') {
    op = op - 'a' + 'A';
  }

  while (*line == ' ' || *line == '\t') {
    ++line;
  }

  // Stop
  if (op == 'X') {
    armed = false;
    target_voltage = 0.0f;
    motor.move(0.0f);

    Serial.println(F("DISARMED"));
    return;
  }

  // Arm
  if (op == 'A') {

    if (fabs(pendulum_angle) > arm_angle_limit) {
      Serial.println(F("NOT ARMED: pendulum must be within 10 deg upright"));
    }
    else if (Kp == 0 && Kd == 0 &&
             K_motor_pos == 0 && K_motor_vel == 0) {
      Serial.println(F("NOT ARMED: all gains zero"));
    }
    else {
      armed = true;
      Serial.println(F("ARMED: keep clear; X to stop"));
    }

    return;
  }

  // Capture motor center
  if (op == 'C') {

    if (armed) {
      Serial.println(F("DISARM FIRST (X)"));
    }
    else {
      target_motor_angle = motor.shaft_angle;

      Serial.print(F("Center captured = "));
      Serial.println(target_motor_angle, 3);
    }

    return;
  }

  if (op == 'S') {
    printStatus();
    return;
  }

  if (op == 'H' || op == '?') {
    printHelp();
    return;
  }

  if (op == 'Q') {
    telemetry = !telemetry;

    Serial.println(
      telemetry ? F("Telemetry ON (4 Hz)") :
                  F("Telemetry OFF")
    );

    return;
  }

  // Gain and voltage commands
  if (op != 'P' && op != 'D' &&
      op != 'M' && op != 'V' && op != 'L') {

    Serial.println(F("Unknown command; H for help"));
    return;
  }

  if (armed) {
    Serial.println(F("DISARM (X) before changing gains/limit"));
    return;
  }

  if (*line == 0) {
    Serial.println(F("Missing number"));
    return;
  }

  char *endptr;
  double parsed = strtod(line, &endptr);

  while (*endptr == ' ' || *endptr == '\t') {
    ++endptr;
  }

  if (endptr == line || *endptr != 0 ||
      !isfinite(parsed) || fabs(parsed) > 1000.0) {

    Serial.println(F("Invalid number"));
    return;
  }

  float value = (float)parsed;

  switch (op) {

    case 'P':
      Kp = value;
      break;

    case 'D':
      Kd = value;
      break;

    case 'M':
      K_motor_pos = value;
      break;

    case 'V':
      K_motor_vel = value;
      break;

    case 'L':
      if (value < 0.0f ||
          value > control_voltage_ceiling) {

        Serial.println(F("Limit must be 0..2 V"));
        return;
      }

      control_voltage_limit = value;
      break;
  }

  Serial.println(F("Updated (S for values)"));
}

// -----------------------------------------------------------------------------
// Read Serial Monitor
// -----------------------------------------------------------------------------

void readSerial() {

  uint8_t processed = 0;

  while (Serial.available() && processed < 12) {

    char c = (char)Serial.read();
    ++processed;

    if (c == '\r' || c == '\n') {

      if (command_len) {

        command_buf[command_len] = 0;
        processCommand(command_buf);
        command_len = 0;
      }
    }
    else if (command_len < sizeof(command_buf) - 1) {

      command_buf[command_len++] = c;
    }
    else {

      command_len = 0;
      Serial.println(F("Command too long"));
    }
  }
}

// -----------------------------------------------------------------------------
// Setup
// -----------------------------------------------------------------------------

void setup() {

  Serial.begin(115200);
  Wire.begin();

  pinMode(pendulumPin, INPUT);

  // Initialize motor encoder
  encoder.init();
  motor.linkSensor(&encoder);

  // AUTOMATIC SENSOR DIRECTION DETECTION
  motor.sensor_direction = Direction::UNKNOWN;

  // Driver settings
  driver.voltage_power_supply = 11.0f;
  driver.voltage_limit = 6.0f;

  if (!driver.init()) {
    Serial.println(F("ERROR: driver init failed"));
    while (1) { }
  }

  motor.linkDriver(&driver);

  // Motor control configuration
  motor.torque_controller = TorqueControlType::voltage;
  motor.controller = MotionControlType::torque;
  motor.voltage_limit = 6.0f;

  if (!motor.init()) {
    Serial.println(F("ERROR: motor init failed"));
    while (1) { }
  }

  // --------------------------------------------------
  // FOC ALIGNMENT DIAGNOSTIC
  // --------------------------------------------------

  Serial.println(F("Starting FOC alignment..."));

  int foc_result = motor.initFOC();

  if (foc_result == 0) {

    Serial.println(F("ERROR: FOC alignment failed. Motor disabled."));

    motor.disable();

    while (1) {
      // Stop program if alignment fails
    }
  }

  Serial.println(F("FOC alignment successful."));

  Serial.print(F("Sensor direction: "));

  if (motor.sensor_direction == Direction::CW) {
    Serial.println(F("CW"));
  }
  else if (motor.sensor_direction == Direction::CCW) {
    Serial.println(F("CCW"));
  }
  else {
    Serial.println(F("UNKNOWN"));
  }

  // --------------------------------------------------
  // Pendulum calibration
  // --------------------------------------------------

  up_adc = wrap10bit(down_adc + 512);

  // Measured motor center
  target_motor_angle = 2.32f;

  last_control_time = micros();

  last_pendulum_angle =
    adcDiffSigned(analogRead(pendulumPin), up_adc)
    * adc_to_radians;

  Serial.println(F("=== PENDULUM SERIAL GAIN TUNING ==="));

  Serial.print(F("Down ADC: "));
  Serial.println(down_adc);

  Serial.print(F("Up ADC: "));
  Serial.println(up_adc);

  Serial.println(F("STARTS DISARMED. Voltage cap 1 V; max 2 V."));

  printHelp();
}

// -----------------------------------------------------------------------------
// Main loop
// -----------------------------------------------------------------------------

void loop() {

  motor.loopFOC();

  unsigned long now = micros();

  float dt = (now - last_control_time) / 1e6f;

  if (dt >= 0.002f) {

    // Pendulum angle
    int adc_now = analogRead(pendulumPin);

    int adc_err = adcDiffSigned(adc_now, up_adc);

    pendulum_angle = adc_err * adc_to_radians;

    // Pendulum velocity
    float raw_pvel = 0.0f;

    if (dt > 0.0f) {

      float angle_diff =
        pendulum_angle - last_pendulum_angle;

      if (angle_diff > _PI) {
        angle_diff -= _2PI;
      }

      if (angle_diff < -_PI) {
        angle_diff += _2PI;
      }

      raw_pvel = angle_diff / dt;
    }

    pvel_f =
      pvel_alpha * raw_pvel
      + (1.0f - pvel_alpha) * pvel_f;

    // Motor velocity
    mvel_f =
      mvel_alpha * motor.shaft_velocity
      + (1.0f - mvel_alpha) * mvel_f;

    // Motor position error
    motor_pos_error =
      motor.shaft_angle - target_motor_angle;

    // Slow center adaptation
    if (armed) {

      target_motor_angle =
        0.99995f * target_motor_angle
        + 0.00005f * motor.shaft_angle;
    }

    // --------------------------------------------------
    // Balancing controller
    // --------------------------------------------------

    target_voltage = 0.0f;

    if (armed) {

      if (fabs(pendulum_angle) <= balance_angle_limit) {

        target_voltage = controller(
          pendulum_angle,
          pvel_f,
          motor_pos_error,
          mvel_f,
          dt
        );

      }
      else {

        armed = false;
      }
    }

    // Preserve professor's motor polarity
    motor.move(-target_voltage);

    last_control_time = now;
    last_pendulum_angle = pendulum_angle;
  }

  // Serial commands
  readSerial();

  // --------------------------------------------------
  // Telemetry
  // --------------------------------------------------

  if (telemetry &&
      millis() - last_telemetry_time >= 250UL) {

    last_telemetry_time = millis();

    Serial.print(F("a="));
    Serial.print(pendulum_angle * RAD_TO_DEG, 1);

    Serial.print(F(" pv="));
    Serial.print(pvel_f, 1);

    Serial.print(F(" me="));
    Serial.print(motor_pos_error, 2);

    Serial.print(F(" mv="));
    Serial.print(mvel_f, 1);

    Serial.print(F(" u="));
    Serial.print(target_voltage, 2);

    Serial.print(F(" arm="));
    Serial.println(armed ? 1 : 0);
  }
}