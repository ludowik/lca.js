function setup()
    xx = 0
    yy = 0

    t = 0

    angle = 0
end

function update(dt)
    if t <= 0 then
        angle = angle + dt * 30
    else
        t = t - dt * 60
    end
    if angle >= 90 then
        angle = 0
        t = 15
    end
end

function draw()
    background()

    noStroke()
    fill(colors.blue)

    rectMode(CENTER)

    local w = W/10
    translate(0+w/2, (HEIGHT-WIDTH)/2+w/2)
    
    for x=0,W,w do
        for y=0,W,w do
            pushMatrix()
            do
                da = angle % 90
                da = abs(da - 45)
                da = (da + 45) / 90
                translate(x, y)
                rotate(rad(angle))
                rect(0, 0, w*da, w*da)
            end
            popMatrix()
        end
    end
end
