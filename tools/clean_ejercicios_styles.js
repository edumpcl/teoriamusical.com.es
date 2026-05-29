/**
 * Cleans up inline styles in ejercicios pages that use the old
 * "Maestro Bach" design pattern. All regexes are anchored to avoid
 * accidentally matching content outside the article.
 *
 * Only the <article> content is transformed; head/body/header/footer
 * are intentionally left untouched.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  'ejercicios/acordes/construir-triadas/index.html',
  'ejercicios/acordes/construir-triadas-primera-inversion/index.html',
  'ejercicios/acordes/construir-triadas-segunda-inversion/index.html',
  'ejercicios/acordes/construir-triadas-todas-posiciones/index.html',
  'ejercicios/acordes/index.html',
  'ejercicios/acordes/triadas-en-fundamental/index.html',
  'ejercicios/acordes/triadas-en-primera-inversion/index.html',
  'ejercicios/acordes/triadas-en-segunda-inversion/index.html',
  'ejercicios/acordes/triadas-todas-las-posiciones/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/ascendentes-y-descendentes/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/conjuntos-y-disjuntos/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/cuartas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/distancia/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/octavas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/quintas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/segundas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/septimas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/sextas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/terceras/index.html',
  'ejercicios/index.html',
];

/**
 * Extract the article content (between <article ...> and </article>),
 * transform it, and put it back. This guarantees we never touch
 * the head, body opening, or footer.
 */
function cleanArticle(article) {
  let s = article;

  // 1. Remove <!-- INSTRUCCIONES: ... --> comment
  //    Anchored: <!-- must be immediately followed by optional whitespace then INSTRUCCIONES
  s = s.replace(/<!--\s*\r?\n?\s*INSTRUCCIONES[\s\S]*?-->/g, '');

  // 2. Remove other inline editorial comments (Cabecera, BLOQUE, PIE, PREMIUM)
  //    These are single-line comments with no newlines inside
  s = s.replace(/<!--[^-\n]*(?:Cabecera|BLOQUE|PIE|PREMIUM|NAVEGAC)[^-\n]*-->/g, '');

  // 3. Remove outer font-family wrapper div (single line opening tag only)
  s = s.replace(/<div\s+style="font-family:\s*'Inter'[^"]*">\s*\r?\n?/g, '');

  // 4. Bach header: extract h1 text, remove surrounding block
  //    Pattern: <div style="...border-bottom...">
  //               <div style="...flex...">
  //                 <img ...>
  //                 <h1 style="...">TITLE</h1>
  //               </div>
  //             </div>
  s = s.replace(
    /<div\s+style="[^"]*border-bottom[^"]*">\s*\r?\n\s*<div\s+style="[^"]*(?:flex|display)[^"]*">\s*\r?\n\s*<img[^>]*>\s*\r?\n\s*<h1[^>]*>([^<]*)<\/h1>\s*\r?\n\s*<\/div>\s*\r?\n\s*<\/div>/g,
    (_, title) => '<h1>' + title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase() + '</h1>'
  );

  // 5. Strip inline style from <h2 style="..."> inside the article
  s = s.replace(/<h2\s+style="[^"]*">/g, '<h2>');

  // 6. Strip inline style from <p style="font-size...">
  s = s.replace(/<p\s+style="font-size:[^"]*">/g, '<p>');

  // 7. Convert single-paragraph highlight boxes → <blockquote>
  //    Pattern: <div style="background: #fdfcf9..."> <p ...>text</p> </div>
  //    Use [^\n] inside div style so we don't match multi-line nesting
  s = s.replace(
    /<div\s+style="[^\n"]*background:\s*#(?:fdfcf9|faf8f0|fdf8ee)[^\n"]*">\s*\r?\n\s*<p[^>]*>([\s\S]*?)<\/p>\s*\r?\n\s*<\/div>/g,
    (_, inner) => '<blockquote>' + inner.trim() + '</blockquote>'
  );

  // 8. Convert tables: add class="tm-table", remove inline styles from
  //    table, thead, tbody, tr, th, td
  s = s.replace(/<table\s+style="[^"]*">/g, '<table class="tm-table">');
  s = s.replace(/<thead\s+style="[^"]*">/g, '<thead>');
  s = s.replace(/<tbody\s+style="[^"]*">/g, '<tbody>');
  s = s.replace(/<tr\s+style="[^"]*">/g, '<tr>');
  s = s.replace(/<th\s+style="[^"]*">/g, '<th>');
  s = s.replace(/<td\s+style="[^"]*">/g, '<td>');

  // 9. Remove quiz wrapper divs — keep only the inner quiz div + script
  //    Pattern: <div style="...border-radius: 12px...box-shadow...">
  //               <div id="..."></div>  (or similar content)
  //             </div>
  //    Strategy: remove the opening wrapper div line only (the closing </div>
  //    becomes a harmless stray that we clean up after)
  s = s.replace(
    /<div\s+style="[^\n"]*border-radius:\s*12px[^\n"]*">\s*\r?\n/g,
    ''
  );

  // 10. Remove the "Para profundizar" / footer CTA block
  //     Pattern: <div style="...text-align: center; margin-top: 50px...">
  //               ...content...
  //               <a href="...">text</a>
  //             </div>
  //     Only match when on a single line (no newlines in the style attr)
  s = s.replace(
    /<div\s+style="[^\n"]*margin-top:\s*50px[^\n"]*">([\s\S]*?)<\/div>/g,
    (_, inner) => {
      // Extract the first link and return just that as a paragraph
      const m = inner.match(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
      if (!m) return '';
      const linkText = m[2].replace(/<[^>]+>/g, '').trim();
      return '<p><a href="' + m[1] + '">' + linkText + '</a></p>';
    }
  );

  // 11. Remove "Siguiente Nivel" / CONTINUAR navigation blocks
  //     These have justify-content: space-between in their style
  s = s.replace(
    /<div\s+style="[^\n"]*justify-content:\s*space-between[^\n"]*">([\s\S]*?)<\/div>/g,
    ''
  );

  // 12. Strip onmouseover/onmouseout from links
  s = s.replace(/\s+onmouseover="[^"]*"/g, '');
  s = s.replace(/\s+onmouseout="[^"]*"/g, '');

  // 13. Strip residual inline style from <a style="..."> links inside article
  //     (footer CTA links that weren't inside the matched block)
  s = s.replace(/<a\s+(href="[^"]*")\s+style="[^"]*">/g, '<a $1>');
  s = s.replace(/<a\s+style="[^"]*"\s+(href="[^"]*")>/g, '<a $1>');

  // 14. Remove stray </div> lines left by removed wrappers
  //     Only remove if it appears on a line by itself between two blank lines
  s = s.replace(/\n  <\/div>\n\n\n/g, '\n\n');
  s = s.replace(/\n<\/div>\n\n\n/g, '\n\n');

  // 15. Collapse multiple blank lines
  s = s.replace(/\n{3,}/g, '\n\n');

  return s;
}

function processFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');

  // Find the article boundaries
  const artStart = html.indexOf('<article');
  const artEnd   = html.lastIndexOf('</article>') + '</article>'.length;
  if (artStart === -1 || artEnd === '</article>'.length - 1) return null;

  const before  = html.slice(0, artStart);
  const article = html.slice(artStart, artEnd);
  const after   = html.slice(artEnd);

  const cleaned = cleanArticle(article);
  if (cleaned === article) return null;

  // Update dateModified in the whole file (it's in <head>)
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
