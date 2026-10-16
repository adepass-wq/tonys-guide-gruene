const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{JSDOM}=require('jsdom');
function argument(name,fallback){const i=process.argv.indexOf(name);if(i<0)return fallback;if(!process.argv[i+1])throw Error('Missing value for '+name);return process.argv[i+1];}
const root=path.resolve(argument('--source',path.resolve(__dirname,'../src'))),output=path.resolve(argument('--output',path.resolve(__dirname,'../index.html'))),used=new Set();
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));if(manifest.format!==1)throw Error('Unsupported source manifest');
const token=/\{\{(include|generated) "([a-zA-Z0-9_./-]+)"\}\}/g;
function expand(file,stack=[]){const full=path.resolve(root,file);if(!full.startsWith(root+path.sep))throw Error('Include outside source directory: '+file);if(stack.includes(file))throw Error('Circular include: '+[...stack,file].join(' -> '));used.add(file);return fs.readFileSync(full,'utf8').replace(token,(all,kind,next)=>kind==='include'?expand(next,[...stack,file]):all);}
let html=expand(manifest.source);for(const file of [...manifest.articles,...manifest.places])if(!used.has(file))throw Error('Manifest file is not included: '+file);const dom=new JSDOM(html),d=dom.window.document,metadata=JSON.parse(fs.readFileSync(path.join(root,'data/article-metadata.json'),'utf8'));
function article(m){const el=d.getElementById(m.id);if(!el?.matches('.reading-article'))throw Error('Missing article '+m.id);return el;}
const generated={
 'foodways-cards':require('./foodways-catalogue.cjs')(root),
 'thematic-route-cards':require('./thematic-routes.cjs')(root,expand),
 'story-index':metadata.map(m=>{const el=article(m);return {id:m.id,title:el.querySelector('h1').textContent,theme:m.theme,parish:m.parish,parishes:m.parishes||[m.parish],lede:m.summary,text:el.textContent.trim()};}),
 'story-titles':metadata.map(m=>({id:m.id,title:article(m).querySelector('h1').textContent,era:m.era})),
 'source-index':metadata.map(m=>({id:m.id,title:article(m).querySelector('h1').textContent,sources:[...article(m).querySelectorAll('.article-citations li')].map(li=>({label:li.querySelector('a')?.textContent||li.textContent,target:li.id}))}))
};
html=html.replace(token,(all,kind,name)=>{if(kind!=='generated'||!generated[name])throw Error('Unknown template token '+all);return (typeof generated[name]==='string'?generated[name]:JSON.stringify(generated[name])).replace(/<\/script/gi,'<\\/script');});if(/\{\{(?:include|generated)\b/.test(html))throw Error('Unresolved source token');
const articleIds=[...d.querySelectorAll('.reading-article')].map(el=>el.id);if(articleIds.length!==metadata.length||new Set(metadata.map(m=>m.id)).size!==metadata.length)throw Error('Article metadata and reader fragments do not agree');
// Compact embedded data as the event inventory grows; preserve parsed values and script boundaries.
html=html.replace(/(<script\b[^>]*\btype=["']application\/json["'][^>]*>)([\s\S]*?)(<\/script\s*>)/gi,(all,open,body,close)=>open+JSON.stringify(JSON.parse(body)).replace(/<\/script/gi,'<\\/script')+close);
// Keep original media bytes and credits, but deliver images as reusable static files.
const check=process.argv.includes('--check'),defaultOutput=path.resolve(__dirname,'../index.html'),assetRoot=output===defaultOutput?path.resolve(__dirname,'../../public/assets'):path.join(path.dirname(output),'assets'),assets=new Map();
html=html.replace(/data:image\/(jpeg|png|webp|gif);base64,([A-Za-z0-9+/=]+)/g,(all,type,data)=>{const bytes=Buffer.from(data,'base64'),name=crypto.createHash('sha256').update(bytes).digest('hex').slice(0,24)+'.'+(type==='jpeg'?'jpg':type);assets.set(name,bytes);return '/assets/'+name;});
if(check){if(!fs.existsSync(output)||fs.readFileSync(output,'utf8')!==html)throw Error('jamaica/index.html is stale. Run npm run build and commit the output with the source.');for(const [name,bytes]of assets){const file=path.join(assetRoot,name);if(!fs.existsSync(file)||!fs.readFileSync(file).equals(bytes))throw Error('Missing or stale image asset: '+name);}}else{fs.mkdirSync(assetRoot,{recursive:true});for(const [name,bytes]of assets)fs.writeFileSync(path.join(assetRoot,name),bytes);fs.writeFileSync(output,html);}
console.log(`Static media: ${assets.size} unique assets; original image bytes preserved.`);
dom.window.close();console.log(`${check?'Checked':'Built'} Jamaica: ${metadata.length} articles, ${used.size} source modules, ${Buffer.byteLength(html)} bytes, SHA256 ${crypto.createHash('sha256').update(html).digest('hex')}.`);
