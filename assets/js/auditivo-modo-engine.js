/* Motor — Ejercicio auditivo «¿Mayor o menor?»
   Suena una melodía de 8 compases al piano (antes, el La4 de referencia) y hay que decir si está en
   modo mayor o menor. Hasta 3 escuchas por melodía. Tras responder se ve la melodía escrita.

   Las melodías se generan para que el modo NO deje dudas:
   - dos frases de 4 compases: la 1.ª acaba en la dominante (semicadencia) y la 2.ª en la tónica;
   - armonía I-IV-V; en los tiempos fuertes, notas del acorde (la 3.ª de la tónica sale varias veces);
     en los débiles, notas de paso o de bordadura;
   - empieza con el arpegio de la tónica y termina con sensible-tónica; en menor, la menor armónica
     (7.º grado subido), que la separa de su relativo mayor;
   - sin saltos de tritono, de 6.ª ni de 2.ª aumentada;
   - y, como prueba final, el perfil de alturas (Krumhansl-Kessler) tiene que señalar claramente la
     tonalidad buscada, con margen sobre todas las demás y sobre su relativo; si no, se genera otra.
   Depende de tm-piano-audio.js (sonido) y tm-mei.js + tm-notacion.js (la partitura). */
(function () {
  'use strict';

  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var NOMBRE_LETRA = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
  var NAT = [0, 2, 4, 5, 7, 9, 11];
  var ESCALA = { mayor: [0, 2, 4, 5, 7, 9, 11], menor: [0, 2, 3, 5, 7, 8, 11] };   // menor armónica
  /* Tonalidades: tónica (letra, alteración, MIDI) y armadura. Tónicas entre La3 y Sol4, para que la
     melodía quede en el registro central de la clave de sol. */
  var TONOS = {
    mayor: [
      { l: 'c', a: 0, m: 60, arm: 0 }, { l: 'd', a: 0, m: 62, arm: 2 }, { l: 'e', a: -1, m: 63, arm: -3 }, { l: 'e', a: 0, m: 64, arm: 4 },
      { l: 'f', a: 0, m: 65, arm: -1 }, { l: 'g', a: 0, m: 67, arm: 1 }, { l: 'a', a: 0, m: 57, arm: 3 }, { l: 'b', a: -1, m: 58, arm: -2 }
    ],
    menor: [
      { l: 'a', a: 0, m: 57, arm: 0 }, { l: 'e', a: 0, m: 64, arm: 1 }, { l: 'd', a: 0, m: 62, arm: -1 }, { l: 'g', a: 0, m: 67, arm: -2 },
      { l: 'b', a: 0, m: 59, arm: 2 }, { l: 'c', a: 0, m: 60, arm: -3 }, { l: 'f', a: 1, m: 66, arm: 3 }, { l: 'f', a: 0, m: 65, arm: -4 }
    ]
  };
  /* Compases: unidad = corchea. pulso = corcheas por pulso (2 en los simples, 3 en los compuestos). */
  var COMPASES = [
    { num: 2, den: 4, pulso: 2, bpm: 92,
      ritmos: [[2, 2], [1, 1, 2], [2, 1, 1], [1, 1, 1, 1], [3, 1]], semi: [[2, 2]], fin: [[4]] },
    { num: 3, den: 4, pulso: 2, bpm: 96,
      ritmos: [[2, 2, 2], [4, 2], [2, 1, 1, 2], [1, 1, 2, 2], [2, 2, 1, 1], [3, 1, 2]], semi: [[2, 4]], fin: [[6]] },
    { num: 4, den: 4, pulso: 2, bpm: 92,
      ritmos: [[2, 2, 2, 2], [4, 2, 2], [1, 1, 2, 2, 2], [2, 1, 1, 2, 2], [3, 1, 2, 2], [2, 2, 1, 1, 2]], semi: [[2, 2, 4]], fin: [[8]] },
    { num: 6, den: 8, pulso: 3, bpm: 72,
      ritmos: [[3, 3], [2, 1, 3], [1, 1, 1, 3], [3, 2, 1], [2, 1, 2, 1], [1, 1, 1, 1, 1, 1]], semi: [[6]], fin: [[6]] },
    { num: 9, den: 8, pulso: 3, bpm: 72,
      ritmos: [[3, 3, 3], [2, 1, 3, 3], [3, 1, 1, 1, 3], [3, 2, 1, 3], [1, 1, 1, 3, 3]], semi: [[3, 6]], fin: [[6, -3]] },
    { num: 12, den: 8, pulso: 3, bpm: 72,
      ritmos: [[3, 3, 3, 3], [2, 1, 3, 2, 1, 3], [1, 1, 1, 3, 3, 3], [3, 3, 2, 1, 3], [2, 1, 2, 1, 3, 3]], semi: [[3, 3, 6]], fin: [[12]] }
  ];
  /* Acordes por grados (0 = tónica) y progresiones de 8 compases (semicadencia en el 4, cadencia perfecta al final). */
  var ACORDE = { I: [0, 2, 4], IV: [3, 5, 0], V: [4, 6, 1] };
  var PROGRESIONES = [
    ['I', 'I', 'IV', 'V', 'I', 'IV', 'V', 'I'],
    ['I', 'V', 'I', 'V', 'I', 'IV', 'V', 'I'],
    ['I', 'IV', 'I', 'V', 'IV', 'I', 'V', 'I'],
    ['I', 'IV', 'V', 'V', 'I', 'IV', 'V', 'I']
  ];
  /* Perfiles de Krumhansl-Kessler */
  var KK_MAY = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
  var KK_MEN = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

  var rnd = function (n) { return Math.floor(Math.random() * n); };
  var elige = function (a) { return a[rnd(a.length)]; };
  var deg = function (x) { return ((x % 7) + 7) % 7; };
  function semis(modo, x) { return Math.floor(x / 7) * 12 + ESCALA[modo][deg(x)]; }

  /* Intervalos melódicos permitidos (pasos de grado -> semitonos): hasta la 5.ª justa; sin tritono, sin 2.ª aumentada,
     sin 6.ª, 7.ª ni octava (un salto de octava antes de la sensible final suena torpe) */
  var OK_INT = { 0: [0], 1: [1, 2], 2: [3, 4], 3: [5], 4: [7] };
  function intervaloOk(modo, a, b) {
    var d = Math.abs(b - a), s = Math.abs(semis(modo, b) - semis(modo, a));
    return !!OK_INT[d] && OK_INT[d].indexOf(s) >= 0;
  }

  function correlacion(x, y) {
    var mx = 0, my = 0, i; for (i = 0; i < 12; i++) { mx += x[i]; my += y[i]; } mx /= 12; my /= 12;
    var n = 0, dx = 0, dy = 0; for (i = 0; i < 12; i++) { n += (x[i] - mx) * (y[i] - my); dx += (x[i] - mx) * (x[i] - mx); dy += (y[i] - my) * (y[i] - my); }
    return n / Math.sqrt(dx * dy);
  }
  /* Krumhansl-Schmuckler: correlación del perfil de duraciones con las 24 tonalidades */
  function tonalidadPercibida(notas) {
    var perfil = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    notas.forEach(function (n) { if (n.midi != null) perfil[n.midi % 12] += n.dur; });
    var res = [];
    for (var t = 0; t < 12; t++) {
      var pm = [], pn = [];
      for (var i = 0; i < 12; i++) { pm.push(KK_MAY[(i - t + 12) % 12]); pn.push(KK_MEN[(i - t + 12) % 12]); }
      res.push({ pc: t, modo: 'mayor', r: correlacion(perfil, pm) });
      res.push({ pc: t, modo: 'menor', r: correlacion(perfil, pn) });
    }
    return res.sort(function (a, b) { return b.r - a.r; });
  }

  var MOTIVOS = {};
  function fallo(m) { MOTIVOS[m] = (MOTIVOS[m] || 0) + 1; return null; }
  /* ---------- generar una melodía ---------- */
  function intentar(modo, tono, compas) {
    var prog = elige(PROGRESIONES);
    var rit1 = elige(compas.ritmos.filter(function (r) { return r.length >= 3; }));
    var rit2 = elige(compas.ritmos), rit3 = elige(compas.ritmos);
    // frase 2 = frase 1 con la cadencia final: 1 y 5, 2 y 6, 3 y 7 comparten ritmo
    var ritmos = [rit1, rit2, rit3, elige(compas.semi), rit1, rit2, elige(compas.ritmos.filter(function (r) { return r.length >= 2; })), elige(compas.fin)];
    // registro: grados (relativos a la tónica) cuyo MIDI cae entre La3 y Sol5
    var lo = -7, hi = 11;
    while (tono.m + semis(modo, lo) < 57) lo++;
    while (tono.m + semis(modo, hi) > 79) hi--;
    var notas = [];   // {x (grado absoluto), dur, c (compás), fuerte, ac (acorde)}
    ritmos.forEach(function (r, c) {
      var t = 0;
      r.forEach(function (d) {
        if (d < 0) { notas.push({ silencio: true, dur: -d, c: c }); t -= d; return; }
        notas.push({ x: null, dur: d, c: c, fuerte: t % compas.pulso === 0, ac: ACORDE[prog[c]], ini: t });
        t += d;
      });
    });
    var sonoras = notas.filter(function (n) { return !n.silencio; });
    var enCompas = function (c) { return sonoras.filter(function (n) { return n.c === c; }); };
    // compás 1: motivo sobre el arpegio de la tónica (con la 3.ª)
    var arp = elige([[0, 2, 4, 7, 4, 2], [0, 2, 4, 2, 0, 2], [0, 4, 2, 0, 2, 4], [0, 2, 0, 4, 2, 0], [0, -3, 0, 2, 4, 2]].filter(function (a) {
      return a.every(function (x) { return x >= lo && x <= hi; });
    }));
    if (!arp) return fallo('registro');
    enCompas(0).forEach(function (n, i) { n.x = arp[i % arp.length]; });
    // final: tónica; antes, la sensible (subiendo a la tónica)
    var c8 = enCompas(7), c7 = enCompas(6), c4 = enCompas(3);
    var fin = -1 >= lo ? 0 : 7;          // si la sensible de abajo no cabe, se acaba en la tónica de arriba
    c8[0].x = fin;
    c7[c7.length - 1].x = fin - 1;
    var semi = [4, 1, -1, 6, 8].filter(function (x) { return x >= lo && x <= hi; });
    c4[c4.length - 1].x = elige(semi);   // semicadencia: 5.º, 2.º o 7.º grado, nota larga
    // tiempos fuertes: nota del acorde cercana a la anterior
    var prev = sonoras[0].x;
    sonoras.forEach(function (n) {
      if (n.x !== null) { prev = n.x; return; }
      if (!n.fuerte) return;
      var cand = [];
      for (var x = lo; x <= hi; x++) if (n.ac.indexOf(deg(x)) >= 0 && Math.abs(x - prev) <= 4 && intervaloOk(modo, prev, x)) cand.push(x);
      if (!cand.length) return;
      // mejor por grado conjunto o de tercera que repetir nota
      var coste = function (x) { var d = Math.abs(x - prev); return (d === 0 ? 2.2 : d) + Math.random() * 1.6; };
      cand.sort(function (a, b) { return coste(a) - coste(b); });
      n.x = cand[0]; prev = n.x;
    });
    // tiempos débiles: de paso, bordadura o nota del acorde
    for (var i = 0; i < sonoras.length; i++) {
      var n = sonoras[i];
      if (n.x !== null) continue;
      var p = i > 0 ? sonoras[i - 1].x : 0, sig = null;
      for (var j = i + 1; j < sonoras.length; j++) if (sonoras[j].x !== null) { sig = sonoras[j].x; break; }
      var opc = [];
      if (sig !== null && Math.abs(sig - p) === 2) opc.push(p + (sig > p ? 1 : -1));        // nota de paso
      if (sig !== null && sig === p) opc.push(p + 1, p - 1);                                // bordadura
      for (var y = p - 3; y <= p + 3; y++) if (n.ac.indexOf(deg(y)) >= 0 && y !== p) opc.push(y);   // nota del acorde
      opc = opc.filter(function (y) { return y >= lo && y <= hi && intervaloOk(modo, p, y) && (sig === null || intervaloOk(modo, y, sig)); });
      if (!opc.length) return fallo('debil');
      if (n.dur < 1) {   // las semicorcheas, por grado conjunto siempre que se pueda
        var grado = opc.filter(function (y) { return Math.abs(y - p) === 1; });
        if (grado.length) opc = grado;
      }
      n.x = opc[0] === p + (sig > p ? 1 : -1) && Math.random() < 0.7 ? opc[0] : elige(opc);
    }
    // comprobaciones
    for (i = 0; i < sonoras.length; i++) if (sonoras[i].x === null || sonoras[i].x < lo || sonoras[i].x > hi) return fallo('hueco');
    for (i = 1; i < sonoras.length; i++) {
      if (!intervaloOk(modo, sonoras[i - 1].x, sonoras[i].x)) return fallo('intervalo');
      if (i > 1 && sonoras[i].x === sonoras[i - 1].x && sonoras[i].x === sonoras[i - 2].x) return fallo('repetidas');   // no tres notas iguales seguidas
    }
    var terceras = sonoras.filter(function (n) { return deg(n.x) === 2; }), tercerasFuertes = terceras.filter(function (n) { return n.fuerte; });
    if (terceras.length < 3 || tercerasFuertes.length < 2) return fallo('terceras');
    if (!sonoras.some(function (n) { return deg(n.x) === 5; })) return fallo('sexta');   // el 6.º grado también distingue el modo
    // sonido y escritura
    var spc = 60 / compas.bpm / 2;   // segundos por corchea (en los compuestos, bpm = negra con puntillo / 1,5)
    if (compas.pulso === 3) spc = 60 / compas.bpm / 3;
    var t = 0, ev = [];
    notas.forEach(function (n) {
      if (!n.silencio) {
        var midi = tono.m + semis(modo, n.x);
        n.midi = midi;
        ev.push(n.ev = { midi: midi, when: t, dur: n.dur * spc * 0.96 });
      }
      t += n.dur * spc;
    });
    var kk = tonalidadPercibida(sonoras.map(function (n) { return { midi: n.midi, dur: n.dur }; }));
    var pcT = tono.m % 12, relPc = modo === 'mayor' ? (pcT + 9) % 12 : (pcT + 3) % 12, relModo = modo === 'mayor' ? 'menor' : 'mayor';
    if (kk[0].pc !== pcT || kk[0].modo !== modo) return fallo('kk-otra');
    if (kk[0].r - kk[1].r < 0.06) return fallo('kk-margen');
    var rel = kk.filter(function (k) { return k.pc === relPc && k.modo === relModo; })[0];
    var par = kk.filter(function (k) { return k.pc === pcT && k.modo === relModo; })[0];
    if (kk[0].r - rel.r < 0.12) return fallo('kk-relativa');
    if (kk[0].r - par.r < 0.12) return fallo('kk-homonima');
    return { modo: modo, tono: tono, compas: compas, notas: notas, ev: ev, dur: t, kk: kk[0].r };
  }
  function generar(modo) {
    for (var k = 0; k < 400; k++) {
      var m = intentar(modo, elige(TONOS[modo]), elige(COMPASES));
      if (m) return m;
    }
    throw new Error('no se ha podido generar la melodía');
  }

  /* nombre y escritura de una nota de la melodía */
  function deletrear(tono, modo, x) {
    var li = (LETRAS.indexOf(tono.l) + deg(x)) % 7, letra = LETRAS[li];
    var oct = Math.floor((tono.m + semis(modo, x) - (NAT[li] + 0)) / 12) - 1;
    var midiNat = (oct + 1) * 12 + NAT[li], alt = tono.m + semis(modo, x) - midiNat;
    if (alt > 2) { oct++; alt -= 12; } else if (alt < -2) { oct--; alt += 12; }
    return letra + (alt > 0 ? '##'.slice(0, alt) : alt < 0 ? 'bb'.slice(0, -alt) : '') + '/' + oct;
  }
  function nombreNota(key) { var m = /^([a-g])(##|bb|#|b)?\//.exec(key); return NOMBRE_LETRA[m[1]] + ({ '#': '♯', b: '♭', '##': '♯♯', bb: '♭♭' }[m[2]] || ''); }
  var firma = function (mel) { return mel.tono.m + mel.modo + mel.compas.num + mel.compas.den + mel.notas.map(function (x) { return x.silencio ? 'r' + x.dur : x.x + ':' + x.dur; }).join(','); };
  function nombreTono(tono, modo) {
    return NOMBRE_LETRA[tono.l] + (tono.a > 0 ? '♯' : tono.a < 0 ? '♭' : '') + (modo === 'mayor' ? ' mayor' : ' menor');
  }
  /* la partitura: sistemas de «porFila» compases (4 en pantallas anchas, 2 en el móvil) */
  function filas(mel, porFila) {
    porFila = porFila || 4;
    var c = mel.compas, comps = [[], [], [], [], [], [], [], []];
    var DUR = { 0.5: ['16', 0], 1: ['8', 0], 1.5: ['8', 1], 2: ['q', 0], 3: ['q', 1], 4: ['h', 0], 6: ['h', 1], 8: ['w', 0], 12: ['w', 1] };
    mel.notas.forEach(function (n) { comps[n.c].push(n); });
    var conBarras = comps.map(function (lista) {
      var t = 0, out = [];
      lista.forEach(function (n) {
        var d = DUR[n.dur], e = { d: d[0] };
        if (d[1]) e.puntillo = true;
        if (n.silencio) e.silencio = true; else e.key = deletrear(mel.tono, mel.modo, n.x);
        if (n.dur < 2 && !n.silencio) e.barra = Math.floor(t / c.pulso);   // corcheas y semicorcheas, con barra por pulso
        out.push(e); t += n.dur;
      });
      // una corchea sola en su pulso no lleva barra (va con su corchete)
      var cuenta = {}; out.forEach(function (e) { if (e.barra !== undefined) cuenta[e.barra] = (cuenta[e.barra] || 0) + 1; });
      out.forEach(function (e) { if (e.barra !== undefined && cuenta[e.barra] < 2) delete e.barra; });
      return out;
    });
    var out = [];
    for (var k = 0; k < 8; k += porFila) {
      var f = { clave: 'sol', armadura: mel.tono.arm, compases: conBarras.slice(k, k + porFila) };
      if (k === 0) { f.num = c.num; f.den = c.den; }
      out.push(f);
    }
    return out;
  }

  var CSS = [
    '.tm-aud-wrap *{box-sizing:border-box}',
    '.tm-aud-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05)}',
    '.tm-aud-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0}',
    '.tm-aud-wrap .tm-aud-ini{text-align:center;padding:.5rem 0 1rem}',
    '.tm-aud-wrap .tm-aud-tit{font-size:1.35rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e}',
    '.tm-aud-wrap .tm-aud-sub{color:#555;margin:0 auto 1.2rem;font-size:.95rem;max-width:520px;line-height:1.5}',
    '.tm-aud-wrap .tm-aud-head{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}',
    '.tm-aud-wrap .tm-aud-prog{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0}',
    '.tm-aud-wrap .tm-aud-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden}',
    '.tm-aud-wrap .tm-aud-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0}',
    '.tm-aud-wrap .tm-aud-cnt{font-size:.82rem;color:#555;font-weight:500}',
    '.tm-aud-wrap .tm-aud-badge{font-size:.92rem;font-weight:700;color:#7a5c0f;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap}',
    '.tm-aud-wrap .tm-aud-play{display:flex;flex-direction:column;align-items:center;gap:8px;margin:10px 0 18px}',
    '.tm-aud-wrap .tm-aud-btnplay{font:inherit;font-weight:800;font-size:1.05rem;padding:14px 26px;border-radius:999px;border:0;background:#8b6914;color:#fff;cursor:pointer;min-width:230px}',
    '.tm-aud-wrap .tm-aud-btnplay[disabled]{background:#cfc6ae;cursor:default}',
    '.tm-aud-wrap .tm-aud-estado{font-size:.9rem;color:#555;min-height:1.4em;text-align:center}',
    '.tm-aud-wrap .tm-aud-opts{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '.tm-aud-wrap .tm-aud-opt{font:inherit;font-weight:800;font-size:1.1rem;padding:16px;border:2px solid #d8d0b8;border-radius:10px;background:#faf8f3;color:#1a1a2e;cursor:pointer}',
    '.tm-aud-wrap .tm-aud-opt:hover:not([disabled]){border-color:#8b6914;background:#fdf8ee}',
    '.tm-aud-wrap .tm-aud-opt[disabled]{cursor:default;opacity:.55}',
    '.tm-aud-wrap .tm-aud-opt.tm-ok{background:#2e7d32;border-color:#2e7d32;color:#fff;opacity:1}',
    '.tm-aud-wrap .tm-aud-opt.tm-ko{background:#c62828;border-color:#c62828;color:#fff;opacity:1}',
    '.tm-aud-wrap .tm-aud-fb{display:none;margin-top:15px;padding:15px;border-radius:6px;font-weight:600;line-height:1.5}',
    '.tm-aud-wrap .tm-aud-fb.tm-show{display:block}',
    '.tm-aud-wrap .tm-aud-fb.tm-ok{background:#e8f5e9;color:#1b5e20}',
    '.tm-aud-wrap .tm-aud-fb.tm-ko{background:#ffebee;color:#b71c1c}',
    '.tm-aud-wrap .tm-aud-part{display:none;margin-top:14px;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:8px;overflow:hidden}',
    '.tm-aud-wrap .tm-aud-part.tm-show{display:block}',
    '.tm-aud-wrap .tm-aud-part svg{display:block;margin:0 auto;max-width:100%;height:auto}',
    '.tm-aud-wrap .tm-aud-acc{display:none;gap:10px;margin-top:12px}',
    '.tm-aud-wrap .tm-aud-acc.tm-show{display:flex}',
    '.tm-aud-wrap .tm-aud-sec{font:inherit;flex:1;padding:14px;border-radius:6px;border:1px solid #d8d0b8;background:#f5f2ea;color:#1a1a2e;cursor:pointer;font-weight:700}',
    '.tm-aud-wrap .tm-aud-nxt{font:inherit;flex:1;padding:14px;border-radius:6px;border:0;background:#1a1a1a;color:#fff;cursor:pointer;font-weight:700}',
    '.tm-aud-wrap .tm-aud-score{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem}',
    '.tm-aud-wrap .tm-aud-score b{display:block;font-size:3rem;line-height:1}',
    '.tm-aud-wrap .tm-aud-score span{font-size:1.3rem;font-weight:600;opacity:.9}',
    '@media(max-width:480px){.tm-aud-wrap .tm-card{padding:18px 14px}.tm-aud-wrap .tm-aud-btnplay{min-width:0;width:100%}}'
  ].join('');
  function injectCSS() {
    if (document.getElementById('tm-aud-css')) return;
    var s = document.createElement('style'); s.id = 'tm-aud-css'; s.textContent = CSS; document.head.appendChild(s);
  }

  var LA4 = 69, PAUSA = 1.6, MAX_ESCUCHAS = 3, TOTAL = 10;

  function tmAudModoEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-aud-wrap';
    var uid = containerId;
    var n, aciertos, mel, escuchas, respondido, sonando = 0, timer = 0, gen = 0;
    var orden = [], firmas = {};   // 5 mayores y 5 menores, barajadas; y lo ya salido, para no repetir melodía
    var $ = function (s) { return document.getElementById(uid + s); };

    function inicio() {
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-ini">' +
        '<h2 class="tm-aud-tit">¿Mayor o menor? — ' + TOTAL + ' melodías</h2>' +
        '<p class="tm-aud-sub">Escucharás una melodía de 8 compases al piano (antes suena el La4 de referencia). Decide si está en modo <strong>mayor</strong> o <strong>menor</strong>. Puedes escuchar cada melodía hasta ' + MAX_ESCUCHAS + ' veces. Sube el volumen o usa auriculares.</p>' +
        '<button class="tm-aud-btnplay" id="' + uid + '_go" type="button">Empezar</button>' +
        '</div></div>';
      $('_go').addEventListener('click', function () {
        n = 0; aciertos = 0; firmas = {};
        if (window.tmNotacion) window.tmNotacion.listo().catch(function () {});   // la partitura (Verovio) se va cargando mientras se escucha
        orden = ['mayor', 'mayor', 'mayor', 'mayor', 'mayor', 'menor', 'menor', 'menor', 'menor', 'menor'];
        for (var i = orden.length - 1; i > 0; i--) { var j = rnd(i + 1), x = orden[i]; orden[i] = orden[j]; orden[j] = x; }   // Fisher-Yates
        montar(); siguiente();
      });
    }
    function montar() {
      wrap.innerHTML = '<div class="tm-card">' +
        '<div class="tm-aud-head"><div class="tm-aud-prog"><div class="tm-aud-bar"><div class="tm-aud-fill" id="' + uid + '_fill"></div></div>' +
        '<span class="tm-aud-cnt" id="' + uid + '_cnt"></span></div><span class="tm-aud-badge" id="' + uid + '_badge">✓ 0</span></div>' +
        '<div class="tm-aud-play"><button class="tm-aud-btnplay" id="' + uid + '_play" type="button"></button>' +
        '<p class="tm-aud-estado" id="' + uid + '_estado" aria-live="polite"></p></div>' +
        '<div class="tm-aud-opts" role="group" aria-label="Respuesta">' +
        '<button class="tm-aud-opt" id="' + uid + '_may" type="button">Mayor</button>' +
        '<button class="tm-aud-opt" id="' + uid + '_men" type="button">Menor</button></div>' +
        '<div class="tm-aud-fb" id="' + uid + '_fb"></div>' +
        '<div class="tm-aud-part" id="' + uid + '_part"></div>' +
        '<div class="tm-aud-acc" id="' + uid + '_acc"><button class="tm-aud-sec" id="' + uid + '_otra" type="button">▶ Escuchar otra vez</button>' +
        '<button class="tm-aud-nxt" id="' + uid + '_nxt" type="button">Siguiente →</button></div>' +
        '</div>';
      $('_play').addEventListener('click', function () { if (!respondido && escuchas < MAX_ESCUCHAS) { escuchas++; tocar(); } });
      $('_otra').addEventListener('click', tocar);
      $('_may').addEventListener('click', function () { responder('mayor'); });
      $('_men').addEventListener('click', function () { responder('menor'); });
      $('_nxt').addEventListener('click', siguiente);
    }
    function siguiente() {
      parar();
      if (n >= TOTAL) { resultado(); return; }
      n++; escuchas = 0; respondido = false;
      for (var k = 0; k < 50; k++) { mel = generar(orden[n - 1]); if (!firmas[firma(mel)]) break; }   // sin repetir melodía (con tope)
      firmas[firma(mel)] = 1;
      $('_fill').style.width = ((n - 1) / TOTAL * 100) + '%';
      $('_cnt').textContent = 'Melodía ' + n + ' de ' + TOTAL;
      $('_fb').className = 'tm-aud-fb'; $('_part').className = 'tm-aud-part'; $('_acc').className = 'tm-aud-acc';
      ['_may', '_men'].forEach(function (k) { var b = $(k); b.className = 'tm-aud-opt'; b.disabled = true; });
      $('_estado').textContent = 'Pulsa para escuchar: primero el La4 y después la melodía.';
      actualizarPlay();
    }
    function actualizarPlay() {
      var b = $('_play'), quedan = MAX_ESCUCHAS - escuchas;
      if (respondido) { b.style.display = 'none'; return; }
      b.style.display = '';
      b.disabled = !!sonando || quedan <= 0;
      b.textContent = sonando ? 'Sonando…' : escuchas === 0 ? '▶ Escuchar' : quedan > 0 ? '▶ Escuchar otra vez (' + quedan + (quedan === 1 ? ' vez más)' : ' veces más)') : 'Sin más escuchas';
    }
    function parar() { gen++; clearTimeout(timer); sonando = 0; if (window.tmPiano && window.tmPiano.stopAll) window.tmPiano.stopAll(); }
    /* La4, una pausa y la melodía */
    function tocar() {
      parar();
      var g = gen, ev = [{ midi: LA4, when: 0, dur: 1.1 }].concat(mel.ev.map(function (e) { return { midi: e.midi, when: e.when + PAUSA, dur: e.dur }; }));
      sonando = 1; actualizarPlay();
      // se puede responder mientras suena (al responder, se para)
      if (!respondido) ['_may', '_men'].forEach(function (k) { $(k).disabled = false; });
      $('_estado').textContent = 'Suena el La4…';
      window.tmPiano.playEvents(ev).then(function (d) {
        if (g !== gen) return;
        if (!d) {   // sin sonido (no cargan las muestras o el navegador no deja): no gasta la escucha
          sonando = 0; escuchas--; actualizarPlay();
          $('_estado').textContent = 'No se ha podido reproducir el sonido. Comprueba la conexión y vuelve a pulsar.';
          return;
        }
        timer = setTimeout(function () { if (g === gen) $('_estado').textContent = 'Suena la melodía…'; }, PAUSA * 1000);
        setTimeout(function () {
          if (g !== gen) return;
          sonando = 0;
          if (!respondido) {
            ['_may', '_men'].forEach(function (k) { $(k).disabled = false; });
            $('_estado').textContent = escuchas < MAX_ESCUCHAS ? '¿Mayor o menor?' : 'Ya no quedan escuchas: ¿mayor o menor?';
          } else $('_estado').textContent = '';
          actualizarPlay();
        }, (PAUSA + mel.dur + 0.4) * 1000);
      });
    }
    function responder(r) {
      if (respondido || escuchas === 0) return;
      respondido = true; parar();
      var ok = r === mel.modo;
      if (ok) aciertos++;
      $('_badge').textContent = '✓ ' + aciertos;
      $(r === 'mayor' ? '_may' : '_men').className = 'tm-aud-opt ' + (ok ? 'tm-ok' : 'tm-ko');
      if (!ok) $(mel.modo === 'mayor' ? '_may' : '_men').className = 'tm-aud-opt tm-ok';
      ['_may', '_men'].forEach(function (k) { $(k).disabled = true; });
      var fb = $('_fb');
      fb.className = 'tm-aud-fb tm-show ' + (ok ? 'tm-ok' : 'tm-ko');
      var tonica = nombreNota(deletrear(mel.tono, mel.modo, 0)), tercera = nombreNota(deletrear(mel.tono, mel.modo, 2)), sensible = nombreNota(deletrear(mel.tono, mel.modo, -1));
      fb.innerHTML = (ok ? '<strong>✓ ¡Correcto!</strong> ' : '<strong>✗ No.</strong> ') + 'Estaba en <strong>' + nombreTono(mel.tono, mel.modo) + '</strong>, en compás de ' + mel.compas.num + '/' + mel.compas.den + '.' +
        '<br>Tónica: ' + tonica + ' · 3.ª ' + mel.modo + ': ' + tercera + ' · sensible: ' + sensible + '.' +
        '<br><span style="font-weight:400">La tercera ' + mel.modo + ' ' + tonica + '-' + tercera + ' es la que hace que la melodía esté en modo ' + mel.modo + '.' +
        (mel.modo === 'menor' ? ' La sensible subida (' + sensible + ') refuerza la vuelta a la tónica.' : '') + '</span>';
      $('_estado').textContent = '';
      actualizarPlay();
      var part = $('_part');
      part.className = 'tm-aud-part tm-show';
      var ancho = Math.max(240, part.clientWidth - 16), porFila = ancho < 520 ? 2 : 4, fs = filas(mel, porFila);
      part.innerHTML = fs.map(function (f, k) { return '<div id="' + uid + '_s' + k + '"></div>'; }).join('');
      window.tmNotacion.listo().then(function () {
        fs.forEach(function (f, k) {
          window.tmNotacion.dibujarAAncho($('_s' + k), f, ancho, { escala: 0.9, id: uid + 's' + k, alt: 'La melodía escrita, compases ' + (k * porFila + 1) + ' a ' + (k * porFila + porFila) });
        });
      }).catch(function () {});
      $('_acc').className = 'tm-aud-acc tm-show';
      if (n >= TOTAL) $('_nxt').textContent = 'Ver resultado →';
    }
    function resultado() {
      parar();
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-score"><b>' + aciertos + '/' + TOTAL + '</b><span>' + Math.round(aciertos / TOTAL * 100) + '%</span></div>' +
        '<div class="tm-aud-acc tm-show"><button class="tm-aud-nxt" id="' + uid + '_re" type="button">Volver a empezar</button></div></div>';
      $('_re').addEventListener('click', inicio);
    }
    inicio();
  }

  window.tmAudModoEngine = tmAudModoEngine;
  /* para las pruebas (generador y verificación independiente) */
  /* también lo usa el ejercicio de adivinar el compás (auditivo-compas-engine.js): el generador, la partitura y los estilos */
  window.tmAudModo = { injectCSS: injectCSS, MOTIVOS: MOTIVOS, intentar: intentar, generar: generar, filas: filas, tonalidadPercibida: tonalidadPercibida, deletrear: deletrear, nombreNota: nombreNota, nombreTono: nombreTono, TONOS: TONOS, COMPASES: COMPASES, semis: semis };
})();
