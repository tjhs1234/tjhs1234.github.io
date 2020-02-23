// State Variables Assignment 
// Thomas Schorr
// February 12th, 2020
//
// Extra for Experts:
// Completed the expert challenge
// Added a random mode, activated by pressing r

const FADE_SPEED = 20;
const MAX_VALUE = 255;
const MIN_VALUE = 100;
let mouseInQuadrant;
let quadFadeValues = [MAX_VALUE, MAX_VALUE, MAX_VALUE, MAX_VALUE];
let quadDirections = [false, false, false, false];
let bottomRightToggle = false;
let allToggle = false;
let randomQuad = 1;
let mode = 1;
let flashHalfDone = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function updateFade(quadDirections_) {
  // Updates the fade values, goes up if the direction 
  // in quadDirections is true and down if it is false
  for (let i = 0; i < 4; i++) {
    if (quadDirections_[i]) {
      if (quadFadeValues[i] - FADE_SPEED > MIN_VALUE) {
        quadFadeValues[i] -= FADE_SPEED;
      }
      else {
        quadFadeValues[i] = MIN_VALUE;
      }
    }
    else {
      if (quadFadeValues[i] + FADE_SPEED < MAX_VALUE) {
        quadFadeValues[i] += FADE_SPEED;
      }
      else {
        quadFadeValues[i] = MAX_VALUE;
      }
    }
  }
}

function drawRectangle() {
  // Draws the four rectangles, taking into account its quadFadeValue
  fill(quadFadeValues[0], quadFadeValues[0], 255);
  rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2);

  fill(255, quadFadeValues[1], quadFadeValues[1]);
  rect(0, 0, windowWidth / 2, windowHeight / 2);

  fill(quadFadeValues[2], 255, quadFadeValues[2]);
  rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
  
  fill(255, quadFadeValues[3], 255);
  rect(windowWidth, windowHeight, -windowWidth / 2, -windowHeight / 2);
}

function detectMouse() {
  // Detects the quadrant the mouse is in
  if (mouseX >= windowWidth / 2 && mouseY <= windowHeight / 2) {
    return 1;
  }
  else if (mouseX <= windowWidth / 2 && mouseY <= windowHeight / 2) {
    return 2;
  }
  else if (mouseX <= windowWidth / 2 && mouseY >= windowHeight / 2) {
    return 3;
  }
  else {
    return 4;
  }
}

function flashQuad(quad_, returnMode) {
  // Flashes a quadrant, disabling all other
  // logic until it has been fully flashed
  mode = 3;
  
  if  (quadFadeValues[quad_ - 1] !== MIN_VALUE && !flashHalfDone) {
    // Ups the fade value if it hasn't hit the max value yet
    quadDirections[quad_ - 1] = true;
  }
  else if (quadFadeValues[quad_ - 1] === MIN_VALUE && !flashHalfDone) {
    // Once it's at the max value, changes the flashHalfDone variable
    flashHalfDone = true;
  }
  else if (quadFadeValues[quad_ - 1] !== MAX_VALUE) {
    // Downs the fade value if it has already hit the max fade value
    quadDirections[quad_ - 1] = false;
  }
  else {
    // Once it's done, set mode to returnMode ans reset flashHalfDone
    mode = returnMode;
    flashHalfDone = false;
  }
}

function logic(mode) {
  // Main logic function
  quadDirections = [false, false, false, false];
  // Normal logic, made according to instructions
  if (mode === 1) {
    
    if (mouseInQuadrant !== 2) {
      allToggle = false;
    }
    
    if (mouseInQuadrant === 1 || mouseInQuadrant === 3) {
      quadDirections[mouseInQuadrant - 1] = true;
    }

    if (bottomRightToggle) {
      quadDirections[3] = true;
    }
    else {
      quadDirections[3] = false;
    }

    if (allToggle) {
      quadDirections = [true, true, true, true];
      bottomRightToggle = false;
    }
  }

  else if (mode === 2) {
    // Flashes random quadrants
    randomQuad = Math.floor(Math.random() * 4) + 1;
    flashQuad(randomQuad, 2);
  }

  else if (mode === 3) {
    // Mode used for flashing a quadrant, disables all other logic
    flashQuad(randomQuad, 2);
  }
}

function keyTyped() {
  // Listens for the user to type r, then switches modes
  if (key === 'r' && mode === 1) {
    mode = 2;
  }
  else if (key === 'r' && mode === 2) {
    mode = 1;
    bottomRightToggle = false;
    allToggle = false;
  }
}

function mousePressed() {
  // Listens for the user to press the mouse, then checks
  // what quadrant it's in and changes the appropriate variable
  if (mouseButton === LEFT && !bottomRightToggle && mouseInQuadrant === 4) {
    bottomRightToggle = true;
  }
  else if (mouseButton === LEFT && bottomRightToggle && mouseInQuadrant === 4) {
    bottomRightToggle = false;
  }
  if (mouseButton === LEFT && !allToggle && mouseInQuadrant === 2) {
    allToggle = true;
  }
}

function draw() { 
  // Main draw loop
  background(MAX_VALUE);
  
  mouseInQuadrant = detectMouse();
  
  logic(mode);
  
  updateFade(quadDirections);
  
  drawRectangle();

  // Draws the dividing lines
  strokeWeight(5);
  line(0, windowHeight / 2, windowWidth, windowHeight / 2);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
}