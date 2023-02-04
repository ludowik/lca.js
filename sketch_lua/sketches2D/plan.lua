local fileName = 'objects'

function setup()
    objects = table.load(fileName) or table()
    objects:save(fileName)
end

function getObject(position)
    local n = #objects
    for i=n,1,-1 do
        local object = objects[i]
        if Rect.contains(object, position) then
            return {
                i=i,
                object=object
            }
        end
    end
end

function touched(touch)
    if touch.state == BEGAN then
        selectedObject = getObject(touch)

        if not selectedObject then
            local object = Rect(touch.x, touch.y, 50, 50)
            object.clr = Color.random()
            object.type = 'rect'
            
            objects:add(object)
            
            objects:save(fileName)
        end


    elseif touch.state == MOVING then
        if selectedObject then
            local object = selectedObject.object
            if isDown('lshift') then
                object.size.x = object.size.x + touch.deltaX
                object.size.y = object.size.y + touch.deltaY

            elseif isDown('lctrl') then
                object.rotate = (object.rotate or 0) + touch.deltaX

            else
                object.position.x = object.position.x + touch.deltaX
                object.position.y = object.position.y + touch.deltaY
            end

            objects:save(fileName)
        end

    else
        selectedObject = nil
    end
end

function mouseMove()
    local n = #objects
    for i=n,1,-1 do
        local object = objects[i]
        if Rect.contains(object, mouse:transform()) then
            object.mouseOn = true
        else
            object.mouseOn = false
        end
    end
end

function keyboard(key)
    if key == 'c' then
        local currentRef = getObject(mouse:transform())
        if currentRef then
            currentRef.object.clr = Color.random()
        end
        return true

    elseif key == 'd' then
        local currentRef = getObject(mouse:transform())
        if currentRef then
            objects:remove(currentRef.i)
        end
        return true
        
    elseif key == 't' then
        local currentRef = getObject(mouse:transform())
        if currentRef then
            currentRef.object.type = (currentRef.object.type == 'rect') and 'circle' or 'rect'
        end
        return true
        
    elseif key == 'return' then
        local currentRef = getObject(mouse:transform())
        if currentRef then
            local object = Rect(currentRef.object.position.x,
                currentRef.object.position.y,
                currentRef.object.size.x,
                currentRef.object.size.y)
            object.clr = Color.random()
            
            objects:add(object)
            
            objects:add()
        end
        return true
    end
end

function draw()
    background(0)
    
    for _,object in ipairs(objects) do
        pushMatrix()

        if object.position then
            if object.clr then
                fill(object.clr)
            else
                fill(colors.white)
            end

            if object.mouseOn then
                stroke(colors.red)
            else
                stroke(colors.white)
            end

            translate(object.position.x+object.size.x/2, object.position.y+object.size.y/2)
            rotate(object.rotate or 0)

            if object.type == 'rect' then
                rectMode(CENTER)
                rect(0, 0, object.size.x, object.size.y)
            else
                circleMode(CENTER)
                circle(0, 0, object.size.x/2)
            end
            
            fill(colors.white)
            
            rotate(-(object.rotate or 0))
            
            textMode(CENTER)
            text(floor(object.size.x/3)..'/'..
                floor(object.size.y/3),
                0,
                0)
        end

        popMatrix()
    end

end
