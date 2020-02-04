// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let r = 0;
let g = 0;
let b = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(r);
  ellipse(mouseX, mouseY, mouseX / 5, mouseX / 5);
  fill(255,g,b)
}
function mousePressed() {
  if (r === 0) {
    r = 255;
  }
  else {
    r = 0;
  }
}
