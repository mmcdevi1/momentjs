class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  add (velocity) {
    this.x += velocity.x
    this.y += velocity.y
  }

  sub (velocity) {
    this.x -= velocity.x
    this.y -= velocity.y
  }
}

export default Vector;