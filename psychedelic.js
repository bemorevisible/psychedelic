function dropAcid(containerID = "psychedelic", options = {}) {
  let container = document.getElementById(containerID);
  if (!container) {
    console.log('DOM not loaded yet or invalid container ID.');
    return;
  }
  let canvas, ctx, mouseX, mouseY, particles = [], particleTemplates = [], settings = {};
  settings = { 
    height: options.height || container.clientHeight || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    width: options.width || container.clientWidth || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    colors: options.colors || ["100,0,0","0,100,0","0,0,100"],
    opacity: options.opacity || 0.15,
    minSpeed: options.minSpeed || 2,
    maxSpeed: options.maxSpeed || 6,
    particleCount: options.particleCount || 50,
    particleRadius: options.particleRadius || 800,
    repelBuffer: options.repelBuffer || 20,
    repelDistance: options.repelDistance || options.particleRadius || 800,
    avoidMouse: options.avoidMouse || false,
    defaultMouseX: (options.width || container.clientWidth || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 2,
    defaultMouseY: (options.height || container.clientHeight || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) / 2
  }
  
  container.innerHTML = '';
  canvas = document.createElement("canvas");
  container.appendChild(canvas);
  ctx = canvas.getContext('2d');
  canvas.height = settings.height;
  canvas.width = settings.width;
  mouseX = settings.defaultMouseX; 
  mouseY = settings.defaultMouseY; 
  /* Create the particle templates... one for each color */
  for (let n = 0; n < settings.colors.length; n++) {
    let spotCanvas = document.createElement("canvas");
    spotCanvas.width = settings.particleRadius * 2;
    spotCanvas.height = settings.particleRadius * 2;
    let sctx = spotCanvas.getContext("2d");
    let grd = sctx.createRadialGradient(
      settings.particleRadius,
      settings.particleRadius,
      settings.particleRadius,
      settings.particleRadius,
      settings.particleRadius,
      settings.particleRadius / 1.25
    );
    grd.addColorStop(0, "rgba(" + settings.colors[n] + ",0)");
    grd.addColorStop(1, "rgba(" + settings.colors[n] + "," + settings.opacity + ")");
    sctx.fillStyle = grd;
    sctx.fillRect(0, 0, settings.particleRadius * 2, settings.particleRadius * 2);
    particleTemplates[n] = spotCanvas;
  };

  /* Create the actual particles from the templates */
  for (let n = 0; n < settings.particleCount; n++) {
    let neg = 1;
    let neg2 = 1;
    if (rand(0, 1) > 0.5) {
      neg = -1;
    }
    if (rand(0, 1) > 0.5) {
      neg2 = -1;
    }
    particles[n] = {
      particleRadius: settings.particleRadius,
      template: particleTemplates[Math.floor(Math.random() * particleTemplates.length)],
      xPos: rand(0, canvas.width) - settings.particleRadius,
      yPos: rand(0, canvas.height) - settings.particleRadius,
      xVel: rand(settings.minSpeed, settings.maxSpeed) * neg,
      yVel: rand(settings.minSpeed, settings.maxSpeed) * neg2
    };
  };
  function drawParticles () { // Iterate through the particles, move them, and then draw them
    ctx.clearRect(0, 0, settings.width, settings.height);
    for (let n = 0; n < settings.particleCount; n++) {
      moveParticle(particles[n]);
      ctx.drawImage(particles[n].template, particles[n].xPos, particles[n].yPos)
    }
    requestAnimationFrame(drawParticles);
  };
  
  drawParticles();
  function resetParticle (particle) { //Reset a particle's position when it goes off canvas
    particle.template = particleTemplates[Math.floor(Math.random() * particleTemplates.length)]; //Give it a new random color
    let neg = 1;
    let neg2 = 1; 
    if (rand(0, 1) > 0.5) {
      neg = -1;
    }
    if (rand(0, 1) > 0.5) {
      neg2 = -1;
    }
    particle.xVel = rand(settings.minSpeed, settings.maxSpeed) * neg;
    particle.yVel = rand(settings.minSpeed, settings.maxSpeed) * neg2;
    if (particle.xVel > 0) {      //moving left to right
      if (particle.yVel > 0) {        //moving top to bottom
        if (particle.xVel > particle.yVel) {          //moving more horizontal
          particle.xPos = 0 - 2 * settings.particleRadius;
          particle.yPos = rand(0, canvas.height) - settings.particleRadius;
        } else {          //moving more vertical
          particle.yPos = 0 - 2 * settings.particleRadius;
          particle.xPos = rand(0, canvas.width) - settings.particleRadius;
        }
      } else {        //moving bottom to top
        if (particle.xVel > -particle.yVel) {          //moving more horizontal
          particle.xPos = 0 - 2 * settings.particleRadius;
          particle.yPos = rand(0, canvas.height) - settings.particleRadius;
        } else {          //moving more vertical
          particle.yPos = canvas.height;
          particle.xPos = rand(0, canvas.width) - settings.particleRadius;
        }
      }
    } else {      //moving right to left
      if (particle.yVel > 0) {        //moving top to bottom
        if (-particle.xVel > particle.yVel) {          //moving more horizontal
          particle.xPos = canvas.width;
          particle.yPos = rand(0, canvas.height) - settings.particleRadius;
        } else {          //moving more vertical
          particle.xPos = rand(0, canvas.width) - settings.particleRadius;
          particle.yPos = 0 - 2 * settings.particleRadius;
        }
      } else {        //moving bottom to top
        if (-particle.xVel > -particle.yVel) {          //moving more horizontal
          particle.xPos = canvas.width;
          particle.yPos = rand(0, canvas.height) - settings.particleRadius;
        } else {          //moving more vertical
          particle.yPos = canvas.height;
          particle.xPos = rand(0, canvas.width) - settings.particleRadius;
        }
      }
    }
  };
  function moveParticle (particle) {
    let dist = distanceBetween(particle.xPos + settings.particleRadius, particle.yPos + settings.particleRadius, mouseX, mouseY);
    if ((settings.avoidMouse) && (dist <= settings.repelDistance + settings.repelBuffer)) { // particle is too close to the mouse
      let dx = (particle.xPos + settings.particleRadius) - mouseX;
      let dy = (particle.yPos + settings.particleRadius) - mouseY;
      let vel = distanceBetween(0,0,particle.xVel,particle.yVel);
      let newx = Math.sqrt(vel / (dy / dx * (dy / dx) + 1));
      let newy = Math.sqrt(vel / (dx / dy * (dx / dy) + 1));
      if (dx < 0) newx = 0 - newx;
      if (dy < 0) newy = 0 - newy;
      let multiVel = (dist - settings.repelDistance) / (2 * settings.repelBuffer) + 0.5;
      let multiPush = 1 - multiVel;
      if (multiVel > 1) {
        multiVel = 1;
        multiPush = 0;
      } else if (multiVel < 0) {
        multiVel = 0;
        multiPush = (dist - settings.repelDistance) / (-2 * settings.repelBuffer) + 0.5;
      }
      particle.xPos = particle.xPos + multiPush * newx + multiVel * particle.xVel;
      particle.yPos = particle.yPos + multiPush * newy + multiVel * particle.yVel;
    } else {
      particle.xPos += particle.xVel;
      particle.yPos += particle.yVel;
    }
    if (particle.xPos > canvas.width || particle.yPos > canvas.height || particle.xPos < -2 * settings.particleRadius || particle.yPos < -2 * settings.particleRadius) { // Out of bounds
      resetParticle(particle);
    }
  }
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  function distanceBetween(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }
  if (settings.avoidMouse) {
    canvas.addEventListener("mousemove", getPosition, false);
    canvas.onmousedown = function() {
      settings.repelDistance = settings.repelDistance+50;
    }
    canvas.onmouseup = function() {
      settings.repelDistance = settings.repelDistance-50;
    }
    canvas.onmouseleave = function() {
      mouseX = settings.defaultMouseX;
      mouseY = settings.defaultMouseY;
    }
  }
  function getPosition(event) {
    mouseX = event.x;
    mouseY = event.y;
  }

}
