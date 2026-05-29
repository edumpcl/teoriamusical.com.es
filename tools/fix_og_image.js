const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OLD = 'https://www.teoriamusical.com.es/assets/img/2026/04/bach_favicon.png';
const NEW = 'https://www.teoriamusical.com.es/assets/img/favicon.png';
let count = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'assets', 'tools'].includes(e.name)) continue;
      walk(path.join(dir, e.name));
    } else if (e.name === 'index.html') {
      const fp = path.join(dir, e.name);
      const html = fs.readFileSync(fp, 'utf8');
      if (!html.includes(OLD)) continue;
      const updated = html.split(OLD).join(NEW);
      fs.writeFileSync(fp, updated, 'utf8');
      count++;
      console.log('Updated:', path.relative(ROOT, fp).replace(/\\/g, '/'));
    }
  }
}

walk(ROOT);
console.log('\nTotal files updated:', count);
