// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y, state;
const MOVE_AMOUNT = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 0;
  y = 0;
  state = 0;
}

function stateMove() {

  // Moves the rectangle
  if (state === 0 && x + MOVE_AMOUNT <= windowWidth - 40) {
    x += MOVE_AMOUNT;
  }
  else if  (state === 1 && y + MOVE_AMOUNT <= windowHeight - 40) {
    y += MOVE_AMOUNT;
  }
  else if (state === 2 && x - MOVE_AMOUNT >= 0) {
    x -= MOVE_AMOUNT;
  }
  else if (state === 3 && y - MOVE_AMOUNT >= 0) {
    y -= MOVE_AMOUNT;
  }
  else {
    
    // Puts the rectangle on the edge
    if (state === 0) {
      x = windowWidth - 40;
    }
    else if (state === 1){
      y = windowHeight - 40;
    }
    else if (state === 2){
      x = 0;
    }
    else if (state === 3){
      y = 0;
    }
    // Changes the rectangle's state
    state += 1;
    if (state > 3) {
      state = 0;
    }
  }
}

function draw() {
  background(220);
  rect(x, y, 40, 40);
  stateMove();
}
