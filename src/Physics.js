import Vector from './Vector';

class Physics {
  create () {
    var defaults = {
      label: 'physics',
      gravity: new Vector(0, 0.00981)
    }

    return defaults;
  }
}

export default Physics;