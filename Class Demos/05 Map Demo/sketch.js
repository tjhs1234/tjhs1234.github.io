// 05 Map Demo
// Thomas Schorr
// February 25th, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let keyMap = new Map(); 

keyMap.set("red", 0);
keyMap.set("green", 0);
keyMap.set("blue", 0);

function keyPressed(){
  if (key === "a"){
    keyMap.set("red", keyMap.get("red") + 5);
  }
  else if (key === "s"){
    keyMap.set("green", keyMap.get("green") + 5);
  }
  else if (key === "d"){
    keyMap.set("blue", keyMap.get("blue") + 5);
  }
  print(keyMap);
}

function setColor(col) {
  if (col === "red") {
    stroke(255, 0, 0);
  }
  else if (col === "green") {
    stroke(0, 255, 0);
  }
  else if (col === "blue") {
    stroke(0, 0, 255);
  }
}

function renderMap(){
  let count = 0;
  for (let item of keyMap){
    //item is a mini array: [0]-> key  [1]->value
    let x = 50 + count*100;
    setColor(item[0]);
    line(x, height/2, x, height/2 - item[1] );
    count++;
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(25);
}

function draw() {
  background(220);
  renderMap();
}
