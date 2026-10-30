# dotfile

Personal dotfiles. The repo root mirrors `$HOME`, so a deploy is a copy of
`.config/`, `.local/` and `bin/` into the home directory.

Current machine: **archma** - Arch Linux, X11, i3wm with
[Papersway](https://github.com/spikespaz/papersway) scrolling columns
(a PaperWM-style tiler), fcitx5+rime for CJK input.

## Layout

| Path | What |
| --- | --- |
| `.config/i3/` | i3 config, monitor setup, session env, kitty IME notes |
| `.local/bin/papersway*` | Papersway launchers (daemon, msg, bar, dots, guard, ws-cmd) |
| `.local/share/papersway/` | Papersway daemon (locally patched), status filter, column dots, command sender |
| `bin/` | i3 helpers: `i3-mon.sh`, `i3-maxtoggle.sh`, `i3-cycle-size.py`, `screencapture-*` |
| `.config/kitty`, `.config/fcitx5`, `.local/share/fcitx5/` | terminal, input method + rime patches and theme |
| `.config/nvim`, `.config/tmux` | editor and multiplexer |
| `deploy.sh` | Arch package install + copy into `$HOME` |

## Key bindings worth knowing (`$mod` = Super)

| Key | Action |
| --- | --- |
| `Super+F` | toggle focused window **floating <-> tiled** |
| `Super+Shift+F` | true fullscreen |
| `Super+R` | toggle focused column normal <-> full width |
| `Super+H/L`, `Super+Left/Right` | focus / scroll columns |
| `Super+Shift+H/L` | move column left/right |
| `Super+Ctrl+E` / `Super+Ctrl+Shift+E` | absorb/expel column left / right |
| `Super+Minus` / `Super+Plus` | fewer / more visible columns |
| `Super+1..0` | workspace 1-10 (1-5 on DP-1, 6-10 on HDMI-2) |
| `Super+O` / `Super+Shift+O` | focus / move to the other monitor |

## Notes

* Papersway runs as the i3bar status command; `i3-msg reload` does **not**
  restart it - a code change needs `i3-msg restart`. `~/.local/bin/papersway-guard`
  keeps it alive if it dies.
* `.local/share/papersway/papersway-with-indicator` is a patched copy of
  App::papersway; `deploy.sh` re-installs the CPAN module and then overlays this file.
* Absolute `/home/march` paths appear in the i3 config and papersway wrappers -
  see the rewrite note at the top of `deploy.sh` before using this on another host.
