var rect_vertexShaderText = `
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
    }
`;

var rect_fragmentShaderText = `
    void main() {
        gl_FragColor = vec4(1., 1., 0., 1.);
    }
`;
