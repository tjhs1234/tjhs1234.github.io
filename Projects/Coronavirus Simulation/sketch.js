// Coronavirus Simulation

const SIM_WIDTH = 1800;
const POPULATION = 1500;
const HUMAN_SIZE = 10;
const HUMAN_SPEED = 2;

const INFECTION_DISTANCE = 20;
const INFECTION_PROBABILITY = 10;
const INFECTION_FREQUENCY = 1;
const INFECTION_SEVERITY = 0.02;
const INFECTION_RECOVERY_TIME = 3300;
const IMMUNITY_TIME = 60;

let humanList = [];
let healthyCount = POPULATION - 1;
let infectedCount = 1;
let recoveredCount = 0;
let deadCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < POPULATION; i++) {
    humanList.push(new Human());
  }
  humanList[Math.floor(random(0, humanList.length))].status = 1;
}

class Human {
  constructor() {
    this.x = Math.floor(random(0 + HUMAN_SIZE / 2, SIM_WIDTH - HUMAN_SIZE / 2));
    this.y = Math.floor(random(0 + HUMAN_SIZE / 2, windowHeight - HUMAN_SIZE / 2));
    this.size = HUMAN_SIZE;
    this.direction = int(random(0, 360));
    this.status = 0;
    this.maxHealth = int(random(1, 100));
    this.health = this.maxHealth;
    this.infectionTime = 0;
    this.immunityTime = 0;
  }
 
  bounce() {
    if (this.y + sin(radians(-this.direction - 180)) * HUMAN_SPEED < HUMAN_SIZE / 2) {
      if (this.direction > 180) {
        this.direction = 270 - (this.direction - 270);
      }
      else {
        this.direction = 90 + (90 - this.direction);
      }
    }
    if (this.y + sin(radians(-this.direction - 180)) * HUMAN_SPEED > windowHeight - HUMAN_SIZE / 2) {
      if (this.direction > 180) {
        this.direction = 270 - (this.direction - 270);
      }
      else {
        this.direction = 90 + (90 - this.direction);
      }
    }
    if (this.x + sin(radians(-this.direction - 180)) * HUMAN_SPEED < HUMAN_SIZE / 2) {
      if (this.direction > 90) {
        this.direction = 180 - (this.direction - 180);
      }
      else {
        this.direction = 0 + (0 - this.direction);
      }
    }
    if (this.x + sin(radians(-this.direction - 180)) * HUMAN_SPEED > SIM_WIDTH - HUMAN_SIZE / 2) {
      if (this.direction > 90) {
        this.direction = 180 - (this.direction - 180);
      }
      else {
        this.direction = 0 + (0 - this.direction);
      }
    }
  }

  move() {
    this.direction += random(-5, 5);
    
    if (this.x < 0) {
      this.x = 0;
    }
    else if (this.x > SIM_WIDTH) {
      this.x = SIM_WIDTH;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    else if (this.y > windowHeight) {
      this.y = windowHeight;
    }

    this.x += sin(radians(-this.direction - 180)) * HUMAN_SPEED;
    this.y += cos(radians(-this.direction - 180)) * HUMAN_SPEED;
  }

  infect() {
    if (frameCount % INFECTION_FREQUENCY === 0) {
      for (let i = 0; i < humanList.length; i++) {
        if (sqrt(pow(this.x - humanList[i].x, 2) + pow(this.y - humanList[i].y, 2)) <= INFECTION_DISTANCE && humanList[i].status === 0 && random(0, 100) < INFECTION_PROBABILITY) {
          humanList[i].status = 1;
          infectedCount++;
          healthyCount--;
        }
      }
    }
  }

  updateStatus() {
    if (this.status !== 1 && this.health <= this.maxHealth) {
      this.health += 1;
    }
    
    if (this.status === 1) {
      this.health -= INFECTION_SEVERITY;
      this.infectionTime++;
    }
    
    if (this.health <= 0) {
      this.status = 2;
      deadCount++;
      infectedCount--;
    }
    else if (this.infectionTime >= INFECTION_RECOVERY_TIME / this.health && this.status === 1) {
      this.status = 3;
      this.immunityTime = IMMUNITY_TIME;
      this.infectionTime = 0;
      recoveredCount++;
      infectedCount--;
    }
    else if (this.status === 3 && this.immunityTime > 0) {
      this.immunityTime--;
    }
    else if (this.immunityTime === 0 && this.status === 3) {
      this.status = 0;
      recoveredCount--;
      healthyCount++;
    }
  }

  socialDistance() {
    this.shortestDistance = INFECTION_DISTANCE * 2;
    this.closestHuman = "null";
    for (let i = 0; i < humanList.length; i++) {
      if (this !== humanList[i]) {
        this.distance = sqrt(pow(this.x - humanList[i].x, 2) + pow(this.y - humanList[i].y, 2));
        if (this.distance < this.shortestDistance) {
          this.shortestDistance = this.distance;
          this.closestHuman = humanList[i];
        }
      }
    }
    if (this.closestHuman !== "null") {
      this.direction = degrees(Math.atan2(this.closestHuman.y - this.y, this.closestHuman.x - this.x));
      this.direction -= 90;
    }
    print(this.closestHuman.x);
  }
  
  draw() {
    switch (this.status) {
    case 0:
      fill(150, 150, 255);
      break;
    case 1:
      fill(255, 50, 50);
      break;
    case 2:
      fill(50, 50, 50);
      break;
    case 3:
      fill(255, 191, 0);
      break;
    }
    ellipse(this.x, this.y, this.size);
    push();
    translate(this.x, this.y);
    rotate(radians(this.direction));
    rotate(0);
    pop();
  }
}

function update() {
  for (let i = 0; i < humanList.length; i++) {
    if (humanList[i].status !== 2) {
      if (humanList[i].status === 1) {
        humanList[i].socialDistance();
      }
      humanList[i].bounce();
      humanList[i].move();
      humanList[i].updateStatus();
    }
    if (humanList[i].status === 1) {
      humanList[i].infect();
    }
    humanList[i].draw();
  }
}

function keyTyped() {
  print(deadCount / (deadCount + recoveredCount) * 100);
}

function draw() {
  strokeWeight(1);
  background(220);
  update();
  
  strokeWeight(0);
  
  fill(150, 150, 255);
  let end1 = map(healthyCount, 0, POPULATION, 0, windowHeight);
  rect(SIM_WIDTH, 0, width - SIM_WIDTH, end1);

  fill(255, 50, 50);
  let end2 = end1 + map(infectedCount, 0, POPULATION, 0, windowHeight);
  rect(SIM_WIDTH, end1, width - SIM_WIDTH, end2);
  
  fill(50, 50, 50);
  let end3 = end2 + map(deadCount, 0, POPULATION, 0, windowHeight);
  rect(SIM_WIDTH, end2, width - SIM_WIDTH, end3);

  fill(255, 191, 0);
  let end4 = end3 + map(recoveredCount, 0, POPULATION, 0, windowHeight);
  rect(SIM_WIDTH, end3, width - SIM_WIDTH, end4);

  
}
