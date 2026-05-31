const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

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

let totalFixed = 0;

for (const fp of walk(ROOT)) {
  let html = fs.readFileSync(fp, 'utf8');

  if (!html.includes('wp-block')) continue;

  const original = html;

  // Remove wp-block-heading class from h2/h3 tags (various id/class orderings)
  html = html.replace(/<(h[23]) id="([^"]+)" class="wp-block-heading">/g, '<$1 id="$2">');
  html = html.replace(/<(h[23]) class="wp-block-heading" id="([^"]+)">/g, '<$1 id="$2">');
  html = html.replace(/<(h[23]) class="wp-block-heading">/g, '<$1>');

  // Remove wp-block-list class from ul/ol
  html = html.replace(/<ul class="wp-block-list">/g, '<ul>');
  html = html.replace(/<ol class="wp-block-list">/g, '<ol>');

  if (html !== original) {
    fs.writeFileSync(fp, html);
    const rel = path.relative(ROOT, fp).replace(/\\/g, '/');
    console.log('Fixed:', rel);
    totalFixed++;
  }
}

console.log(`\nTotal files fixed: ${totalFixed}`);
