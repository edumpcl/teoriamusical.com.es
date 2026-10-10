/* Motor de ejercicios de acordes de séptima (dominante / sensible / disminuida), dibujado con Verovio (tm-mei.js + tm-notacion.js)
   — mismo patrón que assets/js/acordes-engine.js (tríadas), generalizado a
   4 notas y 4 posiciones (fundamental, 1ª, 2ª y 3ª inversión).

   Diferencia de diseño respecto a tríadas: en "construir" el tipo de acorde
   se puede FIJAR por página (config.tipo = 'dominante'|'sensible'|'disminuida')
   para practicar un tipo a la vez, o mezclar los 3 (config.tipo ausente o
   'todas'). En "reconocer" los 3 tipos se mezclan siempre — adivinar el tipo
   es el objetivo del ejercicio, igual que en tríadas. */
(function () {
  'use strict';

  var NS = [0, 2, 4, 5, 7, 9, 11]; /* C D E F G A B */
  var VF_NAMES = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

  var CHORDS7 = [
    { id: 'dominante',  third: 4, fifth: 7, seventh: 10, label: 'S\xe9ptima de Dominante',              short: '7'  },
    { id: 'sensible',   third: 3, fifth: 6, seventh: 10, label: 'S\xe9ptima de Sensible (semidis.)',    short: '\xf87' },
    { id: 'disminuida', third: 3, fifth: 6, seventh: 9,  label: 'S\xe9ptima Disminuida',                short: '\xb07' }
  ];

  var DIFICULTADES = [
    { lbl: 'F\xe1cil',    maxAlt: 0, id: 'easy'   },
    { lbl: 'Medio',       maxAlt: 1, id: 'medium' },
    { lbl: 'Dif\xedcil', maxAlt: 2, id: 'hard'   }
  ];

  /* Etiquetas de grado en orden fundamental; para cada inversión, el bajo es
     ROLES_ALL[inv] y lo que se dibuja/pregunta son los otros 3, en el mismo
     orden en que se apilan por encima del bajo. */
  var ROLES_ALL = ['fund.', '3\xaa', '5\xaa', '7\xaa'];
  function rolesFor(inv) {
    return [ROLES_ALL[(inv + 1) % 4], ROLES_ALL[(inv + 2) % 4], ROLES_ALL[(inv + 3) % 4]];
  }

  var INV_LABEL = ['Fundamental', '1\xaa inversi\xf3n', '2\xaa inversi\xf3n', '3\xaa inversi\xf3n'];
  var INV_KEYS  = ['fundamental', '1a', '2a', '3a'];

  function invTitleReconocer(invType, tipoLbl) {
    if (invType === 'fundamental') return tipoLbl + ' en Fundamental';
    if (invType === '1a')          return tipoLbl + ' en 1\xaa Inversi\xf3n';
    if (invType === '2a')          return tipoLbl + ' en 2\xaa Inversi\xf3n';
    if (invType === '3a')          return tipoLbl + ' en 3\xaa Inversi\xf3n';
    return tipoLbl + ' — Las cuatro posiciones';
  }

  var PREGUNTAS_POR_TEST = 10;
  var ICONOS = ['☀️', '⚡', '🔥'];
  var DESCS  = ['Solo acordes con notas naturales', 'Con sostenidos y bemoles', 'Con dobles alteraciones'];

  /* Mismas clases CSS que acordes-engine.js (tríadas): comparten look & feel. */
  var CSS = [
    '.tm-iv-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-iv-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-iv-wrap .tm-staff{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;min-height:140px;display:flex;justify-content:center;}',
    '.tm-iv-wrap .tm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:10px;margin-top:10px;}',
    '.tm-iv-wrap .tm-opt{font-size:.85rem;font-weight:700;padding:12px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;transition:0.2s;text-align:center;font-family:inherit;}',
    '.tm-iv-wrap .tm-opt.tm-sel{background:#8b6914!important;color:#fff!important;border-color:#8b6914!important;box-shadow:0 4px 10px rgba(139,105,20,0.3);}',
    '.tm-iv-wrap .tm-opt.tm-ok{background:#1c7e46!important;color:#fff!important;border-color:#1c7e46!important;}',
    '.tm-iv-wrap .tm-opt.tm-ko{background:#c0392b!important;color:#fff!important;border-color:#c0392b!important;}',
    '.tm-iv-wrap .tm-submit{width:100%;margin-top:20px;padding:15px;background:#d8d0b8;color:#fff;border:none;border-radius:6px;font-weight:800;cursor:not-allowed;font-family:inherit;}',
    '.tm-iv-wrap .tm-submit.tm-ready{background:#8b6914;cursor:pointer;}',
    '.tm-iv-wrap .tm-fb{display:none;margin-top:15px;padding:15px;border-radius:6px;font-weight:600;}',
    '.tm-iv-wrap .tm-fb.tm-show{display:block;}',
    '.tm-iv-wrap .tm-fb.tm-ok{background:#e8f5e9;color:#2e7d32;}',
    '.tm-iv-wrap .tm-fb.tm-ko{background:#ffebee;color:#c62828;}',
    '.tm-iv-wrap .tm-nxt{display:none;width:100%;margin-top:10px;padding:15px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:inherit;}',
    '.tm-iv-wrap .tm-nxt.tm-show{display:block;}',
    '.tm-iv-wrap .tm-iv-mode-screen{text-align:center;padding:.5rem 0 1rem;}',
    '.tm-iv-wrap .tm-iv-title{font-size:1.35rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e;}',
    '.tm-iv-wrap .tm-iv-subtitle{color:#666;margin:0 0 1.5rem;font-size:.92rem;}',
    '.tm-iv-wrap .tm-iv-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}',
    '.tm-iv-wrap .tm-iv-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.8rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:120px;font-family:inherit;}',
    '.tm-iv-wrap .tm-iv-mode-btn:hover{border-color:#8b6914;background:#fdf8ee;}',
    '.tm-iv-wrap .tm-iv-mode-icon{font-size:1.5rem;line-height:1;}',
    '.tm-iv-wrap .tm-iv-mode-lbl{font-size:.88rem;font-weight:700;color:#1a1a2e;}',
    '.tm-iv-wrap .tm-iv-mode-desc{font-size:.75rem;color:#888;text-align:center;line-height:1.3;}',
    '.tm-iv-wrap .tm-iv-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}',
    '.tm-iv-wrap .tm-iv-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-iv-wrap .tm-iv-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-iv-wrap .tm-iv-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-iv-wrap .tm-iv-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-iv-wrap .tm-iv-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    '.tm-iv-wrap .tm-iv-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-iv-wrap .tm-iv-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-iv-wrap .tm-iv-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '@media(max-width:500px){.tm-iv-wrap .tm-iv-modes{flex-direction:column;align-items:center;}.tm-iv-wrap .tm-iv-mode-btn{width:100%;max-width:220px;}}',
    '.tm-iv-wrap .tm-iv-loupe{position:fixed;display:none;pointer-events:none;z-index:9999;background:#fdfcf9;border:2px solid #333;border-radius:12px;padding:6px 8px;box-shadow:0 8px 28px rgba(0,0,0,0.35);transform:translate(-50%,calc(-100% - 18px));}',
    '.tm-iv-wrap .tm-iv-loupe::after{content:"";position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);border:11px solid transparent;border-top-color:#333;border-bottom:none;}',
    '.tm-iv-wrap .tm-iv-loupe::before{content:"";position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-top-color:#fdfcf9;border-bottom:none;z-index:1;}',
    '.tm-iv-wrap .tm-iv-loupe-staff{line-height:0;}',
    '.tm-iv-wrap .tm-construir-q{text-align:center;font-size:1.05rem;margin:10px 0;}',
    '.tm-iv-wrap .tm-staff-construir{position:relative;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;cursor:crosshair;user-select:none;touch-action:none;overflow:hidden;}',
    '.tm-iv-wrap .tm-staff-construir.tm-answered{cursor:default;}',
    '.tm-iv-wrap .tm-high{position:absolute;left:0;right:0;height:2px;background:rgba(139,105,20,0.45);pointer-events:none;display:none;}',
    '.tm-iv-wrap .tm-tools-row{display:flex;align-items:center;gap:8px;margin:10px 0;flex-wrap:wrap;}',
    '.tm-iv-wrap .tm-tools-acc{display:flex;gap:6px;}',
    '.tm-iv-wrap .tm-tool{font-size:1.1rem;padding:8px 14px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;font-family:inherit;transition:.15s;}',
    '.tm-iv-wrap .tm-tool.tm-active{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-iv-wrap .tm-tools-edit{display:flex;gap:6px;margin-left:auto;}',
    '.tm-iv-wrap .tm-tool-edit{font-size:.82rem;padding:8px 12px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;font-family:inherit;color:#555;transition:.15s;}',
    '.tm-iv-wrap .tm-tool-edit:hover{border-color:#8b6914;color:#8b6914;}',
    '.tm-iv-wrap .tm-note-count{font-size:.82rem;color:#666;margin:4px 0 0;text-align:center;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-iv-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-iv-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* La nota en el formato de tm-mei.js: letra + alteración + / + octava ('f##/4'). */
  function claveMEI(vfn, acc, oct) {
    return vfn + (acc === 2 ? '##' : acc === 1 ? '#' : acc === -1 ? 'b' : acc === -2 ? 'bb' : '') + '/' + oct;
  }
  /* Un acorde de redonda en clave de sol (sin armadura): una fila de tm-mei.js. notas = ['c/4', { key: 'e/4', color }, ...] */
  function filaAcorde(notas) {
    return { pentagramas: [{ clave: 'sol', compases: [[{ notas: notas, d: 'w' }]] }] };
  }
  /* Verovio se carga bajo demanda: el motor arranca cuando ya está. */
  function cargarVerovio(wrap, init) {
    wrap.innerHTML = '<div class="tm-card"><p class="tm-iv-subtitle">Cargando el ejercicio…</p></div>';
    window.tmNotacion.listo().then(init).catch(function () {
      wrap.innerHTML = '<div class="tm-card"><p class="tm-iv-subtitle">No se ha podido cargar el ejercicio. Recarga la página.</p></div>';
    });
  }

  function chordById(id) {
    for (var i = 0; i < CHORDS7.length; i++) if (CHORDS7[i].id === id) return CHORDS7[i];
    return null;
  }

  /* ================================================================
     Motor principal
     config.inversion: 'fundamental' | '1a' | '2a' | '3a' | 'todas'
     config.tipo:      'dominante' | 'sensible' | 'disminuida' | 'todas'/ausente
     config.test:      'construir' -> modo construir; si no, reconocer.
     ================================================================ */
  function tmSe7Engine(containerId, config) {
    injectCSS();
    config = config || {};
    if (config.test === 'construir') { startConstruirMode(containerId, config); return; }
    startReconocerMode(containerId, config);
  }

  /* ---- pickTipo: en construir con tipo fijo, siempre ese; si no, al azar entre los 3 ---- */
  function pickTipo(config) {
    if (config.tipo && config.tipo !== 'todas') {
      var t = chordById(config.tipo);
      if (t) return t;
    }
    return CHORDS7[Math.floor(Math.random() * CHORDS7.length)];
  }

  function pickInv(invType) {
    var idx;
    if (invType === 'fundamental') idx = 0;
    else if (invType === '1a')     idx = 1;
    else if (invType === '2a')     idx = 2;
    else if (invType === '3a')     idx = 3;
    else                           idx = Math.floor(Math.random() * 4);
    return idx;
  }

  /* Calcula (a1..a4) para una tónica n1/a1 y un tipo de acorde de 4 notas,
     buscando (hasta 300 intentos) una tónica/tipo cuyas alteraciones no
     superen la dificultad elegida. */
  function generarAcorde(chord, maxAlt, maxRes, forceNatRoot) {
    var att = 0, n1, a1, n2, n3, n4, nd3, nd5, nd7, a2, a3, a4;
    do {
      n1 = Math.floor(Math.random() * 7);
      a1 = forceNatRoot ? 0 : (maxAlt === 0 ? 0 : (Math.floor(Math.random() * (2 * maxAlt + 1)) - maxAlt));
      n2 = (n1 + 2) % 7; n3 = (n1 + 4) % 7; n4 = (n1 + 6) % 7;
      nd3 = (NS[n2] - NS[n1] + 12) % 12;
      nd5 = (NS[n3] - NS[n1] + 12) % 12;
      nd7 = (NS[n4] - NS[n1] + 12) % 12;
      a2 = chord.third   - nd3 + a1;
      a3 = chord.fifth   - nd5 + a1;
      a4 = chord.seventh - nd7 + a1;
      att++;
    } while ((Math.abs(a1) > maxAlt || Math.abs(a2) > maxRes || Math.abs(a3) > maxRes || Math.abs(a4) > maxRes) && att < 300);
    return { n1: n1, a1: a1, n2: n2, a2: a2, n3: n3, a3: a3, n4: n4, a4: a4 };
  }

  /* Apila [ {n,a}, ... ] en orden ascendente asignando octavas: la primera
     nota (bajo) siempre en oct=4; cada siguiente sube de octava solo si su
     letra no es mayor que la anterior (evita construir escalas al revés). */
  function withOctaves(stack) {
    var out = [], prevOct = 4, prevN = null;
    stack.forEach(function (m, i) {
      var oct = i === 0 ? 4 : ((m.n > prevN) ? prevOct : prevOct + 1);
      out.push({ n: m.n, a: m.a, vfn: VF_NAMES[m.n], oct: oct });
      prevOct = oct; prevN = m.n;
    });
    return out;
  }

  /* Orden de apilamiento (índices 1..4 de un acorde n1..n4) según inversión:
     0 fundamental -> [1,2,3,4] ; 1 (1ª inv) -> [2,3,4,1] ; etc. (rotación) */
  function stackOrder(cQ, inv) {
    var m = [
      { n: cQ.n1, a: cQ.a1 }, { n: cQ.n2, a: cQ.a2 },
      { n: cQ.n3, a: cQ.a3 }, { n: cQ.n4, a: cQ.a4 }
    ];
    var rotated = [];
    for (var i = 0; i < 4; i++) rotated.push(m[(inv + i) % 4]);
    return withOctaves(rotated);
  }

  /* ================================================================
     Modo reconocer (opción múltiple: adivinar el tipo de acorde)
     ================================================================ */
  function startReconocerMode(containerId, config) {
    var invType = config.inversion || 'fundamental';
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;

    var totalQ = PREGUNTAS_POR_TEST;
    var currentQ, score, cQ, selAns, answered, maxAlt;

    function showModeScreen() {
      var btns = DIFICULTADES.map(function (d, i) {
        return '<button class="tm-iv-mode-btn" data-i="' + i + '"><span class="tm-iv-mode-icon">' + ICONOS[i] + '</span><span class="tm-iv-mode-lbl">' + d.lbl + '</span><span class="tm-iv-mode-desc">' + DESCS[i] + '</span></button>';
      }).join('');
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-mode-screen">',
            '<h2 class="tm-iv-title">Test &mdash; ' + invTitleReconocer(invType, 'Acordes de S\xe9ptima') + '</h2>',
            '<p class="tm-iv-subtitle">Elige el nivel de dificultad &mdash; ' + totalQ + ' preguntas</p>',
            '<div class="tm-iv-modes">' + btns + '</div>',
          '</div>',
        '</div>'
      ].join('');
      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          maxAlt = DIFICULTADES[parseInt(btn.dataset.i, 10)].maxAlt;
          currentQ = 0; score = 0;
          startQuiz();
        });
      });
    }

    function startQuiz() {
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-header">',
            '<div class="tm-iv-progress-wrap">',
              '<div class="tm-iv-bar"><div class="tm-iv-fill" id="' + uid + '_fill"></div></div>',
              '<span class="tm-iv-counter" id="' + uid + '_cnt">1 / ' + totalQ + '</span>',
            '</div>',
            '<span class="tm-iv-badge" id="' + uid + '_badge">✓ 0</span>',
          '</div>',
          '<div class="tm-staff"><div id="' + uid + '_not"></div></div>',
          '<div class="tm-grid" id="' + uid + '_opts"></div>',
          '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>',
          '<div id="' + uid + '_fb" class="tm-fb"></div>',
          '<button id="' + uid + '_nxt" class="tm-nxt">Siguiente →</button>',
        '</div>'
      ].join('');
      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);
      nextQ();
    }

    function genQ() {
      var chord = CHORDS7[Math.floor(Math.random() * CHORDS7.length)];
      var maxRes = Math.max(1, maxAlt);
      var a = generarAcorde(chord, maxAlt, maxRes, maxAlt === 0);
      var inv = pickInv(invType);
      cQ = { a: a, chord: chord, inv: inv };
    }

    function drawStaff() {
      var elNot = document.getElementById(uid + '_not');
      elNot.style.width = '100%'; elNot.style.height = '170px';
      var stack = stackOrder(cQ.a, cQ.inv);
      tmNotacion.dibujarAlineado(elNot, filaAcorde(stack.map(function (n) { return claveMEI(n.vfn, n.a, n.oct); })), {
        escala: 1.4, separacion: 0.5, top: 62, id: uid, alt: 'Acorde de cuatro notas en clave de sol'
      });
    }

    function renderOptions() {
      var elOpts = document.getElementById(uid + '_opts');
      var shuffled = CHORDS7.slice().sort(function () { return Math.random() - 0.5; });
      elOpts.innerHTML = shuffled.map(function (t) {
        return '<button class="tm-opt" data-v="' + t.id + '">' + t.label + '</button>';
      }).join('');
      selAns = null;
      document.getElementById(uid + '_btn').classList.remove('tm-ready');
      elOpts.querySelectorAll('.tm-opt').forEach(function (btn) {
        btn.addEventListener('click', function () { selectOpt(btn); });
      });
    }

    function selectOpt(btn) {
      if (answered) return;
      document.getElementById(uid + '_opts').querySelectorAll('.tm-opt').forEach(function (b) { b.classList.remove('tm-sel'); });
      btn.classList.add('tm-sel');
      selAns = btn.dataset.v;
      document.getElementById(uid + '_btn').classList.add('tm-ready');
    }

    function checkAnswer() {
      var elBtn = document.getElementById(uid + '_btn');
      if (!elBtn.classList.contains('tm-ready')) return;
      answered = true;
      elBtn.style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';

      var correct = selAns === cQ.chord.id;
      if (correct) score++;

      var elFb = document.getElementById(uid + '_fb');
      elFb.className = 'tm-fb tm-show ' + (correct ? 'tm-ok' : 'tm-ko');
      if (correct) {
        elFb.textContent = '¡Correcto!';
      } else {
        var extra = invType === 'todas' ? ' (' + INV_LABEL[cQ.inv] + ')' : '';
        elFb.textContent = 'Incorrecto. La respuesta es: ' + cQ.chord.label + extra + '.';
      }
      document.getElementById(uid + '_badge').textContent = '✓ ' + score;
      document.getElementById(uid + '_opts').querySelectorAll('.tm-opt').forEach(function (b) {
        b.disabled = true;
        if (b.dataset.v === cQ.chord.id) b.classList.add('tm-ok');
        else if (b.classList.contains('tm-sel')) b.classList.add('tm-ko');
      });
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++; answered = false;
      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.style.display = ''; elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';
      genQ(); renderOptions(); drawStaff();
    }

    function showResults() {
      var pct = Math.round(score / totalQ * 100);
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-score-box">',
            '<div class="tm-iv-score-num">' + score + '/' + totalQ + '</div>',
            '<div class="tm-iv-score-pct">' + pct + '%</div>',
          '</div>',
          '<button class="tm-submit tm-ready" id="' + uid + '_restart">Hacer otro test</button>',
        '</div>'
      ].join('');
      document.getElementById(uid + '_restart').addEventListener('click', function () {
        currentQ = 0; score = 0; showModeScreen();
      });
    }

    window['tmSe7Debug_' + uid] = function () { return cQ; };
    function init() { showModeScreen(); }
    cargarVerovio(wrap, init);
  }

  /* ================================================================
     Modo construir (dado el bajo, dibujar las otras 3 notas del acorde)
     ================================================================ */
  function startConstruirMode(containerId, config) {
    var invType = config.inversion || 'fundamental';
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;

    var NOTE_NAMES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
    var ACC_SYM = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };

    /* Igual rango que tríadas (G5→B3): el bajo siempre va en oct 4 y, con 4
       notas apiladas por terceras sobre un ciclo de 7 letras, solo hay UN
       salto de octava en toda la pila (verificado), así que como mucho se
       llega a oct 5 — pero, a diferencia de las tríadas (que solo tocan 3
       de las 7 letras y nunca pasan de Sol5), con 4 notas se puede llegar
       a CUALQUIERA de las 7 letras en la oct. 5 (incluidas La5/Si5, que
       tríadas no necesitaba), así que aquí la rejilla cubre la octava 5
       entera. */
    var ROWS = [
      { vfn: 'c', n: 0, oct: 6, line: -2   },
      { vfn: 'b', n: 6, oct: 5, line: -1.5 },
      { vfn: 'a', n: 5, oct: 5, line: -1   },
      { vfn: 'g', n: 4, oct: 5, line: -0.5 },
      { vfn: 'f', n: 3, oct: 5, line:  0   },
      { vfn: 'e', n: 2, oct: 5, line:  0.5 },
      { vfn: 'd', n: 1, oct: 5, line:  1   },
      { vfn: 'c', n: 0, oct: 5, line:  1.5 },
      { vfn: 'b', n: 6, oct: 4, line:  2   },
      { vfn: 'a', n: 5, oct: 4, line:  2.5 },
      { vfn: 'g', n: 4, oct: 4, line:  3   },
      { vfn: 'f', n: 3, oct: 4, line:  3.5 },
      { vfn: 'e', n: 2, oct: 4, line:  4   },
      { vfn: 'd', n: 1, oct: 4, line:  4.5 },
      { vfn: 'c', n: 0, oct: 4, line:  5   },
      { vfn: 'b', n: 6, oct: 3, line:  5.5 }
    ];

    var totalQ = PREGUNTAS_POR_TEST;
    var currentQ, score, maxAlt, cQ, answered, placedNotes, activeTool, lastLoupeKey, currentSvg;

    function tituloConstruir() {
      var tipoLbl = (config.tipo && config.tipo !== 'todas') ? ('la ' + chordById(config.tipo).label) : 'Acordes de S\xe9ptima Mezclados';
      if (invType === 'fundamental') return tipoLbl + ' en Fundamental';
      if (invType === '1a') return tipoLbl + ' en 1\xaa Inversi\xf3n';
      if (invType === '2a') return tipoLbl + ' en 2\xaa Inversi\xf3n';
      if (invType === '3a') return tipoLbl + ' en 3\xaa Inversi\xf3n';
      return tipoLbl + ' — Todas las Posiciones';
    }

    function showModeScreen() {
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-mode-screen">',
            '<h2 class="tm-iv-title">Test — Construir ' + tituloConstruir() + '</h2>',
            '<p class="tm-iv-subtitle">Elige el nivel de dificultad — ' + totalQ + ' preguntas</p>',
            '<div class="tm-iv-modes">',
              DIFICULTADES.map(function (d, i) {
                return '<button class="tm-iv-mode-btn" data-i="' + i + '"><span class="tm-iv-mode-icon">' + ICONOS[i] + '</span><span class="tm-iv-mode-lbl">' + d.lbl + '</span><span class="tm-iv-mode-desc">' + DESCS[i] + '</span></button>';
              }).join(''),
            '</div>',
          '</div>',
        '</div>'
      ].join('');
      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          maxAlt = DIFICULTADES[parseInt(btn.dataset.i, 10)].maxAlt;
          currentQ = 0; score = 0;
          startQuiz();
        });
      });
    }

    function startQuiz() {
      var tools = (maxAlt >= 2
        ? [[-2, '♭♭'], [-1, '♭'], [0, '♮'], [1, '♯'], [2, '♯♯']]
        : [[-1, '♭'], [0, '♮'], [1, '♯']]
      ).map(function (t) { return '<button class="tm-tool" data-acc="' + t[0] + '">' + t[1] + '</button>'; }).join('');

      wrap.innerHTML = [
        '<div class="tm-card" id="' + uid + '_card">',
          '<div class="tm-iv-header">',
            '<div class="tm-iv-progress-wrap">',
              '<div class="tm-iv-bar"><div class="tm-iv-fill" id="' + uid + '_fill"></div></div>',
              '<span class="tm-iv-counter" id="' + uid + '_cnt">1 / ' + totalQ + '</span>',
            '</div>',
            '<span class="tm-iv-badge" id="' + uid + '_badge">✓ 0</span>',
          '</div>',
          '<p class="tm-construir-q" id="' + uid + '_q"></p>',
          '<div class="tm-staff-construir" id="' + uid + '_wrap">',
            '<div id="' + uid + '_not"></div>',
            '<div class="tm-high" id="' + uid + '_high"></div>',
          '</div>',
          '<p class="tm-note-count" id="' + uid + '_nc">Notas colocadas: 0 / 3</p>',
          '<div class="tm-tools-row">',
            '<div class="tm-tools-acc">' + tools + '</div>',
            '<div class="tm-tools-edit">',
              '<button class="tm-tool-edit" id="' + uid + '_undo">↩ Deshacer</button>',
              '<button class="tm-tool-edit" id="' + uid + '_clear">× Limpiar</button>',
            '</div>',
          '</div>',
          '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>',
          '<div class="tm-fb" id="' + uid + '_fb"></div>',
          '<button class="tm-nxt" id="' + uid + '_nxt">Siguiente →</button>',
        '</div>',
        '<div class="tm-iv-loupe" id="' + uid + '_loupe">',
          '<div class="tm-iv-loupe-staff" id="' + uid + '_lstaff"></div>',
        '</div>'
      ].join('');

      activeTool = 0; placedNotes = []; currentSvg = null; lastLoupeKey = null;

      wrap.querySelectorAll('.tm-tool').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeTool = parseInt(btn.dataset.acc, 10);
          lastLoupeKey = null;
          wrap.querySelectorAll('.tm-tool').forEach(function (b) { b.classList.remove('tm-active'); });
          btn.classList.add('tm-active');
        });
      });
      var nat = wrap.querySelector('.tm-tool[data-acc="0"]');
      if (nat) nat.classList.add('tm-active');

      document.getElementById(uid + '_undo').addEventListener('click', function () {
        if (answered || !placedNotes.length) return;
        placedNotes.pop(); drawStaff(); updateBtn();
      });
      document.getElementById(uid + '_clear').addEventListener('click', function () {
        if (answered) return;
        placedNotes = []; drawStaff(); updateBtn();
      });
      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);

      attachInteraction();
      nextQ();
    }

    function genQ() {
      var maxRes = Math.max(1, maxAlt);
      var chord = pickTipo(config);
      var inv_use = invType === 'todas' ? INV_KEYS[Math.floor(Math.random() * 4)] : invType;
      var invIdx = INV_KEYS.indexOf(inv_use);
      var a = generarAcorde(chord, maxAlt, maxRes, maxAlt === 0);
      var stack = stackOrder(a, invIdx);
      /* stack[0] = bajo (dado); stack[1..3] = lo que hay que dibujar */
      cQ = { a: a, chord: chord, inv: inv_use, invIdx: invIdx, bass: stack[0], exp: [stack[1], stack[2], stack[3]] };
    }

    function drawStaff() {
      var elNot = document.getElementById(uid + '_not');
      if (!elNot) return;
      elNot.style.height = '180px';
      var allNotes = [{ vfn: cQ.bass.vfn, oct: cQ.bass.oct, acc: cQ.bass.a }];
      placedNotes.forEach(function (p) { allNotes.push({ vfn: p.vfn, oct: p.oct, acc: p.acc }); });
      allNotes.sort(function (a, b) { return (a.oct * 12 + NS[VF_NAMES.indexOf(a.vfn)]) - (b.oct * 12 + NS[VF_NAMES.indexOf(b.vfn)]); });
      var r = tmNotacion.dibujarAlineado(elNot, filaAcorde(allNotes.map(function (n) { return claveMEI(n.vfn, n.acc, n.oct); })), {
        escala: 1.5, separacion: 0.5, top: 56, id: uid, alt: 'Pentagrama en clave de sol con la nota dada y las que has colocado'
      });
      currentSvg = r.elemento;
    }

    function drawLoupe(row) {
      var elLstaff = document.getElementById(uid + '_lstaff');
      if (!elLstaff) return;
      var key = cQ.bass.vfn + ',' + cQ.bass.oct + ',' + cQ.bass.a + '|' +
        placedNotes.map(function (p) { return p.vfn + p.oct + p.acc; }).join(',') + '|' + row.vfn + row.oct + activeTool;
      if (key === lastLoupeKey) return;
      lastLoupeKey = key;
      var all = [{ vfn: cQ.bass.vfn, oct: cQ.bass.oct, acc: cQ.bass.a, pre: false }];
      placedNotes.forEach(function (p) { all.push({ vfn: p.vfn, oct: p.oct, acc: p.acc, pre: false }); });
      all.push({ vfn: row.vfn, oct: row.oct, acc: activeTool, pre: true });
      all.sort(function (a, b) { return (a.oct * 12 + NS[VF_NAMES.indexOf(a.vfn)] + a.acc) - (b.oct * 12 + NS[VF_NAMES.indexOf(b.vfn)] + b.acc); });
      elLstaff.style.width = (placedNotes.length > 0 ? '260px' : '200px'); elLstaff.style.height = '140px';
      tmNotacion.dibujarAlineado(elLstaff, filaAcorde(all.map(function (n) {
        var k = claveMEI(n.vfn, n.acc, n.oct);
        return n.pre ? { key: k, color: '#8b6914' } : k;
      })), { escala: 1.4, separacion: 0.5, top: 44, id: uid + 'l', alt: '' });
    }

    /* La fila bajo el puntero, medida sobre el pentagrama dibujado (px entre líneas y posición de la línea superior). */
    function getRow(clientY) {
      if (!currentSvg) return ROWS[7];
      var sr = currentSvg.getBoundingClientRect(), g = tmNotacion.geometria(currentSvg);
      if (!sr.width || !g.lineas) return ROWS[7];
      var sp = (g.lineas[4] - g.lineas[0]) / 4;
      var L = (clientY - sr.top - g.lineas[0]) / sp;
      var idx = Math.round((L - ROWS[0].line) * 2);
      return ROWS[Math.max(0, Math.min(ROWS.length - 1, idx))];
    }

    function attachInteraction() {
      var elWrap = document.getElementById(uid + '_wrap');
      var elHigh = document.getElementById(uid + '_high');
      var elLoupe = document.getElementById(uid + '_loupe');
      var isDragging = false, currentBest = null;

      function updatePreview(e) {
        if (!isDragging || answered || !currentSvg) return;
        var clientX = e.touches ? e.changedTouches[0].clientX : e.clientX;
        var clientY = e.touches ? e.changedTouches[0].clientY : e.clientY;
        var row = getRow(clientY);
        currentBest = row;
        var sr = currentSvg.getBoundingClientRect();
        var wr = elWrap.getBoundingClientRect();
        var g = tmNotacion.geometria(currentSvg);
        var lineY = (sr.top - wr.top) + g.lineas[0] + row.line * (g.lineas[4] - g.lineas[0]) / 4;
        elHigh.style.display = 'block';
        elHigh.style.top = (lineY - 1) + 'px';
        elLoupe.style.transform = '';
        elLoupe.style.left = clientX + 'px';
        elLoupe.style.top = clientY + 'px';
        elLoupe.style.display = 'block';
        drawLoupe(row);
        var lr = elLoupe.getBoundingClientRect();
        var pad = 8;
        if (lr.left < pad) elLoupe.style.left = (clientX - lr.left + pad) + 'px';
        else if (lr.right > window.innerWidth - pad) elLoupe.style.left = (clientX - (lr.right - window.innerWidth + pad)) + 'px';
        if (lr.top < pad) elLoupe.style.transform = 'translate(-50%,18px)';
      }

      function startAction(e) {
        if (answered || placedNotes.length >= 3) return;
        isDragging = true; updatePreview(e);
      }
      function endAction() {
        if (!isDragging) return;
        isDragging = false;
        if (currentBest && !answered && placedNotes.length < 3) {
          placedNotes.push({ vfn: currentBest.vfn, oct: currentBest.oct, acc: activeTool });
          drawStaff(); updateBtn(); lastLoupeKey = null;
        }
        currentBest = null;
        elHigh.style.display = 'none';
        elLoupe.style.display = 'none';
      }

      elWrap.addEventListener('mousedown', startAction);
      elWrap.addEventListener('mousemove', function (e) { if (isDragging) updatePreview(e); });
      window.addEventListener('mouseup', endAction);
      elWrap.addEventListener('touchstart', function (e) { e.preventDefault(); startAction(e); }, { passive: false });
      elWrap.addEventListener('touchmove', function (e) { e.preventDefault(); updatePreview(e); }, { passive: false });
      elWrap.addEventListener('touchend', function (e) { e.preventDefault(); endAction(); }, { passive: false });
    }

    function updateBtn() {
      var b = document.getElementById(uid + '_btn');
      var nc = document.getElementById(uid + '_nc');
      if (b) b.classList.toggle('tm-ready', placedNotes.length === 3);
      if (nc) nc.textContent = 'Notas colocadas: ' + placedNotes.length + ' / 3';
    }

    function checkAnswer() {
      var elBtn = document.getElementById(uid + '_btn');
      if (!elBtn || !elBtn.classList.contains('tm-ready') || answered) return;
      answered = true;

      var expected = cQ.exp;
      var used = expected.map(function () { return false; });
      var ok = placedNotes.length === 3 && placedNotes.every(function (p) {
        for (var i = 0; i < expected.length; i++) {
          if (!used[i] && p.vfn === expected[i].vfn && p.oct === expected[i].oct && p.acc === expected[i].a) {
            used[i] = true; return true;
          }
        }
        return false;
      });

      elBtn.style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';
      var elFb = document.getElementById(uid + '_fb');
      var roles = rolesFor(cQ.invIdx);
      var lbls = expected.map(function (e) { return NOTE_NAMES[e.n] + ACC_SYM[String(e.a)]; });

      if (ok) {
        score++;
        elFb.className = 'tm-fb tm-ok tm-show';
        elFb.innerHTML = '<strong>✓ \xa1Correcto!</strong> — ' + roles[0] + ': ' + lbls[0] + ', ' + roles[1] + ': ' + lbls[1] + ', ' + roles[2] + ': ' + lbls[2] + '.';
      } else {
        placedNotes = expected.map(function (e) { return { vfn: e.vfn, oct: e.oct, acc: e.a }; });
        drawStaff();
        elFb.className = 'tm-fb tm-ko tm-show';
        elFb.innerHTML = '<strong>✗ Incorrecto.</strong> La soluci\xf3n: ' + roles[0] + ' ' + lbls[0] + ', ' + roles[1] + ' ' + lbls[1] + ', ' + roles[2] + ' ' + lbls[2] + '.';
      }
      document.getElementById(uid + '_badge').textContent = '✓ ' + score;
      document.getElementById(uid + '_wrap').classList.add('tm-answered');
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++; answered = false; placedNotes = []; lastLoupeKey = null; currentSvg = null;
      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.style.display = ''; elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';
      document.getElementById(uid + '_wrap').classList.remove('tm-answered');
      genQ();
      document.getElementById(uid + '_nc').textContent = 'Notas colocadas: 0 / 3';
      var rootLbl = NOTE_NAMES[cQ.a.n1] + ACC_SYM[String(cQ.a.a1)];
      var roles = rolesFor(cQ.invIdx);
      var invSuffix = cQ.inv === 'fundamental' ? '' : ' (' + INV_LABEL[cQ.invIdx].replace('inversión', 'inv.') + ')';
      var tipoLbl = config.tipo && config.tipo !== 'todas' ? '' : (' — ' + cQ.chord.label);
      document.getElementById(uid + '_q').innerHTML =
        'Dibuja la ' + roles[0] + ', la ' + roles[1] + ' y la ' + roles[2] + ' del acorde' + invSuffix + ': <strong>' + rootLbl + ' — ' + cQ.chord.short + tipoLbl + '</strong>';
      drawStaff();
    }

    function showResults() {
      var pct = Math.round(score / totalQ * 100);
      var loupe = document.getElementById(uid + '_loupe');
      if (loupe) loupe.style.display = 'none';
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-score-box">',
            '<div class="tm-iv-score-num">' + score + '/' + totalQ + '</div>',
            '<div class="tm-iv-score-pct">' + pct + '%</div>',
          '</div>',
          '<button class="tm-submit tm-ready" id="' + uid + '_restart">Hacer otro test</button>',
        '</div>'
      ].join('');
      document.getElementById(uid + '_restart').addEventListener('click', function () {
        currentQ = 0; score = 0; showModeScreen();
      });
    }

    window['tmSe7Debug_' + uid] = function () { return cQ; };
    function init() { showModeScreen(); }
    cargarVerovio(wrap, init);
  }

  window.tmSe7Engine = tmSe7Engine;
  window.tmSe7Chords = CHORDS7; /* para reutilizar en fichas/verificador */
})();
