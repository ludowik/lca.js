class Sketch3D extends Sketch {
    setup(config) {
        config.mode = WEBGL;
    }

    init() {
        this.cam = createEasyCam();
    }

    render() {
        background(colors.black);
        let dirX = (mouseX / width - 0.5) * 2;
        let dirY = (mouseY / height - 0.5) * 2;
        ambientLight(0.5);
        directionalLight(1, 1, 1, -dirX, -dirY, -1);
        noStroke();
        fill(colors.red);
        sphere(150, 64, 64);
        fill(colors.green);
        box(250);
    }
}

setSketch(Sketch3D);
