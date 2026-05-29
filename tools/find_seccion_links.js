const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'assets', 'tools'].includes(e.name)) continue;
      walk(path.join(dir, e.name));
    } else if (e.name === 'index.html') {
      const fp = path.join(dir, e.name);
      const html = fs.readFileSync(fp, 'utf8');
      const matches = html.matchAll(/<div class="tm-seccion-cabecera">([\s\S]*?)<\/div>/g);
      for (const match of matches) {
        const inner = match[1];
        const links = (inner.match(/<a /g) || []).length;
        if (links > 0) {
          const rel = path.relative(ROOT, fp).replace(/\\/g, '/');
          console.log(rel);
          console.log('  ' + inner.trim().substring(0, 150));
        }
      }
    }
  }
}

walk(ROOT);
