// Color Demo

const RECT_WIDTH = 10;
const RECT_HEIGHT = 10;
let colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawRowRGB(yPos) {
  colorMode(RGB, 255, 255, 255, 1);
  for (let x = 0; x < width; x += RECT_WIDTH) {
    fill(random(255), random(255), random(255));
    rect(x, yPos, RECT_WIDTH, RECT_HEIGHT);
  }
}

function drawRowHSB(yPos) {
  colorMode(HSB, 360);
  for (let x = 0; x < width; x += RECT_WIDTH) {
    fill(x % 360, 360, 300);
    rect(x, yPos, RECT_WIDTH, RECT_HEIGHT);
  }
}

function drawRowCustom() {



}

function border() {
  strokeWeight(15);
  rect(0,0,width,height);
  strokeWeight(2);
}

function draw() {
  background(250);
  randomSeed(1);
  drawRowRGB(height / 2);
  drawRowHSB(height / 3);
}