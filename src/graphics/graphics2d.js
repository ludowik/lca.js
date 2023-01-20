var shaders;

class Graphics {
    constructor(gl) {
        shaders = new Shaders(gl);
    }
}

function background(clr) {
    let gl = getContext();

    clr = clr || colors.black;

    gl.clearColor(clr.r, clr.g, clr.b, clr.a);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function push() {
    pushMatrix();
    // TODO
    //pushStyles();
}

function pop() {
    popMatrix();
    // TODO
    //popStyles();
}

var meshPoint;
function point(x, y, z = 0) {
    let gl = getContext();

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

    let ul = shaders.point.uniformsLocation;
    gl.uniform1f(ul.strokeSize, __strokeSize);

    let clr = __strokeColor || colors.white;
    gl.uniform4f(ul.strokeColor, clr.r, clr.g, clr.b, clr.a);

    gl.drawArrays(gl.POINTS, 0, array.length / 3);

    popMatrix();
}

let meshPoints;
function points(array) {
    let gl = getContext();

    if (!meshPoints) {
        meshPoints = new Mesh();
        meshPoints.initializeAttributes(shaders.point, array);
    } else {
        meshPoints.updateAttributes(shaders.point, array);
    }

    let ul = shaders.point.uniformsLocation;
    gl.uniform1f(ul.strokeSize, __strokeSize);

    let clr = __strokeColor || colors.white;
    gl.uniform4f(ul.strokeColor, clr.r, clr.g, clr.b, clr.a);

    gl.drawArraysInstanced(gl.POINTS, 0, array.length / 3, 3);
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

    let ul = meshLine.shader.uniformsLocation;

    gl.uniform2f(ul.lineSize, x2 - x1, y2 - y1);
    gl.uniform1f(ul.strokeSize, __strokeSize);

    let clr = __strokeColor || colors.white;
    gl.uniform4f(ul.strokeColor, clr.r, clr.g, clr.b, clr.a);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    popMatrix();
}

let meshRect;
function rect(x, y, w, h) {
    let gl = getContext();

    pushMatrix();

    if (__rectMode === CORNER)
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

    let ul = meshRect.shader.uniformsLocation;

    let clr = __strokeColor || colors.white;
    gl.uniform4f(ul.strokeColor, clr.r, clr.g, clr.b, clr.a);

    clr = __fillColor || colors.white;
    gl.uniform4f(ul.fillColor, clr.r, clr.g, clr.b, clr.a);

    gl.uniform2f(ul.size, w, h);
    gl.uniform1f(ul.strokeSize, __strokeSize);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    popMatrix();
}

function circle(x, y, radius) {
    ellipse(x, y, radius * 2, radius * 2);
}

let meshEllipse;
function ellipse(x, y, w, h) {
    let gl = getContext();

    pushMatrix();

    if (__ellipseMode === CORNER)
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

    let clr = __strokeColor || colors.white;
    gl.uniform4f(meshEllipse.shader.uniformsLocation.strokeColor, clr.r, clr.g, clr.b, clr.a);

    clr = __fillColor || colors.white;
    gl.uniform4f(meshEllipse.shader.uniformsLocation.fillColor, clr.r, clr.g, clr.b, clr.a);

    gl.uniform2f(meshEllipse.shader.uniformsLocation.size, w, h);
    gl.uniform1f(meshEllipse.shader.uniformsLocation.strokeSize, __strokeSize);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    popMatrix();
}

let meshText;
function text(txt, x, y) {
    let gl = getContext();

    pushMatrix();

    if (!meshText) {
        const canvas = document.createElement("canvas");
        meshText = {
            canvas: canvas,
            context: canvas.getContext("2d"),
        };
    }

    const context = meshText.context;

    const fontColor = 'white';
    const fontRef = fontSize() + 'px monospace';

    context.fillStyle = fontColor;
    context.font = fontRef;
    const metrics = context.measureText(txt);

    let w, h;
    w = metrics.width;
    h = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent + 1;

    context.canvas.width = w;
    context.canvas.height = h;

    context.clearRect(0, 0, w, h);

    context.fillStyle = fontColor;
    context.strokeStyle = fontColor;
    context.font = fontRef;
    context.fillText(txt, 0, h - 1);

    var textTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, context.canvas);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.activeTexture(gl.TEXTURE0);

    if (__textMode === CORNER) {
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
        0, 1, 0
    ];

    shaders.texture.texture = textTex;

    if (!meshText.mesh) {
        meshText.mesh = new Mesh();
        meshText.mesh.initializeAttributes(shaders.texture, array, array);
    } else {
        meshText.mesh.updateAttributes(shaders.texture, array, array);
    }

    let ul = shaders.texture.uniformsLocation;

    let clr = __fillColor || colors.white;
    gl.uniform4f(ul.fillColor, clr.r, clr.g, clr.b, clr.a);

    gl.drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}

var meshSprite;
function sprite(x, y, w, h, texture) {
    let gl = getContext();

    pushMatrix();

    translate(x, y);
    scale(w, h);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.activeTexture(gl.TEXTURE0);

    let array = [
        0, 0, 0,
        1, 0, 0,
        1, 1, 0,
        0, 0, 0,
        1, 1, 0,
        0, 1, 0
    ];

    shaders.texture.texture = texture;

    if (!meshSprite) {
        meshSprite = new Mesh();
        meshSprite.initializeAttributes(shaders.texture, array, array);
    } else {
        meshSprite.updateAttributes(shaders.texture, array, array);
    }

    let ul = shaders.texture.uniformsLocation;

    let clr = colors.white;
    gl.uniform4f(ul.fillColor, clr.r, clr.g, clr.b, clr.a);

    gl.drawArrays(gl.TRIANGLES, 0, array.length / 3);

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
        meshShade.updateAttributes(shader, array, array);
    }

    gl.drawArrays(gl.TRIANGLES, 0, array.length / 3);

    popMatrix();
}
