#!/usr/bin/env node
/**
 * Builds the English site: node tools/en/build.js
 *   - renders every tools/en/pages/*.js into /en/<path>/index.html
 *   - writes sitemap-en.xml (live pages only; a separate file so sitemap.xml stays untouched)
 *   - for live pages with a Spanish twin, adds hreflang + an "English" nav item to the Spanish page
 * Idempotent: running it twice changes nothing.
 */
const fs = require('fs');
const path = require('path');
const { SITE, assetVersions, renderPage } = require('./layout');

const ROOT = path.resolve(__dirname, '..', '..');
const PAGES = path.join(__dirname, 'pages');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const write = (p, s) => { const f = path.join(ROOT, p); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s, 'utf8'); };

const crypto = require('crypto');
// ?v= of any asset: the same content hash version_assets.cjs uses, so both agree.
const assetV = f => crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, f))).digest('hex').slice(0, 8);
const ctx = { v: assetVersions(read('index.html')), assetV };
const pages = fs.readdirSync(PAGES).filter(f => f.endsWith('.js')).sort().map(f => require(path.join(PAGES, f)));

let changed = 0;
const written = [];
// The ad blocks are inserted afterwards by tools/insert_ads.py (like on every other page), so
// "unchanged" means unchanged once the ad blocks and whitespace are ignored.
const norm = t => t.replace(/<div class="tm-ad">[\s\S]*?<\/div>/g, '').replace(/\s+/g, '');
const put = (p, s) => {
  const f = path.join(ROOT, p);
  if (fs.existsSync(f) && norm(fs.readFileSync(f, 'utf8')) === norm(s)) return;
  write(p, s); changed++; written.push(p); console.log('  escrito', p);
};

const today = new Date().toISOString().slice(0, 10);
const sitemap = [];
for (const pg of pages) {
  put(pg.path.replace(/^\//, '') + 'index.html', renderPage(pg, ctx));
  if (pg.live !== false) sitemap.push(pg);
}

// sitemap-en.xml, keeping the lastmod of the previous run when the content did not change
let prev = {};
try { for (const m of read('sitemap-en.xml').matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)</g)) prev[m[1]] = m[2]; } catch (e) {}
const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap.map(pg => {
  const loc = SITE + pg.path;
  const alt = pg.esPath
    ? `\n    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>\n    <xhtml:link rel="alternate" hreflang="es" href="${SITE + pg.esPath}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE + pg.esPath}"/>\n  `
    : '';
  return `  <url><loc>${loc}</loc><lastmod>${pg.lastmod || prev[loc] || today}</lastmod>${alt}</url>`;
}).join('\n')}
</urlset>
`;
if (sitemap.length) put('sitemap-en.xml', sm);

// Spanish side: hreflang + selector for live pairs
const MARK_A = '<!--i18n-->', MARK_B = '<!--/i18n-->';
for (const pg of pages) {
  if (pg.live === false || !pg.esPath) continue;
  const file = (pg.esPath === '/' ? '' : pg.esPath.replace(/^\//, '')) + 'index.html';
  let h = read(file);
  const orig = h;
  const links = `${MARK_A}<link rel="alternate" hreflang="es" href="${SITE + pg.esPath}">\n<link rel="alternate" hreflang="en" href="${SITE + pg.path}">\n<link rel="alternate" hreflang="x-default" href="${SITE + pg.esPath}">${MARK_B}\n`;
  h = h.replace(/<!--i18n-->[\s\S]*?<!--\/i18n-->\r?\n?/g, '');   // all blocks (global): reruns never pile up
  h = h.replace(/(<link rel="canonical"[^>]*>\n)/, `$1${links}`);
  const li = `<li class="tm-lang"><a href="${pg.path}" hreflang="en" lang="en" title="View this page in English">English</a></li>`;
  h = h.replace(/\s*<li class="tm-lang">.*?<\/li>/g, '');
  h = h.replace(/(\s*<\/ul>\s*<\/nav>)/, `\n        ${li}$1`);
  if (h !== orig) { write(file, h); changed++; console.log('  selector/hreflang en', file); }
}
const pagesWritten = written.filter(p => p.endsWith('.html'));
if (pagesWritten.length) {
  const r = require('child_process').spawnSync('python', [path.join(ROOT, 'tools', 'insert_ads.py'), '--apply', ...pagesWritten], { cwd: ROOT, encoding: 'utf8' });
  if (r.status !== 0) console.log('  AVISO: insert_ads.py falló:', (r.stderr || r.stdout || '').slice(-300));
  else console.log('  anuncios:', (r.stdout.match(/ok[^\r\n]*/g) || []).join(' | ').slice(0, 200));
}
console.log(changed ? `${changed} archivo(s) cambiado(s)` : 'sin cambios');
