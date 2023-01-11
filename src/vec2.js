class vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dist(p) {
        return dist(this.x, this.y, p.x, p.y);
    }
}

function createVector(x, y) {
    return new vec2(x, y);
}

function randomPoint() {
    return new vec2(randomInt(W), randomInt(H));
}