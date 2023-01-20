LINES = 'lines';

let __shape;
function beginShape() {
    __shape = [];
}

function vertex(x, y, z = 0) {
    __shape.push(x, y, z);
}

function endShape() {
    points(__shape);
}
