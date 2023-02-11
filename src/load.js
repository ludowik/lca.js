let scriptFiles = [
    'log.js',
    'stack.js',
    'math.js',
    'random.js',
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
    'scene/entity.js',
    'scene/ui.js',
    'scene/node.js',
    'scene/scene.js',
    'sketch.js',
    'frameTime.js',
    'range.js',
    'grid.js',
    'data.js',
    'parameter.js',
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
        script.src = path + src + '?' + Date.now();
        script.async = false;
        document.head.appendChild(script);
    }

    return files.lenght;
}

include('src/graphics/shaders/', shaderFiles);
include('src/', scriptFiles);
include('lib/', ['perlin.js']);

include('', sketchFiles);

var sketches = [];
function declareSketch(sketch, name) {
    if (sketch === SketchLua) {
        sketches.push(sketch.name + '("' + name + '")');
    } else {
        sketches.push(sketch.name + '()');
    }
}

window.onload = () => {
    brython();

    for (let sketch of sketchDeclarations) {
        declareSketch(eval(sketch));
    }

    for (let sketch of sketchFilesLua) {
        declareSketch(SketchLua, sketch);
    }

    run();
};
