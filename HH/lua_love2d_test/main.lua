function love.load()
    --[[
        GRID SETUP
    --]]
    GRID_WIDTH = 3
    GRID_HEIGHT = 3
    GRID_FLOORS = 3 -- New
    
    grid = {} -- 3D table: grid[z][y][x]

    for z = 1, GRID_FLOORS do
        grid[z] = {}
        for y = 1, GRID_HEIGHT do
            grid[z][y] = {}
            for x = 1, GRID_WIDTH do
                -- Set all tiles to z=0 (internal z-height)
                grid[z][y][x] = { z = 0 }
            end
        end
    end
    
    --[[
        PLAYER SETUP
    --]]
    player = {
        x = 1,
        y = 1,
        z = 1 -- Start on floor 1
    }

    --[[
        TILE GRAPHICS (OBLIQUE/CABINET PROJECTION)
    --]]
    TILE_SIZE = 96 -- Was 128
    Y_OFFSET = TILE_SIZE / 2 -- Now 48
    Y_VECTOR_X = Y_OFFSET
    Y_VECTOR_Y = -Y_OFFSET
    TILE_Z_HEIGHT = TILE_SIZE -- Now 96

    -- This is the polygon for the "top" of the tile (a parallelogram)
    tile_top_shape = {
        0, 0, -- Origin
        TILE_SIZE, 0, -- Along X-axis
        TILE_SIZE + Y_VECTOR_X, Y_VECTOR_Y, -- X-axis + Y-vector
        Y_VECTOR_X, Y_VECTOR_Y -- Y-vector
    }

    -- This is the "front" face of a block (X-Z plane)
    tile_front_side_shape = {
        0, 0,
        TILE_SIZE, 0,
        TILE_SIZE, TILE_Z_HEIGHT,
        0, TILE_Z_HEIGHT
    }
    
    -- This is the "right" face of a block (Y-Z plane)
    tile_right_side_shape = {
        0, 0,
        Y_VECTOR_X, Y_VECTOR_Y,
        Y_VECTOR_X, Y_VECTOR_Y + TILE_Z_HEIGHT,
        0, TILE_Z_HEIGHT
    }

    --[[
        GRID/FLOOR LAYOUT
    --]]
    
    -- Vertical space between each floor
    -- TILE_Z_HEIGHT is 96. TILE_SIZE * 1.3 is ~125.
    -- This leaves about 29 pixels of space between floors.
    FLOOR_STACK_OFFSET = TILE_SIZE * 1.3 -- Was TILE_SIZE * 1.5

    -- Grid offset for centering
    -- We need to find the "local" center of the grid's X-span.
    -- Left-most point is the origin of tile (1,1)
    local local_sx_min = (1 * TILE_SIZE) + (1 * Y_VECTOR_X)
    
    -- Right-most point is the far-right corner of tile (GRID_WIDTH, GRID_HEIGHT)
    local local_sx_max_origin = (GRID_WIDTH * TILE_SIZE) + (GRID_HEIGHT * Y_VECTOR_X)
    local local_sx_max = local_sx_max_origin + TILE_SIZE + Y_VECTOR_X
    
    local grid_span_width = local_sx_max - local_sx_min
    local grid_local_center_x = local_sx_min + (grid_span_width / 2)

    GRID_OFFSET_X = (love.graphics.getWidth() / 2) - grid_local_center_x
    -- We center based on the middle floor (floor 2)
    GRID_OFFSET_Y = (love.graphics.getHeight() / 1.8) -- Was / 1.5, move stack up

    -- Mouse tracking
    current_tile_x = nil
    current_tile_y = nil
    current_tile_z = nil -- Need to track Z-floor
end

--[[
    HELPER FUNCTION: obliqueToScreen
    Converts (x, y) grid coords to (sx, sy) screen coords (at z=0).
--]]
function obliqueToScreen(grid_x, grid_y)
    -- 1. Get the "local" oblique position
    local local_sx = (grid_x * TILE_SIZE) + (grid_y * Y_VECTOR_X)
    local local_sy = (grid_y * Y_VECTOR_Y)

    -- 2. Add the global offset to center the grid
    local sx = local_sx + GRID_OFFSET_X
    local sy = local_sy + GRID_OFFSET_Y

    return sx, sy
end

--[[
    HELPER FUNCTION: isPointInPolygon
    Standard ray-casting algorithm to check if a point (px, py)
    is inside a polygon (poly).
    'poly' is a flat table of {x1, y1, x2, y2, ...}
--]]
function isPointInPolygon(px, py, poly)
    local num_vertices = #poly / 2
    local inside = false
    
    local i = 1
    local j = num_vertices
    while i <= num_vertices do
        local xi = poly[(i-1)*2 + 1]
        local yi = poly[(i-1)*2 + 2]
        local xj = poly[(j-1)*2 + 1]
        local yj = poly[(j-1)*2 + 2]
        
        if ((yi > py) ~= (yj > py)) and (px < (xj - xi) * (py - yi) / (yj - yi) + xi) then
            inside = not inside
        end
        
        j = i
        i = i + 1
    end
    
    return inside
end


function love.update(dt)
    -- Get mouse position
    local mx, my = love.mouse.getPosition()
    
    -- This is the "correct" way to do mouse-picking for this projection:
    -- Iterate through all tiles and check for collision.
    current_tile_x = nil
    current_tile_y = nil
    current_tile_z = nil

    -- We must iterate in the *reverse* draw order (front-to-back)
    -- so that we "hit" the closest tile first.
    -- We also iterate Z from 1 to 3 (closest floor first)
    -- We check from top (z=3) to bottom (z=1) so mouse hits highest floor first
    for z_floor = GRID_FLOORS, 1, -1 do
        -- Calculate this floor's vertical offset
        -- Floor 1 is at +OFFSET (bottom), Floor 2 is at 0, Floor 3 is at -OFFSET (top)
        local floor_offset_y = (2 - z_floor) * FLOOR_STACK_OFFSET
        
        for y = 1, GRID_HEIGHT do
            for x = GRID_WIDTH, 1, -1 do
                local tile = grid[z_floor][y][x]
                local tile_z_height = tile.z
                
                local sx, sy = obliqueToScreen(x, y)
                sy = sy + floor_offset_y -- Apply floor offset
                
                local z_pixel_offset = tile_z_height * TILE_Z_HEIGHT
                
                -- Create a polygon for the top of this tile *at its height*
                local poly = {
                    sx + tile_top_shape[1], sy - z_pixel_offset + tile_top_shape[2],
                    sx + tile_top_shape[3], sy - z_pixel_offset + tile_top_shape[4],
                    sx + tile_top_shape[5], sy - z_pixel_offset + tile_top_shape[6],
                    sx + tile_top_shape[7], sy - z_pixel_offset + tile_top_shape[8],
                }
                
                -- Check if mouse is inside this polygon
                if isPointInPolygon(mx, my, poly) then
                    current_tile_x = x
                    current_tile_y = y
                    current_tile_z = z_floor
                    -- We found the tile, so stop searching
                    goto tile_found
                end
            end
        end
    end
    ::tile_found::
end

-- Handles player movement.
function love.keypressed(key)
    if key == "s" then -- Move "back" (Y-)
        player.y = math.max(1, player.y - 1)
    elseif key == "w" then -- Move "forward" (Y+)
        player.y = math.min(GRID_HEIGHT, player.y + 1)
    elseif key == "a" then -- Move "left" (X-)
        player.x = math.max(1, player.x - 1)
    elseif key == "d" then -- Move "right" (X+)
        player.x = math.min(GRID_WIDTH, player.x + 1)
    elseif key == "q" then -- Move down a floor (Z-)
        player.z = math.max(1, player.z - 1)
    elseif key == "e" then -- Move up a floor (Z+)
        player.z = math.min(GRID_FLOORS, player.z + 1)
    end
end


function love.draw()
    love.graphics.setBackgroundColor(0.2, 0.2, 0.2) -- Dark grey

    --[[
        RENDER LOOP (THE "PAINTER'S ALGORITHM")
        We now loop through all Z-floors.
        We draw from back-to-front, so Z=3, then Z=2, then Z=1.
        (Assuming you want to see "through" the floors)
        
        Let's draw from Z=1 to Z=3 (bottom-up)
        This will stack them nicely.
    --]]
    for z_floor = 1, GRID_FLOORS do
        
        -- Calculate this floor's vertical offset
        -- Floor 1 is at +OFFSET (bottom), Floor 2 is at 0, Floor 3 is at -OFFSET (top)
        local floor_offset_y = (2 - z_floor) * FLOOR_STACK_OFFSET
    
        -- Inner loops for X and Y, same as before
        for y = GRID_HEIGHT, 1, -1 do
            for x = 1, GRID_WIDTH do
                local tile = grid[z_floor][y][x]
                local tile_z_height = tile.z

                -- 1. Get the final screen position (for z=0)
                local sx, sy = obliqueToScreen(x, y)
                -- Apply floor offset
                sy = sy + floor_offset_y

                -- 2. Calculate the "z-offset" for height
                local z_pixel_offset = tile_z_height * TILE_Z_HEIGHT

                -- 3. Draw the tile
                -- If the tile is raised (z > 0), we draw the sides first
                if tile_z_height > 0 then
                    love.graphics.push()
                    love.graphics.translate(sx, sy)
                    for i = 1, tile_z_height do
                        love.graphics.setColor(0.4, 0.4, 0.4)
                        love.graphics.polygon("fill", tile_front_side_shape)
                        love.graphics.setColor(0.3, 0.3, 0.3)
                        love.graphics.polygon("fill", tile_right_side_shape)
                        love.graphics.translate(0, -TILE_Z_HEIGHT)
                    end
                    love.graphics.pop()
                end

                -- 4. Draw the top of the tile
                love.graphics.push()
                love.graphics.translate(sx, sy - z_pixel_offset)
                
                if tile_z_height > 0 then
                    love.graphics.setColor(0.3, 0.8, 0.3)
                else
                    love.graphics.setColor(0.5, 0.5, 0.5)
                end
                
                love.graphics.polygon("fill", tile_top_shape)
                love.graphics.setColor(0, 0, 0)
                love.graphics.polygon("line", tile_top_shape)
                love.graphics.pop()
            end
        end
        
        --[[
            DRAW PLAYER ON THIS FLOOR
        --]]
        if z_floor == player.z then
            local tile = grid[player.z][player.y][player.x]
            local tile_z_height = tile.z
            
            local sx, sy = obliqueToScreen(player.x, player.y)
            sy = sy + floor_offset_y -- Apply correct floor offset
            
            local z_pixel_offset = tile_z_height * TILE_Z_HEIGHT
            
            love.graphics.push()
            -- Center the player on the tile
            -- We translate to the tile's origin, then move to its visual center
            local center_x = sx + TILE_SIZE/2 + Y_VECTOR_X/2
            local center_y = sy - z_pixel_offset + Y_VECTOR_Y/2
            
            love.graphics.translate(center_x, center_y)
            
            love.graphics.setColor(1, 0, 0, 0.8) -- Semi-transparent red
            love.graphics.circle("fill", 0, 0, TILE_SIZE / 4)
            love.graphics.setColor(1, 1, 1) -- White outline
            love.graphics.setLineWidth(2)
            love.graphics.circle("line", 0, 0, TILE_SIZE / 4)
            love.graphics.setLineWidth(1)
            
            love.graphics.pop()
        end
        
    end -- End of z_floor loop

    --[[
        DRAW MOUSE HIGHLIGHT
    --]]
    if current_tile_x and current_tile_y and current_tile_z then
        -- Calculate the correct floor offset
        -- Floor 1 is at +OFFSET (bottom), Floor 2 is at 0, Floor 3 is at -OFFSET (top)
        local floor_offset_y = (2 - current_tile_z) * FLOOR_STACK_OFFSET
        
        local tile = grid[current_tile_z][current_tile_y][current_tile_x]
        local sx, sy = obliqueToScreen(current_tile_x, current_tile_y)
        sy = sy + floor_offset_y -- Apply floor offset
        
        local z_pixel_offset = tile.z * TILE_Z_HEIGHT

        love.graphics.push()
        love.graphics.translate(sx, sy - z_pixel_offset)
        
        love.graphics.setColor(1, 1, 0, 0.75)
        love.graphics.setLineWidth(3)
        love.graphics.polygon("line", tile_top_shape)
        love.graphics.setLineWidth(1)
        
        love.graphics.pop()
    end
    
    -- Draw debug info
    love.graphics.setColor(1, 1, 1)
    love.graphics.print("Projection: Oblique (Cabinet)", 10, 10)
    love.graphics.print("Use WASD to move. Q/E to change floors.", 10, 30)
    love.graphics.print("Player: [" .. player.x .. ", " .. player.y .. ", " .. player.z .. "]", 10, 50)
    if current_tile_x and current_tile_y then
        local tile = grid[current_tile_z][current_tile_y][current_tile_x]
        love.graphics.print("Hovering: [" .. current_tile_x .. ", " .. current_tile_y .. ", " .. current_tile_z .. "] (z-height="..tile.z..")", 10, 70)
    end
end


