import test from 'node:test';
import assert from 'node:assert/strict';
import {fold,words,normalize} from './v1/search.mjs';
import {resolve,valid} from './v1/trip-window.mjs';
test('shared search folds accents without merging word boundaries or removing destination aliases',()=>{
 assert.equal(fold('CAFÉ São José'),'cafe sao jose');
 assert.deepEqual(words('Café—St. Ann'),['cafe','st','ann']);
 assert.equal(normalize('  Lake / River  '),'lake river');
 assert.equal(normalize(null),'');
});
test('calendar days retain weekend, leap-day and year-boundary behavior',()=>{
 assert.equal(valid('2028-02-30'),false);assert.equal(valid('2028-02-29'),true);
 assert.deepEqual(resolve('two','2026-12-31','2026-10-14').dates,['2026-12-31','2027-01-01']);
 assert.deepEqual(resolve('weekend','2026-10-18','2026-10-14').dates,['2026-10-24','2026-10-25']);
 assert.equal(resolve('half','invalid','2026-10-14').time,'half');
});
