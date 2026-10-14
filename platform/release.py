"""Pinned Tony's Guide platform adapter. Run sync before build; check before publish."""
from pathlib import Path
import hashlib,json,sys,shutil,re
R=Path(__file__).resolve().parent.parent
P=R/'platform';L=json.loads((P/'platform.lock.json').read_text());V=P/'v1'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
if sha(V/'manifest.json')!=L['manifestSha256']:raise SystemExit('FAIL: pinned platform manifest changed; release a new version')
M=json.loads((V/'manifest.json').read_text())
for name,digest in M['files'].items():
 if sha(V/name)!=digest:raise SystemExit('FAIL: shared module changed without version approval: '+name)
check='check' in sys.argv
for item in L['generated']:
 prefix=(V/item['prefix']).read_text();source=(R/item['source']).read_text()
 if item['prefix'].endswith('.css'):
  at=re.match(r'(?:@import[^;]+;\s*)*',source).end();expected=source[:at]+prefix+'\n'+source[at:]
 else:expected=prefix+'\n'+source
 out=R/item['output']
 if check:
  if not out.is_file() or out.read_text()!=expected:raise SystemExit('FAIL: stale generated adapter '+str(out))
 else:out.parent.mkdir(parents=True,exist_ok=True);out.write_text(expected)
if L.get('tripOutput'):
 out=R/L['tripOutput']
 if check:
  if out.read_bytes()!=(V/'trip-window.js').read_bytes():raise SystemExit('FAIL: stale calendar engine')
 else:shutil.copy2(V/'trip-window.js',out)
if check:
 baseline=json.loads((P/'content-baseline.json').read_text());bad=[]
 for path,digest in baseline.items():
  file=R/path
  if not file.is_file() or sha(file)!=digest:bad.append(path)
 if bad:raise SystemExit('FAIL: protected content, SEO or media changed: '+', '.join(bad[:25]))
 print('PASS:',L['edition'],'platform',M['version'],'pinned modules;',len(baseline),'content/SEO/media files unchanged')
else:print('PASS:',L['edition'],'platform',M['version'],'adapters synchronized')
