"""Read-only Tony's Guide publication checks; no credentials or visitor data."""
import concurrent.futures,json,urllib.request,re,datetime,sys
from pathlib import Path
HOSTS={'center-hill':'https://tonysguide.com','gruene':'https://gruene.tonysguide.com','mentone':'https://mentone.tonysguide.com','bryson':'https://bryson.tonysguide.com','jamaica':'https://jamaica.tonysguide.com'}
def inspect(item):
 edition,host=item;row={'edition':edition,'host':host,'checks':[]}
 for path in ['/','/robots.txt','/sitemap.xml'] if edition!='jamaica' else ['/']:
  try:
   with urllib.request.urlopen(urllib.request.Request(host+path,headers={'User-Agent':'TonysGuidePublicationCheck/1.0'}),timeout=25) as r:
    body=r.read().decode('utf-8');check={'path':path,'status':r.status,'finalUrl':r.url}
    if path=='/':check.update(title=(re.findall(r'<title[^>]*>(.*?)</title>',body,re.S)+[''])[0],canonical=re.findall(r'<link[^>]+rel=[\"\x27]canonical[\"\x27][^>]*href=[\"\x27]([^\"\x27]+)',body),analyticsIds=sorted(set(re.findall(r'G-[A-Z0-9]{6,}',body))))
    if path=='/sitemap.xml':check['urlCount']=len(re.findall(r'<loc>',body))
    row['checks'].append(check)
  except Exception as e:row['checks'].append({'path':path,'error':str(e)})
 return row
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:rows=list(pool.map(inspect,HOSTS.items()))
report={'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'editions':rows,'limits':['HTTP and markup checks do not establish mobile layout, GA4 receipt, media playback, link completeness or factual accuracy.']}
target=Path(sys.argv[1] if len(sys.argv)>1 else 'publication-check.json');target.write_text(json.dumps(report,indent=2));print(json.dumps(report))
if any('error' in c for row in rows for c in row['checks']):sys.exit(1)
