class Sketch3D extends Sketch {
    setup() {
        this.mode3D = true;
        setOrigin(BOTTOM_LEFT);
    }

    draw() {
        background(colors.black);
        let dirX = (mouse.x / W - 0.5) * 2;
        let dirY = (mouse.y / H - 0.5) * 2;
        
        perspective()

        camera(2, 2, 5, 0, 0, 0);

        rotate(mouse.x/100, [0, 1, 0]);

        // ambientLight(0.5);
        // directionalLight(1, 1, 1, -dirX, -dirY, -1);

        // noStroke();
        fill(colors.red);
        // sphere(150, 64, 64);
        fill(colors.green);
        
        //translate((mouse.x/W-0.5)*10, 0, 0)
        box();
    }
}
