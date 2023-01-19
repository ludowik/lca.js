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

    mouseReleased() {
    }

    keyPressed(keyCode, key) {
    }
}

class Node extends Entity {
    constructor() {
        super();
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    update(dt) {
        for (const item of this.items) {
            item.update(dt);
        }
    }

    draw() {
        for (const item of this.items) {
            item.draw();
        }
    }
}

class Scene extends Node {
    constructor() {
        super();
    }
}

class Sketch extends Entity {
    constructor() {
        super();
        this.params = {};

        this.createTexture();
        this.createRenderbuffer();
        this.createFramebuffer();
    }

    createTexture() {
        let gl = getContext();

        this.targetTextureWidth = W;
        this.targetTextureHeight = H;

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
            this.targetTextureWidth, this.targetTextureHeight, border,
            format, type, data);

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
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, this.targetTexture, level);

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
}
