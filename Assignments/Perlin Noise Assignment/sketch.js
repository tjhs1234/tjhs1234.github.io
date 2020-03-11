// Perlin Noise Assignment
// Thomas Schorr
// March 6th, 2020
//
// Extra for Experts:
// Did the mountain top challenge
// Did the average challenge
// You can pan in both directions with your mouse
// w and s change the time delta
// a and d change the rectangle size  

let currentRectangleHeight = 0;
let rectangleWidth = 1;
let timeDelta = 0.01;
let originalTime = 65536; // Starting position of camera. Should be far away from zero, since the terrain at zero is mirrored

//C//O//N//S//T//A//N//T//S//
const PAN_DELTA = 0.3; // Speed the camera will pan at
const DEAD_ZONE = 200; // Size of area in pixels the mouse can be without panning the camera
const LOWER_TERRAIN_AMOUNT = 1.2; // Lowers the terrain so it doesn't take up so much of the screen
const MAX_TIME_DELTA = 0.04;
const MIN_TIME_DELTA = 0.00125;
const MAX_RECTANGLE_WIDTH = 128;
const MIN_RECTANGLE_WIDTH = 1;
//C//O//N//S//T//A//N//T//S//

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNER);
  fill(0);
  currentRectangleHeight = 1;
  time = 0;
  strokeWeight(0);
}

function generateTerrain() {
  // This function generates and draws the terrain, then calls
  // the functions that render the average bar and flag
  fill(0);
  let time = originalTime; // This time variable will count with
  let average = [width / rectangleWidth, 0]; // A list to calculate the average height. First position is number of rectangles, and second position is total rectangle height.
  let tallestPoint = [0, 0]; // A list to calculate the tallest point. First position

  for (let i = 0; i < width; i += rectangleWidth) {
    currentRectangleHeight = map(noise(time), 0, 1, 0, height / LOWER_TERRAIN_AMOUNT); // Calculates the rectangle's height
    
    rect(i, height, rectangleWidth, -currentRectangleHeight); // Draws the rectangle
    
    time += timeDelta;

    average[1] += height - currentRectangleHeight; // Adds the rectangle's height to the total height variable
    if (currentRectangleHeight > tallestPoint[0]) { // If the rectangle is the tallest one so far, it updates the tallestPoint list
      tallestPoint[0] = currentRectangleHeight;
      tallestPoint[1] = i;
    }
  }
  // Draws the flag and average bar
  drawFlag(tallestPoint);
  drawAverage(average);
}

function drawAverage(average_) {
  // Draws the average bar
  fill(50, 50, 225, 95);
  rect(0, average_[1] / average_[0] + 5, width, -10 );
}

function drawFlag(tallestPoint_) {
  // Draws the flag
  fill(150,0,0);
  strokeWeight(2);
  triangle(tallestPoint_[1] + 5, height - tallestPoint_[0] - 40, tallestPoint_[1] + 5, height - tallestPoint_[0] - 20, tallestPoint_[1] + 25, height - tallestPoint_[0] - 30);
  fill(0);
  rect(tallestPoint_[1] - 5, height - tallestPoint_[0] + 40, 10, -80);
  strokeWeight(0);
}

function panCamera() {
  // Calculates the amount of time to pan through taking into
  // account the amount of time in view and the rectangle sizes
  if (mouseX < width / 2 - DEAD_ZONE / 2) {
    originalTime -= PAN_DELTA * (timeDelta / MAX_TIME_DELTA) / rectangleWidth;
  }
  else if (mouseX > width / 2 + DEAD_ZONE / 2) {
    originalTime += PAN_DELTA * (timeDelta / MAX_TIME_DELTA) / rectangleWidth;
  }
}

function keyPressed() {
  // Changes the time delta
  if (key === "w" && timeDelta < MAX_TIME_DELTA) {
    timeDelta = timeDelta * 2;  
  }
  else if (key === "s" && timeDelta > MIN_TIME_DELTA) {
    timeDelta = timeDelta / 2;
  }
  
  // Changes the rectangle size
  if (key === "a" && rectangleWidth < MAX_RECTANGLE_WIDTH) {
    rectangleWidth = rectangleWidth * 2;
    timeDelta = timeDelta * 2; // The time delta also needs to change here to account for the different time amounts being covered
  }
  else if (key === "d" && rectangleWidth > MIN_RECTANGLE_WIDTH) {
    rectangleWidth = rectangleWidth / 2;
    timeDelta = timeDelta / 2; // The time delta also needs to change here to account for the different time amounts being covered
  }
}

function draw() {
  panCamera();
  
  background(220);
  generateTerrain();
}