#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;

// I'm excluding our normal vertex position data operations from this example code.
// get our texture coordinates from WEBGL/p5
attribute vec2 aTexCoord;

// create a varying vec2 which will store our texture coordinates
varying vec2 vTexCoord;

void main() {
    // copy the position data into a vec4
    // we're using 1.0 as the w component (which controls scaling/normalization of the coordinates)
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

    // send the vertex information on to the fragment shader
    gl_Position = positionVec4;

    // copy the texcoords
    vTexCoord = aTexCoord;
}
