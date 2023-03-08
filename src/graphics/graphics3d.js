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

    w = w || 1;
    h = h || w;
    d = d || h || w;

    //translate(-.5, -.5, -.5);

    scale(w, h, d);

    if (!meshBox) {
        meshBox = new Mesh();
        let a = -0.5;
        let b = +0.5;
        let vertices = [
            // front
            a, a, b,
            b, a, b,
            b, b, b,
            a, a, b,
            b, b, b,
            a, b, b,

            // right
            b, a, b,
            b, a, a,
            b, b, a,
            b, a, b,
            b, b, a,
            b, b, b,

            // back
            b, a, a,
            a, a, a,
            a, b, a,
            b, a, a,
            a, b, a,
            b, b, a,

            // left
            a, a, a,
            a, a, b,
            a, b, b,
            a, a, a,
            a, b, b,
            a, b, a,

            // top
            a, b, b,
            b, b, b,
            b, b, a,
            a, b, b,
            b, b, a,
            a, b, a,

            // bottom
            a, a, a,
            b, a, a,
            b, a, b,
            a, a, a,
            b, a, b,
            a, a, b,
        ];

        let colors = [
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,

            0, 1, 0, 1,
            0, 1, 0, 1,
            0, 1, 0, 1,
            0, 1, 0, 1,
            0, 1, 0, 1,
            0, 1, 0, 1,

            0, 0, 1, 1,
            0, 0, 1, 1,
            0, 0, 1, 1,
            0, 0, 1, 1,
            0, 0, 1, 1,
            0, 0, 1, 1,

            1, 1, 0, 1,
            1, 1, 0, 1,
            1, 1, 0, 1,
            1, 1, 0, 1,
            1, 1, 0, 1,
            1, 1, 0, 1,

            1, 0, 1, 1,
            1, 0, 1, 1,
            1, 0, 1, 1,
            1, 0, 1, 1,
            1, 0, 1, 1,
            1, 0, 1, 1,

            0, 1, 1, 1,
            0, 1, 1, 1,
            0, 1, 1, 1,
            0, 1, 1, 1,
            0, 1, 1, 1,
            0, 1, 1, 1,
        ];

        meshBox.initializeAttributes(shaders.default, vertices, undefined, colors);
    } else {
        meshBox.useAttributes();
    }

    let uniforms = {
        fillColor: __styles.fillColor || colors.white,
    }
    meshBox.shader.sendUniforms(uniforms);

    drawArrays(gl.TRIANGLES, 0, 36);

    popMatrix();
}