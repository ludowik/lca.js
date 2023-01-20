class CircleRecursive extends Sketch {
    static { declareSketch(this) };
    
    setup() {
        this.angle = 0;
        colorMode(HSB, 1);
        this.params.color = false;
    }

    update(dt) {
        this.angle += dt;
    }

    render(x, y, radius, level = 0) {
        if (radius <= 3) { return; }
        pushMatrix();
        translate(x, y);
        rotate(this.angle * (level % 2 ? -1.5 : 1));
        if (this.params.color) {
            fill(level % 2 ? radius / (W / 2) : 1 - radius / (W / 2), 0.5, 1);
        } else {
            fill(level % 2 ? colors.white : colors.black);
        }
        circle(0, 0, radius);
        level++;
        this.render(- radius / 2, 0, radius / 2, level);
        this.render(+ radius / 2, 0, radius / 2, level);
        this.render(0, - radius * 2 / 3, radius / 3, level);
        this.render(0, + radius * 2 / 3, radius / 3, level);
        popMatrix();
    }

    draw() {
        background(colors.green);
        noStroke();
        this.render(W / 2, H / 2, W / 2);
    }
}
