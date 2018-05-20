let Moment = {};

Moment.Engine = class {
  constructor () {
    this.defaults = {

    }

    this.world = {
      bodies: []
    }
  }

  update () {
    console.log('update')
  }
}

Moment.Physics = class {
  create () {
    var defaults = {
      gravity: new Vector(0, 0.05)
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
      physics: { gravity },
      engine: { world: { bodies } },
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
        velocity,
        position, 
        position: { x, y } 
      } = body;

      ctx.beginPath()

      switch (shape) {
        case 'circle':
          ctx.arc(x, y, radius, 0, Math.PI * 2, false)
          ctx.fillStyle = fillStyle;
          ctx.fill()
          position.add(velocity)
          velocity.add(gravity)
          break;
        case 'rect':
          ctx.rect(x, y, body.width, body.height)
          ctx.fillStyle = fillStyle;
          ctx.fill()
          break;
        default:
          break;
      }

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
  circle (x, y, radius, options) {
    const defaults = {
      shape: 'circle',
      fillStyle: 'red',
      area: Math.round(Math.PI * radius ** 2),
      radius: radius,
      position: new Vector(x, y),
      velocity: new Vector(0, 0),
      acceleration: new Vector(0, 0),
    }

    const extend = {
      ...defaults,
      ...options,
    }

    return extend
  }

  rect (x, y, width, height, options) {
    const defaults = {
      shape: 'rect',
      fillStyle: 'red',
      area: width * height,
      isStatic: false,
      width,
      height,
      position: new Vector(x, y),
      velocity: new Vector(0, 0),
      acceleration: new Vector(0, 0),
    }

    const extend = {
      ...defaults,
      ...options,
    }

    return extend
  }

  applyForce (force) {

  }
}

Moment.Looper = class {
  run (render, draw, engine, options) {
    const { 
      canvas, 
      ctx, 
      engine: { world: { bodies } },
      options: { width, height, background } 
    } = render;

    if (options.enable) {

      setInterval(function () {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        draw(render)
      }, 10)

    }
    // requestAnimationFrame(this.run.bind(this))
  }
}




















































