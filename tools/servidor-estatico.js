// Servidor estatico minimo para los bancos de pruebas (node tools/servidor-estatico.js, puerto 8910). El de Python se atasca con el modulo de Verovio (7 MB).
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const raiz = path.resolve(__dirname, '..');
const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp' };
http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]);
  let f = path.join(raiz, p);
  if (!f.startsWith(raiz)) { r.writeHead(403); return r.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end('404'); }
  r.writeHead(200, { 'content-type': tipos[path.extname(f)] || 'application/octet-stream', 'content-length': fs.statSync(f).size });
  fs.createReadStream(f).pipe(r);
}).listen(8910, '127.0.0.1');
