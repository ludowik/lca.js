var __strokeSize = 1;
function strokeSize(size) {
    if (size) __strokeSize = size;
    return __strokeSize;
}

var __strokeColor;
function stroke(clr) {
    if (clr) {
        if (clr instanceof Color) {
            __strokeColor = clr;
        } else {
            __strokeColor = color.apply(null, arguments);
        }
    }
    return __strokeColor;
}

function noStroke() {
    __strokeColor = null;
    __strokeSize = 0;
}

var __fillColor;
function fill(clr) {    
    if (clr) {
        if (clr instanceof Color) {
            __fillColor = clr;
        } else {
            __fillColor = color.apply(null, arguments);
        }
    }
    return __fillColor;
}

function noFill() {
    __fillColor = null;
}

var CENTER = 'center';
var CORNER = 'corner';

var __rectMode = CORNER;
function rectMode(mode) {
    if (mode) __rectMode = mode;
    return __rectMode;
}

function circleMode(mode) {
    return ellipseMode(mode);
}

var __ellipseMode = CENTER;
function ellipseMode(mode) {
    if (mode) __ellipseMode = mode;
    return __ellipseMode;
}

function fontName() { }

var __fontSize = 16;
function fontSize(size) {
    if (size) {
        __fontSize = size;
    }
    return __fontSize;
}

var __textMode = CENTER;
function textMode(mode) {
    if (mode) __textMode = mode;
    return __textMode;
}

var LEFT = 'left';

function textAlign(horizontal, vertical) {
    textMode(horizontal === LEFT ? CORNER : CENTER);
}
