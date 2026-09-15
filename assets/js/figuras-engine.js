/* Ejercicios de figuras, silencios y ritmo — /ejercicios/figuras/

   Uso: <div id="x"></div><script>tmFigurasEjercicio('x', 'valor');</script>
   Tipos: 'identificar' · 'valor' · 'equivalencias' · 'sumar' · 'ligaduras'

   Decisiones de Eduardo (15-09-2026):
   - Figuras de la redonda a la semicorchea, con puntillo y doble puntillo, y
     silencios con puntillo.
   - El valor de una figura depende del compás, así que siempre se pregunta
     DENTRO de un compás: la negra con puntillo vale 1 tiempo y medio en 2/4 y un
     tiempo en 6/8. Compases: 2/4, 3/4, 4/4, 6/8, 9/8 y 12/8.
   - La respuesta se da en FRACCIONES de tiempo (en 6/8 la corchea vale ⅓).

   Las duraciones se cuentan en semifusas (redonda = 64): así el doble puntillo
   de la semicorchea (4 + 2 + 1 = 7) sigue siendo un número entero.

   La misma teoría y el mismo dibujo sirven para las fichas en PDF
   (tools/generate-fichas-figuras.js) mediante window.tmFiguras. Funciona con
   VexFlow 4 (web) y VexFlow 5 (PDF). Se audita con tools/verificar-figuras.js,
   que lee lo que se dibuja y lo recalcula con tablas propias. */
(function () {
  'use strict';

  /* ------------------------------------------------------------- teoría */

  var FIG = {
    r: { u: 64, nombre: 'redonda', plural: 'redondas', vf: 'w' },
    b: { u: 32, nombre: 'blanca', plural: 'blancas', vf: 'h' },
    n: { u: 16, nombre: 'negra', plural: 'negras', vf: 'q' },
    c: { u: 8, nombre: 'corchea', plural: 'corcheas', vf: '8' },
    sc: { u: 4, nombre: 'semicorchea', plural: 'semicorcheas', vf: '16' }
  };
  var ORDEN = ['r', 'b', 'n', 'c', 'sc'];

  /* tiempo = lo que vale un tiempo, en semifusas. */
  var COMPASES = {
    '2/4': { tiempo: 16, tiempos: 2, compuesto: false },
    '3/4': { tiempo: 16, tiempos: 3, compuesto: false },
    '4/4': { tiempo: 16, tiempos: 4, compuesto: false },
    '6/8': { tiempo: 24, tiempos: 2, compuesto: true },
    '9/8': { tiempo: 24, tiempos: 3, compuesto: true },
    '12/8': { tiempo: 24, tiempos: 4, compuesto: true }
  };
  var GRUPOS = {
    simples: ['2/4', '3/4', '4/4'],
    compuestos: ['6/8', '9/8', '12/8'],
    mezcla: ['2/4', '3/4', '4/4', '6/8', '9/8', '12/8']
  };

  function valor(s) {
    var u = FIG[s.f].u;
    return u + (s.p >= 1 ? u / 2 : 0) + (s.p >= 2 ? u / 4 : 0);
  }
  function largoCompas(c) { return COMPASES[c].tiempo * COMPASES[c].tiempos; }

  function mcd(a, b) { return b ? mcd(b, a % b) : Math.abs(a); }
  function fr(n, d) { var g = mcd(n, d) || 1; return { n: n / g, d: d / g }; }
  function igual(a, b) { return a.n * b.d === b.n * a.d; }

  /* ½ ¼ ¾ con su carácter (están en cualquier fuente); el resto, como fracción
     apilada, para no depender de ⅓ o ⅙, que faltan en muchas tipografías. */
  var GLIFO = { '1/2': '½', '1/4': '¼', '3/4': '¾' };
  function fraccionHTML(f) {
    var ent = Math.floor(f.n / f.d), resto = f.n % f.d;
    if (!resto) return String(ent);
    var g = GLIFO[resto + '/' + f.d];
    // Sin la barra «⁄»: la raya de la fracción ya es el borde del numerador, y con
    // las dos «1 ⅓» se leía casi como «1 7/3».
    var parte = g || '<span class="tm-fg-fr" aria-label="' + resto + '/' + f.d + '"><sup>' + resto + '</sup><sub>' + f.d + '</sub></span>';
    return (ent ? ent + '&#8239;' : '') + parte;
  }
  function fraccionTexto(f) {
    var ent = Math.floor(f.n / f.d), resto = f.n % f.d;
    if (!resto) return String(ent);
    return (ent ? ent + ' ' : '') + (GLIFO[resto + '/' + f.d] || resto + '/' + f.d);
  }
  /* «½ tiempo», «⅔ de tiempo», «1 tiempo», «2 tiempos», «1 tiempo y ⅔ de tiempo».
     Con la parte entera y la fracción por separado (petición de Eduardo): «1 ⅔
     tiempos» se leía mal. */
  function enTiempos(f, html) {
    var F = html ? fraccionHTML : fraccionTexto;
    var ent = Math.floor(f.n / f.d), resto = f.n % f.d;
    var parte = '';
    if (resto) {
      var r = fr(resto, f.d);
      parte = F(r) + (r.n * 2 === r.d ? ' tiempo' : ' de tiempo');
    }
    if (!ent) return parte;
    var entero = ent + (ent === 1 ? ' tiempo' : ' tiempos');
    // «1 tiempo y medio», no «1 tiempo y ½ tiempo».
    if (resto && fr(resto, f.d).d === 2) return entero + ' y medio';
    return resto ? entero + ' y ' + parte : entero;
  }

  function nombre(s) {
    return (s.s ? 'silencio de ' : '') + FIG[s.f].nombre
      + (s.p === 1 ? ' con puntillo' : s.p === 2 ? ' con doble puntillo' : '');
  }
  function conArticulo(s) { return (s.s ? 'un ' : 'una ') + nombre(s); }

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
      entero: function (n) { return Math.floor(rnd() * n); },
      uno: function (arr) { return arr[Math.floor(rnd() * arr.length)]; },
      barajar: function (arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
          var j = Math.floor(rnd() * (i + 1));
          var t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
      }
    };
  }

  /* Reparte n preguntas de un montón sin repetir hasta que se agota. */
  function tomar(pool, n, A, clave) {
    var out = [], bolsa = [];
    while (out.length < n && pool.length) {
      if (!bolsa.length) bolsa = A.barajar(pool);
      var x = bolsa.shift();
      if (out.length && clave(out[out.length - 1]) === clave(x) && pool.length > 1) { bolsa.push(x); continue; }
      out.push(x);
    }
    return out;
  }

  /* Opciones: la correcta + distractores con sentido, sin repetir. */
  function opcionesFr(correcta, candidatos, A, extra) {
    var ops = [correcta];
    function meter(f) {
      if (!f || f.n <= 0 || ops.length >= 4) return;
      if (ops.some(function (o) { return igual(o, f); })) return;
      ops.push(f);
    }
    candidatos.forEach(meter);
    for (var k = 1; ops.length < 4 && k < 12; k++) {
      meter(fr(correcta.n * extra.d + k * correcta.d * extra.n, correcta.d * extra.d));
      meter(fr(correcta.n * extra.d - k * correcta.d * extra.n, correcta.d * extra.d));
    }
    return A.barajar(ops);
  }

  /* ---- 1. Identificar ---- */
  function genIdentificar(o, rnd) {
    var A = azar(rnd), pool = [];
    ORDEN.forEach(function (f) {
      [0, 1, 2].forEach(function (p) {
        [false, true].forEach(function (s) {
          if (o.modo === 'figuras' && s) return;
          if (o.modo === 'silencios' && !s) return;
          // El silencio de redonda con puntillo apenas se usa: se confunde con el
          // silencio de compás entero.
          if (s && f === 'r' && p) return;
          pool.push({ f: f, p: p, s: s });
        });
      });
    });
    return tomar(pool, o.n, A, function (x) { return nombre(x); }).map(function (s) {
      return { tipo: 'identificar', modo: o.modo, sim: s, correcta: nombre(s) };
    });
  }

  /* ---- 2. Valor en un compás ---- */
  function genValor(o, rnd) {
    var A = azar(rnd), pool = [];
    GRUPOS[o.grupo].forEach(function (c) {
      ORDEN.forEach(function (f) {
        [0, 1, 2].forEach(function (p) {
          [false, true].forEach(function (s) {
            var sim = { f: f, p: p, s: s };
            if (valor(sim) > largoCompas(c)) return;       // no cabe en el compás
            // El silencio de redonda se usa como silencio de compás entero: solo
            // en 4/4, que es donde además vale exactamente eso.
            if (s && f === 'r' && (c !== '4/4' || p)) return;
            pool.push({ compas: c, sim: sim });
          });
        });
      });
    });
    return tomar(pool, o.n, A, function (x) { return x.compas + nombre(x.sim); }).map(function (x) {
      var t = COMPASES[x.compas].tiempo, v = valor(x.sim);
      var otro = t === 16 ? 24 : 16;
      var base = FIG[x.sim.f].u;
      var correcta = fr(v, t);
      var cand = [fr(v, otro)];
      if (x.sim.p) cand.push(fr(base, t), fr(base * 2, t));
      if (x.sim.p < 2) cand.push(fr(valor({ f: x.sim.f, p: x.sim.p + 1 }), t));
      if (x.sim.p === 2) cand.push(fr(valor({ f: x.sim.f, p: 1 }), t));
      cand.push(fr(v * 2, t), fr(v, t * 2));
      return {
        tipo: 'valor', compas: x.compas, sim: x.sim, correcta: correcta,
        opciones: opcionesFr(correcta, cand, A, fr(1, COMPASES[x.compas].compuesto ? 3 : 2))
      };
    });
  }

  /* ---- 3. Equivalencias ---- */
  function genEquivalencias(o, rnd) {
    var A = azar(rnd), cuantas = [], que = [];
    ORDEN.forEach(function (fa) {
      [0, 1, 2].forEach(function (p) {
        var a = { f: fa, p: p, s: false }, va = valor(a);
        ORDEN.forEach(function (fb) {
          var vb = FIG[fb].u;
          if (va % vb || va / vb < 2 || va / vb > 16) return;
          cuantas.push({ a: a, b: fb, k: va / vb });
          if (va / vb <= 8 && fb !== fa) que.push({ a: a, b: fb, k: va / vb });
        });
      });
    });
    var kinds = o.clase === 'cuantas' ? ['cuantas'] : o.clase === 'que' ? ['que'] : ['cuantas', 'que'];
    var lista = [];
    kinds.forEach(function (k) {
      (k === 'cuantas' ? cuantas : que).forEach(function (x) { lista.push({ clase: k, x: x }); });
    });
    return tomar(lista, o.n, A, function (y) { return y.clase + nombre(y.x.a) + y.x.b; }).map(function (y) {
      var x = y.x;
      if (y.clase === 'cuantas') {
        var ops = [x.k];
        var meter = function (v) { if (v >= 1 && ops.indexOf(v) < 0 && ops.length < 4) ops.push(v); };
        if (x.a.p) meter(FIG[x.a.f].u / FIG[x.b].u);
        meter(x.k * 2); meter(x.k + 1); meter(x.k - 1); meter(Math.round(x.k / 2)); meter(x.k + 2);
        return { tipo: 'equivalencias', clase: 'cuantas', a: x.a, b: x.b, correcta: x.k, opciones: A.barajar(ops) };
      }
      var total = x.k * FIG[x.b].u;
      var todos = [];
      ORDEN.forEach(function (f) { [0, 1, 2].forEach(function (p) { todos.push({ f: f, p: p, s: false }); }); });
      var cerca = A.barajar(todos.filter(function (s) {
        return valor(s) !== total && (s.f === x.a.f || Math.abs(ORDEN.indexOf(s.f) - ORDEN.indexOf(x.a.f)) === 1)
          && valor(s) <= 112;
      }));
      var opsQ = [x.a].concat(cerca.slice(0, 3));
      return { tipo: 'equivalencias', clase: 'que', b: x.b, k: x.k, correcta: x.a, opciones: A.barajar(opsQ) };
    });
  }

  /* ---- 4. Sumar ---- */
  function genSumar(o, rnd) {
    var A = azar(rnd), out = [], vistos = {};
    for (var intento = 0; out.length < o.n && intento < o.n * 60; intento++) {
      var c = A.uno(GRUPOS[o.grupo]), largo = largoCompas(c), t = COMPASES[c].tiempo;
      var cuantos = 3 + A.entero(3), elems = [], suma = 0;
      for (var k = 0; k < 20 && elems.length < cuantos; k++) {
        var f = A.uno(largo >= 64 ? ['r', 'b', 'n', 'n', 'c', 'c', 'sc'] : ['b', 'n', 'n', 'c', 'c', 'sc']);
        var q = rnd(), p = q < 0.55 ? 0 : q < 0.92 ? 1 : 2;
        // Como en una partitura: silencios con un puntillo como mucho y nunca dos
        // seguidos (un silencio con doble puntillo junto a otro no se escribe así).
        var silencio = rnd() < 0.25 && f !== 'r' && !(elems.length && elems[elems.length - 1].s);
        var s = { f: f, p: silencio ? Math.min(p, 1) : p, s: silencio };
        if (suma + valor(s) > largo) continue;
        elems.push(s); suma += valor(s);
      }
      if (elems.length < 3) continue;
      var clave = c + elems.map(nombre).join();
      if (vistos[clave]) continue;
      vistos[clave] = 1;
      var correcta = fr(suma, t);
      var otro = t === 16 ? 24 : 16;
      var sinPunt = elems.reduce(function (a, e) { return a + FIG[e.f].u; }, 0);
      var sinSil = elems.reduce(function (a, e) { return a + (e.s ? 0 : valor(e)); }, 0);
      var cand = [fr(suma, otro)];
      if (sinPunt !== suma) cand.push(fr(sinPunt, t));
      if (sinSil !== suma && sinSil > 0) cand.push(fr(sinSil, t));
      out.push({
        tipo: 'sumar', compas: c, elems: elems, correcta: correcta,
        opciones: opcionesFr(correcta, cand, A, fr(1, COMPASES[c].compuesto ? 3 : 2))
      });
    }
    return out;
  }

  /* ---- 5. Ligaduras ---- */
  var ALTURAS = ['e/4', 'f/4', 'g/4', 'a/4'];   // por debajo de la 3ª línea: plica arriba

  /* Silencios que completan R semifusas antes de una nota: primero tiempos enteros
     (negra, o negra con puntillo en los compuestos) y después lo que falte del
     tiempo en que empieza la nota, de mayor a menor. */
  function relleno(R, t) {
    var out = [];
    while (R >= t) { out.push({ f: 'n', p: t === 24 ? 1 : 0, s: true }); R -= t; }
    [[16, 'n', 0], [12, 'c', 1], [8, 'c', 0], [4, 'sc', 0]].forEach(function (x) {
      while (R >= x[0]) { out.push({ f: x[1], p: x[2], s: true }); R -= x[0]; }
    });
    return out;
  }
  function genLigaduras(o, rnd) {
    var A = azar(rnd), out = [], vistos = {};
    for (var intento = 0; out.length < o.n && intento < o.n * 80; intento++) {
      var c = A.uno(GRUPOS[o.grupo]), largo = largoCompas(c), t = COMPASES[c].tiempo;
      var union = out.length % 2 === 0 ? rnd() < 0.5 : out.filter(function (x) { return x.clase === 'union'; }).length * 2 < out.length;
      var cuantas = union ? 2 : 2 + A.entero(2);
      var elems = [], suma = 0, ok = true;
      var alt = A.entero(ALTURAS.length);
      var sube = rnd() < 0.5 ? 1 : -1;
      for (var i = 0; i < cuantas; i++) {
        var f = A.uno(largo >= 48 ? ['b', 'n', 'n', 'c', 'c'] : ['n', 'n', 'c', 'c', 'sc']);
        var e = { f: f, p: rnd() < 0.3 && f !== 'sc' ? 1 : 0, s: false };
        if (union) e.k = ALTURAS[alt];
        else {
          var idx = alt + i * sube;
          if (idx < 0 || idx >= ALTURAS.length) { ok = false; break; }
          e.k = ALTURAS[idx];
        }
        suma += valor(e);
        elems.push(e);
      }
      if (!ok || suma > largo) continue;
      var primera = valor(elems[0]);
      var segunda = valor(elems[1]);
      /* La mitad de las de unión cruzan la barra de compás, que es para lo que más
         se usan. El primer compás se completa con silencios ANTES de la nota ligada:
         así «la primera nota» sigue siendo la de la ligadura. */
      // barra = undefined explícito: con «var» dentro del bucle, sin inicializar,
      // se heredaba la barra de la ligadura anterior.
      var ini = 0, barra = undefined;
      if (union && rnd() < 0.5) {
        var silencios = relleno(largo - primera, t);
        elems = silencios.concat(elems);
        ini = silencios.length;
        barra = ini + 1;
      }
      var clave = c + union + barra + elems.map(function (x) { return nombre(x) + x.k; }).join();
      if (vistos[clave]) continue;
      vistos[clave] = 1;
      var ligada = union ? primera + segunda : primera;
      var correcta = fr(ligada, t);
      var cand = union ? [fr(primera, t), fr(ligada, t === 16 ? 24 : 16)] : [fr(suma, t), fr(primera + segunda, t), fr(primera, t === 16 ? 24 : 16)];
      var item = {
        tipo: 'ligaduras', compas: c, elems: elems, clase: union ? 'union' : 'expresion',
        curva: [ini, union ? ini + 1 : elems.length - 1],
        correcta: correcta,
        opciones: opcionesFr(correcta, cand, A, fr(1, COMPASES[c].compuesto ? 3 : 2))
      };
      if (barra !== undefined) item.barra = barra;
      out.push(item);
    }
    return out;
  }

  var GENERADORES = { identificar: genIdentificar, valor: genValor, equivalencias: genEquivalencias, sumar: genSumar, ligaduras: genLigaduras };

  function generar(tipo, o, semilla) {
    return GENERADORES[tipo](o, mulberry32(semilla || Math.floor(Math.random() * 1e9)));
  }

  /* ---------------------------------------------------------- explicación */

  /* Lo mismo que la tabla de /ejercicios/figuras/identificar-figuras-y-silencios/. */
  var RASGO_FIGURA = {
    r: 'cabeza blanca y sin plica', b: 'cabeza blanca con plica', n: 'cabeza negra con plica',
    c: 'cabeza negra, plica y un corchete', sc: 'cabeza negra, plica y dos corchetes'
  };
  var RASGO_SILENCIO = {
    r: 'un rectángulo que cuelga de la cuarta línea', b: 'un rectángulo apoyado sobre la tercera línea',
    n: 'un trazo vertical en zigzag', c: 'un trazo inclinado con un gancho', sc: 'un trazo inclinado con dos ganchos'
  };

  function frase(s) { return FIG[s.f].nombre + (s.p === 1 ? ' con puntillo' : s.p === 2 ? ' con doble puntillo' : ''); }

  function explicarValor(sim, compas, html) {
    var t = COMPASES[compas].tiempo, u = FIG[sim.f].u;
    var b = fr(u, t);
    var txt = 'En ' + compas + ' el tiempo es la ' + (COMPASES[compas].compuesto ? 'negra con puntillo' : 'negra')
      + ', así que ' + (sim.s ? 'el silencio de ' : 'la ') + FIG[sim.f].nombre + ' vale ' + enTiempos(b, html) + '.';
    if (sim.p) {
      var h = fr(u / 2, t), q = fr(u / 4, t), v = fr(valor(sim), t);
      var F = function (x) { return enTiempos(x, html); };
      txt += ' El puntillo añade la mitad (' + F(h) + ')'
        + (sim.p === 2 ? ' y el segundo puntillo, la mitad de lo que añade el primero (' + F(q) + '): ' + F(b) + ' + ' + F(h) + ' + ' + F(q)
          : ': ' + F(b) + ' + ' + F(h))
        + ' = ' + enTiempos(v, html) + '.';
    }
    return txt;
  }

  function explicar(item, html) {
    var F = function (x) { return enTiempos(x, html); };
    if (item.tipo === 'identificar') {
      // Se explica el rasgo que había que mirar, no solo el nombre.
      var s = item.sim;
      var rasgo = s.s ? RASGO_SILENCIO[s.f] : RASGO_FIGURA[s.f];
      var puntos = s.p === 1 ? ', y lleva un puntillo' : s.p === 2 ? ', y lleva dos puntillos' : '';
      return 'Es ' + conArticulo(s) + ': ' + rasgo + puntos + '.';
    }
    if (item.tipo === 'valor') return explicarValor(item.sim, item.compas, html);
    if (item.tipo === 'equivalencias') {
      var a = item.clase === 'cuantas' ? item.a : item.correcta, vb = FIG[item.b].u, u = FIG[a.f].u;
      var partes = [u / vb];
      if (a.p >= 1) partes.push(u / 2 / vb);
      if (a.p >= 2) partes.push(u / 4 / vb);
      var total = valor(a) / vb;
      var detalle = a.p
        ? ' La ' + FIG[a.f].nombre + ' vale ' + partes[0] + ' ' + FIG[item.b].plural + (a.p === 1
          ? '; el puntillo añade la mitad (' + partes[1] + '): ' + partes.join(' + ') + ' = ' + total + '.'
          : '; el puntillo añade la mitad (' + partes[1] + ') y el segundo, la mitad de lo que añade el primero (' + partes[2] + '): ' + partes.join(' + ') + ' = ' + total + '.')
        : '';
      return (item.clase === 'cuantas'
        ? 'En una ' + frase(a) + ' hay ' + total + ' ' + FIG[item.b].plural + '.'
        : total + ' ' + FIG[item.b].plural + ' valen lo mismo que una ' + frase(a) + '.') + detalle;
    }
    var t = COMPASES[item.compas].tiempo;
    var uT = 'En ' + item.compas + ' el tiempo es la ' + (COMPASES[item.compas].compuesto ? 'negra con puntillo' : 'negra') + '.';
    if (item.tipo === 'sumar') {
      return uT + ' ' + item.elems.map(function (e) { return F(fr(valor(e), t)); }).join(' + ')
        + ' = ' + enTiempos(item.correcta, html) + '.';
    }
    var a = item.curva[0];
    var v0 = fr(valor(item.elems[a]), t), v1 = fr(valor(item.elems[a + 1]), t);
    return item.clase === 'union'
      ? 'Las dos notas son la misma: es una ligadura de unión. La segunda no se vuelve a tocar'
        + (item.barra != null ? ', aunque esté al otro lado de la barra de compás,' : '')
        + ' y sus duraciones se suman en un solo sonido. ' + uT + ' ' + F(v0) + ' + ' + F(v1) + ' = ' + enTiempos(item.correcta, html) + '.'
      : 'Las notas son distintas: es una ligadura de expresión, que se toca ligado pero no cambia la duración. ' + uT + ' La primera nota dura ' + enTiempos(item.correcta, html) + '.';
  }

  /* --------------------------------------------------------------- dibujo */

  function VF() { return (window.Vex && window.Vex.Flow) || window.VexFlow; }

  /* spec = { compas?, elems: [{f, p, s, k?}], tie?: [i, j], slur?: [i, j], w?, rojo? }
     Deja en div.__tmNotas lo que realmente se ha dibujado (para el verificador). */
  function dibujar(div, spec) {
    var V = VF();
    div.innerHTML = '';
    var cifra = spec.compas ? 44 : 0;
    var W = spec.w || Math.max(96, 34 + cifra + spec.elems.length * (spec.elems.length > 1 ? 58 : 60) + (spec.barra != null ? 24 : 0));
    var H = 104;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(W, H);
    var ctx = r.getContext();
    var stave = new V.Stave(4, 4, W - 8, { space_above_staff_ln: 3, spaceAboveStaffLn: 3 });
    var NINGUNA = (V.BarlineType || (V.Barline && V.Barline.type)).NONE;
    stave.setBegBarType(NINGUNA);
    stave.setEndBarType(NINGUNA);
    if (spec.compas) stave.addTimeSignature(spec.compas);
    stave.setContext(ctx).draw();

    var notas = spec.elems.map(function (e) {
      var dur = FIG[e.f].vf + (e.p === 2 ? 'dd' : e.p === 1 ? 'd' : '') + (e.s ? 'r' : '');
      var sn = new V.StaveNote({ keys: [e.s ? 'b/4' : (e.k || 'a/4')], duration: dur, clef: 'treble' });
      if (!e.s && e.f !== 'r') {
        var linea = sn.getKeyProps()[0].line;
        sn.setStemDirection(linea >= 3 ? -1 : 1);
      }
      for (var i = 0; i < e.p; i++) V.Dot.buildAndAttach([sn], { all: true });
      return sn;
    });

    var voz = new V.Voice(spec.compas || '4/4');
    voz.setMode(V.Voice.Mode.SOFT);
    // Con barra de compás, la barra va dentro de la voz y las barras de las corcheas
    // se calculan compás a compás: nunca unen notas de dos compases distintos.
    var corte = spec.barra == null ? notas.length : spec.barra;
    voz.addTickables(corte < notas.length ? notas.slice(0, corte).concat([new V.BarNote()], notas.slice(corte)) : notas);
    var compuesto = spec.compas && COMPASES[spec.compas].compuesto;
    var opcionesBarras = {
      groups: [compuesto ? new V.Fraction(3, 8) : new V.Fraction(1, 4)],
      beam_rests: false, beamRests: false,
      maintain_stem_directions: true, maintainStemDirections: true
    };
    var barras = [];
    [notas.slice(0, corte), notas.slice(corte)].forEach(function (grupo) {
      if (grupo.length > 1) barras = barras.concat(V.Beam.generateBeams(grupo, opcionesBarras));
    });
    var ancho = stave.getNoteEndX() - stave.getNoteStartX() - 14;
    new V.Formatter().joinVoices([voz]).format([voz], Math.max(20, ancho));
    voz.draw(ctx, stave);
    barras.forEach(function (b) { b.setContext(ctx).draw(); });

    var curvas = [];
    if (spec.tie) {
      var i0 = spec.tie[0], i1 = spec.tie[1];
      new V.StaveTie({
        first_note: notas[i0], last_note: notas[i1], first_indices: [0], last_indices: [0],
        firstNote: notas[i0], lastNote: notas[i1], firstIndexes: [0], lastIndexes: [0]
      }).setContext(ctx).draw();
      curvas.push({ clase: 'union', desde: i0, hasta: i1 });
    }
    if (spec.slur) {
      var j0 = spec.slur[0], j1 = spec.slur[1];
      new V.Curve(notas[j0], notas[j1], { cps: [{ x: 0, y: 12 }, { x: 0, y: 12 }] }).setContext(ctx).draw();
      curvas.push({ clase: 'expresion', desde: j0, hasta: j1 });
    }

    var svg = div.querySelector('svg');
    if (svg) {
      if (spec.rojo) {
        Array.prototype.forEach.call(svg.querySelectorAll('.vf-stavenote *, .vf-stavetie *, path'), function (el) {
          if (el.closest && el.closest('.vf-stave')) return;
          el.setAttribute('fill', el.getAttribute('fill') === 'none' ? 'none' : '#c0392b');
          el.setAttribute('stroke', '#c0392b');
        });
      }
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.style.width = '100%';
      svg.style.height = 'auto';
      svg.style.maxWidth = Math.round(W * 1.15) + 'px';
    }
    div.__tmNotas = notas.map(function (sn) {
      return {
        duracion: sn.getDuration(), silencio: sn.isRest(), claves: sn.getKeys(),
        puntillos: sn.getModifiersByType ? sn.getModifiersByType('Dot').length : 0,
        plica: sn.getStemDirection ? (sn.hasStem() ? sn.getStemDirection() : 0) : 0
      };
    });
    div.__tmCurvas = curvas;
    div.__tmCifra = spec.compas || null;
    div.__tmBarra = spec.barra == null ? null : spec.barra;
  }

  function specDe(item) {
    if (item.tipo === 'identificar' || item.tipo === 'valor') return { compas: item.tipo === 'valor' ? item.compas : null, elems: [item.sim] };
    if (item.tipo === 'sumar') return { compas: item.compas, elems: item.elems };
    if (item.tipo === 'ligaduras') {
      var s = { compas: item.compas, elems: item.elems, barra: item.barra };
      if (item.clase === 'union') s.tie = item.curva; else s.slur = item.curva;
      return s;
    }
    if (item.tipo === 'equivalencias') return { elems: [item.clase === 'cuantas' ? item.a : { f: item.b, p: 0, s: false }] };
    return null;
  }

  function enunciado(item, html) {
    switch (item.tipo) {
      case 'identificar': return item.modo === 'silencios' ? '¿Qué silencio es?' : item.modo === 'figuras' ? '¿Qué figura es?' : '¿Qué es?';
      case 'valor': return 'En un compás de ' + item.compas + ', ¿cuánto vale ' + (item.sim.s ? 'este silencio' : 'esta figura') + '?';
      case 'equivalencias': return item.clase === 'cuantas'
        ? '¿Cuántas ' + FIG[item.b].plural + ' hay en una ' + frase(item.a) + '?'
        : '¿Qué figura equivale a ' + item.k + ' ' + FIG[item.b].plural + '?';
      case 'sumar': return 'En ' + item.compas + ', ¿cuántos tiempos suman estas figuras?';
      default: return 'En ' + item.compas + ', ¿qué ligadura es y cuánto dura la primera nota?';
    }
  }

  window.tmFiguras = {
    FIG: FIG, ORDEN: ORDEN, COMPASES: COMPASES, GRUPOS: GRUPOS,
    valor: valor, fr: fr, igual: igual, nombre: nombre, frase: frase,
    fraccionHTML: fraccionHTML, fraccionTexto: fraccionTexto, enTiempos: enTiempos,
    generar: generar, explicar: explicar, enunciado: enunciado, dibujar: dibujar, specDe: specDe
  };

  /* ------------------------------------------------------------------- UI */

  var CSS = [
    '.tm-fg{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-fg-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-fg-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-fg-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-fg-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-fg-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;font-family:inherit;transition:all .15s;}',
    '.tm-fg-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-fg-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-fg-modo span{font-size:.82rem;color:#8b6914;}',
    '.tm-fg-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-fg-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-fg-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-fg-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:4px 0 8px;}',
    '.tm-fg-dibujo{display:flex;justify-content:center;margin:0 auto 10px;}',
    '.tm-fg-dibujo > div{width:100%;display:flex;justify-content:center;}',
    '.tm-fg-seccion{margin:12px 0;padding:14px;background:#faf7f2;border:1px solid #e8e0cc;border-radius:8px;}',
    '.tm-fg-seccion.tm-ok{border-color:#27ae60;background:#f0faf2;}',
    '.tm-fg-seccion.tm-ko{border-color:#c0392b;background:#fff5f5;}',
    '.tm-fg-q{font-size:.78rem;font-weight:700;color:#8b6914;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;}',
    '.tm-fg-ops{display:flex;gap:10px;flex-wrap:wrap;}',
    '.tm-fg-op{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:10px 16px;cursor:pointer;font-weight:600;font-size:.95rem;color:#514232;font-family:inherit;min-height:44px;transition:all .15s;}',
    '.tm-fg-op:hover:not([disabled]){border-color:#8b6914;}',
    '.tm-fg-op.tm-sel{border-color:#8b6914;background:#8b6914;color:#fff;}',
    '.tm-fg-op.tm-ok{border-color:#27ae60!important;background:#27ae60!important;color:#fff!important;}',
    '.tm-fg-op.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-fg-op.tm-buena{border-color:#27ae60!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-fg-op[disabled]{cursor:default;}',
    '.tm-fg-op-fig{display:flex;flex-direction:column;align-items:center;padding:6px 10px;min-width:96px;flex:1 1 calc(50% - 10px);}',
    '.tm-fg-op-fig .tm-fg-mini{width:72px;}',
    '.tm-fg-op-fig small{font-size:.72rem;font-weight:600;line-height:1.2;}',
    '.tm-fg-fr{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1;font-size:.8em;}',
    '.tm-fg-fr sup,.tm-fg-fr sub{position:static;font-size:1em;line-height:1.05;}',
    '.tm-fg-fr sup{border-bottom:1.5px solid currentColor;padding:0 1px;}',
    '.tm-fg-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-fg-fb[hidden]{display:none;}',
    '.tm-fg-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-fg-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-fg-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#d8d0b8;color:#777;cursor:not-allowed;}',
    '.tm-fg-btn.tm-listo{background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-fg-res{text-align:center;padding:10px 0;}',
    '.tm-fg-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-fg-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-fg-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-fg-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-fg-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}'
  ].join('');

  var MODOS = {
    identificar: {
      tit: 'Identificar figuras y silencios',
      sub: 'Se muestra un símbolo y hay que decir qué es y si lleva puntillo.',
      modos: [
        { v: { modo: 'figuras' }, t: 'Figuras', d: 'Redonda, blanca, negra, corchea y semicorchea, con y sin puntillo' },
        { v: { modo: 'silencios' }, t: 'Silencios', d: 'Los silencios de cada figura, con y sin puntillo' },
        { v: { modo: 'mezcla' }, t: 'Figuras y silencios mezclados', d: 'Hay que decir también si es figura o silencio' }
      ]
    },
    valor: {
      tit: '¿Cuánto vale la figura en este compás?',
      sub: 'El valor depende del compás: la negra con puntillo vale 1 tiempo y medio en 2/4, y 1 tiempo en 6/8.',
      modos: [
        { v: { grupo: 'simples' }, t: 'Compases simples', d: '2/4, 3/4 y 4/4: el tiempo es la negra' },
        { v: { grupo: 'compuestos' }, t: 'Compases compuestos', d: '6/8, 9/8 y 12/8: el tiempo es la negra con puntillo' },
        { v: { grupo: 'mezcla' }, t: 'Simples y compuestos', d: 'Fíjate primero en el compás' }
      ]
    },
    equivalencias: {
      tit: 'Equivalencias entre figuras',
      sub: 'Cuántas figuras de un tipo caben en otra, también con puntillo y doble puntillo.',
      modos: [
        { v: { clase: 'cuantas' }, t: '¿Cuántas caben?', d: '¿Cuántas corcheas hay en una blanca con puntillo?' },
        { v: { clase: 'que' }, t: '¿Qué figura es?', d: '¿Qué figura equivale a tres negras?' },
        { v: { clase: 'mezcla' }, t: 'Las dos preguntas mezcladas', d: '' }
      ]
    },
    sumar: {
      tit: 'Sumar las figuras de un compás',
      sub: 'Varias figuras y silencios seguidos: ¿cuántos tiempos suman en ese compás?',
      modos: [
        { v: { grupo: 'simples' }, t: 'Compases simples', d: '2/4, 3/4 y 4/4' },
        { v: { grupo: 'compuestos' }, t: 'Compases compuestos', d: '6/8, 9/8 y 12/8' },
        { v: { grupo: 'mezcla' }, t: 'Simples y compuestos', d: '' }
      ]
    },
    ligaduras: {
      tit: 'Ligadura de unión o de expresión',
      sub: 'Hay que decir qué ligadura es y cuánto dura la primera nota: la de unión suma las duraciones y la de expresión no.',
      modos: [
        { v: { grupo: 'simples' }, t: 'Compases simples', d: '2/4, 3/4 y 4/4' },
        { v: { grupo: 'compuestos' }, t: 'Compases compuestos', d: '6/8, 9/8 y 12/8' },
        { v: { grupo: 'mezcla' }, t: 'Simples y compuestos', d: '' }
      ]
    }
  };
  var PREGUNTAS = 10;

  function mini(sim) {
    var d = document.createElement('div');
    d.className = 'tm-fg-mini';
    dibujar(d, { elems: [sim], w: 96 });
    return d;
  }

  window.tmFigurasEjercicio = function (id, tipo) {
    var cont = document.getElementById(id);
    if (!cont || !VF() || !MODOS[tipo]) return;
    if (!document.getElementById('tm-fg-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fg-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    var cfg = MODOS[tipo];
    cont.className = 'tm-fg';
    var cola = [], pos = 0, aciertos = 0, opcionesModo = null;

    function inicio() {
      cont.innerHTML = '<div class="tm-fg-card"><div class="tm-fg-tit">' + cfg.tit + '</div><div class="tm-fg-sub">' + cfg.sub
        + '</div><div class="tm-fg-modos">' + cfg.modos.map(function (m, i) {
          return '<button type="button" class="tm-fg-modo" data-i="' + i + '"><strong>' + m.t + '</strong>' + (m.d ? '<span>' + m.d + '</span>' : '') + '</button>';
        }).join('') + '</div></div>';
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-fg-modo'), function (b) {
        b.addEventListener('click', function () { empezar(cfg.modos[Number(b.getAttribute('data-i'))].v); });
      });
    }

    function empezar(v) {
      opcionesModo = v;
      var o = {}; for (var k in v) o[k] = v[k];
      o.n = PREGUNTAS;
      cola = generar(tipo, o);
      pos = 0; aciertos = 0;
      pregunta();
    }

    function botonesFr(item, grupo) {
      return item.opciones.map(function (f, i) {
        return '<button type="button" class="tm-fg-op" data-g="' + grupo + '" data-i="' + i + '">' + enTiempos(f, true) + '</button>';
      }).join('');
    }

    function pregunta() {
      var item = cola[pos];
      var secciones = [];
      if (tipo === 'identificar') {
        if (item.modo === 'mezcla') secciones.push({ g: 'clase', q: '¿Figura o silencio?', ops: ['Figura', 'Silencio'] });
        secciones.push({ g: 'cual', q: item.modo === 'silencios' ? '¿De qué figura?' : '¿Cuál?', ops: ORDEN.map(function (f) { var n = FIG[f].nombre; return n.charAt(0).toUpperCase() + n.slice(1); }) });
        secciones.push({ g: 'punt', q: '¿Puntillo?', ops: ['Sin puntillo', 'Con puntillo', 'Doble puntillo'] });
      } else if (tipo === 'ligaduras') {
        secciones.push({ g: 'clase', q: '¿Qué ligadura es?', ops: ['De unión', 'De expresión'] });
        secciones.push({ g: 'val', q: '¿Cuánto dura la primera nota?', html: botonesFr(item, 'val') });
      } else if (tipo === 'equivalencias' && item.clase === 'cuantas') {
        secciones.push({ g: 'val', q: 'Respuesta', ops: item.opciones.map(String) });
      } else if (tipo === 'equivalencias') {
        secciones.push({ g: 'val', q: 'Elige la figura', figs: item.opciones });
      } else {
        secciones.push({ g: 'val', q: 'Respuesta', html: botonesFr(item, 'val') });
      }

      cont.innerHTML = '<div class="tm-fg-card">'
        + '<div class="tm-fg-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-fg-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-fg-preg">' + enunciado(item, true) + '</div>'
        + '<div class="tm-fg-dibujo"><div></div></div>'
        + secciones.map(function (s) {
          var ops = s.html || (s.figs ? s.figs.map(function (f, i) {
            return '<button type="button" class="tm-fg-op tm-fg-op-fig" data-g="val" data-i="' + i + '"><span class="tm-fg-hueco"></span><small>' + frase(f) + '</small></button>';
          }).join('') : s.ops.map(function (t, i) {
            return '<button type="button" class="tm-fg-op" data-g="' + s.g + '" data-i="' + i + '">' + t + '</button>';
          }).join(''));
          return '<div class="tm-fg-seccion" data-g="' + s.g + '"><div class="tm-fg-q">' + s.q + '</div><div class="tm-fg-ops">' + ops + '</div></div>';
        }).join('')
        + '<div class="tm-fg-fb" hidden></div>'
        + '<button type="button" class="tm-fg-btn">Comprobar</button></div>';

      var spec = specDe(item);
      if (spec) dibujar(cont.querySelector('.tm-fg-dibujo > div'), spec);
      if (secciones[0].figs) {
        Array.prototype.forEach.call(cont.querySelectorAll('.tm-fg-hueco'), function (h, i) { h.appendChild(mini(item.opciones[i])); });
      }

      var sel = {};
      var btn = cont.querySelector('.tm-fg-btn');
      var corregida = false;
      cont.querySelector('.tm-fg-card').addEventListener('click', function (ev) {
        var op = ev.target.closest('.tm-fg-op');
        if (op && !corregida) {
          var g = op.getAttribute('data-g');
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-fg-op[data-g="' + g + '"]'), function (b) { b.classList.remove('tm-sel'); });
          op.classList.add('tm-sel');
          sel[g] = Number(op.getAttribute('data-i'));
          var listo = secciones.every(function (s) { return s.g in sel; });
          btn.classList.toggle('tm-listo', listo);
        }
      });
      btn.addEventListener('click', function () {
        if (!corregida) {
          if (!secciones.every(function (s) { return s.g in sel; })) return;
          corregida = true;
          corregir(item, secciones, sel);
          btn.textContent = pos + 1 < cola.length ? 'Siguiente' : 'Ver resultado';
          btn.classList.add('tm-listo');
        } else {
          pos++;
          if (pos < cola.length) pregunta(); else resultado();
        }
      });
    }

    function buenas(item, g) {
      if (tipo === 'identificar') {
        if (g === 'clase') return item.sim.s ? 1 : 0;
        if (g === 'cual') return ORDEN.indexOf(item.sim.f);
        return item.sim.p;
      }
      if (tipo === 'ligaduras' && g === 'clase') return item.clase === 'union' ? 0 : 1;
      if (tipo === 'equivalencias' && item.clase === 'cuantas') return item.opciones.indexOf(item.correcta);
      if (tipo === 'equivalencias') return item.opciones.indexOf(item.correcta);
      for (var i = 0; i < item.opciones.length; i++) if (igual(item.opciones[i], item.correcta)) return i;
      return -1;
    }

    function corregir(item, secciones, sel) {
      var todo = true;
      secciones.forEach(function (s) {
        var bien = buenas(item, s.g);
        var ok = sel[s.g] === bien;
        if (!ok) todo = false;
        var sec = cont.querySelector('.tm-fg-seccion[data-g="' + s.g + '"]');
        sec.classList.add(ok ? 'tm-ok' : 'tm-ko');
        Array.prototype.forEach.call(sec.querySelectorAll('.tm-fg-op'), function (b) {
          var i = Number(b.getAttribute('data-i'));
          b.disabled = true;
          b.classList.remove('tm-sel');
          if (i === sel[s.g]) b.classList.add(ok ? 'tm-ok' : 'tm-ko');
          else if (i === bien) b.classList.add('tm-buena');
        });
      });
      if (todo) aciertos++;
      var fb = cont.querySelector('.tm-fg-fb');
      fb.hidden = false;
      fb.className = 'tm-fg-fb ' + (todo ? 'tm-ok' : 'tm-ko');
      fb.innerHTML = '<strong>' + (todo ? '¡Correcto!' : 'No es correcto.') + '</strong> ' + explicar(item, true);
    }

    function resultado() {
      var nota = aciertos / cola.length;
      var msg = nota === 1 ? '¡Perfecto! Lo dominas.' : nota >= 0.8 ? 'Muy bien: casi todo correcto.' : nota >= 0.5 ? 'Vas bien. Repasa las explicaciones de los fallos y vuelve a intentarlo.' : 'Conviene repasar la teoría antes de volver a intentarlo.';
      cont.innerHTML = '<div class="tm-fg-card tm-fg-res"><div class="tm-fg-nota">' + aciertos + '</div><div class="tm-fg-de">aciertos de ' + cola.length + '</div>'
        + '<div class="tm-fg-msg">' + msg + '</div>'
        + '<button type="button" class="tm-fg-otra" data-a="otra">Otra ronda</button>'
        + '<button type="button" class="tm-fg-otra tm-2" data-a="modo">Cambiar de nivel</button></div>';
      cont.querySelector('[data-a="otra"]').addEventListener('click', function () { empezar(opcionesModo); });
      cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
    }

    inicio();
  };
})();
