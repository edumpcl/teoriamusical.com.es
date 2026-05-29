/**
 * Updates all sitemap lastmod entries to 2026-05-29,
 * except for the legal/static pages that retain their original dates.
 */

const fs = require('fs');
const path = require('path');

const sitemapPath = path.resolve(__dirname, '..', 'sitemap.xml');
const KEEP_UNCHANGED = new Set([
  'contacto/',
  'aviso-legal/',
  'politica-de-privacidad/',
  'politica-de-cookies/',
]);

let content = fs.readFileSync(sitemapPath, 'utf8');

let updated = 0;
content = content.replace(
  /<url><loc>https:\/\/www\.teoriamusical\.com\.es\/([^<]*)<\/loc><lastmod>([^<]*)<\/lastmod><\/url>/g,
  (match, slug, date) => {
    if (KEEP_UNCHANGED.has(slug)) return match;
    if (date === '2026-05-29') return match;
    updated++;
    return `<url><loc>https://www.teoriamusical.com.es/${slug}</loc><lastmod>2026-05-29</lastmod></url>`;
  }
);

fs.writeFileSync(sitemapPath, content, 'utf8');
console.log(`Updated ${updated} sitemap entries to 2026-05-29`);
