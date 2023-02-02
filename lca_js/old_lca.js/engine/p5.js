const constants = [
    'P2D', 'WEBGL',
    'RGB', 'HSB',
    'RIGHT', 'LEFT', 'TOP', 'BOTTOM', 'CENTER', 'CORNER', 'RADIUS', 'CLOSE',
    'PI', 'TAU',
    'POINTS', 'LINES', 'TRIANGLE_STRIP',
    'PIE',
    'BLEND', 'DARKEST', 'LIGHTEST', 'DIFFERENCE', 'MULTIPLY', 'EXCLUSION', 'SCREEN', 'REPLACE', 'OVERLAY', 'HARD_LIGHT', 'SOFT_LIGHT', 'DODGE', 'BURN', 'ADD', 'REMOVE', 'SUBTRACT',
    'VIDEO',
    'SQUARE',
    'UP_ARROW', 'DOWN_ARROW', 'LEFT_ARROW', 'RIGHT_ARROW'
];

const functions = [
    'createCanvas', 'createGraphics',
    'frameRate', 'frameCount', 'loop', 'noLoop', 'isLooping', 'redraw',
    'colorMode', 'color', 'hsl',
    'background',
    'noStroke', 'stroke', 'strokeWeight', 'strokeSize', 'strokeCap',
    'noFill', 'fill',
    'noSmooth', 'smooth',
    'push', 'pop', 'scale', 'rotate', 'translate', 'resetMatrix', 'ortho', 'perspective',
    'point', 'line', 'rectMode', 'rect', 'circleMode', 'circle', 'ellipseMode', 'ellipse', 'arc', 'beginShape', 'vertex', 'endShape',
    'plane', 'box', 'sphere', 'model',
    'textAlign', 'textSize', 'textWidth', 'textFont', 'fontSize', 'textMode', 'text',
    'loadImage', 'imageMode', 'image', 'pixelDensity', 'get', 'set',
    'createShader', 'shader', 'resetShader', 'normalMaterial', 'ambientLight', 'directionalLight', 'blendMode', 'texture',
    'createCapture',
    'createEasyCam', 'camera',
    'createElement', 'createDiv', 'createSlider', 'createCheckbox', 'createColorPicker', 'createButton', 'createSelect', 'createInput', 'createP', 'createSpan',
    'createShader',
    'createVector', 'dist',
    'userStartAudio',
    'noiseSeed', 'random', 'noise', 'random2D', 'random3D', 'randomColor',
    'abs', 'floor', 'round', 'ceil', 'cos', 'sin', 'rad', 'radians', 'deg', 'degress',
    'millis',
    'map', 'min', 'max', 'sqrt',
    'getItem', 'storeItem',
];

const variables = [
    'windowWidth', 'windowHeight', 'Color',
];

function p5_setup(e) {
    for (const name of constants) {
        if (globalThis[name] === undefined) {
            globalThis[name] = e.p5instance[name];
        }
    }

    for (const name of functions) {
        if (globalThis[name] === undefined) {
            globalThis[name] = function () {
                return engine.p5instance[name].apply(engine.p5instance, arguments);
            };
        }
    }

    for (const name of variables) {
        if (globalThis[name] === undefined) {
            Object.defineProperty(globalThis, name, {
                get() {
                    return engine.p5instance[name];
                },
                set(v) {
                    engine.p5instance[name] = v;
                }
            });
        }
    }

    // enhance p5

    hsl = function () {
        let mode = engine.p5instance._colorMode;
        colorMode(HSB);
        let clr = engine.p5instance.color.apply(engine.p5instance, arguments);
        colorMode(mode);
        return clr;
    };

    rad = radians;
    deg = degress;

    background = function () {
        if (arguments.length > 0) {
            for (let index = 0; index < arguments.length; index++) {
                const element = arguments[index];
                if (typeof element === 'number') {
                    if (element > 1) {
                        arguments[index] = element / 255;
                    }
                }
            }
            engine.p5instance.background.apply(engine.p5instance, arguments);
        } else {
            engine.p5instance.background(colors.black);
        }
    };

    ortho = function (left = 0, right = W, bottom = 0, top = H, near = 0, far = 1000) {
        if (engine.config.mode === WEBGL) {
            return engine.p5instance.ortho(left, right, bottom, top, near, far);
        }
    };

    fontSize = textWidth;
    textMode = textAlign;

    strokeSize = strokeWeight;

    circleMode = ellipseMode;

    text = function (txt, x, y) {
        if (textAlign().vertical === CENTER) {
            let size = engine.p5instance.textSize();
            return engine.p5instance.text(txt, x, y - (size / 3) + (size / 4));
        }
        return engine.p5instance.text(txt, x, y);
    };

    ellipse = function () {
        ellipseMode(CENTER);
        return engine.p5instance.ellipse.apply(engine.p5instance, arguments);
    };

    circle = function () {
        ellipseMode(RADIUS);
        return engine.p5instance.circle.apply(engine.p5instance, arguments);
    };

    endShape = function () {
        engine.p5instance.endShape.apply(engine.p5instance, arguments);
    };
}
