const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {site}=require('./helpers.cjs');
const rows=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../src/data/reconsidered-more.json'),'utf8')).articles;
test('second run opens each essay directly and supports ordered reading and search',()=>{
 const s=site();try{
  assert.equal(rows.length,7);
  s.route('history-reconsidered-more');assert(!s.E('history').hidden);assert(s.scrolls.includes('history-reconsidered-more'));
  const cards=s.E('history-reconsidered-more').querySelectorAll('.article-index-card');assert.deepEqual([...cards].map(c=>c.querySelector('a').hash.slice(1)),rows.map(r=>r.id));
  const pathway=JSON.parse(s.E('learning-path-data').textContent).find(p=>p.id==='reconsidered-more');assert.deepEqual(pathway.articles,rows.map(r=>r.id));
  for(const [i,row] of rows.entries()){
   s.route(row.id);const a=s.E(row.id);assert(!a.hidden);assert.equal([...s.d.querySelectorAll('.reading-article')].filter(x=>!x.hidden).length,1);
   assert(a.querySelector('.reader-media-nav'));assert(a.querySelector('.article-citations'));const nav=a.querySelector('.reconsidered-next');
   if(i)assert(nav.querySelector(`a[href="#${rows[i-1].id}"]`));if(i<6)assert(nav.querySelector(`a[href="#${rows[i+1].id}"]`));
  }
  s.route('history');s.input('search','reconsidered','input');for(const row of rows)assert(s.E('results').querySelector(`a[href="#${row.id}"]`),row.id);
  assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('new scholarly recording loads only on request and stops on reader departure; historical law opens in the image viewer',()=>{
 const s=site();try{
  s.route('reconsidered-tacky-atlantic');const box=s.E('reconsidered-tacky-atlantic').querySelector('.sensory-video');assert(box);assert(!box.querySelector('iframe'));box.querySelector('button').click();assert(box.querySelector('iframe').src.includes('G74WDexeevU'));assert(box.querySelector('iframe').src.includes('autoplay=1'));s.route('history');assert(box.querySelector('iframe').src.includes('autoplay=0'));
  s.route('reconsidered-obeah');const inspect=s.E('reconsidered-obeah').querySelector('.history-image-open');inspect.click();assert(s.E('history-image-viewer').hasAttribute('open'));assert(s.E('history-image-viewer').querySelector('.image-view-caption').textContent.includes('CO 139/108'));s.E('history-image-viewer').querySelector('.image-view-close').click();assert(!s.E('history-image-viewer').hasAttribute('open'));assert.deepEqual(s.errors,[]);
 }finally{s.close()}
});
