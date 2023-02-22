var ellipse_vertexShaderText = `
    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
        vTexCoord = aTexCoord;
    }
`;

var ellipse_fragmentShaderText = `
    uniform vec2 size;

    uniform float angleStart;
    uniform float angleStop;

    #define PI 3.1415926535897932384626433832795
    #define TAU 2.*PI
    
    float angleBetween(vec2 v1, vec2 v2) {
        float alpha1 = atan(v1.y, v1.x);
        float alpha2 = atan(v2.y, v2.x);

        if (alpha2 - alpha1 < 0.){ 
            return TAU + alpha2 - alpha1;
        }
        return alpha2 - alpha1;
    }

    void main() {
        vec2 fragmentPosition = 2.0 * vTexCoord.xy - 1.0;

        float angle = angleBetween(fragmentPosition, vec2(1., 0.));
        if (angle < angleStart) discard;
        if (angle > angleStop) discard;
        
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
