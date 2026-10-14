const test=require('node:test'),assert=require('node:assert/strict'),{site}=require('./helpers.cjs');
test('heritage directory filters tellers and story families visibly, clears empty results, and opens a single complete attributed tale',()=>{
 const s=site();try{
  s.route('storytelling');assert(!s.E('storytelling').hidden);
  const cards=()=>[...s.d.querySelectorAll('.heritage-tale-card')].filter(x=>!x.hidden);
  assert.equal(cards().length,24);
  s.input('heritage-query','Sarah Vassel','input');assert.equal(cards().length,1);assert(cards()[0].textContent.includes('Moss'));assert(s.E('heritage-count').textContent.startsWith('1 of 24'));
  s.input('heritage-query','not-a-real-teller','input');assert.equal(cards().length,0);assert(!s.d.querySelector('.heritage-no-results').hidden);
  s.E('heritage-clear').click();assert.equal(cards().length,24);
  s.input('heritage-group','Magic & households','input');assert(cards().length>2);assert(cards().every(c=>c.textContent.includes('Magic & households')));
  s.E('heritage-clear').click();s.input('heritage-query','Anancy','input');const n=cards().length;s.input('heritage-query','Ananse','input');assert.equal(cards().length,n);
  s.route('heritage-tale-ch41');assert(!s.E('heritage-tale-ch41').hidden);assert.equal([...s.d.querySelectorAll('.reading-article')].filter(x=>!x.hidden).length,1);assert(s.E('heritage-tale-ch41').textContent.includes('Henry Spence, Bog, Westmoreland.'));assert(s.E('heritage-tale-ch41').querySelector('.heritage-source-text').textContent.includes('Anansi lose him dinner.'));
  s.route('history');s.input('search','Anansi and Mosquito','input');assert(s.E('results').querySelector('a[href="#heritage-tale-ch92a"]'));
  assert.deepEqual(s.errors,[]);
 }finally{s.close()}
});
test('native Jamaican and African listening resources stay separate, load on request, allow one player and stop on global stop or leaving',()=>{
 const s=site();try{
  s.route('heritage-listen');const ja=s.E('heritage-listen').querySelectorAll('.heritage-player'),af=s.E('heritage-african-listen').querySelectorAll('.heritage-player');assert.equal(ja.length,5);assert.equal(af.length,3);
  assert.equal(s.d.querySelectorAll('.heritage-player iframe').length,0);
  ja[0].querySelector('button').click();assert(ja[0].querySelector('iframe').src.includes('9UAWbeRkwwc'));assert(ja[0].querySelector('iframe').title);
  ja[1].querySelector('button').click();assert.equal(s.d.querySelectorAll('.heritage-player iframe').length,1);assert(!ja[0].querySelector('iframe'));
  s.E('global-media-stop').click();assert.equal(s.d.querySelectorAll('.heritage-player iframe').length,0);assert(!ja[1].querySelector('button').hidden);
  af[1].querySelector('button').click();s.route('heritage-africa');assert.equal(s.d.querySelectorAll('.heritage-player iframe').length,0);
  assert(s.E('heritage-africa').querySelector('a[href="#heritage-african-listen"]'));assert.deepEqual(s.errors,[]);
 }finally{s.close()}
});
