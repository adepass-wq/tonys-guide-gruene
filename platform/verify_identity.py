#!/usr/bin/env python3
"""Check unchanged public identity across saved before/after HTML snapshots.
Usage: python platform/verify_identity.py before.json after.json
Input: JSON mapping full public URL -> {status,canonical,title,description,robots,ga4_ids,structured_data,html_sha256}.
The html_sha256 is informational: shared UI changes may legitimately modify HTML.
Exit status nonzero if any baseline URL is missing or its SEO/analytics identity changed.
"""
import json,sys
from pathlib import Path

FIELDS=("status","canonical","title","description","robots","ga4_ids","structured_data")
def check(before,after):
    errors=[]
    for url,old in before.items():
        if url not in after:
            errors.append(f"MISSING URL: {url}")
            continue
        new=after[url]
        for field in FIELDS:
            if old.get(field)!=new.get(field):
                errors.append(f"{url} changed {field}: {old.get(field)!r} -> {new.get(field)!r}")
        if old.get("status")!=200:
            errors.append(f"baseline URL not healthy: {url} ({old.get('status')})")
    return errors
def main():
    if len(sys.argv)!=3:
        print(__doc__.strip());return 2
    before=json.loads(Path(sys.argv[1]).read_text())
    after=json.loads(Path(sys.argv[2]).read_text())
    errors=check(before,after)
    print("\n".join(errors) if errors else f"PASS: {len(before)} URLs preserve specified SEO and analytics identity")
    return int(bool(errors))
if __name__=="__main__":sys.exit(main())
