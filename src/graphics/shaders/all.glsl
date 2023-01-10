var all_vertexShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    attribute vec3 aPosition;
    attribute vec3 aTexCoord;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    varying vec3 vTexCoord;
`;

var all_fragmentShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
`;
