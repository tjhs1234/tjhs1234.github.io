// Snake thing
// Thomas Schorr
// March 14th 2020

let mapWidth = 20;
let mapHeight = 10;
let gameMap, blankGameMap;
let blob1, blob2;

const SQUARE_SIZE = 45;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameMap = make2DArray(mapWidth, mapHeight, 0);
  blob1 = new Blob(5, 5, 1);
  blob2 = new Blob(10, 10, 2);
  frameRate(60);
}

function make2DArray(cols, rows, defaultValue) {
  // Creates the array
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  // Fills in the array
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[x].length; y++) {
      arr[x][y] = defaultValue;
    }
  }
  return arr;
}

function draw2DArray(arr) {
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[x].length; y++) {
      
      switch (arr[x][y]) {
      case 0:
        // White
        fill(255);
        break;
      case 1:
        // Red
        fill(210, 70, 70);
        break;
      case 2:
        // Green
        fill(70, 210, 70);
        break;
      default:
        fill(200);
      }

      rect(x * SQUARE_SIZE, y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
    }
  }
}

function keyPressed() {
  if (key === "w") {
    blob1.y--;
    blob2.y--;
  }
  else if (key === "a") {
    blob1.x--;
    blob2.x--;
  }
  else if (key === "s") {
    blob1.y++;
    blob2.y++;
  }
  else if (key === "d") {
    blob1.x++;
    blob2.x++;
  }
}

class Blob {
  constructor(startX, startY, color_) {
    this.x = startX;
    this.y = startY;
    this.color = color_;
  }

  randomMove(arr) {
    this.direction = Math.ceil(random(0,4));
    
    switch (this.direction) {
    
    case 1:
      if (this.y - 1 >= 0) {
        this.y -= 1;
      }
      break;
    
    case 2:
      if (this.x - 1 >= 0) {
        this.x -= 1;
      }
      break;
    
    case 3:
      if (this.y + 1 < gameMap.length) {
        this.y += 1;
      }
      break;
    
    case 4:
      if (this.x + 1 < gameMap[this.y].length) {
        this.x += 1;
      }
      break;
    }
  }
  
  update(arr) {
    arr[this.x][this.y] = this.color;
  }
}

function draw() {
  background(200);
  gameMap = make2DArray(mapWidth, mapHeight, 0);
  blob1.update(gameMap, 1);
  blob2.update(gameMap, 2);
  draw2DArray(gameMap);
  print(gameMap);
}