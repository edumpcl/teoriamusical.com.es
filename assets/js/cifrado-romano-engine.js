/* Cifrado romano — /ejercicios/cifrado-romano/

   Dos ejercicios en uno, sobre acordes diatónicos de una tonalidad mayor o menor:
     · IDENTIFICAR: se ve un acorde escrito (con la armadura y el nombre de la tonalidad) y se elige su cifrado.
     · CONSTRUIR:   se da la tonalidad y el cifrado y se escribe el acorde en el pentagrama (la nota del bajo viene dada).

   Cinco niveles, por tipo de acorde: 1 tríadas en estado fundamental · 2 tríadas invertidas · 3 séptimas en estado fundamental ·
   4 séptimas invertidas · 5 todo mezclado.

   EL CIFRADO es el del sitio (páginas de acordes tríadas y de séptimas; datos en tools/notacion/datos/acordes-septimas.js):
     · El número romano indica el GRADO y se escribe SIEMPRE en mayúscula: la calidad del acorde no se marca con mayúsculas o minúsculas.
     · Las cifras (apiladas, como en el pentagrama) dicen qué hay sobre el bajo: sin cifra = tríada en estado fundamental; 6 = 1.ª inversión;
       6/4 = 2.ª inversión; 7 = séptima.
     · El signo + marca la SENSIBLE (la tercera del V, la fundamental del VII, o la nota que ocupe esa posición sobre el bajo).
     · Un número TACHADO es un intervalo disminuido (5 tachado: quinta disminuida); los números tachados se reservan a lo disminuido.
     · Tríadas: fundamental sin cifra · V: + · VII: 5 tachado · 1.ª inv.: 6 (sobre el VII: +6/3) · 2.ª inv.: 6/4 (V: +6/4; VII: 6/+4).
     · Séptimas: dominante 7/+ · 6/5̸ · +6 · +4; sensible 7/5̸ · +6/5 · +4/3 · 4/+2; disminuida 7̸/5̸ · +6/5̸ · +4/♭3 · +2.
   En tonalidad menor se usa la escala menor ARMÓNICA (el 7.º grado sube): el V y el VII llevan la sensible, que no está en la armadura.
   No se pregunta el III grado (su cifrado depende del contexto y de la calidad: en menor es mayor o aumentado), ni el II7 ni otras séptimas
   que el método no cifra: solo la séptima de dominante (V7), la de sensible (VII7 en mayor) y la disminuida (VII7 en menor).

   Se audita con tools/verificar-cifrado-romano.js, que NO se fía de este motor: recalcula cada acorde con su propia aritmética de
   semitonos y contrasta el cifrado con las tablas del sitio. */
(function () {
  'use strict';

  var EN = typeof document !== 'undefined' && document.documentElement.lang === 'en';
  var T = function (es, en) { return EN ? en : es; };

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

  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var PC = [0, 2, 4, 5, 7, 9, 11];
  var NOMBRES = EN ? ['C', 'D', 'E', 'F', 'G', 'A', 'B'] : ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var SIGNO = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };
  var ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

  /* tonica = letra (c=0 … b=6); arm = alteraciones de la armadura (+ sostenidos, − bemoles). La menor usa la armadura de su relativa mayor. */
  var TONALIDADES = [
    { id: 'C', modo: 'M', tonica: 0, arm: 0, nombre: T('Do mayor', 'C major') }, { id: 'G', modo: 'M', tonica: 4, arm: 1, nombre: T('Sol mayor', 'G major') },
    { id: 'D', modo: 'M', tonica: 1, arm: 2, nombre: T('Re mayor', 'D major') }, { id: 'A', modo: 'M', tonica: 5, arm: 3, nombre: T('La mayor', 'A major') },
    { id: 'F', modo: 'M', tonica: 3, arm: -1, nombre: T('Fa mayor', 'F major') }, { id: 'Bb', modo: 'M', tonica: 6, arm: -2, nombre: T('Si♭ mayor', 'B♭ major') },
    { id: 'Eb', modo: 'M', tonica: 2, arm: -3, nombre: T('Mi♭ mayor', 'E♭ major') },
    { id: 'a', modo: 'm', tonica: 5, arm: 0, nombre: T('La menor', 'A minor') }, { id: 'e', modo: 'm', tonica: 2, arm: 1, nombre: T('Mi menor', 'E minor') },
    { id: 'b', modo: 'm', tonica: 6, arm: 2, nombre: T('Si menor', 'B minor') }, { id: 'fs', modo: 'm', tonica: 3, arm: 3, nombre: T('Fa♯ menor', 'F♯ minor') },
    { id: 'd', modo: 'm', tonica: 1, arm: -1, nombre: T('Re menor', 'D minor') }, { id: 'g', modo: 'm', tonica: 4, arm: -2, nombre: T('Sol menor', 'G minor') },
    { id: 'c', modo: 'm', tonica: 0, arm: -3, nombre: T('Do menor', 'C minor') }
  ];
  function tonalidad(id) { return TONALIDADES.filter(function (t) { return t.id === id; })[0]; }

  /* Alteración que la armadura da a una letra. */
  function altArm(arm, letra) {
    var l = typeof letra === 'number' ? LETRAS[letra] : letra;
    if (arm > 0 && 'fcgdaeb'.slice(0, arm).indexOf(l) >= 0) return 1;
    if (arm < 0 && 'beadgcf'.slice(0, -arm).indexOf(l) >= 0) return -1;
    return 0;
  }

  /* Grado g (1-7) de la tonalidad: letra y alteración real (en menor, el 7.º sube: escala menor armónica). */
  function grado(tonal, g) {
    var letra = (tonal.tonica + g - 1) % 7;
    var alt = altArm(tonal.arm, letra) + (tonal.modo === 'm' && g === 7 ? 1 : 0);
    return { letra: letra, alt: alt, pc: ((PC[letra] + alt) % 12 + 12) % 12 };
  }

  /* ------------------------------------------------------------ Acordes */

  var CALIDADES_TRIADA = { '4,7': 'M', '3,7': 'm', '3,6': 'd', '4,8': 'a' };
  var CALIDADES_SEPTIMA = { '4,7,10': 'D7', '3,7,10': 'm7', '3,6,10': 'ø7', '3,6,9': 'o7', '4,7,11': 'M7' };

  function acordeEn(tonal, g, septima) {
    var gs = [g, g + 2, g + 4].concat(septima ? [g + 6] : []).map(function (x) { return grado(tonal, ((x - 1) % 7) + 1); });
    var r = gs[0].pc;
    var sem = gs.slice(1).map(function (n) { return ((n.pc - r) % 12 + 12) % 12; });
    var cal = (septima ? CALIDADES_SEPTIMA : CALIDADES_TRIADA)[sem.join(',')];
    return { grado: g, septima: !!septima, notas: gs, calidad: cal, tonal: tonal };
  }

  /* ---------------------------------------------------------- Cifrado */

  function F(t, tachado) { return tachado ? { t: t, tachado: true } : { t: t }; }

  /* Cifras de las séptimas (las del sitio, iguales en cualquier tonalidad): [estado fundamental, 1.ª, 2.ª, 3.ª inversión] */
  var CIFRAS_SEPTIMA = {
    D7: [[F('7'), F('+')], [F('6'), F('5', 1)], [F('+6')], [F('+4')]],
    'ø7': [[F('7'), F('5', 1)], [F('+6'), F('5')], [F('+4'), F('3')], [F('4'), F('+2')]],
    o7: [[F('7', 1), F('5', 1)], [F('+6'), F('5', 1)], [F('+4'), F('♭3')], [F('+2')]]
  };

  /* Las cifras que existen para una tríada en cada posición (para las alternativas del ejercicio). */
  var CIFRAS_TRIADA = [[[], [F('+')], [F('5', 1)]], [[F('6')], [F('+6'), F('3')]], [[F('6'), F('4')], [F('+6'), F('4')], [F('6'), F('+4')]]];

  function esSensible(tonal, n) { var s = grado(tonal, 7); return n.letra === s.letra && n.alt === s.alt; }

  /* Cifras de una tríada (las de la página de acordes tríadas): la sensible se marca con +, la quinta disminuida con el 5 tachado. */
  function cifrasTriada(ac, inv) {
    var s = ac.notas.map(function (n) { return esSensible(ac.tonal, n); });   // [fundamental, tercera, quinta]
    if (inv === 0) return ac.calidad === 'd' ? [F('5', 1)] : (s[0] || s[1] || s[2]) ? [F('+')] : [];
    if (inv === 1) return s[0] ? [F('+6'), F('3')] : [F('6')];
    return s[0] ? [F('6'), F('+4')] : s[1] ? [F('+6'), F('4')] : [F('6'), F('4')];
  }

  /* Cifrado: { num: 'V', fig: [{ t:'7' }, { t:'+' }] } (las cifras de arriba abajo) */
  function cifrado(ac, inv) {
    var fig = ac.septima ? CIFRAS_SEPTIMA[ac.calidad][inv] : cifrasTriada(ac, inv);
    return { num: ROMANOS[ac.grado - 1], fig: fig.map(function (f) { return f.tachado ? { t: f.t, tachado: true } : { t: f.t }; }) };
  }
  function figTexto(f) { return f.tachado ? f.t + '̸' : f.t; }
  function cifTexto(cf) { return cf.num + (cf.fig.length ? ' ' + cf.fig.map(figTexto).join('/') : ''); }
  function cifHtml(cf) {
    var cuelga = cf.fig.some(function (x) { return /^[+♭][0-9]$/.test(x.t); });
    var f = cf.fig.length ? '<span class="tm-cr-fig' + (cuelga ? ' tm-cr-cuelga' : '') + '">' + cf.fig.map(function (x) { var m = /^([+♭])([0-9])$/.exec(x.t);   // el + o el ♭ delante de la cifra cuelgan a su izquierda: los números quedan alineados
      return '<span' + (x.tachado ? ' class="tm-cr-t"' : '') + '>' + (m ? '<i>' + m[1] + '</i>' + m[2] : x.t) + '</span>'; }).join('') + '</span>' : '';
    return '<span class="tm-cr-rom">' + cf.num + '</span>' + f;
  }
  function cifVoz(cf) {   // para lectores de pantalla
    return cf.num + cf.fig.map(function (x) { return ', ' + (x.t === '+' ? 'más' : x.t.replace('+', 'más ').replace('♭', 'bemol ')) + (x.tachado ? ' tachado' : ''); }).join('');
  }

  /* Acordes que se preguntan: los diatónicos con cifrado definido en el método. */
  var TRIADAS_GRADOS = { M: [1, 2, 4, 5, 6, 7], m: [1, 2, 4, 5, 6, 7] };
  var SEPTIMAS_GRADOS = { M: [5, 7], m: [5, 7] };

  var NIVELES = [
    { n: 1, t: T('Tríadas en estado fundamental', 'Triads in root position'), d: T('Los grados I, II, IV, V, VI y VII, en tonalidades mayores y menores', 'Degrees I, II, IV, V, VI and VII, in major and minor keys'), sept: false, trias: true, invs: [0] },
    { n: 2, t: T('Tríadas invertidas', 'Inverted triads'), d: T('Primera inversión (6) y segunda inversión (6/4)', 'First inversion (6) and second inversion (6/4)'), sept: false, trias: true, invs: [1, 2] },
    { n: 3, t: T('Séptimas en estado fundamental', 'Seventh chords in root position'), d: T('Séptima de dominante (V7) y de sensible o disminuida (VII7)', 'Dominant seventh (V7) and leading-tone or diminished seventh (VII7)'), sept: true, trias: false, invs: [0] },
    { n: 4, t: T('Séptimas invertidas', 'Inverted seventh chords'), d: T('Primera, segunda y tercera inversión', 'First, second and third inversion'), sept: true, trias: false, invs: [1, 2, 3] },
    { n: 5, t: T('Todo mezclado', 'Everything mixed'), d: T('Tríadas y séptimas, en todas las posiciones', 'Triads and seventh chords, in every position'), sept: true, trias: true, invs: [0, 1, 2, 3] }
  ];
  function nivel(n) { return NIVELES.filter(function (x) { return x.n === n; })[0]; }

  /* ---------------------------------------------------------- Colocación */

  function notaClave(n) { return LETRAS[n.letra] + (n.alt > 0 ? '##'.slice(0, n.alt) : n.alt < 0 ? 'bb'.slice(0, -n.alt) : '') + '/' + n.oct; }

  /* Pasos diatónicos (octava*7 + letra) del acorde en su posición: la nota más grave entre si3 (27) y la4 (33), así que todo cabe entre
     si3 y sol5. Las notas salen de apilar terceras sobre la fundamental; cada inversión sube una octava la nota más grave. */
  function colocar(ac, inv) {
    var base = ac.notas[0].letra;
    var elems = ac.notas.map(function (n, i) { return { n: n, i: i, paso: 28 + base + 2 * i }; });
    for (var k = 0; k < inv; k++) { var x = elems.shift(); x.paso += 7; elems.push(x); }
    var d = 0;
    while (elems[0].paso + d < 27) d += 7;
    while (elems[0].paso + d > 33) d -= 7;
    return elems.map(function (x) {
      var paso = x.paso + d;
      return { letra: x.n.letra, alt: x.n.alt, oct: Math.floor(paso / 7), paso: paso, rol: x.i };
    });
  }

  function midiDe(n) { return (n.oct + 1) * 12 + PC[n.letra] + n.alt; }
  function nombreDe(n) { return NOMBRES[n.letra] + SIGNO[n.alt]; }

  /* ------------------------------------------------------------ Elementos */

  function generarUno(o, rnd) {
    var A = azar(rnd), lv = nivel(o.nivel || 1);
    var tonal = o.tonalidad ? tonalidad(o.tonalidad) : A.uno(TONALIDADES);
    var sept = o.septima !== undefined ? !!o.septima : (lv.sept && lv.trias ? rnd() < 0.5 : lv.sept);
    var gs = (sept ? SEPTIMAS_GRADOS : TRIADAS_GRADOS)[tonal.modo];
    var g = o.grado || A.uno(gs);
    var invs = lv.invs.filter(function (i) { return sept || i < 3; });
    var inv = o.inversion !== undefined ? o.inversion : A.uno(invs);
    var ac = acordeEn(tonal, g, sept);
    var notas = colocar(ac, inv);
    return { nivel: lv.n, tonalidad: tonal.id, grado: g, septima: sept, inversion: inv, calidad: ac.calidad, cif: cifrado(ac, inv), notas: notas, acorde: ac };
  }

  function clave(it) { return it.tonalidad + '|' + it.grado + '|' + it.septima + '|' + it.inversion; }

  function generarLote(o, semilla) {
    var rnd = mulberry32(semilla === undefined ? Math.floor(Math.random() * 4294967296) : semilla);
    var n = o.n || 6, out = [], vistos = {}, intentos = 0;
    while (out.length < n && intentos++ < 400) {
      var it = generarUno({ nivel: o.nivel }, rnd);
      if (vistos[clave(it)]) continue;
      if (out.length && out[out.length - 1].tonalidad === it.tonalidad) continue;
      vistos[clave(it)] = 1; out.push(it);
    }
    return out;
  }

  /* Alternativas (identificar): el cifrado correcto y otros plausibles. Siempre distintos entre sí:
     1) el mismo acorde en otra posición; 2) la misma posición con una cifra mal puesta (sin el + o sin el tachado); 3) otros grados. */
  function alternativas(it, rnd, max) {
    var A = azar(rnd), lv = nivel(it.nivel), tonal = tonalidad(it.tonalidad);
    var correcto = cifTexto(it.cif), pool = [];
    function add(cf, tipo) { var t = cifTexto(cf); if (t !== correcto) pool.push({ cf: cf, t: t, tipo: tipo }); }
    lv.invs.forEach(function (i) {
      if (i === it.inversion || (!it.septima && i === 3)) return;
      add(cifrado(acordeEn(tonal, it.grado, it.septima), i), 'inv');
    });
    var c = it.cif;
    var tieneMas = c.fig.some(function (f) { return f.t.indexOf('+') >= 0; }), tieneTach = c.fig.some(function (f) { return f.tachado; });
    var sinMas = c.fig.map(function (f) { return { t: f.t.replace('+', ''), tachado: f.tachado }; }).filter(function (f) { return f.t; });
    var sinTach = c.fig.map(function (f) { return { t: f.t }; });
    var sinAmbos = c.fig.map(function (f) { return { t: f.t.replace('+', '') }; }).filter(function (f) { return f.t; });
    var limpia = function (fs) { return fs.map(function (f) { return f.tachado ? { t: f.t, tachado: true } : { t: f.t }; }); };
    if (tieneMas) add({ num: c.num, fig: limpia(sinMas) }, 'cifra');
    if (tieneTach) add({ num: c.num, fig: limpia(sinTach) }, 'cifra');
    if (tieneMas && tieneTach) add({ num: c.num, fig: limpia(sinAmbos) }, 'cifra');
    // otras cifras que existen en el método para esta posición (otro tipo de acorde sobre el mismo grado)
    var otras = it.septima ? Object.keys(CIFRAS_SEPTIMA).map(function (k) { return CIFRAS_SEPTIMA[k][it.inversion]; }) : CIFRAS_TRIADA[it.inversion];
    otras.forEach(function (fs_) { add({ num: c.num, fig: limpia(fs_) }, 'cifra'); });
    // cada número tachado, sin tachar (de uno en uno)
    c.fig.forEach(function (f, i) { if (f.tachado) add({ num: c.num, fig: limpia(c.fig.map(function (g, j) { return j === i ? { t: g.t } : g; })) }, 'cifra'); });
    var gs = (it.septima ? SEPTIMAS_GRADOS : TRIADAS_GRADOS)[tonal.modo];
    gs.forEach(function (g) { if (g !== it.grado) add(cifrado(acordeEn(tonal, g, it.septima), it.inversion), 'grado'); });
    var vistos = {}; pool = pool.filter(function (p) { if (vistos[p.t]) return false; vistos[p.t] = 1; return true; });
    var elegidas = [];
    ['inv', 'cifra', 'grado'].forEach(function (tp) { A.barajar(pool.filter(function (p) { return p.tipo === tp; })).forEach(function (p) { elegidas.push(p); }); });
    var tot = Math.min(max || 6, 1 + elegidas.length);
    var opciones = [{ cf: it.cif, t: correcto, ok: true }].concat(elegidas.slice(0, tot - 1).map(function (p) { return { cf: p.cf, t: p.t, ok: false }; }));
    return A.barajar(opciones);
  }

  /* --------------------------------------------------------- Explicación */

  var ORD = ['', '1.º', '2.º', '3.º', '4.º', '5.º', '6.º', '7.º'];
  var ORD_EN = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];
  var CALIDAD_TXT = {
    M: T('tríada mayor', 'major triad'), m: T('tríada menor', 'minor triad'), d: T('tríada disminuida', 'diminished triad'), a: T('tríada aumentada', 'augmented triad'),
    D7: T('séptima de dominante', 'dominant seventh'), m7: T('séptima menor', 'minor seventh'), 'ø7': T('séptima de sensible (semidisminuida)', 'leading-tone (half-diminished) seventh'),
    o7: T('séptima disminuida', 'diminished seventh'), M7: T('séptima mayor', 'major seventh')
  };
  var POS_TXT = [T('estado fundamental', 'root position'), T('primera inversión', 'first inversion'), T('segunda inversión', 'second inversion'), T('tercera inversión', 'third inversion')];
  var BAJO_TXT = [T('la fundamental', 'the root'), T('la 3.ª', 'the 3rd'), T('la 5.ª', 'the 5th'), T('la 7.ª', 'the 7th')];

  /* Qué significa cada cifra, para este acorde y esta posición. */
  function porQueCifra(it) {
    var ac = it.acorde, tonal = ac.tonal, sens = nombreDe(grado(tonal, 7)), inv = it.inversion, cf = it.cif;
    if (ac.septima) {
      var K = ac.calidad;
      var t = {
        D7: [T('el 7 indica la séptima entre las notas extremas y el + marca la sensible (' + sens + '), que es la 3.ª del acorde', 'the 7 shows the seventh between the outer notes and the + marks the leading tone (' + sens + '), the 3rd of the chord'),
          T('el 6 y el 5 tachado: sobre el bajo (la sensible) hay una sexta y una quinta disminuida', 'the 6 and the struck-through 5: above the bass (the leading tone) there is a sixth and a diminished fifth'),
          T('el +6: la sensible está a distancia de sexta del bajo', 'the +6: the leading tone is a sixth above the bass'),
          T('el +4: la sensible está a distancia de cuarta del bajo', 'the +4: the leading tone is a fourth above the bass')],
        'ø7': [T('el 7 indica la séptima y el 5 tachado la quinta disminuida', 'the 7 shows the seventh and the struck-through 5 the diminished fifth'),
          T('el +6: la sensible, que es la fundamental, está a una sexta del bajo; el 5 completa la cifra', 'the +6: the leading tone, which is the root, is a sixth above the bass; the 5 completes the figure'),
          T('el +4 señala la sensible a una cuarta del bajo; el 3 completa la cifra', 'the +4 marks the leading tone a fourth above the bass; the 3 completes the figure'),
          T('el 4 y el +2: la sensible está a una segunda del bajo', 'the 4 and the +2: the leading tone is a second above the bass')],
        o7: [T('el 7 tachado y el 5 tachado: séptima y quinta disminuidas', 'the struck-through 7 and 5: diminished seventh and fifth'),
          T('el +6 marca la sensible (la fundamental) a una sexta del bajo; el 5 tachado es la quinta disminuida', 'the +6 marks the leading tone (the root) a sixth above the bass; the struck-through 5 is the diminished fifth'),
          T('el +4 marca la sensible a una cuarta del bajo; el ♭3 es la tercera alterada', 'the +4 marks the leading tone a fourth above the bass; the ♭3 is the altered third'),
          T('el +2: la sensible está a una segunda del bajo', 'the +2: the leading tone is a second above the bass')]
      }[K];
      return t ? t[inv] : '';
    }
    if (inv === 0) return ac.calidad === 'd' ? T('el 5 tachado señala la quinta disminuida (los números tachados se reservan para los acordes disminuidos)', 'the struck-through 5 shows the diminished fifth (struck-through numbers are reserved for diminished chords)')
      : cf.fig.length ? T('el + marca la sensible (' + sens + ')', 'the + marks the leading tone (' + sens + ')')
        : T('un acorde en estado fundamental sin alteraciones no lleva cifra', 'a root-position chord with no altered notes has no figure');
    if (inv === 1) return cf.fig.length === 2 ? T('el +6 marca la sensible (' + sens + '), que está a una sexta del bajo; el 3 de abajo lo distingue de la 2.ª inversión de la séptima de dominante', 'the +6 marks the leading tone (' + sens + '), a sixth above the bass; the 3 below tells it apart from the second inversion of the dominant seventh')
      : T('la 6.ª sobre el bajo se cifra con un 6', 'the sixth above the bass is figured with a 6');
    var v = cf.fig.map(function (f) { return f.t; });
    if (v.indexOf('+6') >= 0) return T('el +6 marca la sensible (' + sens + ') a una sexta del bajo; la cuarta se cifra con un 4', 'the +6 marks the leading tone (' + sens + ') a sixth above the bass; the fourth is figured with a 4');
    if (v.indexOf('+4') >= 0) return T('el +4 marca la sensible (' + sens + ') a una cuarta del bajo; la sexta se cifra con un 6', 'the +4 marks the leading tone (' + sens + ') a fourth above the bass; the sixth is figured with a 6');
    return T('la sexta con un 6 y la cuarta con un 4', 'the sixth with a 6 and the fourth with a 4');
  }

  function explicar(it) {
    var tonal = tonalidad(it.tonalidad), ac = it.acorde;
    var notas = ac.notas.map(nombreDe).join(' – ');
    var raiz = nombreDe(ac.notas[0]);
    var txt = T('En ' + tonal.nombre + ', el acorde del ' + ORD[it.grado] + ' grado (' + raiz + ') es ' + notas + ': ' + CALIDAD_TXT[it.calidad] + '. El número romano se escribe siempre en mayúscula: <strong>' + ROMANOS[it.grado - 1] + '</strong>. ',
      'In ' + tonal.nombre + ', the chord on the ' + ORD_EN[it.grado] + ' degree (' + raiz + ') is ' + notas + ': ' + CALIDAD_TXT[it.calidad] + '. The Roman numeral is always written in upper case: <strong>' + ROMANOS[it.grado - 1] + '</strong>. ');
    if (tonal.modo === 'm' && (it.grado === 5 || it.grado === 7)) {
      var s = grado(tonal, 7);
      txt += T('El ' + nombreDe(s) + ' es la sensible: en la escala menor armónica el 7.º grado sube un semitono y esa alteración no está en la armadura. ', 'The ' + nombreDe(s) + ' is the leading tone: in the harmonic minor scale the 7th degree is raised a semitone and that accidental is not in the key signature. ');
    }
    var pos = it.inversion ? T('Está en ' + POS_TXT[it.inversion] + ' (el bajo es ' + BAJO_TXT[it.inversion] + ', ' + nombreDe(it.notas[0]) + '). ', 'It is in ' + POS_TXT[it.inversion] + ' (the bass is ' + BAJO_TXT[it.inversion] + ', ' + nombreDe(it.notas[0]) + '). ') : '';
    var por = porQueCifra(it);
    txt += pos + T('Cifrado: <strong>' + cifTexto(it.cif) + '</strong>' + (por ? ' (' + por + ').' : '.'), 'Figures: <strong>' + cifTexto(it.cif) + '</strong>' + (por ? ' (' + por + ').' : '.'));
    return txt;
  }

  /* ----------------------------------------------------------------- Dibujo */

  function conVerovio() { return !!(window.tmNotacion && window.tmNotacion.cargado && window.tmNotacion.cargado()); }

  function alturaAbs(tonal, n, marca) {   // alteración real de una nota colocada por el alumno
    return marca === 'auto' || marca === undefined ? altArm(tonal.arm, n.letra) : marca;
  }

  function filaDe(tonal, notas) {
    return {
      armadura: tonal.arm, llave: false, barraFinal: 'end',
      pentagramas: [{ clave: 'sol', compases: [[{ notas: notas, d: 'w' }]] }]
    };
  }

  function dibujar(div, it, opciones) {
    var tonal = tonalidad(it.tonalidad);
    var notas = (opciones && opciones.notas) || it.notas;
    var keys = notas.map(function (n) { return n.color ? { key: notaClave(n), color: n.color } : notaClave(n); });
    var res = window.tmNotacion.dibujarSync(div, filaDe(tonal, keys), { escala: (opciones && opciones.escala) || 1.4, separacion: 0.5, margenIzq: 12, id: 'cr', alt: (opciones && opciones.alt) || T('Un acorde en una redonda, en ' + tonal.nombre, 'A chord as a whole note, in ' + tonal.nombre) });
    res.elemento.style.maxWidth = '100%';
    return res;
  }

  /* --------------------------------------------------------------------- UI */

  var PREGUNTAS = 6;

  var CSS = [
    '.tm-cr{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-cr-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-cr-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-cr-sub{color:#514232;font-size:.92rem;margin-bottom:14px;line-height:1.5;}',
    '.tm-cr-grupo{font-size:.9rem;font-weight:700;color:#1a1208;margin:14px 0 6px;}',
    '.tm-cr-tabs{display:flex;gap:8px;flex-wrap:wrap;}',
    '.tm-cr-tab{flex:1 1 200px;border:2px solid #d8d0b8;background:#faf7f2;border-radius:10px;padding:12px 14px;min-height:44px;cursor:pointer;font-family:inherit;font-weight:700;font-size:.98rem;color:#1a1208;text-align:left;}',
    '.tm-cr-tab span{display:block;font-weight:400;font-size:.82rem;color:#514232;margin-top:2px;}',
    '.tm-cr-tab[aria-pressed="true"]{border-color:#8b6914;background:#8b6914;color:#fff;}',
    '.tm-cr-tab[aria-pressed="true"] span{color:#f6ecd2;}',
    '.tm-cr-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-cr-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:13px 16px;cursor:pointer;text-align:left;font-family:inherit;min-height:44px;}',
    '.tm-cr-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-cr-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:2px;}',
    '.tm-cr-modo span{font-size:.84rem;color:#6b5210;}',
    '.tm-cr-prog{font-size:.8rem;color:#6b5210;font-weight:600;margin-bottom:5px;}',
    '.tm-cr-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-cr-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-cr-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:4px 0 2px;}',
    '.tm-cr-tonal{font-size:.95rem;color:#514232;text-align:center;margin:0 0 6px;}',
    '.tm-cr-tonal strong{color:#1a1208;}',
    '.tm-cr-dibujo{display:flex;justify-content:center;margin:0 auto 12px;}',
    '.tm-cr-dibujo > div{width:100%;display:flex;justify-content:center;}',
    '.tm-cr-ops{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}',
    '.tm-cr-op{border:2px solid #d8d0b8;background:#fff;border-radius:10px;padding:8px 6px;min-height:64px;cursor:pointer;font-family:inherit;color:#1a1208;display:flex;align-items:center;justify-content:center;}',
    '.tm-cr-op:hover:not([disabled]){border-color:#8b6914;background:#fff8ee;}',
    '.tm-cr-op.tm-ok{border-color:#1c7e46!important;background:#1c7e46!important;color:#fff!important;}',
    '.tm-cr-op.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-cr-op.tm-buena{border-color:#1c7e46!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-cr-op[disabled]{cursor:default;}',
    /* número romano + cifras apiladas; el número tachado lleva un trazo diagonal (nunca un carácter) */
    '.tm-cr-rom{font-family:Georgia,"Times New Roman",serif;font-weight:700;font-size:1.4rem;line-height:1;vertical-align:middle;}',
    '.tm-cr-fig{display:inline-flex;flex-direction:column;align-items:center;line-height:1.02;font-family:Georgia,"Times New Roman",serif;font-weight:700;font-size:.95rem;margin-left:.35em;vertical-align:middle;}',
    '.tm-cr-cuelga{margin-left:1.05em;}',
    '.tm-cr-fig i{position:absolute;right:100%;font-style:normal;padding-right:.04em;}',
    '.tm-cr-fig > span{position:relative;display:block;padding:0 .12em;}',
    '.tm-cr-t::after{content:"";position:absolute;left:-.05em;right:-.05em;top:50%;border-top:.1em solid currentColor;transform:rotate(-38deg);}',
    '.tm-cr-pedido{display:inline-flex;align-items:center;gap:4px;background:#fff8ee;border:1px solid #e8d9b0;border-radius:8px;padding:6px 16px;}',
    '.tm-cr-pedido .tm-cr-rom{font-size:1.8rem;}.tm-cr-pedido .tm-cr-fig{font-size:1.15rem;}',
    '.tm-cr-op .tm-cr-fig{font-size:1.2rem;}.tm-cr-fig > span{min-width:.7em;text-align:center;}',
    'td .tm-cr-rom{font-size:1.15rem;}td .tm-cr-fig{font-size:1rem;}',
    '.tm-cr-pent{position:relative;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:10px 0;cursor:crosshair;touch-action:none;user-select:none;-webkit-user-select:none;overflow:hidden;}',
    '.tm-cr-lupa{position:fixed;display:none;pointer-events:none;z-index:9999;background:#fdfcf9;border:2px solid #333;border-radius:12px;padding:6px 8px;box-shadow:0 8px 28px rgba(0,0,0,.35);transform:translate(-50%,calc(-100% - 18px));}',
    '.tm-cr-lupa::after{content:"";position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);border:11px solid transparent;border-top-color:#333;border-bottom:none;}',
    '.tm-cr-lupa::before{content:"";position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-top-color:#fdfcf9;border-bottom:none;z-index:1;}',
    '.tm-cr-lupa-pent{line-height:0;display:flow-root;overflow:hidden;}',
    '.tm-cr-pent.tm-cerrado{cursor:default;}',
    '.tm-cr-lienzo{display:flex;justify-content:center;width:100%;}',
    '.tm-cr-guia{position:absolute;left:0;right:0;height:2px;background:rgba(139,105,20,.55);pointer-events:none;display:none;}',
    '.tm-cr-herr{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;justify-content:space-between;margin:8px 0;}',
    '.tm-cr-hg{display:flex;gap:8px;}',
    '.tm-cr-h{border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;min-width:44px;min-height:44px;padding:6px 12px;font-family:inherit;font-weight:700;font-size:1rem;color:#1a1208;cursor:pointer;}',
    '.tm-cr-h[aria-pressed="true"]{background:#8b6914;border-color:#8b6914;color:#fff;}',
    '.tm-cr-h:disabled{opacity:.5;cursor:default;}',
    '.tm-cr-ayuda{font-size:.88rem;color:#514232;margin:6px 0;}',
    '.tm-cr-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.93rem;line-height:1.55;}',
    '.tm-cr-fb[hidden]{display:none;}',
    '.tm-cr-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-cr-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-cr-btn{width:100%;padding:14px;margin-top:12px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#8b6914;color:#fff;cursor:pointer;min-height:44px;}',
    '.tm-cr-btn[hidden]{display:none;}',
    '.tm-cr-btn:disabled{background:#d8d0b8;cursor:not-allowed;}',
    '.tm-cr-btn.tm-2{background:#1a1a1a;}',
    '.tm-cr-res{text-align:center;padding:10px 0;}',
    '.tm-cr-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-cr-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-cr-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-cr-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;min-height:44px;}',
    '.tm-cr-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}',
    '.tm-cr :focus-visible{outline:3px solid #1f5fa6;outline-offset:2px;}',
    '@media(max-width:520px){.tm-cr-card{padding:16px}.tm-cr-ops{grid-template-columns:repeat(2,1fr);}}'
  ].join('');

  function css() {
    if (document.getElementById('tm-cr-css')) return;
    var st = document.createElement('style');
    st.id = 'tm-cr-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  var iniciar = function (id) {
    var cont0 = document.getElementById(id);
    css();
    if (cont0 && window.tmNotacion && !conVerovio()) {
      cont0.innerHTML = '<div class="tm-cr-card"><div class="tm-cr-sub">' + T('Cargando el ejercicio…', 'Loading the exercise…') + '</div></div>';
      window.tmNotacion.listo().then(function () { arrancar(id); }, function () { cont0.innerHTML = '<div class="tm-cr-card"><div class="tm-cr-sub">' + T('No se ha podido cargar el ejercicio. Recarga la página.', 'The exercise could not be loaded. Reload the page.') + '</div></div>'; });
      return;
    }
    arrancar(id);
  };

  /* Filas de pentagrama de clave de sol: del do6 (paso 42) al sol3 (paso 25), con más sitio del que hacen falta los acordes (que caben entre
     si3 y sol5) para que el alumno pueda equivocarse; la línea es la posición desde la línea superior (fa5 = 0). */
  var PASO_ALTO = 42, PASO_BAJO = 25;
  function lineaDePaso(p) { return (38 - p) * 0.5; }

  function arrancar(id) {
    var cont = document.getElementById(id);
    if (!cont) return;
    css();
    cont.className = 'tm-cr';
    var modo = 'identificar', cola = [], pos = 0, aciertos = 0, nivelActual = 1;
    window.tmCifradoRomanoDebug = function () { return cola[pos] || null; };

    /* ------------------------------------------------------------ inicio */
    function inicio() {
      cont.innerHTML = '<div class="tm-cr-card"><div class="tm-cr-tit">' + T('Cifrado romano de los acordes', 'Roman numeral analysis of chords') + '</div>'
        + '<div class="tm-cr-sub">' + T('Elige qué quieres practicar y el nivel. Cada test tiene ' + PREGUNTAS + ' preguntas.', 'Choose what you want to practice and the level. Each test has ' + PREGUNTAS + ' questions.') + '</div>'
        + '<div class="tm-cr-grupo" id="tm-cr-gm">' + T('Ejercicio', 'Exercise') + '</div>'
        + '<div class="tm-cr-tabs" role="group" aria-labelledby="tm-cr-gm">'
        + '<button type="button" class="tm-cr-tab" data-m="identificar" aria-pressed="' + (modo === 'identificar') + '">' + T('Identificar', 'Identify') + '<span>' + T('Ves el acorde escrito y eliges su cifrado', 'You see the written chord and choose its figures') + '</span></button>'
        + '<button type="button" class="tm-cr-tab" data-m="construir" aria-pressed="' + (modo === 'construir') + '">' + T('Construir', 'Build') + '<span>' + T('Te damos el cifrado y la tonalidad y escribes el acorde', 'We give you the figures and the key and you write the chord') + '</span></button></div>'
        + '<div class="tm-cr-grupo">' + T('Nivel', 'Level') + '</div>'
        + '<div class="tm-cr-modos">' + NIVELES.map(function (m) {
          return '<button type="button" class="tm-cr-modo" data-n="' + m.n + '"><strong>' + m.n + '. ' + m.t + '</strong><span>' + m.d + '</span></button>';
        }).join('') + '</div></div>';
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-cr-tab'), function (b) {
        b.addEventListener('click', function () {
          modo = b.getAttribute('data-m');
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-cr-tab'), function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        });
      });
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-cr-modo'), function (b) {
        b.addEventListener('click', window.tmNotacion.diferido(function () { empezar(Number(b.getAttribute('data-n'))); }));
      });
    }

    function empezar(n) {
      nivelActual = n;
      cola = generarLote({ nivel: n, n: PREGUNTAS });
      pos = 0; aciertos = 0;
      pregunta();
    }

    function cabecera(extra) {
      return '<div class="tm-cr-prog">' + T('Pregunta ' + (pos + 1) + ' de ' + cola.length, 'Question ' + (pos + 1) + ' of ' + cola.length) + '</div>'
        + '<div class="tm-cr-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>' + (extra || '');
    }

    function oir(it) {
      if (!window.tmPiano || !window.tmPiano.playEvents) return;
      window.tmPiano.playEvents(it.notas.map(function (n) { return { midi: midiDe(n), when: 0, dur: 2 }; }));
    }

    function botonOir(fb, it) {
      if (!window.tmPiano) return;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'tm-cr-h'; b.style.marginTop = '8px';
      b.textContent = '▶ ' + T('Oír el acorde', 'Hear the chord');
      b.addEventListener('click', function () { oir(it); });
      fb.appendChild(document.createElement('br')); fb.appendChild(b);
    }

    function pregunta() { if (modo === 'identificar') preguntaIdentificar(); else preguntaConstruir(); }

    function siguiente(btn) {
      btn.addEventListener('click', window.tmNotacion.diferido(function () {
        pos++;
        if (pos < cola.length) pregunta(); else resultado();
      }));
    }

    /* -------------------------------------------------------- identificar */
    function preguntaIdentificar() {
      var it = cola[pos], tonal = tonalidad(it.tonalidad);
      var rnd = mulberry32(Math.floor(Math.random() * 4294967296));
      var ops = alternativas(it, rnd, 6);
      cont.innerHTML = '<div class="tm-cr-card">' + cabecera(
        '<div class="tm-cr-preg">' + T('¿Qué cifrado tiene este acorde?', 'What figures does this chord have?') + '</div>'
        + '<p class="tm-cr-tonal">' + T('Tonalidad: ', 'Key: ') + '<strong>' + tonal.nombre + '</strong></p>'
        + '<div class="tm-cr-dibujo"><div></div></div>'
        + '<div class="tm-cr-ops">' + ops.map(function (o, i) {
          return '<button type="button" class="tm-cr-op" data-i="' + i + '" aria-label="' + cifVoz(o.cf) + '">' + cifHtml(o.cf) + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-cr-fb" role="status" aria-live="polite" hidden></div>'
        + '<button type="button" class="tm-cr-btn" hidden></button>') + '</div>';
      dibujar(cont.querySelector('.tm-cr-dibujo > div'), it);
      var fb = cont.querySelector('.tm-cr-fb'), btn = cont.querySelector('.tm-cr-btn');
      var botones = Array.prototype.slice.call(cont.querySelectorAll('.tm-cr-op'));
      botones.forEach(function (b) {
        b.addEventListener('click', window.tmNotacion.diferido(function () {
          var o = ops[Number(b.getAttribute('data-i'))], ok = !!o.ok;
          if (ok) aciertos++;
          botones.forEach(function (x, i) {
            x.disabled = true;
            if (ops[i].ok) x.classList.add(x === b ? 'tm-ok' : 'tm-buena');
            else if (x === b) x.classList.add('tm-ko');
          });
          fb.hidden = false; fb.className = 'tm-cr-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? T('¡Correcto!', 'Correct!') : T('No es correcto.', 'Not correct.')) + '</strong> ' + explicar(it);
          botonOir(fb, it);
          btn.hidden = false; btn.textContent = pos + 1 < cola.length ? T('Siguiente', 'Next') : T('Ver resultado', 'See result');
        }));
      });
      siguiente(btn);
    }

    /* ----------------------------------------------------------- construir */
    function preguntaConstruir() {
      var it = cola[pos], tonal = tonalidad(it.tonalidad);
      var bajo = it.notas[0], faltan = it.notas.length - 1;
      var puestas = [];            // [{ paso, marca }] marca: 'auto' | -1 | 0 | 1
      var herramienta = 'auto', cerrado = false, svgActual = null;
      cont.innerHTML = '<div class="tm-cr-card">' + cabecera(
        '<div class="tm-cr-preg">' + T('Escribe este acorde', 'Write this chord') + '</div>'
        + '<p class="tm-cr-tonal">' + T('Tonalidad: ', 'Key: ') + '<strong>' + tonal.nombre + '</strong></p>'
        + '<p class="tm-cr-tonal"><span class="tm-cr-pedido" aria-label="' + cifVoz(it.cif) + '">' + cifHtml(it.cif) + '</span></p>'
        + '<p class="tm-cr-ayuda">' + T('Ya está escrita la nota del bajo. Pulsa en el pentagrama y arrastra: la lupa te enseña la nota; suéltala donde quieras colocar cada una de las otras ' + faltan + ' notas del acorde, una encima de otra (posición cerrada). Para quitar una nota, suelta otra encima de ella. Las alteraciones de la armadura ya cuentan; usa ♭ ♮ ♯ solo para alterar una nota fuera de la armadura.', 'The bass note is already written. Press on the staff and drag: the magnifier shows the note; release it where you want to place each of the other ' + faltan + ' notes of the chord, one above the other (close position). To remove a note, release another one on top of it. The key signature accidentals already count; use ♭ ♮ ♯ only to alter a note outside the key signature.') + '</p>'
        + '<div class="tm-cr-pent" id="tm-cr-pent"><div class="tm-cr-lienzo"></div><div class="tm-cr-guia"></div></div>'
        + '<div class="tm-cr-herr" role="group" aria-label="' + T('Alteración de la nota que vas a colocar', 'Accidental for the note you are about to place') + '">'
        + '<div class="tm-cr-hg"><button type="button" class="tm-cr-h" data-h="auto" aria-pressed="true">' + T('Según armadura', 'As key signature') + '</button>'
        + '<button type="button" class="tm-cr-h" data-h="-1" aria-pressed="false" aria-label="' + T('bemol', 'flat') + '">♭</button>'
        + '<button type="button" class="tm-cr-h" data-h="0" aria-pressed="false" aria-label="' + T('becuadro', 'natural') + '">♮</button>'
        + '<button type="button" class="tm-cr-h" data-h="1" aria-pressed="false" aria-label="' + T('sostenido', 'sharp') + '">♯</button></div>'
        + '<div class="tm-cr-hg"><button type="button" class="tm-cr-h" data-a="deshacer">↩ ' + T('Deshacer', 'Undo') + '</button>'
        + '<button type="button" class="tm-cr-h" data-a="limpiar">× ' + T('Limpiar', 'Clear') + '</button></div></div>'
        + '<button type="button" class="tm-cr-btn" data-a="comprobar" disabled>' + T('Comprobar', 'Check') + '</button>'
        + '<div class="tm-cr-fb" role="status" aria-live="polite" hidden></div>'
        + '<button type="button" class="tm-cr-btn tm-2" data-a="sig" hidden></button>') + '</div>'
        + '<div class="tm-cr-lupa" aria-hidden="true"><div class="tm-cr-lupa-pent"></div></div>';

      var pent = cont.querySelector('#tm-cr-pent'), lienzo = pent.querySelector('.tm-cr-lienzo'), guia = pent.querySelector('.tm-cr-guia');
      var lupa = cont.querySelector('.tm-cr-lupa'), lpent = lupa.querySelector('.tm-cr-lupa-pent');
      var fb = cont.querySelector('.tm-cr-fb'), bComp = cont.querySelector('[data-a="comprobar"]'), bSig = cont.querySelector('[data-a="sig"]');
      var herr = Array.prototype.slice.call(cont.querySelectorAll('[data-h]'));
      pent.style.height = '200px';
      lienzo.style.height = '200px';

      function notasActuales() {
        var todas = [{ letra: bajo.letra, alt: bajo.alt, oct: bajo.oct, paso: bajo.paso }];
        puestas.forEach(function (p) {
          var l = p.paso % 7, o = Math.floor(p.paso / 7);
          todas.push({ letra: l, alt: alturaAbs(tonal, { letra: l }, p.marca), oct: o, paso: p.paso, color: cerrado ? p.color : undefined });
        });
        return todas.sort(function (a, b) { return a.paso - b.paso; });
      }

      function pintar() {
        var notas = notasActuales();
        var keys = notas.map(function (n) { return n.color ? { key: notaClave(n), color: n.color } : notaClave(n); });
        var r = window.tmNotacion.dibujarAlineado(lienzo, filaDe(tonal, keys), { escala: 1.5, separacion: 0.5, top: 62, margenIzq: 12, id: 'crc', alt: T('Pentagrama en clave de sol, en ' + tonal.nombre + ', con la nota del bajo y las que has colocado', 'Treble clef staff, in ' + tonal.nombre + ', with the bass note and the ones you placed') });
        svgActual = r.elemento;
        bComp.disabled = cerrado || puestas.length !== faltan;
        cont.querySelector('[data-a="deshacer"]').disabled = cerrado || !puestas.length;
        cont.querySelector('[data-a="limpiar"]').disabled = cerrado || !puestas.length;
      }

      function pasoEn(clientY) {
        if (!svgActual) return null;
        var sr = svgActual.getBoundingClientRect(), g = window.tmNotacion.geometria(svgActual);
        if (!sr.width || !g.lineas) return null;
        var sp = (g.lineas[4] - g.lineas[0]) / 4;
        var L = (clientY - sr.top - g.lineas[0]) / sp;       // líneas desde la superior
        var idx = Math.round((L - lineaDePaso(PASO_ALTO)) * 2);   // filas desde el sol5
        idx = Math.max(0, Math.min(PASO_ALTO - PASO_BAJO, idx));
        return PASO_ALTO - idx;
      }

      function mostrarGuia(clientY) {
        var p = pasoEn(clientY);
        if (p === null) return;
        var sr = svgActual.getBoundingClientRect(), pr = pent.getBoundingClientRect(), g = window.tmNotacion.geometria(svgActual);
        guia.style.display = 'block';
        guia.style.top = ((sr.top - pr.top) + g.lineas[0] + lineaDePaso(p) * (g.lineas[4] - g.lineas[0]) / 4 - 1) + 'px';
      }

      /* Lupa (la misma de los ejercicios de tríadas y séptimas): la nota que se va a colocar sale en ámbar, con las ya puestas */
      var arrastrando = false, mejor = null, claveLupa = null;
      function dibujarLupa(p) {
        var key = puestas.map(function (x) { return x.paso + ':' + x.marca; }).join(',') + '|' + p + '|' + herramienta;
        if (key === claveLupa) return;
        claveLupa = key;
        var todas = notasActuales();
        var l = p % 7;
        todas.push({ letra: l, alt: alturaAbs(tonal, { letra: l }, herramienta), oct: Math.floor(p / 7), paso: p, pre: true });
        todas.sort(function (a, b) { return a.paso - b.paso; });
        var keys = todas.map(function (n) { return n.pre ? { key: notaClave(n), color: '#8b6914' } : notaClave(n); });
        var LG = window.tmNotacion.lupaGeom(1.5, lineaDePaso(PASO_ALTO), lineaDePaso(PASO_BAJO));
        lpent.style.width = 'auto'; lpent.style.height = LG.alto + 'px';   // ~1,8 veces el tamaño del pentagrama: de verdad aumenta
        var rl = window.tmNotacion.dibujarAlineado(lpent, filaDe(tonal, keys), { escala: LG.escala, separacion: 0.15, noLineal: 0.25, top: LG.top, margenIzq: 10, id: 'crl', alt: '' });
        rl.elemento.style.maxWidth = 'none';   // sin encoger: así es de verdad una lupa
      }
      function mostrarGuia(p) {
        var sr = svgActual.getBoundingClientRect(), pr = pent.getBoundingClientRect(), g = window.tmNotacion.geometria(svgActual);
        guia.style.display = 'block';
        guia.style.top = ((sr.top - pr.top) + g.lineas[0] + lineaDePaso(p) * (g.lineas[4] - g.lineas[0]) / 4 - 1) + 'px';
      }
      function actualizar(e) {
        if (!arrastrando || cerrado) return;
        var p = pasoEn(e.clientY);
        if (p === null) return;
        mejor = p;
        mostrarGuia(p);
        lupa.style.transform = ''; lupa.style.left = e.clientX + 'px'; lupa.style.top = e.clientY + 'px'; lupa.style.display = 'block';
        dibujarLupa(p);
        var lr = lupa.getBoundingClientRect(), pad = 8;
        if (lr.left < pad) lupa.style.left = (e.clientX - lr.left + pad) + 'px';
        else if (lr.right > window.innerWidth - pad) lupa.style.left = (e.clientX - (lr.right - window.innerWidth + pad)) + 'px';
        if (lr.top < pad) lupa.style.transform = 'translate(-50%,18px)';
      }
      function terminar() {
        if (!arrastrando) return;
        arrastrando = false;
        guia.style.display = 'none'; lupa.style.display = 'none';
        var p = mejor; mejor = null; claveLupa = null;
        if (cerrado || p === null || p === bajo.paso) return;
        var ya = puestas.filter(function (x) { return x.paso === p; })[0];
        if (ya) puestas.splice(puestas.indexOf(ya), 1);              // soltar sobre una nota ya puesta la quita
        else if (puestas.length < faltan) puestas.push({ paso: p, marca: herramienta });
        else return;
        window.tmNotacion.trasPintar(pintar);
      }
      pent.addEventListener('pointerdown', function (e) {
        if (cerrado || (e.pointerType === 'mouse' && e.button !== 0)) return;
        arrastrando = true;
        try { pent.setPointerCapture(e.pointerId); } catch (x) { /* sin captura también funciona */ }
        actualizar(e);
      });
      pent.addEventListener('pointermove', function (e) { if (arrastrando) actualizar(e); });
      pent.addEventListener('pointerup', terminar);
      pent.addEventListener('pointercancel', function () { arrastrando = false; mejor = null; claveLupa = null; guia.style.display = 'none'; lupa.style.display = 'none'; });

      herr.forEach(function (b) {
        b.addEventListener('click', function () {
          herramienta = b.getAttribute('data-h') === 'auto' ? 'auto' : Number(b.getAttribute('data-h'));
          herr.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        });
      });
      cont.querySelector('[data-a="deshacer"]').addEventListener('click', window.tmNotacion.diferido(function () { if (!cerrado && puestas.length) { puestas.pop(); pintar(); } }));
      cont.querySelector('[data-a="limpiar"]').addEventListener('click', window.tmNotacion.diferido(function () { if (!cerrado) { puestas = []; pintar(); } }));

      bComp.addEventListener('click', window.tmNotacion.diferido(function () {
        if (cerrado || puestas.length !== faltan) return;
        var esperadas = it.notas.slice(1).map(function (n) { return n.paso + ':' + n.alt; }).sort();
        var dadas = puestas.map(function (p) { return p.paso + ':' + alturaAbs(tonal, { letra: p.paso % 7 }, p.marca); }).sort();
        var ok = esperadas.join('|') === dadas.join('|');
        cerrado = true; pent.classList.add('tm-cerrado'); guia.style.display = 'none';
        if (ok) aciertos++;
        else { puestas = it.notas.slice(1).map(function (n) { return { paso: n.paso, marca: n.alt, color: '#1c7e46' }; }); }
        if (ok) puestas.forEach(function (p) { p.color = '#1c7e46'; });
        pintar();
        herr.forEach(function (b) { b.disabled = true; });
        bComp.hidden = true;
        fb.hidden = false; fb.className = 'tm-cr-fb ' + (ok ? 'tm-ok' : 'tm-ko');
        fb.innerHTML = '<strong>' + (ok ? T('¡Correcto!', 'Correct!') : T('No es correcto: en verde, la solución.', 'Not correct: the solution is in green.')) + '</strong> ' + explicar(it);
        botonOir(fb, it);
        bSig.hidden = false; bSig.textContent = pos + 1 < cola.length ? T('Siguiente', 'Next') : T('Ver resultado', 'See result');
      }));
      siguiente(bSig);
      pintar();
    }

    /* ----------------------------------------------------------- resultado */
    function resultado() {
      var nota_ = aciertos / cola.length;
      var msg = nota_ === 1 ? T('¡Perfecto! Dominas el cifrado de este nivel.', 'Perfect! You have mastered the figures at this level.')
        : nota_ >= 0.8 ? T('Muy bien: casi todo correcto.', 'Very good: almost everything correct.')
        : nota_ >= 0.5 ? T('Vas bien. Repasa el signo + de la sensible, los números tachados y las cifras de la inversión, y vuelve a intentarlo.', 'You are doing well. Review the + for the leading tone, the struck-through numbers and the inversion figures, and try again.')
        : T('Conviene repasar los grados y el cifrado de las inversiones antes de volver a intentarlo.', 'It is worth reviewing the scale degrees and the figures of the inversions before trying again.');
      cont.innerHTML = '<div class="tm-cr-card tm-cr-res"><div class="tm-cr-nota">' + aciertos + '</div><div class="tm-cr-de">' + T('aciertos de ' + cola.length, 'correct out of ' + cola.length) + '</div>'
        + '<div class="tm-cr-msg">' + msg + '</div>'
        + '<button type="button" class="tm-cr-otra" data-a="otra">' + T('Otra ronda', 'Another round') + '</button>'
        + '<button type="button" class="tm-cr-otra tm-2" data-a="modo">' + T('Cambiar de nivel o de ejercicio', 'Change level or exercise') + '</button></div>';
      cont.querySelector('[data-a="otra"]').addEventListener('click', window.tmNotacion.diferido(function () { empezar(nivelActual); }));
      cont.querySelector('[data-a="modo"]').addEventListener('click', window.tmNotacion.diferido(inicio));
    }

    inicio();
  }

  var API = { TONALIDADES: TONALIDADES, NIVELES: NIVELES, generarLote: generarLote, generarUno: generarUno, alternativas: alternativas, explicar: explicar, dibujar: dibujar, cifTexto: cifTexto, cifHtml: cifHtml, cifrado: cifrado, acordeEn: acordeEn, colocar: colocar, grado: grado, altArm: altArm, notaClave: notaClave, midiDe: midiDe, tonalidad: tonalidad, mulberry32: mulberry32 };
  if (typeof window !== 'undefined') { window.tmCifradoRomano = iniciar; window.tmCifradoRomanoTest = API; }
  if (typeof module === 'object' && module.exports) module.exports = API;
})();
