# Texture Sampling

Se implementó el cálculo del promedio de RGB.

{{< details title="Texture Sampling.frag" open=false >}}

```js
precision mediump float;

// uniforms are defined and sent by the sketch
// The grey_scale value is used to send the coloring brightness tool
uniform int grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

//returns the average of a given texel
float average(vec3 texel) {
  return (texel.r + texel.g + texel.b)/ 3.0;
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);
  if(grey_scale == 2) {
    gl_FragColor = vec4((vec3(luma(texel.rgb))), 1.0);
  } else if (grey_scale == 3) 
  {
    gl_FragColor = vec4((vec3(average(texel.rgb))), 1.0);
  } else {
    gl_FragColor = texel;
  }
}

```
{{< /details >}}

{{< p5-iframe sketch="/VisualComputing/sketches/textureSampling.js" width="510" height="510">}}