## Scene Trees
### 3D Brush

Una de las aplicaciones mas interesantes sobre los entornos de dibujo 3D o 3D Brushes, es acerca de los distintos dispositivos que se pueden utilizar para manipular estos espacios de trabajo. La idea de utilizar dispositivos diferentes es mejorar la experiencia del usuario y permitirle utilizar dispositivos diferentes al teclado y el mosue.

En nuestro caso, estudiamos el uso de controles de consolas en un 3D Brush, puntualmente el control de un PlayStation 4. Se estudio el uso de la libreria GamepadAPI y drivers como DS4Windows

![image](https://user-images.githubusercontent.com/36849580/169844039-63a56ece-47cc-4263-80c0-2a3dceb1050a.png)

Para la creación del 3D Brush, se utilizo como base el espacio dado por el profesor, haciendo uso de las librerias Treegl y Opencam.



{{< details title="p5 iFrame ShortCode" open=false >}}
```js
< p5-iframe sketch="/sketches/trees/3dbrush.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="625" height="475" >
```
{{< /details >}}

{{< details title="3d Brush js" open=false >}}
```js
// Goal in the 3d Brush is double, to implement:
// 1. a gesture parser to deal with depth, i.e.,
// replace the depth slider with something really
// meaningful. You may use a 3d sensor hardware
// such as: https://en.wikipedia.org/wiki/Leap_Motion
// or machine learning software to parse hand (or
// body) gestures from a (video) / image, such as:
// https://ml5js.org/
// 2. other brushes to stylize the 3d brush, taking
// into account its shape and alpha channel, gesture
// speed, etc.

// Brush controls
let color;
let depth;
let brush;

let easycam;
let state;

let escorzo;
let points;
let record;

function setup() {
  createCanvas(600, 450, WEBGL);
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  escorzo = true;
  perspective();

  // brush stuff
  points = [];
  depth = createSlider(0, 1, 0.05, 0.05);
  depth.position(10, 10);
  depth.style('width', '580px');
  color = createColorPicker('#ed225d');
  color.position(width - 70, 40);
  // select initial brush
  brush = sphereBrush;
}

function draw() {
  update();
  background(120);
  push();
  strokeWeight(0.8);
  stroke('magenta');
  grid({ dotted: false });
  pop();
  axes();
  for (const point of points) {
    push();
    translate(point.worldPosition);
    brush(point);
    pop();
  }
}

function update() {
  let dx = abs(mouseX - pmouseX);
  let dy = abs(mouseY - pmouseY);
  speed = constrain((dx + dy) / (2 * (width - height)), 0, 1);
  if (record) {
    points.push({
      worldPosition: treeLocation([mouseX, mouseY, depth.value()], { from: 'SCREEN', to: 'WORLD' }),
      color: color.color(),
      speed: speed
    });
  }
}

function sphereBrush(point) {
  push();
  noStroke();
  // TODO parameterize sphere radius and / or
  // alpha channel according to gesture speed
  fill(point.color);
  sphere(1);
  pop();
}

function keyPressed() {
  if (key === 'r') {
    record = !record;
  }
  if (key === 'p') {
    escorzo = !escorzo;
    escorzo ? perspective() : ortho();
  }
  if (key == 'c') {
    points = [];
  }
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}

```
{{< /details >}}


{{< p5-global-iframe id="breath" width="620" height="530" >}}


// Goal in the 3d Brush is double, to implement:
// 1. a gesture parser to deal with depth, i.e.,
// replace the depth slider with something really
// meaningful. You may use a 3d sensor hardware
// such as: https://en.wikipedia.org/wiki/Leap_Motion
// or machine learning software to parse hand (or
// body) gestures from a (video) / image, such as:
// https://ml5js.org/
// 2. other brushes to stylize the 3d brush, taking
// into account its shape and alpha channel, gesture
// speed, etc.

// Brush controls
let color;
let depth;
let brush;

let easycam;
let state;

let escorzo;
let points;
let record;

function setup() {
  createCanvas(600, 450, WEBGL);
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  escorzo = true;
  perspective();

  // brush stuff
  points = [];
  depth = createSlider(0, 1, 0.05, 0.05);
  depth.position(10, 10);
  depth.style('width', '580px');
  color = createColorPicker('#ed225d');
  color.position(width - 70, 40);
  // select initial brush
  brush = sphereBrush;
}

function draw() {
  update();
  background(120);
  push();
  strokeWeight(0.8);
  stroke('magenta');
  grid({ dotted: false });
  pop();
  axes();
  for (const point of points) {
    push();
    translate(point.worldPosition);
    brush(point);
    pop();
  }
}

function update() {
  let dx = abs(mouseX - pmouseX);
  let dy = abs(mouseY - pmouseY);
  speed = constrain((dx + dy) / (2 * (width - height)), 0, 1);
  if (record) {
    points.push({
      worldPosition: treeLocation([mouseX, mouseY, depth.value()], { from: 'SCREEN', to: 'WORLD' }),
      color: color.color(),
      speed: speed
    });
  }
}

function sphereBrush(point) {
  push();
  noStroke();
  // TODO parameterize sphere radius and / or
  // alpha channel according to gesture speed
  fill(point.color);
  sphere(1);
  pop();
}

function keyPressed() {
  if (key === 'r') {
    record = !record;
  }
  if (key === 'p') {
    escorzo = !escorzo;
    escorzo ? perspective() : ortho();
  }
  if (key == 'c') {
    points = [];
  }
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}

{{< /p5-global-iframe >}}


### 3D GUI

GUI utiliza mallas para crear una interfaz de usuario interactiva, que está completamente integrada en su escena. Es un programa informático que actúa de interfaz de usuario, utilizando un conjunto de imágenes y objetos gráficos para representar la información y acciones disponibles en la interfaz. Su principal uso consiste en proporcionar un entorno visual sencillo para permitir la comunicación con el sistema operativo de una máquina o computador.

Habitualmente las acciones se realizan mediante manipulación directa, para facilitar la interacción del usuario con la computadora. Surge como evolución de las interfaces de línea de comandos que se usaban para operar los primeros sistemas operativos y es pieza fundamental en un entorno gráfico.

Las GUI 3D aparecieron en la literatura y las películas de ciencia ficción antes de que fueran técnicamente viables o de uso común. En la ficción en prosa, las GUI 3D se han retratado como entornos sumergibles, acuñados como el "ciberespacio" de William Gibson y el "metaverso" y los "avatares" de Neal Stephenson. 

La película estadounidense de 1993 Jurassic Park presenta el administrador de archivos 3D File System Navigator de Silicon Graphics, un administrador de archivos de la vida real para los sistemas operativos Unix. La película Minority Report tiene escenas de agentes de policía que utilizan sistemas de datos 3D especializados.

{{< details title="p5 iFrame ShortCode" open=false >}}
```js
< p5-iframe sketch="/sketches/trees/3dbrush.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="625" height="475" >
```
{{< /details >}}

{{< details title="3D GUI js" open=false >}}
```js

// Brush controls
// texture
let img;
// check boxes
let toggle_3d_gui;
let auto_rotate;
// select
let mode;
let tipo;
// select forma
let forma;
// 3d gui
let color1;
let color2;

//Ejes x,y,z
let x_e = 0;
let y_e = 0;
let z_e = 0;

let easycam;
let foreshortening = true;

// bulls shape
let circled = false;

// resume animation
let frames = 0;

// spaces
let sphere1;
let sphere2;

let depth;

function preload() {
  img = loadImage('https://upload.wikimedia.org/wikipedia/commons/b/b1/Mapa_mundi_blanco.PNG');
}

function setup() {
  createCanvas(600, 480, WEBGL);
  textureMode(NORMAL);
  toggle_3d_gui = createCheckbox('toggle 3d gui', false);
  toggle_3d_gui.style('color', 'white');
  toggle_3d_gui.position(10, 30);
  toggle_3d_gui.changed(() => {
    if (toggle_3d_gui.checked()) {
      color1.show();
      color2.show();
    }
    else {
      color1.hide();
      color2.hide();
    }
  });
  
  // brush stuff
  depth = createSlider(10, 130, 50, 0);
  depth.position(10, 10);
  depth.style('width', '270px');
  // select initial brush
  
  // brush stuff
  depth1 = createSlider(10, 130, 50, 0);
  depth1.position(310, 10);
  depth1.style('width', '270px');
  // select initial brush
  
  //eje de rotacion x
  x_rotate = createCheckbox('X', false);
  x_rotate.style('color', 'white');
  x_rotate.position(10, 90);
  
  //eje de rotacion y
  y_rotate = createCheckbox('Y', false);
  y_rotate.style('color', 'white');
  y_rotate.position(45, 90);

  //eje de rotacion z
  z_rotate = createCheckbox('Z', false);
  z_rotate.style('color', 'white');
  z_rotate.position(80, 90);

  //rotacion
  auto_rotate = createCheckbox('reinicio rotate', false);
  auto_rotate.style('color', 'orange');
  auto_rotate.position(10, 60);
  
  mode = createSelect();
  mode.position(15, 120);
  mode.option('Fill');
  mode.option('Wiredframe');
  mode.option('Texture');
  mode.value('Texture');
  
  tipo = createSelect();
  tipo.position(15, 150);
  tipo.option('Esfera');
  tipo.option('Cilindro');
  tipo.option('Cono');
  tipo.option('Cubo');
  tipo.option('Cuboide');
  tipo.option('Piramide');
  tipo.option('Texture');
  tipo.value('Esfera');
  
  color1 = createColorPicker('cyan');
  color2 = createColorPicker('magenta');
  easycam = createEasyCam();

  let state = {
    distance: 300,           // scalar
    center: [1, 0, 0],       // vector
    rotation: [0, 0, 1, 0],  // quaternion
  };
  
  easycam.setState(state, 0); // animate to state over the period of 1 second
}

function draw() {
  background(100);
  
  push();
  strokeWeight(2);
  stroke('orange');
  grid({size: 200});
  pop();
  axes();
 
  if (x_rotate.checked()) x_e ++;
  if (y_rotate.checked()) y_e ++;
  if (z_rotate.checked()) z_e ++;
  
  if (auto_rotate.checked()) {
    x_e=0;
    y_e=0;
    z_e=0; 
  }
  rotateX(x_e * 0.01);
  rotateZ(z_e * 0.01);
  rotateY(y_e * 0.01);
  
  
  axes(30);
  push();
  
  switch (mode.value()) {
    case 'Fill':
      fill(255, 0, 0);
      break;
    case 'Wiredframe':
      noFill();
      stroke(0, 255, 255);
      break;
    default:
      noStroke();
      texture(img);
  }
  
  switch (tipo.value()) {
    case 'Esfera':
      sphere(depth.value());
      break;
    case 'Cilindro':
      cylinder(depth1.value(), depth.value()*2);
      break;
    case 'Cono':
      cone(depth1.value(), depth.value()*1.5);
      break;
    case 'Cubo':
      box(depth.value());
      break;
    case 'Cuboide':
      box(depth1.value(), depth.value());
      break;
    case 'Piramide':
      cone(depth1.value(), depth.value(), 5);
      break;
    default:
      //sphere(depth.value(), 4, 20);
      //sphere(depth.value());
      break;
  }
  //
  
  pop();
  push();
  
  translate(0, 50+depth.value());
  rotateY(frames * 0.01);
  
  sphere1 = mMatrix();
  axes(30);
  noStroke();
  fill(color1.color());
  sphere(15);
  pop();
  push();
  
  translate(0, -50-depth.value());
  rotateZ(frames * 0.01);
  
  sphere2 = mMatrix();
  axes(30);
  
  noStroke();
  fill(color2.color());
  sphere(15);
  pop();
  
  if (toggle_3d_gui.checked()) {
    let sphere1Projection = treeLocation([0, 0, 0], { from: sphere1, to: 'SCREEN' });
    beginHUD();
    color1.position(sphere1Projection.x, sphere1Projection.y);
    endHUD();
    let sphere2Projection = treeLocation([0, 0, 0], { from: sphere2, to: 'SCREEN' });
    beginHUD();
    color2.position(sphere2Projection.x, sphere2Projection.y);
    endHUD();
  }
}

function keyPressed() {
  if (key === 'b') {
    circled = !circled;
  }
  if (key === 'p') {
    foreshortening = !foreshortening;
    foreshortening ? perspective() : ortho();
  }
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}

```
{{< /details >}}

{{< p5-global-iframe id="breath" width="620" height="530" >}}

// texture
let img;
// check boxes
let toggle_3d_gui;
let auto_rotate;
// select
let mode;
let tipo;
// select forma
let forma;
// 3d gui
let color1;
let color2;

//Ejes x,y,z
let x_e = 0;
let y_e = 0;
let z_e = 0;

let easycam;
let foreshortening = true;

// bulls shape
let circled = false;

// resume animation
let frames = 0;

// spaces
let sphere1;
let sphere2;

let depth;

function preload() {
  img = loadImage('https://upload.wikimedia.org/wikipedia/commons/b/b1/Mapa_mundi_blanco.PNG');
}

function setup() {
  createCanvas(600, 480, WEBGL);
  textureMode(NORMAL);
  toggle_3d_gui = createCheckbox('toggle 3d gui', false);
  toggle_3d_gui.style('color', 'white');
  toggle_3d_gui.position(10, 30);
  toggle_3d_gui.changed(() => {
    if (toggle_3d_gui.checked()) {
      color1.show();
      color2.show();
    }
    else {
      color1.hide();
      color2.hide();
    }
  });
  
  // brush stuff
  depth = createSlider(10, 130, 50, 0);
  depth.position(10, 10);
  depth.style('width', '270px');
  // select initial brush
  
  // brush stuff
  depth1 = createSlider(10, 130, 50, 0);
  depth1.position(310, 10);
  depth1.style('width', '270px');
  // select initial brush
  
  //eje de rotacion x
  x_rotate = createCheckbox('X', false);
  x_rotate.style('color', 'white');
  x_rotate.position(10, 90);
  
  //eje de rotacion y
  y_rotate = createCheckbox('Y', false);
  y_rotate.style('color', 'white');
  y_rotate.position(45, 90);

  //eje de rotacion z
  z_rotate = createCheckbox('Z', false);
  z_rotate.style('color', 'white');
  z_rotate.position(80, 90);

  //rotacion
  auto_rotate = createCheckbox('reinicio rotate', false);
  auto_rotate.style('color', 'orange');
  auto_rotate.position(10, 60);
  
  mode = createSelect();
  mode.position(15, 120);
  mode.option('Fill');
  mode.option('Wiredframe');
  mode.option('Texture');
  mode.value('Texture');
  
  tipo = createSelect();
  tipo.position(15, 150);
  tipo.option('Esfera');
  tipo.option('Cilindro');
  tipo.option('Cono');
  tipo.option('Cubo');
  tipo.option('Cuboide');
  tipo.option('Piramide');
  tipo.option('Texture');
  tipo.value('Esfera');
  
  color1 = createColorPicker('cyan');
  color2 = createColorPicker('magenta');
  easycam = createEasyCam();

  let state = {
    distance: 300,           // scalar
    center: [1, 0, 0],       // vector
    rotation: [0, 0, 1, 0],  // quaternion
  };
  
  easycam.setState(state, 0); // animate to state over the period of 1 second
}

function draw() {
  background(100);
  
  push();
  strokeWeight(2);
  stroke('orange');
  grid({size: 200});
  pop();
  axes();
 
  if (x_rotate.checked()) x_e ++;
  if (y_rotate.checked()) y_e ++;
  if (z_rotate.checked()) z_e ++;
  
  if (auto_rotate.checked()) {
    x_e=0;
    y_e=0;
    z_e=0; 
  }
  rotateX(x_e * 0.01);
  rotateZ(z_e * 0.01);
  rotateY(y_e * 0.01);
  
  
  axes(30);
  push();
  
  switch (mode.value()) {
    case 'Fill':
      fill(255, 0, 0);
      break;
    case 'Wiredframe':
      noFill();
      stroke(0, 255, 255);
      break;
    default:
      noStroke();
      texture(img);
  }
  
  switch (tipo.value()) {
    case 'Esfera':
      sphere(depth.value());
      break;
    case 'Cilindro':
      cylinder(depth1.value(), depth.value()*2);
      break;
    case 'Cono':
      cone(depth1.value(), depth.value()*1.5);
      break;
    case 'Cubo':
      box(depth.value());
      break;
    case 'Cuboide':
      box(depth1.value(), depth.value());
      break;
    case 'Piramide':
      cone(depth1.value(), depth.value(), 5);
      break;
    default:
      //sphere(depth.value(), 4, 20);
      //sphere(depth.value());
      break;
  }
  //
  
  pop();
  push();
  
  translate(0, 50+depth.value());
  rotateY(frames * 0.01);
  
  sphere1 = mMatrix();
  axes(30);
  noStroke();
  fill(color1.color());
  sphere(15);
  pop();
  push();
  
  translate(0, -50-depth.value());
  rotateZ(frames * 0.01);
  
  sphere2 = mMatrix();
  axes(30);
  
  noStroke();
  fill(color2.color());
  sphere(15);
  pop();
  
  if (toggle_3d_gui.checked()) {
    let sphere1Projection = treeLocation([0, 0, 0], { from: sphere1, to: 'SCREEN' });
    beginHUD();
    color1.position(sphere1Projection.x, sphere1Projection.y);
    endHUD();
    let sphere2Projection = treeLocation([0, 0, 0], { from: sphere2, to: 'SCREEN' });
    beginHUD();
    color2.position(sphere2Projection.x, sphere2Projection.y);
    endHUD();
  }
}

function keyPressed() {
  if (key === 'b') {
    circled = !circled;
  }
  if (key === 'p') {
    foreshortening = !foreshortening;
    foreshortening ? perspective() : ortho();
  }
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}

{{< /p5-global-iframe >}}
