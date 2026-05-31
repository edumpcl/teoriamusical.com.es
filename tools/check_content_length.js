const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const results = [];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'assets', 'tools', 'blog'].includes(e.name)) continue;
      walk(path.join(dir, e.name));
    } else if (e.name === 'index.html') {
      const fp = path.join(dir, e.name);
      const html = fs.readFileSync(fp, 'utf8');
      const artStart = html.indexOf('<article');
      const artEnd = html.lastIndexOf('</article>');
      if (artStart < 0) continue;
      const art = html.slice(artStart, artEnd);
      const text = art.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      results.push([text.length, path.relative(ROOT, fp).replace(/\\/g, '/')]);
    }
  }
}

walk(ROOT);
results.sort((a, b) => a[0] - b[0]);
console.log('Pages by article text length (shortest first):');
results.slice(0, 20).forEach(([n, p]) => console.log(String(n).padStart(6), ' ', p));
