class ShaderBox extends Sketch {
    static { declareSketch(this) };
    
    setup() {
        this.vertexShaderText = `        
            void main() {
                gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
                vTexCoord = aTexCoord;
            }
        `;

        this.fragmentShaderText = `
            uniform float iTime;
            uniform vec2 uMouse;
            uniform vec2 uResolution;
            uniform float h;
        
            float random (vec2 st) {
                return fract(
                        sin(
                            dot(
                                st.xy,
                                uMouse/10. // vec2(12.9898,78.233)
                            )
                        ) * 43758.5453123
                    );
            }

            void main() {
                vec2 st = gl_FragCoord.xy / uResolution.xy;

                st *= 10.0; // Scale the coordinate system by 10

                vec2 ipos = floor(st); // get the integer coords
                vec2 fpos = fract(st); // get the fractional coords

                // Assign a random value based on the integer coord
                vec3 color = vec3( random( ipos ) );

                // Uncomment to see the subdivided grid
                // color = vec3(fpos, 0.0);

                gl_FragColor = vec4(color, 1.0);

                float x = 10. * iTime + (gl_FragCoord.x - uResolution.x / 2.) / h;
                float y = (gl_FragCoord.y - uResolution.y / 2.) / h;

                float d = smoothstep(1., 1.-1./h, 1. - abs(sin(x) - y));

                gl_FragColor = vec4(d,d,d, 1.0);
            }
        `;

        this.shader = new Shader(getContext(), 'shaderbox', this.vertexShaderText, this.fragmentShaderText);

        this.params.h = 10;
    }

    sendUniforms(uniforms) {
        let gl = getContext();

        for (let uniform in uniforms) {            
            let ul = this.shader.uniformsLocation[uniform];
            if (!ul) {
                // console.log('unknown uniform ' + uniform);
                continue;
            }

            let value = uniforms[uniform];
            let type = typeof value;
            switch (type) {
                case 'boolean': {
                    gl.uniform1i(this.shader.uniformsLocation[uniform], value ? 1 : 0);
                    break;
                }
                case 'number': {
                    gl.uniform1f(this.shader.uniformsLocation[uniform], value);
                    break;
                }
                case 'object': {
                    if (value instanceof vec2) {
                        gl.uniform2f(this.shader.uniformsLocation[uniform], value.x, value.y);
                    }
                    break;
                }
                default: {
                    console.log('unknown type ' + type)
                    break;
                }
            }
        }
    }

    draw() {
        background();

        this.uniforms = {
            iTime: ElapsedTime,
            uResolution: createVector(W, H),
            uMouse: createVector(mouse.x, mouse.y),
            h: this.params.h,
        }

        this.shader.use();
        this.sendUniforms(this.uniforms);

        shade(0, 0, W, H, this.shader);
    }
}

