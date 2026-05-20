const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, results) {
  if (!results) results = [];
  const skip = ['assets', 'tools', '.git', 'node_modules'];
  let entries;
  try { entries = fs.readdirSync(dir, {withFileTypes: true}); } catch(e) { return results; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && !skip.includes(e.name)) {
      findHtmlFiles(full, results);
    } else if (e.isFile() && e.name === 'index.html') {
      results.push(full);
    }
  }
  return results;
}

const root = path.resolve('.');
const files = findHtmlFiles(root);
const old = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const rel = path.relative(root, f).replace(/\\/g, '/');
  const dateMatch = content.match(/"dateModified":"([^"]+)"/);
  const date = dateMatch ? dateMatch[1] : null;
  if (date && date < '2026-05-20') {
    old.push(date + ' | ' + rel);
  }
}

old.sort();
old.forEach(function(i) { console.log(i); });
console.log('\nTotal with dateModified < 2026-05-20: ' + old.length);
