function initializeAttributes(x=0, y=0, z=0) {
    let gl = engine.gl;
    let buffer = gl.createBuffer();
    gl.enableVertexAttribArray(0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x, y, z]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
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
    let shader = new Shader();
    let gl = engine.gl;
    gl.useProgram(shader.program);
    initializeAttributes(x, y, z);
    gl.drawArrays(gl.POINTS, 0, 1);
}

function points(array) {
    let shader = new Shader();
    let gl = engine.gl;
    gl.useProgram(shader.program);
    initializeAttributes2(array);
    gl.drawArraysInstanced(gl.POINTS, 0, array.length/3, 3);
}
