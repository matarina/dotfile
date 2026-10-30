# Papersway on i3

Installed version: 3.002, from the upstream CPAN release.
User-local executables: `~/.local/bin/papersway`, `papersway-msg`, and `papersway-ws-cmd`.
Dependencies live in `~/.local/share/papersway/perl5`.

Papersway starts through the existing i3bar. Two columns are visible by default;
additional columns scroll into view when you navigate horizontally. The bar shows
centered column dots on each monitor, with CPU usage, memory usage, and local date/time on the right. Focused windows retain
the 2-pixel orange border. Wi-Fi, IP/network, and battery metrics remain hidden.

| Shortcut | Action |
| --- | --- |
| Super + H/L or Left/Right | Focus the previous/next column and scroll |
| Super + Shift + H/L or Left/Right | Move the column left/right |
| Super + J/K or Down/Up | Focus a window below/above within a column |
| Super + Shift + J/K or Down/Up | Move a window down/up within a column |
| Super + F | Toggle the focused window between floating and tiled |
| Super + R | Toggle the focused column between normal and full width (only on R now) |
| Super + Shift + F | Toggle actual fullscreen |
| Super + Minus | Decrease visible columns, down to two |
| Super + Equal/Plus | Increase visible columns |
| Super + Ctrl + E | Absorb/expel toward the left column |
| Super + Ctrl + Shift + E | Absorb/expel toward the right column |
| Super + Page Up/Down or comma/period | Previous/next workspace on this monitor |
| Super + Shift + Page Up/Down | Move a column to the previous/next workspace on this monitor |
| Super + 1..0 | Jump to workspace 1..10; original monitor assignments retained |
| Super + Shift + 1..0 | Send a window to workspace 1..10 |
| Super + O | Focus the other monitor |
| Super + Shift + O | Move to the other monitor |
| Super + N | Open an empty numbered workspace, preferring the same monitor |
| Super + E | Open the file manager |
| Super + A/D/Z | Open the application launcher |
| Super + Return/T | Open a terminal |
| Super + B | Open Firefox |

Native split, tabbed, and stacked layout shortcuts were removed because Papersway
owns the tiling layout. Existing windows were kept on their numbered workspaces.
Workspaces named `*<container id>*` are Papersway's hidden columns; use the scrolling
shortcuts or the application switcher to reach those windows.

Configuration: `~/.config/i3/config`.
Status configuration: `~/.config/i3status/config`.
Log: `~/.local/state/papersway/papersway.log`.
The pre-Papersway configuration backup is recorded in
`~/.local/state/papersway/config-backup-path`.

Reloading i3 without changing the bar command keeps the active Papersway process.
The local indicator variant checkpoints the column order and restores it on restart within the same i3 session. If the saved state no longer matches the live windows, Papersway uses its original recovery behavior instead.

Upstream: https://metacpan.org/dist/App-papersway
Documentation: https://manpages.debian.org/unstable/papersway/papersway.1p.en.html

The centered indicator draws one circle per column in the visible workspace on each monitor. The current column is a solid orange circle; other columns are hollow gray circles, including off-screen columns. Vertically grouped windows count as one column. There are no app labels or position numbers. The circles are drawn with Cairo and require no fonts.

The indicator is an unmanaged GTK popup with an empty input region, so clicks pass through and it never receives keyboard focus. It follows the actual bar geometry, hides during fullscreen or when the bar is hidden, and adjusts when monitors change. A session lock prevents duplicate processes on reload.

The CPAN executable remains unchanged. `~/.local/bin/papersway` runs the local variant `~/.local/share/papersway/papersway-with-indicator`; the centered overlay is `column_indicator.py`, started by `~/.local/bin/papersway-dots`. `filter-status.py` forwards only the system metrics to i3bar.

Indicator log: `~/.local/state/papersway/dots.log`. Current geometry and column positions: `~/.local/state/papersway/dots-current.json`.

Super+R follows the visible width: shrinking a full-screen column restores
neighbouring columns. If a hidden full-width neighbour blocks this, that
neighbour returns to normal width as well - otherwise the key would dead-end,
since a full-width hidden column cannot be pulled back beside another one. A
workspace containing only one column still fills the screen, as required by
i3's tiling layout.
The local command sender uses a bounded, nonblocking FIFO write so shortcuts
cannot leave processes waiting indefinitely on a pipe replaced by a bar restart.
