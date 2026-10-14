#!/usr/bin/env python3
"""Package the Jamaica site into an isolated output directory and reject missing local assets.
Run: python platform/build_jamaica.py jamaica/index.html dist-jamaica
Does not modify the live site or Render configuration.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import shutil, sys

class References(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag in ("script","img","iframe","source","video","audio"):
            key="src"
        elif tag=="link":
            key="href"
        else: return
        if a.get(key): self.refs.append(a[key])
        if tag in ("img","source") and a.get("srcset"):
            self.refs += [item.strip().split()[0] for item in a["srcset"].split(",") if item.strip()]
def local_path(reference):
    if reference.startswith(("#","//","data:","mailto:","tel:","javascript:")): return None
    parsed=urlsplit(reference)
    if parsed.scheme or parsed.netloc: return None
    candidate=unquote(parsed.path)
    if not candidate or candidate.endswith("/"): return None
    return candidate

def package(source, dest):
    source=Path(source).resolve()
    root=source.parent
    dest=Path(dest).resolve()
    if not source.is_file(): raise ValueError("Source HTML missing")
    if dest==root or root in dest.parents and dest==source:
        raise ValueError("Destination must differ from source")
    html=source.read_text(encoding="utf-8")
    parser=References();parser.feed(html)
    outputs=set()
    for ref in parser.refs:
        candidate=local_path(ref)
        if candidate is None: continue
        # Absolute root-relative paths use destination-root semantics.
        rel=candidate.lstrip("/")
        target=(root/rel).resolve()
        if root not in target.parents and root!=target:
            raise ValueError("Asset escapes source directory: "+ref)
        if not target.is_file():
            raise FileNotFoundError("Missing local asset: "+ref+" (looked for "+str(target)+")")
        outputs.add((target,rel))
    dest.mkdir(parents=True,exist_ok=True)
    shutil.copy2(source,dest/"index.html")
    for target,rel in sorted(outputs,key=lambda x:x[1]):
        final=dest/rel;final.parent.mkdir(parents=True,exist_ok=True)
        shutil.copy2(target,final)
    print(f"PASS: wrote index.html and {len(outputs)} local assets to {dest}")
    return len(outputs)
if __name__=="__main__":
    if len(sys.argv)!=3: raise SystemExit(__doc__)
    package(sys.argv[1],sys.argv[2])
