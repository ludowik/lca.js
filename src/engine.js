var W = 0, H = 0;
var DeltaTime = 0, ElapsedTime = 0;

var engine, sketch;

class Engine {
    constructor() {
        this.load();
        this.frameTime = new FrameTime();
    }

    load() {
        this.gl = this.initWebGLContext();

        W = this.gl.drawingBufferWidth;
        H = this.gl.drawingBufferHeight;

        this.graphics = new Graphics(this.gl);

        this.gui = new dat.gui.GUI({
            name: 'Parameter',
        });
        this.gui.domElement.id = 'gui';

        this.params = {};

        this.canvas.addEventListener("click", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("dblclick", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mousedown", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mousemove", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mouseup", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mouseenter", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mouseover", (evt) => { this.mouseEvent(evt); });
        this.canvas.addEventListener("mouseleave", (evt) => { this.mouseEvent(evt); });
    }

    mouseEvent(evt) {
    }

    initWebGLContext() {
        this.canvas = document.getElementById("canvas");
        this.resizeCanvas(this.canvas);
        this.canvasContext = this.canvas.getContext('bitmaprenderer');

        this.offscreen = new OffscreenCanvas(0, 0);
        this.resizeCanvas(this.offscreen);

        let gl = this.offscreen.getContext("webgl2", {
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

    frame(timestamp) {
        DeltaTime = this.frameTime.deltaTime;
        ElapsedTime = this.frameTime.elapsedTime;

        update(this.deltaTime);

        let gl = this.gl;

        gl.viewport(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);

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

        draw();

        this.canvasContext.transferFromImageBitmap(this.offscreen.transferToImageBitmap());

        this.requestRender();
    }

    requestRender() {
        window.requestAnimationFrame(() => {
            engine.frame();
            this.frameTime.frame();
        });
    }
}

function getContext() {
    return engine.gl;
}

function setContext() {
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
            requestFullScreen?.();
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

window.onload = function () {
    engine = new Engine();
    engine.params.topLeft = true;

    engine.gui.add(engine.params, 'topLeft');

    sketch = new ComputePI();
    sketch.setup();

    engine.requestRender();
};

function update(dt) {
    sketch.update(dt);
}

function draw() {
    sketch.draw();
}
