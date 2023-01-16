let scriptFiles = [
    'log.js',
    'math.js',
    'perlin.js',
    'transform.js',
    'vec2.js',
    'graphics/color.js',
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
    'circle.js',
    'compute_pi.js',
    'primitives.js',
    'shaderbox.js',
    'circle_packing.js',
    'circle_recursive.js',
    'circle_sizing.js',
];

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
