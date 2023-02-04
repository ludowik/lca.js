let engine, width, height, W, H, xc, yc, minSize, minSizeFont, deltaTime, elapsedTime, renderCount, mouseX, mouseY;

function setSketch(template, param = null) {
    const params = new URLSearchParams(document.currentScript.id || '');
    let name = params.get("sketch");
    let category = params.get("category");
    return new Engine(category, name, template, param);
}

class Engine {
    constructor(category, name, template = Sketch, param = null) {
        this.category = category;
        this.name = name;
        this.template = template;
        this.param = param;

        this.sketch = null;

        this.p5instance = p5Sketch(this);

        p5_setup(this);
        engine = this;
        this.components = new Node();
        this.components.push(new Colors());
        this.components.push(new FrameRate());

        this.computeSize();
    }

    computeSize() {
        this.targetWidth = Math.round(Math.min(
            this.p5instance.windowHeight / 2 - 12,
            this.p5instance.windowWidth));

        this.targetHeight = Math.round(
            this.targetWidth * 4 / 3);

        width = this.targetWidth;
        height = this.targetHeight;
    }

    preload() {
        this.font = this.p5instance.loadFont("assets/cour.ttf");
        this.sketch = new this.template(this.param);
    }

    setup() {
        this.components.setup();

        if (getInCatalog()) {
            this.drawFrames = 0;
            this.zoom = 0.2;
        } else {
            this.zoom = 1;
        }

        this.config = {
            w: this.targetWidth,
            h: this.targetHeight,
            mode: this.p5instance.P2D,
            renderCount: 1
        };

        this.sketch.setup(this.config);

        this.hasMoved = false;
        this.sketch.mouseIn = false;

        this.canvas = createCanvas(
            this.config.w * this.zoom,
            this.config.h * this.zoom,
            this.config.mode);

        let canvas;
        if (this.category && this.category.length > 0) {
            canvas = document.getElementById("canvas_" + this.category);
            if (!canvas) {
                canvas = document.createElement('div');
                canvas.id = "canvas_" + this.category;
                canvas.innerHTML = this.category + '<br>';
                document.getElementById("canvas").appendChild(canvas);
            }
        }
        else {
            canvas = document.getElementById("canvas");
        }
        this.canvas.parent(canvas);

        background(colors.black);

        this.setProperties();
        this.sketch.init(this.config);

        this.components.push(this.sketch.gui);

        if (this.sketch.params) {
            gui.addObject(this.sketch.paramsDefault);
            gui.addObject(this.sketch.params);
        } else {
            gui.addObject(this.sketch);
        }

        deltaTime = 0;
        elapsedTime = 0;

        renderCount = 0;

        noiseSeed(6546834.645);
    }

    setProperties() {
        width = this.config.w;
        height = this.config.h;

        W = width;
        H = height;

        xc = width / 2;
        yc = height / 2;

        minSize = Math.min(width, height);
        minSizeFont = minSize / 24;

        this.p5instance.stroke(colors.white);
        this.p5instance.strokeWeight(1);

        this.p5instance.noFill();

        this.p5instance.textSize(minSizeFont);
        this.p5instance.textFont(this.font);
        this.p5instance.textAlign(LEFT, TOP);
    }

    update(dt) {
        this.updateSketch(this.sketch, dt);
        this.components.update(dt);
    }

    updateSketch(sketch, dt) {
        sketch.updateSketch(dt);
    }

    render() {
        if (this.drawFrames !== undefined) {
            if (this.drawFrames-- === 0) {
                noLoop();
            }
        }

        if (!this.sketch.paused) {
            deltaTime = this.p5instance.deltaTime / 1000.;
            this.update(deltaTime);
        }

        // render sketch
        this.drawSketch();

        // render info
        push(); {
            resetMatrix();
            if (this.config.mode === WEBGL) {
                ortho(0, width, -height, 0, 0, 1);
            } else {
                scale(this.zoom, this.zoom);
            }

            if (getInCatalog()) {
                this.drawSketchName();
            }

            this.components.render();
        }
        pop();
    }

    drawSketch() {
        this.setProperties();

        for (let i = 0; i < this.config.renderCount; i++) {
            renderCount++;

            scale(this.zoom, this.zoom);
            push(); {
                this.sketch.render(deltaTime / this.config.renderCount);
            }
            pop();
        }
    }

    drawSketchName() {
        let h = minSizeFont * 4;
        textSize(h);
        let w = textWidth(engine.name);

        noStroke();
        textAlign(RIGHT, BOTTOM);

        fill(colors.white);
        rect(width - 5 - w, height - 5 - h, w, h);

        fill(colors.gray);
        text(engine.name, width - 5, height - 5);
    }
}

function p5Sketch(_engine) {
    return new p5(function (p5) {
        p5.engine = _engine;

        p5.preload = function () {
            engine = p5.engine;
            engine.preload();
        };

        p5.setup = function () {
            engine = p5.engine;
            engine.setup();
        };

        p5.draw = function () {
            engine = p5.engine;
            engine.render();
        };

        p5.mouseAction = function (f_in = null, f_out = null) {
            engine = p5.engine;
            mouseX = engine.p5instance.mouseX / engine.zoom;
            mouseY = engine.p5instance.mouseY / engine.zoom;
            if (engine.sketch) {
                if (mouseX >= 0 && mouseX < width &&
                    mouseY >= 0 && mouseY < height) {
                    if (f_in) f_in();
                } else {
                    if (f_out) f_out();
                }
            }
        };

        p5.mouseMoved = function () {
            p5.engine.hasMoved = true;
            p5.mouseAction(
                () => {
                    if (getInCatalog() && engine.sketch.mouseIn === false) {
                        engine.sketch.mouseIn = true;
                        loop();
                    }
                    engine.sketch.mouseMoved();
                },
                () => {
                    if (getInCatalog() && engine.sketch.mouseIn === true) {
                        engine.sketch.mouseIn = false;
                        noLoop();
                    }
                });
        };

        p5.mousePressed = function () {
            p5.engine.hasMoved = false;
            p5.mouseAction(
                () => {
                    engine.sketch.mousePressed();

                    engine.startMouseX = mouseX;
                    engine.startMouseY = mouseY;
                });
        };

        p5.mouseReleased = function () {
            p5.mouseAction(
                () => {
                    if (getInCatalog() && !p5.engine.hasMoved) {
                        window.location.search = '?sketch=' + engine.name;
                        return;
                    }

                    engine.sketch.mouseReleased();

                    engine.endMouseX = mouseX;
                    engine.endMouseY = mouseY;

                    engine.deltaMouseX = engine.endMouseX - engine.startMouseX;
                    engine.deltaMouseY = engine.endMouseY - engine.startMouseY;

                    const deltaMin = 10;
                    if (abs(engine.deltaMouseX) < abs(engine.deltaMouseY) / 2) {
                        if (engine.deltaMouseY >= deltaMin) {
                            engine.sketch.keyPressed(DOWN_ARROW);

                        } else if (engine.deltaMouseY < -deltaMin) {
                            engine.sketch.keyPressed(UP_ARROW);

                        }

                    } else if (abs(engine.deltaMouseY) < abs(engine.deltaMouseX) / 2) {
                        if (engine.deltaMouseX >= deltaMin) {
                            engine.sketch.keyPressed(RIGHT_ARROW);

                        } else if (engine.deltaMouseX < -deltaMin) {
                            engine.sketch.keyPressed(LEFT_ARROW);

                        }

                    }
                });
        };

        p5.mouseClicked = function () {
            p5.mouseAction(
                () => {
                    if (getInCatalog()) {
                    } else {
                        engine.sketch.mouseClicked();
                    }
                });
        };

        p5.mouseDragged = function () {
            p5.engine.hasMoved = true;
            p5.mouseAction(
                () => {
                    if (getInCatalog()) {
                    } else {
                        engine.sketch.mouseDragged();
                    }
                });
        };

        p5.mouseWheel = function (event) {
            p5.mouseAction(
                () => {
                    if (getInCatalog()) {
                    } else {
                        engine.sketch.mouseWheel(event);
                    }
                });
        };

        p5.keyPressed = function () {
            engine = p5.engine;
            if (engine.sketch) {
                if (getInCatalog()) {
                } else {
                    engine.sketch.keyPressed(engine.p5instance.keyCode, engine.p5instance.key);
                }
            }
        };
    });
}

