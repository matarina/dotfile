#!/usr/bin/env python3
"""Click-through, centered dots for each visible Papersway workspace on X11."""
import ctypes
import ctypes.util
import fcntl
import json
import math
import os
from pathlib import Path
import signal
import socket
import struct
import threading
import time

STATE_DIR = Path('/home/march/.local/state/papersway')
STATE_DIR.mkdir(parents=True, exist_ok=True)
LOCK = None

import cairo
import gi
gi.require_version('Gtk', '3.0')
gi.require_version('GdkX11', '3.0')
gi.require_version('GLibUnix', '2.0')
from gi.repository import Gtk, Gdk, GdkX11, GLib, GLibUnix

class Cookie(ctypes.Structure):
    _fields_ = [('sequence', ctypes.c_uint)]

class Attributes(ctypes.Structure):
    _fields_ = [('response_type', ctypes.c_uint8), ('backing_store', ctypes.c_uint8),
        ('sequence', ctypes.c_uint16), ('length', ctypes.c_uint32), ('visual', ctypes.c_uint32),
        ('window_class', ctypes.c_uint16), ('bit_gravity', ctypes.c_uint8), ('win_gravity', ctypes.c_uint8),
        ('backing_planes', ctypes.c_uint32), ('backing_pixel', ctypes.c_uint32),
        ('save_under', ctypes.c_uint8), ('map_is_installed', ctypes.c_uint8),
        ('map_state', ctypes.c_uint8), ('override_redirect', ctypes.c_uint8),
        ('colormap', ctypes.c_uint32), ('all_event_masks', ctypes.c_uint32),
        ('your_event_mask', ctypes.c_uint32), ('do_not_propagate_mask', ctypes.c_uint16),
        ('padding', ctypes.c_uint8 * 2)]

class Geometry(ctypes.Structure):
    _fields_ = [('response_type', ctypes.c_uint8), ('depth', ctypes.c_uint8),
        ('sequence', ctypes.c_uint16), ('length', ctypes.c_uint32), ('root', ctypes.c_uint32),
        ('x', ctypes.c_int16), ('y', ctypes.c_int16), ('width', ctypes.c_uint16),
        ('height', ctypes.c_uint16), ('border_width', ctypes.c_uint16), ('padding', ctypes.c_uint8 * 2)]

class XWindows:
    """Use checked XCB replies, so a bar disappearing cannot terminate GTK."""
    def __init__(self):
        self.lib = ctypes.CDLL(ctypes.util.find_library('xcb'))
        self.free = ctypes.CDLL(None).free
        self.free.argtypes = [ctypes.c_void_p]
        self.lib.xcb_connect.argtypes = [ctypes.c_char_p, ctypes.POINTER(ctypes.c_int)]
        self.lib.xcb_connect.restype = ctypes.c_void_p
        self.lib.xcb_disconnect.argtypes = [ctypes.c_void_p]
        for name, reply_type in [('get_window_attributes', Attributes), ('get_geometry', Geometry)]:
            request = getattr(self.lib, 'xcb_' + name)
            request.argtypes = [ctypes.c_void_p, ctypes.c_uint32]
            request.restype = Cookie
            reply = getattr(self.lib, 'xcb_' + name + '_reply')
            reply.argtypes = [ctypes.c_void_p, Cookie, ctypes.POINTER(ctypes.c_void_p)]
            reply.restype = ctypes.POINTER(reply_type)
        self.connection = self.lib.xcb_connect(None, None)

    def query(self, name, xid):
        error = ctypes.c_void_p()
        cookie = getattr(self.lib, 'xcb_' + name)(self.connection, xid)
        pointer = getattr(self.lib, 'xcb_' + name + '_reply')(self.connection, cookie, ctypes.byref(error))
        if error.value:
            self.free(error)
        if not pointer:
            return None
        reply = pointer.contents
        data = {name: getattr(reply, name) for name in ('map_state', 'override_redirect') if hasattr(reply, name)}
        data.update({name: getattr(reply, name) for name in ('x', 'y', 'width', 'height') if hasattr(reply, name)})
        self.free(pointer)
        return data

    def close(self):
        self.lib.xcb_disconnect(self.connection)

class IPC:
    def __init__(self):
        self.connection = None

    def close(self):
        if self.connection:
            self.connection.close()
        self.connection = None

    def request(self, kind, payload=''):
        if self.connection is None:
            self.connection = socket.socket(socket.AF_UNIX)
            self.connection.settimeout(1)
            # i3 publishes its socket as an X root property; use its existing session path.
            import subprocess
            path = subprocess.check_output(['i3', '--get-socketpath'], text=True, timeout=1).strip()
            self.connection.connect(path)
        message = payload.encode()
        self.connection.sendall(struct.pack('<6sII', b'i3-ipc', len(message), kind) + message)
        header = self.receive(14)
        magic, length, reply_kind = struct.unpack('<6sII', header)
        if magic != b'i3-ipc' or reply_kind != kind:
            raise ValueError('Invalid i3 IPC response')
        return json.loads(self.receive(length))

    def receive(self, count):
        chunks = []
        while count:
            data = self.connection.recv(count)
            if not data:
                raise ConnectionError('i3 IPC disconnected')
            chunks.append(data)
            count -= len(data)
        return b''.join(chunks)

def walk(node):
    yield node
    for child in node.get('nodes', []) + node.get('floating_nodes', []):
        yield from walk(child)

def column_position(workspace):
    ids = [int(i) for i in workspace.get('off_left', []) + workspace.get('cols', [])
           + list(reversed(workspace.get('off_right', [])))]
    focused = workspace.get('focused_col')
    return len(ids), ids.index(int(focused)) if focused is not None and int(focused) in ids else None

class DotWindow(Gtk.Window):
    def __init__(self, output):
        super().__init__(type=Gtk.WindowType.POPUP)
        self.set_title('Papersway dots ' + output)
        self.set_name('papersway-dots')
        self.set_decorated(False)
        self.set_accept_focus(False)
        self.set_focus_on_map(False)
        self.set_can_focus(False)
        self.set_skip_taskbar_hint(True)
        self.set_skip_pager_hint(True)
        self.set_resizable(False)
        self.total = 0
        self.current = None
        self.background = '#1d2021'
        self.area = Gtk.DrawingArea()
        self.area.connect('draw', self.draw)
        self.add(self.area)
        self.input_shape_combine_region(cairo.Region())
        self.connect('realize', self.realize_passthrough)
        self.connect('map', self.realize_passthrough)
        self.realize()

    def realize_passthrough(self, widget):
        self.input_shape_combine_region(cairo.Region())
        window = self.get_window()
        window.set_override_redirect(True)
        window.input_shape_combine_region(cairo.Region(), 0, 0)
        window.set_pass_through(True)

    def draw(self, area, context):
        width, height = area.get_allocated_width(), area.get_allocated_height()
        color = Gdk.RGBA()
        color.parse(self.background)
        context.set_source_rgb(color.red, color.green, color.blue)
        context.paint()
        pitch = min(20.0, max(1.0, (width-18.0)/max(1, self.total)))
        radius = min(5.5, pitch*.30)
        for index in range(self.total):
            x = width/2.0 + (index-(self.total-1)/2.0)*pitch
            context.arc(x, height/2.0, radius, 0, 2*math.pi)
            if index == self.current:
                context.set_source_rgb(0xd3/255, 0x54/255, 0)
                context.fill()
            else:
                context.set_source_rgb(0x99/255, 0x99/255, 0x99/255)
                context.set_line_width(min(1.6, radius*.5))
                context.stroke()
        return False

    def apply(self, model):
        self.total, self.current = model['total'], model['current']
        self.background = model['background']
        scale = max(1, self.get_scale_factor())
        width = max(24, min(model['output_width']//3, 18+20*self.total))
        width = max(1, round(width/scale))
        height = max(1, round(model['height']/scale))
        self.area.set_size_request(width, height)
        self.set_size_request(width, height)
        self.resize(width, height)
        x = round(model['center_x']/scale-width/2)
        y = round(model['y']/scale)
        self.move(x, y)
        if model['visible'] and self.total:
            self.show_all()
            self.get_window().raise_()
            self.area.queue_draw()
        else:
            self.hide()
        return {'x': x*scale, 'y': y*scale, 'width': width*scale, 'height': height*scale,
                'xid': self.get_window().get_xid(), 'visible': bool(self.get_visible())}

class Indicator:
    def __init__(self):
        self.windows = {}
        self.stop = threading.Event()
        self.last = None
        GLibUnix.signal_add(GLib.PRIORITY_DEFAULT, signal.SIGTERM, self.quit)
        GLibUnix.signal_add(GLib.PRIORITY_DEFAULT, signal.SIGINT, self.quit)
        threading.Thread(target=self.poll, daemon=True).start()

    def quit(self):
        self.stop.set()
        Gtk.main_quit()
        return False

    def update(self, models):
        # Only GTK's main thread creates, moves, draws, or destroys windows.
        active = {m['output'] for m in models}
        for output in set(self.windows)-active:
            self.windows.pop(output).destroy()
        reported = []
        for model in models:
            output = model['output']
            if output not in self.windows:
                self.windows[output] = DotWindow(output)
            geometry = self.windows[output].apply(model)
            reported.append(dict(model, **geometry))
        if reported != self.last:
            path = STATE_DIR / 'dots-current.json'
            temporary = path.with_suffix('.tmp')
            temporary.write_text(json.dumps(reported)+'\n')
            temporary.replace(path)
            self.last = reported
        return False

    def poll(self):
        ipc, xwindows = IPC(), XWindows()
        bar = {}
        next_bar_check = 0
        last_error = 0
        try:
            while not self.stop.is_set():
                try:
                    tree = ipc.request(4)
                    workspaces = ipc.request(1)
                    if time.monotonic() >= next_bar_check:
                        bar = ipc.request(6, 'bar-0')
                        next_bar_check = time.monotonic()+1
                    data = json.loads((STATE_DIR/'columns-state.json').read_text())
                    entries = {ws['name']: ws for ws in data.get('paper_ws', {}).values()}
                    tree_workspaces = {n['name']: n for n in walk(tree) if n['type']=='workspace'}
                    outputs = {n['name']: n for n in tree['nodes'] if n['type']=='output' and n['name']!='__i3'}
                    bars = {n.get('output'): n for n in walk(tree)
                            if n.get('window_properties', {}).get('class')=='i3bar'}
                    global_fullscreen = any(n['type']=='con' and n.get('fullscreen_mode')==2 for n in walk(tree))
                    models = []
                    for workspace in workspaces:
                        if not workspace['visible']:
                            continue
                        output = workspace['output']
                        dock = bars.get(output)
                        monitor = outputs.get(output)
                        if not dock or not monitor:
                            continue
                        attrs = xwindows.query('get_window_attributes', dock['window'])
                        geometry = xwindows.query('get_geometry', dock['window'])
                        if not attrs or not geometry:
                            continue
                        local_tree = tree_workspaces.get(workspace['name'], {})
                        fullscreen = global_fullscreen or any(n.get('type')=='con' and n.get('fullscreen_mode') for n in walk(local_tree))
                        total, current = column_position(entries.get(workspace['name'], {}))
                        rect = monitor['rect']
                        models.append({'output': output, 'workspace': workspace['name'], 'total': total,
                            'current': current, 'center_x': rect['x']+rect['width']/2,
                            'output_width': rect['width'], 'y': geometry['y'], 'height': geometry['height'],
                            'background': bar.get('colors', {}).get('background', '#1d2021'),
                            'visible': attrs['map_state']==2 and bar.get('mode')!='invisible' and not fullscreen
                                       and geometry['y']>=rect['y'] and geometry['y']<rect['y']+rect['height']})
                    GLib.idle_add(self.update, models)
                except (OSError, ValueError, KeyError, ConnectionError) as error:
                    ipc.close()
                    next_bar_check = 0
                    GLib.idle_add(self.update, [])
                    if time.monotonic()-last_error > 10:
                        print('papersway-dots:', error, flush=True)
                        last_error = time.monotonic()
                self.stop.wait(.20)
        finally:
            ipc.close()
            xwindows.close()

if __name__ == '__main__':
    LOCK = (Path(os.environ.get('XDG_RUNTIME_DIR', '/run/user/1000')) / 'papersway-dots.lock').open('w')
    try:
        fcntl.flock(LOCK, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        raise SystemExit(0)
    Indicator()
    Gtk.main()
