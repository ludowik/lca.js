var __styles = {};

function resetStyles() {
    colorMode(RGB);

    rectMode(CORNER);
    circleMode(CENTER);
    ellipseMode(CENTER);
    spriteMode(CORNER);
    textMode(CORNER);
    
    strokeSize(1);
    stroke(colors.white);

    fill(colors.black);

    fontSize(16);
}

function pushStyles() {
    pushItem('styles', {...__styles});
}

function popStyles() {
    __styles = popItem('styles');
}

function strokeSize(size) {
    if (size) __styles.__strokeSize = size;
    return __styles.__strokeSize;
}

function stroke(clr) {
    if (clr != undefined) {
        if (clr instanceof Color) {
            __styles.__strokeColor = clr;
        } else {
            __styles.__strokeColor = color.apply(null, arguments);
        }
    }
    return __styles.__strokeColor;
}

function noStroke() {
    __styles.__strokeColor = null;
    __styles.__strokeSize = 0;
}

function fill(clr) {    
    if (clr != undefined) {
        if (clr instanceof Color) {
            __styles.fillColor = clr;
        } else {
            __styles.fillColor = color.apply(null, arguments);
        }
    }
    return __styles.fillColor;
}

function noFill() {
    __styles.fillColor = null;
}

// TODO
function smooth() {
}

function noSmooth() {    
}

var CENTER = 'center';
var CORNER = 'corner';

function rectMode(mode) {
    if (mode) __styles.rectMode = mode;
    return __styles.rectMode;
}

function circleMode(mode) {
    return ellipseMode(mode);
}

function ellipseMode(mode) {
    if (mode) __styles.ellipseMode = mode;
    return __styles.ellipseMode;
}

function spriteMode(mode) {
    if (mode) __styles.spriteMode = mode;
    return __styles.spriteMode;

}

// TODO
function fontName() {    
}

function fontSize(size) {
    if (size) __styles.fontSize = size;
    return __styles.fontSize;
}

function textMode(mode) {
    if (mode) __styles.textMode = mode;
    return __styles.textMode;
}

var LEFT = 'left';

function textAlign(horizontal, vertical) {
    textMode(horizontal === LEFT ? CORNER : CENTER);
}
