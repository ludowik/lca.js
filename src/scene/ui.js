class UI extends Entity {
    constructor(label, callback) {
        super();
        this.label = label;
        this.callback = callback;
        this.size = createVector(100, 22);
        this.position = createVector(W-this.size.x, H/2);        
    }

    draw() {
        fill(colors.red);
        rectMode(CORNER);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);

        fontSize(22);
        fill(colors.green);
        textMode(CORNER);
        text(this.label, this.position.x, this.position.y);
    }

    mouseReleased(mouse) {
        if (this.callback) {
            this.callback();
        }
    }
}