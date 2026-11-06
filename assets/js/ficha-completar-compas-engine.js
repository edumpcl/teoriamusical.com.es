/* Generador de fichas de «completar compases» para imprimir, con botón «otra
   ficha». Uso: <div id="tmfc"></div><script>tmFichaCompletarCompas('tmfc');</script>

   Es la versión en el navegador de la ficha en PDF (tools/generate-fichas-
   completar-compases.js): tres niveles (1 figura / 1 figura o silencio /
   varias figuras), seis de cada uno, reutilizando
   window.tmCompletarCompasData (generar/dibujar). Sin lógica de «no
   repetir»: el motor genera compases al azar sobre un espacio enorme de
   combinaciones de figuras, la probabilidad de dos fichas calcadas es
   mínima. Mismo patrón de impresión que fichas-acordes-engine.js. */
(function () {
  'use strict';

  var EN = document.documentElement.lang === 'en';
  function T(es, en) { return EN ? en : es; }

  function DD() { return window.tmCompletarCompasData; }

  var TIT = {
    1: T('1. Falta una figura', '1. One note is missing'),
    2: T('2. Falta una figura o un silencio', '2. A note or a rest is missing'),
    3: T('3. Faltan varias figuras', '3. Several notes are missing')
  };
  var LOTES = [[1, 'mezcla', 6], [2, 'mezcla', 6], [3, 'mezcla', 6]];

  var CSS = [
    '.tm-fc{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-fc::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-fc-acciones{display:flex;flex-wrap:wrap;gap:10px;}',
    '.tm-fc-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-fc-btn-1{background:#8b6914;color:#fff;}',
    '.tm-fc-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-fc-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-fc-hoja{margin-top:18px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-fc-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-fc-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-fc-ref{font-size:.75rem;color:#6f6f6f;}',
    '.tm-fc-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-fc-datos{display:none;}',
    '.tm-fc-h2{font-size:.95rem;font-weight:700;color:#8b6914;margin:14px 0 7px;}',
    '.tm-fc-rejilla{display:grid;grid-template-columns:repeat(var(--tm-fc-cols,2),minmax(0,1fr));gap:6px 10px;}',
    '.tm-fc-celda{position:relative;min-width:0;border:1px solid #e8e0cc;border-radius:6px;padding:4px 6px;break-inside:avoid;}',
    '.tm-fc-n{position:absolute;top:3px;left:6px;font-size:.72rem;font-weight:700;color:#85600a;}',
    '.tm-fc-svg{display:block;margin:0 auto;}',
    '.tm-fc-svg svg{display:block;margin:0 auto;height:auto!important;}',
    '@media print{ .tm-fc-svg svg{height:70px!important;width:auto!important;max-width:100%!important;} }',
    '@media screen{.tm-fc-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-fc-print > *:not(.tm-fc-impresion){display:none!important;}',
    '  body.tm-fc-print .tm-fc-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-fc-print .tm-fc-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:6px 0 8px;}',
    '  body.tm-fc-print .tm-fc-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  body.tm-fc-print .tm-fc-cab{margin-bottom:6px;padding-bottom:4px;}',
    '  body.tm-fc-print .tm-fc-instr{font-size:.78rem;margin:0 0 6px;}',
    '  body.tm-fc-print .tm-fc-h2{margin:8px 0 4px;font-size:.85rem;}',
    '  body.tm-fc-print .tm-fc-rejilla{gap:3px 8px;}',
    '  body.tm-fc-print .tm-fc-celda{padding:2px 4px;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  window.tmFichaCompletarCompas = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !DD()) return;
    if (!document.getElementById('tm-fc-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fc-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var semilla = 0, solucion = false;

    cont.innerHTML = '<div class="tm-fc">'
      + '<div class="tm-fc-acciones">'
      + '<button type="button" class="tm-fc-btn tm-fc-btn-1" data-a="generar">' + T('Generar otra ficha', 'Generate another worksheet') + '</button>'
      + '<button type="button" class="tm-fc-btn tm-fc-btn-2" data-a="soluciones">' + T('Ver soluciones', 'Show answers') + '</button>'
      + '<button type="button" class="tm-fc-btn tm-fc-btn-2" data-a="imprimir">' + T('Imprimir', 'Print') + '</button>'
      + '</div>'
      + '<p class="tm-fc-enlace"></p>'
      + '</div>'
      + '<div class="tm-fc-hoja"><div class="tm-fc-cab"><p class="tm-fc-tit">' + T('Completar compases', 'Complete the measures') + '</p><span class="tm-fc-ref"></span></div>'
      + '<div class="tm-fc-datos"><span>' + T('Nombre:', 'Name:') + '</span><span>' + T('Curso:', 'Class:') + '</span><span>' + T('Fecha:', 'Date:') + '</span></div>'
      + '<p class="tm-fc-instr">' + T('A cada compás le falta algo en el sitio marcado con la línea roja. Escribe encima de la línea lo que falta. En la primera parte falta una figura; en la segunda, una figura o un silencio; en la tercera faltan varias figuras (vale cualquier combinación que sume lo que falta).', 'Each measure is missing something where the red line is. Write above the line what is missing. In the first part one note is missing; in the second, a note or a rest; in the third, several notes are missing (any combination that adds up to what is missing is valid).') + '</p>'
      + '<div class="tm-fc-cuerpo"></div></div>';

    var elRef = cont.querySelector('.tm-fc-ref');
    var elCuerpo = cont.querySelector('.tm-fc-cuerpo');
    var anchoForzado = null;

    function pintar() {
      var Tt = DD();
      elCuerpo.innerHTML = '';
      LOTES.forEach(function (lote, li) {
        var nivel = lote[0], grupo = lote[1], cuantos = lote[2];
        var h = document.createElement('p'); h.className = 'tm-fc-h2'; h.textContent = TIT[nivel];
        elCuerpo.appendChild(h);
        var rej = document.createElement('div'); rej.className = 'tm-fc-rejilla'; elCuerpo.appendChild(rej);
        Tt.generar({ nivel: nivel, grupo: grupo, n: cuantos }, semilla + li * 977).forEach(function (it) {
          var c = document.createElement('div'); c.className = 'tm-fc-celda';
          c.innerHTML = '<span class="tm-fc-n"></span><div class="tm-fc-svg"></div>';
          rej.appendChild(c);
          Tt.dibujar(c.querySelector('.tm-fc-svg'), it, { w: 400, revelar: solucion, compacto: true });
        });
      });
      var n = 0;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-fc-celda'), function (c) { c.querySelector('.tm-fc-n').textContent = ++n; });
      var ancho = anchoForzado || elCuerpo.clientWidth || 700;
      var cols = ancho >= 480 ? 2 : 1;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-fc-rejilla'), function (rej) {
        rej.style.setProperty('--tm-fc-cols', cols);
        var interior = Math.floor(ancho / cols) - 24;
        var svgs = Array.prototype.slice.call(rej.querySelectorAll('svg'));
        var anchos = svgs.map(function (s) { return Number(s.getAttribute('width')); });
        var K = Math.min(1, interior / Math.max.apply(null, anchos));
        svgs.forEach(function (s, i) { s.style.width = (anchos[i] * K) + 'px'; s.style.maxWidth = 'none'; });
      });
      elRef.textContent = T('teoriamusical.com.es · hoja n.º ' + semilla, 'teoriamusical.com.es · worksheet no. ' + semilla);
    }

    function generar(semillaFija) {
      var nueva;
      if (semillaFija) nueva = semillaFija;
      else { do { nueva = Math.floor(Math.random() * 90000 + 10000); } while (nueva === semilla); }
      semilla = nueva;
      solucion = false;
      cont.querySelector('[data-a="soluciones"]').textContent = T('Ver soluciones', 'Show answers');
      pintar();
      var a = cont.querySelector('.tm-fc-enlace');
      var params = '?hoja=' + semilla;
      a.innerHTML = T('Cada hoja sale de un número: con <a href="' + window.location.pathname + params + '#generador">este enlace</a> (hoja n.º ' + semilla + ') se vuelve a sacar la misma.', 'Each worksheet comes from a number: with <a href="' + window.location.pathname + params + '#generador">this link</a> (worksheet no. ' + semilla + ') you get the same one again.');
    }

    cont.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-a]');
      if (!btn) return;
      var accion = btn.getAttribute('data-a');
      if (accion === 'generar') generar();
      else if (accion === 'soluciones') {
        solucion = !solucion;
        btn.textContent = solucion ? T('Ocultar soluciones', 'Hide answers') : T('Ver soluciones', 'Show answers');
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
      var viejo = document.querySelector('.tm-fc-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-fc-hoja').cloneNode(true);
      clon.classList.add('tm-fc-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-fc-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-fc-print');
      var clon = document.querySelector('.tm-fc-impresion');
      if (clon) clon.parentNode.removeChild(clon);
      anchoForzado = null;
      pintar();
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-fc-print')) terminarImpresion();
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
    if (window.tmNotacion && !window.tmNotacion.cargado()) window.tmNotacion.listo().then(function () { generar(semillaURL); });
    else generar(semillaURL);
  };
})();
