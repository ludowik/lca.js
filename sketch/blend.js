class BlendRect extends Sketch {
    setup() {

    }

    rects() {
        let size = 50;
        let n = 10;

        for (let j = -n; j <= n; j++) {
            for (let i = -n - j % 2; i <= n + j % 2; i += 2) {
                rect(i * size, j * size, size, size);
            }
        }
    }

    draw() {
        background(colors.black);

        blendMode(ADDITIVE)

        translate(W / 2, H / 2);

        rectMode(CENTER);

        rotate(+elapsedTime);
        fill(colors.red);
        this.rects();

        rotate(-elapsedTime * 4 / 3);
        fill(colors.green);
        this.rects();

        rotate(+elapsedTime / 2);
        fill(colors.blue);
        this.rects();
    }

}