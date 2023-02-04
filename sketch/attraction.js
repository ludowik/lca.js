class Attraction extends Sketch {
    setup() {
        this.comets = [];
        for (const i of range(100)) {
            this.comets.push(new Comet());
        }

        this.attractors = [
            new Comet(),
            new Comet(),
            new Comet(),
            new Comet(),
            new Comet(),
            new Comet(),
            new Comet(),
            new Comet(),
            new Comet(),
            new Comet(),
        ];
    }

    update(dt) {
        for (const comet of this.comets) {
            comet.update(dt);
            for (const attractor of this.attractors) {
                comet.attraction(dt, attractor);
            }
        }
    }

    draw() {
        background(0);
        for (const comet of this.comets) {
            comet.draw();
        }

        for (const attractor of this.attractors) {
            attractor.draw();
        }
    }

    mousePressed() {
        this.attractors.push(new Comet(mouseX, mouseY));
    }
}

class Comet {
    constructor(x, y) {
        this.position = x ? createVector(x, y) : randomPoint();
        this.speed = random2D(2);
    }

    update() {
        this.position.add(this.speed);
        if (this.position.x >= W) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = W;
        }

        if (this.position.y >= H) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = H;
        }
    }

    attraction(dt, attractor) {
        // influencer la direction via une rotation
        let dist = attractor.position.dist(this.position);
        if (dist < W) {
            let v = attractor.position.clone().sub(this.position).normalize();
            let angle = this.speed.angleBetween(v);
            this.speed.rotate(angle / 100);
        }
    }

    draw() {
        strokeSize(2);
        circle(this.position.x, this.position.y, 10);
    }
}
