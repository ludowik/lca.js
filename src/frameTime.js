class FrameTime {
    constructor() {
        this.beginTime = this.second();
        this.endTime = this.beginTime;
        this.deltaTime = 0;
        this.elapsedTime = 0;
    }

    second() {
        return Date.now() / 1000;
    }

    begin() {
        this.beginTime = this.second();
    }

    end() {
        this.endTime = this.second();
        this.deltaTime = this.endTime - this.beginTime;
        this.elapsedTime += this.deltaTime;
    }

    frame() {
        this.end();
        this.begin();
    }
}
