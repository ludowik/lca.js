class Rainbow extends Sketch {
    setup() {
    }

    draw() {
        let w = minSize / 2;
        let h = minSize / 2;

        colorMode(HSB, minSize / 2, 1, 1, 1);

        background(colors.gray);

        // line
        for (let hue = 0; hue < w; hue++) {
            stroke(hue, 1, 1);
            line(hue, 0, hue, h);
        }

        // circle
        push();
        noStroke();
        noSmooth();
        translate(w + w / 2, h / 2);
        rotate(-PI / 2);
        for (let hue = 0; hue < w; hue++) {
            fill(hue, 1, 1);
            arc(0, 0, h, h,
                TAU * hue / w,
                TAU * (hue + 1) / w, PIE, 1);
        }
        pop();

        // rect
        push();
        translate(0, h);
        for (let hue = 0; hue < w; hue++) {
            for (let saturation = 0; saturation < w; saturation++) {
                stroke(hue, saturation / w, 1);
                point(hue, saturation);
            }
        }
        pop();

        // anneau
        push();
        noStroke();
        noSmooth();
        translate(w + w / 2, h + h / 2);
        rotate(-PI / 2);
        let d = 256 / 12;
        for (let r = w; r > 0; r -= d * 2) {
            for (let hue = 0; hue < w; hue += d) {
                fill(hue, r / w, r / w);
                arc(0, 0, r, r,
                    TAU * hue / w,
                    TAU * (hue + d) / w, PIE, 1);
            }
        }
        pop();
    }
}
