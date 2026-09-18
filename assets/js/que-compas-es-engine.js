/* ¿Qué compás es? — /ejercicios/grupos-de-valoracion-especial/que-compas-es/

   Uso: <div id="x"></div><script>tmQueCompasEs('x');</script>

   Decisión de Eduardo (18-09-2026): en el conservatorio de Torrent les hacían
   este ejercicio: un compás LLENO de grupos de valoración especial, sin cifra,
   y hay que adivinar el compás «simplificando» —viendo a qué equivale cada
   grupo irregular y sumando—. Eduardo avisa de que en la práctica real estos
   compases «se complican mucho, cosas muy raras».

   Niveles: cuántos tiempos del compás llevan un grupo irregular (el resto,
   figuras normales). Nivel 1: uno. Nivel 2: dos. Nivel 3: TODOS los tiempos
   —el compás entero hecho de grupos, la «rareza» máxima que describe Eduardo—.
   A partir del nivel 2 los grupos pueden llevar silencio; en el nivel 3,
   además, ritmo mixto dentro del grupo (como en el ejercicio de equivalencias).

   Alcance de esta primera versión (aviso, no decisión silenciosa): la
   respuesta correcta es la cifra con la que se generó el compás, MÁS la
   excepción fija de siempre —todo 4/4 acepta también 2/2, sin comprobar nada
   más (Eduardo, 18-09-2026, sobre un caso real: «el 2/2 y el 4/4 caben lo
   mismo»; ver `cifrasValidas()`, misma regla que en reconocer-compas-engine.js).
   No se comprueba ninguna otra lectura alternativa (como 3/4↔6/8, que
   depende del ritmo concreto, no es una excepción fija): añadir eso aquí, con
   grupos irregulares de por medio, es un problema bastante más difícil que
   se deja fuera a propósito.

   Reutiliza completar-compas-engine.js (tabla de figuras/compases) y
   grupos-valoracion-especial-engine.js (tabla de grupos verificada,
   `repartir`, `duracionDe`); los dos tienen que cargarse antes en la página.
   Se audita con tools/verificar-que-compas-es.js. */
(function () {
  'use strict';

  function D() { return window.tmCompletarCompasData; }
  function GV() { return window.tmGruposVETest; }
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

  var ORDEN_GRUPOS = ['tresillo', 'dosillo', 'cuatrillo', 'seisillo'];
  var COMPASES_TODOS = ['2/4', '3/4', '4/4', '6/8', '9/8', '12/8'];

  /* Todas las combinaciones (grupo, variante) válidas para un compás dado. */
  function candidatosPara(compas) {
    var GVT = GV(), out = [];
    ORDEN_GRUPOS.forEach(function (id) {
      GVT.GRUPOS_VE[id].variantes.forEach(function (v) {
        if (v.compases.indexOf(compas) >= 0) out.push({ grupo: id, variante: v });
      });
    });
    return out;
  }

  /* Un grupo, ya elegidos su tipo y variante: reparto interno y silencio,
     reutilizando repartir() del motor de equivalencias (misma tabla, sin
     duplicarla). */
  function nuevoGrupo(cand, nivel, rnd) {
    var GVT = GV();
    var n = GVT.GRUPOS_VE[cand.grupo].n;
    var mezclar = nivel === 3;
    var conSilencio = nivel >= 2 && rnd() < 0.3;
    var partes = GVT.repartir(n, mezclar, rnd);
    var silIdx = conSilencio ? Math.floor(rnd() * partes.length) : -1;
    return { grupo: cand.grupo, variante: cand.variante, partes: partes, silIdx: silIdx };
  }

  /* o = { nivel: 1|2|3 }. nivel 1: un tiempo con grupo. nivel 2: dos. nivel 3:
     todos los tiempos del compás. */
  function generarUno(o, rnd) {
    var A = azar(rnd), FIG = D().FIG, COMP = D().COMPASES;
    var compas = A.uno(COMPASES_TODOS);
    var d = COMP[compas];
    var cuantos = o.nivel === 1 ? 1 : o.nivel === 2 ? Math.min(2, d.tiempos) : d.tiempos;
    var indices = [];
    for (var i = 0; i < d.tiempos; i++) indices.push(i);
    indices = A.barajar(indices).slice(0, cuantos);
    var conGrupo = {}; indices.forEach(function (i) { conGrupo[i] = true; });

    var elems = [], t = 0, grupos = [];
    for (var tiempo = 0; tiempo < d.tiempos; tiempo++) {
      if (conGrupo[tiempo]) {
        var cand = A.uno(candidatosPara(compas));
        var g = nuevoGrupo(cand, o.nivel, rnd);
        var uGrupo = cand.variante.uGrupo;
        var trozos = [{ grupo: true, t0: 0, u: uGrupo, datos: g }];
        var extra = (d.tiempo - uGrupo) / FIG.c.u;
        for (var e = 0; e < extra; e++) trozos.push({ f: 'c', s: false, t0: 0, u: FIG.c.u });
        trozos = A.barajar(trozos);
        trozos.forEach(function (h) { h.t0 = t; elems.push(h); t += h.u; });
        grupos.push(g);
      } else if (rnd() < 0.5) {
        var figTiempo = d.tiempo === 16 ? 'n' : 'nP';
        elems.push({ f: figTiempo, s: false, t0: t, u: d.tiempo }); t += d.tiempo;
      } else {
        var cuantas = d.tiempo / FIG.c.u;
        for (var k = 0; k < cuantas; k++) { elems.push({ f: 'c', s: false, t0: t, u: FIG.c.u }); t += FIG.c.u; }
      }
    }
    return { compas: compas, elems: elems, grupos: grupos, nivel: o.nivel };
  }

  /* o = { nivel: 1|2|3, n } */
  function generarLote(o, semilla) {
    var rnd = mulberry32(semilla || Math.floor(Math.random() * 1e9));
    var out = [];
    for (var i = 0; i < o.n; i++) out.push(generarUno(o, rnd));
    return out;
  }

  /* Cifras que se dan por buenas para un compás generado. Regla simplificada
     a propósito (18-09-2026, mismo día que reconocer-compas): todo compás
     SIMPLE acepta también su «doblado» (numerador y denominador ×2, que sigue
     siendo simple), sin comprobar nada más — «el 2/2 y el 4/4 caben lo mismo»
     y «con el 2/4 y el 4/8 pasa lo mismo» (Eduardo, viendo casos reales). El
     3/4 NO tiene entrada aquí a propósito: su doblado (6/8) es un compás
     COMPUESTO de verdad, y esa equivalencia sí depende del ritmo concreto
     (como en reconocer-compas), no es un simple cambio de notación — sigue
     fuera de alcance, ver la nota al principio del archivo. */
  var CIFRAS_DOBLADO = { '4/4': '2/2', '2/4': '4/8' };
  function cifrasValidas(compas) { return CIFRAS_DOBLADO[compas] ? [compas, CIFRAS_DOBLADO[compas]] : [compas]; }

  function explicar(it) {
    var GVT = GV();
    var partes = it.grupos.map(function (g) {
      var nombreBase = D().FIG[g.variante.base].nombre;
      var nombreEquiv = D().FIG[g.variante.equivaleFig].nombre;
      var n = GVT.GRUPOS_VE[g.grupo].n;
      return 'el ' + g.grupo + ' de ' + nombreBase + 's equivale a una ' + nombreEquiv;
    });
    var lista = partes.length === 1 ? partes[0]
      : partes.slice(0, -1).join(', ') + ' y ' + partes[partes.length - 1];
    var validas = cifrasValidas(it.compas);
    var comoCompas = validas.length > 1 ? 'un compás de ' + validas.join(' o ') : 'un compás de ' + it.compas;
    return 'Simplificando: ' + lista + '. Sumando todo lo que cabe, es ' + comoCompas + '.';
  }

  /* --------------------------------------------------------- Dibujo */

  /* Dibuja el compás completo, con o sin cifra. opts = { w, sinCifra }.
     Escribe div.__tmInfo para el verificador. Cada elemento del grupo lleva
     sus propios datos (e.datos: {grupo, variante, partes, silIdx}), a
     diferencia de dibujarConGrupo() del otro ejercicio, que solo admite un
     grupo por compás. */
  function dibujarCompas(div, it, opts) {
    var V = VF(), FIG = D().FIG;
    opts = opts || {};
    div.innerHTML = '';
    var W = opts.w || 460, H = 100;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(W, H);
    var ctx = r.getContext();
    var stave = new V.Stave(6, 6, W - 12, { space_above_staff_ln: 3, spaceAboveStaffLn: 3 });
    if (!opts.sinCifra) stave.addTimeSignature(it.compas);
    stave.setContext(ctx).draw();

    var d = D().COMPASES[it.compas];
    var notas = [], info = [], tuplets = [];
    var barrasFuera = [], grupoFuera = [];
    function cerrarFuera() { if (grupoFuera.length > 1) barrasFuera.push(new V.Beam(grupoFuera.map(function (x) { return x.n; }), false)); grupoFuera = []; }

    it.elems.forEach(function (e) {
      if (e.grupo) {
        var g = e.datos;
        var notasGrupo = [], barrasGrupo = [], corriendo = [];
        function cerrarGrupo() { if (corriendo.length > 1) barrasGrupo.push(new V.Beam(corriendo, false)); corriendo = []; }
        g.partes.forEach(function (p, k) {
          var esSil = k === g.silIdx;
          var dur = GV().duracionDe(g.variante.base, p) + (esSil ? 'r' : '');
          var nota = new V.StaveNote({ keys: ['b/4'], duration: dur, clef: 'treble' });
          if (!esSil) nota.setStemDirection(-1);
          notasGrupo.push(nota);
          notas.push(nota);
          info.push({ grupo: g.grupo, partes: p, silencio: esSil });
          if (p === 1 && !esSil) corriendo.push(nota); else cerrarGrupo();
        });
        cerrarGrupo();
        var nGrupo = GV().GRUPOS_VE[g.grupo].n, equivale = GV().GRUPOS_VE[g.grupo].equivale;
        tuplets.push(new V.Tuplet(notasGrupo, {
          num_notes: nGrupo, notes_occupied: equivale, numNotes: nGrupo, notesOccupied: equivale,
          bracketed: true, ratioed: false
        }));
        barrasFuera = barrasFuera.concat(barrasGrupo);
        cerrarFuera();
        return;
      }
      var durFuera = FIG[e.f].vf + (e.s ? 'r' : '');
      var notaFuera = new V.StaveNote({ keys: ['b/4'], duration: durFuera, clef: 'treble' });
      if (!e.s) notaFuera.setStemDirection(-1);
      if (/d$/.test(FIG[e.f].vf)) V.Dot.buildAndAttach([notaFuera], { all: true });
      notas.push(notaFuera);
      info.push({ f: e.f, s: !!e.s, puntillos: notaFuera.getModifiersByType ? notaFuera.getModifiersByType('Dot').length : 0 });
      var corta = e.u < 16 && !e.s;
      var tiempoIdx = Math.floor(e.t0 / d.tiempo);
      if (!corta || (grupoFuera.length && Math.floor(grupoFuera[0].t0 / d.tiempo) !== tiempoIdx)) cerrarFuera();
      if (corta) grupoFuera.push({ n: notaFuera, t0: e.t0 });
    });
    cerrarFuera();

    var voz = new V.Voice({ num_beats: d.tiempos * d.tiempo, beat_value: 64, numBeats: d.tiempos * d.tiempo, beatValue: 64 });
    voz.setMode(V.Voice.Mode.SOFT);
    voz.addTickables(notas);
    new V.Formatter().joinVoices([voz]).format([voz], stave.getNoteEndX() - stave.getNoteStartX() - 30);
    voz.draw(ctx, stave);
    barrasFuera.forEach(function (b) { b.setContext(ctx).draw(); });
    tuplets.forEach(function (tp) { tp.setContext(ctx).draw(); });

    var svg = div.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.maxWidth = Math.round(W * 1.2) + 'px';
    div.__tmInfo = info;
  }

  /* -------------------------------------------------------------- UI */

  var NIVELES = [
    { nivel: 1, t: 'Fácil', d: 'Un tiempo con grupo irregular' },
    { nivel: 2, t: 'Medio', d: 'Dos tiempos con grupo, pueden llevar silencio' },
    { nivel: 3, t: 'Difícil', d: 'Todo el compás hecho de grupos irregulares' }
  ];
  var NUMERADORES = [2, 3, 4, 6, 9, 12];
  var DENOMINADORES = [1, 2, 4, 8, 16, 32];
  var PREGUNTAS = 8;

  var CSS = [
    '.tm-qc{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-qc-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-qc-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-qc-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-qc-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-qc-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;font-family:inherit;}',
    '.tm-qc-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-qc-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-qc-modo span{font-size:.82rem;color:#8b6914;}',
    '.tm-qc-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-qc-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-qc-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-qc-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:4px 0 8px;}',
    '.tm-qc-dibujo{display:flex;justify-content:center;margin:0 auto 10px;}',
    '.tm-qc-dibujo > div{width:100%;display:flex;justify-content:center;}',
    '.tm-qc-q{font-size:.78rem;font-weight:700;color:#8b6914;margin:12px 0 8px;text-transform:uppercase;letter-spacing:.5px;text-align:center;}',
    '.tm-qc-fichas{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}',
    '.tm-qc-cifra{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:8px 4px;cursor:pointer;font-family:inherit;width:50px;text-align:center;font-weight:700;font-size:1.05rem;min-height:44px;color:#514232;}',
    '.tm-qc-cifra:hover:not([disabled]):not(.tm-sel){border-color:#8b6914;background:#fffbf2;}',
    '.tm-qc-cifra.tm-sel{border-color:#8b6914;background:#8b6914;color:#fff;}',
    '.tm-qc-cifra.tm-ok{border-color:#27ae60!important;background:#27ae60!important;color:#fff!important;}',
    '.tm-qc-cifra.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-qc-cifra.tm-buena{border-color:#27ae60!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-qc-cifra[disabled]{cursor:default;opacity:.85;}',
    '.tm-qc-previa{text-align:center;margin:14px 0;min-height:2.2em;}',
    '.tm-qc-previa .tm-qc-num{display:inline-block;font-family:Georgia,serif;font-weight:700;font-size:1.6rem;line-height:1.05;vertical-align:middle;}',
    '.tm-qc-previa .tm-qc-num span{display:block;}',
    '.tm-qc-previa .tm-qc-vacia{color:#a89b7e;font-size:.9rem;}',
    '.tm-qc-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-qc-fb[hidden]{display:none;}',
    '.tm-qc-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-qc-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-qc-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#d8d0b8;color:#777;cursor:not-allowed;}',
    '.tm-qc-btn.tm-listo{background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-qc-res{text-align:center;padding:10px 0;}',
    '.tm-qc-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-qc-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-qc-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-qc-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-qc-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}'
  ].join('');

  function css() {
    if (document.getElementById('tm-qc-css')) return;
    var st = document.createElement('style');
    st.id = 'tm-qc-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  window.tmQueCompasEs = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !D() || !GV()) return;
    css();
    cont.className = 'tm-qc';
    var cola = [], pos = 0, aciertos = 0, nivelActual = 1;
    window.tmQueCompasEsDebug = function () { return cola[pos] || null; };

    function inicio() {
      cont.innerHTML = '<div class="tm-qc-card"><div class="tm-qc-tit">¿Qué compás es?</div>'
        + '<div class="tm-qc-sub">Se ve un compás lleno de grupos de valoración especial, sin cifra. Simplifica cada grupo a la figura que equivale y adivina el compás.</div>'
        + '<div class="tm-qc-modos">' + NIVELES.map(function (m) {
          return '<button type="button" class="tm-qc-modo" data-n="' + m.nivel + '"><strong>' + m.t + '</strong><span>' + m.d + '</span></button>';
        }).join('') + '</div></div>';
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-qc-modo'), function (b) {
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
      cont.innerHTML = '<div class="tm-qc-card">'
        + '<div class="tm-qc-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-qc-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-qc-preg">¿Qué compás es?</div>'
        + '<div class="tm-qc-dibujo"><div></div></div>'
        + '<div class="tm-qc-q">Numerador</div>'
        + '<div class="tm-qc-fichas" data-g="num">' + NUMERADORES.map(function (n) {
          return '<button type="button" class="tm-qc-cifra" data-v="' + n + '">' + n + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-qc-q">Denominador</div>'
        + '<div class="tm-qc-fichas" data-g="den">' + DENOMINADORES.map(function (n) {
          return '<button type="button" class="tm-qc-cifra" data-v="' + n + '">' + n + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-qc-previa"><span class="tm-qc-vacia">Elige numerador y denominador…</span></div>'
        + '<div class="tm-qc-fb" hidden></div>'
        + '<button type="button" class="tm-qc-btn">Comprobar</button></div>';

      dibujarCompas(cont.querySelector('.tm-qc-dibujo > div'), it, { w: 460, sinCifra: true });

      var num = null, den = null, corregida = false;
      var btn = cont.querySelector('.tm-qc-btn'), previa = cont.querySelector('.tm-qc-previa');
      function pintarPrevia() {
        previa.innerHTML = (num && den)
          ? '<span class="tm-qc-num"><span>' + num + '</span><span>' + den + '</span></span>'
          : '<span class="tm-qc-vacia">Elige numerador y denominador…</span>';
        btn.classList.toggle('tm-listo', !!(num && den));
      }
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-qc-fichas'), function (fila) {
        var g = fila.getAttribute('data-g');
        fila.addEventListener('click', function (ev) {
          var c = ev.target.closest('.tm-qc-cifra');
          if (!c || corregida) return;
          Array.prototype.forEach.call(fila.querySelectorAll('.tm-qc-cifra'), function (x) { x.classList.remove('tm-sel'); });
          c.classList.add('tm-sel');
          if (g === 'num') num = c.getAttribute('data-v'); else den = c.getAttribute('data-v');
          pintarPrevia();
        });
      });

      btn.addEventListener('click', function () {
        if (!corregida) {
          if (!num || !den) return;
          corregida = true;
          var elegida = num + '/' + den;
          var validas = cifrasValidas(it.compas);
          var ok = validas.indexOf(elegida) >= 0;
          if (ok) aciertos++;
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-qc-cifra'), function (x) { x.disabled = true; });
          dibujarCompas(cont.querySelector('.tm-qc-dibujo > div'), it, { w: 460 }); // se revela la cifra real
          var fb = cont.querySelector('.tm-qc-fb');
          fb.hidden = false;
          fb.className = 'tm-qc-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          var extra = ok && validas.length > 1
            ? ' También sería correcto ' + validas.filter(function (v) { return v !== elegida; }).join(' o ') + '.'
            : '';
          fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No es correcto, era ' + validas.join(' o ') + '.') + '</strong>' + extra + ' ' + explicar(it);
          btn.textContent = pos + 1 < cola.length ? 'Siguiente' : 'Ver resultado';
          btn.classList.add('tm-listo');
        } else {
          pos++;
          if (pos < cola.length) pregunta(); else resultado();
        }
      });
      pintarPrevia();
    }

    function resultado() {
      var nota = aciertos / cola.length;
      var msg = nota === 1 ? '¡Perfecto! Dominas la simplificación.' : nota >= 0.8 ? 'Muy bien: casi todo correcto.' : nota >= 0.5 ? 'Vas bien. Repasa las explicaciones y vuelve a intentarlo.' : 'Conviene repasar a qué equivale cada grupo antes de volver a intentarlo.';
      cont.innerHTML = '<div class="tm-qc-card tm-qc-res"><div class="tm-qc-nota">' + aciertos + '</div><div class="tm-qc-de">aciertos de ' + cola.length + '</div>'
        + '<div class="tm-qc-msg">' + msg + '</div>'
        + '<button type="button" class="tm-qc-otra" data-a="otra">Otra ronda</button>'
        + '<button type="button" class="tm-qc-otra tm-2" data-a="modo">Cambiar de nivel</button></div>';
      cont.querySelector('[data-a="otra"]').addEventListener('click', function () { empezar(nivelActual); });
      cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
    }

    inicio();
  };

  window.tmQueCompasEsTest = { generarLote: generarLote, explicar: explicar, dibujarCompas: dibujarCompas, candidatosPara: candidatosPara, cifrasValidas: cifrasValidas };
})();
