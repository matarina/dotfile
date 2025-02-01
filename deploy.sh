#!/bin/bash

# Exit on error
set -e

# Define variables
USER_HOME="/home/debian"
FONT_DIR="$USER_HOME/.local/share/fonts"
CONFIG_DIR="$USER_HOME/.config"

# Install required packages
sudo apt update
sudo apt install -y \
    fcitx5 \
    fcitx5-rime \
    build-essential \
    git \
    curl \
    tree \
    bspwm \
    sxhkd \
    xorg \
    xinit \
    feh \
    firefox-esr \
    redshift \
    dunst \
    nemo \
    unzip \
    wget

# Configure fcitx5
sudo tee -a /etc/environment << EOF
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
EOF

# Create fcitx5 config directories
mkdir -p "$CONFIG_DIR/fcitx5/conf"

# Configure fcitx5 UI
cat > "$CONFIG_DIR/fcitx5/conf/classicui.conf" << EOF
Vertical Candidate List=True
PerScreenDPI=True
WheelForPaging=True
Font="Sans Bold 15"
MenuFont="Sans Bold 15"
TrayFont="Sans Bold 15"
TrayOutlineColor=#000000
TrayTextColor=#ffffff
PreferTextIcon=False
ShowLayoutNameInIcon=True
UseInputMethodLangaugeToDisplayText=True
Theme=macOS-dark
ForceWaylandDPI=0
EOF

# Configure fcitx5 profile
cat > "$CONFIG_DIR/fcitx5/profile" << EOF
[Groups/0]
Name=Default
Default Layout=us
DefaultIM=keyboard-us

[Groups/0/Items/0]
Name=rime
Layout=

[Groups/0/Items/1]
Name=keyboard-us
Layout=

[GroupOrder]
0=Default
EOF

# Copy rime configuration
mkdir -p "$USER_HOME/.local/share/fcitx5/themes"
if [ -d "$USER_HOME/dotfile/rime" ]; then
    cp -r "$USER_HOME/dotfile/rime/" "$USER_HOME/.local/share/fcitx5"
fi
if [ -d "$USER_HOME/dotfile/macOS-dark" ]; then
    cp -r "$USER_HOME/dotfile/macOS-dark/" "$USER_HOME/.local/share/fcitx5/themes"
fi

# Configure X11
echo "exec bspwm" > "$USER_HOME/.xinitrc"

# Install Kitty terminal
curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin

# Install Neovim
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux-x86_64.tar.gz
sudo rm -rf /opt/nvim
sudo tar -C /opt -xzf nvim-linux-x86_64.tar.gz
rm nvim-linux-x86_64.tar.gz

# Update PATH in .bashrc
cat >> "$USER_HOME/.bashrc" << EOF
export PATH="\$PATH:\$HOME/.local/kitty.app/bin"
export PATH="\$PATH:/opt/nvim-linux-x86_64/bin"
EOF

# Install Nerd Fonts
mkdir -p "$FONT_DIR/Hack"
curl -L -o Hack.zip https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/Hack.zip
unzip Hack.zip -d "$FONT_DIR/Hack"
rm Hack.zip
fc-cache -f

# Install Dracula theme
mkdir -p "$USER_HOME/.themes" "$USER_HOME/.icons"
wget https://github.com/dracula/gtk/archive/master.zip -O dracula-gtk.zip
unzip dracula-gtk.zip
mv gtk-master "$USER_HOME/.themes/Dracula"

wget https://github.com/dracula/gtk/files/5214870/Dracula.zip -O dracula-icons.zip
unzip dracula-icons.zip
mv Dracula "$USER_HOME/.icons/"
rm dracula-gtk.zip dracula-icons.zip


echo "Setup complete! Please log out and log back in, or run: source ~/.bashrc"


