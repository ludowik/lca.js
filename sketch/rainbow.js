class Rainbow extends Sketch {
    setup() {
    }

    draw() {
        let w = minSize / 2;
        let h = minSize / 2;

        colorMode(HSB, minSize / 2, 1, 1, 1);

        background(colors.gray);

        // lines
        pushProps(); {
            for (let hue = 0; hue < w; hue++) {
                stroke(hue / w);
                line(hue, 0, hue, h);
            }
        }
        popProps();

        // circle
        pushProps(); {
            noStroke();
            noSmooth();
            translate(w + w / 2, h / 2);
            rotate(-PI / 2);
            for (let hue = 0; hue < w; hue++) {
                fill(hue / w, 1, 1);
                arc(0, 0, h, h,
                    TAU * hue / w,
                    TAU * (hue + 1) / w, PIE, 1);
            }
        }
        popProps();

        // rect
        pushProps(); {
            translate(0, h);
            for (let hue = 0; hue < w; hue++) {
                for (let saturation = 0; saturation < w; saturation++) {
                    stroke(hue / w, saturation / w, 1);
                    point(hue, saturation);
                }
            }
        }
        popProps();

        // ring
        pushProps(); {
            noStroke();
            noSmooth();
            translate(w + w / 2, h + h / 2);
            rotate(-PI / 2);
            let d = 256 / 12;
            for (let r = w; r > 0; r -= d * 2) {
                for (let hue = 0; hue < w; hue += d) {
                    fill(hue / w, r / w, r / w);
                    arc(0, 0, r, r,
                        TAU * hue / w,
                        TAU * (hue + d) / w, PIE, 1);
                }
            }
        }
        popProps();
    }
}
