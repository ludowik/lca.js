function draw()
    background(51)

    function drawBlendMode(mode, len, angle, r)
        local x, y = len * cos(angle), len * sin(angle)
        
        blendMode(mode)

        fill(colors.red)
        circle(x-r/2, y-r/2, r)

        fill(colors.green)
        circle(x+r/2, y-r/2, r)

        fill(colors.blue)
        circle(x, y+r/2, r)

        pushMatrix()
        do
            translate(x, y+r)            
            rotate(-elapsedTime)

            textMode(CENTER)
            text(mode, 0, 0)
        end
        popMatrix()
    end

    translate(W/2, H/2)

    rotate(elapsedTime)

    local r = 60
    local len = 150

    drawBlendMode(NORMAL, len, 0, r)
    drawBlendMode(REPLACE, len, TAU/4, r)
    drawBlendMode(ADDITIVE, len, TAU*2/4, r)
    drawBlendMode(MULTIPLY, len, TAU*3/4, r)
end
