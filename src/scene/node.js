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
        this.drawLabel(this);

        x = x || this.position.x;
        y = y || this.position.y + this.size.h;

        for (const item of this.items) {
            if (item.folder && !item.folder.open) continue;
            item.position.set(x, y);
            item.draw(x, y);
            y += item.size.h + this.margeIn;
        }
    }

    mouseReleased() {
        for (const item of this.items) {
            if (item.folder && !item.folder.open) continue;
            if (item.contains(mouse.x, mouse.y)) {
                item.mouseReleased(mouse);
            }
        }
    }
}
