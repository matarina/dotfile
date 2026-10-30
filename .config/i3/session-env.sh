#!/bin/sh
# Native i3/Xorg session environment. Source before starting the window manager.
export XDG_SESSION_TYPE=x11
export XDG_CURRENT_DESKTOP=i3
export XDG_SESSION_DESKTOP=i3
export DESKTOP_SESSION=i3
export GDMSESSION=i3
export DISPLAY="${DISPLAY:-:0}"
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export SDL_IM_MODULE=fcitx
# Kitty uses Fcitx's compatible IBus frontend on X11.
export GLFW_IM_MODULE=ibus
export XMODIFIERS=@im=fcitx
unset WAYLAND_DISPLAY SWAYSOCK NIRI_SOCKET HYPRLAND_INSTANCE_SIGNATURE
unset QT_IM_MODULES QT_QPA_PLATFORM GDK_BACKEND MOZ_ENABLE_WAYLAND
unset ELECTRON_OZONE_PLATFORM_HINT OZONE_PLATFORM
unset XDG_MENU_PREFIX

# D-Bus has no unset method: empty obsolete activation values, then remove
# them from systemd's environment. Do not import unrelated shell secrets.
if command -v dbus-update-activation-environment >/dev/null 2>&1; then
    dbus-update-activation-environment --systemd \
        DISPLAY XDG_SESSION_TYPE XDG_CURRENT_DESKTOP XDG_SESSION_DESKTOP \
        DESKTOP_SESSION GDMSESSION GTK_IM_MODULE QT_IM_MODULE SDL_IM_MODULE GLFW_IM_MODULE XMODIFIERS \
        WAYLAND_DISPLAY= SWAYSOCK= NIRI_SOCKET= HYPRLAND_INSTANCE_SIGNATURE= \
        QT_IM_MODULES= QT_QPA_PLATFORM= GDK_BACKEND= MOZ_ENABLE_WAYLAND= \
        ELECTRON_OZONE_PLATFORM_HINT= OZONE_PLATFORM= XDG_MENU_PREFIX= >/dev/null 2>&1 || true
fi
if command -v systemctl >/dev/null 2>&1; then
    systemctl --user unset-environment \
        WAYLAND_DISPLAY SWAYSOCK NIRI_SOCKET HYPRLAND_INSTANCE_SIGNATURE \
        QT_IM_MODULES QT_QPA_PLATFORM GDK_BACKEND MOZ_ENABLE_WAYLAND \
        ELECTRON_OZONE_PLATFORM_HINT OZONE_PLATFORM XDG_MENU_PREFIX >/dev/null 2>&1 || true
fi
