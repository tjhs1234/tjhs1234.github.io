// Particle Assignment
// Thomas Schorr
// April 22nd, 2020
//
// Extra for Experts:
// 
// Particles change color based on the mouse's posiition and velocity
// Uses translate() to better draw the circles
// Uses rotate() to draw a line that shows a particle's direction

const MIN_LIFETIME = 10;
const MAX_LIFETIME = 350;
const MAX_VELOCITY = 100;
const GRAVITY_STRENGTH = 1;
const FRICTION_STRENGTH = 0.005; // Keep between 0 and 1
const EDGE_BOUNCE = 0.6; // Amount of velocity maintained after bouncing
const MAX_SIZE = 80;
const MIN_SIZE = 5;
const LINE_SIZE = 2;
const MINIMUM_FLOOR_BOUNCE = 4; // Minimum Velocity to bounce off the floor
const INITIAL_VECTOR_RANDOM_OFFSET = 2; // Randomness to the initial particle velocities
const INITIAL_VECTOR_VELOCITY_AMOUNT = 1; // Overall value of initial values

let particleArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor() {
    this.pos = createVector(mouseX, mouseY);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(INITIAL_VECTOR_VELOCITY_AMOUNT);
    
    // Alters the initial velocities according to the mouse velocity
    this.vel.x += pmouseX - mouseX + random(-INITIAL_VECTOR_RANDOM_OFFSET, INITIAL_VECTOR_RANDOM_OFFSET);
    this.vel.y += pmouseY - mouseY + random(-INITIAL_VECTOR_RANDOM_OFFSET, INITIAL_VECTOR_RANDOM_OFFSET);
    
    this.startSize = int(random(MIN_SIZE, MAX_SIZE));
    this.size = this.startSize;
    this.age = 0;
    this.lifetime = int(random(MIN_LIFETIME, MAX_LIFETIME));
    
    // Red is mapped to mouseX, green is mapped to mouseY, blue is mapped to mouse velocity
    this.color = [map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255), map((pmouseX - mouseX + pmouseY - mouseY) / 2, -10, 10, 0, 255)];
  }
  
  update(i) {
    // Gravity
    this.vel.y += GRAVITY_STRENGTH;
    
    // Checking Boundaries
    if (this.pos.y + this.size / 2 > height) {
      // Bottom
      this.vel.y = height - (this.pos.y + this.size / 2);
    }
    else if (this.pos.y - this.size / 2 < 0) {
      // Top
      this.vel.y = 0 - this.pos.y + this.size / 2;
    }
    
    if (this.pos.x + this.size / 2 > width) {
      // Right
      this.vel.x = width - (this.pos.x + this.size / 2);
    }
    else if (this.pos.x - this.size / 2 < 0) {
      // Left
      this.vel.x = 0 - this.pos.x + this.size / 2;
    }

    // Bouncing off walls
    if (this.pos.y + this.vel.y + this.size / 2 > height && abs(this.vel.y) >= MINIMUM_FLOOR_BOUNCE) {
      // Top
      this.vel.y = -this.vel.y * EDGE_BOUNCE;
    }
    else if (this.pos.y + this.vel.y + this.size / 2 > height && abs(this.vel.y) < MINIMUM_FLOOR_BOUNCE) {
      // Sets the ball on the ground to prevent infinite bouncing
      this.vel.y = 0;
      this.pos.y = height - this.size / 2;
    }
    
    if (this.pos.y + this.vel.y - this.size / 2 < 0) {
      // Bottom
      this.vel.y = -this.vel.y * EDGE_BOUNCE;
    }
    if (this.pos.x + this.vel.x + this.size / 2 > width || this.pos.x + this.vel.x - this.size / 2 < 0) {
      // Left & Right
      this.vel.x = -this.vel.x * EDGE_BOUNCE;
    }
    
    // Friction
    // Bigger particles fall faster than smaller ones because of air resistance
    this.vel.x -= pow(abs(this.vel.x), 2) * FRICTION_STRENGTH / (pow(this.size, 2) / ((MIN_SIZE + MAX_SIZE) / 2)) * 2 * Math.sign(this.vel.x);
    this.vel.y -= pow(abs(this.vel.y), 2) * FRICTION_STRENGTH / (pow(this.size, 2) / ((MIN_SIZE + MAX_SIZE) / 2)) * 2 * Math.sign(this.vel.y);
    
    // Limiting Velocity
    this.vel.limit(MAX_VELOCITY);
    
    // Updating Position
    this.pos.add(this.vel);
    
    // Updating age
    this.age++;
    
    // Removing old particles
    if (this.age >= this.lifetime) {
      particleArray.splice(i, 1);
    }
    
    // Calculating Size
    this.size = this.startSize - map(this.age, 0, this.lifetime, 0, this.startSize);
  }
  
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    
    // Sets the fill value to the values in the color array,
    // And the alpha value to correspond with the amount of lifetime left
    fill(this.color[0], this.color[1], this.color[2], 255 - map(this.age, 0, this.lifetime, 0, 255)); 
    
    // Rotates the grid to draw a line showing direction
    noStroke();
    rotate(this.vel.heading());
    
    ellipse(0, 0, this.size);
    strokeWeight(this.size / this.startSize * LINE_SIZE);
    stroke(this.color[0], this.color[1], this.color[2], 255 - map(this.age, 0, this.lifetime, 0, 255));
    
    // Draws a line to show the paricle's rotation
    line(0, 0, this.size / 2.5, 0);
    pop();
  }
  
  action(i) {
    this.update(i);
    this.draw();
  }
}

function draw() {
  background(0);
  
  if (mouseIsPressed) {
    // Spawns New Particles
    particleArray.push(new Particle());
  }

  for (let i = 0; i < particleArray.length; i++) {
    // Updates All Existing Particles
    particleArray[i].action(i);
  }
}