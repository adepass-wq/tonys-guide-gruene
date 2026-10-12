(function(){
const E=id=>document.getElementById(id),box=document.createElement('div');box.className='result-feedback';box.id='result-feedback';box.hidden=true;box.innerHTML='<span role="status" aria-live="polite"></span><button type="button" class="result-feedback-view">View result</button><button type="button" aria-label="Dismiss update" class="result-feedback-close">×</button>';document.body.append(box);let destination=null,timer=null;
function visible(el){return el&&!el.hidden&&!el.closest('.guide-page[hidden]');}
function reveal(el,force=false){if(!visible(el))return;const r=el.getBoundingClientRect();if(force||r.top<135||r.top>window.innerHeight-100||r.bottom<135){el.style.scrollMarginTop='135px';el.scrollIntoView({block:'start',behavior:'instant'});el.classList.add('result-highlight');setTimeout(()=>el.classList.remove('result-highlight'),1500);}}
function notice(id,message,scroll){const target=E(id);if(!target)return;destination=target;box.querySelector('[role=status]').textContent=message;box.hidden=false;clearTimeout(timer);timer=setTimeout(()=>box.hidden=true,8000);if(scroll)reveal(target);}
box.querySelector('.result-feedback-close').addEventListener('click',()=>box.hidden=true);box.querySelector('.result-feedback-view').addEventListener('click',()=>{if(!visible(destination)){location.hash=destination.id;setTimeout(()=>reveal(destination,true),0);}else reveal(destination,true);box.hidden=true;});
const rules=[
['[data-home-range]','home-day-label','Today/weekend results updated.'],
['#conditions-place,#conditions-units,#conditions-refresh','conditions-place-heading','Weather and sea view updated.'],
['#travel-area,#travel-kind,#travel-pace,#travel-scope','travel-result-count',()=>E('travel-result-count').textContent],
['#packing-kind,#packing-items input,#packing-reset','packing-status','Your preparation checklist is updated.'],
['#travel-budget input,#travel-budget select','budget-result',()=>E('budget-result').textContent],
['#cruise-return input','cruise-result',()=>E('cruise-result').textContent],
['#shore-aboard,#shore-transit,#shore-buffer','shore-result',()=>E('shore-result').textContent],
['#trip-cloud-save','trip-cloud-status','Saved-trip link status is shown here.'],
['#edition-email-form button','edition-email-status','Email registration status is shown here.'],
['[data-trip-length],#trip-start-date,#plan-pace','trip-plan-title','Your day plan is updated.'],
['[data-save-plan]','trip-shortlist-section','Day added to your shortlist.'],
['#food-kind,#food-area,[data-food-query],[data-food-filter]','food-count',()=>E('food-count').textContent],
['#activity-kind,#activity-area,[data-activity-query],[data-activity-kind]','activity-count',()=>E('activity-count').textContent],
['[data-event-range],#events-area,#events-genre,#events-from,#events-to','events-count',()=>E('events-count').textContent+' · Local programmes also updated.'],
['[data-history-collection],#parish,#theme','count',()=>E('count').textContent],
['#era-select','era-articles','Historical-period reading list updated.'],
['#history-topic,#history-time','history-output','History route updated.'],
['[id^="compare-place-"]','place-comparison','Your place comparison is updated.'],
['[id^="schedule-place-"],#schedule-use-shortlist','schedule-output','Your timetable is updated.'],
['#island-choose,#island-compare,[data-parish]','island-detail','Parish and language information updated.'],
['[data-listen]','listen-title','Recording and listening context updated.'],
['#voice-parish','voice-count',()=>E('voice-count').textContent],
['#regional-speaker-0,#regional-speaker-1','regional-comparison','Recording comparison updated.'],
['#language-explainer,#language-feature','language-feature-explanation','Language explanation updated.'],
['#source-index-query','source-index-results','Source results updated.']
];
function update(e){if(e.type==='click'&&e.target.closest('a[href^="#"]')&&!e.target.closest('[data-activity-query],[data-activity-kind],[data-food-query]'))return;const save=e.target.closest('[data-save-place]');if(save&&e.type==='click'){setTimeout(()=>notice('trip-shortlist-section',save.getAttribute('aria-pressed')==='true'?'Place saved to your trip.':'Place removed from your trip.',false),0);return;}for(const [selector,id,message]of rules){const control=e.target.closest(selector);if(!control)continue;if(e.type==='click'&&control.matches('select,input'))continue;setTimeout(()=>notice(id,typeof message==='function'?message():message,true),0);break;}}
document.addEventListener('click',update);document.addEventListener('change',update);
// Typing keeps keyboard focus; an on-screen acknowledgement exposes remote result updates.
document.addEventListener('input',e=>{for(const [selector,id]of [['#travel-budget input','budget-result'],['#cruise-return input','cruise-result'],['#cruise-clock input','shore-result'],['#schedule-stops input,.schedule-basics input','schedule-output']])if(e.target.matches(selector)){notice(id,E(id).textContent.slice(0,180),false);break;}});
for(const [id,target]of [['food-query','food-count'],['activity-query','activity-count'],['search','count'],['voice-query','voice-count']]){E(id)?.addEventListener('input',()=>notice(target,E(target).textContent,false));}
})();
