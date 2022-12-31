var line_vertexShaderText = `
    uniform vec2 lineSize;
    uniform float strokeSize;
    void main() {
        vec2 direction = normalize(lineSize).yx;
        direction.y = -direction.y;
        direction *= aPosition.y * strokeSize / 2.;
        gl_Position = uModelMatrix * vec4(aPosition.x, aPosition.x, 0., 1.);
        gl_Position += vec4(direction, 0., 0.);
        gl_Position = uProjectionMatrix * uViewMatrix * gl_Position;
    }
`;

var line_fragmentShaderText = `
    void main() {
        gl_FragColor = vec4(1., 1., 1., 1.);
    }
`;