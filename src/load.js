let scriptFiles = [
    'log.js',
    'math.js',
    'perlin.js',
    'transform.js',
    'vec2.js',
    'graphics/color.js',
    'graphics/style.js',
    'graphics/graphics2d.js',
    'graphics/graphics3d.js',
    'graphics/shape.js',
    'graphics/shader.js',
    'graphics/mesh.js',
    'frameBuffer.js',
    'sketch.js',
    'frameTime.js',
    'range.js',
    'grid.js',
    'data.js',
    'engine.js',
];

let shaderFiles = [
    'all.glsl',
    'default.glsl',
    'point.glsl',
    'line.glsl',
    'rect.glsl',
    'ellipse.glsl',
    'texture.glsl',
];

function include(path, files) {
    for (src of files) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = path + '/' + src + '?' + Date.now();
        script.async = false;
        document.head.appendChild(script);
    }

    return files.lenght;
}

include('src/graphics/shaders', shaderFiles);
include('src', scriptFiles);
include('', sketchFiles);

var sketches = [];
function declareSketch(sketch, name) {
    if (sketch !== SketchLua) {
        sketches.push(name || sketch.name);
    }
}

window.onload = () => {
    brython();

    for (let sketch of sketchDeclarations) {
        declareSketch(eval(sketch));
    }

    run();
};
