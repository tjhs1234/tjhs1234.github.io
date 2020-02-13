// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const FADE_SPEED = 10;
const MAX_RGB = 255;
let mouseInQuadrant;
let quad1Fade = MAX_RGB;
let quad2Fade = MAX_RGB;
let quad3Fade = MAX_RGB;
let quad4Fade = MAX_RGB;
let allFade = MAX_RGB;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawRectangle(quadrant) {
  strokeWeight(0);
  fill(MAX_RGB);
  if (quadrant === 1) {
    if (quad1Fade - FADE_SPEED > 128) {
      quad1Fade -= FADE_SPEED;
    }
    else {
      quad1Fade = 128;
    }
    fill(quad1Fade);
    rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2 + 1);
  }
  else {
    quad1Fade = MAX_RGB;
  }
  if (quadrant === 2) {
    if (quad2Fade - FADE_SPEED > 128) {
      quad2Fade -= FADE_SPEED;
    }
    else {
      quad2Fade = 128;
    }
    fill(quad2Fade);
    rect(0, 0, windowWidth / 2, windowHeight / 2 + 1);
  }
  else {
    quad2Fade = MAX_RGB;
  }
  if (quadrant === 3) {
    if (quad3Fade - FADE_SPEED > 128) {
      quad3Fade -= FADE_SPEED;
    }
    else {
      quad3Fade = 128;
    }
    fill(quad3Fade);
    rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
  }
  else {
    quad3Fade = MAX_RGB;
  }
  if (quadrant === 4) {
    if (quad4Fade - FADE_SPEED > 128) {
      quad4Fade -= FADE_SPEED;
    }
    else {
      quad4Fade = 128;
    }
    fill(quad4Fade);
    rect(windowWidth, windowHeight, -windowWidth / 2, -windowHeight / 2);
  }
  else {
    quad4Fade = MAX_RGB;
  }
  if (quadrant === 5) {
    fill(150);
    rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2 + 1);
    rect(0, 0, windowWidth / 2, windowHeight / 2 + 1);
    rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
    rect(windowWidth, windowHeight, -windowWidth / 2, -windowHeight / 2);
  }
  else {
    allFade = MAX_RGB;
  }
}

function detectMouse() {
  if (mouseX >= windowWidth / 2 && mouseY <= windowHeight / 2) {
    mouseInQuadrant = 1;
  }
  else if (mouseX <= windowWidth / 2 && mouseY <= windowHeight / 2) {
    mouseInQuadrant = 2;
  }
  else if (mouseX <= windowWidth / 2 && mouseY >= windowHeight / 2) {
    mouseInQuadrant = 3;
  }
  else {
    mouseInQuadrant = 4;
  }
}

function draw() {
  background(MAX_RGB);
  detectMouse();
  drawRectangle(mouseInQuadrant);
  strokeWeight(2);
  line(0, windowHeight / 2, windowWidth, windowHeight / 2);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
}
