export const floor = function (random) {
  return Math.floor(random);
}

export const random = function (max, min = 0) {
  return (Math.random() * ( max - min + 1 )) + min;
}

function logger (position, velocity, acceleration) {
  console.log('[POSITION]:', Math.round(position.y), '[VELOCITY]:', (velocity.y.toFixed(3)), '[ACCEL]:', (acceleration.y.toFixed(3)))
}