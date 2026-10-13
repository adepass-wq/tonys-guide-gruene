const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{site}=require('./helpers.cjs');
test('every article is reachable through a learning sequence; nested route opens it and preserves the chosen sequence',()=>{
 const s=site();try{
 const paths=JSON.parse(s.E('learning-path-data').textContent),ids=[...s.d.querySelectorAll('.reading-article')].map(a=>a.id);
 assert.equal(new Set(paths.flatMap(p=>p.articles)).size,ids.length);
 for(const id of ids)assert(s.E('learning-sequences').querySelector('a[href="#'+id+'"]'));
 s.route('learning-home');assert(!s.E('history').hidden);assert(s.E('learning-sequences').closest('details').open);assert(s.scrolls.includes('learning-home'));
 s.E('learning-home').querySelector('a[href="#history-housing"]').click();s.route('history-housing');
 assert(s.E('history-housing').querySelector('[data-learning-position]').textContent.includes('How people made a home'));
 assert(s.E('history-housing').querySelector('[data-learning-neighbors] a[href="#hh-seville"]'));
 const b=s.E('history-housing').querySelector('[data-mark-read]');b.click();assert.equal(b.getAttribute('aria-pressed'),'true');
 const note=s.E('note-history-housing');note.value='Compare plot ownership with estate housing.';note.dispatchEvent(new s.w.Event('input'));
 const saved=JSON.parse(s.w.localStorage.getItem('tg-jamaica-learning-v1'));assert(saved.done.includes('history-housing'));assert.equal(saved.notes['history-housing'],note.value);
 b.click();assert(!JSON.parse(s.w.localStorage.getItem('tg-jamaica-learning-v1')).done.includes('history-housing'));
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('multi-parish documentary articles can be found by parish and full-text search',()=>{
 const s=site();try{
 s.route('history');s.input('parish','Manchester','input');assert(s.E('results').querySelector('a[href="#read-villages"]'));assert(s.E('results').querySelector('a[href="#jh-port-maria"]'));
 s.input('parish','All','input');s.input('search','Maidstone','input');assert(s.E('results').textContent.includes('emancipation'));assert(s.E('results').querySelector('.reading-duration'));
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
