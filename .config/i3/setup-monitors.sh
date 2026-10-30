#!/usr/bin/env bash
# Arrange displays like the GNOME/PaperWM session:
#   DP-1 left (secondary), HDMI-2 right (PRIMARY).
#   DP-1 is 2560x1440, HDMI-2 is 1920x1080 primary.
# Native Xorg with Intel/modesetting uses the kernel connector names
# (DP-1 / HDMI-2). HDMI-1/HDMI-3 are no longer populated — the working
# monitors are DP-1 and HDMI-2. If the cable layout changes, edit the
# names here AND the `workspace N output` pins in ~/.config/i3/config.
set -uo pipefail
list=$(xrandr --listactivemonitors | tail -n +2 | awk '{print $2}' | tr -d '+*')
if grep -qx DP-1 <<<"$list" && grep -qx HDMI-2 <<<"$list"; then
  # Pin explicit modes: HDMI-2's EDID marks no preferred mode, so --auto
  # once landed on a non-native 1280x1440 (blurry, mismatched size).
  xrandr --output DP-1 --mode 2560x1440 --pos 0x0
  xrandr --output HDMI-2 --mode 1920x1080 --rate 60.00 --right-of DP-1 --primary
else
  xrandr --auto   # unexpected topology: let xrandr do something sane
fi
