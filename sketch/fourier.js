class Fourier extends Sketch {
    init(config) {
        this.w = config.w;
        this.h = config.h;

        this.size = minSize / 4;

        this.params = {
            n: 1,
            nMin: 1,
            nOnChange: () => this.reset(),

            reset: () => this.reset()
        };

        this.reset();
    }

    reset() {
        this.img = createGraphics(this.w, this.h);
        this.x = null;
        this.y = null;

        this.points = [];

        this.items = [];
        for (let index = 1; index <= this.params.n; index++) {
            this.items.push({
                angle: random(TAU),
                radius: (this.size / 2) / index,
                speed: (PI) * index
            });
        }
    }

    update(dt) {
    }

    render(dt) {
        let nframes = 10;
        for (let i of range(nframes)) {
            renderThis(() => this.draw(dt / nframes));
        }
    }

    draw(dt) {
        background(colors.white);
        noFill();

        stroke(colors.gray);

        for (const item of this.items) {
            item.angle -= item.speed * dt;
        }

        let x = 0, y = 0, xd = 0, yd = 0;
        push(); {
            translate(xc, yc / 2);
            for (const item of this.items) {
                translate(xd, yd);
                circle(0, 0, 2 * item.radius);

                xd = Math.cos(item.angle) * item.radius;
                yd = Math.sin(item.angle) * item.radius;

                circle(xd, yd, 10);

                x += xd;
                y += yd;
            }
            stroke(colors.green);
            strokeWeight(10);
            point(xd, yd);
        }
        pop();

        if (this.x) {
            this.img.stroke(colors.red);
            this.img.strokeWeight(3);
            this.img.line(this.x, this.y, x + xc, y + yc / 2);
        }

        this.points.push({
            x: x + xc,
            y: y + yc
        });

        this.x = x + xc;
        this.y = y + yc / 2;

        image(this.img, 0, 0);

        if (this.points.length > this.w) {
            this.points.shift();
        }

        translate(xc / 5, yc);
        scale(0.5);

        beginShape();
        stroke(colors.blue);
        strokeWeight(5);
        x = 0;
        for (const point of this.points) {
            vertex(x++, point.y);
        }
        endShape();
    }
}

declareSketch(Fourier);
