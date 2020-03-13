// Diagonal Line Art 

const RECT_WIDTH = 10;
const RECT_HEIGHT = 50;
let colors = ["#FE4365", "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"]; //fill with HEX codes as Strings.

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  randomSeed(0);
  drawRowRGB(height * 0.2);
  drawRowHSB(height * 0.5);
  drawRowCustom(height * 0.8);
}

function drawRowCustom(yPos) {
  colorMode(RGB,255);
  for (let x = 0; x < width; x += RECT_WIDTH) {
    let index = int(random(0, colors.length));
    print(index);
    fill(colors[index]);
    rect(x, yPos, RECT_WIDTH, RECT_HEIGHT);
  }
}

function drawRowHSB(yPos) {
  colorMode(HSB, 360);
  for (let x = 0; x < width; x += RECT_WIDTH) {
    fill(x / 3 % 360, 300, map(mouseY, 0, height, 0, 300));
    rect(x, yPos, RECT_WIDTH, RECT_HEIGHT);
  }
}

function drawRowRGB(yPos){
  colorMode(RGB,255);
  for (let x = 0; x < width; x += RECT_WIDTH) {
    fill(random(255), random(255), random(255));
    rect(x, yPos, RECT_WIDTH, RECT_HEIGHT);
  }
}

function border() {
  strokeWeight(15);
  rect(0, 0, width, height);
  strokeWeight(2);
}