## 1. Resultados

Para la primera entrega se realizo una modificación de los valores de RGB de los pixeles que cumplan con una cierta condición.

Se uso [Coblis](https://www.color-blindness.com/coblis-color-blindness-simulator/) con la siguiente imagen para simular la vision de un paciente con Deuteranopia (ausencia de la percepción del espectro del color verde). 

![Deuteranopia-Simulacion](/VisualComputing/sketches/deuteranopia-simulation.jpg)

A la izquierda la imagen original, a la derecha la imagen como la veria un paciente con Deuteranopia.

La modificación de los valores de RGB permite aumentar el contraste de la imagen y diferencias las colores.



    let img;
    function preload() {
    img = loadImage('/VisualComputing/sketches/original.jpg');
    }

    function setup() {
    createCanvas(747, 373);
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
                    pixels[index+0] = r+70
                }

                
            }
        }
    updatePixels();
    }


{{< p5-iframe sketch="/VisualComputing/sketches/imageModification.js" width="747" height="373" >}}

Con este resultado, nuevamente simulamos usando Coblis y se obtiene la siguiente imagen.
![Daltonismo Acromático](/VisualComputing/sketches/edited-simulated.jpg)


## 2. Trabajo futuro

Para lograr mejores resultados es pertienente la experimentacion con diferentes valores y condiciones.
