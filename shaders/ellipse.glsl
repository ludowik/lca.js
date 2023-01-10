var ellipse_vertexShaderText = `
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
        vTexCoord = aTexCoord;
    }
`;

var ellipse_fragmentShaderText = `
    uniform vec4 strokeColor;
    uniform vec4 fillColor;
    void main() {
        vec2 fragmentPosition = 2.0 * vTexCoord.xy - 1.0;
        
        float distance = length(fragmentPosition);        
        if (distance <= 1.) {
            gl_FragColor = vec4(
                1.,
                1.,
                1.,
                1.);
        } else {
            discard;
        }
    }
`;
