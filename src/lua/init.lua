local js = require 'js'

local variables = {'W', 'H', 'PI', 'Color'}

local functions = {
    'background', 'blendMode', 'strokeSize', 'stroke', 'noStroke', 'fill', 'noFill',
    'point', 'line', 'circleMode', 'circle', 'ellipseMode', 'ellipse', 'rectMode', 'rect',
    'translate', 'rotate',
    'randomColor', 'color'
}

function setupLua()
    for i, v in ipairs(variables) do
        assert(js.global[v], 'undefined '..v)
        _G[v] = js.global[v]
    end

    for i, v in ipairs(functions) do
        assert(js.global[v], 'undefined '..v)
        _G[v] = function(...) return js.global[v](js.global, ...) end
    end

    cos = math.cos
    sin = math.sin

    min = math.min
    max = math.max

    random = math.random

    parameter = {
        number = function (name, min, max, value) _G[name] = _G[name] or value or min end,
        integer = function (name, min, max, value) _G[name] = _G[name] or value or min end,
        action = function (...) end,
        link = function (...) end,
    }
end

setupLua()

function setup()
end

function draw()
end
