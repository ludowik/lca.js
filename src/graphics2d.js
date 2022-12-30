var shader;
class Graphics {
    constructor(gl) {
        shader = new Shader(gl);
    }
}

function background() {
    let gl = engine.gl;
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function initializeAttributes(array) {
    let gl = engine.gl;
    let buffer = gl.createBuffer();
    gl.enableVertexAttribArray(0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
}

function point(x, y, z = 0) {
    let gl = engine.gl;
    shader.use();
    var array = [x, y, z];
    initializeAttributes(array);
    gl.drawArrays(gl.POINTS, 0, array.length / 3);
}

function points(array) {
    let gl = engine.gl;
    shader.use();
    initializeAttributes(array);
    gl.drawArraysInstanced(gl.POINTS, 0, array.length / 3, 3);
}

var CENTER = 'center';
var CORNER = 'corner';

let __rectMode = CENTER;
function rectMode(mode) {
    return __rectMode;
}

function rect(x, y, w, h) {
    pushMatrix();

    if (__rectMode === CORNER)
        translate(x, y);
    else
        translate(x-w/2, y-h/2);

    scale(w, h);

    let gl = engine.gl;
    shader.use();
    var array = [
        0, 0, 0,
        1, 0, 0,
        1, 1, 0,
        0, 0, 0,
        1, 1, 0,
        0, 1, 0];
    initializeAttributes(array);
    gl.drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}