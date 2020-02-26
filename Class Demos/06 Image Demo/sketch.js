// Image Demo
let lionL, lionR;
let movingLeft = false;
let pinImages = [];
let pinToLoad = 0;

function preload(){
  lionL = loadImage("assets/pin-05.png");
  lionR = loadImage("assets/pin-00.png");
  for (let i = 0; i < 9; i++) {
    pinImages.push(loadImage("assets/pin-0" + i.toString() + ".png"));
  }
}

function determineDirection(){
  if(pmouseX < mouseX){
    //which way? Moving right
    movingLeft = false;
  }
  else if (pmouseX > mouseX){
    //moving left
    movingLeft = true;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noCursor();
}

function draw() {
  let speedChange = map(mouseX, 0, width, 1, 4);
  background(220);
  determineDirection();
  print(speedChange);
  if (movingLeft) {
    pinToLoad += 1;
    if (pinToLoad > pinImages.length - 1) {
      pinToLoad -= pinImages.length - 1;
    }
  }
  else if (!movingLeft) {
    pinToLoad -= 1;
    if (pinToLoad < 0) {
      pinToLoad += pinImages.length - 1;
    }
  }

  image(pinImages[pinToLoad], width/2, height/2);
  
  

}