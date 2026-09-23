/* Generador de fichas de cadencias para imprimir, con botón «otra ficha».
   Uso: <div id="tmcf"></div><script>tmFichaCadencias('tmcf');</script>

   Es la versión en el navegador de la ficha en PDF (tools/generate-fichas-
   cadencias.js): mismo formato exacto (4 conclusivas + 4 suspensivas + 8
   mezcladas, la combinación que llena una hoja A4 sin desbordar — ver el
   comentario de ese script), pero generando una hoja NUEVA cada vez que se
   pulsa el botón, para quien quiera varias fichas distintas sin repetir.
   Reutiliza cadencias-engine.js (dibujar/TIPOS_NIVEL/CADENCIAS/VOCES/nota),
   pero NO su generarLote(): aquí el tipo, la tonalidad y la variante de voces
   se eligen a mano (elegirItems/construirItem) para poder llevar la cuenta de
   qué combinaciones ya han salido en la sesión y no repetirlas mientras se
   pueda (ver el comentario de «usados», más abajo). Necesita cargarse después
   de completar-compas-engine.js, tipo-de-comienzo-engine.js y
   cadencias-engine.js. */
(function () {
  'use strict';

  function T() { return window.tmCadenciasTest; }
  function CT() { return window.tmComienzoTest; }

  var LOTES = [
    [1, 4, 'Conclusivas (auténtica perfecta, auténtica imperfecta, plagal)'],
    [2, 4, 'Suspensivas (semicadencia sobre V, sobre IV, y cadencia rota)'],
    [3, 8, 'Mezcladas (los seis tipos)']
  ];

  var CSS = [
    '.tm-cf{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-cf::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-cf-acciones{display:flex;flex-wrap:wrap;gap:10px;}',
    '.tm-cf-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-cf-btn-1{background:#8b6914;color:#fff;}',
    '.tm-cf-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-cf-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-cf-hoja{margin-top:18px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-cf-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-cf-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-cf-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-cf-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-cf-datos{display:none;}',
    '.tm-cf-h2{font-size:.82rem;font-weight:700;color:#8b6914;margin:12px 0 5px;text-transform:uppercase;letter-spacing:.03em;}',
    '.tm-cf-rejilla{display:grid;grid-template-columns:repeat(var(--tm-cf-cols,4),minmax(0,1fr));gap:6px 8px;}',
    '.tm-cf-celda{position:relative;min-width:0;border:1px solid #e8e0cc;border-radius:6px;padding:3px 5px 4px 20px;break-inside:avoid;page-break-inside:avoid;}',
    '.tm-cf-n{position:absolute;top:3px;left:5px;font-size:.72rem;font-weight:700;color:#9a7b28;}',
    '.tm-cf-svg{display:block;margin:0 auto;}',
    '.tm-cf-svg svg{display:block;margin:0 auto;width:100%;height:auto;}',
    '.tm-cf-ops{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0 4px;font-size:.68rem;color:#333;padding:1px 2px 0;}',
    '.tm-cf-op{display:flex;align-items:flex-start;gap:3px;line-height:1.15;padding:1px 0;min-width:0;overflow-wrap:break-word;}',
    '.tm-cf-caja{display:inline-block;width:8px;height:8px;min-width:8px;border:1.2px solid #777;border-radius:2px;margin-top:2px;}',
    '.tm-cf-op.tm-sol{color:#c0392b;font-weight:700;}',
    '.tm-cf-op.tm-sol .tm-cf-caja{border-color:#c0392b;background:#c0392b;}',
    '@media screen{.tm-cf-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-cf-print > *:not(.tm-cf-impresion){display:none!important;}',
    '  body.tm-cf-print .tm-cf-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-cf-print .tm-cf-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:0 0 8px;}',
    '  body.tm-cf-print .tm-cf-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  window.tmFichaCadencias = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !T()) return;
    if (!document.getElementById('tm-cf-css')) {
      var st = document.createElement('style');
      st.id = 'tm-cf-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var semilla = 0, solucion = false, itemsActuales = [];
    // Qué combinaciones (tipo|tonalidad|variante) ya han salido esta sesión,
    // para no repetir ningún ejercicio de una ficha a la siguiente mientras se
    // pueda evitar. Hay 84 combinaciones en total (6 tipos × 7 tonalidades ×
    // 2 disposiciones de voces por tipo: cada una es una plantilla fija, así
    // que cada combinación es siempre el mismo ejercicio) — con eso, y lo que
    // pide cada nivel (y que el nivel mezclado comparte el mismo fondo que
    // los otros dos, ver elegirItems), da para varias fichas seguidas sin que
    // se repita nada antes de tener que reciclar.
    var usados = {};

    cont.innerHTML = '<div class="tm-cf">'
      + '<div class="tm-cf-acciones">'
      + '<button type="button" class="tm-cf-btn tm-cf-btn-1" data-a="generar">Generar otra ficha</button>'
      + '<button type="button" class="tm-cf-btn tm-cf-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-cf-btn tm-cf-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<p class="tm-cf-enlace">Cada hoja sale de un número: con el enlace se vuelve a sacar la misma.</p>'
      + '</div>'
      + '<div class="tm-cf-hoja"><div class="tm-cf-cab"><p class="tm-cf-tit">¿Qué cadencia es?</p><span class="tm-cf-ref"></span></div>'
      + '<div class="tm-cf-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-cf-instr">Cada pentagrama muestra los dos últimos acordes de una frase, a piano (clave de sol y de fa, a cuatro voces). Marca de qué cadencia se trata.</p>'
      + '<div class="tm-cf-cuerpo"></div></div>';

    var elRef = cont.querySelector('.tm-cf-ref');
    var elCuerpo = cont.querySelector('.tm-cf-cuerpo');
    var anchoForzado = null;

    // Elige, para cada nivel, qué combinaciones (tipo, tonalidad) entran en
    // esta hoja, evitando repetir las ya usadas en la sesión mientras el
    // hueco disponible lo permita (si no llega, se reinicia el marcador: eso
    // es lo que abre un nuevo ciclo de ~5 fichas sin repetir).
    function elegirItems(semillaHoja) {
      var Tt = T(), TN = CT().TONALIDADES, rnd = mulberry32(semillaHoja), out = [];
      // El nivel mezclado comparte tipos con los otros dos (es la unión de
      // los seis), así que las 84 combinaciones son un fondo COMPARTIDO, no
      // tres bolsas independientes. Lo que se elige para un nivel debe
      // recordarse al elegir los siguientes DENTRO DE LA MISMA HOJA (para no
      // repetir un ejercicio dos veces en la misma ficha); por eso, si toca
      // reiniciar el marcador por quedarse sin combinaciones libres, solo se
      // olvida lo usado en fichas ANTERIORES, nunca lo recién elegido ahora.
      var marcadosAhora = {};
      LOTES.forEach(function (lote) {
        var nivel = lote[0], cuantos = lote[1];
        var pool = [];
        Tt.TIPOS_NIVEL[nivel].forEach(function (tp) {
          TN.forEach(function (tn) { Tt.VOCES[tp].forEach(function (v, vi) { pool.push(tp + '|' + tn.id + '|' + vi); }); });
        });
        var disponibles = pool.filter(function (k) { return !usados[k]; });
        if (disponibles.length < cuantos) {
          pool.forEach(function (k) { if (!marcadosAhora[k]) delete usados[k]; });
          disponibles = pool.filter(function (k) { return !usados[k]; });
        }
        barajar(disponibles, rnd).slice(0, cuantos).forEach(function (k) {
          usados[k] = true; marcadosAhora[k] = true;
          var partes = k.split('|'), tonal = TN.filter(function (tn) { return tn.id === partes[1]; })[0];
          out.push(construirItem(nivel, partes[0], tonal, Number(partes[2])));
        });
      });
      return out;
    }
    function barajar(arr, rnd) {
      var c = arr.slice();
      for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
      return c;
    }
    // Misma construcción que generarUno() en cadencias-engine.js (voces fijas
    // por tipo y variante, transportadas a la tonalidad): se repite aquí
    // porque aquí el tipo, la variante y la tonalidad ya vienen decididos
    // (por elegirItems), no al azar.
    function construirItem(nivel, tipo, tonal, variante) {
      var Tt = T(), v = Tt.VOCES[tipo][variante];
      var t = tonal.tonica > 3 ? tonal.tonica - 7 : tonal.tonica;
      var acordes = [0, 1].map(function (k) {
        return { S: Tt.nota(v.S[k] + t), A: Tt.nota(v.A[k] + t), T: Tt.nota(v.T[k] + t), B: Tt.nota(v.B[k] + t) };
      });
      return { nivel: nivel, tipo: tipo, variante: variante, tonalidad: tonal.id, acordes: acordes };
    }

    function pintar() {
      var Tt = T();
      elCuerpo.innerHTML = '';
      LOTES.forEach(function (lote) {
        var nivel = lote[0], titulo = lote[2];
        var h = document.createElement('p'); h.className = 'tm-cf-h2'; h.textContent = titulo;
        elCuerpo.appendChild(h);
        var rej = document.createElement('div'); rej.className = 'tm-cf-rejilla'; elCuerpo.appendChild(rej);
        itemsActuales.filter(function (it) { return it.nivel === nivel; }).forEach(function (it) {
          var tipos = Tt.TIPOS_NIVEL[it.nivel];
          var c = document.createElement('div'); c.className = 'tm-cf-celda';
          var ops = tipos.map(function (t) {
            var marcada = solucion && t === it.tipo;
            return '<span class="tm-cf-op' + (marcada ? ' tm-sol' : '') + '"><span class="tm-cf-caja"></span>' + Tt.CADENCIAS[t].nombre + '</span>';
          }).join('');
          c.innerHTML = '<span class="tm-cf-n"></span><div class="tm-cf-svg"></div><div class="tm-cf-ops">' + ops + '</div>';
          rej.appendChild(c);
          Tt.dibujar(c.querySelector('.tm-cf-svg'), it);
        });
      });
      // Numera de corrido y aprovecha el ancho disponible en cada nivel.
      var n = 0;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-cf-celda'), function (c) { c.querySelector('.tm-cf-n').textContent = ++n; });
      var ancho = anchoForzado || elCuerpo.clientWidth || 700;
      // Cada celda lleva dentro su propio grid de 2 columnas con las respuestas
      // (etiquetas largas, «Semicadencia sobre la subdominante»): necesita más
      // ancho por celda que una figura suelta, así que los cortes son más altos
      // que en las demás rejillas del sitio.
      var cols = ancho >= 760 ? 4 : ancho >= 580 ? 3 : ancho >= 400 ? 2 : 1;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-cf-rejilla'), function (rej) {
        rej.style.setProperty('--tm-cf-cols', cols);
        var interior = Math.floor(ancho / cols) - 30;
        var svgs = Array.prototype.slice.call(rej.querySelectorAll('svg'));
        var anchos = svgs.map(function (s) { return Number(s.getAttribute('viewBox').split(' ')[2]); });
        var K = Math.min(1, interior / Math.max.apply(null, anchos));
        svgs.forEach(function (s, i) { s.style.width = (anchos[i] * K) + 'px'; s.style.maxWidth = 'none'; });
      });
      elRef.textContent = 'teoriamusical.com.es · hoja n.º ' + semilla;
    }

    function mulberry32(a) {
      return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    function generar(semillaFija) {
      var nueva;
      // Un enlace a una hoja concreta debe reproducirla tal cual, sin que
      // dependa de qué se haya generado antes en esta sesión: por eso reinicia
      // el marcador de «ya usados» (solo en este caso, no al pulsar el botón).
      if (semillaFija) { nueva = semillaFija; usados = {}; }
      else { do { nueva = Math.floor(Math.random() * 90000 + 10000); } while (nueva === semilla); }
      semilla = nueva;
      solucion = false;
      cont.querySelector('[data-a="soluciones"]').textContent = 'Ver soluciones';
      itemsActuales = elegirItems(semilla);
      pintar();
      window.tmFichaCadenciasDebug = function () { return { semilla: semilla, items: itemsActuales, usados: Object.keys(usados) }; };
      var a = cont.querySelector('.tm-cf-enlace');
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

    /* Igual que en el generador de fichas de acordes: se clona la hoja como
       hija directa de <body> antes de imprimir (con visibility:hidden en vez
       de display:none la ficha salía en varias páginas, casi todas en
       blanco). */
    function prepararImpresion() {
      anchoForzado = 700;
      pintar();
      var viejo = document.querySelector('.tm-cf-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-cf-hoja').cloneNode(true);
      clon.classList.add('tm-cf-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-cf-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-cf-print');
      var clon = document.querySelector('.tm-cf-impresion');
      if (clon) clon.parentNode.removeChild(clon);
      anchoForzado = null;
      pintar();
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-cf-print')) terminarImpresion();
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
