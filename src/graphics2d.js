var shaders;

class Graphics {
    constructor(gl) {
        shaders = new Shaders(gl)
    }
}

function background() {
    let gl = engine.gl;
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function initializeAttributes(shader, array, texCoord) {
    shader.use();

    let gl = engine.gl;

    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
    let loc = gl.getAttribLocation(shader.program, 'aPosition');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

    if (texCoord) {
        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.STATIC_DRAW);
        let loc = gl.getAttribLocation(shader.program, 'aTexCoord');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    }
}

function point(x, y, z = 0) {
    let gl = engine.gl;
    let array = [x, y, z];
    initializeAttributes(shaders.point, array);
    gl.drawArrays(gl.POINTS, 0, array.length / 3);
}

function points(array) {
    let gl = engine.gl;
    initializeAttributes(shaders.point, array);
    gl.drawArraysInstanced(gl.POINTS, 0, array.length / 3, 3);
}

var CENTER = 'center';
var CORNER = 'corner';

let __rectMode = CORNER;
function rectMode(mode) {
    if (mode) __rectMode = mode;
    return __rectMode;
}

function rect(x, y, w, h) {
    pushMatrix();

    if (__rectMode === CORNER)
        translate(x, y);
    else
        translate(x - w / 2, y - h / 2);

    scale(w, h);

    let gl = engine.gl;
    let array = [
        0, 0, 0,
        1, 0, 0,
        1, 1, 0,
        0, 0, 0,
        1, 1, 0,
        0, 1, 0];
    initializeAttributes(shaders.rect, array);
    gl.drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}

function circleMode(mode) {
    return ellipseMode(mode);
}

function circle(x, y, radius) {
    ellipse(x, y, radius * 2, radius * 2);
}

let __ellipseMode = CENTER;
function ellipseMode(mode) {
    if (mode) __ellipseMode = mode;
    return __ellipseMode;
}

function ellipse(x, y, w, h) {
    pushMatrix();

    if (__ellipseMode === CORNER)
        translate(x, y);
    else
        translate(x - w / 2, y - h / 2);

    scale(w, h);

    let gl = engine.gl;
    let array = [
        0, 0, 0,
        1, 0, 0,
        1, 1, 0,
        0, 0, 0,
        1, 1, 0,
        0, 1, 0];

    initializeAttributes(shaders.ellipse, array, array);
    gl.drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}
