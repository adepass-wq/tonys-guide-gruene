const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom'),{eventVisible}=require('../src/scripts/travel-tools.js');
test('expanded published event records have matching cards, maps and expiry without counting packages',()=>{
 const audit=require('../audit/event-collection-2026-10-15.json'),events=require('../src/data/travel-events.json');
 const dom=new JSDOM(fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8'));
 try{const d=dom.window.document;assert.equal(audit.added.length,14);
 for(const e of audit.added){assert.deepEqual(events.find(x=>x.id===e.id),e);const card=d.getElementById('event-'+e.id);assert(card,e.id);assert.equal(card.querySelector('h3').textContent,e.name);assert(card.textContent.includes(e.location));assert(card.querySelector('a.location-map'));assert([...card.querySelectorAll('a')].some(a=>a.href===e.source));assert.equal(card.querySelector('time').dateTime,e.start);assert(eventVisible(e,'2026-10-14'));assert(!eventVisible(e,'2027-01-01'));}
 assert(!events.some(e=>/passport|society-x-winter/.test(e.id)));assert.equal(new Set(events.map(e=>e.id)).size,events.length);
 }finally{dom.window.close();}
});
