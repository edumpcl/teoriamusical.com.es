/* Generador de fichas de «¿cómo termina la melodía?» para imprimir, con
   botón «otra ficha». Uso: <div id="tmff"></div><script>tmFichaFinalFrase('tmff');</script>

   Es la versión en el navegador de la ficha en PDF (tools/generate-fichas-
   final-frase.js): tres niveles, seis de cada uno, reutilizando
   window.tmFinalTest (generarLote/dibujar/TIPOS/ETIQUETA). Sin lógica de
   «no repetir»: el espacio de melodías posibles es enorme. Mismo patrón de
   impresión que fichas-acordes-engine.js. */
(function () {
  'use strict';

  function T() { return window.tmFinalTest; }

  var TIT = { 1: '1. Fácil (compases simples; la última nota llega hasta el final del compás)', 2: '2. Medio (simples y compuestos; silencios tras la última nota y último compás incompleto)', 3: '3. Difícil (contratiempos, figuras pequeñas y silencios antes de la última nota)' };
  var LOTES = [[1, 6], [2, 6], [3, 6]];

  var CSS = [
    '.tm-ff{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-ff::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-ff-acciones{display:flex;flex-wrap:wrap;gap:10px;}',
    '.tm-ff-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-ff-btn-1{background:#8b6914;color:#fff;}',
    '.tm-ff-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-ff-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-ff-hoja{margin-top:18px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-ff-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-ff-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-ff-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-ff-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-ff-datos{display:none;}',
    '.tm-ff-h2{font-size:.95rem;font-weight:700;color:#8b6914;margin:14px 0 7px;}',
    '.tm-ff-rejilla{display:grid;grid-template-columns:repeat(var(--tm-ff-cols,2),minmax(0,1fr));gap:6px 10px;}',
    '.tm-ff-celda{position:relative;min-width:0;border:1px solid #e8e0cc;border-radius:6px;padding:4px 6px;break-inside:avoid;}',
    '.tm-ff-n{position:absolute;top:3px;left:6px;font-size:.72rem;font-weight:700;color:#9a7b28;}',
    '.tm-ff-svg{display:block;margin:0 auto;}',
    '.tm-ff-svg svg{display:block;margin:0 auto;height:auto!important;}',
    '@media print{ .tm-ff-svg svg{height:60px!important;width:auto!important;max-width:100%!important;} }',
    '.tm-ff-ops{display:flex;justify-content:space-between;gap:6px;font-size:.78rem;color:#333;padding:2px 2px 0;flex-wrap:wrap;}',
    '.tm-ff-op{display:inline-flex;align-items:center;gap:4px;white-space:nowrap;}',
    '.tm-ff-caja{display:inline-block;width:11px;height:11px;border:1.3px solid #777;border-radius:2px;text-align:center;line-height:9px;font-size:.7rem;font-weight:700;}',
    '.tm-ff-op.tm-sol{color:#c0392b;font-weight:700;}',
    '.tm-ff-op.tm-sol .tm-ff-caja{border-color:#c0392b;background:#c0392b;color:#fff;}',
    '@media screen{.tm-ff-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-ff-print > *:not(.tm-ff-impresion){display:none!important;}',
    '  body.tm-ff-print .tm-ff-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-ff-print .tm-ff-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:6px 0 8px;}',
    '  body.tm-ff-print .tm-ff-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  body.tm-ff-print .tm-ff-cab{margin-bottom:6px;padding-bottom:4px;}',
    '  body.tm-ff-print .tm-ff-instr{font-size:.78rem;margin:0 0 6px;}',
    '  body.tm-ff-print .tm-ff-h2{margin:8px 0 4px;font-size:.85rem;}',
    '  body.tm-ff-print .tm-ff-rejilla{gap:3px 8px;}',
    '  body.tm-ff-print .tm-ff-celda{padding:2px 4px;}',
    '  body.tm-ff-print .tm-ff-ops{flex-wrap:nowrap;gap:3px;padding:1px 2px 0;}',
    '  body.tm-ff-print .tm-ff-op{font-size:.62rem;gap:2px;}',
    '  body.tm-ff-print .tm-ff-caja{width:9px;height:9px;line-height:7px;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  window.tmFichaFinalFrase = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !T()) return;
    if (!document.getElementById('tm-ff-css')) {
      var st = document.createElement('style');
      st.id = 'tm-ff-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var semilla = 0, solucion = false;

    cont.innerHTML = '<div class="tm-ff">'
      + '<div class="tm-ff-acciones">'
      + '<button type="button" class="tm-ff-btn tm-ff-btn-1" data-a="generar">Generar otra ficha</button>'
      + '<button type="button" class="tm-ff-btn tm-ff-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-ff-btn tm-ff-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<p class="tm-ff-enlace"></p>'
      + '</div>'
      + '<div class="tm-ff-hoja"><div class="tm-ff-cab"><p class="tm-ff-tit">¿Cómo termina la melodía?</p><span class="tm-ff-ref"></span></div>'
      + '<div class="tm-ff-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-ff-instr">Marca cómo termina cada melodía. Fíjate en en qué tiempo empieza la última nota del último compás, no en cuánto dura ni en los silencios que haya detrás. Tiempo fuerte (íctico): empieza en el tiempo 1. Tiempo débil (posíctico): empieza en cualquier otro punto del compás.</p>'
      + '<div class="tm-ff-cuerpo"></div></div>';

    var elRef = cont.querySelector('.tm-ff-ref');
    var elCuerpo = cont.querySelector('.tm-ff-cuerpo');
    var anchoForzado = null;

    function pintar() {
      var Tt = T();
      elCuerpo.innerHTML = '';
      LOTES.forEach(function (lote, li) {
        var nivel = lote[0], cuantos = lote[1];
        var h = document.createElement('p'); h.className = 'tm-ff-h2'; h.textContent = TIT[nivel];
        elCuerpo.appendChild(h);
        var rej = document.createElement('div'); rej.className = 'tm-ff-rejilla'; elCuerpo.appendChild(rej);
        Tt.generarLote({ nivel: nivel, n: cuantos }, semilla + li * 977).forEach(function (it) {
          var c = document.createElement('div'); c.className = 'tm-ff-celda';
          var ops = Tt.TIPOS.map(function (t) {
            var nombre = Tt.ETIQUETA[t];
            var marcada = solucion && t === it.tipo;
            return '<span class="tm-ff-op' + (marcada ? ' tm-sol' : '') + '"><span class="tm-ff-caja">' + (marcada ? '✓' : '') + '</span>' + nombre + '</span>';
          }).join('');
          c.innerHTML = '<span class="tm-ff-n"></span><div class="tm-ff-svg"></div><div class="tm-ff-ops">' + ops + '</div>';
          rej.appendChild(c);
          Tt.dibujar(c.querySelector('.tm-ff-svg'), it, { compacto: 0.85 });
        });
      });
      var n = 0;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-ff-celda'), function (c) { c.querySelector('.tm-ff-n').textContent = ++n; });
      var ancho = anchoForzado || elCuerpo.clientWidth || 700;
      var cols = ancho >= 480 ? 2 : 1;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-ff-rejilla'), function (rej) {
        rej.style.setProperty('--tm-ff-cols', cols);
        var interior = Math.floor(ancho / cols) - 24;
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
      var a = cont.querySelector('.tm-ff-enlace');
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
      var viejo = document.querySelector('.tm-ff-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-ff-hoja').cloneNode(true);
      clon.classList.add('tm-ff-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-ff-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-ff-print');
      var clon = document.querySelector('.tm-ff-impresion');
      if (clon) clon.parentNode.removeChild(clon);
      anchoForzado = null;
      pintar();
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-ff-print')) terminarImpresion();
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
