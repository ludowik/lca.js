class TestUI extends Sketch {
    setup() {
        this.params = {
            'rotate': true,
            'reset': () => { this.reset(); },

            'mode': 'clockwise',
            'modeList': ['clockwise', 'anti-clockwise'],

            'angle': PI / 3,
            'angleMin': 0,
            'angleMax': TAU,
            'angleStep': PI / 64,

            'name': 'ludo',

            'color': colors.green,
        };
    }

    reset() {
        this.params.angle = 0;
    }

    update() {
        if (this.params.rotate) {
            if (this.params.mode === 'clockwise') {
                this.params.angle += 0.05;
            } else {
                this.params.angle -= 0.05;
            }

            if (this.params.angle > this.params.angleMax) {
                this.params.angle = 0;
            }

            engine.gui.updateDisplay('angle');
        }
    }

    draw() {
        background(colors.black);

        translate(CX, CY);
        rotate(this.params.angle);

        stroke(this.params.color);
        line(0, 0, W, 0);

        fontSize(minSizeFont)
        text(this.params.name, 0, 0);
    }
}
