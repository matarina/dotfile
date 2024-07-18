#!/bin/sh
if [ -f /tmp/polybarhidden ]; then 
  polybar-msg cmd show > /dev/null
  bspc config top_padding 50
  rm /tmp/polybarhidden 
else 
  polybar-msg cmd hide > /dev/null
  bspc config top_padding 0 
  touch /tmp/polybarhidden 
fi
