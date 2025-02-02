#!/bin/bash

# Calculate widths
screen_width=$(xrandr --current | grep '*' | uniq | awk '{print $1}' | cut -d 'x' -f1)
tray_width=100
bar_width=$((screen_width - tray_width))

# Launch lemonbar
$HOME/.config/lemonbar/lemon.sh | $HOME/.local/lemonbar-xft/lemonbar -p -g ${bar_width}x20+0+0 -f "HackNerdFont-Regular:size=15" -B "#0E0D0D" -F "#FFFFFF" &

# Launch stalonetray with command-line options
stalonetray \
    --geometry 5x1-0+0 \
    --icon-size=20 \
    --kludges=force_icons_size \
    --background "#0E0D0D" \
    --icon-gravity NE \
    --grow-gravity NE &

# Keep the script running
wait
