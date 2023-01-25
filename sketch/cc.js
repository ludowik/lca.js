class CC extends Sketch {
    init() {
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

    render() {
        background(colors.gray);

        let w = this.params.w;
        let h = this.params.h;
        let l = this.params.l;

        let weight = this.params.weight;

        logo(this.imgLogo);

        imageMode(CENTER);

        if (width >= this.imgLogo.width)
            image(this.imgLogo, CX, CY);
        else
            image(this.imgLogo, CX, CY, width, height);

        function logo(img) {
            img.background(colors.white);

            img.stroke(colors.black);
            img.strokeSize(weight);

            img.noFill();

            let CX = img.width / 2;
            let CY = img.height / 2;

            cc(img, CX - w, CY);
            cc(img, CX + w, CY);
        }

        function cc(img, x, y) {
            img.push(); {
                img.translate(x, y);
                img.beginShape(); {
                    img.vertex(+l / 2, -l);

                    img.bezierVertex(
                        -w, -h,
                        -w, +h,
                        +l / 2, +l);
                }
                img.endShape();
            }
            img.pop();
        }
    }
}
