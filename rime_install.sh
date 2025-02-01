#!/bin/bash

# Define the target user's home directory
USER_HOME="/home/debian"

# fcitx5 config
sudo apt update
sudo apt install -y fcitx5 fcitx5-rime


# Append environment variables to the user's profile
echo "GTK_IM_MODULE=fcitx" >> /etc/environment
echo "QT_IM_MODULE=fcitx" >> /etc/environment
echo "XMODIFIERS=@im=fcitx" >> /etc/environment

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
mkdir -p "$USER_HOME/.local/share/fcitx5/theme"
cp -r "$USER_HOME/dotfile/rime/" "$USER_HOME/.local/share/fcitx5"
cp -r "$USER_HOME/dotfile/macOS-dark/" "$USER_HOME/.local/share/fcitx5/theme"

