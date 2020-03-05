// Chess Board
let currentFill = 0;

const SQUARE_SIZE = 75;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const MAX_FILL = 255;
const MIN_FILL = 0;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function changeFill() {
  // Code that flips the fill value from MIN_FILL to MAX_FILL or the inverse
  currentFill += MAX_FILL;
  if (currentFill > MAX_FILL + MIN_FILL) {
    currentFill = MIN_FILL;
  }
}

function drawBoard() {
  // Draws a checkerboard pattern
  currentFill = MAX_FILL;
  
  for (let y = 0; y < CANVAS_HEIGHT; y += SQUARE_SIZE) {
    // Code that happens for every row
    changeFill(); // Changes the fill after every row to maintain a checkerboard pattern
    
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