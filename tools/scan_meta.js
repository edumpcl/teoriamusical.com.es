const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'assets') {
      findHtmlFiles(full, files);
    } else if (entry.name === 'index.html') {
      files.push(full);
    }
  }
  return files;
}

const files = findHtmlFiles('.');
const issues = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const rel = f.replace(/\\/g, '/').replace(/^.\//,'');

  // Meta description
  const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
  if (descMatch) {
    const desc = descMatch[1];
    const len = [...desc].length; // Unicode chars
    if (len < 120 || len > 160) {
      issues.push({ type: 'desc', file: rel, len, desc: desc.substring(0, 80) });
    }
  } else {
    issues.push({ type: 'no-desc', file: rel });
  }

  // dateModified
  const dmMatch = content.match(/"dateModified"\s*:\s*"([^"]+)"/);
  if (dmMatch) {
    const dm = dmMatch[1];
    if (dm < '2026-05-01') {
      issues.push({ type: 'old-date', file: rel, date: dm });
    }
  }
}

const descIssues = issues.filter(i => i.type === 'desc');
const oldDates = issues.filter(i => i.type === 'old-date');
console.log('=== Meta descriptions out of range (' + descIssues.length + '):');
for (const i of descIssues) {
  console.log('  [' + i.len + '] ' + i.file);
  console.log('      ' + i.desc + '...');
}
console.log('\n=== Pages with dateModified before 2026-05 (' + oldDates.length + '):');
for (const i of oldDates.slice(0, 20)) {
  console.log('  ' + i.date + '  ' + i.file);
}
if (oldDates.length > 20) console.log('  ... and ' + (oldDates.length - 20) + ' more');
