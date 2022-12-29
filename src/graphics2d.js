var shader;
class Graphics {
    constructor(gl) {
        shader = new Shader(gl);
    }
}

function initializeAttributes2(array) {
    let gl = engine.gl;
    let buffer = gl.createBuffer();
    gl.enableVertexAttribArray(0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
}

function point(x, y, z=0) {
    let gl = engine.gl;
    gl.useProgram(shader.program);
    shader.sendUniform(gl);
    initializeAttributes2([x, y, z]);
    gl.drawArrays(gl.POINTS, 0, 1);
}

function points(array) {
    let gl = engine.gl;
    gl.useProgram(shader.program);
    shader.sendUniform(gl);
    initializeAttributes2(array);
    gl.drawArraysInstanced(gl.POINTS, 0, array.length/3, 3);
}
