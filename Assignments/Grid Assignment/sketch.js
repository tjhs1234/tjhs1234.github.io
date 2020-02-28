// Multi-Coloured Grid Assignment
// Thomas Schorr
// February 27th, 2020
//
// Extra for Experts:
// Made the rectangles automatically fit the screen
// Added a few color presets

let squaresInLine = 16;
let squareMoveAmount = 0;
let fillColor = [0,0,0];
let windowRatio = 0;
let verticalSquaresInLine = 0;
let verticalSquareMoveAmount = 0;

//C//O//N//S//T//A//N//T//S//
const COLOR_SCHEME = "horizonalStripe" ;
const INCREASE_VALUE = 2 ;
const MAX_SQUARE_AMOUNT = 64 ;
const MIN_SQUARE_AMOUNT = 2 ;
const LINE_THICKNESS = 50 ;
//C//O//N//S//T//A//N//T//S//

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateValues();
  circleGrid();
}

function keyPressed() {
  // Resets colors of a key other than shift is pressed
  if (key !== "Shift") {
    circleGrid();
  }
}

function calculateValues() {
  // Recalculates ratios in the event of the size changing
  squareMoveAmount = windowWidth / squaresInLine;
  windowRatio = height / width;
  verticalSquaresInLine = squaresInLine * windowRatio;
  verticalSquareMoveAmount = squareMoveAmount * windowRatio;
}

function mouseClicked() {
  
  if (mouseButton === LEFT && key === "Shift" && keyIsPressed && squaresInLine > MIN_SQUARE_AMOUNT) {
    squaresInLine = squaresInLine / INCREASE_VALUE;
    calculateValues();
  }
  
  else if (mouseButton === LEFT && !keyIsPressed && squaresInLine < MAX_SQUARE_AMOUNT) {
    squaresInLine = squaresInLine * INCREASE_VALUE;
    calculateValues();
  }
  circleGrid();
}

function setRandomColor(x_, y_, scheme) {
  // Gives a random RGB value using a preset
  if (scheme === "green") {
    fillColor[0] = random(50, 100);
    fillColor[1] = random(100, 200);
    fillColor[2] = random(50, 100);
  }
  else if (scheme === "light") {
    fillColor[0] = random(175, 255);
    fillColor[1] = random(200, 255);
    fillColor[2] = random(125, 150);
  }
  else if (scheme === "horizonalStripe") {
    fillColor[0] = (x_ + y_) / 10;
    fillColor[1] = 0;
    fillColor[2] = 255 - (x_ + y_) / 10;
  }
  else {
    fillColor[0] = random(0, 255);
    fillColor[1] = random(0, 255);
    fillColor[2] = random(0, 255);
  }
}

function circleGrid() {
  if (squareMoveAmount !== 0) {
    for (let x = 0; x < width; x += squareMoveAmount) {
      for (let y = 0; y < height; y += verticalSquareMoveAmount) {
        strokeWeight(LINE_THICKNESS / squaresInLine);
        setRandomColor(x, y, COLOR_SCHEME);
        fill(fillColor[0], fillColor[1], fillColor[2]);
        rect(x,y,squareMoveAmount,verticalSquareMoveAmount);
      }
    }
  }
}

function draw() {
  print(squaresInLine);
}