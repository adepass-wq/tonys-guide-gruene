#!/usr/bin/env python3
"""Package the Jamaica site into an isolated output directory and reject missing local assets.
Run: python platform/build_jamaica.py jamaica/index.html dist-jamaica
Does not modify the live site or Render configuration.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import shutil, sys, re, subprocess

class References(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag in ("script","img","iframe","source","video","audio"):
            key="src"
        elif tag=="link":
            key="href"
        else: key=None
        if key and a.get(key): self.refs.append(a[key])
        if a.get("style"):
            self.refs += css_urls(a["style"])
        if tag in ("img","source") and a.get("srcset"):
            self.refs += [item.strip().split()[0] for item in a["srcset"].split(",") if item.strip()]
def css_urls(style):
    return [x.strip().strip(chr(34) + chr(39)) for x in re.findall(r"url\(\s*([^)]*?)\s*\)", style, re.I)]

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
    if dest == root or root in dest.parents:
        raise ValueError("Destination must be outside the source directory")
    html=source.read_text(encoding="utf-8")
    parser=References();parser.feed(html)
    parser.refs += css_urls(" ".join(re.findall(r"<style\b[^>]*>(.*?)</style>", html, re.I | re.S)))
    outputs=set()
    unavailable=[]
    placeholder="/assets/tonys-guide-image-placeholder.svg"
    image_extensions={".jpg",".jpeg",".png",".webp",".gif",".avif"}
    for ref in parser.refs:
        candidate=local_path(ref)
        if candidate is None: continue
        # Absolute root-relative paths use destination-root semantics.
        rel=candidate.lstrip("/")
        target=(root/rel).resolve()
        if root not in target.parents and root!=target:
            raise ValueError("Asset escapes source directory: "+ref)
        if not target.is_file():
            if target.suffix.lower() in image_extensions:
                unavailable.append(ref)
                html=html.replace(ref,placeholder)
                continue
            raise FileNotFoundError("Missing local asset: "+ref+" (looked for "+str(target)+")")
        outputs.add((target,rel))
    dest.mkdir(parents=True,exist_ok=True)
    (dest/"index.html").write_text(html,encoding="utf-8")
    if unavailable:
        fallback=dest/"assets"/"tonys-guide-image-placeholder.svg"
        fallback.parent.mkdir(parents=True,exist_ok=True)
        fallback.write_text('<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640"><rect width="960" height="640" fill="#e7e7df"/><path d="M200 430L370 270L480 365L600 225L760 430" fill="none" stroke="#adb6a7" stroke-width="22"/><text x="480" y="515" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#4f5d54">Image being updated</text></svg>',encoding="utf-8")
        print("WARN: substituted",len(unavailable),"missing images",unavailable[:12])
    # CSS assets can reference fonts and further images; inspect them recursively.
    pending=list(outputs)
    checked=set()
    while pending:
        target, rel=pending.pop()
        if rel in checked: continue
        checked.add(rel)
        if target.suffix.lower()==".css":
            css=target.read_text(encoding="utf-8")
            for ref in css_urls(css):
                candidate=local_path(ref)
                if candidate is None: continue
                child_rel=str((Path(rel).parent / candidate.lstrip("/")).as_posix()) if not candidate.startswith("/") else candidate.lstrip("/")
                child=(root/child_rel).resolve()
                if root not in child.parents and child!=root: raise ValueError("CSS asset escapes source directory: "+ref)
                if not child.is_file(): raise FileNotFoundError("Missing CSS asset: "+ref)
                item=(child,child_rel)
                if item not in outputs: outputs.add(item);pending.append(item)
    for target,rel in sorted(outputs,key=lambda x:x[1]):
        final=dest/rel;final.parent.mkdir(parents=True,exist_ok=True)
        shutil.copy2(target,final)
    print(f"PASS: wrote index.html and {len(outputs)} local assets to {dest}")
    return len(outputs)
if __name__=="__main__":
    if len(sys.argv)!=3: raise SystemExit(__doc__)
    # The canonical Jamaica builder extracts embedded, credited base64 images
    # into public/assets. Never replace original images with placeholders.
    dest=Path(sys.argv[2]).resolve()
    source=Path(sys.argv[1]).resolve()
    if dest==source.parent or source.parent in dest.parents:
        raise ValueError("Destination must be outside source directory")
    dest.mkdir(parents=True,exist_ok=True)
    subprocess.run(["npm","test"],check=True)
    subprocess.run(["node","jamaica/scripts/build.cjs","--output",str(dest/"index.html")],check=True)
    built=dest/"index.html"
    html=built.read_text(encoding="utf-8")
    refs=References()
    refs.feed(html)
    refs.refs += css_urls(" ".join(re.findall(r"<style\\b[^>]*>(.*?)</style>",html,re.I|re.S)))
    missing=[]
    for ref in refs.refs:
        loc=local_path(ref)
        if loc:
            candidate=(dest/loc.lstrip("/")).resolve()
            if dest not in candidate.parents or not candidate.is_file():
                missing.append(ref)
    if missing:
        raise FileNotFoundError("Generated output contains missing assets: "+repr(missing[:20]))
    print("PASS: canonical Jamaica builder output and",len(refs.refs),"asset references checked")

