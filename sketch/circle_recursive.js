class CircleRecursive extends Sketch {
    init() {
        this.angle = 0;
        colorMode(HSB, 1);
        this.params.color = false;
    }

    update(dt) {
        this.angle += dt;
    }

    draw(x, y, radius, level = 0) {
        if (radius <= 3) { return; }
        push();
        translate(x, y);
        rotate(this.angle * (level % 2 ? -1.5 : 1));
        if (this.params.color) {
            fill(level % 2 ? radius / (W / 2) : 1 - radius / (W / 2), 0.5, 1);
        } else {
            fill(level % 2 ? 1 : 0);
        }
        circle(0, 0, radius);
        level++;
        this.draw(- radius / 2, 0, radius / 2, level);
        this.draw(+ radius / 2, 0, radius / 2, level);
        this.draw(0, - radius * 2 / 3, radius / 3, level);
        this.draw(0, + radius * 2 / 3, radius / 3, level);
        pop();
    }

    render() {
        background(colors.green);
        noStroke();
        this.draw(xc, yc, W / 2);
    }
}
