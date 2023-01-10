class Entity {
    constructor() {
    }

    toString() {
        return this.constructor.name;
    }

    setup() { }

    update(dt) { 
        if (this.step) {
            return this.step(dt);
        }
    }
    
    draw() { }
} 

class Sketch extends Entity {
    constructor() {
        super();
        this.params = {};
    }
}
