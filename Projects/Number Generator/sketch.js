// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let arr = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function keyTyped() {
  for (let i = 123; i < 1080; i++) {
    arr.push(i);

  }
  save(arr, "enemyXPositions.txt");
}
