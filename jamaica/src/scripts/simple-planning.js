(function(){
'use strict';
const E=id=>document.getElementById(id),page=E('plan-your-day'),P=JSON.parse(E('travel-place-data').textContent),byId=new Map(P.map(p=>[p.id,p]));
function disclosure(node,title,id){const d=document.createElement('details');d.className='simple-disclosure wrap';if(id)d.id=id;const s=document.createElement('summary');s.textContent=title;node.before(d);d.append(s,node);return d;}
// Start with the task, then the saved plan. Secondary material remains directly addressable.
const intro=page.querySelector('.page-intro');intro.querySelector('h1').textContent='Make a good Jamaica day.';
intro.querySelectorAll(':scope > p:not(.eyebrow):not(.route-collection-link)').forEach(p=>p.remove());
const lead=document.createElement('p');lead.textContent='Choose your region and time. Save a suggested day, then adjust only what you need.';intro.querySelector('h1').after(lead);
const nav=page.querySelector('.plan-steps');nav.innerHTML='<a href="#trip-planner">1 · Choose a day</a><a href="#trip-shortlist-section">2 · Your saved places</a><a href="#customize-day">3 · Refine your day</a><a href="#trip-takeaway">4 · Take it with you</a>';intro.after(nav,E('trip-planner'),E('trip-shortlist-section'));
const savedHeading=E('trip-shortlist-section').querySelector('h2');savedHeading.textContent='Your saved places. Your day.';
const planHow=page.querySelector('.plan-howto');planHow.innerHTML='Save a suggested day below. Its places carry into comparison and timing; you can change the order or remove stops.';
// Put region before the length choices, with date and activity preferences secondary.
const settings=page.querySelector('.plan-settings'),region=E('plan-region').closest('label');settings.before(region,page.querySelector('.trip-lengths'));
region.classList.add('plan-base-choice');disclosure(settings,'Date & activity preferences (optional)','plan-preferences');
const alternatives=E('travel-alternatives');disclosure(alternatives,'Rain, mobility or a cruise? See alternatives');
const savedWork=E('my-jamaica');page.append(savedWork);disclosure(savedWork,'Saved reading & trip counts');
const contacts=E('visitor-resource-desk');page.append(contacts);disclosure(contacts,'Contacts, transport & accessibility');
const reading=E('my-reading');disclosure(reading,'Your saved reading & notes');
const cloud=page.querySelector('.trip-cloud');disclosure(cloud,'Take your day with you: download, share or print','trip-takeaway');
const email=E('edition-email-form');disclosure(email,'Get Jamaica updates (optional)');
// Permanent directory provides one-click access even when optional modules are collapsed.
const tools=E('tools'),catalog=tools.querySelector('.tool-shortcuts');catalog.id='all-tools';catalog.setAttribute('aria-label','All planning tools');
const toolIntro=tools.querySelector('.page-intro');toolIntro.querySelector('h2').textContent='All tools';toolIntro.querySelector('p:last-child').textContent='Go straight to any tool, or open the optional controls below.';
const custom=document.createElement('details');custom.id='customize-day';custom.className='simple-disclosure wrap';custom.innerHTML='<summary>Refine your day (optional)</summary><p>Use your saved places, compare alternatives, adjust timing or enter your quoted costs.</p>';catalog.after(custom);disclosure(catalog,'All planning tools','planning-tool-directory');
for(const id of ['stop-comparison','personal-day','travel-budget'])custom.append(E(id).closest('.plan-tool-disclosure'));
const checklist=E('trip-checklist').closest('.plan-tool-disclosure');E('trip-shortlist-section').querySelector('.wrap').append(checklist);
const connected=E('connected-travel-tools');connected.hidden=true; // Only the now-empty section heading remains.
const travel=E('travel-tools');disclosure(travel,'Conditions, places to stay & official resources');
page.querySelector('.route-next').remove();
// Long selector lists become searchable and default to a region or existing trip.
function saved(){try{const a=JSON.parse(localStorage.getItem('tg-jamaica-travel-v1')||'[]');return Array.isArray(a)?a.filter(id=>byId.has(id)&&byId.get(id).status!=='Temporarily unavailable'):[];}catch(e){return [];}}
for(const [kind,target,label] of [['compare','stop-comparison','places'],['schedule','personal-day','stops']]){
 const box=document.createElement('div');box.className='simple-place-search';box.innerHTML='<label>Choose '+label+' from<select id="'+kind+'-source"><option value="saved">My saved places</option><option value="region">My region</option><option value="all">Search all Jamaica</option></select></label><label>Find a place<input id="'+kind+'-query" type="search" placeholder="Name, town or parish"></label>';
 E(target).querySelector('h3').after(box);E(kind+'-source').value=saved().length?'saved':'region';
 const refresh=()=>{E(kind+'-region-filters').hidden=E(kind+'-source').value!=='region';window.TGPlanningTools[kind==='compare'?'refreshCompare':'refreshSchedule']();};
 E(kind+'-source').addEventListener('change',()=>{E(kind+'-query').value='';refresh();});E(kind+'-query').addEventListener('input',refresh);
 refresh();
}
E('stop-comparison').querySelector('p').textContent='Compare up to three places. Start with your saved trip, your region, or search all Jamaica. Open details for the full decision and booking guidance.';
E('personal-day').querySelector('p').textContent='Your saved stops carry into this timetable. Adjust visit lengths and enter drive estimates from your map or driver. Default times are examples; this is not live traffic.';
// Keep one initial stop visible. More stops remain available without an intimidating empty form.
const fields=[...E('schedule-stops').querySelectorAll('fieldset')];let visibleStops=1;
const add=document.createElement('button');add.id='schedule-add-stop';add.type='button';add.textContent='Add another stop';E('schedule-stops').after(add);
function showStops(){const selected=fields.reduce((n,f,i)=>E('schedule-place-'+i).value?i+1:n,1);visibleStops=Math.max(visibleStops,selected);fields.forEach((f,i)=>f.hidden=i>=visibleStops);add.hidden=visibleStops>=fields.length;}
add.addEventListener('click',()=>{visibleStops=Math.min(fields.length,visibleStops+1);showStops();fields[visibleStops-1].querySelector('select').focus();});
const basics=page.querySelector('.schedule-basics'),extra=document.createElement('div');extra.className='schedule-extra';for(const id of ['schedule-break','schedule-return','schedule-buffer'])extra.append(E(id).closest('label'));basics.after(extra);disclosure(extra,'Meal, return drive & buffer allowances');
// Saved-trip changes synchronize the two tools. Use the existing imports to retain their validations.
let syncing=false,packingChosen=false;E('packing-kind').addEventListener('change',()=>{if(!syncing)packingChosen=true;});
function syncTrip(){if(syncing)return;syncing=true;const context=[...window.TGContext.ids],ids=saved(),durations=new Map(fields.map((f,i)=>[E('schedule-place-'+i).value,E('schedule-stay-'+i).value]).filter(([id])=>id));
 for(const kind of ['compare','schedule']){E(kind+'-source').value=ids.length?'saved':'region';E(kind+'-query').value='';}
 E('compare-use-shortlist').click();E('schedule-use-shortlist').click();window.TGContext.set(context,{weather:false});
 fields.forEach((f,i)=>{const id=E('schedule-place-'+i).value;if(durations.has(id))E('schedule-stay-'+i).value=durations.get(id);});E('schedule-stops').dispatchEvent(new Event('input',{bubbles:true}));
 for(const kind of ['compare','schedule'])E(kind+'-region-filters').hidden=ids.length>0;
 visibleStops=Math.max(1,Math.min(ids.length,4));showStops();
 if(!packingChosen){const water=ids.some(id=>byId.get(id).water);E('packing-kind').value=water?'water':'town';E('packing-kind').dispatchEvent(new Event('change'));}
 syncing=false;
}
window.addEventListener('tonys-trip-change',syncTrip);E('compare-use-shortlist').addEventListener('click',()=>{E('compare-source').value='saved';E('compare-query').value='';window.TGPlanningTools.refreshCompare();},true);E('schedule-use-shortlist').addEventListener('click',()=>{E('schedule-source').value='saved';E('schedule-query').value='';window.TGPlanningTools.refreshSchedule();showStops();},true);
E('schedule-stops').addEventListener('change',showStops);if(saved().length)syncTrip();else showStops();
// Preserve every deep link, including nested optional disclosures and existing aliases.
function openTarget(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch(e){return;}const target=E(id);if(!target)return;for(let n=target.parentElement;n;n=n.parentElement)if(n.tagName==='DETAILS')n.open=true;if(target.tagName==='DETAILS')target.open=true;}
window.addEventListener('hashchange',openTarget);openTarget();
const budgetNote=E('budget-note');budgetNote.classList.add('budget-completeness');
})();
