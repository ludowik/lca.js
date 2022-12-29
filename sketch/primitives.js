class Sketch {
    setup() {
        this.points = [];
    }

    update(dt) {
        this.points.push(
            randomInt(-W/2, W/2),
            randomInt(-H/2, H/2),
            0)
    }

    draw() {
        perspective();
        camera(0, 0, ElapsedTime);

        translate(W/2, H/2);
        rotate(ElapsedTime);        

        //point(W/2, H/2);
        points(this.points);
    }
}
