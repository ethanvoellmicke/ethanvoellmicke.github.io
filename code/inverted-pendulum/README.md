# Inverted Pendulum — Feedback Control Final Project

Ethan Voellmicke’s individual final project: physical integration, calibration, feedback-control implementation, tuning and testing of an Arduino-based inverted pendulum.

## Source

`InvertedPendulumBalancing/InvertedPendulumBalancing.ino` is the supplied sketch, preserved without changes. Its header credits the provided `PendulumBalancing_ControlFramework.ino`; it also uses the SimpleFOC library for motor control.

## What the controller does

- Reads an analog pendulum angle sensor on A0 and an AS5600 motor encoder over I²C.
- Combines pendulum angle, filtered pendulum angular velocity, motor position error and filtered motor velocity in a four-state feedback law.
- Runs the balancing update when at least 2 ms has elapsed; `loopFOC()` runs each loop pass. This is an intended update interval, not a measured timing guarantee.
- Includes a motor-position deadband, output deadband, near-upright quiet hold, slow motor-center adaptation and voltage limiting.
- Starts disarmed, allows arming within 10° of upright, and disarms when the pendulum exceeds 20°. No swing-up routine is included.

## Serial interface

115200 baud; newline termination. `P n`, `D n`, `M n`, `V n` set the four feedback gains. `L n` sets the output-voltage cap. `C` captures motor center while disarmed; `A` arms near upright; `X` stops; `S` displays status; `Q` toggles 4 Hz telemetry; `H` displays help. Gain and limit changes require disarming first.

All four gains are initialized to zero in this shared copy; enter tuned gains before arming. The executable control-voltage ceiling and initial cap are 5 V. Some header/help strings still refer to an older 1–2 V setting; those strings do not match the executable constants. The source is published as provided rather than silently changing the tested sketch. Values and limits must be checked against the actual hardware before use.
