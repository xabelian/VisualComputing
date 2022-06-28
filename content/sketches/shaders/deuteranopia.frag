precision mediump float;

uniform int grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns a similar transformation as the one seen in the first project
vec3 deuteranopiaFilter(vec3 texel) {
  return vec3(texel.r-0.2, texel.g+0.2, texel.b);
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = vec4(deuteranopiaFilter(texel.rgb), 1.0);
}