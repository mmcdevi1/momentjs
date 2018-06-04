(function (Moment) {

	class Engine {
		constructor () {
	    this.world = {
	      bodies: [],
	      bounds: {},
	    }
	  }

	  set (prop) {
	    const copy = {
	      ...this.world,
	      [prop.label]: prop
	    }

	    this.world = copy
	  }

	  update (engine, render) {
	    const { 
	      bodies,
	      physics: { gravity } 
	    } = engine.world;

	    const ground = bodies.find(body => {
	      return body.isStatic
	    })

	    for (let body of bodies) {
	      let { 
	        shape, 
	        fillStyle,  
	        velocity, 
	        position, 
	        acceleration
	      } = body;

	      const strokeHeight = body.hasStroke ? 1 : 0;

	      if (!body.isStatic) {
	        this.applyForce(body, gravity)
	        this.updateBodies(body)

	        switch (shape) {
	          case 'circle':
	            const maxY = ground.position.y - (body.radius + strokeHeight)
	            const maxX = ground.width

	            if (position.y > maxY && position.x < maxX) {
	              position.y = maxY
	              velocity.y = -velocity.y * body.friction
	            }
	            break;
	          case 'rect':
	            if ((position.y) > (ground.position.y - (body.height + strokeHeight))) {
	              position.y = ground.position.y -(body.height + strokeHeight)
	              velocity.y = -velocity.y * body.friction
	            }
	          default:
	            break;
	        }
	        
	      }
	    }
	  }

	  boundaries (body) {
	    const { bodies } = world;

	    if ((position.y) > (ground.position.y - radius - 1)) {
	      position.y = ground.position.y - radius - 1
	      velocity.y = -velocity.y * body.friction
	    }
	  }

	  updateBodies (body) {
	    const { position, velocity, acceleration } = body; 

	    body.update(velocity, acceleration)
	    body.update(position, velocity)
	  }

	  applyForce (body, force) {
	    const { acceleration } = body;

	    body.update(acceleration, force)
	  }
	}

	window.Engine = Engine;

})()