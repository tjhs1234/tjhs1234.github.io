// State Variables Demo
// February 11th, 2020

let onLeft, onRight;
let leftFade = 0;
let rightFade = 0;
const FADE_SPEED = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  onLeft = true;
  onRight = false;
}

function updateCurrentSide() {
  // Update state variables to show
  // which side the mouse is on.
  if (mouseX < windowWidth / 2) {
    onLeft = true;
    onRight = false;
  }
  else {
    onLeft = false;
    onRight = true;
  }
}

function renderRectangle() {
  // Draw two rectangles of varying
  // fill values on the screen.
  if (onLeft) {
    fill (35, 230, 110, leftFade);
    leftFade += FADE_SPEED;
  }
  else {
    fill (255);
    leftFade = 0;
  }
  rect(0, 0, width / 2, height);
  if (onRight) {
    fill (35, 230, 110, rightFade);
    rightFade += FADE_SPEED;
  }
  else {
    fill (255);
    rightFade = 0;
  }
  rect(width / 2, 0, width / 2, height);
}

function draw() {
  updateCurrentSide();
  renderRectangle();
  if (mouseX > width * 0.25 && mouseX < width / 2 && mouseY > height * 0.25 && mouseY < height / 2) {
    fill(80, 60, 240, 120);
  }
  else {
    fill(240, 60, 80);
  }
  rect(width * 0.25, height * 0.25, width / 2, height / 2);
}
