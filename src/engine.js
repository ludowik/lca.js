var W=0, H=0;
var DeltaTime=0, ElapsedTime=0;

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
    }

    initWebGLContext() {
        this.canvas = document.querySelector("canvas");
        this.resizeCanvas();

        let gl = this.canvas.getContext("webgl2", {
            preserveDrawingBuffer: true
        });

        if (gl && gl instanceof WebGL2RenderingContext) {
            return gl;
        }

        console.log("WebGL context not available");
    }

    resizeCanvas() {
        var platform = window.navigator?.userAgentData?.platform;
        var iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        if (iosPlatforms.indexOf(platform) !== -1) {
            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerWidth;
        } else {
            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerHeight * 9 / 16;
        }
    }

    frame(timestamp) {
        DeltaTime = this.frameTime.deltaTime;
        ElapsedTime = this.frameTime.elapsedTime;

        update(this.deltaTime);

        let gl = this.gl;

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        if (false) {
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

        draw();

        this.requestRender();
    }

    requestRender() {
        window.requestAnimationFrame(() => {
            engine.frame();
            this.frameTime.frame();
        });
    }
}

function reload() {
    let href = location.protocol + '//' + location.hostname + ':' + location.port + location.pathname + '?version=' + Date.now();
    location.replace(href);
}

function requestFullScreen() {
    var el = document.body;

    // Supports most browsers and their versions.
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
        || el.mozRequestFullScreen || el.msRequestFullScreen;

    if (requestMethod) {
        // Native full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
        // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
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

window.onload = function () {
    engine = new Engine();

    sketch = new Sketch();
    sketch.setup();

    engine.requestRender();
}

function update(dt) {
    sketch.update(dt);
}

function draw() {
    sketch.draw();
}
