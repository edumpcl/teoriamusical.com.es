const INSTRUMENTS = require('../instruments');
// /en/tools/ — hub. Lists only tools that have an English page.
module.exports = {
  path: '/en/tools/',
  esPath: '/herramientas/',
  lastmod: '2026-11-05',
  ogImage: '/assets/img/og-pages/og-en-tools.png',
  title: 'Free Online Music Tools — Metronome & Tuner',
  description: 'Free online music tools that run in your browser: a metronome with a drum machine, tap tempo and a speed trainer, and a chromatic tuner. No install, no sign-up.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.teoriamusical.com.es/en/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.teoriamusical.com.es/en/tools/' },
      ],
    },
  ],
  main: `
  <nav class="tm-breadcrumb" aria-label="Breadcrumb">
    <div class="tm-container">
      <a href="/en/">Home</a><span class="tm-crumb-sep">›</span><span aria-current="page">Tools</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>Free Online Music Tools</h1><p class="tm-page-header-sub">They run in your browser. No install, no sign-up.</p></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

<div class="tm-grid-diccionario">
  <a href="/en/tools/metronome/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♩</div>
    <div class="tm-card-dic-titulo">Online Metronome</div>
    <div class="tm-card-dic-desc">A free metronome with a drum machine, tap tempo, odd meters such as 7/8 and a speed trainer. It works on your phone.</div>
  </a>
  <a href="/en/tools/tuner/" class="tm-card-dic">
    <div class="tm-card-dic-icono">🎵</div>
    <div class="tm-card-dic-titulo">Online Tuner</div>
    <div class="tm-card-dic-desc">A free chromatic tuner for guitar, violin, ukulele, winds and more. It uses your microphone and handles transposing instruments.</div>
  </a>
</div>

<h2>Tuners by instrument</h2>
<div class="tm-grid-diccionario">
${INSTRUMENTS.map(i => `  <a href="/en/tools/tuner/${i.slug}/" class="tm-card-dic"><div class="tm-card-dic-titulo">${i.label}</div><div class="tm-card-dic-desc">${i.desc}.</div></a>`).join('\n')}
</div><div class="tm-card-dic-desc">E-A-D-G-B-E and alternate tunings.</div></a>
  <a href="/en/tools/tuner/ukulele/" class="tm-card-dic"><div class="tm-card-dic-titulo">Ukulele tuner</div><div class="tm-card-dic-desc">G-C-E-A for soprano, concert and tenor; D-G-B-E for baritone.</div></a>
  <a href="/en/tools/tuner/violin/" class="tm-card-dic"><div class="tm-card-dic-titulo">Violin tuner</div><div class="tm-card-dic-desc">G-D-A-E with an adjustable A4.</div></a>
  <a href="/en/tools/tuner/bass/" class="tm-card-dic"><div class="tm-card-dic-titulo">Bass guitar tuner</div><div class="tm-card-dic-desc">E-A-D-G for 4-string bass, with tips for 5 strings.</div></a>
</div>

  </article>
</div>`,
};
