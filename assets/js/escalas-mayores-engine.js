/* Motor de ejercicios — Identificar Escalas Mayores */
(function () {
  'use strict';

  /* Definición de las 15 escalas mayores.
     scale: notas en VexFlow (nota/octava/alteración), 8 notas.
     vex:   nombre VexFlow para la armadura.          */
  var SCALES = [
    { name: 'Do Mayor',   vex: 'C',  notes: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'] },
    { name: 'Sol Mayor',  vex: 'G',  notes: ['g/4','a/4','b/4','c/5','d/5','e/5','f/5','g/5'], acc: {'f/5':'#'} },
    { name: 'Re Mayor',   vex: 'D',  notes: ['d/4','e/4','f/4','g/4','a/4','b/4','c/5','d/5'], acc: {'f/4':'#','c/5':'#'} },
    { name: 'La Mayor',   vex: 'A',  notes: ['a/4','b/4','c/5','d/5','e/5','f/5','g/5','a/5'], acc: {'c/5':'#','f/5':'#','g/5':'#'} },
    { name: 'Mi Mayor',   vex: 'E',  notes: ['e/4','f/4','g/4','a/4','b/4','c/5','d/5','e/5'], acc: {'f/4':'#','g/4':'#','c/5':'#','d/5':'#'} },
    { name: 'Si Mayor',   vex: 'B',  notes: ['b/3','c/4','d/4','e/4','f/4','g/4','a/4','b/4'], acc: {'c/4':'#','d/4':'#','f/4':'#','g/4':'#','a/4':'#'} },
    { name: 'Fa# Mayor',  vex: 'F#', notes: ['f/4','g/4','a/4','b/4','c/5','d/5','e/5','f/5'], acc: {'f/4':'#','g/4':'#','a/4':'#','c/5':'#','d/5':'#','e/5':'#'} },
    { name: 'Do# Mayor',  vex: 'C#', notes: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'], acc: {'c/4':'#','d/4':'#','e/4':'#','f/4':'#','g/4':'#','a/4':'#','b/4':'#'} },
    { name: 'Fa Mayor',   vex: 'F',  notes: ['f/4','g/4','a/4','b/4','c/5','d/5','e/5','f/5'], acc: {'b/4':'b'} },
    { name: 'Sib Mayor',  vex: 'Bb', notes: ['b/3','c/4','d/4','e/4','f/4','g/4','a/4','b/4'], acc: {'b/3':'b','e/4':'b'} },
    { name: 'Mib Mayor',  vex: 'Eb', notes: ['e/4','f/4','g/4','a/4','b/4','c/5','d/5','e/5'], acc: {'e/4':'b','a/4':'b','b/4':'b'} },
    { name: 'Lab Mayor',  vex: 'Ab', notes: ['a/3','b/3','c/4','d/4','e/4','f/4','g/4','a/4'], acc: {'a/3':'b','b/3':'b','e/4':'b'} },
    { name: 'Reb Mayor',  vex: 'Db', notes: ['d/4','e/4','f/4','g/4','a/4','b/4','c/5','d/5'], acc: {'d/4':'b','e/4':'b','g/4':'b','a/4':'b','b/4':'b'} },
    { name: 'Solb Mayor', vex: 'Gb', notes: ['g/3','a/3','b/3','c/4','d/4','e/4','f/4','g/4'], acc: {'g/3':'b','a/3':'b','b/3':'b','c/4':'b','d/4':'b','e/4':'b'} },
    { name: 'Dob Mayor',  vex: 'Cb', notes: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'], acc: {'c/4':'b','d/4':'b','e/4':'b','f/4':'b','g/4':'b','a/4':'b','b/4':'b'} }
  ];

  var ALL_NAMES = SCALES.map(function(s){ return s.name; });
  var PREGUNTAS = 10;

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
    '.tmesc-wrap .tm-qtxt{font-size:1.05rem;font-weight:600;margin-bottom:16px;color:#333;}',
    '.tmesc-wrap .tm-staff-wrap{display:flex;justify-content:center;margin-bottom:18px;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:3px;padding:8px;overflow-x:auto;}',
    '.tmesc-wrap .tm-staff-wrap svg{display:block;max-width:100%;}',
    /* opciones modo fácil */
    '.tmesc-wrap .tm-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;}',
    '.tmesc-wrap .tm-opt{font-size:.88rem;font-weight:600;padding:11px 14px;border:1px solid #d8d0b8;background:#fdfcf9;color:#1a1a1a;cursor:pointer;border-radius:3px;transition:all .15s;text-align:center;font-family:inherit;}',
    '.tmesc-wrap .tm-opt:hover:not(:disabled){border-color:#8b6914;background:#fdf8ee;}',
    '.tmesc-wrap .tm-opt.tm-ok{border-color:#27ae60!important;background:rgba(39,174,96,.1)!important;color:#1e8449!important;}',
    '.tmesc-wrap .tm-opt.tm-ko{border-color:#c0392b!important;background:rgba(192,57,43,.07)!important;color:#a93226!important;}',
    '.tmesc-wrap .tm-opt:disabled{cursor:default;}',
    /* opciones modo difícil (todas las tonalidades) */
    '.tmesc-wrap .tm-opts-hard{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}',
    '.tmesc-wrap .tm-opt-hard{font-size:.82rem;font-weight:600;padding:8px 12px;border:1px solid #d8d0b8;background:#fdfcf9;color:#333;cursor:pointer;border-radius:3px;transition:all .15s;font-family:inherit;}',
    '.tmesc-wrap .tm-opt-hard:hover:not(:disabled){border-color:#8b6914;background:#fdf8ee;}',
    '.tmesc-wrap .tm-opt-hard.tm-ok{border-color:#27ae60!important;background:rgba(39,174,96,.1)!important;color:#1e8449!important;}',
    '.tmesc-wrap .tm-opt-hard.tm-ko{border-color:#c0392b!important;background:rgba(192,57,43,.07)!important;color:#a93226!important;}',
    '.tmesc-wrap .tm-opt-hard:disabled{cursor:default;}',
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
        '<div class="tm-staff-wrap" id="' + uid + '_staffwrap"><div id="' + uid + '_staff"></div></div>',
        '<div id="' + uid + '_opts"></div>',
        '<div class="tm-fb" id="' + uid + '_fb"></div>',
        '<button class="tm-nxt" id="' + uid + '_nxt">Siguiente →</button>',
      '</div>'
    ].join('');

    var st = { total: 0, correct: 0, streak: 0, qnum: 0, answered: false, diff: 'easy' };
    var used = [];
    var cQ = null;

    var elTot  = document.getElementById(uid + '_tot');
    var elCor  = document.getElementById(uid + '_cor');
    var elPct  = document.getElementById(uid + '_pct');
    var elStr  = document.getElementById(uid + '_str');
    var elPbar = document.getElementById(uid + '_pbar');
    var elQnum = document.getElementById(uid + '_qnum');
    var elStaff= document.getElementById(uid + '_staff');
    var elOpts = document.getElementById(uid + '_opts');
    var elFb   = document.getElementById(uid + '_fb');
    var elNxt  = document.getElementById(uid + '_nxt');
    var elCard = document.getElementById(uid + '_card');

    document.getElementById(uid + '_easy').addEventListener('click', function() { setDiff('easy'); });
    document.getElementById(uid + '_hard').addEventListener('click', function() { setDiff('hard'); });
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
      elTot.textContent = st.total;
      elCor.textContent = st.correct;
      elPct.textContent = st.total > 0 ? Math.round(st.correct / st.total * 100) + '%' : '—';
      elStr.textContent = st.streak;
      elPbar.style.width = st.total > 0 ? Math.round(st.correct / st.total * 100) + '%' : '0%';
    }

    function genQ() {
      /* sin repetición mientras haya escalas no usadas */
      var pool = SCALES.filter(function(s, i) { return used.indexOf(i) === -1; });
      if (!pool.length) { used = []; pool = SCALES.slice(); }
      var idx = Math.floor(Math.random() * pool.length);
      var correct = pool[idx];
      used.push(SCALES.indexOf(correct));

      var opts;
      if (st.diff === 'easy') {
        var wrong = SCALES.filter(function(s) { return s.name !== correct.name; });
        wrong = wrong.sort(function() { return Math.random() - 0.5; }).slice(0, 3);
        opts = [correct].concat(wrong).sort(function() { return Math.random() - 0.5; });
      } else {
        opts = ALL_NAMES.slice();
      }
      return { scale: correct, opts: opts };
    }

    function renderStaff(scale) {
      elStaff.innerHTML = '';
      if (typeof Vex === 'undefined') return;
      var VF = Vex.Flow;
      var W = 520, H = 110;
      var rend = new VF.Renderer(elStaff, VF.Renderer.Backends.SVG);
      rend.resize(W, H);
      var ctx = rend.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new VF.Stave(10, 15, W - 20);
      stave.addClef('treble').setContext(ctx).draw();

      var notes = scale.notes.map(function(pitch) {
        var acc = scale.acc && scale.acc[pitch] ? scale.acc[pitch] : null;
        var note = new VF.StaveNote({ keys: [pitch], duration: 'q' });
        if (acc) note.addModifier(new VF.Accidental(acc), 0);
        return note;
      });

      var voice = new VF.Voice({ num_beats: 8, beat_value: 4 }).setStrict(false);
      voice.addTickables(notes);
      new VF.Formatter().joinVoices([voice]).format([voice], W - 100);
      voice.draw(ctx, stave);
    }

    function renderOpts() {
      elOpts.innerHTML = '';
      st.answered = false;

      if (st.diff === 'easy') {
        var div = document.createElement('div');
        div.className = 'tm-opts';
        cQ.opts.forEach(function(s) {
          var b = document.createElement('button');
          b.className = 'tm-opt';
          b.textContent = s.name;
          b.addEventListener('click', function() { answer(s.name, b); });
          div.appendChild(b);
        });
        elOpts.appendChild(div);
      } else {
        var div2 = document.createElement('div');
        div2.className = 'tm-opts-hard';
        ALL_NAMES.forEach(function(name) {
          var b = document.createElement('button');
          b.className = 'tm-opt-hard';
          b.textContent = name;
          b.addEventListener('click', function() { answer(name, b); });
          div2.appendChild(b);
        });
        elOpts.appendChild(div2);
      }
    }

    function answer(chosen, btn) {
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
        /* marcar la correcta */
        elOpts.querySelectorAll('.tm-opt, .tm-opt-hard').forEach(function(x) {
          if (x.textContent === correct) x.classList.add('tm-ok');
          x.disabled = true;
        });
        elFb.className = 'tm-fb tm-ko tm-show';
        elFb.innerHTML = '<strong>✗ Incorrecto</strong> — La respuesta correcta era: <strong>' + correct + '</strong>.';
        elCard.classList.add('tm-shake');
        setTimeout(function() { elCard.classList.remove('tm-shake'); }, 400);
      }
      elOpts.querySelectorAll('.tm-opt, .tm-opt-hard').forEach(function(x) { x.disabled = true; });
      updateStats();
      elNxt.className = 'tm-nxt tm-show';
    }

    function nextQ() {
      cQ = genQ();
      st.qnum++;
      elQnum.textContent = st.qnum;
      elFb.className = 'tm-fb';
      elNxt.className = 'tm-nxt';
      renderStaff(cQ.scale);
      renderOpts();
    }

    waitVex(nextQ);
  }

  window.tmEscMayores = tmEscMayores;
})();
