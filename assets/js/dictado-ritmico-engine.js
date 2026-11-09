/* Dictado rítmico — /ejercicios/auditivos/dictado-ritmico/ (índice) y sus páginas, por grupos de figuras.

   Uso: <div id="x"></div><script>tmDictadoRitmico('x', { modo: 'oir' | 'leer' | 'escribir', grupo: 'negras' | 'blancas' | 'puntillo' | 'redondas' | 'negras-c' | 'blancas-c' | 'puntillo-c' | 'redondas-c'
           | 'negras-s' | 'blancas-s' | 'puntillo-s' | 'redondas-s' | 'negras-sc' | 'semicorcheas-sc' | 'blancas-sc' | 'puntillo-sc'
           | 'redondas-sc' });</script>

   Decisiones de Eduardo (04-11-2026):
   - Dos compases de 2/4, 3/4 o 4/4, todo en Sol4 (piano). Sin niveles. Un grupo de figuras por serie de ejercicios:
     negras y silencios de negra; blancas, negras y sus silencios; blancas con puntillo, blancas, negras y sus silencios
     (solo 3/4 y 4/4: en 2/4 no cabe la blanca con puntillo); redondas, blancas con puntillo, blancas, negras y sus
     silencios (solo 4/4). Y los mismos cuatro con grupos de dos corcheas (los «-c»): las corcheas solo van de dos en dos,
     ocupando un tiempo (Eduardo: nunca una ni tres); al escribir, la tarjeta es de una corchea. Y los mismos cuatro con
     grupos de cuatro semicorcheas además de los de corcheas (los «-s»); al escribir, la tarjeta es de una semicorchea.
     Y el silencio de corchea y corchea (los «-sc», 05-11-2026): ocupa un tiempo, la nota a contratiempo; al escribir,
     tarjetas de silencio de corchea y de corchea. Primero con negras y corcheas; después, con semicorcheas, y desde ahí
     las semicorcheas siguen en todos: con blancas, con blancas con puntillo y con redondas.
   - oir: suena el dictado y se elige entre 4 ritmos escritos. leer: se ve el ritmo y se elige entre 4 audios.
     escribir: suena el dictado y se escribe con tarjetas (las figuras del grupo, la barra de compás y la doble barra final),
     como en completar compás. Las barras las pone el alumno y un compás se puede llenar de más: se corrige al final.
   - Antes de cada audio, un compás de entrada con el clic del metrónomo al tempo del dictado, el 1.º acentuado (Eduardo,
     04-11-2026). Con él, el dictado puede empezar con silencio. Se mantienen: no hay más de dos tiempos de silencio seguidos
     (o los del silencio largo del grupo) ni un compás entero en silencio (salvo el 2.º, con el silencio largo del grupo).
   - Los ritmos que no son el bueno se diferencian de él en uno o dos tiempos (y cumplen las mismas reglas).
   10 dictados por test, hasta 3 escuchas (en leer, 3 por audio). Estilos de auditivo-modo-engine.js, tarjetas de
   completar-compas-engine.js y partitura con Verovio (tm-notacion.js). */
(function () {
  'use strict';

  const EN = document.documentElement.lang === 'en';
  const T = (es, en) => EN ? en : es;

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
    n: { d: 1, s: 0, cc: 'n', vf: 'q', nombre: T('negra', 'quarter note') },
    sn: { d: 1, s: 1, cc: 'n', vf: 'q', nombre: T('silencio de negra', 'quarter rest') },
    b: { d: 2, s: 0, cc: 'b', vf: 'h', nombre: T('blanca', 'half note') },
    sb: { d: 2, s: 1, cc: 'b', vf: 'h', nombre: T('silencio de blanca', 'half rest') },
    bp: { d: 3, s: 0, cc: 'bP', vf: 'h', p: 1, nombre: T('blanca con puntillo', 'dotted half note') },
    sbp: { d: 3, s: 1, cc: 'bP', vf: 'h', p: 1, nombre: T('silencio de blanca con puntillo', 'dotted half rest') },
    r: { d: 4, s: 0, cc: 'r', vf: 'w', nombre: T('redonda', 'whole note') },
    sr: { d: 4, s: 1, cc: 'r', vf: 'w', nombre: T('silencio de redonda', 'whole rest') },
    cc: { d: 1, s: 0, notas: 2, cc: 'c', vf: '8', nombre: T('dos corcheas', 'two eighth notes') },          // un tiempo con dos notas, unidas con barra
    ss: { d: 1, s: 0, notas: 4, cc: 'sc', vf: '16', nombre: T('cuatro semicorcheas', 'four sixteenth notes') },  // un tiempo con cuatro notas
    c: { d: 0.5, s: 0, cc: 'c', vf: '8', nombre: T('corchea', 'eighth note') },                        // solo al escribir: tarjeta de una corchea
    s: { d: 0.25, s: 0, cc: 'sc', vf: '16', nombre: T('semicorchea', 'sixteenth note') },                 // solo al escribir: tarjeta de una semicorchea
    scc: { d: 1, s: 0, partes: ['sc', 'c'], nombre: T('silencio de corchea y corchea', 'eighth rest and eighth note') },  // un tiempo: la nota a contratiempo
    sc: { d: 0.5, s: 1, cc: 'c', vf: '8', nombre: T('silencio de corchea', 'eighth rest') }            // solo al escribir (y dentro de scc)
  };
  var SUELTA = { cc: 'c', ss: 's', scc: 'sc' };   // la tarjeta de cada grupo (la corchea de scc ya sale con cc)
  var SILENCIO_DE = { 1: 'sn', 2: 'sb', 3: 'sbp', 4: 'sr' };   // el silencio de cada duración
  /* Un grupo por cada serie de dictados. reparto: cuántos dictados de cada compás en un test de 10 (y de ahí, los compases).
     requiere: las figuras nuevas del grupo; alguna tiene que salir en el dictado. maxSilencio: tiempos de silencio seguidos
     que se permiten (2 si no se dice). vacio: el 2.º compás puede ser entero ese silencio (el 1.º no: empieza con nota).
     prefiere: una figura que saldría poco; sale en alrededor de la mitad de los dictados (ver generar). */
  var GRUPOS = {
    // 2/4 tiene pocos dictados (8 con negras, 7 con blancas): sale 3 veces
    negras: { figs: ['n', 'sn'], texto: T('negras y silencios de negra', 'quarter notes and quarter rests'), reparto: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4] },
    blancas: { figs: ['n', 'sn', 'b', 'sb'], texto: T('blancas, negras y sus silencios', 'half notes, quarter notes and their rests'), requiere: ['b'], reparto: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4] },
    puntillo: { figs: ['n', 'sn', 'b', 'sb', 'bp', 'sbp'], texto: T('blancas con puntillo, blancas, negras y sus silencios', 'dotted half notes, half notes, quarter notes and their rests'), requiere: ['bp', 'sbp'], maxSilencio: 3, vacio: ['sbp'], prefiere: 'sbp', reparto: [3, 3, 3, 3, 3, 4, 4, 4, 4, 4] },
    // la redonda solo cabe en 4/4
    redondas: { figs: ['n', 'sn', 'b', 'sb', 'bp', 'sbp', 'r', 'sr'], texto: T('redondas, blancas con puntillo, blancas, negras y sus silencios', 'whole notes, dotted half notes, half notes, quarter notes and their rests'), requiere: ['r', 'sr'], maxSilencio: 4, vacio: ['sr'], prefiere: 'sr', reparto: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4] },
    // con corcheas: los mismos grupos con el de dos corcheas; el dictado lleva corcheas y la figura nueva (requiere: todas las listas)
    'negras-c': { figs: ['n', 'sn', 'cc'], texto: T('negras, grupos de dos corcheas y silencios de negra', 'quarter notes, groups of two eighth notes and quarter rests'), requiere: [['cc'], ['sn']], reparto: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4] },
    'blancas-c': { figs: ['n', 'sn', 'cc', 'b', 'sb'], texto: T('blancas, negras, grupos de dos corcheas y sus silencios', 'half notes, quarter notes, groups of two eighth notes and their rests'), requiere: [['cc'], ['b', 'sb']], reparto: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4] },
    'puntillo-c': { figs: ['n', 'sn', 'cc', 'b', 'sb', 'bp', 'sbp'], texto: T('blancas con puntillo, blancas, negras, grupos de dos corcheas y sus silencios', 'dotted half notes, half notes, quarter notes, groups of two eighth notes and their rests'), requiere: [['cc'], ['bp', 'sbp']], maxSilencio: 3, vacio: ['sbp'], prefiere: 'sbp', reparto: [3, 3, 3, 3, 3, 4, 4, 4, 4, 4] },
    'redondas-c': { figs: ['n', 'sn', 'cc', 'b', 'sb', 'bp', 'sbp', 'r', 'sr'], texto: T('redondas, blancas con puntillo, blancas, negras, grupos de dos corcheas y sus silencios', 'whole notes, dotted half notes, half notes, quarter notes, groups of two eighth notes and their rests'), requiere: [['cc'], ['r', 'sr']], maxSilencio: 4, vacio: ['sr'], prefiere: 'sr', reparto: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4] },
    // con semicorcheas (Eduardo): los mismos cuatro, con grupos de cuatro semicorcheas y también de dos corcheas
    'negras-s': { figs: ['n', 'sn', 'cc', 'ss'], texto: T('negras, grupos de dos corcheas, grupos de cuatro semicorcheas y silencios de negra', 'quarter notes, groups of two eighth notes, groups of four sixteenth notes and quarter rests'), requiere: [['ss'], ['sn']], reparto: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4] },
    'blancas-s': { figs: ['n', 'sn', 'cc', 'ss', 'b', 'sb'], texto: T('blancas, negras, grupos de corcheas y de semicorcheas y sus silencios', 'half notes, quarter notes, groups of eighth notes and of sixteenth notes and their rests'), requiere: [['ss'], ['b', 'sb']], reparto: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4] },
    'puntillo-s': { figs: ['n', 'sn', 'cc', 'ss', 'b', 'sb', 'bp', 'sbp'], texto: T('blancas con puntillo, blancas, negras, grupos de corcheas y de semicorcheas y sus silencios', 'dotted half notes, half notes, quarter notes, groups of eighth notes and of sixteenth notes and their rests'), requiere: [['ss'], ['bp', 'sbp']], maxSilencio: 3, vacio: ['sbp'], prefiere: 'sbp', reparto: [3, 3, 3, 3, 3, 4, 4, 4, 4, 4] },
    'redondas-s': { figs: ['n', 'sn', 'cc', 'ss', 'b', 'sb', 'bp', 'sbp', 'r', 'sr'], texto: T('redondas, blancas con puntillo, blancas, negras, grupos de corcheas y de semicorcheas y sus silencios', 'whole notes, dotted half notes, half notes, quarter notes, groups of eighth notes and of sixteenth notes and their rests'), requiere: [['ss'], ['r', 'sr']], maxSilencio: 4, vacio: ['sr'], prefiere: 'sr', reparto: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4] },
    // con silencio de corchea y corchea (Eduardo): primero con negras y corcheas, y luego con el resto, como los de corcheas
    // (Eduardo: el 2.º añade las semicorcheas, y desde ahí siguen en todos)
    'negras-sc': { figs: ['n', 'sn', 'cc', 'scc'], texto: T('negras, grupos de dos corcheas, silencio de corchea y corchea y silencios de negra', 'quarter notes, groups of two eighth notes, eighth rest and eighth note, and quarter rests'), requiere: ['scc'], reparto: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4] },
    'semicorcheas-sc': { figs: ['n', 'sn', 'cc', 'scc', 'ss'], texto: T('negras, corcheas, semicorcheas, silencio de corchea y corchea y silencios de negra', 'quarter notes, eighth notes, sixteenth notes, eighth rest and eighth note, and quarter rests'), requiere: [['scc'], ['ss']], reparto: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4] },
    'blancas-sc': { figs: ['n', 'sn', 'cc', 'scc', 'ss', 'b', 'sb'], texto: T('blancas, negras, corcheas, semicorcheas, silencio de corchea y corchea y sus silencios', 'half notes, quarter notes, eighth notes, sixteenth notes, eighth rest and eighth note, and their rests'), requiere: [['scc'], ['b', 'sb']], reparto: [2, 2, 2, 3, 3, 3, 3, 4, 4, 4] },
    'puntillo-sc': { figs: ['n', 'sn', 'cc', 'scc', 'ss', 'b', 'sb', 'bp', 'sbp'], texto: T('blancas con puntillo, blancas, negras, corcheas, semicorcheas, silencio de corchea y corchea y sus silencios', 'dotted half notes, half notes, quarter notes, eighth notes, sixteenth notes, eighth rest and eighth note, and their rests'), requiere: [['scc'], ['bp', 'sbp']], maxSilencio: 3, vacio: ['sbp'], prefiere: 'sbp', reparto: [3, 3, 3, 3, 3, 4, 4, 4, 4, 4] },
    'redondas-sc': { figs: ['n', 'sn', 'cc', 'scc', 'ss', 'b', 'sb', 'bp', 'sbp', 'r', 'sr'], texto: T('redondas, blancas con puntillo, blancas, negras, corcheas, semicorcheas, silencio de corchea y corchea y sus silencios', 'whole notes, dotted half notes, half notes, quarter notes, eighth notes, sixteenth notes, eighth rest and eighth note, and their rests'), requiere: [['scc'], ['r', 'sr']], maxSilencio: 4, vacio: ['sr'], prefiere: 'sr', reparto: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4] }
  };
  var compasesDelGrupo = function (g) { return g.reparto.filter(function (x, i, a) { return a.indexOf(x) === i; }); };
  /* Dónde puede empezar una figura de dos tiempos (b = tiempo del compás, desde 0): en 2/4, en el 1.º; en 3/4, la blanca
     en el 1.º o el 2.º y el silencio de blanca solo en el 1.º (en los tiempos 2-3 se escriben dos silencios de negra);
     en 4/4, en el 1.º o el 3.º, para que se vea la mitad del compás. Las de tres tiempos (Eduardo): en 3/4, el compás
     entero; en 4/4, en el 1.º o el 2.º.
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
  /* Un ritmo es { t, c: [[figuras del compás 1], [del compás 2]] }. mapa16: por semicorchea, 'A' (empieza una nota), 'C'
     (sigue sonando) o 'S' (silencio). mapa: por tiempo, 'A' (empieza una nota), 'D' (dos corcheas), 'Q' (cuatro
     semicorcheas), 'C' o 'S'; un tiempo con otra mezcla (el silencio de corchea y corchea, 'SSAC', o lo que escriba el
     alumno) se queda con lo que dice el mapa16. */
  function mapa16(r) {
    var m = [];
    r.c.forEach(function (c) { c.forEach(function (g) { (FIG[g].partes || [g]).forEach(function (f) {
      var F = FIG[f], n = Math.round(F.d * 4);
      for (var k = 0; k < n; k++) m.push(F.s ? 'S' : (F.notas ? k % (4 / F.notas) === 0 : k === 0) ? 'A' : 'C');
    }); }); });
    return m;
  }
  function mapa(r) {
    var m16 = mapa16(r), m = [];
    for (var i = 0; i + 3 < m16.length; i += 4) {
      var q = m16.slice(i, i + 4).join('');
      m.push(q === 'AAAA' ? 'Q' : q === 'ACAC' ? 'D' : q === 'ACCC' || q === 'CCCC' || q === 'SSSS' ? q.charAt(0) : q);
    }
    return m;
  }
  var clave = function (r) { return r.c.map(function (c) { return c.join(' '); }).join(' | '); };
  function valido(r, g) {
    var m = mapa(r), t = r.t;
    // (Hasta que hubo compás de entrada, también: no empezar con silencio y dos tiempos seguidos con nota para sacar el pulso.
    // Con el metrónomo delante, Eduardo los quitó para que haya más variedad.)
    if (!/[ADQ]/.test(m.slice(0, t).join(''))) return false;        // ningún compás en silencio (el 2.º sí, si el grupo lo permite: vacio)
    if (!/[ADQ]/.test(m.slice(t).join('')) && !(g.vacio && g.vacio.indexOf(r.c[1].join()) >= 0)) return false;
    if (mapa16(r).join('').indexOf(new Array((g.maxSilencio || 2) * 4 + 2).join('S')) >= 0) return false;   // como mucho, maxSilencio tiempos de silencio seguidos
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
  var TODOS = {}, BARRAS = {}, GRANDE = 150000;
  /* Los compases posibles de un grupo, cada uno con su mapa por tiempos */
  function barras(g, t) {
    var k = g.figs.join() + t;
    return BARRAS[k] || (BARRAS[k] = compasesDe(t, g.figs).map(function (c) { return { c: c, m: mapa({ t: t, c: [c] }) }; }));
  }
  /* Con semicorcheas y silencio de corchea a la vez, en 4/4 salen cientos de miles de ritmos (2 s y cientos de MB): esos
     grupos no se enumeran. El dictado se elige al azar entre los compases (y se repite hasta que vale: sale cada dictado con
     la misma probabilidad que al elegirlo de la lista), y las respuestas se buscan entre los compases parecidos a los suyos. */
  var grande = function (g, t) { var n = barras(g, t).length; return n * n > GRANDE; };
  function preparar(g, t) { if (grande(g, t)) barras(g, t); else todos(g, t); }
  function todos(g, t) {
    var k = g.figs.join() + t;
    if (TODOS[k]) return TODOS[k];
    var cs = compasesDe(t, g.figs), out = [];
    cs.forEach(function (a) { cs.forEach(function (b) { var r = { t: t, c: [a, b] }; if (valido(r, g)) { r.m = mapa(r); out.push(r); } }); });   // r.m: el mapa, calculado una vez (con semicorcheas hay decenas de miles)
    return (TODOS[k] = out);
  }
  /* El dictado, además: con negras, algún silencio; en los demás grupos, su figura nueva (con blancas, distinguirla de la
     negra seguida de silencio; exigir también silencio dejaría el 2/4 sin dictados). Las respuestas que no son el bueno no
     necesitan cumplirlo. */
  function esDictado(r, g) {
    var lleva = function (lista) { return r.c.some(function (c) { return c.some(function (f) { return lista.indexOf(f) >= 0; }); }); };
    if (g.requiere) return Array.isArray(g.requiere[0]) ? g.requiere.every(lleva) : lleva(g.requiere);   // varias listas: todas
    return mapa(r).indexOf('S') >= 0;
  }
  function dictados(g, t) { return todos(g, t).filter(function (r) { return esDictado(r, g); }); }
  /* prefiere: una figura que saldría poco (un silencio largo cabe en pocos ritmos). Un tercio de las veces se elige entre los
     dictados que la llevan; el resto, entre todos (que también la pueden llevar): en total, alrededor de la mitad (entre el
     50 y el 56 %, según cuántos dictados del grupo la lleven). */
  function generar(g, t) {
    if (grande(g, t)) return generarGrande(g, t);
    var c = dictados(g, t);
    if (g.prefiere && Math.random() < 1 / 3) {
      var con = c.filter(function (r) { return r.c.some(function (x) { return x.indexOf(g.prefiere) >= 0; }); });
      if (con.length) c = con;
    }
    return c[rnd(c.length)];
  }
  function generarGrande(g, t) {
    var cs = barras(g, t), pref = g.prefiere && Math.random() < 1 / 3, r;
    var lleva = function (q, f) { return q.c[0].indexOf(f) >= 0 || q.c[1].indexOf(f) >= 0; };
    for (var k = 0; k < 200000; k++) {
      if (pref && k === 20000) pref = false;   // si casi no hay dictados con esa figura, de entre todos
      r = { t: t, c: [cs[rnd(cs.length)].c, cs[rnd(cs.length)].c] };
      if ((!pref || lleva(r, g.prefiere)) && valido(r, g) && esDictado(r, g)) break;
    }
    r.m = mapa(r);
    return r;
  }
  var distancia = function (a, b) { var x = a.m || mapa(a), y = b.m || mapa(b), s = 0; for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) s++; return s; };
  /* 3 ritmos válidos lo más parecidos al bueno: uno que cambia un solo tiempo y los otros, uno o dos (si no hay bastantes,
     los siguientes más parecidos). */
  function distractores(r, g) {
    // solo los que cambian uno o dos tiempos (se miran todos, pero sin barajar ni repetir cálculos)
    var por = { 1: [], 2: [] }, lejos = [];
    if (grande(g, r.t)) {   // los ritmos a uno o dos tiempos: un compás parecido al 1.º con otro parecido al 2.º
      var m = r.m || mapa(r), t = r.t, cerca = [[], []];
      barras(g, t).forEach(function (b) {
        for (var i = 0; i < 2; i++) { var d = 0; for (var j = 0; j < t && d < 3; j++) if (b.m[j] !== m[i * t + j]) d++; if (d < 3) cerca[i].push({ c: b.c, d: d }); }
      });
      cerca[0].forEach(function (a) { cerca[1].forEach(function (b) {
        var d = a.d + b.d, q;
        if (d && d < 3 && valido(q = { t: t, c: [a.c, b.c] }, g)) { q.m = mapa(q); por[d].push(q); }
      }); });
    } else
    todos(g, r.t).forEach(function (q) { if (q === r) return; var d = distancia(q, r); if (d === 0) return; if (por[d]) por[d].push(q); else lejos.push(q); });
    var uno = barajar(por[1]);
    var out = uno.slice(0, 1);
    var resto = barajar(uno.slice(1).concat(por[2]));
    out = out.concat(resto.slice(0, 3 - out.length));
    if (out.length < 3) out = out.concat(lejos.sort(function (a, b) { return distancia(a, r) - distancia(b, r); }).slice(0, 3 - out.length));
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
  /* El compás de entrada (Eduardo): un clic de metrónomo en cada tiempo, al tempo del dictado, con el 1.º acentuado */
  function entrada(t, spb) {
    var ev = [];
    for (var k = 0; k < t; k++) ev.push({ click: true, acento: k === 0, when: k * spb, vel: 0.7 });
    return ev;
  }
  /* desde: segundos de retraso (lo que dura el compás de entrada) */
  function eventos(r, spb, desde) {
    var ev = [], d0 = desde || 0;
    lineal(r).forEach(function (x) {
      var F = FIG[x.f];
      if (F.partes) { var o = 0; F.partes.forEach(function (q) { if (!FIG[q].s) ev.push({ midi: SOL4, when: d0 + (x.b + o) * spb, dur: FIG[q].d * 0.9 * spb }); o += FIG[q].d; }); return; }
      if (F.s) return;
      if (F.notas) for (var k = 0; k < F.notas; k++) ev.push({ midi: SOL4, when: d0 + (x.b + k / F.notas) * spb, dur: 0.9 / F.notas * spb });
      else ev.push({ midi: SOL4, when: d0 + x.b * spb, dur: F.d * (F.d < 1 ? 0.9 : 1) * spb - (F.d < 1 ? 0 : 0.1 * spb) });
    });
    return ev;
  }

  /* Partitura. op.rojo[tiempo]: la figura que ocupa ese tiempo, en rojo. op.hasta: lo que falta desde ese tiempo, huecos invisibles. */
  function fila(r, op) {
    op = op || {};
    var cs = [[], []], t = r.t;
    lineal(r).forEach(function (x) {
      if (op.hasta != null && x.b >= op.hasta) return;
      var rojo = false;
      for (var k = 0; k < FIG[x.f].d; k++) if (op.rojo && op.rojo[x.b + k]) rojo = true;
      eventosDe(x.f).forEach(function (e) { if (rojo) e.color = ROJO; cs[x.c].push(e); });
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
  var nBarra = 0;
  /* Lo que se dibuja de una figura: el grupo de dos corcheas son dos corcheas unidas con barra */
  function eventosDe(f) {
    if (FIG[f].partes) return FIG[f].partes.map(figura);   // silencio de corchea y corchea: la corchea con su corchete
    if (!FIG[f].notas) return [figura(f)];
    var b = ++nBarra, out = [];
    for (var k = 0; k < FIG[f].notas; k++) { var e = figura(f); e.barra = b; out.push(e); }
    return out;
  }
  /* Lo que escribe el alumno: figuras y barras ('|' barra de compás, '||' doble barra final), tal cual, aunque un compás
     tenga de más o de menos. rojo[i]: el elemento i, en rojo. Mientras no hay doble barra, el último compás queda abierto
     (sin barra) y, si tiene menos de un compás, se rellena con huecos invisibles para que no se vea encogido. */
  function filaEscrita(tokens, t, rojo) {
    var cs = [[]], fin = false, lleva = 0;
    tokens.forEach(function (tk, i) {
      if (tk === '|') { cs.push([]); lleva = 0; return; }
      if (tk === '||') { fin = true; return; }
      var e = figura(tk), c = cs[cs.length - 1], ant = c[c.length - 1];
      if (rojo && rojo[i]) e.color = ROJO;
      // corcheas y semicorcheas seguidas dentro de un mismo tiempo: unidas con barra (una sola, con su corchete)
      var corta = FIG[tk].d < 1 && !FIG[tk].s, tiempo = Math.floor(lleva + 1e-9);
      if (corta && ant && ant.corta && ant.tiempo === tiempo) { if (ant.barra === undefined) ant.barra = ++nBarra; e.barra = ant.barra; }
      if (corta) { e.corta = true; e.tiempo = tiempo; }
      c.push(e); lleva += FIG[tk].d;
    });
    cs.forEach(function (c) { c.forEach(function (e) { delete e.corta; delete e.tiempo; }); });
    if (!fin && lleva < t) {   // lo que falta del compás, en huecos invisibles
      while ((lleva * 4) % 4) { cs[cs.length - 1].push({ key: 'b/4', d: '16', espacio: true }); lleva += 0.25; }
      for (var b = lleva; b < t; b++) cs[cs.length - 1].push({ key: 'b/4', d: 'q', espacio: true });
    }
    centrarSilencio(cs, t);
    var f = { clave: 'sol', num: t, den: 4, compases: cs };
    if (fin) f.barraFinal = 'end'; else f.sinBarraFinal = true;
    return f;
  }
  function describir(r) {
    return T('Compás de ', 'Time signature ') + r.t + '/4: ' + r.c.map(function (c) { return c.map(function (f) { return FIG[f].nombre; }).join(', '); }).join(' | ');
  }
  var numero = function (x) { return EN ? String(x) : String(x).replace('.', ','); };   // 3,5 tiempos
  function dibujar(div, r, ancho, op) {
    return window.tmNotacion.dibujarAAncho(div, fila(r, op), ancho, { escala: (op && op.escala) || 0.9, id: 'dr', alt: (op && op.alt) || describir(r) });
  }
  var ordinal = function (i) { return (i + 1) + '.º'; };
  /* «el 2.º tiempo del compás 1», «el 3.º y el 4.º tiempo del compás 2», «el 2.º tiempo del compás 1 y el 1.º del compás 2» */
  var y = function (l) { return l.length > 1 ? l.slice(0, -1).join(', ') + T(' y ', ' and ') + l[l.length - 1] : l[0]; };
  function dondeFalla(malos, t) {
    var porCompas = [[], []];
    if (EN) {   // «beat 2 of measure 1», «beats 3 and 4 of measure 2»
      malos.forEach(function (i) { porCompas[Math.floor(i / t)].push(i % t + 1); });
      var partesEn = [];
      porCompas.forEach(function (l, c) { if (l.length) partesEn.push((l.length > 1 ? 'beats ' : 'beat ') + y(l) + ' of measure ' + (c + 1)); });
      return y(partesEn);
    }
    malos.forEach(function (i) { porCompas[Math.floor(i / t)].push('el ' + ordinal(i % t)); });
    var partes = [];
    porCompas.forEach(function (l, c) { if (l.length) partes.push(y(l) + (partes.length ? '' : ' tiempo') + ' del compás ' + (c + 1)); });
    return y(partes);
  }
  /* Tiempos en los que dos ritmos suenan distinto: se compara corchea a corchea */
  function difSonido(a, b) {
    var x = mapa16(a), y2 = mapa16(b), out = [];
    x.forEach(function (v, i) { if (v !== y2[i] && out.indexOf(Math.floor(i / 4)) < 0) out.push(Math.floor(i / 4)); });
    return out;
  }

  var CSS = [
    '.tm-aud-wrap .tm-dr-cifra{text-align:center;font-size:.9rem;color:#555;margin:-6px 0 12px}',
    '.tm-aud-wrap .tm-dr-opts{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '.tm-aud-wrap .tm-dr-opts.tm-dr-una{grid-template-columns:1fr}',
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
    '@media(max-width:480px){.tm-aud-wrap .tm-dr-pal .tm-cc-carta small{font-size:.6rem;letter-spacing:-.01em}.tm-aud-wrap .tm-dr-pal{gap:6px}.tm-aud-wrap .tm-dr-pal .tm-cc-carta{flex:0 0 calc(25% - 5px);min-width:0;max-width:84px;width:auto;padding:4px 3px 2px}}',
    '@media(max-width:380px){.tm-aud-wrap .tm-dr-audios{grid-template-columns:1fr}}'
  ].join('');

  function textos(g) {
    return {
      oir: { tit: T('Dictado rítmico: ¿qué ritmo suena?', 'Rhythmic dictation: which rhythm is playing?'), sub: T('Suena un ritmo de dos compases en la nota Sol, con ' + g.texto + '. Elige cuál de los cuatro ritmos escritos es el que suena. Puedes escucharlo hasta ' + MAX_ESCUCHAS + ' veces y responder mientras suena.', 'A two-measure rhythm plays on the note G, with ' + g.texto + '. Choose which of the four written rhythms is the one you hear. You can listen up to ' + MAX_ESCUCHAS + ' times and answer while it plays.') },
      leer: { tit: T('Lectura rítmica: ¿qué audio es?', 'Rhythm reading: which audio is it?'), sub: T('Verás un ritmo de dos compases con ' + g.texto + '. Escucha los cuatro audios (cada uno hasta ' + MAX_ESCUCHAS + ' veces) y elige el que suena como el ritmo escrito.', 'You will see a two-measure rhythm with ' + g.texto + '. Listen to the four audios (each up to ' + MAX_ESCUCHAS + ' times) and choose the one that sounds like the written rhythm.') },
      escribir: { tit: T('Dictado rítmico: escribe el ritmo', 'Rhythmic dictation: write the rhythm'), sub: T('Suena un ritmo de dos compases en la nota Sol, con ' + g.texto + '. Escríbelo con las tarjetas, con su barra de compás y la doble barra final, y pulsa Corregir. Puedes escucharlo hasta ' + MAX_ESCUCHAS + ' veces y escribir mientras suena.', 'A two-measure rhythm plays on the note G, with ' + g.texto + '. Write it with the cards, with its bar line and the final double bar line, and press Check. You can listen up to ' + MAX_ESCUCHAS + ' times and write while it plays.') }
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
        '<h2 class="tm-aud-tit">' + TEXTOS[modo].tit + ' — ' + TOTAL + T(' dictados', ' dictations') + '</h2>' +
        '<p class="tm-aud-sub">' + TEXTOS[modo].sub + T(' Antes de cada audio suena un compás de metrónomo al mismo tempo, para que sepas la velocidad. Compases de ', ' Before each audio, one measure of metronome clicks plays at the same tempo, so you know the speed. Measures of ') + compasesDelGrupo(grupo).map(function (x) { return x + '/4'; }).join(', ').replace(/, ([^,]*)$/, T(' y $1', ' and $1')) + T('. Sube el volumen o usa auriculares.', '. Turn up the volume or use headphones.') + '</p>' +
        '<button class="tm-aud-btnplay" id="' + uid + '_go" type="button">' + T('Empezar', 'Start') + '</button></div></div>';
      $('_go').addEventListener('click', function () {
        $('_go').disabled = true; $('_go').textContent = T('Cargando…', 'Loading…');
        window.tmNotacion.listo().then(function () {
          compasesDelGrupo(grupo).forEach(function (x) { preparar(grupo, x); });   // los ritmos posibles, ahora (con semicorcheas, decenas de miles)
          n = 0; aciertos = 0; vistos = {};
          var base = grupo.reparto;   // sin el mismo compás tres veces seguidas
          orden = barajar(base);
          if (compasesDelGrupo(grupo).length > 1)   // con un solo compás (redondas: todo 4/4) no hay nada que evitar
            for (var g = 0; g < 50; g++) { orden = barajar(base); if (!orden.some(function (x, i) { return i >= 2 && x === orden[i - 1] && x === orden[i - 2]; })) break; }
          montar(); siguiente();
        }, function () { $('_go').textContent = T('No se ha podido cargar. Recarga la página.', 'Could not load. Reload the page.'); });
      });
    }

    function cabecera() {
      return '<div class="tm-aud-head"><div class="tm-aud-prog"><div class="tm-aud-bar"><div class="tm-aud-fill" id="' + uid + '_fill"></div></div>' +
        '<span class="tm-aud-cnt" id="' + uid + '_cnt"></span></div><span class="tm-aud-badge" id="' + uid + '_badge">✓ 0</span></div>';
    }
    var reproductor = '<div class="tm-aud-play"><button class="tm-aud-btnplay" id="' + uid + '_play" type="button"></button>' +
      '<p class="tm-aud-estado" id="' + uid + '_estado" aria-live="polite"></p></div>';
    var pie = '<div class="tm-aud-fb" id="' + uid + '_fb"></div><div class="tm-aud-part" id="' + uid + '_part"></div>' +
      '<div class="tm-aud-acc" id="' + uid + '_acc"><button class="tm-aud-sec" id="' + uid + '_otra" type="button">' + T('▶ Escuchar otra vez', '▶ Listen again') + '</button>' +
      '<button class="tm-aud-nxt" id="' + uid + '_nxt" type="button">' + T('Siguiente →', 'Next →') + '</button></div>';

    function montar() {
      var medio;
      if (modo === 'oir') medio = reproductor + '<p class="tm-dr-cifra" id="' + uid + '_cifra"></p><div class="tm-dr-opts' + (grupo.figs.indexOf('ss') >= 0 ? ' tm-dr-una' : '') + '" id="' + uid + '_opts" role="group" aria-label="' + T('Ritmos', 'Rhythms') + '"></div>';   // con semicorcheas, una columna: se lee mejor
      else if (modo === 'leer') medio = '<div class="tm-dr-ritmo" id="' + uid + '_ritmo"></div><p class="tm-aud-estado" id="' + uid + '_estado" aria-live="polite"></p><div class="tm-dr-audios" id="' + uid + '_opts" role="group" aria-label="' + T('Audios', 'Audio clips') + '"></div>';
      else medio = reproductor + '<p class="tm-dr-cifra" id="' + uid + '_cifra"></p><div class="tm-dr-esc" id="' + uid + '_esc"></div>' +
        '<div class="tm-dr-pal" role="group" aria-label="' + T('Tarjetas', 'Cards') + '">' + grupo.figs.map(function (f) { return SUELTA[f] || f; }).concat(['|', '||']).map(function (f) {
          return '<button type="button" class="tm-cc-carta" data-f="' + f + '"><span class="tm-dr-mini"></span><small>' + (FIG[f] ? FIG[f].nombre : f === '|' ? T('barra de compás', 'bar line') : T('doble barra final', 'final double bar line')) + '</small></button>';
        }).join('') + '</div>' +
        '<div class="tm-dr-herr"><button type="button" id="' + uid + '_des">' + T('↶ Deshacer', '↶ Undo') + '</button><button type="button" id="' + uid + '_bor">' + T('Borrar todo', 'Clear all') + '</button></div>' +
        '<p class="tm-dr-lleva" id="' + uid + '_lleva"></p><button type="button" class="tm-dr-corr" id="' + uid + '_corr">' + T('Corregir', 'Check') + '</button>';
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
      // con semicorcheas, más despacio (Eduardo): entre 60 y 72; el resto, entre 72 y 90
      it = { t: t, p: p, bpm: grupo.figs.indexOf('ss') >= 0 ? 60 + rnd(13) : 72 + rnd(19) };
      it.spb = 60 / it.bpm;
      $('_fill').style.width = ((n - 1) / TOTAL * 100) + '%';
      $('_cnt').textContent = T('Dictado ' + n + ' de ' + TOTAL, 'Dictation ' + n + ' of ' + TOTAL);
      $('_fb').className = 'tm-aud-fb'; $('_part').className = 'tm-aud-part'; $('_acc').className = 'tm-aud-acc';
      if (modo === 'oir') montarOir();
      else if (modo === 'leer') montarLeer();
      else montarEscribir();
    }

    /* ---- oír: 4 ritmos escritos */
    function montarOir() {
      var ops = barajar([it.p].concat(distractores(it.p, grupo)));
      it.ops = ops; it.bueno = ops.indexOf(it.p);
      $('_cifra').textContent = T('Compás de ' + it.t + '/4', 'Time signature: ' + it.t + '/4');
      var cont = $('_opts');
      cont.innerHTML = ops.map(function (q, i) {
        return '<button type="button" class="tm-dr-opt" data-i="' + i + '" disabled><span class="tm-dr-let">' + LETRAS[i] + '</span><span class="tm-dr-dib" id="' + uid + '_o' + i + '"></span></button>';
      }).join('');
      var w = ancho(cont.querySelector('.tm-dr-dib'));
      ops.forEach(function (q, i) { dibujar($('_o' + i), q, w, { escala: 0.8, alt: T('Ritmo ', 'Rhythm ') + LETRAS[i] + '. ' + describir(q) }); });
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-dr-opt'), function (b) { b.addEventListener('click', function () { responderOpcion(+b.dataset.i); }); });
      $('_estado').textContent = T('Pulsa para escuchar el dictado.', 'Press to listen to the dictation.');
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
      feedback(ok, ok ? T('Era el ritmo <strong>' + LETRAS[it.bueno] + '</strong>.', 'It was rhythm <strong>' + LETRAS[it.bueno] + '</strong>.') :
        T('Era el ritmo <strong>' + LETRAS[it.bueno] + '</strong>. El ' + LETRAS[i] + ' se diferencia en ' + dondeFalla(malos, it.t) + '.',
          'It was rhythm <strong>' + LETRAS[it.bueno] + '</strong>. ' + LETRAS[i] + ' differs at ' + dondeFalla(malos, it.t) + '.'));
      $('_estado').textContent = ''; actualizarPlay();
      terminar();
    }

    /* ---- leer: el ritmo escrito y 4 audios */
    function montarLeer() {
      var ops = barajar([it.p].concat(distractores(it.p, grupo)));
      it.ops = ops; it.bueno = ops.indexOf(it.p); it.esc = [0, 0, 0, 0];
      var r = $('_ritmo');
      dibujar(r, it.p, ancho(r), { escala: 1, alt: T('El ritmo escrito. ', 'The written rhythm. ') + describir(it.p) });
      var cont = $('_opts');
      cont.innerHTML = ops.map(function (q, i) {
        return '<div class="tm-dr-audio" id="' + uid + '_a' + i + '"><b>Audio ' + LETRAS[i] + '</b>' +
          '<button type="button" class="tm-dr-oir" data-i="' + i + '">' + T('▶ Escuchar', '▶ Listen') + '</button>' +
          '<span class="tm-dr-cuenta" id="' + uid + '_c' + i + '"></span>' +
          '<button type="button" class="tm-dr-elegir" data-i="' + i + '" disabled>' + T('Es este', 'This one') + '</button></div>';
      }).join('');
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-dr-oir'), function (b) {
        b.addEventListener('click', function () {
          var i = +b.dataset.i;
          if (respondido) tocar(ops[i], i, true);   // después de responder, para comparar: sin límite
          else if (it.esc[i] < MAX_ESCUCHAS) { it.esc[i]++; escuchas++; tocar(ops[i], i); }
        });
      });
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-dr-elegir'), function (b) { b.addEventListener('click', function () { responderAudio(+b.dataset.i); }); });
      $('_estado').textContent = T('Escucha los audios y elige el que suena como el ritmo escrito.', 'Listen to the audios and choose the one that sounds like the written rhythm.');
      actualizarAudios();
    }
    function actualizarAudios() {
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-oir'), function (b) {
        var i = +b.dataset.i, quedan = MAX_ESCUCHAS - it.esc[i];
        b.disabled = respondido ? sonando >= 0 : (sonando >= 0 || quedan <= 0);
        b.textContent = sonando === i ? T('Sonando…', 'Playing…') : respondido ? T('▶ Escuchar', '▶ Listen') : quedan <= 0 ? T('Sin más escuchas', 'No more listens') : T('▶ Escuchar', '▶ Listen');
        $('_c' + i).textContent = respondido ? '' : it.esc[i] ? T('Quedan ' + quedan, quedan + ' left') : '';
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
      feedback(ok, ok ? T('Era el audio <strong>' + LETRAS[it.bueno] + '</strong>.', 'It was audio <strong>' + LETRAS[it.bueno] + '</strong>.') :
        T('Era el audio <strong>' + LETRAS[it.bueno] + '</strong>. El ' + LETRAS[i] + ' suena distinto en ' + dondeFalla(malos, it.t) + '. Abajo tienes escrito lo que suena en el ' + LETRAS[i] + '.',
          'It was audio <strong>' + LETRAS[it.bueno] + '</strong>. ' + LETRAS[i] + ' sounds different at ' + dondeFalla(malos, it.t) + '. Below, what plays in ' + LETRAS[i] + ' is written out.'));
      $('_estado').textContent = T('Puedes volver a escuchar los audios para compararlos.', 'You can listen to the audios again to compare them.');
      actualizarAudios();
      // lo que sonaba en el audio elegido, si no era el bueno, con los tiempos distintos en rojo
      if (!ok) partitura([{ lbl: T('Lo que suena en el audio ', 'What plays in audio ') + LETRAS[i], p: it.ops[i], rojo: marcas(malos) }]);
      $('_acc').className = 'tm-aud-acc tm-show'; $('_otra').style.display = 'none';
      if (n >= TOTAL) $('_nxt').textContent = T('Ver resultado →', 'See result →');
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
      $('_cifra').textContent = T('Compás de ' + it.t + '/4 · dos compases', 'Time signature: ' + it.t + '/4 · two measures');
      $('_corr').style.display = ''; $('_estado').textContent = T('Pulsa para escuchar el dictado.', 'Press to listen to the dictation.');
      pintarEscrito(); actualizarPlay();
    }
    function sePuede(f) {
      if (respondido || escuchas === 0 || terminado()) return false;
      return FIG[f] ? true : !compasVacio();   // una barra, solo detrás de alguna figura
    }
    function poner(f) { if (!sePuede(f)) return; puestos.push(f); pintarEscrito(); }
    function pintarEscrito(rojo) {
      var esc = $('_esc');
      window.tmNotacion.dibujarAAncho(esc, filaEscrita(puestos, it.t, rojo), ancho(esc), { escala: 1, id: 'dr', alt: T('Lo que llevas escrito', 'What you have written so far') });
      pintarBotones();
      $('_lleva').textContent = respondido ? '' : !escuchas ? T('Las tarjetas se activan al empezar a sonar.', 'The cards activate when the audio starts playing.') :
        terminado() ? T('Ya puedes corregir.', 'You can check now.') : T('Al acabar cada compás, pon la barra de compás; al final, la doble barra.', 'At the end of each measure, put a bar line; at the end, the double bar line.');
    }
    function corregirEscrito() {
      if (respondido || escuchas === 0) return;
      if (!terminado()) { $('_lleva').textContent = puestos.length ? T('Te falta la doble barra final: ponla cuando acabes de escribir.', 'The final double bar line is missing: add it when you finish writing.') : T('Todavía no has escrito nada.', 'You have not written anything yet.'); return; }
      respondido = true; parar();
      var t = it.t, cs = compasesEscritos(), problemas = [], rojo = {};
      // dónde empieza cada figura escrita (tiempo, contando seguido) y qué elemento de puestos es
      var pos = [], b = 0;
      puestos.forEach(function (tk, i) { if (FIG[tk]) { pos.push({ i: i, b: b, d: FIG[tk].d }); b += FIG[tk].d; } });
      var total = b, plano = { t: t, c: [cs.reduce(function (a, c) { return a.concat(c); }, [])] }, bueno = { t: t, c: [it.p.c[0].concat(it.p.c[1])] };
      if (cs.length === 1) problemas.push(T('falta la barra de compás entre los dos compases', 'the bar line between the two measures is missing'));
      else if (cs.length > 2) problemas.push(T('has puesto ' + (cs.length - 1) + ' barras de compás, y el dictado tiene dos compases: una barra en medio y la doble barra al final', 'you put ' + (cs.length - 1) + ' bar lines, and the dictation has two measures: one bar line in the middle and the double bar line at the end'));
      cs.forEach(function (c, k) {
        var n = tiempos(c);
        if (n !== t && cs.length > 1) problemas.push(T('el compás ' + (k + 1) + ' tiene ' + numero(n) + (n === 1 ? ' tiempo' : ' tiempos') + ', y en ' + t + '/4 caben ' + t, 'measure ' + (k + 1) + ' has ' + numero(n) + (n === 1 ? ' beat' : ' beats') + ', and ' + t + '/4 holds ' + t));
      });
      if (total === 2 * t) {   // cuenta lo que suena: los silencios se pueden escribir juntos o por separado
        var sonido = difSonido(bueno, plano);
        sonido.forEach(function (x) { pos.forEach(function (q) { if (q.b < x + 1 && q.b + q.d > x) rojo[q.i] = 1; }); });   // la figura toca ese tiempo
        if (sonido.length) problemas.push(T((sonido.length === 1 ? 'el ritmo falla en ' : 'el ritmo falla en ' + sonido.length + ' tiempos: ') + dondeFalla(sonido, t) + ' (en rojo)',
          (sonido.length === 1 ? 'the rhythm is wrong at ' : 'the rhythm is wrong in ' + sonido.length + ' beats: ') + dondeFalla(sonido, t) + ' (in red)'));
      } else problemas.push(T('en total has escrito ' + numero(total) + (total === 1 ? ' tiempo' : ' tiempos') + ', y el dictado dura ' + (2 * t) + ' (dos compases de ' + t + '/4)', 'in total you wrote ' + numero(total) + (total === 1 ? ' beat' : ' beats') + ', and the dictation lasts ' + (2 * t) + ' (two measures of ' + t + '/4)'));
      var ok = !problemas.length;
      if (ok) aciertos++;
      $('_badge').textContent = '✓ ' + aciertos;
      pintarEscrito(rojo);
      $('_corr').style.display = 'none';
      var mayus = function (x) { return x.charAt(0).toUpperCase() + x.slice(1); };
      feedback(ok, ok ? T('Has escrito el ritmo bien, con sus barras.', 'You wrote the rhythm correctly, with its bar lines.') :
        problemas.map(function (x) { return mayus(x) + '.'; }).join(' ') + T(' Debajo tienes el ritmo que sonaba.', ' Below is the rhythm that played.'));
      if (!ok) partitura([{ lbl: T('El ritmo que sonaba', 'The rhythm that played'), p: it.p }]);
      $('_estado').textContent = ''; actualizarPlay();
      terminar();
    }
    /* La tarjeta de una barra: un trozo de pentagrama con la barra (o la doble barra final) al final, dibujado con Verovio */
    function cartaBarra(div, final) {
      var f = { clave: 'sol', sinClave: true, compases: [[{ key: 'b/4', d: 'q', espacio: true }]] };
      if (final) f.barraFinal = 'end';
      var r2 = window.tmNotacion.dibujarSync(div, f, { escala: 1.0, separacion: 0.3, id: 'drb', alt: final ? T('Doble barra final', 'Final double bar line') : T('Barra de compás', 'Bar line') });
      r2.elemento.style.width = '100%'; r2.elemento.style.height = 'auto'; r2.elemento.style.maxHeight = '64px';
    }

    /* ---- comunes */
    function marcas(malos) { var r = {}; malos.forEach(function (k) { r[k] = 1; }); return r; }
    function feedback(ok, txt) {
      var fb = $('_fb');
      fb.className = 'tm-aud-fb tm-show ' + (ok ? 'tm-ok' : 'tm-ko');
      fb.innerHTML = (ok ? '<strong>' + T('✓ ¡Correcto!', '✓ Correct!') + '</strong> ' : '<strong>' + T('✗ No.', '✗ Not quite.') + '</strong> ') + txt;
    }
    function partitura(lista) {
      var part = $('_part');
      part.className = 'tm-aud-part tm-show';
      part.innerHTML = lista.map(function (x, k) { return '<p class="tm-dr-lbl">' + x.lbl + '</p><div id="' + uid + '_pp' + k + '"></div>'; }).join('');
      lista.forEach(function (x, k) { dibujar($('_pp' + k), x.p, ancho(part), { escala: 1, rojo: x.rojo }); });
    }
    function terminar() {
      $('_acc').className = 'tm-aud-acc tm-show'; $('_otra').style.display = '';
      if (n >= TOTAL) $('_nxt').textContent = T('Ver resultado →', 'See result →');
    }
    function actualizarPlay() {
      if (modo === 'leer') { actualizarAudios(); return; }
      var b = $('_play'), quedan = MAX_ESCUCHAS - escuchas;
      if (respondido) { b.style.display = 'none'; return; }
      b.style.display = '';
      b.disabled = sonando >= 0 || quedan <= 0;
      b.textContent = sonando >= 0 ? T('Sonando…', 'Playing…') : escuchas === 0 ? T('▶ Escuchar', '▶ Listen') : quedan > 0 ? T('▶ Escuchar otra vez (' + quedan + (quedan === 1 ? ' vez más)' : ' veces más)'), '▶ Listen again (' + quedan + (quedan === 1 ? ' more time)' : ' more times)')) : T('Sin más escuchas', 'No more listens');
      if (modo === 'oir') Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-opt'), function (o) { o.disabled = respondido || escuchas === 0; });
      if (modo === 'escribir') pintarBotones();
    }
    function pintarBotones() {
      var activo = !respondido && escuchas > 0;
      cartas().forEach(function (b) { b.disabled = !sePuede(b.dataset.f); });
      $('_des').disabled = $('_bor').disabled = !activo || !puestos.length;
      $('_corr').disabled = !activo;
      if (activo && !puestos.length) $('_lleva').textContent = T('Al acabar cada compás, pon la barra de compás; al final, la doble barra.', 'At the end of each measure, put a bar line; at the end, the double bar line.');
    }
    function parar() {
      gen++; timers.forEach(clearTimeout); timers = []; sonando = -1;
      if (window.tmPiano && window.tmPiano.stopAll) window.tmPiano.stopAll();
    }
    function tocar(p, cual, gratis) {
      parar();
      var g = gen;
      sonando = cual; actualizarPlay();
      if (!respondido && modo !== 'leer') $('_estado').textContent = T('Compás de entrada…', 'Count-in measure…');
      window.tmPiano.playEvents(entrada(it.t, it.spb).concat(eventos(p, it.spb, it.t * it.spb))).then(function (d) {
        if (g !== gen) return;
        if (!d) {   // sin sonido: no gasta la escucha
          sonando = -1;
          if (!gratis) { escuchas--; if (modo === 'leer') it.esc[cual]--; }
          actualizarPlay();
          $('_estado').textContent = T('No se ha podido reproducir el sonido. Comprueba la conexión y vuelve a pulsar.', 'The sound could not be played. Check your connection and press again.');
          return;
        }
        if (!respondido && modo !== 'leer') timers.push(setTimeout(function () { if (g === gen && !respondido) $('_estado').textContent = T('Suena el dictado…', 'The dictation is playing…'); }, it.t * it.spb * 1000));
        timers.push(setTimeout(function () {
          if (g !== gen) return;
          sonando = -1;
          if (!respondido && modo !== 'leer') $('_estado').textContent = escuchas < MAX_ESCUCHAS ? (modo === 'oir' ? T('¿Qué ritmo es?', 'Which rhythm is it?') : T('Escribe el ritmo con las tarjetas.', 'Write the rhythm with the cards.')) : T('Ya no quedan escuchas.', 'No listens left.');
          actualizarPlay();
        }, ((duracion(p) + it.t) * it.spb + 0.5) * 1000));
      });
    }
    function resultado() {
      parar();
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-score"><b>' + aciertos + '/' + TOTAL + '</b><span>' + Math.round(aciertos / TOTAL * 100) + '%</span></div>' +
        '<div class="tm-aud-acc tm-show"><button class="tm-aud-nxt" id="' + uid + '_re" type="button">' + T('Volver a empezar', 'Start over') + '</button></div></div>';
      $('_re').addEventListener('click', inicio);
    }
    inicio();
  }

  window.tmDictadoRitmico = tmDictadoRitmico;
  window.tmDictadoRitmicoDatos = { GRUPOS: GRUPOS, FIG: FIG, todos: todos, dictados: dictados, generar: generar, grande: grande, barras: barras, umbral: function (n) { GRANDE = n; }, valido: valido, distractores: distractores, mapa: mapa, mapa16: mapa16, clave: clave, puede: puede, filaEscrita: filaEscrita, distancia: distancia, eventos: eventos, fila: fila, difSonido: difSonido };   // para las pruebas
})();
