const PIXEL_DENSITY = 2;
let theShader;
let canvas;

let textureBase;

// Part 2 - Step 2.1
// from here
let control = {
	xBrickAmount: 50.0,
	yBrickAmount: 50.0,
}
// to here

// Part 2 - Step 2.2
// from here
window.onload = function() {
	var gui = new dat.GUI();
	gui.domElement.id = 'gui';
	gui.add(control, 'xBrickAmount', 1, 100).name("X-axis");
	gui.add(control, 'yBrickAmount', 1, 100).name("Y-axis");
};
// to here

// Part 1 - Step 4
// from here
function preload(){
	theShader = loadShader('vert.glsl', 'frag.frag');
	textureBase = loadImage("/data/MonaLisa.jpg");
}
// to here

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function flipImage(img) {
	img.loadPixels();
	
	// Get the width and height of the image
	let w = img.width;
	let h = img.height;
  
	// Create a new array to store the flipped pixels
	let flippedPixels = new Uint8Array(4 * w * h);
  
	// Loop through the original pixels and copy them to the flippedPixels array
	for (let y = 0; y < h; y++) {
	  for (let x = 0; x < w; x++) {
		let index = (y * w + x) * 4;
		let flippedIndex = ((h - y - 1) * w + x) * 4;
  
		// Copy RGBA values
		flippedPixels[flippedIndex] = img.pixels[index];     // Red
		flippedPixels[flippedIndex + 1] = img.pixels[index + 1]; // Green
		flippedPixels[flippedIndex + 2] = img.pixels[index + 2]; // Blue
		flippedPixels[flippedIndex + 3] = img.pixels[index + 3]; // Alpha
	  }
	}
  
	// Assign the flipped pixels back to the image
	img.pixels.set(flippedPixels);
	img.updatePixels();
}

function setup() {
	pixelDensity(PIXEL_DENSITY);
	// canvas = createCanvas(1000,1000, WEBGL);
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	
	flipImage(textureBase);

	background(0);
	noStroke();
	shader(theShader);
}

function draw() {
	var y = (mouseY-500) / min(1, windowWidth / windowHeight) + 500;
	
	theShader.setUniform("u_resolution", [width * PIXEL_DENSITY, height * PIXEL_DENSITY]);
	theShader.setUniform("u_mouse", [mouseX * PIXEL_DENSITY, (height-y) * PIXEL_DENSITY]);
  	theShader.setUniform("u_time", millis() / 1000.0);

	// Part 2 - Step 2.3
	// from here
	theShader.setUniform("u_xBrickAmount", control.xBrickAmount);
	theShader.setUniform("u_yBrickAmount", control.yBrickAmount);

	theShader.setUniform("u_texBase", textureBase);
	// to here
	
	rect(width * -0.5, height * -0.5, width, height);
}

function keyPressed() {
	if (keyCode == ESCAPE) { dat.GUI.toggleHide(); }
}
