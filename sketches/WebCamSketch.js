// Basado en el trabajo de https://github.com/kcconch


// variable shader
let theShader;
let cam;

function preload(){
  // carga de shader
  theShader = loadShader('/VisualComputing/sketches/shaders/webcam.vert', '/VisualComputing/sketches/shaders/webcam.frag');
}

function setup() {
  pixelDensity(1);
  // invocación de WEBGL pra uso de shaders
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
  
  cam.hide();
}

function draw() {
  // La función shader() activa el shader de nuestro shader
  shader(theShader);
  
  // se pasa la camara como una textura
  theShader.setUniform('tex0', cam);

  // con rect se le da cierta geometria a nuestro canvas
  rect(0,0,width,height);
  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
