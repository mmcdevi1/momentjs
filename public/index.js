// Create new Moment JS Engine
const Engine      = new Moment.Engine(),
      Sandbox     = new Moment.Sandbox(),
      RigidBodies = new Moment.RigidBodies(),
      Render      = new Moment.Render(),
      Physics     = new Moment.Physics(),
      Looper      = new Moment.Looper(),
      world       = Engine.world;

// Set physics to the Engine
const physics = Physics.create();
Engine.set(physics)

// Render canvas to the DOM
const render = Render.create({
  element: document.body,
  engine: Engine,
  options: {
    height: 800,
    width: 800,
  }
})

const bodies = [RigidBodies.rect(0, 700, 1000, 100, { fillStyle: 'lightgrey', isStatic: true })];

const floor = function (random) {
  return Math.floor(random);
}

const random = function (num) {
  return (Math.random() * num) + 1;
}

for (var i = 0; i < 1; i++) {
  bodies.push(RigidBodies.circle(floor(random(800)), floor(random(500)), floor(random(25)), { fillStyle: 'orange' }))
}

Sandbox.add(world, bodies)

Render.draw(render);

Looper.run(render, Render.draw, Engine, { enable: true });
// let y = 100
// let dy = 0
// let acc = 0
// let gravity = 0.01
// let ctx = render.ctx
// let radius = 10

// function ball (x, y, radius) {
//   ctx.beginPath()
//   ctx.arc(x, y, radius, 0, Math.PI * 2, false)
//   ctx.fillStyle = 'red';
//   ctx.stroke()
//   ctx.fill()
//   ctx.closePath()
// }




// setInterval(function () {
//   ctx.fillStyle = 'white';
//   ctx.fillRect(0, 0, render.canvas.width, render.canvas.height);
//   ball(100, y, radius, render)

//   if (y + radius + dy > render.canvas.height) {
//     dy = -dy * 0.7
//   } else {
//     acc += gravity
//     dy += acc
//   }
//   y += dy

//   console.log(y, dy, acc)
// }, 10)












