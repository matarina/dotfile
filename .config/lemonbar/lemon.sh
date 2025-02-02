#!/bin/bash

# Automatic network interface detection
get_active_interface() {
    # Try to find the interface with the default route first
    local default_iface=$(ip route | awk '/default/ {print $5}')
    if [[ -n "$default_iface" ]]; then
        echo "$default_iface"
        return
    fi
    
    # Fallback to first active interface with RX bytes > 0
    awk -F: 'NR > 2 {if ($2 > 0) {print $1; exit}}' /proc/net/dev
}

ip_interface=$(get_active_interface)

# Color definitions
readonly CD_BACKGROUND="#0E0D0D"
readonly CD_FOREGROUND="#f8f8ff"
readonly CD_UNDERLINE="#1d1f21"
readonly CO_UNDERLINE="#00ff99"
readonly CF_UNDERLINE="#ff0066"
readonly CF_BACKGROUND="#ff0066"
readonly CF_FOREGROUND="#FFFFFF"
readonly PADDING=" "

# Cache bspc query results
bspwm() {
    local all_desktops occupied_desktops current_desktop
    all_desktops=$(bspc query -D)
    occupied_desktops=$(bspc query -D -d .occupied)
    current_desktop=$(bspc query -D -d .focused)

    local result="%{B$CD_BACKGROUND}%{F$CD_FOREGROUND}"

    while IFS= read -r desktop; do
        local name underline bg fg
        name=$(bspc query -d "$desktop" -D --names)
        
        if [[ "$desktop" == "$current_desktop" ]]; then
            underline="$CF_UNDERLINE"
            bg="$CF_BACKGROUND"
            fg="$CF_FOREGROUND"
        elif [[ "$occupied_desktops" =~ "$desktop" ]]; then
            underline="$CO_UNDERLINE"
            bg="$CD_BACKGROUND"
            fg="$CD_FOREGROUND"
        else
            underline="$CD_UNDERLINE"
            bg="$CD_BACKGROUND"
            fg="$CD_FOREGROUND"
        fi

        result+="%{B$bg}%{F$fg}%{U$underline}%{+u}"
        result+="$PADDING$name$PADDING"
        result+="%{-u}%{B-}%{F-}"
    done <<< "$all_desktops"

    echo -n "${result}%{B-}%{F-}"
}

cpu() {
    awk '/^cpu / {usage=($2+$4)*100/($2+$4+$5); printf " %.1f%%", usage}' /proc/stat
}

mem() {
    free -m | awk '/Mem:/ {printf " %s/%sMB", $3, $2}'
}

network() {
    [[ -z "$ip_interface" ]] && { echo " No Interface"; return; }

    # Use a temporary file to store previous values
    local tmp_file="/tmp/network_stats_${ip_interface}"
    local rx_bytes tx_bytes now

    # Read current values
    read rx_bytes tx_bytes <<< $(awk -v iface="$ip_interface" '$0 ~ iface ":" {print $2, $10}' /proc/net/dev)
    now=$(date +%s)

    # Read previous values if they exist
    if [[ -f "$tmp_file" ]]; then
        local prev_rx prev_tx prev_time
        read prev_rx prev_tx prev_time < "$tmp_file"
        
        local interval=$((now - prev_time))
        if (( interval > 0 )); then
            local rx_rate=$(( (rx_bytes - prev_rx) / interval / 1024 ))
            local tx_rate=$(( (tx_bytes - prev_tx) / interval / 1024 ))
            echo " ${rx_rate}KB/s  ${tx_rate}KB/s"
        fi
    fi

    # Save current values for next run
    echo "$rx_bytes $tx_bytes $now" > "$tmp_file"
}

while true; do
    # Update network interface periodically (every 60 seconds)
    (( ${SECONDS} % 60 == 0 )) && ip_interface=$(get_active_interface)

    printf "%%{l}%s%%{c}%s%%{r}%s | %s | %s \n" \
        "$(bspwm)" \
        "$(date "+%H:%M-%d-%m")" \
        "$(network)" \
        "$(mem)" \
        "$(cpu)"
    
    sleep 1
done



