class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

function color(r, g, b, a) {
    return new Color(r, g, b, a);
}

colors = {
    black: color(0, 0, 0, 1),
    white: color(1, 1, 1, 1),
};