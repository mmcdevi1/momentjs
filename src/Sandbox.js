class Sandbox {
  constructor () {

  }

  add (world, rigidBodies) {
    if (Array.isArray(rigidBodies)) {

      for (let body of rigidBodies) {
        console.log(body)
        world.bodies.push(body)
      }

    } else {
      world.bodies.push(rigidBodies)
    }
  }
}

export default Sandbox;