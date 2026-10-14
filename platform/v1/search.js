/* Tony's Guide shared search primitives, pinned v1.0.0. Destination ranking and aliases stay local. */
(function(root){'use strict';
function fold(value){return String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
function words(value){return fold(value).match(/[a-z0-9]+/g)||[];}
function normalize(value){return fold(value).replace(/[^a-z0-9]+/g,' ').trim();}
root.TGPlatform=Object.freeze({version:'1.0.0',fold,words,normalize});
})(typeof window!=='undefined'?window:globalThis);
