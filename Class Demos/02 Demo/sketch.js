// Demo 02
// Thomas Schorr
// February 5th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x,y,xVel,yVel;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  xVel = 0;
  yVel = 0;
  
}

function draw() {
  background(100);
  character(x, y);
  movement();
}

function character(x, y) {
  fill(0, 200, 0);
  strokeWeight(1);
  ellipse(x, y, 40, 40); // Head
  fill(255, 255, 255);
  if (!keyIsDown(DOWN_ARROW)) {
    ellipse(x - 9, y - 9, 10, 10); // Left Eye
    ellipse(x + 9, y - 9, 10, 10); // Right Eye
  }
  strokeWeight(2);
  line(x - 5, y + 10, x + 5, y + 10); // Mouth
}

function movement() {
  if (keyIsDown(LEFT_ARROW)) {
    xVel -= 2;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xVel += 2;
  }
  if (x + xVel > 0 && x + xVel < windowWidth){
    x += xVel;
  }
  if (xVel > 0){
    xVel -= xVel*0.1;
  }
  else if (xVel < 0){
    xVel += xVel*-0.1;
  }
}

