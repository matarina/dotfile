-- Variables
local keys = {}

local mod = 'Mod4'
local tags = 5
keys.tags = tags
local move_to_screen = function (client, direction)
	local screen = client.screen
	local next_screen = client.screen:get_next_in_direction(direction)
	client:move_to_screen(next_screen)
end

-- Keybindings
keys.globalkeys = gears.table.join(
  -- Awesome
  awful.key({mod, 'Shift'}, 'r', awesome.restart),
  awful.key({mod}, 'd', function() dashboard.toggle() end),

  awful.key({mod,'Shift'}, 'l', function () awful.screen.focus(1) end),
  awful.key({mod,'Shift'}, 'h', function () awful.screen.focus(2) end),
  -- Window management
  awful.key({'Mod1'}, 'Tab', function() awful.client.focus.byidx(1) end),
  awful.key({mod}, 'Right', function () awful.tag.incmwfact(0.025) end),
  awful.key({mod}, 'Left', function () awful.tag.incmwfact(-0.025) end),
  awful.key({mod}, 'Up', function () awful.client.incwfact(0.05) end),
  awful.key({mod}, 'Down', function () awful.client.incwfact(-0.05) end),

  -- Applications
  awful.key({mod}, 'Return', function() awful.util.spawn('alacritty') end),
  awful.key({mod}, 'r', function() awful.util.spawn('rofi -show drun') end),
  awful.key({mod, 'Shift'}, 'u', function() awful.util.spawn('google-chrome-stable') end),
  awful.key({mod, 'Shift'}, 'i', function() awful.util.spawn('dingtalk') end),
  awful.key({mod, 'Shift'}, 'o', function() awful.util.spawn(
        '/opt/apps/com.qq.weixin.spark/files/run.sh',{
            floating = true,
            placement = awful.placement.bottom_right,}) 
    end),
  awful.key({mod, 'Shift'}, 'p', function() awful.util.spawn('thunar') end),
  -- Screenshots
  awful.key({mod, 'Shift'}, 's', function() awful.util.spawn('flameshot gui') end)
)

-- Keyboard Control
keys.clientkeys = gears.table.join(
  awful.key({mod}, 'q', function(c) c:kill() end),
  awful.key({mod}, ',', function(c) move_to_screen(c,"left") end),
  awful.key({mod}, 'm', function(c) c.minimized = true end),
  awful.key({mod}, 'space', function(c) c.fullscreen = not c.fullscreen; c:raise() end),
  awful.key({mod}, 'Tab', function() awful.client.floating.toggle() end),
  awful.key({mod}, "k",function() awful.client.focus.global_bydirection("up") end),
  awful.key({mod}, "j",function() awful.client.focus.global_bydirection("down") end),
  awful.key({mod}, "h",function() awful.client.focus.global_bydirection("left") end),
  awful.key({mod}, "l",function() awful.client.focus.global_bydirection("right") end),
  awful.key({mod, 'Shift'}, "Down",function() awful.client.swap.global_bydirection("down") end),
  awful.key({mod, 'Shift'}, "Left",function() awful.client.swap.global_bydirection("left") end),
  awful.key({mod, 'Shift'}, "Right",function() awful.client.swap.global_bydirection("right") end)
)

-- Mouse controls
keys.clientbuttons = gears.table.join(
  awful.button({}, 1, function(c) client.focus = c end),
  awful.button({mod}, 1, function() awful.mouse.client.move() end),
  awful.button({mod}, 2, function(c) c:kill() end),
  awful.button({mod}, 3, function() awful.mouse.client.resize() end)
)

for i = 1, tags do
  keys.globalkeys = gears.table.join(keys.globalkeys,

  -- View tag
  awful.key({mod}, '#'..i + 9,
    function ()
      local tag = awful.screen.focused().tags[i]
      if tag then
         tag:view_only()
      end
    end),

  -- Move window to tag
  awful.key({mod, 'Shift'}, '#'..i + 9,
    function ()
      if client.focus then
        local tag = client.focus.screen.tags[i]
        if tag then
          client.focus:move_to_tag(tag)
        end
     end
    end))
end

-- Set globalkeys
root.keys(keys.globalkeys)

return keys
