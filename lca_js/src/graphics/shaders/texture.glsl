var texture_vertexShaderText = `
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
        vTexCoord = aTexCoord;
    }
`;

var texture_fragmentShaderText = `
    void main() {
        gl_FragColor = texture2D(uTexture, vTexCoord.xy) * fillColor;
    }
`;
