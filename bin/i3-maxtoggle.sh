#!/usr/bin/env bash
# PaperWM-style column maximize for i3 (bound to Super+f):
#   press 1: focused window's container -> tabbed layout + hide the docked i3bar
#   press 2: restore previous split layout + show i3bar again
# i3 has no layout-change hook, so the bar toggle lives here, in the keybinding.
export DISPLAY="${DISPLAY:-:0}"

layout=$(python3 - <<'PY'
import json, subprocess
t = json.loads(subprocess.check_output(['i3-msg', '-t', 'get_tree']))
def walk(n, parent=None):
    if n.get('type') == 'con' and n.get('focused'):
        return parent['layout'] if parent else ''
    for c in n.get('nodes', []) + n.get('floating_nodes', []):
        r = walk(c, n)
        if r is not None:
            return r
print(walk(t) or '')
PY
)

if [ "$layout" = "tabbed" ]; then
    # explicit splith (not `toggle split`) so layout and bar can never diverge
    i3-msg 'layout splith' >/dev/null
    i3-msg 'bar mode dock' >/dev/null
else
    i3-msg 'layout tabbed' >/dev/null
    i3-msg 'bar mode hide' >/dev/null
fi
