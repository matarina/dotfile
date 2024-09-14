#!/bin/bash

# Modified options here
clash_url="https://huahe.link/link/ug1nhgZZ0d7Wpzua?clash=2"

set -e

# Update system and install dependencies
echo "Updating system and installing dependencies..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential xcb libxcb-xinerama0-dev libxcb-util0-dev libxcb-icccm4-dev libxcb-randr0-dev \
    libxcb-ewmh-dev libxcb-keysyms1-dev libxcb-shape0-dev xinit eza git htop rofi stalonetray feh scrot firefox ibus ibus-rime redshift

# Deploy clash VPN
echo "Deploying clash VPN"
curl -LO https://raw.githubusercontent.com/matarina/dotfile/master/clash_terminal.tar.gz
sudo tar -C "$HOME/.local/" -xvf clash_terminal.tar.gz && rm clash_terminal.tar.gz
sudo bash "$HOME/.local/clash_terminal/start.sh" -u "$clash_url"
source /etc/profile.d/clash.sh
proxy_on

# Test connection
if curl -s www.google.com > /dev/null; then
    echo "curl www.google.com produced output successfully"
else
    echo "Error: curl www.google.com failed" >&2
    exit 1
fi

echo "Proxy config done"

# Install bspwm and sxhkd
echo "Installing bspwm and sxhkd..."
for repo in bspwm sxhkd; do
    git clone "https://github.com/baskerville/$repo.git"
    (cd "$repo" && make && sudo make install)
    rm -rf "$repo"
done

# Create .xinitrc file
echo "exec bspwm" > "$HOME/.xinitrc"

# Install neovim
echo "Installing neovim..."
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux64.tar.gz
sudo rm -rf "$HOME/.local/nvim"
sudo tar -C "$HOME/.local/" -xzf nvim-linux64.tar.gz && rm nvim-linux64.tar.gz

# Install kitty
echo "Installing kitty..."
curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin

# Install lemonbar-xft
echo "Installing lemonbar-xft..."
git clone https://github.com/drscream/lemonbar-xft.git "$HOME/.local/lemonbar-xft"
(cd "$HOME/.local/lemonbar-xft" && make && sudo make install)

# Move configuration files
mv "$HOME/dotfile/.stalonetrayrc" "$HOME/dotfile/wall.png" "$HOME/.config/"

# Update .bashrc
cat << 'EOF' >> "$HOME/.bashrc"
export PATH="$PATH:$HOME/.local/nvim-linux64/bin:$HOME/.local/kitty.app/bin:$HOME/.local/lemonbar"
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
EOF


git clone https://github.com/matarina/dotfile.git
mv dotfile/* $HOME/.config

echo "Setup complete!"
