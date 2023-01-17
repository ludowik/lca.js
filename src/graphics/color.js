class Color {
    constructor(r, g, b, a) {
        if (typeof r === 'string') {
            hexToRgb(r, this);
        } else {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a || 1;
        }
    }

    static random() {
        return new Color(random(), random(), random(), 1);
    }
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
function hexToRgb(h, clr) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

        // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }

    clr.r = parseInt(r, 16) / 256;
    clr.g = parseInt(g, 16) / 256;
    clr.b = parseInt(b, 16) / 256;
    clr.a = 1;
}

function color(r, g, b, a) {
    return new Color(r, g, b, a);
}

var HSB = 'hsb';
var RGB = 'rgb';

function colorMode() {
    // TODO
}

var colors = {
    black: color(0, 0, 0),
    white: color(1, 1, 1),

    red: color(1, 0, 0),
    green: color(0, 1, 0),
    blue: color(0, 0, 1),
};