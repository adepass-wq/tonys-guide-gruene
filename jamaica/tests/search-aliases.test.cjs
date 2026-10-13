const test=require('node:test'),assert=require('node:assert/strict'),{site}=require('./helpers.cjs'),S=require('../src/scripts/search-engine.js');
test('parish punctuation, Saint, joined spellings and local aliases are equivalent without confusing parishes',()=>{
 for(const parish of ['Andrew','Thomas','Mary','Ann','James','Elizabeth','Catherine']){
  const canonical='st '+parish.toLowerCase();
  for(const query of ['St. '+parish,'St '+parish,'st'+parish.toLowerCase(),'Saint '+parish,'Saint'+parish,'St.'+parish])assert.equal(S.normalize(query),canonical);
 }
 assert(S.matches('Border, St. Elizabeth / Westmoreland — fried fish','stelizabeth fry fish'));
 assert(!S.matches('St. Mary fried fish','stelizabeth fish'));
});
test('Border is discoverable, saved and filtered under either parish; corridor food and historical searches work',()=>{const s=site();try{
 const global=[];for(const q of ['St. Elizabeth','St Elizabeth','stelizabeth','Saint Elizabeth']){s.input('site-query',q,'input');global.push(s.E('site-result-count').textContent.split(' results')[0]);assert.match(s.E('site-result-list').textContent,/Border|Elizabeth/);}assert.equal(new Set(global).size,1);
 s.input('site-query','stelizabeth fry fish','input');assert.match(s.E('site-result-list').textContent,/Border/);
 s.route('food');s.input('food-query','stelizabeth fry fish','input');assert(s.E('food-directory').querySelector('[data-save-place="food-border"]'));assert(s.E('food-directory').querySelectorAll('.visitor-card').length>=1);const places=JSON.parse(s.E('travel-place-data').textContent);for(const card of s.E('food-directory').querySelectorAll('.visitor-card'))assert(places.find(p=>p.id===card.querySelector('[data-save-place]').dataset.savePlace).parishes.includes('St. Elizabeth'));assert.match(s.E('food-directory').textContent,/Border/);
 s.E('food-directory').querySelector('[data-save-place="food-border"]').click();assert(JSON.parse(s.w.localStorage.getItem('tg-jamaica-travel-v1')).includes('food-border'));
 s.input('food-query','','input');for(const name of ['St. Elizabeth','Westmoreland']){s.E('food-parish-filters').querySelectorAll('input').forEach(x=>x.checked=x.value===name);s.E('food-parish-filters').dispatchEvent(new s.w.Event('change',{bubbles:true}));assert.match(s.E('food-directory').textContent,/Border/);}
 s.route('activity-directory');s.input('activity-corridor','south-elizabeth');assert.match(s.E('activity-directory-cards').textContent,/Border/);assert.match(s.E('activity-directory-cards').textContent,/Middle Quarters/);assert.doesNotMatch(s.E('activity-directory-cards').textContent,/Boston Bay/);
 s.route('history');s.input('search','stelizabeth','input');assert.match(s.E('results').textContent,/Black River|Lacovia|Accompong/);
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}});
