// Builder for the per-instrument tuner pages in English (/en/tools/tuner/<instrument>/).
// The tuner panel is taken from the Spanish guitar page (identical on every instrument page) and
// translated; afinador.js shows letters and English text because <html lang="en">.
// Each page supplies only its own data (strings, tuning table, tips, FAQ).
const fs = require('fs');
const path = require('path');

const ES_GUITAR = fs.readFileSync(path.resolve(__dirname, '..', '..', 'herramientas', 'afinador', 'guitarra', 'index.html'), 'utf8');
const AFIN_V = ES_GUITAR.match(/afinador\.js\?v=([0-9a-f]+)/)[1];

let PANEL = (() => {
  const i = ES_GUITAR.indexOf('<div class="tm-afinador-wrap">'), j = ES_GUITAR.indexOf('</div><!-- /tm-afinador-wrap -->', i);
  if (i < 0 || j < 0) throw new Error('tuner-instrument: panel markers not found');
  return ES_GUITAR.slice(i, j) + '</div><!-- /tm-afinador-wrap -->';
})();
const MAP = [
  ['<div class="afin-title">Afinador</div>', '<div class="afin-title">Tuner</div>'],
  ['title="Pantalla completa" aria-label="Pantalla completa"', 'title="Fullscreen" aria-label="Fullscreen"'],
  ['<span class="afin-fs-label">Pantalla completa</span>', '<span class="afin-fs-label">Fullscreen</span>'],
  ['<div class="box-label">Afinación</div>', '<div class="box-label">Tuning</div>'],
  ['<div class="note-col-label">Nota real</div>', '<div class="note-col-label">Sounding note</div>'],
  ['<div class="note-col-label">Nota escrita</div>', '<div class="note-col-label">Written note</div>'],
  ['<span id="mic-label">Activar</span>', '<span id="mic-label">Start</span>'],
  ['<div class="box-label">Referencia A4</div>', '<div class="box-label">A4 reference</div>'],
  ['<span class="ref-label">La4 =</span>', '<span class="ref-label">A4 =</span>'],
  ['id="ref-value">442 Hz</span>', 'id="ref-value">440 Hz</span>'],
  ['<div class="box-label">Instrumento transpositor</div>', '<div class="box-label">Transposing instrument</div>'],
  ['<div class="box-label">Notas de referencia — pulsa para escuchar</div>', '<div class="box-label">Reference notes — tap to listen</div>'],
  ['<div class="box-label">Información</div>', '<div class="box-label">Info</div>'],
  ['<span class="stat-lbl">Nota</span>', '<span class="stat-lbl">Note</span>'],
];
for (const [a, b] of MAP) {
  if (!PANEL.includes(a)) throw new Error('tuner-instrument panel: not found: ' + a);
  PANEL = PANEL.split(a).join(b);
}
const left = PANEL.replace(/<[^>]+>/g, ' ').match(/\S*[áéíóúñ¿¡]\S*/gi);
if (left) throw new Error('tuner-instrument panel: Spanish text left: ' + left.join(', '));
const attrs = [...PANEL.matchAll(/(?:title|aria-label)="([^"]*)"/g)].map(m => m[1]).filter(t => /[áéíóúñ¿¡]|\b(de|del|la|el|los|las|para)\b/i.test(t));
if (attrs.length) throw new Error('tuner-instrument panel: Spanish attribute: ' + attrs.join(' | '));

const stripTags = s => s.replace(/<[^>]+>/g, '');

// Sibling pages listed at the bottom of every instrument page (added to as more exist)
const SIBLINGS = [
  ['/en/tools/tuner/', 'Online tuner (all instruments)'],
  ['/en/tools/tuner/guitar/', 'Guitar tuner'],
  ['/en/tools/tuner/bass/', 'Bass guitar tuner'],
  ['/en/tools/tuner/violin/', 'Violin tuner'],
  ['/en/tools/tuner/ukulele/', 'Ukulele tuner'],
];

/**
 * inst = { slug, esSlug, name ('Guitar'), title, description, h1, intro:[html], strings:[{name,oct,midi}],
 *          sections:[{h2, html}], adAfter:1, faq:[[q,a]], faqH2, closing: html, swDescription, howName }
 * `sections` are rendered in order; insert_ads adds the two ad blocks afterwards, like on the Spanish pages.
 */
module.exports = function tunerInstrument(inst) {
  const url = `/en/tools/tuner/${inst.slug}/`;
  const abs = 'https://www.teoriamusical.com.es' + url;
  const strings = '[' + inst.strings.map(s => `{name:"${s.name}",oct:${s.oct},midi:${s.midi}}`).join(',') + ']';
  const sections = inst.sections.map(s => `<h2>${s.h2}</h2>\n${s.html}`).join('\n\n');
  const faq = inst.faq.map(([q, a]) => `  <div class="tm-faq-item">
    <div class="tm-faq-q">${q}</div>
    <div class="tm-faq-a">${a}</div>
  </div>`).join('\n');
  const others = SIBLINGS.filter(([h]) => h !== url).map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('\n');
  return {
    path: url,
    esPath: `/herramientas/afinador/${inst.esSlug}/`,
    lastmod: '2026-11-05',
    styles: ['/assets/tools/tools.css'],
    title: inst.title,
    description: inst.description,
    ogImage: `/assets/img/og-pages/og-en-tuner-${inst.slug}.png`,
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: `Online ${inst.name} Tuner`,
        description: inst.swDescription, url: abs, applicationCategory: 'MusicApplication', operatingSystem: 'Web', inLanguage: 'en',
        isAccessibleForFree: true, datePublished: '2026-11-05', dateModified: '2026-11-05',
        author: { '@type': 'Person', name: 'Eduardo Escrig Zomeño', url: 'https://www.teoriamusical.com.es/sobre-mi/' },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.teoriamusical.com.es/en/' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.teoriamusical.com.es/en/tools/' },
          { '@type': 'ListItem', position: 3, name: 'Online Tuner', item: 'https://www.teoriamusical.com.es/en/tools/tuner/' },
          { '@type': 'ListItem', position: 4, name: `${inst.name} Tuner`, item: abs },
        ],
      },
      {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: inst.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } })),
      },
    ],
    main: `
  <nav class="tm-breadcrumb" aria-label="Breadcrumb">
    <div class="tm-container">
      <a href="/en/">Home</a><span class="tm-crumb-sep">›</span><a href="/en/tools/">Tools</a><span class="tm-crumb-sep">›</span><a href="/en/tools/tuner/">Online Tuner</a><span class="tm-crumb-sep">›</span><span aria-current="page">${inst.name} Tuner</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>${inst.h1}</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

${inst.intro.map(p => `<p>${p}</p>`).join('\n')}

${PANEL}
<script>window.AFIN_STRINGS=${strings};</script>
<script src="/assets/tools/afinador.js?v=${AFIN_V}" defer></script>

${sections}

<h2>${inst.faqH2}</h2>
<div class="tm-faq-list">
${faq}
</div>
<p>${inst.closing}</p>

<h2>Other tuners</h2>
<ul>
${others}
</ul>

  </article>
</div>`,
  };
};
