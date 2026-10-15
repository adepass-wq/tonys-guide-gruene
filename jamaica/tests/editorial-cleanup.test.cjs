const test=require('node:test'),assert=require('node:assert/strict');const {site}=require('./helpers.cjs');
test('public copy omits production notes while captions retain source access and historical dates',()=>{const s=site();try{
 const text=[...s.d.querySelectorAll('p,figcaption,summary')].map(x=>x.textContent).join('\n');
 assert.doesNotMatch(text,/Whole.frame resized WebP|as identified by the file record|Source review:|Sources checked \d|Source checked \d|Current media status:|Copy research brief|Primary listing checked|Do not print exact hours|page and reference markers removed/);
 assert.ok(s.d.querySelectorAll('figcaption .media-credit').length>=333);
 for(const credit of s.d.querySelectorAll('figcaption .media-credit')){assert.equal(credit.open,false);assert.ok(credit.querySelector('a[href]'));assert.ok(credit.closest('figcaption').querySelector('.media-caption-description').textContent.trim());}
 const caption=s.E('read-culture').querySelector('[data-media-record="sound-system-2009"] figcaption');assert.match(caption.textContent,/Long Bay.*Negril.*2009/);assert.ok(caption.querySelector('a[href="https://creativecommons.org/licenses/by/2.0/"]'));
 const court=s.E('read-court');assert.equal(court.querySelector('img'),null);assert.match(court.textContent,/MS 273/);
 assert.equal(s.d.querySelectorAll('.reading-article').length,153);assert.equal(s.d.querySelectorAll('.travel-card').length,140);
 s.E('iva-copy-comparison').click();assert.doesNotMatch(s.E('iva-compare-output').textContent,/research priorit/i);
 assert.deepEqual(s.errors,[]);
 }finally{s.close();}});
