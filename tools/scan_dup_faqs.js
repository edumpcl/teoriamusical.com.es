const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'assets') {
      findHtmlFiles(full, files);
    } else if (entry.name === 'index.html') {
      files.push(full);
    }
  }
  return files;
}

const files = findHtmlFiles('.');
const nameToFiles = {};
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/"name":\s*"([^"]+\?)"/g)];
  for (const m of matches) {
    const name = m[1];
    if (!nameToFiles[name]) nameToFiles[name] = [];
    nameToFiles[name].push(f.replace(/\\/g, '/').replace(/^\.\//,''));
  }
}
const dups = Object.entries(nameToFiles).filter(([, v]) => v.length > 1);
console.log('Duplicate FAQ question names:', dups.length);
for (const [name, pages] of dups) {
  console.log('\n  Q:', name);
  for (const p of pages) console.log('    -', p);
}
