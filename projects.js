/* Edit project text and media here. See EDITING.md for examples. */
window.PORTFOLIO_PROJECTS = [
 {id:"quadruped",number:"01",title:"12-DOF Quadruped Robot",category:"Robotics / embedded control",filters:["robotics","embedded"],summary:"A custom four-legged robot, from mechanical design to coordinated motion.",description:"An independently designed and built quadruped integrating custom mechanical hardware, twelve servo-driven joints, Arduino/C++ control, and ROS 2 visualization.",tags:["SOLIDWORKS","C++","Arduino","ROS 2","Inverse kinematics","IMU"],image:"https://raw.githubusercontent.com/ethanvoellmicke/quadruped-robot/main/QR-RobotCAD.png",imageCaption:"SOLIDWORKS assembly",repo:"https://github.com/ethanvoellmicke/quadruped-robot",video:null,photos:[],meta:"12 joints · Custom hardware · IMU feedback",overview:"I designed, manufactured, and programmed the robot to connect custom mechanical hardware with embedded motion control. The build combines servo-driven mechanisms, foot trajectories, analytical inverse kinematics, and roll/pitch feedback in one modular system.",contributions:["Designed the mechanical structure in SOLIDWORKS and manufactured custom 3D-printed components.","Integrated twelve servo-driven joints, power distribution, a PCA9685 PWM driver, and an MPU6050 IMU.","Developed foot trajectories, coordinated gait timing, individual servo calibration, and IMU-based body corrections.","Built related ROS 2 / RViz visualization and a serial / Wi-Fi command interface."],specs:[["Actuation","4 legs · 3 joints per leg"],["Controller","Arduino Nano / C++"],["Motion","Foot trajectories + planar hip/knee IK"],["Sensing","MPU6050 orientation feedback"],["Power","8.4 V battery · regulated 5 V electronics"],["Visualization","ROS 2 / RViz"]],process:[["Receive commands","Serial and Wi-Fi UDP commands select motion modes and update settings."],["Generate motion","A nominal 20 ms scheduler coordinates leg phases and desired foot trajectories."],["Adjust body posture","Feedforward shifts prepare leg liftoff; IMU measurements inform bounded roll and pitch corrections."],["Solve joint angles","Two-link analytical inverse kinematics converts planar foot targets to hip and knee angles. Shoulder control is handled separately."],["Drive calibrated servos","Per-servo neutral offsets, direction, limits, and linkage compensation translate joint requests into PCA9685 PWM outputs."]],technicalNote:"The supplied firmware includes stand, crawl, and trot modes. Roll and pitch feedback are disabled during trot in the supplied controller. Gait tuning and physical testing are ongoing; no measured terrain or speed claims are implied.",next:"Continue physical gait tuning and document stabilization response. An onboard camera and machine-learning-based perception are planned future work.",wiring:"assets/quadruped-wiring.svg"},
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
  "id": "drone",
  "number": "03",
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
  "next": "Add flight footage and details of the final competition configuration.",
  "award": {
    "title": "2nd place",
    "event": "2025 ASME IAM3D Competition",
    "detail": "UMass Amherst ASME design team · EFx SLU · St. Louis, Missouri",
    "src": "media/drone/second-place-trophy.png",
    "caption": "Second-place trophy — 2025 ASME IAM3D Competition at EFx SLU, April 25–26, 2025, St. Louis, Missouri."
  }
},
 {
  "id": "robotic-car",
  "number": "04",
  "title": "Classroom Robotic Car",
  "category": "Vehicle / class project",
  "filters": [
    "vehicles",
    "embedded"
  ],
  "summary": "A classroom-built car that turns programmed behavior into motion.",
  "description": "A mobile car built for a class project, combining hardware integration and programmed driving behavior.",
  "tags": [
    "Mobile robotics",
    "Embedded programming",
    "Class project"
  ],
  "image": "media/robotic-car/car-cover.svg",
  "repo": null,
  "video": null,
  "photos": [],
  "meta": "Mobile platform · Driving behavior · Hardware integration",
  "art": "car",
  "overview": "Built as part of a class project, this mobile car combines a wheeled chassis, onboard electronics, and programmed driving behavior. The build photograph shows the assembled hardware, and the demonstration video captures the car in motion.",
  "contributions": [
    "Built a working mobile car for a class project.",
    "Integrated the vehicle hardware with programmed driving behavior."
  ],
  "specs": [
    [
      "Platform",
      "Classroom mobile car"
    ],
    [
      "Behavior",
      "Programmed driving"
    ],
    [
      "Documentation",
      "Build photograph and working driving demonstration"
    ]
  ],
  "process": null,
  "next": "Add the control code, hardware specifications, and a description of the driving behavior.",
  "technicalNote": "The driving video documents the physical car in operation. Control code, sensor configuration, and detailed driving behavior will be documented with the project files.",
  "imageCaption": "Classroom robotic car with its wheeled chassis, onboard electronics, and front-mounted ultrasonic sensor.",
  "videos": [
    {
      "src": "media/robotic-car/driving-demo.mp4",
      "poster": "media/robotic-car/driving-poster.jpg",
      "title": "Driving test",
      "caption": "The car driving across the floor during a working demonstration."
    }
  ]
},
 {id:"i2c-arm",number:"05",title:"Dual-Arduino I²C Robotic Arm",category:"Mechatronics / embedded feedback control",filters:["robotics","embedded"],summary:"A two-joint arm with distributed position control, encoder feedback, and coordinated motion over I²C.",description:"A two-joint robotic arm combining two Arduino Nano RP2040 controllers, encoder-based position feedback, and I²C communication to support manual control, automatic sweeps, and arm-tip height compensation.",tags:["Arduino Nano RP2040","C++","I²C","P control","Encoder feedback","H-bridge"],image:"media/i2c-arm/arm-cover.png",imageCaption:"Two-joint robotic arm with dual Arduino Nano RP2040 control and breadboard electronics",repo:"https://github.com/ethanvoellmicke/ethanvoellmicke.github.io/tree/main/media/i2c-arm",video:"https://drive.google.com/file/d/1nS1gmgqmsx6ruByhB7dr1WH9augSv4oT/view",photos:[],meta:"2 Nano RP2040 boards · I²C · 3 control modes",art:"i2c",overview:"This project explores how two independently controlled joints can work together as one robotic arm. Each Arduino Nano RP2040 reads a joint encoder and drives a geared DC motor through an L293D H-bridge, using proportional feedback to reduce position error. A leader–follower I²C link coordinates the operating modes and exchanges position data. Manual mode follows potentiometer inputs, automatic mode sweeps the joints through changing references, and stabilize mode calculates an upper-joint reference to compensate for lower-joint motion. Performance is evaluated by comparing measured joint angles with their references across all three modes.",contributionHeading:"Engineering highlights",contributions:["Distributed joint control using two Arduino Nano RP2040 boards, with an I²C follower at address 8.","Encoder-based proportional position control with direction selection, bounded PWM output, and joint-specific deadbands.","Three motion modes: manual potentiometer tracking, automated joint sweeps, and geometry-based arm-tip height compensation.","Serial mode selection and a stop/reset command; the leader disables motor drive and sends a reset flag to the follower.","Reference-versus-measured position logging for evaluating tracking behavior across the three operating modes."],specs:[["Architecture","2 × Arduino Nano RP2040"],["Actuation","2 geared DC motors · L293D H-bridges"],["Sensing","2 encoders · 2 potentiometers"],["Feedback","Proportional control + position deadband"],["Communications","I²C leader / follower · address 8"],["Modes","Manual · Auto sweep · Stabilize"],["Stop / reset","Serial x command · leader drive off / follower reset"]],process:[["Read position","Encoder A/B rising-edge interrupts update joint counts; a 50:1 gearbox and 14 pulses per revolution convert those counts into estimated motor angles."],["Compute position error","Each controller compares its measured angle with a local or communicated reference and selects the shortest rotational error."],["Drive the motors","P-control commands L293D direction and PWM output, with 0.5° leader and 0.8° follower deadbands in the supplied firmware."],["Exchange I²C messages","The leader transmits mode flags and requests the follower encoder count for inter-joint coordination."],["Switch operating modes","Manual follows potentiometers; auto sweep cycles target angles; stabilize computes a compensating upper-joint angle from lower-joint motion."],["Stop and reset","The serial x command disables the leader motor drive and resets the follower position reference. The follower continues its position-control loop; this is not a latched shutdown of both motors."]],plots:[{"src":"media/i2c-arm/plots/manual-arm1.svg","mode":"manual","modeLabel":"Manual","arm":1,"title":"Arm 1","error":"8.86°","caption":"Measured position follows the potentiometer reference through changes in the target angle, with visible offsets during several held positions.","alt":"Manual mode, Arm 1: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."},{"src":"media/i2c-arm/plots/manual-arm2.svg","mode":"manual","modeLabel":"Manual","arm":2,"title":"Arm 2","error":"2.303°","caption":"Measured position tracks a sequence of manually selected reference angles. Differences are most visible around the larger changes in reference.","alt":"Manual mode, Arm 2: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."},{"src":"media/i2c-arm/plots/auto-sweep-arm1.svg","mode":"sweep","modeLabel":"Auto sweep","arm":1,"title":"Arm 1","error":"14.4°","caption":"A repeating sweep reference tests continuous tracking. The measured response follows the triangular pattern, with lag and reduced travel near the reversals.","alt":"Auto sweep mode, Arm 1: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."},{"src":"media/i2c-arm/plots/auto-sweep-arm2.svg","mode":"sweep","modeLabel":"Auto sweep","arm":2,"title":"Arm 2","error":"31.86°","caption":"The measured response follows the repeating sweep, with flatter upper and lower turning points than the reference trace.","alt":"Auto sweep mode, Arm 2: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."},{"src":"media/i2c-arm/plots/stabilize-arm1.svg","mode":"stabilize","modeLabel":"Stabilize","arm":1,"title":"Arm 1","error":"≈14.71°","caption":"The measured angle follows the changing stabilization reference, with visible lag and offsets at the positive and negative plateaus.","alt":"Stabilize mode, Arm 1: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."},{"src":"media/i2c-arm/plots/stabilize-arm2.svg","mode":"stabilize","modeLabel":"Stabilize","arm":2,"title":"Arm 2","error":"≈6.29°","caption":"Measured position follows the reference during the stabilization test, with lag during transitions and differences near the high and low plateaus.","alt":"Stabilize mode, Arm 2: original plot of position in degrees versus time, comparing the blue reference trace with red measured motor position."}],results:{caption:"Reported average angular tracking error",headers:["Operating mode","Arm 1","Arm 2"],rows:[["Manual","8.86°","2.303°"],["Auto sweep","14.4°","31.86°"],["Stabilize","≈14.71°","≈6.29°"]],note:"Values compare motor position with its reference during the tests documented in the mechatronics report. Stabilize values are approximate. These results describe angular tracking error, not arm-tip position error."},technicalNote:"Leader and follower firmware are linked below. The results table summarizes the reported position-tracking tests across the three operating modes. Project contributors: Ethan Voellmicke, Aidan Hamblin, and Eli Rusch.",next:"Potential improvements: refine proportional gains and reference synchronization; characterize overshoot, settling time, and stabilization across more test conditions.",resources:[{label:"Leader Arduino firmware",url:"https://github.com/ethanvoellmicke/ethanvoellmicke.github.io/blob/main/media/i2c-arm/FinalProjectCodeLeader.ino"},{label:"Follower Arduino firmware",url:"https://github.com/ethanvoellmicke/ethanvoellmicke.github.io/blob/main/media/i2c-arm/FinalProjectCodeFollower.ino"}]},
 {id:"senior-design",number:"06",title:"RTX Senior Design — Pressure Relief System",category:"Senior capstone / sponsor: Raytheon (RTX)",filters:["mechanical"],summary:"Design lead for a modular, passive pressure-relief system engineered for the AN/TPY-2 radar enclosure.",description:"Yearlong UMass Amherst senior capstone, Team 1406: custom bidirectional pressure-relief valve, windbreaker, and removable hydrophobic filter developed for Raytheon/RTX.",tags:["SOLIDWORKS","Mechanical design","Engineering drawings","Fluid flow","Prototyping","Machining","RTX"],image:"media/senior-design/valve-exploded-cad.svg",imageCaption:"Exploded CAD assembly showing the valve, spring mechanism, removable filter housing and windbreaker",repo:"https://github.com/ethanvoellmicke/ethanvoellmicke.github.io/tree/main/media/senior-design",video:null,photos:[{"src":"media/senior-design/filter-housing-cutaway.svg","caption":"Transparent CAD view of the filter housing and removable cartridge in the modular assembly"},{"src":"media/senior-design/valve-internal-cutaway.svg","caption":"Transparent CAD view of the spring-loaded, bidirectional pressure-relief valve internals"},{"src":"media/senior-design/valve-assembly-render.svg","caption":"Rendered close-up showing the assembled valve and metallic component finishes"},{"src":"media/senior-design/showcase-poster.webp","caption":"UMass Amherst Team 1406 spring showcase poster covering the system, prototypes and test results"},{"src":"media/senior-design/valve-engineering-drawings.jpg","caption":"Valve components and engineering drawings from the capstone design report"},{"src":"media/senior-design/windbreaker-filter-drawings.jpg","caption":"Windbreaker and filter housing designs and engineering drawings from the capstone report"}],mediaHeading:"CAD designs, valve internals & drawings",mediaIntro:"Explore the exploded assembly, transparent cutaways, and rendered valve alongside the original component drawings and showcase poster. Click any image to enlarge.",meta:"Design Lead · RTX sponsor · SOLIDWORKS",overview:"As Design Lead for Team 1406, I developed and iterated the SOLIDWORKS models and engineering drawings for a passive pressure-relief system sponsored by Raytheon/RTX. The goal was to prevent damaging pressure differentials during aerial transport while maintaining weatherproofing. The concept integrates three serviceable stages: an external perforated windbreaker, a removable hydrophobic filtration module, and a spring-loaded bidirectional relief valve. Our team progressed through CAD iterations, 3D-printed fit checks, fabrication and performance evaluation.",contributionHeading:"My work as Design Lead",contributions:["Created and iterated the full pressure-relief assembly and individual component designs in SOLIDWORKS, working through manufacturability and fitment constraints.","Prepared engineering drawings for the windbreaker, filter housing and spacers, funnel, valve body, support plates, shaft, and valve plates.","Worked closely with the fabrication lead to refine designs for available machining processes and assembly.","Performed early SOLIDWORKS flow-simulation work and researched relevant engineering requirements and standards.","Produced 3D-printed prototype components for design reviews and assisted with machining the final design.","Coordinated mechanical design decisions across the team as the prototype developed."],specs:[["Project","UMass MIE 414 · Team 1406"],["Sponsor","Raytheon Missiles & Defense (RTX)"],["Role","Mechanical Design Lead"],["Function","Passive two-way pressure equalization"],["Architecture","Windbreaker · removable filter · valve"],["Materials","6061 aluminum · prototype printed components"],["Design software","SOLIDWORKS + early flow simulation"],["Evaluation","Airflow · pressure differential · debris/water filtration"]],process:[["Set design constraints","Fit within the existing access-panel geometry, require no power or operator action, and maintain weather and debris protection."],["Generate valve concepts","Evaluate low-pressure high-flow options, including an initial butterfly concept and a bidirectional spring-loaded plate valve."],["Design modular construction","Create a perforated windbreaker, serviceable hydrophobic filter cartridge, and spring-loaded valve assembly with separable machined components."],["Detail parts for manufacturing","Refine tolerances and interfaces in SOLIDWORKS and prepare dimensioned drawings for each part and the assembled system."],["Prototype and fabricate","Use 3D prints for fit/alignment checks and a combination of machined aluminum, printed components, springs and gaskets for functional prototypes."],["Evaluate performance","Compare flow-rate and pressure-differential behavior with design targets and assess water/debris sealing; summarize results on the project poster."]],technicalNote:"The spring showcase poster reports a 0.055 psi modeled stacked pressure differential and documents component testing, including flow rates, spring configurations, and filter performance. The poster also notes improvement opportunities for drainage, gasket materials, and valve-seal tolerances. These are team-reported results, not a claim of independently certified compliance. Team members: Lucca Garcia, Aidan Hamblin, Ethan Gattoni, Ethan Voellmicke, and Katie Barberi.",next:"Preserve the CAD design history and document the fabricated prototype, validation data, and remaining sealing and drainage improvements.",resources:[{label:"Full showcase poster (image)",url:"https://raw.githubusercontent.com/ethanvoellmicke/ethanvoellmicke.github.io/main/media/senior-design/showcase-poster.webp"},{label:"Selected valve engineering drawings",url:"https://raw.githubusercontent.com/ethanvoellmicke/ethanvoellmicke.github.io/main/media/senior-design/valve-engineering-drawings.jpg"},{label:"Windbreaker and filter drawings",url:"https://raw.githubusercontent.com/ethanvoellmicke/ethanvoellmicke.github.io/main/media/senior-design/windbreaker-filter-drawings.jpg"}]}
];