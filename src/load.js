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

let sketchFiles = [
    "2048.js",
    "3d.js",
    "attraction.js",
    "bees.js",
    "brick_breaker.js",
    "camera.js",
    "canvas2d.js",
    "cardioid.js",
    "carto.js",
    "cc.js",
    "circle.js",
    "circle_packing.js",
    "circle_recursive.js",
    "circle_sizing.js",
    "compute_pi.js",
    "feigenbaum.js",
    "flow_fields.js",
    "fourier.js",
    "game_of_life.js",
    "grains.js",
    "lexer.js",
    "lightning_ball.js",
    "lines.js",
    "lua.js",
    "lua_collatz.js",
    "lua_phyllotaxis.js",
    "micro.js",
    "noise.js",
    "pi.js",
    "primitives.js",
    "py.js",
    "rainbow.js",
    "schotter.js",
    "scribble.js",
    "shader.js",
    "shaderbox.js",
    "spirale.js",
    "trees.js",
    "ui.js",
    "ulam_spiral.js",
];

var sketches = [];
function declareSketch(sketch) {
    sketches.push(sketch.name);
}

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
    brython();

    declareSketch(Game2048);
    declareSketch(Sketch3D);
    declareSketch(Attraction);
    declareSketch(Bees);
    declareSketch(BrickBreaker);
    //declareSketch(Camera);
    declareSketch(Cardioid);
    declareSketch(Carto);
    declareSketch(CC);
    declareSketch(CircleSketch);
    declareSketch(CirclePacking);
    declareSketch(CircleRecursive);
    declareSketch(CircleSizing);
    declareSketch(ComputePI);
    declareSketch(Feigenbaum);
    declareSketch(FlowFields);
    declareSketch(Fourier);
    declareSketch(Gol);
    declareSketch(Grains);
    declareSketch(Lexer);
    declareSketch(LightningBall);
    declareSketch(Lines);
    //declareSketch(Micro);
    declareSketch(Noise);
    declareSketch(Primitives);
    declareSketch(Rainbow);
    declareSketch(PlayWithRect);
    declareSketch(Scribble);
    declareSketch(ShaderBox);
    declareSketch(Spirale);
    declareSketch(Trees);
    declareSketch(UI);
    declareSketch(UlamSpiral);

    run();
};
