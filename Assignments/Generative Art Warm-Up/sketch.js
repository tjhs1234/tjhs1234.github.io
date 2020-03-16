// Generative Art Warp=Up
// Thomas Schorr
// March 13th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startX = 300;
let startY = 325;
let endX = 700;

const START_Y = 325;
const SIN_UPDATE = 0.004200;
const SINE_PERIOD = 1.9;
const SIN_CUTOFF = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawSingleLine() {
  let newSinePeriod = SINE_PERIOD;
  let stepNumber = 0;
  let y = startY;
  let yUpdate;
  for (let x = startX; x < endX; x += newSinePeriod) {
    stepNumber++;
    yUpdate = -sin(stepNumber / 20);
    y += yUpdate;
    if (newSinePeriod - SIN_UPDATE > SIN_CUTOFF){
      newSinePeriod -= SIN_UPDATE;
      line(x, y, x + SINE_PERIOD, y + yUpdate);
    }
  }
}

function drawArt() {
  for (let lines = 0; lines < 90; lines++) {
    drawSingleLine();
    startY = START_Y + lines * 4;
  }
}

function draw() {
  background(220);
  drawArt();

}
