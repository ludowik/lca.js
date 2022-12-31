class Shaders {
    constructor(gl) {
        this.default = new Shader(gl, default_vertexShaderText, default_fragmentShaderText);
        this.point = new Shader(gl, point_vertexShaderText, point_fragmentShaderText);
        this.rect = new Shader(gl, rect_vertexShaderText, rect_fragmentShaderText);
        this.ellipse = new Shader(gl, ellipse_vertexShaderText, ellipse_fragmentShaderText);
        this.texture = new Shader(gl, texture_vertexShaderText, texture_fragmentShaderText);
        this.line = new Shader(gl,
            all_vertexShaderText + line_vertexShaderText,
            all_fragmentShaderText + line_fragmentShaderText);
    }
}

class Shader {
    constructor(gl, vertexShaderText, fragmentShaderText) {
        this.load(gl, vertexShaderText, fragmentShaderText);
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
            console.log("La compilation du shader a échoué : " + compileErrLog);
            return;
        }

        return shader;
    }

    sendUniform(gl) {
        var invert = false;

        var uniformProjectionMatrix = gl.getUniformLocation(this.program, "uProjectionMatrix");
        gl.uniformMatrix4fv(uniformProjectionMatrix, invert, projectionMatrix());

        var uniformViewMatrix = gl.getUniformLocation(this.program, "uViewMatrix");
        gl.uniformMatrix4fv(uniformViewMatrix, invert, viewMatrix());

        var uniformModelMatrix = gl.getUniformLocation(this.program, "uModelMatrix");
        gl.uniformMatrix4fv(uniformModelMatrix, invert, modelMatrix());

        var uniformTexture = gl.getUniformLocation(this.program, "uTexture");
        if (uniformTexture) {
            gl.uniform1i(uniformTexture, 0);
        }
    }

    use() {
        let gl = engine.gl;
        gl.useProgram(this.program);
        this.sendUniform(gl);
    }

    destructor() {
        if (this.program)
            gl.deleteProgram(this.program);
    }
}