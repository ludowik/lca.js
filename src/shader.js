//const { glMatrix } = require("../lib/glmatrix/gl-matrix");

class Shader {
    constructor(gl) {
        this.load(gl);
    }

    load(gl) {
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
        var uniformSize = gl.getUniformLocation(this.program, "size");
        gl.uniform2f(uniformSize, W, H);

        var invert = false;

        var uniformProjectionMatrix = gl.getUniformLocation(this.program, "pMatrix");
        gl.uniformMatrix4fv(uniformProjectionMatrix, invert, projectionMatrix());

        var uniformViewMatrix = gl.getUniformLocation(this.program, "vMatrix");
        gl.uniformMatrix4fv(uniformViewMatrix, invert, viewMatrix());

        var uniformModelMatrix = gl.getUniformLocation(this.program, "mMatrix");        
        gl.uniformMatrix4fv(uniformModelMatrix, invert, modelMatrix());
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