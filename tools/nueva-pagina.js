'use strict';
/*
 * Scaffold de una página del diccionario con todo el boilerplate (cookie consent,
 * header, footer, consent-mode, OG, Twitter, y los 3 JSON-LD: Article + Breadcrumb
 * + FAQPage). Rellena tools/page-template.html a partir de un config JSON.
 *
 * Uso:  node tools/nueva-pagina.js ruta/al/config.json
 *
 * Config JSON (campos):
 *   dir            (obligatorio) ruta del directorio, p.ej. "diccionario-musical/intervalos/intervalos-x"
 *   title          (obligatorio) <title> y og:title (sin comillas dobles)
 *   desc           (obligatorio) meta description / og:description
 *   h1             (obligatorio) encabezado H1
 *   breadcrumb     (obligatorio) [{name,url}, ...] niveles intermedios (sin Inicio ni la propia página)
 *   body           cuerpo del artículo (HTML) — o bien:
 *   bodyFile       ruta a un fragmento .html con el cuerpo del artículo
 *   faq            [{q,a}, ...] preguntas frecuentes (texto plano)
 *   related        [{text,url}, ...] aside "Páginas relacionadas"
 *   twdesc         (opc.) twitter:description; por defecto = desc
 *   headline       (opc.) schema headline; por defecto = h1
 *   datePublished  (opc.) por defecto hoy
 *   dateModified   (opc.) por defecto hoy
 *   wide           (opc.) true => article tm-article--wide
 *   ogImage        (opc.) por defecto auto: og-<dir con guiones>.png
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://www.teoriamusical.com.es';
const ROOT = path.join(__dirname, '..');
const TEMPLATE = path.join(__dirname, 'page-template.html');
const SEP = '<span class="tm-crumb-sep">›</span>';

function today() { return new Date().toISOString().slice(0, 10); }

function buildBreadcrumbHtml(items) {
  // items ya incluye Inicio ... y la página actual (última, sin enlace)
  return items.map((it, i) => {
    const last = i === items.length - 1;
    return last
      ? `<span aria-current="page">${it.name}</span>`
      : `<a href="${it.url}">${it.name}</a>`;
  }).join(SEP);
}

function buildFaqSection(faq) {
  if (!faq || !faq.length) return '';
  const items = faq.map(f => `    <div class="tm-faq-item">
      <div class="tm-faq-q">${f.q}</div>
      <div class="tm-faq-a">${f.a}</div>
    </div>`).join('\n');
  return `<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Preguntas <span>Frecuentes</span></h2>
</div>
<div>
<div class="tm-faq-list">
${items}
  </div>
</div>
</div>
</section>`;
}

function buildRelated(related) {
  if (!related || !related.length) return '';
  const lis = related.map(r => `    <li><a href="${r.url}">${r.text}</a></li>`).join('\n');
  return `<aside class="tm-related">
  <h2>Páginas relacionadas</h2>
  <ul>
${lis}
  </ul>
</aside>`;
}

function buildJsonLd(c, canonical, ogImage) {
  const article = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: c.headline || c.h1, description: c.desc, url: canonical,
    inLanguage: 'es', isAccessibleForFree: true,
    image: { '@type': 'ImageObject', url: ogImage },
    author: { '@type': 'Person', name: 'Eduardo Escrig Zomeño', url: SITE + '/sobre-mi/' },
    datePublished: c.datePublished || today(), dateModified: c.dateModified || today(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    publisher: { '@type': 'Organization', name: 'Teoría Musical', url: SITE, logo: { '@type': 'ImageObject', url: SITE + '/assets/img/og-diccionario.png' } },
  };
  const crumbItems = [{ name: 'Inicio', url: SITE + '/' }]
    .concat(c.breadcrumb.map(b => ({ name: b.name, url: SITE + b.url })))
    .concat([{ name: c.h1, url: canonical }]);
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: crumbItems.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
  const blocks = [
    `<script type="application/ld+json">\n${JSON.stringify(article)}\n</script>`,
    `<script type="application/ld+json">\n${JSON.stringify(breadcrumb)}\n</script>`,
  ];
  if (c.faq && c.faq.length) {
    const faqLd = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: c.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    blocks.push(`<script type="application/ld+json">\n${JSON.stringify(faqLd)}\n</script>`);
  }
  return blocks.join('\n');
}

function main() {
  const cfgPath = process.argv[2];
  if (!cfgPath) { console.error('Uso: node tools/nueva-pagina.js config.json'); process.exit(1); }
  const c = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  for (const req of ['dir', 'title', 'desc', 'h1', 'breadcrumb']) {
    if (!c[req]) { console.error('Falta el campo obligatorio: ' + req); process.exit(1); }
  }
  if (/"/.test(c.title) || /"/.test(c.desc)) {
    console.error('AVISO: title/desc contienen comillas dobles; usa « » o comillas simples para no romper los atributos HTML.');
  }
  const dir = c.dir.replace(/^\/+|\/+$/g, '');
  const canonical = `${SITE}/${dir}/`;
  const ogImage = c.ogImage || `${SITE}/assets/img/og-pages/og-${dir.replace(/\//g, '-')}.png`;
  const breadcrumbItems = [{ name: 'Inicio', url: '/' }]
    .concat(c.breadcrumb)
    .concat([{ name: c.h1 }]);

  let body = c.body;
  if (!body && c.bodyFile) body = fs.readFileSync(path.resolve(c.bodyFile), 'utf8');
  if (!body) { console.error('Falta body o bodyFile'); process.exit(1); }

  let html = fs.readFileSync(TEMPLATE, 'utf8');
  const subs = {
    '{{TITLE}}': c.title,
    '{{DESC}}': c.desc,
    '{{TWDESC}}': c.twdesc || c.desc,
    '{{CANONICAL}}': canonical,
    '{{OG_IMAGE}}': ogImage,
    '{{JSONLD}}': buildJsonLd(c, canonical, ogImage),
    '{{BREADCRUMB}}': buildBreadcrumbHtml(breadcrumbItems),
    '{{H1}}': c.h1,
    '{{WIDE}}': c.wide ? ' tm-article--wide' : '',
    '{{BODY}}': body.trim(),
    '{{FAQ}}': buildFaqSection(c.faq),
    '{{RELATED}}': buildRelated(c.related),
  };
  for (const [k, v] of Object.entries(subs)) html = html.split(k).join(v);

  const outDir = path.join(ROOT, dir);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.html');
  if (fs.existsSync(outFile) && !process.argv.includes('--force')) {
    console.error('YA EXISTE ' + outFile + ' (usa --force para sobrescribir)'); process.exit(1);
  }
  fs.writeFileSync(outFile, html);
  console.log('OK -> ' + path.relative(ROOT, outFile));
  console.log('   canonical: ' + canonical);
  console.log('   og:image:  ' + ogImage);
  console.log('Siguiente: gen_og_pages.py · sitemap.xml · validate_jsonld.js · version_assets.cjs · check móvil');
}
main();
