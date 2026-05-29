/**
 * Fixes the extra </div> introduced by convert_faq_style.js.
 * The NEW_CLOSE had 4 </div> before </section>, but only 3 are needed.
 * Removes one </div> from the pattern: 4 closes → 3 closes before </section>
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

const files = findHtmlFiles(root);
let fixed = 0;
let skipped = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // The bad pattern: 4 </div> before </section> (handles both LF and CRLF, and optional leading whitespace)
  // We inserted: </div>\n</div>\n</div>\n</div>\n</section>
  // But it may have leading spaces (from original </dl> indentation) on the first </div>
  const before = content;
  content = content.replace(
    /(<\/div>)\r?\n(<\/div>)\r?\n(<\/div>)\r?\n(<\/div>)\r?\n(<\/section>)/g,
    (match, d1, d2, d3, d4, sec) => `${d1}\n${d2}\n${d3}\n${sec}`
  );

  if (content !== before) {
    fs.writeFileSync(file, content, 'utf8');
    fixed++;
    console.log('Fixed:', path.relative(root, file));
  } else {
    skipped++;
  }
}

console.log(`\nFixed: ${fixed}  |  No match: ${skipped}`);
