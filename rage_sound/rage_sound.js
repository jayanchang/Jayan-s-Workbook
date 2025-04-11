let mic;
let fontSize = 80;
let baseX, baseY;
let micStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  textStyle(BOLD);
  baseX = width / 2;
  baseY = height / 2;

  mic = new p5.AudioIn();
  text("Click to allow mic", baseX, baseY);
}

function draw() {
  background(255);

  if (!micStarted) {
    fill(0);
    text("Click to allow mic", baseX, baseY);
    return;
  }

  let vol = mic.getLevel();

  // Only react to volume above a threshold
  let threshold = 0.08; // You can tweak this (try 0.03–0.1)

  let shake = 0;
  if (vol > threshold) {
    // Map volume AFTER threshold to shake amount
    let mappedVol = map(vol, threshold, 0.5, 0, 50, true); // you can adjust 0.5 and 50
    shake = mappedVol;
  }

  let offsetX = random(-shake, shake);
  let offsetY = random(-shake, shake);

  fill(0);
  text("RAGE", baseX + offsetX, baseY + offsetY);

  
}

function mousePressed() {
  if (!micStarted) {
    mic.start();
    micStarted = true;
  }
}
