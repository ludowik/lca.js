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

var meshPoint;
function point(x, y, z = 0) {
    let gl = engine.gl;

    pushMatrix();

    let array;
    if (!meshPoint) {
        meshPoint = new Mesh();
        array = [x, y, z];
        meshPoint.initializeAttributes(shaders.point, array);
    } else {
        array = [x, y, z];
        meshPoint.updateAttributes(shaders.point, array);
    }

    gl.drawArrays(gl.POINTS, 0, array.length / 3);

    popMatrix();
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

let __strokeColor;
function stroke(clr) {
    if (clr) __strokeColor = clr;
    return __strokeColor;
}

function noStroke() {
    __strokeColor = null;
}

let __fillColor;
function fill(clr) {
    if (clr) __fillColor = clr;
    return __fillColor;
}

function noFill() {
    __fillColor = null;
}

let meshLine;
function line(x1, y1, x2, y2) {
    let gl = engine.gl;

    pushMatrix();

    translate(x1, y1);
    scale(x2 - x1, y2 - y1);

    if (!meshLine) {
        meshLine = new Mesh();
        let array = [
            0, -1, 0,
            1, -1, 0,
            1, +1, 0,
            0, -1, 0,
            1, +1, 0,
            0, +1, 0,
        ];

        meshLine.initializeAttributes(shaders.line, array);
    } else {
        meshLine.useAttributes();
    }

    gl.uniform2f(gl.getUniformLocation(shaders.line.program, 'lineSize'), x2 - x1, y2 - y1);
    gl.uniform1f(gl.getUniformLocation(shaders.line.program, 'strokeSize'), __strokeSize);

    let clr = __strokeColor || colors.white;
    gl.uniform4f(gl.getUniformLocation(shaders.line.program, 'strokeColor'), clr.r, clr.g, clr.b, clr.a);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

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

let __shape;
function beginShape() {
    __shape = [];
}

function vertex(x, y, z = 0) {
    __shape.push(x, y, z);
}

function endShape() {
    points(__shape);
}

function fontName() { }

let __fontSize = 16;
function fontSize(size) {
    if (size) {
        __fontSize = size
    }
    return  __fontSize;
}

let __textMode = CORNER;
function textMode(mode) {
    if (mode) __textMode = mode;
    return __textMode;
}

var LEFT = 'left';

function textAlign() {

}

let meshText;
function text(txt, x, y) {
    let gl = engine.gl;

    pushMatrix();

    if (__textMode === CORNER)
        translate(x, y);
    else
        translate(x - w / 2, y - h / 2);
 
    if (!meshText) {
        const canvas = document.createElement("canvas");
        meshText = {
            canvas: canvas,
            context: canvas.getContext("2d"),
        };
    }

    const context = meshText.context;
    
    const fontColor = 'white';
    const fontRef = fontSize() + 'px cursive';

    context.fillStyle = fontColor;
    context.font = fontRef;
    const metrics = context.measureText(txt);

    context.canvas.width = metrics.width;
    context.canvas.height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.fillStyle = fontColor;
    context.strokeStyle = fontColor;
    context.font = fontRef;
    context.fillText(txt, 0, context.canvas.height);

    var textTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, context.canvas);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.activeTexture(gl.TEXTURE0);
    
    if (getOrigin() === TOP_LEFT) {        
        scale(context.canvas.width, context.canvas.height);
    } else {
        scale(context.canvas.width, -context.canvas.height);
    }

    let w = 1;
    let h = 1;

    let array = [
        0, 0, 0,
        w, 0, 0,
        w, h, 0,
        0, 0, 0,
        w, h, 0,
        0, h, 0];

    shaders.texture.texture = textTex;

    initializeAttributes(shaders.texture, array, array);
    gl.drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}