//example sketch for using 2 cameras to extrapolate the position of an individual

//things to add:
//calibration
//video inputs

int numX;
int numY;
int num;

//vector info generated from mouse input simulation
float simSlopeX;
float simSlopeY;
//cartesian version of mouse position for simulation
int cMouseY;

//location of body projected onto the left edge of the sketch
int yPos;
//cartesian version of yPos
int cyPos;

//location of body projected onto the top edge of the sketch
int xPos;

//vector info from "shadow" locations on left and top edges
float slopeX;
float slopeY;

//extrapolated coordinates of the user
int xBody;
int yBody;

//y intercepts of both component positioning vectors
float b1;
float b2;

void setup() {
  size(600, 600);
}
void draw() {
  //the math behind extrapolating an individual user's position
  calculate();

  //show vectors, location of camera "shadows", user position, and trackable area
  visual();

  //uses mouse input to simulate position extrapolation
  simulation();

  //print user location to console
  //print(xBody);
  //print(", ");
  //println(yBody);
  
  position();
}

void calculate() {
  //calculate cartesian version of yPos
  cyPos = height - yPos;
  //yPos is the same as the y intercept for the Y-axis camera's positioning vector
  b1 = cyPos;
  //calculate y intercept of X-axis camera positioning vector
  b2 = height - xPos * slopeX;

  //only calculate slope if not infinite
  if (mouseX != (width/2)) {
    //slope is delta y divided by delta x
    slopeX = (0 - height) / (width/2 - float(xPos));
    slopeY = (height/2 - float(cyPos)) / (width - 0);
  }

  //result linear equation for point at which X and Y positioning vectors intersect
  //only calculate if within trackable area
  if (xPos > 0 && xPos < width && yPos > 0 && yPos < height) {
    xBody = int((height * width - b1*width + 2 * b1 * xPos) / (slopeY * width - 2 * slopeY * xPos + 2 * slopeX * xPos - slopeX * width));
    yBody = height - int(xBody * slopeY + cyPos);
  }
}

void simulation() {
  cMouseY = height - mouseY;
  if (mouseX != (width/2)) {
    simSlopeX = (0 - float(cMouseY)) / (width/2 - float(mouseX));
    simSlopeY = (height/2 - float(cMouseY)) / (width -float(mouseX));
  }
  xPos = int(mouseX + (mouseY / simSlopeX));
  yPos = int(mouseY + (mouseX * simSlopeY));
  //draw red circle if mouse has left trackable area
  if (xPos < 0 || xPos > width || yPos < 0 || yPos > height) {
    fill(255, 0, 0);
    noStroke();
    ellipse(mouseX, mouseY, 10, 10);
  }
}

void visual() {
  background(0);
  fill(255);
  noStroke();
  //vertices of trackable area are established by the intersections of the boundaries of the cameras' viewing angles
  beginShape();
  vertex(0, 0);
  vertex(4 * width / 5, 2 * height / 5);
  vertex(2 * width / 3, 2 * height / 3);
  vertex(2 * width / 5, 4 * height / 5); 
  endShape(CLOSE);

  //square
  fill(100);
  beginShape();
  vertex(width / 3, height / 3);
  vertex(width / 3, 2 * height / 3);
  vertex(2 * width / 3, 2 * height / 3);
  vertex(2 * width / 3, height / 3); 
  endShape(CLOSE);

  stroke(255, 255, 0);
  line(xPos, 0, width/2, height);
  stroke(255, 0, 255);
  line(0, yPos, width, height/2);

  noStroke();
  fill(255, 255, 0);
  ellipse(xPos, 0, 10, 10);
  fill(255, 0, 255);
  ellipse(0, yPos, 10, 10);

  if (xPos > 0 && xPos < width && yPos > 0 && yPos < height) {
    fill(0, 0, 255);
    noStroke();
    ellipse(xBody, yBody, 10, 10);
  }
}


void position() {

  if (xBody> 5*width/15 && xBody< 6*width/15) {
    numX = 0;
  } else if (xBody> 6*width/15 && xBody< 7*width/15) {
    numX = 1;
  } else if (xBody> 7*width/15 && xBody< 8*width/15) {
    numX = 2;
  } else if (xBody> 8*width/15 && xBody< 9*width/15) {
    numX = 3;
  } else if (xBody> 9*width/15 && xBody< 10*width/15) {
    numX = 4;
  }
  
  if (yBody> 5*height/15 && yBody< 6*height/15) {
    numY = 0;
  } else if (yBody> 6*height/15 && yBody< 7*height/15) {
    numY = 1;
  } else if (yBody> 7*height/15 && yBody< 8*height/15) {
    numY = 2;
  } else if (yBody> 8*height/15 && yBody< 9*height/15) {
    numY = 3;
  } else if (yBody> 9*height/15 && yBody< 10*height/15) {
    numY = 4;
  }
  
  num = numX + 5*numY;
  println(num);
  
}