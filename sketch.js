//createCapture example 0

let capture;
const scaleFactor = 12;
let button;

function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.8, WEBGL);
  capture = createCapture(VIDEO);
  capture.size(width / scaleFactor, height / scaleFactor);
  // capture.hide();

  button = createButton('Save as PNG');
  button.mousePressed(() => saveCanvas('mirror', 'png'));
}

function draw() {
  background(0);
  translate(0, 0, 0);
  rotateY(0.5);
  translate(-width / 2, -height / 2);
  ambientLight(200);
  orbitControl();
  capture.loadPixels();
  for (var y = 0; y < capture.height; y++) {
    for (var x = 0; x < capture.width; x++) {
      const index = (x + y * capture.width) * 4;

      const r = capture.pixels[index];
      const g = capture.pixels[index + 1];
      const b = capture.pixels[index + 2];

      const pixelColor = (r + g + b) / 3;

      const pixelSize = map(pixelColor, 0, 255, 0, scaleFactor);
      push();
      // normalMaterial();
      ambientMaterial(r, g, b);
      rotateY(1 / pixelSize);
      translate(x * scaleFactor, y * scaleFactor, -pixelSize * scaleFactor);
      box(pixelSize * 2);
      pop();
    }
  }
}