var rect_vertexShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    attribute vec3 aPosition;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
    }
`;

var rect_fragmentShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    void main() {
        gl_FragColor = vec4(1., 1., 0., 1.);
    }
`;
