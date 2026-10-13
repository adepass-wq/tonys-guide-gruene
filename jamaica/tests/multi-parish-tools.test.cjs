const test=require('node:test'),assert=require('node:assert/strict'),{site}=require('./helpers.cjs');const frame=()=>new Promise(r=>setTimeout(r,45));
function choose(s,box,parish,checked=true){const input=[...s.E(box).querySelectorAll('input')].find(x=>x.value===parish);assert(input);input.checked=checked;input.dispatchEvent(new s.w.Event('change',{bubbles:true}));}
test('comparison allows several parishes, labels locations, clears excluded choices and recovers from an empty parish',()=>{
 const s=site();try{
 s.route('stop-comparison');assert.equal(s.E('compare-parish-filter').querySelectorAll('input').length,14);
 choose(s,'compare-parish-filter','St. Ann');choose(s,'compare-parish-filter','St. Mary');const select=s.E('compare-place-0');assert(select.querySelector('option[value="dunn"]').textContent.includes('St. Ann'));assert(select.querySelector('option[value="portmaria"]').textContent.includes('St. Mary'));assert(!select.querySelector('option[value="national-devon"]'));
 s.input('compare-place-0','dunn');s.input('compare-place-1','portmaria');s.input('compare-place-2','');assert(s.E('place-comparison').textContent.includes('St. Ann'));assert(s.E('place-comparison').textContent.includes('St. Mary'));assert(s.E('place-comparison').textContent.includes('Parish'));
 choose(s,'compare-parish-filter','St. Ann',false);assert.equal(s.E('compare-place-0').value,'');assert.equal(s.E('compare-place-1').value,'portmaria');s.input('compare-place-0','portmaria');assert.equal(s.E('place-comparison').querySelectorAll('thead th').length,2);
 choose(s,'compare-parish-filter','St. Mary',false);choose(s,'compare-parish-filter','Manchester');assert.equal(select.disabled,true);assert(s.E('compare-parish-count').textContent.startsWith('0 place'));s.E('compare-parish-filter').querySelector('button').click();assert.equal(select.disabled,false);assert(select.querySelector('option[value="national-devon"]'));
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('events apply union of parishes alongside existing filters and include national holidays without inventing local programmes',async()=>{
 const s=site();try{
 s.route('events');choose(s,'events-parish-filter','St. Mary');assert(!s.E('events-local-programmes').querySelector('.visitor-card'));choose(s,'events-parish-filter','St. Ann');assert(s.E('events-local-programmes').querySelector('.visitor-card'));assert(s.E('events-local-programmes').textContent.includes('St. Ann'));
 const rows=JSON.parse(s.E('travel-event-data').textContent);for(const x of rows){if(!s.E('event-'+x.id).hidden)assert(x.national||x.parishes.some(p=>['St. Ann','St. Mary'].includes(p)));}
 assert(s.E('event-expanded-6').textContent.includes('St. Mary'));assert(s.E('event-bzr').textContent.includes('St. Andrew'));assert(s.E('event-heroes').textContent.includes('Across Jamaica'));
 const M=s.w.TGParishFilters;assert(M.matches(rows.find(x=>x.id==='heroes'),['Clarendon']));assert(M.matches({parishes:['St. Andrew','Portland']},['Portland','St. Ann']));assert(!M.matches({parishes:['St. Andrew']},['St. Mary']));
 s.input('events-genre','Food & music');assert(!s.E('events-local-programmes').querySelector('.visitor-card'));s.E('events-parish-show').click();await frame();assert(s.scrolls.includes('events-count'));s.E('events-parish-filter').querySelector('button').click();assert.equal(s.E('events-parish-filter').querySelectorAll('input:checked').length,0);assert.equal(s.E('events-genre').value,'Food & music');assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
