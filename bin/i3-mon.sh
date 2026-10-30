#!/usr/bin/env bash
# i3-mon.sh — PaperWM-style cross-monitor / workspace helpers for i3
#
# Parity-pinned workspaces (bound in ~/.config/i3/config):
#   odd  1,3,5,7,9  -> HDMI-1 (left / secondary)
#   even 2,4,6,8,10 -> HDMI-2 (right / primary)
#
# Subcommands (same semantics as the PaperWM patches on the Wayland session):
#   focus-other   focus the other monitor                      Super+o
#   move-other    move window to the OTHER monitor
#                 currently visible workspace and follow it    Super+Shift+o
#   new-space     jump to next empty workspace, same parity first  Super+n
#   cycle-width   cycle window width 33/50/67/99 %             Super+r
#   cycle-height  cycle window height 60/80/100 %              Super+Shift+r
set -uo pipefail
die(){ echo "i3-mon: $*" >&2; exit 1; }

focused_output(){
  # NOTE: on this i3/X11 build get_outputs .focused is always null, so derive
  # the current output from the focused workspace (reliable) instead.
  local o
  o=$(i3-msg -t get_workspaces | jq -r '[.[]|select(.focused)][0].output // empty')
  [[ -n "$o" ]] && { echo "$o"; return; }
  i3-msg -t get_outputs | jq -r '.[]|select(.focused)|.name'
}

other_output(){
  local cur; cur=$(focused_output)
  i3-msg -t get_outputs | jq -r --arg cur "$cur" \
    '[.[]|select(.active and .name!=$cur and .name!="xroot")][0].name // empty'
}

# number of the workspace that currently holds the keyboard focus
focused_ws(){
  local fo; fo=$(focused_output)
  i3-msg -t get_workspaces | jq -r --arg fo "$fo" \
    '[.[]|select(.focused and .output==$fo)][0].num // ([.[]|select(.focused)][0].num) // empty'
}

# "<w> <h>" of the focused window
focused_rect(){
  i3-msg -t get_tree | jq -r '
    [..|objects|select(.focused==true and .type=="con")][0]
    | if . then "\(.rect.width) \(.rect.height)" else empty end'
}

case "${1:-}" in
  focus-other)
    o=$(other_output)
    [[ -n "$o" ]] || die "no other active output found"
    i3-msg "focus output $o" >/dev/null
    ;;
  move-other)
    o=$(other_output)
    [[ -n "$o" ]] || die "no other active output found"
    t=$(i3-msg -t get_workspaces | jq -r --arg o "$o" \
      '[.[]|select(.visible and .output==$o)][0].name // empty | select(length>0) | @json')
    [[ -n "$t" ]] || die "no visible workspace on other output"
    wid=$(i3-msg -t get_tree | jq -r '[..|objects|select(.focused==true and .type=="con")][0].id // empty')
    [[ -n "$wid" ]] || die "no focused window"
    i3-msg "[con_id=\"$wid\"] move container to workspace $t" >/dev/null
    i3-msg "[con_id=\"$wid\"] focus" >/dev/null
    ;;
  new-space)
    ws=$(focused_ws); p=1
    [[ "$ws" =~ ^[0-9]+$ ]] && (( ws % 2 == 0 )) && p=0
    if (( p )); then cands=(1 3 5 7 9 2 4 6 8 10)
    else              cands=(2 4 6 8 10 1 3 5 7 9)
    fi
    mapfile -t wss < <(i3-msg -t get_tree | jq -r '.. | objects | select(.type == "workspace" and .num >= 1) | "\(.num) \([.. | objects | select(.window != null)] | length)"')
    for n in "${cands[@]}"; do
      used=0
      for w in "${wss[@]}"; do
        set -- $w; [[ "$1" == "$n" ]] && { used=$2; break; }
      done
      if (( used == 0 )); then i3-msg "workspace number $n" >/dev/null; exit 0; fi
    done
    die "all 10 workspaces busy"
    ;;
  cycle-width|cycle-height)
    dim=width
    [[ "$1" == cycle-height ]] && dim=height
    exec python3 /home/march/bin/i3-cycle-size.py "$dim"
    ;;
  *)
    die "usage: i3-mon.sh {focus-other|move-other|new-space|cycle-width|cycle-height}"
    ;;
esac
