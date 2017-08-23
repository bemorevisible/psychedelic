# Psychedelic
Add a psychedelic background to any div of your choosing.

# Example
See it in action at [BeMoreVisible.com](http://bemorevisible.com)

# Setup
Setup is incredibly easy, since psychedelic.js is a standalone vanilla javascript file.  Even if you're already tripping balls, you should have no problem getting up and running with the default settings:
- Include psychedelic.js in your project
- Call dropAcid(containerID, [options]) after the DOM is loaded

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


