#!/usr/bin/env node
// Writes the "English edition" section at the end of llms.txt from the English page modules:
//   node tools/en/gen-llms.js
// Safe to re-run: everything from the "## English edition" heading to the end of the file is replaced.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const SITE = 'https://www.teoriamusical.com.es';
const PAGES = path.join(__dirname, 'pages');
const pages = fs.readdirSync(PAGES).filter(f => f.endsWith('.js')).map(f => require(path.join(PAGES, f)))
  .filter(p => p.live !== false && p.path);
const GROUPS = [
  ['Free tools', /^\/en\/tools\//],
  ['Music dictionary', /^\/en\/music-dictionary\//],
  ['Interactive exercises', /^\/en\/exercises\//],
  ['Music games', /^\/en\/games\//],
];
const clean = s => String(s || '').replace(/\s+/g, ' ').trim();
const line = p => `- [${clean(p.title)}](${SITE}${p.path})${p.description ? ': ' + clean(p.description) : ''}`;
const taken = new Set();
let out = `## English edition

> The whole site is also available in English under ${SITE}/en/ (American English; British terms are marked "UK:"). Most English pages have a Spanish twin, linked with hreflang. Note names use letters (C D E F G A B) and the site follows the Spanish conservatory tradition where noted. Author: Eduardo Escrig Zomeño.

- [Home](${SITE}/en/)
`;
taken.add('/en/');
for (const [name, re] of GROUPS) {
  const list = pages.filter(p => re.test(p.path)).sort((a, b) => a.path.localeCompare(b.path));
  list.forEach(p => taken.add(p.path));
  out += `\n### ${name}\n\n${list.map(line).join('\n')}\n`;
}
const rest = pages.filter(p => !taken.has(p.path)).sort((a, b) => a.path.localeCompare(b.path));
if (rest.length) out += `\n### Site information\n\n${rest.map(line).join('\n')}\n`;
const f = path.join(ROOT, 'llms.txt');
let s = fs.readFileSync(f, 'utf8');
const i = s.indexOf('\n## English edition');
if (i >= 0) s = s.slice(0, i + 1);
if (!s.endsWith('\n')) s += '\n';
s = s.replace('Idioma: español. URL: https://www.teoriamusical.com.es/', 'Idioma: español (edición en inglés en /en/, más abajo). URL: https://www.teoriamusical.com.es/');
fs.writeFileSync(f, s + '\n' + out);
console.log('llms.txt: English edition,', pages.length, 'pages');
