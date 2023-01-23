class ComputePI extends Sketch {
    setup() {
        this.iteration = W + 1;

        this.methods = [
            new EstimatePI(),
            new EstimatePI_coprime(),
            new EstimatePI_montecarlo(),
            new EstimatePI_montecarlo3D(),
            new EstimatePI_leibniz()
        ];
    }

    update() {
        if (frameRate() > 58) {
            this.iteration = min(this.iteration + 99, 30000);
        } else {
            this.iteration = max(this.iteration - 99, 100);
        }

        for (const i of range(this.iteration)) {
            for (const method of this.methods) {
                method.step();
            }
        }

        for (const method of this.methods) {
            method.update();
        }
    }

    draw() {
        background(colors.black);

        let h = 24;

        let x = (W / 2) / 8;
        let y = 2 * h;

        fontSize(h);
        textAlign(LEFT, CENTER);

        for (const method of this.methods) {
            method.render(x, y, h);
            y += 4 * h;
        }
    }
}

declareSketch(ComputePI);

class EstimatePI {
    constructor() {
        this.title = 'PI';
        this.values = [];
        this.init();
    }

    init() {
    }

    compute() {
        return PI;
    }

    step() {

    }

    update() {
        let pi = this.compute();
        this.values.push(pi);
        if (this.values.length > W) {
            this.values.shift();
        }
    }

    render(x, y, h) {
        this.draw(x, y, this.title, h);
    }

    draw(ox, oy, title, h) {
        let values = this.values;
        let pi = values[values.length - 1];

        noStroke();
        fill(colors.white);

        text(title, ox, oy);
        text(pi, ox, oy + h);

        oy += 2 * h;

        if (values) {
            stroke(colors.white);
            noFill();

            let minY = +1000;
            let maxY = -1000;

            for (let i = 0; i < values.length; i++) {
                minY = min(PI, minY, values[i]);
                maxY = max(PI, maxY, values[i]);
            }

            let maxFromPI = max(10e-10, max(abs(PI - minY), abs(PI - maxY)));

            minY = PI - maxFromPI;
            maxY = PI + maxFromPI;

            let piY = map(PI, minY, maxY, h, 0);
            line(ox, oy + piY, ox + W, oy + piY);

            beginShape();
            for (let x = 0; x < values.length; x++) {
                let y = map(values[x], minY, maxY, h, 0);
                vertex(ox + x, oy + y);
            }
            endShape();
        }
    }
}

// from probability of 2 random integers being coprime
const MAX = 10 ** 10;
const MAX_HALF = MAX / 2;
class EstimatePI_coprime extends EstimatePI {
    init() {
        this.title = 'coprime';
        this.totalCount = 0;
        this.coprimeCount = 0;
    }

    step() {
        this.totalCount++;

        let a = randomInt(1, MAX);
        let b = randomInt(1, MAX);

        if (coprime(a, b)) {
            this.coprimeCount++;
        }
    }

    compute() {
        return sqrt(6 / (this.coprimeCount / this.totalCount));
    }
}

// from probability that a point is in a circle circumscribed in a square
class EstimatePI_montecarlo extends EstimatePI {
    static MAX = 1000000;

    init() {
        this.title = 'monte carlo';
        this.totalCount = 0;
        this.inCircleCount = 0;
    }

    step() {
        this.totalCount++;

        let a = randomInt(MAX);
        let b = randomInt(MAX);

        if (dist(a, b, MAX_HALF, MAX_HALF) <= MAX_HALF) {
            this.inCircleCount++;
        }
    }

    compute() {
        return 4 * (this.inCircleCount / this.totalCount);
    }
}

// from probability that a point is in a sphere circumscribed in a cube
class EstimatePI_montecarlo3D extends EstimatePI {
    init() {
        this.title = 'monte carlo 3D';
        this.totalCount = 0;
        this.inSphereCount = 0;
    }

    step() {
        this.totalCount++;

        let a = randomInt(MAX);
        let b = randomInt(MAX);
        let c = randomInt(MAX);

        if (dist(a, b, c, MAX_HALF, MAX_HALF, MAX_HALF) <= MAX_HALF) {
            this.inSphereCount++;
        }
    }

    compute() {
        return 6 * (this.inSphereCount / this.totalCount);
    }
}

// from leibniz formula
class EstimatePI_leibniz extends EstimatePI {
    init() {
        this.title = 'leibniz';
        this.leibniz = 1;
        this.leibnizSign = -1;
        this.leibnizDivisor = 3;
    }

    step() {
        this.leibniz += this.leibnizSign / this.leibnizDivisor;
        this.leibnizSign *= -1;
        this.leibnizDivisor += 2;
    }

    compute() {
        return 4 * (this.leibniz);
    }
}
