#!/bin/bash
# archma dotfiles - Arch Linux + i3wm + Papersway (X11, gdm session).
#
# The repo root mirrors $HOME: .config/, .local/ and bin/ are copied into $HOME.
#
# Machine-specific notes
# ----------------------
# * The i3 config and the .local/bin/papersway* wrappers contain absolute
#   /home/march paths.  On a different username, rewrite them first:
#       grep -rl /home/march . --exclude-dir=.git | xargs sed -i "s#/home/march#$HOME#g"
# * Papersway here is a LOCALLY PATCHED App::papersway.  cpanm installs the
#   dependencies and the upstream script; .local/share/papersway/papersway-with-indicator
#   from this repo is then copied over it (patches: centred column dots,
#   float/i3 adaptations, Super+R shrink semantics).
# * clash-verge is expected on 127.0.0.1:7890; nothing routes through it at login.
set -euo pipefail
H="$HOME"

echo "== proxy (clash-verge) =="
git config --global http.proxy  http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

echo "== packages =="
sudo pacman -S --needed --noconfirm \
  i3-wm i3status i3lock xss-lock \
  xorg-xrandr xorg-xrdb xorg-xsetroot xorg-xset xorg-xev xorg-xinput \
  xclip jq dex feh scrot lxappearance \
  kitty firefox thunar rofi dunst \
  brightnessctl playerctl xfce4-taskmanager \
  fcitx5 fcitx5-rime fcitx5-configtool \
  network-manager-applet blueman \
  perl cpanminus perl-anyevent perl-json-xs \
  python python-gobject gtk3 python-cairo \
  noto-fonts-cjk noto-fonts-emoji

echo "== papersway deps (CPAN, local lib) =="
if [ ! -x "$H/.local/share/papersway/perl5/bin/papersway-ws-cmd" ]; then
  cpanm --notest --local-lib="$H/.local/share/papersway/perl5" App::papersway
fi

echo "== dotfiles =="
install -d "$H/.config" "$H/.local/bin" "$H/.local/share" "$H/.local/share/fcitx5/rime" "$H/bin"
cp -a .config/.      "$H/.config/"
cp -a .local/bin/.   "$H/.local/bin/"
cp -a .local/share/. "$H/.local/share/"
cp -a bin/.          "$H/bin/"
cp -a rime/.         "$H/.local/share/fcitx5/rime/"

chmod +x "$H"/.local/bin/papersway* "$H"/bin/* "$H"/.config/i3/*.sh 2>/dev/null || true

echo "== done. Log out and back in; the session runs i3 (see .config/i3/config) =="
