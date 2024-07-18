#!/bin/bash


sudo apt update
sudo apt install -y xorg xinit
touch /home/ma/.xinit
echo "exec bspwm" >> /home/ma/.xinit
# List of packages to check and install
packages=(
    vim
    sudo
    curl
    bspwm
    sxhkd
    picom
    rofi
    ibus
    ibus-rime
    pulseaudio
    pavucontrol
    paprefs
    tmux
    dunst
    feh
    kitty
    neovim
    thunar
    firefox-esr
    htop
    libreoffice
)

# Update package list
echo "Updating package list..."

# Function to install polybar from source

# Iterate over the list of packages
for package in "${packages[@]}"; do
    if dpkg -l | grep -q "^ii  $package "; then
        echo "$package is already installed."
    else
        echo "Installing $package..."
        sudo apt install -y "$package"
                ;;
    fi
done

echo "All packages checked and processed."

#install polybar from source 
sudo apt install build-essential git cmake cmake-data pkg-config python3-sphinx python3-packaging libuv1-dev libcairo2-dev libxcb1-dev libxcb-util0-dev libxcb-randr0-dev libxcb-composite0-dev python3-xcbgen xcb-proto libxcb-image0-dev libxcb-ewmh-dev libxcb-icccm4-dev
git clone --recursive https://github.com/polybar/polybar
cd polybar
mkdir build
cd build
cmake ..
make -j4
sudo make install
cd ../..

#install neovim from source 
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux64.tar.gz
sudo rm -rf /opt/nvim
sudo tar -C /opt -xzf nvim-linux64.tar.gz
echo "export PATH="$PATH:/opt/nvim-linux64/bin"" >> ~/.bashrc
echo "alias vi='nvim'" >> ~/.bashrc
echo "alias proxyon='export http_proxy=http://127.0.0.1:7897;export https_proxy=http://127.0.0.1:7897'" >> ~/.bashrc
source ~/.bashrc



# Define the font and download URL
FONT_NAME="Hack"
NERD_FONT_URL="https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.0/Hack.zip"

# Create a temporary directory
TEMP_DIR=$(mktemp -d)
echo "Created temporary directory $TEMP_DIR"

# Download the Nerd Font zip file
echo "Downloading $FONT_NAME Nerd Font..."
wget -O "$TEMP_DIR/$FONT_NAME.zip" "$NERD_FONT_URL"

# Extract the font files
echo "Extracting $FONT_NAME Nerd Font..."
unzip -q "$TEMP_DIR/$FONT_NAME.zip" -d "$TEMP_DIR"

# Create the fonts directory if it doesn't exist
FONT_DIR="$HOME/.local/share/fonts"
mkdir -p "$FONT_DIR"

# Move the font files to the fonts directory
echo "Installing $FONT_NAME Nerd Font..."
mv "$TEMP_DIR"/*.ttf "$FONT_DIR"
mv "$TEMP_DIR"/*.otf "$FONT_DIR"

# Update the font cache
echo "Updating font cache..."
fc-cache -fv

# Clean up
echo "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

echo "$FONT_NAME Nerd Font installation complete!"
wget https://dldir1.qq.com/qqfile/qq/QQNT/Linux/QQ_3.2.10_240715_amd64_01.deb
sudo dpkg -i QQ_3.2.10_240715_amd64_01.deb
rm QQ_3.2.10_240715_amd64_01.deb 
wget https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v1.7.3/clash-verge_1.7.3_amd64.deb
sudo dpkg -i clash-verge_1.7.3_amd64.deb
rm clash-verge_1.7.3_amd64.deb
mkdir /home/ma/.config
mv ./* /home/ma/.config


# wechat install
wget -c -O atzlinux-v12-archive-keyring_lastest_all.deb https://www.atzlinux.com/atzlinux/pool/main/a/atzlinux-archive-keyring/atzlinux-v12-archive-keyring_lastest_all.deb
sudo apt -y install ./atzlinux-v12-archive-keyring_lastest_all.deb

sudo apt update

sudo cp /etc/lsb-release /etc/lsb-release.Ubuntu

sudo apt -y install com.tencent.wechat

sudo apt -y install electronic-wechat-icons-atzlinux

sudo cp /etc/lsb-release /etc/lsb-release.wechat
