#!/usr/bin/env node
// Stages the SPANISH side of the work without the English markers, so it can be committed before the
// English pages are published: node tools/en/stage-es-clean.js
//   - every tracked modified file outside en/, tools/en/ and sitemap-en.xml is staged
//   - for .html files, the hreflang block (<!--i18n-->…<!--/i18n-->) and the "English" menu item
//     (<li class="tm-lang">) are removed from the STAGED copy only (the working copy keeps them)
// Then commit; afterwards `git add -A` stages the rest (English pages, markers, tools).
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const git = (args, input) => execFileSync('git', args, { cwd: ROOT, input, encoding: 'utf8', maxBuffer: 1 << 28 });
const files = git(['diff', '--name-only']).split('\n').filter(Boolean)
  .filter(f => !/^(en\/|tools\/en\/|sitemap-en\.xml$)/.test(f));
let staged = 0, stripped = 0;
for (const f of files) {
  const abs = path.join(ROOT, f);
  if (!fs.existsSync(abs)) { git(['rm', '--cached', '-q', '--', f]); staged++; continue; }
  if (!f.endsWith('.html')) { git(['add', '--', f]); staged++; continue; }
  const raw = fs.readFileSync(abs, 'utf8');
  const clean = raw.replace(/<!--i18n-->[\s\S]*?<!--\/i18n-->\r?\n?/g, '').replace(/\s*<li class="tm-lang">.*?<\/li>/g, '');
  if (clean === raw) { git(['add', '--', f]); staged++; continue; }
  const sha = git(['hash-object', '-w', '--path=' + f, '--stdin'], clean).trim();
  const mode = git(['ls-files', '-s', '--', f]).split(' ')[0] || '100644';
  git(['update-index', '--cacheinfo', `${mode},${sha},${f}`]);
  staged++; stripped++;
}
console.log(`staged ${staged} file(s); ${stripped} with the English markers removed from the staged copy`);
