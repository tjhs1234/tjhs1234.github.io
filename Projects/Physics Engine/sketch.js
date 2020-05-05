// Physics Engine

let entityArr = [];

const ACCURACY = 1009;
const SIM_SPEED = 100;
const GRAVITY_STRENGTH = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  ellipseMode(CENTER);
  entityArr.push(new Entity(width / 2, height / 2 + 200, 3.124, 0, 5, 100, [249, 215, 28]));
  entityArr.push(new Entity(width / 2, height / 2 - 200, -3.124, 0, 5, 100, [0, 200, 255]));
}

class Entity {
  
  constructor(x_, y_, xVel_, yVel_, radius_, density_, color_) {
    this.pos = createVector(x_, y_);
    this.vel = createVector(xVel_, yVel_);
    this.radius = radius_;
    this.density = density_;
    this.area = PI * pow(this.radius, 2);
    this.mass = this.density * this.area;
    this.color = color_;
  }

  updateGravity(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== this) {
        let strength = GRAVITY_STRENGTH * (this.mass * arr[i].mass / pow(getDistance(this, arr[i]), 2));
        let newVector = createVector(arr[i].pos.x - this.pos.x, arr[i].pos.y - this.pos.y);
        newVector.setMag(strength / ACCURACY / this.mass);
        this.vel.add(newVector);
      }
    }
  }

  checkForCollisions(arr, pos) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] !== this) {
        if (getDistance(this, arr[i]) < this.radius + arr[i].radius) {
          combineObject(this, arr[i], arr, pos, i);
        }
      }
    }
  }

  display() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2]);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }

  action(arr, pos) {
    
    for (let i = 0; i < ACCURACY; i++) {
      
      this.updateGravity(arr);
      
      this.pos.x += this.vel.x / ACCURACY;
      this.pos.y += this.vel.y / ACCURACY;
    }
    
    this.display();
    this.checkForCollisions(arr, pos);
  }
}

function getDistance(obj1, obj2) {
  return sqrt(pow(obj1.pos.x - obj2.pos.x, 2) + pow(obj1.pos.y - obj2.pos.y, 2));
}

function combineObject(obj1, obj2, arr, obj1ArrPos, obj2ArrPos) {
  
  let newMass = obj1.mass + obj2.mass;
  let obj1MassWeight = map(obj1.mass, 0, newMass, 0, 1);
  let obj2MassWeight = 1 - obj1MassWeight;

  let newPos = createVector(obj1.pos.x * obj1MassWeight + obj2.pos.x * obj2MassWeight, obj1.pos.y * obj1MassWeight + obj2.pos.y * obj2MassWeight);
  let newVel = createVector(obj1.vel.x * obj1MassWeight + obj2.vel.x * obj2MassWeight, obj1.vel.y * obj1MassWeight + obj2.vel.y * obj2MassWeight);
  let newDensity = obj1.density * obj1MassWeight + obj2.density * obj2MassWeight;
  let newArea = obj1.area + obj2.area;
  let newRadius = sqrt(newArea / PI);

  let newColor = [];
  for (let i = 0; i < 3; i++) {
    newColor[i] = obj1.color[i] * obj1MassWeight + obj2.color[i] * obj2MassWeight;
  }

  arr.splice(obj1ArrPos, 1);
  arr.splice(obj2ArrPos, 1);
  arr.push(new Entity(newPos.x, newPos.y, newVel.x, newVel.y, newRadius, newDensity, newColor));

}

function draw() {  
  background(220);
  for (let i = 0; i < SIM_SPEED; i++) {
    for (let i = 0; i < entityArr.length; i++) {
      entityArr[i].action(entityArr, i);
    }
  }
}
