class FrameBuffer {
    constructor(w, h) {
        this.w = w || W;
        this.h = h || H;

        this.width = this.w;
        this.height = this.h;

        this.createTexture();
        this.createRenderbuffer();
        this.createFramebuffer();
    }

    pixelDensity() {
        // TODO
    }

    createTexture() {
        let gl = getContext();

        this.targetTextureWidth = this.w;
        this.targetTextureHeight = this.h;

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
            this.targetTextureWidth,
            this.targetTextureHeight,
            border, format, type, data);

        // set the filtering so we don't need mips
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    createRenderbuffer() {
        let gl = getContext();

        // create a depth renderbuffer;
        this.depthBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);

        // make a depth buffer and the same size as the targetTexture
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.targetTextureWidth, this.targetTextureHeight);
    }

    createFramebuffer() {
        let gl = getContext();

        // Create and bind the framebuffer;
        this.fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);

        const level = 0;

        // attach the texture as the first color attachment
        const attachmentPoint = gl.COLOR_ATTACHMENT0;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, this.targetTexture, level);

        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);
    }

    bindFramebuffer() {
        let gl = getContext();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);        
    }

    unbindFrameBuffer() {
        let gl = getContext();
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    get(x, y) {
        // TODO
        return colors.white;
    }

    set(x, y) {
        // TODO
    }
}

function createGraphics(w, h) {
    return new FrameBuffer(w, h);
}

function createCapture() {
    return new FrameBuffer(w, h);
}