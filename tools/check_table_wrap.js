const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && !['node_modules', '.git', 'assets', 'tools', 'blog'].includes(e.name)) {
      walk(p, files);
    } else if (e.name === 'index.html') {
      files.push(p);
    }
  }
  return files;
}

const ROOT = path.join(__dirname, '..');
const issues = [];

for (const fp of walk(ROOT)) {
  const html = fs.readFileSync(fp, 'utf8');
  const re = /<table/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const before = html.slice(Math.max(0, m.index - 200), m.index);
    if (!before.includes('tm-table-wrap')) {
      const lineNo = html.slice(0, m.index).split('\n').length;
      issues.push(path.relative(ROOT, fp).replace(/\\/g, '/') + ':' + lineNo);
    }
  }
}

issues.forEach(x => console.log(x));
console.log('Total tables without tm-table-wrap:', issues.length);
