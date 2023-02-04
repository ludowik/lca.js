local js = require 'js'

local constants = {
    'PI', 'Color', 'colors', 'CORNER', 'CENTER', 'BOTTOM_LEFT', 'BLEND',
    'ADDITIVE'
}

local variables = {'W', 'H', 'elapsedTime', 'parameter'}

local functions = {
    'setOrigin', 'supportedOrientations', 'background', 'blendMode',
    'strokeSize', 'stroke', 'noStroke', 'fontName', 'fontSize', 'fill',
    'noFill', 'point', 'line', 'circleMode', 'circle', 'ellipseMode', 'ellipse',
    'rectMode', 'rect', 'textMode', 'text', 'pushMatrix', 'popMatrix',
    'translate', 'rotate', 'scale', 'randomColor', 'color', 'hsl2rgb', 'noise'
}

function getConstants()
    for i, v in ipairs(constants) do
        assert(js.global[v], 'undefined constants ' .. v)
        _G[v] = js.global[v]
    end
end

function getVariables()
    for i, v in ipairs(variables) do
        assert(js.global[v], 'undefined variables ' .. v)
        _G[v] = js.global[v]
    end
end

function getFunctions()
    for i, v in ipairs(functions) do
        assert(js.global[v], 'undefined functions ' .. v)
        _G[v] = function(...) return js.global[v](js.global, ...) end
    end
end

function setupLua()
    getConstants()
    getVariables()
    getFunctions()

    env = _G
    -- parameter = Parameter.instance()
    tweensManager = TweensManager()

    cos = math.cos
    sin = math.sin

    pow = math.pow

    min = math.min
    max = math.max
    abs = math.abs

    ceil = math.ceil
    floor = math.floor
    round = function(v) return ceil(v + 0.5) end

    -- TODO
    textColor = fill;
end

function setup_proc() if setup then setup() end end

function update_proc(dt)
    getVariables()
    _G.env.tweensManager:update(dt)
    if update then update(dt) end
end

function draw_proc()
    getVariables()
    if draw then draw(dt) end
end

local function load(modulename)
    local errmsg = ""
    for path in string.gmatch(package.path, "([^;]+)") do
        local fileName = string.gsub(path, "%?", modulename)
        local file = io.open(fileName, "rb")
        if file then
            -- Compile and return the module
            return assert(loadstring(assert(file:read("*a")), fileName))
        end
        errmsg = errmsg .. "\n\tno file '" .. fileName ..
                     "' (checked with custom loader)"
    end
    return errmsg
end

function require(fileName)
    print(fileName)
    fileName = '../lca/' .. fileName
    local file = io.open(fileName, "rb")
    if file then
        -- Compile and return the module
        return assert(loadstring(assert(file:read("*a")), fileName))
    end
end

require 'lua/require'
require 'lua/table'
require 'lua/class'
require 'lua/string'
require 'lua/tween'
require 'lua/callback'
require 'lua/args'
require 'lua/random'
require 'maths/rect'
require 'maths/vec2'
require 'maths/vec3'
require 'lua_collection/__init'
require 'engine/parameter'
require 'engine/application'
require 'scene/__init'

setupLua()
