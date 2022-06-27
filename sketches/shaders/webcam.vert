// Basado en el trabajo de adam ferriss https://github.com/aferriss/p5jsShaderExamples


// Información de nuestro Vertex
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// Obtención de coordenadas 
varying vec2 vTexCoord;

void main() {
  // se copian las coordenadas
  vTexCoord = aTexCoord;

  // Se copia la información de la posición en una variable auxiliar (vec4), usando como componente w 1.0 
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // Enviar la información de nuestro Vertex al fragment shader
  gl_Position = positionVec4;
}