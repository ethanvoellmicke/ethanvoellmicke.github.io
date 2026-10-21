# Robot Kinematics & Singularity Analysis

Source: Ethan Voellmicke, Robotics Final Project (6).pdf, May 11, 2026. The PDF is used as a writing and figure reference and is not published.
This is a MATLAB kinematic simulation study, not a physical robot demonstration. RPR and PRRR denote revolute/prismatic joint sequences.

## Figures
Eight original embedded images were extracted and converted to lossless WebP. Only solid black screenshot-footer rows were removed from four images; plotted curves, axes, legends, original annotations and dimensions were unchanged. Decoded output pixels were compared exactly with their extracted/cropped sources.
- prrr-configurations: page 8, xref 38 (11 footer rows removed).
- rpr-configurations: page 7, xref 30 (21 footer rows removed).
- rpr-continuous-path: page 7, xref 34 (18 footer rows removed).
- prrr-continuous-path: page 9, xref 44 (18 footer rows removed).
- rpr-parameter-study: page 9, xref 46.
- prrr-reachability-study: page 10, xref 51.
- rpr-inverse-kinematics: page 3, xref 14.
- prrr-inverse-kinematics: page 4, xref 18.

## Results and interpretation
The comparison uses the page 11 architecture-comparison table: RPR average/minimum manipulability 1.1044/0.1880 and max condition number 11.02; PRRR 0.6732/0.2254 and 14.85. Both have 100% target reachability. The adjacent narrative contains an inconsistent RPR average (1.144); the table and parameter summary agree on 1.1044 and are used instead.
The PRRR geometry/results sections give inconsistent L4 examples; the parameter-study caption explicitly identifies its selected L3=0.5 m and L4=0.2 m, rather than claiming all figures use the same geometry. Jacobian quantities retain the report's conventions. No physically measured accuracy, dynamics, obstacle avoidance or code availability is invented.

## Higher-resolution configuration plots
The portfolio now uses the original uploaded PNGs for both configuration plots, replacing the small PDF extractions. No resizing, cropping or pixel edits were applied.
- rpr-configurations-hd.png: image(20261021-120542).png, 2048 × 1523.
- prrr-configurations-hd.png: image(20261021-120600).png, 2047 × 1389. Used on the project card, overview cover and study gallery.
The original report extractions remain in repository history/assets for provenance; the live project references the higher-resolution replacements.
