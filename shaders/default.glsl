var vertexShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
    attribute vec3 vPosition;
    uniform vec2 size;
    uniform mat4 pMatrix;
    uniform mat4 vMatrix;
    uniform mat4 mMatrix;
    void main() {
        // gl_Position = vec4(
        //     vPosition.x / (size.x/2.) - 1.,
        //     vPosition.y / (size.y/2.) - 1.,
        //     0,
        //     1);

        gl_Position = pMatrix * vMatrix * mMatrix * vec4(vPosition, 1.);

        gl_PointSize = 2.;
    }
`;

var fragmentShaderText = `
    #version 100
    #pragma language glsl3
    precision highp float;
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
`
