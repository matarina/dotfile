#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Update system
echo "Updating system..."
sudo apt update && sudo apt upgrade -y

# Install dependencies
echo "Installing dependencies..."
sudo apt install -y build-essential git xcb libxcb-util0-dev libxcb-ewmh-dev libxcb-randr0-dev libxcb-icccm4-dev libxcb-keysyms1-dev libxcb-xinerama0-dev libasound2-dev libxcb-xtest0-dev libxcb-shape0-dev libxcb-xkb-dev libxcb-xrm-dev libxcb-cursor-dev libasound2-dev libpulse-dev i3lock xss-lock

# Clone, compile and install bspwm
echo "Installing bspwm..."
git clone https://github.com/baskerville/bspwm.git
cd bspwm
make
sudo make install
cd ..

# Clone, compile and install sxhkd
echo "Installing sxhkd..."
git clone https://github.com/baskerville/sxhkd.git
cd sxhkd
make
sudo make install
cd ..

# Create config directories
echo "Creating config directories..."
mkdir -p ~/.config/{bspwm,sxhkd}



# Make bspwmrc executable
chmod +x ~/.config/bspwm/bspwmrc



# Create .xinitrc file
echo "Creating .xinitrc..."
echo "exec bspwm" > ~/.xinitrc

# Cleanup
echo "Cleaning up..."
rm -rf bspwm sxhkd


#install neovim
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux64.tar.gz
sudo rm -rf /opt/nvim
sudo tar -C /opt -xzf nvim-linux64.tar.gz
echo "export PATH="$PATH:/opt/nvim-linux64/bin"" > ~/.bashrc

#install kitty
curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin

