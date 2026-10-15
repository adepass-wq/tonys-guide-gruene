(function(){
'use strict';
const E=id=>document.getElementById(id),T=window.TGTravelRegions,regions=T.rows,valid=new Set(regions.map(r=>r.id)),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const P=JSON.parse(E('travel-place-data').textContent),A=JSON.parse(E('history-article-data').textContent),R=JSON.parse(E('travel-resource-data').textContent),EV=JSON.parse(E('travel-event-data').textContent),LP=JSON.parse(E('local-programme-data').textContent),byPlace=new Map(P.map(p=>[p.id,p]));
let ids=[],applying=false,lastCollection='#history',previewTab='overview';
try{const saved=JSON.parse(localStorage.getItem('tg-jamaica-context-v1')||'[]');if(Array.isArray(saved))ids=[...new Set(saved.filter(id=>valid.has(id)))];}catch(e){}
const regionLabel=()=>ids.length?ids.map(id=>regions.find(r=>r.id===id).label).join(' + '):'all Jamaica';
function reveal(id){const el=E(id);if(!el||el.closest('[hidden]'))return;el.tabIndex=-1;el.focus({preventScroll:true});el.scrollIntoView({block:'start',behavior:'instant'});}
function syncDraft(){E('explore-region-choices').querySelectorAll('input').forEach(x=>x.checked=ids.includes(x.value));}
E('explore-region-choices').innerHTML=regions.map(r=>'<label><input type="checkbox" value="'+esc(r.id)+'">'+esc(r.label)+'</label>').join('');
function compactRegions(){for(const [id] of T.controls){const el=E(id),f=el.querySelector('fieldset');const details=document.createElement('details');details.className='compact-region-control';const summary=document.createElement('summary');summary.textContent='Change or add a region';details.append(summary);el.prepend(details);details.append(f);const status=f.querySelector('.region-filter-status');el.prepend(status);}}
compactRegions();
function set(next,{revealResults=false,weather=true}={}){
 if(applying)return;applying=true;ids=[...new Set(next.filter(id=>valid.has(id)))];
 try{localStorage.setItem('tg-jamaica-context-v1',JSON.stringify(ids));}catch(e){}
 window.TGContext.ids=ids;syncDraft();
 for(const id of ['activity-area','travel-area','food-branch']){const el=E(id),current=el.value,pool=P.filter(p=>T.matches(p,ids)&&(id!=='food-branch'||p.foodKind)),areas=[...new Set(pool.map(p=>p.area))];el.innerHTML='<option value="all">All local branches</option>'+areas.map(a=>'<option>'+esc(a)+'</option>').join('');el.value=areas.includes(current)?current:'all';}
 // Region is shared; independent subject and parish refinements remain explicit.
 for(const api of T.controls.values())if(JSON.stringify(api.selected().slice().sort())!==JSON.stringify(ids.slice().sort()))api.set(ids);
 E('history-region').value=ids.length===1?ids[0]:'all';E('history-region').dispatchEvent(new Event('input',{bubbles:true}));
 if(ids.length){E('plan-region').value=ids[0];E('plan-region').dispatchEvent(new Event('change'));window.TGCorridors.choose(ids[0],false);}
 E('explore-context-label').textContent=ids.length>2?'Exploring '+ids.length+' regions':'Exploring '+regionLabel();E('explore-context-label').title=regionLabel();
 if(weather&&ids.length){const point={'ocho-mary':0,montego:3,negril:4,portland:5,'capital-mountains':6,southeast:7,'south-elizabeth':8,'central-interior':9}[ids[0]];E('conditions-place').value=String(point);E('conditions-place').dispatchEvent(new Event('change'));}
 window.dispatchEvent(new CustomEvent('tonys-context-change',{detail:{regions:[...ids]}}));
 applying=false;renderRegionalPreview();feedback();
 if(revealResults)revealForPage();
}
window.TGContext={ids,set};
function page(){return [...document.querySelectorAll('.guide-page')].find(p=>!p.hidden)?.id;}
const results={activities:'activity-count',food:'food-count',events:'events-count',guides:'travel-result-count',history:'count','site-search':'site-results-heading','plan-your-day':'trip-plan-title'};
function feedback(){const id=results[page()],el=E(id);E('context-result-summary').textContent=el?.textContent||'';}
function revealForPage(){const anchor=E(location.hash.slice(1));const target=anchor?.closest('#personal-day')?'schedule-output':anchor?.closest('#stop-comparison')?'place-comparison':results[page()];if(target)reveal(target);}
E('context-apply').addEventListener('click',()=>{const selected=[...E('explore-region-choices').querySelectorAll('input:checked')].map(x=>x.value);set(selected,{revealResults:true});E('explore-region-picker').open=false;});
E('context-all').addEventListener('click',()=>{set([],{revealResults:true});E('explore-region-picker').open=false;});
// Direct region changes keep all sections in agreement. Multiple choices can be batched in the global picker.
document.addEventListener('change',e=>{
 if(applying)return;
 const holder=e.target.closest('.multi-parish-filter');
 if(holder&&T.controls.has(holder.id)){const selected=T.controls.get(holder.id).selected();set(selected);const result=E(holder.dataset.results);if(result)E('context-result-summary').textContent=result.textContent;}
 if(e.target.id==='parish'&&e.target.value!=='All'&&ids.length){const matching=regions.filter(r=>r.parishes.includes(e.target.value)).map(r=>r.id);if(matching.length&&!matching.some(id=>ids.includes(id)))set(matching);}
 if(e.target.id==='plan-region')set([e.target.value]);
 if(e.target.id==='history-region'){if(valid.has(e.target.value))set([e.target.value]);else if(e.target.value==='all')set([]);}
 feedback();
});
window.addEventListener('tonys-region-open',e=>{if(valid.has(e.detail.region))set([e.detail.region]);});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-corridor],[data-region-reset],[data-region-reveal],[data-region-target]');
 if(b?.dataset.corridor){previewTab='overview';set([b.dataset.corridor]);}
 if(b?.hasAttribute('data-region-reset'))set([]);
 if(b?.hasAttribute('data-region-reveal')){const holder=b.closest('.multi-parish-filter');holder.querySelector('details').open=false;feedback();}
 const reset=e.target.closest('#activity-reset,#food-reset,#events-reset,#travel-clear,#history-reset');if(reset)set([]);

 const link=e.target.closest('a[href^="#"]');if(link){const target=E(link.hash.slice(1));if(target?.closest('.reading-article')&&page()!=='reader'){lastCollection=page()==='corridors'?'#corridors':page()==='site-search'?'#site-search':page()==='activities'?'#activity-count':page()==='history'?'#count':'#history';}}
});
document.addEventListener('input',e=>{if(!applying&&e.target.id==='history-region'&&valid.has(e.target.value))set([e.target.value]);if(e.target.id==='parish'&&e.target.value!=='All'&&ids.length){const matching=regions.filter(r=>r.parishes.includes(e.target.value)).map(r=>r.id);if(matching.length&&!matching.some(id=>ids.includes(id)))set(matching);}feedback();});
E('home-region-grid').innerHTML=regions.map((r,i)=>'<a class="home-region-choice" href="#corridors" data-corridor="'+r.id+'"><span>'+String(i+1).padStart(2,'0')+'</span><strong>'+esc(r.label)+'</strong><small>'+esc(r.parishes.join(' / '))+'</small></a>').join('');
// Regions have six consistent tabs. Previews lead to full, filtered directories.
function activeRegion(){return document.querySelector('[data-corridor-panel]:not([hidden])')?.dataset.corridorPanel||E('regional-preview').dataset.region||ids[0]||regions[0].id;}
function photoForArticle(id){const f=(E(id)?.querySelector('[data-card-cover]')||E(id)?.querySelector('.narrative-body figure:has(img)'));if(!f)return '';const clone=f.cloneNode(true);clone.removeAttribute('id');clone.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));return clone.outerHTML;}
function placeCard(p){const f=E('travel-'+p.id)?.querySelector('.travel-photo');let visual='';if(f){const c=f.cloneNode(true);c.removeAttribute('id');c.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));visual=c.outerHTML;}return '<article class="regional-feature">'+visual+'<p class="eyebrow">'+esc(p.area)+' · '+esc(p.parishes.join(' / '))+'</p><h3><a href="#travel-'+p.id+'">'+esc(p.name)+'</a></h3>'+window.TGLocationLinks.markup(p)+'<p>'+esc(p.summary)+'</p><p>'+esc(p.time)+'</p><button type="button" data-save-place="'+p.id+'">Save to my trip</button></article>';}
function foodPreview(rows){const picks=[],areas=new Set();for(const p of rows){if(areas.has(p.area))continue;picks.push(p);areas.add(p.area);if(picks.length===4)break;}for(const p of rows){if(picks.length===4)break;if(!picks.includes(p))picks.push(p);}return picks;}
function renderRegionalPreview(){
 const region=activeRegion(),label=regions.find(r=>r.id===region).label,preview=E('regional-preview');document.querySelectorAll('[data-region-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.regionTab===previewTab)));
 document.querySelectorAll('[data-corridor-panel]').forEach(a=>a.hidden=previewTab!=='overview'||a.dataset.corridorPanel!==region);
 // The active panel may now be hidden; retain the selected region on the preview.
 preview.dataset.region=region;preview.hidden=previewTab==='overview';if(preview.hidden)return;
 let text='';
 if(['activities','food'].includes(previewTab)){const rows=P.filter(p=>T.matches(p,[region])&&(previewTab==='food'?!!p.foodKind:!p.foodKind));text='<h2>'+esc(label)+' · '+(previewTab==='food'?'food':'activities')+'</h2><p>'+rows.length+' place guides. Start with a few choices; the full directory includes local refinements.</p><div class="regional-feature-grid">'+(previewTab==='food'?foodPreview(rows):rows.slice(0,4)).map(placeCard).join('')+'</div><button type="button" data-region-id="'+region+'" data-region-target="'+previewTab+'">See all matching '+previewTab+' →</button>';}
 if(previewTab==='history'){const rows=A.filter(a=>T.matches(a,[region])&&!a.parishes.includes('Islandwide'));text='<h2>'+esc(label)+' · history &amp; culture</h2><p>'+rows.length+' regional and parish articles, with sources and connected learning.</p><div class="regional-feature-grid">'+rows.slice().sort((a,b)=>Number(b.id.startsWith('legacy-'))-Number(a.id.startsWith('legacy-'))).slice(0,4).map(a=>'<article class="regional-feature">'+photoForArticle(a.id)+'<p class="eyebrow">'+esc(a.parish)+'</p><h3><a href="#'+a.id+'">'+esc(a.title)+'</a></h3><p>'+esc(a.lede)+'</p></article>').join('')+'</div><button type="button" data-open-regional-history="'+region+'">Browse all these histories →</button><p><a href="#music">Music in context</a> · <a href="#interactive-island">Language map &amp; recordings</a> · <a href="#learning-desk">Learning pathways</a></p>';}
 if(previewTab==='events'){const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Jamaica',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),dated=EV.filter(e=>!e.national&&e.end>=today&&T.matches(e,[region])),recurring=LP.filter(e=>T.matches(e,[region]));text='<h2>'+esc(label)+' · what’s on</h2><h3>Confirmed dated listings</h3>'+ (dated.length?dated.slice(0,3).map(e=>'<p><a href="#event-'+e.id+'">'+esc(e.name)+'</a> · '+esc(e.start)+' · '+esc(e.location)+'</p>'+window.TGLocationLinks.markup(e)).join(''):'<p>No verified future regional date is listed. This does not mean no local event exists.</p>')+'<h3>Recurring and next-date programmes</h3>'+ (recurring.length?recurring.slice(0,3).map(e=>'<p><a href="#programme-'+e.id+'">'+esc(e.name)+'</a> · '+esc(e.schedule)+' · confirm with venue</p>'+window.TGLocationLinks.markup(e)).join(''):'<p>Use the parish contact desk to ask about the next local programme.</p>')+'<button type="button" data-region-target="events" data-region-id="'+region+'">Open dates, programmes and local contacts →</button>';}
 if(previewTab==='plan'){text='<h2>Plan '+esc(label)+'</h2><p>Start with a half-day, full day, two days or a weekend. Save the places you want, compare them, then arrange your own timetable.</p><div class="plan-steps"><button type="button" data-region-target="plan" data-region-id="'+region+'">Suggested days →</button><a href="#my-trips">My saved places →</a><button type="button" data-region-target="compare" data-region-id="'+region+'">Compare places →</button><button type="button" data-region-target="schedule" data-region-id="'+region+'">Build a timetable →</button><button type="button" data-region-target="resources" data-region-id="'+region+'">Transport, accessibility &amp; contacts →</button><a href="#conditions">Local weather &amp; sea →</a><a href="#safety">Transport &amp; safety →</a></div>';}
 preview.innerHTML=text||'<p>Choose a section.</p>';
}
// Hide the duplicate seven-button menus; the six regional tabs provide the same entrances.
document.querySelectorAll('.region-paths,[data-corridor-activities]').forEach(x=>x.hidden=true);
document.addEventListener('click',e=>{const tab=e.target.closest('[data-region-tab]');if(tab){const region=E('regional-preview').dataset.region||activeRegion();window.TGCorridors.choose(region,false);previewTab=tab.dataset.regionTab;renderRegionalPreview();reveal(previewTab==='overview'?'corridor-result':'regional-preview');}
 const history=e.target.closest('[data-open-regional-history]');if(history){set([history.dataset.openRegionalHistory]);E('search').value='';E('parish').value=E('theme').value='All';E('search').dispatchEvent(new Event('input',{bubbles:true}));location.hash='stories';}
});
// A single saved-work entrance combines trips and reading, preserving their original storage keys.
const compareButton=document.createElement('button');compareButton.id='compare-use-shortlist';compareButton.type='button';compareButton.textContent='Compare my saved places';E('stop-comparison').querySelector('h3').after(compareButton);
compareButton.addEventListener('click',()=>{E('compare-parish-filter').querySelectorAll('input').forEach(x=>x.checked=false);E('compare-parish-filter').querySelector('input').dispatchEvent(new Event('change',{bubbles:true}));let saved=[];try{const a=JSON.parse(localStorage.getItem('tg-jamaica-travel-v1')||'[]');if(Array.isArray(a))saved=a.filter(id=>byPlace.has(id)&&byPlace.get(id).status!=='Temporarily unavailable');}catch(e){}[0,1,2].forEach(i=>{E('compare-place-'+i).value=saved[i]||'';E('compare-place-'+i).dispatchEvent(new Event('change',{bubbles:true}));});reveal('place-comparison');});
function savedCounts(){let trips=[],reading=[],notes={},done=[];try{const t=JSON.parse(localStorage.getItem('tg-jamaica-travel-v1')||'[]');if(Array.isArray(t))trips=t.filter(id=>byPlace.has(id));}catch(e){}try{const r=JSON.parse(localStorage.getItem('tg-jamaica-reading')||'[]');if(Array.isArray(r))reading=r;}catch(e){}try{const l=JSON.parse(localStorage.getItem('tg-jamaica-learning-v1')||'{}');if(l.notes&&typeof l.notes==='object')notes=l.notes;if(Array.isArray(l.done))done=l.done;}catch(e){}E('my-trip-total').textContent=trips.length;const readingIds=[...new Set([...reading,...done,...Object.keys(notes).filter(id=>typeof notes[id]==='string'&&notes[id])])].filter(id=>A.some(a=>a.id===id));E('my-reading-total').textContent=readingIds.length;E('saved-work-count').textContent=trips.length+readingIds.length;let journal=E('saved-learning-notes');if(!journal){journal=document.createElement('div');journal.id='saved-learning-notes';E('my-reading').append(journal);}const rows=A.filter(a=>notes[a.id]||done.includes(a.id));journal.innerHTML=rows.length?rows.map(a=>'<article class="saved-note"><h3><a href="#'+a.id+'">'+esc(a.title)+'</a></h3><p>'+esc(done.includes(a.id)?'Marked read':'Reading in progress')+'</p><p>'+esc(notes[a.id]||'No note saved.')+'</p></article>').join(''):'<p>Your notes and reading progress appear here after you use an article’s learning tools.</p>';}
E('saved-journal-export').addEventListener('click',()=>E('learning-export').click());
document.addEventListener('click',e=>{if(e.target.closest('[data-save-place],[data-mark-read],#reading-save,[data-remove],#trip-clear'))setTimeout(savedCounts,0);});document.addEventListener('input',e=>{if(e.target.matches('.article-learning textarea'))savedCounts();});
// Practical modules are reached from Plan. Direct links open the relevant disclosure.
for(const id of ['stop-comparison','personal-day','trip-checklist','travel-budget','cruise-return']){const el=E(id);if(!el)continue;const details=document.createElement('details');details.className='plan-tool-disclosure';const summary=document.createElement('summary');summary.textContent=el.querySelector('h2,h3')?.textContent||id;el.before(details);details.append(summary,el);}
const returnLink=document.createElement('a');returnLink.id='reader-return-context';returnLink.href=lastCollection;returnLink.textContent='← Back to my collection';E('reading-tools').before(returnLink);
window.addEventListener('hashchange',()=>{if(!applying)for(const api of T.controls.values())if(JSON.stringify(api.selected().slice().sort())!==JSON.stringify(ids.slice().sort()))api.set(ids);feedback();savedCounts();let hash='';try{hash=decodeURIComponent(location.hash.slice(1));}catch(e){}const target=E(hash);if(hash.startsWith('programme-')){const record=LP.find(p=>'programme-'+p.id===hash);if(record&&ids.length&&!T.matches(record,ids))set(T.regionsFor(record));}if(target?.closest('.reading-article')){returnLink.href=lastCollection;returnLink.textContent='← Back to '+(lastCollection==='#corridors'?'my region':lastCollection==='#site-search'?'my search':'my collection');}if(page()==='corridors')renderRegionalPreview();});
set(ids,{weather:ids.length>0});savedCounts();window.dispatchEvent(new HashChangeEvent('hashchange'));
})();
