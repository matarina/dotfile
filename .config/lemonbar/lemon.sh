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
readonly CO_UNDERLINE="#575752"
readonly CF_UNDERLINE="#D76418"
readonly CF_BACKGROUND="#D76418"
readonly CF_FOREGROUND="#FFFFFF"
readonly PADDING=" "

# Cache bspc query results
bspwm() {
    local all_desktops occupied_desktops current_desktop
    all_desktops=$(bspc query -D)
    occupied_desktops=$(bspc query -D -d .occupied)
    current_desktop=$(bspc query -D -d .focused)

    readonly CO_BACKGROUND="#575752"

    local result="%{B$CD_BACKGROUND}%{F$CD_FOREGROUND}"

    while IFS= read -r desktop; do
        local name bg fg underline
        name=$(bspc query -d "$desktop" -D --names)
        
        if [[ "$desktop" == "$current_desktop" ]]; then
            underline="$CF_UNDERLINE"
            bg="$CF_BACKGROUND"
            fg="$CF_FOREGROUND"
        elif [[ "$occupied_desktops" =~ "$desktop" ]]; then
            bg="$CO_BACKGROUND"
            fg="$CD_FOREGROUND"
            underline=""
        else
            bg="$CD_BACKGROUND"
            fg="$CD_FOREGROUND"
            underline=""
        fi

        result+="%{B$bg}%{F$fg}"
        if [[ "$desktop" == "$current_desktop" ]]; then
            result+="%{U$underline}%{+u}"
        fi
        result+="$PADDING$name$PADDING"
        if [[ "$desktop" == "$current_desktop" ]]; then
            result+="%{-u}"
        fi
        result+="%{B-}%{F-}"
    done <<< "$all_desktops"

    echo -n "${result}%{B-}%{F-}"
}

cpu() {
    awk '/^cpu / {usage=($2+$4)*100/($2+$4+$5); printf " %.1f%%", usage}' /proc/stat
}


network() {
    [[ -z "$ip_interface" ]] && { echo " No Interface"; return; }

    local tmp_file="/tmp/network_stats_${ip_interface}"
    local rx_bytes tx_bytes now

    read rx_bytes tx_bytes <<< $(awk -v iface="$ip_interface" '$0 ~ iface ":" {print $2, $10}' /proc/net/dev)
    now=$(date +%s)

    # Initialize with zeros if no previous data
    local rx_rate="0.0"
    local tx_rate="0.0"

    if [[ -f "$tmp_file" ]]; then
        local prev_rx prev_tx prev_time
        read prev_rx prev_tx prev_time < "$tmp_file"
        
        local interval=$((now - prev_time))
        if (( interval > 0 )); then
            rx_rate=$(awk -v diff="$((rx_bytes - prev_rx))" -v intv="$interval" 'BEGIN { printf "%.1f", diff / intv / 1048576 }')
            tx_rate=$(awk -v diff="$((tx_bytes - prev_tx))" -v intv="$interval" 'BEGIN { printf "%.1f", diff / intv / 1048576 }')
        fi
    fi

    echo "$rx_bytes $tx_bytes $now" > "$tmp_file"
    
    # Use printf to ensure consistent spacing
    printf " %2.1fMB/s  %2.1fMB/s" "$rx_rate" "$tx_rate"
}



mem() {
    free -m | awk '/Mem:/ {printf " %.1f/%.1fGB", $3/1024, $2/1024}'
}

# Cache for metrics that update every second
declare -A metrics
metrics[date]=""
metrics[network]=""
metrics[mem]=""
metrics[cpu]=""
last_update=0

while true; do
    current_time=$(date +%s)
    
    # Update network interface every 60 seconds
    (( current_time % 60 == 0 )) && ip_interface=$(get_active_interface)
    
    # Update 1-second metrics
    if (( current_time > last_update )); then
        metrics[date]="$(date "+%H:%M-%d-%m")"
        metrics[network]="$(network)"
        metrics[mem]="$(mem)"
        metrics[cpu]="$(cpu)"
        last_update=$current_time
    fi

    # Print the bar with cached metrics and fresh bspwm data
    printf "%%{l}%s%%{c}%s%%{r}%s %s %s \n" \
        "$(bspwm)" \
        "${metrics[date]}" \
        "${metrics[network]}" \
        "${metrics[mem]}" \
        "${metrics[cpu]}"
    
    sleep 0.1
done

