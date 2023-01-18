class Lines extends Sketch {
    setup() {
        this.params.step = { value: 6, min: 1, max: 10, step: 1 };
    }

    draw() {
        background(colors.black);

        strokeSize(1);
        stroke(colors.white);

        let w = W / 4;
        let h = W / 4;

        let step = this.params.step.value;

        this.horiz(0, 0, w, h, step);
        this.verti(0, h, w, h, step);
        this.diag1(w, 0, w, h, step);
        this.diag2(w, h, w, h, step);

        this.circle(w * 2, 0, w, h, step);

        this.horiz(0, h * 2, w, h, step);
        this.verti(0, h * 2, w, h, step);

        this.diag1(w, h * 2, w, h, step);
        this.diag2(w, h * 2, w, h, step);

        this.horiz(0, h * 3, w, h, step);
        this.diag1(0, h * 3, w, h, step);
    }

    horiz(ox, oy, w, h, step) {
        pushMatrix();
        translate(ox, oy);
        for (let y = 0; y < h; y += step) {
            line(0, y, w, y);
        }
        popMatrix();
    }

    verti(ox, oy, w, h, step) {
        pushMatrix();
        translate(ox, oy);
        for (let x = 0; x < w; x += step) {
            line(x, 0, x, h);
        }
        popMatrix();
    }

    diag1(ox, oy, w, h, step) {
        pushMatrix();
        translate(ox, oy);
        for (let y = h; y > 0; y -= step) {
            line(0, y, y, 0);
        }
        for (let x = step; x < w; x += step) {
            line(x, h, h, x);
        }
        popMatrix();
    }

    diag2(ox, oy, w, h, step) {
        pushMatrix();
        translate(ox, oy);
        for (let y = 0; y < h; y += step) {
            line(0, y, w - y, h);
        }
        for (let x = step; x < w; x += step) {
            line(x, 0, w, h - x);
        }
        popMatrix();
    }

    circle(ox, oy, w, h, step) {
        pushMatrix();
        translate(ox + w / 2, oy + h / 2);
        for (let d = 0; d < w; d += step * 2) {
            circle(0, 0, d / 2);
        }
        popMatrix();
    }
}
