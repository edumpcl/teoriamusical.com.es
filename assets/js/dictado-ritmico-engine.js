/* Dictado rítmico — /ejercicios/auditivos/dictado-ritmico/ (índice) y sus páginas, por grupos de figuras.

   Uso: <div id="x"></div><script>tmDictadoRitmico('x', { modo: 'oir' | 'leer' | 'escribir', grupo: 'negras' | 'blancas' | 'puntillo' | 'redondas' });</script>

   Decisiones de Eduardo (04-11-2026):
   - Dos compases de 2/4, 3/4 o 4/4, todo en Sol4 (piano). Sin niveles. Un grupo de figuras por serie de ejercicios:
     negras y silencios de negra; blancas, negras y sus silencios; blancas con puntillo, blancas, negras y sus silencios
     (solo 3/4 y 4/4: en 2/4 no cabe la blanca con puntillo); redondas, blancas con puntillo, blancas, negras y sus
     silencios (solo 4/4).
   - oir: suena el dictado y se elige entre 4 ritmos escritos. leer: se ve el ritmo y se elige entre 4 audios.
     escribir: suena el dictado y se escribe con tarjetas (las figuras del grupo, la barra de compás y la doble barra final),
     como en completar compás. Las barras las pone el alumno y un compás se puede llenar de más: se corrige al final.
   - Sin compás de entrada, pero el dictado nunca empieza con silencio. Para que el pulso se pueda deducir sin metrónomo,
     hay al menos dos negras seguidas (en cualquiera de los dos compases: si tuvieran que estar en el 1.º, en 2/4 no
     quedarían ritmos para 4 opciones), no hay más de dos tiempos de silencio seguidos ni un compás entero en silencio.
   - Los ritmos que no son el bueno se diferencian de él en uno o dos tiempos (y cumplen las mismas reglas).
   10 dictados por test, hasta 3 escuchas (en leer, 3 por audio). Estilos de auditivo-modo-engine.js, tarjetas de
   completar-compas-engine.js y partitura con Verovio (tm-notacion.js). */
(function () {
  'use strict';

  var TOTAL = 10, MAX_ESCUCHAS = 3, SOL4 = 67, ROJO = '#c62828';
  var LETRAS = ['A', 'B', 'C', 'D'];
  var rnd = function (n) { return Math.floor(Math.random() * n); };
  function barajar(a) {   // Fisher-Yates
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* Figuras: d = tiempos que dura (la negra es el tiempo en 2/4, 3/4 y 4/4), s = silencio. cc = la figura en
     completar-compas-engine.js (para la tarjeta); vf = la duración en tm-mei.js. */
  var FIG = {
    n: { d: 1, s: 0, cc: 'n', vf: 'q', nombre: 'negra' },
    sn: { d: 1, s: 1, cc: 'n', vf: 'q', nombre: 'silencio de negra' },
    b: { d: 2, s: 0, cc: 'b', vf: 'h', nombre: 'blanca' },
    sb: { d: 2, s: 1, cc: 'b', vf: 'h', nombre: 'silencio de blanca' },
    bp: { d: 3, s: 0, cc: 'bP', vf: 'h', p: 1, nombre: 'blanca con puntillo' },
    sbp: { d: 3, s: 1, cc: 'bP', vf: 'h', p: 1, nombre: 'silencio de blanca con puntillo' },
    r: { d: 4, s: 0, cc: 'r', vf: 'w', nombre: 'redonda' },
    sr: { d: 4, s: 1, cc: 'r', vf: 'w', nombre: 'silencio de redonda' }
  };
  var SILENCIO_DE = { 1: 'sn', 2: 'sb', 3: 'sbp', 4: 'sr' };   // el silencio de cada duración
  /* Un grupo por cada serie de dictados. reparto: cuántos dictados de cada compás en un test de 10 (y de ahí, los compases).
     requiere: las figuras nuevas del grupo; alguna tiene que salir en el dictado. maxSilencio: tiempos de silencio seguidos
     que se permiten (2 si no se dice). vacio: el 2.º compás puede ser entero ese silencio (el 1.º no: empieza con nota).
     prefiere: una figura que saldría poco; sale en casi la mitad de los dictados (ver generar). */
  var GRUPOS = {
    // 2/4 solo tiene 3 dictados posibles (empieza con negra, algún silencio y dos negras seguidas): sale 2 veces
    negras: { figs: ['n', 'sn'], texto: 'negras y silencios de negra', reparto: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4] },
    // con blancas, el 2/4 tiene 2 dictados (n n | b y b | n n): sale 2 veces
    blancas: { figs: ['n', 'sn', 'b', 'sb'], texto: 'blancas, negras y sus silencios', requiere: ['b'], reparto: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4] },
    puntillo: { figs: ['n', 'sn', 'b', 'sb', 'bp', 'sbp'], texto: 'blancas con puntillo, blancas, negras y sus silencios', requiere: ['bp', 'sbp'], maxSilencio: 3, vacio: ['sbp'], prefiere: 'sbp', reparto: [3, 3, 3, 3, 3, 4, 4, 4, 4, 4] },
    // la redonda solo cabe en 4/4
    redondas: { figs: ['n', 'sn', 'b', 'sb', 'bp', 'sbp', 'r', 'sr'], texto: 'redondas, blancas con puntillo, blancas, negras y sus silencios', requiere: ['r', 'sr'], maxSilencio: 4, vacio: ['sr'], prefiere: 'sr', reparto: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4] }
  };
  var compasesDelGrupo = function (g) { return g.reparto.filter(function (x, i, a) { return a.indexOf(x) === i; }); };
  /* Dónde puede empezar una figura de dos tiempos (b = tiempo del compás, desde 0): en 2/4, en el 1.º; en 3/4, la blanca
     en el 1.º o el 2.º y el silencio de blanca solo en el 1.º (en los tiempos 2-3 se escriben dos silencios de negra);
     en 4/4, en el 1.º o el 3.º, para que se vea la mitad del compás. Las de tres tiempos (Eduardo): en 3/4, el compás
     entero; en 4/4, en el 1.º o el 2.º (el silencio no puede ir en el 1.º del compás 1 porque el dictado empieza con nota).
     La redonda y su silencio, el compás de 4/4 entero. */
  function puede(f, b, t) {
    if (FIG[f].d === 1) return true;
    if (FIG[f].d === 4) return b === 0;   // la redonda y su silencio: el compás de 4/4 entero
    if (FIG[f].d === 3) return t === 3 ? b === 0 : b <= 1;
    if (t === 2) return b === 0;
    if (t === 3) return FIG[f].s ? b === 0 : b <= 1;
    return b === 0 || b === 2;
  }
  function compasesDe(t, figs) {
    var out = [];
    (function llenar(b, acc) {
      if (b === t) { out.push(acc); return; }
      figs.forEach(function (f) { if (b + FIG[f].d <= t && puede(f, b, t)) llenar(b + FIG[f].d, acc.concat(f)); });
    })(0, []);
    return out;
  }
  /* Un ritmo es { t, c: [[figuras del compás 1], [del compás 2]] }. mapa: por tiempo, 'A' (empieza una nota), 'C' (sigue
     sonando una blanca) o 'S' (silencio). */
  function mapa(r) {
    var m = [];
    r.c.forEach(function (c) { c.forEach(function (f) { for (var k = 0; k < FIG[f].d; k++) m.push(FIG[f].s ? 'S' : k ? 'C' : 'A'); }); });
    return m;
  }
  var clave = function (r) { return r.c.map(function (c) { return c.join(' '); }).join(' | '); };
  function valido(r, g) {
    var m = mapa(r), t = r.t, s = m.join('');
    if (m[0] !== 'A') return false;                       // nunca empieza con silencio
    if (s.indexOf('AA') < 0) return false;                 // dos negras seguidas: de ahí sale el pulso (sin ellas, el pulso es ambiguo)
    if (s.slice(0, t).indexOf('A') < 0) return false;     // ningún compás en silencio (el 2.º sí, si el grupo lo permite: vacio)
    if (s.slice(t).indexOf('A') < 0 && !(g.vacio && g.vacio.indexOf(r.c[1].join()) >= 0)) return false;
    if (s.indexOf(new Array((g.maxSilencio || 2) + 2).join('S')) >= 0) return false;   // como mucho, maxSilencio tiempos de silencio seguidos
    // Los ritmos que se MUESTRAN llevan agrupados los silencios seguidos que caben en uno solo (del grupo, y donde se puede
    // escribir): así cada sonido se escribe de una sola forma y dos opciones nunca suenan igual. Al escribir el alumno, en
    // cambio, vale cualquier forma (Eduardo: un silencio de blanca y dos de negra son lo mismo).
    if (r.c.some(function (c) {
      for (var i = 0, b = 0; i + 1 < c.length; b += FIG[c[i]].d, i++) {
        if (!FIG[c[i]].s || !FIG[c[i + 1]].s) continue;
        var junto = SILENCIO_DE[FIG[c[i]].d + FIG[c[i + 1]].d];
        if (junto && g.figs.indexOf(junto) >= 0 && puede(junto, b, t)) return true;
      }
      return false;
    })) return false;
    return true;
  }
  /* Todos los ritmos válidos de un grupo y un compás (unos cientos como mucho): se calculan una vez. Con los silencios bien
     agrupados en los ritmos mostrados, cada ritmo se escribe de una sola forma, así que dos ritmos distintos también suenan distinto. */
  var TODOS = {};
  function todos(g, t) {
    var k = g.figs.join() + t;
    if (TODOS[k]) return TODOS[k];
    var cs = compasesDe(t, g.figs), out = [];
    cs.forEach(function (a) { cs.forEach(function (b) { var r = { t: t, c: [a, b] }; if (valido(r, g)) out.push(r); }); });
    return (TODOS[k] = out);
  }
  /* El dictado, además: con negras, algún silencio; en los demás grupos, su figura nueva (con blancas, distinguirla de la
     negra seguida de silencio; exigir también silencio dejaría el 2/4 sin dictados). Las respuestas que no son el bueno no
     necesitan cumplirlo. */
  function esDictado(r, g) {
    if (g.requiere) return r.c.some(function (c) { return c.some(function (f) { return g.requiere.indexOf(f) >= 0; }); });
    return mapa(r).indexOf('S') >= 0;
  }
  function dictados(g, t) { return todos(g, t).filter(function (r) { return esDictado(r, g); }); }
  /* prefiere: una figura que saldría poco (un silencio largo cabe en pocos ritmos). Un tercio de las veces se elige entre los
     dictados que la llevan; el resto, entre todos (que también la pueden llevar): en total, casi la mitad (~45 %). */
  function generar(g, t) {
    var c = dictados(g, t);
    if (g.prefiere && Math.random() < 1 / 3) {
      var con = c.filter(function (r) { return r.c.some(function (x) { return x.indexOf(g.prefiere) >= 0; }); });
      if (con.length) c = con;
    }
    return c[rnd(c.length)];
  }
  var distancia = function (a, b) { var x = mapa(a), y = mapa(b); return x.reduce(function (s, v, i) { return s + (v !== y[i]); }, 0); };
  /* 3 ritmos válidos lo más parecidos al bueno: uno que cambia un solo tiempo y los otros, uno o dos (si no hay bastantes,
     los siguientes más parecidos). */
  function distractores(r, g) {
    var otros = barajar(todos(g, r.t).filter(function (q) { return clave(q) !== clave(r); }));
    var de = function (d) { return otros.filter(function (q) { return distancia(q, r) === d; }); };
    var out = de(1).slice(0, 1);
    var resto = barajar(de(1).slice(1).concat(de(2)));
    out = out.concat(resto.slice(0, 3 - out.length));
    if (out.length < 3) {
      var lejos = otros.filter(function (q) { return out.indexOf(q) < 0; }).sort(function (a, b) { return distancia(a, r) - distancia(b, r); });
      out = out.concat(lejos.slice(0, 3 - out.length));
    }
    return out;
  }
  /* Las figuras en fila, con el tiempo en que empieza cada una */
  function lineal(r) {
    var out = [], b = 0;
    r.c.forEach(function (c, ci) { c.forEach(function (f) { out.push({ f: f, b: b, c: ci }); b += FIG[f].d; }); });
    return out;
  }
  var duracion = function (r) { return 2 * r.t; };

  /* Audio: Sol4 en cada nota; suena casi toda su duración, para que el silencio que la sigue se oiga como hueco (y la
     blanca se distinga de la negra seguida de silencio). */
  function eventos(r, spb) {
    return lineal(r).filter(function (x) { return !FIG[x.f].s; }).map(function (x) { return { midi: SOL4, when: x.b * spb, dur: (FIG[x.f].d - 0.1) * spb }; });
  }

  /* Partitura. op.rojo[tiempo]: la figura que ocupa ese tiempo, en rojo. op.hasta: lo que falta desde ese tiempo, huecos invisibles. */
  function fila(r, op) {
    op = op || {};
    var cs = [[], []], t = r.t;
    lineal(r).forEach(function (x) {
      if (op.hasta != null && x.b >= op.hasta) return;
      var e = figura(x.f);
      for (var k = 0; k < FIG[x.f].d; k++) if (op.rojo && op.rojo[x.b + k]) e.color = ROJO;
      cs[x.c].push(e);
    });
    centrarSilencio(cs, t);
    if (op.hasta != null) for (var b = op.hasta; b < 2 * t; b++) cs[Math.floor(b / t)].push({ key: 'b/4', d: 'q', espacio: true });
    return { clave: 'sol', num: t, den: 4, compases: cs, barraFinal: 'end' };
  }
  /* El silencio de redonda que llena un compás de 4/4 se dibuja centrado, como silencio de compás entero. (El de blanca con
     puntillo en 3/4 se deja como está: es la figura de la tarjeta.) */
  function centrarSilencio(cs, t) {
    cs.forEach(function (c) { if (t === 4 && c.length === 1 && c[0].silencio && c[0].d === 'w') c[0].mrest = true; });
  }
  function figura(f) {
    var F = FIG[f], e = F.s ? { key: 'b/4', d: F.vf, silencio: true } : { key: 'g/4', d: F.vf, plica: 'up' };
    if (F.p) e.puntillo = 1;
    return e;
  }
  /* Lo que escribe el alumno: figuras y barras ('|' barra de compás, '||' doble barra final), tal cual, aunque un compás
     tenga de más o de menos. rojo[i]: el elemento i, en rojo. Mientras no hay doble barra, el último compás queda abierto
     (sin barra) y, si tiene menos de un compás, se rellena con huecos invisibles para que no se vea encogido. */
  function filaEscrita(tokens, t, rojo) {
    var cs = [[]], fin = false, lleva = 0;
    tokens.forEach(function (tk, i) {
      if (tk === '|') { cs.push([]); lleva = 0; return; }
      if (tk === '||') { fin = true; return; }
      var e = figura(tk);
      if (rojo && rojo[i]) e.color = ROJO;
      cs[cs.length - 1].push(e); lleva += FIG[tk].d;
    });
    if (!fin) for (var b = lleva; b < t; b++) cs[cs.length - 1].push({ key: 'b/4', d: 'q', espacio: true });
    centrarSilencio(cs, t);
    var f = { clave: 'sol', num: t, den: 4, compases: cs };
    if (fin) f.barraFinal = 'end'; else f.sinBarraFinal = true;
    return f;
  }
  function describir(r) {
    return 'Compás de ' + r.t + '/4: ' + r.c.map(function (c) { return c.map(function (f) { return FIG[f].nombre; }).join(', '); }).join(' | ');
  }
  function dibujar(div, r, ancho, op) {
    return window.tmNotacion.dibujarAAncho(div, fila(r, op), ancho, { escala: (op && op.escala) || 0.9, id: 'dr', alt: (op && op.alt) || describir(r) });
  }
  var ordinal = function (i) { return (i + 1) + '.º'; };
  /* «el 2.º tiempo del compás 1», «el 3.º y el 4.º tiempo del compás 2», «el 2.º tiempo del compás 1 y el 1.º del compás 2» */
  var y = function (l) { return l.length > 1 ? l.slice(0, -1).join(', ') + ' y ' + l[l.length - 1] : l[0]; };
  function dondeFalla(malos, t) {
    var porCompas = [[], []];
    malos.forEach(function (i) { porCompas[Math.floor(i / t)].push('el ' + ordinal(i % t)); });
    var partes = [];
    porCompas.forEach(function (l, c) { if (l.length) partes.push(y(l) + (partes.length ? '' : ' tiempo') + ' del compás ' + (c + 1)); });
    return y(partes);
  }
  /* Tiempos en los que dos ritmos suenan distinto (mapa) */
  function difSonido(a, b) { var x = mapa(a), y2 = mapa(b), out = []; x.forEach(function (v, i) { if (v !== y2[i]) out.push(i); }); return out; }

  var CSS = [
    '.tm-aud-wrap .tm-dr-cifra{text-align:center;font-size:.9rem;color:#555;margin:-6px 0 12px}',
    '.tm-aud-wrap .tm-dr-opts{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '.tm-aud-wrap .tm-dr-opt{font:inherit;display:flex;align-items:center;gap:8px;padding:8px 10px;border:2px solid #d8d0b8;border-radius:10px;background:#fff;color:#1a1a2e;cursor:pointer;min-width:0;text-align:left}',
    '.tm-aud-wrap .tm-dr-opt:hover:not([disabled]){border-color:#8b6914;background:#fdf8ee}',
    '.tm-aud-wrap .tm-dr-opt[disabled]{cursor:default}',
    '.tm-aud-wrap .tm-dr-opt.tm-ok{border-color:#2e7d32;background:#e8f5e9}',
    '.tm-aud-wrap .tm-dr-opt.tm-ko{border-color:#c62828;background:#ffebee}',
    '.tm-aud-wrap .tm-dr-let{font-weight:800;font-size:1.1rem;color:#7a5c0f;min-width:1.2em}',
    '.tm-aud-wrap .tm-dr-dib{flex:1;min-width:0}',
    '.tm-aud-wrap .tm-dr-dib svg{display:block;margin:0 auto;max-width:100%;height:auto}',
    '.tm-aud-wrap .tm-dr-ritmo{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:8px;margin:0 0 16px}',
    '.tm-aud-wrap .tm-dr-ritmo svg{display:block;margin:0 auto;max-width:100%;height:auto}',
    '.tm-aud-wrap .tm-dr-audios{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}',
    '.tm-aud-wrap .tm-dr-audio{border:2px solid #d8d0b8;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px;background:#faf8f3}',
    '.tm-aud-wrap .tm-dr-audio.tm-ok{border-color:#2e7d32;background:#e8f5e9}',
    '.tm-aud-wrap .tm-dr-audio.tm-ko{border-color:#c62828;background:#ffebee}',
    '.tm-aud-wrap .tm-dr-audio b{font-size:1.1rem;color:#7a5c0f}',
    '.tm-aud-wrap .tm-dr-oir{font:inherit;font-weight:700;padding:10px;border-radius:999px;border:0;background:#8b6914;color:#fff;cursor:pointer}',
    '.tm-aud-wrap .tm-dr-oir[disabled]{background:#cfc6ae;cursor:default}',
    '.tm-aud-wrap .tm-dr-elegir{font:inherit;font-weight:700;padding:10px;border-radius:8px;border:2px solid #d8d0b8;background:#fff;color:#1a1a2e;cursor:pointer}',
    '.tm-aud-wrap .tm-dr-elegir:hover:not([disabled]){border-color:#8b6914}',
    '.tm-aud-wrap .tm-dr-elegir[disabled]{cursor:default;opacity:.55}',
    '.tm-aud-wrap .tm-dr-cuenta{font-size:.8rem;color:#555;text-align:center}',
    '.tm-aud-wrap .tm-dr-esc{background:#fdfcf9;border:1px dashed #d8d0b8;border-radius:8px;padding:8px;min-height:110px}',
    '.tm-aud-wrap .tm-dr-esc svg{display:block;margin:0 auto;max-width:100%;height:auto}',
    '.tm-aud-wrap .tm-dr-pal{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;margin:12px 0 4px}',
    '.tm-aud-wrap .tm-dr-pal .tm-cc-carta{width:84px}',
    '.tm-aud-wrap .tm-dr-pal .tm-cc-carta small{font-size:.7rem;min-height:2.4em}',
    '.tm-aud-wrap .tm-dr-herr{display:flex;gap:8px;justify-content:center;margin-top:6px}',
    '.tm-aud-wrap .tm-dr-herr button{font:inherit;font-size:.85rem;font-weight:600;padding:8px 14px;border-radius:8px;border:1px solid #d8d0b8;background:#fff;cursor:pointer}',
    '.tm-aud-wrap .tm-dr-herr button[disabled]{opacity:.5;cursor:default}',
    '.tm-aud-wrap .tm-dr-lleva{font-size:.85rem;color:#555;text-align:center;margin-top:6px}',
    '.tm-aud-wrap .tm-dr-corr{font:inherit;width:100%;margin-top:12px;padding:14px;border:0;border-radius:8px;font-weight:700;font-size:1rem;background:#8b6914;color:#fff;cursor:pointer}',
    '.tm-aud-wrap .tm-dr-corr[disabled]{background:#cfc6ae;cursor:default}',
    '.tm-aud-wrap .tm-dr-lbl{font-size:.8rem;font-weight:700;color:#555;margin:10px 0 4px;text-transform:uppercase;letter-spacing:.4px}',
    '@media(max-width:560px){.tm-aud-wrap .tm-dr-opts{grid-template-columns:1fr}}',
    '@media(max-width:480px){.tm-aud-wrap .tm-dr-pal{gap:6px}.tm-aud-wrap .tm-dr-pal .tm-cc-carta{flex:0 0 calc(25% - 5px);min-width:0;max-width:84px;width:auto;padding:4px 3px 2px}}',
    '@media(max-width:380px){.tm-aud-wrap .tm-dr-audios{grid-template-columns:1fr}}'
  ].join('');

  function textos(g) {
    return {
      oir: { tit: 'Dictado rítmico: ¿qué ritmo suena?', sub: 'Suena un ritmo de dos compases en la nota Sol, con ' + g.texto + '. Elige cuál de los cuatro ritmos escritos es el que suena. Puedes escucharlo hasta ' + MAX_ESCUCHAS + ' veces y responder mientras suena.' },
      leer: { tit: 'Lectura rítmica: ¿qué audio es?', sub: 'Verás un ritmo de dos compases con ' + g.texto + '. Escucha los cuatro audios (cada uno hasta ' + MAX_ESCUCHAS + ' veces) y elige el que suena como el ritmo escrito.' },
      escribir: { tit: 'Dictado rítmico: escribe el ritmo', sub: 'Suena un ritmo de dos compases en la nota Sol, con ' + g.texto + '. Escríbelo con las tarjetas, con su barra de compás y la doble barra final, y pulsa Corregir. Puedes escucharlo hasta ' + MAX_ESCUCHAS + ' veces y escribir mientras suena.' }
    };
  }

  function tmDictadoRitmico(id, opciones) {
    var modo = (opciones && opciones.modo) || 'oir', grupo = GRUPOS[(opciones && opciones.grupo) || 'negras'], TEXTOS = textos(grupo);
    var wrap = document.getElementById(id);
    if (!wrap) return;
    window.tmAudModo.injectCSS();
    if (!document.getElementById('tm-dr-css')) { var s = document.createElement('style'); s.id = 'tm-dr-css'; s.textContent = CSS; document.head.appendChild(s); }
    if (modo === 'escribir' && !document.getElementById('tm-cc-css-dr')) {   // las tarjetas: los estilos de completar compás que usan
      var s2 = document.createElement('style'); s2.id = 'tm-cc-css-dr';
      s2.textContent = '.tm-cc-carta{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:4px 6px 2px;cursor:pointer;width:72px;text-align:center;font-family:inherit;}.tm-cc-carta:hover:not([disabled]){border-color:#8b6914;background:#fffbf2;}.tm-cc-carta[disabled]{cursor:default;opacity:.6;}.tm-cc-carta small{display:block;font-size:.62rem;color:#666;line-height:1.15;margin-top:2px;min-height:1.4em;}';
      document.head.appendChild(s2);
    }
    wrap.className = 'tm-aud-wrap';
    var uid = id, $ = function (x) { return document.getElementById(uid + x); };
    var n, aciertos, it, escuchas, respondido, sonando = -1, gen = 0, timers = [], orden = [], vistos = {}, puestos = [];

    function inicio() {
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-ini">' +
        '<h2 class="tm-aud-tit">' + TEXTOS[modo].tit + ' — ' + TOTAL + ' dictados</h2>' +
        '<p class="tm-aud-sub">' + TEXTOS[modo].sub + ' Compases de ' + compasesDelGrupo(grupo).map(function (x) { return x + '/4'; }).join(', ').replace(/, ([^,]*)$/, ' y $1') + '. Sube el volumen o usa auriculares.</p>' +
        '<button class="tm-aud-btnplay" id="' + uid + '_go" type="button">Empezar</button></div></div>';
      $('_go').addEventListener('click', function () {
        $('_go').disabled = true; $('_go').textContent = 'Cargando…';
        window.tmNotacion.listo().then(function () {
          n = 0; aciertos = 0; vistos = {};
          var base = grupo.reparto;   // sin el mismo compás tres veces seguidas
          for (var g = 0; g < 50; g++) { orden = barajar(base); if (!orden.some(function (x, i) { return i >= 2 && x === orden[i - 1] && x === orden[i - 2]; })) break; }
          montar(); siguiente();
        }, function () { $('_go').textContent = 'No se ha podido cargar. Recarga la página.'; });
      });
    }

    function cabecera() {
      return '<div class="tm-aud-head"><div class="tm-aud-prog"><div class="tm-aud-bar"><div class="tm-aud-fill" id="' + uid + '_fill"></div></div>' +
        '<span class="tm-aud-cnt" id="' + uid + '_cnt"></span></div><span class="tm-aud-badge" id="' + uid + '_badge">✓ 0</span></div>';
    }
    var reproductor = '<div class="tm-aud-play"><button class="tm-aud-btnplay" id="' + uid + '_play" type="button"></button>' +
      '<p class="tm-aud-estado" id="' + uid + '_estado" aria-live="polite"></p></div>';
    var pie = '<div class="tm-aud-fb" id="' + uid + '_fb"></div><div class="tm-aud-part" id="' + uid + '_part"></div>' +
      '<div class="tm-aud-acc" id="' + uid + '_acc"><button class="tm-aud-sec" id="' + uid + '_otra" type="button">▶ Escuchar otra vez</button>' +
      '<button class="tm-aud-nxt" id="' + uid + '_nxt" type="button">Siguiente →</button></div>';

    function montar() {
      var medio;
      if (modo === 'oir') medio = reproductor + '<p class="tm-dr-cifra" id="' + uid + '_cifra"></p><div class="tm-dr-opts" id="' + uid + '_opts" role="group" aria-label="Ritmos"></div>';
      else if (modo === 'leer') medio = '<div class="tm-dr-ritmo" id="' + uid + '_ritmo"></div><p class="tm-aud-estado" id="' + uid + '_estado" aria-live="polite"></p><div class="tm-dr-audios" id="' + uid + '_opts" role="group" aria-label="Audios"></div>';
      else medio = reproductor + '<p class="tm-dr-cifra" id="' + uid + '_cifra"></p><div class="tm-dr-esc" id="' + uid + '_esc"></div>' +
        '<div class="tm-dr-pal" role="group" aria-label="Tarjetas">' + grupo.figs.concat(['|', '||']).map(function (f) {
          return '<button type="button" class="tm-cc-carta" data-f="' + f + '"><span class="tm-dr-mini"></span><small>' + (FIG[f] ? FIG[f].nombre : f === '|' ? 'barra de compás' : 'doble barra final') + '</small></button>';
        }).join('') + '</div>' +
        '<div class="tm-dr-herr"><button type="button" id="' + uid + '_des">↶ Deshacer</button><button type="button" id="' + uid + '_bor">Borrar todo</button></div>' +
        '<p class="tm-dr-lleva" id="' + uid + '_lleva"></p><button type="button" class="tm-dr-corr" id="' + uid + '_corr">Corregir</button>';
      wrap.innerHTML = '<div class="tm-card">' + cabecera() + medio + pie + '</div>';
      if (modo !== 'leer') $('_play').addEventListener('click', function () { if (!respondido && escuchas < MAX_ESCUCHAS) { escuchas++; tocar(it.p, 0); } });
      $('_otra').addEventListener('click', function () { tocar(it.p, 0, true); });
      $('_nxt').addEventListener('click', siguiente);
      if (modo === 'escribir') {
        cartas().forEach(function (b) {
          var f = b.dataset.f;
          if (FIG[f]) window.tmCompletarCompasData.carta(b.querySelector('.tm-dr-mini'), FIG[f].cc, !!FIG[f].s);
          else cartaBarra(b.querySelector('.tm-dr-mini'), f === '||');
          b.addEventListener('click', function () { poner(f); });
        });
        $('_des').addEventListener('click', function () { if (!respondido) { puestos.pop(); pintarEscrito(); } });
        $('_bor').addEventListener('click', function () { if (!respondido) { puestos = []; pintarEscrito(); } });
        $('_corr').addEventListener('click', corregirEscrito);
      }
    }
    var cartas = function () { return Array.prototype.slice.call(wrap.querySelectorAll('.tm-dr-pal .tm-cc-carta')); };
    var ancho = function (el) { return Math.max(200, (el || wrap).clientWidth - 20); };

    function siguiente() {
      parar();
      if (n >= TOTAL) { resultado(); return; }
      n++; escuchas = 0; respondido = false; puestos = [];
      var t = orden[n - 1], p;
      for (var k = 0; k < 60; k++) { p = generar(grupo, t); if (!vistos[t + clave(p)]) break; }   // sin repetir dictado (con tope)
      vistos[t + clave(p)] = 1;
      it = { t: t, p: p, bpm: 72 + rnd(19) };
      it.spb = 60 / it.bpm;
      $('_fill').style.width = ((n - 1) / TOTAL * 100) + '%';
      $('_cnt').textContent = 'Dictado ' + n + ' de ' + TOTAL;
      $('_fb').className = 'tm-aud-fb'; $('_part').className = 'tm-aud-part'; $('_acc').className = 'tm-aud-acc';
      if (modo === 'oir') montarOir();
      else if (modo === 'leer') montarLeer();
      else montarEscribir();
    }

    /* ---- oír: 4 ritmos escritos */
    function montarOir() {
      var ops = barajar([it.p].concat(distractores(it.p, grupo)));
      it.ops = ops; it.bueno = ops.indexOf(it.p);
      $('_cifra').textContent = 'Compás de ' + it.t + '/4';
      var cont = $('_opts');
      cont.innerHTML = ops.map(function (q, i) {
        return '<button type="button" class="tm-dr-opt" data-i="' + i + '" disabled><span class="tm-dr-let">' + LETRAS[i] + '</span><span class="tm-dr-dib" id="' + uid + '_o' + i + '"></span></button>';
      }).join('');
      var w = ancho(cont.querySelector('.tm-dr-dib'));
      ops.forEach(function (q, i) { dibujar($('_o' + i), q, w, { escala: 0.8, alt: 'Ritmo ' + LETRAS[i] + '. ' + describir(q) }); });
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-dr-opt'), function (b) { b.addEventListener('click', function () { responderOpcion(+b.dataset.i); }); });
      $('_estado').textContent = 'Pulsa para escuchar el dictado.';
      actualizarPlay();
    }
    function responderOpcion(i) {
      if (respondido || escuchas === 0) return;
      respondido = true; parar();
      var ok = i === it.bueno;
      if (ok) aciertos++;
      $('_badge').textContent = '✓ ' + aciertos;
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-opt'), function (b) {
        var k = +b.dataset.i; b.disabled = true;
        if (k === it.bueno) b.classList.add('tm-ok'); else if (k === i) b.classList.add('tm-ko');
      });
      var malos = difSonido(it.p, it.ops[i]);
      feedback(ok, ok ? 'Era el ritmo <strong>' + LETRAS[it.bueno] + '</strong>.' :
        'Era el ritmo <strong>' + LETRAS[it.bueno] + '</strong>. El ' + LETRAS[i] + ' se diferencia en ' + dondeFalla(malos, it.t) + '.');
      $('_estado').textContent = ''; actualizarPlay();
      terminar();
    }

    /* ---- leer: el ritmo escrito y 4 audios */
    function montarLeer() {
      var ops = barajar([it.p].concat(distractores(it.p, grupo)));
      it.ops = ops; it.bueno = ops.indexOf(it.p); it.esc = [0, 0, 0, 0];
      var r = $('_ritmo');
      dibujar(r, it.p, ancho(r), { escala: 1, alt: 'El ritmo escrito. ' + describir(it.p) });
      var cont = $('_opts');
      cont.innerHTML = ops.map(function (q, i) {
        return '<div class="tm-dr-audio" id="' + uid + '_a' + i + '"><b>Audio ' + LETRAS[i] + '</b>' +
          '<button type="button" class="tm-dr-oir" data-i="' + i + '">▶ Escuchar</button>' +
          '<span class="tm-dr-cuenta" id="' + uid + '_c' + i + '"></span>' +
          '<button type="button" class="tm-dr-elegir" data-i="' + i + '" disabled>Es este</button></div>';
      }).join('');
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-dr-oir'), function (b) {
        b.addEventListener('click', function () {
          var i = +b.dataset.i;
          if (respondido) tocar(ops[i], i, true);   // después de responder, para comparar: sin límite
          else if (it.esc[i] < MAX_ESCUCHAS) { it.esc[i]++; escuchas++; tocar(ops[i], i); }
        });
      });
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-dr-elegir'), function (b) { b.addEventListener('click', function () { responderAudio(+b.dataset.i); }); });
      $('_estado').textContent = 'Escucha los audios y elige el que suena como el ritmo escrito.';
      actualizarAudios();
    }
    function actualizarAudios() {
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-oir'), function (b) {
        var i = +b.dataset.i, quedan = MAX_ESCUCHAS - it.esc[i];
        b.disabled = respondido ? sonando >= 0 : (sonando >= 0 || quedan <= 0);
        b.textContent = sonando === i ? 'Sonando…' : respondido ? '▶ Escuchar' : quedan <= 0 ? 'Sin más escuchas' : '▶ Escuchar';
        $('_c' + i).textContent = respondido ? '' : it.esc[i] ? 'Quedan ' + quedan : '';
      });
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-elegir'), function (b) { b.disabled = respondido || !it.esc[+b.dataset.i]; });
    }
    function responderAudio(i) {
      if (respondido || !it.esc[i]) return;
      respondido = true; parar();
      var ok = i === it.bueno;
      if (ok) aciertos++;
      $('_badge').textContent = '✓ ' + aciertos;
      $('_a' + it.bueno).classList.add('tm-ok'); if (!ok) $('_a' + i).classList.add('tm-ko');
      var malos = difSonido(it.p, it.ops[i]);
      feedback(ok, ok ? 'Era el audio <strong>' + LETRAS[it.bueno] + '</strong>.' :
        'Era el audio <strong>' + LETRAS[it.bueno] + '</strong>. El ' + LETRAS[i] + ' suena distinto en ' + dondeFalla(malos, it.t) + '. Abajo tienes escrito lo que suena en el ' + LETRAS[i] + '.');
      $('_estado').textContent = 'Puedes volver a escuchar los audios para compararlos.';
      actualizarAudios();
      // lo que sonaba en el audio elegido, si no era el bueno, con los tiempos distintos en rojo
      if (!ok) partitura([{ lbl: 'Lo que suena en el audio ' + LETRAS[i], p: it.ops[i], rojo: marcas(malos) }]);
      $('_acc').className = 'tm-aud-acc tm-show'; $('_otra').style.display = 'none';
      if (n >= TOTAL) $('_nxt').textContent = 'Ver resultado →';
    }

    /* ---- escribir: tarjetas. puestos = lo escrito, en orden: figuras, '|' (barra de compás) y '||' (doble barra final).
       Las barras las pone el alumno y un compás se puede llenar de más o de menos (Eduardo): todo se corrige al final. */
    var terminado = function () { return puestos[puestos.length - 1] === '||'; };
    var compasVacio = function () { return !puestos.length || puestos[puestos.length - 1] === '|'; };
    function compasesEscritos() {
      var cs = [[]];
      puestos.forEach(function (tk) { if (tk === '|') cs.push([]); else if (tk !== '||') cs[cs.length - 1].push(tk); });
      return cs;
    }
    var tiempos = function (c) { return c.reduce(function (s, f) { return s + FIG[f].d; }, 0); };
    function montarEscribir() {
      $('_cifra').textContent = 'Compás de ' + it.t + '/4 · dos compases';
      $('_corr').style.display = ''; $('_estado').textContent = 'Pulsa para escuchar el dictado.';
      pintarEscrito(); actualizarPlay();
    }
    function sePuede(f) {
      if (respondido || escuchas === 0 || terminado()) return false;
      return FIG[f] ? true : !compasVacio();   // una barra, solo detrás de alguna figura
    }
    function poner(f) { if (!sePuede(f)) return; puestos.push(f); pintarEscrito(); }
    function pintarEscrito(rojo) {
      var esc = $('_esc');
      window.tmNotacion.dibujarAAncho(esc, filaEscrita(puestos, it.t, rojo), ancho(esc), { escala: 1, id: 'dr', alt: 'Lo que llevas escrito' });
      pintarBotones();
      $('_lleva').textContent = respondido ? '' : !escuchas ? 'Las tarjetas se activan al empezar a sonar.' :
        terminado() ? 'Ya puedes corregir.' : 'Al acabar cada compás, pon la barra de compás; al final, la doble barra.';
    }
    function corregirEscrito() {
      if (respondido || escuchas === 0) return;
      if (!terminado()) { $('_lleva').textContent = puestos.length ? 'Te falta la doble barra final: ponla cuando acabes de escribir.' : 'Todavía no has escrito nada.'; return; }
      respondido = true; parar();
      var t = it.t, cs = compasesEscritos(), problemas = [], rojo = {};
      // dónde empieza cada figura escrita (tiempo, contando seguido) y qué elemento de puestos es
      var pos = [], b = 0;
      puestos.forEach(function (tk, i) { if (FIG[tk]) { pos.push({ i: i, b: b, d: FIG[tk].d }); b += FIG[tk].d; } });
      var total = b, plano = { t: t, c: [cs.reduce(function (a, c) { return a.concat(c); }, [])] }, bueno = { t: t, c: [it.p.c[0].concat(it.p.c[1])] };
      if (cs.length === 1) problemas.push('falta la barra de compás entre los dos compases');
      else if (cs.length > 2) problemas.push('has puesto ' + (cs.length - 1) + ' barras de compás, y el dictado tiene dos compases: una barra en medio y la doble barra al final');
      cs.forEach(function (c, k) {
        var n = tiempos(c);
        if (n !== t && cs.length > 1) problemas.push('el compás ' + (k + 1) + ' tiene ' + n + (n === 1 ? ' tiempo' : ' tiempos') + ', y en ' + t + '/4 caben ' + t);
      });
      if (total === 2 * t) {   // cuenta lo que suena: los silencios se pueden escribir juntos o por separado
        var sonido = difSonido(bueno, plano);
        sonido.forEach(function (x) { pos.forEach(function (q) { if (x >= q.b && x < q.b + q.d) rojo[q.i] = 1; }); });
        if (sonido.length) problemas.push((sonido.length === 1 ? 'el ritmo falla en ' : 'el ritmo falla en ' + sonido.length + ' tiempos: ') + dondeFalla(sonido, t) + ' (en rojo)');
      } else problemas.push('en total has escrito ' + total + (total === 1 ? ' tiempo' : ' tiempos') + ', y el dictado dura ' + (2 * t) + ' (dos compases de ' + t + '/4)');
      var ok = !problemas.length;
      if (ok) aciertos++;
      $('_badge').textContent = '✓ ' + aciertos;
      pintarEscrito(rojo);
      $('_corr').style.display = 'none';
      var mayus = function (x) { return x.charAt(0).toUpperCase() + x.slice(1); };
      feedback(ok, ok ? 'Has escrito el ritmo bien, con sus barras.' :
        problemas.map(function (x) { return mayus(x) + '.'; }).join(' ') + ' Debajo tienes el ritmo que sonaba.');
      if (!ok) partitura([{ lbl: 'El ritmo que sonaba', p: it.p }]);
      $('_estado').textContent = ''; actualizarPlay();
      terminar();
    }
    /* La tarjeta de una barra: un trozo de pentagrama con la barra (o la doble barra final) al final, dibujado con Verovio */
    function cartaBarra(div, final) {
      var f = { clave: 'sol', sinClave: true, compases: [[{ key: 'b/4', d: 'q', espacio: true }]] };
      if (final) f.barraFinal = 'end';
      var r2 = window.tmNotacion.dibujarSync(div, f, { escala: 1.0, separacion: 0.3, id: 'drb', alt: final ? 'Doble barra final' : 'Barra de compás' });
      r2.elemento.style.width = '100%'; r2.elemento.style.height = 'auto'; r2.elemento.style.maxHeight = '64px';
    }

    /* ---- comunes */
    function marcas(malos) { var r = {}; malos.forEach(function (k) { r[k] = 1; }); return r; }
    function feedback(ok, txt) {
      var fb = $('_fb');
      fb.className = 'tm-aud-fb tm-show ' + (ok ? 'tm-ok' : 'tm-ko');
      fb.innerHTML = (ok ? '<strong>✓ ¡Correcto!</strong> ' : '<strong>✗ No.</strong> ') + txt;
    }
    function partitura(lista) {
      var part = $('_part');
      part.className = 'tm-aud-part tm-show';
      part.innerHTML = lista.map(function (x, k) { return '<p class="tm-dr-lbl">' + x.lbl + '</p><div id="' + uid + '_pp' + k + '"></div>'; }).join('');
      lista.forEach(function (x, k) { dibujar($('_pp' + k), x.p, ancho(part), { escala: 1, rojo: x.rojo }); });
    }
    function terminar() {
      $('_acc').className = 'tm-aud-acc tm-show'; $('_otra').style.display = '';
      if (n >= TOTAL) $('_nxt').textContent = 'Ver resultado →';
    }
    function actualizarPlay() {
      if (modo === 'leer') { actualizarAudios(); return; }
      var b = $('_play'), quedan = MAX_ESCUCHAS - escuchas;
      if (respondido) { b.style.display = 'none'; return; }
      b.style.display = '';
      b.disabled = sonando >= 0 || quedan <= 0;
      b.textContent = sonando >= 0 ? 'Sonando…' : escuchas === 0 ? '▶ Escuchar' : quedan > 0 ? '▶ Escuchar otra vez (' + quedan + (quedan === 1 ? ' vez más)' : ' veces más)') : 'Sin más escuchas';
      if (modo === 'oir') Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-opt'), function (o) { o.disabled = respondido || escuchas === 0; });
      if (modo === 'escribir') pintarBotones();
    }
    function pintarBotones() {
      var activo = !respondido && escuchas > 0;
      cartas().forEach(function (b) { b.disabled = !sePuede(b.dataset.f); });
      $('_des').disabled = $('_bor').disabled = !activo || !puestos.length;
      $('_corr').disabled = !activo;
      if (activo && !puestos.length) $('_lleva').textContent = 'Al acabar cada compás, pon la barra de compás; al final, la doble barra.';
    }
    function parar() {
      gen++; timers.forEach(clearTimeout); timers = []; sonando = -1;
      if (window.tmPiano && window.tmPiano.stopAll) window.tmPiano.stopAll();
    }
    function tocar(p, cual, gratis) {
      parar();
      var g = gen;
      sonando = cual; actualizarPlay();
      if (!respondido && modo !== 'leer') $('_estado').textContent = 'Suena el dictado…';
      window.tmPiano.playEvents(eventos(p, it.spb)).then(function (d) {
        if (g !== gen) return;
        if (!d) {   // sin sonido: no gasta la escucha
          sonando = -1;
          if (!gratis) { escuchas--; if (modo === 'leer') it.esc[cual]--; }
          actualizarPlay();
          $('_estado').textContent = 'No se ha podido reproducir el sonido. Comprueba la conexión y vuelve a pulsar.';
          return;
        }
        timers.push(setTimeout(function () {
          if (g !== gen) return;
          sonando = -1;
          if (!respondido && modo !== 'leer') $('_estado').textContent = escuchas < MAX_ESCUCHAS ? (modo === 'oir' ? '¿Qué ritmo es?' : 'Escribe el ritmo con las tarjetas.') : 'Ya no quedan escuchas.';
          actualizarPlay();
        }, (duracion(p) * it.spb + 0.5) * 1000));
      });
    }
    function resultado() {
      parar();
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-score"><b>' + aciertos + '/' + TOTAL + '</b><span>' + Math.round(aciertos / TOTAL * 100) + '%</span></div>' +
        '<div class="tm-aud-acc tm-show"><button class="tm-aud-nxt" id="' + uid + '_re" type="button">Volver a empezar</button></div></div>';
      $('_re').addEventListener('click', inicio);
    }
    inicio();
  }

  window.tmDictadoRitmico = tmDictadoRitmico;
  window.tmDictadoRitmicoDatos = { GRUPOS: GRUPOS, FIG: FIG, todos: todos, dictados: dictados, generar: generar, valido: valido, distractores: distractores, mapa: mapa, clave: clave, puede: puede, filaEscrita: filaEscrita, distancia: distancia, eventos: eventos, fila: fila, difSonido: difSonido };   // para las pruebas
})();
