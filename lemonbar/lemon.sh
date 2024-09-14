#!/bin/bash

bspwm() {
    local all occupied current
    all=$(bspc query -D)
    occupied=$(bspc query -D -d .occupied)
    current=$(bspc query -D -d .focused)

    local -r cdBACKGROUND="#0E0D0D" cdFOREGROUND="#f8f8ff" cdUNDERLINE="#1d1f21" 
    local -r coUNDERLINE="#00ff99" cfUNDERLINE="#ff0066"
    local -r cfBACKGROUND="#ff0066" cfFOREGROUND="#FFFFFF"
    local -r padding=" "

    local result="%{B$cdBACKGROUND}%{F$cdFOREGROUND}"

    while read -r line; do
        local name underline bg fg
        name=$(bspc query -d "$line" -D --names)
        if [[ "$current" == "$line" ]]; then
            underline="$cfUNDERLINE"
            bg="$cfBACKGROUND"
            fg="$cfFOREGROUND"
        elif [[ "$occupied" == *"$line"* ]]; then
            underline="$coUNDERLINE"
            bg="$cdBACKGROUND"
            fg="$cdFOREGROUND"
        else
            underline="$cdUNDERLINE"
            bg="$cdBACKGROUND"
            fg="$cdFOREGROUND"
        fi

        result+="%{B$bg}%{F$fg}%{U$underline}%{+u}"
        result+="$padding$name$padding"
        result+="%{-u}%{B-}%{F-}"
    done <<< "$all"

    result+="%{B-}%{F-}"
    echo "$result"
}

cpu() {
    usage=$(awk '/^cpu / {usage=($2+$4)*100/($2+$4+$5); printf "%.1f", usage}' /proc/stat)
    echo -e '\uf4bc' "$usage%"
}

mem() {
    mem_info=$(free -h | awk '/^Mem:/ {print $3 "/" $2}')
    echo -e '\uf51e' "$mem_info"
}


network() {
    local rx_bytes tx_bytes rx_mb tx_mb

    # Read the initial values
    read rx_bytes tx_bytes <<< $(grep enp2s0 /proc/net/dev | awk '{print $2, $10}')
    
    # Wait for 1 second
    sleep 1
    
    # Read the values again
    read rx_bytes_new tx_bytes_new <<< $(grep enp2s0 /proc/net/dev | awk '{print $2, $10}')
    
    # Calculate the difference and convert to MB/s
    rx_mb=$(echo "scale=2; ($rx_bytes_new - $rx_bytes) / 1024 / 1024" | bc)
    tx_mb=$(echo "scale=2; ($tx_bytes_new - $tx_bytes) / 1024 / 1024" | bc)
    echo -e '\ueac2' "${rx_mb} MB/s"  '\ueac3' "${tx_mb} MB/s"
}


while true; do
    echo "%{l}$(bspwm)%{c}$(date "+%Y-%m-%d %H:%M:%S")%{r}$(network) | $(mem) | $(cpu)  "
    sleep 0.1
done
