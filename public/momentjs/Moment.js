// let Moment = {};

// Moment.Engine = class {
//   constructor () {
//     this.world = {
//       bodies: [],
//       bounds: {},
//     }
//   }

//   set (prop) {
//     const copy = {
//       ...this.world,
//       [prop.label]: prop
//     }

//     this.world = copy
//   }

//   update (engine, render) {
//     const { 
//       bodies,
//       physics: { gravity } 
//     } = engine.world;

//     const ground = bodies.find(body => {
//       return body.isStatic
//     })

//     for (let body of bodies) {
//       let { 
//         shape, 
//         fillStyle,  
//         velocity, 
//         position, 
//         acceleration
//       } = body;

//       const strokeHeight = body.hasStroke ? 1 : 0;

//       if (!body.isStatic) {
//         this.applyForce(body, gravity)
//         this.updateBodies(body)

//         switch (shape) {
//           case 'circle':
//             const maxY = ground.position.y - (body.radius + strokeHeight)
//             const maxX = ground.width

//             if (position.y > maxY && position.x < maxX) {
//               position.y = maxY
//               velocity.y = -velocity.y * body.friction
//             }
//             break;
//           case 'rect':
//             if ((position.y) > (ground.position.y - (body.height + strokeHeight))) {
//               position.y = ground.position.y -(body.height + strokeHeight)
//               velocity.y = -velocity.y * body.friction
//             }
//           default:
//             break;
//         }
        
//       }
//     }
//   }

//   boundaries (body) {
//     const { bodies } = world;

//     if ((position.y) > (ground.position.y - radius - 1)) {
//       position.y = ground.position.y - radius - 1
//       velocity.y = -velocity.y * body.friction
//     }
//   }

//   updateBodies (body) {
//     const { position, velocity, acceleration } = body; 

//     body.update(velocity, acceleration)
//     body.update(position, velocity)
//   }

//   applyForce (body, force) {
//     const { acceleration } = body;

//     body.update(acceleration, force)
//   }
// }

// Moment.Physics = class {
//   create () {
//     var defaults = {
//       label: 'physics',
//       gravity: new Vector(0, 0.00981)
//     }

//     return defaults;
//   }
// }

// Moment.Render = class {
//   create (obj) {
//     const defaults = {
//       element: null,
//       physics: null,
//       engine: null,
//       options: {
//         height: 800,
//         width: 800,
//         background: '#333',
//       }
//     }

//     const render = {
//       ...defaults,
//       ...obj,
//       options: {
//         ...defaults.options,
//         ...obj.options
//       }
//     }

//     render.canvas = this._createCanvas(render.options.height, render.options.width)
//     render.ctx = render.canvas.getContext('2d')

//     // Render canvas element to the DOM
//     render.element.insertAdjacentElement('afterbegin', render.canvas)

//     return render;
//   }

//   draw (render) {
//     const { 
//       canvas, 
//       ctx, 
//       engine: { world: { bodies, physics: { gravity } } },
//       options: { width, height, background } 
//     } = render;

//     // Fill background of canvas
//     ctx.fillStyle = background;
//     ctx.fillRect(0, 0, width, height);

//     // Render all bodies to the Canvas
//     for (let body of bodies) {
//       const { 
//         shape, 
//         fillStyle, 
//         radius, 
//         velocity, 
//         position
//       } = body;

//       ctx.beginPath()

//       switch (shape) {
//         case 'circle':
//           ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, false)
//           ctx.fillStyle = fillStyle;
//           body.hasStroke ? ctx.stroke() : null
//           break;
//         case 'rect':
//           ctx.rect(position.x, position.y, body.width, body.height)
//           ctx.fillStyle = fillStyle;
//           body.hasStroke ? ctx.stroke() : null
//           break;
//         default:
//           break;
//       }

//       ctx.fill()
//       ctx.closePath()
      
//     }
//   }

//   _createCanvas (height, width) {
//     let canvas = document.createElement('canvas');
//     canvas.height = height;
//     canvas.width = width;

//     return canvas;
//   }
// }

// Moment.Sandbox = class {
//   constructor () {

//   }

//   add (world, rigidBodies) {
//     if (Array.isArray(rigidBodies)) {

//       for (let body of rigidBodies) {
//         console.log(body)
//         world.bodies.push(body)
//       }

//     } else {
//       world.bodies.push(rigidBodies)
//     }
//   }
// }

// Moment.RigidBody = class {
//   constructor () {

//   }

//   create (x, y) {
//     const defaults = {
//       shape: null,
//       fillStyle: 'red',
//       area: null,
//       isStatic: false,
//       position: new Vector(x, y),
//       velocity: new Vector(0, 0),
//       acceleration: new Vector(0, 0),
//       update: this.update,
//       friction: 0.9,
//       restitution: 0,
//       hasStroke: false,
//     }

//     return defaults;
//   }

//   update (vector, force) {
//     vector.add(force)
//   }

//   applyForce () {
//     acceleration.add(force)
//   }
// }

// Moment.RigidBodies = class extends Moment.RigidBody {
//   constructor () {
//     super();
//   }

//   circle (x, y, radius, options) {
//     const defaults = {
//       shape: 'circle',
//       radius,
//       area: Math.round(Math.PI * radius ** 2),
//     }

//     const extend = {
//       ...this.create(x, y),
//       ...defaults,
//       ...options,
//     }

//     return extend
//   }

//   rect (x, y, width, height, options) {
//     const defaults = {
//       shape: 'rect',
//       area: width * height,
//       width,
//       height,
//     }

//     const extend = {
//       ...this.create(x, y),
//       ...defaults,
//       ...options,
//     }

//     return extend
//   }
// }

// Moment.Looper = class {
//   run (render, draw, engine, options) {
//     const { 
//       canvas, 
//       ctx, 
//       physics,
//       engine: { world: { bodies } },
//       options: { width, height, background } 
//     } = render;

//     if (options.enable) {

//       setInterval(function () {
//         ctx.fillStyle = background;
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         draw(render)
//         engine.update(engine, render)
//       }, 1000 / 60)

//     }
//     // requestAnimationFrame(this.run.bind(this))
//   }
// }

















































