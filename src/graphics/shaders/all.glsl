var all_vertexShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    attribute vec3 aPosition;
    attribute vec3 aTexCoord;
    attribute vec4 aColor;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    uniform float strokeSize;    
    varying vec3 vTexCoord;
    varying vec4 vColor;
`;

var all_fragmentShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    varying vec3 vTexCoord;
    varying vec4 vColor;
    uniform float strokeSize;
    uniform vec4 strokeColor;
    uniform vec4 fillColor;
    uniform sampler2D uTexture;    
`;
