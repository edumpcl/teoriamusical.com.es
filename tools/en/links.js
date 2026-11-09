// Link rewriting for the English pages that opt in with `rewriteLinks: true` (the dictionary and,
// later, the exercises). A page module keeps the SPANISH hrefs of the original; this turns each one
// into the English page that translates it, and drops the link (keeping its text) when that page does
// not exist yet. Re-running the build links it automatically once the English page is written.
const ES_SECTIONS = /^\/(diccionario-musical|ejercicios|juegos|herramientas|blog|agenda|agenda-conciertos-bandas-orquestas|oposiciones-de-musica|tecnico-especialista-en-laboratorio|sobre-mi|contacto|aviso-legal|politica-de-cookies|politica-de-privacidad)(\/|$)/;

function buildMap(pages) {
  const map = {};
  for (const pg of pages) if (pg.esPath && pg.live !== false) map[pg.esPath] = pg.path;
  map['/'] = '/en/';
  return map;
}

function rewrite(html, map) {
  return html.replace(/<a\b([^>]*?)\bhref="(\/[^"#?]*)([#?][^"]*)?"([^>]*)>([\s\S]*?)<\/a>/g, (all, pre, href, tail, post, inner) => {
    if (/hreflang="es"/.test(pre + post)) return all;            // explicit link to the Spanish original
    if (href.startsWith('/en/') || href.startsWith('/assets/')) return all;
    const key = href.endsWith('/') || /\.[a-z0-9]+$/i.test(href) ? href : href + '/';
    if (map[key]) return `<a${pre}href="${map[key]}${tail || ''}"${post}>${inner}</a>`;
    if (ES_SECTIONS.test(href) || href === '/') {                // a Spanish page with no English version yet
      // a whole card (class tm-fam-tarjeta, tm-card-dic…) keeps its box: it becomes a <div>, not bare text
      const card = (pre + post).match(/class="([^"]*tm-[a-z-]*(?:tarjeta|card)[a-z-]*[^"]*)"/);
      return card ? `<div class="${card[1]}">${inner}</div>` : inner;
    }
    return all;
  });
}

module.exports = { buildMap, rewrite };
