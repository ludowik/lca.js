class Feigenbaum extends Sketch {
    setup() {
        this.params.addParams({
            y: 0.5,
            yMin: 0.0,
            yMax: 1.0,
            yStep: 0.05,
            yOnChange: () => this.reset(),
        });

        this.reset();
    }

    reset() {
        this.start = true;
    }

    draw() {
        if (this.start) {
            background(colors.white);

            stroke(colors.black);
            strokeSize(1);

            this.base = minSize * 0.9;
            line(0, this.base, W, this.base);

            this.start = false;
        }

        stroke(colors.black);
        strokeSize(0.5);

        noFill();

        let rMin = 2;
        let rMax = 4;
        let rStep = 0.001;
        let iMax = 150;

        let data = [];

        let ratio = minSize / (rMax - rMin);
        for (let r = rMin; r <= rMax; r += rStep) {
            this.y = this.params.y;
            for (let index = 0; index < iMax; index++) {
                this.y = r * this.y * (1 - this.y);
                if (index > iMax * 0.75) {
                    data.push((r - rMin) * ratio, this.base - this.y * minSize * 0.8, 0);
                }
            }
        }

        points(data);
    }
}
