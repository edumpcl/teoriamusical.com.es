/**
 * For each page that has FAQPage JSON-LD with more questions than HTML FAQ items,
 * appends the missing questions to the HTML tm-faq-list.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skipDirs = new Set(['.git', 'assets', 'tools', 'node_modules']);

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

function extractJsonLdFaqs(content) {
  // Extract all FAQPage JSON-LD blocks
  const questions = [];
  const scriptBlocks = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  for (const block of scriptBlocks) {
    const jsonStr = block.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      const obj = JSON.parse(jsonStr);
      if (obj['@type'] === 'FAQPage' && Array.isArray(obj.mainEntity)) {
        for (const q of obj.mainEntity) {
          if (q['@type'] === 'Question') {
            questions.push({
              name: q.name,
              answer: q.acceptedAnswer && q.acceptedAnswer.text || ''
            });
          }
        }
      }
    } catch (e) {}
  }
  return questions;
}

function extractHtmlFaqs(content) {
  // Extract question text from tm-faq-q divs
  const questions = [];
  const matches = content.matchAll(/<div class="tm-faq-q">([^<]*)<\/div>/g);
  for (const m of matches) {
    questions.push(m[1].trim());
  }
  return questions;
}

let fixed = 0;
let skipped = 0;
const problems = [];

const files = findHtmlFiles(root);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');

  if (!content.includes('FAQPage') || !content.includes('tm-faq-list')) {
    skipped++;
    continue;
  }

  const jsonFaqs = extractJsonLdFaqs(content);
  const htmlFaqNames = extractHtmlFaqs(content);

  if (jsonFaqs.length <= htmlFaqNames.length) {
    skipped++;
    continue;
  }

  // Find missing questions (those in JSON-LD but not in HTML)
  const missing = jsonFaqs.filter(jq => !htmlFaqNames.includes(jq.name));

  if (missing.length === 0) {
    skipped++;
    continue;
  }

  // Build new FAQ items HTML
  const newItems = missing.map(q =>
    `      <div class="tm-faq-item">\n        <div class="tm-faq-q">${q.name}</div>\n        <div class="tm-faq-a">${q.answer}</div>\n      </div>`
  ).join('\n');

  // Insert before the closing tag of tm-faq-list
  // The tm-faq-list closes with a </div> that immediately follows the last faq-item's </div>
  // We look for the pattern: last </div> before the </div> that closes tm-faq-list
  // Strategy: find the last </div>\n      </div> pattern before </div>\n</div>\n</div>\n</section>
  // Simpler: insert newItems right before the first standalone </div> after tm-faq-list items

  // Find the closing of tm-faq-list: it's the first </div> that appears after all tm-faq-items
  // Pattern: the </div> at column 0 or 4-6 spaces that closes the faq-list div
  // We'll insert before the line that closes tm-faq-list

  // Approach: find "    </div>\n</div>\n</div>\n</section>" (or similar) and insert before the first </div>
  // Actually, let's just find the LAST </div> that closes a tm-faq-item and insert after it

  // The faq-list closing pattern (after fix_extra_div.js) is:
  // [whitespace]</div>  <- closes last faq-item
  // [whitespace]</div>  <- closes faq-list
  // </div>              <- closes max-width
  // </div>              <- closes seccion-inner
  // </section>

  // We need to insert newItems BEFORE the </div> that closes the faq-list
  // i.e., right after the </div> that closes the LAST faq-item

  // The marker: last occurrence of </div> inside the faq-list section
  // Let's find the faq-list section and work with it

  const faqListMatch = content.match(/<div class="tm-faq-list">([\s\S]*?)<\/div>\n<\/div>\n<\/div>\n<\/section>/);
  if (!faqListMatch) {
    problems.push(`Pattern not matched: ${path.relative(root, file)}`);
    continue;
  }

  // Find where to insert: just before the </div> that closes tm-faq-list
  // The faq-list inner content ends with last faq-item's </div>
  // Then there's a </div> that closes the faq-list
  // We want to insert newItems before that closing </div>

  // Use a targeted replacement: find the sequence of the last faq-item closing + faq-list closing
  // and insert new items in between

  // Get the indentation of the faq-list closing div
  // Looking for: [optional whitespace]</div>\n[optional whitespace]</div>\n</div>\n</div>\n</section>
  // where the first </div> closes the last faq-item and the second closes the faq-list

  const insertPattern = /(\s*<\/div>)\n(\s*)<\/div>\n<\/div>\n<\/div>\n<\/section>/;
  const insertMatch = content.match(insertPattern);
  if (!insertMatch) {
    // Try variant with leading spaces on faq-list close
    problems.push(`Insert pattern not matched: ${path.relative(root, file)}`);
    continue;
  }

  const newContent = content.replace(
    insertPattern,
    `$1\n${newItems}\n$2</div>\n</div>\n</div>\n</section>`
  );

  if (newContent === content) {
    problems.push(`No change after insert: ${path.relative(root, file)}`);
    continue;
  }

  // Update dateModified
  const final = newContent.replace(/"dateModified":"[^"]*"/g, '"dateModified":"2026-05-29"');

  fs.writeFileSync(file, final, 'utf8');
  fixed++;
  console.log(`✓ +${missing.length}Q ${path.relative(root, file)}`);
  missing.forEach(q => console.log(`    + ${q.name}`));
}

console.log(`\nFixed: ${fixed}  |  Skipped: ${skipped}`);
if (problems.length) {
  console.log('\nProblems:');
  problems.forEach(p => console.log(' !', p));
}
