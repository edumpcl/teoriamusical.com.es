// English home. Live since the first tool (the metronome) has an English page.
// `live:false` would keep a page out of Google (noindex, no hreflang, no selector, not in the sitemap).
module.exports = {
  path: '/en/',
  esPath: '/',
  live: true,
  bodyClass: 'is-home',
  ogImage: '/assets/img/og-pages/og-en-home.png',
  title: 'Music Theory | Learn Music from the Ground Up — Free',
  description: 'A free music dictionary, interactive exercises and tools such as a metronome and a tuner. No sign-up, with real staff notation.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'WebSite',
      name: 'Music Theory', url: 'https://www.teoriamusical.com.es/en/',
      description: 'A free music dictionary, interactive exercises and tools such as a metronome and a tuner. No sign-up, with real staff notation.',
      inLanguage: 'en',
      publisher: { '@type': 'Organization', name: 'Teoría Musical', url: 'https://www.teoriamusical.com.es' },
    },
  ],
  main: `
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

<div class="tm-hero">
  <div class="tm-hero-grid">
    <div class="tm-hero-izquierda">
      <p class="tm-hero-eyebrow">Music Theory Online</p>
      <h1 class="tm-hero-titulo">Music from the ground up</h1>
      <p class="tm-hero-bajada">Interactive exercises, games and step-by-step guides, all on a real staff. Free, with no sign-up.</p>
      <div class="tm-hero-btn-row">
        <a href="/en/tools/metronome/" class="tm-btn tm-btn-dorado">Try the metronome</a>
        <a href="/en/tools/tuner/" class="tm-btn tm-btn-outline">Tune your instrument</a>
        <a href="/en/tools/" class="tm-btn tm-btn-outline">All tools</a>
      </div>
    </div>
    <div class="tm-hero-derecha">
      <div class="tm-hero-card">
        <p class="tm-hero-card-label">★ In progress</p>
        <h2 class="tm-hero-card-titulo">The English edition is being built</h2>
        <p class="tm-hero-card-desc">The site started in Spanish. Each section is being rewritten in English, not machine-translated, starting with the tools.</p>
      </div>
    </div>
  </div>
</div>

<section class="tm-seccion">
  <div class="tm-seccion-inner">
    <div class="tm-seccion-cabecera tm-seccion-cabecera--between">
      <h2 class="tm-seccion-titulo">Free <span>Tools</span></h2>
      <a href="/en/tools/" class="tm-btn tm-btn-outline">See all →</a>
    </div>
    <div class="tm-grid-diccionario">
      <a href="/en/tools/metronome/" class="tm-card-dic">
        <div class="tm-card-dic-icono">♩</div>
        <div class="tm-card-dic-titulo">Online Metronome</div>
        <div class="tm-card-dic-desc">A free metronome with a drum machine, tap tempo, odd meters such as 7/8 and a speed trainer.</div>
      </a>
      <a href="/en/tools/tuner/" class="tm-card-dic">
        <div class="tm-card-dic-icono">🎵</div>
        <div class="tm-card-dic-titulo">Online Tuner</div>
        <div class="tm-card-dic-desc">A free chromatic tuner for guitar, violin, ukulele, winds and more. It uses your microphone.</div>
      </a>
    </div>
    <p class="tm-seccion-pie">The dictionary, the exercises and the games are in Spanish for now. <a href="/" hreflang="es" lang="es">Ver la web en español</a>.</p>
  </div>
</section>

  </article>
</div>`,
};
