const test=require('node:test'),assert=require('node:assert/strict'),{site}=require('./helpers.cjs');const frame=()=>new Promise(r=>setTimeout(r,45));
test('history discovery comes first and region selection reveals results; batches and clear recover the full directory',async()=>{
 const s=site();try{
 const h=s.E('history');assert(h.textContent.indexOf('Choose a history or cultural article')<h.textContent.indexOf('Choose a route through Jamaica’s history'));
 s.route('history');assert.equal(s.E('results').children.length,24);assert.equal(s.E('history-more').hidden,false);s.E('history-more').click();assert.equal(s.E('results').children.length,48);
 s.input('history-region','east');await frame();assert(s.scrolls.includes('count'));assert.equal(s.d.activeElement.id,'count');s.input('parish','Portland');await frame();assert(s.E('results').querySelector('a[href="#parish-mooretown"]'));
 s.input('parish','Manchester');await frame();assert(s.E('count').textContent.startsWith('0 of'));s.E('history-reset').click();assert.equal(s.E('history-region').value,'all');assert.equal(s.E('parish').value,'All');assert.equal(s.E('results').children.length,24);assert.equal(s.d.activeElement.id,'search');
 s.route('activities');s.input('activity-region','east');await frame();assert(s.scrolls.includes('activity-count'));s.input('activity-parish','Portland');await frame();assert(s.E('activity-directory-cards').querySelector('a[href="#parish-mooretown"]'));assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('corrupt stored learning data and malformed links do not break reading; journal export includes a saved note',async()=>{
 const s=site({savedStorage:{'tg-jamaica-learning-v1':JSON.stringify({done:['bogus','parish-mona','parish-mona'],notes:{'parish-mona':42,bogus:'x'},path:12})}});try{
 s.route('parish-mona');assert.equal(s.E('note-parish-mona').value,'');assert(s.E('parish-mona').querySelector('[data-mark-read]').textContent.includes('undo'));
 let exported; s.w.URL.createObjectURL=blob=>{exported=blob;return 'blob:test'};s.w.HTMLAnchorElement.prototype.click=function(){this.dataset.clicked='true'};
 s.input('note-parish-mona','Distinguish the relocated chapel from the estate.','input');s.E('learning-export').click();assert(exported);assert.equal(exported.type,'text/plain;charset=utf-8');const text=await new Promise((resolve,reject)=>{const reader=new s.w.FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsText(exported);});assert(text.includes('Distinguish the relocated chapel'));assert(text.includes('https://jamaica.tonysguide.com/#parish-mona'));
 s.route('%E0%A4%A');await frame();assert(!s.E('home').hidden);assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('conditions reject a fractional saved place and malformed cache, and disclose a failed refresh while retaining readings',async()=>{
 const s=site({savedStorage:{'tg-jamaica-weather-place':'1.5','tg-jamaica-conditions-v1':JSON.stringify({saved:Date.now(),weather:Array(7).fill({current:null}),marine:Array(7).fill({current:null})})}});try{
 await frame();assert.equal(s.E('conditions-place').value,'0');assert(s.E('conditions-weather-status').textContent.includes('Model valid'));s.w.fetch=async()=>{throw Error('Test refresh failure')};s.E('conditions-refresh').click();await frame();assert(s.E('conditions-weather-status').textContent.includes('Update failed'));assert(s.E('conditions-marine-status').textContent.includes('Update failed'));assert(s.E('conditions-weather-metrics').textContent.includes('28°C'));assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
