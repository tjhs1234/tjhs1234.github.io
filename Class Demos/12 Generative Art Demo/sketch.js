// 12 Generative Art Demo

// Rectangel disarray

const GRID_SIZE = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function border() {
  strokeWeight(15);
  rect(0, 0, width, height);
  strokeWeight(1);
}

function drawRectangle(x, y, translationalDisorder, rotationalDisorder) {
  rotate(random(-rotationalDisorder, rotationalDisorder));
  rect(x + random(-translationalDisorder, translationalDisorder), y + random(-translationalDisorder, translationalDisorder), GRID_SIZE, GRID_SIZE);
  rotate(0);
}

function drawGrid() {
  for (let x = GRID_SIZE / 2; x < width; x += GRID_SIZE) {
    for (let y = GRID_SIZE / 2; y < height; y += GRID_SIZE) {
      drawRectangle(x, y, y / 100000, y / 100000);
    }
  }
}

function draw() {
  background(100);
  drawGrid();
  randomSeed(mouseX);
}
