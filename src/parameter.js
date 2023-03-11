function ifundef(v, def) {
    if (v === undefined) {
        return def;
    }
    return v;
}

class Bind {
    constructor(object, name) {
        this.object = object;
        this.name = name;
    }

    toString() {
        return this.object[this.name];
    }
}

class Parameter extends Scene {
    constructor() {
        super();
        this.position = createVector(W - 100, H / 2);
    }

    draw() {
        if (getOrigin() == BOTTOM_LEFT) {
            translate(0, H);
            scale(1, -1);
        }
        super.draw();
    }

    push(parameter) {
        if (this.items.length === 0) {
            parameter.position.x = W - 100;
            parameter.position.y = H / 2;
        } else {
            let previous = this.items[this.items.length - 1];
            parameter.position.x = previous.position.x;
            parameter.position.y = previous.position.y + previous.size.y + 10;
        }
        super.push(parameter);
    }

    folder(name) {
        let ui = new UI(name, (ui) => {
            ui.open = !ui.open;
        });
        ui.open = true;
        ui.folder = this.currentFolder;
        this.push(ui);

        this.currentFolder = ui;
    }

    watch(object, name) {
        let ui = new UI(new Bind(object, name));
        ui.folder = this.currentFolder;
        this.push(ui);
    }

    number(object, name, min, max, value) {
        // TODO
        object[name] = ifundef(object[name], ifundef(value, min));
    }

    integer(object, name, min, max, value) {
        // TODO
        object[name] = ifundef(object[name], ifundef(value, min));
    }

    action(label, callback) {
        let ui = new UI(label, callback);
        ui.folder = this.currentFolder;
        this.push(ui);
    }

    link() { }
}
