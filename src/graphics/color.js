class Color {
    constructor(r, g, b, a) {
        if (typeof r === 'string') {
            hexToRgb(r, this);
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

function hsb2rgb(hue, sat, val, alpha) {
    if (hue > 1)
        hue /= 255;

    sat = sat || 0.5;
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

/*
function Color.hsl2rgb(hue, sat, lgt, alpha)
    assert(hue)
    if hue > 1 then
        hue = hue / 255
    end

    sat = sat or 0.5
    lgt = lgt or 0.5
    alpha = alpha or 1

    if sat <= 0 then
        return lgt, lgt, lgt, alpha
    end

    hue = hue * 6 -- We will split hue into 6 sectors    

    local c = (1-math.abs(2*lgt-1))*sat
    local x = (1-math.abs(hue%2-1))*c

    local m,r,g,b = (lgt-.5*c), 0,0,0

    if     hue < 1 then r,g,b = c,x,0
    elseif hue < 2 then r,g,b = x,c,0
    elseif hue < 3 then r,g,b = 0,c,x
    elseif hue < 4 then r,g,b = 0,x,c
    elseif hue < 5 then r,g,b = x,0,c
    else              r,g,b = c,0,x
    end

    return r+m, g+m, b+m, alpha
end

function Color.rgb2hsl(...)
    local clr = Color(...)
    local r, g, b, a = clr.r, clr.g, clr.b, clr.a

    local max, min = math.max(r, g, b), math.min(r, g, b)
    local h = (max + min)*.5
    local s, l = h, h

    if max == min then
        h, s = 0, 0
    else
        local d = max - min
        s = (l > 0.5) and d / (2 - max - min) or d / (max + min)

        if max == r then
            h = (g - b) / d + (g < b and 6 or 0)
        elseif max == g then
            h = (b - r) / d + 2
        elseif max == b then
            h = (r - g) / d + 4
        end

        h = h / 6
    end

    return h, s, l, a
end
*/

//var HSL = 'hsl';
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
};