var point_vertexShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    attribute vec3 aPosition;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
        gl_PointSize = 2.;
    }
`;

var point_fragmentShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    void main() {
        vec2 fragmentPosition = 2.0 * gl_PointCoord - 1.0;
        
        float distance = length(fragmentPosition);        
        if (distance <= 1.) {
            gl_FragColor = vec4(
                1.-distance,
                1.-distance,
                1.-distance,
                1.-distance);
        }
    }
`
