/**
 * Fixes malformed FAQPage JSON-LD in instrument afinador pages.
 * The 5th question was accidentally embedded inside the 4th question's answer text.
 * Also adds the 5th question to the HTML FAQ list.
 *
 * Malformed pattern:
 *   "text":"4th Q answer., {"@type": "Question", "name": "5th Q", "acceptedAnswer": {"@type": "Answer", "text": "5th A"}}"}}]}
 * Fixed pattern:
 *   "text":"4th Q answer."}},{"@type":"Question","name":"5th Q","acceptedAnswer":{"@type":"Answer","text":"5th A"}}]}
 */

const fs = require('fs');
const path = require('path');

const afinDir = path.resolve(__dirname, '..', 'herramientas', 'afinador');

// Regex to find the malformed 5th Q embedded in 4th Q's text
// The embedded 5th Q starts with ., { and ends with the closing of the FAQPage array
const MALFORMED_RE = /, \{"@type": "Question", "name": "([^"]+)", "acceptedAnswer": \{"@type": "Answer", "text": "([^"]+)"\}\}"}}]}/;

let fixed = 0;
const problems = [];

for (const entry of fs.readdirSync(afinDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(afinDir, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');

  // Check if malformed pattern exists
  if (!MALFORMED_RE.test(content)) continue;

  const m = content.match(MALFORMED_RE);
  const q5name = m[1];
  const q5answer = m[2];

  // Fix the JSON-LD: remove 5th Q from 4th Q text and add as proper 5th array element
  let fixed_content = content.replace(
    MALFORMED_RE,
    `"}},{"@type":"Question","name":"${q5name}","acceptedAnswer":{"@type":"Answer","text":"${q5answer}"}}]}`
  );

  // Add the 5th Q to HTML FAQ list
  // Insert before the </div> that closes tm-faq-list
  // Pattern: last faq-item </div> followed by </div> (faq-list close)
  const closeRE = /(  <\/div>)\r?\n(<\/div>\r?\n)/;
  const closeMatch = fixed_content.match(closeRE);
  if (!closeMatch) {
    problems.push(`HTML close pattern not found: ${entry.name}`);
    // Still save the JSON fix
    fs.writeFileSync(file, fixed_content, 'utf8');
    fixed++;
    console.log(`✓ JSON fixed (HTML skipped): ${entry.name}`);
    console.log(`   + ${q5name}`);
    continue;
  }

  const nl = closeMatch[0].includes('\r\n') ? '\r\n' : '\n';
  const newItem = `  <div class="tm-faq-item">${nl}    <div class="tm-faq-q">${q5name}</div>${nl}    <div class="tm-faq-a">${q5answer}</div>${nl}  </div>`;

  fixed_content = fixed_content.replace(
    closeRE,
    `$1${nl}${newItem}${nl}$2`
  );

  // Update dateModified if present
  fixed_content = fixed_content.replace(/"dateModified":"[^"]*"/g, '"dateModified":"2026-05-29"');

  fs.writeFileSync(file, fixed_content, 'utf8');
  fixed++;
  console.log(`✓ ${entry.name}`);
  console.log(`   + ${q5name}`);
}

console.log(`\nFixed: ${fixed}`);
if (problems.length) {
  console.log('\nProblems:');
  problems.forEach(p => console.log(' !', p));
}
