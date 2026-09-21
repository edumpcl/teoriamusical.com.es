/* ¿Cómo empieza la melodía? — /ejercicios/comienzo-tetico-anacrusico-acefalo/

   Uso: <div id="x"></div><script>tmComienzo('x');</script>

   Decisión de Eduardo (21-09-2026): test con el comienzo de una melodía
   (dos compases) y tres respuestas posibles: tético, anacrúsico o acéfalo.

   REGLA (Eduardo, 21-09-2026): lo que decide el tipo es CUÁNDO entra la música
   dentro del compás (P = posición de la 1.ª nota, contando el compás entero):
     - P = 0 (tiempo 1) ............................ TÉTICO
     - 0 < P < mitad del compás (tras el tiempo fuerte) .. ACÉFALO
     - P >= mitad del compás (justo en la mitad o después) . ANACRÚSICO
   Que el silencio inicial esté escrito (compás completo) o no (el compás se ve
   incompleto) NO cambia el tipo: un acéfalo puede verse de las dos formas. Por
   eso dos negras en 4/4 (entran en el tiempo 3, la mitad exacta) son anacrusa,
   y tres negras (entran en el tiempo 2) son acéfalo.
   La anacrusa de este ejercicio no pasa de la mitad del compás (se deduce de la
   regla); la teoría general no la limita.

   Niveles: 1 compases simples; silencio de un tiempo entero (acéfalo, siempre
   escrito) o anacrusa de un tiempo; 2 simples y compuestos, con el silencio
   inicial escrito o no y partes de tiempo; 3 además figuras muy pequeñas,
   anacrusas más largas y silencios que NO marcan el comienzo (dentro del
   compás) para despistar.

   Modelo: it = { nivel, tipo, forma ('entero' | 'silencio' | 'incompleto'), compas,
   tonalidad, compases: [{elems}, {elems}] }.
   Cada elem = { f (id de figura), s (silencio), u (semifusas), t0 (posición
   dentro del compás ENTERO; la anacrusa empieza en compás−anacrusa), p (índice
   diatónico de la nota; null en los silencios) }. Se audita con
   tools/verificar-comienzo.js. Necesita completar-compas-engine.js. */
(function () {
  'use strict';

  function D() { return window.tmCompletarCompasData; }
  function VF() { return (window.Vex && window.Vex.Flow) || window.VexFlow; }

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function azar(rnd) {
    return {
      uno: function (a) { return a[Math.floor(rnd() * a.length)]; },
      barajar: function (a) {
        var c = a.slice();
        for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
        return c;
      }
    };
  }

  var TIPOS = ['tetico', 'acefalo', 'anacrusico'];
  var NOMBRE_TIPO = { tetico: 'tético', anacrusico: 'anacrúsico', acefalo: 'acéfalo' };
  var SIMPLES = ['2/4', '3/4', '4/4'];
  var TODOS = ['2/4', '3/4', '4/4', '6/8', '9/8', '12/8'];
  /* tonica = letra de la tónica (c=0 … b=6). Solo mayores: la armadura basta. */
  var TONALIDADES = [
    { id: 'C', tonica: 0 }, { id: 'G', tonica: 4 }, { id: 'D', tonica: 1 }, { id: 'F', tonica: 3 },
    { id: 'Bb', tonica: 6 }, { id: 'A', tonica: 5 }, { id: 'Eb', tonica: 2 }
  ];
  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var P_MIN = 29, P_MAX = 39; // re4 … sol5 (índice diatónico: do4 = 28)

  var FIG_U = { 4: 'sc', 8: 'c', 12: 'cP', 16: 'n', 24: 'nP', 32: 'b', 48: 'bP' };

  /* Cómo se reparte una duración en figuras, con el nivel mínimo en que sale. */
  var DESCOMP = {
    4: [[[4], 1]],
    8: [[[8], 1], [[4, 4], 2]],
    12: [[[12], 3], [[8, 4], 3], [[4, 8], 3], [[4, 4, 4], 3]],
    16: [[[16], 1], [[8, 8], 1], [[8, 4, 4], 2], [[4, 4, 8], 2], [[4, 4, 4, 4], 3], [[12, 4], 3]],
    24: [[[24], 1], [[8, 8, 8], 1], [[16, 8], 2], [[8, 16], 2], [[8, 8, 4, 4], 3], [[12, 4, 8], 3], [[4, 4, 8, 8], 3]]
  };
  /* Las divisiones de nivel bajo pesan más, para que el nivel difícil no sea
     una melodía llena de semicorcheas sino una melodía normal con alguna. */
  function descomponer(len, nivel, A) {
    var opciones = [];
    DESCOMP[len].forEach(function (x) {
      if (x[1] > nivel) return;
      for (var k = 0; k < nivel - x[1] + 1; k++) opciones.push(x[0]);
    });
    return A.uno(opciones).slice();
  }

  /* Anacrusa (lo escrito antes de la barra) y silencio inicial del acéfalo, en
     semifusas y por compás y nivel. Anacrusa <= mitad del compás; silencio
     inicial < mitad del compás (si no, la música entraría en la mitad o
     después y sería anacrusa). */
  var ANACRUSA = {
    '2/4': { 1: [16], 2: [16, 8], 3: [16, 8, 4, 12] },
    '3/4': { 1: [16], 2: [16, 8, 24], 3: [16, 8, 4, 24, 12] },
    '4/4': { 1: [16], 2: [16, 8, 24], 3: [16, 8, 4, 24, 12, 32] },
    '6/8': { 1: [24], 2: [24, 16, 8], 3: [24, 16, 8] },
    '9/8': { 1: [24], 2: [24, 16, 8], 3: [24, 16, 8] },
    '12/8': { 1: [24], 2: [24, 16, 8], 3: [24, 16, 8, 48] }
  };
  var SILENCIO_ACEFALO = {
    '2/4': { 2: [8], 3: [8, 4] },
    '3/4': { 1: [16], 2: [16, 8], 3: [16, 8, 4] },
    '4/4': { 1: [16], 2: [16, 8], 3: [16, 8, 4] },
    '6/8': { 2: [16, 8], 3: [16, 8] },
    '9/8': { 2: [24, 16, 8], 3: [24, 16, 8] },
    '12/8': { 2: [24, 16, 8], 3: [24, 16, 8] }
  };

  /* Melodía: paseo por la escala (índice diatónico), sobre todo por grados
     conjuntos, y algún salto de tercera o cuarta. */
  var PASOS = [0, 0, 1, 1, 1, 1, -1, -1, -1, -1, 2, 2, -2, -2, 3, -3];
  function caminar(inicio, n, A) {
    var p = [inicio];
    for (var i = 1; i < n; i++) {
      var paso = A.uno(PASOS), sig = p[i - 1] + paso;
      if (sig < P_MIN || sig > P_MAX) sig = p[i - 1] - paso;
      if (sig < P_MIN || sig > P_MAX) sig = p[i - 1];
      p.push(sig);
    }
    return p;
  }
  function candidatosInicio(tonalidad) {
    var out = [];
    for (var p = P_MIN + 1; p <= P_MAX - 3; p++) {
      var g = (((p - tonalidad.tonica) % 7) + 7) % 7;
      if (g === 0 || g === 2 || g === 4) out.push(p);
    }
    return out;
  }

  /* Rellena de figuras el trozo [desde, hasta) del compás, cortando en las
     barras de los tiempos (el primer y el último tiempo pueden ser parciales) y
     fundiendo en blanca / blanca con puntillo dos tiempos enteros seguidos y
     alineados que sean de una sola figura. Devuelve elementos con t0 absoluto
     dentro del compás entero. */
  function segmento(compas, desde, hasta, nivel, A) {
    var t = D().COMPASES[compas].tiempo, celdas = [], pos = desde;
    while (pos < hasta) {
      var fin = Math.min((Math.floor(pos / t) + 1) * t, hasta);
      celdas.push({ ini: pos, fin: fin, durs: descomponer(fin - pos, nivel, A) });
      pos = fin;
    }
    for (var k = 0; k + 1 < celdas.length; k++) {
      var a = celdas[k], b = celdas[k + 1];
      var enteros = a.ini % t === 0 && a.fin - a.ini === t && b.ini % t === 0 && b.fin - b.ini === t;
      if (enteros && a.durs.length === 1 && b.durs.length === 1 && a.ini % (2 * t) === 0 && A.uno([0, 1, 1]) === 1) {
        a.durs = [2 * t]; b.durs = []; k++;
      }
    }
    var elems = [];
    celdas.forEach(function (c) {
      var x = c.ini;
      c.durs.forEach(function (u) { elems.push({ f: FIG_U[u], s: false, u: u, t0: x, p: null }); x += u; });
    });
    return elems;
  }

  /* Nivel 3: un silencio DENTRO del compás (nunca el primer elemento) que no
     decide nada, para despistar. */
  function silencioDeMentira(elems, t, A) {
    var cand = [];
    for (var i = 1; i < elems.length; i++) if (elems[i].u <= t && !elems[i].s) cand.push(i);
    if (!cand.length) return;
    elems[A.uno(cand)].s = true;
  }

  function repartirTonos(it, A) {
    var notas = [];
    it.compases.forEach(function (c) { c.elems.forEach(function (e) { if (!e.s) notas.push(e); }); });
    var cands = candidatosInicio(TONALIDADES.filter(function (x) { return x.id === it.tonalidad; })[0]);
    var pitches;
    if (it.tipo === 'anacrusico') {
      var nA = it.compases[0].elems.length, nB = notas.length - nA;
      var meta = A.uno(cands);
      var adelante = caminar(meta, nB, A);
      var atras = caminar(meta, nA + 1, A).slice(1).reverse();
      pitches = atras.concat(adelante);
    } else {
      pitches = caminar(A.uno(cands), notas.length, A);
    }
    notas.forEach(function (e, i) { e.p = pitches[i]; });
  }

  function generarUno(o, rnd) {
    var A = azar(rnd);
    var nivel = o.nivel || 1;
    var tipo = o.tipo || A.uno(TIPOS);
    var pool = nivel === 1 ? SIMPLES : TODOS;
    if (tipo === 'acefalo') pool = pool.filter(function (c) { return SILENCIO_ACEFALO[c][nivel]; });
    var compas = o.compas || A.uno(pool);
    var d = D().COMPASES[compas], t = d.tiempo, total = t * d.tiempos;
    var tonalidad = A.uno(nivel === 1 ? TONALIDADES.slice(0, 4) : TONALIDADES).id;
    var forma, bar1;
    if (tipo === 'tetico') {
      forma = 'entero';
      bar1 = segmento(compas, 0, total, nivel, A);
    } else if (tipo === 'acefalo') {
      var R = A.uno(SILENCIO_ACEFALO[compas][nivel]);
      forma = nivel === 1 ? 'silencio' : A.uno(['silencio', 'incompleto']);
      bar1 = segmento(compas, R, total, nivel, A);
      if (forma === 'silencio') bar1.unshift({ f: FIG_U[R], s: true, u: R, t0: 0, p: null });
    } else {
      forma = 'incompleto';
      bar1 = segmento(compas, total - A.uno(ANACRUSA[compas][nivel]), total, nivel, A);
    }
    var bar2 = segmento(compas, 0, total, nivel, A);
    if (nivel === 3 && tipo === 'tetico' && A.uno([0, 1]) === 1) silencioDeMentira(bar1, t, A);
    if (nivel === 3 && A.uno([0, 1]) === 1) silencioDeMentira(bar2, t, A);
    var it = { nivel: nivel, tipo: tipo, forma: forma, compas: compas, tonalidad: tonalidad, compases: [{ elems: bar1 }, { elems: bar2 }] };
    repartirTonos(it, A);
    return it;
  }

  function generarLote(o, semilla) {
    var rnd = mulberry32(semilla === undefined ? Math.floor(Math.random() * 4294967296) : semilla);
    var A = azar(rnd), n = o.n || 8, tipos;
    for (var intento = 0; intento < 30; intento++) {
      var base = [];
      while (base.length < n) base = base.concat(TIPOS);
      tipos = A.barajar(base.slice(0, n));
      var seguidos = false;
      for (var i = 2; i < n; i++) if (tipos[i] === tipos[i - 1] && tipos[i] === tipos[i - 2]) seguidos = true;
      if (!seguidos) break;
    }
    return tipos.map(function (tipo) { return generarUno({ nivel: o.nivel, tipo: tipo }, rnd); });
  }

  /* --------------------------------------------------------- Explicación */

  var NUM = ['', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho'];
  function plural(nombre) { return nombre.replace(/^(\S+)/, '$1s'); }
  function frase(elems) {
    var FIG = D().FIG, grupos = [];
    elems.forEach(function (e) {
      var g = grupos[grupos.length - 1];
      if (g && g.f === e.f) g.n++; else grupos.push({ f: e.f, n: 1 });
    });
    var trozos = grupos.map(function (g) {
      return NUM[g.n] + ' ' + (g.n === 1 ? FIG[g.f].nombre : plural(FIG[g.f].nombre));
    });
    return trozos.length === 1 ? trozos[0] : trozos.slice(0, -1).join(', ') + ' y ' + trozos[trozos.length - 1];
  }

  function explicar(it) {
    var d = D().COMPASES[it.compas], FIG = D().FIG, total = d.tiempo * d.tiempos;
    var b1 = it.compases[0].elems;
    var suma = b1.reduce(function (a, e) { return a + e.u; }, 0);
    if (it.tipo === 'tetico') {
      return 'Comienzo tético: la música entra en el tiempo 1, el tiempo fuerte, y el primer compás está completo.';
    }
    if (it.tipo === 'anacrusico') {
      return 'Comienzo anacrúsico: el primer compás está incompleto (solo lleva ' + frase(b1) + ') y eso dura '
        + (suma * 2 === total ? 'justo la mitad del compás' : 'menos de la mitad del compás')
        + ': la música entra en la mitad del compás o después, justo antes del tiempo fuerte. Esas notas son la anacrusa.';
    }
    if (it.forma === 'silencio') {
      return 'Comienzo acéfalo: el primer compás está completo, pero el tiempo fuerte lo ocupa un silencio de '
        + FIG[b1[0].f].nombre + ' y la música entra después, antes de la mitad del compás.';
    }
    return 'Comienzo acéfalo: el primer compás está incompleto (solo lleva ' + frase(b1)
      + '), pero eso es más de la mitad del compás: la música entra después del tiempo fuerte y antes de la mitad, como si faltara la cabeza aunque el silencio inicial no esté escrito.';
  }

  function pista(correcto, elegido) {
    if (correcto === elegido) return '';
    if (correcto === 'acefalo') return ' No lo confundas con el anacrúsico: en la anacrusa la música entra en la mitad del compás o después (lo escrito dura la mitad o menos); en el acéfalo entra antes de la mitad, con el silencio inicial escrito o sin escribir.';
    if (correcto === 'anacrusico') return ' No lo confundas con el acéfalo: aquí lo escrito dura la mitad del compás o menos; en el acéfalo la música entra antes de la mitad, aunque el compás se vea incompleto.';
    return ' Truco: mira cuándo entra la música. En el tiempo 1, tético; después del tiempo 1 pero antes de la mitad del compás, acéfalo; en la mitad o después, anacrúsico.';
  }

  /* --------------------------------------------------------------- Dibujo */

  function anchoElem(e) {
    var w = e.u >= 32 ? 44 : e.u >= 16 ? 36 : e.u >= 8 ? 28 : 24;
    return w + (e.u === 12 || e.u === 24 || e.u === 48 ? 8 : 0);
  }

  /* Dibuja los dos compases. Escribe div.__tmInfo para el verificador. */
  function dibujar(div, it, opts) {
    var V = VF(), FIG = D().FIG;
    opts = opts || {};
    div.innerHTML = '';
    var H = 104;
    var molde = new V.Stave(0, 0, 400);
    molde.addClef('treble').addKeySignature(it.tonalidad).addTimeSignature(it.compas);
    var modW = molde.getNoteStartX();
    var compacto = opts.compacto || 1;
    var anchos = it.compases.map(function (c) {
      var s = 0; c.elems.forEach(function (e) { s += anchoElem(e) * compacto; }); return s + 30;
    });
    var w1 = modW + anchos[0], w2 = anchos[1], W = 12 + w1 + w2;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(W, H);
    var ctx = r.getContext();
    var op = { space_above_staff_ln: 3, spaceAboveStaffLn: 3 };
    var st1 = new V.Stave(6, 6, w1, op);
    st1.addClef('treble').addKeySignature(it.tonalidad).addTimeSignature(it.compas);
    var st2 = new V.Stave(6 + w1, 6, w2, op);
    st1.setContext(ctx).draw();
    st2.setContext(ctx).draw();

    var info = { barras: [], vigas: 0 };
    [[it.compases[0], st1], [it.compases[1], st2]].forEach(function (par) {
      var bar = par[0], stave = par[1], notas = [], datos = [], grupo = [], vigas = [];
      var d = D().COMPASES[it.compas];
      function cerrar() { if (grupo.length > 1) vigas.push(new V.Beam(grupo.map(function (x) { return x.n; }), true)); grupo = []; }
      bar.elems.forEach(function (e) {
        var clave = e.s ? 'b/4' : LETRAS[((e.p % 7) + 7) % 7] + '/' + Math.floor(e.p / 7);
        var n = new V.StaveNote({
          keys: [clave], duration: FIG[e.f].vf + (e.s ? 'r' : ''), clef: 'treble',
          auto_stem: true, autoStem: true
        });
        if (/d$/.test(FIG[e.f].vf)) V.Dot.buildAndAttach([n], { all: true });
        notas.push(n);
        datos.push({ f: e.f, s: !!e.s, key: e.s ? null : clave, ticks: n.getTicks().value(), puntillos: n.getModifiersByType ? n.getModifiersByType('Dot').length : 0 });
        var corta = e.u < 16 && !e.s;
        var tiempoIdx = Math.floor(e.t0 / d.tiempo);
        if (!corta || (grupo.length && Math.floor(grupo[0].t0 / d.tiempo) !== tiempoIdx)) cerrar();
        if (corta) grupo.push({ n: n, t0: e.t0 });
      });
      cerrar();
      var total = bar.elems.reduce(function (a, e) { return a + e.u; }, 0);
      var voz = new V.Voice({ num_beats: total, beat_value: 64, numBeats: total, beatValue: 64 });
      voz.setMode(V.Voice.Mode.SOFT);
      voz.addTickables(notas);
      new V.Formatter().joinVoices([voz]).format([voz], stave.getNoteEndX() - stave.getNoteStartX() - 22);
      voz.draw(ctx, stave);
      vigas.forEach(function (b) { b.setContext(ctx).draw(); });
      info.barras.push(datos);
      info.vigas += vigas.length;
    });

    var svg = div.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.maxWidth = Math.round(W * 1.25) + 'px';
    div.__tmInfo = info;
  }

  /* ------------------------------------------------------------------ UI */

  var NIVELES = [
    { nivel: 1, t: 'Fácil', d: 'Compases simples; silencio o anacrusa de un tiempo entero' },
    { nivel: 2, t: 'Medio', d: 'Simples y compuestos; el silencio inicial puede no estar escrito' },
    { nivel: 3, t: 'Difícil', d: 'Figuras muy pequeñas y silencios dentro del compás que despistan' }
  ];
  var PREGUNTAS = 8;

  var CSS = [
    '.tm-cm{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-cm-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-cm-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-cm-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-cm-recuerda{background:#faf7f2;border:1px solid #e8e0cc;border-radius:8px;padding:10px 14px;margin:0 0 16px;font-size:.85rem;line-height:1.55;color:#514232;}',
    '.tm-cm-recuerda b{color:#1a1208;}',
    '.tm-cm-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-cm-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;font-family:inherit;}',
    '.tm-cm-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-cm-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-cm-modo span{font-size:.82rem;color:#8b6914;}',
    '.tm-cm-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-cm-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-cm-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-cm-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:4px 0 8px;}',
    '.tm-cm-dibujo{display:flex;justify-content:center;margin:0 auto 12px;}',
    '.tm-cm-dibujo > div{width:100%;display:flex;justify-content:center;}',
    '.tm-cm-ops{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}',
    '.tm-cm-op{flex:1 1 130px;max-width:190px;border:2px solid #d8d0b8;background:#fff;border-radius:10px;padding:12px 8px;min-height:48px;cursor:pointer;font-family:inherit;font-weight:700;font-size:1rem;color:#1a1208;}',
    '.tm-cm-op:hover:not([disabled]){border-color:#8b6914;background:#fff8ee;}',
    '.tm-cm-op.tm-ok{border-color:#27ae60!important;background:#27ae60!important;color:#fff!important;}',
    '.tm-cm-op.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-cm-op.tm-buena{border-color:#27ae60!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-cm-op[disabled]{cursor:default;opacity:.9;}',
    '.tm-cm-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-cm-fb[hidden]{display:none;}',
    '.tm-cm-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-cm-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-cm-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-cm-btn[hidden]{display:none;}',
    '.tm-cm-res{text-align:center;padding:10px 0;}',
    '.tm-cm-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-cm-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-cm-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-cm-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-cm-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}'
  ].join('');

  function css() {
    if (document.getElementById('tm-cm-css')) return;
    var st = document.createElement('style');
    st.id = 'tm-cm-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  window.tmComienzo = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !D()) return;
    css();
    cont.className = 'tm-cm';
    var cola = [], pos = 0, aciertos = 0, nivelActual = 1;
    window.tmComienzoDebug = function () { return cola[pos] || null; };

    function inicio() {
      cont.innerHTML = '<div class="tm-cm-card"><div class="tm-cm-tit">¿Cómo empieza la melodía?</div>'
        + '<div class="tm-cm-sub">Verás los dos primeros compases de una melodía. Decide si el comienzo es tético, anacrúsico o acéfalo.</div>'
        + '<div class="tm-cm-recuerda">Lo que decide es <b>cuándo entra la música</b> dentro del compás. <b>Tético:</b> en el tiempo 1. '
        + '<b>Acéfalo:</b> después del tiempo fuerte pero antes de la mitad del compás (el silencio inicial puede estar escrito o no). '
        + '<b>Anacrúsico:</b> en la mitad del compás o después, justo antes del tiempo fuerte.</div>'
        + '<div class="tm-cm-modos">' + NIVELES.map(function (m) {
          return '<button type="button" class="tm-cm-modo" data-n="' + m.nivel + '"><strong>' + m.t + '</strong><span>' + m.d + '</span></button>';
        }).join('') + '</div></div>';
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-cm-modo'), function (b) {
        b.addEventListener('click', function () { empezar(Number(b.getAttribute('data-n'))); });
      });
    }

    function empezar(nivel) {
      nivelActual = nivel;
      cola = generarLote({ nivel: nivel, n: PREGUNTAS });
      pos = 0; aciertos = 0;
      pregunta();
    }

    function pregunta() {
      var it = cola[pos];
      cont.innerHTML = '<div class="tm-cm-card">'
        + '<div class="tm-cm-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-cm-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-cm-preg">¿Qué tipo de comienzo tiene?</div>'
        + '<div class="tm-cm-dibujo"><div></div></div>'
        + '<div class="tm-cm-ops">' + TIPOS.map(function (t) {
          return '<button type="button" class="tm-cm-op" data-t="' + t + '">' + NOMBRE_TIPO[t].charAt(0).toUpperCase() + NOMBRE_TIPO[t].slice(1) + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-cm-fb" hidden></div>'
        + '<button type="button" class="tm-cm-btn" hidden></button></div>';
      dibujar(cont.querySelector('.tm-cm-dibujo > div'), it);

      var btn = cont.querySelector('.tm-cm-btn'), fb = cont.querySelector('.tm-cm-fb');
      var botones = Array.prototype.slice.call(cont.querySelectorAll('.tm-cm-op'));
      botones.forEach(function (b) {
        b.addEventListener('click', function () {
          var elegido = b.getAttribute('data-t'), ok = elegido === it.tipo;
          if (ok) aciertos++;
          botones.forEach(function (x) {
            x.disabled = true;
            var t = x.getAttribute('data-t');
            if (t === it.tipo) x.classList.add(t === elegido ? 'tm-ok' : 'tm-buena');
            else if (t === elegido) x.classList.add('tm-ko');
          });
          fb.hidden = false;
          fb.className = 'tm-cm-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No es correcto, es ' + NOMBRE_TIPO[it.tipo] + '.') + '</strong> ' + explicar(it) + pista(it.tipo, elegido);
          btn.hidden = false;
          btn.textContent = pos + 1 < cola.length ? 'Siguiente' : 'Ver resultado';
        });
      });
      btn.addEventListener('click', function () {
        pos++;
        if (pos < cola.length) pregunta(); else resultado();
      });
    }

    function resultado() {
      var nota = aciertos / cola.length;
      var msg = nota === 1 ? '¡Perfecto! Distingues los tres comienzos sin dudar.' : nota >= 0.8 ? 'Muy bien: casi todo correcto.' : nota >= 0.5 ? 'Vas bien. Repasa las explicaciones y vuelve a intentarlo.' : 'Conviene repasar cómo se distingue cada comienzo antes de volver a intentarlo.';
      cont.innerHTML = '<div class="tm-cm-card tm-cm-res"><div class="tm-cm-nota">' + aciertos + '</div><div class="tm-cm-de">aciertos de ' + cola.length + '</div>'
        + '<div class="tm-cm-msg">' + msg + '</div>'
        + '<button type="button" class="tm-cm-otra" data-a="otra">Otra ronda</button>'
        + '<button type="button" class="tm-cm-otra tm-2" data-a="modo">Cambiar de nivel</button></div>';
      cont.querySelector('[data-a="otra"]').addEventListener('click', function () { empezar(nivelActual); });
      cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
    }

    inicio();
  };

  window.tmComienzoTest = { generarLote: generarLote, explicar: explicar, dibujar: dibujar, TIPOS: TIPOS, NOMBRE_TIPO: NOMBRE_TIPO };
})();
