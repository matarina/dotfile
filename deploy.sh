#!/bin/bash

# Define the target user's home directory
USER_HOME="/home/debian"


#############singbox install
sudo curl -fsSL https://sing-box.app/gpg.key -o /etc/apt/keyrings/sagernet.asc
sudo chmod a+r /etc/apt/keyrings/sagernet.asc
echo "deb [arch=`dpkg --print-architecture` signed-by=/etc/apt/keyrings/sagernet.asc] https://deb.sagernet.org/ * *" | \
  sudo tee /etc/apt/sources.list.d/sagernet.list > /dev/null
sudo apt-get update
sudo apt-get install sing-box # or sing-box-beta


#############rime install
# fcitx5 config
sudo apt install -y fcitx5 fcitx5-rime

# Append environment variables to the user's profile
sudo echo "GTK_IM_MODULE=fcitx" >> /etc/environment
sudo echo "QT_IM_MODULE=fcitx" >> /etc/environment
sudo echo "XMODIFIERS=@im=fcitx" >> /etc/environment

# Create the necessary directories for fcitx5 configuration
mkdir -p "$USER_HOME/.config/fcitx5/conf"
cat > "$USER_HOME/.config/fcitx5/conf/classicui.conf" << EOF
# Vertical Candidate List
Vertical Candidate List=True
# Use Per Screen DPI
PerScreenDPI=True
# Use mouse wheel to go to prev or next page
WheelForPaging=True
# Font
Font="Sans Bold 15"
# Menu Font
MenuFont="Sans Bold 15"
# Tray Font
TrayFont="Sans Bold 15"
# Tray Label Outline Color
TrayOutlineColor=#000000
# Tray Label Text Color
TrayTextColor=#ffffff
# Prefer Text Icon
PreferTextIcon=False
# Show Layout Name In Icon
ShowLayoutNameInIcon=True
# Use input method language to display text
UseInputMethodLangaugeToDisplayText=True
# Theme
Theme=macOS-dark
# Force font DPI on Wayland
ForceWaylandDPI=0

EOF

cat > "$USER_HOME/.config/fcitx5/profile" << EOF
[Groups/0]
# Group Name
Name=Default
# Layout
Default Layout=us
# Default Input Method
DefaultIM=keyboard-us

[Groups/0/Items/0]
# Name
Name=rime
# Layout
Layout=

[Groups/0/Items/1]
# Name
Name=keyboard-us
# Layout
Layout=

[GroupOrder]
0=Default
EOF

# Create the directory for rime configuration and copy files
mkdir -p "$USER_HOME/.local/share/fcitx5/themes"
cp -r "$USER_HOME/dotfile/rime/" "$USER_HOME/.local/share/fcitx5"
cp -r "$USER_HOME/dotfile/macOS-dark/" "$USER_HOME/.local/share/fcitx5/themes"

