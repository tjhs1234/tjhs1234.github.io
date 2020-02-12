// Interactive Scene Assignment
// Thomas Schorr
// February 5th, 2020
//
// Extra for Experts:
// Made a gravity script
// Created 4 scenes
// You can change the character size with a constant and it will act properly
//
// Instructions:
// Use the arrow keys to move the character
// Touch the sides of the screen or press middle mouse to change backgrounds
// Move your mouse to change the time of day

//C//O//N//S//T//A//N//T//S//
let GRAVITY = 1; // Values higher than 8 will stop the player from jumping
let FRICTION = 1; // Values higher than 4 will stop the player from moving
let STOPAMOUNT = 2; // The lowest velocity that the player can have
let SPEED = 2;
let JUMPHEIGHT = 20;
let GROUNDHEIGHT = 200;
let JUMPS = 2;
let SUNSIZE = 100;
let CHARHEIGHT = 50;
let CHARWIDTH = 50;
//C//O//N//S//T//A//N//T//S//

let x,y,xVel,yVel,isTouchingGround, currentBack, jumpsRemaining, sunHeight;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  textSize(35);
  x = width/2;
  y = windowHeight - GROUNDHEIGHT - CHARHEIGHT / 2;
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
  
  fill(	177, 156, 217);
  strokeWeight(1);
  ellipse(x, y, CHARWIDTH, CHARHEIGHT); // Head
  fill(250, 10, 10);
  ellipse(x - 9, y - 9, 10, 10); // Left Eye
  ellipse(x + 9, y - 9, 10, 10); // Right Eye
  strokeWeight(2);
  line(x - 5, y + 10, x + 5, y + 10); // Mouth
}

function xMovement(FRICTION_) {
  
  // Listens for left arrow
  if (keyIsDown(LEFT_ARROW) && isTouchingGround) {
    xVel -= SPEED;
  }
  // Allows you to slightly modify the velocity while in the air 
  else if  (keyIsDown(LEFT_ARROW) && !isTouchingGround) {
    xVel -= SPEED / 50;
  }
  
  // Listens for right arrow
  if (keyIsDown(RIGHT_ARROW) && isTouchingGround) {
    xVel += SPEED;
  }
  // Allows you to slightly modify the velocity while in the air 
  else if  (keyIsDown(RIGHT_ARROW) && !isTouchingGround) {
    xVel += SPEED / 50;
  }
  
  // Applies friction, only while on the ground
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
  if (x + xVel > CHARWIDTH / 2 && x + xVel < windowWidth - CHARWIDTH / 2){
    x += xVel;
  }
  else if (x + xVel < CHARWIDTH / 2) {
    x = windowWidth - CHARWIDTH / 2;
    currentBack -= 1;
  }
  else if (x + xVel > windowWidth - CHARWIDTH / 2) {
    x = CHARWIDTH / 2;
    currentBack += 1;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && jumpsRemaining > 0) {
    yVel = -JUMPHEIGHT;
    isTouchingGround = false;
    y += 1;
    jumpsRemaining -= 1;
  }
}

function yMovement(GRAVITY_) {
  // Resets jumps
  if (isTouchingGround === true) {
    jumpsRemaining = JUMPS;
  }

  // Applies gravity
  if (isTouchingGround === false) {
    yVel += GRAVITY_ * 1.3; 
  }

  // Updates y position
  if (y + yVel < windowHeight - GROUNDHEIGHT - CHARHEIGHT / 2){
    y += yVel;
  }
  else {
    y = windowHeight - GROUNDHEIGHT - CHARHEIGHT / 2;
    yVel = 0;
    isTouchingGround = true;
  }
}

function mousePressed() {
  // Allows the user to cycle through backgrounds with middle click
  
  if (mouseButton === CENTER){
    currentBack += 1;
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
  ellipse(SUNSIZE, sunHeight, SUNSIZE);
  
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
    createTree(250, 50, 200);
  }
  
  // Grassland Scene
  if (currentBack === 2) { 
    fill(96, 128, 56);
    strokeWeight(1);
    rect(0, windowHeight - GROUNDHEIGHT, windowWidth, windowHeight);
    createGrass(13, 10);
  }

  // Arctic Scene
  if (currentBack === 3) { 
    fill(195, 203, 217);
    strokeWeight(1);
    rect(0, windowHeight - GROUNDHEIGHT, windowWidth, windowHeight);
    fill(111, 122, 159);
    rect(0, windowHeight - GROUNDHEIGHT + 30, windowWidth, windowHeight);
    createIceberg (windowWidth / 2, 600, 200);
    createIceberg (windowWidth / 3, 600, 350);
  }

  // Adds my name
  fill(0);
  text("Thomas Schorr", 30, windowHeight - 50, 1700, 80);
}

function createCactus(x_) {
  
  // Creates a cactus at the given X position
  strokeWeight(2);
  fill(35, 117, 67);
  rect(x_, windowHeight - GROUNDHEIGHT, 60, -150, 10);
  strokeWeight(4);
  
  // Creates a bunch of dots on the cactus
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

function createGrass(height_, frequency) {

  let currentX = 0;

  // Creates a line then moves to the right by the frequency value
  // until it reaches the edge of the screen
  strokeWeight(1);
  fill(96, 128, 56);
  while (currentX <= windowWidth) {
    line(currentX, windowHeight - GROUNDHEIGHT, currentX, windowHeight - GROUNDHEIGHT - height_);
    currentX += frequency;
  }
}

function createTree(height_, width_, frequency) {
  
  let currentX = 0;

  // Same as the function above, but it creates a tree instead
  strokeWeight(1);
  while (currentX <= windowWidth) {
    fill(98, 78, 44);
    rect(currentX, windowHeight - GROUNDHEIGHT, width_, -height_);
    fill(66, 105, 47);
    triangle(currentX + width_ / 2 - width_, windowHeight - GROUNDHEIGHT - height_ / 2, currentX + width_ / 2 + width_, windowHeight - GROUNDHEIGHT - height_ / 2, currentX + width_ / 2, windowHeight - GROUNDHEIGHT - height_ * 1.5);
    currentX += frequency;
  }
}

function createIceberg (x_, width_, height_) {
  // Creates an iceberg with the given specifications
  fill(111, 122, 159);
  triangle(x_, windowHeight - GROUNDHEIGHT, x_ + width_, windowHeight - GROUNDHEIGHT, x_ + width_ / 2, windowHeight - GROUNDHEIGHT - height_);
}

