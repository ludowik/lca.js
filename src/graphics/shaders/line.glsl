var line_vertexShaderText = `
    uniform float origin;
    uniform vec2 lineSize;
    void main() {
        vec4 direction = normalize(vec4(origin * -lineSize.y, lineSize.x, 0., 0.));
        direction *= -origin * aPosition.y * strokeSize;
        gl_Position = uModelMatrix * vec4(aPosition.x, aPosition.x, 0., 1.);
        gl_Position += direction;
        gl_Position = uProjectionMatrix * uViewMatrix * gl_Position;
    }
`;

var line_fragmentShaderText = `
    void main() {
        gl_FragColor = strokeColor;
    }
`;
