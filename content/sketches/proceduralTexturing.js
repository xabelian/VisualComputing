let pg;
let truchetShader;

function preload() {
  truchetShader = readShader('/VisualComputing/sketches/shaders/diamondtiles.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  selShader = createSelect();
  selShader.position(10, 10);
  selShader.option('shader1');
  selShader.option('shader2');
  selShader.selected('shader1');
  selShader.changed(changeShader);
  textAlign(CENTER);
  createCanvas(500, 500, WEBGL);
  pg = createGraphics(500, 500, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
 
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#
 
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  sphere(200, 400);
}

function mouseMoved() {
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}


/**
* the changeShader function allows the user to select one of the
* shaders in the current directory.
*/
function changeShader() {
  let item = selShader.value();
  console.log(item);
  let shaders = {
    'shader1': '/VisualComputing/sketches/shaders/diamondtiles.frag',
    'shader2': '/VisualComputing/sketches/shaders/truchet.frag',
  }
    truchetShader = readShader(shaders[item], { matrices: Tree.NONE, varyings: Tree.NONE });
  selShader.selected(item);
}