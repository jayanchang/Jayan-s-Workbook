let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(1920, 1080);
  capture.hide();
  background(0, 0, 255); // set blue background once
  frameRate(3);
}

function draw() {
  fill(0, 0, 255, 20); // low alpha = slow fade
  noStroke();
  rect(0, 0, width, height);
  
  image(capture, mouseX, mouseY, 400, 300);

  
  fill(255);
  text("FPS: " + int(frameRate()), 10, 20);
}

  
  // Apply a funky filter to every stamp
  
