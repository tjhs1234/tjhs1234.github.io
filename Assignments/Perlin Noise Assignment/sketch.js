// Perlin Noise Assignment
// Thomas Schorr
// March 6th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let currentRectangleHeight, time;

let originalTime = 1000;
let rectangleWidth = 1;
let timeDelta = 0.01;

const PAN_DELTA = 0.1;
const DEAD_ZONE = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNER);
  fill(0);

  currentRectangleHeight = 1;
  time = 0;
  strokeWeight(0);
}

function generateTerrain() {
  fill(0);
  time = originalTime;
  let totalHeight = 0;
  let rectangleNumber = 0;
  let tallestPoint = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < width; i += rectangleWidth) {
    currentRectangleHeight = map(noise(time), 0, 1, 0, height * 0.8);
    
    rect(i, height, rectangleWidth, -currentRectangleHeight);
    
    time += timeDelta;

    rectangleNumber += 1;
    totalHeight += height - currentRectangleHeight;
    if (currentRectangleHeight > tallestPoint[0]) {
      tallestPoint[0] = currentRectangleHeight;
      tallestPoint[1] = i;
    }
  }
  drawFlag(tallestPoint);
  drawAverage(totalHeight, rectangleNumber);
}

function drawAverage(totalHeight_,rectangleNumber_) {
  // Draws the average bar
  fill(50, 50, 225, 95);
  rect(0, totalHeight_ / rectangleNumber_ + 5, width, -5);
}

function drawFlag(tallestPoint_) {
  triangle(tallestPoint_[1] + 5, height - tallestPoint_[0] - 40, tallestPoint_[1] + 5, height - tallestPoint_[0] - 20, tallestPoint_[1] + 25, height - tallestPoint_[0] - 30);
  rect(tallestPoint_[1] - 5, height - tallestPoint_[0] + 40, 10, -80);
}

function panCamera() {
  if (mouseX < width / 2 - DEAD_ZONE / 2) {
    originalTime -= PAN_DELTA;
  }
  else if (mouseX > width / 2 + DEAD_ZONE / 2) {
    originalTime += PAN_DELTA;
  }
}

function keyPressed() {
  if (key === "w") {
    timeDelta = timeDelta * 2;  
  }
  else if (key === "s") {
    timeDelta = timeDelta / 2;
  }
}

function draw() {
  panCamera();
  
  background(220);
  generateTerrain();
}