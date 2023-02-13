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
        gl.enableVertexAttribArray(shader.attribsLocation.aPosition);
        gl.vertexAttribPointer(shader.attribsLocation.aPosition, 3, gl.FLOAT, false, 0, 0);        
        
        if (texCoord) {
            this.buffers.aTexCoord.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.aTexCoord.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.buffers.aTexCoord.data), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(shader.attribsLocation.aTexCoord);
            gl.vertexAttribPointer(shader.attribsLocation.aTexCoord, 3, gl.FLOAT, false, 0, 0);            
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
        gl.vertexAttribPointer(this.shader.attribsLocation.aPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.shader.attribsLocation.aPosition);
        
        if (this.buffers.aTexCoord.data) {
            this.buffers.aTexCoord.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.aTexCoord.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.buffers.aTexCoord.data), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.shader.attribsLocation.aTexCoord, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.shader.attribsLocation.aTexCoord);            
        }
    }

    useAttributes() {
        let gl = getContext();
        this.shader.use();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.aPosition.buffer);
        gl.vertexAttribPointer(this.shader.attribsLocation.aPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.shader.attribsLocation.aPosition);

        if (this.buffers.aTexCoord.data) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.aTexCoord.buffer);
            gl.vertexAttribPointer(this.shader.attribsLocation.aTexCoord, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.shader.attribsLocation.aTexCoord);            
        }
    }
}