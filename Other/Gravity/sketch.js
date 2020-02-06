// Gravity Demo
// Thomas Schorr
// February 5th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x,y,xVel,yVel,isTouchingGround;

//C//O//N//S//T//A//N//T//S//
let GRAVITY = 1;
let FRICTION = 1;
let STOPAMOUNT = 2; // The lowest velocity the player can have
let JUMPHEIGHT = 20;
let GROUNDHEIGHT = 200;
//C//O//N//S//T//A//N//T//S//

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = windowHeight - GROUNDHEIGHT - 20;
  xVel = 0;
  yVel = 0;
  isTouchingGround = false;
}

function draw() {
  background(100);
  character(x, y);
  xMovement(FRICTION);
  yMovement(GRAVITY);
}

function character(x, y) {
  fill(0, 200, 0);
  strokeWeight(1);
  ellipse(x, y, 40, 40); // Head
  fill(255, 255, 255);
  ellipse(x - 9, y - 9, 10, 10); // Left Eye
  ellipse(x + 9, y - 9, 10, 10); // Right Eye
  strokeWeight(2);
  line(x - 5, y + 10, x + 5, y + 10); // Mouth
}

function xMovement(FRICTION_) {
  
  // Listens for key inputs
  if (keyIsDown(LEFT_ARROW) && isTouchingGround) {
    xVel -= 2;
  }
  if (keyIsDown(RIGHT_ARROW) && isTouchingGround) {
    xVel += 2;
  }
  
  // Applies friction
  if (xVel >= STOPAMOUNT && isTouchingGround) {
    xVel -= xVel*(FRICTION_ * 0.2);
  }
  else if (xVel <= -STOPAMOUNT && isTouchingGround) {
    xVel += xVel*(-FRICTION_ * 0.2);
  }
  else if (xVel < STOPAMOUNT && xVel > -STOPAMOUNT && !keyIsDown(RIGHT_ARROW)  && !keyIsDown(LEFT_ARROW)) {
    xVel = 0;
  }
  
  // Updates x position
  if (x + xVel > 20 && x + xVel < windowWidth - 20){
    x += xVel;
  }
  else if (x + xVel < 20) {
    x = windowWidth - 20;
  }
  else if (x + xVel > windowWidth - 20) {
    x = 20;
  }
}

function yMovement(GRAVITY_) {

  // Listens for key inputs
  if (keyIsDown(UP_ARROW) && isTouchingGround) {
    yVel -= JUMPHEIGHT;
    isTouchingGround = false;
    y += 1;

  }
  
  // Applies gravity
  if (isTouchingGround === false) {
    yVel += GRAVITY_ * 1.3; 
  }

  // Updates y position
  if (y + yVel < windowHeight - GROUNDHEIGHT){
    y += yVel;
  }
  else {
    y = windowHeight - GROUNDHEIGHT - 20;
    yVel = 0;
    isTouchingGround = true;
  }
}

