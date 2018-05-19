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

const Physics = {
  create: function () {
    var defaults = {
      gravity: 9.81
    }

    return defaults;
  }
}

// if (location.y > canvas.height || location.y < 0) {
//   velocity.y = -velocity.y
// }

const RigidBody = {
  circle: function (options) {
    const { x, y, radius } = options;
    const location = new Vector(x, y); 

    return function (render) {
      render.ctx.clearRect(0, 0, render.canvas.width, render.canvas.height);
      render.ctx.beginPath()
      render.ctx.arc(location.x, location.y, radius, 0, Math.PI * 2, false)
      render.ctx.fillStyle = 'red';
      render.ctx.fill()
      render.ctx.closePath()
    }
  },
}

const Sandbox = {
  add: function (render, bodies) {
    bodies(render)
  }
}

const Render = {
  create: function (obj) {
    const defaults = {
      element: document.body,
      physics: null,
      options: {
        height: 800,
        width: 800,
      }
    }

    let height = 800;
    let width  = 800;

    if (obj) {
      height = obj.options.height;
      width  = obj.options.width;
    }

    let render = {
      ...defaults
    }

    render.element = render.element || obj.element;
    render.physics = render.physics || obj.physics
    render.canvas = this._createCanvas(height, width)
    render.ctx = render.canvas.getContext('2d')
    render.element.insertAdjacentElement('afterbegin', render.canvas)

    return render;
  },

  _createCanvas: function (height, width) {
    let canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;

    return canvas;
  },

  init: function (render) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // RigidBody.circle({ x: 200,  y: 50,  radius: 10 })
    console.log(render)
  }
}


const Moment = {
  Physics,
  RigidBody,
  Render,
  Sandbox,
}

const physics = Moment.Physics.create();

const render = Moment.Render.create({
  element: document.body,
  physics: physics,
  options: {
    height: 600,
    width: 600
  }
})

Moment.Sandbox.add(render,
  Moment.RigidBody.circle({ x: 200,  y: 50,  radius: 10 })
)



















































