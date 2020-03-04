// Multi-Coloured Grid Assignment
// Thomas Schorr
// February 27th, 2020
//
// Extra for Experts:
// Made the rectangles automatically fit the screen
// Added a few color presets

let squaresInLine = 16; // Number of squares in a horizontal line
let squareMoveAmount = 0;
let fillColor = [0,0,0];
let windowRatio = 0;
let verticalSquaresInLine = 0;
let verticalSquareMoveAmount = 0;

//C//O//N//S//T//A//N//T//S//
const COLOR_SCHEME = "horizontalStripe" ; // Color presets: red, green, blue, horizontalstripe, light
const INCREASE_VALUE = 2 ; // The amount to increase the rectangles, must be a perfect square
const MAX_SQUARE_AMOUNT = 64 ; // Must be a perfect square
const MIN_SQUARE_AMOUNT = 2 ; // Must be a perfect square
const LINE_THICKNESS = 50 ;
//C//O//N//S//T//A//N//T//S//

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateValues();
  circleGrid();
}

function keyPressed() {
  // Resets colors if a key other than shift is pressed
  if (key !== "Shift") {
    circleGrid();
  }
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
  circleGrid();
}

function setRandomColor(x_, y_, scheme) {
  // Gives a random RGB value using a preset
  if (scheme === "red") {
    fillColor[0] = random(150, 255);
    fillColor[1] = random(50, 100);
    fillColor[2] = random(50, 100);
  }
  else if (scheme === "green") {
    fillColor[0] = random(50, 100);
    fillColor[1] = random(150, 255);
    fillColor[2] = random(50, 100);
  }
  else if (scheme === "blue") {
    fillColor[0] = random(50, 100);
    fillColor[1] = random(50, 100);
    fillColor[2] = random(150, 255);
  }
  else if (scheme === "light") {
    fillColor[0] = random(175, 255);
    fillColor[1] = random(200, 255);
    fillColor[2] = random(125, 150);
  }
  else if (scheme === "horizontalStripe") {
    fillColor[0] = (x_ + y_) / 10;
    fillColor[1] = 0;
    fillColor[2] = 255 - (x_ + y_) / 10;
  }
  // Gives random values if no value or an unrecognized value is entered
  else {
    fillColor[0] = random(0, 255);
    fillColor[1] = random(0, 255);
    fillColor[2] = random(0, 255);
  }
}

function circleGrid() {
  // Draws the rectangle grid
  if (squareMoveAmount !== 0) {
    for (let x = 0; x < width; x += squareMoveAmount) {
      for (let y = 0; y < height; y += verticalSquareMoveAmount) {
        // Specific details for each rectangle
        strokeWeight(LINE_THICKNESS / squaresInLine);
        setRandomColor(x, y, COLOR_SCHEME);
        fill(fillColor[0], fillColor[1], fillColor[2]);
        rect(x,y,squareMoveAmount,verticalSquareMoveAmount);
      }
    }
  }
}