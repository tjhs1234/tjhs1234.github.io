// This example is adapted from Learning Processing Example 5-3 by Daniel Shiffman
// http://www.learningprocessing.com
// Refactor the following code. Be sure the refactored version:
//  - is readable
//  - is able to work easily with any canvas size

function setup() {
  createCanvas(480, 270);
}

function draw() {
  background(255);
  stroke(0);
  
  // Draws the dividing lines
  line(240, 0, 240, 270);
  line(0, 135, 480, 135);
  
  fill(0);
  
  // Draws a rectangle in the quadrant where the mouse is
  if (mouseX < 240 && mouseY < 135){
    rect(0,0,240,135);
  }
  else if (mouseX > 240 && mouseY < 135){
    rect(240,0,240,135);
  }
  else if (mouseX < 240 && mouseY > 135){
    rect(0,135,240,135);
  }
  else if (mouseX > 240 && mouseY > 135){
    rect(240,135,240,135);
  }
}