# Modificacion de imagenes para personas con dificultades en la percepcion de color

## Introduccion

El daltonismo es la incapacidad para ver algunos colores en la forma normal.

Este ocurre cuando hay un problema con los pigmentos en ciertas células nerviosas del ojo que perciben el color. Estas células se llaman conos y se encuentran en la capa de tejido sensible a la luz que recubre la parte posterior del ojo, llamada la retina.

Si sólo falta un pigmento, usted puede tener dificultad para diferenciar entre el rojo y el verde, que es el tipo más común de daltonismo. Si falta un pigmento diferente, usted puede tener dificultad para ver los colores azul y amarillo. Las personas con daltonismo para los colores azul y amarillo con frecuencia tienen problemas para identificar también los colores rojos y verdes.

La forma más grave de daltonismo es la acromatopsia. Se trata de una rara afección en la cual una persona no puede ver ningún color, solamente sombras de gris.

La mayoría de los casos de daltonismo se deben a un problema genético. Muy pocas mujeres son daltónicas y aproximadamente 1 de cada 10 hombres sufren alguna forma de daltonismo.

### Tipos de Daltonismo

* Acromático: no hay percepción de ningún color, la visión es en blanco y negro con matices de gris. Es poco frecuente (1/100.000).

* Monocromático: solo se ve un color, en distintas tonalidades.

* Dicromático: existen tres tipos:
    - Protanopía, ausencia de fotoreceptores al rojo. La parte del espectro de colores que normalmente se ve rojo-verde, se ve gris.
    - Deuteranopía, ausencia de fotoreceptores al verde. La parte del espectro de colores que normalmente se ve verde, se ve gris.
    - Tritanopía, ausencia de fotoreceptores al azul, esta es una condición muy rara.

* Tricromático anómalo: el portador confunde los colores, y es la alteración que se presenta con más frecuencia. En la macula existen los tres tipos de fotoreceptores (para rojo, verde y azul) pero la captación de colores es irregular. Estos pacientes tienen percepción de los colores anormal, semejante a los dicromáticos pero menos acentuadas, dentro de este grupo se incluyen:
    - Protanomalía (1% en hombres- 0.01 % en mujeres).
    - Deuteranomalía es la más frecuente, (6% en hombres- 0.4% en mujeres).
    - Tritanomalía la menos frecuente (0.01 en hombres- 0.01 % en mujeres).

![Daltonismo Acromático](https://www.qvision.es/blogs/ana-tauste/files/2016/04/daltonismo-1024x1006.jpg)

### Entendiendo el problema

Para las personas que no tenemos dificultades para el reconocimiento de colores, entender el daltonismo muchas veces es simplemente creer que se confunde un color por otro y ya, pero esta condición, como pudimos ver anteriormente, tiene distintas variantes y no solo eso, tambien niveles. Una persona con daltonismo tricromático con deutoranopia en grado leve moderado, podria percibir los colores rojos de una forma no tan vívida

![Imagen Referencia Rojos](/VisualComputing/sketches/red_crayons.png)

Si mediante al procesamiento de imagenes queremos simular este tipo de daltonismo, lo primero que debemos recordar es que en una imagen el color de cada pixel esta compuesto por niveles de cada uno de los colores RGB. 

![Imagen Referencia Rojos](/VisualComputing/sketches/paleta.png)

Entonces si dismunuimos el nivel del rojo y aumentamos el nivel del verde podriamos acercarnos a una recreación de este tipo de daltonismo

![Imagen daltonismo tricromático](/VisualComputing/sketches/crayon_ref2.png)

# Deteccion de Daltonismo   

Existen diferentes formas para la detección del Daltonismo. 

## Tests de Ishihara

![Test de Ishihara](https://www.colorlitelens.com/images/Ishihara/Ishihara_07.jpg)


Este es el tipo más común de prueba de daltonismo. Un oftalmólogo (usualmente) le pedirá que mire una imagen formada por puntos de colores con un número o forma de diferente color en el medio. Si la forma se mezcla con el fondo y no puedes verla, es posible que el paciente tenga un tipo de daltonismo. 

Diferentes placas de color pueden verificar diferentes tipos de daltonismo.

## Test con Anomaloscopio

![Test de Anamoloscopio](https://www.researchgate.net/profile/Dimitria-Gatzia/publication/315959577/figure/fig3/AS:494445285961728@1494896350925/An-anomaloscope-is-usually-used-to-test-color-blindness-or-conduct-matching-experiments.png)

Esta prueba verifica si el paciente puede igualar el brillo de dos luces. Se mira a través de un ocular a 2 luces que tienen diferentes niveles de brillo. Se usan perillas para ajustar las luces y se trata de hacer que coincidan. Si no puede igualar el brillo de las 2 luces, es posible que el paciente sufra de daltonismo.

##  Test de tonos

![Test de Tonos](https://mymodernmet.com/wp/wp-content/uploads/2018/10/color-vision-test-pantone-2.jpg)

En una prueba de tono, Se entregan bloques de diferentes colores. Su oftalmólogo pide al paciente que las coloque en el orden del arcoíris, como de rojo a púrpura. Si tiene problemas para ponerlos en el orden correcto, es posible que tenga un tipo de daltonismo. Los oftalmólogos a menudo usan esta prueba para las personas que necesitan tener una visión del color muy precisa para sus trabajos, como fotógrafos o diseñadores.

## Resultados

### Simulando la vision de un paciente

## Original Image with red predominance

{{< details title="Load Image" open=false >}}
```js
let img;

function setup() {
  createCanvas(600, 505);
  img = loadImage('/VisualComputing/sketches/red_crayons.png');
}

function draw() {
  image(img, 0, 0);
}
```
{{< /details >}}



{{< p5-global-iframe id="breath" width="620" height="530" >}}

let img;

function setup() {
  createCanvas(600, 505);
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
  createCanvas(600, 505);

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

{{< p5-global-iframe id="breath" width="620" height="530" >}}

let img;

function preload() {
  img = loadImage('/VisualComputing/sketches/red_crayons.png');
}

function setup() {
  createCanvas(600, 505);

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

### Mejorando la visibilidad por medio de p5

Se uso [Coblis](https://www.color-blindness.com/coblis-color-blindness-simulator/) con la siguiente imagen para simular la vision de un paciente con Deuteranopia (ausencia de la percepción del espectro del color verde). 

![Deuteranopia-Simulacion](/VisualComputing/sketches/deuteranopia-simulation.jpg)

A la izquierda la imagen original, a la derecha la imagen como la veria un paciente con Deuteranopia al ser simulado con Coblis.

La modificación de los valores de RGB permite aumentar el contraste de la imagen y diferencias las colores.


{{< details title="Modifying colors for visibility" open=false >}}

```js

   let img;
    function preload() {
    img = loadImage('https://xabelian.github.io/VisualComputing/sketches/original.jpg');
    }

    function setup() {
    createCanvas(404, 402);
    image(img, 0, 0, width, height);
    let d = pixelDensity();
    loadPixels();
            for (var y = 0; y < height*4; y++) {
                for (var x = 0; x < width; x++) {
                var index = (x + y * width)*4;
                var r = pixels[index+0];
                var g = pixels[index+1];
                var b = pixels[index+2];
                var a = pixels[index+3];     
                
                if (g > 80){
                    pixels[index+2] = b+70
                    //pixels[index+1] = g-40
                }

                
            }
        }
    updatePixels();
    }
```
{{< /details >}}
    

{{< p5-iframe sketch="/VisualComputing/sketches/imageModification.js" width="429" height="427" >}}

Con este resultado, nuevamente simulamos usando Coblis y se obtiene la siguiente imagen.

![Daltonismo Acromático](/VisualComputing/sketches/edited-simulated.jpg)

## Referencias

[How to make figures and presentations that are friendly to Colorblind people](https://jfly.uni-koeln.de/color/)
[https://medium.com/featurepreneur/understanding-the-concept-of-channels-in-an-image-6d59d4dafaa9](Understanding the concept of channels in an image)