class Attraction extends Sketch {
    init() {
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

    render() {
        background(0);
        for (const comet of this.comets) {
            comet.render();
        }

        for (const attractor of this.attractors) {
            attractor.render();
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
        if (this.position.x >= width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y >= height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    attraction(dt, attractor) {
        // influencer la direction via une rotation
        let dist = attractor.position.dist(this.position);
        if (dist < width) {
            let v = attractor.position.copy().sub(this.position).normalize();
            let angle = this.speed.angleBetween(v);
            this.speed.rotate(angle / 100);
        }
    }

    render() {
        circle(this.position.x, this.position.y, 10);
    }
}

setSketch(Attraction);
