const test=require('node:test'),assert=require('node:assert/strict');
const {site}=require('./helpers.cjs');
test('collection directory opens each destination and retains reciprocal navigation',()=>{
 const s=site({initialHash:'#culture-directory'});try{
  assert.equal(s.E('history').hidden,false);
  const links=[...s.E('culture-directory').querySelectorAll('nav a')];assert.equal(links.length,12);
  for(const a of links){const id=a.hash.slice(1);assert.ok(s.E(id),id);s.route(id);assert.equal(s.E(id).closest('.guide-page').hidden,false,id);}
  for(const id of ['music','voices','storytelling','watch'])assert.ok(s.E(id).querySelector('a[href="#culture-directory"]'),id);
  for(const a of s.d.querySelectorAll('.reading-article')){assert.ok(a.querySelector('.culture-collection-nav'));const outline=a.querySelector('.culture-outline');if(outline)assert.ok(outline.compareDocumentPosition(a.querySelector('.narrative-body'))&s.w.Node.DOCUMENT_POSITION_FOLLOWING);}
 }finally{s.close();}
});
test('early recordings have no modern sound-system figure and cards follow credited article images',()=>{
 const s=site({initialHash:'#history'});try{
  const article=s.E('read-culture'),headings=[...article.querySelectorAll('h2')],sound=headings.find(h=>h.textContent.startsWith('Sound systems:'));
  const photo=article.querySelector('[data-media-record="sound-system-2009"]');assert.ok(sound.compareDocumentPosition(photo)&s.w.Node.DOCUMENT_POSITION_FOLLOWING);
  const jazz=headings.find(h=>h.textContent.startsWith('1931:'));assert.ok(jazz.compareDocumentPosition(sound)&s.w.Node.DOCUMENT_POSITION_FOLLOWING);
  assert.equal(s.E('read-court').querySelector('img'),null);
  assert.match(s.E('read-villages').querySelector('img').alt,/Maidstone/i);
  const rows=JSON.parse(s.E('history-article-data').textContent);for(const row of rows){s.input('search',row.title,'input');const card=[...s.E('results').children].find(c=>c.querySelector('.article-read-link')?.hash==='#'+row.id);if(!card)continue;const img=card.querySelector('img');if(img){const source=s.E(row.id).querySelector('[data-card-cover]')||s.E(row.id).querySelector('figure');assert.equal(img.src,source.querySelector('img').src,row.id);assert.ok(card.querySelector('.story-card-image-context').textContent);assert.ok(card.querySelector('.story-card-image-credit').textContent);}}
 }finally{s.close();}
});
