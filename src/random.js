seed = () => { };

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

function randomColor() {
    return Color.random();
}

function randomPoint() {
    return new createVector(randomInt(width), randomInt(height));
}

function random2D(len = 1) {
    return p5.Vector.random2D().mult(len);
}

function noiseColor() {
    return color(random(), random(), random());
}

function noiseScale(x, y) {
    return noise(x * 0.005, y * 0.005);
}
