const test=require('node:test'),assert=require('node:assert/strict');const {site}=require('./helpers.cjs');
test('Foodways routes, search, combined filters and reset work without exposing archive formulas',()=>{
 const s=site();try{
 s.route('foodways');assert(!s.E('foodways').hidden);const visible=()=>[...s.d.querySelectorAll('#foodways-grid .foodways-entry')].filter(x=>!x.hidden);
 assert.equal(visible().length,107);s.input('foodways-evidence-filter','sourced');assert.equal(visible().length,89);
 s.input('foodways-query','sorrel','input');assert.equal(visible().length,1);assert.equal(visible()[0].querySelector('h3').textContent,'Sorrel drink');
 s.input('foodways-category','Breads');assert.equal(visible().length,0);assert(!s.E('foodways-empty').hidden);
 s.E('foodways-reset').click();assert.equal(visible().length,107);assert.equal(s.d.activeElement,s.E('foodways-query'));
 s.input('foodways-query','<img src=x onerror=alert(1)>','input');assert.equal(visible().length,0);assert(!s.E('foodways-grid').querySelector('img'));
 s.route('foodways-completion-b-20');assert.equal(s.E('foodways-query').value,'');assert(!s.E('foodways-completion-b-20').hidden);assert(!s.E('foodways').hidden);
 assert(!s.d.getElementById('foodways-completion-a'));assert(!s.E('foodways').textContent.includes('800 g bone-in goat'));assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('Foodways controls and records are accessible, static and linked to existing guide destinations',()=>{
 const s=site();try{
 for(const id of ['foodways-query','foodways-category','foodways-evidence-filter'])assert(s.d.querySelector('label[for="'+id+'"]'));
 assert.equal(s.E('foodways-count').getAttribute('role'),'status');
 const data=require('../src/data/foodways-authentication.json');for(const c of new Set(data.entries.map(x=>x.category)))assert([...s.E('foodways-category').options].some(x=>x.value===c),c);
 for(const a of s.E('foodways').querySelectorAll('a[href^="#"]'))assert(s.E(a.hash.slice(1)),'Broken Foodways destination '+a.hash);
 assert.equal(s.d.querySelectorAll('#foodways-grid article').length,107);assert.equal(s.d.querySelectorAll('#foodways-grid .foodways-preparation').length,3);assert(!s.E('foodways-next-5').querySelector('.foodways-preparation'));assert(!s.E('foodways-completion-a-19').querySelector('.foodways-preparation'));assert(s.d.querySelectorAll('#foodways-grid .foodways-source-review>summary').length===107);
 for(const link of s.E('foodways').querySelectorAll('a[target="_blank"]'))assert(link.rel.includes('noopener'));
 for(const id of ['foodways-deep-history','foodways-history','foodways-inventory','foodways-field','foodways-standards']){s.route(id);assert(!s.E('foodways').hidden);}
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
