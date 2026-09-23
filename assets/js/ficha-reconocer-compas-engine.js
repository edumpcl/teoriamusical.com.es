/* Generador de fichas de «reconocer compás» para imprimir, con botón «otra
   ficha». Uso: <div id="tmfr"></div><script>tmFichaReconocerCompas('tmfr');</script>

   Es la versión en el navegador de la ficha en PDF (tools/generate-fichas-
   reconocer-compases.js): tres grupos (simples/compuestos/mezcla), seis de
   cada uno, reutilizando window.tmCompletarCompasData (dibujarMedida) y
   window.tmReconocerCompasTest (generarLote). La ficha en PDF usa semillas
   buscadas a propósito para que cada grupo incluya un compás ambiguo (3/4 y
   6/8 pueden escribirse igual); aquí, al generar al azar, alguna hoja puede
   no tener ninguno — es una ficha extra para practicar, no hace falta esa
   garantía. Sin lógica de «no repetir»: el espacio de ritmos posibles es
   enorme. Mismo patrón de impresión que fichas-acordes-engine.js. */
(function () {
  'use strict';

  function D() { return window.tmCompletarCompasData; }
  function R() { return window.tmReconocerCompasTest; }

  var TIT = { simples: '1. Compases simples (2/4, 3/4, 4/4)', compuestos: '2. Compases compuestos (6/8, 9/8, 12/8)', mezcla: '3. Mezclados' };
  var LOTES = [['simples', 6], ['compuestos', 6], ['mezcla', 6]];

  var CSS = [
    '.tm-fr{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-fr::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-fr-acciones{display:flex;flex-wrap:wrap;gap:10px;}',
    '.tm-fr-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-fr-btn-1{background:#8b6914;color:#fff;}',
    '.tm-fr-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-fr-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-fr-hoja{margin-top:18px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-fr-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-fr-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-fr-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-fr-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-fr-datos{display:none;}',
    '.tm-fr-h2{font-size:.95rem;font-weight:700;color:#8b6914;margin:14px 0 7px;}',
    '.tm-fr-rejilla{display:grid;grid-template-columns:repeat(var(--tm-fr-cols,2),minmax(0,1fr));gap:6px 10px;}',
    '.tm-fr-celda{position:relative;min-width:0;border:1px solid #e8e0cc;border-radius:6px;padding:4px 6px 4px 62px;min-height:78px;break-inside:avoid;}',
    '.tm-fr-n{position:absolute;top:3px;left:6px;font-size:.72rem;font-weight:700;color:#9a7b28;}',
    '.tm-fr-casilla{position:absolute;left:6px;top:26px;width:46px;height:32px;border:1.5px solid #bbb;border-radius:4px;}',
    '.tm-fr-casilla.tm-sol{border-color:#c0392b;display:flex;align-items:center;justify-content:center;font-weight:700;color:#c0392b;font-size:.85rem;line-height:1.1;text-align:center;}',
    '.tm-fr-svg{display:block;margin:0 auto;}',
    '.tm-fr-svg svg{display:block;margin:0 auto;height:auto!important;}',
    '@media print{ .tm-fr-svg svg{height:70px!important;width:auto!important;max-width:100%!important;} }',
    '@media screen{.tm-fr-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-fr-print > *:not(.tm-fr-impresion){display:none!important;}',
    '  body.tm-fr-print .tm-fr-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-fr-print .tm-fr-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:6px 0 8px;}',
    '  body.tm-fr-print .tm-fr-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  body.tm-fr-print .tm-fr-cab{margin-bottom:6px;padding-bottom:4px;}',
    '  body.tm-fr-print .tm-fr-instr{font-size:.78rem;margin:0 0 6px;}',
    '  body.tm-fr-print .tm-fr-h2{margin:8px 0 4px;font-size:.85rem;}',
    '  body.tm-fr-print .tm-fr-rejilla{gap:3px 8px;}',
    '  body.tm-fr-print .tm-fr-celda{padding:2px 4px 2px 58px;min-height:70px;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  window.tmFichaReconocerCompas = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !D() || !R()) return;
    if (!document.getElementById('tm-fr-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fr-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var semilla = 0, solucion = false;

    cont.innerHTML = '<div class="tm-fr">'
      + '<div class="tm-fr-acciones">'
      + '<button type="button" class="tm-fr-btn tm-fr-btn-1" data-a="generar">Generar otra ficha</button>'
      + '<button type="button" class="tm-fr-btn tm-fr-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-fr-btn tm-fr-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<p class="tm-fr-enlace"></p>'
      + '</div>'
      + '<div class="tm-fr-hoja"><div class="tm-fr-cab"><p class="tm-fr-tit">Reconocer compás</p><span class="tm-fr-ref"></span></div>'
      + '<div class="tm-fr-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-fr-instr">Cada compás está escrito sin su cifra. Escribe en la casilla el compás que le corresponde (numerador sobre denominador). Algunos se pueden escribir de más de una forma: en ese caso, cualquiera de las dos es correcta.</p>'
      + '<div class="tm-fr-cuerpo"></div></div>';

    var elRef = cont.querySelector('.tm-fr-ref');
    var elCuerpo = cont.querySelector('.tm-fr-cuerpo');
    var anchoForzado = null;

    function pintar() {
      var T1 = D(), T2 = R();
      elCuerpo.innerHTML = '';
      LOTES.forEach(function (lote, li) {
        var grupo = lote[0], cuantos = lote[1];
        var h = document.createElement('p'); h.className = 'tm-fr-h2'; h.textContent = TIT[grupo];
        elCuerpo.appendChild(h);
        var rej = document.createElement('div'); rej.className = 'tm-fr-rejilla'; elCuerpo.appendChild(rej);
        T2.generarLote({ grupo: grupo, n: cuantos }, semilla + li * 977).forEach(function (it) {
          var c = document.createElement('div'); c.className = 'tm-fr-celda';
          var cifraTxt = it.validos.join(' / ');
          c.innerHTML = '<span class="tm-fr-n"></span><div class="tm-fr-casilla' + (solucion ? ' tm-sol' : '') + '">' + (solucion ? cifraTxt : '') + '</div><div class="tm-fr-svg"></div>';
          rej.appendChild(c);
          T1.dibujarMedida(c.querySelector('.tm-fr-svg'), it.compasBase, it.elems, { w: 400, sinCifra: true });
        });
      });
      var n = 0;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-fr-celda'), function (c) { c.querySelector('.tm-fr-n').textContent = ++n; });
      var ancho = anchoForzado || elCuerpo.clientWidth || 700;
      var cols = ancho >= 480 ? 2 : 1;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-fr-rejilla'), function (rej) {
        rej.style.setProperty('--tm-fr-cols', cols);
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
      var a = cont.querySelector('.tm-fr-enlace');
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
      var viejo = document.querySelector('.tm-fr-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-fr-hoja').cloneNode(true);
      clon.classList.add('tm-fr-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-fr-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-fr-print');
      var clon = document.querySelector('.tm-fr-impresion');
      if (clon) clon.parentNode.removeChild(clon);
      anchoForzado = null;
      pintar();
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-fr-print')) terminarImpresion();
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
