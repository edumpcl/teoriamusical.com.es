/**
 * For each instrument afinador page with 4 HTML FAQs and 5 in JSON-LD,
 * adds the missing 5th question to the HTML.
 * These pages use <div class="tm-faq-list"> without a tm-seccion wrapper,
 * closed with </div> followed by an empty line and another element.
 */

const fs = require('fs');
const path = require('path');

const afinDir = path.resolve(__dirname, '..', 'herramientas', 'afinador');

function extractJsonLdFaqs(content) {
  const questions = [];
  const blocks = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  for (const block of blocks) {
    const json = block.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      const obj = JSON.parse(json);
      if (obj['@type'] === 'FAQPage' && Array.isArray(obj.mainEntity)) {
        for (const q of obj.mainEntity) {
          if (q['@type'] === 'Question') {
            questions.push({ name: q.name, answer: q.acceptedAnswer && q.acceptedAnswer.text || '' });
          }
        }
      }
    } catch (e) {}
  }
  return questions;
}

function extractHtmlFaqNames(content) {
  const names = [];
  for (const m of content.matchAll(/<div class="tm-faq-q">([^<]*)<\/div>/g)) {
    names.push(m[1].trim());
  }
  return names;
}

let fixed = 0;
const problems = [];

for (const entry of fs.readdirSync(afinDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(afinDir, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;

  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('tm-faq-list')) continue;

  const jsonFaqs = extractJsonLdFaqs(content);
  const htmlNames = extractHtmlFaqNames(content);

  if (jsonFaqs.length <= htmlNames.length) continue;

  const missing = jsonFaqs.filter(q => !htmlNames.includes(q.name));
  if (missing.length === 0) continue;

  // Build new HTML items
  const newItems = missing.map(q =>
    `  <div class="tm-faq-item">\n    <div class="tm-faq-q">${q.name}</div>\n    <div class="tm-faq-a">${q.answer}</div>\n  </div>`
  ).join('\n');

  // Insert before the </div> that closes tm-faq-list.
  // Handle both LF and CRLF line endings.
  const closePattern = /(  <\/div>)\r?\n<\/div>(\r?\n)/;
  const m = content.match(closePattern);
  if (!m) {
    problems.push(`Close pattern not found: ${path.relative(path.resolve(__dirname, '..'), file)}`);
    continue;
  }

  const nl = m[0].includes('\r\n') ? '\r\n' : '\n';
  const newItemsNl = newItems.replace(/\n/g, nl);
  const newContent = content.replace(
    closePattern,
    `$1${nl}${newItemsNl}${nl}</div>$2`
  );

  if (newContent === content) {
    problems.push(`No change: ${entry.name}`);
    continue;
  }

  // Update dateModified if present
  const final = newContent.replace(/"dateModified":"[^"]*"/g, '"dateModified":"2026-05-29"');

  fs.writeFileSync(file, final, 'utf8');
  fixed++;
  console.log('✓', entry.name);
  missing.forEach(q => console.log('   +', q.name));
}

console.log(`\nFixed: ${fixed}`);
if (problems.length) {
  console.log('\nProblems:');
  problems.forEach(p => console.log(' !', p));
}
