function setup()
    W = WIDTH
    H = HEIGHT

    max,min,random = math.max,math.min,math.random

    grid = Grid(41)

    n = 0
    for x=2,grid.size.x-1 do
        for y=2,grid.size.y-1 do
            if x%2 == 1 and y%2 == 1 then
                grid:set(x, y, {wall=false, value=n})
                n = n + 1
            else
                grid:set(x, y, {wall=true, value=0})
            end
        end       
    end

    for x=1,grid.size.x do
        for y=1,grid.size.y do
            if x == 1 or y == 1 or x == grid.size.x or y == grid.size.y then
                grid:set(x, y, {wall=false, value=0})
            end
        end       
    end

    grid:set(2, 3, {wall=false, from=true, distance=0, value=0})
    grid:set(grid.size.x-1, grid.size.y-2, {wall=false, to=true, value=0})

    parameter.watch('coroutine.status(routine)')

    function generate()
        local continue = true
        while continue do
            local x = math.random(3, grid.size.x-2)
            local y = math.random(3, grid.size.y-2)

            local type = grid:get(x, y)
            if type.wall and (x+y)%2==1 then            
                local function test(dx, dy)
                    if (grid:get(x-dx, y-dy).value ~= grid:get(x+dx, y+dy).value)
                    then   
                        local value = max(grid:get(x-dx, y-dy).value, grid:get(x+dx, y+dy).value)

                        local function fillzone(x, y, value)
                            dir(x-1, y, value)
                            dir(x+1, y, value)
                            dir(x, y-1, value)
                            dir(x, y+1, value) 
                        end

                        function dir(x, y, value)
                            local info = grid:get(x, y)
                            if info.value and info.value > 0 and info.value ~= value then
                                info.value = value
                                fillzone(x, y, value)
                            end
                        end

                        grid:set(x, y, {wall=false, value = value})
                        fillzone(x, y, value)

                        coroutine.yield()
                    end
                end    

                test(1, 0)   
                test(0, 1)
            end  

            continue = false

            local value
            for x=3,grid.size.x-1 do
                for y=3,grid.size.y-1 do
                    local cell = grid:get(x , y)
                    if cell.value > 0 then
                        if not value then
                            value = cell.value

                        elseif cell.value ~= value then
                            continue = true
                            break
                        end
                    end
                end       
            end
        end 
    end

    function fix()
        for x=3,grid.size.x-2 do
            for y=3,grid.size.y-2 do
                local type = grid:get(x, y)
                if type.value > 0 then
                    type.value = 0
                end
            end       
        end
        coroutine.yield()
    end

    function resolve()
        local continue
        repeat
            for x=2,grid.size.x-1 do
                for y=2,grid.size.y-1 do
                    local type = grid:get(x, y)
                    type.new = false
                    if not type.wall then 
                        function test(dx, dy)
                            if type.distance then return end 
                            local neirbourg = grid:get(x+1*dx, y+1*dy)
                            if neirbourg.distance and not neirbourg.new then
                                grid:set(x, y, {distance=neirbourg.distance+1, new=true, value=0})
                            end
                        end

                        test(1, 0)
                        test(-1, 0)
                        test(0, 1)
                        test(0, -1)                        
                    end
                end       
            end

            continue = false
            
            local value
            for x=2,grid.size.x-1 do
                for y=2,grid.size.y-1 do
                    local cell = grid:get(x , y)
                    if not cell.wall and not cell.distance then
                        continue = true
                        break
                    end
                end
            end

            coroutine.yield()
        until not continue
    end

    function flow()
        generate()
        fix()
        resolve()
    end

    routine = coroutine.create(flow)
end

function update()
    if routine and coroutine.status(routine) ~= 'dead' then
        local res, error = coroutine.resume(routine)
        if res ~= true then print(res, error) end
    end
end

function draw()
    background()
    grid:draw()
end
