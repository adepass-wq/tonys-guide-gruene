const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const file=path.resolve(__dirname,'../index.html');execFileSync(process.execPath,[path.join(__dirname,'build.cjs')],{stdio:'inherit'});
const port=Number(process.env.PORT||4173);if(!Number.isInteger(port)||port<1||port>65535)throw Error('Invalid preview port');
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');if(url.pathname!=='/'&&url.pathname!=='/index.html'){res.writeHead(404,{'content-type':'text/plain'});res.end('Not found');return;}res.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-store'});res.end(fs.readFileSync(file));});
server.listen(port,'127.0.0.1',()=>console.log('Jamaica preview: http://127.0.0.1:'+port+' — rebuild after source edits, then refresh. Ctrl+C stops preview.'));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
