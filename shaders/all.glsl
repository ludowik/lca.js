var all_vertexShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    attribute vec3 aPosition;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
`;

var all_fragmentShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
`;
