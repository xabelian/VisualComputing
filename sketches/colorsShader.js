let colorShader;
let cmy;
let v1, v2, v3;
let colorr = 255;
function preload() {
  // The vertex shader defines how vertices are projected onto clip space.
  // Most of the times a projection and modelview matrix are needed for this
  // (see: https://visualcomputing.github.io/docs/shaders/programming_paradigm/).
  // Here, however, we are going to:
  // 1. Define the triangle vertices directly in clip space, thus bypassing
  // both of these matrices (matrices: Tree.NONE). The p5 mandelbrot vertex
  // shader does just the same: https://p5js.org/reference/#/p5/loadShader
  // 2. Interpolate vertex color data (varyings: Tree.color4). Note that
  // color data is defined in a per vertex basis with the fill command below.
  // Have a look at the generated vertex shader in the console!
  // readShader: https://github.com/VisualComputing/p5.treegl#handling
  colorShader = readShader('/VisualComputing/sketches/shaders/color.frag', { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(600, 450, WEBGL);
  // https://p5js.org/reference/#/p5/shader
  shader(colorShader);
  randomizeTriangle();
}

function draw() {
  background(0);
  // the fill command is used to define the colors
  // (to be interpolated) in a per-vertex basis
  beginShape(TRIANGLES);
  fill(colorr);
  vertex(v1.x, v1.y);
  fill('blue');
  vertex(v2.x, v2.y);
  fill('green');
  vertex(v3.x, v3.y);
  endShape();
}

// vertices are given directly in clip-space,
// i.e., both x and y vertex coordinates ∈ [-1..1]
function randomizeTriangle() {
  v1 = p5.Vector.random2D();
  v2 = p5.Vector.random2D();
  v3 = p5.Vector.random2D();
}

function keyPressed() {
  if (key == 'c') {
    cmy = !cmy;
    // https://p5js.org/reference/#/p5.Shader/setUniform
    colorShader.setUniform('cmy', cmy);
  }
  if (key == 'r') {
    randomizeTriangle();
  }
}
function mouseMoved () {
  colorr = colorr + 2;
  if (colorr > 280) {
    colorr = 0;
  }
}