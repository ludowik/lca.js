class Gol extends Sketch {
    setup() {
        this.n = Math.min(minSize / 2, 250);
        this.size = minSize / this.n;

        this.size = 15;
        this.nw = Math.floor(W / this.size);
        this.nh = Math.floor(H / this.size);

        this.width = Math.floor(this.nw);
        this.height = Math.floor(this.nh);

        this.params = {
            'clear': () => this.reset(),

            'state': '1',
            'stateList': ['1', '2'],
            'stateOnChange': () => this.state(),
        };

        this.state();

        frameRate(10);
    }

    reset() {
        this.area1 = new Grid(this.width, this.height, undefined);
        this.area2 = new Grid(this.width, this.height, undefined);
    }

    state() {
        this.reset();
        this['state' + this.params.state]();
    }

    state1() {
        for (let i = 0; i < 9; i++) {
            this.area1.set(
                i + 10,
                20, 'alive');
        }
    }

    state2() {
        for (let i = 0; i < this.width * this.height * .3; i++) {
            this.area1.set(
                randomInt(this.width),
                randomInt(this.height), 'alive');
        }
    }

    isAliveValue(value) {
        return value == 'alive' || value == 'born';
    }

    isAlive(i, j) {
        return this.isAliveValue(this.area1.get(i, j));
    }

    update(dt) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let aliveNeighbor = 0;
                aliveNeighbor += this.isAlive(i - 1, j - 1) ? 1 : 0;
                aliveNeighbor += this.isAlive(i - 1, j + 0) ? 1 : 0;
                aliveNeighbor += this.isAlive(i - 1, j + 1) ? 1 : 0;
                aliveNeighbor += this.isAlive(i + 0, j + 1) ? 1 : 0;
                aliveNeighbor += this.isAlive(i + 1, j + 1) ? 1 : 0;
                aliveNeighbor += this.isAlive(i + 1, j + 0) ? 1 : 0;
                aliveNeighbor += this.isAlive(i + 1, j - 1) ? 1 : 0;
                aliveNeighbor += this.isAlive(i + 0, j - 1) ? 1 : 0;

                let value = this.area1.get(i, j);

                let alive = this.isAliveValue(value);

                if (!alive && aliveNeighbor == 3) {
                    this.area2.set(i, j, 'born');
                } else if (alive && (aliveNeighbor < 2 || aliveNeighbor > 3)) {
                    this.area2.set(i, j, 'dead');
                } else {
                    if (value == 'born')
                        this.area2.set(i, j, 'alive');
                    else if (value == 'dead')
                        this.area2.set(i, j, undefined);
                    else
                        this.area2.set(i, j, value);
                }
            }
        }

        let tmp = this.area1;
        this.area1 = this.area2;
        this.area2 = tmp;
    }

    draw() {
        background(colors.white);

        noStroke();
        rectMode(CENTER);

        const size = this.size;
        const area = this.area1;

        const w = this.width;
        const h = this.height;

        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                const value = area.get(i, j);

                let clr = null;
                if (value == 'born') {
                    clr = colors.gray;
                } else if (value == 'alive') {
                    clr = colors.black;
                } else if (value == 'dead') {
                    clr = colors.red;
                }

                if (clr) {
                    fill(clr);
                    rect(i * size, j * size, size - 1, size - 1);
                }
            }
        }
    }

    mousePressed() {
        this.mouseDragged();
    }

    mouseReleased() {
        const area = this.area1;

        const w = this.width;
        const h = this.height;

        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                const value = area.get(i, j);
                if (value === 'born') {
                    area.set(i, j, 'alive');
                } else if (value === 'dead') {
                    area.set(i, j, undefined);
                }
            }
        }

        redraw();
    }

    mouseDragged() {
        let x = round(mouseX / this.size);
        let y = round(mouseY / this.size);

        if (this.area1.get(x, y) === 'alive') {
            this.area1.set(x, y, 'dead');
        } else if (this.area1.get(x, y) === undefined) {
            this.area1.set(x, y, 'born');
        }

        // for (const dx of range(-1, 1)) {
        //     for (const dy of range(-1, 1)) {
        //         this.area1.set(
        //             dx + x,
        //             dy + y, 'alive');
        //     }
        // }

        redraw();
    }
}

declareSketch(Gol);
