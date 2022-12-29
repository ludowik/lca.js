var W, H;
var ElapsedTime = 0;

class Engine {
    constructor() {
        this.load();

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);
    }

    load() {
        this.gl = this.detectWebGLContext();
        W = this.gl.drawingBufferWidth;
        H = this.gl.drawingBufferHeight;

        this.graphics = new Graphics(this.gl);
    }

    detectWebGLContext() {
        this.canvas = document.querySelector("canvas");

        var platform = window.navigator?.userAgentData?.platform;
        var iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        if (iosPlatforms.indexOf(platform) !== -1) {
            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerWidth;
        } else {
            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerHeight * 9 / 16;
        }

        let gl = this.canvas.getContext("webgl2");

        if (gl && gl instanceof WebGL2RenderingContext) {
            return gl;
        }

        console.log("WebGL context not available");
    }

    frame(timestamp) {
        ElapsedTime = timestamp / 1000.;

        update();

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

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        resetMatrix();
        ortho();

        draw();

        this.requestRender();
    }

    requestRender() {
        window.requestAnimationFrame((timestamp) => {
            engine.stats.begin();
            engine.frame(timestamp);
            engine.stats.end();
        });
    }
}

var engine, sketch;

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
