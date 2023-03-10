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
        // TODO : implement number UI with slider
        object[name] = ifundef(object[name], ifundef(value, min));
    }

    integer(object, name, min, max, value) {
        // TODO : implement integer UI with slider
        object[name] = ifundef(object[name], ifundef(value, min));
    }

    action(label, callback) {
        let ui = new UI(label, callback);
        ui.folder = this.currentFolder;
        this.push(ui);
    }

    link() { }

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
}

class Params {
    constructor() {
        this.params = {};

        return new Proxy(this, {
            get(obj, key) {
                if (typeof (obj[key]) === 'function') {
                    return obj[key];
                }
                if (key === 'params') {
                    return obj.params;
                }
                return obj.params[key]?.value;
            },
            set(obj, key, value) {
                if (typeof (value) === 'table' && value in value) {
                    obj.params[key] = value;
                } else {
                    obj.params[key] = obj.params[key] || {};
                    obj.params[key].value = value;
                }
                return true;
            }
        })
    }

    addParams(params) {
        for (let param in params) {
            this[param] = params[param];
        }

    }
}