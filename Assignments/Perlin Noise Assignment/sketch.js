// Perlin Noise Assignment
// Thomas Schorr
// March 6th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let currentRectangleHeight, time;

let originalTime = 1000;
let timeDelta = 0.01;

const RECTANGLE_WIDTH = 3;
const PAN_DELTA = 0.1;
const PAN_DEAD_ZONE = 500;

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
  let averageHeight = [0, 0];
  let tallestPoint = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < width; i += RECTANGLE_WIDTH) {
    currentRectangleHeight = map(noise(time), 0, 1, 0, height * 0.8);
    
    rect(i, height, RECTANGLE_WIDTH, -currentRectangleHeight);
    
    time += timeDelta;

    averageHeight[0] += 1;
    averageHeight[1] += height - currentRectangleHeight;
    if (currentRectangleHeight > tallestPoint[0]) {
      tallestPoint[0] = currentRectangleHeight;
      tallestPoint[1] = i;
    }
  }
  drawFlag(tallestPoint);
  drawAverage(averageHeight);
}

function drawAverage(averageHeight_) {
  // Draws the average bar
  fill(50, 50, 225, 95);
  rect(0, averageHeight_[1] / averageHeight_[0] + 5, width, -5);
  print(averageHeight_);
}

function drawFlag(tallestPoint_) {
  // Draws the flag at the highest point
  strokeWeight(1.5);
  fill (150);
  triangle(tallestPoint_[1] + RECTANGLE_WIDTH / 2, height - tallestPoint_[0] - 40, tallestPoint_[1] + RECTANGLE_WIDTH / 2, height - tallestPoint_[0] - 20, tallestPoint_[1] + 25, height - tallestPoint_[0] - 30);
  fill(0);
  rect(tallestPoint_[1] - RECTANGLE_WIDTH / 2, height - tallestPoint_[0] + 40, RECTANGLE_WIDTH / 2, -80);
  strokeWeight(0);
}

function panCamera() {
  // Senses where the camera is and changes originalTime accordingly
  if (mouseX < width / 2 - PAN_DEAD_ZONE / 2) {
    originalTime -= PAN_DELTA;
  }
  else if (mouseX > width / 2 + PAN_DEAD_ZONE / 2) {
    originalTime += PAN_DELTA;
  }
}

function keyPressed() {
  // Changes the size of the terrain
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