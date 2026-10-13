const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{site}=require('./helpers.cjs');
const series=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../src/data/reconsidered-series.json'),'utf8')).articles;
test('seven-piece series is discoverable and works as an ordered reading sequence',()=>{
 const s=site();try{
 assert.equal(series.length,7);assert(s.E('home').querySelector('a[href="#jamaica-reconsidered"]'));
 s.route('jamaica-reconsidered');assert(!s.E('history').hidden);assert(s.scrolls.includes('jamaica-reconsidered'));
 assert.deepEqual([...s.E('jamaica-reconsidered').querySelectorAll('.article-index-card')].map(c=>c.querySelector('a').hash.slice(1)),series.map(a=>a.id));
 const sequence=JSON.parse(s.E('learning-path-data').textContent).find(p=>p.id==='reconsidered');assert.deepEqual(sequence.articles,series.map(a=>a.id));
 for(const [i,row] of series.entries()){
  s.route(row.id);const article=s.E(row.id);assert(!article.hidden);assert(!s.E('reader').hidden);assert.equal([...s.d.querySelectorAll('.reading-article')].filter(a=>!a.hidden).length,1);
  const next=article.querySelector('.reconsidered-next');if(i)assert(next.querySelector(`a[href="#${series[i-1].id}"]`));if(i<6)assert(next.querySelector(`a[href="#${series[i+1].id}"]`));
  for(const citation of article.querySelectorAll('.narrative-ref')){const target=s.E(citation.hash.slice(1));assert(target&&article.contains(target));s.route(target.id);assert(!article.hidden);}
 }
 s.route('history');s.input('search','reconsidered','input');for(const row of series)assert(s.E('results').querySelector(`a[href="#${row.id}"]`));
 s.input('search','','input');s.input('parish','St. Thomas','input');assert(s.E('results').querySelector('a[href="#reconsidered-morant"]'));assert.deepEqual(s.errors,[]);
 }finally{s.close()}
});
test('series video and archive recording load on request and stop when leaving the reader',()=>{
 const s=site();try{
 s.route('reconsidered-rastafari');const box=s.E('reconsidered-rastafari').querySelector('[data-vimeo]');assert(!box.querySelector('iframe'));box.querySelector('button').click();assert(box.querySelector('iframe[src*="33115838"]'));
 s.E('global-media-stop').click();assert(!box.querySelector('iframe'));assert(box.querySelector('button'));
 box.querySelector('button').click();s.route('history');assert(!box.querySelector('iframe'));
 s.route('reconsidered-music');const player=s.E('reconsidered-music').querySelector('[data-early-player]'),button=player.querySelector('[data-early-load]');assert(!player.querySelector('iframe'));button.click();assert(player.querySelector('iframe[src*="k0698r79j"]'));
 s.route('history');assert(!player.querySelector('iframe'));assert(!button.hidden);assert.deepEqual(s.errors,[]);
 }finally{s.close()}
});
