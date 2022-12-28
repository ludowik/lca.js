var vertexShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    attribute vec3 vPosition;
    void main() {
        gl_Position = vec4((vPosition/50.)-1., 1.0);
        gl_PointSize = 2.0;
    }
`;

var fragmentShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    void main() {
        vec2 fragmentPosition = 2.0 * gl_PointCoord - 1.0;
        
        float distance = length(fragmentPosition);
        float distanceSqrd = distance * distance;
        
        if (distanceSqrd <= 1.) {
            gl_FragColor = vec4(
                1.-distanceSqrd,
                1.-distanceSqrd,
                1.-distanceSqrd,
                1.-distanceSqrd);
        }
    }
`
