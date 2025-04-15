let sound, myButton, analyzer;
let isPlaying = false;

function preload() {
  sound = loadSound("data/beat.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("pink");
  noLoop(); // Don't loop draw until sound plays

  textAlign(CENTER, CENTER);
  analyzer = new p5.Amplitude();

  // Create the button
  myButton = createButton("💃 DANCE NOW!");
  myButton.position(width / 2 - 50, height / 2 + 100);
  myButton.style("font-size", "20px");
  myButton.style("padding", "10px 20px");
  myButton.mousePressed(toggleSound);
}

function draw() {
  background("pink");

  let volume = analyzer.getLevel();
  let mappedVol = map(volume, 0, 1.0, 0, width);

  push();
  translate(width / 2, height / 2);
  rotate(mappedVol);
  circle(mouseX - width / 2, mouseY - height / 2, mappedVol);
  textSize(mappedVol);
  text("DANCE", 0, 0);
  pop();

  // Optional: Debug volume info
  console.log(volume.toFixed(3) + " | " + mappedVol.toFixed(2));
}

function toggleSound() {
  getAudioContext().resume();

  if (!isPlaying) {
    sound.loop();
    analyzer.setInput(sound);
    loop(); // Start draw loop
    isPlaying = true;
  } else {
    sound.stop();
    noLoop(); // Stop draw loop
    isPlaying = false;
  }
}

function keyPressed() {
  if (key === 'b') {
    fill("blue");
  }
}
