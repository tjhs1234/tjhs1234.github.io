// This example is adapted from Learning Processing Example 5-3 by Daniel Shiffman
// http://www.learningprocessing.com
// Refactor the following code. Be sure the refactored version:
//  - is readable
//  - is able to work easily with any canvas size

function setup() {
  createCanvas(480, 270);
}

function drawRectangles() {
  // Draws a rectangle in the quadrant where the mouse is
  
  if (mouseX < width / 2 && mouseY < height / 2){
    // Top left quadrant
    rect(0, 0, width / 2, height / 2);
  }
  
  else if (mouseX > width / 2 && mouseY < height / 2){
    // Top right quadrant
    rect(width / 2, 0, width / 2, height / 2);
  }
  
  else if (mouseX < width / 2 && mouseY > height / 2){
    // Bottom left quadrant
    rect(0, height / 2, width / 2, height / 2);
  }
  
  else if (mouseX > width / 2 && mouseY > height / 2){
    // Bottom right quadrant
    rect(width / 2, height / 2, width / 2, height / 2);
  }
}

function draw() {
  background(255);
  stroke(0);
  fill(0);

  drawRectangles();
  
  // Draws the dividing lines
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
}