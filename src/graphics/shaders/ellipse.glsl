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
            float alpha = smoothstep(
                1. - (strokeSize / size.x),
                1. - (strokeSize / size.x) - 1. / size.x,
                distance);

            gl_FragColor = vec4(fillColor.xyz, fillColor.w * alpha);

        } else if (distance <= 1.) {
            float alpha = smoothstep(
                1.,
                1. - 1. / size.x,
                distance);
                
            gl_FragColor = vec4(strokeColor.xyz, strokeColor.w * alpha);

        } else {
            discard;
        }
    }
`;
