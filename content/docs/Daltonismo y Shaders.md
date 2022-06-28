# Uso de Shaders para el ajuste de colores como ayuda para personas con daltonismo

Como se trabajó en la primera entrega de este curso, pudimos identificar distintos tipos de incapacidades en las personas para percibir distintos tipos de colores en las imágenes. Desde la Acromatopsia (Incapacidad para percibir cualquier color) hasta la Tritanopía (Dificualtades para percibir el azul), por medio de modificaciones y ajustes en las imágenes mediante sofware, primero es posible simular la discapacidad para que una persona sana entienda como ve el mundo una persona con este padecimiento y segundo, es posible realizar ajustes sobre la gama de colores pasra que la persona daltonica pueda percibir un poco mejor las imágenes.

![Daltonismo Acromático](https://www.qvision.es/blogs/ana-tauste/files/2016/04/daltonismo-1024x1006.jpg)

![Deuteranopia-Simulacion](/VisualComputing/sketches/deuteranopia-simulation.jpg)

En esa primera entrega se realizó la modificación de los valores RGB de las imágenes por medio de P5. Ahi se identificó que para cada uno de los tipos de daltonismo, era posile modificar el nivel de cada uno de los valores de RGB para el ajuste de las imágenes. Ahora, el objetivo es hacer uso de shaders para evaluar si con este método se pueden obtener mejores resultados.

## ¿Y, que son los Shaders?

En pocas palabras, los shaders son programas que se ejecutan directamente en la placa de video de un computador, esto debido a que las GPU estan enfocadas a la matemática de vectores y matrcies, mientras que las CPU convencionales no lo están. En este curso se han trabajado 2 tipo principales de Shaders, los Vertex Shaders y los Fragment Shaders (también conocidos como los Píxel Shaders)

### Vertex Shaders

Los Vertex Shaders se ejecutan una vez por cada vértice que forma parte del elemento que se quiere renderizar. Permiten hacer efectos sobre los propios vértices, es decir, moverlos para hacer algún efecto de distorsión. Su valor de retorno es la posición del vértice procesada

### Fragment Shaders

Estos se ejecutan una vez por cada fragmento visible de la imagen (es decir, la cantidad de veces que se ejecuten depende de la vista de cámara, tamaño del objeto y otros factores más). Su valor de retorno es el color del pixel resultante. Con la ayuda de los vertex shaders, permiten hacer efectos vistosos como iluminación, cel shading, bump mapping, y una gran cantidad de filtros de post-procesamiento como desenfoque, profundidad de campo, desenfoque de movimiento, bloom, hdr, entre otros.

### Ejemplo de uso de shaders

En este primer ejemplo tenemos como baes una geometria triangular, al desplazar el mouse sobre el canvas de izquiera a derecha se aumentan los numeros de vertices de la figura (vertez shader), a su vez que cambia el color de los pixeles al interior de la misma (fragment shader)

{{< p5-iframe sketch="/VisualComputing/sketches/VertexExample.js" width="625" height="475">}}

Este segundo ejemplo es el mismo que se encuentra en la página del curso, en donde por medio del uso de coordenadas baricéntricas se obtienen los colores por interpolación dentro de un triangulo generado aleatoriamente. Al pasar el mouse sobre la imagen, cambian los colores de esta

{{< p5-iframe sketch="/VisualComputing/sketches/colorsShader.js" width="625" height="475">}}

## Cómo implementar los shaders para mejora de reconocimiento de imagenes en el daltonimso? - Mejora de imagen desde una Web Cam

Como vimos anteriormente, los shaders nos permiten manipular los vertices y los pixeles de una imagen, esto es de gran utilidad ya que se pueden mejorar los contornos y realzar ciertos colores para mejorar su visualización. Esto atacaría directamente el problema de las personas con daltonismo, que es no poder identificar de manera adecuada una imagen que tenga determinados tipos de colores.

Si se realiza un cambio en los colores de una imagen y se implementa una mejora en los contornos de la misma, las personas con discapacidades visuales podráin identificar las imágenes con mayor facilidad.

Esta imagen muestra un ejemplo del resultado que se quiere obtener realizando el realce de colores y contornos, ahora, el objetivo es la implementación en un video en tiempo real con una web cam.

![Realce Colores y Contornos](/VisualComputing/sketches/original_shad1.png)

### Transformación de imagen usando Shaders: Ejecución y simulación 

{{< details title="Modify RGB values" open=false >}}

```js

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

```
{{< /details >}}

Vamos a repetir el proceso realizado en la primera entrega. Se tiene la imagen original del bosque.
![Imagen de bosque antes de ser procesada.](/VisualComputing/sketches/bosque.jpg)

Luego modificamos los valores RGB de la imagen para hacer un cambio, que al ser simulado por un simulador de deuteranopia, o visto por un paciente con este tipo de "Color blindness" pueda distinguir mejor los colores al ejemplo de arriba.

{{<p5-iframe sketch="/VisualComputing/sketches/deuteranopia.js" width="700" height="700">}}

La imagen es luego pasada por un simulador de deuteranopia de Coblis (Color Blindness Simulator)

![Imagen de bosque tras ser modificada y simulada.](/VisualComputing/sketches/deuteranopia-simulado.jpg)

Como se puede observar, los colores de la imagen son más distinguibles, que al observar la imagen original y en la primera entrega.

### Imagen desde la cámara web

{{< p5-iframe sketch="/VisualComputing/sketches/WebCamSketch.js" width="625" height="475">}}

## Conclusiones

La implementación de shaders para manipulación de iamgenes en tiempo real es posible gracias a todo el trabajo existente en OpenGL, ya que esto permite que con recursos de hardware, que incluso se encuentran en la nube de GitHub, se pueda hacer uso de los shaders. Sin embargo, los algoritmos requeridos para obtener el resultado final (mejoras de colores y sombreados) son mas complejos de lo esperado para la implementación en video, razón por la cual solo se logró la implementación de una máscara sobre la imagen obtenida de la cámara web.

## Trabajo futuro

El objetivo, y se continua desarrollando conocimiento e investigación sobre esta área, es seguir implementado shaders y máscaras para mejoramiento de video en tiempo real par ayudar a las personas con discapacidades visuales.


## Referencias

- How to make figures and presentations that are friendly to Colorblind people [How to make figures and presentations that are friendly to Colorblind people](https://jfly.uni-koeln.de/color/) 
- Introducción a Shaders GLSL [Introducción a Shaders GLSL](https://gzalo.com/articles/shaders/) 
- Applying Shaders to vertex [Applying Shaders to vertex](https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/shaders_to_vertices)
- Using fragment shaders to manipulate images - Oregon State University [Using fragment shaders to manipulate images](https://web.engr.oregonstate.edu/~mjb/cs519/Handouts/image.1pp.pdf) 
