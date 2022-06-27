// Codigo utilizado basado en el trabajo de:
// casey conchinha - @kcconch ( https://github.com/kcconch )  @patriciogv ( patriciogonzalezvivo.com ) https://itp-xstory.github.io/p5js-shaders/



#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){

    //  Se define sistema de coordenadas 2x2
    _st *= 2.0;

    // Se le de a cada celda un indice acorde a su posicion

    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Se define cada celda entre 0.0 - 1.0
    _st = fract(_st);

    // Rotar cada celda de acuerdo al indice
    if(index == 1.0){
        //  Rotar celda 1 90 grados
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotar celda 2 -90 grados
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotar celda 3 180 grados
        _st = rotate2D(_st,PI);
    }

    return _st;
}

float concentricCircles(in vec2 st, in vec2 radius, in float resolution, in float scale) {
    float dist = distance(st,radius);
    float pct = floor(dist*resolution)/scale;
    return pct;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	// st = rotateTilePattern(st);
    float dist = distance(st,vec2(abs(sin(u_time/10.0)),abs(cos(u_time/10.0))));
    st = tile(st,4.0);
    st = rotateTilePattern(st);

    // Make more interesting combinations
    //st = tile(st,dist *(sin(u_time) +1.0)* 10.0);
    st = rotate2D(st,dist*20.);
    // st = rotateTilePattern(st*2.);
    // st = rotate2D(st,PI*u_time*0.25);

    // step(st.x,st.y) just makes a b&w triangles
    // but you can use whatever design you want.
    gl_FragColor = vec4(vec3(concentricCircles(st, vec2(0.0,0.0), 5.0, 10.0)),1.0);
}