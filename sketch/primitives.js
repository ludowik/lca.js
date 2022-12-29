class Sketch {
    setup() {
        this.points = [];
    }

    update(dt) {
        this.points.push(randomInt(W), randomInt(H), 0)
    }

    draw() {
        //point(W/2, H/2);
        points(this.points);
    }
}
