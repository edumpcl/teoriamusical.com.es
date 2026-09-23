/* ¿Qué cadencia es? — /ejercicios/cadencias/

   Uso: <div id="x"></div><script>tmCadencias('x');</script>

   Decisión de Eduardo (22-09-2026): reconocer el tipo de cadencia leyendo una
   partitura a piano (clave de sol y clave de fa), como se estudia en solfeo:
   dos acordes en redondas (el penúltimo y el último), a 4 voces (soprano y
   contralto en clave de sol, tenor y bajo en clave de fa).

   Niveles (decisión de Eduardo): 1 = conclusivas (auténtica perfecta,
   auténtica imperfecta, plagal); 2 = suspensivas (semicadencia sobre la
   dominante, semicadencia sobre la subdominante, y la cadencia rota — que no
   es literalmente «suspensiva» en la teoría del sitio, pero Eduardo la agrupa
   aquí porque tampoco concluye); 3 = las seis mezcladas.

   Voces: DOS plantillas de conducción de voces por tipo (VOCES, más abajo;
   12 en total), para que la ficha imprimible no repita siempre la misma
   disposición (ver ficha-cadencias-engine.js). Están comprobadas a mano una
   por una (sin quintas ni octavas paralelas, sensible resolviendo a la
   tónica, séptima resolviendo por grado descendente, bajo moviéndose por el
   intervalo característico de cada cadencia) en Do mayor, y se transportan a
   las demás tonalidades desplazando el índice diatónico de
   cada nota tantos pasos como indique tonica (mismo mecanismo, y misma tabla
   TONALIDADES, que tipo-de-comienzo-engine.js: sumar tonica a cada nota
   conserva exactamente la relación de grados de la escala, y la armadura del
   pentagrama pone las alteraciones). Es una tabla FIJA (como GRUPOS_VE o
   CIFRAS_DOBLADO en otros motores), no un generador de conducción de voces
   arbitrario: más seguro para no producir un enlace armónico incorrecto.

   Se audita con tools/verificar-cadencias.js. Este archivo en sí solo
   necesita tipo-de-comienzo-engine.js (reutiliza su TONALIDADES, la misma
   tabla que ya usan comienzo y final de frase; ya no lee nada de
   completar-compas-engine.js, ni siquiera la cadena 'w' de «redonda», que
   ahora es una constante propia). En la página, completar-compas-engine.js
   sigue siendo necesario igualmente, porque tipo-de-comienzo-engine.js lo usa
   internamente para su propia tabla de compases. */
(function () {
  'use strict';

  var REDONDA = 'w';
  function CT() { return window.tmComienzoTest; }
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

  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  function nota(idx) { return LETRAS[((idx % 7) + 7) % 7] + '/' + Math.floor(idx / 7); }

  /* Índices diatónicos (octava*7 + letra) de cada voz, en Do mayor, para los
     dos acordes de cada cadencia. DOS disposiciones distintas por tipo (para
     no repetir siempre la misma en la ficha imprimible: ver
     ficha-cadencias-engine.js), comprobadas a mano una por una: sin 5ªs/8ªs
     paralelas, sensible → tónica, 7ª → 3ª (descendente), bajo con el salto
     propio de cada cadencia. */
  var VOCES = {
    perfecta: [ // V7 (sol-si-re-fa) -> I (do-mi-sol-do), soprano en la tónica
      { S: [34, 35], A: [29, 28], T: [24, 23], B: [18, 21] },
      { S: [34, 35], A: [32, 32], T: [22, 23], B: [18, 21] } // V (triada) -> I completo
    ],
    imperfecta: [ // V7 -> I, soprano en la 3ª (no en la tónica)
      { S: [31, 30], A: [29, 28], T: [27, 28], B: [18, 21] },
      { S: [32, 30], A: [27, 28], T: [22, 21], B: [18, 21] } // V (triada), soprano baja a la 3ª
    ],
    plagal: [ // IV (fa-la-do) -> I (do-mi-sol)
      { S: [33, 32], A: [28, 28], T: [24, 23], B: [17, 21] },
      { S: [31, 30], A: [28, 28], T: [26, 25], B: [17, 21] } // I completo (doblando la tónica)
    ],
    rota: [ // V7 -> VI (la-do-mi), el bajo sube un tono en vez de saltar a la tónica
      { S: [34, 35], A: [29, 28], T: [24, 23], B: [18, 19] },
      { S: [34, 35], A: [31, 30], T: [22, 21], B: [18, 19] }
    ],
    semicadenciaV: [ // I (do-mi-sol) -> V (sol-si-re)
      { S: [32, 32], A: [30, 29], T: [28, 27], B: [21, 18] },
      { S: [35, 34], A: [32, 32], T: [30, 29], B: [21, 18] } // I completo -> V completo
    ],
    semicadenciaIV: [ // I (do-mi-sol) -> IV (fa-la-do)
      { S: [32, 33], A: [30, 31], T: [28, 28], B: [21, 17] },
      { S: [37, 38], A: [32, 33], T: [28, 28], B: [21, 17] } // I completo -> IV completo
    ]
  };

  var CADENCIAS = {
    perfecta: { nombre: 'Auténtica perfecta', acordes: ['V', 'I'] },
    imperfecta: { nombre: 'Auténtica imperfecta', acordes: ['V', 'I'] },
    plagal: { nombre: 'Plagal', acordes: ['IV', 'I'] },
    rota: { nombre: 'Rota (de engaño)', acordes: ['V', 'VI'] },
    semicadenciaV: { nombre: 'Semicadencia sobre la dominante', acordes: ['I', 'V'] },
    semicadenciaIV: { nombre: 'Semicadencia sobre la subdominante', acordes: ['I', 'IV'] }
  };
  var ORDEN = ['perfecta', 'imperfecta', 'plagal', 'semicadenciaV', 'semicadenciaIV', 'rota'];
  var TIPOS_NIVEL = {
    1: ['perfecta', 'imperfecta', 'plagal'],
    2: ['semicadenciaV', 'semicadenciaIV', 'rota'],
    3: ORDEN.slice()
  };

  function generarUno(o, rnd) {
    var A = azar(rnd), TN = CT().TONALIDADES;
    var nivel = o.nivel || 1;
    var tipo = o.tipo || A.uno(TIPOS_NIVEL[nivel]);
    var tonal = A.uno(nivel === 1 ? TN.slice(0, 4) : TN);
    // Transportar tonica pasos, o tonica-7 (misma nota, una octava más grave):
    // lo que quede más cerca de 0, para no empujar al tenor o al bajo a un
    // registro incómodo (con La o Sib, sumar tonica sin más subía el tenor
    // muy por encima de la clave de fa).
    var variante = A.uno([0, 1]);
    var v = VOCES[tipo][variante], t = tonal.tonica > 3 ? tonal.tonica - 7 : tonal.tonica;
    var acordes = [0, 1].map(function (k) {
      return { S: nota(v.S[k] + t), A: nota(v.A[k] + t), T: nota(v.T[k] + t), B: nota(v.B[k] + t) };
    });
    return { nivel: nivel, tipo: tipo, variante: variante, tonalidad: tonal.id, acordes: acordes };
  }

  function generarLote(o, semilla) {
    var rnd = mulberry32(semilla === undefined ? Math.floor(Math.random() * 4294967296) : semilla);
    var A = azar(rnd), n = o.n || 6, tipos = TIPOS_NIVEL[o.nivel || 1];
    var base = [];
    while (base.length < n) base = base.concat(tipos);
    var salida;
    for (var intento = 0; intento < 30; intento++) {
      salida = A.barajar(base.slice(0, n));
      var seguidos = false;
      for (var i = 2; i < n; i++) if (salida[i] === salida[i - 1] && salida[i] === salida[i - 2]) seguidos = true;
      if (!seguidos) break;
    }
    return salida.map(function (tipo) { return generarUno({ nivel: o.nivel, tipo: tipo }, rnd); });
  }

  /* --------------------------------------------------------- Explicación */

  var EXPLICA = {
    perfecta: 'Cadencia auténtica perfecta: la dominante (V), con la sensible, resuelve en la tónica (I); los dos acordes están en estado fundamental y la voz más aguda del acorde final es la tónica. Es la conclusión más rotunda.',
    imperfecta: 'Cadencia auténtica imperfecta: también es V–I, pero la voz más aguda del acorde final no es la tónica (aquí es la 3.ª). Concluye, pero con menos rotundidad que la perfecta.',
    plagal: 'Cadencia plagal: la subdominante (IV) enlaza con la tónica (I). No lleva la sensible ni el tritono de la dominante, por eso suena más suave, la del «amén».',
    rota: 'Cadencia rota (de engaño): la dominante (V), que el oído espera que resuelva en la tónica, lo hace en el VI grado. El bajo sube un tono en vez de saltar a la tónica: la frase no concluye.',
    semicadenciaV: 'Semicadencia sobre la dominante: la frase termina en el acorde de V en vez de resolver en la tónica. Queda «en el aire», pidiendo continuación.',
    semicadenciaIV: 'Semicadencia sobre la subdominante: la frase termina en el acorde de IV. También es suspensiva, pero más blanda que la semicadencia sobre la dominante.'
  };
  function explicar(it) { return EXPLICA[it.tipo]; }

  function pista(correcto, elegido) {
    if (correcto === elegido) return '';
    var esV = { perfecta: 1, imperfecta: 1 }, esPlagal = { plagal: 1 };
    if ((esV[correcto] && esPlagal[elegido]) || (esPlagal[correcto] && esV[elegido])) {
      return ' Mira el primer acorde: en la auténtica es la dominante (V, con la sensible, la nota que sube medio tono hasta la tónica); en la plagal es la subdominante (IV, sin sensible).';
    }
    if (esV[correcto] && esV[elegido]) {
      return ' La diferencia entre perfecta e imperfecta está en la voz más aguda del ÚLTIMO acorde: si es la tónica, perfecta; si no, imperfecta.';
    }
    var esSemi = { semicadenciaV: 1, semicadenciaIV: 1 };
    if (correcto === 'rota' || elegido === 'rota') {
      return ' En la rota el último acorde es el VI grado; en las semicadencias el último acorde es V o IV, y en las auténticas/plagal es la propia tónica (I).';
    }
    if (esSemi[correcto] && esSemi[elegido]) {
      return ' Mira el último acorde: si es V (con la sensible), semicadencia sobre la dominante; si es IV, sobre la subdominante.';
    }
    return ' Fíjate en el último acorde (¿es la tónica, la dominante, la subdominante o el VI grado?) y en si la dominante lleva o no la sensible.';
  }

  /* -------------------------------------------------------------- Dibujo */

  function anchoAcorde() { return 130; }

  /* Dibuja los dos acordes en un gran pentagrama (piano). Escribe
     div.__tmInfo = { acordes: [{S,A,T,B}, {S,A,T,B}] } para el verificador. */
  function dibujar(div, it) {
    var V = VF();
    div.innerHTML = '';
    var w1 = anchoAcorde(), w2 = anchoAcorde(), margen = 40;
    var W = margen + w1 + w2, H = 270;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(W, H);
    var ctx = r.getContext();
    // Hueco generoso entre los dos pentagramas: las voces internas (alto y
    // tenor) usan a menudo líneas adicionales por encima o por debajo de su
    // clave, y con poco margen esas líneas se solapan con el otro pentagrama.
    var opTop = { space_above_staff_ln: 3, spaceAboveStaffLn: 3, space_below_staff_ln: 6, spaceBelowStaffLn: 6 };
    var opBot = { space_above_staff_ln: 6, spaceAboveStaffLn: 6 };
    var xs = [margen, margen + w1];
    var arriba = [], abajo = [];
    xs.forEach(function (x, i) {
      var top = new V.Stave(x, 8, w1, opTop);
      var bot = new V.Stave(x, 132, w1, opBot);
      if (i === 0) { top.addClef('treble').addKeySignature(it.tonalidad); bot.addClef('bass').addKeySignature(it.tonalidad); }
      if (i === xs.length - 1) {
        var FINAL = (V.BarlineType || (V.Barline && V.Barline.type)).END;
        top.setEndBarType(FINAL); bot.setEndBarType(FINAL);
      }
      top.setContext(ctx).draw();
      bot.setContext(ctx).draw();
      arriba.push(top); abajo.push(bot);
    });
    var llave = new V.StaveConnector(arriba[0], abajo[0]).setType(V.StaveConnector.type.BRACE);
    llave.setContext(ctx).draw();
    new V.StaveConnector(arriba[0], abajo[0]).setType(V.StaveConnector.type.SINGLE_LEFT).setContext(ctx).draw();

    var dur = REDONDA;
    var notasArriba = [], notasAbajo = [];
    it.acordes.forEach(function (ac) {
      notasArriba.push(new V.StaveNote({ keys: [ac.A, ac.S], duration: dur, clef: 'treble' }));
      notasAbajo.push(new V.StaveNote({ keys: [ac.B, ac.T], duration: dur, clef: 'bass' }));
    });
    var vozArriba = new V.Voice({ num_beats: 8, beat_value: 4 }); vozArriba.setStrict(false); vozArriba.addTickables(notasArriba);
    var vozAbajo = new V.Voice({ num_beats: 8, beat_value: 4 }); vozAbajo.setStrict(false); vozAbajo.addTickables(notasAbajo);
    new V.Formatter().joinVoices([vozArriba]).joinVoices([vozAbajo]).format([vozArriba, vozAbajo], w1 + w2 - 30);
    vozArriba.draw(ctx, arriba[0]);
    vozAbajo.draw(ctx, abajo[0]);

    var svg = div.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.maxWidth = Math.round(W * 1.3) + 'px';
    div.__tmInfo = { acordes: it.acordes.slice() };
  }

  /* ------------------------------------------------------------------ UI */

  var NIVELES = [
    { nivel: 1, t: 'Conclusivas', d: 'Auténtica perfecta, auténtica imperfecta y plagal' },
    { nivel: 2, t: 'Suspensivas', d: 'Semicadencia sobre la dominante, sobre la subdominante y cadencia rota' },
    { nivel: 3, t: 'Mezcladas', d: 'Los seis tipos de cadencia, mezclados' }
  ];
  var PREGUNTAS = 6;

  var CSS = [
    '.tm-cd{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-cd-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-cd-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-cd-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-cd-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-cd-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;font-family:inherit;}',
    '.tm-cd-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-cd-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-cd-modo span{font-size:.82rem;color:#8b6914;}',
    '.tm-cd-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-cd-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-cd-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-cd-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:4px 0 8px;}',
    '.tm-cd-dibujo{display:flex;justify-content:center;margin:0 auto 12px;}',
    '.tm-cd-dibujo > div{width:100%;display:flex;justify-content:center;}',
    '.tm-cd-ops{display:grid;grid-template-columns:1fr 1fr;gap:10px;}',
    '.tm-cd-op{border:2px solid #d8d0b8;background:#fff;border-radius:10px;padding:11px 8px;min-height:44px;cursor:pointer;font-family:inherit;font-weight:700;font-size:.92rem;color:#1a1208;line-height:1.25;}',
    '.tm-cd-op:hover:not([disabled]){border-color:#8b6914;background:#fff8ee;}',
    '.tm-cd-op.tm-ok{border-color:#27ae60!important;background:#27ae60!important;color:#fff!important;}',
    '.tm-cd-op.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-cd-op.tm-buena{border-color:#27ae60!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-cd-op[disabled]{cursor:default;opacity:.9;}',
    '.tm-cd-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-cd-fb[hidden]{display:none;}',
    '.tm-cd-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-cd-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-cd-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-cd-btn[hidden]{display:none;}',
    '.tm-cd-res{text-align:center;padding:10px 0;}',
    '.tm-cd-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-cd-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-cd-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-cd-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-cd-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}'
  ].join('');

  function css() {
    if (document.getElementById('tm-cd-css')) return;
    var st = document.createElement('style');
    st.id = 'tm-cd-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  window.tmCadencias = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !CT()) return;
    css();
    cont.className = 'tm-cd';
    var cola = [], pos = 0, aciertos = 0, nivelActual = 1;
    window.tmCadenciasDebug = function () { return cola[pos] || null; };

    function inicio() {
      cont.innerHTML = '<div class="tm-cd-card"><div class="tm-cd-tit">¿Qué cadencia es?</div>'
        + '<div class="tm-cd-sub">Verás los dos últimos acordes de una frase, escritos a piano (clave de sol y clave de fa). Identifica el tipo de cadencia.</div>'
        + '<div class="tm-cd-modos">' + NIVELES.map(function (m) {
          return '<button type="button" class="tm-cd-modo" data-n="' + m.nivel + '"><strong>' + m.t + '</strong><span>' + m.d + '</span></button>';
        }).join('') + '</div></div>';
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-cd-modo'), function (b) {
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
      var it = cola[pos], tipos = TIPOS_NIVEL[it.nivel];
      cont.innerHTML = '<div class="tm-cd-card">'
        + '<div class="tm-cd-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-cd-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-cd-preg">¿Qué cadencia es?</div>'
        + '<div class="tm-cd-dibujo"><div></div></div>'
        + '<div class="tm-cd-ops">' + tipos.map(function (t) {
          return '<button type="button" class="tm-cd-op" data-t="' + t + '">' + CADENCIAS[t].nombre + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-cd-fb" hidden></div>'
        + '<button type="button" class="tm-cd-btn" hidden></button></div>';
      dibujar(cont.querySelector('.tm-cd-dibujo > div'), it);

      var btn = cont.querySelector('.tm-cd-btn'), fb = cont.querySelector('.tm-cd-fb');
      var botones = Array.prototype.slice.call(cont.querySelectorAll('.tm-cd-op'));
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
          fb.className = 'tm-cd-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No es correcto, es ' + CADENCIAS[it.tipo].nombre.toLowerCase() + '.') + '</strong> ' + explicar(it) + pista(it.tipo, elegido);
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
      var nota_ = aciertos / cola.length;
      var msg = nota_ === 1 ? '¡Perfecto! Distingues las cadencias sin dudar.' : nota_ >= 0.8 ? 'Muy bien: casi todo correcto.' : nota_ >= 0.5 ? 'Vas bien. Repasa las explicaciones y vuelve a intentarlo.' : 'Conviene repasar los acordes de cada cadencia antes de volver a intentarlo.';
      cont.innerHTML = '<div class="tm-cd-card tm-cd-res"><div class="tm-cd-nota">' + aciertos + '</div><div class="tm-cd-de">aciertos de ' + cola.length + '</div>'
        + '<div class="tm-cd-msg">' + msg + '</div>'
        + '<button type="button" class="tm-cd-otra" data-a="otra">Otra ronda</button>'
        + '<button type="button" class="tm-cd-otra tm-2" data-a="modo">Cambiar de nivel</button></div>';
      cont.querySelector('[data-a="otra"]').addEventListener('click', function () { empezar(nivelActual); });
      cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
    }

    inicio();
  };

  window.tmCadenciasTest = { generarLote: generarLote, explicar: explicar, dibujar: dibujar, CADENCIAS: CADENCIAS, TIPOS_NIVEL: TIPOS_NIVEL, VOCES: VOCES, nota: nota };
})();
