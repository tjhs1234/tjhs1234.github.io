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

let currentRectangleHeight;
let rectangleWidth = 1;
let timeDelta = 0.0025; // Roughness of the terrain
let originalTime = 65536; // Starting position of camera. Should be far away from zero, since the terrain at zero is mirrored

//C//O//N//S//T//A//N//T//S//
const PAN_DELTA = 0.3; // Speed the camera will pan at
const DEAD_ZONE = 200; // Size of area in pixels the mouse can be without panning the camera
const LOWER_TERRAIN_AMOUNT = 1.2; // Lowers the terrain so it doesn't take up so much of the screen
const MAX_TIME_DELTA = 0.04; // The roughest the terrain can be
const MIN_TIME_DELTA = 0.00015625; // The smoothest the terrain can be
const MAX_RECTANGLE_WIDTH = 256;
const MIN_RECTANGLE_WIDTH = 1;
const FLAG_WIDTH = 40;
const FLAG_HEIGHT = 40;
const AVERAGE_BAR_THICKNESS = 10;
//C//O//N//S//T//A//N//T//S//

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function generateTerrain() {
  // This function generates and draws the terrain, then calls
  // the functions that will render the average bar and flag
  fill(0);
  // Defining variables for the average bar and flag
  let time = originalTime; // This time variable will count with
  let totalRectangles = width / rectangleWidth; // Number of rectangles across the screen
  let totalHeight = 0; // Total height of all the rectangles added together
  let tallestX = 0; // X position of the tallest point
  let tallestY = 0; // Y position of the tallest point
  
  for (let i = 0; i < width; i += rectangleWidth) {
    
    currentRectangleHeight = map(noise(time), 0, 1, 0, height / LOWER_TERRAIN_AMOUNT); // Calculates the rectangle's height
    
    rect(i, height, rectangleWidth, -currentRectangleHeight); // Draws the rectangle
    
    time += timeDelta;

    totalHeight += height - currentRectangleHeight; // Adds the rectangle's height to the total height variable
    if (currentRectangleHeight > tallestY) { // If the rectangle is the tallest one so far, it updates the tallestPoint list
      tallestY = currentRectangleHeight; // Sets the height
      tallestX = i; // Sets the current x position
    }
  }
  
  // Draws the flag and average bar
  drawFlag(tallestX, tallestY);
  drawAverage(totalHeight, totalRectangles);
}

function drawAverage(totalHeight_, totalRectangles_) {
  // Draws the average bar
  fill(255, 50, 50, 95);
  rect(0, totalHeight_ / totalRectangles_ + AVERAGE_BAR_THICKNESS / 2, width, - AVERAGE_BAR_THICKNESS);
}

function drawFlag(tallestX, tallestY) {
  // Draws the flag
  fill(150,0,0);
  strokeWeight(2);
  
  triangle(tallestX + FLAG_WIDTH / 8, height - tallestY - FLAG_HEIGHT, tallestX + FLAG_WIDTH / 8, height - tallestY - FLAG_HEIGHT / 2, tallestX + FLAG_WIDTH / 2 + 5, height - tallestY - FLAG_HEIGHT / 1.333333333);
  fill(0);
  
  rect(tallestX - FLAG_WIDTH / 10, height - tallestY + FLAG_HEIGHT, FLAG_WIDTH / 5, -FLAG_HEIGHT * 2);
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
    timeDelta = timeDelta * 2; // The time delta also needs to change here to account for the different time amounts being covered with different rectangle sizes
  }
  else if (key === "d" && rectangleWidth > MIN_RECTANGLE_WIDTH) {
    rectangleWidth = rectangleWidth / 2;
    timeDelta = timeDelta / 2;
  }
}

function draw() {
  // Main loop
  background(220);
  panCamera();
  generateTerrain();
}