class Cardioid extends Sketch {
    setup() {
        this.n = 200;
        this.factor = 2;

        colorMode(HSB, 1);
    }

    update(dt) {
        this.factor += 0.005;
    }

    draw() {
        background(colors.black);

        translate(CX, CY);

        rotate(-elapsedTime);

        let diameter = minSize * 0.9;
        let radius = diameter / 2;

        noFill();
        stroke(colors.white);
        circle(0, 0, radius);

        let da = TAU / this.n;

        let getPoint = (i) => {
            let angle = i * da + PI;
            let x = radius * cos(angle);
            let y = radius * sin(angle);
            return createVector(x, y);
        };

        for (let i = 0; i < this.n; i++) {
            let a = getPoint(i);
            let b = getPoint(i * this.factor);
            stroke((i * da) / TAU, 1, 1);
            line(a.x, a.y, b.x, b.y);
        }
    }
}
