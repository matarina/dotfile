#!/bin/bash

sudo apt update
touch /home/ma/.xinit
echo "exec bspwm" >> /home/ma/.xinit
# List of packages to check and install
packages=(
    xorg
    xinit
    vim
    sudo
    curl
    bspwm
    sxhkd
    picom
    rofi
    ibus
    fonts-wqy-microhei
    fonts-noto-cjk
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
sudo apt install build-essential git cmake cmake-data pkg-config python3-sphinx python3-packaging libuv1-dev \
    libcairo2-dev libxcb1-dev libxcb-util0-dev libxcb-randr0-dev libxcb-composite0-dev python3-xcbgen xcb-proto \
    libxcb-image0-dev libxcb-ewmh-dev libxcb-icccm4-dev
git clone --recursive https://github.com/polybar/polybar
cd polybar && mkdir build && cd build
cmake ..
make -j4
sudo make install
cd "$HOME/dotfile"

#install neovim from source 
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux64.tar.gz
sudo rm -rf /opt/nvim
sudo tar -C /opt -xzf nvim-linux64.tar.gz

cat << 'EOF' >> ~/.bashrc
export PATH="$PATH:/opt/nvim-linux64/bin"
alias vi='nvim'
alias proxyon='export http_proxy=http://127.0.0.1:7897;export https_proxy=http://127.0.0.1:7897'
EOF
source ~/.bashrc



# download hack nerd-fonts
wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.0/Hack.zip
unzip Hack.zip -d $HOME/.local/share/fonts
fc-cache -fv
rm Hack.zip

wget https://dldir1.qq.com/qqfile/qq/QQNT/Linux/QQ_3.2.10_240715_amd64_01.deb
sudo dpkg -i QQ_3.2.10_240715_amd64_01.deb
rm QQ_3.2.10_240715_amd64_01.deb 
wget https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v1.7.3/clash-verge_1.7.3_amd64.deb
sudo dpkg -i clash-verge_1.7.3_amd64.deb
rm clash-verge_1.7.3_amd64.deb


# wechat install
wget -c -O atzlinux-v12-archive-keyring_lastest_all.deb https://www.atzlinux.com/atzlinux/pool/main/a/atzlinux-archive-keyring/atzlinux-v12-archive-keyring_lastest_all.deb
sudo apt -y install ./atzlinux-v12-archive-keyring_lastest_all.deb
sudo apt update
sudo cp /etc/lsb-release /etc/lsb-release.Ubuntu
sudo apt -y install com.tencent.wechat
sudo apt -y install electronic-wechat-icons-atzlinux
sudo cp /etc/lsb-release /etc/lsb-release.wechat


mkdir /home/ma/.config
mv ./* /home/ma/.config

