#!/bin/bash

set -e
USER_HOME="/home/ma"
FONT_DIR="$USER_HOME/.local/share/fonts"
CONFIG_DIR="$USER_HOME/.config"

####################### Install bspwm
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

echo "exec bspwm" >> $USER_HOME/.xinitrc



####################### Install singbox
sudo curl -fsSL https://sing-box.app/gpg.key -o /etc/apt/keyrings/sagernet.asc
sudo chmod a+r /etc/apt/keyrings/sagernet.asc
echo "deb [arch=`dpkg --print-architecture` signed-by=/etc/apt/keyrings/sagernet.asc] https://deb.sagernet.org/ * *" | \
  sudo tee /etc/apt/sources.list.d/sagernet.list > /dev/null
sudo apt-get update
sudo apt-get install sing-box # or sing-box-beta

sing-box run -c $USER_HOME/dotfile/config.json &
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890" 


####################### Install fcitx5
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
Font="Sans Bold 13"
MenuFont="Sans Bold 13"
TrayFont="Sans Bold 13"
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


####################### Install kitty
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


cp -r $USER_HOME/dotfile/.config $USER_HOME/
