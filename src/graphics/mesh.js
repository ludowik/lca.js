class Mesh {
    initializeAttributes(shader, array, texCoord) {
        let gl = getContext();

        this.shader = shader;
        this.buffers = {
            vertices: { name: 'aPosition', data: array },
            texCoord: { name: 'aTexCoord', data: texCoord },
        }

        this.shader.use();

        this.initializeBuffer(this.buffers.vertices);
        this.initializeBuffer(this.buffers.texCoord);
    }

    updateAttributes(array, texCoord) {
        let gl = getContext();

        this.buffers.vertices.data = array;
        this.buffers.texCoord.data = texCoord;

        this.shader.use();

        this.updateBuffer(this.buffers.vertices);
        this.updateBuffer(this.buffers.texCoord);
    }

    useAttributes() {
        let gl = getContext();

        this.shader.use();

        this.useBuffer(this.buffers.vertices);
        this.useBuffer(this.buffers.texCoord);
    }

    initializeBuffer(buffer) {
        this.updateBuffer(buffer, true);
    }

    updateBuffer(buffer, loadBuffer = true) {
        if (buffer.data === undefined) return;
        let gl = getContext();

        if (buffer.buffer === undefined) {
            buffer.buffer = gl.createBuffer();
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);

        if (loadBuffer) {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buffer.data), gl.STATIC_DRAW);
        }

        gl.vertexAttribPointer(this.shader.attribsLocation[buffer.name], 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.shader.attribsLocation[buffer.name]);
    }

    useBuffer(buffer) {
        this.updateBuffer(buffer, false);
    }
}