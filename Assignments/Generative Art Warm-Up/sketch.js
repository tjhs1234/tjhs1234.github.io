// Generative Art Warp=Up
// Thomas Schorr
// March 13th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let sinePeriod = 0.4;
let startX = 300;
let startY = 430;
let endX = 700;
let SIN_UPDATE = 0.000208;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawSingleLine() {
  let newSinePeriod = sinePeriod;
  let stepNumber = 0;
  let y = startY;
  let yUpdate;
  for (let x = startX; x < endX; x += newSinePeriod) {
    stepNumber++;
    yUpdate = sin(stepNumber / 75);
    y += yUpdate;
    if (newSinePeriod - SIN_UPDATE > 0.0001){
      newSinePeriod -= SIN_UPDATE;
      line(x, y, x + sinePeriod, y + yUpdate);
    }
  }
}

function keyTyped() {
  if (key === "a") {
    sinePeriod += 0.1;
  }
  if (key === "d") {
    sinePeriod -= 0.1;
  }
}

function draw() {
  background(220);

  drawSingleLine();

}
