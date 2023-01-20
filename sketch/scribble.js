class Scribble extends Sketch {
    init(config) {
        config.renderCount = 100;
    }

    update(dt, elapsedTime) {
    }

    render() {
        let w = width / 2;
        let v = renderCount / 1000;

        blendMode(BLEND);

        translate(xc, yc);
        rotate(noise(v / 10) * TAU);

        let c = noise(v + 952.74);

        let r = noise(v + 92.74);
        let g = noise(v + 5.74);
        let b = noise(v + 52.4);
        let a = noise(v + 43245.3463);

        noStroke();
        fill(r, g, b, 0.1);

        let x = noise(v + 1254.2) * 2 - 1;
        let y = noise(v + 34.356) * 2 - 1;

        let radius = noise(v + 693.4566) * w / 5;

        circle(
            x * w,
            y * w,
            radius);

        x = (1 - Math.abs(x)) * Math.sign(x);
        y = (1 - Math.abs(y)) * Math.sign(y);

        noFill();

        strokeWeight(0.2);
        stroke(c, 0.5, 0.5, a);

        circle(
            x * w,
            y * w,
            radius);
    }
}

declareSketch(Scribble);
