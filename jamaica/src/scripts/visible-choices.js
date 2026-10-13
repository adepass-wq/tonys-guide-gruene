(function(){
const E=id=>document.getElementById(id);let pending;
function reveal(id){const target=E(id);if(!target||target.closest('[hidden]'))return;cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>{document.querySelectorAll('.choice-highlight').forEach(x=>x.classList.remove('choice-highlight'));target.classList.add('choice-highlight');target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});});}
const changes={
 'trip-start-date':'trip-plan-result','plan-pace':'trip-plan-result','history-topic':'history-output','history-time':'history-output',
 'food-kind':'food-count','food-area':'food-count','activity-corridor':'activity-count','activity-kind':'activity-count','activity-area':'activity-count',
 'travel-scope':'travel-result-count','travel-area':'travel-result-count','travel-kind':'travel-result-count','travel-pace':'travel-result-count',
 'events-from':'events-count','events-to':'events-count','events-area':'events-count','events-genre':'events-count',
 'history-region':'count','activity-region':'activity-count','activity-parish':'activity-count','parish':'count','theme':'count','era-select':'era-articles','island-choose':'island-detail','island-compare':'island-compare-text',
 'voice-parish':'voice-count','regional-speaker-0':'regional-comparison','regional-speaker-1':'regional-comparison',
 'record-type':'record-count','iva-filter':'iva-parish-grid','iva-compare':'iva-compare-output','language-feature':'language-feature-explanation','budget-currency':'budget-result','conditions-place':'conditions-place-heading','conditions-units':'conditions-place-heading','packing-kind':'packing-items'};
document.addEventListener('change',e=>{const id=changes[e.target.id]||(e.target.id.startsWith('compare-place-')?'place-comparison':e.target.id.startsWith('schedule-place-')?'schedule-output':null);if(id)reveal(id);});
document.addEventListener('click',e=>{const b=e.target.closest('button,[role=button]');if(!b)return;let id;
if(b.id==='events-parish-show')id='events-count';else if(b.id==='history-show')id='count';else if(b.matches('[data-trip-length]'))id='trip-plan-result';else if(b.matches('[data-home-range]'))id='home-discovery';else if(b.matches('[data-save-plan]'))id='trip-shortlist-section';else if(b.matches('[data-history-collection]'))id='count';else if(b.matches('[data-food-query],[data-food-filter]'))id='food-count';else if(b.matches('[data-activity-query],[data-activity-kind]'))id='activity-count';else if(b.matches('[data-event-range]'))id='events-count';else if(b.closest('#island-parish-buttons')||b.matches('.parish-shape'))id='island-detail';else if(b.matches('.iva-parish'))id='iva-current-name';else if(b.id==='schedule-use-shortlist')id='schedule-output';if(id)reveal(id);});
// Type-ahead results remain beside their input. A submitted filter brings the matches into view.
for(const [input,result]of [['food-query','food-count'],['activity-query','activity-count'],['search','count'],['voice-query','voice-count'],['record-search','record-count'],['source-index-query','source-index-results'],['iva-search','iva-parish-grid']])E(input)?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();reveal(result);}});
})();
