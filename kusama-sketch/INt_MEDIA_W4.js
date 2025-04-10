function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();
  frameRate(3);
}

function draw() {
  // Updated green color to be darker (e.g., RGB: 0, 128, 0)
  let colors = [
    color(0, 0, 255),       // Blue
    color(255, 255, 0),     // Yellow
    color(255, 0, 0),       // Red
    color(0, 128, 0),       // Dark Green
    color(128, 0, 128)      // Purple
  ];
  let chosenColor = random(colors);

  let size = map(mouseX, 0, width, 10, 200);

  fill(chosenColor);
  circle(mouseX, mouseY, size);
}
