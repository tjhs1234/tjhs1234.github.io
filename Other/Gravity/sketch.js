// Gravity Demo
// Thomas Schorr
// February 5th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x,y,xVel,yVel,isTouchingGround, currentBack, jumpsRemaining, jumpIsPrimed, sunHeight;

//C//O//N//S//T//A//N//T//S//
let GRAVITY = 1;
let FRICTION = 1;
let STOPAMOUNT = 2; // The lowest velocity the player can have
let JUMPHEIGHT = 20;
let GROUNDHEIGHT = 200;
let JUMPS = 2;
let SUNSIZE = 100;
//C//O//N//S//T//A//N//T//S//

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(35);
  x = width/2;
  y = windowHeight - GROUNDHEIGHT - 20;
  xVel = 0;
  yVel = 0;
  isTouchingGround = false;
  currentBack = 0;
  sunHeight = SUNSIZE;
}

function draw() {
  background(135, 206, 235);
  updateStage();
  xMovement(FRICTION);
  yMovement(GRAVITY);
  character(x, y);
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
    currentBack -= 1;
  }
  else if (x + xVel > windowWidth - 20) {
    x = 20;
    currentBack += 1;
  }
}

function yMovement(GRAVITY_) {

  // Listens for key inputs
  if (keyIsDown(UP_ARROW) && jumpsRemaining > 0 && jumpIsPrimed === true) {
    yVel = -JUMPHEIGHT;
    isTouchingGround = false;
    y += 1;
    jumpsRemaining -= 1;
    jumpIsPrimed = false;
  }

  if (!keyIsDown(UP_ARROW)) {
    jumpIsPrimed = true;
  }

  // Resets jumps
  if (isTouchingGround === true) {
    jumpsRemaining = JUMPS;
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

function updateStage() {

  // Uses the sun's height to change the sky color
  background(135 - sunHeight / 8, 206 - sunHeight / 5, 235 - sunHeight / 5);

  // Makes sure the stage variable is in bounds
  if (currentBack === -1) {
    currentBack = 3;
  }
  else if (currentBack === 4) {
    currentBack = 0;
  }
  
  // Draws the sun
  fill(249, 215, 28);
  strokeWeight(0);
  if (mouseY > 80) {
    sunHeight = mouseY;
  }
  else {
    sunHeight = 80;
  }
  circle(SUNSIZE, sunHeight, SUNSIZE);
  
  // Desert Scene
  if (currentBack === 0) { 
    fill(194, 178, 128);
    strokeWeight(1);
    rect(0, windowHeight - GROUNDHEIGHT, windowWidth, windowHeight);
    strokeWeight(2);
    fill(35, 117, 67);
    
    createCactus(150);
    createCactus(450);
    createCactus(855);
    createCactus(1100);
    createCactus(1490);
    createCactus(1800);

  }

  // Forest Scene
  if (currentBack === 1) { 
    fill(96, 158, 56);
    strokeWeight(1);
    rect(0, windowHeight - GROUNDHEIGHT, windowWidth, windowHeight);
  }
  
  // Grassland Scene
  if (currentBack === 2) { 
    fill(96, 128, 56);
    strokeWeight(1);
    rect(0, windowHeight - GROUNDHEIGHT, windowWidth, windowHeight);
  }

  // Arctic Scene
  if (currentBack === 3) { 
    fill(195, 203, 217);
    strokeWeight(1);
    rect(0, windowHeight - GROUNDHEIGHT, windowWidth, windowHeight);
    fill(111, 122, 159);
    rect(0, windowHeight - GROUNDHEIGHT + 30, windowWidth, windowHeight);
  }

  fill(0);
  text("Thomas Schorr", 30, windowHeight - 50, 1700, 80);
  print(windowHeight);

}

function createCactus(x_) {
  strokeWeight(2);
  fill(35, 117, 67);
  rect(x_, windowHeight - GROUNDHEIGHT, 60, -150, 10);
  strokeWeight(4);
  point(x_ + 40, windowHeight - GROUNDHEIGHT - 7);
  point(x_ + 16, windowHeight - GROUNDHEIGHT - 29);
  point(x_ + 28, windowHeight - GROUNDHEIGHT - 78);
  point(x_ + 47, windowHeight - GROUNDHEIGHT - 36);
  point(x_ + 10, windowHeight - GROUNDHEIGHT - 53);
  point(x_ + 50, windowHeight - GROUNDHEIGHT - 69);
  point(x_ + 15, windowHeight - GROUNDHEIGHT - 110);
  point(x_ + 9, windowHeight - GROUNDHEIGHT - 9);
  point(x_ + 44, windowHeight - GROUNDHEIGHT - 130);
  point(x_ + 16, windowHeight - GROUNDHEIGHT - 135);
}

