function setup()
    vertices = table()
    colors = table()
    
    reset()
end
    
function reset()
    for i=1,6 do
        vertices:add(vec2.randomInScreen())
        colors:add(Color.random())
    end

    function nextPosition(i)
        local easing = randomInt(1, #tween.easing)
        tween(
            random(0.5, 1.3),
            vertices[i],
            vec2.randomInScreen(),
            tween.easing[easing],
            function ()
                nextPosition(i)
            end)
    end

    function nextColor(i)
        tween(random(0.8, 1.5),
            colors[i],
            Color.random(),
            tween.easing[easing],
            function ()
                nextColor(i)
            end)
    end

    for i=1,#vertices do
        nextPosition(i)
        nextColor(i)
    end
end

function draw()
    noStroke()

    blendMode(NORMAL)
    
    fill(0, 0, 0, 0.02)

    rectMode(CORNER)
    rect(0, 0, W, H)

    noFill()

    local function drawLines()
        translate(3, 3)

        strokeSize(2)

        local n = #vertices
        for i=1,n-1 do
            stroke(colors[i])
            line(vertices[i].x, vertices[i].y, vertices[i+1].x, vertices[i+1].y)
        end

        stroke(colors[n])
        line(vertices[n].x, vertices[n].y, vertices[1].x, vertices[1].y)
    end

    for i=1,5 do
        drawLines()
    end
end
