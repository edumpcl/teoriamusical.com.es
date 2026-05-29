const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const results = [];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'assets', 'tools'].includes(e.name)) continue;
      walk(path.join(dir, e.name));
    } else if (e.name === 'index.html') {
      const fp = path.join(dir, e.name);
      const html = fs.readFileSync(fp, 'utf8');
      const artStart = html.indexOf('<article');
      const artEnd = html.lastIndexOf('</article>');
      if (artStart === -1) continue;
      const art = html.slice(artStart, artEnd);
      const styles = (art.match(/style=/g) || []).length;
      if (styles > 0) {
        results.push({ file: path.relative(ROOT, fp).replace(/\\/g, '/'), count: styles });
      }
    }
  }
}

walk(ROOT);
results.sort((a, b) => b.count - a.count);
results.slice(0, 25).forEach(r => console.log(r.count + '\t' + r.file));
console.log('\nTotal files with inline styles:', results.length);
