function include(path, files) {
    for (src of files) {
        var script = document.createElement('script');
        script.src = path + '/' + src + '?t=<?=time()?';

        document.body.appendChild(script);
    }
}

let scriptFiles = [
    'math.js',
    'transform.js',
    'color.js',
    'graphics/graphics2d.js',
    'graphics/shader.js',
    'graphics/mesh.js',
    'sketch.js',
    'frameTime.js',
    'range.js',
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
    'lines.js',
    'compute_pi.js',
    'primitives.js',
];

include('src/graphics/shaders', shaderFiles);
include('src', scriptFiles);
include('sketch', sketchFiles);
