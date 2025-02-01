#!/bin/bash

# Path to your start_bar.sh script
START_BAR_SCRIPT="$HOME/.config/lemonbar/start_bar.sh"

# Check if lemonbar is running
if pgrep -x "lemonbar" > /dev/null
then
    # Kill lemonbar and stalonetray
    pkill lemonbar
    pkill stalonetray
    
    # Reset bspwm top padding
    bspc config top_padding 0
else
    # Start lemonbar
    $START_BAR_SCRIPT &
    
    # Set bspwm top padding (adjust 30 to match your bar height)
    bspc config top_padding 30
fi

