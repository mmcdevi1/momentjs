import Vector from './Vector';

class RigidBody {
  constructor () {

  }

  create (x, y) {
    const defaults = {
      shape: null,
      fillStyle: 'red',
      area: null,
      isStatic: false,
      position: new Vector(x, y),
      velocity: new Vector(0, 0),
      acceleration: new Vector(0, 0),
      update: this.update,
      friction: 0.9,
      restitution: 0,
      hasStroke: false,
    }

    return defaults;
  }

  update (vector, force) {
    vector.add(force)
  }

  applyForce () {
    acceleration.add(force)
  }
}

export default RigidBody;