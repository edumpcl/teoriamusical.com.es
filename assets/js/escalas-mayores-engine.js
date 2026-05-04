/* Motor de ejercicios — Identificar Escalas Mayores */
(function () {
  'use strict';

  var SCALES = [
    { name: 'Do Mayor',   vex: 'C',  notes: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'], acc: {} },
    { name: 'Sol Mayor',  vex: 'G',  notes: ['g/4','a/4','b/4','c/5','d/5','e/5','f/5','g/5'], acc: {'f/5':'#'} },
    { name: 'Re Mayor',   vex: 'D',  notes: ['d/4','e/4','f/4','g/4','a/4','b/4','c/5','d/5'], acc: {'f/4':'#','c/5':'#'} },
    { name: 'La Mayor',   vex: 'A',  notes: ['a/4','b/4','c/5','d/5','e/5','f/5','g/5','a/5'], acc: {'c/5':'#','f/5':'#','g/5':'#'} },
    { name: 'Mi Mayor',   vex: 'E',  notes: ['e/4','f/4','g/4','a/4','b/4','c/5','d/5','e/5'], acc: {'f/4':'#','g/4':'#','c/5':'#','d/5':'#'} },
    { name: 'Si Mayor',   vex: 'B',  notes: ['b/3','c/4','d/4','e/4','f/4','g/4','a/4','b/4'], acc: {'c/4':'#','d/4':'#','f/4':'#','g/4':'#','a/4':'#'} },
    { name: 'Fa# Mayor',  vex: 'F#', notes: ['f/4','g/4','a/4','b/4','c/5','d/5','e/5','f/5'], acc: {'f/4':'#','g/4':'#','a/4':'#','c/5':'#','d/5':'#','e/5':'#','f/5':'#'} },
    { name: 'Do# Mayor',  vex: 'C#', notes: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'], acc: {'c/4':'#','d/4':'#','e/4':'#','f/4':'#','g/4':'#','a/4':'#','b/4':'#','c/5':'#'} },
    { name: 'Fa Mayor',   vex: 'F',  notes: ['f/4','g/4','a/4','b/4','c/5','d/5','e/5','f/5'], acc: {'b/4':'b'} },
    { name: 'Sib Mayor',  vex: 'Bb', notes: ['b/3','c/4','d/4','e/4','f/4','g/4','a/4','b/4'], acc: {'b/3':'b','e/4':'b','b/4':'b'} },
    { name: 'Mib Mayor',  vex: 'Eb', notes: ['e/4','f/4','g/4','a/4','b/4','c/5','d/5','e/5'], acc: {'e/4':'b','a/4':'b','b/4':'b','e/5':'b'} },
    { name: 'Lab Mayor',  vex: 'Ab', notes: ['a/3','b/3','c/4','d/4','e/4','f/4','g/4','a/4'], acc: {'a/3':'b','b/3':'b','e/4':'b','a/4':'b'} },
    { name: 'Reb Mayor',  vex: 'Db', notes: ['d/4','e/4','f/4','g/4','a/4','b/4','c/5','d/5'], acc: {'d/4':'b','e/4':'b','g/4':'b','a/4':'b','b/4':'b','d/5':'b'} },
    { name: 'Solb Mayor', vex: 'Gb', notes: ['g/3','a/3','b/3','c/4','d/4','e/4','f/4','g/4'], acc: {'g/3':'b','a/3':'b','b/3':'b','c/4':'b','d/4':'b','e/4':'b','g/4':'b'} },
    { name: 'Dob Mayor',  vex: 'Cb', notes: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'], acc: {'c/4':'b','d/4':'b','e/4':'b','f/4':'b','g/4':'b','a/4':'b','b/4':'b','c/5':'b'} }
  ];

  var SCALE_PARTS = {
    'Do Mayor':   { root: 'Do',  acc: '' },
    'Sol Mayor':  { root: 'Sol', acc: '' },
    'Re Mayor':   { root: 'Re',  acc: '' },
    'La Mayor':   { root: 'La',  acc: '' },
    'Mi Mayor':   { root: 'Mi',  acc: '' },
    'Si Mayor':   { root: 'Si',  acc: '' },
    'Fa# Mayor':  { root: 'Fa',  acc: '#' },
    'Do# Mayor':  { root: 'Do',  acc: '#' },
    'Fa Mayor':   { root: 'Fa',  acc: '' },
    'Sib Mayor':  { root: 'Si',  acc: 'b' },
    'Mib Mayor':  { root: 'Mi',  acc: 'b' },
    'Lab Mayor':  { root: 'La',  acc: 'b' },
    'Reb Mayor':  { root: 'Re',  acc: 'b' },
    'Solb Mayor': { root: 'Sol', acc: 'b' },
    'Dob Mayor':  { root: 'Do',  acc: 'b' }
  };

  var NOTE_NAMES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var ACC_OPTS = [
    { label: '♭', val: 'b' },
    { label: 'sin alt.', val: '' },
    { label: '♯', val: '#' }
  ];

  var CSS = [
    '.tmesc-wrap{font-family:inherit;color:inherit;width:100%;margin:0 auto;}',
    '.tmesc-wrap *{box-sizing:border-box;margin:0;padding:0;}',
    '.tmesc-wrap .tm-controls{display:flex;gap:8px;align-items:center;margin-bottom:18px;flex-wrap:wrap;}',
    '.tmesc-wrap .tm-lbl{font-size:.75rem;color:#999;letter-spacing:.08em;text-transform:uppercase;}',
    '.tmesc-wrap .tm-btn{font-size:.78rem;padding:6px 14px;border:1px solid #d8d0b8;background:#fff;color:#999;cursor:pointer;border-radius:3px;transition:all .15s;font-family:inherit;}',
    '.tmesc-wrap .tm-btn:hover{border-color:#8b6914;color:#8b6914;}',
    '.tmesc-wrap .tm-btn.tm-on{background:#8b6914;color:#fff;border-color:#8b6914;font-weight:600;}',
    '.tmesc-wrap .tm-stats{display:flex;border:1px solid #d8d0b8;border-radius:3px;overflow:hidden;margin-bottom:18px;background:#fff;}',
    '.tmesc-wrap .tm-stat{flex:1;padding:9px 8px;border-right:1px solid #d8d0b8;text-align:center;}',
    '.tmesc-wrap .tm-stat:last-child{border-right:none;}',
    '.tmesc-wrap .tm-sv{font-size:1.5rem;font-weight:700;color:#8b6914;line-height:1;}',
    '.tmesc-wrap .tm-sl{font-size:.6rem;color:#aaa;letter-spacing:.06em;text-transform:uppercase;margin-top:2px;}',
    '.tmesc-wrap .tm-pbar-wrap{height:3px;background:#e8e0cc;border-radius:2px;overflow:hidden;margin-bottom:18px;}',
    '.tmesc-wrap .tm-pbar{height:100%;background:linear-gradient(90deg,#8b6914,#2a7a6e);transition:width .4s;width:0%;}',
    '.tmesc-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:4px;padding:24px 20px 20px;margin-bottom:16px;position:relative;overflow:hidden;}',
    '.tmesc-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#8b6914,#2a7a6e);}',
    '.tmesc-wrap .tm-qlbl{font-size:.68rem;color:#aaa;letter-spacing:.1em;text-transform:uppercase;margin-bottom:7px;}',
    '.tmesc-wrap .tm-qnum{color:#8b6914;font-weight:700;}',
    '.tmesc-wrap .tm-qtxt{font-size:1.05rem;font-weight:600;margin-bottom:10px;color:#333;}',
    '.tmesc-wrap .tm-mode-tag{font-size:.68rem;color:#999;letter-spacing:.05em;margin-bottom:10px;padding:3px 8px;display:inline-block;border:1px solid #e8e0cc;border-radius:2px;background:#fdfcf9;}',
    '.tmesc-wrap .tm-staff-wrap{display:flex;justify-content:center;margin-bottom:18px;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:3px;padding:8px 4px;overflow-x:auto;}',
    '.tmesc-wrap .tm-staff-wrap svg{display:block;max-width:100%;height:auto;}',
    /* easy */
    '.tmesc-wrap .tm-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;}',
    '.tmesc-wrap .tm-opt{font-size:.88rem;font-weight:600;padding:11px 14px;border:1px solid #d8d0b8;background:#fdfcf9;color:#1a1a1a;cursor:pointer;border-radius:3px;transition:all .15s;text-align:center;font-family:inherit;}',
    '.tmesc-wrap .tm-opt:hover:not(:disabled){border-color:#8b6914;background:#fdf8ee;}',
    '.tmesc-wrap .tm-opt.tm-ok{border-color:#27ae60!important;background:rgba(39,174,96,.1)!important;color:#1e8449!important;}',
    '.tmesc-wrap .tm-opt.tm-ko{border-color:#c0392b!important;background:rgba(192,57,43,.07)!important;color:#a93226!important;}',
    '.tmesc-wrap .tm-opt:disabled{cursor:default;}',
    /* hard — 2 pasos */
    '.tmesc-wrap .tm-hard-wrap{display:flex;flex-direction:column;gap:10px;}',
    '.tmesc-wrap .tm-hard-notes{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}',
    '.tmesc-wrap .tm-hard-accs{display:flex;gap:8px;justify-content:center;}',
    '.tmesc-wrap .tm-acc-hint{font-size:.72rem;color:#aaa;text-align:center;min-height:1em;}',
    '.tmesc-wrap .tm-hn{font-size:.88rem;font-weight:600;padding:9px 14px;border:1px solid #d8d0b8;background:#fdfcf9;color:#333;cursor:pointer;border-radius:3px;transition:all .15s;font-family:inherit;min-width:56px;text-align:center;}',
    '.tmesc-wrap .tm-hn:hover:not(:disabled){border-color:#8b6914;background:#fdf8ee;}',
    '.tmesc-wrap .tm-hn.tm-sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tmesc-wrap .tm-hn.tm-ok{border-color:#27ae60!important;background:rgba(39,174,96,.1)!important;color:#1e8449!important;}',
    '.tmesc-wrap .tm-hn.tm-ko{border-color:#c0392b!important;background:rgba(192,57,43,.07)!important;color:#a93226!important;}',
    '.tmesc-wrap .tm-hn:disabled{cursor:default;}',
    '.tmesc-wrap .tm-ha{font-size:.9rem;font-weight:700;padding:9px 20px;border:1px solid #d8d0b8;background:#fdfcf9;color:#333;cursor:pointer;border-radius:3px;transition:all .15s;font-family:inherit;min-width:72px;text-align:center;}',
    '.tmesc-wrap .tm-ha:hover:not(:disabled){border-color:#8b6914;background:#fdf8ee;}',
    '.tmesc-wrap .tm-ha:disabled{cursor:default;opacity:.35;}',
    '.tmesc-wrap .tm-ha.tm-ok{border-color:#27ae60!important;background:rgba(39,174,96,.1)!important;color:#1e8449!important;opacity:1!important;}',
    '.tmesc-wrap .tm-ha.tm-ko{border-color:#c0392b!important;background:rgba(192,57,43,.07)!important;color:#a93226!important;opacity:1!important;}',
    /* feedback */
    '.tmesc-wrap .tm-fb{display:none;margin-top:14px;padding:11px 14px;border-radius:3px;font-size:.86rem;line-height:1.6;}',
    '.tmesc-wrap .tm-fb.tm-show{display:block;}',
    '.tmesc-wrap .tm-fb.tm-ok{background:rgba(39,174,96,.08);border:1px solid rgba(39,174,96,.3);color:#1e8449;}',
    '.tmesc-wrap .tm-fb.tm-ko{background:rgba(192,57,43,.07);border:1px solid rgba(192,57,43,.3);color:#a93226;}',
    '.tmesc-wrap .tm-nxt{display:none;width:100%;margin-top:12px;padding:11px;font-size:.82rem;letter-spacing:.07em;text-transform:uppercase;background:#8b6914;color:#fff;border:none;border-radius:3px;cursor:pointer;font-weight:600;font-family:inherit;}',
    '.tmesc-wrap .tm-nxt:hover{opacity:.85;}',
    '.tmesc-wrap .tm-nxt.tm-show{display:block;}',
    '@keyframes tmesc-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-2px)}80%{transform:translateX(2px)}}',
    '.tmesc-wrap .tm-shake{animation:tmesc-shake 0.4s ease;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tmesc-css')) return;
    var s = document.createElement('style');
    s.id = 'tmesc-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function waitVex(cb) {
    if (typeof Vex !== 'undefined') { cb(); return; }
    var i = 0, iv = setInterval(function () {
      if (typeof Vex !== 'undefined') { clearInterval(iv); cb(); }
      else if (++i > 40) clearInterval(iv);
    }, 200);
  }

  function tmEscMayores(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tmesc-wrap';
    var uid = containerId;

    wrap.innerHTML = [
      '<div class="tm-controls">',
        '<span class="tm-lbl">Dificultad:</span>',
        '<button class="tm-btn tm-on" id="' + uid + '_easy">Fácil</button>',
        '<button class="tm-btn" id="' + uid + '_hard">Difícil</button>',
      '</div>',
      '<div class="tm-stats">',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_tot">0</div><div class="tm-sl">Preguntas</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_cor">0</div><div class="tm-sl">Correctas</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_pct">—</div><div class="tm-sl">Acierto</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_str">0</div><div class="tm-sl">Racha</div></div>',
      '</div>',
      '<div class="tm-pbar-wrap"><div class="tm-pbar" id="' + uid + '_pbar"></div></div>',
      '<div class="tm-card" id="' + uid + '_card">',
        '<div class="tm-qlbl">Pregunta <span class="tm-qnum" id="' + uid + '_qnum">1</span></div>',
        '<div class="tm-qtxt">¿Qué escala mayor es esta?</div>',
        '<div class="tm-mode-tag" id="' + uid + '_modetag"></div>',
        '<div class="tm-staff-wrap"><div id="' + uid + '_staff"></div></div>',
        '<div id="' + uid + '_opts"></div>',
        '<div class="tm-fb" id="' + uid + '_fb"></div>',
        '<button class="tm-nxt" id="' + uid + '_nxt">Siguiente →</button>',
      '</div>'
    ].join('');

    var st = { total: 0, correct: 0, streak: 0, qnum: 0, answered: false, diff: 'easy' };
    var used = [];
    var cQ = null;
    var selRoot = null;

    var elTot     = document.getElementById(uid + '_tot');
    var elCor     = document.getElementById(uid + '_cor');
    var elPct     = document.getElementById(uid + '_pct');
    var elStr     = document.getElementById(uid + '_str');
    var elPbar    = document.getElementById(uid + '_pbar');
    var elQnum    = document.getElementById(uid + '_qnum');
    var elStaff   = document.getElementById(uid + '_staff');
    var elOpts    = document.getElementById(uid + '_opts');
    var elFb      = document.getElementById(uid + '_fb');
    var elNxt     = document.getElementById(uid + '_nxt');
    var elCard    = document.getElementById(uid + '_card');
    var elModeTag = document.getElementById(uid + '_modetag');

    document.getElementById(uid + '_easy').addEventListener('click', function () { setDiff('easy'); });
    document.getElementById(uid + '_hard').addEventListener('click', function () { setDiff('hard'); });
    elNxt.addEventListener('click', nextQ);

    function setDiff(d) {
      st.diff = d;
      document.getElementById(uid + '_easy').className = 'tm-btn' + (d === 'easy' ? ' tm-on' : '');
      document.getElementById(uid + '_hard').className = 'tm-btn' + (d === 'hard' ? ' tm-on' : '');
      st.total = 0; st.correct = 0; st.streak = 0; st.qnum = 0;
      used = [];
      updateStats();
      nextQ();
    }

    function updateStats() {
      elTot.textContent  = st.total;
      elCor.textContent  = st.correct;
      elPct.textContent  = st.total > 0 ? Math.round(st.correct / st.total * 100) + '%' : '—';
      elStr.textContent  = st.streak;
      elPbar.style.width = st.total > 0 ? Math.round(st.correct / st.total * 100) + '%' : '0%';
    }

    function genQ() {
      var pool = SCALES.filter(function (s, i) { return used.indexOf(i) === -1; });
      if (!pool.length) { used = []; pool = SCALES.slice(); }
      var idx = Math.floor(Math.random() * pool.length);
      var correct = pool[idx];
      used.push(SCALES.indexOf(correct));

      var opts = null;
      if (st.diff === 'easy') {
        var wrong = SCALES.filter(function (s) { return s.name !== correct.name; });
        wrong = wrong.sort(function () { return Math.random() - 0.5; }).slice(0, 3);
        opts = [correct].concat(wrong).sort(function () { return Math.random() - 0.5; });
      }

      var useArm = Math.random() < 0.5;
      return { scale: correct, opts: opts, useArm: useArm };
    }

    function renderStaff(q) {
      elStaff.innerHTML = '';
      elModeTag.textContent = q.useArm ? 'Con armadura' : 'Con alteraciones';
      if (typeof Vex === 'undefined') return;
      var VF = Vex.Flow;
      var W = 520, H = 155;
      var rend = new VF.Renderer(elStaff, VF.Renderer.Backends.SVG);
      rend.resize(W, H);
      var ctx = rend.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');

      var stave = new VF.Stave(10, 38, W - 20);
      stave.addClef('treble');
      if (q.useArm) stave.addKeySignature(q.scale.vex);
      stave.setContext(ctx).draw();

      var formatWidth = q.useArm ? W - 150 : W - 80;
      var notes = q.scale.notes.map(function (pitch) {
        var note = new VF.StaveNote({ keys: [pitch], duration: 'w' });
        if (!q.useArm && q.scale.acc && q.scale.acc[pitch]) {
          note.addModifier(new VF.Accidental(q.scale.acc[pitch]), 0);
        }
        return note;
      });

      var voice = new VF.Voice({ num_beats: 8, beat_value: 4 }).setStrict(false);
      voice.addTickables(notes);
      new VF.Formatter().joinVoices([voice]).format([voice], formatWidth);
      voice.draw(ctx, stave);

      var svg = elStaff.querySelector('svg');
      if (svg) {
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        svg.setAttribute('width', String(W));
        svg.setAttribute('height', String(H));
      }
    }

    function renderOpts() {
      elOpts.innerHTML = '';
      st.answered = false;
      selRoot = null;

      if (st.diff === 'easy') {
        var div = document.createElement('div');
        div.className = 'tm-opts';
        cQ.opts.forEach(function (s) {
          var b = document.createElement('button');
          b.className = 'tm-opt';
          b.textContent = s.name;
          b.addEventListener('click', function () { answerEasy(s.name, b); });
          div.appendChild(b);
        });
        elOpts.appendChild(div);
      } else {
        renderHardOpts();
      }
    }

    function renderHardOpts() {
      var hwrap = document.createElement('div');
      hwrap.className = 'tm-hard-wrap';

      var notesRow = document.createElement('div');
      notesRow.className = 'tm-hard-notes';

      var hint = document.createElement('div');
      hint.className = 'tm-acc-hint';
      hint.textContent = 'Elige la nota raíz';

      var accsRow = document.createElement('div');
      accsRow.className = 'tm-hard-accs';

      NOTE_NAMES.forEach(function (n) {
        var b = document.createElement('button');
        b.className = 'tm-hn';
        b.textContent = n;
        b.dataset.note = n;
        b.addEventListener('click', function () {
          if (st.answered) return;
          selRoot = n;
          notesRow.querySelectorAll('.tm-hn').forEach(function (x) {
            x.classList.toggle('tm-sel', x.dataset.note === n);
          });
          accsRow.querySelectorAll('.tm-ha').forEach(function (x) { x.disabled = false; });
          hint.textContent = 'Ahora elige la alteración';
        });
        notesRow.appendChild(b);
      });

      ACC_OPTS.forEach(function (a) {
        var b = document.createElement('button');
        b.className = 'tm-ha';
        b.textContent = a.label;
        b.dataset.acc = a.val;
        b.disabled = true;
        b.addEventListener('click', function () {
          if (!selRoot || st.answered) return;
          var chosen = selRoot + a.val + ' Mayor';
          answerHard(chosen, notesRow, accsRow, b);
        });
        accsRow.appendChild(b);
      });

      hwrap.appendChild(notesRow);
      hwrap.appendChild(hint);
      hwrap.appendChild(accsRow);
      elOpts.appendChild(hwrap);
    }

    function answerEasy(chosen, btn) {
      if (st.answered) return;
      st.answered = true;
      st.total++;
      var correct = cQ.scale.name;
      var isOk = chosen === correct;
      if (isOk) {
        st.correct++; st.streak++;
        btn.classList.add('tm-ok');
        elFb.className = 'tm-fb tm-ok tm-show';
        elFb.innerHTML = '<strong>✓ ¡Correcto!</strong> — Es <strong>' + correct + '</strong>.';
      } else {
        st.streak = 0;
        btn.classList.add('tm-ko');
        elOpts.querySelectorAll('.tm-opt').forEach(function (x) {
          if (x.textContent === correct) x.classList.add('tm-ok');
          x.disabled = true;
        });
        elFb.className = 'tm-fb tm-ko tm-show';
        elFb.innerHTML = '<strong>✗ Incorrecto</strong> — La respuesta era: <strong>' + correct + '</strong>.';
        elCard.classList.add('tm-shake');
        setTimeout(function () { elCard.classList.remove('tm-shake'); }, 400);
      }
      elOpts.querySelectorAll('.tm-opt').forEach(function (x) { x.disabled = true; });
      updateStats();
      elNxt.className = 'tm-nxt tm-show';
    }

    function answerHard(chosen, notesRow, accsRow, clickedAcc) {
      if (st.answered) return;
      st.answered = true;
      st.total++;
      var correct = cQ.scale.name;
      var cp = SCALE_PARTS[correct];
      var isOk = chosen === correct;

      var selNoteBtn = null;
      notesRow.querySelectorAll('.tm-hn').forEach(function (x) {
        if (x.dataset.note === selRoot) selNoteBtn = x;
        x.disabled = true;
      });
      accsRow.querySelectorAll('.tm-ha').forEach(function (x) { x.disabled = true; });

      if (isOk) {
        st.correct++; st.streak++;
        if (selNoteBtn) { selNoteBtn.classList.remove('tm-sel'); selNoteBtn.classList.add('tm-ok'); }
        clickedAcc.classList.add('tm-ok');
        elFb.className = 'tm-fb tm-ok tm-show';
        elFb.innerHTML = '<strong>✓ ¡Correcto!</strong> — Es <strong>' + correct + '</strong>.';
      } else {
        st.streak = 0;
        if (selNoteBtn) { selNoteBtn.classList.remove('tm-sel'); selNoteBtn.classList.add('tm-ko'); }
        clickedAcc.classList.add('tm-ko');
        notesRow.querySelectorAll('.tm-hn').forEach(function (x) {
          if (x.dataset.note === cp.root) x.classList.add('tm-ok');
        });
        accsRow.querySelectorAll('.tm-ha').forEach(function (x) {
          if (x.dataset.acc === cp.acc) x.classList.add('tm-ok');
        });
        elFb.className = 'tm-fb tm-ko tm-show';
        elFb.innerHTML = '<strong>✗ Incorrecto</strong> — La respuesta era: <strong>' + correct + '</strong>.';
        elCard.classList.add('tm-shake');
        setTimeout(function () { elCard.classList.remove('tm-shake'); }, 400);
      }
      updateStats();
      elNxt.className = 'tm-nxt tm-show';
    }

    function nextQ() {
      cQ = genQ();
      st.qnum++;
      elQnum.textContent = st.qnum;
      elFb.className = 'tm-fb';
      elNxt.className = 'tm-nxt';
      renderStaff(cQ);
      renderOpts();
    }

    waitVex(nextQ);
  }

  window.tmEscMayores = tmEscMayores;
})();
