// Basic Transformations Sandbox


let originalSpacing = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  //drawBasicGrid(220);


  push();
  translate(width/2, height/2);
  ellipseMode(CENTER);
  strokeWeight(4);
  ellipse(0,0,width*0.4, width*0.4);

  for(let i=0; i < 60; i++){
    if(i%5===0){
      strokeWeight(4);
      line(width*0.15,0,width*0.185, 0);
    }
    else{
      strokeWeight(2);
      line(width*0.16,0,width*0.185, 0);
    }
    
    rotate(radians(6));
  }
  //time to draw the seconds hand
  rotate(radians(-90));
  push();  //new C.S just for seconds
  stroke(255,0,0);
  strokeWeight(2);
  rotate(radians(second() * 6));
  line(0,0,width*0.19,0);
  pop();  //pop seconds C.S

  push();
  stroke(0,255,0);
  strokeWeight(3);
  rotate(radians(minute() * 6 + second() / 10));
  line(0,0,width*0.14,0);
  pop();

  push();
  stroke(0,0,255);
  strokeWeight(3);
  rotate(radians(hour() + minute() / 10 + second() / 600));
  line(0,0,width*0.14,0);
  pop();

  pop();

  // //transformation one: TRANSLATION
  // push();
  // translate(100, 0);
  // scale(1);
  // drawBasicGrid(150); //updated grid
  // face(0, 0);
  // pop();

  // push();
  // translate(0, 200);
  // translate(40, 240);
  // rectMode(CENTER);
  // drawBasicGrid(150); //updated grid
  // rotate(radians(-frameCount));
  // rectangleBlue(0, 0);
  // pop();


  //add push()  pop()




  //transformation two: SCALE




  //transformation three: ROTATION
  //reminder: rotations are measured in radians, not degrees! Functions can help with the conversion...



  //Combinations of Transformations



}


function face(x, y) {
  //draw a face at x,y
  push();
  translate(x, y);
  ellipseMode(CENTER);
  fill(200, 200, 0);
  stroke(0);
  ellipse(0, 0, 80, 80);
  fill(90, 140, 30, 220);
  triangle(-20, 20, 20, 20, 0, 30);
  fill(0);
  ellipse(-25, 0, 10, 10);
  ellipse(25, 0, 10, 10);
  strokeWeight(5);
  line(-30, -10, 30, -10);
  strokeWeight(1);
  pop();

}

function rectangleRed(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(255, 0, 0, 150);
  rect(x, y, 50, 50);

}

function rectangleBlue(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(0, 0, 255, 150);
  rect(x, y, 50, 50);

}

function drawBasicGrid(shade) {
  //draw the normal cartesian Coordinate Grid, in a light color. Spaced at 20 px by default
  stroke(shade);
  for (let x = 0; x < width; x += originalSpacing) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += originalSpacing) {
    line(0, y, width, y);
  }

  //Draw "X" at the origin
  strokeWeight(3);
  stroke(0);
  line(-5, 0, 5, 0);
  line(0, 5, 0, -5);
  strokeWeight(1);
}