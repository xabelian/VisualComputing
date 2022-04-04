# La computación visual en ayuda de personas con Daltonismo

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


