const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../src'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const data=JSON.parse(read('data/foodways-authentication.json'));
test('All 107 archive records have explicit evidence decisions and attributable source records',()=>{
 assert.equal(data.entries.length,107);assert.equal(new Set(data.entries.map(x=>x.id)).size,107);
 const sources=new Map(data.sources.map(x=>[x.id,x]));
 for(const e of data.entries){assert(e.note.length>60,e.name);assert.equal(e.formulaStatus,'withheld-unverified');assert.equal(e.kitchenStatus,'not-tested');assert.equal(e.historicalOrigin,'not-established-by-recipe-source');assert(e.sourceIds.length);for(const id of e.sourceIds){const s=sources.get(id);assert(s?.author&&s?.url.startsWith('https://'),e.name);assert(s.retrieval==='page-read'||e.status==='unresolved');}}
 const counts={};for(const e of data.entries)counts[e.status]=(counts[e.status]||0)+1;assert.deepEqual(counts,data.statusCounts);assert.equal(data.kitchenTests,0);assert.equal(data.authenticatedArchiveFormulas,0);
});
test('Archived formulations are retained but excluded from the shipped template',()=>{
 const initial=JSON.parse(fs.readFileSync(path.join(root,'../research/foodways-original-twelve.json'),'utf8')).recipes;
 const rest=['expanded-recipes','next-recipes','completion-a','completion-b','completion-c'].flatMap(x=>JSON.parse(read('data/foodways-'+x+'.json')).recipes);
 assert.equal(initial.length+rest.length,107);assert.deepEqual([...initial,...rest].map(x=>x.id),data.entries.map(x=>x.id));
 const template=read('template.html');for(const x of ['expanded-recipes','next-recipes','completion-a','completion-b','completion-c','foodways-inventory.js'])assert(!template.includes(x),x);
 assert(!read('scripts/foodways.js').includes('const data=['));
});
test('Entry decisions distinguish overlap, mismatched geography, source defects and modern adaptation',()=>{
 const entry=n=>data.entries[n-1];assert.equal(entry(30).relatedEntry,entry(14).id);assert.equal(entry(49).relatedEntry,entry(15).id);
 assert.equal(entry(48).status,'related-evidence');assert.equal(entry(58).status,'related-evidence');assert.match(entry(58).note,/Trinidadian/);assert.equal(entry(82).status,'dish-only');assert.match(entry(82).note,/Simone Walker-Barrett/);assert.equal(entry(103).status,'related-evidence');assert.equal(entry(106).status,'dish-only');assert.equal(entry(106).sourceIds.length,2);assert(entry(28).sourceClarificationRequired);assert.match(entry(72).note,/fusion/);
});
test('Static cards label limited evidence, escape source content and reject absent references',()=>{
 const build=require('../scripts/foodways-catalogue.cjs');const html=build(root);assert.equal((html.match(/class="foodways-card foodways-entry"/g)||[]).length,107);assert(!html.includes('<script'));assert(html.includes('rel="noopener noreferrer"'));assert(html.includes('Dish or product documented'));assert(html.includes('Related evidence only'));
 const temp=fs.mkdtempSync(path.join(require('node:os').tmpdir(),'foodways-render-'));try{fs.mkdirSync(path.join(temp,'data'));const altered=structuredClone(data);altered.entries[0].name='<img src=x onerror=alert(1)>';const file=path.join(temp,'data/foodways-authentication.json');fs.writeFileSync(file,JSON.stringify(altered));const escaped=build(temp);assert(escaped.includes('&lt;img src=x onerror=alert(1)&gt;'));assert(!escaped.includes('<img src=x'));altered.entries[0].sourceIds=['MISSING'];fs.writeFileSync(file,JSON.stringify(altered));assert.throws(()=>build(temp),/Missing Foodways source/);}finally{fs.rmSync(temp,{recursive:true,force:true});}
});

test('Source transcription and kitchen testing are separate; unresolved source formulas are withheld',()=>{const selected=data.entries.filter(e=>e.publishedPreparation);assert.equal(selected.length,5);assert.equal(selected.filter(e=>e.publishedPreparation.displayMode==='preparation').length,3);for(const e of selected){assert.equal(e.publishedPreparation.sourceId,e.sourceIds[0]);assert(e.publishedPreparation.status.includes('not kitchen-tested'));assert(e.publishedPreparation.ingredients.length>=4);assert(e.publishedPreparation.steps.length>=3);}assert.equal(data.entries[28].publishedPreparation.displayMode,'source-record');assert.equal(data.entries[62].publishedPreparation.displayMode,'source-record');});
