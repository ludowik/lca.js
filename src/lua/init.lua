local js = require 'js'

local variables = {'W', 'H', 'PI'}

local functions = {
    'background', 'blendMode', 'strokeSize', 'stroke', 'noStroke', 'fill', 'noFill',
    'line', 'circleMode', 'circle', 'ellipseMode', 'ellipse', 'rectMode', 'rect',
    'translate'
}

function setupLua()
    for i, v in ipairs(variables) do
        _G[v] = js.global[v]
    end

    for i, v in ipairs(functions) do
        _G[v] = function(...) return js.global[v](js.global, ...) end
    end

    cos = math.cos
    sin = math.sin

    min = math.min
    max = math.max

    random = math.random

    Color = {
        random = js.global.color(0, 0, 0, 1).random
    }
    color = js.global.color
end

setupLua()

function setup() end

function draw() end
