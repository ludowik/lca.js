class Sketch {
    constructor() {
        this.initGui();
        this.preload();
    }

    initGui() {
        this.gui = createGUI();
        this.paramsDefault = {
            name: engine.name,
            pause: () => {
                if (isLooping()) {
                    noLoop();
                    this.paused = true;
                } else {
                    loop();
                    this.paused = false;
                }
            }
        };
        this.params = {};
    }

    preload() {
    }

    setup(config) {
    }

    init(config) {
        if (typeof init == 'function') return init(config);
    }

    reset() {
        this.init();
    }

    updateSketch(dt, et) {
        if (typeof this.step === 'function') {
            let nStep = this.nStep || 10;
            let dt = deltaTime / nStep;
            for (let index = 0; index < nStep; index++) {
                elapsedTime += dt;
                this.step(dt, elapsedTime);
            }
        }
        else {
            elapsedTime += deltaTime;
            this.update(deltaTime, elapsedTime);
        }
    }

    update(dt, et) {
        if (typeof update == 'function') {
            update(dt, et);
        }
    }

    // step(dt, et) {
    //     if (typeof step == 'function') {
    //         step(dt, et);
    //     }
    // }

    render() {
        if (typeof render == 'function') {
            render();

        } else if (typeof this.draw == 'function') {
            let nStep = this.nStep || 10;
            for (let index = 0; index < nStep; index++) {
                this.draw();
            }

        } else {
            background(colors.white);
            fill(colors.gray);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(24);

            if (engine.config.mode === WEBGL) {
                background(colors.gray);
                text('sketch', 0, 0);
            } else {
                text('sketch', xc, yc);
            }
        }
    }

    mouseMoved() {
    }

    mousePressed() {
    }

    mouseReleased() {
    }

    mouseClicked() {
    }

    mouseDragged() {
    }

    keyPressed() {
    }
}
