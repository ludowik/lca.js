class Shaders {
    constructor(gl) {
        this.default = new Shader(gl, 'default', default_vertexShaderText, default_fragmentShaderText);
        this.point = new Shader(gl, 'point', point_vertexShaderText, point_fragmentShaderText);
        this.rect = new Shader(gl, 'rect', rect_vertexShaderText, rect_fragmentShaderText);
        this.ellipse = new Shader(gl, 'ellipse', ellipse_vertexShaderText, ellipse_fragmentShaderText);
        this.texture = new Shader(gl, 'texture', texture_vertexShaderText, texture_fragmentShaderText);
        this.line = new Shader(gl, 'line', line_vertexShaderText, line_fragmentShaderText);
    }
}

class Shader {
    constructor(gl, name, vertexShaderText, fragmentShaderText) {
        this.name = name;

        this.load(gl,
            all_vertexShaderText + vertexShaderText,
            all_fragmentShaderText + fragmentShaderText);

        this.getUniformsLocation(gl);
    }

    load(gl, vertexShaderText, fragmentShaderText) {
        this.vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, vertexShaderText);
        this.fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText);

        this.program = gl.createProgram();

        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);

        gl.linkProgram(this.program);

        gl.detachShader(this.program, this.vertexShader);
        gl.detachShader(this.program, this.fragmentShader);

        gl.deleteShader(this.vertexShader);
        gl.deleteShader(this.fragmentShader);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            let linkErrLog = gl.getProgramInfoLog(this.program);
            this.destructor();
            console.log("La liaison du programme a échoué : " + linkErrLog);
            return;
        }
    }

    compileShader(gl, shaderType, shaderSource) {
        let shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            let compileErrLog = gl.getShaderInfoLog(shader);
            console.log("La compilation du shader '" + this.name + "' a échoué : " + compileErrLog);
            return;
        }

        return shader;
    }

    getUniformsLocation(gl) {
        this.attribsLocation = {};

        const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < numAttribs; ++i) {
            const info = gl.getActiveAttrib(this.program, i);
            this.attribsLocation[info.name] = gl.getAttribLocation(this.program, info.name);
        }

        this.uniformsLocation = {};

        const numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < numUniforms; ++i) {
            const info = gl.getActiveUniform(this.program, i);
            this.uniformsLocation[info.name] = gl.getUniformLocation(this.program, info.name);
        }
    }

    sendUniform(gl) {
        let ul = this.uniformsLocation;

        gl.uniformMatrix4fv(ul.uProjectionMatrix, gl.FALSE, projectionMatrix());
        gl.uniformMatrix4fv(ul.uViewMatrix, gl.FALSE, viewMatrix());
        gl.uniformMatrix4fv(ul.uModelMatrix, gl.FALSE, modelMatrix());

        if (ul.uTexture) {
            gl.uniform1i(ul.uTexture, 0);
        }
    }

    sendUniforms(uniforms) {
        let gl = getContext();

        for (let uniform in uniforms) {
            let ul = this.uniformsLocation[uniform];
            if (!ul) {
                // console.log('unknown uniform ' + uniform);
                continue;
            }

            let value = uniforms[uniform];
            let type = typeof value;
            switch (type) {
                case 'boolean': {
                    gl.uniform1i(this.uniformsLocation[uniform], value ? 1 : 0);
                    break;
                }
                case 'number': {
                    gl.uniform1f(this.uniformsLocation[uniform], value);
                    break;
                }
                case 'object': {
                    if (value instanceof vec2) {
                        gl.uniform2f(this.uniformsLocation[uniform], value.x, value.y);

                    } else if (value instanceof Color) {
                        gl.uniform4f(this.uniformsLocation[uniform], value.r, value.g, value.b, value.a);

                    } else if (value instanceof Array) {
                        switch (value.length) {
                            case 1:
                                gl.uniform1f(this.uniformsLocation[uniform], value[0]);
                                break;
                            case 2:
                                gl.uniform2f(this.uniformsLocation[uniform], value[0], value[1]);
                                break;
                            case 3:
                                gl.uniform3f(this.uniformsLocation[uniform], value[0], value[1], value[2]);
                                break;
                            case 4:
                                gl.uniform4f(this.uniformsLocation[uniform], value[0], value[1], value[2], value[3]);
                                break;
                        }
                    }
                    break;
                }
                default: {
                    console.log('unknown type ' + type);
                    break;
                }
            }
        }
    }

    use() {
        let gl = getContext();
        gl.useProgram(this.program);
        this.sendUniform(gl);
    }

    destructor() {
        if (this.program) {
            gl.deleteProgram(this.program);
        }
    }
}