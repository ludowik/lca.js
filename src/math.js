var random = Math.random;
function randomInt(_max) {
    return Math.ceil(Math.random() * _max);
}

var min = Math.min;
var max = Math.max;
function clamp(a, _min, _max) {
    return min(max(a, _min), _max)
}
