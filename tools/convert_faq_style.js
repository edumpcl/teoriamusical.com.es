/**
 * Converts all pages from old <section class="tm-faq"> / <dl>/<dt>/<dd> style
 * to the afinador-style accordion using <section class="tm-seccion"> and div elements.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skipDirs = new Set(['.git', 'assets', 'tools', 'node_modules']);

const NEW_OPEN =
  '<section class="tm-seccion">\n' +
  '<div class="tm-seccion-inner">\n' +
  '<div class="tm-seccion-cabecera" style="text-align: center; justify-content: center;">\n' +
  '<h2 class="tm-seccion-titulo">Preguntas <span>Frecuentes</span></h2>\n' +
  '</div>\n' +
  '<div style="max-width:800px; margin:2rem auto 0 auto;">\n' +
  '<div class="tm-faq-list">';

const NEW_CLOSE = '</div>\n</div>\n</div>\n</div>\n</section>';

function findHtmlFiles(dir) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !skipDirs.has(entry.name)) {
        files.push(...findHtmlFiles(path.join(dir, entry.name)));
      } else if (entry.isFile() && entry.name === 'index.html') {
        files.push(path.join(dir, entry.name));
      }
    }
  } catch (e) {}
  return files;
}

function transformFaq(content) {
  // Replace the section opening + h2 + dl opening in one shot
  let result = content.replace(
    /<section class="tm-faq">\s*<h2>[^<]*<\/h2>\s*<dl class="tm-faq-list">/,
    NEW_OPEN
  );

  if (result === content) return content; // no match

  // Replace dt → div.tm-faq-q and dd → div.tm-faq-a
  result = result
    .replace(/<dt>/g, '<div class="tm-faq-q">')
    .replace(/<\/dt>/g, '</div>')
    .replace(/<dd>/g, '<div class="tm-faq-a">')
    .replace(/<\/dd>/g, '</div>');

  // Replace </dl> + </section> closing
  result = result.replace(/<\/dl>\s*<\/section>/, NEW_CLOSE);

  return result;
}

const files = findHtmlFiles(root);
let converted = 0;
let skipped = 0;
const problems = [];

for (const file of files) {
  let content;
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (e) {
    problems.push(`READ ERROR: ${file}`);
    continue;
  }

  if (!content.includes('<section class="tm-faq">')) {
    skipped++;
    continue;
  }

  const transformed = transformFaq(content);
  if (transformed === content) {
    problems.push(`NO CHANGE (pattern mismatch?): ${path.relative(root, file)}`);
    continue;
  }

  // Update dateModified to today for pages that have it
  const final = transformed.replace(/"dateModified":"[^"]*"/g, '"dateModified":"2026-05-29"');

  try {
    fs.writeFileSync(file, final, 'utf8');
    converted++;
    console.log('✓', path.relative(root, file));
  } catch (e) {
    problems.push(`WRITE ERROR: ${file}: ${e.message}`);
  }
}

console.log(`\nConverted: ${converted}  |  Skipped (no FAQ): ${skipped}`);
if (problems.length) {
  console.log('\nProblems:');
  problems.forEach(p => console.log(' !', p));
}
