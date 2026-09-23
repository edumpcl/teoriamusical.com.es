/* Generador de fichas de acordes de séptima para imprimir, con botón «otra
   ficha». Uso: <div id="tmfs"></div><script>tmFichaSeptimas('tmfs', {
     modo: 'escribir'|'analizar', tiposIds: ['dominante'] o los 3, invs: [0] o [0,1,2,3]
   });</script>

   Es la versión en el navegador de la ficha en PDF (tools/generate-fichas-
   septimas.js): mismos 3 tipos, misma disposición de 21 acordes en 3 fases
   de dificultad creciente, pero generando una hoja NUEVA cada vez que se
   pulsa el botón, sin repetir ningún acorde (misma tónica+tipo+inversión+
   clave) mientras el fondo disponible lo permita — igual patrón que
   ficha-cadencias-engine.js, adaptado al criterio por costes del generador
   de séptimas (cuota de clave de fa, reparto de tipos/inversiones, sin
   repetir raíz). Reutiliza window.tmSe7Chords (los 3 tipos, expuesto por
   septimas-engine.js) para no duplicar la teoría. */
(function () {
  'use strict';

  function T7() { return window.tmSe7Chords; }

  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var SEMI = [0, 2, 4, 5, 7, 9, 11];
  var ES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var ACC_TXT = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };
  var ACC_VF = { '-2': 'bb', '-1': 'b', '0': '', '1': '#', '2': '##' };
  var CLAVES = { sol: 'treble', fa: 'bass' };
  /* Igual que generate-fichas-septimas.js: "nivel" es un TOPE acumulado
     (como mucho N alteraciones), no un nivel exacto — casi ningún acorde de
     séptima es del todo natural (ver ese script). */
  var FASES = [{ nivel: 1, fa: 0 }, { nivel: 1, fa: 0.35 }, { nivel: 2, fa: 0.5 }];
  var TOTAL = 21;
  var INV_NOMBRE = ['Fundamental', '1ª inversión', '2ª inversión', '3ª inversión'];
  var INV_CORTO = ['fund.', '1ª inv.', '2ª inv.', '3ª inv.'];

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
    for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var tmp = c[i]; c[i] = c[j]; c[j] = tmp; }
    return c;
  }

  function acordesPosibles() {
    var out = [], tipos = T7();
    for (var l = 0; l < 7; l++) {
      for (var a = -1; a <= 1; a++) {
        tipos.forEach(function (tipo) {
          var l3 = (l + 2) % 7, l5 = (l + 4) % 7, l7 = (l + 6) % 7;
          var n3 = (SEMI[l3] - SEMI[l] + 12) % 12;
          var n5 = (SEMI[l5] - SEMI[l] + 12) % 12;
          var n7 = (SEMI[l7] - SEMI[l] + 12) % 12;
          var a3 = tipo.third - n3 + a;
          var a5 = tipo.fifth - n5 + a;
          var a7 = tipo.seventh - n7 + a;
          if (Math.abs(a3) > 2 || Math.abs(a5) > 2 || Math.abs(a7) > 2) return;
          out.push({
            tipo: tipo,
            miembros: [{ l: l, a: a }, { l: l3, a: a3 }, { l: l5, a: a5 }, { l: l7, a: a7 }],
            nivel: Math.max(Math.abs(a), Math.abs(a3), Math.abs(a5), Math.abs(a7))
          });
        });
      }
    }
    return out;
  }

  function voicing(miembros, inv, clave) {
    var base = clave === 'sol' ? 27 : 15;
    var orden = [0, 1, 2, 3].map(function (k) { return miembros[(inv + k) % 4]; });
    var notas = [], previo = -Infinity;
    orden.forEach(function (m, k) {
      var idx = m.l + 7 * Math.ceil(((k === 0 ? base : previo + 1) - m.l) / 7);
      previo = idx;
      var oct = Math.floor(idx / 7);
      notas.push({ l: m.l, a: m.a, oct: oct, key: LETRAS[m.l] + '/' + oct, acc: ACC_VF[String(m.a)] });
    });
    return notas;
  }

  function nombreNota(m) { return ES[m.l] + ACC_TXT[String(m.a)]; }

  function claveDe(key) { return key.split('|')[3]; }

  var CSS = [
    '.tm-fs{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-fs::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-fs-acciones{display:flex;flex-wrap:wrap;gap:10px;}',
    '.tm-fs-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-fs-btn-1{background:#8b6914;color:#fff;}',
    '.tm-fs-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-fs-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-fs-hoja{margin-top:18px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-fs-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-fs-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-fs-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-fs-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-fs-datos{display:none;}',
    '.tm-fs-h2{font-size:.82rem;font-weight:700;color:#8b6914;margin:12px 0 5px;text-transform:uppercase;letter-spacing:.03em;}',
    '.tm-fs-rejilla{display:grid;grid-template-columns:repeat(var(--tm-fs-cols,3),minmax(0,1fr));gap:6px 8px;}',
    '.tm-fs-celda{position:relative;min-width:0;border:1px solid #e8e0cc;border-radius:6px;padding:3px 5px 4px 20px;break-inside:avoid;page-break-inside:avoid;}',
    '.tm-fs-n{position:absolute;top:3px;left:5px;font-size:.72rem;font-weight:700;color:#9a7b28;}',
    '.tm-fs-svg{display:block;margin:0 auto;}',
    '.tm-fs-svg svg{display:block;margin:0 auto;width:100%;height:auto;}',
    '.tm-fs-pide{font-size:.78rem;text-align:center;margin:0 0 1px;color:#1a1a1a;min-height:13px;}',
    '.tm-fs-linea{display:flex;align-items:baseline;gap:4px;font-size:.72rem;margin:1px 2px 0;}',
    '.tm-fs-linea b{font-weight:600;}',
    '.tm-fs-linea>span{flex:1;border-bottom:1px solid #9a9a9a;min-height:10px;}',
    '.tm-fs-linea .tm-sol{border:0;color:#c0392b;font-weight:700;text-align:center;}',
    '@media screen{.tm-fs-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-fs-print > *:not(.tm-fs-impresion){display:none!important;}',
    '  body.tm-fs-print .tm-fs-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-fs-print .tm-fs-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:0 0 8px;}',
    '  body.tm-fs-print .tm-fs-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  function textos(config) {
    var tiposIds = config.tiposIds, invs = config.invs;
    var mixtaTipo = tiposIds.length > 1;
    var mixtaInv = invs.length > 1;
    var tiposTxt = 'Séptima de Dominante (7), Séptima de Sensible (ø7) o Séptima Disminuida (°7)';
    if (config.modo === 'analizar') {
      var posTxt = mixtaInv ? 'en las cuatro posiciones' : ('en ' + INV_NOMBRE[invs[0]].toLowerCase());
      return {
        titulo: 'Analizar acordes de séptima ' + posTxt,
        instrucciones: mixtaInv
          ? ('Escribe debajo de cada acorde su <b>tipo</b> —' + tiposTxt + '— y su <b>posición</b>: fundamental, 1ª, 2ª o 3ª inversión.')
          : ('Todos los acordes están en ' + INV_NOMBRE[invs[0]].toLowerCase() + '. Escribe debajo de cada uno su <b>tipo</b>: ' + tiposTxt + '.')
      };
    }
    var tipoTxt = mixtaTipo ? 'acordes de séptima mezclados' : ('de la ' + T7().filter(function (t) { return t.id === tiposIds[0]; })[0].label.toLowerCase());
    return {
      titulo: 'Escribir ' + (mixtaTipo ? tipoTxt : 'acordes ' + tipoTxt),
      instrucciones: 'Cada pentagrama trae la <b>nota más grave</b> del acorde. Añade las otras tres para formar el acorde indicado en la posición que se pide (fundamental: 3ª+5ª+7ª; 1ª inv.: 5ª+7ª+fund.; 2ª inv.: 7ª+fund.+3ª; 3ª inv.: fund.+3ª+5ª).' + (mixtaTipo ? ' El tipo cambia en cada ejercicio: se indica junto a la nota.' : '')
    };
  }

  window.tmFichaSeptimas = function (id, config) {
    var cont = document.getElementById(id);
    if (!cont || !T7()) return;
    config = config || {};
    var tiposIds = config.tiposIds || ['dominante', 'sensible', 'disminuida'];
    var invs = config.invs || [0, 1, 2, 3];
    var modo = config.modo === 'analizar' ? 'analizar' : 'escribir';
    var txt = textos({ modo: modo, tiposIds: tiposIds, invs: invs });

    if (!document.getElementById('tm-fs-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fs-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var semilla = 0, solucion = false, itemsActuales = [];
    var todos = acordesPosibles().filter(function (c) { return tiposIds.indexOf(c.tipo.id) !== -1; });
    /* Firma única de cada ejercicio: tipo + raíz (letra+alteración) + clave +
       inversión — dos ejercicios con la misma raíz/tipo pero clave o
       inversión distinta SÍ cuentan como ejercicios distintos, igual que en
       tools/generate-fichas-septimas.js. */
    function firma(c) { return c.tipo.id + '|' + c.miembros[0].l + ',' + c.miembros[0].a + '|' + c.inv + '|' + c.clave; }
    // No repetir ningún ejercicio de una ficha a la siguiente mientras el
    // fondo disponible lo permita (igual patrón que ficha-cadencias-engine.js).
    var usados = {};

    cont.innerHTML = '<div class="tm-fs">'
      + '<div class="tm-fs-acciones">'
      + '<button type="button" class="tm-fs-btn tm-fs-btn-1" data-a="generar">Generar otra ficha</button>'
      + '<button type="button" class="tm-fs-btn tm-fs-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-fs-btn tm-fs-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<p class="tm-fs-enlace"></p>'
      + '</div>'
      + '<div class="tm-fs-hoja"><div class="tm-fs-cab"><p class="tm-fs-tit">' + txt.titulo + '</p><span class="tm-fs-ref"></span></div>'
      + '<div class="tm-fs-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-fs-instr">' + txt.instrucciones + '</p>'
      + '<div class="tm-fs-cuerpo tm-fs-rejilla"></div></div>';

    var elRef = cont.querySelector('.tm-fs-ref');
    var elCuerpo = cont.querySelector('.tm-fs-cuerpo');
    var anchoForzado = null;

    function elegirItems(semillaHoja) {
      var rnd = mulberry32(semillaHoja), out = [], marcadosAhora = {};
      FASES.forEach(function (f) {
        var meta = Math.floor(TOTAL / FASES.length) + (FASES.indexOf(f) < TOTAL % FASES.length ? 1 : 0);
        var enFa = Math.round(meta * f.fa);

        var casos = [];
        todos.filter(function (c) { return c.nivel <= f.nivel; }).forEach(function (c) {
          Object.keys(CLAVES).forEach(function (clave) {
            invs.forEach(function (inv) { casos.push({ tipo: c.tipo, miembros: c.miembros, nivel: c.nivel, clave: clave, inv: inv }); });
          });
        });

        var disponibles = casos.filter(function (c) { return !usados[firma(c)]; });
        if (disponibles.length < meta) {
          casos.forEach(function (c) { var k = firma(c); if (!marcadosAhora[k]) delete usados[k]; });
          disponibles = casos.filter(function (c) { return !usados[firma(c)]; });
        }

        var elegidos = [];
        var libres = barajar(disponibles, rnd);
        while (elegidos.length < meta && libres.length) {
          var hoja = out.concat(elegidos);
          var faltanFa = enFa - elegidos.filter(function (x) { return x.clave === 'fa'; }).length;
          var faltanSol = (meta - enFa) - elegidos.filter(function (x) { return x.clave === 'sol'; }).length;
          var mejor = 0, mejorCoste = Infinity;
          libres.forEach(function (c, idx) {
            var coste = 0;
            if (c.clave === 'fa' && faltanFa <= 0) coste += 6;
            if (c.clave === 'sol' && faltanSol <= 0) coste += 6;
            if (tiposIds.length > 1) coste += hoja.filter(function (x) { return x.tipo.id === c.tipo.id; }).length * 1.5;
            if (invs.length > 1) coste += hoja.filter(function (x) { return x.inv === c.inv; }).length * 1.5;
            var mismaRaiz = function (x) { return x.tipo.id === c.tipo.id && x.miembros[0].l === c.miembros[0].l && x.miembros[0].a === c.miembros[0].a; };
            if (hoja.some(mismaRaiz)) coste += 4;
            if (hoja.some(function (x) { return mismaRaiz(x) && x.inv === c.inv && x.clave === c.clave; })) coste += 40;
            if (coste < mejorCoste) { mejorCoste = coste; mejor = idx; }
          });
          var elegido = libres.splice(mejor, 1)[0];
          elegidos.push(elegido);
          usados[firma(elegido)] = true;
          marcadosAhora[firma(elegido)] = true;
        }
        barajar(elegidos, rnd).forEach(function (c) { out.push({ tipo: c.tipo, miembros: c.miembros, inv: c.inv, clave: c.clave, notas: voicing(c.miembros, c.inv, c.clave) }); });
      });
      return out.slice(0, TOTAL);
    }

    function dibujarCelda(div, it, opts) {
      var V = Vex.Flow;
      var r = new V.Renderer(div, V.Renderer.Backends.SVG);
      r.resize(opts.w, opts.h);
      var ctx = r.getContext();
      var stave = new V.Stave(2, opts.y, opts.w - 8);
      stave.addClef(opts.clef).setContext(ctx).draw();
      var notas = opts.soloGrave ? it.notas.slice(0, 1) : it.notas;
      var keys = notas.map(function (n) { return n.key; });
      var sn = new V.StaveNote({ keys: keys, duration: 'w', clef: opts.clef });
      var accs = [];
      notas.forEach(function (n, i) { if (n.acc) { accs[i] = new V.Accidental(n.acc); sn.addModifier(accs[i], i); } });
      /* En la solución de "escribir" las 3 notas añadidas van en rojo y la
         dada se queda en negro: se ve de un vistazo qué había que escribir
         (igual criterio que tools/generate-fichas-septimas.js). */
      (opts.rojo || []).forEach(function (i) {
        var estilo = { fillStyle: '#c0392b', strokeStyle: '#c0392b' };
        if (typeof sn.setKeyStyle === 'function') sn.setKeyStyle(i, estilo);
        if (accs[i]) accs[i].setStyle(estilo);
      });
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false);
      voice.addTickables([sn]);
      new V.Formatter().joinVoices([voice]).format([voice], opts.w - 50);
      voice.draw(ctx, stave);
      var svg = div.querySelector('svg');
      if (svg) { svg.setAttribute('viewBox', '0 0 ' + opts.w + ' ' + opts.h); svg.style.width = '100%'; svg.style.height = 'auto'; }
    }

    function pintar() {
      elCuerpo.innerHTML = '';
      itemsActuales.forEach(function (it, i) {
        var c = document.createElement('div'); c.className = 'tm-fs-celda';
        if (modo === 'analizar') {
          var tipoHueco = solucion ? ('<span class="tm-sol">' + it.tipo.label + '</span>') : '<span></span>';
          var invHueco = invs.length > 1 ? (solucion ? ('<span class="tm-sol">' + INV_NOMBRE[it.inv] + '</span>') : '<span></span>') : '';
          c.innerHTML = '<span class="tm-fs-n"></span><div class="tm-fs-svg"></div>'
            + '<p class="tm-fs-linea"><b>Tipo:</b>' + tipoHueco + '</p>'
            + (invs.length > 1 ? ('<p class="tm-fs-linea"><b>Posición:</b>' + invHueco + '</p>') : '');
        } else {
          var mezclada = tiposIds.length > 1;
          c.innerHTML = '<span class="tm-fs-n"></span>'
            + '<p class="tm-fs-pide"><b>' + nombreNota(it.miembros[0]) + (mezclada ? ' — ' + it.tipo.short : '') + '</b> · ' + INV_CORTO[it.inv] + '</p>'
            + '<div class="tm-fs-svg"></div>';
        }
        elCuerpo.appendChild(c);
        var svgDiv = c.querySelector('.tm-fs-svg');
        dibujarCelda(svgDiv, it, { w: 210, h: 86, y: 4, clef: CLAVES[it.clave], soloGrave: modo === 'escribir' && !solucion, rojo: modo === 'escribir' && solucion ? [1, 2, 3] : null });
      });
      var n = 0;
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-fs-celda'), function (c) { c.querySelector('.tm-fs-n').textContent = ++n; });
      var ancho = anchoForzado || elCuerpo.clientWidth || 700;
      var cols = ancho >= 620 ? 3 : ancho >= 420 ? 2 : 1;
      elCuerpo.style.setProperty('--tm-fs-cols', cols);
      var svgs = Array.prototype.slice.call(elCuerpo.querySelectorAll('svg'));
      var interior = Math.floor(ancho / cols) - 20;
      svgs.forEach(function (s) { s.style.width = interior + 'px'; s.style.maxWidth = '100%'; });
      elRef.textContent = 'teoriamusical.com.es · hoja n.º ' + semilla;
    }

    function generar(semillaFija) {
      var nueva;
      if (semillaFija) { nueva = semillaFija; usados = {}; }
      else { do { nueva = Math.floor(Math.random() * 90000 + 10000); } while (nueva === semilla); }
      semilla = nueva;
      solucion = false;
      cont.querySelector('[data-a="soluciones"]').textContent = 'Ver soluciones';
      itemsActuales = elegirItems(semilla);
      pintar();
      var a = cont.querySelector('.tm-fs-enlace');
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
      var viejo = document.querySelector('.tm-fs-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-fs-hoja').cloneNode(true);
      clon.classList.add('tm-fs-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-fs-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-fs-print');
      var clon = document.querySelector('.tm-fs-impresion');
      if (clon) clon.parentNode.removeChild(clon);
      anchoForzado = null;
      pintar();
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-fs-print')) terminarImpresion();
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

    window.tmFichaSeptimasDebug = function () { return { semilla: semilla, items: itemsActuales, usados: Object.keys(usados) }; };

    var q = new URLSearchParams(window.location.search);
    var semillaURL = Number(q.get('hoja')) || null;
    generar(semillaURL);
  };
})();
