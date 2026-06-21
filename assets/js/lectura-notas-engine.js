/* Motor de ejercicio "¿Qué nota es?" — lectura de notas en las claves.
   Uso:  <div id="tmnotas1"></div>
         <script>tmNotasEngine('tmnotas1', { clave:'sol' });</script>
   config.clave: 'sol' | 'fa' | 'do3' | 'todas' (por defecto 'todas' = pantalla de selección) */
(function () {
  'use strict';

  var VF_NAMES = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];          /* índice diatónico */
  var NOTE_NAMES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si']; /* mismo índice */

  /* Cada clave: clef de VexFlow + rango de notas naturales (índice diatónico oct*7+letra) */
  var CLAVES = {
    sol2: { id: 'sol2', label: 'Clave de Sol',        clef: 'treble',        icon: '𝄞', lo: di('c', 4), hi: di('a', 5) },
    fa3:  { id: 'fa3',  label: 'Clave de Fa en 3ª',   clef: 'baritone-f',    icon: '𝄢', lo: di('g', 2), hi: di('e', 4) },
    fa4:  { id: 'fa4',  label: 'Clave de Fa en 4ª',   clef: 'bass',          icon: '𝄢', lo: di('e', 2), hi: di('c', 4) },
    do1:  { id: 'do1',  label: 'Clave de Do en 1ª',   clef: 'soprano',       icon: '𝄡', lo: di('a', 3), hi: di('e', 5) },
    do2:  { id: 'do2',  label: 'Clave de Do en 2ª',   clef: 'mezzo-soprano', icon: '𝄡', lo: di('a', 3), hi: di('d', 5) },
    do3:  { id: 'do3',  label: 'Clave de Do en 3ª',   clef: 'alto',          icon: '𝄡', lo: di('d', 3), hi: di('c', 5) },
    do4:  { id: 'do4',  label: 'Clave de Do en 4ª',   clef: 'tenor',         icon: '𝄡', lo: di('c', 3), hi: di('c', 5) }
  };
  var CLAVE_ORDER = ['sol2', 'fa3', 'fa4', 'do1', 'do2', 'do3', 'do4'];

  /* Nota de la línea SUPERIOR del pentagrama en cada clave (índice diatónico).
     Permite mapear posición visual ↔ nota en cualquier clave. */
  var TOPLINE = {
    sol2: di('f', 5), fa3: di('c', 4), fa4: di('a', 3),
    do1:  di('d', 5), do2: di('b', 4), do3: di('g', 4), do4: di('e', 4)
  };

  var PREGUNTAS_POR_TEST = 10;

  function di(vfn, oct) { return oct * 7 + VF_NAMES.indexOf(vfn); }
  function vfnOf(idx) { return VF_NAMES[((idx % 7) + 7) % 7]; }
  function octOf(idx) { return Math.floor(idx / 7); }
  function letterIdx(idx) { return ((idx % 7) + 7) % 7; }

  var CSS = [
    '.tm-iv-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-iv-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-iv-wrap .tm-staff{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;min-height:150px;display:flex;justify-content:center;align-items:center;}',
    '.tm-iv-wrap .tm-staff svg{max-width:100%;height:auto;}',
    '.tm-iv-wrap .tm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:10px;margin-top:10px;}',
    '.tm-iv-wrap .tm-opt{font-size:1rem;font-weight:700;padding:14px 8px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;transition:0.2s;text-align:center;font-family:inherit;}',
    '.tm-iv-wrap .tm-opt.tm-sel{background:#8b6914!important;color:#fff!important;border-color:#8b6914!important;box-shadow:0 4px 10px rgba(139,105,20,0.3);}',
    '.tm-iv-wrap .tm-opt.tm-ok{background:#27ae60!important;color:#fff!important;border-color:#27ae60!important;}',
    '.tm-iv-wrap .tm-opt.tm-ko{background:#c0392b!important;color:#fff!important;border-color:#c0392b!important;}',
    '.tm-iv-wrap .tm-opt:disabled{cursor:default;}',
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
    '.tm-iv-wrap .tm-iv-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.4rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:110px;font-family:inherit;}',
    '.tm-iv-wrap .tm-iv-mode-btn:hover{border-color:#8b6914;background:#fdf8ee;}',
    '.tm-iv-wrap .tm-iv-mode-icon{font-size:1.7rem;line-height:1;}',
    '.tm-iv-wrap .tm-iv-mode-lbl{font-size:.88rem;font-weight:700;color:#1a1a2e;}',
    '.tm-iv-wrap .tm-iv-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}',
    '.tm-iv-wrap .tm-iv-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-iv-wrap .tm-iv-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-iv-wrap .tm-iv-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-iv-wrap .tm-iv-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-iv-wrap .tm-iv-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    '.tm-iv-wrap .tm-iv-clave-tag{text-align:center;font-weight:700;color:#8b6914;margin:0 0 -6px;font-size:.9rem;}',
    '.tm-iv-wrap .tm-iv-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-iv-wrap .tm-iv-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-iv-wrap .tm-iv-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '@media(max-width:500px){.tm-iv-wrap .tm-iv-modes{flex-direction:column;align-items:center;}.tm-iv-wrap .tm-iv-mode-btn{width:100%;max-width:220px;}}',
    '.tm-iv-wrap .tm-tgt{text-align:center;font-size:1.15rem;margin:8px 0 -4px;}',
    '.tm-iv-wrap .tm-hint{text-align:center;font-size:.82rem;color:#888;margin:6px 0 0;}',
    '.tm-iv-wrap .tm-staff-construir{position:relative;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;cursor:crosshair;user-select:none;touch-action:none;overflow:hidden;min-height:100px;}',
    '.tm-iv-wrap .tm-staff-construir.tm-answered{cursor:default;}',
    '.tm-iv-wrap .tm-staff-construir svg{max-width:100%;height:auto;display:block;margin:0 auto;}',
    '.tm-iv-wrap .tm-high{position:absolute;left:0;right:0;height:2px;background:rgba(139,105,20,0.45);pointer-events:none;display:none;}',
    '.tm-iv-wrap .tm-iv-loupe{position:fixed;display:none;pointer-events:none;z-index:9999;background:#fdfcf9;border:2px solid #333;border-radius:12px;padding:6px 8px;box-shadow:0 8px 28px rgba(0,0,0,0.35);transform:translate(-50%,calc(-100% - 18px));}',
    '.tm-iv-wrap .tm-iv-loupe::after{content:"";position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);border:11px solid transparent;border-top-color:#333;border-bottom:none;}',
    '.tm-iv-wrap .tm-iv-loupe::before{content:"";position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-top-color:#fdfcf9;border-bottom:none;z-index:1;}',
    '.tm-iv-wrap .tm-iv-loupe-staff{line-height:0;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-iv-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-iv-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmNotasEngine(containerId, config) {
    injectCSS();
    config = config || {};
    if (config.mode === 'escribir') { startEscribirEngine(containerId, config); return; }
    /* lockedMode: una clave concreta, 'todas' (mezcladas) o null (mostrar selección) */
    var lockedMode = CLAVES[config.clave] ? config.clave : (config.clave === 'todas' ? 'todas' : null);

    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;
    var totalQ = PREGUNTAS_POR_TEST;
    var currentQ, score, cQ, selIdx, answered, modeClave;

    /* ---- Pantalla de selección de clave ---- */
    function showModeScreen() {
      var modes = CLAVE_ORDER.map(function (k) {
        var c = CLAVES[k];
        return '<button class="tm-iv-mode-btn" data-k="' + k + '"><span class="tm-iv-mode-icon">' + c.icon + '</span><span class="tm-iv-mode-lbl">' + c.label + '</span></button>';
      }).join('');
      modes += '<button class="tm-iv-mode-btn" data-k="todas"><span class="tm-iv-mode-icon">🎲</span><span class="tm-iv-mode-lbl">Todas</span></button>';

      wrap.innerHTML =
        '<div class="tm-card"><div class="tm-iv-mode-screen">' +
          '<h2 class="tm-iv-title">¿Qué nota es?</h2>' +
          '<p class="tm-iv-subtitle">Elige la clave que quieres practicar — ' + totalQ + ' preguntas</p>' +
          '<div class="tm-iv-modes">' + modes + '</div>' +
        '</div></div>';

      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          modeClave = btn.dataset.k;
          currentQ = 0; score = 0;
          startQuiz();
        });
      });
    }

    /* ---- Quiz ---- */
    function startQuiz() {
      wrap.innerHTML =
        '<div class="tm-card">' +
          '<div class="tm-iv-header">' +
            '<div class="tm-iv-progress-wrap">' +
              '<div class="tm-iv-bar"><div class="tm-iv-fill" id="' + uid + '_fill"></div></div>' +
              '<span class="tm-iv-counter" id="' + uid + '_cnt">1 / ' + totalQ + '</span>' +
            '</div>' +
            '<span class="tm-iv-badge" id="' + uid + '_badge">✓ 0</span>' +
          '</div>' +
          '<p class="tm-iv-clave-tag" id="' + uid + '_tag"></p>' +
          '<div class="tm-staff"><div id="' + uid + '_not"></div></div>' +
          '<div class="tm-grid" id="' + uid + '_opts"></div>' +
          '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>' +
          '<div id="' + uid + '_fb" class="tm-fb"></div>' +
          '<button id="' + uid + '_nxt" class="tm-nxt">Siguiente →</button>' +
        '</div>';
      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);
      renderOptions();
      nextQ();
    }

    function pickClave() {
      if (modeClave === 'todas') return CLAVES[CLAVE_ORDER[Math.floor(Math.random() * CLAVE_ORDER.length)]];
      return CLAVES[modeClave];
    }

    function genQ() {
      var clave = pickClave();
      var idx = clave.lo + Math.floor(Math.random() * (clave.hi - clave.lo + 1));
      cQ = { clave: clave, idx: idx, letter: letterIdx(idx) };
    }

    function drawStaff() {
      var el = document.getElementById(uid + '_not');
      el.innerHTML = '';
      if (typeof Vex === 'undefined') return;
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(280, 150);
      var ctx = r.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(10, 22, 250);
      stave.addClef(cQ.clave.clef).setContext(ctx).draw();
      var key = vfnOf(cQ.idx) + '/' + octOf(cQ.idx);
      var note = new V.StaveNote({ keys: [key], duration: 'w', clef: cQ.clave.clef });
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 150);
      voice.draw(ctx, stave);
      var svg = el.querySelector('svg');
      if (svg) { svg.setAttribute('viewBox', '0 0 280 150'); svg.style.width = '280px'; svg.style.maxWidth = '100%'; svg.style.height = 'auto'; }
    }

    function renderOptions() {
      var el = document.getElementById(uid + '_opts');
      el.innerHTML = NOTE_NAMES.map(function (n, i) {
        return '<button class="tm-opt" data-i="' + i + '">' + n + '</button>';
      }).join('');
      el.querySelectorAll('.tm-opt').forEach(function (btn) {
        btn.addEventListener('click', function () { selectOpt(btn); });
      });
    }

    function selectOpt(btn) {
      if (answered) return;
      document.getElementById(uid + '_opts').querySelectorAll('.tm-opt').forEach(function (b) { b.classList.remove('tm-sel'); });
      btn.classList.add('tm-sel');
      selIdx = parseInt(btn.dataset.i, 10);
      document.getElementById(uid + '_btn').classList.add('tm-ready');
    }

    function checkAnswer() {
      var elBtn = document.getElementById(uid + '_btn');
      if (!elBtn.classList.contains('tm-ready') || answered) return;
      answered = true;
      elBtn.style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';
      var correct = selIdx === cQ.letter;
      if (correct) score++;
      var elFb = document.getElementById(uid + '_fb');
      elFb.className = 'tm-fb tm-show ' + (correct ? 'tm-ok' : 'tm-ko');
      elFb.innerHTML = correct
        ? '<strong>✓ ¡Correcto!</strong>'
        : '<strong>✗ Incorrecto.</strong> Es un <strong>' + NOTE_NAMES[cQ.letter] + '</strong>.';
      document.getElementById(uid + '_badge').textContent = '✓ ' + score;
      document.getElementById(uid + '_opts').querySelectorAll('.tm-opt').forEach(function (b) {
        b.disabled = true;
        if (parseInt(b.dataset.i, 10) === cQ.letter) b.classList.add('tm-ok');
        else if (b.classList.contains('tm-sel')) b.classList.add('tm-ko');
      });
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++;
      answered = false; selIdx = null;
      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.style.display = ''; elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';
      var opts = document.getElementById(uid + '_opts');
      opts.querySelectorAll('.tm-opt').forEach(function (b) { b.disabled = false; b.className = 'tm-opt'; });
      genQ();
      document.getElementById(uid + '_tag').textContent = (modeClave === 'todas') ? cQ.clave.label : '';
      drawStaff();
    }

    function showResults() {
      var pct = Math.round(score / totalQ * 100);
      wrap.innerHTML =
        '<div class="tm-card">' +
          '<div class="tm-iv-score-box">' +
            '<div class="tm-iv-score-num">' + score + '/' + totalQ + '</div>' +
            '<div class="tm-iv-score-pct">' + pct + '%</div>' +
          '</div>' +
          '<button class="tm-submit tm-ready" id="' + uid + '_restart">Practicar otra vez</button>' +
        '</div>';
      document.getElementById(uid + '_restart').addEventListener('click', function () {
        currentQ = 0; score = 0;
        if (lockedMode) { modeClave = lockedMode; startQuiz(); } else showModeScreen();
      });
    }

    function init() {
      currentQ = 0; score = 0;
      if (lockedMode) { modeClave = lockedMode; startQuiz(); } else showModeScreen();
    }

    if (typeof Vex !== 'undefined') init();
    else window.addEventListener('vexflow-ready', init, { once: true });
  }

  /* ================================================================
     Modo ESCRIBIR: dada una nota (nombre), colócala en el pentagrama
     subiéndola/bajándola. Se comprueba por NOMBRE (cualquier octava).
     ================================================================ */
  function startEscribirEngine(containerId, config) {
    var lockedMode = CLAVES[config.clave] ? config.clave : (config.clave === 'todas' ? 'todas' : null);
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;
    var totalQ = PREGUNTAS_POR_TEST;
    var currentQ, score, modeClave, cQ, answered, placed, placedStyle, currentSvg, lastLoupeKey;
    /* VexFlow añade space_above/below_staff_ln (4+4 líneas = 80px) de relleno por defecto.
       Lo reducimos a 2 líneas y separamos STAVE_Y (construcción) de TOPY (línea superior real). */
    var SVG_W = 300, SVG_H = 84, STAVE_Y = 2, STAVE_W = 280, SPACE_LN = 2, TOPY = STAVE_Y + SPACE_LN * 10;

    function showModeScreen() {
      var modes = CLAVE_ORDER.map(function (k) {
        var c = CLAVES[k];
        return '<button class="tm-iv-mode-btn" data-k="' + k + '"><span class="tm-iv-mode-icon">' + c.icon + '</span><span class="tm-iv-mode-lbl">' + c.label + '</span></button>';
      }).join('');
      modes += '<button class="tm-iv-mode-btn" data-k="todas"><span class="tm-iv-mode-icon">🎲</span><span class="tm-iv-mode-lbl">Todas</span></button>';
      wrap.innerHTML = '<div class="tm-card"><div class="tm-iv-mode-screen">' +
        '<h2 class="tm-iv-title">Escribe la nota</h2>' +
        '<p class="tm-iv-subtitle">Elige la clave que quieres practicar — ' + totalQ + ' preguntas</p>' +
        '<div class="tm-iv-modes">' + modes + '</div></div></div>';
      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { modeClave = btn.dataset.k; currentQ = 0; score = 0; startQuiz(); });
      });
    }

    function startQuiz() {
      wrap.innerHTML = '<div class="tm-card">' +
        '<div class="tm-iv-header"><div class="tm-iv-progress-wrap">' +
          '<div class="tm-iv-bar"><div class="tm-iv-fill" id="' + uid + '_fill"></div></div>' +
          '<span class="tm-iv-counter" id="' + uid + '_cnt">1 / ' + totalQ + '</span></div>' +
          '<span class="tm-iv-badge" id="' + uid + '_badge">✓ 0</span></div>' +
        '<p class="tm-iv-clave-tag" id="' + uid + '_tag"></p>' +
        '<p class="tm-tgt" id="' + uid + '_tgt"></p>' +
        '<div class="tm-staff-construir" id="' + uid + '_wrap"><div id="' + uid + '_not"></div><div class="tm-high" id="' + uid + '_high"></div></div>' +
        '<p class="tm-hint">Toca el pentagrama para colocar la nota.</p>' +
        '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>' +
        '<div id="' + uid + '_fb" class="tm-fb"></div>' +
        '<button id="' + uid + '_nxt" class="tm-nxt">Siguiente →</button>' +
        '</div>' +
        '<div class="tm-iv-loupe" id="' + uid + '_loupe"><div class="tm-iv-loupe-staff" id="' + uid + '_lstaff"></div></div>';
      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);
      attachInteraction();
      nextQ();
    }

    function pickClave() {
      if (modeClave === 'todas') return CLAVES[CLAVE_ORDER[Math.floor(Math.random() * CLAVE_ORDER.length)]];
      return CLAVES[modeClave];
    }

    function genQ() {
      var clave = pickClave();
      var top = TOPLINE[clave.id];
      var rows = [];
      for (var L = -1.5; L <= 5.5001; L += 0.5) {
        var idx = top - Math.round(L * 2);
        rows.push({ line: L, idx: idx, vfn: vfnOf(idx), oct: octOf(idx) });
      }
      cQ = { clave: clave, target: Math.floor(Math.random() * 7), rows: rows };
      placed = null; placedStyle = null;
    }

    function getRow(clientY) {
      var rows = cQ.rows, mid = rows[Math.floor(rows.length / 2)];
      if (!currentSvg) return mid;
      var sr = currentSvg.getBoundingClientRect();
      if (!sr.width) return mid;
      var scale = sr.width / SVG_W;
      var svgY = (clientY - sr.top) / scale;
      var idx = Math.round((svgY - TOPY - rows[0].line * 10) / 5);
      return rows[Math.max(0, Math.min(rows.length - 1, idx))];
    }

    function drawLoupe(row) {
      var elL = document.getElementById(uid + '_lstaff');
      if (!elL || typeof Vex === 'undefined') return;
      var key = cQ.clave.clef + '|' + row.idx;
      if (key === lastLoupeKey) return;
      lastLoupeKey = key;
      elL.innerHTML = '';
      var V = Vex.Flow;
      var r = new V.Renderer(elL, V.Renderer.Backends.SVG); r.resize(300, 160);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(10, 20, 280); stave.addClef(cQ.clave.clef).setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [row.vfn + '/' + row.oct], duration: 'w', clef: cQ.clave.clef });
      if (note.setKeyStyle) note.setKeyStyle(0, { fillStyle: '#8b6914', strokeStyle: '#8b6914' });
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 180);
      voice.draw(ctx, stave);
      var svg = elL.querySelector('svg');
      if (svg) { svg.setAttribute('viewBox', '0 0 300 160'); svg.setAttribute('width', '190'); svg.setAttribute('height', '101'); }
    }

    function updateBtn() {
      var b = document.getElementById(uid + '_btn');
      if (b) b.classList.toggle('tm-ready', !!placed);
    }

    function attachInteraction() {
      var elWrap = document.getElementById(uid + '_wrap');
      var elHigh = document.getElementById(uid + '_high');
      var elLoupe = document.getElementById(uid + '_loupe');
      var dragging = false, best = null;
      function preview(e) {
        if (answered || !currentSvg) return;
        var cx = e.touches ? e.changedTouches[0].clientX : e.clientX;
        var cy = e.touches ? e.changedTouches[0].clientY : e.clientY;
        var row = getRow(cy); best = row;
        var sr = currentSvg.getBoundingClientRect(), wr = elWrap.getBoundingClientRect(), scale = sr.width / SVG_W;
        var lineY = (sr.top - wr.top) + (TOPY + row.line * 10) * scale;
        elHigh.style.display = 'block'; elHigh.style.top = (lineY - 1) + 'px';
        elLoupe.style.transform = ''; elLoupe.style.left = cx + 'px'; elLoupe.style.top = cy + 'px'; elLoupe.style.display = 'block';
        drawLoupe(row);
        var lr = elLoupe.getBoundingClientRect(), pad = 8;
        if (lr.left < pad) elLoupe.style.left = (cx - lr.left + pad) + 'px';
        else if (lr.right > window.innerWidth - pad) elLoupe.style.left = (cx - (lr.right - window.innerWidth + pad)) + 'px';
        if (lr.top < pad) elLoupe.style.transform = 'translate(-50%,18px)';
      }
      function start(e) { if (answered) return; dragging = true; preview(e); }
      function end() {
        if (!dragging) return;
        dragging = false;
        if (best && !answered) { placed = { vfn: best.vfn, oct: best.oct, idx: best.idx }; placedStyle = null; drawStaff(); updateBtn(); lastLoupeKey = null; }
        best = null; elHigh.style.display = 'none'; elLoupe.style.display = 'none';
      }
      elWrap.addEventListener('mousedown', start);
      elWrap.addEventListener('mousemove', function (e) { if (dragging) preview(e); });
      window.addEventListener('mouseup', end);
      elWrap.addEventListener('touchstart', function (e) { e.preventDefault(); start(e); }, { passive: false });
      elWrap.addEventListener('touchmove', function (e) { e.preventDefault(); preview(e); }, { passive: false });
      elWrap.addEventListener('touchend', function (e) { e.preventDefault(); end(); }, { passive: false });
    }

    function drawStaff() {
      var el = document.getElementById(uid + '_not'); el.innerHTML = '';
      if (typeof Vex === 'undefined') return;
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG); r.resize(SVG_W, SVG_H);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(10, STAVE_Y, STAVE_W, { space_above_staff_ln: SPACE_LN, space_below_staff_ln: SPACE_LN });
      stave.addClef(cQ.clave.clef).setContext(ctx).draw();
      if (placed) {
        var note = new V.StaveNote({ keys: [placed.vfn + '/' + placed.oct], duration: 'w', clef: cQ.clave.clef });
        if (note.setKeyStyle) note.setKeyStyle(0, placedStyle || { fillStyle: '#8b6914', strokeStyle: '#8b6914' });
        var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
        new V.Formatter().joinVoices([voice]).format([voice], 150);
        voice.draw(ctx, stave);
      }
      var svg = el.querySelector('svg');
      if (svg) { svg.setAttribute('viewBox', '0 0 ' + SVG_W + ' ' + SVG_H); svg.style.width = '100%'; svg.style.height = 'auto'; currentSvg = svg; }
    }

    function checkAnswer() {
      var elBtn = document.getElementById(uid + '_btn');
      if (!elBtn.classList.contains('tm-ready') || answered || !placed) return;
      answered = true;
      elBtn.style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';
      document.getElementById(uid + '_wrap').classList.add('tm-answered');
      var placedLetter = letterIdx(placed.idx);
      var correct = placedLetter === cQ.target;
      placedStyle = correct ? { fillStyle: '#27ae60', strokeStyle: '#27ae60' } : { fillStyle: '#c0392b', strokeStyle: '#c0392b' };
      if (correct) score++;
      drawStaff();
      var elFb = document.getElementById(uid + '_fb');
      elFb.className = 'tm-fb tm-show ' + (correct ? 'tm-ok' : 'tm-ko');
      elFb.innerHTML = correct
        ? '<strong>✓ ¡Correcto!</strong>'
        : '<strong>✗ Incorrecto.</strong> Has colocado un <strong>' + NOTE_NAMES[placedLetter] + '</strong>; te pedían un <strong>' + NOTE_NAMES[cQ.target] + '</strong>.';
      document.getElementById(uid + '_badge').textContent = '✓ ' + score;
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++; answered = false; lastLoupeKey = null;
      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn'); elBtn.style.display = ''; elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';
      document.getElementById(uid + '_wrap').classList.remove('tm-answered');
      genQ();
      document.getElementById(uid + '_tag').textContent = (modeClave === 'todas') ? cQ.clave.label : '';
      document.getElementById(uid + '_tgt').innerHTML = 'Coloca un <strong>' + NOTE_NAMES[cQ.target] + '</strong> en el pentagrama.';
      drawStaff();
    }

    function showResults() {
      var pct = Math.round(score / totalQ * 100);
      wrap.innerHTML = '<div class="tm-card"><div class="tm-iv-score-box"><div class="tm-iv-score-num">' + score + '/' + totalQ + '</div><div class="tm-iv-score-pct">' + pct + '%</div></div><button class="tm-submit tm-ready" id="' + uid + '_restart">Practicar otra vez</button></div>';
      document.getElementById(uid + '_restart').addEventListener('click', function () { currentQ = 0; score = 0; if (lockedMode) { modeClave = lockedMode; startQuiz(); } else showModeScreen(); });
    }

    function init() { currentQ = 0; score = 0; if (lockedMode) { modeClave = lockedMode; startQuiz(); } else showModeScreen(); }
    if (typeof Vex !== 'undefined') init();
    else window.addEventListener('vexflow-ready', init, { once: true });
  }

  window.tmNotasEngine = tmNotasEngine;
})();
