/* Motor — Test de articulación musical (legato, staccato, acento, tenuto,
   marcato). Dos sentidos, como pidió Eduardo: se da el NOMBRE y hay que
   elegir el SIGNO (dibujado en el pentagrama), o al revés. Reutiliza los
   mismos códigos de articulación VexFlow que generate-articulacion.js (que
   generó las imágenes de la página de diccionario), así el signo dibujado
   aquí es idéntico al de esa página. */
(function () {
  'use strict';

  var ARTICULACIONES = [
    { id: 'legato',   nombre: 'Legato',   art: 'slur', efecto: 'Notas unidas, sin separación' },
    { id: 'staccato', nombre: 'Staccato', art: 'a.',   efecto: 'Notas cortas y separadas' },
    { id: 'acento',   nombre: 'Acento',   art: 'a>',   efecto: 'Nota atacada con más fuerza' },
    { id: 'tenuto',   nombre: 'Tenuto',   art: 'a-',   efecto: 'Mantener la nota toda su duración, con peso' },
    { id: 'marcato',  nombre: 'Marcato',  art: 'a^',   efecto: 'Muy marcado y enérgico' }
  ];

  var MODOS = [
    { id: 'n2s', lbl: 'Nombre → Signo', desc: 'Se da el nombre, elige el signo dibujado' },
    { id: 's2n', lbl: 'Signo → Nombre', desc: 'Se dibuja el signo, elige el nombre' },
    { id: 'mix', lbl: 'Mezclado', desc: 'Los dos sentidos, al azar' }
  ];

  var ICONOS = ['🔤', '🎼', '🔀'];

  function shuffled(arr) { return arr.slice().sort(function () { return Math.random() - 0.5; }); }

  /* En el modo mezclado cada articulación aparece dos veces en la cola
     (una por cada sentido), así que una baraja al azar sin más puede
     dejar la misma articulación en dos preguntas seguidas. Se reintenta
     la baraja hasta que no haya dos elementos adyacentes de la misma
     articulación (con solo 5 articulaciones y como mucho 2 repeticiones
     cada una, casi siempre se consigue en el primer o segundo intento). */
  function sinRepetirSeguidas(combos) {
    for (var intento = 0; intento < 100; intento++) {
      var arr = shuffled(combos);
      var ok = true;
      for (var i = 1; i < arr.length; i++) {
        if (arr[i].art.id === arr[i - 1].art.id) { ok = false; break; }
      }
      if (ok) return arr;
    }
    return arr;
  }

  var CSS = [
    '.tm-iv-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-iv-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-iv-wrap .tm-staff{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;min-height:100px;display:flex;justify-content:center;align-items:center;}',
    '.tm-iv-wrap .tm-construir-q{text-align:center;font-size:1.15rem;font-weight:700;margin:10px 0;color:#1a1a2e;}',
    '.tm-iv-wrap .tm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-top:10px;}',
    '.tm-iv-wrap .tm-grid-signos{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-top:10px;}',
    '.tm-iv-wrap .tm-grid-list{display:flex;flex-direction:column;gap:10px;margin-top:10px;}',
    '.tm-iv-wrap .tm-opt{font-size:.9rem;font-weight:700;padding:12px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;transition:0.2s;text-align:center;font-family:inherit;}',
    '.tm-iv-wrap .tm-opt-signo{padding:4px;border:1px solid #d8d0b8;background:#fdfcf9;cursor:pointer;border-radius:6px;transition:0.2s;}',
    '.tm-iv-wrap .tm-opt-signo .tm-mini{background:#fff;border-radius:4px;}',
    '.tm-iv-wrap .tm-opt.tm-sel,.tm-iv-wrap .tm-opt-signo.tm-sel{background:#8b6914!important;border-color:#8b6914!important;box-shadow:0 4px 10px rgba(139,105,20,0.3);}',
    '.tm-iv-wrap .tm-opt-signo.tm-sel{outline:3px solid #8b6914;}',
    '.tm-iv-wrap .tm-opt.tm-ok,.tm-iv-wrap .tm-opt-signo.tm-ok{background:#27ae60!important;border-color:#27ae60!important;}',
    '.tm-iv-wrap .tm-opt-signo.tm-ok{outline:3px solid #27ae60;}',
    '.tm-iv-wrap .tm-opt.tm-ko,.tm-iv-wrap .tm-opt-signo.tm-ko{background:#c0392b!important;border-color:#c0392b!important;}',
    '.tm-iv-wrap .tm-opt-signo.tm-ko{outline:3px solid #c0392b;}',
    '.tm-iv-wrap .tm-opt.tm-sel{color:#fff!important;}',
    '.tm-iv-wrap .tm-opt-signo svg{display:block;width:100%;height:auto;pointer-events:none;}',
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
    '.tm-iv-wrap .tm-iv-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.8rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:150px;font-family:inherit;}',
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

  function porId(id) { return ARTICULACIONES.filter(function (a) { return a.id === id; })[0]; }

  function dibujarMini(div, artId) {
    if (typeof Vex === 'undefined') return;
    div.innerHTML = '';
    var V = Vex.Flow;
    var w = 150, h = 130;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(w, h);
    var ctx = r.getContext();
    var stave = new V.Stave(4, 6, w - 12);
    stave.addClef('treble').setContext(ctx).draw();
    var art = porId(artId);
    /* Notas bajo la 3.ª línea => plicas arriba => el signo va bajo la
       cabeza (lado opuesto a la plica), igual criterio que la página de
       diccionario. */
    var keys = ['e/4', 'g/4'];
    var notes = keys.map(function (k) { return new V.StaveNote({ keys: [k], duration: 'q', clef: 'treble' }); });
    if (art.art !== 'slur') {
      notes.forEach(function (n) { n.addModifier(new V.Articulation(art.art).setPosition(V.Modifier.Position.BELOW)); });
    }
    var voice = new V.Voice({ num_beats: 2, beat_value: 4 });
    voice.setMode(V.Voice.Mode.SOFT); voice.addTickables(notes);
    new V.Formatter().joinVoices([voice]).format([voice], w - 60);
    voice.draw(ctx, stave);
    if (art.art === 'slur') {
      new V.Curve(notes[0], notes[1], { cps: [{ x: 0, y: 18 }, { x: 0, y: 18 }] }).setContext(ctx).draw();
    }
    var svg = div.querySelector('svg');
    if (svg) { svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h); svg.style.width = '100%'; svg.style.height = 'auto'; }
  }

  function tmArticulacionEngine(containerId, config) {
    injectCSS();
    config = config || {};

    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;

    var totalQ, queue;
    var currentQ, score, cQ, selAns, answered, modoElegido;

    /* Solo hay 5 articulaciones: para que no se repitan, la cola de
       preguntas cubre cada combinación (articulación, sentido) una sola
       vez — 5 preguntas en un sentido único, 10 en el mezclado. */
    function buildQueue(modo) {
      var sentidos = modo === 'mix' ? ['n2s', 's2n'] : [modo];
      var combos = [];
      sentidos.forEach(function (s) {
        ARTICULACIONES.forEach(function (a) { combos.push({ art: a, sentido: s }); });
      });
      return sinRepetirSeguidas(combos);
    }

    function showModeScreen() {
      var btns = MODOS.map(function (m, i) {
        var n = (m.id === 'mix' ? ARTICULACIONES.length * 2 : ARTICULACIONES.length);
        return '<button class="tm-iv-mode-btn" data-i="' + i + '"><span class="tm-iv-mode-icon">' + ICONOS[i] + '</span><span class="tm-iv-mode-lbl">' + m.lbl + '</span><span class="tm-iv-mode-desc">' + m.desc + ' · ' + n + ' preguntas</span></button>';
      }).join('');
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-mode-screen">',
            '<h2 class="tm-iv-title">Test — Articulación Musical</h2>',
            '<p class="tm-iv-subtitle">Elige el sentido del test — sin preguntas repetidas</p>',
            '<div class="tm-iv-modes">' + btns + '</div>',
          '</div>',
        '</div>'
      ].join('');
      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          modoElegido = MODOS[parseInt(btn.dataset.i, 10)].id;
          queue = buildQueue(modoElegido);
          totalQ = queue.length;
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
          '<p class="tm-construir-q" id="' + uid + '_q"></p>',
          '<div class="tm-staff" id="' + uid + '_staff"></div>',
          '<div id="' + uid + '_opts"></div>',
          '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>',
          '<div id="' + uid + '_fb" class="tm-fb"></div>',
          '<button id="' + uid + '_nxt" class="tm-nxt">Siguiente →</button>',
        '</div>'
      ].join('');
      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);
      nextQ();
    }

    function genQ() { cQ = queue[currentQ - 1]; }

    function renderPregunta() {
      var elStaff = document.getElementById(uid + '_staff');
      var elQ = document.getElementById(uid + '_q');
      var elOpts = document.getElementById(uid + '_opts');
      selAns = null;
      document.getElementById(uid + '_btn').classList.remove('tm-ready');

      if (cQ.sentido === 'n2s') {
        elQ.textContent = '¿Cuál es el signo de ' + cQ.art.nombre.toUpperCase() + '?';
        elStaff.innerHTML = '';
        elStaff.style.display = 'none';
        var opciones = shuffled(ARTICULACIONES);
        elOpts.className = 'tm-grid-signos';
        elOpts.innerHTML = opciones.map(function (a) {
          return '<div class="tm-opt-signo" data-v="' + a.id + '"><div class="tm-mini" id="' + uid + '_mini_' + a.id + '"></div></div>';
        }).join('');
        opciones.forEach(function (a) { dibujarMini(document.getElementById(uid + '_mini_' + a.id), a.id); });
        elOpts.querySelectorAll('.tm-opt-signo').forEach(function (btn) {
          btn.addEventListener('click', function () { selectOpt(btn); });
        });
      } else {
        elQ.textContent = '¿Cómo se llama esta articulación?';
        elStaff.style.display = 'flex';
        elStaff.innerHTML = '<div id="' + uid + '_qmini" style="width:150px;"></div>';
        dibujarMini(document.getElementById(uid + '_qmini'), cQ.art.id);
        var opcionesN = shuffled(ARTICULACIONES);
        elOpts.className = 'tm-grid';
        elOpts.innerHTML = opcionesN.map(function (a) {
          return '<button class="tm-opt" data-v="' + a.id + '">' + a.nombre + '</button>';
        }).join('');
        elOpts.querySelectorAll('.tm-opt').forEach(function (btn) {
          btn.addEventListener('click', function () { selectOpt(btn); });
        });
      }
    }

    function selectOpt(btn) {
      if (answered) return;
      document.getElementById(uid + '_opts').querySelectorAll('[data-v]').forEach(function (b) { b.classList.remove('tm-sel'); });
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

      var correcto = selAns === cQ.art.id;
      if (correcto) score++;

      var elFb = document.getElementById(uid + '_fb');
      elFb.className = 'tm-fb tm-show ' + (correcto ? 'tm-ok' : 'tm-ko');
      elFb.innerHTML = correcto
        ? ('<strong>¡Correcto!</strong> ' + cQ.art.nombre + ': ' + cQ.art.efecto + '.')
        : ('<strong>Incorrecto.</strong> Era ' + cQ.art.nombre + ': ' + cQ.art.efecto + '.');

      document.getElementById(uid + '_badge').textContent = '✓ ' + score;

      document.getElementById(uid + '_opts').querySelectorAll('[data-v]').forEach(function (b) {
        b.style.pointerEvents = 'none';
        if (b.dataset.v === cQ.art.id) b.classList.add('tm-ok');
        else if (b.classList.contains('tm-sel')) b.classList.add('tm-ko');
      });
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++;
      answered = false;

      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.style.display = '';
      elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';

      genQ();
      renderPregunta();
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

    function init() { showModeScreen(); }
    if (typeof Vex !== 'undefined') { init(); }
    else { window.addEventListener('vexflow-ready', init, { once: true }); }
  }

  /* ---- Segundo test: definición <-> nombre (sin pentagrama) ---- */
  var MODOS_DEF = [
    { id: 'n2d', lbl: 'Nombre → Definición', desc: 'Se da el nombre, elige qué significa' },
    { id: 'd2n', lbl: 'Definición → Nombre', desc: 'Se da el significado, elige el nombre' },
    { id: 'mix', lbl: 'Mezclado', desc: 'Los dos sentidos, al azar' }
  ];
  var ICONOS_DEF = ['🔤', '📖', '🔀'];

  function tmArticulacionDefEngine(containerId) {
    injectCSS();

    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;

    var totalQ, queue;
    var currentQ, score, cQ, selAns, answered, modoElegido;

    /* Solo hay 5 articulaciones: para que no se repitan, la cola de
       preguntas cubre cada combinación (articulación, sentido) una sola
       vez — 5 preguntas en un sentido único, 10 en el mezclado. */
    function buildQueue(modo) {
      var sentidos = modo === 'mix' ? ['n2d', 'd2n'] : [modo];
      var combos = [];
      sentidos.forEach(function (s) {
        ARTICULACIONES.forEach(function (a) { combos.push({ art: a, sentido: s }); });
      });
      return sinRepetirSeguidas(combos);
    }

    function showModeScreen() {
      var btns = MODOS_DEF.map(function (m, i) {
        var n = (m.id === 'mix' ? ARTICULACIONES.length * 2 : ARTICULACIONES.length);
        return '<button class="tm-iv-mode-btn" data-i="' + i + '"><span class="tm-iv-mode-icon">' + ICONOS_DEF[i] + '</span><span class="tm-iv-mode-lbl">' + m.lbl + '</span><span class="tm-iv-mode-desc">' + m.desc + ' · ' + n + ' preguntas</span></button>';
      }).join('');
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-mode-screen">',
            '<h2 class="tm-iv-title">Test — Definiciones de Articulación</h2>',
            '<p class="tm-iv-subtitle">Elige el sentido del test — sin preguntas repetidas</p>',
            '<div class="tm-iv-modes">' + btns + '</div>',
          '</div>',
        '</div>'
      ].join('');
      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          modoElegido = MODOS_DEF[parseInt(btn.dataset.i, 10)].id;
          queue = buildQueue(modoElegido);
          totalQ = queue.length;
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
          '<p class="tm-construir-q" id="' + uid + '_q"></p>',
          '<div id="' + uid + '_opts"></div>',
          '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>',
          '<div id="' + uid + '_fb" class="tm-fb"></div>',
          '<button id="' + uid + '_nxt" class="tm-nxt">Siguiente →</button>',
        '</div>'
      ].join('');
      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);
      nextQ();
    }

    function genQ() { cQ = queue[currentQ - 1]; }

    function renderPregunta() {
      var elQ = document.getElementById(uid + '_q');
      var elOpts = document.getElementById(uid + '_opts');
      selAns = null;
      document.getElementById(uid + '_btn').classList.remove('tm-ready');

      if (cQ.sentido === 'n2d') {
        elQ.textContent = '¿Cuál es el efecto de ' + cQ.art.nombre.toUpperCase() + '?';
        elOpts.className = 'tm-grid-list';
        elOpts.innerHTML = shuffled(ARTICULACIONES).map(function (a) {
          return '<button class="tm-opt" data-v="' + a.id + '">' + a.efecto + '</button>';
        }).join('');
      } else {
        elQ.innerHTML = '¿Qué articulación tiene este efecto?<br>«' + cQ.art.efecto + '»';
        elOpts.className = 'tm-grid';
        elOpts.innerHTML = shuffled(ARTICULACIONES).map(function (a) {
          return '<button class="tm-opt" data-v="' + a.id + '">' + a.nombre + '</button>';
        }).join('');
      }
      elOpts.querySelectorAll('.tm-opt').forEach(function (btn) {
        btn.addEventListener('click', function () { selectOpt(btn); });
      });
    }

    function selectOpt(btn) {
      if (answered) return;
      document.getElementById(uid + '_opts').querySelectorAll('[data-v]').forEach(function (b) { b.classList.remove('tm-sel'); });
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

      var correcto = selAns === cQ.art.id;
      if (correcto) score++;

      var elFb = document.getElementById(uid + '_fb');
      elFb.className = 'tm-fb tm-show ' + (correcto ? 'tm-ok' : 'tm-ko');
      elFb.innerHTML = correcto
        ? ('<strong>¡Correcto!</strong> ' + cQ.art.nombre + ': ' + cQ.art.efecto + '.')
        : ('<strong>Incorrecto.</strong> Era ' + cQ.art.nombre + ': ' + cQ.art.efecto + '.');

      document.getElementById(uid + '_badge').textContent = '✓ ' + score;

      document.getElementById(uid + '_opts').querySelectorAll('[data-v]').forEach(function (b) {
        b.style.pointerEvents = 'none';
        if (b.dataset.v === cQ.art.id) b.classList.add('tm-ok');
        else if (b.classList.contains('tm-sel')) b.classList.add('tm-ko');
      });
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++;
      answered = false;

      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.style.display = '';
      elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';

      genQ();
      renderPregunta();
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

    showModeScreen();
  }

  window.tmArticulacionEngine = tmArticulacionEngine;
  window.tmArticulacionDefEngine = tmArticulacionDefEngine;
  window.tmArticulaciones = ARTICULACIONES;
})();
