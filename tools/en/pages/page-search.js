const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/search/',
  esPath: '/buscar/',
  title: 'Search Music Theory',
  description: 'Search the music dictionary, exercises, tools, games and blog of Music Theory.',
  h1: 'Search the site',
  crumbs: [],
  noindex: true,
  scripts: ['buscador'],
  body: `<p>Type what you are looking for: theory, exercises, tools, games or blog articles. The search ignores accents and capital letters, understands plurals and some synonyms (for example “key signature” and “tonality”) and forgives one misspelled letter.</p>

<div id="tmbuscar"></div>

<noscript><p>The search needs JavaScript. In the meantime you can browse the <a href="/diccionario-musical/">music dictionary</a>, the <a href="/ejercicios/">exercises</a>, the <a href="/herramientas/">tools</a>, the <a href="/juegos/">games</a> or the <a href="/blog/">blog</a>.</p></noscript>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmBuscador) tmBuscador.montar(document.getElementById('tmbuscar'));
  });
</script>
`,
});
