class CirclePacking extends Sketch {
    setup() {
        this.circles = [];
        this.newCircles(100);

        this.nStep = 100;

        this.params = {
            N: '0'
        };
    }

    newCircles(n = 1) {
        for (const i of range(n)) {
            this.newCircle();
        }
    }

    newCircle(x, y, radius) {
        let ok, n = 100;
        let newCircle;
        do {
            newCircle = new Circle(x, y, radius);

            n--;
            ok = true;

            for (let circle of this.circles) {
                if (circle !== newCircle) {
                    let d = circle.position.dist(newCircle.position);

                    if (d <= circle.radius) {
                        ok = false;
                        break;
                    }
                }
            }
        }
        while (!ok && n > 0);

        this.circles.push(newCircle);

        this.params.N = this.circles.length;

        // TOFIX
        // this.gui.updateDisplay('N');
    }

    step(dt) {
        for (let circle1 of this.circles) {
            circle1.update(dt);
        }

        for (let circle1 of this.circles) {
            for (let circle2 of this.circles) {
                if (circle1 !== circle2 && (circle1.state === 'alive' || circle2.state === 'alive')) {
                    let d = circle1.position.dist(circle2.position);
                    if (d <= (circle1.radius + circle2.radius)) {
                        circle1.radiusTarget = circle1.radius;
                        circle2.radiusTarget = circle2.radius;
                        break;
                    }
                }
            }
        }
    }

    draw() {
        for (let circle of this.circles) {
            if (circle.state !== 'dead') {
                circle.draw();
            }
        }

        let addCircles = 0;
        for (let circle of this.circles) {
            if (circle.state === 'transition') {
                circle.state = 'dead';
                addCircles++;
            }
        }

        if (addCircles > 0) {
            this.newCircle(addCircles);
        }
    }

    mousePressed() {
        this.newCircle(floor(mouseX), floor(mouseY), width);
    }
}

class Circle {
    constructor(x, y, radius) {
        this.position = x && y ? createVector(x, y) : randomPoint();
        this.radiusTarget = radius || randomInt(minSize / 20);
        this.radius = 0;
        this.clr = Color.random();
        this.state = 'alive';
    }

    isAlive() {
        if (this.radius >= this.radiusTarget) {
            return false;
        }
        return true;
    }

    update(dt) {
        if (this.state === 'alive') {
            this.radius += 0.5;
            if (this.radius >= this.radiusTarget) {
                this.radius = this.radiusTarget;
                this.state = 'transition';
            }

        }
    }

    draw() {
        noStroke();
        fill(this.clr);
        circle(this.position.x, this.position.y, this.radius);
    }
}
