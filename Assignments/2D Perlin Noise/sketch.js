// ̶ ̶M̶̶̶u̶̶̶l̶̶̶t̶̶̶i̶̶̶-̶̶̶C̶̶̶o̶̶̶l̶̶̶o̶̶̶u̶̶̶r̶̶̶e̶̶̶d̶̶̶ ̶̶̶G̶̶̶r̶̶̶i̶̶̶d̶̶̶ ̶̶̶A̶̶̶s̶̶̶s̶̶̶i̶̶̶g̶̶̶n̶̶̶m̶̶̶e̶̶̶n̶̶̶t̶̶̶  2D perlin noise
// Thomas Schorr
// March 10th, 2020

let squaresInLine = 16; // Number of squares in a horizontal line
let squareMoveAmount = 0;
let fillColor = [0,0,0];
let windowRatio = 0;
let verticalSquaresInLine = 0;
let verticalSquareMoveAmount = 0;

//C//O//N//S//T//A//N//T//S//
const INCREASE_VALUE = 2 ; // The amount to increase the rectangles, must be a perfect square
const MAX_SQUARE_AMOUNT = 512 ; // Must be a perfect square
const MIN_SQUARE_AMOUNT = 2 ; // Must be a perfect square
const LINE_THICKNESS = 50 ;
const MOVEMENT_DELTA = 100;
//C//O//N//S//T//A//N//T//S//

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateValues();
  rectGrid();
}

function calculateValues() {
  // Recalculates ratios in the event of the size of squares changing
  squareMoveAmount = windowWidth / squaresInLine; // The horizontal size of a rectangle
  windowRatio = height / width; // Ratio of horizontal pixels to vertical pixels
  verticalSquaresInLine = squaresInLine * windowRatio; // Number of vertical squares per line
  verticalSquareMoveAmount = squareMoveAmount * windowRatio; // The vertical size of rectangels
}

function mouseClicked() {
  // Changes the size of each squares
  if (mouseButton === LEFT && key === "Shift" && keyIsPressed && squaresInLine > MIN_SQUARE_AMOUNT) {
    // Makes the squares bigger if shift clicked
    squaresInLine = squaresInLine / INCREASE_VALUE;
    calculateValues();
  }
  else if (mouseButton === LEFT && !keyIsPressed && squaresInLine < MAX_SQUARE_AMOUNT) {
    // Makes the squares smaller if normal clicked
    squaresInLine = squaresInLine * INCREASE_VALUE;
    calculateValues();
  }
  // Redraws the squares each time the size is adjusted
  rectGrid();
}

function rectGrid() {
  // Draws the rectangle grid
  if (squareMoveAmount !== 0) {
    for (let x = 0; x < width; x += squareMoveAmount) {
      for (let y = 0; y < height; y += verticalSquareMoveAmount) {
        // Specific details for each rectangle
        strokeWeight(LINE_THICKNESS / squaresInLine);
        fill(map(noise(x / MOVEMENT_DELTA, y / MOVEMENT_DELTA), 0, 1, 0, 255));
        rect(x,y,squareMoveAmount,verticalSquareMoveAmount);
      }
    }
  }
}