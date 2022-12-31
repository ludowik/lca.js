var shaders;

class Graphics {
    constructor(gl) {
        shaders = new Shaders(gl);
    }
}

function background() {
    let gl = engine.gl;

    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function initializeAttributes(shader, array, texCoord) {
    let gl = engine.gl;

    shader.use();

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

let __strokeSize = 1;
function strokeSize(size) {
    if (size) __strokeSize = size;
    return __strokeSize;
}

function line(x1, y1, x2, y2) {
    let gl = engine.gl;

    pushMatrix();

    translate(x1, y1);
    scale(x2 - x1, y2 - y1);

    let array = [
        0, -1, 0,
        1, -1, 0,
        1, +1, 0,
        0, -1, 0,
        1, +1, 0,
        0, +1, 0,
    ];

    initializeAttributes(shaders.line, array);
    gl.uniform2f(gl.getUniformLocation(shaders.line.program, 'lineSize'), x2 - x1, y2 - y1);
    gl.uniform1f(gl.getUniformLocation(shaders.line.program, 'strokeSize'), __strokeSize);
    gl.drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}

var CENTER = 'center';
var CORNER = 'corner';

let __rectMode = CORNER;
function rectMode(mode) {
    if (mode) __rectMode = mode;
    return __rectMode;
}

function rect(x, y, w, h) {
    let gl = engine.gl;

    pushMatrix();

    if (__rectMode === CORNER)
        translate(x, y);
    else
        translate(x - w / 2, y - h / 2);

    scale(w, h);

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
    let gl = engine.gl;

    pushMatrix();

    if (__ellipseMode === CORNER)
        translate(x, y);
    else
        translate(x - w / 2, y - h / 2);

    scale(w, h);

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

let __textMode = CORNER;
function textMode(mode) {
    if (mode) __textMode = mode;
    return __textMode;
}

function text(txt, x, y) {
    let gl = engine.gl;

    pushMatrix();

    if (__textMode === CORNER)
        translate(x, y);
    else
        translate(x - w / 2, y - h / 2);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const metrics = ctx.measureText(txt);
    ctx.canvas.width = metrics.width;
    ctx.canvas.height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    ctx.fillStyle = "red";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillText(txt, 0, 0);

    var textTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ctx.canvas);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    scale(ctx.canvas.width, ctx.canvas.height);

    let array = [
        0, 0, 0,
        1, 0, 0,
        1, 1, 0,
        0, 0, 0,
        1, 1, 0,
        0, 1, 0];

    shaders.texture.texture = textTex;

    initializeAttributes(shaders.texture, array, array);
    gl.drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}