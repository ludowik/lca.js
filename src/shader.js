class Shader {
    constructor() {
        let gl = engine.gl;
        this.vertexShader = this.compileShader(gl.VERTEX_SHADER, vertexShaderText);
        this.fragmentShader = this.compileShader(gl.FRAGMENT_SHADER, fragmentShaderText);
        
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
            document.querySelector("p").innerHTML = "La liaison du programme a échoué." + "Journal d'erreur : " + linkErrLog;
            return;
        }
    }

    compileShader(shaderType, shaderSource) {
        let gl = engine.gl;
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
    
    destructor() {
        if (this.program)
            gl.deleteProgram(this.program);
    }
}