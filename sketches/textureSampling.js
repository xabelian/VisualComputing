let lumaShader;
let img;
let grey_scale;

function preload() {
  lumaShader = readShader('/VisualComputing/sketches/shaders/luma.frag', { varyings: Tree.texcoords2 });
  img = loadImage('https://xabelian.github.io/VisualComputing/sketches/cat.png');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  grey_scale = createSelect();
  grey_scale.option("RGB", 1);
  grey_scale.option("Luma", 2);
  grey_scale.option("Average", 3);
  grey_scale.selected("RGB");
  grey_scale.position(10, 10);
  grey_scale.style('color', 'black');
  grey_scale.input(() => lumaShader.setUniform('grey_scale', grey_scale.value()));
  lumaShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}