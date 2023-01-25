var uga;

class Carto extends Sketch {
    preload() {
        let script = document.createElement('script');
        script.id = 'carto';
        script.src = `assets/uga.js`;
        document.getElementById("scripts").appendChild(script);
    }

    setup(config) {
        // config.mode = WEBGL;
        this.zoom = 1;
    }

    render() {
        // resetMatrix();
        if (engine.config.mode === WEBGL) {
            // ortho(0, width, -height, 0, 0, 1);
        }

        if (uga) {

            this.minx = +Number.MAX_VALUE;
            this.miny = +Number.MAX_VALUE;

            this.maxx = -Number.MAX_VALUE;
            this.maxy = -Number.MAX_VALUE;

            for (const feature of uga.features) {
                for (const coordinate of feature.geometry.coordinates[0][0]) {
                    this.minx = Math.min(this.minx, coordinate[0]);
                    this.miny = Math.min(this.miny, coordinate[1]);

                    this.maxx = Math.max(this.maxx, coordinate[0]);
                    this.maxy = Math.max(this.maxy, coordinate[1]);
                }
            }

            this.scalex = (this.maxx - this.minx);
            this.scaley = (this.maxy - this.miny);

            background(colors.black);

            if (engine.config.mode === WEBGL) {
                translate(CX, CY);
            } else {
                translate(CX, CY);
            }
            scale(this.zoom);

            noStroke();
            fill(colors.white);
            textAlign(CENTER, CENTER);
            text(uga.features.length, 0, 0);

            noFill();
            stroke(colors.red);
            circle(0, 0, 25);

            stroke(colors.white);

            strokeSize(1 / this.zoom);

            let m;
            for (const feature of uga.features) {
                if (engine.config.mode === WEBGL) {
                    m = new p5.Geometry(1, 1);
                } else {
                    beginShape();
                }

                let i = 0;
                for (const coordinate of feature.geometry.coordinates[0][0]) {
                    i++;
                    if (i % 64) continue;
                    let lon = coordinate[0];
                    let lat = coordinate[1];

                    let x = (lon - this.minx - this.scalex / 2) / this.scalex * width;
                    let y = (lat - this.miny - this.scaley / 2) / this.scaley * height;

                    if (engine.config.mode === WEBGL) {
                        m.vertices.push(new p5.Vector(
                            (x),
                            (y)));
                    } else {
                        vertex(
                            (+x),
                            (-y) * 0.8);
                    }
                }

                if (engine.config.mode === WEBGL) {
                    // m.computeFaces();
                    m.mode = LINES;
                    model(m);
                } else {
                    endShape();
                }
            }
            noLoop();

        }
    }

    mouseWheel(event) {
        this.zoom += deltaTime * Math.sign(event.deltaY) * this.zoom;
    }
}
