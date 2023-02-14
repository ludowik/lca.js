var shaders;

class Graphics {
    constructor(gl) {
        shaders = new Shaders(gl);
    }
}

function pixelDensity() {
    // TODO
}

function background(clr) {
    let gl = getContext();

    clr = clr || colors.black;

    gl.clearColor(clr.r, clr.g, clr.b, clr.a);
    gl.clearDepth(10.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

var BLEND = 'blend';
var ADDITIVE = 'additive';

function blendMode(mode) {
    let gl = getContext();
    if (mode === BLEND) {
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    } else if (mode === ADDITIVE) {
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.SRC_ALPHA);

    }
}

function pushProps() {
    pushMatrix();
    pushStyles();
}

function popProps() {
    popMatrix();
    popStyles();
}

var meshPoint;
function point(x, y, z = 0) {
    let gl = getContext();
    pushMatrix();

    scale(x, y, z);

    let array;
    if (!meshPoint) {
        meshPoint = new Mesh();
        array = [0, 0, 0];
        meshPoint.initializeAttributes(shaders.point, array);
    } else {
        meshPoint.useAttributes();
    }

    let uniforms = {
        strokeSize: __styles.__strokeSize,
        strokeColor: __styles.__strokeColor || colors.white,
    }
    meshPoint.shader.sendUniforms(uniforms);

    drawArrays(gl.POINTS, 0, 3);

    popMatrix();
}

let meshPoints;
function points(array) {
    let gl = getContext();
    pushMatrix();

    if (!meshPoints) {
        meshPoints = new Mesh();
        meshPoints.initializeAttributes(shaders.point, array);
    } else {
        meshPoints.updateAttributes(array);
    }

    let uniforms = {
        strokeSize: __styles.__strokeSize,
        strokeColor: __styles.__strokeColor || colors.white,
    }
    meshPoints.shader.sendUniforms(uniforms);

    drawArraysInstanced(gl.POINTS, 0, array.length / 3, 3);

    popMatrix();
}

let meshLine;
function line(x1, y1, x2, y2) {
    let gl = getContext();
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
            0, +1, 0
        ];

        meshLine.initializeAttributes(shaders.line, array);
    } else {
        meshLine.useAttributes();
    }

    let uniforms = {
        origin: getOrigin() == TOP_LEFT ? -1 : 1,
        lineSize: [x2 - x1, y2 - y1],
        strokeSize: __styles.__strokeSize,
        strokeColor: __styles.__strokeColor || colors.white,
    }
    meshLine.shader.sendUniforms(uniforms);

    drawArrays(gl.TRIANGLES, 0, 6);

    popMatrix();
}

let meshRect;
function rect(x, y, w, h) {
    let gl = getContext();
    pushMatrix();

    if (__styles.rectMode === CORNER)
        translate(x, y);
    else
        translate(x - w / 2, y - h / 2);

    scale(w, h);

    if (!meshRect) {
        meshRect = new Mesh();
        let array = [
            0, 0, 0,
            1, 0, 0,
            1, 1, 0,
            0, 0, 0,
            1, 1, 0,
            0, 1, 0
        ];

        meshRect.initializeAttributes(shaders.rect, array);
    } else {
        meshRect.useAttributes();
    }

    let uniforms = {
        size: [w, h],
        strokeSize: __styles.__strokeSize,
        strokeColor: __styles.__strokeColor || colors.white,
        fillColor: __styles.fillColor || colors.white,
    }
    meshRect.shader.sendUniforms(uniforms);

    drawArrays(gl.TRIANGLES, 0, 6);

    popMatrix();
}

function circle(x, y, radius) {
    ellipse(x, y, radius * 2, radius * 2);
}

let meshEllipse;
function ellipse(x, y, w, h) {
    let gl = getContext();
    pushMatrix();

    if (__styles.ellipseMode === CORNER)
        translate(x, y);
    else
        translate(x - w / 2, y - h / 2);

    scale(w, h);

    if (!meshEllipse) {
        meshEllipse = new Mesh();
        let array = [
            0, 0, 0,
            1, 0, 0,
            1, 1, 0,
            0, 0, 0,
            1, 1, 0,
            0, 1, 0
        ];

        meshEllipse.initializeAttributes(shaders.ellipse, array, array);
    } else {
        meshEllipse.useAttributes();
    }

    let uniforms = {
        size: [w, h],
        strokeSize: __styles.__strokeSize,
        strokeColor: __styles.__strokeColor || colors.white,
        fillColor: __styles.fillColor || colors.transparent,
    }
    meshEllipse.shader.sendUniforms(uniforms);

    drawArrays(gl.TRIANGLES, 0, 6);

    popMatrix();
}

// TODO
var PIE = 'pie';

function arc() {
}

let meshText;
function textSize(txt) {
    if (!meshText) {
        const canvas = document.createElement("canvas");
        meshText = {
            canvas: canvas,
            context: canvas.getContext("2d"),
        };
    }

    const context = meshText.context;
    const fontRef = fontSize() + 'px monospace';
    context.font = fontRef;
    const metrics = context.measureText(txt);

    return {
        w: metrics.width,
        h: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent + 1,
        fontBoundingBoxAscent: metrics.fontBoundingBoxAscent,
        fontBoundingBoxDescent: metrics.fontBoundingBoxDescent,
    };
}

function text(txt, x, y) {
    let gl = getContext();
    pushMatrix();

    let metrics = textSize(txt);

    let w = metrics.w;
    let h = metrics.h;

    const context = meshText.context;

    context.canvas.width = w;
    context.canvas.height = h;

    context.clearRect(0, 0, w, h);

    const fontRef = fontSize() + 'px monospace';
    const fontColor = 'white';

    context.fillStyle = fontColor;
    context.strokeStyle = fontColor;
    context.font = fontRef;
    context.fillText(txt, 0, h - 1);

    let img = new Texture(null, null, context.canvas);

    gl.activeTexture(gl.TEXTURE0);

    if (__styles.textMode === CORNER) {
        translate(x, y);
    } else {
        translate(x - w / 2, y - h / 2);
    }

    if (getOrigin() === TOP_LEFT) {
        translate(0, -metrics.fontBoundingBoxDescent);
        scale(w, h);
    } else {
        translate(0, h + metrics.fontBoundingBoxDescent);
        scale(w, -h);
    }

    let array = [
        0, 0, 0,
        1, 0, 0,
        1, 1, 0,
        0, 0, 0,
        1, 1, 0,
        0, 1, 0,
    ];

    shaders.texture.texture = img.targetTexture;

    if (!meshText.mesh) {
        meshText.mesh = new Mesh();
        meshText.mesh.initializeAttributes(shaders.texture, array, array);
    } else {
        meshText.mesh.updateAttributes(array, array);
    }

    let uniforms = {
        fillColor: __styles.fillColor || colors.white,
    }
    meshText.mesh.shader.sendUniforms(uniforms);

    drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}

var meshSprite;
function sprite(texture, x, y, w, h) {
    let gl = getContext();
    pushMatrix();

    w = w || texture.w;
    h = h || texture.h;

    if (x) {
        translate(x, y);
    }
    scale(w, h);

    gl.bindTexture(gl.TEXTURE_2D, texture.targetTexture);
    gl.activeTexture(gl.TEXTURE0);

    let array = [
        0, 0, 0,
        1, 0, 0,
        1, 1, 0,
        0, 0, 0,
        1, 1, 0,
        0, 1, 0,
    ];

    shaders.texture.texture = texture;

    if (!meshSprite) {
        meshSprite = new Mesh();
        meshSprite.initializeAttributes(shaders.texture, array, array);
    } else {
        meshSprite.updateAttributes(array, array);
    }

    let uniforms = { // TODO - sprite color
        fillColor: colors.white,
    }
    meshSprite.shader.sendUniforms(uniforms);

    drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}

var meshShade;
function shade(x, y, w, h, shader) {
    let gl = getContext();
    pushMatrix();

    translate(x, y);
    scale(w, h);

    let array = [
        0, 0, 0,
        1, 0, 0,
        1, 1, 0,
        0, 0, 0,
        1, 1, 0,
        0, 1, 0
    ];

    if (!meshShade) {
        meshShade = new Mesh();
        meshShade.initializeAttributes(shader, array, array);
    } else {
        meshShade.updateAttributes(array, array);
    }

    drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}

function renderThis(f) {
    pushProps(); {
        f();
    }
    popProps();
}

// TODO
function drawArrays() {
    let gl = getContext();
    gl.drawArrays.apply(gl, arguments);
    sketch.fb.status = 'updated';
}

function drawArraysInstanced() {
    let gl = getContext();
    gl.drawArraysInstanced.apply(gl, arguments);
    sketch.fb.status = 'updated';
}
