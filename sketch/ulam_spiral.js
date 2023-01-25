class UlamSpiral extends Sketch {
    setup() {
        background(colors.white);

        this.xp = CX;
        this.yp = CY;
        this.x = CX;
        this.y = CY;
        this.value = 1;
        this.stepTotal = 0;
        this.stepMax = 1;
        this.step = this.stepMax;
        this.stepSize = 8;
        this.direction = 0;
    }

    draw() {
        if (prime(this.value)) {
            // fontSize(this.stepSize);
            // textAlign(CENTER, CENTER);
            // text(this.value, this.x, this.y);
            fill(colors.white);
            circle(this.x, this.y, this.stepSize / 4);
        }

        strokeSize(0.5);
        line(this.x, this.y, this.xp, this.yp);

        this.xp = this.x;
        this.yp = this.y;

        switch (this.direction) {
            case 0:
                this.x += this.stepSize;
                break;
            case 1:
                this.y -= this.stepSize;
                break;
            case 2:
                this.x -= this.stepSize;
                break;
            case 3:
                this.y += this.stepSize;
                break;
        }

        this.step--;

        if (this.step === 0) {
            this.direction = (this.direction + 1) % 4;
            this.stepTotal++;
            if (this.stepTotal % 2 === 0) {
                this.stepMax++;
            }
            this.step = this.stepMax;
        }

        // if (this.value % 2 === 0) {
        //     this.stepMax++;
        //     if (this.value % (this.step1) === 0) {
        //         this.step = (this.step + 1) % 4;
        //     }
        // }

        this.value++;
    }
}
