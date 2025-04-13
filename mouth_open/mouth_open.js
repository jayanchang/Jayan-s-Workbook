let video;
let facemesh;
let predictions = [];
let camScale = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Start webcam
  video = createCapture(VIDEO, () => {
    console.log("Webcam started");
  });
  video.size(640, 480);
  video.hide();

  // Load FaceMesh model
  facemesh = ml5.facemesh(video, () => {
    console.log("FaceMesh model loaded!");
  });

  // Get face predictions continuously
  facemesh.on("predict", (results) => {
    predictions = results;
  });
}

function draw() {
  background(0);

  // Default frame size
  let w = video.width * camScale;
  let h = video.height * camScale;
  let x = (width - w) / 2;
  let y = (height - h) / 2;

  image(video, x, y, w, h);

  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;

    // Get mouth top and bottom points
    let topLip = keypoints[13];     // upper inner lip
    let bottomLip = keypoints[14];  // lower inner lip

    let mouthOpen = dist(topLip[0], topLip[1], bottomLip[0], bottomLip[1]);
    let targetScale = map(mouthOpen, 5, 40, 0.6, 1.5, true);

    camScale = lerp(camScale, targetScale, 0.1);

    // Optional: show red dots on lips
    fill(255, 0, 0);
    noStroke();
    ellipse(topLip[0], topLip[1], 10);
    ellipse(bottomLip[0], bottomLip[1], 10);
  }

  // Optional: display current scale
  fill(255);
  noStroke();
  textSize(16);
  text("Scale: " + nf(camScale, 1, 2), 20, height - 20);
}
