// Cars Assignment
// Thomas Schorr
// April 6th, 2020
//
// Extra for Experts:
// 
// Add more cars: 
//   Left Click adds an eastbound car
//   Shift + Left Click adds a westbound car
//   Control + Left Click removes all cars
//
// Traffic Light:
//   Press space to activate
//   The light will enter an amber period where all cars will slow down
//   By red, all cars should be stopped
//   Once the light turns green, the cars will begin accelerating
//
// Cars have both a topSpeed and xSpeed variable, so they will accelerate
// To their required speed smoothly instead of locking to it

// Road
const ROAD_WIDTH = 300;
const DIVIDING_LINE_SPACING = 40;
const DIVIDING_LINE_WIDTH = 20;
const DIVIDING_LINE_STROKE_WEIGHT = 4;

// Vehicle Appearence
const WHEEL_WIDTH = 10;
const WHEEL_HEIGHT = 3;
const CAR_WIDTH = 30;
const CAR_HEIGHT = 15;
const VAN_FRONT_SCALE = 0.3;
const VAN_FRONT_SPACING = 5;
const VAN_WIDTH = 40;
const VAN_HEIGHT = 25;

// Vehicle Stats
const MAX_SPEED = 15;
const MIN_SPEED = 1;
const SPEED_INCREASE = 1; // The amount a car's top speed can change
const SPEED_UP_CHANCE = 1;
const SPEED_DOWN_CHANCE = 1;
const COLOR_CHANGE_CHANCE = 1;
const STARTING_CARS = 40;
const CAR_ACCELERATION = 0.5;

// Traffic Light Constants
const RED_LENGTH = 120; // Amount of frames the light will stay red for
const AMBER_LENGTH = 45; // Amount of frames the light will stay amber for
const LIGHT_SIZE = 100;
const LIGHT_BUFFER = 15; // The light's distance from the edge of the screen

// Window Constants
const EDGE_BUFFER = 200; // Amount of pixels that vehicles can travel off the screen before being moved

let eastBound = [];
let westBound = [];
let trafficLightObject;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < Math.floor(STARTING_CARS / 2); i++) {
    createVehicle(0);
  }
  for (let i = 0; i < Math.ceil(STARTING_CARS / 2); i++) {
    createVehicle(1);
  }

  trafficLightObject = new trafficLight();
}

class trafficLight {
  constructor() {
    // 0 = Green, 1 = Amber, 2 = Red
    this.mode = 0;
    this.amberTime = 0;
    this.redTime = 0;
  }
  
  update() {
    // 0 = green
    // 1 = amber
    // 2 = red

    if (this.mode === 1 && this.amberTime > 0) {
      // Subtracts time from amber clock if there's any time left
      this.amberTime -= 1;
    }
    else if (this.mode === 1 && this.amberTime === 0) {
      // If there's no time left on the clock, it changes the mode and
      // Sets the red timer to max length
      this.mode = 2;
      this.redTime = RED_LENGTH;
    }
    else if (this.mode === 2 && this.redTime > 0) {
      // Subtracts time from red clock if there's any time left
      this.redTime -= 1;
    }
    else if (this.redTime === 0) {
      // Changes the mode to green if the red timer has run out
      this.mode = 0;
    }
  }

  display() {
    noStroke();

    if (this.mode === 0) {
      fill(100, 215, 100);
    }
    
    else if (this.mode === 1) {
      fill(255, 194, 0);
    }
    
    else{
      fill(255, 0, 0);
    }

    ellipse(LIGHT_SIZE / 2 + LIGHT_BUFFER, LIGHT_SIZE / 2 + LIGHT_BUFFER, 100); // Draws the traffic light
  }
}

class Vehicle {
  constructor(type, x, y, xSpeed) {
    this.type = type;
    this.color = generateColor();
    this.x = x;
    this.y = y;
    this.topSpeed = xSpeed; // Speed the car will go if unrestricted
    this.xSpeed = this.topSpeed; // Actual speed, taking into account red lights and acceleration 
    
    // Calculates the direction
    // 0 = Right, 1 = Left
    if (this.xSpeed > 0) {
      this.direction = 1;
    }
    else {
      this.direction = 0;
    }
  }

  move(edgeBuffer) {
    
    if (trafficLightObject.mode !== 0 && abs(this.xSpeed) > 0 || abs(this.xSpeed) > abs(this.topSpeed)) {
      // Slows down the car
      this.xSpeed = (abs(this.xSpeed) - CAR_ACCELERATION) * Math.sign(this.topSpeed);
    }
    
    else if (trafficLightObject.mode === 0 && abs(this.xSpeed) < abs(this.topSpeed)) {
      // Speeds up the car
      this.xSpeed = (abs(this.xSpeed) + CAR_ACCELERATION) * Math.sign(this.topSpeed);
    }
    
    this.x += this.xSpeed; // Updates the car's position
      
    // Teleports the vehicle if it's off the screen
    if (this.x < -edgeBuffer) {
      this.x = width + edgeBuffer;
    }
    else if (this.x > width + edgeBuffer) {
      this.x = -edgeBuffer;
    }
  }

  display() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2]);

    if (this.type === 0) {
      // Draws the body of a car
      rect(this.x, this.y, CAR_WIDTH, CAR_HEIGHT);
      fill(255);
      
      // Draws the wheels
      rect(this.x, this.y - WHEEL_HEIGHT, WHEEL_WIDTH, WHEEL_HEIGHT);
      rect(this.x + CAR_WIDTH - WHEEL_WIDTH, this.y - WHEEL_HEIGHT, WHEEL_WIDTH, WHEEL_HEIGHT);
      rect(this.x, this.y + CAR_HEIGHT, WHEEL_WIDTH, WHEEL_HEIGHT);
      rect(this.x + CAR_WIDTH - WHEEL_WIDTH, this.y + CAR_HEIGHT, WHEEL_WIDTH, WHEEL_HEIGHT);
    }
    
    else {
      // Draws a van
      push();
      translate(this.x, this.y);
      
      // Rotates the van 180 degrees if it needs to
      if (this.direction === 0) {
        rotate(radians(180));
        // Moves the van so it will be in the same position as it was before the rotation
        translate(-VAN_WIDTH, -VAN_HEIGHT);
      }
      
      rect(0, 0, VAN_WIDTH * (1 - VAN_FRONT_SCALE), VAN_HEIGHT); // Van Back
      rect(VAN_WIDTH * (1 - VAN_FRONT_SCALE) + VAN_FRONT_SPACING, 0, VAN_WIDTH * VAN_FRONT_SCALE, VAN_HEIGHT); // Van front
      pop();
    }
  }

  speedUp() {
    if (abs(this.topSpeed) + SPEED_INCREASE <= MAX_SPEED) {
      // Increases the car's top speed if it doesn't go above the speed limit
      this.topSpeed = (abs(this.topSpeed) + SPEED_INCREASE) * Math.sign(this.topSpeed);
    }
  }

  speedDown() {
    if (abs(this.topSpeed) - SPEED_INCREASE >= MIN_SPEED) {
      // Decreases the car's top speed if it doesn't go below the slowest allowed speed
      this.topSpeed = (abs(this.topSpeed) - SPEED_INCREASE) * Math.sign(this.topSpeed);
    }
  }

  changeColor() {
    // Resets the R, G, B values randomly
    this.color = generateColor();
  }
  
  action() {
    
    if (random(0, 100) < SPEED_UP_CHANCE) {
      this.speedUp();
    }
    if (random(0, 100) < SPEED_DOWN_CHANCE) {
      this.speedDown();
    }
    if (random(0, 100) < COLOR_CHANGE_CHANCE) {
      this.changeColor();
    }
    
    this.move(EDGE_BUFFER);
    this.display();
  }
}

function createRoad() {
  fill(0);
  noStroke();
  rect(0, height / 2 - ROAD_WIDTH / 2, width, ROAD_WIDTH);
  
  strokeWeight(DIVIDING_LINE_STROKE_WEIGHT);
  stroke(255);
  for (let x = 0; x <= width; x += DIVIDING_LINE_SPACING) {
    line(x, height / 2, x + DIVIDING_LINE_WIDTH, height / 2);
  }
}

function generateColor() {
  // Returns a random array of 3 numbers from 0 to 255
  return [Math.floor(random(1, 256)), Math.floor(random(1, 256)), Math.floor(random(1, 256))];
}

function createVehicle(direction) {
  // Creates a vehicle with the given direction
  if (direction === 0) {
    westBound.push(new Vehicle(Math.floor(random(0, 2)), random(0, width), random(height / 2 - ROAD_WIDTH / 2, height / 2 - VAN_HEIGHT), Math.floor(-random(MIN_SPEED, MAX_SPEED))));
  }
  else {
    eastBound.push(new Vehicle(Math.floor(random(0, 2)), random(0, width), random(height / 2, height / 2 + ROAD_WIDTH / 2 - VAN_HEIGHT), Math.floor(random(MIN_SPEED, MAX_SPEED))));
  }
}

function mousePressed() {
  if (keyIsPressed && key === "Shift" && mouseButton === LEFT) {
    // If user is holding shift and left clicks
    createVehicle(0);
  }
  
  else if (keyIsPressed && key === "Control" && mouseButton === LEFT) {
    // Removes all cars
    westBound.splice(0, westBound.length);
    eastBound.splice(0, eastBound.length);
  }
  
  else if (mouseButton === LEFT) {
    // If the user left clicks but isn't holding shift
    createVehicle(1);
  }
}

function keyTyped() {
  // 0 = green
  // 1 = amber
  // 2 = red

  if (key === " " && trafficLightObject.mode === 0) {
    trafficLightObject.mode = 1;
    trafficLightObject.amberTime = AMBER_LENGTH;
  }
}

function draw() {
  background(220);
  createRoad();
  
  // Updates the traffic light
  trafficLightObject.update();
  trafficLightObject.display();

  // Updates all cars
  for (let i = 0; i < westBound.length; i++) {
    westBound[i].action();
  }
  
  for (let i = 0; i < eastBound.length; i++) {
    eastBound[i].action();
  }
}
