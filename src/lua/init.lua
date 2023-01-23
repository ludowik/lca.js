local js = require 'js'

local functions = {
    'stroke', 'fill',
    'circle', 'ellipse',
}

for i,v in ipairs(functions) do
    _G[v] = function (...)
        return js.global[v](js.global, ...)
    end
end

function setup()
end

function draw()
end
