const test=require('node:test'),assert=require('node:assert/strict'),{site}=require('./helpers.cjs');
test('dialect article deep links, citations and discovery preserve a single reading view',()=>{
 const s=site({initialHash:'#language-geography-class'});try{
  const a=s.E('language-geography-class');assert(!a.hidden);assert(!s.E('reader').hidden);
  assert.equal([...s.d.querySelectorAll('.reading-article')].filter(x=>!x.hidden).length,1);
  assert.equal(a.querySelectorAll('audio').length,6);assert.equal(a.querySelectorAll('figure img').length,4);
  assert(a.textContent.includes('h contrast'));assert(a.textContent.includes('not a current census'));
  s.route('voices');assert(s.E('voices').querySelector('a[href="#language-geography-class"]'));
  s.route('history');s.input('search','twang','input');assert(s.E('results').querySelector('a[href="#language-geography-class"]'));
  s.route('dialect-listening-start');assert(!a.hidden);assert(s.scrolls.includes('dialect-listening-start'));
  s.route('dialect-ref-2');assert(!a.hidden);assert(s.scrolls.includes('dialect-ref-2'));
  assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('dialect observations persist, download and clear only their own record; leaving stops audio',()=>{
 const s=site({savedStorage:{'tg-jamaica-dialect-observations-v1':'Earlier observations'}});try{
  assert.equal(s.E('dialect-notes').value,'Earlier observations');
  s.w.localStorage.setItem('tg-jamaica-listening-notes','preserve');
  s.input('dialect-notes','Port Maria: compare the interviewer’s opening.','input');
  assert.equal(s.w.localStorage.getItem('tg-jamaica-dialect-observations-v1'),s.E('dialect-notes').value);
  let filename;s.w.HTMLAnchorElement.prototype.click=function(){filename=this.download;};s.E('dialect-notes-download').click();assert.equal(filename,'jamaican-speech-listening-observations.txt');
  s.E('dialect-notes-clear').click();assert.equal(s.w.localStorage.getItem('tg-jamaica-dialect-observations-v1'),null);assert.equal(s.w.localStorage.getItem('tg-jamaica-listening-notes'),'preserve');
  s.route('language-geography-class');s.route('home');assert([...s.E('language-geography-class').querySelectorAll('audio')].every(a=>a.dataset.pauseRequested==='true'));
  assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
