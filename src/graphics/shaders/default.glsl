var default_vertexShaderText = `
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
        vColor = aColor;
    }
`;

var default_fragmentShaderText = `
    void main() {
        gl_FragColor = vColor;
    }
`;
