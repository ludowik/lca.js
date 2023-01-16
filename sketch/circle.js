class CircleSketch extends Sketch {
    setup() {
        this.params.strokeSize = 15;

        engine.gui.add(this.params, 'strokeSize', 1, 60);
    }

    draw() {
        background();

        strokeSize(this.params.strokeSize);
        stroke(colors.white);

        fill(colors.blue);

        circle(W / 2, H / 2, 100 * abs(sin(ElapsedTime)));
    }
}