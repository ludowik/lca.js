class Mesh {
    initializeAttributes(shader, vertices, texCoords, colors) {
        let gl = getContext();

        this.shader = shader;
        this.buffers = {
            vertices: { name: 'aPosition', data: vertices, size: 3 },
            texCoords: { name: 'aTexCoord', data: texCoords, size: 3 },
            colors: { name: 'aColor', data: colors, size: 4 },
        }

        this.shader.use();

        this.initializeBuffer(this.buffers.vertices);
        this.initializeBuffer(this.buffers.texCoords);
        this.initializeBuffer(this.buffers.colors);
    }

    updateAttributes(vertices, texCoords, colors) {
        let gl = getContext();

        this.buffers.vertices.data = vertices;
        this.buffers.texCoords.data = texCoords;
        this.buffers.colors.data = colors;

        this.shader.use();

        this.updateBuffer(this.buffers.vertices);
        this.updateBuffer(this.buffers.texCoords);
        this.updateBuffer(this.buffers.colors);
    }

    useAttributes() {
        let gl = getContext();

        this.shader.use();

        this.useBuffer(this.buffers.vertices);
        this.useBuffer(this.buffers.texCoords);
        this.useBuffer(this.buffers.colors);
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

        gl.vertexAttribPointer(this.shader.attribsLocation[buffer.name], buffer.size, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.shader.attribsLocation[buffer.name]);
    }

    useBuffer(buffer) {
        this.updateBuffer(buffer, false);
    }
}