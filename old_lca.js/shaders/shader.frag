#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.14159265358979323846;
const float TAU = 6.28318530718;

uniform vec2 iResolution;
uniform int iFrame;
uniform float iTime;
uniform vec2 iMouse;

// grab our textures coordinates from vert shader
varying vec2 vTexCoord;

uniform float u_amplitude;
uniform float u_freq;
uniform float u_speed;


float circle(vec2 center, float radius, float weight) {
    float size = weight * 0.5;
    return 
        (
            smoothstep(radius-size-1.0, radius-size, distance(center, gl_FragCoord.xy)) -
            smoothstep(radius+size, radius+size+1.0, distance(center, gl_FragCoord.xy))
        )
    ;
}

float sinus(float x) {
    return sin(x * u_freq + iTime * u_speed) * u_amplitude;
}

float cosinus(float x) {
    return cos(x * u_freq + iTime * u_speed) * u_amplitude;
}

float dist(float a, float b) {
    float size = 5.0;
    float d = 1.0 - smoothstep(-size*0.5, size*0.5, abs(a-b));
    return d;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {    
    // set our uv coordinates to our texture coordinates
    // vec2 st = fragCoord.xy/iResolution.xy;
    vec2 uv = vTexCoord;

    float d = 0.0;

    float dy = 0.0;

    d += dist(sinus(uv.x)+iResolution.y*0.5, gl_FragCoord.y);
    d += dist(cosinus(uv.x)+iResolution.y*0.5, gl_FragCoord.y);

    d += circle(iResolution*0.5, 25.0, 1.0);
    d += circle(iResolution*0.5, 15.0, 5.0);

    fragColor = vec4(d, 0.0, 0.0, 1.0);
}

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                * 43758.5453123);
}

// Value noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix( mix( random( i + vec2(0.0, 0.0) ),
                     random( i + vec2(1.0, 0.0) ), u.x),
                mix( random( i + vec2(0.0, 1.0) ),
                     random( i + vec2(1.0, 1.0) ), u.x), u.y);
}
	
void mainImage2(out vec4 fragColor, in vec2 fragCoord) {    
    vec2 st = fragCoord.xy / iResolution.xy;
    fragColor = vec4(noise(st*iTime), 0.0, 0.0, 1.0);
}

void main() {
    mainImage2(gl_FragColor, gl_FragCoord.xy);
}
