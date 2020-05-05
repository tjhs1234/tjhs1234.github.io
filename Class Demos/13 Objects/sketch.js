// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Mover(100, 100);
}

function draw() {
  background(220);
  ball.move();
  ball.drawMover();
}

class Mover {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }
  drawMover() {
    ellipse(this.x, this.y, 30);
  }
}
