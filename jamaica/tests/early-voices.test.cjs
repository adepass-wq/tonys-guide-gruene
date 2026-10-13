const test=require('node:test'),assert=require('node:assert/strict'),{site}=require('./helpers.cjs');
test('early voices are discoverable and archive players load on request with source-specific labels',()=>{
 const s=site();try{
 s.route('early-voices');assert(!s.E('voices').hidden);assert(s.scrolls.includes('early-voices'));
 for(const id of ['early-marson','early-nurse','early-windrush','early-cylinder','early-broadcast'])assert(s.E(id));
 assert(s.E('early-nurse').textContent.includes('1 JANUARY 1941'));assert(s.E('early-cylinder').textContent.includes('rather than a verified conversational extract'));assert(s.E('early-broadcast').textContent.includes('stage-managed'));
 const b=s.E('early-marson').querySelector('[data-early-load]');assert(!s.E('early-marson').querySelector('iframe'));b.click();assert(s.E('early-marson').querySelector('iframe').src.includes('p06bsp3f/player'));assert(b.hidden);
 s.route('early-windrush');assert(s.E('early-marson').querySelector('iframe'),'same page anchor keeps the recording available');
 s.route('history');assert(!s.E('early-marson').querySelector('iframe'));assert(!b.hidden);
 s.route('early-comparisons');assert(s.E('early-comparisons').open);assert(!s.E('voices').hidden);
 s.E('early-nurse').querySelector('[data-early-load]').click();assert(s.E('early-nurse').querySelector('iframe').src.includes('0TbNU0zRQSBTJTsaFIRS1o'));
 s.E('global-media-stop').click();assert(!s.E('early-nurse').querySelector('iframe'));assert(s.d.querySelector('audio').dataset.pauseRequested);
 s.route('early-jamaican-voices');assert(!s.E('early-jamaican-voices').hidden);assert.equal([...s.d.querySelectorAll('.reading-article')].filter(a=>!a.hidden).length,1);
 s.route('history');s.input('search','Una Marson','input');assert(s.E('results').querySelector('a[href="#early-jamaican-voices"]'));assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('music has both 1921 samples and Windrush/Marson stories keep interviews within their historical reading views',()=>{
 const s=site();try{
 s.route('read-culture');const music=s.E('read-culture');assert(music.textContent.includes('8 April 1931'));assert(music.querySelector('[data-early-load="cylinder"]'));assert(music.querySelector('[data-early-load="cylinder-drums"]'));music.querySelector('[data-early-load="cylinder-drums"]').click();assert(music.querySelector('iframe[src*="dz0117003"]'));
 s.route('history-windrush');assert(!s.E('history-windrush').hidden);assert(s.E('history-windrush').textContent.includes('1 January 1949'));const play=s.E('history-windrush').querySelector('.sensory-play');play.click();assert(s.E('history-windrush').querySelector('iframe').src.includes('QDH4IBeZF-M'));
 s.route('history-una-marson');s.E('history-una-marson').querySelector('[data-early-load="marson"]').click();assert(s.E('history-una-marson').querySelector('iframe[src*="p06bsp3f/player"]'));assert(s.E('learning-sequences').querySelector('a[href="#history-windrush"]'));assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('listening notes persist independently and clear without clearing other learning data',()=>{
 const s=site();try{
 s.w.localStorage.setItem('tg-jamaica-learning-v1','preserve-me');const n=s.E('early-notes');n.value='1941: compare a personal account with an interview.';n.dispatchEvent(new s.w.Event('input'));assert.equal(s.w.localStorage.getItem('tg-jamaica-pre1950-notes-v1'),n.value);
 s.E('early-notes-clear').click();assert.equal(n.value,'');assert.equal(s.w.localStorage.getItem('tg-jamaica-pre1950-notes-v1'),null);assert.equal(s.w.localStorage.getItem('tg-jamaica-learning-v1'),'preserve-me');assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
