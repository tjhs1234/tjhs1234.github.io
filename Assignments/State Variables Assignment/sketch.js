// State Variables Assignment 
// Thomas Schorr
// February 12th, 2020
//
// Extra for Experts:
// Completed the expert challenge
// Added a random mode, activated by pressing r, deactivated by pressing a

const FADE_SPEED = 15;
const MAX_VALUE = 255;
const MIN_VALUE = 100;
const LINE_THICKNESS = 1;
let mouseInQuadrant;
let quadFadeValues = [MAX_VALUE, MAX_VALUE, MAX_VALUE, MAX_VALUE];
let quadFadeDirections = [false, false, false, false];
let bottomRightToggle = false;
let allToggle = false;
let randomQuad = 1;
let mode = 1;
let flashHalfDone = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function updateFade(quadFadeDirections_) {
  // Updates the fade values, goes up if its position 
  // in quadDirections is true and down if it's false
  for (let i = 0; i < 4; i++) {
    if (quadFadeDirections_[i]) {
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

function drawRectangle(quadFadeValues_) {
  // Draws the four rectangles, taking into account its quadFadeValue
  fill(quadFadeValues_[0], quadFadeValues_[0], 255);
  rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2);

  fill(255, quadFadeValues_[1], quadFadeValues_[1]);
  rect(0, 0, windowWidth / 2, windowHeight / 2);

  fill(quadFadeValues_[2], 255, quadFadeValues_[2]);
  rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
  
  fill(255, quadFadeValues_[3], 255);
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
    // Increases the fade value if it hasn't hit the max value yet
    quadFadeDirections[quad_ - 1] = true;
  }
  else if (quadFadeValues[quad_ - 1] === MIN_VALUE && !flashHalfDone) {
    // Once it's at the max value, changes the flashHalfDone variable
    flashHalfDone = true;
  }
  else if (quadFadeValues[quad_ - 1] !== MAX_VALUE) {
    // Decreases the fade value if it has already hit the max fade value
    quadFadeDirections[quad_ - 1] = false;
  }
  else {
    // Once it's done, set the logic mode to returnMode and reset flashHalfDone
    mode = returnMode;
    flashHalfDone = false;
  }
}

function logic(mode) {
  // Main logic function
  quadFadeDirections = [false, false, false, false];
  
  // Returns the mode from random flashing to normal logic
  // It had to be put here, it did not work in the keyTyped() function
  if (key === 't' && mode === 2) {
    mode = 1;
  }
  
  
  if (mode === 1) {
    // Normal logic, made according to instructions
    if (mouseInQuadrant !== 2) {
      allToggle = false;
    }
    
    if (mouseInQuadrant === 1 || mouseInQuadrant === 3) {
      quadFadeDirections[mouseInQuadrant - 1] = true;
    }

    if (bottomRightToggle) {
      quadFadeDirections[3] = true;
    }
    else {
      quadFadeDirections[3] = false;
    }

    if (allToggle) {
      quadFadeDirections = [true, true, true, true];
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

function drawDividingLines(thickness) {
  // Draws the dividing lines
  strokeWeight(thickness);
  line(0, windowHeight / 2, windowWidth, windowHeight / 2);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
}

function draw() { 
  // Main draw loop
  mouseInQuadrant = detectMouse();

  background(MAX_VALUE);
  
  logic(mode);
  
  updateFade(quadFadeDirections);
  
  drawRectangle(quadFadeValues);

  drawDividingLines(LINE_THICKNESS);
}