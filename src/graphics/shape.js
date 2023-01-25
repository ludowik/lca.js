LINES = 'lines';
TRIANGLE_STRIP = 'TRIANGLE_STRIP';

let __shape;
function beginShape() {
    __shape = [];
}

function vertex(x, y, z = 0) {
    __shape.push(x, y, z);
}

function endShape() {
    strokeSize(20);

    for (let i = 0; i < __shape.length; i += 3) {
        line(
            __shape[i], __shape[i + 1],
            __shape[i + 3], __shape[i + 4]);
    }
    //    points(__shape);
}
