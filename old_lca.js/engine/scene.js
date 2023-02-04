class Entity {
    constructor() {
    }

    setup() {
    }

    update(dt) {
    }

    render() {
    }
}

class Component extends Entity {
    constructor() {
        super();
    }

    push(attribs) {
        for (const [key, value] of Object.entries(attribs)) {
            this[key] = value;
        }
    }
}

class Node extends Array {
    constructor() {
        super();
    }

    setup() {
        for (const object of this) {
            if (object.setup) {
                object.setup();
            }
        }
    }

    update(dt) {
        for (const object of this) {
            if (object.update) {
                object.update(dt);
            }
        }
    }

    render() {
        for (const object of this) {
            if (object.render) {
                object.render();
            }
        }
    }
}

class Scene extends Node {
    constructor() {
        super();
    }
}
