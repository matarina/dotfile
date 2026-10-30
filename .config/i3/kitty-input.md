# Chinese input in Kitty on i3/X11

Kitty needs `GLFW_IM_MODULE=ibus` before its GLFW frontend initializes. Fcitx5 supplies the compatible IBus frontend; the other app settings remain `XMODIFIERS=@im=fcitx`, `GTK_IM_MODULE=fcitx`, and `QT_IM_MODULE=fcitx`.

The setting is saved in `session-env.sh` and `~/.config/environment.d/fcitx5.conf`, and published to D-Bus/systemd activation. `~/.local/bin/kitty` corrects the native X11 environment and uses the separate `i3-fcitx` single-instance group, so new windows cannot attach to the older Kitty process with the missing input-method variable. i3's terminal shortcuts and local desktop entries use this launcher.

Open a new terminal with Super+Enter or Super+T. Toggle Rime with Super+Space. Existing Kitty windows keep their startup environment; reopen them when their running work permits. Reloading Kitty's configuration cannot reinitialize its display frontend.

Verification: a separate Kitty launched with XDG_SESSION_TYPE=x11 and GLFW_IM_MODULE=ibus registered an IBus input context with Fcitx5. Rime converted `ni` to `你`, and the terminal received Chinese text through its stdin.

Reference: https://fcitx-im.org/wiki/Setup_Fcitx_5#GLFW_IM_MODULE
