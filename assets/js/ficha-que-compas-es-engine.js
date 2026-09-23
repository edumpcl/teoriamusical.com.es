/* Generador de fichas de «¿qué compás es?» para imprimir, con botón «otra
   ficha». Uso: <div id="tmfq"></div><script>tmFichaQueCompasEs('tmfq');</script>

   Es la versión en el navegador de la ficha en PDF (tools/generate-fichas-
   que-compas-es.js): tres niveles (fácil/medio/difícil), seis de cada uno,
   reutilizando window.tmQueCompasEsTest (generarLote/cifrasValidas/
   dibujarCompas), que a su vez usa window.tmCompletarCompasData por debajo.
   Sin lógica de «no repetir»: el espacio de compases con grupos de
   valoración especial es enorme. Mismo patrón de impresión que
   fichas-acordes-engine.js. */
(function () {
  'use strict';

  function D() { return window.tmCompletarCompasData; }
  function Q() { return window.tmQueCompasEsTest; }

  var TIT = { 1: '1. Fácil (un tiempo con grupo)', 2: '2. Medio (dos tiempos con grupo)', 3: '3. Difícil (todo el compás con grupos)' };
  var LOTES = [[1, 6], [2, 6], [3, 6]];

  var CSS = [
    '.tm-fq{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-fq::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-fq-acciones{display:flex;flex-wrap:wrap;gap:10px;}',
    '.tm-fq-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-fq-btn-1{background:#8b6914;color:#fff;}',
    '.tm-fq-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-fq-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-fq-hoja{margin-top:18px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-fq-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-fq-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-fq-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-fq-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-fq-datos{display:none;}',
    '.tm-fq-h2{font-size:.95rem;font-weight:700;color:#8b6914;margin:14px 0 7px;}',
    '.tm-fq-rejilla{display:grid;grid-template-columns:repeat(var(--tm-fq-cols,2),minmax(0,1fr));gap:6px 10px;}',
    '.tm-fq-celda{position:relative;min-width:0;border:1px solid #e8e0cc;border-radius:6px;padding:4px 6px 4px 62px;min-height:78px;break-inside:avoid;}',
    '.tm-fq-n{position:absolute;top:3px;left:6px;font-size:.72rem;font-weight:700;color:#9a7b28;}',
    '.tm-fq-casilla{position:absolute;left:6px;top:26px;width:46px;height:32px;border:1.5px solid #bbb;border-radius:4px;}',
    '.tm-fq-casilla.tm-sol{border-color:#c0392b;display:flex;align-items:center;justify-content:center;font-weight:700;color:#c0392b;font-size:.85rem;line-height:1.1;text-align:center;}',
    '.tm-fq-svg{display:block;margin:0 auto;}',
    '.tm-fq-svg svg{display:block;margin:0 auto;height:auto!important;}',
    '@media print{ .tm-fq-svg svg{height:70px!important;width:auto!important;max-width:100%!important;} }',
    '@media screen{.tm-fq-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-fq-print > *:not(.tm-fq-impresion){display:none!important;}',
    '  body.tm-fq-print .tm-fq-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-fq-print .tm-fq-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:6px 0 8px;}',
    '  body.tm-fq-print .tm-fq-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  body.tm-fq-print .tm-fq-cab{margin-bottom:6px;padding-bottom:4px;}',
    '  body.tm-fq-print .tm-fq-instr{font-size:.78rem;margin:0 0 6px;}',
    '  body.tm-fq-print .tm-fq-h2{margin:8px 0 4px;font-size:.85rem;}',
    '  body.tm-fq-print .tm-fq-rejilla{gap:3px 8px;}',
    '  body.tm-fq-print .tm-fq-celda{padding:2px 4px 2px 58px;min-height:70px;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  window.tmFichaQueCompasEs = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !D() || !Q()) return;
    if (!document.getElementById('tm-fq-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fq-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var semilla = 0, solucion = false;

    cont.innerHTML = '<div class="tm-fq">'
      + '<div class="tm-fq-acciones">'
      + '<button type="button" class="tm-fq-btn tm-fq-btn-1" data-a="generar">Generar otra ficha</button>'
      + '<button type="button" class="tm-fq-btn tm-fq-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-fq-btn tm-fq-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<p class="tm-fq-enlace"></p>'
      + '</div>'
      + '<div class="tm-fq-hoja"><div class="tm-fq-cab"><p class="tm-fq-tit">¿Qué compás es?</p><span class="tm-fq-ref"></span></div>'
      + '<div class="tm-fq-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-fq-instr">Cada compás está escrito sin su cifra y lleno de grupos de valoración especial. Simplifica cada grupo a la figura que equivale y escribe en la casilla el compás que le corresponde. Un 4/4 siempre se puede escribir también como 2/2, y un 2/4 como 4/8: en los dos casos, ambas cifras son correctas.</p>'
      + '<div class="tm-fq-cuerpo"></div></div>';

    var elRef = cont.querySelector('.tm-fq-ref');
    var elCuerpo = cont.querySelector('.tm-fq-cuerpo');
    var anchoForzado = null;

    function pintar() {
      var T1 = D(), T3 = Q();
      elCuerpo.innerHTML = '';
      LOTES.forEach(function (lote, li) {
        var nivel = lote[0], cuantos = lote[1];
        var h = document.createElement('p'); h.className = 'tm-fq-h2'; h.textContent = TIT[nivel];
        elCuerpo.appendChild(h);
        var rej = document.createElement('div'); rej.className = 'tm-fq-rejilla'; elCuerpo.appendChild(rej);
        T3.generarLote({ nivel: nivel, n: cuantos }, semilla + li * 977).forEach(function (it) {
          var c = document.createElement('div'); c.className = 'tm-fq-celda';
          var cifraTxt = T3.cifrasValidas(it.compas).join(' / ');
          c.innerHTML = '<span class="tm-fq-n"></span><div class="tm-fq-casilla' + (solucion ? ' tm-sol' : '') + '">' + (solucion ? cifraTxt : '') + '</div><div class="tm-fq-svg"></div>';
          rej.appendChild(c);
          T3.dibujarCompas(c.querySelector('.tm-fq-svg'), it, { w: 400, sinCifra: true });
        });
      });
      var n = 0;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-fq-celda'), function (c) { c.querySelector('.tm-fq-n').textContent = ++n; });
      var ancho = anchoForzado || elCuerpo.clientWidth || 700;
      var cols = ancho >= 480 ? 2 : 1;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-fq-rejilla'), function (rej) {
        rej.style.setProperty('--tm-fq-cols', cols);
        var interior = Math.floor(ancho / cols) - 70;
        var svgs = Array.prototype.slice.call(rej.querySelectorAll('svg'));
        var anchos = svgs.map(function (s) { return Number(s.getAttribute('viewBox').split(' ')[2]); });
        var K = Math.min(1, interior / Math.max.apply(null, anchos));
        svgs.forEach(function (s, i) { s.style.width = (anchos[i] * K) + 'px'; s.style.maxWidth = 'none'; });
      });
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
      var a = cont.querySelector('.tm-fq-enlace');
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
      anchoForzado = 700;
      pintar();
      var viejo = document.querySelector('.tm-fq-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-fq-hoja').cloneNode(true);
      clon.classList.add('tm-fq-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-fq-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-fq-print');
      var clon = document.querySelector('.tm-fq-impresion');
      if (clon) clon.parentNode.removeChild(clon);
      anchoForzado = null;
      pintar();
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-fq-print')) terminarImpresion();
    });

    var reajuste, anchoPrevio = elCuerpo.clientWidth;
    window.addEventListener('resize', function () {
      clearTimeout(reajuste);
      reajuste = setTimeout(function () {
        if (elCuerpo.clientWidth === anchoPrevio) return;
        anchoPrevio = elCuerpo.clientWidth;
        pintar();
      }, 250);
    });

    var q = new URLSearchParams(window.location.search);
    var semillaURL = Number(q.get('hoja')) || null;
    generar(semillaURL);
  };
})();
