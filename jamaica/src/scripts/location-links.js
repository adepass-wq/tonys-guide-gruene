(function(root){
'use strict';
const esc=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function info(record){
 const location=record.address||record.location||record.route||record.mapQuery||'';
 const fallback=/venue.*(?:to be confirmed|not independently confirmed|not provided)/i.test(location)?'':location;
 const query=record.mapQuery||record.map||record.route||fallback;
 const area=record.mapScope==='area';
 return {location,query,area,note:record.mapNote||'',national:!!record.national};
}
function markup(record){
 const p=info(record);
 if(p.national)return '<div class="location-links"><p>Location: '+esc(p.location||'Across Jamaica')+'</p><p class="source-note">No single event venue. Check the organiser’s individual programme.</p></div>';
 if(!p.query)return '<div class="location-links"><p>Location: '+esc(p.location||'Venue to be confirmed')+'</p><p class="source-note">Confirm the venue with the organiser before travelling.</p></div>';
 const query=/\bjamaica\b/i.test(p.query)?p.query:p.query+', Jamaica';
 return '<div class="location-links"><p class="guide-location"><strong>'+(record.address?'Address: ':'Location: ')+'</strong>'+esc(p.location)+'</p><a class="location-map" href="https://www.google.com/maps/search/?api=1&amp;query='+esc(encodeURIComponent(query))+'" target="_blank" rel="noopener">'+(p.area?'Explore area in Google Maps ↗':'Find on Google Maps ↗')+'</a>'+(p.note?'<p class="source-note">'+esc(p.note)+'</p>':'')+'</div>';
}
const api={info,markup};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(root)root.TGLocationLinks=api;
})(typeof window==='undefined'?null:window);
