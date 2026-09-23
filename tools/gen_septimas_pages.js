'use strict';
/* Genera las páginas de ejercicios de acordes de séptima (construir +
 * reconocer), clonando el patrón de tríadas (ejercicios/acordes/construir-
 * triadas*, ejercicios/acordes/triadas-*) pero con 3 tipos de séptima
 * (dominante / sensible / disminuida) en vez de 4 tríadas, y 4 posiciones
 * (fundamental + 3 inversiones) en vez de 3.
 *
 * Uso: node tools/gen_septimas_pages.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'ejercicios', 'acordes');
const SITE = 'https://www.teoriamusical.com.es';
const TODAY = '2026-09-23';

const TIPOS = [
  {
    id: 'dominante', slug: 'de-dominante', nombre: 'Séptima de Dominante', corto: 'V7',
    dicc: '/diccionario-musical/acordes/acorde-de-septima-de-dominante/',
    estructura: '3ª Mayor + 5ª Justa + 7ª menor',
    resumen: 'Se forma sobre el 5º grado (la dominante) de una tonalidad: una tríada mayor con una 7ª menor añadida. Contiene el tritono (3ª–7ª) que la hace sonar «en tensión», pidiendo resolver a la tónica.',
    filas: [
      ['Fundamental', '7', '3ª M + 5ª J + 7ª m'],
      ['1ª inversión', '6/5', '3ª m + 5ª dis + 6ª m'],
      ['2ª inversión', '4/3', '3ª m + 4ª J + 6ª M'],
      ['3ª inversión', '4/2', '2ª M + 4ª aum + 6ª M']
    ]
  },
  {
    id: 'sensible', slug: 'de-sensible', nombre: 'Séptima de Sensible', corto: 'ø7',
    dicc: '/diccionario-musical/acordes/acorde-de-septima-de-sensible/',
    estructura: '3ª menor + 5ª Disminuida + 7ª menor',
    resumen: 'También llamado semidisminuido: se forma sobre el 7º grado (la sensible) de una tonalidad mayor. Es una tríada disminuida con una 7ª menor (no disminuida) añadida — por eso no es simétrico como la séptima disminuida.',
    filas: [
      ['Fundamental', 'ø7', '3ª m + 5ª dis + 7ª m'],
      ['1ª inversión', '6/5', '3ª m + 5ª J + 6ª M'],
      ['2ª inversión', '4/3', '3ª M + 4ª aum + 6ª M'],
      ['3ª inversión', '4/2', '2ª M + 4ª J + 6ª m']
    ]
  },
  {
    id: 'disminuida', slug: 'disminuida', nombre: 'Séptima Disminuida', corto: '°7',
    dicc: '/diccionario-musical/acordes/acorde-de-septima-disminuida/',
    estructura: '3ª menor + 5ª Disminuida + 7ª Disminuida',
    resumen: 'Se forma sobre el 7º grado de una tonalidad menor armónica: cuatro terceras menores apiladas (3ª m + 5ª dis + 7ª dis), un acorde simétrico. Al ser enarmónicamente igual cada tres semitonos, es el acorde favorito para modular.',
    filas: [
      ['Fundamental', '°7', '3ª m + 5ª dis + 7ª dis'],
      ['1ª inversión', '6/5', '3ª m + 5ª dis + 6ª M'],
      ['2ª inversión', '4/3', '3ª m + 4ª aum + 6ª M'],
      ['3ª inversión', '4/2', '2ª aum + 4ª aum + 6ª M']
    ]
  }
];

const POSICIONES = [
  { id: 'fundamental', slug: '', nombre: 'en Fundamental', corto: 'Fundamental', dado: 'la fundamental', piden: '3ª, 5ª y 7ª' },
  { id: '1a', slug: '-primera-inversion', nombre: 'en 1ª Inversión', corto: '1ª Inversión', dado: 'la 3ª (en el bajo)', piden: '5ª, 7ª y fundamental' },
  { id: '2a', slug: '-segunda-inversion', nombre: 'en 2ª Inversión', corto: '2ª Inversión', dado: 'la 5ª (en el bajo)', piden: '7ª, fundamental y 3ª' },
  { id: '3a', slug: '-tercera-inversion', nombre: 'en 3ª Inversión', corto: '3ª Inversión', dado: 'la 7ª (en el bajo)', piden: 'fundamental, 3ª y 5ª' },
  { id: 'todas', slug: '-todas-las-posiciones', nombre: '— Todas las Posiciones', corto: 'Todas las Posiciones', dado: 'una nota del acorde (al azar)', piden: '3ª, 5ª y 7ª — o las que correspondan, según qué inversión toque esa vez' }
];

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function tablaTipo(tipo) {
  const filas = tipo.filas.map(f => `    <tr><td><strong>${f[0]}</strong></td><td>${f[1]}</td><td>${f[2]}</td></tr>`).join('\n');
  return `<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Posición</th><th>Cifrado</th><th>Intervalos desde el bajo</th></tr></thead>
  <tbody>
${filas}
  </tbody>
</table>
</div>`;
}

function tablaComparativa() {
  const filas = TIPOS.map(t => `    <tr><td><strong>${t.nombre}</strong></td><td>${t.corto}</td><td>${t.estructura}</td></tr>`).join('\n');
  return `<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Tipo</th><th>Cifrado</th><th>Estructura</th></tr></thead>
  <tbody>
${filas}
  </tbody>
</table>
</div>`;
}

function breadcrumb(items) {
  return items.map((it, i) => {
    const last = i === items.length - 1;
    return last ? `<span aria-current="page">${it.name}</span>` : `<a href="${it.url}">${it.name}</a>`;
  }).join('<span class="tm-crumb-sep">›</span>');
}

function faqBlock(faq) {
  const items = faq.map(f => `    <div class="tm-faq-item">
      <div class="tm-faq-q">${esc(f.q)}</div>
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

function faqJsonLd(faq) {
  return JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.aPlano } }))
  });
}

function pageShell(opts) {
  const { title, desc, canonical, h1, breadcrumbHtml, jsonld, body, ogImage } = opts;
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Teoría Musical">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/assets/img/favicon.png" type="image/png">

<meta name="google-site-verification" content="-bWygyA80PPsmSsmf6FQ_oZs6YeGjN95HzprqD07fos">

<script>
  window['googlefc'] = window['googlefc'] || {};
  window['googlefc'].controlledMessagingFunction = function(m){ m.proceed(false); };
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage':            'denied',
    'ad_user_data':          'denied',
    'ad_personalization':    'denied',
    'analytics_storage':     'denied',
    'functionality_storage': 'granted',
    'security_storage':      'granted',
    'wait_for_update':       500
  });
  try {
    var m = document.cookie.match('(?:^|; )tm_cookie_consent=([^;]*)');
    if (m) {
      var p = JSON.parse(decodeURIComponent(m[1]));
      gtag('consent', 'update', {
        analytics_storage:  p.analytics   ? 'granted' : 'denied',
        ad_storage:         p.advertising ? 'granted' : 'denied',
        ad_user_data:       p.advertising ? 'granted' : 'denied',
        ad_personalization: p.advertising ? 'granted' : 'denied'
      });
    }
  } catch (e) {}
</script>

<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/playfair-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css?v=894c9b82">

<script src="https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js" defer></script>
<script src="/assets/js/septimas-engine.js" defer></script>

${jsonld}
</head>
<a class="tm-skip" href="#main">Saltar al contenido</a>

<!-- Cookie consent (RGPD) -->
<div id="tm-cookie-overlay" role="dialog" aria-modal="true" aria-labelledby="tm-cookie-title">
  <div id="tm-cookie-modal">
    <div id="tm-cookie-icon" aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18.5" stroke="#b8860b" stroke-width="1.5" fill="#faf8f4"/>
        <circle cx="14" cy="15" r="2.2" fill="#b8860b"/>
        <circle cx="24" cy="13" r="1.7" fill="#b8860b"/>
        <circle cx="27" cy="24" r="2.2" fill="#b8860b"/>
        <circle cx="16" cy="26" r="1.7" fill="#b8860b"/>
        <circle cx="21" cy="20" r="1.1" fill="#b8860b"/>
      </svg>
    </div>
    <h2 id="tm-cookie-title">Usamos cookies</h2>
    <p id="tm-cookie-desc">
      Utilizamos cookies propias —necesarias para el funcionamiento del sitio— y de
      terceros para análisis del tráfico y publicidad. Puedes aceptarlas, rechazar las
      opcionales o configurarlas según tus preferencias.
      <a href="/politica-de-cookies/" id="tm-privacy-link" rel="noopener noreferrer">Política de cookies</a>.
    </p>
    <div id="tm-cookie-panel" hidden>
      <div class="tm-toggle-row">
        <div class="tm-toggle-info">
          <strong>Necesarias</strong>
          <span>Imprescindibles para el funcionamiento del sitio. No se pueden desactivar.</span>
        </div>
        <div class="tm-toggle-wrap tm-toggle-forced">
          <input type="checkbox" id="tm-chk-necessary" checked disabled>
          <label for="tm-chk-necessary" class="tm-switch-label"></label>
        </div>
      </div>
      <div class="tm-toggle-row">
        <div class="tm-toggle-info">
          <strong>Analíticas</strong>
          <span>Miden el tráfico y el comportamiento de navegación (Google Analytics 4).</span>
        </div>
        <div class="tm-toggle-wrap">
          <input type="checkbox" id="tm-chk-analytics">
          <label for="tm-chk-analytics" class="tm-switch-label"></label>
        </div>
      </div>
      <div class="tm-toggle-row">
        <div class="tm-toggle-info">
          <strong>Publicitarias</strong>
          <span>Permiten mostrar anuncios relevantes según tus intereses (Google AdSense).</span>
        </div>
        <div class="tm-toggle-wrap">
          <input type="checkbox" id="tm-chk-advertising">
          <label for="tm-chk-advertising" class="tm-switch-label"></label>
        </div>
      </div>
    </div>
    <div id="tm-cookie-actions">
      <button id="tm-btn-accept"    class="tm-btn tm-btn-primary">Aceptar todo</button>
      <button id="tm-btn-necessary" class="tm-btn tm-btn-secondary">Solo necesarias</button>
      <button id="tm-btn-configure" class="tm-btn tm-btn-link">Configurar</button>
      <button id="tm-btn-save"      class="tm-btn tm-btn-primary" hidden>Guardar preferencias</button>
    </div>
  </div>
</div>
<button id="tm-cookie-trigger" aria-label="Gestionar cookies" title="Gestionar cookies" hidden>
  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18.5" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="14" cy="15" r="2.2" fill="currentColor"/>
    <circle cx="24" cy="13" r="1.7" fill="currentColor"/>
    <circle cx="27" cy="24" r="2.2" fill="currentColor"/>
    <circle cx="16" cy="26" r="1.7" fill="currentColor"/>
    <circle cx="21" cy="20" r="1.1" fill="currentColor"/>
  </svg>
</button>
<script src="/assets/js/consent.js?v=bf8ddf19" defer></script>

<header class="tm-site-header">
  <div class="tm-container tm-header-inner">
    <a class="tm-brand" href="/">
      <span class="tm-brand-mark"><img src="/assets/img/favicon-32.png" width="32" height="32" alt=""></span>
      <span class="tm-brand-text">Teoría Musical</span>
    </a>
    <button class="tm-nav-toggle" aria-label="Menú" aria-expanded="false" aria-controls="tm-nav">
      <span></span><span></span><span></span>
    </button>
    <nav id="tm-nav" class="tm-nav" aria-label="Principal">
      <ul class="tm-nav-list">
        <li><a href="/" class="">Inicio</a></li>
        <li><a href="/diccionario-musical/" class="">Diccionario Musical</a></li>
        <li><a href="/ejercicios/" class="is-active">Ejercicios</a></li>
        <li class="tm-has-sub"><a href="/herramientas/" class="">Herramientas</a>
        <ul class="tm-subnav">
          <li><a href="/herramientas/metronomo/">Metrónomo</a></li>
          <li><a href="/herramientas/afinador/">Afinador</a></li>
        </ul>
      </li>
        <li><a href="/blog/" class="">Blog</a></li>
        <li><a href="/test-tecnico-de-laboratorio/" class="">Test Laboratorio</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main" class="tm-main">

  <nav class="tm-breadcrumb" aria-label="Migas">
    <div class="tm-container">
      ${breadcrumbHtml}
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>${esc(h1)}</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

${body}

</article>
</div>

</main>

<footer class="tm-site-footer">
  <div class="tm-container tm-footer-inner">
    <div class="tm-footer-col">
      <h3>Teoría Musical</h3>
      <p>Música desde sus fundamentos: diccionario, ejercicios interactivos y herramientas gratuitas.</p>
    </div>
    <div class="tm-footer-col">
      <h3>Secciones</h3>
      <ul>
        <li><a href="/diccionario-musical/">Diccionario Musical</a></li>
        <li><a href="/ejercicios/">Ejercicios Musicales</a></li>
        <li class="tm-has-sub"><a href="/herramientas/">Herramientas</a>
        <ul class="tm-subnav">
          <li><a href="/herramientas/metronomo/">Metrónomo</a></li>
          <li><a href="/herramientas/afinador/">Afinador</a></li>
        </ul>
      </li>
        <li><a href="/blog/">Blog</a></li>
      </ul>
    </div>
    <div class="tm-footer-col">
      <h3>Información</h3>
      <ul>
        <li><a href="/sobre-mi/">Sobre mí</a></li><li><a href="/contacto/">Contacto</a></li>
        <li><a href="/aviso-legal/">Aviso legal</a></li>
        <li><a href="/politica-de-privacidad/">Política de privacidad</a></li>
        <li><a href="/politica-de-cookies/">Política de cookies</a></li>
      </ul>
    </div>
  </div>
  <div class="tm-footer-bottom">
    <p>© <span id="tm-year"></span> Teoría Musical — Eduardo Escrig Zomeño. Todos los derechos reservados.</p>
  </div>
</footer>

<script src="/assets/js/main.js?v=58d478c2" defer></script>
</body>
</html>
`;
}

function ad(slot) {
  return `<div class="tm-ad">
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1186627650857489" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>
</div>`;
}

/* ------------------------- Páginas CONSTRUIR (por tipo) ------------------------- */
function paginaConstruirTipo(tipo, pos) {
  const slug = 'construir-septima-' + tipo.slug + pos.slug;
  const url = `/ejercicios/acordes/${slug}/`;
  const h1 = `Construir la ${tipo.nombre} ${pos.nombre}`;
  const title = `${h1} | Ejercicio Interactivo`;
  const desc = `Dibuja en el pentagrama las notas que faltan de la ${tipo.nombre.toLowerCase()} ${pos.nombre.toLowerCase()}, a partir de la nota dada. Ejercicio interactivo gratuito.`;
  const canonical = SITE + url;

  const uid = 'tmac_' + tipo.id.slice(0, 3) + '_' + (pos.id === 'todas' ? 'tds' : pos.id);
  const configTipo = pos.id === 'todas' ? `tipo: "${tipo.id}", inversion: "todas"` : `tipo: "${tipo.id}", inversion: "${pos.id}"`;

  const faq = [
    { q: `¿Qué es la ${tipo.nombre.toLowerCase()}?`, a: tipo.resumen, aPlano: tipo.resumen.replace(/<[^>]+>/g, '') },
    { q: `¿Cómo se cifra la ${tipo.nombre.toLowerCase()} ${pos.nombre.toLowerCase()}?`,
      a: pos.id === 'todas'
        ? `Depende de la posición: ${tipo.filas.map(f => f[0] + ' se cifra ' + f[1]).join(', ')}.`
        : `Se cifra <strong>${tipo.filas.find(f => f[0].toLowerCase().includes(pos.corto.toLowerCase()))?.[1] || tipo.filas[POSICIONES.findIndex(p => p.id === pos.id)][1]}</strong>, con los intervalos ${tipo.filas[POSICIONES.findIndex(p => p.id === pos.id)][2]} contados desde la nota del bajo.`,
      aPlano: '' },
    { q: `¿Qué nota se da y cuáles hay que dibujar?`,
      a: `Se da ${pos.dado} en el pentagrama. Hay que dibujar las otras tres: ${pos.piden}.`,
      aPlano: `Se da ${pos.dado} en el pentagrama. Hay que dibujar las otras tres: ${pos.piden}.` },
    { q: `¿Por qué a veces hace falta una doble alteración?`,
      a: `Porque, según la tónica de partida, alguna de las notas del acorde puede necesitar un doble sostenido o un doble bemol para mantener el nombre de nota correcto (por ejemplo, una 7ª que caiga en Sib♭). Aparece sobre todo en el nivel Difícil.`,
      aPlano: `Porque, según la tónica de partida, alguna de las notas del acorde puede necesitar un doble sostenido o un doble bemol para mantener el nombre de nota correcto (por ejemplo, una 7ª que caiga en Sib♭). Aparece sobre todo en el nivel Difícil.` }
  ];
  faq.forEach(f => { if (!f.aPlano) f.aPlano = f.a.replace(/<[^>]+>/g, ''); });

  const jsonld = `<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@type': 'LearningResource', name: h1, description: desc, url: canonical, educationalLevel: 'intermediate', inLanguage: 'es', isAccessibleForFree: true, teaches: `Construir la ${tipo.nombre.toLowerCase()} ${pos.nombre.toLowerCase()}, dado un acorde de séptima ${tipo.estructura.toLowerCase()}.`, datePublished: TODAY, dateModified: TODAY, image: { '@type': 'ImageObject', url: SITE + '/assets/img/og-pages/og-ejercicios-acordes-' + slug + '.png' }, provider: { '@type': 'Organization', name: 'Teoría Musical', url: SITE } })}
</script>
<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE + '/' },
  { '@type': 'ListItem', position: 2, name: 'Ejercicios', item: SITE + '/ejercicios/' },
  { '@type': 'ListItem', position: 3, name: 'Acordes', item: SITE + '/ejercicios/acordes/' },
  { '@type': 'ListItem', position: 4, name: h1, item: canonical }
] })}
</script>
<script type="application/ld+json">
${faqJsonLd(faq)}
</script>`;

  const breadcrumbHtml = breadcrumb([
    { name: 'Inicio', url: '/' }, { name: 'Ejercicios Musicales', url: '/ejercicios/' },
    { name: 'Acordes', url: '/ejercicios/acordes/' }, { name: `Construir ${tipo.nombre} ${pos.nombre}` }
  ]);

  const hermanas = POSICIONES.filter(p => p.id !== pos.id).map(p =>
    `<a href="/ejercicios/acordes/construir-septima-${tipo.slug}${p.slug}/">${p.corto}</a>`).join(', ');
  const otrosTipos = TIPOS.filter(t => t.id !== tipo.id).map(t =>
    `<a href="/ejercicios/acordes/construir-septima-${t.slug}${pos.slug}/">${t.nombre}</a>`).join(' y ');
  const reconocerLink = `/ejercicios/acordes/septimas${pos.id === 'fundamental' ? '-en-fundamental' : (pos.id === 'todas' ? '-todas-las-posiciones' : '-en-' + (pos.id === '1a' ? 'primera' : pos.id === '2a' ? 'segunda' : 'tercera') + '-inversion')}/`;

  const body = `<p>Se da ${pos.dado} de una <strong>${tipo.nombre.toLowerCase()}</strong> (${tipo.estructura.toLowerCase()}). La tarea es dibujar en el pentagrama las otras tres notas del acorde: ${pos.piden}.</p>

<h2>Estructura de la ${tipo.nombre.toLowerCase()}</h2>
<p>${tipo.resumen}</p>
${tablaTipo(tipo)}

${ad('3473898651')}

<h2>Ejercicio</h2>
<div id="${uid}"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmSe7Engine("${uid}", { test: "construir", ${configTipo} });
  });
</script>

<p><strong>Cómo usar el ejercicio:</strong> Se hace clic (o se arrastra) en el pentagrama para colocar cada nota. Primero se selecciona la alteración con los botones ♭♭ ♭ ♮ ♯ ♯♯ si la nota lo requiere. <em>Deshacer</em> borra la última nota y <em>Limpiar</em> reinicia el ejercicio. La lupa muestra ampliada la nota que vas a colocar.</p>

<p>Otras posiciones de la ${tipo.nombre.toLowerCase()}: ${hermanas}. También se puede <a href="${reconocerLink}">practicar a reconocerla</a> (junto con ${otrosTipos}), o repasar la teoría en <a href="${tipo.dicc}">${tipo.nombre.toLowerCase()}</a>.</p>

${faqBlock(faq)}
${ad('2439863051')}`;

  return { slug, html: pageShell({ title, desc, canonical, h1, breadcrumbHtml, jsonld, body, ogImage: SITE + '/assets/img/og-pages/og-ejercicios-acordes-' + slug + '.png' }) };
}

/* --------------------- Página CONSTRUIR mezclada (todo junto) --------------------- */
function paginaConstruirMezclada() {
  const slug = 'construir-septimas-mezcladas';
  const url = `/ejercicios/acordes/${slug}/`;
  const h1 = 'Construir Acordes de Séptima Mezclados';
  const title = `${h1} | Ejercicio Interactivo`;
  const desc = 'Dibuja en el pentagrama las notas que faltan de un acorde de séptima: tipo (dominante, sensible o disminuida) y posición al azar. Ejercicio interactivo gratuito.';
  const canonical = SITE + url;
  const uid = 'tmac_sep_mix';

  const faq = TIPOS.map(t => ({ q: `¿Qué es la ${t.nombre.toLowerCase()}?`, a: t.resumen, aPlano: t.resumen })).concat([
    { q: '¿Cómo sé qué tipo de acorde es antes de dibujarlo?', a: 'El enunciado lo indica siempre: junto a la nota dada aparece el nombre del acorde (dominante, sensible o disminuida) y, si no es la fundamental, entre paréntesis la inversión.', aPlano: 'El enunciado lo indica siempre: junto a la nota dada aparece el nombre del acorde (dominante, sensible o disminuida) y, si no es la fundamental, entre paréntesis la inversión.' }
  ]);

  const jsonld = `<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@type': 'LearningResource', name: h1, description: desc, url: canonical, educationalLevel: 'advanced', inLanguage: 'es', isAccessibleForFree: true, teaches: 'Construir cualquiera de los tres acordes de séptima (dominante, sensible, disminuida) en cualquiera de sus cuatro posiciones, mezclados al azar.', datePublished: TODAY, dateModified: TODAY, image: { '@type': 'ImageObject', url: SITE + '/assets/img/og-pages/og-ejercicios-acordes-' + slug + '.png' }, provider: { '@type': 'Organization', name: 'Teoría Musical', url: SITE } })}
</script>
<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE + '/' },
  { '@type': 'ListItem', position: 2, name: 'Ejercicios', item: SITE + '/ejercicios/' },
  { '@type': 'ListItem', position: 3, name: 'Acordes', item: SITE + '/ejercicios/acordes/' },
  { '@type': 'ListItem', position: 4, name: h1, item: canonical }
] })}
</script>
<script type="application/ld+json">
${faqJsonLd(faq)}
</script>`;

  const breadcrumbHtml = breadcrumb([
    { name: 'Inicio', url: '/' }, { name: 'Ejercicios Musicales', url: '/ejercicios/' },
    { name: 'Acordes', url: '/ejercicios/acordes/' }, { name: 'Construir Séptimas Mezcladas' }
  ]);

  const enlacesTipo = TIPOS.map(t => `<a href="/ejercicios/acordes/construir-septima-${t.slug}/">${t.nombre}</a>`).join(', ');

  const body = `<p>El repaso final: se da una nota de un acorde de séptima —<strong>tipo y posición al azar</strong>, mezclando dominante, sensible y disminuida en sus cuatro posiciones—. Hay que dibujar las otras tres notas.</p>

<h2>Los tres tipos de acorde de séptima</h2>
${tablaComparativa()}
<p>Cada uno tiene su propia página para practicarlo por separado antes de mezclarlos aquí: ${enlacesTipo}.</p>

${ad('3473898651')}

<h2>Ejercicio</h2>
<div id="${uid}"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmSe7Engine("${uid}", { test: "construir", inversion: "todas" });
  });
</script>

<p><strong>Cómo usar el ejercicio:</strong> Se hace clic (o se arrastra) en el pentagrama para colocar cada nota. Primero se selecciona la alteración con los botones ♭♭ ♭ ♮ ♯ ♯♯ si la nota lo requiere. <em>Deshacer</em> borra la última nota y <em>Limpiar</em> reinicia el ejercicio.</p>

<p>Si se te resiste alguno, practica antes por separado: ${enlacesTipo}. También puedes <a href="/ejercicios/acordes/septimas-todas-las-posiciones/">practicar a reconocerlos</a> en vez de escribirlos.</p>

${faqBlock(faq)}
${ad('2439863051')}`;

  return { slug, html: pageShell({ title, desc, canonical, h1, breadcrumbHtml, jsonld, body, ogImage: SITE + '/assets/img/og-pages/og-ejercicios-acordes-' + slug + '.png' }) };
}

/* ------------------------- Páginas RECONOCER (por posición) ------------------------- */
function paginaReconocer(pos) {
  const posSlugMap = { fundamental: 'en-fundamental', '1a': 'en-primera-inversion', '2a': 'en-segunda-inversion', '3a': 'en-tercera-inversion', todas: 'todas-las-posiciones' };
  const slug = 'septimas-' + posSlugMap[pos.id];
  const url = `/ejercicios/acordes/${slug}/`;
  const h1 = `Acordes de Séptima ${pos.nombre}`;
  const title = `${h1} | Test Online Gratis`;
  const desc = `Mira el acorde de séptima dibujado en el pentagrama (${pos.nombre.toLowerCase()}) y adivina si es dominante, sensible o disminuida. Test interactivo gratuito.`;
  const canonical = SITE + url;
  const uid = 'tmac_r_' + (pos.id === 'todas' ? 'tds' : pos.id);

  const faq = TIPOS.map(t => ({ q: `¿Cómo reconozco la ${t.nombre.toLowerCase()}?`, a: t.resumen, aPlano: t.resumen })).concat([
    { q: `¿Qué hay que identificar en este ejercicio?`, a: pos.id === 'todas' ? 'El tipo de acorde (dominante, sensible o disminuida): la posición cambia en cada pregunta, mezclando las cuatro.' : `El tipo de acorde (dominante, sensible o disminuida). La posición ya está fijada: siempre ${pos.nombre.toLowerCase()}.`, aPlano: '' }
  ]);
  faq.forEach(f => { if (!f.aPlano) f.aPlano = f.a; });

  const jsonld = `<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@type': 'LearningResource', name: h1, description: desc, url: canonical, educationalLevel: 'intermediate', inLanguage: 'es', isAccessibleForFree: true, teaches: `Reconocer a la vista los tres tipos de acorde de séptima (dominante, sensible, disminuida) ${pos.nombre.toLowerCase()}.`, datePublished: TODAY, dateModified: TODAY, image: { '@type': 'ImageObject', url: SITE + '/assets/img/og-pages/og-ejercicios-acordes-' + slug + '.png' }, provider: { '@type': 'Organization', name: 'Teoría Musical', url: SITE } })}
</script>
<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE + '/' },
  { '@type': 'ListItem', position: 2, name: 'Ejercicios', item: SITE + '/ejercicios/' },
  { '@type': 'ListItem', position: 3, name: 'Acordes', item: SITE + '/ejercicios/acordes/' },
  { '@type': 'ListItem', position: 4, name: h1, item: canonical }
] })}
</script>
<script type="application/ld+json">
${faqJsonLd(faq)}
</script>`;

  const breadcrumbHtml = breadcrumb([
    { name: 'Inicio', url: '/' }, { name: 'Ejercicios Musicales', url: '/ejercicios/' },
    { name: 'Acordes', url: '/ejercicios/acordes/' }, { name: `Séptimas ${pos.nombre}` }
  ]);

  const hermanas = POSICIONES.filter(p => p.id !== pos.id).map(p => `<a href="/ejercicios/acordes/septimas-${posSlugMap[p.id]}/">${p.corto}</a>`).join(', ');
  const construirLink = pos.id === 'todas' ? '/ejercicios/acordes/construir-septimas-mezcladas/' : `/ejercicios/acordes/construir-septima-de-dominante${pos.slug}/`;

  const body = `<p>Se muestra un <strong>acorde de séptima</strong> dibujado en el pentagrama, ${pos.id === 'todas' ? 'en una de sus cuatro posiciones' : pos.nombre.toLowerCase()}. Hay que identificar de qué tipo es: <strong>dominante</strong>, <strong>sensible</strong> (semidisminuida) o <strong>disminuida</strong>.</p>

<h2>Los tres tipos de acorde de séptima</h2>
${tablaComparativa()}

${ad('3473898651')}

<h2>Ejercicio</h2>
<div id="${uid}"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmSe7Engine("${uid}", { inversion: "${pos.id}" });
  });
</script>

<p><strong>Cómo usar el ejercicio:</strong> Se elige uno de los tres tipos posibles y se pulsa Comprobar. La app corrige al momento y, si falla, indica la respuesta correcta.</p>

<p>Otras posiciones: ${hermanas}. Para practicar a escribirlos en vez de reconocerlos, está <a href="${construirLink}">construir acordes de séptima</a>. La teoría completa, en ${TIPOS.map(t => `<a href="${t.dicc}">${t.nombre.toLowerCase()}</a>`).join(', ')}.</p>

${faqBlock(faq)}
${ad('2439863051')}`;

  return { slug, html: pageShell({ title, desc, canonical, h1, breadcrumbHtml, jsonld, body, ogImage: SITE + '/assets/img/og-pages/og-ejercicios-acordes-' + slug + '.png' }) };
}

/* ------------------------------------ generar ------------------------------------ */
const paginas = [];
TIPOS.forEach(tipo => POSICIONES.forEach(pos => paginas.push(paginaConstruirTipo(tipo, pos))));
paginas.push(paginaConstruirMezclada());
POSICIONES.forEach(pos => paginas.push(paginaReconocer(pos)));

let count = 0;
paginas.forEach(p => {
  const dir = path.join(OUT, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), p.html, 'utf8');
  count++;
});
console.log(`Generadas ${count} páginas en ${path.relative(ROOT, OUT)}/`);
paginas.forEach(p => console.log('  ' + p.slug));
