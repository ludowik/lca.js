class Sketch {
    setup() {
        this.points = [60, 60, 0, 50, 50, 0, 55, 55, 0];
    }

    update(dt) {
        this.points.push(randomInt(100), randomInt(100), 0)
    }

    draw() {
        points(this.points);
    }
}
