/* Dictado rítmico — /ejercicios/auditivos/dictado-ritmico/ (índice) y sus tres ejercicios.

   Uso: <div id="x"></div><script>tmDictadoRitmico('x', { modo: 'oir' | 'leer' | 'escribir' });</script>
   (opciones.grupo, de las páginas antiguas por grupos: se abre el panel con las figuras de ese grupo).

   Decisiones de Eduardo:
   - (10-11-2026) Cada uno elige las figuras, silencios y ritmos que pueden salir, y los compases: una casilla por cada uno.
     Niveles rápidos con las combinaciones de siempre. La selección va en la dirección (?r=n.sn.cc&c=234), para que un
     profesor pueda mandarla, y se recuerda entre los tres ejercicios.
   - Compases simples (2/4, 3/4, 4/4): ritmos hasta grupos de semicorcheas (cuatro; corchea y dos; dos y corchea;
     semicorchea, corchea y semicorchea) y tresillos de negras, de corcheas y de semicorcheas, también con un silencio dentro.
   - Compases compuestos (6/8, 9/8, 12/8), en las mismas páginas con un selector arriba: negra con puntillo, blanca con
     puntillo, redonda con puntillo y sus silencios, ritmos de corcheas y de semicorcheas de un tiempo, dosillo (2 corcheas
     en el lugar de 3) y cuatrillo como en la tradición española (4 semicorcheas en el lugar de 6: un tiempo).
   - Dos compases, todo en Sol4 (piano). Antes de cada audio, un compás de entrada con el clic del metrónomo al tempo del
     dictado (un clic por tiempo, el 1.º acentuado). Con semicorcheas, más despacio.
   - oir: suena el dictado y se elige entre 4 ritmos escritos. leer: se ve el ritmo y se elige entre 4 audios. escribir:
     suena y se escribe NOTA A NOTA con tarjetas (las figuras sueltas que forman los ritmos elegidos, la barra de compás y
     la doble barra final). Las corcheas y semicorcheas de un mismo tiempo se unen solas con barra, y las figuras de un
     grupo de valoración especial que llenan su sitio se agrupan solas con su número. Las barras las pone el alumno y un
     compás se puede llenar de más: se corrige al final, contando lo que suena (un silencio de blanca o dos de negra valen igual).
   - No hay más de dos tiempos de silencio seguidos (o los del silencio más largo elegido) ni un compás entero en silencio
     (salvo el 2.º, con un silencio de compás entero). Los ritmos que no son el bueno cambian uno o dos tiempos.
   10 dictados por test, hasta 3 escuchas (en leer, 3 por audio). Estilos de auditivo-modo-engine.js y partitura con
   Verovio (tm-notacion.js, grupos de valoración especial con tm-mei.js). */
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

  /* Compases: t es el numerador (2, 3, 4 sobre 4; 6, 9, 12 sobre 8). Todo se mide en partes: la negra son 24 (caben la
     semicorchea, 6, y las de tresillo, 16, 8 y 4) y el tiempo del compás compuesto, la negra con puntillo, 36 (caben las
     de dosillo, 18, y las de cuatrillo, 9). */
  var compuesto = function (t) { return t > 4; };
  var NB = function (t) { return compuesto(t) ? t / 3 : t; };     // tiempos del compás
  var BT = function (t) { return compuesto(t) ? 36 : 24; };       // partes de un tiempo
  var cifra = function (t) { return t + (compuesto(t) ? '/8' : '/4'); };
  var COMPASES = { s: [2, 3, 4], c: [6, 9, 12] };
  var tipoDe = function (t) { return compuesto(t) ? 'c' : 's'; };

  /* Figuras sueltas (las tarjetas al escribir): u = partes que dura, s = silencio, vf = la figura en tm-mei.js, p = puntillo,
     tup = el grupo de valoración especial al que pertenece (TUP). */
  var FIG = {
    rp: { u: 144, vf: 'w', p: 1, nombre: T('redonda con puntillo', 'dotted whole note') },
    r: { u: 96, vf: 'w', nombre: T('redonda', 'whole note') },
    bp: { u: 72, vf: 'h', p: 1, nombre: T('blanca con puntillo', 'dotted half note') },
    b: { u: 48, vf: 'h', nombre: T('blanca', 'half note') },
    np: { u: 36, vf: 'q', p: 1, nombre: T('negra con puntillo', 'dotted quarter note') },
    n: { u: 24, vf: 'q', nombre: T('negra', 'quarter note') },
    cp: { u: 18, vf: '8', p: 1, nombre: T('corchea con puntillo', 'dotted eighth note') },
    c: { u: 12, vf: '8', nombre: T('corchea', 'eighth note') },
    s: { u: 6, vf: '16', nombre: T('semicorchea', 'sixteenth note') },
    n3: { u: 16, vf: 'q', tup: 'n', nombre: T('negra de tresillo', 'triplet quarter note') },
    c3: { u: 8, vf: '8', tup: 'c', nombre: T('corchea de tresillo', 'triplet eighth note') },
    s3: { u: 4, vf: '16', tup: 's', nombre: T('semicorchea de tresillo', 'triplet sixteenth note') },
    c2: { u: 18, vf: '8', tup: 'd', nombre: T('corchea de dosillo', 'duplet eighth note') },
    s4: { u: 9, vf: '16', tup: 'q', nombre: T('semicorchea de cuatrillo', 'quadruplet sixteenth note') },
    srp: { u: 144, vf: 'w', p: 1, s: 1, nombre: T('silencio de redonda con puntillo', 'dotted whole rest') },
    sr: { u: 96, vf: 'w', s: 1, nombre: T('silencio de redonda', 'whole rest') },
    sbp: { u: 72, vf: 'h', p: 1, s: 1, nombre: T('silencio de blanca con puntillo', 'dotted half rest') },
    sb: { u: 48, vf: 'h', s: 1, nombre: T('silencio de blanca', 'half rest') },
    snp: { u: 36, vf: 'q', p: 1, s: 1, nombre: T('silencio de negra con puntillo', 'dotted quarter rest') },
    sn: { u: 24, vf: 'q', s: 1, nombre: T('silencio de negra', 'quarter rest') },
    sc: { u: 12, vf: '8', s: 1, nombre: T('silencio de corchea', 'eighth rest') },
    sn3: { u: 16, vf: 'q', s: 1, tup: 'n', nombre: T('silencio de negra de tresillo', 'triplet quarter rest') },
    sc3: { u: 8, vf: '8', s: 1, tup: 'c', nombre: T('silencio de corchea de tresillo', 'triplet eighth rest') }
  };
  var ORDEN_FIG = ['rp', 'r', 'bp', 'b', 'np', 'n', 'cp', 'c', 's', 'n3', 'c3', 's3', 'c2', 's4', 'srp', 'sr', 'sbp', 'sb', 'snp', 'sn', 'sc', 'sn3', 'sc3'];
  /* Grupos de valoración especial: lo que ocupa el grupo entero y su número (num en el lugar de base). Tradición española:
     tresillo 3:2, dosillo 2:3, cuatrillo 4:6. */
  var TUP = { n: { tot: 48, num: 3, base: 2 }, c: { tot: 24, num: 3, base: 2 }, s: { tot: 12, num: 3, base: 2 }, d: { tot: 36, num: 2, base: 3 }, q: { tot: 36, num: 4, base: 6 } };

  /* Celdas: lo que sale en un dictado, siempre de tiempos enteros del compás para el que están, hecho de figuras (p). */
  var CEL = {
    n: ['n'], sn: ['sn'], b: ['b'], sb: ['sb'], bp: ['bp'], sbp: ['sbp'], r: ['r'], sr: ['sr'],
    cc: ['c', 'c'], scc: ['sc', 'c'], csc: ['c', 'sc'],
    ss: ['s', 's', 's', 's'], css: ['c', 's', 's'], ssc: ['s', 's', 'c'], scs: ['s', 'c', 's'], cps: ['cp', 's'],
    npc: ['np', 'c'], sin: ['c', 'n', 'c'],
    t3c: ['c3', 'c3', 'c3'], t3c1: ['sc3', 'c3', 'c3'], t3c2: ['c3', 'sc3', 'c3'], t3c3: ['c3', 'c3', 'sc3'],
    t3n: ['n3', 'n3', 'n3'], t3n1: ['sn3', 'n3', 'n3'], t3n2: ['n3', 'sn3', 'n3'], t3n3: ['n3', 'n3', 'sn3'],
    t3s: ['s3', 's3', 's3', 's3', 's3', 's3'], t3sc: ['s3', 's3', 's3', 'c'], ct3s: ['c', 's3', 's3', 's3'],
    // compuestos (un tiempo = negra con puntillo)
    np: ['np'], snp: ['snp'], rp: ['rp'], srp: ['srp'],
    ccc: ['c', 'c', 'c'], nc: ['n', 'c'], cn: ['c', 'n'], sccc: ['sc', 'c', 'c'], nsc: ['n', 'sc'],
    s6: ['s', 's', 's', 's', 's', 's'], sscc: ['s', 's', 'c', 'c'], cpsc: ['cp', 's', 'c'],
    dos: ['c2', 'c2'], cua: ['s4', 's4', 's4', 's4']
  };
  var uCel = function (cel) { return CEL[cel].reduce(function (s, f) { return s + FIG[f].u; }, 0); };
  var dDe = function (cel, t) { return uCel(cel) / BT(t); };   // tiempos que ocupa en ese compás
  /* Lo que se elige en el panel: cada casilla, una o varias celdas (los tresillos con un silencio: las tres posiciones) */
  var ITEM = {
    n: { cel: ['n'], nombre: T('negra', 'quarter note') },
    b: { cel: ['b'], nombre: T('blanca', 'half note') },
    bp: { cel: ['bp'], nombre: T('blanca con puntillo', 'dotted half note') },
    r: { cel: ['r'], nombre: T('redonda', 'whole note') },
    sn: { cel: ['sn'], nombre: T('silencio de negra', 'quarter rest') },
    sb: { cel: ['sb'], nombre: T('silencio de blanca', 'half rest') },
    sbp: { cel: ['sbp'], nombre: T('silencio de blanca con puntillo', 'dotted half rest') },
    sr: { cel: ['sr'], nombre: T('silencio de redonda', 'whole rest') },
    cc: { cel: ['cc'], nombre: T('dos corcheas', 'two eighth notes') },
    scc: { cel: ['scc'], nombre: T('silencio de corchea y corchea', 'eighth rest and eighth note') },
    csc: { cel: ['csc'], nombre: T('corchea y silencio de corchea', 'eighth note and eighth rest') },
    ss: { cel: ['ss'], nombre: T('cuatro semicorcheas', 'four sixteenth notes') },
    css: { cel: ['css'], nombre: T('corchea y dos semicorcheas', 'eighth and two sixteenths') },
    ssc: { cel: ['ssc'], nombre: T('dos semicorcheas y corchea', 'two sixteenths and eighth') },
    scs: { cel: ['scs'], nombre: T('semicorchea, corchea y semicorchea', 'sixteenth, eighth, sixteenth') },
    cps: { cel: ['cps'], nombre: T('corchea con puntillo y semicorchea', 'dotted eighth and sixteenth') },
    npc: { cel: ['npc'], nombre: T('negra con puntillo y corchea', 'dotted quarter and eighth') },
    sin: { cel: ['sin'], nombre: T('síncopa: corchea, negra y corchea', 'syncopation: eighth, quarter, eighth') },
    t3c: { cel: ['t3c'], nombre: T('tresillo de corcheas', 'eighth-note triplet') },
    t3cs: { cel: ['t3c1', 't3c2', 't3c3'], nombre: T('tresillo de corcheas con un silencio', 'eighth-note triplet with a rest') },
    t3n: { cel: ['t3n'], nombre: T('tresillo de negras', 'quarter-note triplet') },
    t3ns: { cel: ['t3n1', 't3n2', 't3n3'], nombre: T('tresillo de negras con un silencio', 'quarter-note triplet with a rest') },
    t3s: { cel: ['t3s'], nombre: T('dos tresillos de semicorcheas', 'two sixteenth-note triplets') },
    t3sc: { cel: ['t3sc'], nombre: T('tresillo de semicorcheas y corchea', 'sixteenth triplet and eighth') },
    ct3s: { cel: ['ct3s'], nombre: T('corchea y tresillo de semicorcheas', 'eighth and sixteenth triplet') },
    np: { cel: ['np'], nombre: T('negra con puntillo', 'dotted quarter note') },
    rp: { cel: ['rp'], nombre: T('redonda con puntillo', 'dotted whole note') },
    snp: { cel: ['snp'], nombre: T('silencio de negra con puntillo', 'dotted quarter rest') },
    srp: { cel: ['srp'], nombre: T('silencio de redonda con puntillo', 'dotted whole rest') },
    ccc: { cel: ['ccc'], nombre: T('tres corcheas', 'three eighth notes') },
    nc: { cel: ['nc'], nombre: T('negra y corchea', 'quarter and eighth') },
    cn: { cel: ['cn'], nombre: T('corchea y negra', 'eighth and quarter') },
    sccc: { cel: ['sccc'], nombre: T('silencio de corchea y dos corcheas', 'eighth rest and two eighths') },
    nsc: { cel: ['nsc'], nombre: T('negra y silencio de corchea', 'quarter and eighth rest') },
    s6: { cel: ['s6'], nombre: T('seis semicorcheas', 'six sixteenth notes') },
    sscc: { cel: ['sscc'], nombre: T('dos semicorcheas y dos corcheas', 'two sixteenths and two eighths') },
    cpsc: { cel: ['cpsc'], nombre: T('corchea con puntillo, semicorchea y corchea', 'dotted eighth, sixteenth, eighth') },
    dos: { cel: ['dos'], nombre: T('dosillo de corcheas', 'eighth-note duplet') },
    cua: { cel: ['cua'], nombre: T('cuatrillo de semicorcheas', 'sixteenth-note quadruplet') }
  };
  var CATS = {
    s: [
      { tit: T('Figuras', 'Notes'), items: ['n', 'b', 'bp', 'r'] },
      { tit: T('Silencios', 'Rests'), items: ['sn', 'sb', 'sbp', 'sr'] },
      { tit: T('Corcheas (un tiempo)', 'Eighth notes (one beat)'), items: ['cc', 'scc', 'csc'] },
      { tit: T('Semicorcheas (un tiempo)', 'Sixteenth notes (one beat)'), items: ['ss', 'css', 'ssc', 'scs', 'cps'] },
      { tit: T('Ritmos de dos tiempos', 'Two-beat rhythms'), items: ['npc', 'sin'] },
      { tit: T('Tresillos', 'Triplets'), items: ['t3c', 't3cs', 't3n', 't3ns', 't3s', 't3sc', 'ct3s'] }
    ],
    c: [
      { tit: T('Figuras', 'Notes'), items: ['np', 'bp', 'rp'] },
      { tit: T('Silencios', 'Rests'), items: ['snp', 'sbp', 'srp'] },
      { tit: T('Corcheas (un tiempo)', 'Eighth notes (one beat)'), items: ['ccc', 'nc', 'cn', 'sccc', 'nsc'] },
      { tit: T('Semicorcheas (un tiempo)', 'Sixteenth notes (one beat)'), items: ['s6', 'sscc', 'cpsc'] },
      { tit: T('Grupos de valoración especial', 'Tuplets'), items: ['dos', 'cua'] }
    ]
  };
  /* Niveles rápidos: las combinaciones de siempre, de menos a más */
  var NIVELES = [
    { id: 'negras', nombre: T('Negras y silencios', 'Quarter notes and rests'), r: ['n', 'sn'], c: [2, 3, 4] },
    { id: 'blancas', nombre: T('Con blancas', 'With half notes'), r: ['n', 'sn', 'b', 'sb'], c: [2, 3, 4] },
    { id: 'puntillo', nombre: T('Con blanca con puntillo', 'With dotted half notes'), r: ['n', 'sn', 'b', 'sb', 'bp', 'sbp'], c: [3, 4] },
    { id: 'redondas', nombre: T('Con redondas', 'With whole notes'), r: ['n', 'sn', 'b', 'sb', 'bp', 'sbp', 'r', 'sr'], c: [4] },
    { id: 'corcheas', nombre: T('Corcheas', 'Eighth notes'), r: ['n', 'sn', 'b', 'sb', 'cc'], c: [2, 3, 4] },
    { id: 'silencio-corchea', nombre: T('Silencio de corchea', 'Eighth rests'), r: ['n', 'sn', 'cc', 'scc', 'csc'], c: [2, 3, 4] },
    { id: 'semicorcheas', nombre: T('Semicorcheas', 'Sixteenth notes'), r: ['n', 'sn', 'cc', 'ss'], c: [2, 3, 4] },
    { id: 'combinaciones', nombre: T('Corchea y dos semicorcheas', 'Eighth and two sixteenths'), r: ['n', 'sn', 'cc', 'ss', 'css', 'ssc'], c: [2, 3, 4] },
    { id: 'semicorchea-corchea', nombre: T('Todas las de semicorcheas', 'All sixteenth rhythms'), r: ['n', 'sn', 'cc', 'ss', 'css', 'ssc', 'scs', 'cps'], c: [2, 3, 4] },
    { id: 'puntillo-sincopa', nombre: T('Negra con puntillo y síncopa', 'Dotted quarter and syncopation'), r: ['n', 'sn', 'b', 'cc', 'npc', 'sin'], c: [2, 3, 4] },
    { id: 'tresillo-corcheas', nombre: T('Tresillo de corcheas', 'Eighth-note triplets'), r: ['n', 'sn', 'cc', 't3c', 't3cs'], c: [2, 3, 4] },
    { id: 'tresillo-negras', nombre: T('Tresillo de negras', 'Quarter-note triplets'), r: ['n', 'sn', 'b', 'cc', 't3n', 't3ns'], c: [2, 3, 4] },
    { id: 'tresillo-semicorcheas', nombre: T('Tresillo de semicorcheas', 'Sixteenth-note triplets'), r: ['n', 'cc', 'ss', 't3c', 't3s', 't3sc', 'ct3s'], c: [2, 3, 4] },
    // compuestos
    { id: 'c-corcheas', nombre: T('Negra con puntillo y tres corcheas', 'Dotted quarter and three eighths'), r: ['np', 'snp', 'ccc'], c: [6, 9, 12] },
    { id: 'c-blancas', nombre: T('Con blanca con puntillo', 'With dotted half notes'), r: ['np', 'snp', 'ccc', 'bp', 'sbp'], c: [6, 9, 12] },
    { id: 'c-redondas', nombre: T('Con redonda con puntillo', 'With dotted whole notes'), r: ['np', 'snp', 'ccc', 'bp', 'sbp', 'rp', 'srp'], c: [12] },
    { id: 'c-negra-corchea', nombre: T('Negra y corchea', 'Quarter and eighth'), r: ['np', 'snp', 'ccc', 'nc', 'cn'], c: [6, 9, 12] },
    { id: 'c-silencio-corchea', nombre: T('Silencio de corchea', 'Eighth rests'), r: ['np', 'ccc', 'nc', 'sccc', 'nsc'], c: [6, 9, 12] },
    { id: 'c-semicorcheas', nombre: T('Semicorcheas', 'Sixteenth notes'), r: ['np', 'snp', 'ccc', 'nc', 's6', 'sscc'], c: [6, 9, 12] },
    { id: 'c-siciliana', nombre: T('Corchea con puntillo, semicorchea y corchea', 'Siciliano rhythm'), r: ['np', 'ccc', 'nc', 'cpsc'], c: [6, 9, 12] },
    { id: 'c-dosillo', nombre: T('Dosillo', 'Duplets'), r: ['np', 'snp', 'ccc', 'nc', 'dos'], c: [6, 9, 12] },
    { id: 'c-cuatrillo', nombre: T('Cuatrillo', 'Quadruplets'), r: ['np', 'ccc', 's6', 'dos', 'cua'], c: [6, 9, 12] }
  ];
  /* Las páginas antiguas por grupos (opciones.grupo): su selección */
  var GRUPOS = {
    negras: 'negras', blancas: 'blancas', puntillo: 'puntillo', redondas: 'redondas',
    'negras-c': [['n', 'sn', 'cc'], [2, 3, 4]], 'blancas-c': [['n', 'sn', 'cc', 'b', 'sb'], [2, 3, 4]], 'puntillo-c': [['n', 'sn', 'cc', 'b', 'sb', 'bp', 'sbp'], [3, 4]], 'redondas-c': [['n', 'sn', 'cc', 'b', 'sb', 'bp', 'sbp', 'r', 'sr'], [4]],
    'negras-s': [['n', 'sn', 'cc', 'ss'], [2, 3, 4]], 'blancas-s': [['n', 'sn', 'cc', 'ss', 'b', 'sb'], [2, 3, 4]], 'puntillo-s': [['n', 'sn', 'cc', 'ss', 'b', 'sb', 'bp', 'sbp'], [3, 4]], 'redondas-s': [['n', 'sn', 'cc', 'ss', 'b', 'sb', 'bp', 'sbp', 'r', 'sr'], [4]],
    'negras-sc': [['n', 'sn', 'cc', 'scc'], [2, 3, 4]], 'semicorcheas-sc': [['n', 'sn', 'cc', 'scc', 'ss'], [2, 3, 4]], 'blancas-sc': [['n', 'sn', 'cc', 'scc', 'ss', 'b', 'sb'], [2, 3, 4]],
    'puntillo-sc': [['n', 'sn', 'cc', 'scc', 'ss', 'b', 'sb', 'bp', 'sbp'], [3, 4]], 'redondas-sc': [['n', 'sn', 'cc', 'scc', 'ss', 'b', 'sb', 'bp', 'sbp', 'r', 'sr'], [4]]
  };
  var nivel = function (id) { return NIVELES.filter(function (v) { return v.id === id; })[0]; };
  function seleccionDeGrupo(g) {
    var x = GRUPOS[g];
    if (typeof x === 'string') { var nv = nivel(x); return { r: nv.r.slice(), c: nv.c.slice() }; }
    return x ? { r: x[0].slice(), c: x[1].slice() } : null;
  }
  var tipoSel = function (sel) { return sel.c.length && compuesto(sel.c[0]) ? 'c' : 's'; };
  var itemsDe = function (tipo) { return CATS[tipo].reduce(function (a, cat) { return a.concat(cat.items); }, []); };

  var esSilencio = function (cel) { return CEL[cel].every(function (f) { return FIG[f].s; }); };
  var conSemis = function (sel) { return sel.r.some(function (i) { return ITEM[i].cel.some(function (c) { return CEL[c].some(function (f) { return FIG[f].vf === '16'; }); }); }); };

  /* Dónde puede empezar una celda (b = tiempo del compás, desde 0). Tiene que ocupar tiempos enteros de ESE compás. Las de
     dos tiempos, en un compás de dos tiempos (2/4, 6/8) en el 1.º; de tres (3/4, 9/8) en el 1.º o el 2.º (el silencio solo en
     el 1.º: en los tiempos 2-3 se escriben dos); de cuatro (4/4, 12/8) en el 1.º o el 3.º, para que se vea la mitad del
     compás. Las de tres tiempos: en 3/4, el compás entero; en 4/4, en el 1.º o el 2.º. Las de cuatro, el compás entero. */
  function puede(cel, b, t) {
    var d = dDe(cel, t), nb = NB(t);
    if (d !== Math.round(d)) return false;
    if (d === 1) return true;
    if (d === 4) return b === 0 && nb === 4;
    if (d === 3) return nb === 3 ? b === 0 : nb === 4 && b <= 1;
    if (d !== 2) return false;
    if (nb === 2) return b === 0;
    if (nb === 3) return esSilencio(cel) ? b === 0 : b <= 1;
    return b === 0 || b === 2;
  }

  /* Un ritmo es { t, c: [[celdas del compás 1], [del compás 2]] }. mapaU: por cada parte, 'A' (empieza una nota), 'C'
     (sigue sonando) o 'S' (silencio): es lo que SUENA. mapa: el mapaU cortado por tiempos (un texto por tiempo), para
     comparar dos ritmos tiempo a tiempo. */
  var figurasDe = function (c) { return c.reduce(function (a, cel) { return a.concat(CEL[cel]); }, []); };
  function mapaFiguras(fs) {
    var m = [];
    fs.forEach(function (f) { var F = FIG[f]; for (var k = 0; k < F.u; k++) m.push(F.s ? 'S' : k === 0 ? 'A' : 'C'); });
    return m;
  }
  var mapaU = function (r) { return mapaFiguras(figurasDe(r.c[0]).concat(figurasDe(r.c[1]))); };
  function porTiempos(m, B) { var out = []; for (var i = 0; i + B <= m.length; i += B) out.push(m.slice(i, i + B).join('')); return out; }
  var mapa = function (r) { return r.m || (r.m = porTiempos(mapaU(r), BT(r.t))); };
  var clave = function (r) { return r.c.map(function (c) { return c.join(' '); }).join(' | '); };
  /* Tiempos en los que dos ritmos suenan distinto */
  function difTiempos(x, y) { var out = []; for (var i = 0; i < Math.max(x.length, y.length); i++) if (x[i] !== y[i]) out.push(i); return out; }
  var distancia = function (a, b) { return difTiempos(mapa(a), mapa(b)).length; };

  /* Lo que se pide a un ritmo que se MUESTRA (el dictado y las respuestas): */
  function valido(r, sel) {
    var t = r.t, B = BT(t), celdas = celdasDe(sel);
    var suena = function (c) { return c.some(function (cel) { return !esSilencio(cel); }); };
    if (!suena(r.c[0])) return false;   // el 1.º compás, con alguna nota; el 2.º puede ser un silencio de compás entero
    if (!suena(r.c[1]) && !(r.c[1].length === 1 && dDe(r.c[1][0], t) === NB(t) && NB(t) > 2)) return false;
    // como mucho, dos tiempos de silencio seguidos (o los del silencio más largo elegido)
    var max = 2 * B;
    celdas.forEach(function (cel) { if (esSilencio(cel)) max = Math.max(max, uCel(cel)); });
    if (mapaU(r).join('').indexOf(new Array(max + 2).join('S')) >= 0) return false;
    // los silencios seguidos que caben en uno solo (elegido, y donde se puede escribir) van en uno: así cada sonido se
    // escribe de una sola forma y dos opciones nunca se ven distintas sonando igual
    return !r.c.some(function (c) {
      for (var i = 0, b = 0; i + 1 < c.length; b += dDe(c[i], t), i++) {
        if (!esSilencio(c[i]) || !esSilencio(c[i + 1]) || CEL[c[i]].length > 1 || CEL[c[i + 1]].length > 1) continue;
        var u = uCel(c[i]) + uCel(c[i + 1]);
        if (celdas.some(function (j) { return esSilencio(j) && CEL[j].length === 1 && uCel(j) === u && puede(j, b, t); })) return true;
      }
      return false;
    });
  }
  /* El dictado, además: con dos casillas o más elegidas, al menos dos distintas (que no sean solo negras) */
  function esDictado(r, sel) {
    if (sel.r.length < 2) return true;
    var usadas = {};
    r.c.forEach(function (c) { c.forEach(function (cel) { usadas[itemDe(cel)] = 1; }); });
    return Object.keys(usadas).length >= 2;
  }
  var itemDe = function (cel) { for (var i in ITEM) if (ITEM[i].cel.indexOf(cel) >= 0) return i; };
  var celdasDe = function (sel) { return sel.r.reduce(function (a, i) { return a.concat(ITEM[i].cel); }, []); };

  /* Rellena del tiempo b0 al b1 de un compás, celda a celda al azar entre las elegidas que caben. Se sortea la CASILLA (cada
     una con el mismo peso, o menos si ya ha salido en el test: uso) y luego su celda. Así un ritmo raro sale tan a menudo
     como la negra. null si se atasca (las casillas elegidas no llenan ese hueco). */
  function rellenar(sel, t, b0, b1, uso) {
    var out = [], b = b0;
    while (b < b1) {
      var ops = [];
      sel.r.forEach(function (i) {
        var cs = ITEM[i].cel.filter(function (cel) { return b + dDe(cel, t) <= b1 && puede(cel, b, t); });
        if (cs.length) ops.push({ i: i, cs: cs, w: 1 / (1 + ((uso && uso[i]) || 0)) });
      });
      if (!ops.length) return null;
      var tot = ops.reduce(function (s, o) { return s + o.w; }, 0), x = Math.random() * tot, o = ops[0];
      for (var k = 0; k < ops.length; k++) { x -= ops[k].w; if (x <= 0) { o = ops[k]; break; } }
      var cel = o.cs[rnd(o.cs.length)];
      out.push(cel); b += dDe(cel, t);
    }
    return out;
  }
  function generar(sel, t, uso) {
    for (var k = 0; k < 3000; k++) {
      var a = rellenar(sel, t, 0, NB(t), uso), b = a && rellenar(sel, t, 0, NB(t), uso);
      if (!b) continue;
      var r = { t: t, c: [a, b] };
      if (valido(r, sel) && esDictado(r, sel)) return r;
    }
    return null;
  }
  /* Los compases elegidos en los que se puede hacer un dictado con las casillas elegidas */
  var compasesPosibles = function (sel) { return sel.c.filter(function (t) { return !!generar(sel, t); }); };

  /* 3 ritmos válidos que suenan distinto del bueno en uno o dos tiempos (al menos uno, en uno solo): se cambia una celda
     del bueno, o dos seguidas, por otras elegidas que ocupen lo mismo. Si no hay bastantes, los más parecidos que salgan. */
  function distractores(r, sel) {
    var t = r.t, por = { 1: [], 2: [] }, vistos = {};
    vistos[mapa(r).join()] = 1;
    function probar(q) {
      if (!valido(q, sel)) return;
      var k = mapa(q).join(); if (vistos[k]) return;
      var d = distancia(q, r);
      if (por[d]) { vistos[k] = 1; por[d].push(q); }
    }
    for (var n = 0; n < 600 && por[1].length + por[2].length < 30; n++) {
      var ci = rnd(2), c = r.c[ci], i = rnd(c.length), j = Math.random() < 0.5 && i + 1 < c.length ? i + 1 : i;
      var b0 = 0; for (var k = 0; k < i; k++) b0 += dDe(c[k], t);
      var b1 = b0; for (k = i; k <= j; k++) b1 += dDe(c[k], t);
      var nuevo = rellenar(sel, t, b0, b1);
      if (!nuevo) continue;
      var cs = r.c.slice(); cs[ci] = c.slice(0, i).concat(nuevo, c.slice(j + 1));
      probar({ t: t, c: cs });
    }
    var uno = barajar(por[1]), out = uno.slice(0, 1);
    out = out.concat(barajar(uno.slice(1).concat(por[2])).slice(0, 3 - out.length));
    if (out.length < 3) {   // pocas casillas (p. ej. solo negras y silencios en 2/4): los más parecidos entre ritmos al azar
      var lejos = [];
      for (n = 0; n < 400; n++) {
        var a = rellenar(sel, t, 0, NB(t)), b = a && rellenar(sel, t, 0, NB(t));
        if (!b) continue;
        var q = { t: t, c: [a, b] }, kq = mapa(q).join();
        if (!vistos[kq] && valido(q, sel)) { vistos[kq] = 1; lejos.push(q); }
      }
      lejos.sort(function (x, y) { return distancia(x, r) - distancia(y, r); });
      out = out.concat(lejos.slice(0, 3 - out.length));
    }
    return out;
  }
  var duracion = function (r) { return 2 * NB(r.t); };   // en tiempos

  /* Audio: Sol4 en cada nota; suena casi toda su duración, para que el silencio que la sigue se oiga como hueco (y la
     blanca se distinga de la negra seguida de silencio). spb: segundos por tiempo (la negra; en compuestos, la negra con puntillo). */
  function entrada(t, spb) {   // el compás de entrada: un clic en cada tiempo, el 1.º acentuado
    var ev = [];
    for (var k = 0; k < NB(t); k++) ev.push({ click: true, acento: k === 0, when: k * spb, vel: 0.7 });
    return ev;
  }
  function eventos(r, spb, desde) {
    var ev = [], u = 0, d0 = desde || 0, B = BT(r.t), N = 24;   // la duración de las notas se mide en negras
    figurasDe(r.c[0]).concat(figurasDe(r.c[1])).forEach(function (f) {
      var F = FIG[f], seg = F.u / B * spb, negras = F.u / N;
      if (!F.s) ev.push({ midi: SOL4, when: d0 + u / B * spb, dur: negras < 1 ? 0.9 * seg : seg - 0.1 * (N / B) * spb });
      u += F.u;
    });
    return ev;
  }

  /* Partitura de un compás a partir de sus figuras: grupos de valoración especial (las figuras de un grupo que llenan su
     sitio; las que no lo llenan, al escribir, también se agrupan para que se vea lo que hay) y barras (corcheas y
     semicorcheas seguidas de un mismo tiempo; las de un mismo grupo, siempre juntas). B: partes del tiempo del compás.
     colores[i]: el color de la figura i. */
  var nBarra = 0;
  function compasDe(fs, colores, B) {
    var ev = [], ini = [], u = 0, grupo = [], tuplas = [], g = null;
    B = B || 24;
    fs.forEach(function (f, i) {
      ini.push(u); u += FIG[f].u;
      var F = FIG[f];
      if (F.tup) {
        if (!g || g.fam !== F.tup || g.lleno) { g = { fam: F.tup, ini: i, fin: i, suma: 0, u0: ini[i] }; tuplas.push(g); }
        g.suma += F.u; g.fin = i; g.u1 = u; if (g.suma >= TUP[g.fam].tot) g.lleno = true;
        grupo.push(g);
      } else { g = null; grupo.push(null); }
    });
    var tiempo = function (x) { return Math.floor(x / B + 1e-9); };
    var dentroDeUnTiempo = function (q) { return !q || (q.lleno && tiempo(q.u0) === tiempo(q.u1 - 1)); };
    var corta = function (f) { return !FIG[f].s && (FIG[f].vf === '8' || FIG[f].vf === '16'); };
    var barra = [];
    fs.forEach(function (f, i) {
      barra.push(undefined);
      if (!corta(f) || i === 0 || !corta(fs[i - 1])) return;
      var junto = (grupo[i] && grupo[i] === grupo[i - 1]) ||
        (tiempo(ini[i]) === tiempo(ini[i - 1]) && dentroDeUnTiempo(grupo[i]) && dentroDeUnTiempo(grupo[i - 1]));
      if (junto) { if (barra[i - 1] === undefined) barra[i - 1] = ++nBarra; barra[i] = barra[i - 1]; }
    });
    // un grupo no puede partir un grupo con barra (sí ir entero dentro de él): si lo haría, esa barra se quita
    tuplas.forEach(function (q) {
      var ids = {};
      for (var k = 0; k < fs.length; k++) if (barra[k] !== undefined) (ids[barra[k]] = ids[barra[k]] || []).push(k);
      Object.keys(ids).forEach(function (id) {
        var a = ids[id][0], z = ids[id][ids[id].length - 1];
        var corta2 = q.fin >= a && q.ini <= z, tupDentro = q.ini >= a && q.fin <= z, barraDentro = a >= q.ini && z <= q.fin;
        if (corta2 && !tupDentro && !barraDentro) ids[id].forEach(function (k) { barra[k] = undefined; });
      });
    });
    fs.forEach(function (f, i) {
      var F = FIG[f], e = F.s ? { key: 'b/4', d: F.vf, silencio: true } : { key: 'g/4', d: F.vf, plica: 'up' };
      if (F.p) e.puntillo = 1;
      if (barra[i] !== undefined) e.barra = barra[i];
      if (colores && colores[i]) e.color = colores[i];
      ev.push(e);
    });
    return { ev: ev, tuplas: tuplas.map(function (q) { return { ini: q.ini, fin: q.fin, num: TUP[q.fam].num, numbase: TUP[q.fam].base }; }), u: u };
  }
  /* El silencio que llena un compás de 4/4 o de 12/8 se dibuja centrado, como silencio de compás entero */
  function centrar(ev, t) { if ((t === 4 || t === 12) && ev.length === 1 && ev[0].silencio && ev[0].d === 'w') ev[0].mrest = true; }
  var cabeceraFila = function (t) { return { clave: 'sol', num: t, den: compuesto(t) ? 8 : 4, compases: [], tuplets: [] }; };
  /* Partitura de un ritmo. op.rojo[tiempo]: las figuras que tocan ese tiempo, en rojo. */
  function fila(r, op) {
    op = op || {};
    var f = cabeceraFila(r.t), B = BT(r.t), nb = NB(r.t);
    f.barraFinal = 'end';
    r.c.forEach(function (c, ci) {
      var fs = figurasDe(c), col = [], u = 0;
      fs.forEach(function (x) {
        var b0 = ci * nb + Math.floor(u / B + 1e-9), b1 = ci * nb + Math.floor((u + FIG[x].u - 1) / B + 1e-9);
        var rojo = false; for (var b = b0; b <= b1; b++) if (op.rojo && op.rojo[b]) rojo = true;
        col.push(rojo ? ROJO : null); u += FIG[x].u;
      });
      var m = compasDe(fs, col, B);
      centrar(m.ev, r.t);
      f.compases.push(m.ev);
      m.tuplas.forEach(function (q) { q.c = ci; f.tuplets.push(q); });
    });
    return f;
  }
  /* Lo que escribe el alumno: figuras y barras ('|' barra de compás, '||' doble barra final), tal cual, aunque un compás
     tenga de más o de menos. rojo[i]: el elemento i, en rojo. Mientras no hay doble barra, el último compás queda abierto
     y lo que le falta se rellena con huecos invisibles para que no se vea encogido. */
  function filaEscrita(tokens, t, rojo) {
    var cs = [[]], idx = [[]], fin = false, B = BT(t), total = NB(t) * B;
    tokens.forEach(function (tk, i) {
      if (tk === '|') { cs.push([]); idx.push([]); return; }
      if (tk === '||') { fin = true; return; }
      cs[cs.length - 1].push(tk); idx[idx.length - 1].push(i);
    });
    var f = cabeceraFila(t);
    cs.forEach(function (fs, ci) {
      var m = compasDe(fs, idx[ci].map(function (i) { return rojo && rojo[i] ? ROJO : null; }), B);
      if (ci === cs.length - 1 && !fin && m.u < total) {   // lo que falta del compás, en huecos invisibles
        var falta = total - m.u;
        while (falta % 24 >= 6) { m.ev.push({ key: 'b/4', d: '16', espacio: true }); falta -= 6; }
        while (falta >= 24) { m.ev.push({ key: 'b/4', d: 'q', espacio: true }); falta -= 24; }
      }
      centrar(m.ev, t);
      f.compases.push(m.ev);
      m.tuplas.forEach(function (q) { q.c = ci; f.tuplets.push(q); });
    });
    if (fin) f.barraFinal = 'end'; else f.sinBarraFinal = true;
    return f;
  }
  function describir(r) {
    return T('Compás de ', 'Time signature ') + cifra(r.t) + ': ' + r.c.map(function (c) { return c.map(function (cel) { return ITEM[itemDe(cel)].nombre; }).join(', '); }).join(' | ');
  }
  var numero = function (x) { x = Math.round(x * 100) / 100; return EN ? String(x) : String(x).replace('.', ','); };   // 3,5 tiempos
  function dibujar(div, r, ancho, op) {
    return window.tmNotacion.dibujarAAncho(div, fila(r, op), ancho, { escala: (op && op.escala) || 0.9, id: 'dr', alt: (op && op.alt) || describir(r) });
  }
  var ordinal = function (i) { return (i + 1) + '.º'; };
  /* «el 2.º tiempo del compás 1», «el 3.º y el 4.º tiempo del compás 2», «el 2.º tiempo del compás 1 y el 1.º del compás 2».
     malos: tiempos contados seguidos; nb: tiempos del compás. */
  var y = function (l) { return l.length > 1 ? l.slice(0, -1).join(', ') + T(' y ', ' and ') + l[l.length - 1] : l[0]; };
  function dondeFalla(malos, nb) {
    var porCompas = [[], []];
    if (EN) {   // «beat 2 of measure 1», «beats 3 and 4 of measure 2»
      malos.forEach(function (i) { porCompas[Math.floor(i / nb)].push(i % nb + 1); });
      var partesEn = [];
      porCompas.forEach(function (l, c) { if (l.length) partesEn.push((l.length > 1 ? 'beats ' : 'beat ') + y(l) + ' of measure ' + (c + 1)); });
      return y(partesEn);
    }
    malos.forEach(function (i) { porCompas[Math.floor(i / nb)].push('el ' + ordinal(i % nb)); });
    var partes = [];
    porCompas.forEach(function (l, c) { if (l.length) partes.push(y(l) + (partes.length ? '' : ' tiempo') + ' del compás ' + (c + 1)); });
    return y(partes);
  }
  var difSonido = function (a, b) { return difTiempos(mapa(a), mapa(b)); };

  /* La selección: en la dirección (?r=n.sn.cc&c=234; en compuestos, c=6.9.12) > la última que se usó (una por tipo de
     compás, en los tres ejercicios) > la de la página. */
  var CLAVE_LS = 'tm-dictado-ritmico';
  function limpiar(sel) {
    var c = (sel && sel.c || []).map(Number).filter(function (t, k, a) { return [2, 3, 4, 6, 9, 12].indexOf(t) >= 0 && a.indexOf(t) === k; }).sort(function (a, b) { return a - b; });
    var tipo = sel && sel.tipo || (c.length ? tipoDe(c[0]) : 's');
    c = c.filter(function (t) { return tipoDe(t) === tipo; });
    var validos = itemsDe(tipo);
    var r = (sel && sel.r || []).filter(function (i, k, a) { return validos.indexOf(i) >= 0 && a.indexOf(i) === k; });
    return { tipo: tipo, r: r, c: c };
  }
  function leerURL() {
    var q = /[?&]r=([^&#]*)/.exec(location.search), c = /[?&]c=([^&#]*)/.exec(location.search);
    if (!q) return null;
    var cs = c ? decodeURIComponent(c[1]) : '234';
    return limpiar({ r: decodeURIComponent(q[1]).split('.'), c: cs.indexOf('.') >= 0 ? cs.split('.') : cs.split('') });
  }
  function leerLS() { try { var x = JSON.parse(localStorage.getItem(CLAVE_LS)); return x || null; } catch (e) { return null; } }
  function guardarLS(sel) {
    try {
      var x = leerLS() || {};
      if (x.r) x = { s: x };   // lo que se guardaba antes de los compuestos: una sola selección, de simples
      x[sel.tipo] = { r: sel.r, c: sel.c }; x.tipo = sel.tipo;
      localStorage.setItem(CLAVE_LS, JSON.stringify(x));
    } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }
  function guardada(tipo) {
    var x = leerLS();
    if (x && x.r) x = { s: x, tipo: 's' };
    if (!x) return null;
    tipo = tipo || x.tipo || 's';
    return x[tipo] ? limpiar({ tipo: tipo, r: x[tipo].r, c: x[tipo].c }) : null;
  }
  var enlace = function (sel) { return location.origin + location.pathname + '?r=' + sel.r.join('.') + '&c=' + sel.c.join(sel.tipo === 'c' ? '.' : ''); };

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
    '.tm-aud-wrap .tm-dr-pal{display:flex;flex-wrap:wrap;gap:8px;align-items:stretch;justify-content:center;margin:12px 0 4px}',
    '.tm-aud-wrap .tm-dr-pal .tm-cc-carta{width:84px}',
    '.tm-aud-wrap .tm-dr-pal .tm-cc-carta small{font-size:.7rem;min-height:2.4em}',
    '.tm-aud-wrap .tm-dr-herr{display:flex;gap:8px;justify-content:center;margin-top:6px}',
    '.tm-aud-wrap .tm-dr-herr button{font:inherit;font-size:.85rem;font-weight:600;padding:8px 14px;border-radius:8px;border:1px solid #d8d0b8;background:#fff;cursor:pointer}',
    '.tm-aud-wrap .tm-dr-herr button[disabled]{opacity:.5;cursor:default}',
    '.tm-aud-wrap .tm-dr-lleva{font-size:.85rem;color:#555;text-align:center;margin-top:6px}',
    '.tm-aud-wrap .tm-dr-corr{font:inherit;width:100%;margin-top:12px;padding:14px;border:0;border-radius:8px;font-weight:700;font-size:1rem;background:#8b6914;color:#fff;cursor:pointer}',
    '.tm-aud-wrap .tm-dr-corr[disabled]{background:#cfc6ae;cursor:default}',
    '.tm-aud-wrap .tm-dr-lbl{font-size:.8rem;font-weight:700;color:#555;margin:10px 0 4px;text-transform:uppercase;letter-spacing:.4px}',
    // el panel: tipo de compás, niveles rápidos, casillas por familias y compases
    '.tm-aud-wrap .tm-dr-panel{text-align:left;margin:4px 0 14px}',
    '.tm-aud-wrap .tm-dr-tipo{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:6px 0 4px}',
    '.tm-aud-wrap .tm-dr-tipo button{font:inherit;font-size:.9rem;font-weight:700;padding:10px 8px;border-radius:10px;border:2px solid #d8d0b8;background:#fff;color:#1a1a2e;cursor:pointer;line-height:1.25}',
    '.tm-aud-wrap .tm-dr-tipo button small{display:block;font-weight:500;font-size:.78rem;color:#666}',
    '.tm-aud-wrap .tm-dr-tipo button[aria-pressed="true"]{border-color:#8b6914;background:#8b6914;color:#fff}',
    '.tm-aud-wrap .tm-dr-tipo button[aria-pressed="true"] small{color:#f3ead6}',
    '.tm-aud-wrap .tm-dr-h{font-size:.8rem;font-weight:700;color:#555;margin:14px 0 6px;text-transform:uppercase;letter-spacing:.4px}',
    '.tm-aud-wrap .tm-dr-niv{display:flex;flex-wrap:wrap;gap:6px}',
    '.tm-aud-wrap .tm-dr-niv button{font:inherit;font-size:.82rem;padding:6px 10px;border-radius:999px;border:1px solid #d8d0b8;background:#fff;color:#1a1a2e;cursor:pointer}',
    '.tm-aud-wrap .tm-dr-niv button:hover{border-color:#8b6914;background:#fdf8ee}',
    '.tm-aud-wrap .tm-dr-niv button.tm-on{border-color:#8b6914;background:#8b6914;color:#fff}',
    '.tm-aud-wrap .tm-dr-fam{border:1px solid #e8e0cc;border-radius:10px;padding:6px 10px 10px;margin:8px 0 0}',
    '.tm-aud-wrap .tm-dr-fam legend{font-weight:700;font-size:.9rem;color:#7a5c0f;padding:0 4px}',
    '.tm-aud-wrap .tm-dr-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px}',
    '.tm-aud-wrap .tm-dr-item{display:flex;flex-direction:column;align-items:center;gap:2px;border:2px solid #e8e0cc;border-radius:8px;padding:4px 6px 6px;background:#fff;cursor:pointer;text-align:center;font-size:.78rem;line-height:1.2;color:#333}',
    '.tm-aud-wrap .tm-dr-item:has(input:checked){border-color:#8b6914;background:#fdf8ee}',
    '.tm-aud-wrap .tm-dr-item:has(input:focus-visible){outline:2px solid #8b6914;outline-offset:2px}',
    '.tm-aud-wrap .tm-dr-item input{position:absolute;opacity:0;width:1px;height:1px}',
    '.tm-aud-wrap .tm-dr-item .tm-dr-not{display:block;width:100%;height:66px;overflow:hidden}',
    '.tm-aud-wrap .tm-dr-item .tm-dr-not svg{display:block;margin:0 auto}',
    '.tm-aud-wrap .tm-dr-item b{font-weight:600}',
    '.tm-aud-wrap .tm-dr-comp{display:flex;gap:8px}',
    '.tm-aud-wrap .tm-dr-comp label{display:flex;align-items:center;gap:6px;border:2px solid #e8e0cc;border-radius:8px;padding:6px 12px;cursor:pointer;font-weight:700;background:#fff}',
    '.tm-aud-wrap .tm-dr-comp label:has(input:checked){border-color:#8b6914;background:#fdf8ee}',
    '.tm-aud-wrap .tm-dr-aviso{font-size:.85rem;color:#a33;margin:10px 0 0;min-height:1.2em}',
    '.tm-aud-wrap .tm-dr-link{font:inherit;font-size:.82rem;background:none;border:0;color:#7a5c0f;text-decoration:underline;cursor:pointer;padding:4px 0;margin-top:6px}',
    '@media(max-width:560px){.tm-aud-wrap .tm-dr-opts{grid-template-columns:1fr}.tm-aud-wrap .tm-dr-items{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    '@media(max-width:480px){.tm-aud-wrap .tm-dr-pal .tm-cc-carta small{font-size:.6rem;letter-spacing:-.01em}.tm-aud-wrap .tm-dr-pal{gap:6px}.tm-aud-wrap .tm-dr-pal .tm-cc-carta{flex:0 0 calc(25% - 5px);min-width:0;max-width:84px;width:auto;padding:4px 3px 2px}}',
    '@media(max-width:380px){.tm-aud-wrap .tm-dr-audios{grid-template-columns:1fr}}'
  ].join('');

  var TEXTOS = {
    oir: { tit: T('Dictado rítmico: ¿qué ritmo suena?', 'Rhythmic dictation: which rhythm is playing?'), sub: T('Suena un ritmo de dos compases en la nota Sol. Elige cuál de los cuatro ritmos escritos es el que suena. Puedes escucharlo hasta ' + MAX_ESCUCHAS + ' veces y responder mientras suena.', 'A two-measure rhythm plays on the note G. Choose which of the four written rhythms is the one you hear. You can listen up to ' + MAX_ESCUCHAS + ' times and answer while it plays.') },
    leer: { tit: T('Lectura rítmica: ¿qué audio es?', 'Rhythm reading: which audio is it?'), sub: T('Verás un ritmo de dos compases. Escucha los cuatro audios (cada uno hasta ' + MAX_ESCUCHAS + ' veces) y elige el que suena como el ritmo escrito.', 'You will see a two-measure rhythm. Listen to the four audios (each up to ' + MAX_ESCUCHAS + ' times) and choose the one that sounds like the written rhythm.') },
    escribir: { tit: T('Dictado rítmico: escribe el ritmo', 'Rhythmic dictation: write the rhythm'), sub: T('Suena un ritmo de dos compases en la nota Sol. Escríbelo nota a nota con las tarjetas, con su barra de compás y la doble barra final, y pulsa Corregir. Puedes escucharlo hasta ' + MAX_ESCUCHAS + ' veces y escribir mientras suena.', 'A two-measure rhythm plays on the note G. Write it note by note with the cards, with its bar line and the final double bar line, and press Check. You can listen up to ' + MAX_ESCUCHAS + ' times and write while it plays.') }
  };

  /* Una figura o celda dibujada sola, sin clave ni compás: las tarjetas al escribir y las casillas del panel. Todas con la
     MISMA ventana, centrada en lo dibujado (como las cartas de completar compás). B: partes del tiempo (para las barras). */
  function mini(div, fs, alt, ancho, alto, B) {
    var m = compasDe(fs, null, B);
    var f = { clave: 'sol', sinClave: true, sinBarraFinal: true, compases: [m.ev], tuplets: m.tuplas.map(function (q) { q.c = 0; return q; }) };
    if (fs.length === 1 && FIG[fs[0]].tup) f.tuplets = [{ c: 0, ini: 0, fin: 0, num: TUP[FIG[fs[0]].tup].num, numbase: TUP[FIG[fs[0]].tup].base, corchete: false }];   // la tarjeta de una figura de grupo, con su número
    var r = window.tmNotacion.dibujarSync(div, f, { escala: 1.0, separacion: 0.3, id: 'drm', alt: alt });
    var svg = r.elemento, dentro = svg.querySelector('svg');
    if (!dentro) return;
    svg.style.maxWidth = 'none'; svg.style.width = svg.getAttribute('width') + 'px';   // a su tamaño natural para medir
    var inv = dentro.getScreenCTM().inverse();
    var pt = function (x, yy) { var p = svg.createSVGPoint(); p.x = x; p.y = yy; return p.matrixTransform(inv); };
    var figs = svg.querySelectorAll('.note, .rest, .mRest');
    if (!figs.length) return;
    var x0 = Infinity, x1 = -Infinity;
    Array.prototype.forEach.call(figs, function (n) { var b = n.getBoundingClientRect(); x0 = Math.min(x0, b.left); x1 = Math.max(x1, b.right); });
    var cx = (pt(x0, 0).x + pt(x1, 0).x) / 2;
    var lineas = svg.querySelectorAll('.staff > path');
    var yDe = function (l) { var b2 = l.getBoundingClientRect(); return pt(0, b2.top + b2.height / 2).y; };
    var y0 = yDe(lineas[0]), sp = (yDe(lineas[4]) - y0) / 4;
    var upp = pt(1, 0).x - pt(0, 0).x;   // unidades del contenido por píxel
    var W = Math.max(ancho || 64, (x1 - x0) + 20), vbW = W * upp, vbH = 9.5 * sp;   // de arriba, sitio para el número del grupo
    dentro.setAttribute('viewBox', (cx - vbW / 2) + ' ' + (y0 - 4.5 * sp) + ' ' + vbW + ' ' + vbH);
    svg.setAttribute('viewBox', '0 0 ' + vbW + ' ' + vbH);
    svg.setAttribute('width', W); svg.setAttribute('height', Math.round(vbH / upp));
    if (alto) { svg.style.height = alto + 'px'; svg.style.width = 'auto'; svg.style.maxWidth = '100%'; }   // las casillas del panel: todas igual de altas
    else { svg.style.width = '100%'; svg.style.height = 'auto'; }
  }

  function tmDictadoRitmico(id, opciones) {
    var modo = (opciones && opciones.modo) || 'oir';
    var wrap = document.getElementById(id);
    if (!wrap) return;
    window.tmAudModo.injectCSS();
    if (!document.getElementById('tm-dr-css')) { var s = document.createElement('style'); s.id = 'tm-dr-css'; s.textContent = CSS; document.head.appendChild(s); }
    if (modo === 'escribir' && !document.getElementById('tm-cc-css-dr')) {   // las tarjetas: los estilos de completar compás
      var s2 = document.createElement('style'); s2.id = 'tm-cc-css-dr';
      s2.textContent = '.tm-cc-carta{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:4px 6px 2px;cursor:pointer;width:72px;text-align:center;font-family:inherit;}.tm-cc-carta:hover:not([disabled]){border-color:#8b6914;background:#fffbf2;}.tm-cc-carta[disabled]{cursor:default;opacity:.6;}.tm-cc-carta small{display:block;font-size:.62rem;color:#666;line-height:1.15;margin-top:2px;min-height:1.4em;}';
      document.head.appendChild(s2);
    }
    wrap.className = 'tm-aud-wrap';
    var uid = id, $ = function (x) { return document.getElementById(uid + x); };
    var porDefecto = function (tipo) {
      var g = tipo === 's' && opciones && opciones.grupo && seleccionDeGrupo(opciones.grupo), v = nivel(tipo === 'c' ? 'c-corcheas' : 'negras');
      return limpiar(g || { r: v.r.slice(), c: v.c.slice() });
    };
    var sel = leerURL() || (opciones && opciones.grupo ? porDefecto('s') : guardada() || porDefecto('s'));
    var n, aciertos, it, escuchas, respondido, sonando = -1, gen = 0, timers = [], orden = [], vistos = {}, puestos = [], uso = {}, cartasFig = [];

    /* ---- el panel: lo que puede salir */
    function inicio() {
      parar();
      var tipo = sel.tipo;
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-ini">' +
        '<h2 class="tm-aud-tit">' + TEXTOS[modo].tit + '</h2>' +
        '<p class="tm-aud-sub">' + TEXTOS[modo].sub + T(' Antes de cada audio suena un compás de metrónomo al mismo tempo. Sube el volumen o usa auriculares.', ' Before each audio, one measure of metronome clicks plays at the same tempo. Turn up the volume or use headphones.') + '</p>' +
        '<div class="tm-dr-panel">' +
        '<div class="tm-dr-tipo" role="group" aria-label="' + T('Tipo de compás', 'Meter type') + '">' +
        '<button type="button" data-tipo="s" aria-pressed="' + (tipo === 's') + '">' + T('Compases simples', 'Simple meters') + '<small>2/4, 3/4, 4/4</small></button>' +
        '<button type="button" data-tipo="c" aria-pressed="' + (tipo === 'c') + '">' + T('Compases compuestos', 'Compound meters') + '<small>6/8, 9/8, 12/8</small></button></div>' +
        '<p class="tm-dr-h">' + T('Niveles rápidos', 'Quick levels') + '</p><div class="tm-dr-niv" id="' + uid + '_niv">' +
        NIVELES.map(function (v, k) { return tipoDe(v.c[0]) === tipo ? '<button type="button" data-k="' + k + '">' + v.nombre + '</button>' : ''; }).join('') + '</div>' +
        '<p class="tm-dr-h">' + T('O elige qué puede salir', 'Or choose what can appear') + '</p>' +
        CATS[tipo].map(function (cat) {
          return '<fieldset class="tm-dr-fam"><legend>' + cat.tit + '</legend><div class="tm-dr-items">' + cat.items.map(function (i) {
            return '<label class="tm-dr-item"><input type="checkbox" data-i="' + i + '"><span class="tm-dr-not" data-i="' + i + '"></span><b>' + ITEM[i].nombre + '</b></label>';
          }).join('') + '</div></fieldset>';
        }).join('') +
        '<p class="tm-dr-h">' + T('Compases', 'Time signatures') + '</p><div class="tm-dr-comp">' +
        COMPASES[tipo].map(function (t) { return '<label><input type="checkbox" data-c="' + t + '">' + cifra(t) + '</label>'; }).join('') + '</div>' +
        '<p class="tm-dr-aviso" id="' + uid + '_aviso" aria-live="polite"></p>' +
        '<button type="button" class="tm-dr-link" id="' + uid + '_link">' + T('Copiar el enlace con esta selección', 'Copy the link with this selection') + '</button>' +
        '</div><button class="tm-aud-btnplay" id="' + uid + '_go" type="button">' + T('Empezar', 'Start') + '</button></div></div>';
      pintarSel();
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-tipo button'), function (b) {
        b.addEventListener('click', function () {
          if (b.dataset.tipo === sel.tipo) return;
          guardarLS(sel);
          sel = guardada(b.dataset.tipo) || porDefecto(b.dataset.tipo);
          guardarLS(sel); inicio();
        });
      });
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-item input, .tm-dr-comp input'), function (x) {
        x.addEventListener('change', function () { sel = leerPanel(); guardarLS(sel); pintarSel(); });
      });
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-niv button'), function (b) {
        b.addEventListener('click', function () { var v = NIVELES[+b.dataset.k]; sel = limpiar({ r: v.r.slice(), c: v.c.slice() }); guardarLS(sel); pintarSel(); });
      });
      $('_link').addEventListener('click', function () {
        var url = enlace(sel), ok = function () { $('_link').textContent = T('Enlace copiado', 'Link copied'); };
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(ok, function () { prompt(T('Copia este enlace:', 'Copy this link:'), url); });
        else prompt(T('Copia este enlace:', 'Copy this link:'), url);
      });
      $('_go').addEventListener('click', empezar);
      // la notación de cada casilla, cuando Verovio esté listo (sin bloquear: de pocas en pocas)
      window.tmNotacion.listo().then(function () {
        var spans = Array.prototype.slice.call(wrap.querySelectorAll('.tm-dr-not')), B = tipo === 'c' ? 36 : 24;
        (function tanda() {
          spans.splice(0, 4).forEach(function (sp) { if (!sp.isConnected) return; try { mini(sp, CEL[ITEM[sp.dataset.i].cel[0]], ITEM[sp.dataset.i].nombre, 60, 66, B); } catch (e) { /* se queda con el nombre */ } });
          if (spans.length) setTimeout(tanda, 0);
        })();
      }, function () { /* sin notación en las casillas: valen los nombres */ });
    }
    function leerPanel() {
      return limpiar({
        tipo: sel.tipo,
        r: Array.prototype.filter.call(wrap.querySelectorAll('.tm-dr-item input'), function (x) { return x.checked; }).map(function (x) { return x.dataset.i; }),
        c: Array.prototype.filter.call(wrap.querySelectorAll('.tm-dr-comp input'), function (x) { return x.checked; }).map(function (x) { return x.dataset.c; })
      });
    }
    function pintarSel() {
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-item input'), function (x) { x.checked = sel.r.indexOf(x.dataset.i) >= 0; });
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-comp input'), function (x) { x.checked = sel.c.indexOf(+x.dataset.c) >= 0; });
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-dr-niv button'), function (b) {
        var v = NIVELES[+b.dataset.k];
        b.classList.toggle('tm-on', v.r.length === sel.r.length && v.r.every(function (i) { return sel.r.indexOf(i) >= 0; }) && v.c.join() === sel.c.join());
      });
      var aviso = problema(sel);
      $('_aviso').textContent = aviso || '';
      $('_go').disabled = !!aviso;
      $('_link').textContent = T('Copiar el enlace con esta selección', 'Copy the link with this selection');
    }
    /* Lo que impide empezar, en palabras (los compases que no se pueden llenar con lo elegido se quitan al empezar) */
    function problema(s) {
      if (!s.r.some(function (i) { return ITEM[i].cel.some(function (c) { return !esSilencio(c); }); })) return T('Elige al menos una figura o un ritmo con notas.', 'Choose at least one note or rhythm with notes.');
      if (!s.c.length) return T('Elige al menos un compás.', 'Choose at least one time signature.');
      if (!compasesPosibles(s).length) return s.tipo === 'c' ? T('Con lo elegido no se pueden llenar esos compases: añade la negra con puntillo o un ritmo de un tiempo.', 'What you chose cannot fill those measures: add the dotted quarter note or a one-beat rhythm.') : T('Con lo elegido no se pueden llenar esos compases: añade la negra u otra figura más corta.', 'What you chose cannot fill those measures: add the quarter note or another shorter value.');
      return '';
    }

    function empezar() {
      if (problema(sel)) return;
      $('_go').disabled = true; $('_go').textContent = T('Cargando…', 'Loading…');
      window.tmNotacion.listo().then(function () {
        var comp = compasesPosibles(sel);
        n = 0; aciertos = 0; vistos = {}; uso = {};
        // los 10 dictados repartidos entre los compases, sin el mismo tres veces seguidas
        var base = [];
        for (var k = 0; k < TOTAL; k++) base.push(comp[k % comp.length]);
        orden = barajar(base);
        if (comp.length > 1) for (var g = 0; g < 50; g++) { orden = barajar(base); if (!orden.some(function (x, i) { return i >= 2 && x === orden[i - 1] && x === orden[i - 2]; })) break; }
        cartasFig = ORDEN_FIG.filter(function (f) { return celdasDe(sel).some(function (c) { return CEL[c].indexOf(f) >= 0; }); });
        montar(); siguiente(); subir();
      }, function () { $('_go').textContent = T('No se ha podido cargar. Recarga la página.', 'Could not load. Reload the page.'); });
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
      if (modo === 'oir') medio = reproductor + '<p class="tm-dr-cifra" id="' + uid + '_cifra"></p><div class="tm-dr-opts' + (conSemis(sel) || sel.tipo === 'c' ? ' tm-dr-una' : '') + '" id="' + uid + '_opts" role="group" aria-label="' + T('Ritmos', 'Rhythms') + '"></div>';   // con semicorcheas o compuestos, una columna: se lee mejor
      else if (modo === 'leer') medio = '<div class="tm-dr-ritmo" id="' + uid + '_ritmo"></div><p class="tm-aud-estado" id="' + uid + '_estado" aria-live="polite"></p><div class="tm-dr-audios" id="' + uid + '_opts" role="group" aria-label="' + T('Audios', 'Audio clips') + '"></div>';
      else medio = reproductor + '<p class="tm-dr-cifra" id="' + uid + '_cifra"></p><div class="tm-dr-esc" id="' + uid + '_esc"></div>' +
        '<div class="tm-dr-pal" role="group" aria-label="' + T('Tarjetas', 'Cards') + '">' + cartasFig.concat(['|', '||']).map(function (f) {
          return '<button type="button" class="tm-cc-carta" data-f="' + f + '"><span class="tm-dr-mini"></span><small>' + (FIG[f] ? FIG[f].nombre : f === '|' ? T('barra de compás', 'bar line') : T('doble barra final', 'final double bar line')) + '</small></button>';
        }).join('') + '</div>' +
        '<div class="tm-dr-herr"><button type="button" id="' + uid + '_des">' + T('↶ Deshacer', '↶ Undo') + '</button><button type="button" id="' + uid + '_bor">' + T('Borrar todo', 'Clear all') + '</button></div>' +
        '<p class="tm-dr-lleva" id="' + uid + '_lleva"></p><button type="button" class="tm-dr-corr" id="' + uid + '_corr">' + T('Corregir', 'Check') + '</button>';
      wrap.innerHTML = '<div class="tm-card">' + cabecera() + medio + pie + '</div>';
      if (modo !== 'leer') $('_play').addEventListener('click', function () {
        if (sonando >= 0) {   // parar
          parar(); actualizarPlay();
          $('_estado').textContent = escuchas < MAX_ESCUCHAS ? (modo === 'oir' ? T('¿Qué ritmo es?', 'Which rhythm is it?') : T('Escribe el ritmo con las tarjetas.', 'Write the rhythm with the cards.')) : T('Ya no quedan escuchas.', 'No listens left.');
          return;
        }
        if (!respondido && escuchas < MAX_ESCUCHAS) { escuchas++; tocar(it.p, 0); }
      });
      $('_otra').addEventListener('click', function () { tocar(it.p, 0, true); });
      $('_nxt').addEventListener('click', window.tmNotacion.diferido(siguiente));
      if (modo === 'escribir') {
        cartas().forEach(function (b) {
          var f = b.dataset.f;
          if (FIG[f]) mini(b.querySelector('.tm-dr-mini'), [f], FIG[f].nombre);
          else cartaBarra(b.querySelector('.tm-dr-mini'), f === '||');
          b.addEventListener('click', window.tmNotacion.diferido(function () { poner(f); }));
        });
        $('_des').addEventListener('click', window.tmNotacion.diferido(function () { if (!respondido) { puestos.pop(); pintarEscrito(); } }));
        $('_bor').addEventListener('click', window.tmNotacion.diferido(function () { if (!respondido) { puestos = []; pintarEscrito(); } }));
        $('_corr').addEventListener('click', window.tmNotacion.diferido(corregirEscrito));
      }
    }
    /* Al empezar (o volver al panel), arriba del ejercicio: el panel es largo y el botón queda abajo (Eduardo). Se
       descuenta la cabecera fija de la web. */
    function subir() {
      var cab = document.querySelector('.tm-site-header'), alto = cab ? cab.getBoundingClientRect().height : 0;
      var y = wrap.getBoundingClientRect().top + window.pageYOffset - alto - 12;
      if (wrap.getBoundingClientRect().top < alto || wrap.getBoundingClientRect().top > window.innerHeight * 0.3) window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
    var cartas = function () { return Array.prototype.slice.call(wrap.querySelectorAll('.tm-dr-pal .tm-cc-carta')); };
    var ancho = function (el) { return Math.max(200, (el || wrap).clientWidth - 20); };

    function siguiente() {
      parar();
      if (n >= TOTAL) { resultado(); return; }
      n++; escuchas = 0; respondido = false; puestos = [];
      var t = orden[n - 1], p;
      for (var k = 0; k < 60; k++) { p = generar(sel, t, uso); if (!vistos[t + clave(p)]) break; }   // sin repetir dictado (con tope)
      vistos[t + clave(p)] = 1;
      p.c.forEach(function (c) { c.forEach(function (cel) { var i = itemDe(cel); uso[i] = (uso[i] || 0) + 1; }); });   // lo que ya ha salido pesa menos
      // con semicorcheas, más despacio (Eduardo). En compuestos, el tempo es de la negra con puntillo.
      var bpm = compuesto(t) ? (conSemis(sel) ? 44 + rnd(11) : 54 + rnd(13)) : (conSemis(sel) ? 60 + rnd(13) : 72 + rnd(19));
      it = { t: t, nb: NB(t), p: p, bpm: bpm };
      it.spb = 60 / it.bpm;
      $('_fill').style.width = ((n - 1) / TOTAL * 100) + '%';
      $('_cnt').textContent = T('Dictado ' + n + ' de ' + TOTAL, 'Dictation ' + n + ' of ' + TOTAL);
      $('_fb').className = 'tm-aud-fb'; $('_part').className = 'tm-aud-part'; $('_acc').className = 'tm-aud-acc';
      if (modo === 'oir') montarOir();
      else if (modo === 'leer') montarLeer();
      else montarEscribir();
      if (n > 1) subir();
    }

    /* ---- oír: 4 ritmos escritos */
    function montarOir() {
      var ops = barajar([it.p].concat(distractores(it.p, sel)));
      it.ops = ops; it.bueno = ops.indexOf(it.p);
      $('_cifra').textContent = T('Compás de ' + cifra(it.t), 'Time signature: ' + cifra(it.t));
      var cont = $('_opts');
      cont.innerHTML = ops.map(function (q, i) {
        return '<button type="button" class="tm-dr-opt" data-i="' + i + '" disabled><span class="tm-dr-let">' + LETRAS[i] + '</span><span class="tm-dr-dib" id="' + uid + '_o' + i + '"></span></button>';
      }).join('');
      var w = ancho(cont.querySelector('.tm-dr-dib'));
      ops.forEach(function (q, i) { dibujar($('_o' + i), q, w, { escala: 0.8, alt: T('Ritmo ', 'Rhythm ') + LETRAS[i] + '. ' + describir(q) }); });
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-dr-opt'), function (b) { b.addEventListener('click', window.tmNotacion.diferido(function () { responderOpcion(+b.dataset.i); })); });
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
        T('Era el ritmo <strong>' + LETRAS[it.bueno] + '</strong>. El ' + LETRAS[i] + ' se diferencia en ' + dondeFalla(malos, it.nb) + '.',
          'It was rhythm <strong>' + LETRAS[it.bueno] + '</strong>. ' + LETRAS[i] + ' differs at ' + dondeFalla(malos, it.nb) + '.'));
      $('_estado').textContent = ''; actualizarPlay();
      terminar();
    }

    /* ---- leer: el ritmo escrito y 4 audios */
    function montarLeer() {
      var ops = barajar([it.p].concat(distractores(it.p, sel)));
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
          if (sonando === i) { parar(); actualizarAudios(); return; }   // parar (Eduardo): si ya se oye que no es ese, no hay que esperar a que acabe
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
        b.disabled = sonando === i || respondido ? false : quedan <= 0;   // mientras suena uno, se puede parar o pasar a otro
        b.textContent = sonando === i ? T('■ Parar', '■ Stop') : respondido ? T('▶ Escuchar', '▶ Listen') : quedan <= 0 ? T('Sin más escuchas', 'No more listens') : T('▶ Escuchar', '▶ Listen');
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
        T('Era el audio <strong>' + LETRAS[it.bueno] + '</strong>. El ' + LETRAS[i] + ' suena distinto en ' + dondeFalla(malos, it.nb) + '. Abajo tienes escrito lo que suena en el ' + LETRAS[i] + '.',
          'It was audio <strong>' + LETRAS[it.bueno] + '</strong>. ' + LETRAS[i] + ' sounds different at ' + dondeFalla(malos, it.nb) + '. Below, what plays in ' + LETRAS[i] + ' is written out.'));
      $('_estado').textContent = T('Puedes volver a escuchar los audios para compararlos.', 'You can listen to the audios again to compare them.');
      actualizarAudios();
      // lo que sonaba en el audio elegido, si no era el bueno, con los tiempos distintos en rojo
      if (!ok) partitura([{ lbl: T('Lo que suena en el audio ', 'What plays in audio ') + LETRAS[i], p: it.ops[i], rojo: marcas(malos) }]);
      $('_acc').className = 'tm-aud-acc tm-show'; $('_otra').style.display = 'none';
      if (n >= TOTAL) $('_nxt').textContent = T('Ver resultado →', 'See result →');
    }

    /* ---- escribir: tarjetas nota a nota. puestos = lo escrito, en orden: figuras, '|' (barra de compás) y '||' (doble
       barra final). Las barras las pone el alumno y un compás se puede llenar de más o de menos: se corrige al final. */
    var terminado = function () { return puestos[puestos.length - 1] === '||'; };
    var compasVacio = function () { return !puestos.length || puestos[puestos.length - 1] === '|'; };
    function compasesEscritos() {
      var cs = [[]];
      puestos.forEach(function (tk) { if (tk === '|') cs.push([]); else if (tk !== '||') cs[cs.length - 1].push(tk); });
      return cs;
    }
    var partesDe = function (c) { return c.reduce(function (s, f) { return s + FIG[f].u; }, 0); };
    /* Lo que lleva un compás, en palabras: en simples, tiempos; en compuestos, corcheas (como se cuentan en clase) */
    function cuanto(u, t) {
      if (compuesto(t)) { var c = u / 12; return numero(c) + (c === 1 ? T(' corchea', ' eighth note') : T(' corcheas', ' eighth notes')); }
      var b = u / 24; return numero(b) + (b === 1 ? T(' tiempo', ' beat') : T(' tiempos', ' beats'));
    }
    function montarEscribir() {
      $('_cifra').textContent = T('Compás de ' + cifra(it.t) + ' · dos compases', 'Time signature: ' + cifra(it.t) + ' · two measures');
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
      var t = it.t, B = BT(t), lleno = NB(t) * B, cs = compasesEscritos(), problemas = [], rojo = {};
      // dónde empieza cada figura escrita (en partes, contando seguido) y qué elemento de puestos es
      var pos = [], u = 0, fs = [];
      puestos.forEach(function (tk, i) { if (FIG[tk]) { pos.push({ i: i, u: u, d: FIG[tk].u }); u += FIG[tk].u; fs.push(tk); } });
      if (cs.length === 1) problemas.push(T('falta la barra de compás entre los dos compases', 'the bar line between the two measures is missing'));
      else if (cs.length > 2) problemas.push(T('has puesto ' + (cs.length - 1) + ' barras de compás, y el dictado tiene dos compases: una barra en medio y la doble barra al final', 'you put ' + (cs.length - 1) + ' bar lines, and the dictation has two measures: one bar line in the middle and the double bar line at the end'));
      cs.forEach(function (c, k) {
        var pc = partesDe(c);
        if (pc !== lleno && cs.length > 1) problemas.push(T('el compás ' + (k + 1) + ' tiene ' + cuanto(pc, t) + ', y en ' + cifra(t) + ' caben ' + cuanto(lleno, t), 'measure ' + (k + 1) + ' has ' + cuanto(pc, t) + ', and ' + cifra(t) + ' holds ' + cuanto(lleno, t)));
      });
      if (u === 2 * lleno) {   // cuenta lo que suena: los silencios se pueden escribir juntos o por separado
        var sonido = difTiempos(mapa(it.p), porTiempos(mapaFiguras(fs), B));
        sonido.forEach(function (x) { pos.forEach(function (q) { if (q.u < (x + 1) * B && q.u + q.d > x * B) rojo[q.i] = 1; }); });   // la figura toca ese tiempo
        if (sonido.length) problemas.push(T((sonido.length === 1 ? 'el ritmo falla en ' : 'el ritmo falla en ' + sonido.length + ' tiempos: ') + dondeFalla(sonido, it.nb) + ' (en rojo)',
          (sonido.length === 1 ? 'the rhythm is wrong at ' : 'the rhythm is wrong in ' + sonido.length + ' beats: ') + dondeFalla(sonido, it.nb) + ' (in red)'));
      } else problemas.push(T('en total has escrito ' + cuanto(u, t) + ', y el dictado tiene ' + cuanto(2 * lleno, t) + ' (dos compases de ' + cifra(t) + ')', 'in total you wrote ' + cuanto(u, t) + ', and the dictation has ' + cuanto(2 * lleno, t) + ' (two measures of ' + cifra(t) + ')'));
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
      b.disabled = sonando >= 0 ? false : quedan <= 0;
      b.textContent = sonando >= 0 ? T('■ Parar', '■ Stop') : escuchas === 0 ? T('▶ Escuchar', '▶ Listen') : quedan > 0 ? T('▶ Escuchar otra vez (' + quedan + (quedan === 1 ? ' vez más)' : ' veces más)'), '▶ Listen again (' + quedan + (quedan === 1 ? ' more time)' : ' more times)')) : T('Sin más escuchas', 'No more listens');
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
      window.tmPiano.playEvents(entrada(it.t, it.spb).concat(eventos(p, it.spb, it.nb * it.spb))).then(function (d) {
        if (g !== gen) return;
        if (!d) {   // sin sonido: no gasta la escucha
          sonando = -1;
          if (!gratis) { escuchas--; if (modo === 'leer') it.esc[cual]--; }
          actualizarPlay();
          $('_estado').textContent = T('No se ha podido reproducir el sonido. Comprueba la conexión y vuelve a pulsar.', 'The sound could not be played. Check your connection and press again.');
          return;
        }
        if (!respondido && modo !== 'leer') timers.push(setTimeout(function () { if (g === gen && !respondido) $('_estado').textContent = T('Suena el dictado…', 'The dictation is playing…'); }, it.nb * it.spb * 1000));
        timers.push(setTimeout(function () {
          if (g !== gen) return;
          sonando = -1;
          if (!respondido && modo !== 'leer') $('_estado').textContent = escuchas < MAX_ESCUCHAS ? (modo === 'oir' ? T('¿Qué ritmo es?', 'Which rhythm is it?') : T('Escribe el ritmo con las tarjetas.', 'Write the rhythm with the cards.')) : T('Ya no quedan escuchas.', 'No listens left.');
          actualizarPlay();
        }, ((duracion(p) + it.nb) * it.spb + 0.5) * 1000));
      });
    }
    function resultado() {
      parar();
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-score"><b>' + aciertos + '/' + TOTAL + '</b><span>' + Math.round(aciertos / TOTAL * 100) + '%</span></div>' +
        '<div class="tm-aud-acc tm-show"><button class="tm-aud-sec" id="' + uid + '_cambiar" type="button">' + T('Cambiar las figuras', 'Change the notes') + '</button>' +
        '<button class="tm-aud-nxt" id="' + uid + '_re" type="button">' + T('Otros 10 dictados', 'Another 10 dictations') + '</button></div></div>';
      $('_re').addEventListener('click', function () { wrap.innerHTML = '<div class="tm-card"><button class="tm-aud-btnplay" id="' + uid + '_go" type="button"></button></div>'; empezar(); });
      $('_cambiar').addEventListener('click', function () { inicio(); subir(); });
    }
    inicio();
  }

  window.tmDictadoRitmico = tmDictadoRitmico;
  window.tmDictadoRitmicoDatos = { FIG: FIG, CEL: CEL, ITEM: ITEM, CATS: CATS, NIVELES: NIVELES, GRUPOS: GRUPOS, TUP: TUP, seleccionDeGrupo: seleccionDeGrupo, limpiar: limpiar, generar: generar, rellenar: rellenar, valido: valido, esDictado: esDictado, distractores: distractores, mapa: mapa, mapaU: mapaU, clave: clave, puede: puede, compasDe: compasDe, fila: fila, filaEscrita: filaEscrita, distancia: distancia, eventos: eventos, difSonido: difSonido, compasesPosibles: compasesPosibles, celdasDe: celdasDe, NB: NB, BT: BT, uCel: uCel };   // para las pruebas
})();
