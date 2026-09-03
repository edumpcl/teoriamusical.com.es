'use strict';
/**
 * Servidor estatico para ver el sitio en local tal y como se publica.
 *
 *   node tools/serve.js            -> http://localhost:8099
 *   node tools/serve.js 3000       -> otro puerto
 *
 * Sirve index.html en los directorios (las URLs del sitio acaban en "/") y
 * usa rutas absolutas como en produccion, asi que /assets/... funciona igual.
 * Los anuncios y fuentes externas no cargan en local: es normal.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUERTO = Number(process.argv[2]) || 8099;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.mp3': 'audio/mpeg',
};

http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(ROOT, rel);

  // Fuera de la carpeta del sitio no se sirve nada.
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('403'); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) {
    const err404 = path.join(ROOT, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(fs.existsSync(err404) ? fs.readFileSync(err404) : '404');
  }

  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(file).pipe(res);
}).listen(PUERTO, () => {
  console.log('Sirviendo ' + ROOT);
  console.log('  http://localhost:' + PUERTO + '/');
  console.log('Ctrl+C para parar.');
});
