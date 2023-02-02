require 'js'

-- https://www.lua.org/wshop17/fengari.html

function setupLua(sketchName)
    local constants = {
        'P2D', 'WEBGL',
        'RGB', 'HSB',
        'RIGHT', 'LEFT', 'TOP', 'BOTTOM', 'CENTER', 'CORNER', 'RADIUS', 'CLOSE',
        'PI', 'TAU',
        'POINTS', 'LINES', 'TRIANGLE_STRIP',
        'PIE',
        'BLEND', 'DARKEST', 'LIGHTEST', 'DIFFERENCE', 'MULTIPLY', 'EXCLUSION', 'SCREEN', 'REPLACE', 'OVERLAY', 'HARD_LIGHT', 'SOFT_LIGHT', 'DODGE', 'BURN', 'ADD', 'REMOVE', 'SUBTRACT',
        'VIDEO',
        'SQUARE',
        'UP_ARROW', 'DOWN_ARROW', 'LEFT_ARROW', 'RIGHT_ARROW',
        'Color',
    }

    s10 = 10

    for i,v in ipairs(constants) do
        _G[v] = js.global[v]
    end

    local functions = {
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
    }
    
    for i,v in ipairs(functions) do
        _G[v] = function (...)
            return js.global[v](js.global, ...)
        end
    end

    parameter = {};
    local objects = {
        'number', 'integer', 'link', 'action',
    }
    for i,v in ipairs(objects) do
        parameter[v] = function (...)
            return js.global.parameter[v](js.global, ...)
        end
    end

    pushMatrix = js.global.push
    popMatrix = js.global.pop    

    PI = math.pi
    TAU = math.pi * 2

    donothing = function () end
    setup = donothing
    update = donothing
    draw = donothing 
end
