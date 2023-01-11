var point_vertexShaderText = `
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
        gl_PointSize = 2.;
    }
`;

var point_fragmentShaderText = `
    void main() {
        vec2 fragmentPosition = 2.0 * gl_PointCoord - 1.0;
        
        float distance = length(fragmentPosition);        
        if (distance <= 1.) {
            gl_FragColor = vec4(
                1.-distance,
                1.-distance,
                1.-distance,
                1.-distance);
        }
    }
`;
