class ShaderToy extends Sketch {
    setup(config) {
        // disables scaling for retina screens which can create inconsistent scaling between displays
        pixelDensity(1);
        config.mode = WEBGL;
    }

    init() {
        loadMyShader(engine, this, "sketches.js/shaders/shader.vert", "sketches.js/shaders/shader.frag");

        this.params.amplitude = 50;
        this.params.freq = 10;
        this.params.speed = 5;
    }

    render() {
        if (this.shader) {
            this.shader.setUniform("iResolution", [width, height]);
            this.shader.setUniform("iFrame", frameCount);
            this.shader.setUniform("iTime", millis() / 1000.0); // we divide millis by 1000 to convert it to seconds
            this.shader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]); // we flip Y so it's oriented properly in our shader

            this.shader.setUniform("u_amplitude", this.params.amplitude);
            this.shader.setUniform("u_freq", this.params.freq);
            this.shader.setUniform("u_speed", this.params.speed);

            fill(colors.white);

            shader(this.shader);
        }

        rect(0, 0, width, height);
    }
}

declareSketch(ShaderToy);
