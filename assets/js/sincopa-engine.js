/* Motor — Ejercicio de síncopas: se dibuja un fragmento rítmico (1 o más
   compases) y hay que CLICAR la nota donde empieza la síncopa, o el
   botón "No hay síncopa" si el fragmento no tiene ninguna.

   Los fragmentos NO están precalculados: se generan al vuelo. Cada uno
   sortea primero un compás (2/4, 3/4 o 4/4) y después uno de varios
   "moldes" rítmicos genéricos (síncopa de tiempo, de parte —en corcheas
   o semicorcheas—, de compás, y distractores: ritmo recto —a veces con
   puntillo—, nota larga con ligadura en tiempo fuerte, contratiempo en
   cualquier tiempo, y ligadura de un tiempo no ascendente), calculados
   según la fuerza métrica real de CADA compás (no todos los moldes
   existen en todos los compases: en 2/4, por ejemplo, no hay hueco para
   una síncopa "de tiempo"). Las alturas salen de un paseo aleatorio
   (misma nota en las dos mitades de una ligadura, porque una ligadura
   solo puede unir notas de igual altura), así que el número de
   fragmentos posibles es, a efectos prácticos, ilimitado. */
(function () {
  'use strict';

  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  function indiceDiatonico(letra, oct) { return LETRAS.indexOf(letra) + (oct - 4) * 7; }
  function notaEnIndice(idx) {
    var letra = LETRAS[((idx % 7) + 7) % 7];
    var oct = 4 + Math.floor(idx / 7);
    return letra + '/' + oct;
  }
  var RANGO_MIN = indiceDiatonico('c', 4);
  var RANGO_MAX = indiceDiatonico('c', 6);

  /* Paseo aleatorio de n alturas dentro del rango cómodo de clave de sol
     (do4-do6), con pasos de 1 o 2 grados para que suene a melodía y no a
     saltos erráticos. */
  function alturas(n, rng) {
    var idx = RANGO_MIN + Math.floor(rng() * (RANGO_MAX - RANGO_MIN + 1));
    var out = [notaEnIndice(idx)];
    for (var i = 1; i < n; i++) {
      var paso;
      do { paso = Math.floor(rng() * 5) - 2; } while (paso === 0);
      idx = Math.max(RANGO_MIN, Math.min(RANGO_MAX, idx + paso));
      out.push(notaEnIndice(idx));
    }
    return out;
  }
  function nota(key, duration, measure) { return { keys: [key], duration: duration, measure: measure }; }

  /* Compases disponibles, con la fuerza métrica de cada tiempo (3 fuerte,
     2 semifuerte, 1 débil). El 3/4 es fuerte-débil-débil (a diferencia
     del 4/4, no tiene un tercer tiempo semifuerte): el tiempo 3 pesa
     igual que el 2, así que una ligadura de t.2 a t.3 NO es síncopa —no
     termina en un tiempo más fuerte que el de inicio—, aunque sí lo es
     la que cruza la barra del tiempo 3 (débil) al tiempo 1 del compás
     siguiente (fuerte). En 2/4 y 3/4 tampoco hay tiempo semifuerte. */
  var COMPASES = [
    { txt: '2/4', tiempos: 2, fuerzas: [3, 1] },
    { txt: '3/4', tiempos: 3, fuerzas: [3, 1, 1] },
    { txt: '4/4', tiempos: 4, fuerzas: [3, 1, 2, 1] }
  ];
  function compasAlAzar(rng) { return COMPASES[Math.floor(rng() * COMPASES.length)]; }

  /* Primer índice i (0-based) donde el tiempo i es más débil que el
     i+1 — el único hueco posible para una síncopa "de tiempo" dentro de
     un compás. -1 si no existe (caso de 2/4). */
  function parAscendente(compas) {
    for (var i = 0; i < compas.tiempos - 1; i++) if (compas.fuerzas[i] < compas.fuerzas[i + 1]) return i;
    return -1;
  }
  /* Un índice interior (i>0, para no coincidir con la ligadura "fuerte"
     de t.1→t.2) donde el tiempo i NO es más débil que el i+1 — hueco
     para el distractor "ligadura que no sube de fuerza". Solo existe en
     4/4 (t.3→t.4). */
  function parNoAscendenteInterior(compas) {
    for (var i = 1; i < compas.tiempos - 1; i++) if (compas.fuerzas[i] >= compas.fuerzas[i + 1]) return i;
    return -1;
  }
  function posicionParte(compas) {
    var i = parAscendente(compas);
    return i === -1 ? 0 : i;
  }

  // -- síncopa de tiempo: el tiempo i (débil) se liga al i+1 (más fuerte) --
  function tiempo(rng, compas) {
    var i = parAscendente(compas);
    var p = alturas(compas.tiempos - 1, rng);
    var notas = [], pIdx = 0, pitchI = null;
    for (var t = 0; t < compas.tiempos; t++) {
      var k;
      if (t === i) { k = p[pIdx++]; pitchI = k; }
      else if (t === i + 1) { k = pitchI; }
      else { k = p[pIdx++]; }
      notas.push(nota(k, 'q', 0));
    }
    return {
      tipo: 'sincopa', clase: 'tiempo', notas: notas, ligaduras: [[i, i + 1]], correctas: [[i, i + 1]],
      explicacion: 'La nota del tiempo ' + (i + 1) + ' (débil) se liga a la del tiempo ' + (i + 2) + ': es síncopa de tiempo.'
    };
  }

  // -- síncopa de parte: la última parte débil del tiempo i (en corcheas
  //    o, para más variedad rítmica, en semicorcheas) se liga al i+1 --
  function parte(rng, compas) {
    var i = posicionParte(compas);
    var semicorcheas = rng() < 0.4;
    var nPartes = semicorcheas ? 4 : 2;
    var durParte = semicorcheas ? '16' : '8';
    var p = alturas(compas.tiempos - 1 + nPartes - 1, rng);
    var notas = [], pIdx = 0, grupoBeam = [], idxUltimaParte = -1, idxSiguiente = -1, pitchUltimaParte = null;
    for (var t = 0; t < compas.tiempos; t++) {
      if (t === i) {
        for (var s = 0; s < nPartes; s++) {
          var k = p[pIdx++];
          notas.push(nota(k, durParte, 0));
          grupoBeam.push(notas.length - 1);
          if (s === nPartes - 1) { idxUltimaParte = notas.length - 1; pitchUltimaParte = k; }
        }
      } else if (t === i + 1) {
        idxSiguiente = notas.length;
        notas.push(nota(pitchUltimaParte, 'q', 0));
      } else {
        notas.push(nota(p[pIdx++], 'q', 0));
      }
    }
    var nombreParte = semicorcheas ? 'La última semicorchea' : 'La segunda corchea';
    return {
      tipo: 'sincopa', clase: 'parte', notas: notas, beams: [grupoBeam],
      ligaduras: [[idxUltimaParte, idxSiguiente]], correctas: [[idxUltimaParte, idxSiguiente]],
      explicacion: nombreParte + ' del tiempo ' + (i + 1) + ' (parte débil) se liga al tiempo ' + (i + 2) + ' entero: es síncopa de parte.'
    };
  }

  // -- síncopa de compás: el último tiempo (débil) cruza la barra ligado
  //    al tiempo 1 (fuerte) del compás siguiente --
  function compasCruzado(rng, compas) {
    var t = compas.tiempos;
    var p0 = alturas(t, rng);
    var p1 = t > 1 ? alturas(t - 1, rng) : [];
    var notas = [];
    for (var i = 0; i < t; i++) notas.push(nota(p0[i], 'q', 0));
    notas.push(nota(p0[t - 1], 'q', 1));
    for (var j = 1; j < t; j++) notas.push(nota(p1[j - 1], 'q', 1));
    return {
      tipo: 'sincopa', notas: notas, ligaduras: [[t - 1, t]], correctas: [[t - 1, t]],
      explicacion: 'La nota del tiempo ' + t + ' (débil) cruza la línea de compás ligada al tiempo 1 siguiente (fuerte): es síncopa de compás.'
    };
  }

  // -- ninguna: ritmo recto, sin ligaduras — a veces con puntillo (negra
  //    con puntillo + corchea en vez de dos negras), para más variedad --
  function recto(rng, compas) {
    var p = alturas(compas.tiempos, rng);
    var notas = p.map(function (k) { return nota(k, 'q', 0); });
    if (compas.tiempos >= 2 && rng() < 0.35) {
      var i = Math.floor(rng() * (compas.tiempos - 1));
      notas[i] = nota(p[i], 'qd', 0);
      notas[i + 1] = nota(p[i + 1], '8', 0);
    }
    return { tipo: 'ninguna', notas: notas, ligaduras: [], correctas: [], explicacion: 'No hay ninguna ligadura en este fragmento: no hay síncopa.' };
  }

  // -- ninguna: ligadura que SÍ existe pero empieza en tiempo 1 (fuerte)
  //    => no es síncopa, es solo una nota larga escrita en dos partes --
  function ligaduraFuerte(rng, compas) {
    var p = alturas(compas.tiempos - 1, rng);
    var notas = [nota(p[0], 'q', 0), nota(p[0], 'q', 0)];
    for (var i = 1; i < compas.tiempos - 1; i++) notas.push(nota(p[i], 'q', 0));
    return {
      tipo: 'ninguna', notas: notas, ligaduras: [[0, 1]], correctas: [],
      explicacion: 'Hay ligadura, pero empieza en el tiempo 1 (fuerte), no en un tiempo débil: no es síncopa (es solo una nota larga escrita en dos partes).'
    };
  }

  // -- ninguna: contratiempo — ataca en la parte débil de un tiempo
  //    cualquiera, pero SIN ligadura al tiempo fuerte siguiente --
  function contratiempo(rng, compas) {
    var i = Math.floor(rng() * compas.tiempos);
    var p = alturas(compas.tiempos, rng);
    var notas = [], pIdx = 0;
    for (var t = 0; t < compas.tiempos; t++) {
      if (t === i) { notas.push(nota('b/4', '8r', 0)); notas.push(nota(p[pIdx++], '8', 0)); }
      else { notas.push(nota(p[pIdx++], 'q', 0)); }
    }
    return {
      tipo: 'ninguna', notas: notas, ligaduras: [], correctas: [],
      explicacion: 'La nota ataca en el "y" del tiempo ' + (i + 1) + ' (parte débil), sin ligadura hacia ningún tiempo fuerte: es un contratiempo, no una síncopa.'
    };
  }

  // -- ninguna: ligadura que empieza en un tiempo y va a uno NO más
  //    fuerte => no es síncopa (solo existe en 4/4: tiempo 3 → tiempo 4) --
  function ligaduraDebil(rng, compas) {
    var i = parNoAscendenteInterior(compas);
    var p = alturas(compas.tiempos - 1, rng);
    var notas = [], pIdx = 0, pitchI = null;
    for (var t = 0; t < compas.tiempos; t++) {
      var k;
      if (t === i) { k = p[pIdx++]; pitchI = k; }
      else if (t === i + 1) { k = pitchI; }
      else { k = p[pIdx++]; }
      notas.push(nota(k, 'q', 0));
    }
    return {
      tipo: 'ninguna', notas: notas, ligaduras: [[i, i + 1]], correctas: [],
      explicacion: 'Hay ligadura, pero empieza en el tiempo ' + (i + 1) + ' y va a uno no más fuerte (tiempo ' + (i + 2) + '): no es síncopa, porque no termina en un tiempo más fuerte que el de inicio.'
    };
  }

  /* Los moldes válidos dependen del compás: en 2/4 no cabe una síncopa
     "de tiempo" ni el distractor de "ligadura débil" (con solo 2 tiempos
     no hay hueco para ninguna de las dos); en 3/4 tampoco cabe la
     ligadura débil. */
  function poolInterior(compas) {
    var pool = [recto, ligaduraFuerte, contratiempo, parte];
    if (parAscendente(compas) !== -1) pool.push(tiempo);
    if (parNoAscendenteInterior(compas) !== -1) pool.push(ligaduraDebil);
    return pool;
  }

  /* rng opcional: si no se da, Math.random (variedad real en el navegador).
     Para la ficha PDF se pasa un mulberry32 con semilla fija, así el PDF
     sale siempre igual aunque el ejercicio en pantalla sea distinto cada vez. */
  function generarFragmento(rng) {
    rng = rng || Math.random;
    var compas = compasAlAzar(rng);
    var pool = poolInterior(compas).concat([compasCruzado]);
    var molde = pool[Math.floor(rng() * pool.length)];
    var frag = molde(rng, compas);
    frag.compasTxt = compas.txt;
    return frag;
  }

  /* Nivel difícil: 2 a 4 compases (todos del mismo compás: 2/4, 3/4 o
     4/4), cada uno con uno de los moldes válidos para ese compás (todos
     menos "compás cruzado", que ya es de dos), y además, entre compás y
     compás, puede aparecer —al azar— una síncopa DE COMPÁS (último
     tiempo ligado al tiempo 1 siguiente): para eso se fuerza que la
     última nota de un compás y la primera del siguiente compartan
     altura (una ligadura solo puede unir notas iguales) y se ligan.
     El número de síncopas del fragmento no está fijado: puede haber
     0, 1, 2, 3 o más, según lo que toque en cada compás y en cada unión. */
  function ultimaLibre(frag) {
    var last = frag.notas.length - 1;
    var enTie = (frag.ligaduras || []).some(function (p) { return p[1] === last; });
    return !enTie && frag.notas[last].duration === 'q';
  }
  function primeraLibre(frag) {
    return !(frag.ligaduras || []).some(function (p) { return p[0] === 0; });
  }

  function generarFragmentoDificil(rng) {
    rng = rng || Math.random;
    var compas = compasAlAzar(rng);
    var interioresPosibles = poolInterior(compas);
    var numCompases = 2 + Math.floor(rng() * 3); // 2, 3 o 4
    var notas = [], ligaduras = [], correctas = [], resumen = [], beams = [];
    var offset = 0, finLibreAnterior = false, idxFinAnterior = -1;

    for (var m = 0; m < numCompases; m++) {
      var gen = interioresPosibles[Math.floor(rng() * interioresPosibles.length)];
      var frag = gen(rng, compas);

      frag.notas.forEach(function (n) { notas.push({ keys: n.keys, duration: n.duration, measure: m }); });
      (frag.ligaduras || []).forEach(function (p) { ligaduras.push([p[0] + offset, p[1] + offset]); });
      (frag.beams || []).forEach(function (grupo) { beams.push(grupo.map(function (idx) { return idx + offset; })); });
      (frag.correctas || []).forEach(function (p) {
        correctas.push([p[0] + offset, p[1] + offset]);
        resumen.push('compás ' + (m + 1) + ' (síncopa de ' + (frag.clase || 'compás') + ')');
      });

      var idxPrimera = offset;
      var idxUltima = offset + frag.notas.length - 1;
      if (m > 0 && finLibreAnterior && primeraLibre(frag) && rng() < 0.5) {
        notas[idxPrimera].keys = notas[idxFinAnterior].keys.slice();
        ligaduras.push([idxFinAnterior, idxPrimera]);
        correctas.push([idxFinAnterior, idxPrimera]);
        resumen.push('entre el compás ' + m + ' y el ' + (m + 1) + ' (síncopa de compás)');
      }

      offset += frag.notas.length;
      finLibreAnterior = ultimaLibre(frag);
      idxFinAnterior = idxUltima;
    }

    var explicacion = correctas.length === 0
      ? 'Este fragmento no tiene ninguna síncopa.'
      : (correctas.length === 1 ? 'Hay una síncopa: ' : 'Hay ' + correctas.length + ' síncopas: ') + resumen.join(', ') + '.';

    return { tipo: 'dificil', notas: notas, ligaduras: ligaduras, correctas: correctas, beams: beams, explicacion: explicacion, compasTxt: compas.txt };
  }

  var CSS = [
    '.tm-si-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-si-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-si-wrap .tm-si-q{text-align:center;font-size:1.15rem;font-weight:700;margin:10px 0;color:#1a1a2e;}',
    '.tm-si-wrap .tm-si-staff{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;padding:10px 4px;display:flex;justify-content:center;overflow-x:auto;}',
    '.tm-si-wrap .tm-si-staff svg{display:block;}',
    '.tm-si-wrap .tm-si-lane{fill:transparent;stroke:none;cursor:pointer;}',
    '.tm-si-wrap .tm-si-lane:focus-visible{fill:rgba(139,105,20,.18);outline:2px solid #8b6914;outline-offset:-2px;}',
    '.tm-si-wrap .tm-si-lane:hover{fill:rgba(139,105,20,.12);}',
    '.tm-si-wrap .tm-si-lane.tm-sel{fill:rgba(139,105,20,.25);}',
    '.tm-si-wrap .tm-si-lane.tm-ok{fill:rgba(39,174,96,.32);}',
    '.tm-si-wrap .tm-si-lane.tm-ko{fill:rgba(192,57,43,.32);}',
    '.tm-si-wrap .tm-si-none{width:100%;margin-top:4px;padding:12px;font-size:.92rem;font-weight:700;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;transition:0.2s;font-family:inherit;}',
    '.tm-si-wrap .tm-si-none.tm-sel{background:#8b6914!important;border-color:#8b6914!important;color:#fff!important;}',
    '.tm-si-wrap .tm-si-none.tm-ok{background:#27ae60!important;border-color:#27ae60!important;color:#fff!important;}',
    '.tm-si-wrap .tm-si-none.tm-ko{background:#c0392b!important;border-color:#c0392b!important;color:#fff!important;}',
    '.tm-si-wrap .tm-submit{width:100%;margin-top:15px;padding:15px;background:#d8d0b8;color:#fff;border:none;border-radius:6px;font-weight:800;cursor:not-allowed;font-family:inherit;}',
    '.tm-si-wrap .tm-submit.tm-ready{background:#8b6914;cursor:pointer;}',
    '.tm-si-wrap .tm-fb{display:none;margin-top:15px;padding:15px;border-radius:6px;font-weight:600;}',
    '.tm-si-wrap .tm-fb.tm-show{display:block;}',
    '.tm-si-wrap .tm-fb.tm-ok{background:#e8f5e9;color:#2e7d32;}',
    '.tm-si-wrap .tm-fb.tm-ko{background:#ffebee;color:#c62828;}',
    '.tm-si-wrap .tm-nxt{display:none;width:100%;margin-top:10px;padding:15px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:inherit;}',
    '.tm-si-wrap .tm-nxt.tm-show{display:block;}',
    '.tm-si-wrap .tm-si-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}',
    '.tm-si-wrap .tm-si-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-si-wrap .tm-si-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-si-wrap .tm-si-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-si-wrap .tm-si-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-si-wrap .tm-si-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    '.tm-si-wrap .tm-si-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-si-wrap .tm-si-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-si-wrap .tm-si-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '.tm-si-wrap .tm-si-mode-screen{text-align:center;padding:.5rem 0 1rem;}',
    '.tm-si-wrap .tm-si-mode-title{font-size:1.35rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e;}',
    '.tm-si-wrap .tm-si-mode-subtitle{color:#666;margin:0 0 1.5rem;font-size:.92rem;}',
    '.tm-si-wrap .tm-si-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}',
    '.tm-si-wrap .tm-si-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.6rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;max-width:280px;font-family:inherit;}',
    '.tm-si-wrap .tm-si-mode-btn:hover{border-color:#8b6914;background:#fdf8ee;}',
    '.tm-si-wrap .tm-si-mode-lbl{font-size:.95rem;font-weight:700;color:#1a1a2e;}',
    '.tm-si-wrap .tm-si-mode-desc{font-size:.78rem;color:#888;text-align:center;line-height:1.35;}',
    '@media(max-width:500px){.tm-si-wrap .tm-si-modes{flex-direction:column;align-items:center;}.tm-si-wrap .tm-si-mode-btn{width:100%;max-width:none;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-si-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-si-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* Dibuja el fragmento (1 o más compases) y devuelve { svg, lanes } donde
     lanes[i] = {x, w} en coordenadas del SVG para la nota i. */
  function dibujarFragmento(div, frag) {
    div.innerHTML = '';
    var V = Vex.Flow;
    var numCompases = 1 + Math.max.apply(null, frag.notas.map(function (n) { return n.measure; }));
    var w = numCompases === 1 ? 300 : (20 + numCompases * 230), h = 150;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(w, h);
    var ctx = r.getContext();

    var staveW = numCompases === 1 ? (w - 20) : 230;
    var grupos = [];
    var staves = [];
    var x = 10;
    for (var mi = 0; mi < numCompases; mi++) {
      var anchoAqui = (mi === numCompases - 1) ? (w - 10 - x) : staveW;
      var stave = new V.Stave(x, 30, anchoAqui);
      if (mi === 0) stave.addClef('treble').addTimeSignature(frag.compasTxt || '4/4');
      stave.setContext(ctx).draw();
      staves.push(stave);
      x += anchoAqui;
      grupos.push(frag.notas.filter(function (n) { return n.measure === mi; }));
    }

    function crear(n) {
      var note = new V.StaveNote({ clef: 'treble', keys: n.keys, duration: n.duration });
      /* Plica hacia abajo por encima de la línea central (línea 3 = si4),
         hacia arriba en la línea central o por debajo — convención estándar. */
      var linea = note.getKeyProps()[0].line;
      note.setStemDirection(linea >= 3 ? -1 : 1);
      /* El puntillo (duration termina en "d") no se dibuja solo con la
         duración: hace falta añadir el modificador Dot explícitamente. */
      if (n.duration.slice(-1) === 'd') V.Dot.buildAndAttach([note], { all: true });
      return note;
    }
    var vfPorCompas = grupos.map(function (g) { return g.map(crear); });
    var vfTodas = [].concat.apply([], vfPorCompas);

    var beams = (frag.beams || []).map(function (grupo) {
      return new V.Beam(grupo.map(function (idx) { return vfTodas[idx]; }));
    });

    vfPorCompas.forEach(function (vfNotas, mi) { V.Formatter.FormatAndDraw(ctx, staves[mi], vfNotas); });
    beams.forEach(function (b) { b.setContext(ctx).draw(); });

    (frag.ligaduras || []).forEach(function (par) {
      new V.StaveTie({
        first_note: vfTodas[par[0]], last_note: vfTodas[par[1]],
        first_indices: [0], last_indices: [0]
      }).setContext(ctx).draw();
    });

    var svg = div.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.maxWidth = w + 'px';

    /* Agrupa las notas ligadas: una síncopa es UN solo suceso rítmico, así
       que las dos notas de la ligadura comparten un único carril de clic
       (no dos opciones separadas para la misma síncopa). */
    var n = frag.notas.length;
    var groups = [];
    var saltar = -1;
    for (var gi = 0; gi < n; gi++) {
      if (gi === saltar) continue;
      var par = (frag.ligaduras || []).filter(function (p) { return p[0] === gi; })[0];
      if (par) { groups.push([gi, par[1]]); saltar = par[1]; }
      else { groups.push([gi]); }
    }

    /* Carriles clicables: el punto medio entre cada grupo y el vecino,
       para que el hueco de clic sea generoso (no hay que acertar el
       cabezal exacto). */
    var boxes = Array.prototype.slice.call(svg.querySelectorAll('.vf-stavenote')).map(function (g) {
      return g.getBBox();
    });
    var lanes = groups.map(function (grp, i) {
      var first = boxes[grp[0]], last = boxes[grp[grp.length - 1]];
      var prevLast = (i === 0) ? null : boxes[groups[i - 1][groups[i - 1].length - 1]];
      var nextFirst = (i === groups.length - 1) ? null : boxes[groups[i + 1][0]];
      var left = prevLast ? (prevLast.x + prevLast.width + first.x) / 2 : 2;
      var right = nextFirst ? (last.x + last.width + nextFirst.x) / 2 : (w - 2);
      return { x: left, w: right - left };
    });

    var svgNS = 'http://www.w3.org/2000/svg';
    var rects = lanes.map(function (l, i) {
      var rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', l.x);
      rect.setAttribute('y', 0);
      rect.setAttribute('width', l.w);
      rect.setAttribute('height', h);
      rect.setAttribute('class', 'tm-si-lane');
      rect.setAttribute('tabindex', '0');
      rect.setAttribute('role', 'button');
      rect.setAttribute('aria-label', 'Nota o grupo de notas ' + (i + 1) + ' de ' + lanes.length);
      rect.dataset.idx = i;
      svg.appendChild(rect);
      return rect;
    });

    return { svg: svg, rects: rects, groups: groups };
  }

  /* Variante para imprimir (ficha PDF): igual dibujo, sin carriles de
     clic. En modo solución, colorea de rojo la nota (o el par ligado)
     donde empieza la síncopa; si el fragmento no tiene síncopa, no
     colorea nada (el generador de la ficha añade el aviso "No hay
     síncopa" aparte). */
  function dibujarFragmentoImpresion(div, frag, solucion) {
    div.innerHTML = '';
    var V = Vex.Flow;
    var numCompases = 1 + Math.max.apply(null, frag.notas.map(function (n) { return n.measure; }));
    var w = numCompases === 1 ? 300 : (20 + numCompases * 230), h = 150;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(w, h);
    var ctx = r.getContext();

    var staveW = numCompases === 1 ? (w - 20) : 230;
    var grupos = [];
    var staves = [];
    var x = 10;
    for (var mi = 0; mi < numCompases; mi++) {
      var anchoAqui = (mi === numCompases - 1) ? (w - 10 - x) : staveW;
      var stave = new V.Stave(x, 30, anchoAqui);
      if (mi === 0) stave.addClef('treble').addTimeSignature(frag.compasTxt || '4/4');
      stave.setContext(ctx).draw();
      staves.push(stave);
      x += anchoAqui;
      grupos.push(frag.notas.filter(function (n) { return n.measure === mi; }));
    }

    var ROJO = { fillStyle: '#c0392b', strokeStyle: '#c0392b' };
    var esCorrecta = function (idx) { return solucion && (frag.correctas || []).some(function (par) { return par.indexOf(idx) !== -1; }); };
    var idxGlobal = 0;
    function crear(n) {
      var note = new V.StaveNote({ clef: 'treble', keys: n.keys, duration: n.duration });
      var linea = note.getKeyProps()[0].line;
      note.setStemDirection(linea >= 3 ? -1 : 1);
      if (n.duration.slice(-1) === 'd') V.Dot.buildAndAttach([note], { all: true });
      if (esCorrecta(idxGlobal)) note.setStyle(ROJO);
      idxGlobal++;
      return note;
    }
    var vfPorCompas = grupos.map(function (g) { return g.map(crear); });
    var vfTodas = [].concat.apply([], vfPorCompas);

    var beams = (frag.beams || []).map(function (grupo) {
      return new V.Beam(grupo.map(function (idx) { return vfTodas[idx]; }));
    });

    vfPorCompas.forEach(function (vfNotas, mi) { V.Formatter.FormatAndDraw(ctx, staves[mi], vfNotas); });
    beams.forEach(function (b) { b.setContext(ctx).draw(); });

    (frag.ligaduras || []).forEach(function (par) {
      var tie = new V.StaveTie({
        first_note: vfTodas[par[0]], last_note: vfTodas[par[1]],
        first_indices: [0], last_indices: [0]
      });
      if (esCorrecta(par[0])) tie.setStyle(ROJO);
      tie.setContext(ctx).draw();
    });

    var svg = div.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.maxWidth = w + 'px';
    return svg;
  }

  function tmSincopaEngine(containerId) {
    injectCSS();

    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-si-wrap';
    var uid = containerId;

    var totalQ, queue;
    var currentQ, score, cFrag, answered, modoDificil;
    var selGrupos, selNinguna;

    var PREGUNTAS_POR_TEST = 10;
    /* Modo normal: cada pregunta sortea compás (2/4, 3/4 o 4/4) y molde
       por separado, con sus propias alturas aleatorias, así que nunca
       sale el mismo fragmento dos veces. Modo difícil: cada pregunta es
       un fragmento de 2 a 4 compases (del mismo compás) con 0, 1, 2, 3
       o más síncopas — hay que tocarlas todas. */
    function buildQueue() {
      var q = [];
      for (var i = 0; i < PREGUNTAS_POR_TEST; i++) {
        q.push(modoDificil ? generarFragmentoDificil(Math.random) : generarFragmento(Math.random));
      }
      return q;
    }

    function showModeScreen() {
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-si-mode-screen">',
            '<h2 class="tm-si-mode-title">Test de síncopas</h2>',
            '<p class="tm-si-mode-subtitle">Elige la dificultad — ' + PREGUNTAS_POR_TEST + ' preguntas</p>',
            '<div class="tm-si-modes">',
              '<button class="tm-si-mode-btn" data-modo="normal"><span class="tm-si-mode-lbl">Normal</span><span class="tm-si-mode-desc">Un fragmento de un compás (o dos, si cruza la barra): ninguna síncopa o como mucho una</span></button>',
              '<button class="tm-si-mode-btn" data-modo="dificil"><span class="tm-si-mode-lbl">Difícil</span><span class="tm-si-mode-desc">Fragmentos de 2 a 4 compases: puede haber varias síncopas a la vez, o ninguna</span></button>',
            '</div>',
          '</div>',
        '</div>'
      ].join('');
      wrap.querySelectorAll('.tm-si-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          modoDificil = btn.dataset.modo === 'dificil';
          startQuiz();
        });
      });
    }

    function startQuiz() {
      queue = buildQueue();
      totalQ = queue.length;
      currentQ = 0; score = 0;
      var pregunta = modoDificil
        ? 'Toca todas las notas donde empiece una síncopa (puede haber varias, o ninguna)'
        : 'Toca la nota donde empieza la síncopa (o «No hay síncopa» si no la hay)';
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-si-header">',
            '<div class="tm-si-progress-wrap">',
              '<div class="tm-si-bar"><div class="tm-si-fill" id="' + uid + '_fill"></div></div>',
              '<span class="tm-si-counter" id="' + uid + '_cnt">1 / ' + totalQ + '</span>',
            '</div>',
            '<span class="tm-si-badge" id="' + uid + '_badge">✓ 0</span>',
          '</div>',
          '<p class="tm-si-q" id="' + uid + '_q">' + pregunta + '</p>',
          '<div class="tm-si-staff" id="' + uid + '_staff"></div>',
          '<button class="tm-si-none" id="' + uid + '_none">No hay síncopa</button>',
          '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>',
          '<div id="' + uid + '_fb" class="tm-fb"></div>',
          '<button id="' + uid + '_nxt" class="tm-nxt">Siguiente →</button>',
        '</div>'
      ].join('');
      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);
      nextQ();
    }

    var lanes, groups, noneBtn;

    function renderPregunta() {
      selGrupos = []; selNinguna = false;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.classList.remove('tm-ready');
      noneBtn = document.getElementById(uid + '_none');
      noneBtn.className = 'tm-si-none';

      var res = dibujarFragmento(document.getElementById(uid + '_staff'), cFrag);
      lanes = res.rects;
      groups = res.groups;
      lanes.forEach(function (rect) {
        rect.addEventListener('click', function () { seleccionar(parseInt(rect.dataset.idx, 10)); });
        rect.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
            ev.preventDefault();
            seleccionar(parseInt(rect.dataset.idx, 10));
          }
        });
      });
      noneBtn.onclick = function () { seleccionar('ninguna'); };
    }

    function seleccionar(v) {
      if (answered) return;
      if (v === 'ninguna') {
        selNinguna = !selNinguna;
        if (selNinguna) selGrupos = [];
      } else if (modoDificil) {
        var pos = selGrupos.indexOf(v);
        if (pos === -1) selGrupos.push(v); else selGrupos.splice(pos, 1);
        if (selGrupos.length) selNinguna = false;
      } else {
        selGrupos = [v];
        selNinguna = false;
      }
      lanes.forEach(function (r, i) { r.classList.toggle('tm-sel', selGrupos.indexOf(i) !== -1); });
      noneBtn.classList.toggle('tm-sel', selNinguna);
      document.getElementById(uid + '_btn').classList.toggle('tm-ready', selNinguna || selGrupos.length > 0);
    }

    function checkAnswer() {
      var elBtn = document.getElementById(uid + '_btn');
      if (!elBtn.classList.contains('tm-ready')) return;
      answered = true;
      elBtn.style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';

      /* cFrag.correctas guarda pares de índices de NOTA (los dos extremos
         de cada ligadura que sí es síncopa); hay que traducir cada par al
         grupo (carril) que lo contiene, porque una nota ligada comparte
         carril con su pareja. Puede haber 0, 1 o varios grupos correctos. */
      var gruposCorrectos = cFrag.correctas.map(function (par) {
        return groups.findIndex(function (g) { return g.indexOf(par[0]) !== -1 || g.indexOf(par[1]) !== -1; });
      });

      var mismosGrupos = selGrupos.length === gruposCorrectos.length
        && selGrupos.every(function (g) { return gruposCorrectos.indexOf(g) !== -1; });
      var correcto = gruposCorrectos.length === 0 ? (selNinguna && selGrupos.length === 0) : (!selNinguna && mismosGrupos);
      if (correcto) score++;

      gruposCorrectos.forEach(function (g) { lanes[g].classList.add('tm-ok'); });
      selGrupos.forEach(function (g) { if (gruposCorrectos.indexOf(g) === -1) lanes[g].classList.add('tm-ko'); });
      if (gruposCorrectos.length === 0) noneBtn.classList.add('tm-ok');
      else if (selNinguna) noneBtn.classList.add('tm-ko');

      var elFb = document.getElementById(uid + '_fb');
      elFb.className = 'tm-fb tm-show ' + (correcto ? 'tm-ok' : 'tm-ko');
      elFb.innerHTML = (correcto ? '<strong>¡Correcto!</strong> ' : '<strong>Incorrecto.</strong> ') + cFrag.explicacion;

      document.getElementById(uid + '_badge').textContent = '✓ ' + score;
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++;
      answered = false;

      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.style.display = '';
      elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';

      cFrag = queue[currentQ - 1];
      renderPregunta();
    }

    function showResults() {
      var pct = Math.round(score / totalQ * 100);
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-si-score-box">',
            '<div class="tm-si-score-num">' + score + '/' + totalQ + '</div>',
            '<div class="tm-si-score-pct">' + pct + '%</div>',
          '</div>',
          '<button class="tm-submit tm-ready" id="' + uid + '_restart">Hacer otro test</button>',
        '</div>'
      ].join('');
      document.getElementById(uid + '_restart').addEventListener('click', showModeScreen);
    }

    function init() { showModeScreen(); }
    if (typeof Vex !== 'undefined') { init(); }
    else { window.addEventListener('vexflow-ready', init, { once: true }); }
  }

  window.tmSincopaEngine = tmSincopaEngine;
  window.tmSincopaGenerar = generarFragmento;
  window.tmSincopaGenerarDificil = generarFragmentoDificil;
  window.tmSincopaMulberry32 = mulberry32;
  window.tmSincopaDibujarImpresion = dibujarFragmentoImpresion;
  window.tmSincopaCompases = COMPASES;
})();
