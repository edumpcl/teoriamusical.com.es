// Shell shared by the three English legal pages. They are courtesy translations of the Spanish
// originals, which are the binding text (Spanish law applies). Each page says so at the top.
module.exports = function legalPage({ path, esPath, title, description, h1, crumb, body, lastmod }) {
  return {
    path, esPath, lastmod: lastmod || '2026-11-05', title, description,
    ogImage: '/assets/img/og-pages/og-en-home.png',
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.teoriamusical.com.es/en/' },
        { '@type': 'ListItem', position: 2, name: crumb, item: 'https://www.teoriamusical.com.es' + path },
      ],
    }],
    main: `
  <nav class="tm-breadcrumb" aria-label="Breadcrumb">
    <div class="tm-container">
      <a href="/en/">Home</a><span class="tm-crumb-sep">›</span><span aria-current="page">${crumb}</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>${h1}</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

<p><em>This page is an English translation, provided for convenience. The <a href="${esPath}" hreflang="es" lang="es">Spanish original</a> is the legally binding text, and Spanish law applies.</em></p>

${body}

  </article>
</div>`,
  };
};
