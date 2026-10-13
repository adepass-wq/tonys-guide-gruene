const test=require('node:test'),assert=require('node:assert/strict'),{site}=require('./helpers.cjs');
const tick=()=>new Promise(r=>setTimeout(r,60));
function checked(s,id){return [...s.E(id).querySelectorAll('input:checked')].map(x=>x.value);}
test('choosing a region follows food, activities, events, learning, planner and named weather; an explicit outside parish remains discoverable',async()=>{
 const s=site();try{
 s.route('corridors');s.d.querySelector('[data-corridor="portland"]').click();await tick();
 for(const id of ['activity-region-filters','food-region-filters','events-region-filters','guide-region-filters','compare-region-filters','schedule-region-filters'])assert.deepEqual(checked(s,id),['portland']);
 assert.equal(s.E('plan-region').value,'portland');assert.equal(s.E('history-region').value,'portland');assert.equal(s.E('conditions-bar-place').textContent,'Port Antonio');
 s.route('food');assert(s.E('food-branch').querySelector('option').value==='all');assert(![...s.E('food-branch').options].some(o=>o.textContent==='Ocho Rios'));assert(s.E('food-directory').textContent.includes('Boston'));assert(!s.E('food-directory').textContent.includes('Scotchies'));
 s.route('activities');assert(s.E('activity-directory-cards').textContent.includes('Reach'));assert(!s.E('activity-directory-cards').textContent.includes('Dunn’s River'));
 s.route('history');s.input('parish','St. Thomas','input');s.input('search','Kumina','input');assert(s.E('results').querySelector('[href="#parish-kumina"]'));assert.equal(s.E('conditions-bar-place').textContent,'Morant Bay');
 assert.deepEqual(JSON.parse(s.w.localStorage.getItem('tg-jamaica-context-v1')),['southeast']);assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('all regional tabs lead to full filtered content without duplicating IDs; multiple selections and all-island reset remain visible',async()=>{
 const s=site();try{
 for(const region of ['ocho-mary','montego','negril','portland','capital-mountains','southeast','south-elizabeth','central-interior']){
 s.route('corridors');s.d.querySelector('[data-corridor="'+region+'"]').click();await tick();
 for(const tab of ['activities','food','events','history','plan','overview']){s.d.querySelector('[data-region-tab="'+tab+'"]').click();assert.equal(s.d.querySelector('[data-region-tab="'+tab+'"]').getAttribute('aria-pressed'),'true');if(tab==='overview')assert.equal(s.d.querySelectorAll('[data-corridor-panel]:not([hidden])').length,1);else assert(!s.E('regional-preview').hidden);
 const ids=[...s.d.querySelectorAll('[id]')].map(x=>x.id);assert.equal(new Set(ids).size,ids.length,'duplicate IDs in '+region+' '+tab);
 }
 }
 s.route('activities');s.E('explore-region-choices').querySelectorAll('input').forEach(x=>x.checked=false);for(const v of ['montego','negril']){const x=[...s.E('explore-region-choices').querySelectorAll('input')].find(x=>x.value===v);x.checked=true;}s.E('context-apply').click();assert(s.E('explore-context-label').textContent.includes('Montego'));assert(s.E('explore-context-label').textContent.includes('Negril'));assert(s.scrolls.includes('activity-count'));s.E('context-all').click();assert.deepEqual(checked(s,'activity-region-filters'),[]);assert(s.E('activity-directory-cards').textContent.includes('Dunn’s River'));assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('saved trips and learning survive region changes, feed failure and restoration; planning imports saved stops and legacy tools still open',async()=>{
 const storage={'tg-jamaica-travel-v1':JSON.stringify(['regional-rocklands','food-border']),'tg-jamaica-reading':JSON.stringify(['legacy-drax']),'tg-jamaica-learning-v1':JSON.stringify({done:['legacy-drax'],notes:{'legacy-drax':'Look beyond the wheel.'},path:'slavery-built-records'}),'tg-jamaica-context-v1':JSON.stringify(['montego'])};
 const s=site({savedStorage:storage,feedFailure:true});try{
 await tick();assert.equal(s.E('conditions-place').value,'3');assert(s.E('conditions-weather-status').textContent.includes('unavailable'));
 s.route('my-jamaica');assert(!s.E('plan-your-day').hidden);assert.equal(s.E('my-trip-total').textContent,'2');assert.equal(s.E('my-reading-total').textContent,'1');assert(s.E('saved-learning-notes').textContent.includes('Look beyond'));
 s.route('stop-comparison');assert(s.E('stop-comparison').closest('details').open);const parish=[...s.E('compare-parish-filter').querySelectorAll('input')].find(x=>x.value==='Hanover');parish.checked=true;parish.dispatchEvent(new s.w.Event('change',{bubbles:true}));s.E('compare-use-shortlist').click();assert.equal(s.E('compare-place-0').value,'regional-rocklands');assert.equal(s.E('compare-place-1').value,'food-border');assert(s.E('place-comparison').textContent.includes('St. James'));
 s.route('personal-day');assert(!s.E('plan-your-day').hidden);s.E('schedule-use-shortlist').click();assert.equal(s.E('schedule-place-0').value,'regional-rocklands');assert.equal(s.E('schedule-place-1').value,'food-border');
 assert.deepEqual(JSON.parse(s.w.localStorage.getItem('tg-jamaica-travel-v1')),['regional-rocklands','food-border']);s.route('tools');assert(!s.E('plan-your-day').hidden);s.route('legacy-drax');assert.equal(s.E('note-legacy-drax').value,'Look beyond the wheel.');assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('regional search is explicitly scoped, while all-Jamaica learning remains available',()=>{
 const s=site();try{
 s.w.TGContext.set(['portland']);s.route('site-search');s.input('site-query','Dunn','input');assert(s.E('site-result-list').textContent.includes('Dunn’s River'));s.input('site-search-scope','region');assert(!s.E('site-result-list').querySelector('[href="#travel-dunn"]'));s.input('site-search-scope','all');assert(s.E('site-result-list').querySelector('[href="#travel-dunn"]'));
 assert.equal(s.E('home-region-grid').children.length,8);assert.equal(s.E('nav').querySelectorAll(':scope>a,:scope>details>summary>a').length,6);assert(s.E('slavery-legacies').matches('details'));assert(s.E('learning-path-grid').closest('details'));assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});

test('every recurring programme has a real destination and a direct record opens even outside a date window',async()=>{
 const s=site();try{const rows=JSON.parse(s.E('local-programme-data').textContent);for(const p of rows)assert(s.E('programme-'+p.id),p.id);s.w.TGContext.set(['portland']);s.input('events-from','2030-01-01');s.input('events-to','2030-01-01');s.route('programme-regional-dub');await tick();assert(!s.E('events').hidden);assert(!s.E('programme-regional-dub').hidden);assert(s.E('programme-regional-dub').textContent.includes('Kingston Dub Club'));assert(s.E('explore-context-label').textContent.includes('Kingston'));assert(s.scrolls.includes('programme-regional-dub'));assert(s.E('local-programme-count').textContent.includes('direct record'));assert.deepEqual(s.errors,[]);}finally{s.close();}
});

test('initial links to generated learning sequences and programme records resolve after controls mount',async()=>{
 for(const [hash,page] of [['#learning-country','history'],['#programme-regional-dub','events']]){const s=site({initialHash:hash});try{await tick();assert(!s.E(page).hidden,hash);assert(s.E(hash.slice(1)));assert.deepEqual(s.errors,[]);}finally{s.close();}}
});
