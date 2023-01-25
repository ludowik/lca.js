function random(_min, _max) {
    if (!_min && !_max) return Math.random();

    if (!_max) {
        _max = _min;
        _min = 0;
    }
    return Math.random() * (_max - _min) + _min;
}

function randomInt(_min, _max) {
    if (_max == undefined) {
        _max = _min;
        _min = 0;
    }
    return Math.ceil(Math.random() * (_max - _min) + _min);
}

var PI = Math.PI;
var TAU = Math.PI * 2;

var sin = Math.sin;
var cos = Math.cos;

Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
}

Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
}

var radians = Math.radians;
var degrees = Math.degrees;

var tan = Math.tan;
var atan2 = Math.atan2;
var abs = Math.abs;
var ceil = Math.ceil;
var floor = Math.floor;
var round = Math.round;
var min = Math.min;
var max = Math.max;
function clamp(a, _min, _max) {
    return min(max(a, _min), _max)
}

var sqrt = Math.sqrt;

function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}

function gcd(a, b) {
    if (a < b) {
        [a, b] = [b, a];
    }
    let m = a % b;
    if (m === 0) {
        return b;
    }
    return this.gcd(b, m);
}

function coprime(a, b) {
    return this.gcd(a, b) === 1 ? true : false;
}

function cofactor(a, b) {
    return this.gcd(a, b) !== 1 ? true : false;
}

function prime(a) {
    if (a <= 1) return false;
    for (let i = 2; i <= sqrt(a); i++) {
        if (a % i === 0) {
            return false;
        }
    }
    return true;
}

function fract(v) {
    return v - floor(v);
}

function dist(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return sqrt(dx * dx + dy * dy);
}

// TODO
function noise(x, y) {
    return NoiseModule.perlin2(x, y);
}

function noiseSeed(seed) {
    return NoiseModule.seed(seed);
}
