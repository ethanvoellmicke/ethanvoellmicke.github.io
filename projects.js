/* Edit project text and media here. See EDITING.md for examples. */
window.PORTFOLIO_PROJECTS = [
  {
    "id": "quadruped",
    "number": "01",
    "title": "12-DOF Quadruped Robot",
    "category": "Robotics / embedded control",
    "filters": [
      "robotics",
      "embedded"
    ],
    "summary": "A custom four-legged robot, from mechanical design to coordinated motion.",
    "description": "An independently designed and built quadruped integrating custom mechanical hardware, twelve servo-driven joints, Arduino/C++ control, and ROS 2 visualization.",
    "tags": [
      "SOLIDWORKS",
      "C++",
      "Arduino",
      "ROS 2",
      "Inverse kinematics",
      "IMU"
    ],
    "image": "https://raw.githubusercontent.com/ethanvoellmicke/quadruped-robot/main/QR-RobotCAD.png",
    "imageCaption": "SOLIDWORKS assembly",
    "repo": "https://github.com/ethanvoellmicke/quadruped-robot",
    "video": null,
    "photos": [
      {
        "src": "media/quadruped/quadruped-build-photo.jpg",
        "caption": "Physical 12-DOF quadruped build, showing the 3D-printed structure, servo wiring and onboard battery alongside the laptop control and serial-monitor setup."
      }
    ],
    "meta": "12 joints · Custom hardware · IMU feedback",
    "overview": "I designed, manufactured, and programmed the robot to connect custom mechanical hardware with embedded motion control. The build combines servo-driven mechanisms, foot trajectories, analytical inverse kinematics, and roll/pitch feedback in one modular system.",
    "contributions": [
      "Designed the mechanical structure in SOLIDWORKS and manufactured custom 3D-printed components.",
      "Integrated twelve servo-driven joints, power distribution, a PCA9685 PWM driver, and an MPU6050 IMU.",
      "Developed foot trajectories, coordinated gait timing, individual servo calibration, and IMU-based body corrections.",
      "Built related ROS 2 / RViz visualization and a serial / Wi-Fi command interface."
    ],
    "specs": [
      [
        "Actuation",
        "4 legs · 3 joints per leg"
      ],
      [
        "Controller",
        "Arduino Nano / C++"
      ],
      [
        "Motion",
        "Foot trajectories + planar hip/knee IK"
      ],
      [
        "Sensing",
        "MPU6050 orientation feedback"
      ],
      [
        "Power",
        "8.4 V battery · regulated 5 V electronics"
      ],
      [
        "Visualization",
        "ROS 2 / RViz"
      ]
    ],
    "process": [
      [
        "Receive commands",
        "Serial and Wi-Fi UDP commands select motion modes and update settings."
      ],
      [
        "Generate motion",
        "A nominal 20 ms scheduler coordinates leg phases and desired foot trajectories."
      ],
      [
        "Adjust body posture",
        "Feedforward shifts prepare leg liftoff; IMU measurements inform bounded roll and pitch corrections."
      ],
      [
        "Solve joint angles",
        "Two-link analytical inverse kinematics converts planar foot targets to hip and knee angles. Shoulder control is handled separately."
      ],
      [
        "Drive calibrated servos",
        "Per-servo neutral offsets, direction, limits, and linkage compensation translate joint requests into PCA9685 PWM outputs."
      ]
    ],
    "technicalNote": "The supplied firmware includes stand, crawl, and trot modes. Roll and pitch feedback are disabled during trot in the supplied controller. Gait tuning and physical testing are ongoing; no measured terrain or speed claims are implied.",
    "next": "Continue physical gait tuning and document stabilization response. An onboard camera and machine-learning-based perception are planned future work.",
    "wiring": "assets/quadruped-wiring.svg?v=visio-20261022",
    "mediaHeading": "From CAD to the physical build",
    "mediaIntro": "The CAD assembly, physical build photograph and wiring schematic document the robot’s mechanical structure and electronics integration. Select an image to enlarge it.",
    "upcomingVideos": [
      {
        "title": "Crawl gait",
        "description": "Coordinated crawl gait footage."
      },
      {
        "title": "Trot gait",
        "description": "Trot gait demonstration."
      },
      {
        "title": "Crab walking",
        "description": "Sideways walking demonstration."
      }
    ]
  },
  {
    "id": "robotic-arm",
    "number": "02",
    "title": "6-DOF Hand-Tracking Robotic Arm",
    "category": "Robotics / computer vision",
    "filters": [
      "robotics",
      "embedded"
    ],
    "summary": "Translating hand-tracking input into physical robotic arm motion.",
    "description": "A servo-driven robotic arm connecting camera-based hand tracking, inverse kinematics, and Arduino actuation.",
    "tags": [
      "Python",
      "OpenCV",
      "MediaPipe",
      "Arduino",
      "Inverse kinematics"
    ],
    "image": "media/robotic-arm/arm-cad-cover.png",
    "imageCaption": "CAD assembly of the 6-DOF hand-tracking robotic arm and gripper",
    "repo": null,
    "video": null,
    "photos": [
      {
        "src": "media/robotic-arm/build-photo.jpg",
        "caption": "Physical hand-tracking arm build with servo wiring, controller, and power supply."
      }
    ],
    "meta": "6 DOF · Hand tracking · Serial control",
    "art": "arm",
    "overview": "This project connects hand tracking on a computer to a physical robotic arm. Python processes camera input, while an Arduino receives serial commands and controls the servo-driven mechanism.",
    "contributions": [
      "Built and integrated a robotic arm with a gripper.",
      "Developed a Python hand-tracking interface using OpenCV and MediaPipe.",
      "Sent target position and control data to an Arduino through serial communication.",
      "Worked on inverse kinematics, coordinate mapping, and coordinated joint motion."
    ],
    "specs": [
      [
        "Input",
        "Camera-based hand tracking"
      ],
      [
        "Processing",
        "Python · OpenCV · MediaPipe"
      ],
      [
        "Interface",
        "Computer-to-Arduino serial"
      ],
      [
        "Actuation",
        "Servo-driven arm and gripper"
      ]
    ],
    "process": [
      [
        "Track the hand",
        "Camera input is processed on the computer using OpenCV and MediaPipe."
      ],
      [
        "Map the input",
        "Hand-tracking data is mapped into target coordinates and control values."
      ],
      [
        "Send commands",
        "Serial communication transfers the target data to the Arduino."
      ],
      [
        "Move the arm",
        "Joint calculations and servo commands translate the target into physical motion."
      ]
    ],
    "next": "Add the original Python and Arduino source files, joint calibration details, and control-interface documentation.",
    "technicalNote": "The demonstration videos show overall arm motion and wrist-driven rotation, alongside the physical build photograph and CAD assembly. Python and Arduino source files and detailed calibration documentation will be added.",
    "videos": [
      {
        "src": "media/robotic-arm/overall-movement.mp4",
        "poster": "media/robotic-arm/overall-poster.jpg",
        "title": "Overall movement",
        "caption": "The arm responds to hand-tracking input across its range of motion."
      },
      {
        "src": "media/robotic-arm/wrist-rotation.mp4",
        "poster": "media/robotic-arm/wrist-poster.jpg",
        "title": "Wrist rotation",
        "caption": "Wrist rotation is mapped to the robotic arm’s rotational motion."
      }
    ]
  },
  {
    "id": "senior-design",
    "number": "03",
    "title": "RTX Senior Design — Pressure Relief System",
    "category": "Senior capstone / sponsor: Raytheon (RTX)",
    "filters": [
      "mechanical"
    ],
    "summary": "Design lead for a modular, passive pressure-relief system engineered for the AN/TPY-2 radar enclosure.",
    "description": "Yearlong UMass Amherst senior capstone, Team 1406: custom bidirectional pressure-relief valve, windbreaker, and removable hydrophobic filter developed for Raytheon/RTX.",
    "tags": [
      "SOLIDWORKS",
      "Mechanical design",
      "Engineering drawings",
      "Fluid flow",
      "Prototyping",
      "Machining",
      "RTX"
    ],
    "image": "media/senior-design/valve-exploded-cad.svg",
    "imageCaption": "Exploded CAD assembly showing the valve, spring mechanism, removable filter housing and windbreaker",
    "repo": "https://github.com/ethanvoellmicke/ethanvoellmicke.github.io/tree/main/media/senior-design",
    "video": null,
    "photos": [
      {
        "src": "media/senior-design/filter-housing-cutaway.svg",
        "caption": "Transparent CAD view of the filter housing and removable cartridge in the modular assembly"
      },
      {
        "src": "media/senior-design/valve-internal-cutaway.svg",
        "caption": "Transparent CAD view of the spring-loaded, bidirectional pressure-relief valve internals"
      },
      {
        "src": "media/senior-design/valve-assembly-render.svg",
        "caption": "Physical valve assembly, CNC-machined and assembled by our team."
      },
      {
        "src": "media/senior-design/showcase-poster.webp",
        "caption": "UMass Amherst Team 1406 spring showcase poster covering the system, prototypes and test results"
      },
      {
        "src": "media/senior-design/valve-engineering-drawings.jpg",
        "caption": "Valve components and engineering drawings from the capstone design report"
      },
      {
        "src": "media/senior-design/windbreaker-filter-drawings.jpg",
        "caption": "Windbreaker and filter housing designs and engineering drawings from the capstone report"
      },
      {
        "src": "media/senior-design/early-flow-simulation.png",
        "caption": "SOLIDWORKS Flow Simulation on an early pressure-relief system model, used to explore airflow through the initial geometry."
      }
    ],
    "mediaHeading": "CAD, manufactured hardware & drawings",
    "mediaIntro": "Explore the exploded assembly and transparent CAD cutaways alongside a photograph of the physical valve assembly our team CNC-machined and built, plus the original component drawings and showcase poster. Select any image to enlarge.",
    "meta": "Design Lead · RTX sponsor · SOLIDWORKS",
    "overview": "As Design Lead for Team 1406, I developed and iterated the SOLIDWORKS models and engineering drawings for a passive pressure-relief system sponsored by Raytheon/RTX. The goal was to prevent damaging pressure differentials during aerial transport while maintaining weatherproofing. The concept integrates three serviceable stages: an external perforated windbreaker, a removable hydrophobic filtration module, and a spring-loaded bidirectional relief valve. Our team progressed from CAD iterations and 3D-printed fit checks to CNC machining, assembly, and performance evaluation of the physical valve prototype.",
    "contributionHeading": "My work as Design Lead",
    "contributions": [
      "Created and iterated the full pressure-relief assembly and individual component designs in SOLIDWORKS, working through manufacturability and fitment constraints.",
      "Prepared engineering drawings for the windbreaker, filter housing and spacers, funnel, valve body, support plates, shaft, and valve plates.",
      "Worked closely with the fabrication lead to refine designs for available machining processes and assembly.",
      "Performed early SOLIDWORKS flow-simulation work and researched relevant engineering requirements and standards.",
      "Produced 3D-printed prototype components for design reviews and assisted with machining the final design.",
      "Coordinated mechanical design decisions across the team as the prototype developed."
    ],
    "specs": [
      [
        "Project",
        "UMass MIE 414 · Team 1406"
      ],
      [
        "Sponsor",
        "Raytheon Missiles & Defense (RTX)"
      ],
      [
        "Role",
        "Mechanical Design Lead"
      ],
      [
        "Function",
        "Passive two-way pressure equalization"
      ],
      [
        "Architecture",
        "Windbreaker · removable filter · valve"
      ],
      [
        "Materials",
        "6061 aluminum · prototype printed components"
      ],
      [
        "Design software",
        "SOLIDWORKS + early flow simulation"
      ],
      [
        "Evaluation",
        "Airflow · pressure differential · debris/water filtration"
      ]
    ],
    "process": [
      [
        "Set design constraints",
        "Fit within the existing access-panel geometry, require no power or operator action, and maintain weather and debris protection."
      ],
      [
        "Generate valve concepts",
        "Evaluate low-pressure high-flow options, including an initial butterfly concept and a bidirectional spring-loaded plate valve."
      ],
      [
        "Design modular construction",
        "Create a perforated windbreaker, serviceable hydrophobic filter cartridge, and spring-loaded valve assembly with separable machined components."
      ],
      [
        "Detail parts for manufacturing",
        "Refine tolerances and interfaces in SOLIDWORKS and prepare dimensioned drawings for each part and the assembled system."
      ],
      [
        "Prototype and fabricate",
        "Use 3D prints for fit and alignment checks, then CNC-machine and assemble the physical aluminum valve prototype with springs and gaskets."
      ],
      [
        "Evaluate performance",
        "Compare flow-rate and pressure-differential behavior with design targets and assess water/debris sealing; summarize results on the project poster."
      ]
    ],
    "technicalNote": "The spring showcase poster reports a 0.055 psi modeled stacked pressure differential and documents component testing, including flow rates, spring configurations, and filter performance. The poster also notes improvement opportunities for drainage, gasket materials, and valve-seal tolerances. These are team-reported results, not a claim of independently certified compliance. Team members: Lucca Garcia, Aidan Hamblin, Ethan Gattoni, Ethan Voellmicke, and Katie Barberi.",
    "next": "Expand documentation of prototype validation, sealing, and drainage improvements.",
    "resources": [
      {
        "label": "Full showcase poster (image)",
        "url": "https://raw.githubusercontent.com/ethanvoellmicke/ethanvoellmicke.github.io/main/media/senior-design/showcase-poster.webp"
      },
      {
        "label": "Selected valve engineering drawings",
        "url": "https://raw.githubusercontent.com/ethanvoellmicke/ethanvoellmicke.github.io/main/media/senior-design/valve-engineering-drawings.jpg"
      },
      {
        "label": "Windbreaker and filter drawings",
        "url": "https://raw.githubusercontent.com/ethanvoellmicke/ethanvoellmicke.github.io/main/media/senior-design/windbreaker-filter-drawings.jpg"
      }
    ]
  },
  {
    "id": "drone",
    "number": "04",
    "title": "IAM3D FPV Racing Drone",
    "category": "UMass ASME / competition design",
    "filters": [
      "vehicles"
    ],
    "summary": "An additively manufactured racing drone with a lightweight chassis and a mechanical payload grabber.",
    "description": "An FPV quadcopter developed with the UMass Amherst ASME design team for the 2025 Innovative Additive Manufacturing 3D Challenge.",
    "tags": [
      "SOLIDWORKS",
      "Altair Inspire",
      "FDM printing",
      "DFAM",
      "FEA",
      "FPV"
    ],
    "image": "media/drone/drone-cover.webp",
    "imageCaption": "IAM3D drone build with a printed frame, propeller guards, and payload grabber. Background edited for presentation.",
    "repo": null,
    "video": null,
    "photos": [
      {
        "src": "media/drone/drone-cad.webp",
        "caption": "CAD assembly of the competition drone, showing the lightweight chassis, electronics packaging, motors, and blade guards."
      },
      {
        "src": "media/drone/second-place-trophy.png",
        "caption": "Second-place trophy — 2025 ASME IAM3D Competition at EFx SLU, April 25–26, 2025, St. Louis, Missouri."
      }
    ],
    "meta": "2nd place · IAM3D 2025 · UMass ASME",
    "art": "drone",
    "overview": "I contributed to the UMass Amherst ASME design team’s 2025 IAM3D competition drone. The team combined a custom FDM-printed airframe, FPV flight hardware, and a servo-driven grabber for a one-inch cube payload. The design balanced low mass, structural stiffness, compact electronics packaging, and repairability. SOLIDWORKS modeling, Altair Inspire topology optimization, and repeated assembly and flight tests guided the iterations.",
    "contributionHeading": "Design highlights",
    "contributions": [
      "Modular electronics packaging and removable blade guards supported rapid prototyping and repairs.",
      "Topology-optimized chassis geometry reduced bulk while retaining mounting interfaces and structural load paths.",
      "A servo-driven rack-and-pinion mechanism actuated a compliant grabber for the competition payload."
    ],
    "specs": [
      [
        "Team",
        "UMass Amherst ASME · 2024–25"
      ],
      [
        "Competition",
        "IAM3D 2025 · 2nd place at EFx SLU"
      ],
      [
        "CAD envelope",
        "297 mm motor diagonal · 97 mm height"
      ],
      [
        "Prototyping",
        "FDM printing · PLA"
      ],
      [
        "Flight hardware",
        "SpeedyBee F405 V4 / 60A stack"
      ],
      [
        "Power",
        "4S LiPo · 14.8 V nominal · 1,500 mAh"
      ]
    ],
    "process": [
      [
        "Package the system",
        "A removable component box integrated the flight electronics and adjustable FPV camera mount."
      ],
      [
        "Refine the airframe",
        "Altair Inspire mass optimization was followed by geometry cleanup and fillets in SOLIDWORKS."
      ],
      [
        "Iterate through testing",
        "Fit checks and flight testing led to screw-mounted blade guards and chassis revisions; the grabber was bench-tested separately."
      ]
    ],
    "technicalNote": "The March 2025 report predicts 0.177 mm maximum displacement for a simplified lower-chassis FEA model under the documented 2 N loading condition. It also reports over 400 grabber actuation cycles in about 10 minutes. Full-drone payload integration and testing were still ongoing when the report was written.",
    "figures": [
      {
        "src": "media/drone/optimized-chassis.png",
        "caption": "Lightweight chassis — Altair Inspire optimization followed by SOLIDWORKS cleanup preserved the motor mounts and electronics interfaces while removing excess material. Original report figure, page 50."
      },
      {
        "src": "media/drone/chassis-displacement.png",
        "caption": "Structural analysis — displacement of the simplified lower chassis, with the original URES scale in millimeters. Maximum simulated displacement: 0.177 mm. Original report Figure 20, page 20."
      },
      {
        "src": "media/drone/payload-grabber.png",
        "caption": "Payload mechanism — a servo and rack-and-pinion drive actuate the compliant grabber. The report documents over 400 bench-test cycles for an earlier iteration of this mechanism. Original report Figure 41, page 42."
      }
    ],
    "mediaHeading": "From CAD to hardware",
    "mediaIntro": "The physical build and CAD assembly show how the printed structure, electronics, propeller guards, and payload system come together. The trophy marks the team’s second-place finish at the 2025 ASME IAM3D Competition at EFx SLU. Select an image to enlarge it.",
    "next": "Add details of the final competition configuration and further flight-testing documentation.",
    "award": {
      "title": "2nd place",
      "event": "2025 ASME IAM3D Competition",
      "detail": "UMass Amherst ASME design team · EFx SLU · St. Louis, Missouri",
      "src": "media/drone/second-place-trophy.png",
      "caption": "Second-place trophy — 2025 ASME IAM3D Competition at EFx SLU, April 25–26, 2025, St. Louis, Missouri."
    },
    "videos": [
      {
        "src": "media/drone/drone-working.mp4",
        "poster": "media/drone/drone-working-poster.jpg",
        "title": "Drone in flight",
        "caption": "Onboard FPV footage showing the drone flying through a gated course."
      }
    ]
  },
  {
    "id": "i2c-arm",
    "number": "05",
    "title": "Dual-Arduino I²C Robotic Arm",
    "category": "Mechatronics / embedded feedback control",
    "filters": [
      "robotics",
      "embedded"
    ],
    "summary": "A two-joint arm with distributed position control, encoder feedback, and coordinated motion over I²C.",
    "description": "A two-joint robotic arm combining two Arduino Nano RP2040 controllers, encoder-based position feedback, and I²C communication to support manual control, automatic sweeps, and arm-tip height compensation.",
    "tags": [
      "Arduino Nano RP2040",
      "C++",
      "I²C",
      "P control",
      "Encoder feedback",
      "H-bridge"
    ],
    "image": "media/i2c-arm/arm-cover.png",
    "imageCaption": "Two-joint robotic arm with dual Arduino Nano RP2040 control and breadboard electronics",
    "repo": "https://github.com/ethanvoellmicke/ethanvoellmicke.github.io/tree/main/media/i2c-arm",
    "video": null,
    "photos": [],
    "meta": "2 Nano RP2040 boards · I²C · 3 control modes",
    "art": "i2c",
    "overview": "This project explores how two independently controlled joints can work together as one robotic arm. Each Arduino Nano RP2040 reads a joint encoder and drives a geared DC motor through an L293D H-bridge, using proportional feedback to reduce position error. A leader–follower I²C link coordinates the operating modes and exchanges position data. Manual mode follows potentiometer inputs, automatic mode sweeps the joints through changing references, and stabilize mode calculates an upper-joint reference to compensate for lower-joint motion. Performance is evaluated by comparing measured joint angles with their references across all three modes.",
    "contributionHeading": "Engineering highlights",
    "contributions": [
      "Distributed joint control using two Arduino Nano RP2040 boards, with an I²C follower at address 8.",
      "Encoder-based proportional position control with direction selection, bounded PWM output, and joint-specific deadbands.",
      "Three motion modes: manual potentiometer tracking, automated joint sweeps, and geometry-based arm-tip height compensation.",
      "Serial mode selection and a stop/reset command; the leader disables motor drive and sends a reset flag to the follower.",
      "Reference-versus-measured position logging for evaluating tracking behavior across the three operating modes."
    ],
    "specs": [
      [
        "Architecture",
        "2 × Arduino Nano RP2040"
      ],
      [
        "Actuation",
        "2 geared DC motors · L293D H-bridges"
      ],
      [
        "Sensing",
        "2 encoders · 2 potentiometers"
      ],
      [
        "Feedback",
        "Proportional control + position deadband"
      ],
      [
        "Communications",
        "I²C leader / follower · address 8"
      ],
      [
        "Modes",
        "Manual · Auto sweep · Stabilize"
      ],
      [
        "Stop / reset",
        "Serial x command · leader drive off / follower reset"
      ]
    ],
    "process": [
      [
        "Read position",
        "Encoder A/B rising-edge interrupts update joint counts; a 50:1 gearbox and 14 pulses per revolution convert those counts into estimated motor angles."
      ],
      [
        "Compute position error",
        "Each controller compares its measured angle with a local or communicated reference and selects the shortest rotational error."
      ],
      [
        "Drive the motors",
        "P-control commands L293D direction and PWM output, with 0.5° leader and 0.8° follower deadbands in the supplied firmware."
      ],
      [
        "Exchange I²C messages",
        "The leader transmits mode flags and requests the follower encoder count for inter-joint coordination."
      ],
      [
        "Switch operating modes",
        "Manual follows potentiometers; auto sweep cycles target angles; stabilize computes a compensating upper-joint angle from lower-joint motion."
      ],
      [
        "Stop and reset",
        "The serial x command disables the leader motor drive and resets the follower position reference. The follower continues its position-control loop; this is not a latched shutdown of both motors."
      ]
    ],
    "plots": [
      {
        "src": "media/i2c-arm/plots/manual-arm1.svg",
        "mode": "manual",
        "modeLabel": "Manual",
        "arm": 1,
        "title": "Arm 1",
        "error": "8.86°",
        "caption": "Measured position follows the potentiometer reference through changes in the target angle, with visible offsets during several held positions.",
        "alt": "Manual mode, Arm 1: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."
      },
      {
        "src": "media/i2c-arm/plots/manual-arm2.svg",
        "mode": "manual",
        "modeLabel": "Manual",
        "arm": 2,
        "title": "Arm 2",
        "error": "2.303°",
        "caption": "Measured position tracks a sequence of manually selected reference angles. Differences are most visible around the larger changes in reference.",
        "alt": "Manual mode, Arm 2: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."
      },
      {
        "src": "media/i2c-arm/plots/auto-sweep-arm1.svg",
        "mode": "sweep",
        "modeLabel": "Auto sweep",
        "arm": 1,
        "title": "Arm 1",
        "error": "14.4°",
        "caption": "A repeating sweep reference tests continuous tracking. The measured response follows the triangular pattern, with lag and reduced travel near the reversals.",
        "alt": "Auto sweep mode, Arm 1: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."
      },
      {
        "src": "media/i2c-arm/plots/auto-sweep-arm2.svg",
        "mode": "sweep",
        "modeLabel": "Auto sweep",
        "arm": 2,
        "title": "Arm 2",
        "error": "31.86°",
        "caption": "The measured response follows the repeating sweep, with flatter upper and lower turning points than the reference trace.",
        "alt": "Auto sweep mode, Arm 2: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."
      },
      {
        "src": "media/i2c-arm/plots/stabilize-arm1.svg",
        "mode": "stabilize",
        "modeLabel": "Stabilize",
        "arm": 1,
        "title": "Arm 1",
        "error": "≈14.71°",
        "caption": "The measured angle follows the changing stabilization reference, with visible lag and offsets at the positive and negative plateaus.",
        "alt": "Stabilize mode, Arm 1: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."
      },
      {
        "src": "media/i2c-arm/plots/stabilize-arm2.svg",
        "mode": "stabilize",
        "modeLabel": "Stabilize",
        "arm": 2,
        "title": "Arm 2",
        "error": "≈6.29°",
        "caption": "Measured position follows the reference during the stabilization test, with lag during transitions and differences near the high and low plateaus.",
        "alt": "Stabilize mode, Arm 2: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."
      }
    ],
    "results": {
      "caption": "Reported average angular tracking error",
      "headers": [
        "Operating mode",
        "Arm 1",
        "Arm 2"
      ],
      "rows": [
        [
          "Manual",
          "8.86°",
          "2.303°"
        ],
        [
          "Auto sweep",
          "14.4°",
          "31.86°"
        ],
        [
          "Stabilize",
          "≈14.71°",
          "≈6.29°"
        ]
      ],
      "note": "Values compare motor position with its reference during the tests documented in the mechatronics report. Stabilize values are approximate. These results describe angular tracking error, not arm-tip position error."
    },
    "technicalNote": "Leader and follower firmware are linked below. The results table summarizes the reported position-tracking tests across the three operating modes. Project contributors: Ethan Voellmicke, Aidan Hamblin, and Eli Rusch.",
    "next": "Potential improvements: refine proportional gains and reference synchronization; characterize overshoot, settling time, and stabilization across more test conditions.",
    "resources": [
      {
        "label": "Leader Arduino firmware",
        "url": "https://github.com/ethanvoellmicke/ethanvoellmicke.github.io/blob/main/media/i2c-arm/FinalProjectCodeLeader.ino"
      },
      {
        "label": "Follower Arduino firmware",
        "url": "https://github.com/ethanvoellmicke/ethanvoellmicke.github.io/blob/main/media/i2c-arm/FinalProjectCodeFollower.ino"
      }
    ],
    "videos": [
      {
        "src": "media/i2c-arm/arm-demonstration.mp4",
        "poster": "media/i2c-arm/arm-demonstration-poster.jpg",
        "title": "Dual-Arduino arm demonstration",
        "caption": "The assembled two-joint robotic arm in operation, with its breadboard electronics, dual-controller setup and laptop interface."
      }
    ]
  },
  {
    "id": "robotic-car",
    "number": "06",
    "title": "Autonomous Robotic Car",
    "category": "Mobile robotics / autonomous driving",
    "filters": [
      "vehicles",
      "embedded"
    ],
    "summary": "An Arduino-based mobile robot combining onboard sensing, motor control and autonomous driving behavior.",
    "description": "A compact autonomous robotic car built for a mechatronics class, integrating a wheeled chassis, Arduino control electronics and a front-mounted ultrasonic range sensor.",
    "tags": [
      "Arduino",
      "Autonomous driving",
      "Ultrasonic sensing",
      "Motor control",
      "Hardware integration"
    ],
    "image": "media/robotic-car/car-cover.svg",
    "repo": null,
    "video": null,
    "photos": [],
    "meta": "Arduino · Ultrasonic sensing · Mobile robotics",
    "art": "car",
    "overview": "I built this compact robotic car to connect embedded control with real-world motion. The platform brings together a two-wheel drive chassis, onboard battery power, Arduino electronics and a front-mounted ultrasonic range sensor. The sensor provides a way to measure the distance to objects ahead, while the controller translates programmed driving decisions into motor commands. The driving demonstration shows the assembled vehicle moving across a classroom floor and changing heading. This project brought sensing, wiring, power and actuation together in one working mobile system.",
    "contributions": [
      "Assembled the mobile chassis and integrated its drive hardware, onboard electronics and battery power.",
      "Wired an Arduino-based control system with a front-mounted ultrasonic range sensor.",
      "Programmed and tested vehicle motion on the completed hardware.",
      "Documented the assembled system and a working floor-driving demonstration."
    ],
    "specs": [
      [
        "Platform",
        "Two-wheel drive mobile robot"
      ],
      [
        "Controller",
        "Arduino"
      ],
      [
        "Visible sensor",
        "Front-mounted ultrasonic range sensor"
      ],
      [
        "Power",
        "Onboard battery"
      ],
      [
        "Demonstration",
        "Floor driving and heading changes"
      ],
      [
        "Available documentation",
        "Build photograph · driving video"
      ]
    ],
    "process": [
      [
        "Sense the surroundings",
        "The front ultrasonic sensor emits an acoustic pulse and measures the returning echo. Echo travel time can be converted into an estimate of the distance to an object ahead."
      ],
      [
        "Make a driving decision",
        "The Arduino runs the vehicle’s programmed behavior and issues motion commands. The exact decision rules and distance thresholds are no longer available in the original source files."
      ],
      [
        "Control wheel motion",
        "Motor commands produce forward motion and changes of heading. On a two-wheel drive platform, differing left and right wheel motion allows the vehicle to turn."
      ],
      [
        "Test the integrated vehicle",
        "The recorded floor test shows the powered vehicle driving and changing direction, documenting the mechanical, electrical and control system operating together."
      ]
    ],
    "next": "Integrating the complete vehicle made the relationship between sensing, embedded decisions and physical motion tangible. The retained build photo and driving video preserve the working result.",
    "technicalNote": "The original source code is no longer available. The photograph and video document the hardware and vehicle motion; the sensor explanation describes the operating principle of the visible ultrasonic hardware. Specific obstacle-avoidance logic, thresholds, feedback algorithms and autonomous navigation performance cannot be reconstructed from the footage alone.",
    "imageCaption": "Autonomous robotic car with a two-wheel drive chassis, Arduino electronics and a front-mounted ultrasonic range sensor.",
    "videos": [
      {
        "src": "media/robotic-car/driving-demo.mp4",
        "poster": "media/robotic-car/driving-poster.jpg",
        "title": "Driving test",
        "caption": "The completed robotic car driving across a classroom floor and changing heading during a hardware demonstration."
      }
    ],
    "overviewHeading": "From sensor input to vehicle motion",
    "contributionHeading": "What I built",
    "nextHeading": "Project takeaway",
    "mediaHeading": "Hardware & driving demonstration",
    "mediaIntro": "The build photo shows the chassis, control electronics and front ultrasonic sensor. The video records the completed car driving across the floor and changing heading. Select the photo to inspect the hardware."
  },
  {
    "id": "microneedle-actuator",
    "number": "07",
    "title": "Vacuum-Powered Microneedle Actuators",
    "category": "Research / soft actuators",
    "filters": [
      "research",
      "mechanical"
    ],
    "summary": "Research into vacuum-powered soft actuators for steering microneedles, including patterned geometry and dot-density studies.",
    "description": "THEAM Lab research at UMass Amherst exploring air-pressure actuation through vacuum-powered soft mechanisms for microneedle steering.",
    "tags": [
      "Soft actuators",
      "Pneumatics",
      "SOLIDWORKS",
      "SOLIDWORKS Visualize",
      "Material modeling",
      "Microprinting"
    ],
    "image": "media/microneedle-actuator/microneedle-curved-render.webp",
    "imageCaption": "Curved microneedle actuator concept, rendered in SOLIDWORKS Visualize.",
    "repo": null,
    "video": null,
    "photos": [
      {
        "src": "media/microneedle-actuator/needle-transition-detail.webp",
        "caption": "Close view of the modeled needle transition and patterned actuator body, rendered in SOLIDWORKS Visualize."
      },
      {
        "src": "media/microneedle-actuator/dot-pattern-detail.webp",
        "caption": "Dot-pattern detail from the density and geometry exploration. SOLIDWORKS Visualize rendering of the design concept."
      },
      {
        "src": "media/microneedle-actuator/dot-spacing-detail.webp",
        "caption": "Close-up of dot spacing along the patterned actuator body, included as an additional geometry-study view."
      },
      {
        "src": "media/microneedle-actuator/straight-body-alternate.webp",
        "caption": "Alternate straight-body CAD view for inspecting the full patterned geometry."
      },
      {
        "src": "media/microneedle-actuator/patterned-actuator-closeup.webp",
        "caption": "Close-up design visualization of the patterned actuator body, showing repeated dot rows, connecting features and the central longitudinal geometry."
      }
    ],
    "meta": "THEAM Lab · Microneedle steering · Soft actuation",
    "art": "arm",
    "overviewHeading": "Research overview",
    "overview": "As an undergraduate researcher in UMass Amherst’s THEAM Lab, I led research and design of a vacuum-powered soft actuator concept intended to steer microneedles for surgical applications. I developed microscale actuator concepts in SOLIDWORKS and explored dot density and patterned geometry as design variables. Material modeling supported investigation of stress and deformation, while microprinting and additive manufacturing were explored as routes toward flexible, biocompatible prototypes. The images show the needle/actuator concept and related patterned-body studies, including SOLIDWORKS Visualize renders.",
    "contributionHeading": "My research",
    "contributions": [
      "Led concept development for a vacuum-powered soft mechanism for microneedle steering.",
      "Created microscale actuator geometry in SOLIDWORKS and used material modeling to examine stress and deformation.",
      "Experimented with dot-pattern density and geometric detail within a needle/actuator concept.",
      "Created SOLIDWORKS Visualize renders and explored microprinting and additive manufacturing approaches."
    ],
    "specs": [
      [
        "Research group",
        "THEAM Lab · UMass Amherst"
      ],
      [
        "Role",
        "Undergraduate Researcher"
      ],
      [
        "Research period",
        "April 2025 – May 2026"
      ],
      [
        "Actuation concept",
        "Vacuum-powered soft mechanism"
      ],
      [
        "Design variables",
        "Patterned geometry · dot density"
      ],
      [
        "Tools",
        "SOLIDWORKS · SOLIDWORKS Visualize"
      ],
      [
        "Fabrication study",
        "Microprinting · additive manufacturing"
      ]
    ],
    "process": [
      [
        "Develop the actuation concept",
        "Explore a vacuum-powered soft mechanism intended to produce controlled microneedle steering."
      ],
      [
        "Investigate patterned geometry",
        "Vary dot density and local geometry in SOLIDWORKS as part of the actuator concept study."
      ],
      [
        "Evaluate and communicate the design",
        "Use material modeling to study stress and deformation, create Visualize renders, and investigate potential fabrication approaches."
      ]
    ],
    "technicalNote": "The documentation focuses on actuator concepts, patterned geometry, and material-modeling investigations. The curved and detail images are design renders made in SOLIDWORKS Visualize; the straight configuration is a CAD view. Microprinting and prototype fabrication were explored as research directions.",
    "mediaHeading": "Needle concept & patterned-body studies",
    "mediaIntro": "CAD views and renders of the needle/actuator concept and related patterned-body studies. Detail views show the dot rows and local geometry; overall views show straight and curved configurations. Dot density was explored as a design variable. Select an image to enlarge it.",
    "next": "Add fabrication documentation and measured pressure–deformation data when available.",
    "mediaTabLabel": "Design gallery"
  },
  {
    "id": "lightweight-bridge",
    "number": "08",
    "title": "Lightweight 3D-Printed Bridge",
    "category": "Additive manufacturing / class project",
    "filters": [
      "mechanical"
    ],
    "summary": "A 11.7 g, FDM-printed bridge that held 20 lb, developed through iterative design and load testing.",
    "description": "A record-setting bridge developed through successive CAD, FEA, print and load-test iterations for an Additive Manufacturing Processes final project.",
    "tags": [
      "FDM / PLA",
      "SOLIDWORKS",
      "ANSYS",
      "Iterative design",
      "Print orientation"
    ],
    "image": "media/lightweight-bridge/bridge-design.webp",
    "imageCaption": "CAD view of the lightweight bridge design used for the Additive Manufacturing Processes final project.",
    "repo": null,
    "video": null,
    "photos": [
      {
        "src": "media/lightweight-bridge/iteration-1-design.webp",
        "caption": "Iteration 1 — original dense-truss CAD design from the course report."
      },
      {
        "src": "media/lightweight-bridge/iteration-1-5-design.webp",
        "caption": "Iteration 1.5 — open-frame CAD design from the course report."
      },
      {
        "src": "media/lightweight-bridge/iteration-2-design.webp",
        "caption": "Iteration 2 — I-beam bridge CAD design from the course report."
      },
      {
        "src": "media/lightweight-bridge/iteration-3-design.webp",
        "caption": "Iteration 3 — refined bridge CAD design from the course report."
      },
      {
        "src": "media/lightweight-bridge/iteration-2-cross-section.webp",
        "caption": "Iteration 2 I-beam cross-section. Original dimensions retained from the report; this section prioritized vertical bending efficiency."
      },
      {
        "src": "media/lightweight-bridge/iteration-3-cross-section.webp",
        "caption": "Iteration 3 I-beam cross-section. Revised proportions increased lateral rigidity after the preceding prototype swayed under off-center loading."
      },
      {
        "src": "media/lightweight-bridge/iteration-1-5-stress.webp",
        "caption": "Iteration 1.5 ANSYS stress study. Upper-corner concentrations informed geometry and fillet changes. Original legend and scale retained."
      },
      {
        "src": "media/lightweight-bridge/iteration-2-stress.webp",
        "caption": "Iteration 2 ANSYS stress study. Simplified vertical loading did not fully represent the lateral instability later observed in testing. Original legend and scale retained."
      },
      {
        "src": "media/lightweight-bridge/iteration-3-stress.webp",
        "caption": "Iteration 3 ANSYS stress study following cross-section and cross-beam-spacing changes. The report describes reduced cross-beam stress concentration. Original legend and scale retained."
      },
      {
        "src": "media/lightweight-bridge/printed-bridge.webp",
        "caption": "Physical printed bridge from the final iteration. The report documents side-oriented FDM printing and manually designed supports."
      },
      {
        "src": "media/lightweight-bridge/overhang-detail.webp",
        "caption": "Close-up of the printed overhang. Fraying and local sagging show the tradeoff between support material and surface quality; the report states the main load-bearing walls remained intact."
      }
    ],
    "meta": "Course record · 11.7 g bridge · 20 lb load",
    "overviewHeading": "Designed through iteration",
    "overview": "The challenge was to support a 20 lb central load with as little printed material as possible. My design approach was iterative: establish a load-bearing baseline, remove unnecessary material, investigate failures, and refine both geometry and print orientation. The design evolved from a dense truss to an open frame with I-beam members, larger fillets and greater lateral rigidity. The final iteration supported the required load; the finished bridge weighed 11.7 g. The report documents a fabrication cost of $4.46 and a print time of 1 hour 53 minutes. The bridge set the course record for the lightest successful structure, which I still hold.",
    "contributionHeading": "Design decisions",
    "contributions": [
      "Used successive prototypes and load tests to guide material reduction and structural refinement.",
      "Replaced square members with I-beam sections to improve bending efficiency, then revised the section to resist lateral instability.",
      "Reoriented the print onto its side to align deposited filament with the main structural members.",
      "Refined fillets, cross-beam spacing and manual supports to balance strength, stability and printability."
    ],
    "specs": [
      [
        "Course",
        "Additive Manufacturing Processes"
      ],
      [
        "Manufacturing",
        "FDM · PLA"
      ],
      [
        "Bridge mass",
        "11.7 g"
      ],
      [
        "Fabrication cost",
        "$4.46"
      ],
      [
        "Print time",
        "1 hour 53 minutes"
      ],
      [
        "Support strategy",
        "Manually designed print supports"
      ],
      [
        "Load supported",
        "20 lb"
      ],
      [
        "Course result",
        "Lightest successful bridge"
      ],
      [
        "Record status",
        "Still held"
      ],
      [
        "Design tools",
        "SOLIDWORKS · ANSYS"
      ],
      [
        "Test requirement",
        "20 lb central load · at least 1 second"
      ]
    ],
    "process": [
      [
        "Establish a baseline",
        "Start with a dense truss that supports the required load, then identify material outside the essential load path."
      ],
      [
        "Use failure as feedback",
        "Investigate the open-frame prototype’s upper-corner fracture. Refine fillets and reconsider the direction of printed layers."
      ],
      [
        "Improve section efficiency",
        "Replace square members with I-beam sections and print on the side. Physical testing then reveals a separate lateral-stability problem under off-center loading."
      ],
      [
        "Refine lateral rigidity",
        "Revise the I-beam cross-section and widen the frame. Increase cross-beam spacing and remove material selectively from tension members to manage the stiffness–mass tradeoff."
      ],
      [
        "Design the print as well as the part",
        "Iterate manual support placement and density. Inspect overhang sagging and fraying while checking that primary load-bearing walls remain intact."
      ]
    ],
    "technicalNote": "ANSYS was used to investigate stress concentrations under an idealized downward load with fixed edges. Physical testing revealed lateral instability that simplified bending calculations did not capture. The iteration comparison combines the report’s earlier design metrics and fabrication costs with my corrected final bridge mass of 11.7 g.",
    "mediaHeading": "Design iterations & test evidence",
    "mediaIntro": "The video documents the printed bridge under load. Original CAD, dimensioned sections, ANSYS plots and build photographs show the design progression. Select any figure to enlarge it.",
    "next": "The biggest improvement came from responding to observed failure, rather than simply adding material. Future iterations would plan manual supports earlier, explore more candidate geometries before printing, and remove additional material only after checking lateral stability and print quality.",
    "award": {
      "title": "Lightest bridge to support 20 lbs in course history",
      "event": "Additive Manufacturing Processes",
      "detail": "Additive Manufacturing Processes final project · record remains unbeaten",
      "src": "media/lightweight-bridge/bridge-design.webp",
      "caption": "CAD view of the lightweight bridge design used for the Additive Manufacturing Processes final project.",
      "label": "COURSE HISTORY",
      "ariaLabel": "Bridge course-history record",
      "linkLabel": "View bridge design",
      "linkAria": "View course-record bridge design"
    },
    "iterations": [
      {
        "label": "01 / BASELINE",
        "title": "Prove the load path",
        "src": "media/lightweight-bridge/iteration-1-design.webp",
        "caption": "Iteration 1 — original dense-truss CAD design from the course report.",
        "change": "A dense truss established a structure capable of carrying the required load.",
        "lesson": "Testing showed excess material. The next step was to simplify the frame and reduce mass."
      },
      {
        "label": "1.5 / MATERIAL REDUCTION",
        "title": "Find the weak point",
        "src": "media/lightweight-bridge/iteration-1-5-design.webp",
        "caption": "Iteration 1.5 — open-frame CAD design from the course report.",
        "change": "An open frame with square-section members removed much of the original truss material.",
        "lesson": "Failure near the upper corners exposed stress concentrations and sensitivity to layer orientation."
      },
      {
        "label": "02 / SECTION & ORIENTATION",
        "title": "Strength needs stability",
        "src": "media/lightweight-bridge/iteration-2-design.webp",
        "caption": "Iteration 2 — I-beam bridge CAD design from the course report.",
        "change": "I-beam members, larger fillets and side-oriented printing improved material efficiency and layer alignment.",
        "lesson": "The bridge could resist vertical loading, but off-center loading caused lateral swaying and collapse."
      },
      {
        "label": "03 / REFINED STRUCTURE",
        "title": "Resolve lateral buckling",
        "src": "media/lightweight-bridge/iteration-3-design.webp",
        "caption": "Iteration 3 — refined bridge CAD design from the course report.",
        "change": "The I-beam section was revised for lateral rigidity, the base widened and cross-beams spaced farther apart.",
        "lesson": "The refined design maintained structural integrity under 20 lb. Manual supports reduced fabrication overhead, with local overhang defects remaining visible."
      }
    ],
    "nextHeading": "What I learned",
    "figuresHeading": "Analysis, section design & print evidence",
    "figuresAriaLabel": "Bridge engineering evidence",
    "mediaTabLabel": "Photos & video",
    "figures": [
      {
        "src": "media/lightweight-bridge/iteration-2-cross-section.webp",
        "caption": "Iteration 2 I-beam cross-section. Original dimensions retained from the report; this section prioritized vertical bending efficiency."
      },
      {
        "src": "media/lightweight-bridge/iteration-3-cross-section.webp",
        "caption": "Iteration 3 I-beam cross-section. Revised proportions increased lateral rigidity after the preceding prototype swayed under off-center loading."
      },
      {
        "src": "media/lightweight-bridge/iteration-1-5-stress.webp",
        "caption": "Iteration 1.5 ANSYS stress study. Upper-corner concentrations informed geometry and fillet changes. Original legend and scale retained."
      },
      {
        "src": "media/lightweight-bridge/iteration-2-stress.webp",
        "caption": "Iteration 2 ANSYS stress study. Simplified vertical loading did not fully represent the lateral instability later observed in testing. Original legend and scale retained."
      },
      {
        "src": "media/lightweight-bridge/iteration-3-stress.webp",
        "caption": "Iteration 3 ANSYS stress study following cross-section and cross-beam-spacing changes. The report describes reduced cross-beam stress concentration. Original legend and scale retained."
      },
      {
        "src": "media/lightweight-bridge/printed-bridge.webp",
        "caption": "Physical printed bridge from the final iteration. The report documents side-oriented FDM printing and manually designed supports."
      },
      {
        "src": "media/lightweight-bridge/overhang-detail.webp",
        "caption": "Close-up of the printed overhang. Fraying and local sagging show the tradeoff between support material and surface quality; the report states the main load-bearing walls remained intact."
      }
    ],
    "results": {
      "caption": "Design progression — earlier iteration values and costs from the project report; final mass updated to 11.7 g.",
      "headers": [
        "Iteration",
        "Mass (g)",
        "Cost (USD)"
      ],
      "rows": [
        [
          "1",
          "52",
          "$13.24"
        ],
        [
          "1.5",
          "17",
          "$7.86"
        ],
        [
          "2",
          "12.3",
          "$5.92"
        ],
        [
          "3 · final",
          "11.7",
          "$4.46"
        ]
      ],
      "note": "The final design improved lateral rigidity while reducing bridge mass to 11.7 g and maintaining structural integrity under the required 20 lb load."
    },
    "videos": [
      {
        "src": "media/lightweight-bridge/load-test.mp4",
        "poster": "media/lightweight-bridge/load-test-poster.jpg",
        "title": "Bridge load test",
        "caption": "The physical 3D-printed bridge carrying a stack of weights in the course load-test fixture."
      }
    ],
    "videoHeading": "Load-test footage"
  },
  {
    "id": "robot-kinematics",
    "number": "09",
    "title": "Robot Kinematics & Singularity Analysis",
    "category": "Robotics / MATLAB analysis",
    "filters": [
      "robotics",
      "mechanical"
    ],
    "summary": "Comparing 3-DOF and 4-DOF robot architectures through inverse kinematics, continuous-path checks and link-length optimization.",
    "description": "A MATLAB study of planar RPR and PRRR manipulators: reaching three prescribed poses, maintaining continuous motion and evaluating the tradeoff between added mobility and mechanical complexity.",
    "tags": [
      "MATLAB",
      "Inverse kinematics",
      "Jacobians",
      "Singularity analysis",
      "Parameter studies"
    ],
    "image": "media/robot-kinematics/prrr-configurations-hd.png",
    "imageCaption": "4-DOF PRRR robot configurations at targets T1, T2 and T3. Original MATLAB simulation plot from the project report.",
    "repo": null,
    "video": null,
    "photos": [
      {
        "src": "media/robot-kinematics/rpr-configurations-hd.png",
        "caption": "3-DOF RPR configurations at the three target poses. R denotes a revolute joint; P denotes a prismatic joint. Original MATLAB plot from the report."
      },
      {
        "src": "media/robot-kinematics/rpr-continuous-path.webp",
        "caption": "RPR joint angles and prismatic extension along the sampled path. The original curves, axes and legends are preserved; no abrupt configuration switches appear in the plotted samples."
      },
      {
        "src": "media/robot-kinematics/prrr-continuous-path.webp",
        "caption": "PRRR joint angles and sliding-base position along the sampled path. The changing base position adds flexibility, with steeper variations than the RPR trajectory in this example."
      },
      {
        "src": "media/robot-kinematics/rpr-parameter-study.webp",
        "caption": "RPR link-length study: reachability, minimum and average manipulability, and maximum condition number versus L3. Full reachability is prioritized before comparing conditioning."
      },
      {
        "src": "media/robot-kinematics/prrr-reachability-study.webp",
        "caption": "PRRR reachability heat map for varying L3 and L4 with L2 fixed at 0.5 m. The original red circle marks the selected L3 = 0.5 m, L4 = 0.2 m combination."
      },
      {
        "src": "media/robot-kinematics/rpr-inverse-kinematics.webp",
        "caption": "RPR inverse-kinematics derivation: work backward from the target pose to locate the wrist, then solve the base rotation, extension and final joint angle."
      },
      {
        "src": "media/robot-kinematics/prrr-inverse-kinematics.webp",
        "caption": "PRRR inverse-kinematics derivation: choose the sliding-base position, solve the two-link arm geometry, then recover the final wrist orientation."
      }
    ],
    "meta": "3 vs 4 DOF · MATLAB · Kinematic simulation",
    "overviewHeading": "Does another joint improve the design?",
    "overview": "I compared a three-degree-of-freedom RPR robot with a four-degree-of-freedom PRRR robot for a prescribed planar positioning task. Each architecture had to reach three end-effector poses and move continuously between them without encountering a singularity in the evaluated path. I derived inverse and forward kinematics, built Jacobian-based performance checks, and studied how link lengths affected reachability and conditioning. Both designs reached the targets with negligible calculated pose error. For this task, I selected the simpler RPR architecture: it offered smoother joint motion, higher average manipulability and a lower maximum condition number. The PRRR architecture improved the weakest-point manipulability, but its additional degree of freedom was not necessary for the specified motion.",
    "contributionHeading": "What I developed",
    "contributions": [
      "Derived inverse and forward kinematics for planar RPR and PRRR robot geometries.",
      "Used forward-kinematics reconstruction to check the inverse-kinematics solutions against each target pose.",
      "Derived Jacobians and evaluated manipulability, minimum singular value and condition number.",
      "Sampled each path segment at 60 points to inspect joint-variable continuity and possible configuration switches.",
      "Swept link lengths and compared feasible architectures before selecting a design for the task."
    ],
    "specs": [
      [
        "Project",
        "Robotics final project · May 2026"
      ],
      [
        "Architectures",
        "RPR · 3 DOF / PRRR · 4 DOF"
      ],
      [
        "Target T1",
        "(0.20 m, 0.20 m, 60°)"
      ],
      [
        "Target T2",
        "(1.00 m, 0.80 m, 125°)"
      ],
      [
        "Target T3",
        "(1.80 m, 0.50 m, −45°)"
      ],
      [
        "Path sampling",
        "60 points per segment"
      ],
      [
        "Analysis tool",
        "MATLAB"
      ],
      [
        "Preferred architecture",
        "RPR for this task"
      ]
    ],
    "process": [
      [
        "Define the task and geometry",
        "Set the target positions and orientations, joint limits and above-ground workspace. Compare a rotating–sliding–rotating chain with a sliding base carrying a three-revolute-joint arm."
      ],
      [
        "Solve and validate each pose",
        "Use inverse kinematics to recover joint variables from the desired end-effector pose. Reconstruct the pose with forward kinematics and calculate the residual error."
      ],
      [
        "Evaluate local motion capability",
        "Form the Jacobian from partial derivatives of the forward-kinematics equations. Use singular-value decomposition, manipulability and condition number to examine loss of motion capability and proximity to singular configurations."
      ],
      [
        "Check the path between targets",
        "Interpolate between target poses and solve the kinematics at 60 points per segment. Inspect the joint curves for abrupt jumps or changes of solution branch."
      ],
      [
        "Study link lengths and choose an architecture",
        "Vary RPR link L3, then vary PRRR links L3 and L4 with L2 fixed. Prioritize full reachability and compare performance only among feasible configurations."
      ]
    ],
    "technicalNote": "This is a kinematic simulation study, with a massless-system assumption; it does not establish actuator loads, physical tracking accuracy or dynamic stability. The comparison below uses the report’s architecture-comparison table. Pose residuals are numerical checks, not physical measurements, and the Jacobian metrics depend on the coordinate and unit conventions used in the study. Continuity and singularity conclusions apply to the evaluated samples.",
    "results": {
      "heading": "Architecture comparison",
      "caption": "Reported MATLAB study results for the specified task — architecture-comparison table, report page 11.",
      "headers": [
        "Metric",
        "RPR · 3 DOF",
        "PRRR · 4 DOF"
      ],
      "rows": [
        [
          "Target reachability",
          "100%",
          "100%"
        ],
        [
          "Average manipulability",
          "1.1044",
          "0.6732"
        ],
        [
          "Minimum manipulability",
          "0.1880",
          "0.2254"
        ],
        [
          "Maximum condition number",
          "11.02",
          "14.85"
        ],
        [
          "Joint-path continuity",
          "Very smooth",
          "Smooth"
        ],
        [
          "Architecture complexity",
          "Low",
          "High"
        ]
      ],
      "note": "RPR was selected for this task. PRRR’s higher minimum manipulability improved its weakest evaluated configuration, but the additional mobility did not outweigh its complexity for these targets."
    },
    "figuresHeading": "Trajectory & parameter studies",
    "figuresAriaLabel": "Robot kinematics study figures",
    "figures": [
      {
        "src": "media/robot-kinematics/rpr-continuous-path.webp",
        "caption": "RPR joint angles and prismatic extension along the sampled path. The original curves, axes and legends are preserved; no abrupt configuration switches appear in the plotted samples."
      },
      {
        "src": "media/robot-kinematics/prrr-continuous-path.webp",
        "caption": "PRRR joint angles and sliding-base position along the sampled path. The changing base position adds flexibility, with steeper variations than the RPR trajectory in this example."
      },
      {
        "src": "media/robot-kinematics/rpr-parameter-study.webp",
        "caption": "RPR link-length study: reachability, minimum and average manipulability, and maximum condition number versus L3. Full reachability is prioritized before comparing conditioning."
      },
      {
        "src": "media/robot-kinematics/prrr-reachability-study.webp",
        "caption": "PRRR reachability heat map for varying L3 and L4 with L2 fixed at 0.5 m. The original red circle marks the selected L3 = 0.5 m, L4 = 0.2 m combination."
      }
    ],
    "mediaTabLabel": "Study figures",
    "mediaHeading": "Derivations, configurations & results",
    "mediaIntro": "Selected original figures from the robotics report, presented with individual explanations. R and P denote revolute and prismatic joints. Select any image to enlarge; the plotted data, axes and legends are unchanged.",
    "nextHeading": "Design takeaway",
    "next": "More degrees of freedom provide more configuration choices, but the task should determine whether that flexibility is worth the added complexity. Obstacle-aware motion planning would be a useful extension for testing where the PRRR architecture’s extra freedom becomes valuable."
  },
  {
    "id": "construction-equipment",
    "number": "10",
    "title": "Construction Management & Equipment Repair",
    "category": "Work experience / construction & equipment",
    "filters": [
      "experience",
      "mechanical"
    ],
    "summary": "Managing site work and keeping heavy equipment working through operation, maintenance and hands-on mechanical repair.",
    "description": "Construction Manager at Wenzel Inc., combining day-to-day crew and site coordination with heavy-equipment operation, preventive maintenance and mechanical troubleshooting.",
    "tags": [
      "Construction management",
      "Equipment operation",
      "Mechanical troubleshooting",
      "Maintenance",
      "Team coordination"
    ],
    "image": "media/construction-equipment/engine-bay-maintenance.jpg",
    "imageCaption": "Hands-on engine-bay maintenance on construction equipment, showing the accessible hoses, filters, wiring and engine components.",
    "repo": null,
    "video": null,
    "photos": [
      {
        "src": "media/construction-equipment/finished-walls-steps.jpg",
        "caption": "Completed site work with retaining walls, stone steps, paved walkways and landscaped planting beds."
      },
      {
        "src": "media/construction-equipment/hydraulic-breaker-site-work.jpg",
        "caption": "CAT hydraulic-breaker attachment and broken concrete during demolition and site preparation."
      },
      {
        "src": "media/construction-equipment/loader-operation.svg",
        "caption": "Operating a loader in the main yard."
      }
    ],
    "meta": "Wenzel Inc. · May 2024 – Sep 2026 · Field experience",
    "overviewHeading": "Practical engineering, on site and under the hood",
    "overview": "As a Construction Manager at Wenzel Inc., I coordinated daily work, equipment use and on-site problem solving across construction and site-development jobs. Alongside managing the work, I operated and maintained heavy machinery, including CAT equipment, and carried out mechanical troubleshooting, preventive maintenance and major repairs such as engine-component replacement. That combination connected planning with the practical demands of getting a job done: organizing a crew, keeping equipment available and responding when mechanical problems interrupted the work. The photographs show finished walls and steps, concrete-removal work, engine-bay maintenance and my view while operating a loader.",
    "contributionHeading": "My responsibilities",
    "contributions": [
      "Coordinated day-to-day work, crew activities and equipment use across construction and site-development projects.",
      "Operated heavy equipment and handled practical on-site problem solving.",
      "Performed preventive maintenance and mechanical troubleshooting on construction machinery.",
      "Carried out hands-on repairs, including engine-component replacement, to support reliable equipment operation."
    ],
    "specs": [
      [
        "Employer",
        "Wenzel Inc."
      ],
      [
        "Role",
        "Construction Manager"
      ],
      [
        "Period",
        "May 2024 – September 2026"
      ],
      [
        "Location",
        "Millis, Massachusetts"
      ],
      [
        "Site work",
        "Construction · site development"
      ],
      [
        "Equipment experience",
        "Operation · maintenance · repair"
      ],
      [
        "Photo documentation",
        "Finished work · demolition · loader operation"
      ],
      [
        "Repair documentation",
        "Engine-bay photograph and video"
      ]
    ],
    "processHeading": "How I approached the work",
    "process": [
      [
        "Coordinate the day’s work",
        "Organize crew activities and equipment use around the work that needs to be completed, adapting as site conditions change."
      ],
      [
        "Operate and maintain equipment",
        "Combine machinery operation with preventive maintenance and attention to mechanical condition."
      ],
      [
        "Troubleshoot interruptions",
        "Investigate equipment problems and carry out maintenance or component repairs to help return machinery to service."
      ],
      [
        "Connect planning to the finished result",
        "Keep day-to-day coordination and practical problem solving focused on completing the site work efficiently and meeting client expectations."
      ]
    ],
    "technicalNote": "The role description follows my résumé. The site photographs document finished hardscape work and concrete removal; the loader image documents equipment operation. The engine photograph and short video show maintenance and repair activity, without claiming a specific diagnosis, repair specification or measured post-repair performance.",
    "nextHeading": "What this experience taught me",
    "next": "Reliable equipment and clear coordination matter as much as the plan on paper. Working directly with machinery strengthened my mechanical troubleshooting, maintenance habits and ability to solve practical problems while keeping a team’s work moving.",
    "mediaTabLabel": "Sites & machinery",
    "mediaGroups": [
      {
        "title": "Site work & equipment operation",
        "description": "Finished installation details, site preparation and a view from the loader cab.",
        "photos": [
          {
            "src": "media/construction-equipment/finished-walls-steps.jpg",
            "caption": "Completed site work with retaining walls, stone steps, paved walkways and landscaped planting beds."
          },
          {
            "src": "media/construction-equipment/hydraulic-breaker-site-work.jpg",
            "caption": "CAT hydraulic-breaker attachment and broken concrete during demolition and site preparation."
          },
          {
            "src": "media/construction-equipment/loader-operation.svg",
            "caption": "Operating a loader in the main yard."
          }
        ]
      },
      {
        "title": "Equipment maintenance & repair",
        "description": "Hands-on mechanical work with the engine bay open, documented in the photograph and short video.",
        "photos": [
          {
            "src": "media/construction-equipment/engine-bay-maintenance.jpg",
            "caption": "Hands-on engine-bay maintenance on construction equipment, showing the accessible hoses, filters, wiring and engine components."
          }
        ],
        "videos": [
          {
            "src": "media/construction-equipment/equipment-repair.mp4",
            "poster": "media/construction-equipment/equipment-repair-poster.jpg",
            "title": "Engine-bay repair work",
            "caption": "A close view of hands-on work around the engine bay, including a removed component and the surrounding filters and connections."
          }
        ],
        "videoHeading": "Equipment repair footage"
      }
    ]
  }
];
