class Primitives extends Sketch {
    setup() {
        this.points = [];
        let radius = 20;
        for (var i = 0; i < 10; ++i) {
            this.points.push(
                randomInt(-radius, radius),
                randomInt(-radius, radius),
                0);
        }

        this.params.strokeSize = 1;
    }

    update(dt) {
    }

    draw() {
        background();

        let top = 100;

        function render(x, y, setup, draw) {
            setup();
            pushMatrix();
            translate(x, y);
            let dx = 0;
            for (const i of range(25)) {
                strokeSize(i);
                stroke(colors.white);
                draw(i, dx, 0);
                dx += i * 3;
            }
            top += 50;
            popMatrix();
        }

        render(0, top,
            () => {
                strokeSize(1);
                stroke(colors.red);
                fill(colors.white);
                circleMode(CENTER);
            },
            (i, x, y) => {
                circle(x, y, i, i);
            });

        render(0, top,
            () => {
                strokeSize(1);
                stroke(colors.red);
                fill(colors.white);
                rectMode(CENTER);
            },
            (i, x, y) => {
                rect(x, y, i, i);
            });

        render(0, top,
            () => { },
            (i, x, y) => {
                point(x, y);
            });

        render(0, top,
            () => { },
            (i, x, y) => {
                points(this.points);
            });

        render(0, top,
            () => {
                strokeSize(12);
            },
            (i, x, y) => {
                line(x - i, y - i, x + i, y + i);
            });

    }
}
