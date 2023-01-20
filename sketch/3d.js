class Sketch3D extends Sketch {
    static { declareSketch(this) };

    setup() {
    }

    draw() {
        background(colors.black);
        let dirX = (mouse.x / W - 0.5) * 2;
        let dirY = (mouse.y / H - 0.5) * 2;

        ambientLight(0.5);
        directionalLight(1, 1, 1, -dirX, -dirY, -1);

        // noStroke();
        // fill(colors.red);
        // sphere(150, 64, 64);
        // fill(colors.green);
        // box(250);
    }
}
