/* Generador de fichas de «síncopa» para imprimir, con botón «otra ficha».
   Uso: <div id="tmfs"></div><script>tmFichaSincopa('tmfs');</script>
   Modo difícil: <script>tmFichaSincopa('tmfsd', { dificil: true });</script>

   Es la versión en el navegador de la ficha en PDF (tools/generate-fichas-
   sincopa.js / generate-fichas-sincopa-dificil.js): 10 fragmentos por hoja,
   reutilizando window.tmSincopaGenerar / tmSincopaGenerarDificil /
   tmSincopaMulberry32 / tmSincopaDibujarImpresion (mismo motor que el test
   interactivo). En modo normal cada fragmento sortea compás y molde por
   separado, como mucho una síncopa; en modo difícil cada fragmento tiene 2
   compases y puede tener varias síncopas a la vez, o ninguna — por eso en
   difícil todas las celdas van en una sola columna (los fragmentos son
   siempre anchos). Con alturas también al azar, la probabilidad de dos
   fichas calcadas es prácticamente nula. Mismo patrón de impresión que
   ficha-completar-compas-engine.js. */
(function () {
  'use strict';

  var PREGUNTAS_POR_FICHA = 10;

  var CSS = [
    '.tm-sf{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-sf::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-sf-acciones{display:flex;flex-wrap:wrap;gap:10px;}',
    '.tm-sf-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-sf-btn-1{background:#8b6914;color:#fff;}',
    '.tm-sf-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-sf-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-sf-hoja{margin-top:18px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-sf-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-sf-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-sf-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-sf-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-sf-datos{display:none;}',
    '.tm-sf-rejilla{display:grid;grid-template-columns:repeat(var(--tm-sf-cols,2),minmax(0,1fr));gap:6px 10px;}',
    '.tm-sf-lista{display:flex;flex-direction:column;gap:6px;}',
    '.tm-sf-celda{position:relative;min-width:0;border:1px solid #e8e0cc;border-radius:6px;padding:4px 6px 6px;break-inside:avoid;}',
    '.tm-sf-celda.ancha{grid-column:1 / -1;}',
    '.tm-sf-n{position:absolute;top:3px;left:6px;font-size:.72rem;font-weight:700;color:#9a7b28;}',
    '.tm-sf-svg{display:block;margin:0 auto;}',
    '.tm-sf-svg svg{display:block;margin:0 auto;height:auto!important;}',
    '.tm-sf-chk{font-size:.72rem;color:#555;text-align:center;margin-top:-2px;}',
    '.tm-sf-chk.sol{color:#c0392b;font-weight:700;}',
    '@media print{ .tm-sf-svg svg{height:60px!important;width:auto!important;max-width:100%!important;} }',
    '@media screen{.tm-sf-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-sf-print > *:not(.tm-sf-impresion){display:none!important;}',
    '  body.tm-sf-print .tm-sf-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-sf-print .tm-sf-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:6px 0 8px;}',
    '  body.tm-sf-print .tm-sf-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  body.tm-sf-print .tm-sf-cab{margin-bottom:6px;padding-bottom:4px;}',
    '  body.tm-sf-print .tm-sf-instr{font-size:.78rem;margin:0 0 6px;}',
    '  body.tm-sf-print .tm-sf-rejilla{gap:3px 8px;}',
    '  body.tm-sf-print .tm-sf-lista{gap:3px;}',
    '  body.tm-sf-print .tm-sf-celda{padding:2px 4px;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  function generarFicha(semilla, dificil) {
    var rng = window.tmSincopaMulberry32(semilla);
    var frags = [];
    var gen = dificil ? window.tmSincopaGenerarDificil : window.tmSincopaGenerar;
    for (var i = 0; i < PREGUNTAS_POR_FICHA; i++) frags.push(gen(rng));
    return frags;
  }

  window.tmFichaSincopa = function (id, opts) {
    var cont = document.getElementById(id);
    var dificil = !!(opts && opts.dificil);
    if (!cont || !window.tmSincopaGenerar) return;
    if (!document.getElementById('tm-sf-css')) {
      var st = document.createElement('style');
      st.id = 'tm-sf-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var semilla = 0, solucion = false;
    var titulo = dificil ? 'Síncopa — nivel difícil' : 'Síncopa';
    var instr = dificil
      ? 'Cada fragmento tiene 2 compases. Rodea con un círculo TODAS las notas donde crees que empieza una síncopa (puede haber varias, o ninguna), o marca la casilla «No hay síncopa» si el fragmento no tiene ninguna.'
      : 'Rodea con un círculo la nota donde crees que empieza la síncopa, o marca la casilla «No hay síncopa» si el fragmento no la tiene.';

    cont.innerHTML = '<div class="tm-sf">'
      + '<div class="tm-sf-acciones">'
      + '<button type="button" class="tm-sf-btn tm-sf-btn-1" data-a="generar">Generar otra ficha</button>'
      + '<button type="button" class="tm-sf-btn tm-sf-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-sf-btn tm-sf-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<p class="tm-sf-enlace"></p>'
      + '</div>'
      + '<div class="tm-sf-hoja"><div class="tm-sf-cab"><p class="tm-sf-tit">' + titulo + '</p><span class="tm-sf-ref"></span></div>'
      + '<div class="tm-sf-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-sf-instr">' + instr + '</p>'
      + '<div class="tm-sf-cuerpo"></div></div>';

    var elRef = cont.querySelector('.tm-sf-ref');
    var elCuerpo = cont.querySelector('.tm-sf-cuerpo');
    var anchoForzado = null;
    var fragmentosActuales = [];

    function celdaHTML(frag, i) {
      var noSincopa = frag.correctas.length === 0;
      return '<span class="tm-sf-n">' + (i + 1) + '</span><div class="tm-sf-svg"></div>'
        + '<div class="tm-sf-chk' + (solucion && noSincopa ? ' sol' : '') + '">' + (solucion && noSincopa ? '☒' : '☐') + ' No hay síncopa</div>';
    }

    function pintar() {
      elCuerpo.innerHTML = '';
      if (dificil) {
        // Modo difícil: todos los fragmentos son de 2 compases (siempre
        // anchos), así que van en una sola columna; el propio SVG ya trae
        // width:100% + max-width del motor, no hace falta reescalar a mano.
        var lista = document.createElement('div'); lista.className = 'tm-sf-lista'; elCuerpo.appendChild(lista);
        fragmentosActuales.forEach(function (frag, i) {
          var c = document.createElement('div'); c.className = 'tm-sf-celda';
          c.innerHTML = celdaHTML(frag, i);
          lista.appendChild(c);
          window.tmSincopaDibujarImpresion(c.querySelector('.tm-sf-svg'), frag, solucion);
        });
      } else {
        var rej = document.createElement('div'); rej.className = 'tm-sf-rejilla'; elCuerpo.appendChild(rej);
        fragmentosActuales.forEach(function (frag, i) {
          var dosCompases = frag.notas.some(function (n) { return n.measure === 1; });
          var c = document.createElement('div'); c.className = 'tm-sf-celda' + (dosCompases ? ' ancha' : '');
          c.innerHTML = celdaHTML(frag, i);
          rej.appendChild(c);
          window.tmSincopaDibujarImpresion(c.querySelector('.tm-sf-svg'), frag, solucion);
        });
        var ancho = anchoForzado || elCuerpo.clientWidth || 700;
        var cols = ancho >= 420 ? 2 : 1;
        rej.style.setProperty('--tm-sf-cols', cols);
        var interior = Math.floor(ancho / cols) - 24;
        var svgs = Array.prototype.slice.call(rej.querySelectorAll('.tm-sf-celda:not(.ancha) svg'));
        if (svgs.length) {
          var anchos = svgs.map(function (s) { return Number(s.getAttribute('viewBox').split(' ')[2]); });
          var K = Math.min(1, interior / Math.max.apply(null, anchos));
          svgs.forEach(function (s, i) { s.style.width = (anchos[i] * K) + 'px'; s.style.maxWidth = 'none'; });
        }
      }
      elRef.textContent = 'teoriamusical.com.es · hoja n.º ' + semilla;
    }

    function generar(semillaFija) {
      var nueva;
      if (semillaFija) nueva = semillaFija;
      else { do { nueva = Math.floor(Math.random() * 90000 + 10000); } while (nueva === semilla); }
      semilla = nueva;
      solucion = false;
      cont.querySelector('[data-a="soluciones"]').textContent = 'Ver soluciones';
      fragmentosActuales = generarFicha(semilla, dificil);
      pintar();
      var a = cont.querySelector('.tm-sf-enlace');
      var params = '?' + (dificil ? 'hojad' : 'hoja') + '=' + semilla;
      a.innerHTML = 'Cada hoja sale de un número: con <a href="' + window.location.pathname + params + '#' + id + '">este enlace</a> (hoja n.º ' + semilla + ') se vuelve a sacar la misma.';
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
      var viejo = document.querySelector('.tm-sf-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-sf-hoja').cloneNode(true);
      clon.classList.add('tm-sf-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-sf-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-sf-print');
      var clon = document.querySelector('.tm-sf-impresion');
      if (clon) clon.parentNode.removeChild(clon);
      anchoForzado = null;
      pintar();
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-sf-print')) terminarImpresion();
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

    function init() {
      var q = new URLSearchParams(window.location.search);
      var semillaURL = Number(q.get(dificil ? 'hojad' : 'hoja')) || null;
      generar(semillaURL);
    }
    if (typeof Vex !== 'undefined') { init(); }
    else { window.addEventListener('vexflow-ready', init, { once: true }); }
  };
})();
