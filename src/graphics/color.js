class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a || 1;
    }

    static random() {
        return new Color(random(), random(), random(), 1);
    }
}

function color(r, g, b, a) {
    return new Color(r, g, b, a);
}

colors = {
    black: color(0, 0, 0),
    white: color(1, 1, 1),

    red: color(1, 0, 0),
    green: color(0, 1, 0),
    blue: color(0, 0, 1),
};