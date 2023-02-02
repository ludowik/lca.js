function generateShader(engine, shader, ref, text) {
    shader[ref] = text;

    if (shader.textInclude && shader.textVertex && shader.textFragment) {
        shader.object.shader = engine.p5instance.createShader(
            shader.textInclude + '\n' + shader.textVertex,
            shader.textInclude + '\n' + shader.textFragment);
    }
}

function loadMyShader(engine, object, urlVertex, urlFragment) {
    let shader = { object: object };
    fetch("sketches.js/shaders/include.shader")
        .then(response => response.text())
        .then(text => generateShader(engine, shader, 'textInclude', text));
    fetch("sketches.js/shaders/shader.vert")
        .then(response => response.text())
        .then(text => generateShader(engine, shader, 'textVertex', text));
    fetch("sketches.js/shaders/shader.frag")
        .then(response => response.text())
        .then(text => generateShader(engine, shader, 'textFragment', text));
}
