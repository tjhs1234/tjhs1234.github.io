// Chess Board
let currentFill = 0;

const SQUARE_SIZE = 75;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function changeFill() {
  // Code that flips the fill value from 0 to 255 or the inverse
  currentFill += 255;
  if (currentFill > 255) {
    currentFill = 0;
  }
}

function drawBoard() {
  // Draws a checkerboard pattern
  currentFill = 255;
  
  for (let y = 0; y < CANVAS_HEIGHT; y += SQUARE_SIZE) {
    // Code that happens for every row
    changeFill(); // Changes the fill after every row to maintain checkerboard pattern
    
    for (let x = 0; x < CANVAS_WIDTH; x += SQUARE_SIZE) {
      // Code that happens for every square
      changeFill(); // Changes the fill value
      fill(currentFill);
      rect(x, y, SQUARE_SIZE, SQUARE_SIZE); // Draws the rectangle
    }
  }
}

function draw() {
  drawBoard();
}