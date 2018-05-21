let Moment = {};

Moment.Engine = class {
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
        radius, 
        vector: { velocity, position, acceleration },
      } = body;

      if (!body.isStatic) {
        
        

        if ((position.y) > (ground.vector.position.y - radius) || (position.y) < radius) {
          velocity.y = -velocity.y
        } else {
          this.applyForce(body, gravity)
          this.updateBodies(body)
        }

        position.y += velocity.y

        console.log(position.y, velocity.y, acceleration.y)
      }
    }
  }

  updateBodies (body) {
    const { position, velocity, acceleration } = body.vector; 

    body.update(velocity, acceleration)
    body.update(position, velocity)
  }

  applyForce (body, force) {
    const { acceleration } = body.vector;

    body.update(acceleration, force)
  }
}

Moment.Physics = class {
  create () {
    var defaults = {
      label: 'physics',
      gravity: new Vector(0, 0.1)
    }

    return defaults;
  }
}

Moment.Render = class {
  create (obj) {
    const defaults = {
      element: null,
      physics: null,
      engine: null,
      options: {
        height: 800,
        width: 800,
        background: '#333',
      }
    }

    const render = {
      ...defaults,
      ...obj,
      options: {
        ...defaults.options,
        ...obj.options
      }
    }

    render.canvas = this._createCanvas(render.options.height, render.options.width)
    render.ctx = render.canvas.getContext('2d')

    // Render canvas element to the DOM
    render.element.insertAdjacentElement('afterbegin', render.canvas)

    return render;
  }

  draw (render) {
    const { 
      canvas, 
      ctx, 
      engine: { world: { bodies, physics: { gravity } } },
      options: { width, height, background } 
    } = render;

    // Fill background of canvas
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    // Render all bodies to the Canvas
    for (let body of bodies) {
      const { 
        shape, 
        fillStyle, 
        radius, 
        vector: { velocity, position, position: { x, y} },
      } = body;

      ctx.beginPath()

      switch (shape) {
        case 'circle':
          ctx.arc(x, y, radius, 0, Math.PI * 2, false)
          ctx.fillStyle = fillStyle;
          break;
        case 'rect':
          ctx.rect(x, y, body.width, body.height)
          ctx.fillStyle = fillStyle;
          break;
        default:
          break;
      }

      ctx.stroke()
      ctx.fill()
      ctx.closePath()
      
    }
  }

  _createCanvas (height, width) {
    let canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;

    return canvas;
  }
}

Moment.Sandbox = class {
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

Moment.RigidBody = class {
  constructor () {

  }

  create (x, y) {
    const defaults = {
      shape: null,
      fillStyle: 'red',
      area: null,
      isStatic: false,
      vector: {
        position: new Vector(x, y),
        velocity: new Vector(0, 0),
        acceleration: new Vector(0, 0),
      },
      update: this.update,
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

Moment.RigidBodies = class extends Moment.RigidBody {
  constructor () {
    super();
  }

  circle (x, y, radius, options) {
    const defaults = {
      shape: 'circle',
      radius: radius,
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

Moment.Looper = class {
  run (render, draw, engine, options) {
    const { 
      canvas, 
      ctx, 
      physics,
      engine: { world: { bodies } },
      options: { width, height, background } 
    } = render;

    if (options.enable) {

      setInterval(function () {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        draw(render)
        engine.update(engine, render)
      }, 10)

    }
    // requestAnimationFrame(this.run.bind(this))
  }
}




















































