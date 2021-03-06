// Black and White Target

const CIRCLE_X = 200;
const CIRCLE_Y = 200;
const MAX_SIZE = 400;
const MIN_SIZE = 0;
const INTERVAL_SIZE = 40; // Size difference between each circle

function setup() {
  createCanvas(MAX_SIZE, MAX_SIZE);
}

function drawCircles() {
  // Draws the circles using a for loop
  for (let i = MAX_SIZE; i > MIN_SIZE; i -= INTERVAL_SIZE) {
    ellipse(CIRCLE_X, CIRCLE_Y, i, i); // Draws the circle
  }
}

function draw() {
  background(240);
  drawCircles(); // Calls the function to draw the circles
}