var W, H;

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
    }

    detectWebGLContext() {
        let canvas = document.querySelector("canvas");
        canvas.height = window.innerHeight; // window.innerHeight;
        canvas.width = window.innerHeight * 9 / 16;
        

        let gl = canvas.getContext("webgl2");

        if (gl && gl instanceof WebGL2RenderingContext) {
            return gl;
        }
        
        console.log("WebGL context not available");
    }

    frame(timestamp) {
        update();

        let gl = this.gl;

        gl.viewport(0, 0, W, H);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        
        gl.disable(gl.DEPTH_TEST);
        // gl.enable(gl.DEPTH_TEST);
        // gl.depthFunc(gl.LEQUAL);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        draw();

        this.requestRender();
    }

    requestRender() {
        window.requestAnimationFrame(() => {
            engine.stats.begin();
            engine.frame();
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
