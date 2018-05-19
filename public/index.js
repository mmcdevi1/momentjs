// class Vector {
//   constructor (x, y) {
//     this.x = x
//     this.y = y
//   }

//   add (velocity) {
//     this.x += velocity.x
//     this.y += velocity.y
//   }

//   sub (velocity) {
//     this.x -= velocity.x
//     this.y -= velocity.y
//   }
// }

// const canvas = document.getElementById('canvas')
// const ctx = canvas.getContext('2d')

// function ball (x, y, radius) {
//   const location = new Vector(x, y); 

//   ctx.beginPath()
//   ctx.arc(location.x, location.y, radius, 0, Math.PI * 2, false)
//   ctx.fillStyle = 'red';
//   ctx.fill()
//   ctx.closePath()
// }

// let x = 200
// let y = 100
// let dy = 2;
// let radius = 10

// setInterval(function () {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   console.log('[CANVAS HEIGHT]:', canvas.height, '[POSITION]:', y)
//   ball(x, y, radius)

//   if (y + radius > canvas.height) {
//     dy = -dy * 0.9
//   } else {
//     dy += 1
//   }

//   y += dy
// }, 10)

// Get the width and height of the window
var win = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = win.innerWidth || e.clientWidth || g.clientWidth,
    height = win.innerHeight|| e.clientHeight|| g.clientHeight;
    
// Initialise an array to hold the physical objects
var physicalObjects = [];
 
// Initialise the canvas element and set it's width and height
var canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = width;
    canvas.height = height;
 
// Append the canvas element to the HTML body
document.body.appendChild(canvas);
 
// Get the canvas's context object
var context = canvas.getContext("2d");

var PhysicalObject = function(x, y, w, h) 
{
    // Set the object's x/y position
    this.x = x;
    this.y = y;
    
    // Set the object's width and height
    this.width = w;
    this.height = h;
    
    // Initialise the object's x and y velocity with a value of 0 (it's stationary initially)
    this.xVel = 0.1;
    this.yVel = 1;
    
    // Adjust the object's x velocity
    this.addXVel = function(vel) { 
        this.xVel += vel;
    };
    
    // Adjust the object's y velocity
    this.addYVel = function(vel) { 
        this.yVel += vel;
    };
    
    // Update the object's position for the next frame
    this.nextFrame = function() { 
        this.x += this.xVel;
        this.y += this.yVel;
    }
} 

frameRender = function() 
{
    // Clear view
    context.clearRect(0, 0, width, height);
    
    // For each object in the physicalObjects array...
    for (var i = 0; i < physicalObjects.length; i++) {
        
        // Draw a rectangle on the canvas to represent the object, based on the object's x, y, width and height
        context.fillRect(
            physicalObjects[i].x, 
            physicalObjects[i].y, 
            physicalObjects[i].width, 
            physicalObjects[i].height
        );
            
        // Tell the object to update itself for the next frame
        physicalObjects[i].nextFrame();
    }
} 
     
frameRenderLoop = function() 
{
    // Use requestAnimationFrame to trigger the 'frameRenderLoop' function as soon as the browser is ready to repaint
    requestAnimationFrame(frameRenderLoop);
        
    // Render the current frame
    frameRender();
}
frameRenderLoop(); 
     
// Add an object into the engine at x: 100, y: 100, with a width and height of 20 pixels.
physicalObjects.push(new PhysicalObject(50, 50, 20, 20));  
physicalObjects.push(new PhysicalObject(100, 100, 20, 20));  
       
// Give it a little push!
physicalObjects[0].addXVel(1);





























