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

    mouseReleased() {
        for (const item of this.items) {
            if (item.contains(mouse.x, mouse.y)) {
                item.mouseReleased(mouse);
            }
        }
    }
}
