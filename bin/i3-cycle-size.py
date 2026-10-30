#!/usr/bin/env python3
"""Cycle the resizable i3 column/row through fixed sizes, skipping impossible steps."""
import fcntl,json,os,subprocess,sys
from pathlib import Path

def ipc(kind):
 return json.loads(subprocess.check_output(['i3-msg','-t',kind],text=True))
def command(text):
 completed=subprocess.run(['i3-msg',text],text=True,stdout=subprocess.PIPE,stderr=subprocess.DEVNULL)
 if completed.returncode:return False
 result=json.loads(completed.stdout)
 return bool(result) and all(item.get('success',False) for item in result)
def focused_path(node,path=()):
 path=path+(node,)
 if node.get('focused'):return path
 for child in node.get('nodes',[])+node.get('floating_nodes',[]):
  found=focused_path(child,path)
  if found:return found
 return None
def find(node,cid):
 if node['id']==cid:return node
 for child in node.get('nodes',[])+node.get('floating_nodes',[]):
  match=find(child,cid)
  if match:return match
 return None

def cycle(dim):
 steps=[33,50,67,99] if dim=='width' else [60,80,100]
 path=focused_path(ipc('get_tree'))
 if not path or not path[-1].get('window'):raise RuntimeError('Focus a window to cycle its size')
 leaf=path[-1]
 output=next(n for n in path if n['type']=='output')
 workspace=next(n for n in path if n['type']=='workspace')
 base=output['rect'][dim]
 floating=any(n['type']=='floating_con' for n in path)
 if floating:
  branch=leaf;available=workspace['rect'][dim]
 else:
  axis='splith' if dim=='width' else 'splitv'
  branch=None
  # i3 walks past single-child wrappers when resizing. Match that axis and
  # resize the child column/row whose parent actually has siblings.
  for parent,child in reversed(list(zip(path,path[1:]))):
   if parent.get('layout')==axis and len(parent.get('nodes',[]))>1:
    branch=child;available=parent['rect'][dim];break
  if branch is None:
   # A lone tiled column occupies the full available width by design.
   return
 current=branch['rect'][dim]
 cache=Path.home()/'.cache/i3-cycle-size/state.json'
 try:state=json.loads(cache.read_text())
 except (OSError,ValueError):state={}
 key=f"{leaf['id']}:{dim}"
 saved=state.get(key,{})
 if (saved.get('branch')==branch['id'] and saved.get('base')==base
     and saved.get('step') in steps
     and abs(saved.get('actual',-999)-current)<=2):
  start=(steps.index(saved['step'])+1)%len(steps)
 else:
  tolerance=max(8,round(base*.02))
  targets=[base*s//100 if s<100 else available for s in steps]
  nearest=min(range(len(steps)),key=lambda i:abs(targets[i]-current))
  if abs(targets[nearest]-current)<=tolerance:start=(nearest+1)%len(steps)
  else:start=next((i for i,t in enumerate(targets) if t>current+tolerance),0)
 for offset in range(len(steps)):
  step=steps[(start+offset)%len(steps)]
  desired=min(available,base*step//100) if step<100 else available
  if abs(desired-current)<=2:continue
  if not command(f'[con_id="{branch["id"]}"] resize set {dim} {desired} px'):continue
  updated=find(ipc('get_tree'),branch['id'])
  if updated is None:return
  actual=updated['rect'][dim]
  # i3 can accept a command without changing a nested/single-child layout.
  # Read back geometry before advancing the remembered cycle position.
  if abs(actual-current)<=2 or abs(actual-desired)>16:continue
  state[key]={'branch':branch['id'],'base':base,'actual':actual,'step':step}
  # Drop stale window entries without losing the other dimension's cycle.
  tree=ipc('get_tree')
  state={k:v for k,v in state.items() if find(tree,int(k.split(':')[0]))}
  temporary=cache.with_suffix('.tmp');temporary.write_text(json.dumps(state));os.replace(temporary,cache)
  return
 # Every remaining step was impossible or unchanged; leave the tiled layout.

if __name__=='__main__':
 try:
  dim=sys.argv[1]
  if dim not in ('width','height'):raise ValueError('Expected width or height')
  directory=Path.home()/'.cache/i3-cycle-size';directory.mkdir(parents=True,exist_ok=True)
  with (directory/'lock').open('w') as lock:
   fcntl.flock(lock,fcntl.LOCK_EX)
   cycle(dim)
 except (OSError,ValueError,RuntimeError,subprocess.SubprocessError,IndexError) as error:
  print('i3-cycle-size: '+str(error),file=sys.stderr);sys.exit(1)
