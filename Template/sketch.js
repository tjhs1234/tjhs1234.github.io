// Gravity Test
// Thomas Schorr
// February 4th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(windowWidth, windowHeight);
  let xPos = windowWidth / 2;
  let yPos = 0;
  let xVel = 0;
  let yVel = 0;
  let isTouchingGround = true;

  let GRAVITY = 1;
  let FLOORHEIGHT = 903;
  
  // Gravity Script
  // Updates isTouchingGround
  if (yPos >= 903) {
    isTouchingGround = true;
    yPos = 903;
    yVel = 0;
  }
  else {
    isTouchingGround = false;
  }

  // Applies Gravity
  if (isTouchingGround === false) {
    yVel =+ 1;
  }

  // Updates Positions
  if (isTouchingGround === true) {
    xPos =+ xVel;
    yPos =+ yVel;
  }
  ellipse(xPos, yPos, 40, 40);
}

function draw() {
  
  background(180);
}


