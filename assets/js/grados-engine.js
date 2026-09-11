/* Ejercicios de grados de la escala — interactivos. Son dos, uno en cada
   dirección, como en intervalos (analizar / realizar):

     tmGradosIdentificar('x')  se ve una nota en una tonalidad -> qué grado es
     tmGradosNota('x')         se pide un grado de una tonalidad -> qué nota es

   Uso: <div id="x"></div><script>tmGradosIdentificar('x');</script>

   Las escalas NO van escritas a mano: se construyen desde la armadura, que es
   como se razonan en clase. Así no puede haber una escala con una errata que
   contradiga a la teoría de la página.

   El VII grado es lo que de verdad se practica aquí: se llama SENSIBLE cuando
   está a un semitono de la tónica (mayor, menor armónica) y SUBTÓNICA cuando
   está a un tono (menor natural). Por eso el modo difícil mezcla las dos. */
(function () {
  'use strict';

  var LETRAS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  var ES = { C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' };
  var SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

  /* Orden en que entran las alteraciones en la armadura. */
  var ORDEN_SOST = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
  var ORDEN_BEM = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];

  var ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  var NOMBRES = ['Tónica', 'Supertónica', 'Mediante', 'Subdominante', 'Dominante', 'Superdominante', 'Sensible'];
  /* La Subtónica es el mismo VII grado cuando está a un tono: va aparte porque
     como opción de respuesta tiene que estar siempre visible, o su presencia
     delataría que la escala es menor natural. */
  var TODOS_NOMBRES = NOMBRES.concat(['Subtónica']);

  /* Grados tonales (I, IV, V) y modales (III, VI, VII). La SUPERTÓNICA no entra
     en ninguno de los dos grupos, y por eso hace falta la tercera opción: sin
     ella el ejercicio obligaría a clasificarla mal. */
  var CLASIF = ['tonal', 'ninguno', 'modal', 'tonal', 'tonal', 'modal', 'modal'];
  var CLASIF_OPC = [
    { v: 'tonal',   lbl: 'Tonal' },
    { v: 'modal',   lbl: 'Modal' },
    { v: 'ninguno', lbl: 'Ninguno de los dos' }
  ];
  var CLASIF_TXT = { tonal: 'un grado <strong>tonal</strong>', modal: 'un grado <strong>modal</strong>', ninguno: '<strong>ni tonal ni modal</strong>' };

  /* Tonalidades por número de alteraciones. vex = nombre de la armadura para
     VexFlow, que siempre es el del RELATIVO MAYOR: la armadura de la menor y la
     de Do Mayor son la misma. */
  var TONALIDADES = [
    { alt: 0,  tipo: '#', mayor: 'C',  menor: 'A',  vex: 'C' },
    { alt: 1,  tipo: '#', mayor: 'G',  menor: 'E',  vex: 'G' },
    { alt: 2,  tipo: '#', mayor: 'D',  menor: 'B',  vex: 'D' },
    { alt: 3,  tipo: '#', mayor: 'A',  menor: 'F#', vex: 'A' },
    { alt: 4,  tipo: '#', mayor: 'E',  menor: 'C#', vex: 'E' },
    { alt: 5,  tipo: '#', mayor: 'B',  menor: 'G#', vex: 'B' },
    { alt: 1,  tipo: 'b', mayor: 'F',  menor: 'D',  vex: 'F' },
    { alt: 2,  tipo: 'b', mayor: 'Bb', menor: 'G',  vex: 'Bb' },
    { alt: 3,  tipo: 'b', mayor: 'Eb', menor: 'C',  vex: 'Eb' },
    { alt: 4,  tipo: 'b', mayor: 'Ab', menor: 'F',  vex: 'Ab' },
    { alt: 5,  tipo: 'b', mayor: 'Db', menor: 'Bb', vex: 'Db' }
  ];

  /* Qué letras lleva alteradas una armadura. */
  function armadura(alt, tipo) {
    var mapa = {};
    var orden = tipo === '#' ? ORDEN_SOST : ORDEN_BEM;
    for (var i = 0; i < alt; i++) mapa[orden[i]] = tipo;
    return mapa;
  }

  function nombreES(letra, acc) {
    return ES[letra] + (acc === '#' ? '♯' : acc === 'b' ? '♭' : '');
  }

  /* El doble sostenido tiene que contar: sin él, sol♯ menor armónica (cuyo VII
     es Fa doble sostenido) salía a un tono de la tónica y se etiquetaba como
     Subtónica en vez de Sensible. */
  function semitonos(letra, acc) {
    return SEMIS[letra] + (acc === '##' ? 2 : acc === '#' ? 1 : acc === 'b' ? -1 : 0);
  }

  /* Construye la escala: siete letras seguidas desde la tónica, cada una con la
     alteración que le ponga la armadura. En la menor armónica se sube el VII.
     Se devuelve también si ese VII es sensible o subtónica. */
  function escala(ton, modo) {
    var raiz = modo === 'mayor' ? ton.mayor : ton.menor;
    var letraRaiz = raiz[0];
    var accRaiz = raiz.length > 1 ? raiz[1] : '';
    var arm = armadura(ton.alt, ton.tipo);
    var i0 = LETRAS.indexOf(letraRaiz);

    var notas = [];
    for (var g = 0; g < 7; g++) {
      var letra = LETRAS[(i0 + g) % 7];
      var acc = arm[letra] || '';
      notas.push({ letra: letra, acc: acc });
    }
    // Coherencia: la tónica tiene que salir de la armadura, no forzada.
    if (notas[0].acc !== accRaiz) return null;

    if (modo === 'armonica') {
      var s = notas[6];
      notas[6] = { letra: s.letra, acc: s.acc === 'b' ? '' : s.acc === '' ? '#' : '##' };
    }

    /* Distancia del VII a la tónica, contada hacia arriba dentro de la octava. */
    var d = (semitonos(notas[0].letra, notas[0].acc) + 12 - semitonos(notas[6].letra, notas[6].acc)) % 12;
    return {
      notas: notas,
      raiz: nombreES(letraRaiz, accRaiz),
      modo: modo,
      septimo: d === 1 ? 'Sensible' : 'Subtónica',
      distSeptimo: d
    };
  }

  function nombreTonalidad(esc) {
    if (esc.modo === 'mayor') return esc.raiz + ' Mayor';
    return esc.raiz.toLowerCase() + ' menor' + (esc.modo === 'armonica' ? ' armónica' : ' natural');
  }

  function nombreGrado(esc, g) {
    return g === 6 ? esc.septimo : NOMBRES[g];
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var CSS = [
    '.tm-gr-wrap{max-width:640px;margin:0 auto;font-family:inherit;}',
    '.tm-gr-card{background:#fff;border:1px solid #d8d0b8;border-radius:6px;padding:22px 20px;}',
    '.tm-gr-mode-title{font-size:1.25rem;font-weight:800;color:#1a1208;margin-bottom:6px;}',
    '.tm-gr-mode-sub{font-size:.92rem;color:#514232;margin-bottom:18px;line-height:1.45;}',
    '.tm-gr-mode-btns{display:flex;flex-direction:column;gap:10px;}',
    '.tm-gr-mode-btn{display:block;width:100%;text-align:left;background:#fdfcf9;border:1px solid #d8d0b8;border-radius:6px;padding:13px 15px;cursor:pointer;font-family:inherit;font-size:.95rem;color:#1a1208;transition:border-color .15s,background .15s;}',
    '.tm-gr-mode-btn:hover{border-color:#8b6914;background:#faf7ef;}',
    '.tm-gr-mode-btn strong{display:block;font-weight:700;margin-bottom:2px;}',
    '.tm-gr-mode-btn span{font-size:.85rem;color:#6b5c47;}',
    '.tm-gr-prog-label{font-size:.8rem;color:#8b7355;margin-bottom:6px;}',
    '.tm-gr-prog-bar{height:5px;background:#efe9db;border-radius:3px;overflow:hidden;margin-bottom:16px;}',
    '.tm-gr-prog-fill{height:100%;background:#8b6914;transition:width .3s;}',
    '.tm-gr-ton{text-align:center;font-size:1.05rem;font-weight:700;color:#6b5010;margin-bottom:4px;}',
    '.tm-gr-pedido{text-align:center;font-size:1.15rem;color:#1a1208;margin:18px 0 6px;line-height:1.4;}',
    '.tm-gr-staff{display:flex;justify-content:center;align-items:center;min-height:150px;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:4px;margin-bottom:16px;}',
    '.tm-gr-qlabel{font-size:.85rem;font-weight:700;color:#514232;margin:14px 0 7px;}',
    '.tm-gr-pills{display:flex;flex-wrap:wrap;gap:7px;}',
    '.tm-gr-pill{border:1px solid #d8d0b8;background:#fdfcf9;border-radius:4px;padding:9px 14px;font-size:.9rem;cursor:pointer;transition:all .15s;user-select:none;}',
    '.tm-gr-pill:hover{border-color:#8b6914;}',
    '.tm-gr-pill.tm-sel{background:#8b6914;color:#fff;border-color:#8b6914;font-weight:700;}',
    '.tm-gr-pill.tm-ok{background:#2e7d32;color:#fff;border-color:#2e7d32;font-weight:700;}',
    '.tm-gr-pill.tm-ko{background:#c0392b;color:#fff;border-color:#c0392b;font-weight:700;}',
    '.tm-gr-pill.tm-disabled{pointer-events:none;opacity:.55;}',
    '.tm-gr-fb{margin-top:14px;font-size:.92rem;line-height:1.5;padding:12px 14px;border-radius:5px;display:none;}',
    '.tm-gr-fb.tm-bien{display:block;background:#eef6ee;border:1px solid #cfe3cf;color:#1e4d21;}',
    '.tm-gr-fb.tm-mal{display:block;background:#fdf0ee;border:1px solid #f0d2cd;color:#7d2419;}',
    '.tm-gr-btn{width:100%;padding:13px;margin-top:14px;border:none;border-radius:7px;font-size:1rem;font-weight:700;background:#8b6914;color:#fff;cursor:pointer;font-family:inherit;}',
    '.tm-gr-btn:disabled{background:#cfc6b2;cursor:not-allowed;}',
    '.tm-gr-res{text-align:center;padding:10px 0;}',
    '.tm-gr-res-score{font-size:3.2rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-gr-res-sub{font-size:.9rem;color:#514232;margin:6px 0 16px;}',
    '.tm-gr-res-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-gr-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-gr-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  var TOTAL = 10;
  var ALTERACIONES = [{ v: 'b', lbl: '♭' }, { v: '', lbl: '♮' }, { v: '#', lbl: '♯' }];

  /* tipo: 'grado' (se ve la nota, se pide el grado) o 'nota' (al revés). */
  function motor(containerId, tipo) {
    var cont = document.getElementById(containerId);
    if (!cont) return;
    injectCSS();
    var wrap = document.createElement('div');
    wrap.className = 'tm-gr-wrap';
    cont.appendChild(wrap);

    var modo = 'facil', queue = [], current = 0, score = 0;

    function pool() {
      var out = [];
      TONALIDADES.forEach(function (t) {
        var modos = modo === 'facil' ? (t.alt === 0 ? ['mayor'] : [])
                  : modo === 'mayores' ? (t.alt <= 4 ? ['mayor'] : [])
                  : ['mayor', 'natural', 'armonica'];
        modos.forEach(function (m) {
          var e = escala(t, m);
          /* Fuera las escalas con doble alteración (sol♯ menor armónica pide
             Fa doble sostenido): la página no las explica y no tocaría
             preguntarlas en un ejercicio de nombres de grados. */
          if (!e || e.notas.some(function (n) { return n.acc.length > 1; })) return;
          out.push({ ton: t, esc: e });
        });
      });
      return out;
    }

    function buildQueue() {
      var p = pool();
      queue = [];
      while (queue.length < TOTAL) {
        shuffle(p.slice()).forEach(function (x) {
          if (queue.length >= TOTAL * 2) return;
          queue.push({
            ton: x.ton, esc: x.esc, grado: Math.floor(Math.random() * 7),
            // En el ejercicio inverso se pide unas veces por número romano y
            // otras por nombre, para que se practiquen las dos asociaciones.
            porNombre: Math.random() < 0.5
          });
        });
      }
      queue = shuffle(queue).slice(0, TOTAL);
    }

    function showModeScreen() {
      current = 0; score = 0;
      wrap.innerHTML = '<div class="tm-gr-card">'
        + '<div class="tm-gr-mode-title">' + (tipo === 'grado' ? '¿Qué grado es esta nota?' : '¿Qué nota es este grado?') + '</div>'
        + '<div class="tm-gr-mode-sub">' + (tipo === 'grado'
            ? 'Se te da una tonalidad y una nota escrita: di qué grado ocupa y cómo se llama.'
            : 'Se te da una tonalidad y un grado: di qué nota lo ocupa, con su alteración.') + '</div>'
        + '<div class="tm-gr-mode-btns">'
        + '<button class="tm-gr-mode-btn" data-modo="facil"><strong>Do Mayor</strong><span>Sin armadura, para aprenderse los nombres</span></button>'
        + '<button class="tm-gr-mode-btn" data-modo="mayores"><strong>Tonalidades mayores</strong><span>Hasta cuatro alteraciones en la armadura</span></button>'
        + '<button class="tm-gr-mode-btn" data-modo="todas"><strong>Mayores y menores</strong><span>Incluye menor natural y armónica: sensible o subtónica</span></button>'
        + '</div></div>';
      wrap.querySelectorAll('.tm-gr-mode-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          modo = this.dataset.modo;
          buildQueue();
          showQuestion();
        });
      });
    }

    function drawStaff(id, q) {
      var el = document.getElementById(id);
      if (!el || typeof Vex === 'undefined') return;
      el.innerHTML = '';
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      var W = 300, H = 150;
      r.resize(W, H);
      var ctx = r.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(8, 20, W - 20);
      stave.addClef('treble');
      if (q.ton.alt > 0) stave.addKeySignature(q.ton.vex);
      stave.setContext(ctx).draw();

      var n = q.esc.notas[q.grado];
      /* Octava: se coloca la nota en un sitio cómodo del pentagrama en clave de
         sol, sin líneas adicionales. */
      var oct = 'CDE'.indexOf(n.letra) >= 0 ? 5 : 4;
      var clave = n.letra.toLowerCase() + (n.acc || '') + '/' + oct;
      var nota = new V.StaveNote({ keys: [clave], duration: 'w', clef: 'treble' });

      /* La alteración solo se dibuja si NO la lleva ya la armadura (el VII
         subido de la menor armónica). Dibujarla siempre sería una redundancia
         que en una partitura real no se escribe. */
      var arm = armadura(q.ton.alt, q.ton.tipo);
      if ((n.acc || '') !== (arm[n.letra] || '')) {
        nota.addModifier(new V.Accidental(n.acc === '' ? 'n' : n.acc), 0);
      }
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([nota]);
      new V.Formatter().joinVoices([voice]).format([voice], W - 120);
      /* VexFlow pega la nota a la armadura y deja medio pentagrama vacío. Se
         centra en el hueco que queda libre tras la clave y las alteraciones. */
      var libre = stave.getNoteEndX() - stave.getNoteStartX();
      nota.setXShift(Math.max(0, (libre - 30) / 2));
      voice.draw(ctx, stave);
      var svg = el.querySelector('svg');
      if (svg) { svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.style.width = W + 'px'; svg.style.maxWidth = '100%'; svg.style.height = 'auto'; }
    }

    function showQuestion() {
      var q = queue[current];
      var pct = Math.round((current / TOTAL) * 100);
      var sel = { grado: null, nombre: null, letra: null, acc: null, clasif: null };
      // El uid lleva el id del contenedor: los dos ejercicios conviven en la
      // misma pagina y con ids repetidos el segundo manipulaba el boton del primero.
      var uid = 'tmgr-' + containerId + '-' + current;

      var cuerpo;
      if (tipo === 'grado') {
        cuerpo = '<div class="tm-gr-staff" id="' + uid + '"></div>'
          + '<div class="tm-gr-qlabel">¿Qué grado es?</div>'
          + '<div class="tm-gr-pills">' + ROMANOS.map(function (r, i) {
              return '<div class="tm-gr-pill" data-q="grado" data-val="' + i + '">' + r + '</div>';
            }).join('') + '</div>'
          + '<div class="tm-gr-qlabel">¿Cómo se llama?</div>'
          + '<div class="tm-gr-pills">' + TODOS_NOMBRES.map(function (n) {
              return '<div class="tm-gr-pill" data-q="nombre" data-val="' + n + '">' + n + '</div>';
            }).join('') + '</div>'
          + '<div class="tm-gr-qlabel">¿Tonal o modal?</div>'
          + '<div class="tm-gr-pills">' + CLASIF_OPC.map(function (c) {
              return '<div class="tm-gr-pill" data-q="clasif" data-val="' + c.v + '">' + c.lbl + '</div>';
            }).join('') + '</div>';
      } else {
        var pedido = q.porNombre
          ? 'la <strong>' + nombreGrado(q.esc, q.grado) + '</strong>'
          : 'el grado <strong>' + ROMANOS[q.grado] + '</strong>';
        cuerpo = '<div class="tm-gr-pedido">¿Qué nota es ' + pedido + '?</div>'
          + '<div class="tm-gr-qlabel">Nota</div>'
          + '<div class="tm-gr-pills">' + LETRAS.map(function (l) {
              return '<div class="tm-gr-pill" data-q="letra" data-val="' + l + '">' + ES[l] + '</div>';
            }).join('') + '</div>'
          + '<div class="tm-gr-qlabel">Alteración</div>'
          + '<div class="tm-gr-pills">' + ALTERACIONES.map(function (a) {
              return '<div class="tm-gr-pill" data-q="acc" data-val="' + a.v + '">' + a.lbl + '</div>';
            }).join('') + '</div>'
          + '<div class="tm-gr-qlabel">¿Tonal o modal?</div>'
          + '<div class="tm-gr-pills">' + CLASIF_OPC.map(function (c) {
              return '<div class="tm-gr-pill" data-q="clasif" data-val="' + c.v + '">' + c.lbl + '</div>';
            }).join('') + '</div>'
          + '<div class="tm-gr-staff" id="' + uid + '" style="display:none"></div>';
      }

      wrap.innerHTML = '<div class="tm-gr-card">'
        + '<div class="tm-gr-prog-label">Pregunta ' + (current + 1) + ' de ' + TOTAL + '</div>'
        + '<div class="tm-gr-prog-bar"><div class="tm-gr-prog-fill" style="width:' + pct + '%"></div></div>'
        + '<div class="tm-gr-ton">' + nombreTonalidad(q.esc) + '</div>'
        + cuerpo
        + '<div class="tm-gr-fb"></div>'
        + '<button class="tm-gr-btn" disabled>Comprobar</button>'
        + '</div>';

      if (tipo === 'grado') drawStaff(uid, q);

      var btn = wrap.querySelector('.tm-gr-btn');
      var requeridos = (tipo === 'grado' ? ['grado', 'nombre'] : ['letra', 'acc']).concat(['clasif']);
      wrap.querySelectorAll('.tm-gr-pill').forEach(function (p) {
        p.addEventListener('click', function () {
          if (this.classList.contains('tm-disabled')) return;
          var k = this.dataset.q;
          wrap.querySelectorAll('.tm-gr-pill[data-q="' + k + '"]').forEach(function (o) { o.classList.remove('tm-sel'); });
          this.classList.add('tm-sel');
          sel[k] = this.dataset.val;
          btn.disabled = requeridos.some(function (r) { return sel[r] === null || sel[r] === undefined; });
        });
      });

      btn.addEventListener('click', function () { comprobar(q, sel, uid); });
    }

    function comprobar(q, sel, uid) {
      var n = q.esc.notas[q.grado];
      var nombreOk = nombreGrado(q.esc, q.grado);
      var acierto;

      var clasifOk = CLASIF[q.grado];
      if (tipo === 'grado') {
        acierto = Number(sel.grado) === q.grado && sel.nombre === nombreOk;
      } else {
        acierto = sel.letra === n.letra && (sel.acc || '') === (n.acc || '');
      }
      acierto = acierto && sel.clasif === clasifOk;
      if (acierto) score++;

      wrap.querySelectorAll('.tm-gr-pill').forEach(function (p) {
        p.classList.add('tm-disabled');
        var esCorrecta = (p.dataset.q === 'grado' && Number(p.dataset.val) === q.grado)
                      || (p.dataset.q === 'nombre' && p.dataset.val === nombreOk)
                      || (p.dataset.q === 'letra' && p.dataset.val === n.letra)
                      || (p.dataset.q === 'acc' && (p.dataset.val || '') === (n.acc || ''))
                      || (p.dataset.q === 'clasif' && p.dataset.val === clasifOk);
        if (esCorrecta) { p.classList.remove('tm-sel'); p.classList.add('tm-ok'); }
        else if (p.classList.contains('tm-sel')) { p.classList.remove('tm-sel'); p.classList.add('tm-ko'); }
      });

      // En el ejercicio inverso el pentagrama se enseña AL CORREGIR: así se ve
      // escrita la nota que había que decir, que es como se comprueba en clase.
      if (tipo === 'nota') {
        var el = document.getElementById(uid);
        if (el) { el.style.display = ''; drawStaff(uid, q); }
      }

      /* Se enseña la cuenta desde la tónica, no solo la respuesta: "Do–Re–Mi–Fa,
         1–2–3–4" es lo que convierte el fallo en aprendizaje. */
      var cuenta = q.esc.notas.slice(0, q.grado + 1).map(function (x) { return nombreES(x.letra, x.acc); }).join('–');
      var numeros = []; for (var k = 1; k <= q.grado + 1; k++) numeros.push(k);
      var expl = '<strong>' + nombreES(n.letra, n.acc) + '</strong> es el <strong>' + ROMANOS[q.grado]
        + '</strong> grado de ' + nombreTonalidad(q.esc) + ': la <strong>' + nombreOk + '</strong>.'
        + (q.grado > 0 ? ' Contando desde la tónica: ' + cuenta + ' → ' + numeros.join('–') + '.' : '')
        + ' Es ' + CLASIF_TXT[clasifOk] + (clasifOk === 'ninguno'
            ? ': los tonales son I, IV y V, y los modales III, VI y VII.' : '.');
      if (q.grado === 6) {
        expl += ' Está a ' + (q.esc.distSeptimo === 1 ? 'un semitono' : 'un tono')
          + ' de la tónica, así que se llama ' + (q.esc.distSeptimo === 1
            ? '<strong>Sensible</strong>: atrae con fuerza hacia ella.'
            : '<strong>Subtónica</strong>: la atracción es mucho menor.');
      }
      var fb = wrap.querySelector('.tm-gr-fb');
      fb.className = 'tm-gr-fb ' + (acierto ? 'tm-bien' : 'tm-mal');
      fb.innerHTML = (acierto ? '¡Correcto! ' : 'No es. ') + expl;

      var btn = wrap.querySelector('.tm-gr-btn');
      btn.disabled = false;
      btn.textContent = current + 1 < TOTAL ? 'Siguiente →' : 'Ver resultado';
      btn.replaceWith(btn.cloneNode(true));
      wrap.querySelector('.tm-gr-btn').addEventListener('click', function () {
        current++;
        if (current < TOTAL) showQuestion(); else showResults();
      });
    }

    function showResults() {
      var mal = TOTAL - score;
      var msg = score === TOTAL ? '¡Perfecto! Te sabes los grados y sus nombres.'
              : score >= 8 ? 'Muy bien. Casi lo tienes.'
              : score >= 6 ? 'Vas por buen camino. Repasa los nombres del VI y el VII.'
              : score >= 4 ? 'Necesitas repasar la tabla de nombres.'
              : 'Empieza por el modo de Do Mayor y vuelve luego.';
      wrap.innerHTML = '<div class="tm-gr-card tm-gr-res">'
        + '<div class="tm-gr-res-score">' + score + '/' + TOTAL + '</div>'
        + '<div class="tm-gr-res-sub">' + score + ' bien · ' + mal + ' mal</div>'
        + '<div class="tm-gr-res-msg">' + msg + '</div>'
        + '<button class="tm-gr-btn">Intentar de nuevo</button>'
        + '</div>';
      wrap.querySelector('.tm-gr-btn').addEventListener('click', showModeScreen);
    }

    showModeScreen();
  }

  window.tmGradosIdentificar = function (id) { motor(id, 'grado'); };
  window.tmGradosNota = function (id) { motor(id, 'nota'); };
  /* Se exponen los datos para que tools/verificar-grados.js pueda auditar las
     escalas sin volver a escribirlas: si divergieran, la auditoría no valdría. */
  window.tmGradosData = { TONALIDADES: TONALIDADES, escala: escala, CLASIF: CLASIF, nombreGrado: nombreGrado, nombreTonalidad: nombreTonalidad, NOMBRES: NOMBRES };
}());
