Grid = class()

function Grid:init(size)
    self.size = vec2(size, size)
    self.defaultValue = {wall=true, value=0}
    self.data = {}
end

function Grid:offset(x, y)
    return x + (y-1) * self.size.y
end

function Grid:set(x, y, value)
    self.data[self:offset(x, y)] = value
end

function Grid:get(x , y)
    return self.data[self:offset(x, y)] or self.defaultValue
end

function Grid:draw()
    local w = min(W, H) / max(self.size.x, self.size.y)
    
    noStroke()

    translate(
        W/2-self.size.x*w/2,
        H/2-self.size.y*w/2)

    for x=1,self.size.x do
        for y=1,self.size.y do
            local type = self:get(x, y)
            if type.wall then
                fill(colors.black)
            elseif type.from or type.to then
                fill(colors.white)
            elseif type.distance then
                fill(colors.white)
            elseif type.value == 0 then
                fill(colors.white)
            else
                fill(Color.hsl(type.value or 0))
            end
            rect((x-1)*w, (y-1)*w, w, w)

            if type.distance then
                textColor(Color.hsl(type.distance))
                textMode(CENTER)
                fontSize(w)
                text(type.distance, (x-1)*w+w/2, (y-1)*w+w/2)
            end
        end       
    end
end

function Grid:touched(touch)
end
