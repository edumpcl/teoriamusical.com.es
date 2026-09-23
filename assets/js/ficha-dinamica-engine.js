/* Generador de fichas de dinámica y matices para imprimir, con botón «otra
   ficha». Uso: <div id="tmfd"></div><script>tmFichaDinamica('tmfd');</script>

   Es la versión en el navegador de la ficha en PDF (tools/generate-fichas-
   dinamica.js): mismas dos partes (unir matiz/término-significado; ordenar
   matices), reutilizando window.tmDinamicaEjercicios (GRADOS, CAMBIOS,
   generar). Sin lógica de «no repetir»: el motor reparte al azar sobre una
   lista amplia, la probabilidad de dos fichas calcadas es mínima. Mismo
   patrón de impresión que fichas-acordes-engine.js. */
(function () {
  'use strict';

  function M() { return window.tmDinamicaEjercicios; }
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
  // Misma construcción que unir() en tools/generate-fichas-dinamica.js.
  function unir(semilla) {
    var Mo = M();
    var grados = Mo.GRADOS.map(function (g) { return { etiqueta: g.s, signo: true, sig: g.sig }; });
    var cambios = barajar(Mo.CAMBIOS, mulberry32(semilla)).slice(0, 4).map(function (c) {
      return { etiqueta: c.t.toLowerCase(), signo: false, sig: c.sig };
    });
    var items = barajar(grados.concat(cambios), mulberry32(semilla + 1));
    var significados = barajar(items, mulberry32(semilla + 2));
    return {
      items: items.map(function (x, i) {
        var o = {}; for (var k in x) o[k] = x[k];
        o.n = i + 1; o.letra = LETRAS[significados.indexOf(x)];
        return o;
      }),
      significados: significados.map(function (x, i) { return { letra: LETRAS[i], sig: x.sig }; })
    };
  }

  var CSS = [
    '.tm-fd{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-fd::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-fd-acciones{display:flex;flex-wrap:wrap;gap:10px;}',
    '.tm-fd-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-fd-btn-1{background:#8b6914;color:#fff;}',
    '.tm-fd-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-fd-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-fd-hoja{margin-top:18px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-fd-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-fd-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-fd-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-fd-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-fd-datos{display:none;}',
    '.tm-fd-h2{font-size:.95rem;font-weight:700;color:#8b6914;margin:14px 0 7px;}',
    '.tm-fd-signo{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-weight:700;font-size:1.05rem;}',
    '.tm-fd-cols{display:grid;grid-template-columns:1fr 1.4fr;gap:14px;}',
    '@media (max-width:480px){.tm-fd-cols{grid-template-columns:1fr;}}',
    '.tm-fd-lista{margin:0;padding:0;list-style:none;}',
    '.tm-fd-lista li{font-size:.88rem;padding:4px 0;border-bottom:1px dotted #ddd;display:flex;align-items:baseline;gap:7px;}',
    '.tm-fd-num{color:#9a7b28;font-weight:700;min-width:18px;}',
    '.tm-fd-hueco{display:inline-block;min-width:26px;border-bottom:1px solid #9a9a9a;text-align:center;margin-left:auto;}',
    '.tm-fd-val{color:#c0392b;font-weight:700;border:0;}',
    '.tm-fd-sig li{font-size:.85rem;}',
    '.tm-fd-let{color:#9a7b28;font-weight:700;min-width:16px;}',
    '.tm-fd-series{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;}',
    '@media (max-width:480px){.tm-fd-series{grid-template-columns:1fr;}}',
    '.tm-fd-serie{border:1px solid #e8e0cc;border-radius:6px;padding:6px 9px;break-inside:avoid;}',
    '.tm-fd-serie p{margin:0 0 5px;font-size:.82rem;color:#555;}',
    '.tm-fd-fichas{display:flex;flex-wrap:wrap;gap:8px;}',
    '.tm-fd-ficha{border:1px solid #d8d0b8;border-radius:5px;padding:3px 9px;display:flex;align-items:center;gap:6px;}',
    '.tm-fd-caja{display:inline-block;width:16px;height:15px;border:1px solid #9a9a9a;border-radius:3px;text-align:center;font-size:.8rem;line-height:14px;font-family:Arial;font-style:normal;}',
    '.tm-fd-caja.tm-val{color:#c0392b;font-weight:700;border-color:#c0392b;}',
    '@media screen{.tm-fd-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-fd-print > *:not(.tm-fd-impresion){display:none!important;}',
    '  body.tm-fd-print .tm-fd-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-fd-print .tm-fd-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:6px 0 8px;}',
    '  body.tm-fd-print .tm-fd-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  window.tmFichaDinamica = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !M()) return;
    if (!document.getElementById('tm-fd-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fd-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var semilla = 0, solucion = false;

    cont.innerHTML = '<div class="tm-fd">'
      + '<div class="tm-fd-acciones">'
      + '<button type="button" class="tm-fd-btn tm-fd-btn-1" data-a="generar">Generar otra ficha</button>'
      + '<button type="button" class="tm-fd-btn tm-fd-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-fd-btn tm-fd-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<p class="tm-fd-enlace"></p>'
      + '</div>'
      + '<div class="tm-fd-hoja"><div class="tm-fd-cab"><p class="tm-fd-tit">Dinámica y matices</p><span class="tm-fd-ref"></span></div>'
      + '<div class="tm-fd-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-fd-instr">Primera parte: escribe al lado de cada matiz o término la letra de su significado. Segunda parte: numera cada serie según el orden que se pide.</p>'
      + '<div class="tm-fd-cuerpo"></div></div>';

    var elRef = cont.querySelector('.tm-fd-ref');
    var elCuerpo = cont.querySelector('.tm-fd-cuerpo');

    function pintar() {
      var Mo = M();
      var u = unir(semilla);
      var series = Mo.generar('ordenar', { sentido: 'mezcla', cuantos: 4, n: 6 }, semilla + 10);
      var hueco = function (v) { return solucion ? '<span class="tm-fd-hueco tm-fd-val">' + v + '</span>' : '<span class="tm-fd-hueco"></span>'; };

      var h1 = document.createElement('h2'); h1.className = 'tm-fd-h2'; h1.textContent = '1. Cada matiz o término con su significado';
      var cols = document.createElement('div'); cols.className = 'tm-fd-cols';
      cols.innerHTML = '<ul class="tm-fd-lista">' + u.items.map(function (x) {
        var etiqueta = x.signo ? '<span class="tm-fd-signo">' + x.etiqueta + '</span>' : '<strong>' + x.etiqueta + '</strong>';
        return '<li><span class="tm-fd-num">' + x.n + '.</span> ' + etiqueta + ' ' + hueco(x.letra) + '</li>';
      }).join('') + '</ul>'
        + '<ul class="tm-fd-lista tm-fd-sig">' + u.significados.map(function (x) {
          return '<li><span class="tm-fd-let">' + x.letra + ')</span> ' + x.sig + '</li>';
        }).join('') + '</ul>';

      var h2 = document.createElement('h2'); h2.className = 'tm-fd-h2'; h2.textContent = '2. Ordena los matices';
      var series2 = document.createElement('div'); series2.className = 'tm-fd-series';
      series2.innerHTML = series.map(function (s, i) {
        var orden = {};
        s.solucion.forEach(function (x, k) { orden[x] = k + 1; });
        var sentido = s.sentido === 'suave-fuerte' ? 'suave a más fuerte' : 'fuerte a más suave';
        return '<div class="tm-fd-serie"><p>' + (i + 1) + '. De más ' + sentido + ':</p><div class="tm-fd-fichas">'
          + s.fichas.map(function (x) {
            return '<span class="tm-fd-ficha"><span class="tm-fd-caja' + (solucion ? ' tm-val' : '') + '">' + (solucion ? orden[x] : '') + '</span><span class="tm-fd-signo">' + x + '</span></span>';
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
      var a = cont.querySelector('.tm-fd-enlace');
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

    function prepararImpresion() {
      var viejo = document.querySelector('.tm-fd-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-fd-hoja').cloneNode(true);
      clon.classList.add('tm-fd-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-fd-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-fd-print');
      var clon = document.querySelector('.tm-fd-impresion');
      if (clon) clon.parentNode.removeChild(clon);
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-fd-print')) terminarImpresion();
    });

    var q = new URLSearchParams(window.location.search);
    var semillaURL = Number(q.get('hoja')) || null;
    generar(semillaURL);
  };
})();
