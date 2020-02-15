// State Variables Assignment
// Thomas Schorr
// February 12th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const FADE_SPEED = 10;
const MAX_VALUE = 255;
const MIN_VALUE = 0;
let mouseInQuadrant;
let quad1Fade, quad2Fade, quad3Fade, quad4Fade = MAX_VALUE;
let quadDirections = [false, false, false, false];
let bottomRightToggle = false;
let allToggle = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function updateFade(quad1, quad2, quad3, quad4) {
  
  if (quad1) {
    if (quad1Fade - FADE_SPEED > MIN_VALUE) {
      quad1Fade -= FADE_SPEED;
    }
    else {
      quad1Fade = MIN_VALUE;
    }
  }
  
  else {
    if (quad1Fade + FADE_SPEED < MAX_VALUE) {
      quad1Fade += FADE_SPEED;
    }
    else {
      quad1Fade = MAX_VALUE;
    }
  }
  

  if (quad2) {
    if (quad2Fade - FADE_SPEED > MIN_VALUE) {
      quad2Fade -= FADE_SPEED;
    }
    else {
      quad2Fade = MIN_VALUE;
    }
  }
  
  else {
    if (quad2Fade + FADE_SPEED < MAX_VALUE) {
      quad2Fade += FADE_SPEED;
    }
    else {
      quad2Fade = MAX_VALUE;
    }
  }


  if (quad3) {
    if (quad3Fade - FADE_SPEED > MIN_VALUE) {
      quad3Fade -= FADE_SPEED;
    }
    else {
      quad3Fade = MIN_VALUE;
    } 
  }

  else {
    if (quad3Fade + FADE_SPEED < MAX_VALUE) {
      quad3Fade += FADE_SPEED;
    }
    else {
      quad3Fade = MAX_VALUE;
    }
  }


  if (quad4) {
    if (quad4Fade - FADE_SPEED > MIN_VALUE) {
      quad4Fade -= FADE_SPEED;
    }
    else {
      quad4Fade = MIN_VALUE;
    } 
  }

  else {
    if (quad4Fade + FADE_SPEED < MAX_VALUE) {
      quad4Fade += FADE_SPEED;
    }
    else {
      quad4Fade = MAX_VALUE;
    }
  }
}

function drawRectangle() {

  fill(quad1Fade);
  rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2);

  fill(quad2Fade);
  rect(0, 0, windowWidth / 2, windowHeight / 2);

  fill(quad3Fade);
  rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
  
  fill(quad4Fade);
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

function quadDirectionLogic() {
  
  if (mouseInQuadrant !== 2) {
    allToggle = false;
  }

  quadDirections = [false, false, false, false];
  
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
  updateFade(quadDirections[0], quadDirections[1], quadDirections[2], quadDirections[3]);
  drawRectangle();
  quadDirectionLogic();

  // Dividing lines
  strokeWeight(2);
  line(0, windowHeight / 2, windowWidth, windowHeight / 2);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
}
