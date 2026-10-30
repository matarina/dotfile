#!/usr/bin/env bash
# Return success if the active pane is running (n)vim.
pane_tty="$(tmux display-message -p '#{pane_tty}')"
if [ -z "$pane_tty" ]; then
  exit 1
fi
ps -o state= -o comm= -t "$pane_tty" | grep -iqE '^[^TXZ ]+ +([^/]+/)?(g?vim|n?vim)(diff)?$'
