function fold(value){return String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
function words(value){return fold(value).match(/[a-z0-9]+/g)||[];}
function normalize(value){return fold(value).replace(/[^a-z0-9]+/g,' ').trim();}
export {fold,words,normalize};
