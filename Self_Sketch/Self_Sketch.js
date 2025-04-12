let hairStrands = [];
let hairColors = [];
let lipOffset = 0;
let pupilOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(75, 50, 120);
  strokeJoin(ROUND);

  // Hair color palette
  let palette = [
    color(255, 0, 0),
    color(255, 165, 0),
    color(255, 255, 0),
    color(0, 255, 0),
    color(0, 255, 255),
    color(0, 0, 255),
    color(128, 0, 128),
    color(255, 0, 255)
  ];

  // 🎯 CURVED HAIR — closer to the head!
  let cx = width / 2;
  let cy = height / 2 - 160; // lower so it touches the top of the face
  let radius = 140;

  for (let i = 0; i < 600; i++) {
    let angle = random(-PI / 2 - 0.9, -PI / 2 + 0.9); // wider arc
    let r = radius + random(-10, 10);
    let x = cx + cos(angle) * r;
    let y = cy + sin(angle) * r;
    hairStrands.push({ x, y, len: random(60, 120) });
    hairColors.push(random(palette));
  }
}

function draw() {
  background(75, 50, 120);

  drawFace();
  drawFeatures();
  drawHair(); // draw on top

  lipOffset = sin(frameCount * 0.05) * 5;
  pupilOffset = sin(frameCount * 0.1) * 3;
}

function drawHair() {
  for (let i = 0; i < hairStrands.length; i++) {
    let h = hairStrands[i];
    let d = dist(mouseX, mouseY, h.x, h.y);

    stroke(hairColors[i]);
    strokeWeight(4);
    if (d < 50) {
      line(h.x, h.y, h.x + random(-10, 10), h.y + h.len + random(-10, 10));
    } else {
      line(h.x, h.y, h.x, h.y + h.len);
    }
  }
}

function drawFace() {
  stroke(0);
  strokeWeight(6);
  fill(255, 150, 170);
  beginShape();
  vertex(width / 2 - 80, height / 2 - 180);
  bezierVertex(width / 2 - 100, height / 2 - 60, width / 2 - 90, height / 2 + 140, width / 2, height / 2 + 170);
  bezierVertex(width / 2 + 100, height / 2 + 160, width / 2 + 90, height / 2 - 60, width / 2 + 60, height / 2 - 180);
  bezierVertex(width / 2 + 30, height / 2 - 210, width / 2 - 40, height / 2 - 210, width / 2 - 80, height / 2 - 180);
  endShape(CLOSE);
}

function drawFeatures() {
  stroke(0);
  strokeWeight(5);

  // Eyes
  fill(150, 255, 150);
  ellipse(width / 2 - 40, height / 2 - 60, 60, 30);
  ellipse(width / 2 + 40, height / 2 - 40, 40, 25);

  // Pupils
  fill(0);
  ellipse(width / 2 - 40 + pupilOffset, height / 2 - 60, 10, 10);
  ellipse(width / 2 + 40 - pupilOffset, height / 2 - 40, 10, 10);

  // Nose
  line(width / 2 - 10, height / 2 - 30, width / 2 - 25, height / 2 + 20);
  point(width / 2 - 30, height / 2 + 20);

  // Lips
  fill(0, 0, 150);
  beginShape();
  vertex(width / 2 - 30, height / 2 + 60 + lipOffset);
  bezierVertex(width / 2 - 10, height / 2 + 80 + lipOffset, width / 2 + 10, height / 2 + 80 + lipOffset, width / 2 + 30, height / 2 + 60 + lipOffset);
  bezierVertex(width / 2 + 10, height / 2 + 55 + lipOffset, width / 2 - 10, height / 2 + 55 + lipOffset, width / 2 - 30, height / 2 + 60 + lipOffset);
  endShape(CLOSE);
}
