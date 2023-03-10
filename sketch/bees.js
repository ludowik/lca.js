class Bees extends Sketch {
    setup() {
        this.angle = 0; // getItem('bees:angle') || 0;

        this.params.addParams({
            'n': 16,
            'nMin': 2,
            'nMax': 50,

            'da': 8
        });

        this.mode3D = true;
    }

    draw() {
        background(0);

        isometric();

        ambientLight(0.5);
        directionalLight(colors.white, 250, 250, 250);

        stroke(colors.white);
        fill(colors.gray);

        let n = this.params.n;
        let w = minSize / n;

        let hmin = w, hmax = w * 6;

        for (let z = -n / 2 + 1; z < n / 2; z++) {
            for (let x = -n / 2 + 1; x < n / 2; x++) {
                let d = dist(x, z, 0, 0) / 2 + this.angle;
                let h = floor(map(sin(d), -1, 1, hmin, hmax));

                pushProps(); {
                    translate(x * w, 0, z * w);

                    stroke(1 - (h - hmin) / (hmax - hmin), 0.5, 0.5);
                    fill((h - hmin) / (hmax - hmin), 0.5, 0.5);

                    box(w, h, w);
                }
                popProps();
            }
        }

        this.angle += this.params.da / 100;
        storeItem('bees:angle', this.angle);
    }
}
