import Moment from './Moment';
import { floor, random } from './helpers';

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

const bodies = [
  RigidBodies.rect(0, 700, 500, 100, { fillStyle: 'lightgrey', isStatic: true }),
  RigidBodies.rect(floor(random(500)), floor(random(500)), 10, 50, { fillStyle: 'lightgrey', hasStroke: true })
];

for (var i = 0; i < 1; i++) {
  bodies.push(RigidBodies.circle(floor(random(800)), floor(random(500)), floor(random(25, 10)), { fillStyle: 'orange', hasStroke: true }))
}

Sandbox.add(world, bodies)

Render.draw(render);

Looper.run(render, Render.draw, Engine, { enable: true });