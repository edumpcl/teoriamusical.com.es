const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let fileCount = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'assets', 'tools'].includes(e.name)) continue;
      walk(path.join(dir, e.name));
    } else if (e.name === 'index.html') {
      const fp = path.join(dir, e.name);
      let html = fs.readFileSync(fp, 'utf8');
      // Replace both variants (with and without trailing semicolon)
      const updated = html
        .replace(/style="overflow-x:auto;margin:1\.5rem 0;"/g, 'class="tm-table-wrap"')
        .replace(/style="overflow-x:auto;margin:1\.5rem 0"/g, 'class="tm-table-wrap"');
      if (updated !== html) {
        fs.writeFileSync(fp, updated, 'utf8');
        fileCount++;
        console.log('Updated:', path.relative(ROOT, fp).replace(/\\/g, '/'));
      }
    }
  }
}

walk(ROOT);
console.log('\nTotal files updated:', fileCount);
