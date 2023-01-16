class ShaderBox extends Sketch {
    setup() {
        this.vertexShaderText = `        
            void main() {
                gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.);
                vTexCoord = aTexCoord;
            }
        `;

        this.fragmentShaderText = `
            uniform float iTime;
            void main() {
                gl_FragColor = vec4(abs(sin(iTime)), 0., 0., 1.);
            }
        `;

        this.shader = new Shader(getContext(), 'shaderbox', this.vertexShaderText, this.fragmentShaderText);
    }

    sendUniforms(uniforms) {
        let gl = getContext();

        for (let uniform in uniforms) {
            let type = typeof (uniforms[uniform]);
            switch (type) {
                case 'boolean': {
                    gl.uniform1i(this.shader.uniformsLocation[uniform], uniforms[uniform] ? 1 : 0);
                    break;
                }
                case 'number': {
                    gl.uniform1f(this.shader.uniformsLocation[uniform], uniforms[uniform]);
                    break;
                }
            }
        }
    }

    draw() {
        background();

        this.uniforms = {
            iTime: ElapsedTime,
        }

        this.shader.use();
        this.sendUniforms(this.uniforms);

        shade(0, 0, W, H, this.shader);
    }
}

