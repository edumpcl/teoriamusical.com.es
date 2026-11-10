/**
 * Shared shell for the English site (/en/).
 * Same CSS and JS as the Spanish site; only the text changes.
 * Terminology: tools/en/GLOSSARY.md (American English, UK terms marked).
 */
const SITE = 'https://www.teoriamusical.com.es';

// Legal pages: English courtesy translations (the Spanish originals are the binding text).
const LEGAL = {
  cookies: { href: '/en/cookie-policy/', label: 'Cookie policy' },
  privacy: { href: '/en/privacy-policy/', label: 'Privacy policy' },
  notice:  { href: '/en/legal-notice/', label: 'Legal notice' },
  about:   { href: '/en/about/', label: 'About' },
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Versioned asset URLs are copied from the Spanish home, so they never drift apart.
function assetVersions(esHomeHtml) {
  const v = name => (esHomeHtml.match(new RegExp(name.replace(/\./g, '\\.') + '\\?v=([0-9a-f]+)')) || [])[1];
  return { css: v('/assets/css/style.css'), consent: v('/assets/js/consent.js'), main: v('/assets/js/main.js') };
}

const NAV = [
  { href: '/en/', label: 'Home' },
  // Sections are added here as each one gets an English version:
  // { href: '/en/music-dictionary/', label: 'Music Dictionary' },
  // { href: '/en/exercises/', label: 'Exercises' },
  // { href: '/en/games/', label: 'Games' },
  { href: '/en/music-dictionary/', label: 'Music Dictionary' },
  { href: '/en/exercises/', label: 'Exercises' },
  { href: '/en/games/', label: 'Games' },
  { href: '/en/tools/', label: 'Tools', sub: [{ href: '/en/tools/metronome/', label: 'Metronome' }, { href: '/en/tools/tuner/', label: 'Tuner' }] },
];

function navHtml(active, items) {
  return items.map(it => {
    const cls = it.href === active ? ' class="is-active"' : '';
    if (it.sub) {
      return `        <li class="tm-has-sub"><a href="${it.href}"${cls}>${esc(it.label)}</a>
        <ul class="tm-subnav">
${it.sub.map(s => `          <li><a href="${s.href}">${esc(s.label)}</a></li>`).join('\n')}
        </ul>
      </li>`;
    }
    return `        <li><a href="${it.href}"${cls}>${esc(it.label)}</a></li>`;
  }).join('\n');
}

const COOKIE_BANNER = `<!-- Cookie consent (GDPR). Same cookie as the Spanish site: the choice carries over. -->
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
    <h2 id="tm-cookie-title">We use cookies</h2>
    <p id="tm-cookie-desc">
      We use our own cookies, which the site needs to work, and third-party cookies
      for traffic analysis and advertising. You can accept them, reject the optional
      ones, or choose which to allow.
      <a href="${LEGAL.cookies.href}" id="tm-privacy-link" rel="noopener noreferrer">${LEGAL.cookies.label}</a>.
    </p>
    <div id="tm-cookie-panel" hidden>
      <div class="tm-toggle-row">
        <div class="tm-toggle-info">
          <strong>Necessary</strong>
          <span>Required for the site to work. They cannot be turned off.</span>
        </div>
        <div class="tm-toggle-wrap tm-toggle-forced">
          <input type="checkbox" id="tm-chk-necessary" checked disabled>
          <label for="tm-chk-necessary" class="tm-switch-label"></label>
        </div>
      </div>
      <div class="tm-toggle-row">
        <div class="tm-toggle-info">
          <strong>Analytics</strong>
          <span>Measure traffic and browsing behavior (Google Analytics 4).</span>
        </div>
        <div class="tm-toggle-wrap">
          <input type="checkbox" id="tm-chk-analytics">
          <label for="tm-chk-analytics" class="tm-switch-label"></label>
        </div>
      </div>
      <div class="tm-toggle-row">
        <div class="tm-toggle-info">
          <strong>Advertising</strong>
          <span>Show ads relevant to your interests (Google AdSense).</span>
        </div>
        <div class="tm-toggle-wrap">
          <input type="checkbox" id="tm-chk-advertising">
          <label for="tm-chk-advertising" class="tm-switch-label"></label>
        </div>
      </div>
    </div>
    <div id="tm-cookie-actions">
      <button id="tm-btn-accept"    class="tm-btn tm-btn-primary">Accept all</button>
      <button id="tm-btn-necessary" class="tm-btn tm-btn-secondary">Necessary only</button>
      <button id="tm-btn-configure" class="tm-btn tm-btn-link">Customize</button>
      <button id="tm-btn-save"      class="tm-btn tm-btn-primary" hidden>Save preferences</button>
    </div>
  </div>
</div>
<button id="tm-cookie-trigger" aria-label="Manage cookies" title="Manage cookies" hidden>
  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18.5" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="14" cy="15" r="2.2" fill="currentColor"/>
    <circle cx="24" cy="13" r="1.7" fill="currentColor"/>
    <circle cx="27" cy="24" r="2.2" fill="currentColor"/>
    <circle cx="16" cy="26" r="1.7" fill="currentColor"/>
    <circle cx="21" cy="20" r="1.1" fill="currentColor"/>
  </svg>
</button>`;

// Consent Mode v2 defaults: identical to the Spanish pages (copied, not reinvented).
const CONSENT_DEFAULTS = `<script>
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
</script>`;

function footerHtml(items) {
  const sections = items.filter(i => i.href !== '/en/');
  return `<footer class="tm-site-footer">
  <div class="tm-container tm-footer-inner">
    <div class="tm-footer-col">
      <h3>Music Theory</h3>
      <p>Music from the ground up: a dictionary, interactive exercises and free tools.</p>
    </div>
    <div class="tm-footer-col">
      <h3>Sections</h3>
      <ul>
${navHtml(null, sections.length ? sections : [{ href: '/en/', label: 'Home' }])}
      </ul>
    </div>
    <div class="tm-footer-col">
      <h3>Information</h3>
      <ul>
        <li><a href="${LEGAL.about.href}">${LEGAL.about.label}</a></li><li><a href="/contacto/">Contact (in Spanish)</a></li>
        <li><a href="${LEGAL.notice.href}">${LEGAL.notice.label}</a></li>
        <li><a href="${LEGAL.privacy.href}">${LEGAL.privacy.label}</a></li>
        <li><a href="${LEGAL.cookies.href}">${LEGAL.cookies.label}</a></li>
      </ul>
    </div>
  </div>
  <div class="tm-footer-bottom">
    <p>© <span id="tm-year"></span> Music Theory — Eduardo Escrig Zomeño. All rights reserved.</p>
  </div>
</footer>`;
}

/**
 * page = { path:'/en/', esPath:'/' | null, title, description, ogImage, jsonld:[objs], extraHead, bodyClass, main }
 * `main` is the HTML inside <main>.
 */
function renderPage(page, ctx) {
  const url = SITE + page.path;
  const og = page.ogImage || '/assets/img/og-pages/og-home.png';
  const live = page.live !== false;
  const hreflang = page.esPath && live
    ? `<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="es" href="${SITE + page.esPath}">
<link rel="alternate" hreflang="x-default" href="${SITE + page.esPath}">
`
    : '';
  const ldList = typeof page.jsonld === 'function' ? page.jsonld(ctx) : (page.jsonld || []);
  const ld = ldList.map(o => `<script type="application/ld+json">\n${JSON.stringify(o)}\n</script>`).join('\n');
  const switcher = page.esPath && live
    ? `\n        <li class="tm-lang"><a href="${page.esPath}" hreflang="es" lang="es" title="Ver esta página en español">Español</a></li>`
    : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
${hreflang}<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:image" content="${SITE + og}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="Music Theory">
<meta name="robots" content="${live ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' : 'noindex, nofollow'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${SITE + og}">
<link rel="icon" href="/assets/img/favicon.png" type="image/png">

<!-- Google Search Console verification -->
<meta name="google-site-verification" content="-bWygyA80PPsmSsmf6FQ_oZs6YeGjN95HzprqD07fos">

<!-- Google Consent Mode v2 — defaults denied until user consents -->
${CONSENT_DEFAULTS}

<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/playfair-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css?v=${ctx.v.css}">
${(page.styles || []).map(f => `<link rel="stylesheet" href="${f}?v=${ctx.assetV(f)}">
`).join('')}
${ld}
${page.extraHead || ''}</head>
<body class="tm-page${page.bodyClass ? ' ' + page.bodyClass : ''}">
<a class="tm-skip" href="#main">Skip to content</a>
${COOKIE_BANNER}
<script src="/assets/js/consent.js?v=${ctx.v.consent}" defer></script>

<header class="tm-site-header">
  <div class="tm-container tm-header-inner">
    <a class="tm-brand" href="/en/">
      <span class="tm-brand-mark"><img src="/assets/img/favicon-32.png" width="32" height="32" alt=""></span>
      <span class="tm-brand-text">Music Theory</span>
    </a>
    <button class="tm-nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="tm-nav">
      <span></span><span></span><span></span>
    </button>
    <nav id="tm-nav" class="tm-nav" aria-label="Main">
      <ul class="tm-nav-list">
${navHtml(page.path, NAV)}${switcher}
      </ul>
    </nav>
  </div>
</header>

<main id="main" class="tm-main">
${page.main}
</main>

${footerHtml(NAV)}

<script src="/assets/js/main.js?v=${ctx.v.main}" defer></script>
</body>
</html>
`;
}

module.exports = { SITE, esc, assetVersions, renderPage, NAV };
