// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const FADE_SPEED = 6;
const MAX_RGB = 255;
const MIN_RGB = 80;
let mouseInQuadrant;
let quad1Fade = MAX_RGB;
let quad2Fade = MAX_RGB;
let quad3Fade = MAX_RGB;
let quad4Fade = MAX_RGB;
let allFade = MAX_RGB;
let bottomRightToggle = false;
let allToggle = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawRectangle() {
  strokeWeight(0);
  fill(MAX_RGB);
  if (mouseInQuadrant === 1) {
    if (quad1Fade - FADE_SPEED > MIN_RGB) {
      quad1Fade -= FADE_SPEED;
    }
    else {
      quad1Fade = MIN_RGB;
    }
    fill(quad1Fade);
    rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2 + 1);
  }
  else {
    if (quad1Fade + FADE_SPEED < MAX_RGB) {
      quad1Fade += FADE_SPEED;
    }
    else {
      quad1Fade = MAX_RGB;
    }
    fill(quad1Fade);
    rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2 + 1);
  }
  
  if (mouseInQuadrant === 3) {
    if (quad3Fade - FADE_SPEED > MIN_RGB) {
      quad3Fade -= FADE_SPEED;
    }
    else {
      quad3Fade = MIN_RGB;
    }
    fill(quad3Fade);
    rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
  }
  else {
    if (quad3Fade + FADE_SPEED < MAX_RGB) {
      quad3Fade += FADE_SPEED;
    }
    else {
      quad3Fade = MAX_RGB;
    }
    fill(quad3Fade);
    rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
  }
  
  if (bottomRightToggle) {
    if (quad4Fade - FADE_SPEED > MIN_RGB) {
      quad4Fade -= FADE_SPEED;
    }
    else {
      quad4Fade = MIN_RGB;
    }
    fill(quad4Fade);
    rect(windowWidth, windowHeight, -windowWidth / 2, -windowHeight / 2);
  }
  else {
    if (quad4Fade + FADE_SPEED < MAX_RGB) {
      quad4Fade += FADE_SPEED;
    }
    else {
      quad4Fade = MAX_RGB;
    }
    fill(quad4Fade);
    rect(windowWidth, windowHeight, -windowWidth / 2, -windowHeight / 2);
  }
  if (allToggle) {
    if (allFade - FADE_SPEED > MIN_RGB) {
      allFade -= FADE_SPEED;
    }
    else {
      allFade = MIN_RGB;
    }
    fill(allFade);
    rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2 + 1);
    rect(0, 0, windowWidth / 2, windowHeight / 2 + 1);
    rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
    rect(windowWidth, windowHeight, -windowWidth / 2, -windowHeight / 2);
  }
  else {
    if (allFade + FADE_SPEED < MAX_RGB) {
      allFade += FADE_SPEED;
    }
    else {
      allFade = MAX_RGB;
    }
    fill(allFade);
    rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2 + 1);
    rect(0, 0, windowWidth / 2, windowHeight / 2 + 1);
    rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
    rect(windowWidth, windowHeight, -windowWidth / 2, -windowHeight / 2);
  }
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
  background(MAX_RGB);
  mouseInQuadrant = detectMouse();
  if (!(mouseInQuadrant === 2)) {
    allToggle = false;
  }
  drawRectangle();



  
  // Dividing lines
  strokeWeight(2);
  line(0, windowHeight / 2, windowWidth, windowHeight / 2);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
}
