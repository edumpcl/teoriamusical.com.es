const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const noFaq = [];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'assets', 'tools', 'blog'].includes(e.name)) continue;
      walk(path.join(dir, e.name));
    } else if (e.name === 'index.html') {
      const fp = path.join(dir, e.name);
      const html = fs.readFileSync(fp, 'utf8');
      if (!html.includes('tm-faq-list') && !html.includes('FAQPage')) {
        noFaq.push(path.relative(ROOT, fp).replace(/\\/g, '/'));
      }
    }
  }
}

walk(ROOT);
console.log('Pages WITHOUT FAQ section (' + noFaq.length + '):');
noFaq.forEach(p => console.log(p));
