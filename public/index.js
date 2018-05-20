// Create new Moment JS Engine
const Engine    = new Moment.Engine(),
      Sandbox   = new Moment.Sandbox(),
      RigidBody = new Moment.RigidBody(),
      Render    = new Moment.Render(),
      Physics   = new Moment.Physics(),
      Looper    = new Moment.Looper(),
      world     = Engine.world;

const physics = Physics.create();

// Render canvas to the DOM
const render = Render.create({
  element: document.body,
  physics,
  engine: Engine,
  options: {
    height: 800,
    width: 800,
  }
})

Sandbox.add(world, [
  RigidBody.circle(200, 200, 50),
  RigidBody.circle(100, 100, 25, { fillStyle: 'orange' }),
  RigidBody.circle(400, 500, 10, { fillStyle: 'blue' }),
  RigidBody.rect(10, 500, 10, 20),
  RigidBody.rect(400, 150, 100, 200, { fillStyle: 'lightblue' }),
  RigidBody.rect(0, 700, 1000, 50, { isStatic: true })
])

Render.draw(render);

Looper.run(render, Render.draw, physics, { enable: false });

Engine.update()