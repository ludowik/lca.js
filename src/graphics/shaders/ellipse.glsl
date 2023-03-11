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

        float _strokeSize = 2. * strokeSize;

        if (distance <= 1. - (_strokeSize / size.x)) {
            float alpha = smoothstep(
                1. - (_strokeSize / size.x),
                1. - (_strokeSize / size.x) - 0.0001,
                distance);
            alpha = 1.;

            gl_FragColor = vec4(fillColor.xyz, fillColor.w * alpha);

        } else if (distance <= 1.) {
            float alpha = smoothstep(
                1.,
                1. - (_strokeSize / size.x),
                distance);
            alpha = 1.;
                
            gl_FragColor = vec4(strokeColor.xyz, strokeColor.w * alpha);

        } else {
            discard;
        }
    }
`;
