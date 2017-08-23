# Psychedelic
Add a psychedelic background to any div of your choosing.

# Setup
- Include psychedelic.js in your project
- Call dropAcid(containerID, [options]) after the DOM is loaded
- Sit back and relax... Groovey man.

# Options

| Option | Default |  |
| --- | --- | --- |
| height | Container height | Will default to window height if container height is 0 |
| width | Container width | Will default to window width if container width is 0 |
| colors | ["100,0,0","0,100,0","0,0,100"] | Array of RGB values for the colors. |
| opacity | 0.15 | Opacity of the particles |
| minSpeed | 2 | Minimum speed of particles in pixels per cycle |
| maxSpeed | 6 | Maximum speed of particles in pixels per cycle |
| particleCount | 50 | Number of particles to generate |
| particleRadius | 800 | Radius of the particles |
| avoidMouse | false | Will particles push away from the mouse? |
| repelBuffer | 20 | (unused unless avoidMouse is true) Adjust to smooth mouse effects |
| repelDistance | particleRadius | How far from the center of each particle should the mouse be pushed |
| defaultMouseX | half the width | Where the particles avoid when the mouse is off the canvas |
| defaultMouseY | half the height | Where the particles avoid when the mouse is off the canvas |

# Cool Beans
See it in action at [BeMoreVisible.com](http://bemorevisible.com)
