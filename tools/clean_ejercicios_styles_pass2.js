/**
 * Second-pass cleanup for ejercicios pages.
 * Handles patterns not caught by pass-1:
 * - "Academia" center headers
 * - Round card headers (border-radius: 20px)
 * - Gold-border Bach header (extra nested div)
 * - MAESTRO BACH badges and favicon imgs
 * - Colored tip boxes → blockquote
 * - Remaining inline styles on h1/h2/h3, div, p, img
 * - "Siguiente Lección" nav blocks
 * - Editorial section comments
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  'ejercicios/acordes/index.html',
  'ejercicios/acordes/triadas-todas-las-posiciones/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/ascendentes-y-descendentes/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/conjuntos-y-disjuntos/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/distancia/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/index.html',
];

function toTitleCase(s) {
  const t = s.trim();
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}

function cleanArticle(article) {
  let s = article;

  // 1. Remove editorial section comments
  s = s.replace(/<!--[^-\n]*(?:SECCIÓN)[^-\n]*-->/g, '');

  // 2. Remove MAESTRO BACH badge divs (position: absolute)
  s = s.replace(/<div\s+style="[^\n"]*position:\s*absolute[^\n"]*">MAESTRO BACH<\/div>\s*\r?\n/g, '');

  // 3. Remove bach_favicon img tags
  s = s.replace(/<img[^>]*bach_favicon\.png[^>]*>\s*\r?\n?/g, '');

  // 4. "Academia" center header → h1 + p
  //    <div style="text-align: center; margin-bottom: 60px;">
  //      <h1 style="...">TITLE</h1>
  //      <p>subtitle</p>
  //      <div style="width: 80px; height: 4px; ..."></div>
  //    </div>
  s = s.replace(
    /<div\s+style="[^\n"]*text-align:\s*center[^\n"]*margin-bottom:\s*60px[^\n"]*">\s*\r?\n\s*<h1[^>]*>([^<]*)<\/h1>\s*\r?\n\s*(<p[^>]*>[\s\S]*?<\/p>)\s*\r?\n\s*<div[^>]*><\/div>\s*\r?\n\s*<\/div>/g,
    (_, title, subtitle) => '<h1>' + toTitleCase(title) + '</h1>\n' + subtitle.replace(/\s*style="[^"]*"/g, '')
  );

  // 5. Round card header: border-radius:20px div directly containing h1 + p
  //    (simple variant — no flex wrapper, no img)
  s = s.replace(
    /<div\s+style="[^\n"]*border-radius:\s*20px[^\n"]*">\s*\r?\n\s*<h1[^>]*>([^<]*)<\/h1>\s*\r?\n\s*(<p[^>]*>[\s\S]*?<\/p>)\s*\r?\n\s*<\/div>/g,
    (_, title, subtitle) => '<h1>' + toTitleCase(title) + '</h1>\n' + subtitle.replace(/\s*style="[^"]*"/g, '')
  );

  // 6. Round card header: border-radius:20px + inner flex div + h1, then p
  //    (badge and img already removed by steps 2-3)
  s = s.replace(
    /<div\s+style="[^\n"]*border-radius:\s*20px[^\n"]*">\s*\r?\n\s*<div\s+style="[^\n"]*(?:flex|display)[^\n"]*">\s*\r?\n\s*<h1[^>]*>([^<]*)<\/h1>\s*\r?\n\s*<\/div>\s*\r?\n\s*(<p[^>]*>[\s\S]*?<\/p>)\s*\r?\n\s*<\/div>/g,
    (_, title, subtitle) => '<h1>' + toTitleCase(title) + '</h1>\n' + subtitle.replace(/\s*style="[^"]*"/g, '')
  );

  // 7. Gold-border Bach header with nested div wrapper around h1+p
  //    Structure after badge+img removal:
  //    <div style="...border-bottom: 2px solid...">
  //      <div style="display: flex...">
  //        <div>
  //          <h1 style="...">TITLE</h1>
  //          <p style="...">subtitle</p>
  //        </div>
  //      </div>
  //    </div>
  s = s.replace(
    /<div\s+style="[^\n"]*border-bottom[^\n"]*">\s*\r?\n\s*<div\s+style="[^\n"]*flex[^\n"]*">\s*\r?\n\s*<div>\s*\r?\n\s*<h1[^>]*>([^<]*)<\/h1>\s*\r?\n\s*<p[^>]*>([^<]*)<\/p>\s*\r?\n\s*<\/div>\s*\r?\n\s*<\/div>\s*\r?\n\s*<\/div>/g,
    (_, title, subtitle) => '<h1>' + toTitleCase(title) + '</h1>\n<p>' + subtitle.trim() + '</p>'
  );

  // 8. Convert colored border-left tip boxes to blockquote
  //    Single-line style with border-left, no newline in style value
  //    (catches #fafaf0, #f4f9f6, #f9f4f3 backgrounds or border-left patterns)
  s = s.replace(
    /<div\s+style="[^\n"]*border-left:\s*\d+px[^\n"]*">\s*\r?\n([\s\S]*?)<\/div>/g,
    (_, inner) => '<blockquote>' + inner.trim() + '</blockquote>'
  );

  // 9. Remove "Siguiente Lección" nav blocks (border-radius: 15px wrappers)
  //    These end with a CONTINUAR link and are navigation fluff
  s = s.replace(
    /<div\s+style="[^\n"]*border-radius:\s*15px[^\n"]*">([\s\S]*?)<\/div>\s*\r?\n\s*<\/div>/g,
    (_, inner) => {
      const m = inner.match(/<a\s+href="([^"]+)"[^>]*>CONTINUAR[^<]*<\/a>/);
      if (!m) return '';
      const titleM = inner.match(/<h3[^>]*>([^<]*)<\/h3>/);
      const label = titleM ? titleM[1].trim() : '';
      return label
        ? '<p><a href="' + m[1] + '">Siguiente lección: ' + label + '</a></p>'
        : '<p><a href="' + m[1] + '">Siguiente lección</a></p>';
    }
  );

  // 10. "El Gran Reto Final" dark section: strip outer div, keep inner content
  //     Match dark div (background: #1a1a1a) wrapping h2+p+a
  s = s.replace(
    /<div\s+style="[^\n"]*background:\s*#1a1a1a[^\n"]*">\s*\r?\n([\s\S]*?)<\/div>/g,
    (_, inner) => inner.trim()
  );

  // 11. Strip h1/h2/h3 inline styles (always safe — they use site CSS)
  s = s.replace(/<h1\s+style="[^"]*">/g, '<h1>');
  s = s.replace(/<h2\s+style="[^"]*">/g, '<h2>');
  s = s.replace(/<h3\s+style="[^"]*">/g, '<h3>');

  // 12. Strip style from plain <div style="..."> (no class attribute before style)
  //     This preserves <div class="tm-..." style="..."> (class appears before style)
  s = s.replace(/<div\s+style="[^"]*">/g, '<div>');

  // 13. Strip style from <p style="...">, <li style="...">, <ul style="...">
  s = s.replace(/<p\s+style="[^"]*">/g, '<p>');
  s = s.replace(/<li\s+style="[^"]*">/g, '<li>');
  s = s.replace(/<ul\s+style="[^"]*">/g, '<ul>');

  // 14. Strip style from <a style="..."> (keep href)
  s = s.replace(/<a\s+(href="[^"]*")\s+style="[^"]*">/g, '<a $1>');
  s = s.replace(/<a\s+style="[^"]*"\s+(href="[^"]*")>/g, '<a $1>');

  // 15. Strip style from <img style="..."> (keep src and alt)
  s = s.replace(/<img([^>]*?)\s+style="[^"]*"([^>]*?)>/g, '<img$1$2>');

  // 16. Remove empty plain <div></div> lines
  s = s.replace(/<div>\s*<\/div>\s*\r?\n/g, '');

  // 17. Remove orphaned stray </div> lines (no matching open tag after cleanup)
  //     Pattern: </div> on its own line, preceded and followed by non-div content
  s = s.replace(/\n  <\/div>\n\n\n/g, '\n\n');
  s = s.replace(/\n<\/div>\n\n\n/g, '\n\n');

  // 18. Collapse multiple blank lines
  s = s.replace(/\n{3,}/g, '\n\n');

  return s;
}

function processFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');

  const artStart = html.indexOf('<article');
  const artEnd   = html.lastIndexOf('</article>') + '</article>'.length;
  if (artStart === -1 || artEnd === '</article>'.length - 1) return null;

  const before  = html.slice(0, artStart);
  const article = html.slice(artStart, artEnd);
  const after   = html.slice(artEnd);

  const cleaned = cleanArticle(article);
  if (cleaned === article) return null;

  const result = (before + cleaned + after)
    .replace(/"dateModified":"[^"]*"/g, '"dateModified":"2026-05-29"');

  return result;
}

let fixed = 0;
const problems = [];

for (const rel of TARGETS) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) { problems.push('NOT FOUND: ' + rel); continue; }

  const result = processFile(file);
  if (!result) { console.log('~ unchanged:', rel); continue; }

  fs.writeFileSync(file, result, 'utf8');
  fixed++;
  console.log('✓', rel);
}

console.log('\nFixed:', fixed);
if (problems.length) {
  console.log('\nProblems:');
  problems.forEach(p => console.log(' !', p));
}
