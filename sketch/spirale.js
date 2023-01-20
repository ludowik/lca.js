class Spirale extends Sketch {
    setup(config) {
        config.mode = WEBGL;
    }

    init() {
        colorMode(HSB, 1);

        perspective(PI / 3.0, width / height, 0.1, 5000);
        normalMaterial();

        this.cam = createEasyCam();

        let state = getItem('cam_state');
        this.cam.setState(state);

        this.params = {
            'update': true,

            'deltaAngle': Math.PI / 32,
            'deltaAngleMin': 0,
            'deltaAngleMax': Math.PI / 32,
            'deltaAngleStep': Math.PI / 1024,

            'width': 100,
            'widthMax': 500,

            'height': 400,
            'heightMax': 500,

            'noise': 100
        };

        this.elapsedTime = 0;
    }

    update(dt) {
        if (this.params.update) {
            this.elapsedTime += dt;
        }

        storeItem('cam_state', this.cam.getState());
    }

    render() {
        background(0);

        let angle = 0;

        let x, z, y = 0;

        let px, py, pz;

        beginShape(TRIANGLE_STRIP);

        for (let i = -this.params.height; i < this.params.height; i++) {
            y += noise(this.elapsedTime + (i / this.params.noise));
        }
        y = -y / 2;

        for (let i = -this.params.height; i < this.params.height; i++) {
            let n = noise(this.elapsedTime + (i / this.params.noise));
            y += n;

            x = cos(angle) * this.params.width * n ^ 2;
            z = sin(angle) * this.params.width * n ^ 2;

            stroke(n);
            fill(n, 0.5, 1);

            strokeWeight(n);

            vertex(x, y, z);
            vertex(0, y, 0);

            // if (px) {
            //     strokeWeight(2);
            //     vertex(0, y, 0, 0, py, 0);
            //     vertex(x, y, z, px, py, pz);
            // }

            angle += n * this.params.deltaAngle;

            px = x;
            py = y;
            pz = z;
        }

        endShape();
    }
}

declareSketch(Spirale);
