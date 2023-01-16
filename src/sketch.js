class Entity {
    constructor() {
    }

    toString() {
        return this.constructor.name;
    }

    setup() {        
    }

    pause() {        
    }

    resume() {        
    }

    update(dt) {
        if (this.step) {
            return this.step(dt);
        }
    }

    draw() {        
    }
}

class Sketch extends Entity {
    constructor() {
        super();
        this.params = {};

        this.createTexture();
        this.createFramebuffer();
    }

    createTexture() {
        let gl = getContext();

        const targetTextureWidth = W;
        const targetTextureHeight = H;

        this.targetTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.targetTexture);

        // define size and format of level 0
        const level = 0;
        const internalFormat = gl.RGBA;
        const border = 0;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        const data = null;
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
            targetTextureWidth, targetTextureHeight, border,
            format, type, data);

        // set the filtering so we don't need mips
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    createFramebuffer() {
        let gl = getContext();

        // Create and bind the framebuffer;
        this.fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);

        const level = 0;

        // attach the texture as the first color attachment
        const attachmentPoint = gl.COLOR_ATTACHMENT0;
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, this.targetTexture, level);
    }

    bindFramebuffer() {
        let gl = getContext();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
    }

    unbindFrameBuffer() {
        let gl = getContext();
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
}
