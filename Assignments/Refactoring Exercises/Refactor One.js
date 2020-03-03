let x,y,xSpeed,ySpeed;
const BOX_WIDTH = 250;
const BOX_HEIGHT = 75;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Current X and Y positons of the box
  x=200; 
  y=300; 
  // Amount the X and Y values change every frame
  xSpeed=random(3,8); 
  ySpeed=random(3,8);
}

function draw() {
  background(80,80,80);
  updatePositions(); // Updates the rectangle's positions
  rect(x, y, BOX_WIDTH, BOX_HEIGHT); // Draws the rectangle
}

function updatePositions(){
  // Updates the x and y values
  x+=xSpeed; y+=ySpeed;
  
  // If the box hits the edge, invert the correct value
  if (y >= height - BOX_HEIGHT || y <= 0){
    ySpeed= -ySpeed;
  }
  if (x >= width - BOX_WIDTH || x <= 0){
    xSpeed= -xSpeed;
  }
}