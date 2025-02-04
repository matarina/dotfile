#!/bin/bash
set -e
USER_HOME="${HOME}"
FONT_DIR="$USER_HOME/.local/share/fonts"
CONFIG_DIR="$USER_HOME/.config"

####################### Install bspwm
sudo sed  '/^deb\|^deb-src/ s|$| contrib non-free|' /etc/apt/sources.list
sudo apt update

if lspci | grep -i nvidia &> /dev/null; then
    sudo apt install nvidia-driver
fi
sudo apt install -y \
    fcitx5 xclip libnotify-bin\
    pulseaudio pulseaudio-utils pavucontrol\
    fcitx5-rime  dbus-x11\
    build-essential \
    git picom\
    curl \
    tree \
    bspwm \
    sxhkd \
    xorg \
    xinit axel \
    feh \
    firefox-esr \
    redshift \
    dunst \
    nemo  scrot \
    unzip papirus-icon-theme \
    wget build-essential pkg-config \
    libxcb1-dev libxcb-xinerama0-dev libxcb-randr0-dev \
    libx11-xcb-dev libxft-dev \
    libfreetype6-dev libfontconfig1-dev \
    libxinerama-dev libxcb-util0-dev

echo "exec bspwm" >> $USER_HOME/.xinitrc

####################### Install singbox
sudo curl -fsSL https://sing-box.app/gpg.key -o /etc/apt/keyrings/sagernet.asc
sudo chmod a+r /etc/apt/keyrings/sagernet.asc
echo "deb [arch=`dpkg --print-architecture` signed-by=/etc/apt/keyrings/sagernet.asc] https://deb.sagernet.org/ * *" | \
  sudo tee /etc/apt/sources.list.d/sagernet.list > /dev/null
sudo apt-get update
sudo apt-get install sing-box # or sing-box-beta

mkdir -p $USER_HOME/.local/singbox
curl -fsSL -o $USER_HOME/.local/singbox/config.json 1.94.105.129:8888/config.json
sing-box run -c $USER_HOME/.local/singbox/config.json &

git config --global http.proxy "http://127.0.0.1:7890"
git config --global https.proxy "http://127.0.0.1:7890"

git clone https://github.com/matarina/dotfile.git "$USER_HOME/dotfile"

echo "####################### Install lemonbar"
if [ ! -d "$USER_HOME/.local/lemonbar-xft" ]; then
    git clone https://github.com/drscream/lemonbar-xft.git "$USER_HOME/.local/lemonbar-xft"
    (cd "$USER_HOME/.local/lemonbar-xft" && make && sudo make install)
fi

echo "####################### Install stalonetray from source"
git clone https://github.com/kolbusa/stalonetray.git "$USER_HOME/stalonetray"
cd "$USER_HOME/stalonetray"
# Install dependencies for building stalonetray
sudo apt install autoconf automake docbook-xsl libxpm-dev libx11-dev xsltproc
aclocal && autoheader && autoconf && automake --add-missing
./configure
make
sudo make install
cd ..
rm -rf stalonetray

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
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin

# Install Neovim
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux-x86_64.tar.gz
sudo rm -rf /opt/nvim
sudo tar -C /opt -xzf nvim-linux-x86_64.tar.gz
rm nvim-linux-x86_64.tar.gz

# Update PATH in .bashrc
cat >> "$USER_HOME/.bashrc" << EOF
#proxy switch
function proxy_on() {
	export http_proxy=http://127.0.0.1:7890
	export https_proxy=http://127.0.0.1:7890
	export no_proxy=127.0.0.1,localhost
    	export HTTP_PROXY=http://127.0.0.1:7890
    	export HTTPS_PROXY=http://127.0.0.1:7890
 	export NO_PROXY=127.0.0.1,localhost
	echo -e "\033[32m[√] proxy turn on\033[0m"
}

function proxy_off() {
	unset http_proxy=http://127.0.0.1:7890
	unset https_proxy=http://127.0.0.1:7890
	unset no_proxy=127.0.0.1,localhost
    	unset HTTP_PROXY=http://127.0.0.1:7890
    	unset HTTPS_PROXY=http://127.0.0.1:7890
 	unset NO_PROXY=127.0.0.1,localhost
	echo -e "\033[32m[√] proxy turn off\033[0m"
}

#env path
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
rm -rf $USER_HOME/dotfile/



echo "Removing existing Docker packages..."
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do
    sudo apt-get remove -y $pkg
done

echo "Downloading Docker packages..."
axel  https://download.docker.com/linux/debian/dists/bookworm/pool/stable/amd64/containerd.io_1.7.25-1_amd64.deb
axel https://download.docker.com/linux/debian/dists/bookworm/pool/stable/amd64/docker-buildx-plugin_0.20.0-1~debian.12~bookworm_amd64.deb
axel https://download.docker.com/linux/debian/dists/bookworm/pool/stable/amd64/docker-ce-cli_27.5.1-1~debian.12~bookworm_amd64.deb
axel https://download.docker.com/linux/debian/dists/bookworm/pool/stable/amd64/docker-ce_27.5.1-1~debian.12~bookworm_amd64.deb
axel https://download.docker.com/linux/debian/dists/bookworm/pool/stable/amd64/docker-compose-plugin_2.32.4-1~debian.12~bookworm_amd64.deb

echo "Installing Docker packages..."
sudo dpkg -i containerd.io_1.7.25-1_amd64.deb \
            docker-ce_27.5.1-1~debian.12~bookworm_amd64.deb \
            docker-ce-cli_27.5.1-1~debian.12~bookworm_amd64.deb \
            docker-buildx-plugin_0.20.0-1~debian.12~bookworm_amd64.deb \
            docker-compose-plugin_2.32.4-1~debian.12~bookworm_amd64.deb

echo "Starting Docker service..."
sudo service docker start

echo "Cleaning up downloaded files..."
rm -f containerd.io_1.7.25-1_amd64.deb \
      docker-ce_27.5.1-1~debian.12~bookworm_amd64.deb \
      docker-ce-cli_27.5.1-1~debian.12~bookworm_amd64.deb \
      docker-buildx-plugin_0.20.0-1~debian.12~bookworm_amd64.deb \
      docker-compose-plugin_2.32.4-1~debian.12~bookworm_amd64.deb

