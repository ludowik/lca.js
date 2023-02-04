class Fourier extends Sketch {
    setup() {
        this.w = W;
        this.h = H;

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
        this.img = new FrameBuffer(this.w, this.h);
        
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

    draw() {
        let nframes = 10;
        for (let i of range(nframes)) {
            renderThis(() => this.render(DeltaTime / nframes));
        }
    }

    render(dt) {
        background(colors.white);
        noFill();

        stroke(colors.gray);

        for (const item of this.items) {
            item.angle -= item.speed * dt;
        }

        let x = 0, y = 0, xd = 0, yd = 0;
        push(); {
            translate(CX, CY / 2);
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
            strokeSize(10);
            point(xd, yd);
        }
        pop();

        if (this.x) {
            this.img.bindFramebuffer();
            stroke(colors.red);
            strokeSize(3);
            line(this.x, this.y, x + CX, y + CY / 2);
            sketch.fb.bindFramebuffer();
        }

        this.points.push({
            x: x + CX,
            y: y + CY
        });

        this.x = x + CX;
        this.y = y + CY / 2;

        sprite(this.img, 0, 0);

        if (this.points.length > this.w) {
            this.points.shift();
        }

        translate(CX / 5, CY);
        scale(0.5);

        beginShape();
        stroke(colors.blue);
        strokeSize(5);
        x = 0;
        for (const point of this.points) {
            vertex(x++, point.y);
        }
        endShape();
    }
}
