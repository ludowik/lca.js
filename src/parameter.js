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
        this.position = createVector(W, H / 2);
    }

    push(parameter) {
        if (this.items.length === 0) {
            parameter.position.x = W - 100;
            parameter.position.y = H / 2;
        } else {
            let previous = this.items[this.items.length - 1];
            parameter.position.x = previous.position.x;
            parameter.position.y = previous.position.y + previous.size.y;
        }
        super.push(parameter);
    }

    watch(object, name) {
        this.push(new UI(new Bind(object, name)));
    }

    number(name, min, max, value) {
        globalThis[name] = ifundef(globalThis[name], ifundef(value, min));
    }

    integer(name, min, max, value) {
        globalThis[name] = ifundef(globalThis[name], ifundef(value, min));
    }

    action(label, callback) {
        this.push(new UI(label, callback));
    }

    link() { }
}
