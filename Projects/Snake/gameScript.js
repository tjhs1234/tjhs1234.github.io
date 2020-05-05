// Snake
// Thomas Schorr
// March 14th 2020

let mapWidth = 36;
let mapHeight = 25;
let gameMap;
let snake, food;
let SQUARE_SIZE;

const SNAKE_STARTING_LENGTH = 1;
const FOOD_ENERGY = 4;
const FOOD_COLOR = 1;
const SNAKE_COLOR = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  SQUARE_SIZE = height / mapHeight;

  gameMap = make2DArray(mapWidth, mapHeight, 0);
  
  snake = new Snake(Math.floor(gameMap.length / 2), Math.floor(gameMap[0].length / 2), SNAKE_COLOR, SNAKE_STARTING_LENGTH);
  food = new Food(Math.ceil(random(0, gameMap.length - 1)), Math.ceil(random(0, gameMap[0].length - 1)), FOOD_ENERGY, FOOD_COLOR);
  
  frameRate(12);

  stroke(0);
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
        fill(0);
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
  if (key === "w" && snake.direction) {
    snake.direction = "up";
  }
  else if (key === "a" && snake.direction) {
    snake.direction = "left";
  }
  else if (key === "s" && snake.direction) {
    snake.direction = "down";
  }
  else if (key === "d" && snake.direction) {
    snake.direction = "right";
  }
}

class Food {

  constructor (startX_, startY_, foodEnergy_, color_) {
    this.position = [startX_, startY_];
    this.foodEnergy = foodEnergy_;
    this.color = color_;
  }

  update(arr, snake_) {
    if (snake_.positions[0][0] === this.position[0] && snake_.positions[0][1] === this.position[1]) {
      snake_.desiredLength += this.foodEnergy;
      this.newPosition(arr);
    }
  }

  newPosition(arr) {
    while (arr[this.position[0]][this.position[1]] !== 0) {
      this.position[0] = int(random(-1, arr[0].length - 1));
      this.position[1] = int(random(-1, arr.length - 1));
    }
  }

  updateToMap(arr) {
    arr[this.position[0]][this.position[1]] = this.color;
  }

  fullUpdate(arr, snake_) {
    this.update(arr, snake_);
    this.updateToMap(arr);
  }
}

class Snake {
  
  constructor (startX, startY, color_, startLength) {
    this.positions = [[startX, startY]];
    this.desiredLength = startLength;
    this.color = color_;
    this.previousDirection = 4;
    this.direction = 4;
    this.isDead = false;
  }
  
  addNewPositions() {
    if (this.desiredLength > this.positions.length) {
      for (let i = this.desiredLength - this.positions.length; i > 0; i--) {
        this.positions.push([this.positions[this.positions.length - 1][0], this.positions[this.positions.length - 1][1]]);
      }
    }
  }
    
  updateSnake() {
    // Changes the body position
    for (let i = this.positions.length - 1; i > 0; i--) {
      this.positions[i][0] = this.positions[i - 1][0];
      this.positions[i][1] = this.positions[i - 1][1];
    }
    
    // Makes sure the snake can't instantly turn around
    if (this.previousDirection === "up" && this.direction === "down") {
      this.direction = this.previousDirection;
    }
    else if (this.previousDirection === "left" && this.direction === "right") {
      this.direction = this.previousDirection;
    }
    else if (this.previousDirection === "down" && this.direction === "up") {
      this.direction = this.previousDirection;
    }
    else if (this.previousDirection === "right" && this.direction === "left") {
      this.direction = this.previousDirection;
    }
    
    // Changes the head position
    switch (this.direction) {
    case "up":
      this.positions[0][1]--;
      break;
    case "left":
      this.positions[0][0]--;
      break;
    case "down":
      this.positions[0][1]++;
      break;
    case "right":
      this.positions[0][0]++;
      break;
    }
    this.previousDirection = this.direction;
  }
  
  checkForDeath(arr) {
    for (let i = 1; i < this.positions.length; i++) {
      if (this.positions[0][0] === this.positions[i][0] && this.positions[0][1] === this.positions[i][1]) {
        this.isDead = true;
      }
    }
    if (this.positions[0][0] < 0 || this.positions[0][1] < 0 || this.positions[0][0] >= arr.length || this.positions[0][1] >= arr[0].length) {
      this.isDead = true;
    }
  }

  updateToMap(arr) {
    for (let i = 0; i < this.positions.length; i++) {
      arr[this.positions[i][0]][this.positions[i][1]] = this.color;
    }
  }

  fullUpdate(arr) {
    this.addNewPositions();
    this.updateSnake();
    this.checkForDeath(arr);
    if (!this.isDead) {
      this.updateToMap(arr);
    }
  }
}

function draw() {
  background(200);
  gameMap = make2DArray(mapWidth, mapHeight, 0);
  
  snake.fullUpdate(gameMap);
  food.fullUpdate(gameMap, snake);

  draw2DArray(gameMap);
}