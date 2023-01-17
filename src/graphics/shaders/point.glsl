var point_vertexShaderText = `
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
        gl_PointSize = strokeSize;
    }
`;

var point_fragmentShaderText = `
    void main() {
        vec2 fragmentPosition = 2.0 * gl_PointCoord - 1.0;
        
        float distance = length(fragmentPosition);

        float alpha = smoothstep(1., 1.-4./strokeSize, distance);
        gl_FragColor = vec4(strokeColor.xyz, alpha);
    }
`;
