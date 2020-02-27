// Multi-Coloured Grid Assignment
// Thomas Schorr
// February 27th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let squareSize = 10;
let fillcolor = [0,0,0];

const INCREASE_VALUE = 10;
const MAX_SQUARE_SIZE = 70;
const MIN_SQUARE_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleGrid();
}

function keyPressed() {
  if (key !== "Shift") {
    circleGrid();
  }
}

function mouseClicked() {
  if (mouseButton === LEFT && key === "Shift" && keyIsPressed && squareSize > MIN_SQUARE_SIZE) {
    squareSize -= INCREASE_VALUE;
  }
  
  else if (mouseButton === LEFT && !keyIsPressed && squareSize < MAX_SQUARE_SIZE) {
    squareSize += INCREASE_VALUE;
  }
  circleGrid();
}

function setRandomColor() {
  fillcolor[0] = random(0, 255);
  fillcolor[1] = random(0, 255);
  fillcolor[2] = random(0, 255);
}
//fillcolor[0], fillcolor[1], fillcolor[2]
function circleGrid() {
  for (let x = 0; x < width; x += squareSize) {
    for (let y = 0; y < height; y += squareSize) {
      strokeWeight(0.7);
      setRandomColor();
      fill(fillcolor[0], fillcolor[1], fillcolor[2]);
      rect(x,y,squareSize,squareSize);
    }
  }
}

function draw() {
  print(squareSize);
}
