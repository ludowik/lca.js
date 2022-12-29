var random = Math.random;
function randomInt(_min, _max) {
    if (_max == undefined) {
        _max = _min;
        _min = 1;
    }
    return Math.ceil(Math.random() * (_max - _min) + _min);
}

var min = Math.min;
var max = Math.max;
function clamp(a, _min, _max) {
    return min(max(a, _min), _max)
}
