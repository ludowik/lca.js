class CC extends Sketch {
    setup() {
        let logoSize = 192;

        this.params = {
            w: 40,
            wMax: logoSize,

            h: 100,
            hMax: logoSize,

            l: 40,

            weight: 30,

            save: () => this.save()
        };

        this.imgLogo = createGraphics(logoSize, logoSize);
        this.imgLogo.pixelDensity(1);
    }

    save() {
        save(this.imgLogo, 'apple-touch-icon.png');
    }

    draw() {
        background(colors.gray);

        let w = this.params.w;
        let h = this.params.h;
        let l = this.params.l;

        let weight = this.params.weight;

        logo(this.imgLogo);

        spriteMode(CENTER);

        if (W >= this.imgLogo.width)
            sprite(this.imgLogo, CX, CY);
        else
            sprite(this.imgLogo, CX, CY, W, H);

        function logo(img) {
            //setContext(img);

            background(colors.gray);

            stroke(colors.white);
            strokeSize(weight);

            noFill();

            let CX = img.width / 2;
            let CY = img.height / 2;

            cc(img, CX - w, CY);
            cc(img, CX + w, CY);

            //setContext();
        }

        function cc(img, x, y) {
            push(); {
                translate(x, y);

                beginShape(); {
                    vertex(+l / 2, -l);

                    bezierVertex(
                        -w, -h,
                        -w, +h,
                        +l / 2, +l);
                }
                endShape();
            }
            pop();
        }
    }
}
