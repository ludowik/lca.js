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

let sketchFiles = [
    '3d.js',
    '2048.js',
    'attraction.js',
    'bees.js',
    'brick_breaker.js',
    'circle.js',
    'circle_packing.js',
    'circle_recursive.js',
    'circle_sizing.js',
    'compute_pi.js',
    'lines.js',    
    'primitives.js',
    'shaderbox.js',
    'trees.js',
    'game_of_life.js',
    'lua.js',
];

var sketches = [];
function declareSketch(sketch) {
    sketches.push(sketch.name);
}

let n = scriptFiles.length + shaderFiles.length + sketchFiles.length;

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
include('sketch', sketchFiles);

window.onload = () => {
    run();
};
