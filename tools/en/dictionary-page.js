// Builder for the English dictionary pages (/en/music-dictionary/...). See DICTIONARY-PAGES.md.
// A page module supplies the content; this builds the rest: breadcrumb, header, article, scripts,
// Article / BreadcrumbList / FAQPage JSON-LD (the FAQ is read from the .tm-faq-item blocks of the body).
// Internal links are written with the SPANISH paths exactly as in the original page; build.js rewrites
// each one to its English page when that exists, and removes the link (keeping the text) when not.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..', '..');
const SITE = 'https://www.teoriamusical.com.es';
const assetV = f => crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, f))).digest('hex').slice(0, 8);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

function faqFrom(html) {
  const out = [];
  const re = /<div class="tm-faq-q">([\s\S]*?)<\/div>\s*<div class="tm-faq-a">([\s\S]*?)<\/div>/g;
  let m;
  while ((m = re.exec(html))) out.push([strip(m[1]), strip(m[2])]);
  return out;
}

/**
 * p = { path, esPath, title, description, h1, crumbs:[[label, esHref]...] (ancestors, without Home and the page itself),
 *       articleClass?: 'tm-article tm-article--wide' (copy the 'article class' printed by extract-es.js when it is not plain tm-article),
 *       articleAttrs?: 'data-tm-intervals', scripts?: ['tm-piano-audio', ...], styles?: [], body: html,
 *       datePublished?, dateModified?, noindex? }
 */
module.exports = function dictionaryPage(p) {
  const abs = SITE + p.path;
  const ogSlug = p.path.replace(/^\/en\//, '').replace(/\/$/, '').replace(/\//g, '-');
  const crumbHtml = ['<a href="/">Home</a>']
    .concat((p.crumbs || []).map(([label, href]) => `<a href="${href}">${esc(label)}</a>`))
    .concat([`<span aria-current="page">${esc(p.crumbLabel || p.h1)}</span>`])
    .join('<span class="tm-crumb-sep">›</span>');
  const faq = faqFrom(p.body);
  const scripts = (p.scripts || []).map(n => `<script src="/assets/js/${n}.js?v=${assetV('assets/js/' + n + '.js')}" defer></script>`).join('\n');
  return {
    path: p.path,
    esPath: p.esPath,
    lastmod: p.dateModified || '2026-11-05',
    rewriteLinks: true,
    styles: p.styles || [],
    title: p.title,
    description: p.description,
    ogImage: `/assets/img/og-pages/og-en-${ogSlug}.png`,
    // function: needs the page map to know which breadcrumb ancestors exist in English
    jsonld: ctx => {
      const known = ctx.linkMap || {};
      const trail = [['Home', SITE + '/en/']]
        .concat((p.crumbs || []).filter(([, href]) => known[href]).map(([label, href]) => [label, SITE + known[href]]))
        .concat([[p.crumbLabel || p.h1, abs]]);
      const ld = [
        {
          '@context': 'https://schema.org', '@type': 'Article', headline: p.h1, description: p.description, inLanguage: 'en',
          mainEntityOfPage: abs, image: `${SITE}/assets/img/og-pages/og-en-${ogSlug}.png`,
          datePublished: p.datePublished || '2026-11-05', dateModified: p.dateModified || '2026-11-05',
          author: { '@type': 'Person', name: 'Eduardo Escrig Zomeño', url: SITE + '/sobre-mi/' },
          publisher: { '@type': 'Organization', name: 'Music Theory', url: SITE + '/en/' },
        },
        {
          '@context': 'https://schema.org', '@type': 'BreadcrumbList',
          itemListElement: trail.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
        },
      ];
      if (faq.length) ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
      return ld;
    },
    main: `
  <nav class="tm-breadcrumb" aria-label="Breadcrumb">
    <div class="tm-container">
      ${crumbHtml}
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>${p.h1}</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="${p.articleClass || 'tm-article'}"${p.articleAttrs ? ' ' + p.articleAttrs : ''}>

${p.body}

  </article>
</div>
${scripts}`,
  };
};
