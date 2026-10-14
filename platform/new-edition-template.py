"""Create source only; never creates hosting, changes DNS or publishes."""
from pathlib import Path
import json,shutil,sys,hashlib
if len(sys.argv)!=4:raise SystemExit('Usage: python3 new-edition-template.py NEW_DIRECTORY EDITION_ID https://canonical-host')
dest=Path(sys.argv[1]);edition=sys.argv[2];host=sys.argv[3]
if dest.exists() or not host.startswith('https://') or '/' in edition:raise SystemExit('Use a new directory, simple edition ID and HTTPS host')
kit=Path(__file__).parent/'v1'
dest.mkdir();shutil.copytree(kit,dest/'platform/v1');(dest/'content').mkdir();(dest/'src').mkdir();(dest/'dist').mkdir()
(dest/'edition.json').write_text(json.dumps({'edition':edition,'canonicalHost':host.rstrip('/'),'platformVersion':'1.0.0','publishStatus':'not_registered_not_published','releasePolicy':'independent; preserve URLs, SEO, analytics; verified backup and acceptance checks before publication'},indent=2))
(dest/'README.md').write_text('# New Tony’s Guide edition\n\nKeep destination content in content/, edition adapters in src/, and generated output in dist/. Consume the pinned platform locally, never an unversioned remote script. Build the researched edition and test URLs, metadata, search, date boundaries, planning, mobile layout and live services before creating hosting. Do not reuse another edition’s project ID, content, analytics assignment or DNS.\n')
print('Created source template; no hosting or publication:',dest)
