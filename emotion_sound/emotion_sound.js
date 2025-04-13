let mic;
let micStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  textAlign(CENTER, CENTER);
  textSize(32);
  textStyle(BOLD);
}

function draw() {
  if (!micStarted) {
    background(255);
    fill(0);
    text("Click to activate mic", width / 2, height / 2);
    return;
  }

  let vol = mic.getLevel(); // Typically ranges between 0.0 – 0.3

  // Map volume to background color mood
  let r = map(vol, 0, 0.5, 50, 255, true);     // Red increases with volume
  let g = map(vol, 0, 0.5, 100, 0, true);      // Green fades out
  let b = map(vol, 0, 0.5, 255, 0, true);      // Blue fades out

  background(r, g, b);

  // 🎯 New, calmer thresholds
  fill(255);
  if (vol < 0.08) {
    text("calm", width / 2, height / 2);
  } else if (vol < 0.2) {
    text("emotional", width / 2, height / 2);
  } else {
    text("intense", width / 2, height / 2);
  }

  // Debug info
  fill(255, 100);
  textSize(16);
  text("Volume: " + nf(vol, 1, 3), width - 100, height - 20);
  textSize(32);
}

function mousePressed() {
  if (!micStarted) {
    mic.start();
    micStarted = true;
  }
}
