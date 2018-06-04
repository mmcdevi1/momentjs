class Render {
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
        velocity, 
        position
      } = body;

      ctx.beginPath()

      switch (shape) {
        case 'circle':
          ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, false)
          ctx.fillStyle = fillStyle;
          body.hasStroke ? ctx.stroke() : null
          break;
        case 'rect':
          ctx.rect(position.x, position.y, body.width, body.height)
          ctx.fillStyle = fillStyle;
          body.hasStroke ? ctx.stroke() : null
          break;
        default:
          break;
      }

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

export default Render;