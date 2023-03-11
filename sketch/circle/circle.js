class CircleSketch extends Sketch {
    setup() {
        this.params.strokeSize = { value: 15, min: 1, max: 60 };
        this.params.radius = 40;
    }

    draw() {
        background();

        noStroke();
        fill(colors.gray);
        rectMode(CENTER);
        rect(W / 2, H / 2, this.params.radius * 2, this.params.radius * 2);

        strokeSize(this.params.strokeSize.value);
        stroke(colors.white);

        fill(colors.blue);

        circle(W / 2, H / 2, this.params.radius);
    }
}
