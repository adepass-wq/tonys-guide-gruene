const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{site}=require('./helpers.cjs');
const batch=JSON.parse(fs.readFileSync('jamaica/src/data/slavery-legacies-evidence.json')).articles;
test('all fourteen parish journeys reach the staged article, save notes, progress and return to their collection',()=>{
 const s=site();try{
 assert.equal(batch.length,14);assert.equal(new Set(batch.map(x=>x.parish)).size,14);
 s.route('slavery-legacies');assert(!s.E('history').hidden);assert(s.scrolls.includes('slavery-legacies'));
 for(const row of batch){
  assert(s.E('slavery-legacies').querySelector('a[href="#'+row.id+'"]'));
  s.route('history');s.input('parish',row.parish,'input');s.input('search',row.title.split(':')[0],'input');
  assert(s.E('results').querySelector('a[href="#'+row.id+'"]'),row.id+' not discoverable by parish and topic');
  s.route(row.id);const a=s.E(row.id);assert(!a.hidden);assert.equal(s.d.querySelectorAll('.reading-article:not([hidden])').length,1);
  const note=s.E('note-'+row.id);note.value='A question about '+row.parish;note.dispatchEvent(new s.w.Event('input'));
  a.querySelector('[data-mark-read]').click();const saved=JSON.parse(s.w.localStorage.getItem('tg-jamaica-learning-v1'));
  assert.equal(saved.notes[row.id],note.value);assert(saved.done.includes(row.id));
  assert(a.querySelector('[data-learning-neighbors] a'));assert(a.querySelector('a[href="#slavery-legacies"]'));
  s.route('slavery-legacies');assert(!s.E('history').hidden);s.route(row.id);assert.equal(s.E('note-'+row.id).value,note.value);
 }
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('new legacy articles retain specific evidence, actual image identities and the incomplete parish programme',()=>{
 const s=site();try{
 const metadata=JSON.parse(fs.readFileSync('jamaica/src/data/article-metadata.json'));assert.equal(metadata.length,111);assert.equal(JSON.parse(s.E("history-article-data").textContent).length,111);
 const programme=JSON.parse(fs.readFileSync('jamaica/src/data/parish-editorial-programme.json'));assert.equal(programme.progress.complete_15_per_parish,false);
 assert.equal(programme.parishes.reduce((n,p)=>n+p.subjects.length,0),210);
 for(const row of batch){const a=s.E(row.id),m=metadata.find(x=>x.id===row.id);assert.deepEqual(m.parishes,[row.parish]);
  assert(a.querySelector('.narrative-body').textContent.split(/\s+/).length>=500,row.id+' too shallow');
  assert(a.querySelectorAll('.article-citations li').length>=2);assert(a.querySelector('.documentary-exercise'));
 }
 assert(s.E('legacy-daddy-rock').querySelector('img').alt.includes('not Daddy Rock'));
 assert(s.E('legacy-tryall').querySelector('img').alt.includes('not the waterwheel'));
 assert(s.E('legacy-orange-valley').querySelector('a[href="https://nljdigital.nlj.gov.jm/items/show/5510"]'));
 assert(!s.E('legacy-orange-valley').querySelector('img'));
 assert(s.E('legacy-hellshire').textContent.includes('historian’s argument'));
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
