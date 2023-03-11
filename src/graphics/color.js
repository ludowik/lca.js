class Color {
    constructor(r, g, b, a) {
        this.set(r, g, b, a);
    }

    set(r, g, b, a) {
        if (typeof r === 'string') {
            hex2rgb(r, this);
        } else {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a || 1;

            if (this.r > 1) {
                this.r /= 255;
            }
            if (this.g > 1) {
                this.g /= 255;
            }
            if (this.b > 1) {
                this.b /= 255;
            }
            if (this.a > 1) {
                this.a /= 255;
            }
        }
    }

    static random() {
        return new Color(random(), random(), random(), 1);
    }

    static hex() {
        return hex2rgb(arguments);
    }

    static hsl() {
        return hsl2rgb(arguments);
    }

    static hsb() {
        return hsb2rgb(arguments);
    }

    reverse() {
        return color(
            1 - this.r,
            1 - this.g,
            1 - this.b,
            1
        );
    }

    contrast() {
        let lum = (
            0.2125 * this.r +
            0.7154 * this.g +
            0.0721 * this.b);

        if (lum < 0.3) {
            return colors.white;
        }
        return colors.black;
    }
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
function hex2rgb(h, clr) {
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

function hsb2rgb(hue, sat, val, alpha) {
    if (hue > 1) {
        hue /= 255;
    }

    sat = sat || 1;
    val = val || 1;
    alpha = alpha || 1;

    if (sat <= 0) {
        return new Color(val, val, val, alpha); // Return early if grayscale    
    }

    hue *= 6;  // We will split hue into 6 sectors    

    let sector = floor(hue);

    let tint1 = val * (1 - sat);
    let tint2 = val * (1 - sat * (hue - sector));
    let tint3 = val * (1 - sat * (1 + sector - hue));

    let r, g, b;

    if (sector == 1) {
        // Yellow to green
        r = tint2;
        g = val;
        b = tint1;
    } else if (sector == 2) {
        // Green to cyan
        r = tint1;
        g = val;
        b = tint3;
    } else if (sector == 3) {
        // Cyan to blue
        r = tint1;
        g = tint2;
        b = val;
    } else if (sector == 4) {
        // Blue to magenta
        r = tint3;
        g = tint1;
        b = val;
    } else if (sector == 5) {
        // Magenta to red
        r = val;
        g = tint1;
        b = tint2;
    } else {
        // Red to yellow (sector could be 0 or 6)
        r = val;
        g = tint3;
        b = tint1;
    }
    return new Color(r, g, b, alpha);
}

function hsl2rgb(hue, sat, lgt, alpha) {
    if (hue > 1) {
        hue /= 360;
    }

    sat = sat || 1;
    lgt = lgt || 0.5;
    alpha = alpha || 1;

    if (sat <= 0) {
        return new Color(lgt, lgt, lgt, alpha);
    }

    hue *= 6; // We will split hue into 6 sectors    

    let c = (1 - Math.abs(2 * lgt - 1)) * sat;
    let x = (1 - Math.abs(hue % 2 - 1)) * c;

    let m = (lgt - .5 * c);
    let r = 0;
    let g = 0;
    let b = 0;

    if (hue < 1) [r, g, b] = [c, x, 0];
    else if (hue < 2) [r, g, b] = [x, c, 0];
    else if (hue < 3) [r, g, b] = [0, c, x];
    else if (hue < 4) [r, g, b] = [0, x, c];
    else if (hue < 5) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    return new Color(r + m, g + m, b + m, alpha);
}

function rgb2hsl(clr) {
    let [r, g, b, a] = [clr.r, clr.g, clr.b, clr.a];

    let [max, min] = [Math.max(r, g, b), Math.min(r, g, b)];
    let [h] = [(max + min) * .5];
    let [s, l] = [h, h];

    if (max == min) {
        [h, s] = [0, 0];
    } else {
        let d = max - min;
        s = (l > 0.5) ? d / (2 - max - min) : d / (max + min);

        if (max == r)
            h = (g - b) / d + (g < b ? 6 : 0);
        else if (max == g)
            h = (b - r) / d + 2;
        else if (max == b)
            h = (r - g) / d + 4;

        h = h / 6;
    }

    return new Color(h, s, l, a);
}

var HSL = 'hsl';
var HSB = 'hsb';
var RGB = 'rgb';

let __colorMode = RGB;
function colorMode(mode) {
    if (mode) __colorMode = mode;
    return __colorMode;
}

function color(r, g, b, a) {
    if (__colorMode == HSB) {
        return hsb2rgb(r, g, b, a);
    } else if (__colorMode == HSL) {
        return hsl2rgb(r, g, b, a);
    }
    return new Color(r, g, b, a);
}

var colors = {
    transparent: color(0, 0, 0, 0),
    black: color(0, 0, 0),
    white: color(1, 1, 1),

    red: color(1, 0, 0),
    green: color(0, 1, 0),
    blue: color(0, 0, 1),

    gray: color(.5, .5, .5),
};

globalThis.Color = Color
