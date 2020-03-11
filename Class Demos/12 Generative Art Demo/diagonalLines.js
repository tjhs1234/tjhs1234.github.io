// 12 Generative Art Demo

// Diagonal Line Art
let GRID_SIZE = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let seed = random(1000);
}

function diagonal(x, y, size, direction) {
  if (direction === 0) {
    line(x - size / 2, y + size / 2, x + size / 2, y - size / 2);
  }
  else if (direction === 1) {
    line(x - size / 2, y - size / 2, x + size / 2, y + size / 2);
  }
}

function border() {
  strokeWeight(15);
  rect(0, 0, width, height);
  strokeWeight(1);
}

function createTiles() {
  for (let x = GRID_SIZE / 2; x < width; x += GRID_SIZE) {
    for (let y = GRID_SIZE / 2; y < height; y += GRID_SIZE) {
      diagonal(x, y, GRID_SIZE, int(random(2)));
    }
  }
}

function draw() {
  background(220);
  border();
  createTiles();
  GRID_SIZE = map(mouseX, 0, width, 3, 100);
  randomSeed(1);
}
