let lumaShader;
let img;
let grey_scale;

function preload() {
  lumaShader = readShader('/VisualComputing/sketches/shaders/deuteranopia.frag', { varyings: Tree.texcoords2 });
  img = loadImage('https://xabelian.github.io/VisualComputing/sketches/bosque.jpg');
}

function setup() {
  createCanvas(580, 580, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  lumaShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}