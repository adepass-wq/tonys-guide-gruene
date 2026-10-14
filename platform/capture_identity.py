#!/usr/bin/env python3
"""Read-only SEO snapshot for Tony's Guide. Never publishes or changes sites.

Usage:
  python platform/capture_identity.py urls.txt baseline.json

urls.txt contains one full URL per line. Review and approve the resulting baseline
before using it in a before/after comparison. No credentials are required.
"""
import hashlib
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

UA = "TonysGuideMigrationAudit/0.1 (+read-only)"
GA_RE = re.compile(r"\bG-[A-Z0-9]{5,}\b")
class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.canonical = ""
        self.description = ""
        self.robots = ""
        self.scripts = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "link" and "canonical" in attrs.get("rel", "").lower().split():
            self.canonical = attrs.get("href", "")
        if tag == "meta":
            name = attrs.get("name", "").lower()
            if name == "description": self.description = attrs.get("content", "")
            if name == "robots": self.robots = attrs.get("content", "")
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
    def handle_data(self, data):
        if self.in_title:
            self.title += data

def snapshot_html(url, html, status=200):
    p = PageParser()
    p.feed(html)
    ld = []
    for body in re.findall(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.I|re.S):
        try: ld.append(json.loads(body))
        except json.JSONDecodeError: ld.append({"invalid_json": True})
    # Preserve structured-data semantic objects rather than script whitespace.
    return {"status": status, "canonical": p.canonical, "title": p.title.strip(),
            "description": p.description, "robots": p.robots,
            "ga4_ids": sorted(set(GA_RE.findall(html))),
            "structured_data": ld,
            "html_sha256": hashlib.sha256(html.encode("utf-8")).hexdigest()}
def fetch(url):
    if not url.startswith("https://"):
        raise ValueError("Require HTTPS URL: " + url)
    req = Request(url, headers={"User-Agent": UA, "Accept": "text/html"})
    try:
        with urlopen(req, timeout=20) as response:
            status = response.status
            charset = response.headers.get_content_charset() or "utf-8"
            raw = response.read(6_000_001)
            if len(raw)>6_000_000: raise ValueError("HTML too large: " + url)
            return snapshot_html(url, raw.decode(charset, errors="replace"), status)
    except HTTPError as error:
        return {"status": error.code, "error": str(error)}
    except (URLError, TimeoutError) as error:
        return {"status": 0, "error": str(error)}
def main(argv):
    if len(argv)!=3:
        print(__doc__); return 2
    urls = [x.strip() for x in Path(argv[1]).read_text().splitlines()
            if x.strip() and not x.lstrip().startswith("#")]
    if not urls or len(set(urls))!=len(urls):
        raise ValueError("URL list must be nonempty and contain no duplicates")
    output = {url: fetch(url) for url in urls}
    Path(argv[2]).write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n")
    failures = [url for url, entry in output.items() if entry["status"] != 200]
    print(f"Captured {len(urls)} URLs; failed: {len(failures)}")
    for url in failures: print("ERROR:", url, output[url].get("error", "bad HTTP status"))
    return int(bool(failures))
if __name__ == "__main__":
    sys.exit(main(sys.argv))
