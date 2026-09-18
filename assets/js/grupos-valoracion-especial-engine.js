/* Grupos de valoración especial — /ejercicios/grupos-de-valoracion-especial/

   Uso: <div id="x"></div><script>tmGruposVE('x');</script>

   Decisiones de Eduardo (18-09-2026):
   - Se ve un grupo de valoración especial escrito dentro de un compás (siempre
     con su cifra visible) y hay que decir a qué figura sencilla equivale.
   - Tres niveles: fácil (ritmo uniforme dentro del grupo), medio (uniforme +
     silencios), difícil (ritmo mixto dentro del grupo —p. ej. una negra y una
     corchea dentro de un tresillo, que juntas siguen sumando una negra— +
     silencios).
   - Grupos: tresillo, dosillo, cuatrillo y seisillo. Quintillo y septillo se
     dejan fuera a propósito: no tienen equivalencia fija (depende del
     contexto), así que no encajan en un ejercicio de respuesta única.

   Regla verificada contra la propia página del sitio
   (/diccionario-musical/grupos-de-valoracion-especial/), no inventada:
     Tresillo  (3 figuras) equivale a 2  — compás simple.
     Dosillo   (2 figuras) equivale a 3  — compás compuesto.
     Cuatrillo (4 figuras) equivale a 6  — compás compuesto.
     Seisillo  (6 figuras) equivale a 4  — compás simple.
   Cada grupo se genera con la figura de manual con la que se enseña siempre
   (tresillo y dosillo de corcheas, cuatrillo y seisillo de semicorcheas), lo
   que hace que el grupo entero dure justo UN tiempo de su compás: tresillo y
   seisillo equivalen a una negra, dosillo y cuatrillo a una negra con
   puntillo. Eso permite tratar el grupo como una figura más de un tiempo
   dentro de un compás generado tiempo a tiempo, igual que el resto del sitio.

   El motor de compases (completar-compas-engine.js) trabaja siempre en
   semifusas ENTERAS; el interior de un grupo de valoración especial no cae en
   esa rejilla (un tresillo son tercios de tiempo). Por eso el reparto interno
   del grupo NO se lleva en semifusas: se lleva en «partes» (1 a N, sumando
   exactamente N) y se dibuja con el soporte de tresillos/grupos (V.Tuplet) que
   trae VexFlow de serie, que hace el reparto proporcional él solo. Hacia
   fuera, el grupo entero sigue ocupando una posición entera (un tiempo) dentro
   del compás, así que el resto del compás se genera igual que siempre.

   Reutiliza /assets/js/completar-compas-engine.js (tabla de figuras y de
   compases); tiene que cargarse antes en la página.
   Se audita con tools/verificar-grupos-valoracion-especial.js. */
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

  /* Cada grupo puede escribirse de más de una forma («variantes»): la de
     manual, que llena un tiempo entero, y —solo el tresillo, de momento— una
     más pequeña que solo ocupa una corchea (un tresillo de semicorcheas
     sustituyendo las dos semicorcheas normales de esa corchea), acompañada de
     las corcheas sueltas que hagan falta para completar el tiempo. Esta forma
     pequeña cabe en CUALQUIER compás, simple o compuesto —un tiempo simple
     tiene una corchea de sobra, uno compuesto tiene dos— (Eduardo, 18-09-2026:
     «también puedes llegar a escribir en un tiempo de compás simple algo tipo
     corchea y tresillo de semicorcheas», «o en un 6/8 2 corcheas y un tresillo
     de semicorcheas»). El ratio del corchete (num_notes:notes_occupied) es
     siempre el del grupo (n:equivale); lo que cambia entre variantes es solo
     la figura base y cuánto ocupa dentro del compás (uGrupo, en semifusas). */
  var GRUPOS_VE = {
    tresillo: {
      n: 3, equivale: 2,
      variantes: [
        { base: 'c', equivaleFig: 'n', uGrupo: 16, compases: ['2/4', '3/4', '4/4'] },
        { base: 'sc', equivaleFig: 'c', uGrupo: 8, compases: ['2/4', '3/4', '4/4', '6/8', '9/8', '12/8'] }
      ]
    },
    dosillo: { n: 2, equivale: 3, variantes: [{ base: 'c', equivaleFig: 'nP', uGrupo: 24, compases: ['6/8', '9/8', '12/8'] }] },
    cuatrillo: { n: 4, equivale: 6, variantes: [{ base: 'sc', equivaleFig: 'nP', uGrupo: 24, compases: ['6/8', '9/8', '12/8'] }] },
    seisillo: { n: 6, equivale: 4, variantes: [{ base: 'sc', equivaleFig: 'n', uGrupo: 16, compases: ['2/4', '3/4', '4/4'] }] }
  };
  var ORDEN = ['tresillo', 'dosillo', 'cuatrillo', 'seisillo'];
  var NOMBRE_ART = { tresillo: 'un tresillo', dosillo: 'un dosillo', cuatrillo: 'un cuatrillo', seisillo: 'un seisillo' };

  /* Escala de duraciones VexFlow (sin puntillo) según la unidad base del grupo
     y cuántas «partes» (1, 2 o 4) ocupa una figura dentro de él. */
  var ESCALA = { c: ['8', 'q', 'h'], sc: ['16', '8', 'q'] };
  function duracionDe(base, partes) { return ESCALA[base][Math.round(Math.log2(partes))]; }

  /* Reparte las N partes del grupo en trozos de 1, 2 o 4 que sumen N exacto.
     mezclar=false: siempre [1,1,...,1] (ritmo uniforme, nivel fácil/medio).
     mezclar=true: junta partes contiguas al azar (nivel difícil), reintentando
     unas pocas veces si sale todo en unos (para que el «mezclar» se note).
     Nunca deja el grupo en una sola nota (el primer trozo no puede ser el
     grupo entero: un tuplet de una sola cabeza no enseña nada) ni deja
     menos de dos figuras en total. */
  function repartir(n, mezclar, rnd) {
    if (!mezclar) { var u = []; for (var i = 0; i < n; i++) u.push(1); return u; }
    for (var intento = 0; intento < 8; intento++) {
      var restante = n, partes = [];
      while (restante > 0) {
        var opciones = [4, 2, 1].filter(function (x) { return x <= restante && !(partes.length === 0 && x === n); });
        var x = opciones[Math.floor(rnd() * opciones.length)];
        partes.push(x); restante -= x;
      }
      if (partes.length >= 2 && partes.length < n) return partes; // al menos dos figuras y algo combinado
    }
    var todo1 = []; for (var j = 0; j < n; j++) todo1.push(1);
    return todo1;
  }

  /* o = { nivel: 1|2|3 } */
  function generarUno(o, rnd) {
    var A = azar(rnd);
    var id = A.uno(ORDEN);
    var g = GRUPOS_VE[id];
    var variante = A.uno(g.variantes);
    var mezclar = o.nivel === 3;
    var conSilencio = o.nivel >= 2 && rnd() < 0.35;
    var partes = repartir(g.n, mezclar, rnd);
    var silIdx = conSilencio ? Math.floor(rnd() * partes.length) : -1;
    var compasGrupo = A.uno(variante.compases);
    return { grupo: id, variante: variante, partes: partes, silIdx: silIdx, compasGrupo: compasGrupo, nivel: o.nivel };
  }

  /* Genera el compás completo alrededor del grupo: un tiempo aleatorio lo
     lleva. Si la variante llena el tiempo entero, ese tiempo es solo el
     grupo; si no (el tresillo de semicorcheas, que solo ocupa una corchea),
     se completa el resto del tiempo con corcheas sueltas, en orden al azar
     (antes, después o repartidas a los dos lados del grupo). El resto de
     tiempos se rellena con figuras normales de ese compás (una figura de un
     tiempo entero, o corcheas a partes iguales). */
  function generarCompas(it, rnd) {
    var A = azar(rnd);
    var FIG = D().FIG, d = D().COMPASES[it.compasGrupo];
    var tiempoGrupo = Math.floor(rnd() * d.tiempos);
    var elems = [], t = 0;
    var figTiempo = d.tiempo === 16 ? 'n' : 'nP';
    var figCorta = 'c';
    var uGrupo = it.variante.uGrupo;
    for (var i = 0; i < d.tiempos; i++) {
      if (i === tiempoGrupo) {
        var trozos = [{ grupo: true, t0: 0, u: uGrupo }];
        var extra = (d.tiempo - uGrupo) / FIG[figCorta].u;
        for (var e = 0; e < extra; e++) trozos.push({ f: figCorta, s: false, t0: 0, u: FIG[figCorta].u });
        trozos = A.barajar(trozos);
        trozos.forEach(function (h) { h.t0 = t; elems.push(h); t += h.u; });
        continue;
      }
      if (rnd() < 0.5) {
        elems.push({ f: figTiempo, s: false, t0: t, u: d.tiempo }); t += d.tiempo;
      } else {
        var cuantas = d.tiempo / FIG[figCorta].u;
        for (var k = 0; k < cuantas; k++) { elems.push({ f: figCorta, s: false, t0: t, u: FIG[figCorta].u }); t += FIG[figCorta].u; }
      }
    }
    it.tiempoGrupo = tiempoGrupo;
    it.elems = elems;
    return it;
  }

  /* o = { nivel: 1|2|3, n } */
  function generarLote(o, semilla) {
    var rnd = mulberry32(semilla || Math.floor(Math.random() * 1e9));
    var out = [];
    for (var i = 0; i < o.n; i++) {
      var it = generarUno(o, rnd);
      generarCompas(it, rnd);
      out.push(it);
    }
    return out;
  }

  function explicar(it) {
    var g = GRUPOS_VE[it.grupo];
    var nombreBase = D().FIG[it.variante.base].nombre;
    var nombreEquiv = D().FIG[it.variante.equivaleFig].nombre;
    return 'Es ' + NOMBRE_ART[it.grupo] + ' de ' + nombreBase + 's: ' + g.n + ' en el tiempo de ' + g.equivale
      + ', así que el grupo entero equivale a una ' + nombreEquiv + '.';
  }

  /* --------------------------------------------------------- Dibujo */

  /* Dibuja el compás completo con el grupo de valoración especial insertado.
     opts = { w }. Escribe div.__tmInfo para el verificador. */
  function dibujarConGrupo(div, it, opts) {
    var V = VF(), FIG = D().FIG;
    opts = opts || {};
    div.innerHTML = '';
    var W = opts.w || 460, H = 100;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(W, H);
    var ctx = r.getContext();
    var stave = new V.Stave(6, 6, W - 12, { space_above_staff_ln: 3, spaceAboveStaffLn: 3 });
    stave.addTimeSignature(it.compasGrupo);
    stave.setContext(ctx).draw();

    var d = D().COMPASES[it.compasGrupo];
    var notas = [], info = [], tuplet = null;
    var barrasFuera = [], grupoFuera = [];
    function cerrarFuera() { if (grupoFuera.length > 1) barrasFuera.push(new V.Beam(grupoFuera.map(function (x) { return x.n; }), false)); grupoFuera = []; }

    it.elems.forEach(function (e) {
      if (e.grupo) {
        var g = GRUPOS_VE[it.grupo];
        var notasGrupo = [], barrasGrupo = [], corriendo = [];
        function cerrarGrupo() { if (corriendo.length > 1) barrasGrupo.push(new V.Beam(corriendo, false)); corriendo = []; }
        it.partes.forEach(function (p, k) {
          var esSil = k === it.silIdx;
          var dur = duracionDe(it.variante.base, p) + (esSil ? 'r' : '');
          var nota = new V.StaveNote({ keys: ['b/4'], duration: dur, clef: 'treble' });
          if (!esSil) nota.setStemDirection(-1);
          notasGrupo.push(nota);
          notas.push(nota);
          info.push({ grupo: it.grupo, partes: p, silencio: esSil });
          if (p === 1 && !esSil) corriendo.push(nota); else cerrarGrupo();
        });
        cerrarGrupo();
        tuplet = new V.Tuplet(notasGrupo, {
          num_notes: g.n, notes_occupied: g.equivale, numNotes: g.n, notesOccupied: g.equivale,
          bracketed: true, ratioed: false
        });
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
    if (tuplet) tuplet.setContext(ctx).draw();

    var svg = div.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.maxWidth = Math.round(W * 1.2) + 'px';
    div.__tmInfo = info;
  }

  /* -------------------------------------------------------------- UI */

  var NIVELES = [
    { nivel: 1, t: 'Fácil', d: 'Ritmo uniforme dentro del grupo' },
    { nivel: 2, t: 'Medio', d: 'Ritmo uniforme, puede haber un silencio' },
    { nivel: 3, t: 'Difícil', d: 'Ritmo mixto dentro del grupo, con silencios' }
  ];
  var CARTAS_RESPUESTA = ['sc', 'c', 'cP', 'n', 'nP', 'b', 'bP'];
  var PREGUNTAS = 8;

  var CSS = [
    '.tm-gv{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-gv-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-gv-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-gv-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-gv-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-gv-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;font-family:inherit;}',
    '.tm-gv-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-gv-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-gv-modo span{font-size:.82rem;color:#8b6914;}',
    '.tm-gv-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-gv-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-gv-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-gv-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:4px 0 8px;}',
    '.tm-gv-dibujo{display:flex;justify-content:center;margin:0 auto 10px;}',
    '.tm-gv-dibujo > div{width:100%;display:flex;justify-content:center;}',
    '.tm-gv-paleta{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}',
    '.tm-gv-carta{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:4px 6px 2px;cursor:pointer;width:72px;text-align:center;font-family:inherit;}',
    '.tm-gv-carta:hover:not([disabled]){border-color:#8b6914;background:#fffbf2;}',
    '.tm-gv-carta.tm-sel{border-color:#8b6914;background:#fff8ee;}',
    '.tm-gv-carta.tm-ok{border-color:#27ae60!important;background:#e8f5e9!important;}',
    '.tm-gv-carta.tm-ko{border-color:#c0392b!important;background:#ffebee!important;}',
    '.tm-gv-carta.tm-buena{border-color:#27ae60!important;background:#e8f5e9!important;}',
    '.tm-gv-carta[disabled]{cursor:default;opacity:.85;}',
    '.tm-gv-carta small{display:block;font-size:.62rem;color:#666;line-height:1.15;margin-top:2px;min-height:1.4em;}',
    '@media(max-width:480px){.tm-gv-carta{width:60px;}}',
    '.tm-gv-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-gv-fb[hidden]{display:none;}',
    '.tm-gv-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-gv-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-gv-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#d8d0b8;color:#777;cursor:not-allowed;}',
    '.tm-gv-btn.tm-listo{background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-gv-res{text-align:center;padding:10px 0;}',
    '.tm-gv-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-gv-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-gv-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-gv-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-gv-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}'
  ].join('');

  function css() {
    if (document.getElementById('tm-gv-css')) return;
    var st = document.createElement('style');
    st.id = 'tm-gv-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  window.tmGruposVE = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !D()) return;
    css();
    cont.className = 'tm-gv';
    var cola = [], pos = 0, aciertos = 0;
    window.tmGruposVEDebug = function () { return cola[pos] || null; };

    function inicio() {
      cont.innerHTML = '<div class="tm-gv-card"><div class="tm-gv-tit">¿A qué figura equivale?</div>'
        + '<div class="tm-gv-sub">Se ve un grupo de valoración especial (tresillo, dosillo, cuatrillo o seisillo) escrito dentro de un compás. Elige la figura sencilla a la que equivale.</div>'
        + '<div class="tm-gv-modos">' + NIVELES.map(function (m) {
          return '<button type="button" class="tm-gv-modo" data-n="' + m.nivel + '"><strong>' + m.t + '</strong><span>' + m.d + '</span></button>';
        }).join('') + '</div></div>';
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-gv-modo'), function (b) {
        b.addEventListener('click', function () { empezar(Number(b.getAttribute('data-n'))); });
      });
    }

    var nivelActual = 1;
    function empezar(nivel) {
      nivelActual = nivel;
      cola = generarLote({ nivel: nivel, n: PREGUNTAS });
      pos = 0; aciertos = 0;
      pregunta();
    }

    function pregunta() {
      var it = cola[pos];
      cont.innerHTML = '<div class="tm-gv-card">'
        + '<div class="tm-gv-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-gv-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-gv-preg">¿A qué figura equivale el grupo?</div>'
        + '<div class="tm-gv-dibujo"><div></div></div>'
        + '<div class="tm-gv-paleta">' + CARTAS_RESPUESTA.map(function (f) {
          return '<button type="button" class="tm-gv-carta" data-f="' + f + '"><span class="tm-gv-mini"></span><small>' + D().nombre({ f: f, s: false }) + '</small></button>';
        }).join('') + '</div>'
        + '<div class="tm-gv-fb" hidden></div>'
        + '<button type="button" class="tm-gv-btn">Comprobar</button></div>';

      dibujarConGrupo(cont.querySelector('.tm-gv-dibujo > div'), it, { w: 460 });
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-gv-mini'), function (m, i) { D().carta(m, CARTAS_RESPUESTA[i], false); });

      var elegida = null, corregida = false;
      var btn = cont.querySelector('.tm-gv-btn');
      cont.querySelector('.tm-gv-paleta').addEventListener('click', function (ev) {
        var c = ev.target.closest('.tm-gv-carta');
        if (!c || corregida) return;
        Array.prototype.forEach.call(cont.querySelectorAll('.tm-gv-carta'), function (x) { x.classList.remove('tm-sel'); });
        c.classList.add('tm-sel');
        elegida = c.getAttribute('data-f');
        btn.classList.add('tm-listo');
      });

      btn.addEventListener('click', function () {
        if (!corregida) {
          if (!elegida) return;
          corregida = true;
          var equivaleFig = it.variante.equivaleFig;
          var ok = elegida === equivaleFig;
          if (ok) aciertos++;
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-gv-carta'), function (x) {
            x.disabled = true;
            if (x.getAttribute('data-f') === equivaleFig) x.classList.add(ok ? 'tm-ok' : 'tm-buena');
            else if (x.getAttribute('data-f') === elegida && !ok) x.classList.add('tm-ko');
          });
          var fb = cont.querySelector('.tm-gv-fb');
          fb.hidden = false;
          fb.className = 'tm-gv-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No es correcto.') + '</strong> ' + explicar(it);
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
      var msg = nota === 1 ? '¡Perfecto! Lo dominas.' : nota >= 0.8 ? 'Muy bien: casi todo correcto.' : nota >= 0.5 ? 'Vas bien. Repasa las explicaciones y vuelve a intentarlo.' : 'Conviene repasar cuánto equivale cada grupo antes de volver a intentarlo.';
      cont.innerHTML = '<div class="tm-gv-card tm-gv-res"><div class="tm-gv-nota">' + aciertos + '</div><div class="tm-gv-de">aciertos de ' + cola.length + '</div>'
        + '<div class="tm-gv-msg">' + msg + '</div>'
        + '<button type="button" class="tm-gv-otra" data-a="otra">Otra ronda</button>'
        + '<button type="button" class="tm-gv-otra tm-2" data-a="modo">Cambiar de nivel</button></div>';
      cont.querySelector('[data-a="otra"]').addEventListener('click', function () { empezar(nivelActual); });
      cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
    }

    inicio();
  };

  window.tmGruposVETest = { GRUPOS_VE: GRUPOS_VE, generarLote: generarLote, explicar: explicar, dibujarConGrupo: dibujarConGrupo };
})();
