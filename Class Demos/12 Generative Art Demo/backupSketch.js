function setup() {
  createCanvas(windowWidth, windowHeight);
}

function border() {
  strokeWeight(15);
  rect(0,0,width,height);
  strokeWeight(2);
}

function draw() {
  background(250);
  border();
}