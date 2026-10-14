const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {site}=require('./helpers.cjs');
test('map has all twenty route sequences and verified geographic anchors',()=>{
 const root=path.resolve(__dirname,'../src/data'),data=JSON.parse(fs.readFileSync(path.join(root,'travel-map.json'))),routes=JSON.parse(fs.readFileSync(path.join(root,'thematic-routes.json')));
 assert.equal(Object.keys(data.regions).length,8);assert.equal(Object.keys(data.routes).length,20);
 for(const r of routes){assert(data.routes[r.id].length);for(const k of data.routes[r.id]){const p=data.places[k];assert(p.lat>17.5&&p.lat<18.7);assert(p.lon>-78.6&&p.lon<-76);assert.match(p.source,/en.wikipedia.org/);}}
 assert(data.outline.length>20);assert(Math.max(...data.outline.map(p=>p[0]))-Math.min(...data.outline.map(p=>p[0]))>2);
});
test('homepage planner uses the existing engine and map choices open the matching route',async()=>{
 const s=site();try{
  assert.equal(s.d.querySelectorAll('#home-region-grid>.visual-region-card').length,8);
  s.E('home-trip-region').value='south-elizabeth';s.E('home-trip-length').value='day';s.E('home-trip-start').dispatchEvent(new s.w.Event('submit',{bubbles:true,cancelable:true}));
  assert.equal(s.E('plan-region').value,'south-elizabeth');assert.match(s.E('trip-plan-result').textContent,/St. Elizabeth/);assert.equal(s.w.location.hash,'#trip-planner');
  s.w.TGJourneyMap.select('portland','route-portland-maroon-living-heritage');assert.equal(s.E('journey-route').value,'route-portland-maroon-living-heritage');assert.match(s.E('journey-summary').textContent,/Moore Town/);assert(s.E('journey-summary').querySelector('a[href="#route-portland-maroon-living-heritage-details"]'));
  assert.equal(s.E('journey-route').options.length,3);s.E('journey-reset').click();assert.equal(s.E('journey-route').options.length,21);
  assert.equal(s.d.querySelectorAll('[data-route-on-map]').length,20);assert(s.E('journey-map-fallback').querySelector('svg path'));assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
