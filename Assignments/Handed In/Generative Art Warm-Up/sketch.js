// Generative Art Warp=Up
// Thomas Schorr
// March 13th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startX;
let endX;
let startY;

const WIDTH = 400; // Width of drawing
const STEP_DIVISION = 20; // Amount to divide the step number by
const SIN_UPDATE = 0.004200; // Amount to update the sine peroid each step
const SINE_PERIOD = 1.9; // Stretch of the x axis
const SIN_CUTOFF = 0.5; // Lowest allowed sine period
const LINE_NUM = 90; // Amount of lines
const LINE_MOVE = 4; // Space between each line

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Centers the art in the middle of the screen
  startY = height / 3;
  startX = width / 3;
  endX = startX + WIDTH;
}

function drawSingleLine(y_) {
  let newSinePeriod = SINE_PERIOD; // Sine period for this line only
  let stepNumber = 0; // Amount of steps taken
  let y = y_; // Y value for this line
  let yUpdate; // Amount to move y each step
  
  for (let x = startX; x < endX; x += newSinePeriod) {
    
    stepNumber++;
    yUpdate = -sin(stepNumber / STEP_DIVISION);
    y += yUpdate; // Updates the Y value
    
    if (newSinePeriod - SIN_UPDATE > SIN_CUTOFF){ // Prevents weird looking ends to lines
      newSinePeriod -= SIN_UPDATE; // Updates the sine period
      line(x, y, x + SINE_PERIOD, y + yUpdate);
    }
  }
}

function drawArt() {
  for (let lines = 0; lines < LINE_NUM; lines++) {
    // draws "LINE_NUM" lines
    drawSingleLine(startY + lines * LINE_MOVE);
  }
}

function draw() {
  // Main loop
  background(220);
  drawArt();
}
