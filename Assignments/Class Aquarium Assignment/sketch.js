// Fish Aquarium Project
// Thomas Schorr
// May 3rd, 2020
// 
// Extra for Experts:
//
// Fish avoid all other life within a certain radius
// Fish blow bubbles at random times

let objArr = [];

function setup() {
  
  createCanvas(800, 500);
  
  for (let i = 0; i < 5; i++) {
    objArr.push(new ThomasSFish(25));
  }
}

function draw() {
  
  drawTank();
  
  for (let i = objArr.length - 1; i >= 0; i--) {
    objArr[i].compare(objArr);
    objArr[i].move();
    objArr[i].display();
  }
}

//Function to render the background of the tank
function drawTank() {
  
  background(100, 154, 245);  //solid background color
  noStroke();
  fill(220, 195, 100);
  rect(0, height * 0.8, width, height);  //sand bottom
}

/** A super class for animated objects 
    Make sure to implement your class AFTER this one */
class AnimatedObject {

  /** Location fields inherited by all subclass */
  constructor() {
    /* Constructor
     *  Note that your constructor should accept a single float specifying the size,
     *  which will overwrite the inherited default value 50. In addition, your 
     * constructor should initialize x and y to a starting location where your creature 
     * will appear (either a random location or a predetermined fixed location)
     */

    //you can either use this.x and this.y   or  a vector(pos) to manage location
    this.x = random(width * 0.15, width * 0.85);
    this.y = random(height * 0.35, height * 0.75);
    this.pos = createVector(this.x, this.y);

    //As well, you can either use an xSpeed and ySpeed variable or a vel vector
    //to track movement velocity.
    this.xSpeed;
    this.ySpeed;
    this.vel;

    /** Size parameter inherited by subclass */
    this.size = 50;
  }

  /** Displays the object  */
  display() { }

  /** Advances the object's animation by one frame  */
  move() { }

  /** Optional Function:
   *  Parameter will store the array of all fish objects, which can be used
   *  for comparison if your fish's behavior should depend on proximity to
   *  other fish.
    */
  compare(objArr) { }

  /* Methods that provide access to class data fields 
     If you choose to use vectors, be sure to override
     the position and velocity functions to return this.pos.x and similar.
  */
  getX() { return this.x; }
  getY() { return this.y; }
  getSize() { return this.size; }
  getxSpeed() { return this.xSpeed; }
  getySpeed() { return this.ySpeed; }
}




/*****************************************
Define your Fish class below
please name according to this convention:
Lastname Firstinitial Fish
i.e  for Sebastion Tate:  class TateSFish
******************************************/
class ThomasSFish extends AnimatedObject{
  
  constructor(size_) {
    
    super();

    this.sightRange = 75; // Range in pixels the fish will avoid other fish
    this.bubbleChance = 1; // Percent chance to blow a bubble each frame
    this.bubbleSize = 1.5; // Size of bubbles blown by this fish, relative to the fish's size
    this.bubbleRandomness = 0.67; // Decimal percent of the randomness of the bubbles' size
    this.friction = 1.03; // Speed at which the fish's velocity will slow
    this.minVel = 0.05;
    this.maxVel = 8;

    this.size = size_;
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(this.minVel, this.maxVel));
    this.bubbleArr = []; // Array of bubbles this fish has blown
  }

  display() {
    
    // Draws the fish to the screen
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(27, 85, 76);
    ellipse(0, 0, this.size, this.size / 1.5);
    triangle(0, 0, -this.size / 1.4, this.size / 2, -this.size / 1.4, -this.size / 2);
    fill(0);
    ellipse(this.size / 2.5, 0, this.size / 5);
    pop();
  }
  
  move() {

    // Applies friction
    this.vel.x /= this.friction;
    this.vel.y /= this.friction;

    if (this.vel.mag() < this.minVel) {
      // Gives the fish a random velocity once it goes slower than its min velocity
      this.vel = p5.Vector.random2D();
      this.vel.setMag(random(this.minVel, this.maxVel));
    }

    // Makes the fish bounce off the window edges
    if (this.pos.x + this.vel.x - this.size / 2 < 0 || this.pos.x + this.vel.x + this.size / 2 > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y + this.vel.y - this.size / 2 < 0 || this.pos.y + this.vel.y + this.size / 2 > height) {
      this.vel.y *= -1;
    }
    
    this.pos.add(this.vel); // Updates the fishes' velocities

    // Code for bubbles
    this.blowBubble();
    this.updateBubbles();

  }
  
  blowBubble() {
    
    // Makes the fish have a chance to blow a bubble
    if (this.bubbleChance > int(random(0, 99))) {
      this.bubbleArr.push(new ThomasSFishBubble(this.pos.x, this.pos.y, this.vel.x, this.bubbleSize + random(-this.bubbleRandomness, this.bubbleRandomness), this));
    }
  }

  updateBubbles() {
    
    // Updates all bubbles related to this fish
    for (let i = this.bubbleArr.length - 1; i >= 0; i--) {
      this.bubbleArr[i].display();
      this.bubbleArr[i].move(i);
    }
  }

  compare(objArr) {
    
    // Compares this fish against all other fishes
    for (let j = 0; j < objArr.length; j++) {
      if (objArr[j] !== this) {
        if (sqrt(pow(this.pos.x - objArr[j].pos.x, 2) + pow(this.pos.y - objArr[j].pos.y, 2)) < this.sightRange + objArr[j].size) {
          // If the distance between the two fish is smaller than it's sight range, face away from it
          this.vel.rotate(-this.vel.heading() + Math.atan2(objArr[j].pos.y - this.pos.y, objArr[j].pos.x - this.pos.x) + radians(180));
        }
      }
    }
  }
}

class ThomasSFishBubble extends AnimatedObject {

  constructor(x_, y_, xVel, size_, parentFish_) {
    
    super();
    
    this.buoyancy = -4; // Speed the bubble will float up
    this.xVelFriction = 1.03; // Speed the bubble will slow it's initial x velocity

    this.pos = createVector(x_, y_);
    this.vel = createVector(xVel, this.buoyancy);
    this.parentFish = parentFish_;
    this.size = this.parentFish.size / size_;
  }

  display() {
    
    // Draws the bubble to the screen
    fill(0, 0);
    stroke(255, 255, 255);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.size / 2);
  }

  move(i) {
    
    this.pos.add(this.vel); // Updates the position
    this.vel.x = this.vel.x / this.xVelFriction; // Slows the x velocity by a little due to friction

    if (this.pos.y + this.size / 2 < 0) {
      // Deletes the bubble if it's above the screen
      this.parentFish.bubbleArr.splice(i, 1);
    }
  }
}