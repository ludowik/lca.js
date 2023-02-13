class UI extends Entity {
    constructor(label, callback) {
        super();
        this.label = label;
        this.callback = callback;
        this.size = createVector(100, 22);
        this.position = createVector(W-this.size.x, H/2);        
    }

    draw() {
        fontSize(22);
        let size = textSize(this.label);

        blendMode(BLEND);

        fill(colors.black);
        rectMode(CORNER);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);

        fill(colors.white);
        textMode(CORNER);
        text(this.label, this.position.x + this.size.x - size.w, this.position.y);
    }

    mouseReleased(mouse) {
        if (this.callback) {
            this.callback();
        }
    }
}