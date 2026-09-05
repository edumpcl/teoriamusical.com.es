/* Generador de fichas de intervalos — crea hojas nuevas en el navegador.
 *
 * Misma teoría y mismas reglas que las fichas PDF de tools/generate-fichas-intervalos.js
 * (progresión de naturales a alteradas, sin repetir el mismo par de notas, sin
 * dobles alteraciones, rango La3-La5), pero con los ejercicios sorteados en el
 * momento: cada pulsación da una hoja distinta.
 *
 * Uso:  <div id="tmfg"></div>  +  tmFichasGenerador('tmfg')
 * Requiere VexFlow 4 (Vex.Flow) cargado antes.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------- teoría */

  var LETTERS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var NS = [0, 2, 4, 5, 7, 9, 11];
  var NOMBRE_CAL = { M: 'Mayor', m: 'menor', J: 'justa', A: 'aumentada', d: 'disminuida' };

  var CALIDADES = {
    2: [{ q: 'm', s: 1, peso: 4 }, { q: 'M', s: 2, peso: 4 }, { q: 'd', s: 0, peso: 1 }, { q: 'A', s: 3, peso: 1 }],
    3: [{ q: 'm', s: 3, peso: 4 }, { q: 'M', s: 4, peso: 4 }, { q: 'd', s: 2, peso: 1 }, { q: 'A', s: 5, peso: 1 }],
    4: [{ q: 'J', s: 5, peso: 6 }, { q: 'A', s: 6, peso: 2 }, { q: 'd', s: 4, peso: 1 }],
    5: [{ q: 'J', s: 7, peso: 6 }, { q: 'd', s: 6, peso: 2 }, { q: 'A', s: 8, peso: 1 }],
    6: [{ q: 'm', s: 8, peso: 4 }, { q: 'M', s: 9, peso: 4 }, { q: 'd', s: 7, peso: 1 }, { q: 'A', s: 10, peso: 1 }],
    7: [{ q: 'm', s: 10, peso: 4 }, { q: 'M', s: 11, peso: 4 }, { q: 'd', s: 9, peso: 1 }, { q: 'A', s: 12, peso: 1 }],
    8: [{ q: 'J', s: 12, peso: 6 }, { q: 'd', s: 11, peso: 1 }, { q: 'A', s: 13, peso: 1 }]
  };

  var MIN_MIDI = 57;   // La3
  var MAX_MIDI = 81;   // La5

  function midi(n) { return 12 * (n.oct + 1) + NS[n.l] + n.alt; }
  function vexKey(n) {
    var a = n.alt > 0 ? new Array(n.alt + 1).join('#') : n.alt < 0 ? new Array(-n.alt + 1).join('b') : '';
    return LETTERS[n.l] + a + '/' + n.oct;
  }
  function accGlyph(n) {
    return n.alt > 0 ? new Array(n.alt + 1).join('#') : n.alt < 0 ? new Array(-n.alt + 1).join('b') : null;
  }

  function segundaNota(base, num, semis, dir) {
    var abs = base.l + (num - 1) * dir;
    var oct = base.oct + Math.floor(abs / 7);
    var l = ((abs % 7) + 7) % 7;
    var natSemis = (12 * Math.floor(abs / 7) + NS[l]) - NS[base.l];
    return { l: l, oct: oct, alt: base.alt + dir * semis - natSemis };
  }

  /* Todos los intervalos posibles de ese número dentro del rango, separados en
     los que no llevan alteración y los que sí (por especie). */
  function enumerar(num) {
    var nat = [], alt = {};
    CALIDADES[num].forEach(function (c) { alt[c.q] = []; });

    for (var oct = 2; oct <= 6; oct++) {
      for (var l = 0; l < 7; l++) {
        for (var k = -1; k <= 1; k++) {
          var base = { l: l, oct: oct, alt: k };
          var m1 = midi(base);
          if (m1 < MIN_MIDI || m1 > MAX_MIDI) continue;

          [1, -1].forEach(function (dir) {
            CALIDADES[num].forEach(function (cal) {
              var n2 = segundaNota(base, num, cal.s, dir);
              if (Math.abs(n2.alt) > 1) return;
              var m2 = midi(n2);
              if (m2 < MIN_MIDI || m2 > MAX_MIDI) return;
              var ej = {
                n1: { key: vexKey(base), acc: accGlyph(base) },
                n2: { key: vexKey(n2), acc: accGlyph(n2) },
                dir: dir,
                etiqueta: num + 'ª ' + cal.q,
                larga: num + 'ª ' + NOMBRE_CAL[cal.q]
              };
              if (base.alt === 0 && n2.alt === 0) nat.push(ej);
              else alt[cal.q].push(ej);
            });
          });
        }
      }
    }
    return { nat: nat, alt: alt };
  }

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function barajarCon(rnd) {
    return function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(rnd() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    };
  }

  /* Ejercicios de UN número. 'dificultad': naturales | progresivo | alteradas. */
  function generarUno(num, total, rnd, dificultad) {
    var barajar = barajarCon(rnd);
    var e = enumerar(num);
    var natAsc = barajar(e.nat.filter(function (x) { return x.dir > 0; }));
    var natResto = barajar(e.nat.filter(function (x) { return x.dir < 0; }));
    var porCal = {};
    CALIDADES[num].forEach(function (c) { porCal[c.q] = barajar(e.alt[c.q]); });

    var out = [], usados = {};
    function meter(x, fase) {
      if (!x) return;
      var k = x.n1.key + '>' + x.n2.key;
      if (usados[k]) return;
      usados[k] = 1;
      x.fase = fase;
      out.push(x);
    }

    var nAsc = dificultad === 'alteradas' ? 0
      : dificultad === 'naturales' ? Math.round(total * 0.4)
        : Math.round(total * 0.28);
    var nNat = dificultad === 'alteradas' ? 0
      : dificultad === 'naturales' ? total
        : Math.round(total * 0.45);

    for (var i = 0; out.length < nAsc && i < natAsc.length; i++) meter(natAsc[i], 'natAsc');
    var mezcla = barajar(natResto.concat(natAsc));
    for (var j = 0; out.length < nNat && j < mezcla.length; j++) meter(mezcla[j], 'nat');

    // Cupos por especie, descontando lo que ya aportaron los naturales: sin esto
    // la escala natural inunda la hoja de una de las dos especies básicas.
    var totPesos = CALIDADES[num].reduce(function (s, c) { return s + c.peso; }, 0);
    var cupos = [];
    CALIDADES[num].forEach(function (c) {
      var yaHay = out.filter(function (x) { return x.etiqueta.slice(-1) === c.q; }).length;
      var objetivo = Math.round((c.peso / totPesos) * total);
      for (var n = yaHay; n < objetivo; n++) cupos.push(c.q);
    });
    var cola = barajar(cupos);
    var orden = CALIDADES[num].slice().sort(function (a, b) { return b.peso - a.peso; });

    var guard = 0;
    while (out.length < total && guard++ < 5000) {
      var q = cola.pop();
      var x = (q && porCal[q].length) ? porCal[q].pop() : null;
      if (!x) {
        var c2 = null;
        for (var z = 0; z < orden.length; z++) if (porCal[orden[z].q].length) { c2 = orden[z]; break; }
        if (!c2) break;
        x = porCal[c2.q].pop();
      }
      meter(x, 'alt');
    }
    return out;
  }

  /* Varios números en la misma hoja: cuotas iguales e intercalado POR FASE, para
     que la dificultad siga creciendo y no salgan primero todas las segundas. */
  function generarHoja(nums, total, semilla, dificultad) {
    var rnd = mulberry32(semilla);
    var barajar = barajarCon(rnd);
    if (nums.length === 1) return generarUno(nums[0], total, rnd, dificultad);

    var base = Math.floor(total / nums.length), resto = total % nums.length;
    var fases = { natAsc: [], nat: [], alt: [] };
    nums.forEach(function (num, i) {
      generarUno(num, base + (i < resto ? 1 : 0), rnd, dificultad).forEach(function (e) {
        fases[e.fase].push(e);
      });
    });
    return barajar(fases.natAsc).concat(barajar(fases.nat), barajar(fases.alt));
  }

  /* ------------------------------------------------------------- dibujo */

  /* Un sistema (pentagrama con varios ejercicios). Las notas se colocan a mano
     con TickContext: así las casillas quedan iguales y la solución encaja
     exactamente encima de la hoja en blanco. */
  function dibujarSistema(div, ejercicios, opts) {
    var V = Vex.Flow;
    div.innerHTML = '';
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    var alto = 20 + 40 + opts.gap + 20;
    r.resize(opts.w, alto);
    var ctx = r.getContext();

    var stave = new V.Stave(0, 0, opts.w - 2, { space_above_staff_ln: 2 });
    stave.addClef('treble').setContext(ctx).draw();

    var ySup = stave.getYForLine(0), yInf = stave.getYForLine(4);
    var x0 = stave.getNoteStartX();
    var casilla = ((stave.getX() + stave.getWidth()) - x0) / ejercicios.length;
    var svg = div.querySelector('svg');
    var NSVG = 'http://www.w3.org/2000/svg';

    function texto(x, y, s, size, fill, weight, anchor) {
      var t = document.createElementNS(NSVG, 'text');
      t.setAttribute('x', x); t.setAttribute('y', y);
      t.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
      t.setAttribute('font-size', size);
      t.setAttribute('fill', fill);
      t.setAttribute('text-anchor', anchor || 'middle');
      if (weight) t.setAttribute('font-weight', weight);
      t.textContent = s;
      svg.appendChild(t);
    }
    function linea(x1, y1, x2, y2, color) {
      var l = document.createElementNS(NSVG, 'line');
      l.setAttribute('x1', x1); l.setAttribute('y1', y1);
      l.setAttribute('x2', x2); l.setAttribute('y2', y2);
      l.setAttribute('stroke', color); l.setAttribute('stroke-width', 1);
      svg.appendChild(l);
    }
    function nota(n, x, color) {
      var sn = new V.StaveNote({ keys: [n.key], duration: 'w' });
      if (n.acc) {
        var a = new V.Accidental(n.acc);
        if (color && a.setStyle) a.setStyle({ fillStyle: color, strokeStyle: color });
        sn.addModifier(a, 0);
      }
      sn.setStave(stave);
      sn.addToModifierContext(new V.ModifierContext());
      var tc = new V.TickContext();
      tc.addTickable(sn);
      tc.preFormat();
      tc.setX(x - x0);
      if (color) sn.setStyle({ fillStyle: color, strokeStyle: color });
      sn.setContext(ctx).draw();
    }

    var yNum = ySup - 20 + 9;
    var yPie = yInf + opts.gap;

    ejercicios.forEach(function (e, i) {
      var izq = x0 + casilla * i;
      var cx = izq + casilla / 2;
      if (i > 0) linea(izq, ySup, izq, yInf, '#888');

      nota(e.n1, izq + casilla * 0.30, null);
      if (opts.modo === 'analizar') nota(e.n2, izq + casilla * 0.66, null);
      else if (opts.solucion) nota(e.n2, izq + casilla * 0.66, '#c0392b');

      texto(izq + 5, yNum, String(opts.desde + i), 10.5, '#9a7b28', null, 'start');

      var flecha = e.dir > 0 ? '↑' : '↓';
      if (opts.modo === 'analizar') {
        if (opts.solucion) texto(cx, yPie + 4, e.etiqueta + ' ' + flecha, 15, '#c0392b', '600');
        else linea(cx - casilla * 0.34, yPie, cx + casilla * 0.34, yPie, '#9a9a9a');
      } else {
        texto(cx, yPie + 4, e.etiqueta + ' ' + flecha, 14.5, '#1a1a1a', null);
      }
    });
  }

  /* ----------------------------------------------------------------- UI */

  var CSS = [
    '.tm-fg{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-fg::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-fg-fila{margin-bottom:14px;}',
    '.tm-fg-lbl{display:block;font-size:.82rem;font-weight:700;color:#1a1a2e;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em;}',
    '.tm-fg-ops{display:flex;flex-wrap:wrap;gap:8px;}',
    '.tm-fg-op{font-size:.9rem;font-weight:600;padding:9px 14px;border:1px solid #d8d0b8;background:#f5f2ea;color:#1a1a2e;border-radius:6px;cursor:pointer;font-family:inherit;min-height:40px;}',
    '.tm-fg-op[aria-pressed="true"]{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fg-acciones{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;padding-top:16px;border-top:1px solid #eee6d6;}',
    '.tm-fg-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-fg-btn-1{background:#8b6914;color:#fff;}',
    '.tm-fg-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-fg-aviso{font-size:.85rem;color:#8a6d1a;background:#fdf8ee;border-radius:6px;padding:8px 12px;margin-top:12px;}',
    '.tm-fg-hoja{margin-top:20px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 6px;}',
    '.tm-fg-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:12px;flex-wrap:wrap;}',
    '.tm-fg-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-fg-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-fg-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-fg-datos{display:none;}',
    '.tm-fg-sis{margin-bottom:6px;}',
    '.tm-fg-sis svg{max-width:100%;height:auto;}',
    '@media print{',
    '  body *{visibility:hidden!important;}',
    '  .tm-fg-hoja,.tm-fg-hoja *{visibility:visible!important;}',
    '  .tm-fg-hoja{position:absolute;left:0;top:0;width:100%;border:0;padding:0;margin:0;}',
    '  .tm-fg-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:0 0 10px;}',
    '  .tm-fg-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  @page{size:A4;margin:12mm;}',
    '}'
  ].join('\n');

  var NUMS = [2, 3, 4, 5, 6, 7, 8];
  var ORD = { 2: '2ª', 3: '3ª', 4: '4ª', 5: '5ª', 6: '6ª', 7: '7ª', 8: '8ª' };

  window.tmFichasGenerador = function (id) {
    var cont = document.getElementById(id);
    if (!cont || typeof Vex === 'undefined') return;

    if (!document.getElementById('tm-fg-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fg-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var estado = {
      nums: [2, 3],
      modo: 'analizar',
      dificultad: 'progresivo',
      total: 24,
      semilla: 0,
      solucion: false
    };

    function botones(lista, activo, onClick) {
      return lista.map(function (o) {
        return '<button type="button" class="tm-fg-op" data-v="' + o.v + '" aria-pressed="'
          + (activo(o.v) ? 'true' : 'false') + '">' + o.t + '</button>';
      }).join('');
    }

    cont.innerHTML =
      '<div class="tm-fg">'
      + '<div class="tm-fg-fila"><span class="tm-fg-lbl">Intervalos de la ficha</span>'
      + '<div class="tm-fg-ops" data-g="nums">'
      + botones(NUMS.map(function (n) { return { v: n, t: ORD[n] }; }),
        function (v) { return estado.nums.indexOf(Number(v)) >= 0; })
      + '</div></div>'

      + '<div class="tm-fg-fila"><span class="tm-fg-lbl">Qué hace el alumno</span>'
      + '<div class="tm-fg-ops" data-g="modo">'
      + botones([{ v: 'analizar', t: 'Analizar el intervalo' }, { v: 'escribir', t: 'Escribir la 2ª nota' }],
        function (v) { return estado.modo === v; })
      + '</div></div>'

      + '<div class="tm-fg-fila"><span class="tm-fg-lbl">Dificultad</span>'
      + '<div class="tm-fg-ops" data-g="dificultad">'
      + botones([{ v: 'naturales', t: 'Sin alteraciones' }, { v: 'progresivo', t: 'Progresiva' },
      { v: 'alteradas', t: 'Con alteraciones' }], function (v) { return estado.dificultad === v; })
      + '</div></div>'

      + '<div class="tm-fg-fila"><span class="tm-fg-lbl">Cuántos ejercicios</span>'
      + '<div class="tm-fg-ops" data-g="total">'
      + botones([{ v: 12, t: '12' }, { v: 24, t: '24' }, { v: 42, t: '42 (hoja llena)' }],
        function (v) { return estado.total === Number(v); })
      + '</div></div>'

      + '<div class="tm-fg-acciones">'
      + '<button type="button" class="tm-fg-btn tm-fg-btn-1" data-a="generar">Generar ficha nueva</button>'
      + '<button type="button" class="tm-fg-btn tm-fg-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-fg-btn tm-fg-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<div class="tm-fg-aviso" hidden></div>'
      + '</div>'
      + '<div class="tm-fg-hoja"><div class="tm-fg-cab"><p class="tm-fg-tit"></p><span class="tm-fg-ref"></span></div>'
      + '<div class="tm-fg-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-fg-instr"></p><div class="tm-fg-sistemas"></div></div>';

    var elAviso = cont.querySelector('.tm-fg-aviso');
    var elHoja = cont.querySelector('.tm-fg-hoja');
    var elTit = cont.querySelector('.tm-fg-tit');
    var elRef = cont.querySelector('.tm-fg-ref');
    var elInstr = cont.querySelector('.tm-fg-instr');
    var elSis = cont.querySelector('.tm-fg-sistemas');
    var ejercicios = [];

    function rotulo() {
      var ns = estado.nums.slice().sort(function (a, b) { return a - b; });
      if (ns.length === 1) return 'intervalos de ' + ORD[ns[0]];
      if (ns.length === NUMS.length) return 'intervalos de 2ª a 8ª';
      return 'intervalos de ' + ns.map(function (n) { return ORD[n]; }).join(', ').replace(/, ([^,]*)$/, ' y $1');
    }

    function pintar() {
      var ancho = elSis.clientWidth || 640;
      var porSistema = ancho > 620 ? 6 : ancho > 430 ? 4 : 3;
      var gap = estado.modo === 'analizar' ? 42 : 44;
      elSis.innerHTML = '';
      for (var i = 0, desde = 1; i < ejercicios.length; i += porSistema) {
        var trozo = ejercicios.slice(i, i + porSistema);
        var div = document.createElement('div');
        div.className = 'tm-fg-sis';
        elSis.appendChild(div);
        dibujarSistema(div, trozo, {
          w: Math.max(300, ancho - 2), gap: gap, modo: estado.modo,
          solucion: estado.solucion, desde: desde
        });
        desde += trozo.length;
      }
    }

    function generar(semilla) {
      if (!estado.nums.length) {
        elAviso.hidden = false;
        elAviso.textContent = 'Elige al menos un número de intervalo.';
        return;
      }
      estado.semilla = semilla || Math.floor(Math.random() * 90000 + 10000);
      estado.solucion = false;
      cont.querySelector('[data-a="soluciones"]').textContent = 'Ver soluciones';

      var ns = estado.nums.slice().sort(function (a, b) { return a - b; });
      ejercicios = generarHoja(ns, estado.total, estado.semilla, estado.dificultad);

      elAviso.hidden = ejercicios.length >= estado.total;
      if (ejercicios.length < estado.total) {
        elAviso.textContent = 'Con estas opciones solo existen ' + ejercicios.length
          + ' intervalos distintos sin repetir notas, así que la ficha lleva esos.';
      }

      elTit.textContent = (estado.modo === 'analizar' ? 'Analizar ' : 'Escribir ') + rotulo();
      elRef.textContent = 'teoriamusical.com.es · hoja n.º ' + estado.semilla;
      elInstr.textContent = estado.modo === 'analizar'
        ? 'Escribe debajo de cada intervalo qué intervalo es y si es ascendente (↑) o descendente (↓).'
        : 'Escribe la segunda nota de cada intervalo. La flecha indica si sube o baja; no olvides la alteración.';
      pintar();
    }

    cont.addEventListener('click', function (ev) {
      var op = ev.target.closest('.tm-fg-op');
      if (op) {
        var grupo = op.parentElement.getAttribute('data-g');
        var v = op.getAttribute('data-v');
        if (grupo === 'nums') {
          var n = Number(v), i = estado.nums.indexOf(n);
          if (i >= 0) estado.nums.splice(i, 1); else estado.nums.push(n);
          op.setAttribute('aria-pressed', i >= 0 ? 'false' : 'true');
        } else {
          estado[grupo] = grupo === 'total' ? Number(v) : v;
          Array.prototype.forEach.call(op.parentElement.children, function (b) {
            b.setAttribute('aria-pressed', b === op ? 'true' : 'false');
          });
        }
        generar();
        return;
      }

      var btn = ev.target.closest('[data-a]');
      if (!btn) return;
      var accion = btn.getAttribute('data-a');
      if (accion === 'generar') generar();
      else if (accion === 'soluciones') {
        estado.solucion = !estado.solucion;
        btn.textContent = estado.solucion ? 'Ocultar soluciones' : 'Ver soluciones';
        pintar();
      } else if (accion === 'imprimir') window.print();
    });

    // Al imprimir, la hoja ocupa el ancho del A4: se redibuja con seis ejercicios
    // por pentagrama aunque en pantalla se estén viendo tres.
    var anchoPantalla = null;
    window.addEventListener('beforeprint', function () {
      anchoPantalla = elSis.clientWidth;
      elSis.style.width = '680px';
      pintar();
    });
    window.addEventListener('afterprint', function () {
      elSis.style.width = '';
      if (anchoPantalla) pintar();
    });

    var reajuste;
    window.addEventListener('resize', function () {
      clearTimeout(reajuste);
      reajuste = setTimeout(function () { if (ejercicios.length) pintar(); }, 250);
    });

    // ?hoja=12345 reproduce exactamente la misma ficha (para reimprimir o para
    // dar la misma a toda la clase).
    var m = /[?&]hoja=(\d+)/.exec(window.location.search);
    generar(m ? Number(m[1]) : null);
  };
})();
