/* Motor de ejercicios de acordes tríada — v1 */
(function () {
  'use strict';

  /* Semitonos desde C para cada nota diatónica */
  var NS = [0, 2, 4, 5, 7, 9, 11]; /* C D E F G A B */
  var VF_NAMES = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

  /*
   * Definición de los 4 tipos de tríada:
   *   third = semitonos de la 3ª sobre la fundamental
   *   fifth = semitonos de la 5ª sobre la fundamental
   */
  var TRIADS = [
    { id: 'mayor', third: 4, fifth: 7, label: 'Perfecta Mayor' },
    { id: 'menor', third: 3, fifth: 7, label: 'Perfecta menor' },
    { id: 'dis',   third: 3, fifth: 6, label: '5\xaa Disminuida'  },
    { id: 'aum',   third: 4, fifth: 8, label: '5\xaa Aumentada'   }
  ];

  /*
   * Dificultades — maxAlt controla el máximo de alteraciones
   * permitidas en cualquiera de las tres notas del acorde:
   *   Fácil:    |a| = 0 → solo notas naturales
   *   Medio:    |a| ≤ 1 → hasta # / b
   *   Difícil:  |a| ≤ 2 → hasta ## / bb
   */
  var DIFICULTADES = [
    { lbl: 'F\xe1cil',    maxAlt: 0, id: 'easy'   },
    { lbl: 'Medio',       maxAlt: 1, id: 'medium' },
    { lbl: 'Dif\xedcil', maxAlt: 2, id: 'hard'   }
  ];

  var PREGUNTAS_POR_TEST = 10;
  var ICONOS = ['☀️', '⚡', '🔥'];
  var DESCS  = ['Solo acordes con notas naturales', 'Con sostenidos y bemoles', 'Con dobles alteraciones'];

  /* ---- CSS (reutiliza clases tm-iv-* del motor de intervalos) ---- */
  var CSS = [
    '.tm-iv-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-iv-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-iv-wrap .tm-staff{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;min-height:140px;display:flex;justify-content:center;}',
    '.tm-iv-wrap .tm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:10px;margin-top:10px;}',
    '.tm-iv-wrap .tm-opt{font-size:.85rem;font-weight:700;padding:12px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;transition:0.2s;text-align:center;font-family:inherit;}',
    '.tm-iv-wrap .tm-opt.tm-sel{background:#8b6914!important;color:#fff!important;border-color:#8b6914!important;box-shadow:0 4px 10px rgba(139,105,20,0.3);}',
    '.tm-iv-wrap .tm-opt.tm-ok{background:#27ae60!important;color:#fff!important;border-color:#27ae60!important;}',
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
    '@media(max-width:500px){.tm-iv-wrap .tm-iv-modes{flex-direction:column;align-items:center;}.tm-iv-wrap .tm-iv-mode-btn{width:100%;max-width:220px;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-iv-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-iv-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ---- Convierte alteración numérica a cadena VexFlow ---- */
  function accStr(a) {
    if (a ===  2) return '##';
    if (a ===  1) return '#';
    if (a === -1) return 'b';
    if (a === -2) return 'bb';
    return null;
  }

  /* ---- Convierte alteración a texto legible ---- */
  function accLabel(a) {
    if (a ===  2) return '×';
    if (a ===  1) return '#';
    if (a === -1) return '♭';
    if (a === -2) return '\ud83d';
    return '';
  }

  /* ---- Motor principal ---- */
  function tmAcEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;

    var totalQ = PREGUNTAS_POR_TEST;
    var currentQ, score, cQ, selAns, answered, maxAlt;

    /* ---- Pantalla de selección de dificultad ---- */
    function showModeScreen() {
      var btns = DIFICULTADES.map(function (d, i) {
        return [
          '<button class="tm-iv-mode-btn" data-i="' + i + '">',
            '<span class="tm-iv-mode-icon">' + ICONOS[i] + '</span>',
            '<span class="tm-iv-mode-lbl">' + d.lbl + '</span>',
            '<span class="tm-iv-mode-desc">' + DESCS[i] + '</span>',
          '</button>'
        ].join('');
      }).join('');

      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-mode-screen">',
            '<h2 class="tm-iv-title">Test de Tr\xedadas en Fundamental</h2>',
            '<p class="tm-iv-subtitle">Elige el nivel de dificultad &mdash; ' + totalQ + ' preguntas</p>',
            '<div class="tm-iv-modes">' + btns + '</div>',
          '</div>',
        '</div>'
      ].join('');

      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var d = DIFICULTADES[parseInt(btn.dataset.i, 10)];
          maxAlt   = d.maxAlt;
          currentQ = 0;
          score    = 0;
          startQuiz();
        });
      });
    }

    /* ---- Pantalla de quiz ---- */
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

    /* ---- Genera una pregunta válida para la dificultad actual ---- */
    function genQ() {
      var attempts = 0;
      var n1, a1, triad, n2, n3, nd3, nd5, a2, a3;

      do {
        n1    = Math.floor(Math.random() * 7);
        /* Para easy solo naturales; medio ±1; difícil ±2 */
        var maxA1 = maxAlt;
        a1    = Math.floor(Math.random() * (2 * maxA1 + 1)) - maxA1;
        triad = TRIADS[Math.floor(Math.random() * TRIADS.length)];

        n2 = (n1 + 2) % 7;
        n3 = (n1 + 4) % 7;

        /* Distancia natural en semitonos desde la fundamental */
        nd3 = NS[n2] - NS[n1]; if (nd3 < 0) nd3 += 12;
        nd5 = NS[n3] - NS[n1]; if (nd5 < 0) nd5 += 12;

        /*
         * Alteraciones necesarias en la 3ª y 5ª:
         * pitch(n2) + a2 - (pitch(n1) + a1) = triad.third
         * => a2 = triad.third - nd3 + a1
         */
        a2 = triad.third - nd3 + a1;
        a3 = triad.fifth - nd5 + a1;

        attempts++;
      } while ((Math.abs(a1) > maxAlt || Math.abs(a2) > maxAlt || Math.abs(a3) > maxAlt) && attempts < 300);

      cQ = { n1: n1, a1: a1, n2: n2, a2: a2, n3: n3, a3: a3, triad: triad };
    }

    /* ---- Dibuja el acorde en el pentagrama con VexFlow ---- */
    function drawStaff() {
      var elNot = document.getElementById(uid + '_not');
      elNot.innerHTML = '';
      var V = Vex.Flow;
      var r = new V.Renderer(elNot, V.Renderer.Backends.SVG);
      r.resize(300, 130);
      var ctx = r.getContext();
      var stave = new V.Stave(10, 10, 280);
      stave.addClef('treble').setContext(ctx).draw();

      var n1 = cQ.n1, n2 = cQ.n2, n3 = cQ.n3;

      /* Cálculo de octavas — apilamos el acorde ascendentemente desde oct 4 */
      var oct1 = 4;
      var oct2 = (n2 > n1) ? 4 : 5;
      var oct3 = (n3 > n2) ? oct2 : (oct2 + 1);

      var key1 = VF_NAMES[n1] + '/' + oct1;
      var key2 = VF_NAMES[n2] + '/' + oct2;
      var key3 = VF_NAMES[n3] + '/' + oct3;

      var chord = new V.StaveNote({ keys: [key1, key2, key3], duration: 'w' });
      var acc1 = accStr(cQ.a1), acc2 = accStr(cQ.a2), acc3 = accStr(cQ.a3);
      if (acc1) chord.addModifier(new V.Accidental(acc1), 0);
      if (acc2) chord.addModifier(new V.Accidental(acc2), 1);
      if (acc3) chord.addModifier(new V.Accidental(acc3), 2);

      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([chord]);
      new V.Formatter().joinVoices([voice]).format([voice], 180);
      voice.draw(ctx, stave);
    }

    /* ---- Renderiza los 4 botones de opción ---- */
    function renderOptions() {
      var elOpts = document.getElementById(uid + '_opts');
      /* Mezcla las opciones para que no siempre estén en el mismo orden */
      var shuffled = TRIADS.slice().sort(function () { return Math.random() - 0.5; });
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
      document.getElementById(uid + '_opts').querySelectorAll('.tm-opt').forEach(function (b) {
        b.classList.remove('tm-sel');
      });
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

      var correct = selAns === cQ.triad.id;
      if (correct) score++;

      var elFb = document.getElementById(uid + '_fb');
      elFb.className = 'tm-fb tm-show ' + (correct ? 'tm-ok' : 'tm-ko');
      elFb.textContent = correct
        ? '¡Correcto!'
        : 'Incorrecto. La respuesta es: ' + cQ.triad.label + '.';

      document.getElementById(uid + '_badge').textContent = '✓ ' + score;

      document.getElementById(uid + '_opts').querySelectorAll('.tm-opt').forEach(function (b) {
        b.disabled = true;
        if (b.dataset.v === cQ.triad.id) b.classList.add('tm-ok');
        else if (b.classList.contains('tm-sel')) b.classList.add('tm-ko');
      });
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++;
      answered = false;

      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent  = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.style.display = '';
      elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';

      genQ();
      renderOptions();
      drawStaff();
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
        currentQ = 0; score = 0;
        showModeScreen();
      });
    }

    function init() {
      showModeScreen();
    }

    if (typeof Vex !== 'undefined') {
      init();
    } else {
      window.addEventListener('vexflow-ready', init, { once: true });
    }
  }

  window.tmAcEngine = tmAcEngine;
})();
