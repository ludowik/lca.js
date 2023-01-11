class BrickBreaker extends Sketch {
    init() {
        this.scene = new Scene();

        this.ball = new Ball();
        this.scene.push(this.ball);

        this.bricks = new Node();
        this.bricks.push(new BrickMouse());
        let x = 20, y = 20;
        let w = 60, h = 20;
        let marge = 5;
        for (const i of index(4)) {
            x = 20;
            for (const j of index(7)) {
                this.bricks.push(new Brick(
                    x + j * (w + marge),
                    y + i * (h + marge), w, h));
            }
        }
        this.scene.push(this.bricks);
    }

    step(dt) {
        this.scene.update(dt);

        for (const brick of this.bricks) {
            //brick.update(dt);
            if (this.collide(this.ball, brick)) {
                this.reaction(this.ball, brick);
                brick.life--;
            }
        }

        for (let i = this.bricks.length - 1; i >= 0; i--) {
            const brick = this.bricks[i];
            if (brick.life <= 0) {
                this.bricks.splice(i, 1);
            }
        }
    }

    collide(circle, rect) {
        let cx = circle.position.x;
        let cy = circle.position.y;

        let testX = cx;
        let testY = cy;
        let rx = rect.position.x;
        let ry = rect.position.y;
        let rw = rect.size.x;
        let rh = rect.size.y;

        if (cx < rx) testX = rx; // left edge
        else if (cx > rx + rw) testX = rx + rw; // right edge

        if (cy < ry) testY = ry; // top edge
        else if (cy > ry + rh) testY = ry + rh; // bottom edge

        let distX = cx - testX;
        let distY = cy - testY;
        let distance = sqrt((distX * distX) + (distY * distY));

        if (distance <= circle.radius) {
            return true;
        }
        return false;
    }

    reaction(circle, rect) {
        if (circle.position.y <= rect.position.y) {
            circle.speed.y *= -1;
            circle.position.y = rect.position.y - circle.radius;

        } else if (circle.position.y >= rect.position.y + rect.size.y) {
            circle.speed.y *= -1;
            circle.position.y = rect.position.y + rect.size.y + circle.radius;

        } else if (circle.position.x <= rect.position.x) {
            circle.speed.x *= -1;
            circle.position.x = rect.position.x - circle.radius;

        } else if (circle.position.x >= rect.position.x + rect.size.x) {
            circle.speed.x *= -1;
            circle.position.x = rect.position.x + rect.size.x + circle.radius;
        }

        if (rect.isPlayer) {
            let m = rect.size.x / 2;
            let dx = (circle.position.x - (rect.position.x + m)) / m;
            circle.speed.rotate(dx * PI / 8);
        }
    }

    render() {
        background(colors.black);
        this.scene.render();
    }

    mousePressed() {
        redraw();
    }
}

class Ball extends Entity {
    constructor() {
        super();
        this.position = createVector(xc, yc);
        this.speed = random2D(width);
        this.radius = 8;
    }

    update(dt) {
        this.previousPosition = this.position.copy();
        this.position.add(this.speed.copy().mult(dt));

        if (this.position.x >= width - this.radius) {
            let dx = this.position.x - (width - this.radius);
            this.speed.x *= -1;
            this.position.x = width - this.radius - dx;

        } else if (this.position.x < this.radius) {
            let dx = this.radius - this.position.x;
            this.speed.x *= -1;
            this.position.x = this.radius + dx;
        }

        if (this.position.y >= height - this.radius) {
            let dy = this.position.y - (height - this.radius);
            this.speed.y *= -1;
            this.position.y = height - this.radius - dy;

        } else if (this.position.y < this.radius) {
            let dy = this.radius - this.position.y;
            this.speed.y *= -1;
            this.position.y = this.radius + dy;
        }
    }

    render() {
        let direction = p5.Vector.sub(this.position, this.previousPosition).normalize().mult(5);

        fill('grey');
        circle(this.position.x - direction.x, this.position.y - direction.y, this.radius * 2);

        fill('white');
        circle(this.position.x, this.position.y, this.radius * 2);
    }
}

class Brick extends Entity {
    constructor(x, y, w, h) {
        super();
        this.position = createVector(x, y);
        this.size = createVector(w, h);
        this.life = 1;
    }

    render() {
        fill(colors.blue);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}

class BrickMouse extends Brick {
    constructor() {
        super(width / 2, height * 0.8, width / 4, 10);
        this.life = Math.MAX_VALUE;
        this.isPlayer = true;
    }

    update() {
        this.position.x = mouseX - this.size.x / 2;
    }
}

setSketch(BrickBreaker);
