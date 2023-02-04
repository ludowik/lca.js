class Entity {
    constructor() {
    }

    toString() {
        return this.constructor.name;
    }

    setup() {
    }

    pause() {
    }

    resume() {
    }

    update(dt) {
        if (this.step instanceof Function) {
            return this.step(dt);
        }
    }

    draw() {
    }

    contains(x, y) {
        if (x > this.position.x && x < this.position.x + this.size.x &&
            y > this.position.y && y < this.position.y + this.size.y) {
            return true;
        }
        return false;
    }

    mouseReleased() {
    }

    keyPressed(keyCode, key) {
    }
}
