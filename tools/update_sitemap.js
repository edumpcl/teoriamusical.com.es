const fs = require('fs');
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const pages = [
  'herramientas/afinador/arpa/',
  'herramientas/afinador/bajo/',
  'herramientas/afinador/banjo/',
  'herramientas/afinador/bombardino/',
  'herramientas/afinador/clarinete-bajo/',
  'herramientas/afinador/contrafagot/',
  'herramientas/afinador/corno-ingles/',
  'herramientas/afinador/fagot/',
  'herramientas/afinador/flautin/',
  'herramientas/afinador/fliscorno/',
  'herramientas/afinador/mandolina/',
  'herramientas/afinador/oboe/',
  'herramientas/afinador/saxofon-alto/',
  'herramientas/afinador/saxofon-baritono/',
  'herramientas/afinador/saxofon-soprano/',
  'herramientas/afinador/saxofon-tenor/',
  'herramientas/afinador/timbales/',
  'herramientas/afinador/trombon/',
  'herramientas/afinador/trompa/',
  'herramientas/afinador/tuba/',
  'herramientas/afinador/ukelele/',
];
let count = 0;
for (const page of pages) {
  const escaped = page.replace(/[-/]/g, function(c) { return c === '-' ? '\\-' : '\\/'; });
  const urlPattern = new RegExp('(<loc>[^<]*' + escaped + '<\\/loc>\\s*<lastmod>)(\\d{4}-\\d{2}-\\d{2})(<\\/lastmod>)', 'g');
  sitemap = sitemap.replace(urlPattern, function(m, p1, date, p3) {
    if (date !== '2026-05-28') { count++; return p1 + '2026-05-28' + p3; }
    return m;
  });
}
fs.writeFileSync('sitemap.xml', sitemap, { encoding: 'utf8' });
console.log('Updated ' + count + ' sitemap entries');
