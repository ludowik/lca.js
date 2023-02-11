class Grid {
    constructor(w, h, defaulValue = null) {
        this.w = w;
        this.h = h || w;

        this.items = new Array(this.w * this.h);

        for (let i = 0; i < this.items.length; i++) {
            this.items[i] = defaulValue;
        }
    }

    valid(x, y) {
        if (x >= 0 && x < this.w &&
            y >= 0 && y < this.h) {
            return true;
        }
        return false;
    }

    offset(x, y) {
        return x + y * this.w;
    }

    set(x, y, item) {
        let offset = this.offset(x, y);
        this.items[offset] = item;
    }

    get(x, y) {
        let offset = this.offset(x, y);
        return this.items[offset];
    }

    forEach(f, param) {
        let i = 0;
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++, i++) {
                f(this.items[i], x, y, param);
            }
        }
    }

    render(f) {
        pushProps(); {
            let size = W / (this.w + 1);
            translate(
                CX - size * this.w / 2,
                CY - size * this.w / 2);

            this.forEach(f || this.renderCell, size);
        }
        popProps();
    }

    renderCell(cell, x, y, size) {
        rect(x * size, y * size, size, size);
    }
}
