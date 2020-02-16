// State Variables Assignment
// Thomas Schorr
// February 12th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const FADE_SPEED = 30;
const MAX_VALUE = 255;
const MIN_VALUE = 0;
let mouseInQuadrant;
let quadFadeValues = [MAX_VALUE, MAX_VALUE, MAX_VALUE, MAX_VALUE];
let quadDirections = [false, false, false, false];
let bottomRightToggle = false;
let allToggle = false;
let simonSays = [];
let simonSaysReplay = 0;
let simonSaysTest = 0; 
let mode = 1;
let flashHalfDone = false;
let quadToFlash = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function updateFade() {
  
  for (let i = 0; i < 4; i++) {
    if (quadDirections[i]) {
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

  fill(quadFadeValues[0]);
  rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2);

  fill(quadFadeValues[1]);
  rect(0, 0, windowWidth / 2, windowHeight / 2);

  fill(quadFadeValues[2]);
  rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
  
  fill(quadFadeValues[3]);
  rect(windowWidth, windowHeight, -windowWidth / 2, -windowHeight / 2);
}

function detectMouse() {
  
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
  mode = 3;
  if  (quadFadeValues[quad_ - 1] !== MIN_VALUE && !flashHalfDone) {
    quadDirections[quad_ - 1] = true;
  }
  else if (quadFadeValues[quad_ - 1] === MIN_VALUE && !flashHalfDone) {
    flashHalfDone = true;
  }
  else if (quadFadeValues[quad_ - 1] !== MAX_VALUE) {
    quadDirections[quad_ - 1] = false;
  }
  else {
    mode = returnMode;
    flashHalfDone = false;
  }
}

function logic(mode) {
  
  quadDirections = [false, false, false, false];
  
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
    }
  }

  else if (mode === 2) {
    simonSays[0] = Math.floor(Math.random() * 4) + 1;
    replaySimonSays();
  }

  else if (mode === 3) {
    flashQuad(quadToFlash, 4);
  }

  else if (mode === 4) {
    replaySimonSays();
  }
}

function replaySimonSays() {
  mode = 4;
  quadToFlash = simonSays[simonSaysReplay];
  flashQuad(quadToFlash, 4);
  if (simonSaysReplay < simonSays.length + 1){
    simonSaysReplay += 1;
  }
  if (simonSaysReplay === simonSays.length + 1) {
    simonSaysReplay = 0;
    mode = 2;
  }
}

function keyTyped() {

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
  
  background(MAX_VALUE);
  
  mouseInQuadrant = detectMouse();
  
  logic(mode);
  
  updateFade();
  
  drawRectangle();

  // Dividing lines
  strokeWeight(5);
  line(0, windowHeight / 2, windowWidth, windowHeight / 2);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
}
