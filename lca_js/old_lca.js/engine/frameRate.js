class FrameRate extends Component {
    constructor() {
        super();
        this.frameRates = [];
    }

    update(dt) {
        this.frameRates.push(frameRate());
        if (this.frameRates.length > 100) {
            this.frameRates.shift();
        }
    }

    render() {
        let x = 100 - this.frameRates.length;
        let h = 18;
        noStroke();
        fill(0);
        rect(0, 0, 100, h);
        strokeWeight(1);
        noFill();
        for (let fps of this.frameRates) {
            if (fps > 50) {
                stroke(colors.green);
            } else {
                stroke(colors.red);
            }
            line(x, h, x, h - map(fps, 0, 60, 0, h));
            x++;
        }
    }
}