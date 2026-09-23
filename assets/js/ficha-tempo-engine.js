/* Generador de fichas de tempo y agógica para imprimir, con botón «otra ficha».
   Uso: <div id="tmft"></div><script>tmFichaTempo('tmft');</script>

   Es la versión en el navegador de la ficha en PDF (tools/generate-fichas-
   tempo.js): mismas dos partes (unir término-significado; ordenar
   velocidades), reutilizando window.tmTempoEjercicios (VELOCIDADES, AGOGICA,
   generar), pero generando una hoja NUEVA cada vez que se pulsa el botón.
   Aquí no hace falta llevar la cuenta de «ya usados» como en cadencias: el
   motor ya reparte términos y series al azar sobre una lista bastante amplia
   (12 de 18 términos, series de 4 sobre un puñado de términos posibles cada
   una), así que la probabilidad de que dos fichas salgan calcadas es mínima
   sin necesidad de rastrear nada.
   Mismo patrón de impresión que fichas-acordes-engine.js: se clona la hoja
   como hija directa de <body> antes de window.print(). */
(function () {
  'use strict';

  function M() { return window.tmTempoEjercicios; }
  var LETRAS = 'abcdefghijklmnopqrstuvwxyz'.split('');

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function barajar(arr, rnd) {
    var c = arr.slice();
    for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
    return c;
  }
  // Misma construcción que unir() en tools/generate-fichas-tempo.js.
  function unir(semilla) {
    var Mo = M();
    var vel = barajar(Mo.VELOCIDADES, mulberry32(semilla)).slice(0, 6);
    var ago = barajar(Mo.AGOGICA, mulberry32(semilla + 1)).slice(0, 6);
    var terminos = barajar(vel.concat(ago), mulberry32(semilla + 2));
    var significados = barajar(terminos, mulberry32(semilla + 3));
    return {
      terminos: terminos.map(function (x, i) {
        var letra = LETRAS[significados.findIndex(function (y) { return y.t === x.t; })];
        return { n: i + 1, t: x.t, letra: letra };
      }),
      significados: significados.map(function (x, i) { return { letra: LETRAS[i], sig: x.sig }; })
    };
  }

  var CSS = [
    '.tm-ft{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-ft::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-ft-acciones{display:flex;flex-wrap:wrap;gap:10px;}',
    '.tm-ft-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-ft-btn-1{background:#8b6914;color:#fff;}',
    '.tm-ft-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-ft-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-ft-hoja{margin-top:18px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-ft-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-ft-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-ft-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-ft-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-ft-datos{display:none;}',
    '.tm-ft-h2{font-size:.95rem;font-weight:700;color:#8b6914;margin:14px 0 7px;}',
    '.tm-ft-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px;}',
    '@media (max-width:480px){.tm-ft-cols{grid-template-columns:1fr;}}',
    '.tm-ft-lista{margin:0;padding:0;list-style:none;}',
    '.tm-ft-lista li{font-size:.88rem;padding:4px 0;border-bottom:1px dotted #ddd;display:flex;align-items:baseline;gap:7px;}',
    '.tm-ft-num{color:#9a7b28;font-weight:700;min-width:16px;}',
    '.tm-ft-hueco{display:inline-block;min-width:26px;border-bottom:1px solid #9a9a9a;text-align:center;}',
    '.tm-ft-val{color:#c0392b;font-weight:700;border:0;}',
    '.tm-ft-sig li{font-size:.85rem;}',
    '.tm-ft-let{color:#9a7b28;font-weight:700;min-width:16px;}',
    '.tm-ft-series{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;}',
    '@media (max-width:480px){.tm-ft-series{grid-template-columns:1fr;}}',
    '.tm-ft-serie{border:1px solid #e8e0cc;border-radius:6px;padding:6px 9px;break-inside:avoid;}',
    '.tm-ft-serie p{margin:0 0 4px;font-size:.82rem;color:#555;}',
    '.tm-ft-fichas{display:flex;flex-wrap:wrap;gap:6px;}',
    '.tm-ft-ficha{border:1px solid #d8d0b8;border-radius:5px;padding:3px 7px;font-size:.85rem;display:flex;align-items:center;gap:5px;}',
    '.tm-ft-caja{display:inline-block;width:16px;height:15px;border:1px solid #9a9a9a;border-radius:3px;text-align:center;font-size:.8rem;line-height:14px;}',
    '.tm-ft-caja.tm-val{color:#c0392b;font-weight:700;border-color:#c0392b;}',
    '@media screen{.tm-ft-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-ft-print > *:not(.tm-ft-impresion){display:none!important;}',
    '  body.tm-ft-print .tm-ft-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-ft-print .tm-ft-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:6px 0 8px;}',
    '  body.tm-ft-print .tm-ft-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  window.tmFichaTempo = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !M()) return;
    if (!document.getElementById('tm-ft-css')) {
      var st = document.createElement('style');
      st.id = 'tm-ft-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var semilla = 0, solucion = false;

    cont.innerHTML = '<div class="tm-ft">'
      + '<div class="tm-ft-acciones">'
      + '<button type="button" class="tm-ft-btn tm-ft-btn-1" data-a="generar">Generar otra ficha</button>'
      + '<button type="button" class="tm-ft-btn tm-ft-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-ft-btn tm-ft-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<p class="tm-ft-enlace"></p>'
      + '</div>'
      + '<div class="tm-ft-hoja"><div class="tm-ft-cab"><p class="tm-ft-tit">Tempo y agógica</p><span class="tm-ft-ref"></span></div>'
      + '<div class="tm-ft-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-ft-instr">Primera parte: escribe al lado de cada término la letra de su significado. Segunda parte: numera cada serie según el orden que se pide.</p>'
      + '<div class="tm-ft-cuerpo"></div></div>';

    var elRef = cont.querySelector('.tm-ft-ref');
    var elCuerpo = cont.querySelector('.tm-ft-cuerpo');

    function pintar() {
      var Mo = M();
      var u = unir(semilla);
      var series = Mo.generar('ordenar', { sentido: 'mezcla', cuantos: 4, n: 6 }, semilla + 9);
      var hueco = function (v) { return solucion ? '<span class="tm-ft-hueco tm-ft-val">' + v + '</span>' : '<span class="tm-ft-hueco"></span>'; };

      var h1 = document.createElement('h2'); h1.className = 'tm-ft-h2'; h1.textContent = '1. Cada término con su significado';
      var cols = document.createElement('div'); cols.className = 'tm-ft-cols';
      cols.innerHTML = '<ul class="tm-ft-lista">' + u.terminos.map(function (x) {
        return '<li><span class="tm-ft-num">' + x.n + '.</span> <strong>' + x.t + '</strong> ' + hueco(x.letra) + '</li>';
      }).join('') + '</ul>'
        + '<ul class="tm-ft-lista tm-ft-sig">' + u.significados.map(function (x) {
          return '<li><span class="tm-ft-let">' + x.letra + ')</span> ' + x.sig + '</li>';
        }).join('') + '</ul>';

      var h2 = document.createElement('h2'); h2.className = 'tm-ft-h2'; h2.textContent = '2. Ordena las velocidades';
      var series2 = document.createElement('div'); series2.className = 'tm-ft-series';
      series2.innerHTML = series.map(function (s, i) {
        var orden = {};
        s.solucion.forEach(function (t, k) { orden[t] = k + 1; });
        var sentido = s.sentido === 'lento-rapido' ? 'lento a más rápido' : 'rápido a más lento';
        return '<div class="tm-ft-serie"><p>' + (i + 1) + '. De más ' + sentido + ':</p><div class="tm-ft-fichas">'
          + s.fichas.map(function (t) {
            return '<span class="tm-ft-ficha"><span class="tm-ft-caja' + (solucion ? ' tm-val' : '') + '">' + (solucion ? orden[t] : '') + '</span>' + t + '</span>';
          }).join('') + '</div></div>';
      }).join('');

      elCuerpo.innerHTML = '';
      elCuerpo.appendChild(h1); elCuerpo.appendChild(cols);
      elCuerpo.appendChild(h2); elCuerpo.appendChild(series2);
      elRef.textContent = 'teoriamusical.com.es · hoja n.º ' + semilla;
    }

    function generar(semillaFija) {
      var nueva;
      if (semillaFija) nueva = semillaFija;
      else { do { nueva = Math.floor(Math.random() * 90000 + 10000); } while (nueva === semilla); }
      semilla = nueva;
      solucion = false;
      cont.querySelector('[data-a="soluciones"]').textContent = 'Ver soluciones';
      pintar();
      var a = cont.querySelector('.tm-ft-enlace');
      var params = '?hoja=' + semilla;
      a.innerHTML = 'Cada hoja sale de un número: con <a href="' + window.location.pathname + params + '#generador">este enlace</a> (hoja n.º ' + semilla + ') se vuelve a sacar la misma.';
    }

    cont.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-a]');
      if (!btn) return;
      var accion = btn.getAttribute('data-a');
      if (accion === 'generar') generar();
      else if (accion === 'soluciones') {
        solucion = !solucion;
        btn.textContent = solucion ? 'Ocultar soluciones' : 'Ver soluciones';
        pintar();
      } else if (accion === 'imprimir') {
        prepararImpresion();
        window.print();
        if (!('onafterprint' in window)) setTimeout(terminarImpresion, 1000);
      }
    });

    /* Igual que en el generador de fichas de acordes/cadencias: se clona la
       hoja como hija directa de <body> antes de imprimir. */
    function prepararImpresion() {
      var viejo = document.querySelector('.tm-ft-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-ft-hoja').cloneNode(true);
      clon.classList.add('tm-ft-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-ft-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-ft-print');
      var clon = document.querySelector('.tm-ft-impresion');
      if (clon) clon.parentNode.removeChild(clon);
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-ft-print')) terminarImpresion();
    });

    var q = new URLSearchParams(window.location.search);
    var semillaURL = Number(q.get('hoja')) || null;
    generar(semillaURL);
  };
})();
