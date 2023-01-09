var texture_vertexShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    attribute vec3 aPosition;
    attribute vec3 aTexCoord;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    varying vec3 vTexCoord;
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
        vTexCoord = aTexCoord;
    }
`;

var texture_fragmentShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    uniform sampler2D uTexture;
    varying vec3 vTexCoord;
    void main() {
        gl_FragColor = texture2D(uTexture, vTexCoord.xy);
    }
`;
