const test=require('node:test'),assert=require('node:assert/strict'),{site}=require('./helpers.cjs'),{programmeDates}=require('../src/scripts/visitor-discovery.js'),{spawnSync}=require('node:child_process');
test('finite theatre and exhibition programmes do not generate dates beyond their published run',()=>{
 assert.deepEqual(programmeDates({days:[6,0],ends:'2026-10-19'},'2026-10-14','2026-11-14'),['2026-10-17','2026-10-18']);
 assert.deepEqual(programmeDates({days:[2],ends:'2026-10-27'},'2026-10-28','2026-11-14'),[]);
});
test('public collector converts overnight UTC dates to Jamaica and keeps seasons for review',()=>{
 const script="import importlib.util,json; s=importlib.util.spec_from_file_location('collector','jamaica/scripts/collect-events.py'); m=importlib.util.module_from_spec(s);s.loader.exec_module(m); assert m.local_datetime('2026-10-17T03:00:00Z')=='2026-10-16T22:00:00-05:00'; e={'@type':'Event','name':'Match season','startDate':'2026-10-05T22:00:00Z','endDate':'2027-01-29T04:00:00Z','location':{'address':{'addressCountry':'Jamaica'}}}; r=m.extract_events('<script type=\"application/ld+json\">'+json.dumps(e)+'</script>','https://example.org');assert len(r)==1 and len(r[0]['warnings'])==2;e['location']['address']['addressCountry']='USA';assert not m.extract_events('<script type=\"application/ld+json\">'+json.dumps(e)+'</script>','https://example.org')";
 const r=spawnSync('python',['-c',script],{encoding:'utf8',env:{...process.env,PYTHONDONTWRITEBYTECODE:'1'}});assert.equal(r.status,0,r.stderr);
});
test('island inventory supports arts genres and parish filters with source-linked cards',()=>{
 const s=site();try{
 const data=JSON.parse(s.E('travel-event-data').textContent),audit=require('../audit/island-event-expansion-2026-10-15.json');
 for(const e of audit.added){const el=s.E('event-'+e.id);assert(el,e.id);assert.equal(el.querySelector('h3').textContent,e.name);assert(el.textContent.includes(e.location));assert(el.querySelector('a.location-map'));assert([...el.querySelectorAll('a')].some(a=>a.href===e.source));assert.deepEqual(data.find(x=>x.id===e.id),e);}
 s.route('events');s.E('events-reset').click();s.input('events-genre','Theatre & dance');assert.equal(s.E('events-genre').value,'Theatre & dance');assert(!s.E('event-island-nanny-abeng').hidden);assert(s.E('event-island-university-singers').hidden);
 s.E('events-reset').click();s.input('events-genre','Concerts & live music');assert(!s.E('event-island-university-singers').hidden);assert(s.E('event-island-ngj-talk').hidden);
 s.E('events-reset').click();const field=s.E('events-parish-filter');const check=[...field.querySelectorAll('input')].find(x=>x.value==='Manchester');assert(check);check.checked=true;check.dispatchEvent(new s.w.Event('change',{bubbles:true}));assert(!s.E('event-island-euphoria-brunch-17290').hidden);assert(s.E('event-island-university-singers').hidden);
 s.E('events-reset').click();s.input('events-query','National Gallery','input');assert(!s.E('event-island-ngj-talk').hidden);assert(s.E('event-island-fanatic-ochi-17273').hidden);assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('expired events are expunged from records, cards, searches and direct links while open',()=>{
 const s=site();try{
 const api=s.w.TGEventInventory;
 assert(!api.events.some(e=>e.end<'2026-10-14')); // Expired source entries are removed at startup.
 s.route('site-search');s.input('site-query','University Singers','input');assert(s.E('site-result-list').textContent.includes('University Singers'));
 s.input('home-query','University Singers','input');assert(s.E('home-search-preview').textContent.includes('University Singers'));
 s.route('event-island-university-singers');api.prune('2026-11-01');
 assert(!s.E('event-island-university-singers'));assert(!api.events.some(e=>e.id==='island-university-singers'));assert(!JSON.parse(s.E('travel-event-data').textContent).some(e=>e.id==='island-university-singers'));
 assert.equal(s.w.location.hash,'#events');assert(!s.E('events-expired-notice').hidden);
 assert(!s.E('site-result-list').querySelector('a[href="#event-island-university-singers"]'));assert(!s.E('home-search-preview').querySelector('a[href="#event-island-university-singers"]'));
 assert(!api.programmes.some(p=>p.id==='island-gallis'));assert(!s.E('programme-island-gallis'));
 assert(api.events.some(e=>e.id==='island-fashion-week'));assert(api.programmes.some(p=>p.id==='island-roots-bamboo'));
 s.route('event-island-university-singers');assert.equal(s.w.location.hash,'#events');assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('event photo filter combines with parish and reset; each poster has its own source and map',()=>{
 const s=site();try{
 s.route('events');s.E('events-reset').click();s.input('events-media','photo');
 const records=s.w.TGEventInventory.events,visible=records.filter(e=>!s.E('event-'+e.id).hidden);assert.equal(visible.length,8);
 for(const e of visible){assert(e.image);const el=s.E('event-'+e.id),img=el.querySelector('.event-poster img');assert(img);assert.equal(img.getAttribute('loading'),'lazy');assert(img.getAttribute('alt').includes(e.name));assert(el.querySelector('.event-poster figcaption a'));assert(el.querySelector('a.location-map[href^="https://www.google.com/maps/"]'));}
 const field=s.E('events-parish-filter'),check=[...field.querySelectorAll('input')].find(x=>x.value==='St. Ann');check.checked=true;check.dispatchEvent(new s.w.Event('change',{bubbles:true}));assert(!s.E('event-island-fanatic-ochi-17273').hidden);assert(s.E('event-island-university-singers').hidden);
 s.E('events-reset').click();assert.equal(s.E('events-media').value,'all');assert(!s.E('event-island-university-singers').hidden);assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
