class Noise extends Sketch {
    init() {
        this.params = {
            ratio: 2,
            size: 20,
            speed: 3,
        };
    }

    render() {
        background(1);
        let size = this.params.size;

        // stroke('red');
        noStroke();

        blendMode(engine.p5instance.BLEND);

        ellipseMode(CENTER);
        rectMode(CENTER);

        for (const i of index(width / size)) {
            for (const j of index(height / size)) {
                fill(
                    noise(
                        (i) / this.params.ratio,
                        (j) / this.params.ratio,
                        elapsedTime / this.params.speed,
                    ),
                    // noise(
                    //     elapsedTime / this.params.speed,
                    //     (i) / this.params.ratio,
                    //     (j) / this.params.ratio,
                    // ),
                    // noise(
                    //     (i) / this.params.ratio,
                    //     elapsedTime / this.params.speed,
                    //     (j) / this.params.ratio,
                    // )
                    0.5
                );

                circle(i * size, j * size, size * 2);
                // rect(i * size, j * size, size, size);
            }
        }
    }
}

declareSketch(Noise);
