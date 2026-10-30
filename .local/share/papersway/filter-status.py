#!/usr/bin/env python3
"""Keep system metrics on i3bar; centered dots are drawn separately."""
import json
import sys

for line in sys.stdin:
    candidate = line.strip().lstrip(',').rstrip(',')
    if candidate.startswith('[') and candidate != '[':
        blocks = [b for b in json.loads(candidate) if b.get('name') not in ('hostinfo', 'cols')]
        print(json.dumps(blocks) + ',', flush=True)
    else:
        print(line, end='', flush=True)
