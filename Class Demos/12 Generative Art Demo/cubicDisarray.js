// Square Art

let gridSpacing = 20;
const PADDING = 60;
const SEED = 1000;
let TRANSLATION_AMPLITUDE = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  randomSeed(SEED);
  noFill();
}

function drawGrid() {
  for (let x = gridSpacing / 2 + PADDING; x < width - PADDING; x += gridSpacing) {
    for (let y = gridSpacing / 2 + PADDING; y < height - PADDING; y += gridSpacing) {
      let amplitude = map(y, gridSpacing / 2 + PADDING, height - PADDING, 0, 45);
      push();
      translate(x, y);
      translate(random(-amplitude / TRANSLATION_AMPLITUDE, amplitude / TRANSLATION_AMPLITUDE), random(-amplitude / TRANSLATION_AMPLITUDE, amplitude / TRANSLATION_AMPLITUDE));
      rotate(radians(random(-amplitude, amplitude)));
      rect(0, 0, gridSpacing, gridSpacing);
      pop();
    }
  }  
}

function border() {
  strokeWeight(15);
  rect(width/2,height/2,width,height);
  strokeWeight(2);
}

function draw() {
  background(250);
  randomSeed(SEED);
  border();
  drawGrid();
  TRANSLATION_AMPLITUDE = mouseX / 100;
  if (TRANSLATION_AMPLITUDE === 0) {
    TRANSLATION_AMPLITUDE = 1;
  }
  print(TRANSLATION_AMPLITUDE);
}