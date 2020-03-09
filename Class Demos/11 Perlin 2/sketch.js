// Perlin Demo 2

let redTime = 10;
let redSpeed = 0.1;
let offsetAmount = 0.02;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
}

function drawCircles() {
  for (let x = 0; x < width; x += 25) {
    for (let y = 0; y < height; y += 25) {
      let r = map(noise(redTime), 0, 1, 0, 255);
      fill(r, 50, 50);  
      ellipse(x,y,25,25);
      redTime += redSpeed;
    }
  }
}

function draw() {
  redTime = 10 + offsetAmount;
  offsetAmount -= 0.1;
  background(220);
  drawCircles();
}
