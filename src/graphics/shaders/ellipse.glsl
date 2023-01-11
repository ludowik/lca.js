var ellipse_vertexShaderText = `
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
        vTexCoord = aTexCoord;
    }
`;

var ellipse_fragmentShaderText = `
    uniform vec2 size;
    void main() {
        vec2 fragmentPosition = 2.0 * vTexCoord.xy - 1.0;
        
        float distance = length(fragmentPosition);
        if (distance <= 1. - (strokeSize / size.x)) {
            gl_FragColor = fillColor;

        } else if (distance <= 1.) {
            gl_FragColor = strokeColor;

        } else {
            discard;
        }
    }
`;
