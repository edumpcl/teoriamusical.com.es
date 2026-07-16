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
const shortContent = [];
const fewLinks = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const rel = f.replace(/\\/g, '/').replace(/^.\//,'');

  // Skip tools, root index, politica pages
  if (rel.startsWith('tools/') || rel === 'index.html' || rel.includes('politica') || rel.includes('aviso') || rel.includes('contacto')) continue;

  const hasFAQ = content.includes('"@type":"FAQPage"') || content.includes('"@type": "FAQPage"');

  // Extract article text length
  const articleStart = content.indexOf('<article');
  const articleEnd = content.indexOf('</article>');
  if (articleStart >= 0 && articleEnd >= 0) {
    const articleHtml = content.slice(articleStart, articleEnd);
    const text = articleHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = text.split(' ').filter(w => w.length > 2).length;
    if (wordCount < 150 && hasFAQ) {
      shortContent.push({ file: rel, words: wordCount });
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

}

console.log('=== Short article content (<150 words) (' + shortContent.length + '):');
for (const i of shortContent) {
  console.log('  [' + i.words + 'w] ' + i.file);
}

console.log('\n=== Few internal links in article (<2) (' + fewLinks.length + '):');
for (const i of fewLinks) {
  console.log('  [' + i.links + ' links] ' + i.file);
}
