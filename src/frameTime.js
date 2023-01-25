class FrameTime {
    constructor() {
        this.beginTime = this.second();
        this.endTime = this.beginTime;
        this.deltaTime = 0;
        this.ElapsedTime = 0;
        this.fps = 0;
        this.delay = 0;
        this.frameCount = 0;
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
        this.ElapsedTime += this.deltaTime;

        this.frameCount++;

        this.delay += this.deltaTime;

        if (this.delay >= 1) {
            this.fps = this.frameCount;
            this.delay = 0;
            this.frameCount = 0;

            this.fpsUI = document.getElementById("fps");
            this.fpsUI.innerHTML = this.fps;
        }
    }

    frame() {
        this.end();
        this.begin();
    }
}
