import RigidBody from './RigidBody';

class RigidBodies extends RigidBody {
  constructor () {
    super();
  }

  circle (x, y, radius, options) {
    const defaults = {
      shape: 'circle',
      radius,
      area: Math.round(Math.PI * radius ** 2),
    }

    const extend = {
      ...this.create(x, y),
      ...defaults,
      ...options,
    }

    return extend
  }

  rect (x, y, width, height, options) {
    const defaults = {
      shape: 'rect',
      area: width * height,
      width,
      height,
    }

    const extend = {
      ...this.create(x, y),
      ...defaults,
      ...options,
    }

    return extend
  }
}

export default RigidBodies;