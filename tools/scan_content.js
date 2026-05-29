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
const noHowTo = [];
const shortContent = [];
const fewLinks = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const rel = f.replace(/\\/g, '/').replace(/^.\//,'');

  // Skip tools, root index, politica pages
  if (rel.startsWith('tools/') || rel === 'index.html' || rel.includes('politica') || rel.includes('aviso') || rel.includes('contacto')) continue;

  // Check HowTo schema presence
  const hasHowTo = content.includes('"@type":"HowTo"') || content.includes('"@type": "HowTo"');
  const hasFAQ = content.includes('"@type":"FAQPage"') || content.includes('"@type": "FAQPage"');

  // Extract article text length
  const articleStart = content.indexOf('<article');
  const articleEnd = content.indexOf('</article>');
  if (articleStart >= 0 && articleEnd >= 0) {
    const articleHtml = content.slice(articleStart, articleEnd);
    const text = articleHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = text.split(' ').filter(w => w.length > 2).length;
    if (wordCount < 150 && hasFAQ) {
      shortContent.push({ file: rel, words: wordCount, hasHowTo });
    }
  }

  // Count internal links in article
  if (articleStart >= 0 && articleEnd >= 0) {
    const articleHtml = content.slice(articleStart, articleEnd);
    const links = [...articleHtml.matchAll(/href="\/[^"]+"/g)];
    if (links.length < 2 && hasFAQ) {
      fewLinks.push({ file: rel, links: links.length });
    }
  }

  // Pages with FAQ but no HowTo (and not index/hub pages)
  if (hasFAQ && !hasHowTo && !rel.endsWith('/index.html'.replace('index', '')) ) {
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const h1 = h1Match ? h1Match[1].trim() : '';
    noHowTo.push({ file: rel, h1 });
  }
}

console.log('=== Pages with FAQ but NO HowTo schema (' + noHowTo.length + '):');
for (const i of noHowTo.slice(0, 30)) {
  console.log('  ' + i.file + ' | ' + i.h1);
}
if (noHowTo.length > 30) console.log('  ... and ' + (noHowTo.length - 30) + ' more');

console.log('\n=== Short article content (<150 words) (' + shortContent.length + '):');
for (const i of shortContent) {
  console.log('  [' + i.words + 'w] ' + i.file);
}

console.log('\n=== Few internal links in article (<2) (' + fewLinks.length + '):');
for (const i of fewLinks) {
  console.log('  [' + i.links + ' links] ' + i.file);
}
