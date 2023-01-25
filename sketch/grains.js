class Grains extends Sketch {
    setup() {
        this.ratio = 5;

        let w = floor(W / this.ratio);
        let h = floor(W / this.ratio);

        this.img = createGraphics(w, h);

        this.grains = new Grid(w, h);

        this.G = 9.8;
    }

    update(dt) {
        for (let x = 0; x < this.grains.w; ++x) {
            for (let y = this.grains.h - 1; y >= 0; --y) {
                let grain = this.grains.get(x, y);
                if (grain) {
                    if (y < this.img.height - 1) {
                        let down = this.grains.get(x, y + 1);
                        if (down == null) {
                            grain.acc = this.G;
                            grain.vel += grain.acc * dt;
                            this.grains.set(x, y, null);
                            this.grains.set(x, y + 1, grain);

                        } else {
                            let cells = [
                                createVector(-1, +1),
                                createVector(+1, +1)
                            ];

                            for (let cell of cells) {
                                let other = this.grains.get(x + cell.x, y + cell.y);
                                if (other == null) {
                                    this.grains.set(x, y, null);
                                    this.grains.set(x + cell.x, y + cell.y, grain);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    daw() {
        scale(this.ratio);

        this.img.background(colors.black);

        this.img.loadPixels();
        for (let x = 0; x < this.grains.w; ++x) {
            for (let y = 0; y < this.grains.h; ++y) {
                let grain = this.grains.get(x, y);
                if (grain) {
                    this.img.set(x, y, colors.white);
                }
            }
        }
        this.img.updatePixels();

        image(this.img, 0, 0);
    }

    mouseMoved() {
        let x = floor(mouseX / this.ratio);
        let y = floor(mouseY / this.ratio);

        if (this.grains.get(x, y) == null) {
            this.grains.set(
                floor(mouseX / this.ratio),
                floor(mouseY / this.ratio),
                new createVector(0, 0)
            );

        } else {
            this.grains.set(x, y, null);
        }
    }
}
