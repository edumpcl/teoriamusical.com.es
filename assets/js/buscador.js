/* Buscador interno de teoriamusical.com.es.
 *
 * Se carga bajo demanda (main.js lo pide al pulsar la lupa de la cabecera o la tecla «/») y también lo usa la página /buscar/ (y /en/search/).
 * Lee un índice estático (assets/search/indice-es.json o indice-en.json, que genera tools/build-search-index.js): título, descripción,
 * encabezados y preguntas frecuentes de cada página. Busca en el navegador, sin servidor ni cookies.
 *
 *   tmBuscador.abrir(q?)        abre la ventana de búsqueda (opcionalmente con una consulta)
 *   tmBuscador.montar(el, q?)   dibuja el buscador dentro de `el` (la página de resultados)
 *   tmBuscador.buscar(q)        → [{ e, puntos }] (para pruebas)
 *
 * Cómo busca: sin tildes ni mayúsculas, con plurales (acorde/acordes), con las palabras de la consulta en cualquier orden (todas deben
 * aparecer; si ninguna página las tiene todas, se muestran las que tienen alguna), con sinónimos de la web (armadura ↔ tonalidad…) y con
 * tolerancia a una letra mal escrita en el título. Pesa más lo que está en el título que en los encabezados, las preguntas o la descripción.
 */
(function () {
  'use strict';

  var INDICE_V = 'c656c421';   // lo escribe tools/build-search-index.js
  var EN = document.documentElement.lang === 'en';
  var T = function (es, en) { return EN ? en : es; };

  /* ------------------------------------------------------------ texto */
  function plegar(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, ' ').replace(/ñ/g, 'n').trim();
  }
  var PARADA = EN ? 'the a an of and or in for to what how is are on with from by'.split(' ')
    : 'de del la el los las un una unos unas y o en para por con que como cual cuales es son se a al lo'.split(' ');
  function raiz(t) { return t.length > 4 ? t.replace(/(es|s)$/, '') : t.replace(/s$/, ''); }

  /* sinónimos: la consulta también busca estas palabras (todo plegado). Solo en un sentido útil; se pueden ampliar sin tocar nada más. */
  var SIN_ES = {
    armadura: ['tonalidad', 'alteraciones'], tonalidad: ['armadura'], armaduras: ['tonalidad'], sensible: ['sensible septima'],
    transpositor: ['transposicion', 'transpone'], transpositores: ['transposicion'], transposicion: ['transpositor'], transponer: ['transposicion'],
    solfeo: ['lectura', 'entonacion'], entonacion: ['cantar'], cifrado: ['cifras', 'romano'], romano: ['cifrado'], romanos: ['cifrado'],
    funciones: ['tonica', 'dominante', 'subdominante'], metronomo: ['tempo', 'pulso'], afinar: ['afinador'], afinador: ['afinar'], ritmo: ['figuras', 'compas'],
    figuras: ['ritmo'], acorde: ['triada'], acordes: ['triadas'], triada: ['acorde'], triadas: ['acordes'], septima: ['acorde septima'], intervalo: ['distancia'],
    intervalos: ['distancia'], escala: ['modo'], escalas: ['modos'], modo: ['escala'], modos: ['escalas'], pentagrama: ['clave'], clave: ['pentagrama'], claves: ['pentagrama'],
    dinamica: ['matiz', 'forte', 'piano'], matices: ['dinamica'], tempo: ['movimiento', 'metronomo', 'agogica'], agogica: ['tempo'], ornamento: ['adorno'],
    ornamentos: ['adornos', 'trino', 'mordente', 'apoyatura'], adorno: ['ornamento'], adornos: ['ornamentos'], frase: ['periodo'], oposiciones: ['plazas'],
    conciertos: ['agenda'], banda: ['bandas'], violin: ['cuerda'], flauta: ['viento madera'], trompeta: ['viento metal'], guitarra: ['cuerda pulsada'],
    percusion: ['timbales', 'bateria'], armonia: ['acordes', 'enlaces'], cadencia: ['cadencias'], modulacion: ['modular'], compas: ['compases'], solfear: ['solfeo']
  };
  var SIN_EN = {
    transposing: ['transpose'], transposition: ['transposing'], 'key': ['tonality'], tonality: ['key'], roman: ['figures'], figures: ['roman'], solfege: ['sight singing'],
    tuner: ['tuning'], tuning: ['tuner'], metronome: ['tempo'], chord: ['triad'], chords: ['triads'], triad: ['chord'], triads: ['chords'], seventh: ['seventh chord'],
    scale: ['mode'], scales: ['modes'], mode: ['scale'], dynamics: ['forte', 'piano'], ornament: ['grace note', 'trill'], ornaments: ['trill'], rhythm: ['note values']
  };
  var SIN = EN ? SIN_EN : SIN_ES;

  /* ------------------------------------------------------------ índice */
  var indice = null, cargando = null;
  function cargar() {
    if (indice) return Promise.resolve(indice);
    if (cargando) return cargando;
    cargando = fetch('/assets/search/indice-' + (EN ? 'en' : 'es') + '.json?v=' + INDICE_V).then(function (r) { return r.json(); }).then(function (lista) {
      lista.forEach(function (e) {
        e.ft = plegar(e.t + ' ' + (e.h || ''));
        e.pt = e.ft.split(' ');
        e.fc = plegar(e.c); e.fq = plegar(e.q); e.fd = plegar(e.d);
      });
      indice = lista; return lista;
    });
    return cargando;
  }

  /* distancia de edición ≤ 1 (una letra de más, de menos o cambiada): para erratas en el título */
  function casi(a, b) {
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    var i = 0, j = 0, dif = 0;
    while (i < la && j < lb) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++dif > 1) return false;
      if (la > lb) i++; else if (lb > la) j++; else { i++; j++; }
    }
    return dif + (la - i) + (lb - j) <= 1;
  }

  var PESO = { t: [12, 8, 4], c: [4, 3, 1.5], q: [2.5, 2, 1], d: [2.5, 2, 1] };
  var SECCION_PESO = { teoria: 1, ejercicio: 0.95, herramienta: 1.05, juego: 0.85, blog: 0.8, compositor: 0.9, agenda: 0.8, laboratorio: 0.7, otro: 0.8 };

  function puntuaCampo(campo, alt, w) {
    if (!campo) return 0;
    var t = ' ' + campo + ' ', r = raiz(alt);
    if (t.indexOf(' ' + alt + ' ') >= 0 || (r !== alt && t.indexOf(' ' + r + ' ') >= 0)) return w[0];
    if (r.length >= 3 && t.indexOf(' ' + r) >= 0) return w[1];
    if (r.length >= 4 && campo.indexOf(r) >= 0) return w[2];
    return 0;
  }
  function puntuaToken(e, alts, fuzzy) {
    var mejor = 0;
    for (var k = 0; k < alts.length; k++) {
      var a = alts[k], s = puntuaCampo(e.ft, a, PESO.t) + puntuaCampo(e.fc, a, PESO.c) + puntuaCampo(e.fq, a, PESO.q) + puntuaCampo(e.fd, a, PESO.d);
      if (s > mejor) mejor = s;
    }
    if (!mejor && fuzzy) {
      var r = raiz(alts[0]);
      for (var i = 0; i < e.pt.length; i++) if (e.pt[i].length >= 4 && casi(raiz(e.pt[i]), r)) return 5;
    }
    return mejor;
  }

  function buscar(q) {
    if (!indice) return [];
    var f = plegar(q);
    if (!f) return [];
    var toks = f.split(' ').filter(function (t) { return t && PARADA.indexOf(t) < 0; });
    if (!toks.length) toks = f.split(' ').filter(Boolean);
    var altsDe = toks.map(function (t) {
      var alts = [t]; (SIN[t] || []).forEach(function (s) { plegar(s).split(' ').length > 1 ? alts.push(plegar(s)) : alts.push(plegar(s)); }); return alts;
    });
    /* una palabra que no aparece en NINGUNA página (p. ej. «sonata» mientras no la tengamos) no debe arrastrar resultados de las otras
       («forma» está en medio centenar de títulos): con dos palabras o menos, sin resultados; con más, se ignora la que no existe */
    var df = toks.map(function (t, i) { var c = 0; for (var j = 0; j < indice.length; j++) if (puntuaToken(indice[j], altsDe[i], t.length >= 5) > 0) c++; return c; });
    if (df.indexOf(0) >= 0) {
      if (toks.length <= 2) { var vacio = []; vacio.parcial = false; return vacio; }
      var t2 = [], a2 = [];
      toks.forEach(function (t, i) { if (df[i] > 0) { t2.push(t); a2.push(altsDe[i]); } });
      toks = t2; altsDe = a2;
      if (!toks.length) { var v2 = []; v2.parcial = false; return v2; }
    }
    function pasada(exigirTodos) {
      var out = [];
      indice.forEach(function (e) {
        var total = 0, aciertos = 0;
        for (var i = 0; i < toks.length; i++) {
          var s = puntuaToken(e, altsDe[i], toks[i].length >= 5);
          if (s > 0) { aciertos++; total += s; }
        }
        if (!aciertos || (exigirTodos && aciertos < toks.length)) return;
        if (!exigirTodos) total *= aciertos / toks.length;
        if (e.ft.indexOf(f) >= 0) total += 10;
        if (e.ft.indexOf(toks[0]) === 0) total += 3;
        total *= SECCION_PESO[e.s] || 1;
        out.push({ e: e, puntos: total });
      });
      out.sort(function (a, b) { return b.puntos - a.puntos || a.e.u.length - b.e.u.length; });
      return out;
    }
    var res = pasada(true);
    res.parcial = false;
    if (!res.length && toks.length > 1) { res = pasada(false); res.parcial = true; }
    return res;
  }

  /* --------------------------------------------------------------- UI */
  var SECCIONES = EN
    ? { teoria: 'Theory', ejercicio: 'Exercises', herramienta: 'Tools', juego: 'Games', blog: 'Blog', compositor: 'Composers', agenda: 'Agenda', laboratorio: 'Laboratory', otro: 'Other' }
    : { teoria: 'Teoría', ejercicio: 'Ejercicios', herramienta: 'Herramientas', juego: 'Juegos', blog: 'Blog', compositor: 'Compositores', agenda: 'Agenda y oposiciones', laboratorio: 'Laboratorio', otro: 'Otras páginas' };
  var SUGERENCIAS = EN ? ['scales', 'intervals', 'chords', 'key signatures', 'metronome', 'tuner', 'transposing instruments', 'cadences']
    : ['escalas', 'intervalos', 'acordes', 'armaduras', 'metrónomo', 'afinador', 'transpositores', 'cadencias'];
  var PAGINA_BUSCAR = EN ? '/en/search/' : '/buscar/';

  var CSS = [
    '.tm-bq{position:fixed;inset:0;z-index:10000;display:flex;align-items:flex-start;justify-content:center;padding:7vh 12px 12px}',
    '.tm-bq[hidden]{display:none}',
    '.tm-bq-fondo{position:absolute;inset:0;background:rgba(26,18,8,.55)}',
    '.tm-bq-caja{position:relative;width:min(680px,100%);max-height:84vh;display:flex;flex-direction:column;background:var(--bg,#fffdf8);color:var(--text,#1a1208);border:1px solid var(--border,#e8e0cc);border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.35);overflow:hidden}',
    '.tm-bq-form{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--border,#e8e0cc)}',
    '.tm-bq-lupa{flex:none;color:#8b6914}',
    '.tm-bq-in{flex:1;min-width:0;font:inherit;font-size:1.1rem;padding:8px 6px;border:0;outline:0;background:transparent;color:inherit}',
    '.tm-bq-in::-webkit-search-cancel-button{display:none}',
    '.tm-bq-x{flex:none;border:0;background:none;font-size:1.7rem;line-height:1;cursor:pointer;color:inherit;min-width:44px;min-height:44px;border-radius:8px}',
    '.tm-bq-x:hover{background:var(--bg-alt,#f5f2ea)}',
    '.tm-bq-aviso{padding:6px 16px 0;font-size:.85rem;color:var(--text-muted,#6b5b45);min-height:1.2em}',
    '.tm-bq-res{overflow:auto;padding:4px 8px 10px;flex:1}',
    '.tm-bq-grupo{font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#6b5210;padding:10px 8px 4px}',
    '.tm-bq-op{display:block;padding:9px 10px;border-radius:9px;color:inherit;text-decoration:none;border:1px solid transparent}',
    '.tm-bq-op:hover,.tm-bq-op[aria-selected="true"]{background:#fff8ee;border-color:#e8d9b0;text-decoration:none}',
    '.tm-bq-tit{display:block;font-weight:700;font-size:1rem}',
    '.tm-bq-desc{display:block;font-size:.88rem;color:var(--text-muted,#514232);margin-top:2px;line-height:1.4}',
    '.tm-bq-nada{padding:18px 12px;color:var(--text-muted,#514232)}',
    '.tm-bq-sug{display:flex;flex-wrap:wrap;gap:8px;padding:6px 8px 12px}',
    '.tm-bq-chip{font:inherit;font-size:.92rem;border:1px solid #d8d0b8;background:#faf7f2;border-radius:999px;padding:8px 14px;min-height:44px;cursor:pointer;color:inherit}',
    '.tm-bq-chip:hover{border-color:#8b6914;background:#fff8ee}',
    '.tm-bq-pie{display:flex;flex-wrap:wrap;gap:6px 14px;justify-content:space-between;padding:8px 16px;border-top:1px solid var(--border,#e8e0cc);font-size:.8rem;color:var(--text-muted,#6b5b45);background:var(--bg-alt,#f8f5ee)}',
    '.tm-bq-pie a{color:#6b5210;font-weight:700}',
    '.tm-bq :focus-visible{outline:3px solid #1f5fa6;outline-offset:2px}',
    '.tm-bq-pagina .tm-bq-caja{position:static;width:100%;max-height:none;box-shadow:none}',
    '.tm-bq-pagina .tm-bq-res{overflow:visible}',
    '@media(max-width:560px){.tm-bq{padding-top:2vh}.tm-bq-pie .tm-bq-teclas{display:none}}'
  ].join('');
  function css() {
    if (document.getElementById('tm-bq-css')) return;
    var st = document.createElement('style'); st.id = 'tm-bq-css'; st.textContent = CSS; document.head.appendChild(st);
  }

  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var LUPA = '<svg class="tm-bq-lupa" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  function cuerpo(pagina) {
    return '<div class="tm-bq-caja">'
      + '<form class="tm-bq-form" role="search" action="' + PAGINA_BUSCAR + '" method="get">' + LUPA
      + '<input type="search" name="q" class="tm-bq-in" placeholder="' + T('Busca teoría, ejercicios, herramientas…', 'Search theory, exercises, tools…') + '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="' + T('Buscar en la web', 'Search the site') + '" aria-controls="tm-bq-res' + (pagina ? '-p' : '') + '" role="combobox" aria-expanded="true" aria-autocomplete="list">'
      + (pagina ? '' : '<button type="button" class="tm-bq-x" data-cerrar aria-label="' + T('Cerrar', 'Close') + '">×</button>')
      + '</form>'
      + '<div class="tm-bq-aviso" aria-live="polite"></div>'
      + '<div class="tm-bq-res" id="tm-bq-res' + (pagina ? '-p' : '') + '" role="listbox" aria-label="' + T('Resultados', 'Results') + '"></div>'
      + (pagina ? '' : '<div class="tm-bq-pie"><span class="tm-bq-teclas">' + T('↑ ↓ para moverte · Intro para abrir · Esc para cerrar', '↑ ↓ to move · Enter to open · Esc to close') + '</span><a class="tm-bq-todos" href="' + PAGINA_BUSCAR + '">' + T('Ver todos los resultados', 'See all results') + '</a></div>')
      + '</div>';
  }

  /* Un buscador (en la ventana o en la página): enlaza la caja, la lista y el teclado */
  function enlazar(raiz, opc) {
    var entrada = raiz.querySelector('.tm-bq-in'), lista = raiz.querySelector('.tm-bq-res'), aviso = raiz.querySelector('.tm-bq-aviso');
    var todos = raiz.querySelector('.tm-bq-todos');
    var activo = -1, ops = [], idle = null, ultimoEnviado = '';
    var MAX_GRUPO = opc.pagina ? 40 : 6, MAX_TOTAL = opc.pagina ? 80 : 14;

    function dibujaSugerencias() {
      lista.innerHTML = '<div class="tm-bq-grupo" role="presentation">' + T('Prueba con', 'Try') + '</div><div class="tm-bq-sug">'
        + SUGERENCIAS.map(function (s) { return '<button type="button" class="tm-bq-chip" data-q="' + esc(s) + '">' + esc(s) + '</button>'; }).join('') + '</div>';
      aviso.textContent = ''; ops = []; activo = -1; entrada.removeAttribute('aria-activedescendant');
    }

    function marcar(i) {
      ops.forEach(function (o, k) { o.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
      activo = i;
      if (i >= 0 && ops[i]) { entrada.setAttribute('aria-activedescendant', ops[i].id); ops[i].scrollIntoView({ block: 'nearest' }); } else entrada.removeAttribute('aria-activedescendant');
    }

    function pinta(q) {
      var res = buscar(q);
      if (todos) todos.href = PAGINA_BUSCAR + '?q=' + encodeURIComponent(q);
      if (!res.length) {
        lista.innerHTML = '<div class="tm-bq-nada">' + T('No hay resultados para «' + esc(q) + '». Prueba con otra palabra (por ejemplo «escala», «acorde» o «ritmo»).', 'No results for “' + esc(q) + '”. Try another word (for example “scale”, “chord” or “rhythm”).') + '</div>';
        aviso.textContent = T('Sin resultados', 'No results'); ops = []; activo = -1; entrada.removeAttribute('aria-activedescendant'); return;
      }
      var grupos = {}, orden = [];
      res.forEach(function (r) { if (!grupos[r.e.s]) { grupos[r.e.s] = []; orden.push(r.e.s); } grupos[r.e.s].push(r); });
      var html = '', n = 0;
      orden.forEach(function (s) {
        var items = grupos[s].slice(0, MAX_GRUPO);
        if (n >= MAX_TOTAL) return;
        html += '<div class="tm-bq-grupo" role="presentation">' + SECCIONES[s] + (grupos[s].length > items.length ? ' · ' + grupos[s].length : '') + '</div>';
        items.forEach(function (r) {
          if (n >= MAX_TOTAL) return;
          var d = r.e.d || ''; if (d.length > 140) d = d.slice(0, 137).replace(/\s+\S*$/, '') + '…';
          html += '<a class="tm-bq-op" role="option" aria-selected="false" id="tm-bq-o' + (opc.pagina ? 'p' : '') + n + '" href="' + esc(r.e.u) + '"><span class="tm-bq-tit">' + esc(r.e.t) + '</span>' + (d ? '<span class="tm-bq-desc">' + esc(d) + '</span>' : '') + '</a>';
          n++;
        });
      });
      lista.innerHTML = html;
      ops = [].slice.call(lista.querySelectorAll('.tm-bq-op')); activo = -1; entrada.removeAttribute('aria-activedescendant');
      aviso.textContent = (res.parcial ? T('Ninguna página tiene todas las palabras; estas tienen alguna. ', 'No page has every word; these have some. ') : '') + T(res.length + (res.length === 1 ? ' resultado' : ' resultados'), res.length + (res.length === 1 ? ' result' : ' results'));
    }

    function actualiza() {
      var q = entrada.value.trim();
      if (opc.pagina && window.history && history.replaceState) history.replaceState(null, '', q ? PAGINA_BUSCAR + '?q=' + encodeURIComponent(q) : PAGINA_BUSCAR);
      if (!q) { dibujaSugerencias(); if (todos) todos.href = PAGINA_BUSCAR; return; }
      cargar().then(function () { if (entrada.value.trim() === q) pinta(q); }, function () { aviso.textContent = T('No se ha podido cargar el buscador. Recarga la página.', 'The search could not be loaded. Reload the page.'); });
      clearTimeout(idle);
      if (q.length >= 3) idle = setTimeout(function () {   // un evento de búsqueda por consulta (solo el término; sin datos personales)
        if (q !== ultimoEnviado && typeof window.gtag === 'function') { ultimoEnviado = q; window.gtag('event', 'search', { search_term: q.slice(0, 60) }); }
      }, 1500);
    }

    entrada.addEventListener('input', actualiza);
    raiz.querySelector('form').addEventListener('submit', function (e) {
      if (opc.pagina) { e.preventDefault(); return; }
      e.preventDefault(); var o = ops[activo >= 0 ? activo : 0]; if (o) location.href = o.getAttribute('href');
    });
    entrada.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (ops.length) marcar(Math.min(ops.length - 1, activo + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (ops.length) marcar(Math.max(-1, activo - 1)); }
      else if (e.key === 'Enter' && opc.pagina && ops.length) { e.preventDefault(); location.href = ops[Math.max(0, activo)].getAttribute('href'); }
    });
    lista.addEventListener('click', function (e) {
      var c = e.target.closest ? e.target.closest('.tm-bq-chip') : null;
      if (c) { entrada.value = c.getAttribute('data-q'); actualiza(); entrada.focus(); }
    });
    cargar();   // se anticipa: para cuando se teclee, el índice ya está
    if (opc.q) entrada.value = opc.q;
    actualiza();
    return { entrada: entrada, poner: function (q) { entrada.value = q; actualiza(); } };
  }

  /* --------------------------------------------------- ventana (overlay) */
  var vent = null, previo = null;
  function abrir(q) {
    css();
    previo = document.activeElement;
    if (!vent) {
      var d = document.createElement('div');
      d.className = 'tm-bq'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.setAttribute('aria-label', T('Buscar en la web', 'Search the site'));
      d.innerHTML = '<div class="tm-bq-fondo" data-cerrar></div>' + cuerpo(false);
      document.body.appendChild(d);
      vent = { el: d, b: enlazar(d, { pagina: false, q: q || '' }) };
      d.addEventListener('click', function (e) { var t = e.target; if (t && t.closest && t.closest('[data-cerrar]')) cerrar(); else if (t && t.closest && t.closest('a.tm-bq-op')) { /* sigue el enlace */ } });
      d.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); cerrar(); return; }
        if (e.key === 'Tab') {   // el foco no se escapa de la ventana
          var f = [].slice.call(d.querySelectorAll('input, button, a[href]')).filter(function (x) { return x.offsetParent !== null; });
          if (!f.length) return;
          var p = f[0], u = f[f.length - 1];
          if (e.shiftKey && document.activeElement === p) { e.preventDefault(); u.focus(); } else if (!e.shiftKey && document.activeElement === u) { e.preventDefault(); p.focus(); }
        }
      });
    } else if (typeof q === 'string') vent.b.poner(q);
    vent.el.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    vent.b.entrada.focus(); vent.b.entrada.select();
  }
  function cerrar() {
    if (!vent || vent.el.hidden) return;
    vent.el.hidden = true;
    document.documentElement.style.overflow = '';
    if (previo && previo.focus) previo.focus();
  }

  /* ------------------------------------------------ página de resultados */
  function montar(el, q) {
    css();
    el.className = (el.className ? el.className + ' ' : '') + 'tm-bq-pagina';
    el.innerHTML = cuerpo(true);
    if (q === undefined) { var m = /[?&]q=([^&]*)/.exec(location.search); q = m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : ''; }
    var b = enlazar(el, { pagina: true, q: q });
    if (!q) b.entrada.focus();
    return b;
  }

  window.tmBuscador = { abrir: abrir, cerrar: cerrar, montar: montar, buscar: buscar, cargar: cargar, _plegar: plegar };
  if (typeof module === 'object' && module.exports) module.exports = window.tmBuscador;
})();
