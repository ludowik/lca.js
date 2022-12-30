class Sketch {
    setup() {
        this.points = [];
    }

    update(dt) {
        let radius = sqrt(W*W, H*H);

        for (var i = 0; i < 10; ++i) {
            this.points.push(
                randomInt(-radius, radius),
                randomInt(-radius, radius),
                0)
        }
    }

    draw() {
        background();

        // perspective();
        // camera(0, 0, ElapsedTime);

        // translate(W / 2, H / 2);
        // rotate(ElapsedTime);

        // //point(W/2, H/2);
        // points(this.points);

        // circleMode(CENTER);
        // ellipse(0, 0, 50, 30);

        //resetMatrix();

        text("hello world!", 100, 250);
    }
}
