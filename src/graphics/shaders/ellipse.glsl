var ellipse_vertexShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;    
    attribute vec3 aPosition;
    attribute vec3 aTexCoord;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    varying vec3 vTexCoord;
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
        vTexCoord = aTexCoord;
    }
`;

var ellipse_fragmentShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    varying vec3 vTexCoord;
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
