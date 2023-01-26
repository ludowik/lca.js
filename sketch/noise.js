class Noise extends Sketch {
    setup() {
        this.params = {
            ratio: 2,
            size: 20,
            speed: 3,
        };
    }

    draw() {
        background(1);
        let size = this.params.size;

        // stroke('red');
        noStroke();

        blendMode(BLEND);

        ellipseMode(CENTER);
        rectMode(CENTER);

        for (const i of index(W / size)) {
            for (const j of index(H / size)) {
                fill(
                    noise(
                        (i) / this.params.ratio,
                        (j) / this.params.ratio,
                        ElapsedTime / this.params.speed,
                    ),
                    // noise(
                    //     ElapsedTime / this.params.speed,
                    //     (i) / this.params.ratio,
                    //     (j) / this.params.ratio,
                    // ),
                    // noise(
                    //     (i) / this.params.ratio,
                    //     ElapsedTime / this.params.speed,
                    //     (j) / this.params.ratio,
                    // )
                    0.5
                );

                circle(i * size, j * size, size);
                // rect(i * size, j * size, size, size);
            }
        }
    }
}
