// Perlin Noise Assignment
// Thomas Schorr
// March 6th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let currentRectangleHeight, heightTime;

let rectangleWidth = 1;
let timeChange = 0.01;
let totalHeight = 0;
let rectangleNumber = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNER);
  fill(0);

  currentRectangleHeight = 1;
  heightTime = 0;
  strokeWeight(0);
  background(250);
  generateTerrain();
}

function generateTerrain() {
  fill(0);
  
  totalHeight = 0;
  rectangleNumber = 0;

  for (let i = 0; i < width; i += rectangleWidth) {
    currentRectangleHeight = map(noise(heightTime), 0, 1, 0, height * 0.8);
    
    rect(i, height, rectangleWidth, -currentRectangleHeight);
    
    heightTime += timeChange;

    rectangleNumber += 1;
    totalHeight += height - currentRectangleHeight;
  }
  
  fill(50, 50, 225, 95);
  print(totalHeight / rectangleNumber);
  rect(0, totalHeight / rectangleNumber + 5, width, -5);

}

function keyPressed() {
  if (key === "a") {
    timeChange = timeChange * 2;
    heightTime = 0;
  }
  else if (key === "d") {
    timeChange = timeChange / 2;
    heightTime = 0;
  }
  
  background(220);
  generateTerrain();
}

function draw() {
}
