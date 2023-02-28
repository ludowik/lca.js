function ambientLight() {
}

function directionalLight() {
}

function sphere() {
}

let meshBox;
function box(w, h, d) {
    let gl = getContext();
    pushMatrix();

    // if (__styles.rectMode === CORNER)
    //     translate(x, y);
    // else
    //     translate(x - w / 2, y - h / 2);

    scale(w, h, d);

    if (!meshBox) {
        meshBox = new Mesh();
        let array = [
            0, 0, 0,
            1, 0, 0,
            1, 1, 0,
            0, 0, 0,
            1, 1, 0,
            0, 1, 0,

            1,0,0,
            1,0,1,
            1,1,1,
            1,0,0,
            1,1,1,
            1,1,0,
        ];

        meshBox.initializeAttributes(shaders.default, array);
    } else {
        meshBox.useAttributes();
    }

    let uniforms = {
        size: [w, h],
        strokeSize: __styles.__strokeSize,
        strokeColor: __styles.__strokeColor || colors.white,
        fillColor: __styles.fillColor || colors.white,
    }
    meshBox.shader.sendUniforms(uniforms);

    drawArrays(gl.TRIANGLES, 0, 12);

    popMatrix();
}