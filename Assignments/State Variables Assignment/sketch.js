// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mouseInQuadrant;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawRect(one, two, three, four) {
  strokeWeight(0)
  fill(one);
  rect(windowWidth, 0, -windowWidth / 2, windowHeight / 2 + 1);
  fill(two);
  rect(0, 0, windowWidth / 2, windowHeight / 2 + 1);
  fill(three);
  rect(0, windowHeight, windowWidth / 2, -windowHeight / 2);
  fill(four);
  rect(windowWidth, windowHeight, -windowWidth / 2, -windowHeight / 2);
}

function detectMouse() {
  if (mouseX >= windowWidth / 2 && mouseY <= windowHeight / 2) {
    return 1;
  }
  else if (mouseX <= windowWidth / 2 && mouseY <= windowHeight / 2) {
    return 2;
  }
  else if (mouseX <= windowWidth / 2 && mouseY >= windowHeight / 2) {
    return 3;
  }
  else {
    return 4;
  }
}

function draw() {
  background(220);
  print(detectMouse());
  if (detectMouse() === 1) drawRect(100, 200, 200, 200);
  else if (detectMouse() === 2) drawRect(200, 100, 200, 200);
  else if (detectMouse() === 3) drawRect(200, 200, 100, 200);
  else if (detectMouse() === 4) drawRect(200, 200, 200, 100);
}
