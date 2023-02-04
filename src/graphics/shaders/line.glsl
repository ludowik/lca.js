var line_vertexShaderText = `
    uniform vec2 lineSize;
    void main() {
        vec2 direction = normalize(lineSize.yx);
        direction *= aPosition.y * strokeSize;
        gl_Position = uModelMatrix * vec4(aPosition.x, aPosition.x, 0., 1.);
        gl_Position += vec4(direction, 0., 0.);
        gl_Position = uProjectionMatrix * uViewMatrix * gl_Position;
    }
`;

var line_fragmentShaderText = `
    void main() {
        gl_FragColor = strokeColor;
    }
`;
