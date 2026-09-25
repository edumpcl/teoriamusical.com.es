/* Generador de fichas de «contratiempo» para imprimir, con botón «otra
   ficha». Uso: <div id="tmfc"></div><script>tmFichaContratiempo('tmfc');</script>
   Modo difícil: <script>tmFichaContratiempo('tmfcd', { dificil: true });</script>

   Es la versión en el navegador de la ficha en PDF (tools/generate-fichas-
   contratiempo.js / generate-fichas-contratiempo-dificil.js): 10 fragmentos
   por hoja, reutilizando window.tmContratiempoGenerar /
   tmContratiempoGenerarDificil / tmContratiempoMulberry32 /
   tmContratiempoDibujarImpresion (mismo motor que el test interactivo). En
   modo normal cada fragmento tiene como mucho un contratiempo y cabe en
   una columna estrecha; en modo difícil cada fragmento tiene de 2 a 4
   compases (siempre ancho) y puede tener varios contratiempos a la vez, o
   ninguno. Mismo patrón que ficha-sincopa-engine.js. */
(function () {
  'use strict';

  var PREGUNTAS_POR_FICHA = 10;

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
    '.tm-fc-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-fc-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-fc-datos{display:none;}',
    '.tm-fc-rejilla{display:grid;grid-template-columns:repeat(var(--tm-fc-cols,2),minmax(0,1fr));gap:6px 10px;}',
    '.tm-fc-lista{display:flex;flex-direction:column;gap:6px;}',
    '.tm-fc-celda{position:relative;min-width:0;border:1px solid #e8e0cc;border-radius:6px;padding:4px 6px 6px;break-inside:avoid;}',
    '.tm-fc-celda.ancha{grid-column:1 / -1;}',
    '.tm-fc-n{position:absolute;top:3px;left:6px;font-size:.72rem;font-weight:700;color:#9a7b28;}',
    '.tm-fc-svg{display:block;margin:0 auto;}',
    '.tm-fc-svg svg{display:block;margin:0 auto;height:auto!important;}',
    '.tm-fc-chk{font-size:.72rem;color:#555;text-align:center;margin-top:-2px;}',
    '.tm-fc-chk.sol{color:#c0392b;font-weight:700;}',
    '@media print{ .tm-fc-svg svg{height:60px!important;width:auto!important;max-width:100%!important;} }',
    '@media screen{.tm-fc-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-fc-print > *:not(.tm-fc-impresion){display:none!important;}',
    '  body.tm-fc-print .tm-fc-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-fc-print .tm-fc-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:6px 0 8px;}',
    '  body.tm-fc-print .tm-fc-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  body.tm-fc-print .tm-fc-cab{margin-bottom:6px;padding-bottom:4px;}',
    '  body.tm-fc-print .tm-fc-instr{font-size:.78rem;margin:0 0 6px;}',
    '  body.tm-fc-print .tm-fc-rejilla{gap:3px 8px;}',
    '  body.tm-fc-print .tm-fc-lista{gap:3px;}',
    '  body.tm-fc-print .tm-fc-celda{padding:2px 4px;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  function generarFicha(semilla, dificil) {
    var rng = window.tmContratiempoMulberry32(semilla);
    var frags = [];
    var gen = dificil ? window.tmContratiempoGenerarDificil : window.tmContratiempoGenerar;
    for (var i = 0; i < PREGUNTAS_POR_FICHA; i++) frags.push(gen(rng));
    return frags;
  }

  window.tmFichaContratiempo = function (id, opts) {
    var cont = document.getElementById(id);
    var dificil = !!(opts && opts.dificil);
    if (!cont || !window.tmContratiempoGenerar) return;
    if (!document.getElementById('tm-fc-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fc-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var semilla = 0, solucion = false;
    var titulo = dificil ? 'Contratiempo — nivel difícil' : 'Nota a contratiempo';
    var instr = dificil
      ? 'Cada fragmento tiene de 2 a 4 compases. Rodea con un círculo TODAS las notas que estén a contratiempo (puede haber varias, o ninguna), o marca la casilla «No hay contratiempo» si el fragmento no tiene ninguna.'
      : 'Rodea con un círculo la nota que está a contratiempo, o marca la casilla «No hay contratiempo» si el fragmento no lo tiene.';

    cont.innerHTML = '<div class="tm-fc">'
      + '<div class="tm-fc-acciones">'
      + '<button type="button" class="tm-fc-btn tm-fc-btn-1" data-a="generar">Generar otra ficha</button>'
      + '<button type="button" class="tm-fc-btn tm-fc-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-fc-btn tm-fc-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<p class="tm-fc-enlace"></p>'
      + '</div>'
      + '<div class="tm-fc-hoja"><div class="tm-fc-cab"><p class="tm-fc-tit">' + titulo + '</p><span class="tm-fc-ref"></span></div>'
      + '<div class="tm-fc-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-fc-instr">' + instr + '</p>'
      + '<div class="tm-fc-cuerpo"></div></div>';

    var elRef = cont.querySelector('.tm-fc-ref');
    var elCuerpo = cont.querySelector('.tm-fc-cuerpo');
    var anchoForzado = null;
    var fragmentosActuales = [];

    function celdaHTML(frag, i) {
      var noContratiempo = frag.correctas.length === 0;
      return '<span class="tm-fc-n">' + (i + 1) + '</span><div class="tm-fc-svg"></div>'
        + '<div class="tm-fc-chk' + (solucion && noContratiempo ? ' sol' : '') + '">' + (solucion && noContratiempo ? '☒' : '☐') + ' No hay contratiempo</div>';
    }

    function pintar() {
      elCuerpo.innerHTML = '';
      if (dificil) {
        var lista = document.createElement('div'); lista.className = 'tm-fc-lista'; elCuerpo.appendChild(lista);
        fragmentosActuales.forEach(function (frag, i) {
          var c = document.createElement('div'); c.className = 'tm-fc-celda';
          c.innerHTML = celdaHTML(frag, i);
          lista.appendChild(c);
          window.tmContratiempoDibujarImpresion(c.querySelector('.tm-fc-svg'), frag, solucion);
        });
      } else {
        var rej = document.createElement('div'); rej.className = 'tm-fc-rejilla'; elCuerpo.appendChild(rej);
        fragmentosActuales.forEach(function (frag, i) {
          var dosCompases = frag.notas.some(function (n) { return n.measure === 1; });
          var c = document.createElement('div'); c.className = 'tm-fc-celda' + (dosCompases ? ' ancha' : '');
          c.innerHTML = celdaHTML(frag, i);
          rej.appendChild(c);
          window.tmContratiempoDibujarImpresion(c.querySelector('.tm-fc-svg'), frag, solucion);
        });
        var ancho = anchoForzado || elCuerpo.clientWidth || 700;
        var cols = ancho >= 420 ? 2 : 1;
        rej.style.setProperty('--tm-fc-cols', cols);
        var interior = Math.floor(ancho / cols) - 24;
        var svgs = Array.prototype.slice.call(rej.querySelectorAll('.tm-fc-celda:not(.ancha) svg'));
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
      var a = cont.querySelector('.tm-fc-enlace');
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

    function init() {
      var q = new URLSearchParams(window.location.search);
      var semillaURL = Number(q.get(dificil ? 'hojad' : 'hoja')) || null;
      generar(semillaURL);
    }
    if (typeof Vex !== 'undefined') { init(); }
    else { window.addEventListener('vexflow-ready', init, { once: true }); }
  };
})();
