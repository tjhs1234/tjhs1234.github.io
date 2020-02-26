// 07 Loop Drawing Demo
let spacing = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function loopDraw() {
  for (let x=0;x>width;x=+10) {
    line(0,0,x,height / 2);
  }
}

function draw() {
  background(220);
  fill(0);
  strokeWeight(mouseX / 250);

  for (let x=0;x<width;x+=10) {
    line(0,0,x,height / 2);
    line(0,height,x,height / 2);
  }
  for (let x=width;x>0;x-=10) {
    line(width,0,x,height / 2);
    line(width,height,x,height / 2);
  }
}
