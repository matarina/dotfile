#!/usr/bin/env python3
"""Send one Papersway command without hanging on a replaced FIFO."""
import errno
import os
from pathlib import Path
import re
import stat
import sys
import time


def main():
    if len(sys.argv) < 2:
        return 127
    socket = Path(os.environ["I3SOCK"])
    match = re.search(r"\d[\d.]*\d", socket.name)
    if not match:
        return 127
    pipe = socket.parent / f"papersway.{match[0]}.pipe"
    payload = (" ".join(sys.argv[1:]) + "\n").encode()
    if len(payload) > 4096 or b"\n" in payload[:-1]:
        print("papersway-msg: invalid or oversized command", file=sys.stderr)
        return 127
    deadline = time.monotonic() + 1.0
    while True:
        try:
            fd = os.open(pipe, os.O_WRONLY | os.O_NONBLOCK | os.O_NOFOLLOW)
            try:
                if not stat.S_ISFIFO(os.fstat(fd).st_mode):
                    raise OSError(errno.EINVAL, "command path is not a FIFO")
                if os.write(fd, payload) != len(payload):
                    raise OSError(errno.EIO, "incomplete command write")
            finally:
                os.close(fd)
            return 0
        except OSError as error:
            if error.errno not in (errno.ENOENT, errno.ENXIO, errno.EPIPE,
                                   errno.EAGAIN) or time.monotonic() >= deadline:
                print(f"papersway-msg: {error}", file=sys.stderr)
                return 127
            time.sleep(0.025)


if __name__ == "__main__":
    sys.exit(main())
