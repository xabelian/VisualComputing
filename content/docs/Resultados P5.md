
# Resultados P5

## Original Image with red predominance



{{< details title="Load Image" open=false >}}
```js
let img;

function setup() {
  createCanvas(600, 600);
  img = loadImage('/VisualComputing/sketches/red_crayons.png');
}

function draw() {
  image(img, 0, 0);
}
```
{{< /details >}}



{{< p5-global-iframe id="breath" width="625" height="625" >}}

let img;

function setup() {
  createCanvas(600, 600);
  img = loadImage('/VisualComputing/sketches/red_crayons.png');
}

function draw() {
  image(img, 0, 0);
}

{{< /p5-global-iframe >}}


{{< details title="Modify Red to Green" open=false >}}

```js

let img;

function preload() {
  img = loadImage('/VisualComputing/sketches/red_crayons.png');
}

function setup() {
  createCanvas(600, 600);

  img.loadPixels();
  // Se recorre cada pixel de la imagen
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      // Lee el color de cada pixel
      let originalColor = img.get(x, y);

      // Modifica los colores rojo y verde. El azul permanece intacto
      const r = red(originalColor)-50;
      const g = green(originalColor)+50;
      const b = blue(originalColor);
      let outputColor = color(r, g, b);
    
      // Coloca el nuevo color a cada pixel
      img.set(x, y, outputColor);
    }
  }
  img.updatePixels();
}

function draw() {
  image(img, 0, 0);
}


```
{{< /details >}}

{{< p5-global-iframe id="breath" width="625" height="625" >}}

let img;

function preload() {
  img = loadImage('/VisualComputing/sketches/red_crayons.png');
}

function setup() {
  createCanvas(600, 600);

  img.loadPixels();
  // Se recorre cada pixel de la imagen
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      // Read the pixel's color
      let originalColor = img.get(x, y);

      // Inverse the color
      const r = red(originalColor)-50;
      const g = green(originalColor)+50;
      const b = blue(originalColor);
      let outputColor = color(r, g, b);
    
      // Set the pixel's color
      img.set(x, y, outputColor);
    }
  }
  img.updatePixels();
}

function draw() {
  image(img, 0, 0);
}

{{< /p5-global-iframe >}}