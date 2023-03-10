class Texture {
    constructor(w, h, data) {
        this.w = w || W;
        this.h = h || H;

        this.createTexture(data);
    }

    createTexture(data) {
        let gl = getContext();

        this.targetTextureWidth = this.w;
        this.targetTextureHeight = this.h;

        this.targetTexture = gl.createTexture();

        // define size and format of level 0
        const level = 0;
        const internalFormat = gl.RGBA;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;

        gl.bindTexture(gl.TEXTURE_2D, this.targetTexture);
        if (data) {
            gl.texImage2D(gl.TEXTURE_2D,
                level,
                internalFormat,
                srcFormat,
                srcType,
                data);
        } else {
            gl.texImage2D(gl.TEXTURE_2D,
                level,
                internalFormat,
                this.targetTextureWidth,
                this.targetTextureHeight,
                border,
                srcFormat,
                srcType,
                data);
        }

        // set the filtering so we don't need mips
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    // TODO : to rename (maybe captureVideo)
    updateTexture(video) {
        let gl = getContext();

        const level = 0;
        const internalFormat = gl.RGBA;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;

        gl.bindTexture(gl.TEXTURE_2D, this.targetTexture);
        gl.texImage2D(gl.TEXTURE_2D,
            level,
            internalFormat,
            srcFormat,
            srcType,
            video
        );
    }
}

class FrameBuffer extends Texture {
    constructor(w, h, data) {
        super(w, h, data);

        this.width = this.w;
        this.height = this.h;

        this.pixels = new Uint8Array(this.w * this.h * 4);
        this.pixelColor = color();

        //this.createTexture(data);
        this.createRenderbuffer();
        this.createFramebuffer();
    }

    // TODO : manage pixel density on ios
    pixelDensity() {
    }

    createRenderbuffer() {
        let gl = getContext();

        // create a depth renderbuffer;
        this.depthBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);

        // make a depth buffer and the same size as the targetTexture
        gl.renderbufferStorage(gl.RENDERBUFFER,
            gl.DEPTH_COMPONENT16,
            this.targetTextureWidth, this.targetTextureHeight);
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

    readPixels() {
        let gl = getContext();
        if (sketch.fb.status !== 'ok') {
            gl.readPixels(0, 0, this.w, this.h, gl.RGBA, gl.UNSIGNED_BYTE, this.pixels);
            sketch.fb.status = 'ok';
        }
    }

    get(x, y) {
        this.readPixels();
        this.pixelColor.set(this.pixels[0], this.pixels[1], this.pixels[2], this.pixels[3]);
        return this.pixelColor;
    }

    set(x, y, r, g, b, a) {
        // TODO : param may be a color instance
        this.readPixels();
        this.pixels[0] = r;
        this.pixels[1] = g;
        this.pixels[2] = b;
        this.pixels[3] = a;        
    }
}

function createGraphics(w, h) {
    return new FrameBuffer(w, h);
}

function createCapture() {
    return new FrameBuffer(w, h);
}

function getPixel(x, y) {
    return sketch.fb.get(x, y);
}