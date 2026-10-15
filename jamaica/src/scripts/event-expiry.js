(function(){
'use strict';
const E=id=>document.getElementById(id),date=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Jamaica',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const events=JSON.parse(E('travel-event-data').textContent),programmes=JSON.parse(E('local-programme-data').textContent),expired=new Set();
function active(record,day=date()){return !record||(!expired.has('event-'+record.id)&&!expired.has('programme-'+record.id)&&(!(record.end||record.ends)||(record.end||record.ends)>=day));}
function redirectExpired(){let hash='';try{hash=decodeURIComponent(location.hash.slice(1));}catch(e){}if(!expired.has(hash))return;const note=E('events-expired-notice');note.hidden=false;note.textContent='This event has ended and has been removed. Browse upcoming events below.';history.replaceState(null,'',location.pathname+location.search+'#events');window.dispatchEvent(new HashChangeEvent('hashchange'));}
function prune(day=date()){
 const removed=[];
 for(const [rows,prefix,dataId]of [[events,'event-','travel-event-data'],[programmes,'programme-','local-programme-data']]){
  for(let i=rows.length-1;i>=0;i--)if(!active(rows[i],day)){const id=prefix+rows[i].id;expired.add(id);removed.push(id);E(id)?.remove();rows.splice(i,1);}
  E(dataId).textContent=JSON.stringify(rows);
 }
 if(removed.length){window.dispatchEvent(new CustomEvent('tonys-events-expired',{detail:{removed,day}}));redirectExpired();}
 return removed;
}
window.TGEventInventory={events,programmes,active,prune};prune();
window.addEventListener('hashchange',redirectExpired);window.addEventListener('pageshow',()=>prune());document.addEventListener('visibilitychange',()=>{if(!document.hidden)prune();});
setInterval(()=>prune(),60000);
})();
