# Renderización 

![Software Rendering](https://miro.medium.com/max/1280/1*c8sEPJjCNPxsUdl-_QBLYA.png)

Rendering es el proceso de generar una imagen fotorrealista o no fotorrealista a partir de un modelo 2D o 3D por medio de un programa. La imagen resultante se conoce como el renderizado. 

Se pueden definir varios modelos en un archivo de escena que contiene objetos en un lenguaje o estructura de datos estrictamente definidos. 

El archivo de escena contiene información de geometría, punto de vista, textura, iluminación y sombreado que describe la escena virtual. Los datos contenidos en el archivo de escena luego se pasan a un programa de renderizado para ser procesados y enviados a una imagen digital o un archivo de imagen de gráficos rasterizados.

## Algo de historia

![Tomb Raider para DOS](https://gamefaqs.gamespot.com/a/screen/full/8/3/8/539838.jpg)

Hasta la década de los 90 no existía en el mercado de computadoras personales algo tal como las tarjetas aceleradoras o tarjetas gráficas. En los computadores Pentium 383 o 486, los gráficos eran producidos por renderización de software. Esto era suficiente para los juegos del momento, pero para mantenerse jugables, no tenían ningún tipo de texture filtering, o efectos. 

![Software Rendering](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/DIAMONDSTEALTH3D2000-top.JPG/440px-DIAMONDSTEALTH3D2000-top.JPG)

Luego con el advenimiento de las tarjetas gráficas S3 Virge y el 3DFX Voodoo, que permiten un filtro de texturas y un rendimiento de los gráficos 3D más rápido que el realizado por la renderización de software. En un comienzo, fue necesario reescribir el código de los juegos o sus motores para soportar los chips, pero para 1997 ya se contó con varias interfaces que permitian acceder a sus capacidades como DirectX y OpenGL.

Como desde la perspectiva de la industria, la velocidad era donde se debían enfocar la industria de los gráficos por computadora y si bien la programación gráfica con renderización por software permitia una mayor flexibilidad en su modelo, esta ultima fue abandonada. 


## Diferencias entre la renderización por software y por hardware

![Comparison](https://i.ytimg.com/vi/boqKMETbc2g/maxresdefault.jpg)

Sería ideal que los algoritmos de renderización por software permitieran una traducción directa al hardware, pero esto no es posible debido a los dos diferentes enfoques con los que trabajan.

La renderización por software mantiene la escena 3D a ser renderizada en memoria, y la muestra pixel por pixel o subpixel por subpixel. La renderización por software opera de otra forma. Los píxeles están presentes en todo momento, pero la renderización consiste en considerar la escena con un triángulo al momento, pintando cada uno de estos en el frame buffer, que es un buffer de memoria que contienen los datos que representan todos los pixeles en un videoframe. Las tarjetas de video contienen framebuffers en sus núcleos. 

![Comparison](https://images.slideplayer.com/32/9848657/slides/slide_4.jpg)

El hardware no tiene noción de la escena, solamente un solo triángulo es conocido en cada momento. En otras palabras la renderización por hardware o GPU el computador envía los datos geométricos a la GPU por medio de OpenGL o DirectX, allí la GPU comienza el procesamiento de esta geometría en pixeles por medio de shaders.

En la renderización software como el cómputo ocurre en la CPU, a diferencia del procesamiento de hardware, que se basa en la tarjeta gráfica de la máquina no está restringido por la tarjeta gráfica de la computadora; la representación de software generalmente es más flexible. Sin embargo, la contrapartida es que la renderización del software suele consumir más tiempo. 

El método de bucle de subpixel es escogido por que permite renderizar efectos no locales que requieren considerar diferentes porciones de una escena en orden de computar un pixel o subpixel. 

Por ejemplo, la refleccion requiere acceso a tanto lo que refleja cómo el objeto reflejado. Un ejemplo más complejo es la iluminación global, que considera la luz indirecta de todos los objetos que rodean un objeto para poder computar el brillo de un subpixel siendo renderizado. Para resumir, la renderización por software usa el CPU para renderizar gráficos 3D.

La renderización por hardware no puede realizar ninguno de estos procesos por que no tiene ninguna noción de los objetos, sólo conoce un triángulo una vez al tiempo. Es el API el que se encarga de traducir estas nociones a la tarjeta gráfica.

De esta forma la renderización de hardware tienen un conjunto de "workarounds" para trabajar alrededor de estas limitaciones. Estos "workarounds" usualmente implican el pre-renderizar objetos en “mapas”, que son rectángulos que codifican las propiedades de otros objetos y que son almacenados en el hardware gráfico en forma de imágenes de textura.

![Reflection maps](https://upload.wikimedia.org/wikipedia/commons/5/5c/Spoon_fi.jpg)

Un ejemplo son los mapas de reflexión: Se renderiza una escena desde el punto de vista de un espejo. La imagen es luego pegada cual el render final necesita saber que se ve en el espejo. Este método solo funciona en espejos planos o casi planos.

Las soluciones como esta tienen una dificultad: requieren mucha preparación manual y ajustes para que funcionen; por ejemplo, decidir sobre un buen mapa ambiental. La computadora no puede hacer esto porque, si bien es posible calcular un mapa correcto, sería muy costoso y anularía fácilmente el ahorro de tiempo esperado.


## Tipos de renderización.

![Render Types](https://cdna.artstation.com/p/assets/images/images/031/237/708/large/robyn-simpson-skin.jpg?1603036032)

La renderización en tiempo real tambien conocida como renderización online, es usada para renderizar una escena, como en los videojuegos 3D, donde generalmente cada frame debe ser renderizado en unos pocos milisegundos.

El enfoque de la renderización en tiempo real es entonces el performance. Uno de los primeros juegos similares a los juegos modernos 3D fue Descent de Parallax Software. Se distingue por permitir el 6DoF (Six degrees of freedom). El juego contiene modelos 3D hechos enteramente de polígonos triangulares con texturas de bitmap.

Por otro lado tenemos la renderización offline, con la que nos referimos a cualquier cosa en la que los fotogramas se rendericen en un formato de imagen y las imágenes se muestren más tarde como una imagen fija o una secuencia de imágenes . Buenos ejemplos de renderizadores offline son el Hyperion de Disney y RenderMan de Pixar. Muchos de estos renderizadores de software hacen uso de lo que se conoce como un algoritmo de Ray-Tracing. 

### Ray-tracing

![Ray-Tracing](https://miro.medium.com/max/960/1*HuslVNzQtViPxbSOb4AJDw.gif)

El trazado de rayos consiste en simular las interacciones entre la luz y la materia. Es hecho al enviar rayos de luz desde una fuente de luz hacia el mundo, y calculando la trayectoria basada en la naturaleza y la orientación de las superficies que son cruzadas por los rayos. Luego para cada uno de los rayos, el color es determinado en la localización, basado en la historia del rayo.

El RayTracing, hasta finales de la última década era una característica de los renderizadores offline, y no encontrábamos nada similar en un renderizador real-time.

## Ventajas y desventajas de la renderización por Software

La síntesis por imágenes tiene muchas ventajas sobre la tecnología basada en GPU. Como la CPU realiza el proceso hay menos necesidad de preocuparnos sobre problemas de compatibilidad porque no es necesario adaptarnos a un hardware especial. La renderización es programada uniformemente usando el mismo lenguaje que la aplicación y no hay restricciones sobre la data (como el tamaño máximo de textura).

La desventaja principal es que toda la data es almacenada en la memoria principal. Para cualquier cambio en la data, el CPU necesita contactar la memoria y estas solicitudes están limitadas por el tiempo de acceso de cada tipo de memoria, cambios frecuentes en los datos de la memoria causan una pérdida de velocidad.

El segundo problema se origina del ancho de banda del bus (PCIe), es el movimiento de largas cantidades de datasets entre la memoria y la memoria de video. Durante un segundo la pantalla puede redibujar alrededor de 50 y 60 veces, lo que resulta en un significativo flujo de datos entre las dos memorias. En el caso de una resolucion baja, de 1024x768, con una profundidad de color de 32 bits, el buffer de la pantana mantiene alrededor de 3mb de datos.


## Aplicaciones: Software rendering para peliculas de animacion 3D

![Open SWR](https://www.blendernation.com/wp-content/uploads/2015/08/hyperion.jpg)

La flexibilidad de la renderización por software ha sido fundamental en la producción de películas de animación 3D. Si bien en programas como los videojuegos, donde una generación instantánea de gráficos es vital, en la producción de fotogramas para películas, es más importante la calidad y posibilidad de modelar diferentes efectos. Por ejemplo, de acuerdo con Pixar, en 2020, declaró que les tomaba alrededor de 50 horas/CPU para renderizar un frame en una resolución de 2K.

## Mesa Software Renderer, LLVMpipe y OpenSWR

![Mesa](https://fdossena.com/mesa/cover.jpg)

El Mesa o Mesa 3D Graphics Library es una implementación de software libre de OpenGL, Vulkan y otras APIs gráficas. El propósito de Mesa 

Es portable lo cual le permite usar OpenGL en sistemas que no cuentan con una implementación de OpenGL
La renderización por software de Mesa sirve como referencia para validar los drivers de hardware

La implementación de OpenGL es útil para experimentar, o para probar nuevas técnicas de renderización.
Mesa permite renerizar imagenes con un canales digitales con una mayor profundidad de color (bits por pixel) como canales de 16 bits enteros o de 32 bits de punto flotante. Algo que solo hasta ahora aparece en hardware.
Los límites internos de Mesa (máximas luces, tamaño de la textura, planos de recorte) pueden ser cambiados para necesidades especiales.

Mesa cuenta con varios renderizadores por software entre los que el más popular es el LLVMpipe. El Gallium LLVMpipe es un rasterizador por software que usa LLVM (Low Level Virtual Machine) para la generación de código en runtime.


![Open SWR](https://openswr.org/jpg/OpenSWR_perf_vs_llvmpipe.png)


Mesa tambien puede ser usado junto al rasterizador OpenSWR, que provee un rasterizador compatible con OpenGL para alto rendimiento y escalabilidad. OpenSWR está completamente basado en la CPU, corre en cualquier plataforma desde laptops hasta ambientes de alto rendimiento. OpenSWR se construye sobre LLVM y utiliza modernos sets de instrucciones como el Intel Advanced Vector Extensions para alcanzar los altos niveles de rendimiento que promete.

## Bibliografía 

[1] "Hardware vs. Software Rendering", Autodesk, 2022. Recuperado de: https://download.autodesk.com/us/maya/2008help/refguide/node57.html.

[2] "Software Rendering from Scratch", Medium, 2022.  Recuperado de: https://medium.com/@aminere/software-rendering-from-scratch-f60127a7cd58. 

[3] "Modern software rendering", Production Systems and Information Engineering. 6. 55-66. Mileff, Peter & Dudra, Judit. (2012).
