// Builder for the per-instrument tuner pages in English (/en/tools/tuner/<slug>/).
// The tuner panel is taken from that instrument's own Spanish page (the winds start with the
// transposition box on, the others without) and translated; afinador.js shows letters and English
// text because <html lang="en">. Each page supplies only its own data. See TUNER-PAGES.md.
const fs = require('fs');
const path = require('path');
const INSTRUMENTS = require('./instruments');

const ROOT = path.resolve(__dirname, '..', '..');
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

const cache = {};
function esPage(esSlug) {
  if (!cache[esSlug]) cache[esSlug] = fs.readFileSync(path.join(ROOT, 'herramientas', 'afinador', esSlug, 'index.html'), 'utf8');
  return cache[esSlug];
}

function panelFor(esSlug) {
  const es = esPage(esSlug);
  const i = es.indexOf('<div class="tm-afinador-wrap">');
  let j = es.indexOf('</div><!-- /tm-afinador-wrap -->', i);
  if (i < 0 || j < 0) throw new Error(`tuner-instrument(${esSlug}): panel markers not found`);
  // some Spanish pages write accents as numeric entities (Afinaci&#243;n): decode them before matching
  let panel = (es.slice(i, j) + '</div><!-- /tm-afinador-wrap -->').replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n));
  for (const [a, b] of MAP) {
    if (!panel.includes(a)) throw new Error(`tuner-instrument(${esSlug}): panel text not found: ${a}`);
    panel = panel.split(a).join(b);
  }
  const left = panel.replace(/<[^>]+>/g, ' ').match(/\S*[áéíóúñ¿¡]\S*/gi);
  if (left) throw new Error(`tuner-instrument(${esSlug}): Spanish text left in panel: ${left.join(', ')}`);
  const attrs = [...panel.matchAll(/(?:title|aria-label)="([^"]*)"/g)].map(m => m[1]).filter(t => /[áéíóúñ¿¡]|\b(de|del|la|el|los|las|para)\b/i.test(t));
  if (attrs.length) throw new Error(`tuner-instrument(${esSlug}): Spanish attribute in panel: ${attrs.join(' | ')}`);
  return panel;
}

const stripTags = s => s.replace(/<[^>]+>/g, '');

// Sibling pages listed at the bottom of every instrument page (from instruments/*.json)
const SIBLINGS = [['/en/tools/tuner/', 'Online tuner (all instruments)'], ...INSTRUMENTS.map(i => [`/en/tools/tuner/${i.slug}/`, i.label])];

/**
 * inst = { slug, esSlug, name ('Guitar'), title, description, swDescription, h1, intro:[html],
 *          strings?:[{name,oct,midi}]  (letters; omit for instruments with no string panel),
 *          transp?: number            (semitones, as in the Spanish page's window.AFIN_TRANSP),
 *          sections:[{h2, html}], faqH2, faq:[[q,a]], closing: html }
 * insert_ads.py adds the ad blocks afterwards, like on the Spanish pages.
 */
module.exports = function tunerInstrument(inst) {
  const url = `/en/tools/tuner/${inst.slug}/`;
  const abs = 'https://www.teoriamusical.com.es' + url;
  const es = esPage(inst.esSlug);
  const afinV = es.match(/afinador\.js\?v=([0-9a-f]+)/)[1];
  const strings = inst.strings ? '[' + inst.strings.map(s => `{name:"${s.name}",oct:${s.oct},midi:${s.midi}}`).join(',') + ']' : null;
  const pre = (strings ? `<script>window.AFIN_STRINGS=${strings};</script>\n` : '') + (inst.transp != null ? `<script>window.AFIN_TRANSP=${inst.transp};</script>\n` : '');
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

${panelFor(inst.esSlug)}
${pre}<script src="/assets/tools/afinador.js?v=${afinV}" defer></script>

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
