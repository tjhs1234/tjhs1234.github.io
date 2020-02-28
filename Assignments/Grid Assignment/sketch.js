// Multi-Coloured Grid Assignment
// Thomas Schorr
// February 27th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let squaresInLine = 50;
let squareMoveAmount = 0;
let fillColor = [0,0,0];
let windowRatio = 0;
let verticalSquaresInLine = 0;
let verticalSquareMoveAmount = 0;

const COLOR_SCHEME = 5;
const INCREASE_VALUE = 2;
const MAX_SQUARE_AMOUNT = 160;
const MIN_SQUARE_AMOUNT = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleGrid();
  squareMoveAmount = windowWidth / squaresInLine;
  windowRatio = height / width;
  verticalSquaresInLine = squaresInLine * windowRatio;
  verticalSquareMoveAmount = verticalSquaresInLine * windowRatio;
}

function keyPressed() {
  if (key !== "Shift") {
    //circleGrid();
  }
}

function mouseClicked() {
  if (mouseButton === LEFT && key === "Shift" && keyIsPressed && squaresInLine > MIN_SQUARE_AMOUNT) {
    //squaresInLine = squaresInLine / INCREASE_VALUE;
  }
  
  else if (mouseButton === LEFT && !keyIsPressed && squaresInLine < MAX_SQUARE_AMOUNT) {
    //squaresInLine = squaresInLine * INCREASE_VALUE;
  }
  circleGrid();
}

function setRandomColor() {
  if (COLOR_SCHEME === "green") {
    fillColor[0] = random(50, 150);
    fillColor[1] = random(200, 255);
    fillColor[2] = random(50, 150);
  }
  else if (COLOR_SCHEME === "light") {
    fillColor[0] = random(50, 150);
    fillColor[1] = random(200, 255);
    fillColor[2] = random(50, 150);
  }
}

function circleGrid() {
  for (let x = 0; x < width; x += squareMoveAmount) {
  print(squareMoveAmount);
  }
  //for (let x = 0; x < width; x += squareMoveAmount) {
    //for (let y = 0; y < height; y += verticalSquareMoveAmount) {

      //strokeWeight(0.7);
      //setRandomColor();
      //fill(fillColor[0], fillColor[1], fillColor[2]);
      //rect(x,y,squareMoveAmount,verticalSquareMoveAmount);
    //}
  //}
}

function draw() {

}
