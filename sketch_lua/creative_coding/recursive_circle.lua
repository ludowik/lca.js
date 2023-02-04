function setup()
    env.angle = 0

    parameter.boolean('inColor', true)
end

function update(dt)
--    env.angle = env.angle + dt * PI
end

function render(x, y, radius, level)
    level = level or 0

    if radius <= 3 then return end

    pushMatrix()
    do
        translate(x, y)
        
        rotate(env.angle * (level % 2 and -1.5 or 1))
        if inColor then
            fill(Color.hsb(level % 2 == 1 and radius / (W / 2) or 1 - radius / (W / 2), 0.5, 1))
        else
            fill(level % 2 == 1 and colors.white or colors.black)
        end
        
        circle(0, 0, radius)
        
        level = level + 1
        
        render(-radius / 2,               0, radius / 2, level)
        render( radius / 2,               0, radius / 2, level)
        render(          0, -radius * 2 / 3, radius / 3, level)
        render(          0,  radius * 2 / 3, radius / 3, level)
    end
    popMatrix()
end

function draw()
    background(colors.green)
    noStroke()
    
    env.render(W/2, H/2, min(W, H)*0.45)
end
