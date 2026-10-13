(()=>{
 const note=document.getElementById('dialect-notes'),status=document.getElementById('dialect-notes-status'),key='tg-jamaica-dialect-observations-v1';
 if(!note)return;
 try{note.value=localStorage.getItem(key)||'';}catch{}
 note.addEventListener('input',()=>{try{localStorage.setItem(key,note.value);status.textContent='Observations saved in this browser.';}catch{status.textContent='Browser saving is unavailable. Download your observations to keep them.';}});
 document.getElementById('dialect-notes-clear').addEventListener('click',()=>{note.value='';try{localStorage.removeItem(key);}catch{}status.textContent='These observations cleared.';});
 document.getElementById('dialect-notes-download').addEventListener('click',()=>{
  const text='Tony’s Guide Jamaica — Place, class and speech\nhttps://jamaica.tonysguide.com/#language-geography-class\n\n'+note.value+'\n\nHistorical recording source\nhttps://sova.si.edu/record/naa.2008-22\n',url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');
  a.href=url;a.download='jamaican-speech-listening-observations.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Observations downloaded with the article and archive links.';
 });
})();
