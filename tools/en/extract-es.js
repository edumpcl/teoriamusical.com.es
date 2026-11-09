#!/usr/bin/env node
// Prints what you need to translate a Spanish page: node tools/en/extract-es.js /diccionario-musical/intervalos/inversion/
//   --body     only the article body (the HTML to translate)
//   (default)  a header with title, description, h1, breadcrumb, article attributes, scripts and warnings, then the body
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
// Git Bash turns "/diccionario-musical/x/" into "C:/Program Files/Git/diccionario-musical/x/": undo that
const arg = (process.argv.slice(2).filter(a => !a.startsWith('--'))[0] || '').replace(/^[A-Za-z]:[\/]Program Files[\/]Git/, '');
if (!arg) { console.error('usage: node tools/en/extract-es.js /diccionario-musical/x/y/ [--body]'); process.exit(1); }
const file = path.join(ROOT, arg.replace(/^\//, ''), 'index.html');
const h = fs.readFileSync(file, 'utf8').replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n));
const one = (re, i = 1) => { const m = h.match(re); return m ? m[i] : ''; };

const art = h.match(/<article class="(tm-article[^"]*)"([^>]*)>([\s\S]*?)<\/article>/);
if (!art) { console.error('no <article> found in ' + file); process.exit(1); }
let body = art[3];
const hadInline = (body.match(/<script\b(?![^>]*\bsrc=)[^>]*>/g) || []).length;
body = body.replace(/<div class="tm-ad">[\s\S]*?<\/div>/g, '')           // ads are inserted by insert_ads.py
  // inline scripts: reported, not copied; with --keep-inline (exercise pages) the widget start-up calls stay in place
  .replace(/<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/g, m => process.argv.includes('--keep-inline') && !/gtag|googlefc|ld\+json/.test(m) ? m : '')
  .replace(/\n{3,}/g, '\n\n').trim();

if (process.argv.includes('--body')) { console.log(body); process.exit(0); }

const spanishSvgs = new Set(fs.readFileSync(path.join(__dirname, 'svg-spanish-text.txt'), 'utf8').split('\n').filter(Boolean));
const imgs = [...body.matchAll(/src="(\/assets\/img\/[^"]+\.svg)"/g)].map(m => m[1]);
const badImgs = [...new Set(imgs.filter(s => spanishSvgs.has(s.replace(/^\//, ''))))];
const scripts = [...h.matchAll(/<script src="\/assets\/js\/([^"?]+)\.js/g)].map(m => m[1]).filter(n => !['main', 'consent'].includes(n));
const widgets = [...new Set([...body.matchAll(/\b(data-tm-[a-z-]+)=/g)].map(m => m[1]))];
const crumbs = [...(one(/<nav class="tm-breadcrumb"[\s\S]*?<\/nav>/, 0)).matchAll(/<a href="([^"]+)">([^<]*)<\/a>/g)].map(m => [m[2], m[1]]);

console.log('ES PAGE     :', arg);
console.log('title       :', one(/<title>([\s\S]*?)<\/title>/));
console.log('description :', one(/<meta name="description" content="([^"]*)"/));
console.log('h1          :', one(/<h1>([\s\S]*?)<\/h1>/));
console.log('crumbs      :', JSON.stringify(crumbs));
console.log('article class:', art[1], '| attrs:', art[2].trim() || '(none)');
console.log('scripts     :', scripts.join(', ') || '(none)');
console.log('data-tm-*   :', widgets.join(', ') || '(none)');
console.log('images      :', imgs.length, 'SVG,', badImgs.length, 'with Spanish text');
if (badImgs.length) console.log('  ! SPANISH-TEXT SVGs (do not use; leave <!-- TODO-IMG: path --> and report):\n    ' + badImgs.join('\n    '));
if (hadInline) console.log(process.argv.includes('--keep-inline') ? `  ${hadInline} inline <script> block(s) kept in the body (widget start-up calls: copy them as they are)` : `  ! ${hadInline} inline <script> block(s) in the Spanish page (not copied; if it is a widget, omit it and report; for exercise pages use --keep-inline)`);
console.log('body chars  :', body.length);
console.log('\n----- BODY -----\n' + body);
