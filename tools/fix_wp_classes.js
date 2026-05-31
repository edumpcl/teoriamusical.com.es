const fs = require('fs');
const path = require('path');

const files = [
  'ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono/index.html'
];

const ROOT = path.join(__dirname, '..');

for (const rel of files) {
  const fp = path.join(ROOT, rel);
  let html = fs.readFileSync(fp, 'utf8');

  // Remove wp-block-heading class from h2/h3 tags
  html = html.replace(/<(h[23])\s+id="([^"]+)"\s+class="wp-block-heading">/g, '<$1 id="$2">');
  html = html.replace(/<(h[23])\s+class="wp-block-heading"\s+id="([^"]+)">/g, '<$1 id="$2">');
  html = html.replace(/<(h[23])\s+class="wp-block-heading">/g, '<$1>');

  // Replace wp-block-list with clean ul
  html = html.replace(/<ul class="wp-block-list">/g, '<ul>');

  // Remove leading whitespace inside <p> and <li> elements
  html = html.replace(/<p>\s+<strong>/g, '<p><strong>');
  html = html.replace(/<li>\s+<strong>/g, '<li><strong>');
  html = html.replace(/<p>  /g, '<p>');
  html = html.replace(/<li>  /g, '<li>');
  html = html.replace(/<li> /g, '<li>');

  // Collapse 3+ consecutive blank lines to 1 blank line (within article content)
  html = html.replace(/(\n\s*){3,}/g, '\n\n');

  fs.writeFileSync(fp, html);
  console.log('Fixed:', rel);
}
