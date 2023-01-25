class Trees extends Sketch {
    setup() {
        noLoop();
        this.params.reset = () => redraw();
        this.params.branches = { value: 2, max: 6 };
    }

    line(ax, ay, aa, x, y, a, l, level) {
        if (level === 0) {
            return;
        }

        push();

        translate(x, y);
        rotate(a);

        strokeSize(level);
        if (l > 10) {
            stroke(155 / 255, 103 / 255, 60 / 255, 1);//, level / 10);
        } else {
            stroke(0, 1, 0, 1);//level / 10);
        }

        vertex(ax, ay);
        aa += a;
        ax += sin(-aa) * l;
        ay += cos(-aa) * l;
        vertex(ax, ay);

        line(0, 0, 0, l);

        level--;

        this.line(ax, ay, aa, 0, l, -PI / random(4, 8), l * random(0.3, 0.8), level);
        this.line(ax, ay, aa, 0, l, +PI / random(4, 8), l * random(0.3, 0.8), level);

        for (const i of range(this.params.branches.value)) {
            this.line(ax, ay, aa, 0, l, random(-PI / 4, PI / 4), l * random(0.5, 0.8), level);
        }

        pop();
        this.count++;
    }

    draw() {
        background(colors.black);
        scale(1, -1);
        translate(0, -H * 0.95);

        beginShape(LINES);
        this.count = 0;
        let l = random(4, 8);
        this.line(CX, 0, 0, CX, 0, 0, H / l, 8);

        //translate(0, H / 2);
        stroke(colors.blue);

        endShape();
    }
}
