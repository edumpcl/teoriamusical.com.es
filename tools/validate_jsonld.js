const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const errors = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'assets', 'tools'].includes(entry.name)) continue;
      walk(path.join(dir, entry.name));
    } else if (entry.name === 'index.html') {
      check(path.join(dir, entry.name));
    }
  }
}

function check(fp) {
  const html = fs.readFileSync(fp, 'utf8');
  const blocks = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g);
  if (!blocks) return;
  for (const block of blocks) {
    const json = block
      .replace(/<script[^>]*>/, '')
      .replace(/<\/script>/, '')
      .trim();
    try {
      JSON.parse(json);
    } catch (e) {
      const rel = path.relative(ROOT, fp).replace(/\\/g, '/');
      errors.push({ file: rel, error: e.message, snippet: json.slice(0, 120) });
    }
  }
}

walk(ROOT);

if (errors.length === 0) {
  console.log('All JSON-LD blocks are valid.');
} else {
  console.log(`Found ${errors.length} JSON-LD error(s):\n`);
  for (const e of errors) {
    console.log(`FILE: ${e.file}`);
    console.log(`  ERROR: ${e.error}`);
    console.log(`  SNIPPET: ${e.snippet}`);
    console.log('');
  }
}
