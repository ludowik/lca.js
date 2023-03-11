class Node extends UI {
    constructor(label) {
        super(label);

        this.items = [];
        this.margeIn = 10;
    }

    push(item) {
        this.items.push(item);
    }

    update(dt) {
        for (const item of this.items) {
            item.update(dt);
        }
    }

    draw(x, y) {
        for (const item of this.items) {
            item.draw();
        }
    }

    mouseReleased() {
        for (const item of this.items) {
            if (item.folder && !item.folder.open) continue;
            if (item.contains(mouse.x, mouse.y)) {
                item.mouseReleased(mouse);
                return true;
            }
        }
    }
}
