let petals = [];
let treeFlowers = [];
let treeImg;

function preload() {
  treeImg = loadImage('data/sakura-tree.png'); // Load your uploaded tree image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(245, 233, 242); // soft pink

  // Draw the tree image centered near bottom
  imageMode(CENTER);
  let treeHeight = height * 0.8;
  let treeWidth = (treeImg.width / treeImg.height) * treeHeight;
  image(treeImg, width / 2, height - treeHeight / 2, treeWidth, treeHeight);

  // Draw added flowers with rotation
  for (let f of treeFlowers) {
    push();
    translate(f.x, f.y);
    rotate(f.rotation);
    drawPetal(0, 0, f.size, f.color, false);
    pop();
  }

  // Add falling petals from mouse hover
  if (frameCount % 3 === 0) {
    petals.push(new Petal(mouseX, mouseY));
  }

  // Update and draw falling petals
  for (let i = petals.length - 1; i >= 0; i--) {
    petals[i].update();
    petals[i].show();
    if (petals[i].alpha <= 0) {
      petals.splice(i, 1);
    }
  }

  // Mouse trail effect
  for (let i = 0; i < 5; i++) {
    let offsetX = random(-8, 8);
    let offsetY = random(-8, 8);
    noStroke();
    fill(255, 180, 200, 150);
    ellipse(mouseX + offsetX, mouseY + offsetY, random(6, 16));
  }
}

// Click & drag to add flowers to the tree
function mouseDragged() {
  treeFlowers.push({
    x: mouseX,
    y: mouseY,
    size: random(18, 30), // random size
    rotation: random(TWO_PI), // random rotation
    color: color(random(240, 255), random(160, 200), random(180, 220), 230)
  });
}

// Petal class for falling petals
class Petal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 30);
    this.alpha = 255;
    this.color = color(random(250, 255), random(170, 200), random(190, 220), this.alpha);
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(1.5, 2.5);
    this.rotate = random(TWO_PI);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.alpha -= 2;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.rotate);
    drawPetal(0, 0, this.size, color(red(this.color), green(this.color), blue(this.color), this.alpha), true);
    pop();
  }
}

// Draw a stylized arrow-like sakura petal
function drawPetal(x, y, size, col, downward) {
  push();
  translate(x, y);
  if (downward) rotate(PI); // falling petals point downward
  fill(col);
  noStroke();
  beginShape();
  vertex(0, -size * 1.2);
  bezierVertex(size * 0.6, -size * 0.8, size * 0.6, size * 0.2, 0, size);
  bezierVertex(-size * 0.6, size * 0.2, -size * 0.6, -size * 0.8, 0, -size * 1.2);
  endShape(CLOSE);
  pop();
}
