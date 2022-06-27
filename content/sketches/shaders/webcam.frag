// Codigo basado en el trabajo de casey conchinha - @kcconch ( https://github.com/kcconch ) y louise lessel - @louiselessel ( https://github.com/louiselessel )


#ifdef GL_ES
precision mediump float;
#endif

// Obtener texcoords del Vertex Shader
varying vec2 vTexCoord;

// Definir textura desde p5
uniform sampler2D tex0;


void main() {
  vec2 uv = vTexCoord;
  
  // Como la textura se obtiene de manera invertida, esta se ajusta para evitar esto.
  uv.y = 1.0 - uv.y;
  uv.x = 1.0 - uv.x;
  
  vec4 tex = texture2D(tex0, uv);
  
  float gray = (tex.r + tex.g + tex.b) / 3.0;
  
  float res = 20.0;
  float scl = res / (10.0);
 
  float threshR = (fract(floor(tex.r*res)/scl)*scl) * gray ;
  float threshG = (fract(floor(tex.g*res)/scl)*scl) * gray ;
  float threshB = (fract(floor(tex.b*res)/scl)*scl) * gray ;
  vec3 thresh = vec3(threshR, threshG, threshB);

  // se renderiza la salida
  gl_FragColor = vec4(thresh, 1.0);
}