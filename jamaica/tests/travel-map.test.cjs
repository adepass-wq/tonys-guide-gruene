const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {site}=require('./helpers.cjs');
test('map has all twenty route sequences and verified geographic anchors',()=>{
 const root=path.resolve(__dirname,'../src/data'),data=JSON.parse(fs.readFileSync(path.join(root,'travel-map.json'))),routes=JSON.parse(fs.readFileSync(path.join(root,'thematic-routes.json')));
 assert.equal(Object.keys(data.regions).length,8);assert.equal(Object.keys(data.routes).length,20);
 for(const r of routes){assert(data.routes[r.id].length);for(const k of data.routes[r.id]){const p=data.places[k];assert(p.lat>17.5&&p.lat<18.7);assert(p.lon>-78.6&&p.lon<-76);assert.match(p.source,/https:\/\/(?:en.wikipedia.org\/wiki\/|www.openstreetmap.org\/(?:node|way|relation)\/)/);}}
 assert(data.routes['route-mountain-water-coffee'].includes('Holywell'));assert(!data.routes['route-mountain-water-coffee'].includes('Blue Mountain Peak'));assert(Math.abs(data.places.Holywell.lat-18.08755)<0.001);
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
test('street-map tiles stay clipped and map overlays do not inherit island-overview decoration',()=>{
 const {JSDOM}=require('jsdom'),root=path.resolve(__dirname,'../..');
 const vendor=fs.readFileSync(path.join(root,'public/assets/jamaica-leaflet-1.9.4.css'),'utf8'),edition=fs.readFileSync(path.join(root,'jamaica/src/styles/42-travel-experience.css'),'utf8');
 const dom=new JSDOM('<style>'+vendor+'</style><style>'+edition+'</style><div class="travel-map-canvas"><div id="journey-map" class="leaflet-container map-ready"><div class="leaflet-pane leaflet-overlay-pane"><svg id="street-overlay"></svg></div></div><div id="journey-map-fallback"><svg id="island-overview"></svg></div></div>');
 try{const w=dom.window,d=w.document,style=id=>w.getComputedStyle(d.getElementById(id));assert.equal(style('journey-map').overflow,'hidden');assert.equal(style('journey-map').isolation,'isolate');assert.notEqual(style('street-overlay').minHeight,'270px');assert.equal(style('island-overview').minHeight,'270px');}finally{dom.window.close();}
});
