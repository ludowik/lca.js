class vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return createVector(this.x, this.y);
    }

    dist(p) {
        return dist(this.x, this.y, p.x, p.y);
    }

    len() {
        return sqrt(this.x * this.x, this.y * this.y);
    }

    normalize() {
        let len = this.len();
        this.x /= len;
        this.y /= len;
        return this;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(coef) {
        this.x *= coef;
        this.y *= coef;
        return this;
    }

    rotate(angle) {
        let c = cos(angle), s = sin(angle);

        let x, y;
        x = c * this.x - s * this.y;
        y = s * this.x + c * this.y;

        this.x = x;
        this.y = y;

        return this;
    }

    setHeading(angle) {
        this.rotate(angle - this.heading());
    }

    heading() {
        return this.angleBetween({ x: 1, y: 0 })
    }

    angleBetween(v) {
        let alpha1 = atan2(this.y, this.x)
        let alpha2 = atan2(v.y, v.x)

        return alpha2 - alpha1;
    }
}

function createVector(x, y) {
    return new vec2(x, y);
}

function randomPoint(w, h) {
    return new vec2(randomInt(w || W), randomInt(h || w || H));
}

function random2D(len = 1) {
    return new vec2(1, 0).rotate(random() * TAU).mult(len);
}
