class LightningBall extends Sketch {
    setup() {
        this.points = [];
        for (let index = 0; index <= TAU; index += TAU / 2) {
            this.points.push(new Filament(CX, CY, index));
        }
        this.start = true;

        this.params.countActive = 0;
    }

    update() {
        let countActive = 0;
        for (const filament of this.points) {
            if (filament.active) {
                countActive++;
            }
        }
        this.params.countActive = countActive;
        engine.gui.updateDisplay('countActive');

        if (countActive === 0 || countActive > 500) {
            this.reset();
        }
    }

    daw() {
        if (this.start) {
            background(colors.black);
            this.start = false;
        }

        stroke(colors.red);
        circle(CX, CY, minSize);

        for (let index = 0; index < 20; index++) {
            this.drawLightning();
        }
    }

    drawLightning() {
        for (const filament of this.points) {
            if (!filament.active) {
                continue;
            }

            filament.update();
            filament.draw();
            filament.alive(this.points);
        }
    }
}

class Filament {
    constructor(CX, CY, heading) {
        this.position = createVector(CX, CY);
        if (heading) {
            this.heading = heading;
            this.speed = createVector(0, 1);
            this.speed.setHeading(random(heading - TAU / 2, heading + TAU / 2));
        } else {
            this.speed = random2D();
            this.heading = this.speed.heading();
        }
        this.lenght = random(5, 15);
        this.active = true;
    }

    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        this.lenght -= this.speed.mag();

        if (get(this.position.x, this.position.y)[0] > 100) {
            this.active = false;
        }
    }

    alive(points) {
        if (this.lenght <= 0) {
            this.active = false;
            for (let index = 1; index <= 2; index++) {
                points.push(new Filament(
                    this.position.x,
                    this.position.y,
                    this.heading
                ));
            }
        }

        if (dist(CX, CY, this.position.x, this.position.y) >= minSize / 2) {
            this.position.normalize();
            this.speed.mult(-1);
        }
    }

    draw() {
        stroke(colors.white);
        point(this.position.x, this.position.y);
    }
}
