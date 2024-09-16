#!/bin/bash


# Calculate widths
screen_width=$(xrandr --current | grep '*' | uniq | awk '{print $1}' | cut -d 'x' -f1)
tray_width=100
bar_width=$((screen_width - tray_width))

# Launch lemonbar
$HOME/.config/lemonbar/lemon.sh | lemonbar -p -g ${bar_width}x20+0+0  -f "HackNerdFont-Regular:size=15"  -B "#0E0D0D" -F "#FFFFFF"  &

# Launch stalonetray
stalonetray  -c $HOME/.config/stalontray/.stalonstrayrc &

# Keep the script running
wait
