const test=require('node:test'),assert=require('node:assert/strict');
const {site}=require('./helpers.cjs');
test('ordinary collection links replace the current fragment and open one article',async()=>{
 const s=site({initialHash:'#history'});
 try{
  const a=s.d.querySelector('a[href="#reconsidered-emancipation"]');
  a.dispatchEvent(new s.w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
  await new Promise(resolve=>s.w.setTimeout(resolve,0));
  assert.equal(s.w.location.hash,'#reconsidered-emancipation');
  assert.equal(s.E('reconsidered-emancipation').hidden,false);
  assert.equal(s.d.querySelectorAll('.reading-article:not([hidden])').length,1);
 }finally{s.close();}
});
