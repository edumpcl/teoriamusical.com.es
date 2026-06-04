#!/usr/bin/env node
/*
 * Cache-busting de assets.
 *
 * Vercel sirve /assets/* con `Cache-Control: max-age=31536000, immutable`
 * (un año), así que los cambios de CSS/JS NO se ven hasta que caduca la caché
 * del navegador. El HTML, en cambio, es `max-age=0, must-revalidate`.
 *
 * Este script añade `?v=<hash-del-contenido>` a todas las referencias
 * /assets/*.css y /assets/*.js dentro de los .html del sitio. Al cambiar el
 * contenido del asset cambia su hash → cambia la URL → el navegador descarga
 * la versión nueva. Es idempotente: re-ejecutar solo actualiza el hash si el
 * archivo cambió.
 *
 * Uso:  node tools/version_assets.cjs        (ejecutar antes de cada deploy)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '.playwright-mcp', 'tools']);

// Referencias del tipo  href="/assets/....css"  o  src="/assets/....js"
// con un ?v=hash opcional que se reemplaza por el hash actual.
const RE = /((?:href|src)=")(\/assets\/[^"?]+\.(?:css|js))(?:\?v=[0-9a-f]+)?(")/g;

const hashCache = new Map();
function assetHash(urlPath) {
  if (hashCache.has(urlPath)) return hashCache.get(urlPath);
  let h = null;
  try {
    const buf = fs.readFileSync(path.join(ROOT, urlPath.replace(/^\//, '')));
    h = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
  } catch (e) { /* asset inexistente: se deja sin sellar */ }
  hashCache.set(urlPath, h);
  return h;
}

function listHtml(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(name)) listHtml(full, acc);
    } else if (name.endsWith('.html')) {
      acc.push(full);
    }
  }
  return acc;
}

let filesChanged = 0, refsFound = 0;
const missing = new Set();
for (const hf of listHtml(ROOT, [])) {
  const text = fs.readFileSync(hf, 'utf8');
  const out = text.replace(RE, (m, pre, asset, post) => {
    const h = assetHash(asset);
    if (!h) { missing.add(asset); return m; }
    refsFound++;
    return pre + asset + '?v=' + h + post;
  });
  if (out !== text) { fs.writeFileSync(hf, out); filesChanged++; }
}

console.log(`Assets versionados: ${hashCache.size} · referencias: ${refsFound} · HTML modificados: ${filesChanged}`);
if (missing.size) console.log('AVISO — no encontrados (omitidos):', [...missing].join(', '));
