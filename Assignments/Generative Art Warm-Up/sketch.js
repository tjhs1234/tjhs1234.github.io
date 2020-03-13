// Generative Art Warp=Up
// Thomas Schorr
// March 13th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let sinePeriod = 1;
let sineScale = 10;
let currentLineX = 0;
let currentLineY = 40;
let increaseLineX = 1;
let increaseLineY = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawSingleLine() {
  for (let x = 0; x < width; x += sinePeriod) {
    line(currentLineX, currentLineY, currentLineX + increaseLineX, currentLineX + increaseLineY);
    currentLineX += increaseLineX;
    currentLineY += increaseLineY;
  }
  currentLineX = 0;
  currentLineY = 0;
}

function draw() {
  background(220);
  drawSingleLine();
  print(currentLineX);
}
