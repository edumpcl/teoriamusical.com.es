#!/usr/bin/env node
// Lists every English dictionary page module: EN path <- ES path, and flags problems
// (duplicate EN paths, duplicate ES paths, ES pages with no module, title/description lengths).
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const dir = path.join(__dirname, 'pages');
const rows = [];
for (const f of fs.readdirSync(dir).filter(f => f.startsWith('dict-') && f.endsWith('.js')).sort()) {
  try {
    const p = require(path.join(dir, f));
    rows.push({ f, path: p.path, es: p.esPath, t: (p.title || '').length, d: (p.description || '').length });
  } catch (e) { console.log('LOAD ERROR', f, e.message.split('\n')[0]); }
}
const seen = {}, seenEs = {};
for (const r of rows) {
  const flags = [];
  if (seen[r.path]) flags.push('DUP-EN-PATH with ' + seen[r.path]); else seen[r.path] = r.f;
  if (seenEs[r.es]) flags.push('DUP-ES-PATH with ' + seenEs[r.es]); else seenEs[r.es] = r.f;
  if (r.t > 60) flags.push('title ' + r.t);
  if (r.d > 160) flags.push('desc ' + r.d);
  console.log(r.path.replace('/en/music-dictionary', '~').padEnd(78), '<-', (r.es || '').replace('/diccionario-musical', '').padEnd(70), flags.join(' | '));
}
// Spanish dictionary pages (wave 1) with no English module
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : (e.name === 'index.html' ? [path.join(d)] : []));
const es = walk(path.join(ROOT, 'diccionario-musical')).map(d => '/' + path.relative(ROOT, d).replace(/\\/g, '/') + '/');
const missing = es.filter(p => !seenEs[p]);
console.log('\n' + rows.length + ' modules; ' + missing.length + ' Spanish dictionary pages without one:');
console.log(missing.map(p => p.replace('/diccionario-musical/', '')).join('  '));
