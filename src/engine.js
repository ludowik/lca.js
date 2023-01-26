var engine, sketch;

var W = 0, H = 0;
var CX, CY;
var DeltaTime = 0, ElapsedTime = 0;
var minSize, minSizeFont;
var mouse = { x: 0, y: 0 };

var LEFT_ARROW = 'ArrowLeft';
var RIGHT_ARROW = 'ArrowRight';
var DOWN_ARROW = 'ArrowDown';
var UP_ARROW = 'ArrowUp';

class Engine {
    constructor() {
        this.load();

        this.frameTime = new FrameTime();

        this.params = {};
        this.params.sketches = sketches;
        this.params.sketchName = this.params.sketches[this.params.sketches.length - 1];
        this.params.topLeft = true;
        this.params.autotest = false;

        this.initGui();
    }

    load() {
        this.gl = this.initWebGLContext();

        W = this.gl.drawingBufferWidth;
        H = this.gl.drawingBufferHeight;

        CX = W / 2;
        CY = H / 2;

        minSize = Math.min(W, H);
        minSizeFont = minSize / 24;

        this.graphics = new Graphics(this.gl);

        this.canvas.addEventListener("click", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("dblclick", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mousedown", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mousemove", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mouseup", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mouseenter", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mouseover", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mouseleave", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("wheel", (evt) => { this.mouseEvent(evt); }, { passive: false });

        document.addEventListener('keydown', (evt) => { this.keyboardEvent(evt); });
    }

    initGui() {
        if (!this.gui) {
            this.gui = new dat.gui.GUI({
                name: 'Parameters',
                width: 250,
                hideable: true,
                closeOnTop: true,
            });

            this.gui.domElement.id = 'gui';
            this.gui.domElement.style = 'position: absolute; left: ' + (W - 250) + 'px;';

            this.gui.useLocalStorage = true;
            this.gui.remember(this.params);

            this.gui.updateDisplay = (name) => {
                // TODO
            };

            this.guiGlobals = this.gui.addFolder('engine');
            this.guiGlobals.open();

            this.guiGlobals.add(this.params, 'autotest');
            this.guiGlobals.add(this.params, 'topLeft');
            this.guiSketchSelecter = this.guiGlobals.add(this.params, 'sketchName', this.params.sketches).onChange((controller) => {
                setSketch(this.params.sketchName);
            });
        }

        if (!sketch) return;

        if (this.guiFolder) {
            this.gui.removeFolder(this.guiFolder);
        }

        if (Object.keys(sketch.params).length > 0) {
            this.guiFolder = this.gui.addFolder(this.params.sketchName);
            this.guiFolder.open();

            for (let param in sketch.params) {
                let value = sketch.params[param];
                switch (typeof (value)) {
                    case 'object': {
                        if (value instanceof Array) {
                            //this.guiFolder.add(sketch.params, param);

                        } else if (value instanceof Color) {
                        } else {
                            this.guiFolder.add(value, 'value',
                                value.min || 1,
                                value.max || 100,
                                value.step || 1);
                        }
                        break;
                    }
                    default: {
                        this.guiFolder.add(sketch.params, param, 1, 100);
                        break;
                    }
                }
            }
        } else {
            this.guiFolder = null;
        }
    }

    mouseEvent(evt) {
        // evt.preventDefault();

        mouse.x = evt.clientX;
        mouse.y = evt.clientY;

        // console.log(evt.type);

        switch (evt.type) {
            case 'mousedown': {
                mouse.start = {
                    x: mouse.x,
                    y: mouse.y,
                };
                break;
            }
            case 'mouseup': {
                mouse.stop = {
                    x: mouse.x,
                    y: mouse.y,
                };
                sketch.mouseReleased();
                break;
            }
            case 'wheel': {
                console.log(evt.deltaX);
                break;
            }
        }

        evt.returnValue = false;
    }

    keyboardEvent(evt) {
        if (evt.key === 'n') {
            this.nextSketch();
        }

        sketch.keyPressed(evt.key, evt.key);
    }

    initWebGLContext() {
        this.canvas = document.getElementById("canvas");
        this.canvas.focus();

        this.resizeCanvas(this.canvas);

        let gl = this.canvas.getContext("webgl2", {
            preserveDrawingBuffer: true
        });

        if (gl && gl instanceof WebGL2RenderingContext) {
            return gl;
        }

        console.log("WebGL context not available");
    }

    resizeCanvas(canvas) {
        var platform = window.navigator?.userAgentData?.platform || window.navigator?.platform;
        var iosPlatforms = ['iPhone', 'iPad', 'iPod',];
        if (iosPlatforms.indexOf(platform) !== -1) {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        } else {
            canvas.height = window.innerHeight;
            canvas.width = window.innerHeight * 9 / 16;
        }
    }

    beforeDraw() {
        let gl = getContext();

        sketch.fb.bindFramebuffer();

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        if (true) {
            gl.disable(gl.DEPTH_TEST);

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        } else {
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);

            gl.disable(gl.BLEND);
        }

        resetMatrix();
        ortho();

        if (getOrigin() == TOP_LEFT) {
            translate(0, H);
            scale(1, -1);
        }
    }

    afterDraw() {
        sketch.fb.unbindFrameBuffer();

        let gl = getContext();

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ZERO);

        resetMatrix();
        ortho();

        stroke(colors.white);
        fill(colors.white);

        sprite(sketch.fb, 0, 0, W, H);
    }

    frame(timestamp) {
        DeltaTime = this.frameTime.deltaTime;
        ElapsedTime = this.frameTime.ElapsedTime;

        this.update(DeltaTime);

        this.beforeDraw();
        this.draw();
        this.afterDraw();
    }

    update(dt) {
        sketch.update(dt);
    }

    draw() {
        sketch.draw();
    }

    nextSketch() {
        let nextIndex = sketches.indexOf(this.params.sketchName) + 1;
        let nextItem = sketches[nextIndex] || sketches[0];
        setSketch(nextItem);
    }

    requestRender(forceRender) {
        window.requestAnimationFrame(() => {
            if (this.params.autotest) {
                if (!sketch.nFrames) {
                    sketch.nFrames = 10;
                }
                sketch.nFrames--;
                if (sketch.nFrames === 0) {
                    this.nextSketch();
                }
            }

            if (sketch.loop || forceRender) {
                this.frame();
                this.frameTime.frame();
            }

            this.requestRender();
        });
    }
}

// TODO
function getContext() {
    return engine.gl;
}

function setContext(context) {
    if (context) {
        context.bindFramebuffer();
    } else {
        sketch.fb.bindFramebuffer();
    }
}

function reload() {
    let href = location.protocol + '//' + location.hostname + ':' + location.port + location.pathname + '?version=' + Date.now();
    location.replace(href);
}

function requestFullScreen() {
    var body = document.body;
    var requestMethod = body.requestFullScreen
        || body.webkitRequestFullScreen
        || body.mozRequestFullScreen
        || body.msRequestFullScreen;

    if (requestMethod) {
        requestMethod.call(body);
    }
}

function toggleFullscreen() {
    if (document.fullscreenEnabled) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            requestFullScreen();
        }
    } else {
        alert("Fullscreen is not supported!");
    }
}

function frameRate() {
    return engine.frameTime.fps;
}

var TOP_LEFT = 'top_left';
var BOTTOM_LEFT = 'bottom_left';
function getOrigin() {
    return engine.params.topLeft ? TOP_LEFT : BOTTOM_LEFT;
}

function loop() {
    sketch.loop = true;
}

function noLoop() {
    sketch.loop = false;
}

function redraw() {
    engine.requestRender(true);
}

var sketchesRef = {};
function setSketch(name) {
    if (sketch) {
        sketch.pause();
    }

    engine.params.sketchName = name;
    engine.guiSketchSelecter?.updateDisplay();

    if (!sketchesRef[name]) {
        sketchesRef[name] = eval('new ' + name + '()');
        sketch = sketchesRef[name];
        engine.beforeDraw();
        sketch.setup();
        engine.afterDraw();
    } else {
        sketch = sketchesRef[name];
        sketch.resume();
    }

    engine.initGui();
}

function run() {
    engine = new Engine();
    setSketch(engine.params.sketchName);

    engine.requestRender(true);
}
