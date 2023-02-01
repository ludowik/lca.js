class 'Star' : extends(Object)

Star.batchRendering = true

function Star:init()
    Object.init(self)

    if Star.batchRendering then
        getmetatable(self).draw = nil
    end

    self.position = vec3()

    self.r = random(5)

    local angle = random()*TAU
    self.velocity = vec3(
        math.cos(angle),
        math.sin(angle)):mul(random(40, 50))

    self.position:add(self.velocity:clone():normalize(random(MAX_DISTANCE)))

    self.clr = Color.random()
end

function Star:reset()
    self.position:set(0, 0)
end

function Star:update(dt)
    self.position:add(self.velocity, dt)
    if self.position:len() >= MAX_DISTANCE then
        self:reset()
    end
end

function Star:draw()
    stroke(white)
    strokeSize(math.floor(self.r * self.position:len() / MAX_DISTANCE))
    point(self.position)
end

App('Stars')

function Stars:init()
    Application.init(self)

    MAX_STARS = 10000
    MAX_DISTANCE = W / 2 -- vec2(W/2, H/2):len()

    self.scene = Scene()

    self.scene.translate = vec2(W/2, H/2)

    self.stars = Node()
    self.scene:add(self.stars)

    self.points = Buffer('vec3')

    self:addStars(10^5)
end

function Stars:update(dt)
    local distance = love.timer.getFPS() - 60
    if distance ~= 60 then
        MAX_STARS = MAX_STARS + distance -- * 10n
    end

    self:addStars()
end

function Stars:addStars(n)
    if not n then
        if love.timer.getFPS() < 30 then
            n = -100
        else
            n = 100
        end
    end

--    n = n or (MAX_STARS - self.stars:count())

    if n > 0 then
        for i in range(n) do
            self.stars:add(Star())
        end
    else
        for i in range(-n) do
            self.stars:remove(self.stars:count())
        end
    end
end

function Stars:draw()
    background()

    blendMode(NORMAL)

    translate(W/2, H/2)

    stroke(colors.white)
    strokeSize(4)

    if Star.batchRendering then
        self.points = {} -- :reset()

        local ref = 1
        for i,v in self.stars:iter() do
            self.points[ref] = {
                v.position.x, v.position.y,
                v.clr.r, v.clr.g, v.clr.b, v.clr.a
            }
            ref = ref + 1
        end

        points(self.points)
    end

    fontSize(24)

    textMode(CENTER)

    local w, h = textSize(self.stars:count())
    rectMode(CENTER)
    rect(0, 0, w, h)
    
    textColor(colors.red)
    text(self.stars:count(), 0, 0)
end
