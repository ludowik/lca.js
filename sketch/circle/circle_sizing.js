class CircleSizing extends Sketch {
    setup() {
        background(colors.black);
    }

    draw() {
        noStroke();

        fill(color(1, 1, 1, 0.6));

        rectMode(CORNER);
        rect(0, 0, W, H);

        noFill();

        ellipseMode(CENTER);

        this.drawCircles(1, 0.15);
        this.drawCircles(2, 0.3);
        this.drawCircles(25, 0.8);
    }

    drawCircles(n, a) {
        let w = ceil(H / (n + 1));

        for (let x = 0; x <= 2 + n * W / H; ++x) {
            for (let y = 0; y <= n + 1; ++y) {
                let nval = noise(x, y);
                let radius = w / 2 * sin(elapsedTime + 100 * nval);

                let val = 0.5 + cos(radians(elapsedTime * 10 * nval)) / 2;

                fill(color(1 - val, val ** 2, val, a));

                strokeSize(abs(sin(elapsedTime * nval) * radius));
                stroke(color(val, 0.5, 0.5, a));

                circle(x * w, y * w, abs(radius));
            }
        }
    }
}
