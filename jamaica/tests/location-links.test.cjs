const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{site}=require('./helpers.cjs'),links=require('../src/scripts/location-links.js');
const data=name=>JSON.parse(fs.readFileSync(path.resolve(__dirname,'../src/data/'+name+'.json'),'utf8'));
function maps(node){return [...node.querySelectorAll('a[href*="google.com/maps/"]')];}
function valid(a){const u=new URL(a.href);assert.equal(u.searchParams.get('api'),'1');assert(u.searchParams.get('query')||u.searchParams.get('destination'));assert.equal(a.target,'_blank');assert(a.rel.includes('noopener'));}
test('location links escape content and distinguish unknown venues, national programmes and area searches',()=>{
 assert(!links.markup({location:'Venue to be confirmed'}).includes('google.com'));
 assert(!links.markup({national:true,location:'Across Jamaica'}).includes('google.com'));
 const html=links.markup({location:'Kingston <test>',mapQuery:'Kingston, Jamaica',mapScope:'area',mapNote:'Venue unconfirmed'});
 assert(html.includes('Explore area in Google Maps'));assert(html.includes('&lt;test&gt;'));assert(html.includes('Venue unconfirmed'));
});
test('every guide, route stop, event and rendered activity has a location; planning and re-rendered cards retain maps',()=>{
 const s=site();try{
 for(const p of data('travel-places')){const el=s.E('travel-'+p.id);assert(el.querySelector('.location-links .guide-location'),p.id);assert(maps(el).length,p.id);maps(el).forEach(valid);}
 for(const r of data('thematic-routes')){const stops=[...s.E(r.id).querySelectorAll('.thematic-stops > li')];assert.equal(stops.length,r.stops.length);for(const stop of stops){assert(stop.querySelector('.guide-location'));maps(stop).forEach(valid);assert(maps(stop).length);}}
 const activeEventIds=new Set(s.w.TGEventInventory.events.map(e=>e.id));
 for(const e of data('travel-events')){const el=s.E('event-'+e.id);if(!activeEventIds.has(e.id)){assert.equal(el,null,'Expired event card: '+e.id);continue;}assert(el,e.id);assert(el.querySelector('.location-links'),e.id);if(!e.national){assert(maps(el).length,e.id);maps(el).forEach(valid);}else assert(!maps(el).length);}
 for(const h of data('parish-outings'))assert(maps(s.E(h.article)).length,h.id);
 s.route('activity-directory');while(!s.E('activity-more').hidden)s.E('activity-more').click();
 for(const c of s.E('activity-directory-cards').children){assert(c.querySelector('.location-links .guide-location'));assert(maps(c).length);maps(c).forEach(valid);}
 s.route('events');for(const c of s.d.querySelectorAll('#events-local-programmes .visitor-card')){assert(c.querySelector('.location-links .guide-location'));assert(maps(c).length);maps(c).forEach(valid);}
 for(const c of s.d.querySelectorAll('#home-dated-events .visitor-card,#home-local-programmes .visitor-card'))assert(c.querySelector('.location-links'));
 s.route('trip-planner');for(const li of s.E('trip-plan-days').querySelectorAll('ol > li'))assert(maps(li).length);
 s.E('trip-plan-days').querySelector('[data-save-plan]').click();for(const li of s.E('trip-shortlist').children)assert(maps(li).length);
 assert(maps(s.E('place-comparison')).length);assert(maps(s.E('schedule-output')).length);
 s.input('food-query','Scotchies','input');for(const c of s.E('food-directory').children){assert(c.querySelector('.location-links'));assert(maps(c).length);}
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
