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
    //
    // En "sin alteraciones" no se rellena: si no hay tantos intervalos naturales
    // distintos como ejercicios se han pedido, la hoja sale más corta y la
    // interfaz lo dice. Completarla con notas alteradas incumpliría justo lo
    // que el usuario ha elegido.
    if (dificultad === 'naturales') return out;

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

  /* Un solo intervalo, en grande, para la práctica en pantalla. En modo
     "escribir" la segunda nota no se dibuja hasta que el alumno responde. */
  function dibujarSuelto(div, e, opts) {
    var V = Vex.Flow;
    div.innerHTML = '';
    var ancho = Math.min(opts.w || 360, 420);
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(ancho, 190);
    var ctx = r.getContext();
    var stave = new V.Stave(4, 10, ancho - 12, { space_above_staff_ln: 4 });
    stave.addClef('treble').setContext(ctx).draw();

    var x0 = stave.getNoteStartX();
    var util = (stave.getX() + stave.getWidth()) - x0;

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

    nota(e.n1, x0 + util * 0.28, null);
    if (opts.mostrarSegunda) nota(e.n2, x0 + util * 0.62, opts.colorSegunda || null);
  }

  /* ----------------------------------------------------------------- UI */

  /* Posiciones del pentagrama, de La3 a Si5: las mismas que usa el test de
     construir intervalos del sitio, para que el alumno encuentre lo mismo. */
  var FILAS = [
    { l: 6, oct: 5, lbl: 'Si⁵', linea: false, adic: false },
    { l: 5, oct: 5, lbl: 'La⁵', linea: true, adic: true },
    { l: 4, oct: 5, lbl: 'Sol⁵', linea: false, adic: false },
    { l: 3, oct: 5, lbl: 'Fa⁵', linea: true, adic: false },
    { l: 2, oct: 5, lbl: 'Mi⁵', linea: false, adic: false },
    { l: 1, oct: 5, lbl: 'Re⁵', linea: true, adic: false },
    { l: 0, oct: 5, lbl: 'Do⁵', linea: false, adic: false },
    { l: 6, oct: 4, lbl: 'Si⁴', linea: true, adic: false },
    { l: 5, oct: 4, lbl: 'La⁴', linea: false, adic: false },
    { l: 4, oct: 4, lbl: 'Sol⁴', linea: true, adic: false },
    { l: 3, oct: 4, lbl: 'Fa⁴', linea: false, adic: false },
    { l: 2, oct: 4, lbl: 'Mi⁴', linea: true, adic: false },
    { l: 1, oct: 4, lbl: 'Re⁴', linea: false, adic: false },
    { l: 0, oct: 4, lbl: 'Do⁴', linea: false, adic: true },
    { l: 6, oct: 3, lbl: 'Si³', linea: false, adic: false },
    { l: 5, oct: 3, lbl: 'La³', linea: true, adic: true }
  ];

  var CSS = [
    '.tm-fg{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-fg::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-fg-fila{margin-bottom:14px;}',
    '.tm-fg-lbl{display:block;font-size:.82rem;font-weight:700;color:#1a1a2e;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em;}',
    '.tm-fg-ops{display:flex;flex-wrap:wrap;gap:8px;}',
    '.tm-fg-op{font-size:.9rem;font-weight:600;padding:9px 14px;border:1px solid #d8d0b8;background:#f5f2ea;color:#1a1a2e;border-radius:6px;cursor:pointer;font-family:inherit;min-height:40px;}',
    '.tm-fg-op[aria-pressed="true"]{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fg-otro{display:inline-flex;align-items:center;gap:6px;font-size:.85rem;color:#555;}',
    '.tm-fg-num{width:72px;font-size:.9rem;font-weight:700;font-family:inherit;padding:9px 8px;border:1px solid #d8d0b8;border-radius:6px;background:#fff;color:#1a1a2e;min-height:40px;}',
    '.tm-fg-acciones{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;padding-top:16px;border-top:1px solid #eee6d6;}',
    /* el atributo hidden pierde contra display:flex, hay que decirlo aparte */
    '.tm-fg-acciones[hidden]{display:none!important;}',
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
    /* práctica en pantalla */
    '.tm-fg-practica{margin-top:20px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:18px 16px;}',
    '.tm-fg-barra{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;margin-bottom:6px;}',
    '.tm-fg-relleno{height:100%;background:#8b6914;border-radius:3px;transition:width .35s ease;}',
    '.tm-fg-marcador{display:flex;justify-content:space-between;font-size:.82rem;color:#666;margin-bottom:12px;}',
    '.tm-fg-enunciado{text-align:center;font-size:1.05rem;color:#1a1a2e;margin:0 0 6px;}',
    '.tm-fg-pista{text-align:center;font-size:.85rem;color:#777;margin:0 0 10px;}',
    '.tm-fg-staff{display:flex;justify-content:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:6px 0;margin-bottom:12px;}',
    '.tm-fg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(74px,1fr));gap:8px;margin-bottom:10px;}',
    '.tm-fg-resp{font-size:.92rem;font-weight:700;padding:11px 8px;border:1px solid #d8d0b8;background:#f5f2ea;color:#1a1a2e;border-radius:6px;cursor:pointer;font-family:inherit;min-height:44px;}',
    '.tm-fg-resp[aria-pressed="true"]{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fg-resp.ok{background:#27ae60!important;color:#fff!important;border-color:#27ae60!important;}',
    '.tm-fg-resp.ko{background:#c0392b!important;color:#fff!important;border-color:#c0392b!important;}',
    '.tm-fg-loupe{position:fixed;display:none;pointer-events:none;z-index:9999;background:#fdfcf9;border:2px solid #333;border-radius:12px;padding:6px 8px;box-shadow:0 8px 28px rgba(0,0,0,.35);transform:translate(-50%,calc(-100% - 18px));}',
    '.tm-fg-loupe::after{content:"";position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);border:11px solid transparent;border-top-color:#333;border-bottom:none;}',
    '.tm-fg-loupe::before{content:"";position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-top-color:#fdfcf9;border-bottom:none;z-index:1;}',
    '.tm-fg-loupe-staff{line-height:0;}',
    '.tm-fg-dir{background:#f5f2ea;border-radius:6px;padding:11px 14px;text-align:center;font-size:1rem;color:#1a1a2e;margin-bottom:6px;}',
    '.tm-fg-fb{display:none;margin-top:10px;padding:12px;border-radius:6px;font-weight:600;font-size:.92rem;}',
    '.tm-fg-fb.ver{display:block;}',
    '.tm-fg-fb.bien{background:#e8f5e9;color:#2e7d32;}',
    '.tm-fg-fb.mal{background:#ffebee;color:#c62828;}',
    '.tm-fg-final{text-align:center;padding:24px 10px;}',
    '.tm-fg-nota{font-size:2.4rem;font-weight:800;color:#8b6914;line-height:1;}',
    '.tm-fg-final p{color:#555;margin:.4rem 0 1rem;}',
    '.tm-fg-marcas{display:flex;justify-content:center;gap:14px;margin:.6rem 0 .2rem;font-weight:700;font-size:1rem;flex-wrap:wrap;}',
    '.tm-fg-bien{color:#27ae60;background:#e8f5e9;border-radius:6px;padding:.35rem .8rem;}',
    '.tm-fg-mal{color:#c0392b;background:#ffebee;border-radius:6px;padding:.35rem .8rem;}',
    '.tm-fg-fallos{font-size:.9rem;color:#555;background:#fdf8ee;border-radius:6px;padding:.7rem .9rem;text-align:left;}',
    '@media print{',
    '  body.tm-fg-print *{visibility:hidden!important;}',
    '  body.tm-fg-print .tm-fg-hoja,body.tm-fg-print .tm-fg-hoja *{visibility:visible!important;}',
    '  body.tm-fg-print .tm-fg-hoja{position:absolute;left:0;top:0;width:100%;border:0;padding:0;margin:0;}',
    '  body.tm-fg-print .tm-fg-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:0 0 10px;}',
    '  body.tm-fg-print .tm-fg-datos span{flex:1;border-bottom:1px solid #bbb;}',
    '  @page{size:A4;margin:12mm;}',
    '}'
  ].join('\n');

  var NUMS = [2, 3, 4, 5, 6, 7, 8];
  var MAX_EJERCICIOS = 60;
  var ORD = { 2: '2ª', 3: '3ª', 4: '4ª', 5: '5ª', 6: '6ª', 7: '7ª', 8: '8ª' };

  /* Expuesto para tools/verificar-fichas-intervalos.js --web: permite auditar
     miles de hojas sin pasar por la interfaz. */
  window.tmFichasGeneradorTest = { generarHoja: generarHoja };

  /* tmFichasGenerador('tmfg')                      -> arranque genérico
     tmFichasGenerador('tmfg', { nums: [3] })       -> ya puesto en terceras
     Opciones: nums, modo (analizar|escribir), dificultad, total, salida. */
  window.tmFichasGenerador = function (id, opciones) {
    var cont = document.getElementById(id);
    if (!cont || typeof Vex === 'undefined') return;

    if (!document.getElementById('tm-fg-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fg-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var op = opciones || {};
    var soloPractica = !!op.soloPractica;   // sin conmutador: la página es solo de pantalla
    var estado = {
      nums: (op.nums && op.nums.length ? op.nums.slice() : [2, 3]),
      modo: op.modo || 'analizar',
      dificultad: op.dificultad || 'progresivo',
      total: op.total || 24,
      salida: op.soloPractica ? 'practica' : (op.salida || 'ficha'),
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
      + (soloPractica ? '' : '<div class="tm-fg-fila"><span class="tm-fg-lbl">Cómo quieres usarlo</span>'
        + '<div class="tm-fg-ops" data-g="salida">'
        + botones([{ v: 'ficha', t: 'Ficha para imprimir' }, { v: 'practica', t: 'Practicar en pantalla' }],
          function (v) { return estado.salida === v; })
        + '</div></div>')

      + '<div class="tm-fg-fila"><span class="tm-fg-lbl">Qué intervalos</span>'
      + '<div class="tm-fg-ops" data-g="nums">'
      + botones(NUMS.map(function (n) { return { v: n, t: ORD[n] }; }),
        function (v) { return estado.nums.indexOf(Number(v)) >= 0; })
      + '</div></div>'

      + '<div class="tm-fg-fila"><span class="tm-fg-lbl">Qué hay que hacer</span>'
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
      + botones([{ v: 12, t: '12' }, { v: 24, t: '24' }, { v: 42, t: soloPractica ? '42' : '42 (hoja llena)' }],
        function (v) { return estado.total === Number(v); })
      // Cantidad libre: en clase se piden cosas como "uno por alumno" y los
      // números redondos no sirven.
      + '<label class="tm-fg-otro">otro: <input type="number" class="tm-fg-num" min="1" max="' + MAX_EJERCICIOS
      + '" step="1" value="' + estado.total + '" aria-label="Número de ejercicios"></label>'
      + '</div></div>'

      + '<div class="tm-fg-acciones" data-zona="ficha">'
      + '<button type="button" class="tm-fg-btn tm-fg-btn-1" data-a="generar">Generar ficha nueva</button>'
      + '<button type="button" class="tm-fg-btn tm-fg-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-fg-btn tm-fg-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<div class="tm-fg-acciones" data-zona="practica" hidden>'
      + '<button type="button" class="tm-fg-btn tm-fg-btn-1" data-a="empezar">Empezar otra tanda</button>'
      + '</div>'
      + '<div class="tm-fg-aviso" hidden></div>'
      + '</div>'

      + '<div class="tm-fg-hoja"><div class="tm-fg-cab"><p class="tm-fg-tit"></p><span class="tm-fg-ref"></span></div>'
      + '<div class="tm-fg-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-fg-instr"></p><div class="tm-fg-sistemas"></div></div>'

      + '<div class="tm-fg-practica" hidden></div>';

    var elAviso = cont.querySelector('.tm-fg-aviso');
    var elHoja = cont.querySelector('.tm-fg-hoja');
    var elTit = cont.querySelector('.tm-fg-tit');
    var elRef = cont.querySelector('.tm-fg-ref');
    var elInstr = cont.querySelector('.tm-fg-instr');
    var elSis = cont.querySelector('.tm-fg-sistemas');
    var elPra = cont.querySelector('.tm-fg-practica');
    var ejercicios = [];
    var pr = { i: 0, aciertos: 0, fallados: [], num: null, esp: null, dir: null, fila: null, alt: 0, corregido: false };

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

    /* ------------------------------------------------ práctica en pantalla */

    function parseKey(k) {
      var m = /^([a-g])(#{1,2}|b{1,2})?\/(-?\d+)$/.exec(k);
      var alt = !m[2] ? 0 : (m[2][0] === '#' ? m[2].length : -m[2].length);
      return { l: LETTERS.indexOf(m[1]), alt: alt, oct: Number(m[3]) };
    }
    var NOMBRE_NOTA = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
    var SIGNO = { '-1': '♭', '0': '', '1': '♯' };
    function nombreEs(n) { return NOMBRE_NOTA[n.l] + (SIGNO[String(n.alt)] || ''); }

    /* La nota que el alumno ha colocado, a partir de la fila pulsada y la
       alteración elegida. */
    function notaElegida() {
      var f = FILAS[pr.fila];
      return { l: f.l, oct: f.oct, alt: pr.alt };
    }

    /* Pentagrama de la práctica de escribir: mismas medidas que el test de
       construir intervalos (300x220, pentagrama en 10,20,280), porque de ahí
       sale la fórmula que convierte la Y del clic en posición de nota. */
    function pintarConstruir(div, e, nota, color) {
      var V = Vex.Flow;
      div.innerHTML = '';
      var r = new V.Renderer(div, V.Renderer.Backends.SVG);
      r.resize(300, 220);
      var ctx = r.getContext();
      var stave = new V.Stave(10, 20, 280);
      stave.addClef('treble').setContext(ctx).draw();

      var notas = [];
      var sn1 = new V.StaveNote({ keys: [e.n1.key], duration: 'w' });
      if (e.n1.acc) sn1.addModifier(new V.Accidental(e.n1.acc), 0);
      notas.push(sn1);

      if (nota) {
        var key = LETTERS[nota.l] + (nota.alt > 0 ? '#' : nota.alt < 0 ? 'b' : '') + '/' + nota.oct;
        var sn2 = new V.StaveNote({ keys: [key], duration: 'w' });
        if (sn2.setStyle) sn2.setStyle({ fillStyle: color, strokeStyle: color });
        if (nota.alt !== 0) {
          var ac = new V.Accidental(nota.alt > 0 ? '#' : 'b');
          if (ac.setStyle) ac.setStyle({ fillStyle: color, strokeStyle: color });
          sn2.addModifier(ac, 0);
        }
        notas.push(sn2);
      }

      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables(notas);
      new V.Formatter().joinVoices([voice]).format([voice], 180);
      voice.draw(ctx, stave);
      var svg = div.querySelector('svg');
      if (svg) svg.style.cursor = 'crosshair';
    }

    /* Y del clic -> posición en el pentagrama. La primera línea (Fa5) está en
       y=60 del SVG y cada posición ocupa 5 px. */
    function posicionDeY(div, clientY) {
      var rect = div.getBoundingClientRect();
      var paso = Math.round((clientY - rect.top - 60) / 5);
      return Math.max(-3, Math.min(12, paso)) + 3;
    }

    /* Lupa: al pasar el ratón enseña, ampliada y sobre el cursor, la nota que se
       colocaría. Sin ella acertar la línea exacta a 5 px por posición es una
       lotería. Es la misma ayuda que lleva el test de construir intervalos. */
    var elLoupe = null, ultimaLupa = null;
    function lupa() {
      if (!elLoupe) {
        elLoupe = document.createElement('div');
        elLoupe.className = 'tm-fg-loupe';
        elLoupe.innerHTML = '<div class="tm-fg-loupe-staff"></div>';
        document.body.appendChild(elLoupe);
      }
      return elLoupe;
    }

    function mostrarLupa(div, e, clientX, clientY) {
      var idx = posicionDeY(div, clientY);
      var f = FILAS[idx];
      var el = lupa();
      var clave = f.l + '_' + f.oct + '_' + pr.alt;
      if (clave !== ultimaLupa) {
        ultimaLupa = clave;
        pintarConstruir(el.querySelector('.tm-fg-loupe-staff'), e, { l: f.l, oct: f.oct, alt: pr.alt }, '#8b6914');
        var svg = el.querySelector('svg');
        if (svg) { svg.setAttribute('width', '180'); svg.setAttribute('height', '132'); svg.style.cursor = 'default'; }
      }
      el.style.transform = '';
      el.style.left = clientX + 'px';
      el.style.top = clientY + 'px';
      el.style.display = 'block';

      // Que no se salga por los lados ni por arriba.
      var r = el.getBoundingClientRect();
      if (r.left < 8) el.style.left = (clientX - r.left + 8) + 'px';
      else if (r.right > window.innerWidth - 8) el.style.left = (clientX - (r.right - window.innerWidth + 8)) + 'px';
      if (r.top < 8) el.style.transform = 'translate(-50%, 18px)';
    }

    function ocultarLupa() {
      if (elLoupe) elLoupe.style.display = 'none';
      ultimaLupa = null;
    }

    function engancharStaff(div, e) {
      div.addEventListener('click', function (ev) {
        if (pr.corregido) return;
        var y = (ev.changedTouches || ev.touches) ? (ev.changedTouches || ev.touches)[0].clientY : ev.clientY;
        pr.fila = posicionDeY(div, y);
        ocultarLupa();
        pintarPractica();
      });
      div.addEventListener('mousemove', function (ev) {
        if (!pr.corregido) mostrarLupa(div, e, ev.clientX, ev.clientY);
      });
      div.addEventListener('mouseleave', ocultarLupa);
    }

    function pintarPractica() {
      var e = ejercicios[pr.i];
      if (!e) return;
      var esAnalizar = estado.modo === 'analizar';
      var hecho = pr.corregido;
      var sol = parseKey(e.n2.key);

      var h = '<div class="tm-fg-barra"><div class="tm-fg-relleno" style="width:'
        + Math.round(100 * pr.i / ejercicios.length) + '%"></div></div>'
        + '<div class="tm-fg-marcador"><span>Ejercicio ' + (pr.i + 1) + ' de ' + ejercicios.length + '</span>'
        + '<span>' + pr.aciertos + ' acierto' + (pr.aciertos === 1 ? '' : 's') + '</span></div>';

      if (esAnalizar) {
        h += '<p class="tm-fg-enunciado">¿Qué intervalo es?</p>'
          + '<p class="tm-fg-pista">Elige el número, el tipo y si es ascendente o descendente.</p>';
      }
      // En "escribir" el enunciado va en su barra debajo del pentagrama, como en
      // el test de construir intervalos.

      h += '<div class="tm-fg-staff"></div>';

      if (esAnalizar) {
        var ns = estado.nums.slice().sort(function (a, b) { return a - b; });
        // Con un solo número no hay nada que elegir: se da por respondido.
        if (ns.length === 1) pr.num = ns[0];
        else h += '<div class="tm-fg-grid" data-r="num">' + ns.map(function (n) {
          var cls = 'tm-fg-resp';
          if (hecho) {
            if (n === Number(e.etiqueta[0])) cls += ' ok';
            else if (n === pr.num) cls += ' ko';
          }
          return '<button type="button" class="' + cls + '" data-v="' + n + '" aria-pressed="'
            + (pr.num === n ? 'true' : 'false') + '">' + ORD[n] + '</button>';
        }).join('') + '</div>';

        // Solo las especies que pueden salir con los números elegidos: ofrecer
        // "justa" en una tanda de 2ª y 3ª sería una respuesta imposible.
        var posibles = {};
        ns.forEach(function (n) { CALIDADES[n].forEach(function (c) { posibles[c.q] = 1; }); });
        // Orden por amplitud, de la más pequeña a la más grande.
        var especies = ['d', 'm', 'J', 'M', 'A'].filter(function (q) { return posibles[q]; });
        var correcta = e.etiqueta.split(' ')[1];
        h += '<div class="tm-fg-grid" data-r="esp">' + especies.map(function (q) {
          var cls = 'tm-fg-resp';
          if (hecho) {
            if (q === correcta) cls += ' ok';
            else if (q === pr.esp) cls += ' ko';
          }
          return '<button type="button" class="' + cls + '" data-v="' + q + '" aria-pressed="'
            + (pr.esp === q ? 'true' : 'false') + '">' + NOMBRE_CAL[q] + '</button>';
        }).join('') + '</div>';

        h += '<div class="tm-fg-grid" data-r="dir">' + [
          { v: 1, t: 'Ascendente ↑' }, { v: -1, t: 'Descendente ↓' }
        ].map(function (o) {
          var cls = 'tm-fg-resp';
          if (hecho) {
            if (o.v === e.dir) cls += ' ok';
            else if (o.v === pr.dir) cls += ' ko';
          }
          return '<button type="button" class="' + cls + '" data-v="' + o.v + '" aria-pressed="'
            + (pr.dir === o.v ? 'true' : 'false') + '">' + o.t + '</button>';
        }).join('') + '</div>';
      } else {
        // Igual que el test de construir intervalos del sitio: la nota se coloca
        // pulsando en el propio pentagrama, no eligiéndola de una lista.
        h += '<div class="tm-fg-dir">' + nombreEs(parseKey(e.n1.key)) + ' &mdash; <strong>'
          + e.larga + '</strong> &mdash; ' + (e.dir > 0 ? '↑' : '↓') + '</div>'
          + '<p class="tm-fg-pista tm-fg-hint">' + (pr.fila === null
            ? 'Pulsa en el pentagrama para colocar la segunda nota'
            : 'Pulsa de nuevo para cambiar la nota') + '</p>'
          + '<div class="tm-fg-grid" data-r="alt">' + [
            { v: -1, t: '♭' }, { v: 0, t: '♮' }, { v: 1, t: '♯' }
          ].map(function (o) {
            var cls = 'tm-fg-resp';
            if (hecho && o.v === sol.alt) cls += ' ok';
            else if (hecho && o.v === pr.alt && pr.alt !== sol.alt) cls += ' ko';
            return '<button type="button" class="' + cls + '" data-v="' + o.v + '"' + (hecho ? ' disabled' : '')
              + ' aria-pressed="' + (pr.alt === o.v ? 'true' : 'false') + '">' + o.t + '</button>';
          }).join('') + '</div>';
      }

      h += '<div class="tm-fg-fb"></div>'
        + '<div class="tm-fg-acciones">'
        + (hecho
          ? '<button type="button" class="tm-fg-btn tm-fg-btn-1" data-a="siguiente">'
          + (pr.i + 1 < ejercicios.length ? 'Siguiente' : 'Ver resultado') + '</button>'
          : '<button type="button" class="tm-fg-btn tm-fg-btn-1" data-a="comprobar">Comprobar</button>')
        + '</div>';

      elPra.innerHTML = h;
      var elStaff = elPra.querySelector('.tm-fg-staff');

      if (esAnalizar) {
        dibujarSuelto(elStaff, e, {
          w: Math.min(elPra.clientWidth - 30, 380),
          mostrarSegunda: true
        });
      } else {
        // Al corregir se enseña siempre la nota correcta, esté bien o mal la del
        // alumno; si falló, la suya se queda debajo en rojo como referencia.
        pintarConstruir(elStaff, e, hecho ? sol : (pr.fila === null ? null : notaElegida()),
          hecho ? (pr.acierto ? '#27ae60' : '#c0392b') : '#8b6914');
        if (!hecho) engancharStaff(elStaff, e);
      }

      if (hecho) {
        var fb = elPra.querySelector('.tm-fg-fb');
        var bien = pr.acierto;
        fb.className = 'tm-fg-fb ver ' + (bien ? 'bien' : 'mal');
        fb.textContent = bien
          ? '¡Correcto! ' + e.larga + ' ' + (e.dir > 0 ? 'ascendente' : 'descendente') + '.'
          : (esAnalizar
            ? 'Era una ' + e.larga + ' ' + (e.dir > 0 ? 'ascendente' : 'descendente') + '.'
            : 'La segunda nota era ' + nombreEs(sol) + '.');
      }
    }

    function comprobar() {
      var e = ejercicios[pr.i];
      var sol = parseKey(e.n2.key);
      if (estado.modo === 'analizar') {
        if (pr.num === null || pr.esp === null || pr.dir === null) return;
        pr.acierto = (pr.num === Number(e.etiqueta[0]))
          && (pr.esp === e.etiqueta.split(' ')[1])
          && (pr.dir === e.dir);
      } else {
        if (pr.fila === null) return;
        var f = FILAS[pr.fila];
        pr.acierto = (f.l === sol.l && f.oct === sol.oct && pr.alt === sol.alt);
      }
      if (pr.acierto) pr.aciertos++;
      else pr.fallados.push(e.larga + ' ' + (e.dir > 0 ? '↑' : '↓'));
      pr.corregido = true;
      pintarPractica();
    }

    function siguiente() {
      if (pr.i + 1 < ejercicios.length) {
        pr.i++;
        pr.num = pr.esp = pr.dir = pr.fila = null;
        pr.alt = 0;
        pr.corregido = false;
        pintarPractica();
      } else {
        var fallos = ejercicios.length - pr.aciertos;
        var pct = Math.round(100 * pr.aciertos / ejercicios.length);

        // Qué intervalos se han fallado, agrupados y ordenados de más a menos:
        // es lo que dice dónde hay que insistir.
        var cuenta = {};
        pr.fallados.forEach(function (t) { cuenta[t] = (cuenta[t] || 0) + 1; });
        var lista = Object.keys(cuenta).sort(function (a, b) { return cuenta[b] - cuenta[a]; })
          .map(function (t) { return t + (cuenta[t] > 1 ? ' (×' + cuenta[t] + ')' : ''); });

        elPra.innerHTML = '<div class="tm-fg-final">'
          + '<div class="tm-fg-nota">' + pr.aciertos + '/' + ejercicios.length + '</div>'
          + '<div class="tm-fg-marcas">'
          + '<span class="tm-fg-bien">✓ ' + pr.aciertos + ' bien</span>'
          + '<span class="tm-fg-mal">✗ ' + fallos + ' mal</span>'
          + '</div>'
          + '<p>' + pct + '% de aciertos'
          + (pct === 100 ? ' — perfecto.' : pct >= 70 ? ' — bien.' : ' — repasa y vuelve a intentarlo.') + '</p>'
          + (lista.length ? '<p class="tm-fg-fallos"><strong>Para repasar:</strong> ' + lista.join(' · ') + '</p>' : '')
          + '<button type="button" class="tm-fg-btn tm-fg-btn-1" data-a="empezar">Otra tanda</button></div>';
      }
    }

    function empezarPractica() {
      pr = { i: 0, aciertos: 0, fallados: [], num: null, esp: null, dir: null, fila: null, alt: 0, corregido: false };
      pintarPractica();
    }

    function aplicarSalida() {
      var practica = estado.salida === 'practica';
      elHoja.hidden = practica;
      elPra.hidden = !practica;
      cont.querySelector('[data-zona="ficha"]').hidden = practica;
      cont.querySelector('[data-zona="practica"]').hidden = !practica;
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
          + ' intervalos distintos sin repetir notas, así que ' + (estado.salida === 'practica'
            ? 'la tanda lleva esos.' : 'la ficha lleva esos.');
      }

      elTit.textContent = (estado.modo === 'analizar' ? 'Analizar ' : 'Escribir ') + rotulo();
      elRef.textContent = 'teoriamusical.com.es · hoja n.º ' + estado.semilla;
      elInstr.textContent = estado.modo === 'analizar'
        ? 'Escribe debajo de cada intervalo qué intervalo es y si es ascendente (↑) o descendente (↓).'
        : 'Escribe la segunda nota de cada intervalo. La flecha indica si sube o baja; no olvides la alteración.';

      aplicarSalida();
      if (estado.salida === 'practica') empezarPractica();
      else pintar();
    }

    var esperaNum;
    cont.addEventListener('input', function (ev) {
      var campo = ev.target.closest('.tm-fg-num');
      if (!campo) return;
      clearTimeout(esperaNum);
      esperaNum = setTimeout(function () {
        var n = Math.round(Number(campo.value));
        if (!n || n < 1) return;                       // se está escribiendo
        n = Math.min(n, MAX_EJERCICIOS);
        if (n !== Number(campo.value)) campo.value = n;
        estado.total = n;
        Array.prototype.forEach.call(cont.querySelectorAll('[data-g="total"] .tm-fg-op'), function (b) {
          b.setAttribute('aria-pressed', Number(b.getAttribute('data-v')) === n ? 'true' : 'false');
        });
        generar();
      }, 500);
    });

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
          if (grupo === 'total') {
            var campoNum = cont.querySelector('.tm-fg-num');
            if (campoNum) campoNum.value = estado.total;
          }
          Array.prototype.forEach.call(op.parentElement.children, function (b) {
            b.setAttribute('aria-pressed', b === op ? 'true' : 'false');
          });
        }
        generar();
        return;
      }

      // respuestas de la práctica
      var resp = ev.target.closest('.tm-fg-resp');
      if (resp && !pr.corregido && estado.salida === 'practica') {
        var g = resp.parentElement.getAttribute('data-r');
        var val = resp.getAttribute('data-v');
        if (g === 'num') pr.num = Number(val);
        else if (g === 'esp') pr.esp = val;
        else if (g === 'dir') pr.dir = Number(val);
        else if (g === 'alt') pr.alt = Number(val);
        pintarPractica();
        return;
      }

      var btn = ev.target.closest('[data-a]');
      if (!btn) return;
      var accion = btn.getAttribute('data-a');
      if (accion === 'generar') generar();
      else if (accion === 'empezar') generar();
      else if (accion === 'comprobar') comprobar();
      else if (accion === 'siguiente') siguiente();
      else if (accion === 'soluciones') {
        estado.solucion = !estado.solucion;
        btn.textContent = estado.solucion ? 'Ocultar soluciones' : 'Ver soluciones';
        pintar();
      } else if (accion === 'imprimir') {
        document.body.classList.add('tm-fg-print');
        window.print();
        setTimeout(function () { document.body.classList.remove('tm-fg-print'); }, 500);
      }
    });

    // Al imprimir, la hoja ocupa el ancho del A4: se redibuja con seis ejercicios
    // por pentagrama aunque en pantalla se estén viendo tres.
    var anchoPantalla = null;
    window.addEventListener('beforeprint', function () {
      if (estado.salida !== 'ficha' || !document.body.classList.contains('tm-fg-print')) return;
      anchoPantalla = elSis.clientWidth;
      elSis.style.width = '680px';
      pintar();
    });
    window.addEventListener('afterprint', function () {
      if (estado.salida !== 'ficha') return;
      elSis.style.width = '';
      if (anchoPantalla) pintar();
    });

    var reajuste;
    window.addEventListener('resize', function () {
      clearTimeout(reajuste);
      reajuste = setTimeout(function () {
        if (!ejercicios.length) return;
        if (estado.salida === 'practica') pintarPractica(); else pintar();
      }, 250);
    });

    // ?hoja=12345 reproduce exactamente la misma ficha (para reimprimir o para
    // dar la misma a toda la clase).
    var m = /[?&]hoja=(\d+)/.exec(window.location.search);
    generar(m ? Number(m[1]) : null);
  };
})();
