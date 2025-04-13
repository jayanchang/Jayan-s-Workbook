let capture;
let currentFilter = 'none';

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();

  createButton('Threshold').class('filter-btn').position(20, 20).mousePressed(() => currentFilter = 'threshold');
  createButton('Posterize').class('filter-btn').position(140, 20).mousePressed(() => currentFilter = 'posterize');
  createButton('Invert').class('filter-btn').position(260, 20).mousePressed(() => currentFilter = 'invert');
  createButton('No Filter').class('filter-btn').position(360, 20).mousePressed(() => currentFilter = 'none');
}

function draw() {
  background(0);
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  image(capture, x, y);

  switch (currentFilter) {
    case 'threshold':
      filter(THRESHOLD);
      break;
    case 'posterize':
      filter(POSTERIZE, 3);
      break;
    case 'invert':
      filter(INVERT);
      break;
  }

  fill(255);
  textSize(16);
  text("Current Filter: " + currentFilter, 20, height - 20);
}
