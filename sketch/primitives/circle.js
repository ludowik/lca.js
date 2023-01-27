class CircleSketch extends Sketch {
    setup() {
        this.params.strokeSize = { value: 15, min: 1, max: 60 };
    }

    draw() {
        background();

        strokeSize(this.params.strokeSize.value);
        stroke(colors.white);

        fill(colors.blue);

        circle(W / 2, H / 2, 100 * abs(sin(ElapsedTime)));
    }
}
