/* Motor — Ejercicio de notas a contratiempo: se dibuja un fragmento rítmico
   (1 o más compases) y hay que CLICAR la nota que está a contratiempo, o el
   botón "No hay contratiempo" si el fragmento no tiene ninguna.

   Un contratiempo es una nota que ataca en una parte débil mientras la
   parte fuerte inmediatamente anterior está en SILENCIO, sin ligadura
   (eso es lo que lo distingue de la síncopa, donde la parte débil se
   PROLONGA con ligadura sobre la fuerte). IMPORTANTE: la nota del
   contratiempo no puede sonar sobre la parte fuerte siguiente sin
   re-atacar —eso, se escriba con ligadura o como una sola figura de
   mayor duración, es rítmicamente una síncopa, no un contratiempo—, así
   que su duración nunca cruza el límite de la parte fuerte que silencia.
   El motor genera los mismos tres compases que el de síncopa (2/4, 3/4,
   4/4), con dos moldes reales de contratiempo —de parte ("y" de un
   tiempo) y de tiempo entero— y distractores: ritmo recto sin silencios,
   un silencio en la parte DÉBIL seguido de nota en la fuerte (entrada
   normal, no contratiempo), una síncopa real (ligadura, no silencio) y un
   silencio que no cae en una parte más fuerte que la nota siguiente. Cada
   compás tiene su propia tabla de fuerza métrica, así que no todos los
   moldes existen en todos los compases (en 2/4, por ejemplo, no hay
   distractor de "silencio no descendente"). Mismo patrón que
   sincopa-engine.js, con la misma variedad de alturas al azar. */
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
  var SILENCIO = 'b/4';

  /* Mismos tres compases y misma tabla de fuerza que sincopa-engine.js
     (3 fuerte, 2 semifuerte, 1 débil; las partes internas de un tiempo,
     como el "y", siempre pesan menos que su propio tiempo). */
  var COMPASES = [
    { txt: '2/4', tiempos: 2, fuerzas: [3, 1] },
    { txt: '3/4', tiempos: 3, fuerzas: [3, 1, 1] },
    { txt: '4/4', tiempos: 4, fuerzas: [3, 1, 2, 1] }
  ];
  function compasAlAzar(rng) { return COMPASES[Math.floor(rng() * COMPASES.length)]; }

  /* Pares de tiempos adyacentes i→i+1 donde el tiempo i pesa MÁS que el
     i+1 (hueco para un contratiempo de tiempo: silencio en el fuerte,
     nota en el débil siguiente). Siempre existe al menos t.1→t.2. */
  function paresDescendentes(compas) {
    var out = [];
    for (var i = 0; i < compas.tiempos - 1; i++) if (compas.fuerzas[i] > compas.fuerzas[i + 1]) out.push(i);
    return out;
  }
  /* Pares donde el tiempo i NO pesa más que el i+1 (igual o ascendente):
     hueco para el distractor "silencio que no cae en el fuerte". No
     existe en 2/4. */
  function paresNoDescendentes(compas) {
    var out = [];
    for (var i = 0; i < compas.tiempos - 1; i++) if (compas.fuerzas[i] <= compas.fuerzas[i + 1]) out.push(i);
    return out;
  }
  /* Pares donde el tiempo i pesa MENOS que el i+1 (ascendente): el mismo
     hueco que usa la síncopa "de tiempo" en sincopa-engine.js. No existe
     en 2/4. */
  function paresAscendentes(compas) {
    var out = [];
    for (var i = 0; i < compas.tiempos - 1; i++) if (compas.fuerzas[i] < compas.fuerzas[i + 1]) out.push(i);
    return out;
  }
  function elegir(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }

  // -- contratiempo de parte: silencio de corchea en la parte fuerte de un
  //    tiempo cualquiera, nota en el "y" (parte débil) --
  function contratiempoParte(rng, compas) {
    var i = Math.floor(rng() * compas.tiempos);
    var p = alturas(compas.tiempos, rng);
    var notas = [], pIdx = 0, idxNota = -1;
    for (var t = 0; t < compas.tiempos; t++) {
      if (t === i) {
        notas.push(nota(SILENCIO, '8r', 0));
        idxNota = notas.length;
        notas.push(nota(p[pIdx++], '8', 0));
      } else {
        notas.push(nota(p[pIdx++], 'q', 0));
      }
    }
    return {
      tipo: 'contratiempo', notas: notas, ligaduras: [], correctas: [[idxNota]],
      explicacion: 'Silencio de corchea en la parte fuerte del tiempo ' + (i + 1) + ' y la nota ataca en el «y» (parte débil), sin ligadura: es un contratiempo.'
    };
  }

  // -- contratiempo de tiempo: un tiempo entero en silencio (el más
  //    fuerte de un par), nota en el tiempo siguiente (más débil) --
  function contratiempoTiempo(rng, compas) {
    var i = elegir(paresDescendentes(compas), rng);
    var p = alturas(compas.tiempos - 1, rng);
    var notas = [], pIdx = 0, idxNota = -1;
    for (var t = 0; t < compas.tiempos; t++) {
      if (t === i) { notas.push(nota(SILENCIO, 'qr', 0)); }
      else if (t === i + 1) { idxNota = notas.length; notas.push(nota(p[pIdx++], 'q', 0)); }
      else { notas.push(nota(p[pIdx++], 'q', 0)); }
    }
    return {
      tipo: 'contratiempo', notas: notas, ligaduras: [], correctas: [[idxNota]],
      explicacion: 'El tiempo ' + (i + 1) + ' (más fuerte) está en silencio y la nota ataca en el tiempo ' + (i + 2) + ' (más débil): es un contratiempo de tiempo.'
    };
  }

  // -- ninguna: ritmo recto, sin silencios — a veces con puntillo, para
  //    más variedad rítmica --
  function recto(rng, compas) {
    var p = alturas(compas.tiempos, rng);
    var notas = p.map(function (k) { return nota(k, 'q', 0); });
    if (compas.tiempos >= 2 && rng() < 0.35) {
      var i = Math.floor(rng() * (compas.tiempos - 1));
      notas[i] = nota(p[i], 'qd', 0);
      notas[i + 1] = nota(p[i + 1], '8', 0);
    }
    return { tipo: 'ninguna', notas: notas, ligaduras: [], correctas: [], explicacion: 'No hay ningún silencio en parte fuerte seguido de nota en parte débil: no hay contratiempo.' };
  }

  // -- ninguna: silencio en la parte DÉBIL (el "y") seguido de nota en la
  //    parte fuerte siguiente — es una entrada normal, no contratiempo --
  function pickupDebil(rng, compas) {
    var i = Math.floor(rng() * (compas.tiempos - 1));
    var p = alturas(compas.tiempos, rng);
    var notas = [], pIdx = 0;
    for (var t = 0; t < compas.tiempos; t++) {
      if (t === i) {
        notas.push(nota(p[pIdx++], '8', 0));
        notas.push(nota(SILENCIO, '8r', 0));
      } else {
        notas.push(nota(p[pIdx++], 'q', 0));
      }
    }
    return {
      tipo: 'ninguna', notas: notas, ligaduras: [], correctas: [],
      explicacion: 'Hay un silencio, pero está en la parte débil (el «y») del tiempo ' + (i + 1) + ', no en la fuerte: la nota del tiempo ' + (i + 2) + ' entra con normalidad, no es un contratiempo.'
    };
  }

  // -- ninguna: nota débil ligada a la fuerte siguiente — es una síncopa
  //    real (hay ligadura), no un contratiempo (no hay silencio) --
  function sincopaLigada(rng, compas) {
    var i = elegir(paresAscendentes(compas), rng);
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
      explicacion: 'La nota del tiempo ' + (i + 1) + ' se liga al tiempo ' + (i + 2) + ': eso es una síncopa (hay ligadura y ningún silencio), no un contratiempo.'
    };
  }

  // -- ninguna: silencio en un tiempo que NO es más fuerte que el
  //    siguiente (igual o más débil) — no es contratiempo --
  function silencioNoDescendente(rng, compas) {
    var i = elegir(paresNoDescendentes(compas), rng);
    var p = alturas(compas.tiempos - 1, rng);
    var notas = [], pIdx = 0;
    for (var t = 0; t < compas.tiempos; t++) {
      if (t === i) { notas.push(nota(SILENCIO, 'qr', 0)); }
      else { notas.push(nota(p[pIdx++], 'q', 0)); }
    }
    return {
      tipo: 'ninguna', notas: notas, ligaduras: [], correctas: [],
      explicacion: 'El tiempo ' + (i + 1) + ' está en silencio, pero el tiempo ' + (i + 2) + ' no es más fuerte (pesa igual o menos): no es un contratiempo, porque la nota no cae en una parte más débil que el silencio.'
    };
  }

  /* Los moldes válidos dependen del compás: en 2/4 no cabe la síncopa
     ligada ni el silencio "no descendente" (con solo 2 tiempos, fuerte
     seguido de débil, no hay hueco para ninguno de los dos). */
  function poolInterior(compas) {
    var pool = [contratiempoParte, contratiempoTiempo, recto, pickupDebil];
    if (paresAscendentes(compas).length) pool.push(sincopaLigada);
    if (paresNoDescendentes(compas).length) pool.push(silencioNoDescendente);
    return pool;
  }

  /* rng opcional: si no se da, Math.random (variedad real en el navegador).
     Para la ficha PDF se pasa un mulberry32 con semilla fija. */
  function generarFragmento(rng) {
    rng = rng || Math.random;
    var compas = compasAlAzar(rng);
    var pool = poolInterior(compas);
    var molde = pool[Math.floor(rng() * pool.length)];
    var frag = molde(rng, compas);
    frag.compasTxt = compas.txt;
    return frag;
  }

  /* Nivel difícil: 2 compases (del mismo compás), cada uno con un molde
     válido sorteado por separado. El número de contratiempos no está
     fijado: puede haber 0, 1, 2 o más según lo que toque en cada compás. */
  function generarFragmentoDificil(rng) {
    rng = rng || Math.random;
    var compas = compasAlAzar(rng);
    var interioresPosibles = poolInterior(compas);
    /* Siempre 2 compases: en pantallas de móvil no conviene depender del
       desplazamiento horizontal para ver fragmentos más largos (3-4
       compases), así que el modo difícil se queda en el ancho que cabe
       encogido sin perder legibilidad. */
    var numCompases = 2;
    var notas = [], correctas = [], resumen = [];
    var offset = 0;

    for (var m = 0; m < numCompases; m++) {
      var gen = interioresPosibles[Math.floor(rng() * interioresPosibles.length)];
      var frag = gen(rng, compas);

      frag.notas.forEach(function (n) { notas.push({ keys: n.keys, duration: n.duration, measure: m }); });
      (frag.correctas || []).forEach(function (p) {
        correctas.push([p[0] + offset]);
        resumen.push('compás ' + (m + 1));
      });

      offset += frag.notas.length;
    }

    var explicacion = correctas.length === 0
      ? 'Este fragmento no tiene ningún contratiempo.'
      : (correctas.length === 1 ? 'Hay un contratiempo: ' : 'Hay ' + correctas.length + ' contratiempos: ') + resumen.join(', ') + '.';

    return { tipo: 'dificil', notas: notas, ligaduras: [], correctas: correctas, explicacion: explicacion, compasTxt: compas.txt };
  }

  var CSS = [
    '.tm-ct-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-ct-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-ct-wrap .tm-ct-q{text-align:center;font-size:1.15rem;font-weight:700;margin:10px 0;color:#1a1a2e;}',
    '.tm-ct-wrap .tm-ct-staff{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;padding:10px 4px;display:flex;justify-content:center;overflow-x:auto;}',
    '.tm-ct-wrap .tm-ct-staff svg{display:block;}',
    '.tm-ct-wrap .tm-ct-lane{fill:transparent;stroke:none;cursor:pointer;}',
    '.tm-ct-wrap .tm-ct-lane:focus-visible{fill:rgba(139,105,20,.18);outline:2px solid #8b6914;outline-offset:-2px;}',
    '.tm-ct-wrap .tm-ct-lane:hover{fill:rgba(139,105,20,.12);}',
    '.tm-ct-wrap .tm-ct-lane.tm-sel{fill:rgba(139,105,20,.25);}',
    '.tm-ct-wrap .tm-ct-lane.tm-ok{fill:rgba(39,174,96,.32);}',
    '.tm-ct-wrap .tm-ct-lane.tm-ko{fill:rgba(192,57,43,.32);}',
    '.tm-ct-wrap .tm-ct-none{width:100%;margin-top:4px;padding:12px;font-size:.92rem;font-weight:700;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;transition:0.2s;font-family:inherit;}',
    '.tm-ct-wrap .tm-ct-none.tm-sel{background:#8b6914!important;border-color:#8b6914!important;color:#fff!important;}',
    '.tm-ct-wrap .tm-ct-none.tm-ok{background:#27ae60!important;border-color:#27ae60!important;color:#fff!important;}',
    '.tm-ct-wrap .tm-ct-none.tm-ko{background:#c0392b!important;border-color:#c0392b!important;color:#fff!important;}',
    '.tm-ct-wrap .tm-submit{width:100%;margin-top:15px;padding:15px;background:#d8d0b8;color:#fff;border:none;border-radius:6px;font-weight:800;cursor:not-allowed;font-family:inherit;}',
    '.tm-ct-wrap .tm-submit.tm-ready{background:#8b6914;cursor:pointer;}',
    '.tm-ct-wrap .tm-fb{display:none;margin-top:15px;padding:15px;border-radius:6px;font-weight:600;}',
    '.tm-ct-wrap .tm-fb.tm-show{display:block;}',
    '.tm-ct-wrap .tm-fb.tm-ok{background:#e8f5e9;color:#2e7d32;}',
    '.tm-ct-wrap .tm-fb.tm-ko{background:#ffebee;color:#c62828;}',
    '.tm-ct-wrap .tm-nxt{display:none;width:100%;margin-top:10px;padding:15px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:inherit;}',
    '.tm-ct-wrap .tm-nxt.tm-show{display:block;}',
    '.tm-ct-wrap .tm-ct-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}',
    '.tm-ct-wrap .tm-ct-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-ct-wrap .tm-ct-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-ct-wrap .tm-ct-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-ct-wrap .tm-ct-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-ct-wrap .tm-ct-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    '.tm-ct-wrap .tm-ct-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-ct-wrap .tm-ct-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-ct-wrap .tm-ct-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '.tm-ct-wrap .tm-ct-mode-screen{text-align:center;padding:.5rem 0 1rem;}',
    '.tm-ct-wrap .tm-ct-mode-title{font-size:1.35rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e;}',
    '.tm-ct-wrap .tm-ct-mode-subtitle{color:#666;margin:0 0 1.5rem;font-size:.92rem;}',
    '.tm-ct-wrap .tm-ct-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}',
    '.tm-ct-wrap .tm-ct-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.6rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;max-width:280px;font-family:inherit;}',
    '.tm-ct-wrap .tm-ct-mode-btn:hover{border-color:#8b6914;background:#fdf8ee;}',
    '.tm-ct-wrap .tm-ct-mode-lbl{font-size:.95rem;font-weight:700;color:#1a1a2e;}',
    '.tm-ct-wrap .tm-ct-mode-desc{font-size:.78rem;color:#888;text-align:center;line-height:1.35;}',
    '@media(max-width:500px){.tm-ct-wrap .tm-ct-modes{flex-direction:column;align-items:center;}.tm-ct-wrap .tm-ct-mode-btn{width:100%;max-width:none;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-ct-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-ct-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* Dibuja el fragmento (1 o más compases) y devuelve { svg, lanes } donde
     lanes[i] = {x, w} en coordenadas del SVG para la nota i. Sin
     ligaduras, cada nota (o silencio) es su propio grupo/carril, así que
     el clic siempre apunta a un único suceso rítmico. */
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
      if (n.duration.slice(-1) !== 'r') {
        var linea = note.getKeyProps()[0].line;
        note.setStemDirection(linea >= 3 ? -1 : 1);
      }
      if (n.duration.slice(-1) === 'd') V.Dot.buildAndAttach([note], { all: true });
      return note;
    }
    var vfPorCompas = grupos.map(function (g) { return g.map(crear); });
    var vfTodas = [].concat.apply([], vfPorCompas);

    vfPorCompas.forEach(function (vfNotas, mi) { V.Formatter.FormatAndDraw(ctx, staves[mi], vfNotas); });

    var svg = div.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.maxWidth = w + 'px';

    var groups = frag.notas.map(function (n, i) { return [i]; });

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
      rect.setAttribute('class', 'tm-ct-lane');
      rect.setAttribute('tabindex', '0');
      rect.setAttribute('role', 'button');
      rect.setAttribute('aria-label', 'Nota o silencio ' + (i + 1) + ' de ' + lanes.length);
      rect.dataset.idx = i;
      svg.appendChild(rect);
      return rect;
    });

    return { svg: svg, rects: rects, groups: groups };
  }

  /* Variante para imprimir (ficha PDF): igual dibujo, sin carriles de
     clic. En modo solución, colorea de rojo la nota que está a
     contratiempo; si el fragmento no tiene ninguno, no colorea nada. */
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
      if (n.duration.slice(-1) !== 'r') {
        var linea = note.getKeyProps()[0].line;
        note.setStemDirection(linea >= 3 ? -1 : 1);
      }
      if (n.duration.slice(-1) === 'd') V.Dot.buildAndAttach([note], { all: true });
      if (esCorrecta(idxGlobal)) note.setStyle(ROJO);
      idxGlobal++;
      return note;
    }
    var vfPorCompas = grupos.map(function (g) { return g.map(crear); });

    vfPorCompas.forEach(function (vfNotas, mi) { V.Formatter.FormatAndDraw(ctx, staves[mi], vfNotas); });

    var svg = div.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.maxWidth = w + 'px';
    return svg;
  }

  function tmContratiempoEngine(containerId) {
    injectCSS();

    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-ct-wrap';
    var uid = containerId;

    var totalQ, queue;
    var currentQ, score, cFrag, answered, modoDificil;
    var selGrupos, selNinguna;

    var PREGUNTAS_POR_TEST = 10;
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
          '<div class="tm-ct-mode-screen">',
            '<h2 class="tm-ct-mode-title">Test de contratiempos</h2>',
            '<p class="tm-ct-mode-subtitle">Elige la dificultad — ' + PREGUNTAS_POR_TEST + ' preguntas</p>',
            '<div class="tm-ct-modes">',
              '<button class="tm-ct-mode-btn" data-modo="normal"><span class="tm-ct-mode-lbl">Normal</span><span class="tm-ct-mode-desc">Un fragmento de un compás: ningún contratiempo o como mucho uno</span></button>',
              '<button class="tm-ct-mode-btn" data-modo="dificil"><span class="tm-ct-mode-lbl">Difícil</span><span class="tm-ct-mode-desc">Fragmentos de 2 compases: puede haber varios contratiempos a la vez, o ninguno</span></button>',
            '</div>',
          '</div>',
        '</div>'
      ].join('');
      wrap.querySelectorAll('.tm-ct-mode-btn').forEach(function (btn) {
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
        ? 'Toca todas las notas que estén a contratiempo (puede haber varias, o ninguna)'
        : 'Toca la nota que está a contratiempo (o «No hay contratiempo» si no la hay)';
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-ct-header">',
            '<div class="tm-ct-progress-wrap">',
              '<div class="tm-ct-bar"><div class="tm-ct-fill" id="' + uid + '_fill"></div></div>',
              '<span class="tm-ct-counter" id="' + uid + '_cnt">1 / ' + totalQ + '</span>',
            '</div>',
            '<span class="tm-ct-badge" id="' + uid + '_badge">✓ 0</span>',
          '</div>',
          '<p class="tm-ct-q" id="' + uid + '_q">' + pregunta + '</p>',
          '<div class="tm-ct-staff" id="' + uid + '_staff"></div>',
          '<button class="tm-ct-none" id="' + uid + '_none">No hay contratiempo</button>',
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
      noneBtn.className = 'tm-ct-none';

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

      var gruposCorrectos = cFrag.correctas.map(function (par) {
        return groups.findIndex(function (g) { return g.indexOf(par[0]) !== -1; });
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
          '<div class="tm-ct-score-box">',
            '<div class="tm-ct-score-num">' + score + '/' + totalQ + '</div>',
            '<div class="tm-ct-score-pct">' + pct + '%</div>',
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

  window.tmContratiempoEngine = tmContratiempoEngine;
  window.tmContratiempoGenerar = generarFragmento;
  window.tmContratiempoGenerarDificil = generarFragmentoDificil;
  window.tmContratiempoMulberry32 = mulberry32;
  window.tmContratiempoDibujarImpresion = dibujarFragmentoImpresion;
  window.tmContratiempoCompases = COMPASES;
})();
