// 06 Image Demo
// Thomas Schorr
// February 25th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let movingLeft = true;
let lionL, lionR;

function preload() {
  lionL = loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode("center");
  noCursor();
}

function mouseDirection() {
  movingLeft = false;
}
function draw() {
  background(220);
  image(lionR,mouseX,mouseY);
  image(lionL,mouseX,mouseY);
  print(movingLeft);
}
