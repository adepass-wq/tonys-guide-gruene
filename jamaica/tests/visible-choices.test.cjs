const test=require('node:test'),assert=require('node:assert/strict'),{site}=require('./helpers.cjs');
const frame=s=>new Promise(resolve=>s.w.requestAnimationFrame(resolve));
test('hero search and date views are prominent and choices reveal the updated content',async()=>{const s=site();try{
assert(s.E('home-query').closest('.hero'));assert(s.d.querySelector('.hero [data-home-range="weekend"]'));assert(s.E('nav').querySelector(':scope > a[href="#home"]'));
s.d.querySelector('[data-home-range="weekend"]').click();await frame(s);assert(s.scrolls.includes('home-discovery'));assert.equal(s.d.activeElement.id,'home-discovery');
s.route('plan-your-day');s.d.querySelector('[data-trip-length="two"]').click();await frame(s);assert.equal(s.d.activeElement.id,'trip-plan-result');assert.equal(s.E('trip-plan-days').querySelectorAll('.plan-day-photo').length,2);s.E('trip-plan-days').querySelector('[data-save-plan]').click();await frame(s);assert.equal(s.d.activeElement.id,'trip-shortlist-section');
assert.equal(s.E('travel-alternatives').querySelectorAll(':scope > article > figure').length,3);
s.route('food');s.input('food-kind','quick');await frame(s);assert.equal(s.d.activeElement.id,'food-count');assert(s.E('food-directory').textContent.includes('Juici'));
s.route('plan-your-day');s.E('travel-alternatives').querySelector('.history-image-open').click();assert(s.E('history-image-viewer').querySelector('img').src.startsWith('data:image/jpeg;base64,'));assert.deepEqual(s.errors,[]);
}finally{s.close();}});
test('new regional history is discoverable through parish filters, search and single-article routes',()=>{const s=site();try{
s.route('history');s.input('parish','Trelawny','input');assert(s.E('results').textContent.includes('Falmouth'));assert(s.E('results').querySelector('a[href="#history-trelawny-falmouth"]'));
s.route('home');s.input('home-query','great houses','input');s.E('home-search-form').dispatchEvent(new s.w.Event('submit',{bubbles:true,cancelable:true}));assert(s.E('site-result-list').querySelector('a[href="#history-great-houses"]'));
for(const id of ['history-jamaica','history-ocho-stann','history-trelawny-falmouth','history-melissa-falmouth','history-stjames','history-cockpit','history-stmary-hills','history-housing','history-great-houses','history-dancehall','jamaica-like-local']){s.route(id);assert(!s.E(id).hidden);assert.equal([...s.d.querySelectorAll('.reading-article')].filter(x=>!x.hidden).length,1);assert(s.E(id).querySelector('.article-citations'));}
assert(s.E('history-dancehall').querySelector('audio[src*="jis.gov.jm"]'));assert(s.E('history-dancehall').querySelector('video[src*="unesco.org"]'));assert.deepEqual(s.errors,[]);
}finally{s.close();}});
