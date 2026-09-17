/* Completar compases — /ejercicios/compases/completar-compas/

   Uso: <div id="x"></div><script>tmCompletarCompas('x');</script>

   Decisiones de Eduardo (17-09-2026):
   - Tres niveles: falta UNA figura; falta una figura O un silencio; faltan VARIAS
     figuras.
   - El hueco puede estar en cualquier posición, y se marca con una línea debajo
     para que se vea dónde falta.
   - Compases 2/4, 3/4, 4/4, 6/8, 9/8 y 12/8. Ritmo puro: todo en la misma nota.
   - Se responde eligiendo la figura (como en analizar compás); cuando faltan
     varias, se van tocando figuras hasta llenar el hueco y vale cualquier
     combinación que sume lo que falta.

   Los compases se generan tiempo a tiempo con patrones rítmicos reales (no
   sumas al azar): cada figura cabe en su tiempo, o empieza en un tiempo y ocupa
   tiempos enteros. Las barras de las corcheas se hacen a mano por tiempos.
   Duraciones en semifusas (redonda = 64). Funciona con VexFlow 4 (web) y 5 (PDF).
   Se audita con tools/verificar-completar-compas.js. */
(function () {
  'use strict';

  var FIG = {
    r: { u: 64, vf: 'w', nombre: 'redonda' },
    rP: { u: 96, vf: 'wd', nombre: 'redonda con puntillo' },
    b: { u: 32, vf: 'h', nombre: 'blanca' },
    bP: { u: 48, vf: 'hd', nombre: 'blanca con puntillo' },
    n: { u: 16, vf: 'q', nombre: 'negra' },
    nP: { u: 24, vf: 'qd', nombre: 'negra con puntillo' },
    c: { u: 8, vf: '8', nombre: 'corchea' },
    cP: { u: 12, vf: '8d', nombre: 'corchea con puntillo' },
    sc: { u: 4, vf: '16', nombre: 'semicorchea' }
  };
  /* Paleta de respuesta: figuras, y los silencios que se usan. */
  var CARTAS_FIG = ['sc', 'c', 'cP', 'n', 'nP', 'b', 'bP', 'r', 'rP'];
  var CARTAS_SIL = ['sc', 'c', 'cP', 'n', 'nP', 'b', 'bP'];

  var COMPASES = {
    '2/4': { tiempo: 16, tiempos: 2 },
    '3/4': { tiempo: 16, tiempos: 3 },
    '4/4': { tiempo: 16, tiempos: 4 },
    '6/8': { tiempo: 24, tiempos: 2 },
    '9/8': { tiempo: 24, tiempos: 3 },
    '12/8': { tiempo: 24, tiempos: 4 }
  };
  var GRUPOS = { simples: ['2/4', '3/4', '4/4'], compuestos: ['6/8', '9/8', '12/8'], mezcla: Object.keys(COMPASES) };

  /* Patrones de UN tiempo. */
  var PATRON = {
    16: [['n'], ['c', 'c'], ['cP', 'sc'], ['sc', 'sc', 'c'], ['c', 'sc', 'sc'], ['sc', 'sc', 'sc', 'sc']],
    24: [['nP'], ['c', 'c', 'c'], ['n', 'c'], ['c', 'n'], ['cP', 'sc', 'c'], ['c', 'sc', 'sc', 'c']]
  };
  /* Figuras que ocupan varios tiempos: en qué tiempo pueden empezar (índice) y en qué compases. */
  function largas(c) {
    var d = COMPASES[c];
    if (d.tiempo === 16) {
      return [
        { f: 'b', tiempos: 2, desde: function (i) { return i % 2 === 0; } },          // 1 o 3
        { f: 'bP', tiempos: 3, desde: function (i) { return i === 0; } },             // 3/4 entero, 4/4 tiempos 1-3
        { f: 'r', tiempos: 4, desde: function (i) { return i === 0; } }
      ];
    }
    return [
      { f: 'bP', tiempos: 2, desde: function (i) { return i % 2 === 0; } },
      { f: 'rP', tiempos: 4, desde: function (i) { return i === 0; } }
    ];
  }

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
      entero: function (n) { return Math.floor(rnd() * n); },
      barajar: function (a) {
        var c = a.slice();
        for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
        return c;
      }
    };
  }

  /* Un compás entero, tiempo a tiempo. Devuelve elementos {f, s (silencio), t0 (semifusas desde el inicio)}.
     De vez en cuando, en un compás SIMPLE, en vez de rellenar un tiempo suelto se
     coloca la síncopa de manual a caballo entre dos tiempos: corchea + negra +
     corchea (Eduardo, 17-09-2026: «es normal ver las síncopas escritas así», a
     propósito de un 2/4 con corchea-negra-corchea). La negra empieza una
     corchea después de la frontera del tiempo y dura un tiempo entero, así que
     termina una corchea después de la frontera siguiente: 8+16+8=32=2 tiempos
     de 16, cuadra justo. En COMPUESTO no hay una forma tan limpia — desplazar
     una corchea dentro de un tiempo de 24 deja un resto de 16 (dos corcheas) en
     el tiempo siguiente, no una figura simétrica —, así que de momento la
     síncopa solo se genera en compases simples; en compuesto solo se acepta
     como lectura alternativa al comprobar equivalencias (ver
     reconocer-compas-engine.js), no como contenido generado aquí. Nunca se
     convierte en silencio: el interés de la síncopa es que suene fuera del
     pulso, no que calle. */
  function compas(c, conSilencios, A, rnd) {
    var d = COMPASES[c], elems = [], i = 0, t = 0, sincopas = {};
    var L = largas(c);
    while (i < d.tiempos) {
      var cabe = L.filter(function (x) { return x.desde(i) && i + x.tiempos <= d.tiempos; });
      if (d.tiempo === 16 && i + 2 <= d.tiempos && rnd() < 0.15) {
        elems.push({ f: 'c', s: false, t0: t }); t += FIG.c.u;
        sincopas[elems.length] = true;
        elems.push({ f: 'n', s: false, t0: t }); t += FIG.n.u;
        elems.push({ f: 'c', s: false, t0: t }); t += FIG.c.u;
        i += 2;
        continue;
      }
      if (cabe.length && rnd() < 0.3) {
        var x = A.uno(cabe);
        elems.push({ f: x.f, s: false, t0: t });
        i += x.tiempos; t += FIG[x.f].u * 1;
        continue;
      }
      A.uno(PATRON[d.tiempo]).forEach(function (f) { elems.push({ f: f, s: false, t0: t }); t += FIG[f].u; });
      i++;
    }
    if (conSilencios) {
      // Como mucho dos silencios, nunca seguidos, y solo de un tiempo o menos.
      var puestos = 0;
      elems.forEach(function (e, k) {
        if (puestos >= 2 || FIG[e.f].u > d.tiempo || sincopas[k]) return;
        if (k && elems[k - 1].s) return;
        if (rnd() < 0.25) { e.s = true; puestos++; }
      });
    }
    return elems;
  }

  /* o = { nivel: 1|2|3, grupo: 'simples'|'compuestos'|'mezcla', n } */
  function generar(o, semilla) {
    var rnd = mulberry32(semilla || Math.floor(Math.random() * 1e9));
    var A = azar(rnd), out = [], vistos = {};
    for (var intento = 0; out.length < o.n && intento < o.n * 80; intento++) {
      var c = A.uno(GRUPOS[o.grupo]);
      var elems = compas(c, o.nivel === 2, A, rnd);
      var hueco;
      if (o.nivel === 3) {
        if (elems.length < 3) continue;
        var largo = 2 + A.entero(2);
        var inicios = [];
        for (var k = 0; k + largo <= elems.length; k++) {
          var ok = true;
          for (var m = 0; m < largo; m++) if (elems[k + m].s) ok = false;
          if (ok) inicios.push(k);
        }
        if (!inicios.length) continue;
        var ini = A.uno(inicios);
        hueco = { desde: ini, hasta: ini + largo - 1 };
      } else {
        var candidatos = elems.map(function (e, k) { return k; }).filter(function (k) { return o.nivel === 2 || !elems[k].s; });
        if (elems.length < 2 || !candidatos.length) continue;
        var pos = A.uno(candidatos);
        hueco = { desde: pos, hasta: pos };
      }
      var clave = c + elems.map(function (e) { return e.f + (e.s ? 's' : ''); }).join() + hueco.desde;
      if (vistos[clave]) continue;
      vistos[clave] = 1;
      var faltan = elems.slice(hueco.desde, hueco.hasta + 1);
      out.push({
        compas: c, nivel: o.nivel, elems: elems, hueco: hueco,
        faltan: faltan.map(function (e) { return { f: e.f, s: e.s }; }),
        valor: faltan.reduce(function (a, e) { return a + FIG[e.f].u; }, 0)
      });
    }
    return out;
  }

  /* --------------------------------------------------------- texto */

  function mcd(a, b) { return b ? mcd(b, a % b) : a; }
  function enTiempos(u, c) {
    var t = COMPASES[c].tiempo, g = mcd(u, t), n = u / g, d = t / g;
    var ent = Math.floor(n / d), resto = n % d;
    var G = { '1/2': '½', '1/4': '¼', '3/4': '¾', '1/3': '⅓', '2/3': '⅔', '1/6': '⅙', '5/6': '⅚' };
    var parte = resto ? (G[resto + '/' + d] || resto + '/' + d) : '';
    if (!ent) return parte + (resto * 2 === d ? ' tiempo' : ' de tiempo');
    var e = ent + (ent === 1 ? ' tiempo' : ' tiempos');
    if (!resto) return e;
    if (resto * 2 === d) return e + ' y medio';
    return e + ' y ' + parte + ' de tiempo';
  }
  function nombre(e) { return (e.s ? 'silencio de ' : '') + FIG[e.f].nombre; }
  function lista(elems) {
    var n = elems.map(nombre);
    return n.length > 1 ? n.slice(0, -1).join(', ') + ' y ' + n[n.length - 1] : n[0];
  }
  function explicar(it) {
    var d = COMPASES[it.compas];
    var escrito = d.tiempo * d.tiempos - it.valor;
    return 'El compás de ' + it.compas + ' tiene ' + d.tiempos + ' tiempos de ' + (d.tiempo === 24 ? 'negra con puntillo' : 'negra')
      + '. Lo escrito suma ' + enTiempos(escrito, it.compas) + ', así que falta' + (it.faltan.length > 1 ? 'n ' : ' ')
      + enTiempos(it.valor, it.compas) + ': ' + lista(it.faltan) + '.';
  }

  /* -------------------------------------------------------- dibujo */

  function VF() { return (window.Vex && window.Vex.Flow) || window.VexFlow; }
  var ROJO = '#c0392b';

  /* Lo que queda del hueco, como figuras invisibles (de mayor a menor). */
  var ORDEN_U = ['rP', 'r', 'bP', 'b', 'nP', 'n', 'cP', 'c', 'sc'];
  function descomponer(u) {
    var out = [];
    ORDEN_U.forEach(function (f) { while (u >= FIG[f].u) { out.push({ f: f, s: false, fantasma: true }); u -= FIG[f].u; } });
    return out;
  }

  /* opts = { w,
       revelar: true          dibuja lo que falta en rojo (la solucion);
       respuesta: [{f,s}]     dibuja en el hueco lo que ha puesto el alumno, en negro;
       parcial: true          la respuesta aun no llena el hueco: lo que queda sigue
                              como hueco, con su linea } */
  function dibujar(div, it, opts) {
    var V = VF();
    opts = opts || {};
    div.innerHTML = '';
    var W = opts.w || 420, H = 118;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(W, H);
    var ctx = r.getContext();
    var stave = new V.Stave(6, 6, W - 12, { space_above_staff_ln: 3, spaceAboveStaffLn: 3 });
    stave.addTimeSignature(it.compas);
    stave.setContext(ctx).draw();

    var d = COMPASES[it.compas];
    var notas = [], info = [];
    var t = 0;
    // Con respuesta parcial, lo que queda por poner sigue siendo hueco invisible.
    var respuesta = opts.respuesta ? opts.respuesta.slice() : null;
    if (respuesta && opts.parcial) {
      var puesto = respuesta.reduce(function (a, x) { return a + FIG[x.f].u; }, 0);
      if (puesto < it.valor) respuesta = respuesta.concat(descomponer(it.valor - puesto));
    }
    it.elems.forEach(function (e, k) {
      var enHueco = k >= it.hueco.desde && k <= it.hueco.hasta;
      var fuente = enHueco && respuesta && k === it.hueco.desde ? respuesta : (enHueco && respuesta ? [] : [e]);
      fuente.forEach(function (x) {
        var dur = FIG[x.f].vf + (x.s ? 'r' : '');
        var nota;
        if (enHueco && ((!opts.revelar && !respuesta) || x.fantasma)) {
          nota = new V.GhostNote({ duration: dur });
        } else {
          nota = new V.StaveNote({ keys: ['b/4'], duration: dur, clef: 'treble' });
          if (!x.s) nota.setStemDirection(-1);   // Si4 está en la 3ª línea: plica abajo
          // En VexFlow 4 y 5 la «d» de la duración no dibuja el puntillo: hay que añadirlo.
          if (/d$/.test(FIG[x.f].vf)) V.Dot.buildAndAttach([nota], { all: true });
          // En rojo solo lo que faltaba (solución); la respuesta del alumno va en negro, como el resto.
          if (enHueco && opts.revelar) nota.setStyle({ fillStyle: ROJO, strokeStyle: ROJO });
        }
        notas.push(nota);
        info.push({ t0: t, u: FIG[x.f].u, s: !!x.s, f: x.f, hueco: enHueco, fantasma: nota instanceof V.GhostNote,
          puntillos: nota.getModifiersByType ? nota.getModifiersByType('Dot').length : 0 });
        t += FIG[x.f].u;
      });
    });

    var voz = new V.Voice({ num_beats: d.tiempos * d.tiempo, beat_value: 64, numBeats: d.tiempos * d.tiempo, beatValue: 64 });
    voz.setMode(V.Voice.Mode.SOFT);
    voz.addTickables(notas);
    // Barras a mano, por tiempos: corcheas y semicorcheas seguidas dentro del mismo tiempo.
    var barras = [], grupo = [], grupos = [];
    function cerrar() { if (grupo.length > 1) { barras.push(new V.Beam(grupo.map(function (g) { return g.n; }), false)); grupos.push(grupo.map(function (g) { return g.t0; })); } grupo = []; }
    info.forEach(function (x, k) {
      var corta = x.u < 16 && !x.s && !x.fantasma;
      var tiempo = Math.floor(x.t0 / d.tiempo);
      if (!corta || (grupo.length && Math.floor(grupo[0].t0 / d.tiempo) !== tiempo)) cerrar();
      if (corta) grupo.push({ n: notas[k], t0: x.t0 });
    });
    cerrar();
    new V.Formatter().joinVoices([voz]).format([voz], stave.getNoteEndX() - stave.getNoteStartX() - 20);
    voz.draw(ctx, stave);
    barras.forEach(function (b) { b.setContext(ctx).draw(); });

    var svg = div.querySelector('svg');
    // El hueco: una línea debajo y un interrogante, para que se vea dónde falta.
    var fantasmas = info.map(function (x, k) { return x.fantasma ? k : -1; }).filter(function (k) { return k >= 0; });
    if (fantasmas.length) {
      var x1 = notas[fantasmas[0]].getAbsoluteX() - 4;
      var sig = fantasmas[fantasmas.length - 1] + 1;
      var x2 = (sig < notas.length ? notas[sig].getAbsoluteX() : stave.getX() + stave.getWidth()) - 12;
      if (x2 < x1 + 18) x2 = x1 + 18;
      var y = stave.getYForLine(4) + 14;
      var ns = 'http://www.w3.org/2000/svg';
      var linea = document.createElementNS(ns, 'line');
      linea.setAttribute('x1', x1); linea.setAttribute('x2', x2); linea.setAttribute('y1', y); linea.setAttribute('y2', y);
      linea.setAttribute('stroke', ROJO); linea.setAttribute('stroke-width', '2.5'); linea.setAttribute('stroke-linecap', 'round');
      linea.setAttribute('class', 'tm-cc-hueco');
      svg.appendChild(linea);
      var q = document.createElementNS(ns, 'text');
      q.setAttribute('x', (x1 + x2) / 2); q.setAttribute('y', y + 15); q.setAttribute('text-anchor', 'middle');
      q.setAttribute('font-family', 'Arial, sans-serif'); q.setAttribute('font-size', '13'); q.setAttribute('font-weight', '700'); q.setAttribute('fill', ROJO);
      q.textContent = '?';
      svg.appendChild(q);
    }
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.maxWidth = Math.round(W * 1.2) + 'px';

    // Para el verificador: lo que se ha dibujado de verdad.
    div.__tmDibujo = { notas: info, barras: grupos, hueco: fantasmas };
  }

  /* Una carta de la paleta: la figura sola, sin compás. En la 2ª línea (Sol) y con
     la plica hacia arriba (petición de Eduardo). Se dibuja con voz y formateador,
     igual que el compás: colocando la nota a mano VexFlow no pintaba los puntillos. */
  function carta(div, f, silencio) {
    var V = VF();
    div.innerHTML = '';
    var W = 64, H = 78;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(W, H);
    var ctx = r.getContext();
    var stave = new V.Stave(2, 0, W - 4, { space_above_staff_ln: 2.5, spaceAboveStaffLn: 2.5 });
    var NINGUNA = (V.BarlineType || (V.Barline && V.Barline.type)).NONE;
    stave.setBegBarType(NINGUNA); stave.setEndBarType(NINGUNA);
    stave.setContext(ctx).draw();
    var n = new V.StaveNote({ keys: ['g/4'], duration: FIG[f].vf + (silencio ? 'r' : ''), clef: 'treble' });
    if (!silencio) n.setStemDirection(1);
    if (/d$/.test(FIG[f].vf)) V.Dot.buildAndAttach([n], { all: true });
    var voz = new V.Voice({ num_beats: FIG[f].u, beat_value: 64, numBeats: FIG[f].u, beatValue: 64 });
    voz.setMode(V.Voice.Mode.SOFT);
    voz.addTickables([n]);
    new V.Formatter().joinVoices([voz]).format([voz], W - 30);
    voz.draw(ctx, stave);
    var svg = div.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.width = '100%'; svg.style.height = 'auto';
  }

  /* Un compás COMPLETO, sin hueco (para /ejercicios/compases/reconocer-compas/).
     o = { compas: '3/4', silencios: bool, semilla }. Reutiliza compas(). */
  function generarMedida(o) {
    var rnd = mulberry32(o.semilla || Math.floor(Math.random() * 1e9));
    var A = azar(rnd);
    return compas(o.compas, !!o.silencios, A, rnd);
  }

  /* Dibuja un compás completo, sin huecos. opts = { w,
       sinCifra: true  no se dibuja la indicación de compás (para «reconocer compás»,
                 donde el alumno tiene que adivinarla) }. */
  function dibujarMedida(div, compasSig, elems, opts) {
    var V = VF();
    opts = opts || {};
    div.innerHTML = '';
    var W = opts.w || 420, H = 100;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(W, H);
    var ctx = r.getContext();
    var stave = new V.Stave(6, 6, W - 12, { space_above_staff_ln: 3, spaceAboveStaffLn: 3 });
    if (!opts.sinCifra) stave.addTimeSignature(compasSig);
    stave.setContext(ctx).draw();

    var d = COMPASES[compasSig];
    var notas = [], info = [], t = 0;
    elems.forEach(function (e) {
      var dur = FIG[e.f].vf + (e.s ? 'r' : '');
      var nota = new V.StaveNote({ keys: ['b/4'], duration: dur, clef: 'treble' });
      if (!e.s) nota.setStemDirection(-1);
      if (/d$/.test(FIG[e.f].vf)) V.Dot.buildAndAttach([nota], { all: true });
      notas.push(nota);
      info.push({ t0: t, u: FIG[e.f].u, s: !!e.s, f: e.f, puntillos: nota.getModifiersByType ? nota.getModifiersByType('Dot').length : 0 });
      t += FIG[e.f].u;
    });

    var voz = new V.Voice({ num_beats: d.tiempos * d.tiempo, beat_value: 64, numBeats: d.tiempos * d.tiempo, beatValue: 64 });
    voz.setMode(V.Voice.Mode.SOFT);
    voz.addTickables(notas);
    // Misma regla que dibujar(): solo se barran corchea/semicorchea/corchea con
    // puntillo (u<16), nunca una negra suelta, sea cual sea el compás.
    var barras = [], grupo = [], grupos = [];
    function cerrar() { if (grupo.length > 1) { barras.push(new V.Beam(grupo.map(function (g) { return g.n; }), false)); grupos.push(grupo.map(function (g) { return g.t0; })); } grupo = []; }
    info.forEach(function (x, k) {
      var corta = x.u < 16 && !x.s;
      var tiempo = Math.floor(x.t0 / d.tiempo);
      if (!corta || (grupo.length && Math.floor(grupo[0].t0 / d.tiempo) !== tiempo)) cerrar();
      if (corta) grupo.push({ n: notas[k], t0: x.t0 });
    });
    cerrar();
    new V.Formatter().joinVoices([voz]).format([voz], stave.getNoteEndX() - stave.getNoteStartX() - 20);
    voz.draw(ctx, stave);
    barras.forEach(function (b) { b.setContext(ctx).draw(); });

    var svg = div.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.maxWidth = Math.round(W * 1.2) + 'px';
    div.__tmInfo = { notas: info, barras: grupos };   // para el verificador
  }

  window.tmCompletarCompasData = {
    FIG: FIG, COMPASES: COMPASES, GRUPOS: GRUPOS, CARTAS_FIG: CARTAS_FIG, CARTAS_SIL: CARTAS_SIL,
    generar: generar, dibujar: dibujar, carta: carta, explicar: explicar, enTiempos: enTiempos, nombre: nombre,
    generarMedida: generarMedida, dibujarMedida: dibujarMedida
  };

  /* --------------------------------------------------------------- UI */

  var CSS = [
    '.tm-cc{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-cc-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-cc-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-cc-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-cc-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-cc-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;font-family:inherit;}',
    '.tm-cc-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-cc-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-cc-modo span{font-size:.82rem;color:#8b6914;}',
    '.tm-cc-grupo{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 14px;}',
    '.tm-cc-grupo button{border:1px solid #d8d0b8;background:#fff;border-radius:6px;padding:7px 12px;font:inherit;font-size:.82rem;font-weight:600;cursor:pointer;color:#514232;}',
    '.tm-cc-grupo button[aria-pressed="true"]{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-cc-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-cc-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-cc-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-cc-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:4px 0 8px;}',
    '.tm-cc-dibujo{display:flex;justify-content:center;margin:0 auto 10px;}',
    '.tm-cc-dibujo > div{width:100%;display:flex;justify-content:center;}',
    '.tm-cc-q{font-size:.78rem;font-weight:700;color:#8b6914;margin:12px 0 8px;text-transform:uppercase;letter-spacing:.5px;}',
    '.tm-cc-paleta{display:flex;flex-wrap:wrap;gap:8px;}',
    '.tm-cc-carta{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:4px 6px 2px;cursor:pointer;width:72px;text-align:center;font-family:inherit;}',
    '.tm-cc-carta:hover:not([disabled]){border-color:#8b6914;background:#fffbf2;}',
    '.tm-cc-carta.tm-sel{border-color:#8b6914;background:#fff8ee;}',
    '.tm-cc-carta.tm-ok{border-color:#27ae60!important;background:#e8f5e9!important;}',
    '.tm-cc-carta.tm-ko{border-color:#c0392b!important;background:#ffebee!important;}',
    '.tm-cc-carta.tm-buena{border-color:#27ae60!important;background:#e8f5e9!important;}',
    '.tm-cc-carta[disabled]{cursor:default;opacity:.85;}',
    '.tm-cc-carta small{display:block;font-size:.62rem;color:#666;line-height:1.15;margin-top:2px;min-height:1.4em;}',
    '.tm-cc-cesta{margin-top:10px;padding:10px;background:#faf7f2;border:1px dashed #d8d0b8;border-radius:8px;font-size:.9rem;min-height:2.6em;display:flex;align-items:center;gap:10px;flex-wrap:wrap;}',
    '.tm-cc-cesta .tm-cc-suma{margin-left:auto;font-weight:700;color:#8b6914;}',
    '.tm-cc-cesta[hidden]{display:none;}',
    '.tm-cc-deshacer{background:#fff;border:1px solid #d8d0b8;border-radius:8px;padding:9px 14px;font:inherit;font-size:.85rem;font-weight:600;cursor:pointer;margin-top:8px;}',
    '.tm-cc-deshacer[hidden]{display:none;}',
    '.tm-cc-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-cc-fb[hidden]{display:none;}',
    '.tm-cc-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-cc-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-cc-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#d8d0b8;color:#777;cursor:not-allowed;}',
    '.tm-cc-btn.tm-listo{background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-cc-res{text-align:center;padding:10px 0;}',
    '.tm-cc-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-cc-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-cc-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-cc-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-cc-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}',
    '@media(max-width:480px){.tm-cc-carta{width:60px;}}'
  ].join('');

  var NIVELES = [
    { nivel: 1, t: 'Falta una figura', d: 'Elige la figura que completa el compás' },
    { nivel: 2, t: 'Falta una figura o un silencio', d: 'Puede faltar un silencio: fíjate en lo que hay alrededor' },
    { nivel: 3, t: 'Faltan varias figuras', d: 'Ve tocando figuras hasta llenar el hueco; vale cualquier combinación que sume' }
  ];
  var PREGUNTAS = 8;

  window.tmCompletarCompas = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !VF()) return;
    if (!document.getElementById('tm-cc-css')) {
      var st = document.createElement('style');
      st.id = 'tm-cc-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    cont.className = 'tm-cc';
    var cola = [], pos = 0, aciertos = 0, nivel = 1, grupo = 'mezcla';

    function inicio() {
      cont.innerHTML = '<div class="tm-cc-card"><div class="tm-cc-tit">Completar el compás</div>'
        + '<div class="tm-cc-sub">A cada compás le falta algo en el sitio marcado con la línea roja. Elige qué falta.</div>'
        + '<div class="tm-cc-grupo" data-g="grupo">'
        + [['simples', '2/4, 3/4 y 4/4'], ['compuestos', '6/8, 9/8 y 12/8'], ['mezcla', 'Todos']].map(function (g) {
          return '<button type="button" data-v="' + g[0] + '" aria-pressed="' + (grupo === g[0]) + '">' + g[1] + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-cc-modos">' + NIVELES.map(function (m) {
          return '<button type="button" class="tm-cc-modo" data-n="' + m.nivel + '"><strong>' + m.t + '</strong><span>' + m.d + '</span></button>';
        }).join('') + '</div></div>';
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-cc-grupo button'), function (b) {
        b.addEventListener('click', function () {
          grupo = b.getAttribute('data-v');
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-cc-grupo button'), function (x) { x.setAttribute('aria-pressed', x === b); });
        });
      });
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-cc-modo'), function (b) {
        b.addEventListener('click', function () { nivel = Number(b.getAttribute('data-n')); empezar(); });
      });
    }

    function empezar() {
      cola = generar({ nivel: nivel, grupo: grupo, n: PREGUNTAS });
      pos = 0; aciertos = 0;
      pregunta();
    }

    function pregunta() {
      var it = cola[pos];
      var cartas = CARTAS_FIG.map(function (f) { return { f: f, s: false }; })
        .concat(nivel === 2 ? CARTAS_SIL.map(function (f) { return { f: f, s: true }; }) : []);
      cont.innerHTML = '<div class="tm-cc-card">'
        + '<div class="tm-cc-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-cc-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-cc-preg">' + (nivel === 3 ? '¿Qué figuras faltan en el hueco?' : nivel === 2 ? '¿Qué falta en el hueco: qué figura o qué silencio?' : '¿Qué figura falta en el hueco?') + '</div>'
        + '<div class="tm-cc-dibujo"><div></div></div>'
        + '<div class="tm-cc-q">' + (nivel === 3 ? 'Toca las figuras en orden' : nivel === 2 ? 'Figuras y silencios' : 'Figuras') + '</div>'
        + '<div class="tm-cc-paleta">' + cartas.map(function (x, i) {
          return '<button type="button" class="tm-cc-carta" data-i="' + i + '"><span class="tm-cc-mini"></span><small>' + nombre(x) + '</small></button>';
        }).join('') + '</div>'
        + '<div class="tm-cc-cesta" hidden><span class="tm-cc-lista"></span><span class="tm-cc-suma"></span></div>'
        + '<button type="button" class="tm-cc-deshacer" hidden>Deshacer</button>'
        + '<div class="tm-cc-fb" hidden></div>'
        + '<button type="button" class="tm-cc-btn">Comprobar</button></div>';

      var dib = cont.querySelector('.tm-cc-dibujo > div');
      dibujar(dib, it, { w: 460 });
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-cc-mini'), function (m, i) { carta(m, cartas[i].f, cartas[i].s); });

      var btn = cont.querySelector('.tm-cc-btn'), cesta = cont.querySelector('.tm-cc-cesta'), deshacer = cont.querySelector('.tm-cc-deshacer');
      var sel = null, puestos = [], corregida = false;
      function suma() { return puestos.reduce(function (a, x) { return a + FIG[x.f].u; }, 0); }
      function pintarCesta() {
        cesta.hidden = false;
        cesta.querySelector('.tm-cc-lista').innerHTML = puestos.length ? puestos.map(nombre).join(' + ') : 'Todavía no has puesto nada';
        cesta.querySelector('.tm-cc-suma').textContent = puestos.length ? enTiempos(suma(), it.compas) : '';
        deshacer.hidden = !puestos.length || corregida;
        btn.classList.toggle('tm-listo', puestos.length > 0);
      }
      if (nivel === 3) pintarCesta();

      // Lo que se va poniendo se escribe en la partitura (peticion de Eduardo).
      function escribir() {
        var resp = nivel === 3 ? puestos : (sel === null ? [] : [cartas[sel]]);
        if (!resp.length) dibujar(dib, it, { w: 460 });
        else dibujar(dib, it, { w: 460, respuesta: resp, parcial: true });
      }
      cont.querySelector('.tm-cc-paleta').addEventListener('click', function (ev) {
        var c = ev.target.closest('.tm-cc-carta');
        if (!c || corregida) return;
        var i = Number(c.getAttribute('data-i'));
        if (nivel === 3) {
          if (suma() + FIG[cartas[i].f].u > it.valor) { c.classList.add('tm-ko'); setTimeout(function () { c.classList.remove('tm-ko'); }, 500); return; }
          puestos.push(cartas[i]);
          pintarCesta();
        } else {
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-cc-carta'), function (x) { x.classList.remove('tm-sel'); });
          c.classList.add('tm-sel');
          sel = i;
          btn.classList.add('tm-listo');
        }
        escribir();
      });
      deshacer.addEventListener('click', function () { if (!corregida) { puestos.pop(); pintarCesta(); escribir(); } });

      btn.addEventListener('click', function () {
        if (!corregida) {
          if (nivel === 3 ? !puestos.length : sel === null) return;
          corregida = true;
          var ok, respuesta;
          if (nivel === 3) {
            ok = suma() === it.valor;
            respuesta = puestos;
            deshacer.hidden = true;
          } else {
            var e = it.faltan[0];
            ok = cartas[sel].f === e.f && cartas[sel].s === e.s;
            respuesta = [cartas[sel]];
            var bien = cartas.findIndex(function (x) { return x.f === e.f && x.s === e.s; });
            Array.prototype.forEach.call(cont.querySelectorAll('.tm-cc-carta'), function (x) {
              var i = Number(x.getAttribute('data-i'));
              x.classList.remove('tm-sel');
              if (i === sel) x.classList.add(ok ? 'tm-ok' : 'tm-ko');
              else if (i === bien) x.classList.add('tm-buena');
            });
          }
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-cc-carta'), function (x) { x.disabled = true; });
          if (ok) aciertos++;
          // El compás completo. Si la respuesta es buena se dibuja LO QUE HA PUESTO el alumno,
          // en negro como el resto (petición de Eduardo); si es mala, lo que faltaba, en rojo.
          var igual = respuesta.length === it.faltan.length && respuesta.every(function (x, k) { return x.f === it.faltan[k].f && x.s === it.faltan[k].s; });
          dibujar(dib, it, ok ? { w: 460, respuesta: respuesta } : { w: 460, revelar: true });
          var fb = cont.querySelector('.tm-cc-fb');
          fb.hidden = false;
          fb.className = 'tm-cc-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          var texto = ok
            ? (igual ? '¡Correcto!' : '¡Correcto! Tu combinación (' + lista(respuesta) + ') suma lo mismo; en la partitura estaba escrito así: ' + lista(it.faltan) + '.')
            : 'No es correcto.';
          fb.innerHTML = '<strong>' + texto + '</strong> ' + explicar(it);
          btn.textContent = pos + 1 < cola.length ? 'Siguiente' : 'Ver resultado';
          btn.classList.add('tm-listo');
        } else {
          pos++;
          if (pos < cola.length) pregunta(); else resultado();
        }
      });
    }

    function resultado() {
      var nota = aciertos / cola.length;
      var msg = nota === 1 ? '¡Perfecto! Lo dominas.' : nota >= 0.8 ? 'Muy bien: casi todo correcto.' : nota >= 0.5 ? 'Vas bien. Repasa las explicaciones y vuelve a intentarlo.' : 'Conviene repasar el valor de las figuras en cada compás antes de volver a intentarlo.';
      cont.innerHTML = '<div class="tm-cc-card tm-cc-res"><div class="tm-cc-nota">' + aciertos + '</div><div class="tm-cc-de">aciertos de ' + cola.length + '</div>'
        + '<div class="tm-cc-msg">' + msg + '</div>'
        + '<button type="button" class="tm-cc-otra" data-a="otra">Otra ronda</button>'
        + '<button type="button" class="tm-cc-otra tm-2" data-a="modo">Cambiar de nivel</button></div>';
      cont.querySelector('[data-a="otra"]').addEventListener('click', empezar);
      cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
    }

    inicio();
  };
})();
