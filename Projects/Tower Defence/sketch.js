// Tower Defence

let turretList = []; 
let enemyList = [];
let projectileList = [];
let enemyXPositions, enemyYPositions;
let selectedTurret = "null";

const PROJECTILE_SPEED = 5;
const AIMING_ACCURACY = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  if (enemyXPositions.length !== enemyYPositions.length) {
    window.close();
  }
}

function preload() {
  enemyXPositions = loadStrings("assets/enemyXPositions.txt");
  enemyYPositions = loadStrings("assets/enemyYPositions.txt");
}

class Turret {
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.rotation;
    this.target = "null";
    this.range = 600;
    this.reloadTime = 20;
    this.currentReloadTime = this.reloadTime;
    this.isSelected = false;
  }

  calculateRotation() {
    if (this.target !== "null") {
      
      if (AIMING_ACCURACY > 0) {
        
        this.realTargetX = this.target.x;
        this.realTargetY = this.target.y;
        
        for (let i = 0; i <= AIMING_ACCURACY; i++) {
          let distance = sqrt(pow(this.x - this.realTargetX, 2) + pow(this.y - this.realTargetY, 2)); 
          this.realTargetX = enemyXPositions[this.target.position + int(distance / PROJECTILE_SPEED * this.target.speed)];
          this.realTargetY = enemyYPositions[this.target.position + int(distance / PROJECTILE_SPEED * this.target.speed)];
        }

      }
      else if (AIMING_ACCURACY === 0) {
        
        this.realTargetX = this.target.x;
        this.realTargetY = this.target.y;

      }
      
      this.rotation = radians(Math.atan2(this.realTargetY - this.y, this.realTargetX - this.x));
    
    }
  }
  
  findTarget() {
    this.target = "null";
    if (this.target.health < 1 || this.target === "null") {
      let smallestDistance = this.range;
      for (let i = 0; i < enemyList.length; i++) {
        if (sqrt(pow(enemyList[i].x - this.x, 2) + pow(enemyList[i].y - this.y, 2)) < smallestDistance) {
          this.target = enemyList[i];
          smallestDistance = sqrt(pow(enemyList[i].x - this.x, 2) + pow(enemyList[i].y - this.y, 2));
        }
      }
    }
  }

  fire() {
    if (this.currentReloadTime < 1 && this.target !== "null") {
      projectileList.push(new Projectile(this, this.rotation));
      this.currentReloadTime = this.reloadTime; 
    }
    else {
      this.currentReloadTime--;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(degrees(this.rotation));
    fill(100);
    rect(0, 0, this.size, this.size);
    line(0, 0, this.size / 2, 0);
    rotate(0); 
    fill(255); 
    pop();
  }

}

class Enemy {
  
  constructor(type) {
    this.x = enemyXPositions[0]; 
    this.y = enemyYPositions[0];
    this.position = 1;
    this.type = type;
    this.size = random(100, 200);
    this.rotation = 0;
    this.health = this.size;
    this.maxHealth = this.size;
    this.speed = 1;
  }

  checkForDeath(position) {
    for (let i = 0; i < projectileList.length; i++) {
      let distance = sqrt(pow(this.x - projectileList[i].x, 2) + pow(this.y - projectileList[i].y, 2));
      if (distance < this.size / 2) {
        this.health--;
        if (i < projectileList.length) {
          projectileList.splice(i, 1);
        }
      }
    }
    if (this.health < 1 || this.position > enemyXPositions.length - 2) {
      enemyList.splice(position, 1);
    }
  }
  
  move(){
    this.position += this.speed;
    this.x = enemyXPositions[this.position];
    this.y = enemyYPositions[this.position];
  }
  
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(255);
    rect(0, 0, this.size, this.size);
    line(0, 0, this.size / 2, 0);
    rectMode(CORNER);
    fill(0, 255, 0);
    rect(-this.size / 2, -this.size / 2 - 40,  map(this.health, 0, this.maxHealth, 0, this.size), 10);
    fill(255, 0, 0);
    rect(map(this.health, 0, this.maxHealth, 0, this.size) - this.size / 2, -this.size / 2 - 40, this.size - map(this.health, 0, this.maxHealth, 0, this.size), 10);
    rotate(0); 
    pop();
    
  }

}

class Projectile {

  constructor(parent, rotation) {
    this.parent = parent;
    this.x = this.parent.x;
    this.y = this.parent.y;
    this.rotation = rotation;
    this.speed = PROJECTILE_SPEED;
  }
  
  move() {
    this.x += sin(degrees(-this.rotation) + 1.5708) * this.speed;
    this.y += cos(degrees(-this.rotation) + 1.5708) * this.speed;
  }

  delete(listPosition) {
    if (!(this.x > 0 && this.y > 0 && this.x < width && this.y < height)) {
      projectileList.splice(listPosition, 1);
    }
  }
  
  draw() {
    stroke(255, 213, 0);
    strokeWeight(3);      
    push();
    translate(this.x, this.y);
    rotate(degrees(this.rotation) + 1.5708);
    line(0, 0, 0, 15);
    rotate(0);  
    pop();
    stroke(0);
    strokeWeight(1);  
  }

}

function keyTyped() {
  if (key === "t") {
    turretList.push(new Turret(mouseX, mouseY));
  }
  else if (key === "e") {
    enemyList.push(new Enemy("thing"));
  }
}

function updateTurrets() {
  for (let i = 0; i < turretList.length; i++) {
    turretList[i].findTarget();
    turretList[i].calculateRotation();
    turretList[i].fire();
    turretList[i].draw();
  }
}

function updateEnemies() {
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].move();
    enemyList[i].draw();
    enemyList[i].checkForDeath(i);
  }
}

function updateProjectiles() {
  for (let i = 0; i < projectileList.length; i++) {
    projectileList[i].move();
    projectileList[i].draw();
    projectileList[i].delete(i);
  }
}

function mouseClicked() {
  for (let i = 0; i < turretList.length; i++) {
    selectedTurret = "null";
    let distance = sqrt(pow(turretList[i].x - mouseX, 2) + pow(turretList[i].y - mouseY, 2));
    turretList[i].isSelected = false;
    if (distance < turretList[i].size / 2) {
      turretList[i].isSelected = true;
      selectedTurret = turretList[i];
      break;
    }
  }
}

function drawRange(turret) {
  if (turret !== "null") {
    strokeWeight(0);
    fill(230, 80, 80, 50);
    ellipse(turret.x, turret.y, turret.range * 2, turret.range * 2);
    turret.draw();
    strokeWeight(1);
  }
}

function draw() {
  background(220);
  updateProjectiles();
  updateTurrets();
  updateEnemies();
  drawRange(selectedTurret);
}