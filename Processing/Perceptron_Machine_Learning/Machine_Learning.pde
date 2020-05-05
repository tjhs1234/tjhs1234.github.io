Perceptron brain;
Point[] points = new Point[100];


public void settings() {
  size(1000, 1000);
  
  for (int i = 0; i < points.length; i++) {
    points[i] = new Point();
  }
  brain = new Perceptron();
  

float[] inputs = {-1, 0.5};
  int guess = brain.guess(inputs);
}
void draw() {
  background(255);
  stroke(0);
  line(0, 0, width, height);
  
  for (Point pt : points) {
    pt.show();
  }
  
  for (Point pt : points) {
    float[] inputs = {pt.x, pt.y};
    int target = pt.label;
    int guess = brain.guess(inputs);
    brain.train(inputs, pt.label);
    if (guess == pt.label) {
      fill(0, 255, 0);
    }
    else {
      fill(255, 0 ,0);
    }
    noStroke();
      ellipse(pt.x, pt.y, 8, 8);
  }
}

void mousePressed() {
}
