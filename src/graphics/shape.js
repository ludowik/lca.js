LINES = 'lines';
TRIANGLE_STRIP = 'TRIANGLE_STRIP';

let __shape;
function beginShape() {
    __shape = [];
}

function vertex(x, y, z = 0) {
    __shape.push(x, y, z);
}

function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

function bezierVertex(x2, y2, x3, y3, x4, y4) {
    bezierCube(
        { x: __shape[__shape.length - 3], y: __shape[__shape.length - 2] },
        { x: x2, y: y2 },
        { x: x3, y: y3 },
        { x: x4, y: y4 });
}

function bezierQuadratic(a, b, c) {
    let xab, yab, xbc, ybc, x, y;
    for (let t = 0; t <= 1; t += 0.5) {
        xab = lerp(a.x, b.x, t);
        yab = lerp(a.y, b.y, t);

        xbc = lerp(b.x, c.x, t);
        ybc = lerp(b.y, c.y, t);

        x = lerp(xab, xbc, t);
        y = lerp(yab, ybc, t);

        vertex(x, y);
    }
}

function bezierCube(a, b, c, d) {
    let xab, yab, xbc, ybc, xcd, ycd, x1, y1, x2, y2, x, y;
    for (let t = 0; t <= 1; t += 0.05) {
        xab = lerp(a.x, b.x, t);
        yab = lerp(a.y, b.y, t);

        xbc = lerp(b.x, c.x, t);
        ybc = lerp(b.y, c.y, t);

        xcd = lerp(c.x, d.x, t);
        ycd = lerp(c.y, d.y, t);

        x1 = lerp(xab, xbc, t);
        y1 = lerp(yab, ybc, t);

        x2 = lerp(xbc, xcd, t);
        y2 = lerp(ybc, ycd, t);

        x = lerp(x1, x2, t);
        y = lerp(y1, y2, t);

        vertex(x, y);
    }

    vertex(d.x, d.y);
}

function endShape() {
    for (let i = 0; i < __shape.length; i += 3) {
        line(
            __shape[i], __shape[i + 1],
            __shape[i + 3], __shape[i + 4]);
    }
    //    points(__shape);
}
