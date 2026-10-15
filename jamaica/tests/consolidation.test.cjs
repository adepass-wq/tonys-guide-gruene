const test=require('node:test'),assert=require('node:assert/strict'),{site}=require('./helpers.cjs');
test('two homepage entrances and six culture collections replace competing landing directories',()=>{const s=site();try{
 const paths=[...s.d.querySelectorAll('.home-primary-paths>a')];assert.deepEqual(paths.map(x=>x.hash),['#trip-planner','#culture-directory']);assert(s.E('home-trip-start').closest('details'));assert.equal(s.E('home-trip-start').closest('details').open,false);
 const cards=[...s.E('culture-directory').querySelectorAll('nav a')];assert.equal(cards.length,6);assert.equal(s.d.querySelectorAll('#history .history-quick-start,#history .learning-entrances').length,0);
 for(const a of cards){s.route(a.hash.slice(1));const target=s.E(a.hash.slice(1));assert.equal(target.closest('.guide-page').hidden,false);for(let n=target;n;n=n.parentElement)if(n.tagName==='DETAILS')assert.equal(n.open,true);}
 for(const id of ['jamaica-reconsidered','history-reconsidered-more','slavery-legacies','parish-library','artifact-desk','history-era-explorer','stories','learning-desk']){s.route(id);assert.equal(s.E('history').hidden,false);for(let n=s.E(id).parentElement;n;n=n.parentElement)if(n.tagName==='DETAILS')assert.equal(n.open,true,id);}
 s.route('learn-jamaica');assert.equal(s.E('history').hidden,false);assert.equal(s.E('learn-jamaica').dataset.routeAlias,'culture-directory');assert.equal(s.d.querySelectorAll('.reading-article').length,153);assert.deepEqual(s.errors,[]);
 }finally{s.close();}});
test('planning presents choose, save, refine and take-away with optional tools and resources retained',()=>{const s=site();try{
 const links=[...s.E('plan-your-day').querySelector('.plan-steps').querySelectorAll('a')];assert.deepEqual(links.map(x=>x.hash),['#trip-planner','#trip-shortlist-section','#customize-day','#trip-takeaway']);
 assert.equal(s.E('planning-tool-directory').open,false);assert.equal(s.E('customize-day').open,false);assert.equal(s.E('trip-takeaway').open,false);
 assert(s.E('trip-planner').compareDocumentPosition(s.E('visitor-resource-desk'))&s.w.Node.DOCUMENT_POSITION_FOLLOWING);
 s.route('trip-planner');s.E('trip-plan-days').querySelector('[data-save-plan]').click();const saved=JSON.parse(s.w.localStorage.getItem('tg-jamaica-travel-v1'));assert(saved.length);assert.equal(s.E('schedule-place-0').value,saved[0]);assert.equal(s.E('compare-place-0').value,saved[0]);
 for(const id of ['all-tools','personal-day','stop-comparison','travel-budget','trip-checklist','visitor-resource-desk','my-reading','trip-takeaway']){s.route(id);assert.equal(s.E('plan-your-day').hidden,false);for(let n=s.E(id);n;n=n.parentElement)if(n.tagName==='DETAILS')assert(n.open,id);}
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}});
test('old language-atlas links resolve to one visible map and recordings destination',()=>{const s=site({initialHash:'#island-voice-atlas'});try{
 assert.equal(s.E('voices').hidden,false);assert.equal(s.E('interactive-island').closest('[hidden]'),null);assert.equal(s.E('sources').querySelector('#island-voice-atlas'),null);assert(s.E('sources').querySelector('.language-archive-links a[href="#voices"]'));
 assert(s.E('island-voice-atlas').closest('.language-compatibility').hidden);
 for(const id of ['iva-current-name','iva-parish-grid','iva-compare-output']){s.route(id);assert.equal(s.E('voices').hidden,false);assert.equal(s.E(id).dataset.routeAlias,'interactive-island');}
 s.input('voice-query','fishing','input');assert([...s.E('regional-listening').querySelectorAll('.voice-card')].some(x=>!x.hidden));assert.deepEqual(s.errors,[]);
 }finally{s.close();}});
