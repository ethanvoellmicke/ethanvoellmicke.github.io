# Ethan Voellmicke — Engineering Portfolio

A responsive, interactive portfolio for mechanical engineering, robotics, and embedded systems.

## Website features

- Five filterable project cards with individual detail views
- Accessible project tabs, keyboard navigation, and deep links
- Expandable CAD images and an electrical schematic with zoom controls
- Responsive desktop and mobile layouts
- Ready for project videos, photos, and repository links

The quadruped project links to the existing [quadruped-robot repository](https://github.com/ethanvoellmicke/quadruped-robot), which remains the home for its source code.

## Publish with GitHub Pages

Open this repository's **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.

Once GitHub completes deployment, the website will be at:
https://ethanvoellmicke.github.io/Ethan-Voellmicke-Porfolio/

## Update the portfolio

See [EDITING.md](EDITING.md) for adding photos, videos, files, and project descriptions. No package installation or build step is required.

## File map

- `index.html` — homepage structure
- `style.css` — responsive visual design
- `projects.js` — project text, media paths, and links
- `app.js` — filters, project views, tabs, and image viewer
- `assets/` — schematic and shared graphics
- `media/` — future project photos and videos

The quadruped CAD image is loaded from the user's existing robot repository. The other project illustrations are schematic-style graphics, not photographs of the builds.
