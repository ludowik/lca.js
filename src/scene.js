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

    mouseReleased() {
    }

    keyPressed(keyCode, key) {
    }
}

class Node extends Entity {
    constructor() {
        super();
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    update(dt) {
        for (const item of this.items) {
            item.update(dt);
        }
    }

    draw() {
        for (const item of this.items) {
            item.draw();
        }
    }
}

class Scene extends Node {
    constructor() {
        super();
    }
}
