let buttons = [];

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(14);
  noStroke();

  // Start with one "Delete Me" button
  buttons.push(new TrollButton(width / 2 - 50, height / 2 - 20, 100, 40));
}

function draw() {
  background(255, 240, 245);
  
  for (let btn of buttons) {
    btn.display();
  }
}

function mousePressed() {
  let newButtons = [];

  for (let btn of buttons) {
    if (btn.isHovered(mouseX, mouseY)) {
      let count = buttons.length * 2;
      for (let i = 0; i < count; i++) {
        let bx = random(width - 100);
        let by = random(height - 40);
        newButtons.push(new TrollButton(bx, by, 100, 40));
      }
    }
  }

  // Add the new buttons to the main list
  buttons = buttons.concat(newButtons);
}

// Troll Button class
class TrollButton {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = "Delete Me";
  }

  display() {
    fill(255, 92, 138);
    rect(this.x, this.y, this.w, this.h, 10);
    fill(255);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
  }

  isHovered(mx, my) {
    return mx > this.x && mx < this.x + this.w &&
           my > this.y && my < this.y + this.h;
  }
}
