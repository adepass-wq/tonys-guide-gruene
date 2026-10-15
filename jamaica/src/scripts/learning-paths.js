(function(){
const paths=JSON.parse(document.getElementById('learning-path-data').textContent),rows=JSON.parse(document.getElementById('history-article-data').textContent),byId=new Map(rows.map(r=>[r.id,r])),E=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key='tg-jamaica-learning-v1';let state={done:[],notes:{},path:null};
try{const saved=JSON.parse(localStorage.getItem(key));if(saved&&Array.isArray(saved.done)&&saved.notes&&typeof saved.notes==='object')state={...state,...saved};}catch(e){}
const known=new Set(rows.map(r=>r.id));state.done=[...new Set(state.done.filter(id=>known.has(id)))];state.notes=Object.fromEntries(Object.entries(state.notes).filter(([id,value])=>known.has(id)&&typeof value==='string'));if(typeof state.path!=='string')state.path=null;
function persist(){try{localStorage.setItem(key,JSON.stringify(state));return true;}catch(e){return false;}}
function minutes(id){return Math.max(1,Math.ceil((document.getElementById(id)?.textContent||'').split(/\s+/).length/210));}
const exportButton=document.createElement('button');exportButton.type='button';exportButton.id='learning-export';exportButton.textContent='Download my learning journal';E('learning-path-grid').before(exportButton);exportButton.addEventListener('click',()=>{const lines=['Tony’s Guide Jamaica — Learning journal','Exported '+new Date().toISOString(),'',...rows.filter(r=>state.done.includes(r.id)||state.notes[r.id]).flatMap(r=>[r.title,state.done.includes(r.id)?'Marked read':'Reading in progress','https://jamaica.tonysguide.com/#'+r.id,state.notes[r.id]||'(No note)',''])];const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='jamaica-learning-journal.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
function render(){
 E('learning-path-grid').innerHTML=paths.map(p=>{const n=p.articles.filter(id=>state.done.includes(id)).length;return '<article class="learning-card"><p class="label">'+p.articles.length+' articles · about '+p.articles.reduce((n,id)=>n+minutes(id),0)+' min</p><h3><a href="#learning-'+p.id+'">'+esc(p.title)+'</a></h3><p>'+esc(p.bestFor)+'</p><p class="learning-question">'+esc(p.question)+'</p><p>'+n+' of '+p.articles.length+' marked read</p><a class="article-read-link" href="#learning-'+p.id+'">See the reading sequence →</a></article>';}).join('');
 E('learning-sequences').innerHTML=paths.map(p=>'<section id="learning-'+p.id+'" class="learning-sequence"><h3>'+esc(p.title)+'</h3><p>'+esc(p.question)+'</p><ol>'+p.articles.map(id=>'<li><a data-learning-path="'+p.id+'" href="#'+id+'">'+esc(byId.get(id).title)+'</a><span> '+minutes(id)+' min'+(state.done.includes(id)?' · marked read':'')+'</span></li>').join('')+'</ol><a href="#learning-desk">Choose another pathway ↑</a></section>').join('');
 // Reuse an attributed figure from the opening article, retaining its complete caption.
 paths.forEach((p,i)=>{const source=(E(p.articles[0]).querySelector('[data-card-cover]')||E(p.articles[0]).querySelector('.narrative-body figure:has(img)'));if(source){const f=source.cloneNode(true);f.removeAttribute('id');f.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));f.classList.add('learning-cover');E('learning-path-grid').children[i].prepend(f);}});
}
for(const r of rows){
 const a=E(r.id),members=paths.filter(p=>p.articles.includes(r.id));
 const breadcrumb=document.createElement('nav');breadcrumb.className='learning-breadcrumb';breadcrumb.setAttribute('aria-label','Article location');breadcrumb.innerHTML='<a href="#home">Home</a> / <a href="#history">History &amp; culture</a> / <a href="#learning-desk">Learning pathways</a>';a.querySelector('h1').before(breadcrumb);
 const lab=document.createElement('aside');lab.className='article-learning';lab.innerHTML='<h2>Make the connections</h2><p>'+esc(members[0].question)+'</p><div class="learning-members">'+members.map(p=>'<a href="#learning-'+p.id+'">'+esc(p.title)+'</a>').join('')+'</div><p class="learning-position" data-learning-position></p><nav data-learning-neighbors aria-label="Related reading"></nav><label for="note-'+r.id+'">Your note: what changed in your understanding?</label><textarea id="note-'+r.id+'" rows="3" placeholder="Keep a thought, a question or a detail to revisit."></textarea><div class="learning-actions"><button type="button" data-mark-read="'+r.id+'" aria-pressed="false">Mark this article read</button><span data-note-status role="status"></span></div><p class="small">Notes and reading progress stay in this browser.</p>';
 a.querySelector('.article-citations').before(lab);
 const note=lab.querySelector('textarea');note.value=state.notes[r.id]||'';note.addEventListener('input',()=>{state.notes[r.id]=note.value;lab.querySelector('[data-note-status]').textContent=persist()?'Note saved in this browser.':'Storage unavailable; copy your note before leaving.';});
}
function articleContext(){
 const target=E(decodeHash()),a=target?.closest('.reading-article');if(!a)return;
 const members=paths.filter(p=>p.articles.includes(a.id)),p=members.find(p=>p.id===state.path)||members[0],i=p.articles.indexOf(a.id),lab=a.querySelector('.article-learning');
 lab.querySelector('[data-learning-position]').textContent=p.title+' · article '+(i+1)+' of '+p.articles.length;
 const neighbors=[p.articles[i-1],p.articles[i+1]].filter(Boolean);
 lab.querySelector('[data-learning-neighbors]').innerHTML=neighbors.map(id=>'<a data-learning-path="'+p.id+'" href="#'+id+'">'+(p.articles.indexOf(id)<i?'← Previous: ':'Next: ')+esc(byId.get(id).title)+'</a>').join('')+'<a href="#learning-'+p.id+'">See the whole sequence →</a>';
 const b=lab.querySelector('[data-mark-read]'),done=state.done.includes(a.id);b.setAttribute('aria-pressed',String(done));b.textContent=done?'Marked read · undo':'Mark this article read';
}
function decodeHash(){try{return decodeURIComponent(location.hash.slice(1));}catch(e){return '';}}
document.addEventListener('click',e=>{const link=e.target.closest('[data-learning-path]');if(link){state.path=link.dataset.learningPath;persist();}const b=e.target.closest('[data-mark-read]');if(b){const id=b.dataset.markRead;state.done=state.done.includes(id)?state.done.filter(x=>x!==id):[...state.done,id];const saved=persist();render();articleContext();b.closest('.article-learning').querySelector('[data-note-status]').textContent=saved?'Reading progress saved.':'Progress available for this session; browser storage is unavailable.';}});
window.addEventListener('hashchange',articleContext);render();articleContext();
})();
