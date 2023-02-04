function setup()
    value = 0
    r = W * 0.45

    parameter.number('coef', 0, 10, 0, function ()
            clearBackground = true
        end)
    
    parameter.integer('div', 10, 200, 10, function ()
            clearBackground = true
        end)
end

function draw()
    translate(W/2, H/2)
    
    strokeSize(2)
    
    for i=0,div do
        compose()
    end
    
    noFill()
    
    stroke(Color.random())
    
    circle(0, 0, r)
end

function compose()
    if clearBackground then
        clearBackground = false
        background()
    end
    
    result = value * coef

    x1 = r * cos(PI + value  * TAU / div)
    y1 = r * sin(PI + value  * TAU / div)
    x2 = r * cos(PI + result * TAU / div)
    y2 = r * sin(PI + result * TAU / div)

    stroke(Color.random())
    
    line(x1, y1, x2, y2)

    value = value + 1
end
