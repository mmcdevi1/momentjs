class Looper {
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
      }, 1000 / 60)

    }
    // requestAnimationFrame(this.run.bind(this))
  }
}

export default Looper;