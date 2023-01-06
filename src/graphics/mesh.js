class Mesh {
    initializeAttributes(shader, array, texCoord) {
        let gl = getContext();

        this.shader = shader;
        this.buffers = {
            aPosition: {name: 'aPosition', data: array},
            aTexCoord: {name: 'aTexCoord', data: texCoord},
        }

        this.shader.use();

        this.buffers.aPosition.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.aPosition.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.buffers.aPosition.data), gl.STATIC_DRAW);
        this.buffers.aPosition.location = gl.getAttribLocation(shader.program, this.buffers.aPosition.name);
        gl.enableVertexAttribArray(this.buffers.aPosition.location);
        gl.vertexAttribPointer(this.buffers.aPosition.location, 3, gl.FLOAT, false, 0, 0);

        if (texCoord) {
            this.buffers.aTexCoord.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.aTexCoord.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.buffers.aTexCoord.data), gl.STATIC_DRAW);
            this.buffers.aTexCoord.location = gl.getAttribLocation(shader.program, this.buffers.aTexCoord.name);
            gl.enableVertexAttribArray(this.buffers.aTexCoord.location);
            gl.vertexAttribPointer(this.buffers.aTexCoord.location, 3, gl.FLOAT, false, 0, 0);
        }
    }

    updateAttributes(shader, array, texCoord) {
        let gl = getContext();

        this.shader = shader;
        this.buffers = {
            aPosition: {name: 'aPosition', data: array},
            aTexCoord: {name: 'aTexCoord', data: texCoord},
        }

        this.shader.use();

        this.buffers.aPosition.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.aPosition.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.buffers.aPosition.data), gl.STATIC_DRAW);
        this.buffers.aPosition.location = gl.getAttribLocation(shader.program, this.buffers.aPosition.name);
        gl.enableVertexAttribArray(this.buffers.aPosition.location);
        gl.vertexAttribPointer(this.buffers.aPosition.location, 3, gl.FLOAT, false, 0, 0);

        if (texCoord) {
            this.buffers.aTexCoord.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.aTexCoord.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.buffers.aTexCoord.data), gl.STATIC_DRAW);
            this.buffers.aTexCoord.location = gl.getAttribLocation(shader.program, this.buffers.aTexCoord.name);
            gl.enableVertexAttribArray(this.buffers.aTexCoord.location);
            gl.vertexAttribPointer(this.buffers.aTexCoord.location, 3, gl.FLOAT, false, 0, 0);
        }
    }

    useAttributes() {
        let gl = getContext();
        this.shader.use();
    }
}