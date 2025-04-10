let mic;
let fontSize = 80;
let baseX, baseY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  mic = new p5.AudioIn();
  mic.start();
  baseX = width / 2;
  baseY = height / 2;
}

function draw() {
  background(255);

  let vol = mic.getLevel(); // volume level from 0.0 to 1.0
  let shake = map(vol, 0, 1, 0, 50); // map loudness to shake amount

  let offsetX = random(-shake, shake);
  let offsetY = random(-shake, shake);

  fill(0);
  text("rage", baseX + offsetX, baseY + offsetY);
}
