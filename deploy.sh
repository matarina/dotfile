#!/bin/bash

# Modified options here
clash_url="https://huahe.link/link/ug1nhgZZ0d7Wpzua?clash=2"
myhome="/home/ma"
ip_interface="enp0s3"
set -e

# Function to check if the system is Ubuntu
is_ubuntu() {
    if [ -f /etc/lsb-release ]; then
        if grep -q "DISTRIB_ID=Ubuntu" /etc/lsb-release; then
            return 0
        fi
    fi
    return 1
}

# Main script
if is_ubuntu; then
    echo "Ubuntu detected. Proceeding with operations..."

    # Remove snapd and related directories
    sudo rm -rf /var/cache/snapd/
    rm -fr ~/snap
    sudo apt autoremove --purge snapd -y

    # Hold snapd package to prevent reinstallation
    sudo apt-mark hold snapd

    # Add Mozilla Team PPA
    sudo add-apt-repository ppa:mozillateam/ppa -y

    # Create preferences file for Firefox
    echo '
Package: *
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 1001

Package: firefox
Pin: version 1:1snap*
Pin-Priority: -1
' | sudo tee /etc/apt/preferences.d/mozilla-firefox

    echo "Operations completed successfully."
else
    echo "This script is intended for Ubuntu systems only."
    exit 1
fi



# Update system and install dependencies
echo "Updating system and installing dependencies..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential xcb libx11-xcb-dev libxcb-xinerama0-dev \
		    libxcb-util0-dev libxcb-icccm4-dev libxcb-randr0-dev libxft-dev \
      		    libxcb-ewmh-dev  x11-xserver-utils libxcb-keysyms1-dev libxcb-shape0-dev \
    		    xinit vim git htop rofi stalonetray feh scrot ibus ibus-rime redshift \
    		    neovim kitty bc unzip tmux

# Deploy clash VPN
echo "Deploying clash VPN"
curl -LO https://gitee.com/petrioma/clash/raw/master/clash_terminal.tar.gz
mkdir -p $myhome/.local
tar -C "$myhome/.local/" -xvf clash_terminal.tar.gz && rm clash_terminal.tar.gz
sudo bash "$myhome/.local/clash_terminal/start.sh" -u "$clash_url"
. /etc/profile.d/clash.sh
proxy_on
echo "Proxy config done"

export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890

# Install fireofx with proxy
sudo apt -o Acquire::https::Proxy="http://127.0.0.1:7890" install firefox

# Install bspwm and sxhkd
echo "Installing bspwm and sxhkd..."
for repo in bspwm sxhkd; do
    git clone "https://github.com/baskerville/$repo.git"
    (cd "$repo" && make && sudo make install)
    rm -rf "$repo"
done

# Create .xinitrc file
echo "exec bspwm" > "$myhome/.xinitrc"


# Install lemonbar-xft
echo "Installing lemonbar-xft..."
git clone https://github.com/drscream/lemonbar-xft.git "$myhome/.local/lemonbar-xft"
(cd "$myhome/.local/lemonbar-xft" && make && sudo make install)


# Update .bashrc

content="
function proxy_on() {
        export http_proxy=http://127.0.0.1:7890
        export https_proxy=http://127.0.0.1:7890
        export no_proxy=127.0.0.1,localhost
        export HTTP_PROXY=http://127.0.0.1:7890
        export HTTPS_PROXY=http://127.0.0.1:7890
        export NO_PROXY=127.0.0.1,localhost
        echo -e \"proxy opened\"
}

function proxy_off(){
        unset http_proxy https_proxy no_proxy HTTP_PROXY HTTPS_PROXY NO_PROXY
        echo -e \"proxy closed\"
}

export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus

export PATH=\"\$PATH:/home/ma/.local/lemonbar\"

alias vi="nvim"
"

# Check if content already exists in .bashrc
if ! grep -qF "function proxy_on()" "/home/ma/.bashrc"; then
    echo "$content" >> "/home/ma/.bashrc"
    echo "Vars added to .bashrc"
else
    echo "Vars already exists in .bashrc"
fi

#Install fonts
mkdir -p $myhome/.local/share/fonts/Hack
curl -L -o Hack.zip   --progress-bar  https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/Hack.zip
unzip Hack.zip -d $myhome/.local/share/fonts/Hack
fc-cache -f


#load config file
git clone https://github.com/matarina/dotfile.git
mkdir -p $myhome/.config
mv dotfile/* $myhome/.config
sed -i '1a\ip_interface='"$ip_interface"'' $myhome/.config/lemonbar/lemon.sh

echo "Setup complete!"

