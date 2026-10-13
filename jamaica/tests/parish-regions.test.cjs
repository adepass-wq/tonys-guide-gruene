const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{site}=require('./helpers.cjs');
test('parish programme distinguishes 210 proposed subjects from staged narratives',()=>{
 const programme=JSON.parse(fs.readFileSync(path.join(__dirname,'../src/data/parish-editorial-programme.json')));
 assert.equal(programme.parishes.length,14);assert.equal(programme.parishes.reduce((n,p)=>n+p.subjects.length,0),210);
 for(const p of programme.parishes){assert.equal(p.minimum_dedicated_articles,15);assert.equal(new Set(p.subjects.map(x=>x.title)).size,15);}
 assert.equal(programme.progress.complete_15_per_parish,false);
});
test('regional history filters intersect parish and search; parish discovery exposes current collections',()=>{
 const s=site();try{
 s.route('history');s.input('history-region','north','input');assert(s.E('results').querySelector('a[href="#parish-lucea"]'));assert(s.E('results').querySelector('a[href="#parish-titchfield"]'));assert(!s.E('results').querySelector('a[href="#parish-maidstone"]'));
 s.input('parish','St. Elizabeth','input');assert(s.E('count').textContent.startsWith('0 of'));
 s.E('parish-library-cards').querySelector('[data-parish-browse="Manchester"]').click();assert.equal(s.E('history-region').value,'all');assert.equal(s.E('parish').value,'Manchester');assert(s.E('results').querySelector('a[href="#parish-maidstone"]'));assert(s.E('results').querySelector('a[href="#parish-mandeville"]'));
 s.input('search','instalments','input');assert(s.E('results').querySelector('a[href="#parish-maidstone"]'));assert(!s.E('results').querySelector('a[href="#parish-mandeville"]'));
 s.route('parish-maidstone');assert.equal(s.d.querySelectorAll('.reading-article:not([hidden])').length,1);assert(s.E('parish-maidstone').querySelector('.article-learning'));assert(s.E('parish-maidstone').querySelector('img').src.startsWith('https://jamaica.tonysguide.com/assets/'));
 assert.equal(s.E('parish-library-cards').children.length,14);assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('North Coast activities include western and eastern destinations and filter arranged heritage outings separately',()=>{
 const s=site();try{
 s.route('activities');s.input('activity-region','north');const cards=s.E('activity-directory-cards');assert(cards.querySelector('a[href="#travel-national-doctors"]'));assert(cards.querySelector('a[href="#travel-national-frenchmans"]'));assert(cards.querySelector('a[href="#parish-lucea"]'));assert(!cards.querySelector('a[href="#parish-maidstone"]'));
 s.input('activity-region','central');s.input('activity-kind','culture');assert(cards.querySelector('a[href="#parish-maidstone"]'));assert(cards.querySelector('a[href="#parish-alley"]'));assert(!cards.querySelector('a[href="#parish-lucea"]'));assert(cards.textContent.includes('Arrange access before travelling'));
 s.input('activity-query','Seaford','input');assert(s.E('activity-empty').hidden===false);s.input('activity-region','west');assert(cards.querySelector('a[href="#parish-seaford"]'));assert(s.E('activity-empty').hidden);s.input('activity-parish','Hanover');assert(!cards.querySelector('a[href="#parish-seaford"]'));s.input('activity-query','','input');assert(cards.querySelector('a[href="#parish-lucea"]'));
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('Accompong sound is identified and unloads when leaving its article; documentary stories stay locally discoverable',()=>{
 const s=site();try{
 s.route('parish-accompong');const a=s.E('parish-accompong');assert(a.textContent.includes('1 March 1738–9'));assert(a.textContent.includes('release date'));
 const play=a.querySelector('[data-early-load="accompong"]');play.click();assert(a.querySelector('iframe').src.includes('2JBGCsAjGjXm9ECjtpsusr'));
 s.route('parish-kenilworth');assert.equal(a.querySelectorAll('iframe').length,0);assert.equal(play.hidden,false);
 s.route('history');s.input('history-region','west','input');s.input('search','Frome','input');assert(s.E('results').querySelector('a[href="#parish-frome"]'));assert(!s.E('results').querySelector('a[href="#parish-kendal"]'));
 s.input('history-region','central','input');s.input('parish','Manchester','input');s.input('search','Kendal','input');assert(s.E('results').querySelector('a[href="#parish-kendal"]'));
 assert(s.E('parish-frome').textContent.includes('nine wounded'));assert(s.E('parish-frome').textContent.includes('thirteen wounded'));assert(s.E('parish-kendal').textContent.includes('187 fatalities'));
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('eastern parish pairs are discoverable; Moore Town sound has its own source and unloads',()=>{
 const s=site();try{
 s.route('history');s.input('history-region','north','input');s.input('parish','Portland','input');assert(s.E('results').querySelector('a[href="#parish-mooretown"]'));assert(s.E('results').querySelector('a[href="#parish-folly"]'));assert(!s.E('results').querySelector('a[href="#parish-mona"]'));
 s.input('history-region','east','input');s.input('parish','St. Thomas','input');assert(s.E('results').querySelector('a[href="#parish-morantpoint"]'));assert(s.E('results').querySelector('a[href="#parish-stokeshall"]'));
 s.input('history-region','capital','input');s.input('parish','St. Andrew','input');assert(s.E('results').querySelector('a[href="#parish-mona"]'));assert(s.E('results').querySelector('a[href="#parish-cinchona"]'));
 s.route('parish-mooretown');const a=s.E('parish-mooretown'),play=a.querySelector('[data-early-load="mooretown"]');play.click();assert(a.querySelector('iframe').src.includes('5KxB4hPrg0dBKaLKIdoM4W'));s.E('global-media-stop').click();assert.equal(a.querySelectorAll('iframe').length,0);assert.equal(play.hidden,false);play.click();s.route('parish-mona');assert.equal(a.querySelectorAll('iframe').length,0);
 assert(s.E('parish-mona').textContent.includes('1940–1941'));assert(s.E('parish-mona').textContent.includes('Gale’s Valley'));assert(s.E('parish-folly').textContent.includes('not the Folly mansion'));assert(s.E('read-maroon').querySelector('a[href="#parish-mooretown"]'));
 s.route('activities');s.input('activity-region','east');s.input('activity-parish','Portland');assert(s.E('activity-directory-cards').querySelector('a[href="#parish-mooretown"]'));assert(!s.E('activity-directory-cards').querySelector('a[href="#parish-mona"]'));
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('public-place histories connect parish discovery, source captions and arranged outings',()=>{
 const s=site();try{
 s.route('history');s.input('history-region','central','input');s.input('parish','St. Catherine','input');assert(s.E('results').querySelector('a[href="#parish-spanishtown"]'));assert(s.E('results').querySelector('a[href="#parish-flatbridge"]'));assert(!s.E('results').querySelector('a[href="#parish-ward"]'));
 s.input('history-region','north','input');s.input('parish','Trelawny','input');assert(s.E('results').querySelector('a[href="#parish-goodhope"]'));
 s.route('parish-goodhope');assert.equal(s.d.querySelectorAll('.reading-article:not([hidden])').length,1);assert(s.E('parish-goodhope').querySelector('.article-learning'));assert(s.E('parish-goodhope').querySelector('.archive-image-fallback'));assert(s.E('parish-goodhope').textContent.includes('1794'));
 s.route('activities');s.input('activity-region','west');s.input('activity-parish','Hanover');assert(s.E('activity-directory-cards').querySelector('a[href="#parish-fortcharlotte"]'));assert(!s.E('activity-directory-cards').querySelector('a[href="#parish-spanishtown"]'));
 assert(s.E('parish-burchell').textContent.includes('not the church sanctuary'));assert(s.E('parish-ward').textContent.includes('1941'));assert(s.E('parish-flatbridge').textContent.includes('after 1724'));assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
test('land-and-memory stories filter locally; Liberty Hall labels and stops its reused 1921 address',()=>{
 const s=site();try{
 s.route('history');s.input('history-region','central','input');s.input('parish','Manchester','input');assert(s.E('results').querySelector('a[href="#parish-marshallspen"]'));assert(!s.E('results').querySelector('a[href="#parish-libertyhall"]'));
 s.input('parish','Clarendon','input');assert(s.E('results').querySelector('a[href="#parish-halsehall"]'));
 s.route('parish-libertyhall');const a=s.E('parish-libertyhall');assert(a.textContent.includes('New York, July 1921'));assert(a.textContent.includes('March 1923'));let stopped=0;a.querySelector('audio').pause=()=>stopped++;s.route('parish-lacovia');assert(stopped>0);assert(s.E('parish-lacovia').textContent.includes('chronology is impossible'));assert(s.E('parish-blenheim').textContent.includes('explicitly a replica'));assert(s.E('parish-marshallspen').textContent.includes('full chapter was not accessible'));
 s.route('activities');s.input('activity-region','west');s.input('activity-parish','Westmoreland');assert(s.E('activity-directory-cards').querySelector('a[href="#parish-savannalamar"]'));assert(!s.E('activity-directory-cards').querySelector('a[href="#parish-marshallspen"]'));assert.deepEqual(s.errors,[]);
 }finally{s.close();}
});
