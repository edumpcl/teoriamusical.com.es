/* ¿Qué función tonal tiene este acorde? — /ejercicios/funciones-tonales/

   Uso: <div id="x"></div><script>tmFuncionesTonales('x');</script>

   Se enseña UN acorde (una redonda con 3 o 4 notas) en una tonalidad mayor, con su armadura y su nombre escrito, y se pide
   su función: tónica, subdominante o dominante. Los acordes salen de los grados de la escala:

     tónica (T):        I  y su sustituto VI
     subdominante (S):  IV y su sustituto II
     dominante (D):     V (y V7) y VII

   El III grado NO se pregunta: según el contexto actúa como tónica o como dominante (la teoría del sitio lo explica), y un
   ejercicio con dos respuestas posibles sería injusto.

   Niveles: 1 = funciones principales (I, IV, V; Do, Sol, Re y Fa); 2 = con sustitutos (también II, VI y VII; las 7 tonalidades);
   3 = mezcladas, con inversiones (el acorde no cambia de función) y el V7.

   La regla práctica que enseña la explicación, y que además es exacta para los acordes que se preguntan: si el acorde
   contiene la SENSIBLE (7.º grado) es dominante; si no la contiene pero sí el 4.º grado, es subdominante; si no tiene ninguna
   de las dos notas, es tónica. (I = 1-3-5, VI = 6-1-3 → tónica; IV = 4-6-1, II = 2-4-6 → subdominante; V = 5-7-2, V7 = 5-7-2-4,
   VII = 7-2-4 → dominante.)

   Se audita con tools/verificar-funciones-tonales.js, que NO se fía del motor: recalcula la función desde las alturas reales
   (semitonos con la armadura), y lee el dibujo. */
(function () {
  'use strict';

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
  var NOMBRES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  function nota(idx) { return LETRAS[((idx % 7) + 7) % 7] + '/' + Math.floor(idx / 7); }

  /* tonica = letra de la tónica (c=0 … b=6); arm = alteraciones de la armadura (+ sostenidos, − bemoles). */
  var TONALIDADES = [
    { id: 'C', tonica: 0, arm: 0, nombre: 'Do mayor' }, { id: 'G', tonica: 4, arm: 1, nombre: 'Sol mayor' },
    { id: 'D', tonica: 1, arm: 2, nombre: 'Re mayor' }, { id: 'F', tonica: 3, arm: -1, nombre: 'Fa mayor' },
    { id: 'Bb', tonica: 6, arm: -2, nombre: 'Si♭ mayor' }, { id: 'A', tonica: 5, arm: 3, nombre: 'La mayor' },
    { id: 'Eb', tonica: 2, arm: -3, nombre: 'Mi♭ mayor' }
  ];
  function tonalidad(id) { return TONALIDADES.filter(function (t) { return t.id === id; })[0]; }

  var FUNCIONES = {
    T: { nombre: 'Tónica', frase: 'la tónica' },
    S: { nombre: 'Subdominante', frase: 'la subdominante' },
    D: { nombre: 'Dominante', frase: 'la dominante' }
  };
  var ORDEN = ['T', 'S', 'D'];

  /* Acordes que se preguntan: grado (1-7), tipo (triada / septima) y función. El III no está. */
  var ACORDES = {
    I: { grado: 1, tipo: 'triada', f: 'T', rom: 'I' },
    II: { grado: 2, tipo: 'triada', f: 'S', rom: 'II' },
    IV: { grado: 4, tipo: 'triada', f: 'S', rom: 'IV' },
    V: { grado: 5, tipo: 'triada', f: 'D', rom: 'V' },
    V7: { grado: 5, tipo: 'septima', f: 'D', rom: 'V7' },
    VI: { grado: 6, tipo: 'triada', f: 'T', rom: 'VI' },
    VII: { grado: 7, tipo: 'triada', f: 'D', rom: 'VII' }
  };
  var ACORDES_NIVEL = {
    1: { T: ['I'], S: ['IV'], D: ['V'] },
    2: { T: ['I', 'VI'], S: ['IV', 'II'], D: ['V', 'VII'] },
    3: { T: ['I', 'VI'], S: ['IV', 'II'], D: ['V', 'VII', 'V7'] }
  };
  var INVERSIONES_NIVEL = { 1: [0], 2: [0], 3: [0, 1, 2] };

  function colocar(tonal, ac, inversion) {
    var t = tonal.tonica > 3 ? tonal.tonica - 7 : tonal.tonica;
    var raiz = 28 + t + (ac.grado - 1), lista = [raiz, raiz + 2, raiz + 4];
    if (ac.tipo === 'septima') lista.push(raiz + 6);
    for (var k = 0; k < inversion; k++) lista.push(lista.shift() + 7);
    // la nota más grave entre si3 (27) y la4 (33): el acorde cabe en el pentagrama con pocas líneas adicionales
    var d = 0;
    while (lista[0] + d < 27) d += 7;
    while (lista[0] + d > 33) d -= 7;
    return lista.map(function (i) { return nota(i + d); });
  }

  function generarUno(o, rnd) {
    var A = azar(rnd), nivel = o.nivel || 1;
    var f = o.f || A.uno(ORDEN);
    var clave = o.acorde || A.uno(ACORDES_NIVEL[nivel][f]);
    var ac = ACORDES[clave];
    var tonal = o.tonalidad ? tonalidad(o.tonalidad) : A.uno(nivel === 1 ? TONALIDADES.slice(0, 4) : TONALIDADES);
    // inversiones 0, 1 y 2 (en el V7: V7, V6/5 y V4/3); la 3.ª inversión del V7 (V4/2) no se pregunta
    var inv = o.inversion !== undefined ? o.inversion : A.uno(INVERSIONES_NIVEL[nivel]);
    return { nivel: nivel, acorde: clave, grado: ac.grado, funcion: ac.f, tonalidad: tonal.id, inversion: inv, notas: colocar(tonal, ac, inv) };
  }

  function generarLote(o, semilla) {
    var rnd = mulberry32(semilla === undefined ? Math.floor(Math.random() * 4294967296) : semilla);
    var A = azar(rnd), n = o.n || 6;
    var base = [];
    while (base.length < n) base = base.concat(ORDEN);
    var fs;
    for (var intento = 0; intento < 30; intento++) {
      fs = A.barajar(base.slice(0, n));
      var seguidos = false;
      for (var i = 2; i < n; i++) if (fs[i] === fs[i - 1] && fs[i] === fs[i - 2]) seguidos = true;
      if (!seguidos) break;
    }
    return fs.map(function (f) { return generarUno({ nivel: o.nivel, f: f }, rnd); });
  }

  /* --------------------------------------------------------- Explicación */

  function nombreNota(key, tonal) {
    var l = key.split('/')[0], i = LETRAS.indexOf(l);
    var alt = window.tmMEI ? window.tmMEI.altArmadura(tonal.arm, l) : 0;
    return NOMBRES[i] + (alt > 0 ? '♯' : alt < 0 ? '♭' : '');
  }
  /* Nombre de la nota que ocupa el grado g (1-7) de la tonalidad. */
  function notaGrado(tonal, g) {
    var l = LETRAS[(tonal.tonica + g - 1) % 7];
    var alt = window.tmMEI ? window.tmMEI.altArmadura(tonal.arm, l) : 0;
    return NOMBRES[LETRAS.indexOf(l)] + (alt > 0 ? '♯' : alt < 0 ? '♭' : '');
  }
  var ORD = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  var SUSTITUTO = {
    VI: ' Es la tónica «sustituta»: comparte dos notas con la tónica y puede ocupar su lugar (por ejemplo, en la cadencia rota).',
    II: ' Es la subdominante «sustituta»: comparte dos notas con el IV y prepara igualmente la dominante.',
    VII: ' Es un acorde de dominante «incompleto»: tiene la sensible y el 4.º grado, el tritono que pide resolver en la tónica.',
    V7: ' Es la dominante con séptima: la séptima añade el 4.º grado y refuerza la tensión.',
    V: ' La dominante genera tensión y suele conducir a la tónica: su sensible tiende a subir hasta ella.',
    IV: ' La subdominante se aleja de la tónica y suele conducir a la dominante.',
    I: ' La tónica es el centro y el reposo de la tonalidad.'
  };

  function explicar(it) {
    var tonal = tonalidad(it.tonalidad), ac = ACORDES[it.acorde];
    var nombres = it.notas.map(function (k) { return nombreNota(k, tonal); });
    var sens = notaGrado(tonal, 7), cuarto = notaGrado(tonal, 4);
    var t = 'Es el acorde del ' + ORD[ac.grado] + ' grado de ' + tonal.nombre + ' (' + notaGrado(tonal, ac.grado) + (ac.tipo === 'septima' ? ', con séptima' : '') + '); sus notas son ' + nombres.join(' – ') + '. ';
    if (ac.f === 'D') t += 'Contiene la sensible (' + sens + '), por eso es dominante.';
    else if (ac.f === 'S') t += 'No tiene la sensible (' + sens + ') pero sí el 4.º grado (' + cuarto + '), por eso es subdominante.';
    else t += 'No contiene ni la sensible (' + sens + ') ni el 4.º grado (' + cuarto + '), por eso es tónica.';
    t += SUSTITUTO[it.acorde] || '';
    if (it.inversion) t += ' Está invertido, pero la función no cambia: depende del grado sobre el que se construye, no de la nota que quede en el bajo.';
    return t;
  }

  function pista(correcto, elegido) {
    if (correcto === elegido) return '';
    if (correcto === 'D') return ' Busca primero la sensible (el 7.º grado, una nota por debajo de la tónica): si el acorde la lleva, es dominante.';
    if (correcto === 'S') return ' La subdominante lleva el 4.º grado y no lleva la sensible. Si el acorde tuviera la sensible sería dominante.';
    return ' La tónica no tiene ni la sensible ni el 4.º grado: sus notas son las del acorde de reposo (1-3-5) o las de su sustituto (6-1-3).';
  }

  /* -------------------------------------------------------------- Dibujo */

  function conVerovio() { return !!(window.tmNotacion && window.tmNotacion.cargado && window.tmNotacion.cargado()); }

  /* El acorde en una sola redonda de clave de sol, con la alteración que le da la armadura. */
  function dibujar(div, it) {
    var tonal = tonalidad(it.tonalidad);
    div.innerHTML = '';
    function conArm(key) {
      var p = key.split('/'), a = window.tmMEI.altArmadura(tonal.arm, p[0]);
      return p[0] + (a > 0 ? '#' : a < 0 ? 'b' : '') + '/' + p[1];
    }
    var sistema = {
      armadura: tonal.arm, llave: false, barraFinal: 'end',
      pentagramas: [{ clave: 'sol', compases: [[{ notas: it.notas.map(conArm), d: 'w' }]] }]
    };
    var res = window.tmNotacion.dibujarSync(div, sistema, { escala: 1.4, separacion: 0.5, margenIzq: 12, id: 'ft', alt: 'Un acorde en una redonda, en ' + tonal.nombre });
    res.elemento.style.maxWidth = '100%';
    div.__tmInfo = { notas: it.notas.slice() };
  }

  /* ------------------------------------------------------------------ UI */

  var NIVELES = [
    { nivel: 1, t: 'Funciones principales', d: 'I, IV y V en Do, Sol, Re y Fa mayor' },
    { nivel: 2, t: 'Con sustitutos', d: 'Añade II, VI y VII, en siete tonalidades' },
    { nivel: 3, t: 'Mezcladas', d: 'Con inversiones (fundamental, 1.ª y 2.ª) y el V7 de dominante' }
  ];
  var PREGUNTAS = 6;

  var CSS = [
    '.tm-ft{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-ft-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-ft-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-ft-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-ft-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-ft-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;font-family:inherit;}',
    '.tm-ft-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-ft-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-ft-modo span{font-size:.82rem;color:#8b6914;}',
    '.tm-ft-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-ft-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-ft-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-ft-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:4px 0 2px;}',
    '.tm-ft-tonal{font-size:.95rem;color:#514232;text-align:center;margin:0 0 6px;}',
    '.tm-ft-tonal strong{color:#1a1208;}',
    '.tm-ft-dibujo{display:flex;justify-content:center;margin:0 auto 12px;}',
    '.tm-ft-dibujo > div{width:100%;display:flex;justify-content:center;}',
    '.tm-ft-ops{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}',
    '.tm-ft-op{border:2px solid #d8d0b8;background:#fff;border-radius:10px;padding:11px 6px;min-height:44px;cursor:pointer;font-family:inherit;font-weight:700;font-size:.92rem;color:#1a1208;line-height:1.25;}',
    '.tm-ft-op:hover:not([disabled]){border-color:#8b6914;background:#fff8ee;}',
    '.tm-ft-op.tm-ok{border-color:#1c7e46!important;background:#1c7e46!important;color:#fff!important;}',
    '.tm-ft-op.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-ft-op.tm-buena{border-color:#1c7e46!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-ft-op[disabled]{cursor:default;opacity:.9;}',
    '.tm-ft-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-ft-fb[hidden]{display:none;}',
    '.tm-ft-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-ft-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-ft-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-ft-btn[hidden]{display:none;}',
    '.tm-ft-res{text-align:center;padding:10px 0;}',
    '.tm-ft-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-ft-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-ft-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-ft-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-ft-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}',
    '@media(max-width:380px){.tm-ft-ops{grid-template-columns:1fr;}}'
  ].join('');

  function css() {
    if (document.getElementById('tm-ft-css')) return;
    var st = document.createElement('style');
    st.id = 'tm-ft-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  window.tmFuncionesTonales = function (id) {
    var cont0 = document.getElementById(id);
    if (cont0 && window.tmNotacion && !conVerovio()) {
      cont0.innerHTML = '<div class="tm-ft-card"><div class="tm-ft-sub">Cargando el ejercicio…</div></div>';
      window.tmNotacion.listo().then(function () { arrancar(id); }, function () { cont0.innerHTML = '<div class="tm-ft-card"><div class="tm-ft-sub">No se ha podido cargar el ejercicio. Recarga la página.</div></div>'; });
      return;
    }
    arrancar(id);
  };

  function arrancar(id) {
    var cont = document.getElementById(id);
    if (!cont) return;
    css();
    cont.className = 'tm-ft';
    var cola = [], pos = 0, aciertos = 0, nivelActual = 1;
    window.tmFuncionesTonalesDebug = function () { return cola[pos] || null; };

    function inicio() {
      cont.innerHTML = '<div class="tm-ft-card"><div class="tm-ft-tit">¿Qué función tonal tiene este acorde?</div>'
        + '<div class="tm-ft-sub">Verás un acorde escrito en una tonalidad mayor. Di si es una <strong>tónica</strong>, una <strong>subdominante</strong> o una <strong>dominante</strong>.</div>'
        + '<div class="tm-ft-modos">' + NIVELES.map(function (m) {
          return '<button type="button" class="tm-ft-modo" data-n="' + m.nivel + '"><strong>' + m.t + '</strong><span>' + m.d + '</span></button>';
        }).join('') + '</div></div>';
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-ft-modo'), function (b) {
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
      var it = cola[pos], tonal = tonalidad(it.tonalidad);
      cont.innerHTML = '<div class="tm-ft-card">'
        + '<div class="tm-ft-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-ft-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-ft-preg">¿Qué función tiene este acorde?</div>'
        + '<p class="tm-ft-tonal">Tonalidad: <strong>' + tonal.nombre + '</strong></p>'
        + '<div class="tm-ft-dibujo"><div></div></div>'
        + '<div class="tm-ft-ops">' + ORDEN.map(function (f) {
          return '<button type="button" class="tm-ft-op" data-f="' + f + '">' + FUNCIONES[f].nombre + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-ft-fb" role="status" aria-live="polite" hidden></div>'
        + '<button type="button" class="tm-ft-btn" hidden></button></div>';
      dibujar(cont.querySelector('.tm-ft-dibujo > div'), it);

      var btn = cont.querySelector('.tm-ft-btn'), fb = cont.querySelector('.tm-ft-fb');
      var botones = Array.prototype.slice.call(cont.querySelectorAll('.tm-ft-op'));
      botones.forEach(function (b) {
        b.addEventListener('click', function () {
          var elegido = b.getAttribute('data-f'), ok = elegido === it.funcion;
          if (ok) aciertos++;
          botones.forEach(function (x) {
            x.disabled = true;
            var f = x.getAttribute('data-f');
            if (f === it.funcion) x.classList.add(f === elegido ? 'tm-ok' : 'tm-buena');
            else if (f === elegido) x.classList.add('tm-ko');
          });
          fb.hidden = false;
          fb.className = 'tm-ft-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No es correcto, es ' + FUNCIONES[it.funcion].frase + '.') + '</strong> ' + explicar(it) + pista(it.funcion, elegido);
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
      var msg = nota_ === 1 ? '¡Perfecto! Reconoces la función de cada acorde sin dudar.' : nota_ >= 0.8 ? 'Muy bien: casi todo correcto.' : nota_ >= 0.5 ? 'Vas bien. Repasa la regla de la sensible y del 4.º grado y vuelve a intentarlo.' : 'Conviene repasar las funciones tonales antes de volver a intentarlo.';
      cont.innerHTML = '<div class="tm-ft-card tm-ft-res"><div class="tm-ft-nota">' + aciertos + '</div><div class="tm-ft-de">aciertos de ' + cola.length + '</div>'
        + '<div class="tm-ft-msg">' + msg + '</div>'
        + '<button type="button" class="tm-ft-otra" data-a="otra">Otra ronda</button>'
        + '<button type="button" class="tm-ft-otra tm-2" data-a="modo">Cambiar de nivel</button></div>';
      cont.querySelector('[data-a="otra"]').addEventListener('click', function () { empezar(nivelActual); });
      cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
    }

    inicio();
  }

  window.tmFuncionesTonalesTest = { generarLote: generarLote, generarUno: generarUno, explicar: explicar, dibujar: dibujar, FUNCIONES: FUNCIONES, ACORDES: ACORDES, ACORDES_NIVEL: ACORDES_NIVEL, TONALIDADES: TONALIDADES, nota: nota };
})();
