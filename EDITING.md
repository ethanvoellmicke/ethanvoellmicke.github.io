# Updating your portfolio

All project content is in **projects.js**. You can edit it directly on GitHub using the pencil button. Commit changes to main; when GitHub Pages is enabled, it republishes automatically.

## Add photos

Upload a photo into a project's folder under media/. For example:

`media/quadruped/robot-photo.jpg`

In the quadruped entry in projects.js, change:

`image: "media/quadruped/robot-photo.jpg"`

and set `imageCaption` to a short accurate description. The homepage featured CAD panel is separate: change its image and data-image URLs in index.html if you want to replace it with a build photo.

For additional images, set photos to an array:

```js
photos: [
  {src: "media/quadruped/side-view.jpg", caption: "Assembled robot — side view"},
  {src: "media/quadruped/electronics.jpg", caption: "Power distribution and controller wiring"}
]
```

The Photos & video tab automatically displays them with click-to-expand controls.

## Add a video

Each project has `video: null`. Replace null with a quoted path or URL:

```js
video: "media/quadruped/walking.mp4"
```

MP4 and WebM files play in the project view. For a YouTube or other external video, use the full URL instead; the project view displays a working “Watch the project video” link.

Keep large videos on a video hosting service instead of committing them to GitHub. Do not add a pretend play button; use the actual footage.

## Add a project repository

Replace `repo: null` with the actual repository URL. A source link appears in the project details.

The quadruped repository is already connected. Keep firmware and ROS 2 code in that dedicated repository; the portfolio links to it.

## Update project details

Edit summary, description, overview, contributions, specs, process, technicalNote, and next. The card filters use each project's filters array: robotics, embedded, or vehicles. Make sure JavaScript commas, quotes, and brackets remain valid.

Drone and classroom car details are intentionally brief until their source material is provided.

## Edit the wiring schematic

The editable vector drawing is `assets/quadruped-wiring.svg`. Open it in Inkscape or another SVG editor, update it, and commit the revised file.

## Add supporting files

Upload CAD exports, wiring diagrams, or other documentation into the relevant project's media/ folder. Add a normal HTML link in the relevant project panel in app.js if a file should be downloadable. Never add Wi-Fi passwords or other credentials.

## Local preview

Serve the repository with any static HTTP server, for example `python3 -m http.server 8000`, and open http://localhost:8000. No build tools or dependencies are needed.
