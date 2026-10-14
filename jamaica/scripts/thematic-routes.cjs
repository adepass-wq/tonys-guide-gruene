const fs=require('node:fs'),path=require('node:path');
// Reviewed route fragments preserve the staged stop text, maps and original photo credits.
// The structured inventory supplies route identity, ordering, filters and collection data.
module.exports=function(root,expand){
 const rows=JSON.parse(fs.readFileSync(path.join(root,'data/thematic-routes.json'),'utf8'));
 return rows.map(r=>expand('routes/'+r.id+'.html')).join('\n');
};
