// 08 Loop Grid Demo

let gridSpacing = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  background(220);
  circleGrid();
}

function mouseClicked() {
  background(220);
  circleGrid();
}

function circleGrid() {
  for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
    for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
      let size = random(gridSpacing * 3.000, gridSpacing * 0.000);
      ellipse(x,y,size,size);
    }
  }

}

function draw() {

}
