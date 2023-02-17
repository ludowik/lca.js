var engine, sketch, parameter;

var W = 0, H = 0;
var CX, CY;
var DeltaTime = 0, elapsedTime = 0;
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
        this.paramsOfParams = {};

        this.params.sketchName = sketches[2];
        this.paramsOfParams.sketchName = {
            list: sketches,
            onchange: (controller) => {
                setSketch(this.params.sketchName);
            },
        };

        this.params.topLeft = true;
        this.params.autotest = false;
        this.params.smooth = false;

        parameter = new Parameter();
        parameter.action('reload', reload);
        parameter.watch(this.frameTime, 'fps');
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

        this.addEventListeners();
    }

    addEventListeners() {
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

            this.addGui(this.guiGlobals, this.params, this.paramsOfParams);
        }

        if (!sketch) return;

        if (this.guiFolder) {
            this.gui.removeFolder(this.guiFolder);
        }

        if (Object.keys(sketch.params).length > 0) {
            this.guiFolder = this.gui.addFolder(this.params.sketchName);
            this.guiFolder.open();

            this.addGui(this.guiFolder, sketch.params, []);
        } else {
            this.guiFolder = null;
        }
    }

    addGui(folder, params, paramsOfParams) {
        for (let paramName in params) {
            let param = params[paramName];
            switch (typeof (param)) {
                case 'object': {
                    if (param instanceof Array) {
                        //folder.add(params, param);

                    } else if (param instanceof Color) {
                        const __param = {};
                        __param[key] = {
                            r: param.r * 255,
                            g: param.g * 255,
                            b: param.b * 255
                        };
                        folder.addColor(__param, key).onChange(() => {
                            param.r = __param[key].r / 255;
                            param.g = __param[key].g / 255;
                            param.b = __param[key].b / 255;
                        });

                    } else {
                        folder.add(param, 'value',
                            param.min || 1,
                            param.max || 100,
                            param.step || 1);
                    }
                    break;
                }
                default: {
                    if (paramsOfParams[paramName]) {
                        let controler = folder.add(
                            params,
                            paramName,
                            paramsOfParams[paramName].list);

                        if (paramsOfParams[paramName].onchange)
                            controler.onChange(paramsOfParams[paramName].onchange);

                    } else {
                        folder.add(params, paramName, 1, 100);
                    }
                    break;
                }
            }
        }
    }

    mouseEvent(evt) {
        evt.preventDefault();

        mouse.x = evt.clientX;
        mouse.y = evt.clientY;

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
                parameter.mouseReleased();
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
            preserveDrawingBuffer: true,
            antialias: true,
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

        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
    }

    beforeDraw() {
        let gl = getContext();

        sketch.fb.bindFramebuffer();

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        if (true) {
            gl.disable(gl.DEPTH_TEST);

            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        } else {
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);

            gl.disable(gl.BLEND);
        }

        if (this.params.smooth) {
            gl.enable(gl.LINE_SMOOTH);
            gl.enable(gl.POLYGON_SMOOTH);

            gl.hint(gl.LINE_SMOOTH_HINT, gl.NICEST);
            gl.hint(gl.POLYGON_SMOOTH_HINT, gl.NICEST);
        } else {
            gl.disable(gl.LINE_SMOOTH);
            gl.disable(gl.POLYGON_SMOOTH);
        }

        this.resetGraphics(true);
    }

    resetGraphics(origin) {
        resetMatrix();
        resetStyles();

        ortho();

        if (origin && getOrigin() == TOP_LEFT) {
            translate(0, H);
            scale(1, -1);
        }
    }

    afterDraw() {
        this.resetGraphics(true);
        parameter.draw();
        this.resetGraphics(false);

        sketch.fb.unbindFrameBuffer();
        let gl = getContext();
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ZERO);

        stroke(colors.white);
        fill(colors.white);

        sprite(sketch.fb, 0, 0, W, H);
    }

    frame(timestamp) {
        DeltaTime = this.frameTime.deltaTime;
        elapsedTime = this.frameTime.elapsedTime;

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
        pushMatrix();
        pushStyles();
        resetMatrix();
        resetStyles();
        context.bindFramebuffer();
    } else {
        sketch.fb.bindFramebuffer();
        popMatrix();
        popStyles();
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

function setOrigin(origin) {
    engine.params.topLeft = origin;
}

function supportedOrientations() {
    // TODO
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
        sketchesRef[name] = eval('new ' + name);
        sketch = sketchesRef[name];
        engine.beforeDraw();
        sketch.setup();
        engine.afterDraw();
    } else {
        sketch = sketchesRef[name];
        sketch.resume();
    }

    console.clear();

    engine.initGui();
}

function run() {
    engine = new Engine();
    engine.initGui();
    
    setSketch(engine.params.sketchName);

    engine.requestRender(true);
}
