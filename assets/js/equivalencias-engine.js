/* Motor de test de EQUIVALENCIAS de nombres de notas (español / inglés / alemán).
   No depende de VexFlow. Reutiliza las clases .tm-iv-* del test de lectura de notas.
   Uso:  <div id="x"></div>
         <script>tmEquivEngine('x');</script>  */
(function () {
  'use strict';

  var ES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var EN = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  var DE = ['C', 'D', 'E', 'F', 'G', 'A', 'H'];
  var PREGUNTAS_POR_TEST = 10;

  /* Subconjunto de la chrome del quiz (mismas reglas que lectura-notas-engine).
     Id propio para no romper el CSS del otro motor si ambos conviven en la página. */
  var CSS = [
    '.tm-iv-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-iv-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
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
    '.tm-iv-wrap .tm-iv-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}',
    '.tm-iv-wrap .tm-iv-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-iv-wrap .tm-iv-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-iv-wrap .tm-iv-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-iv-wrap .tm-iv-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-iv-wrap .tm-iv-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    '.tm-iv-wrap .tm-iv-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-iv-wrap .tm-iv-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-iv-wrap .tm-iv-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '.tm-iv-wrap .tm-eq-q{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;padding:26px 18px;text-align:center;font-size:1.25rem;line-height:1.45;color:#1a1a1a;min-height:84px;display:flex;align-items:center;justify-content:center;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-eq-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-eq-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Genera una pregunta {prompt, options[], answer(idx), explain} */
  function makeQuestion() {
    var pool = ['es2en', 'es2en', 'es2en', 'es2de', 'es2de', 'es2de', 'en2es', 'en2es', 'en2es', 'germanB', 'germanH'];
    var t = pool[Math.floor(Math.random() * pool.length)];
    var i = Math.floor(Math.random() * 7);
    var q, opts, ans, explain;

    if (t === 'es2en') {
      q = '¿Cómo se escribe el <strong>' + ES[i] + '</strong> en la notación inglesa?';
      opts = EN.slice(); ans = EN[i];
      explain = 'El ' + ES[i] + ' es la <strong>' + EN[i] + '</strong> en inglés.';
    } else if (t === 'es2de') {
      q = '¿Cómo se escribe el <strong>' + ES[i] + '</strong> en la notación alemana?';
      opts = DE.slice(); ans = DE[i];
      explain = 'El ' + ES[i] + ' es la <strong>' + DE[i] + '</strong> en alemán' + (i === 6 ? ' (¡no B! La B alemana es el Si♭)' : '') + '.';
    } else if (t === 'en2es') {
      q = '¿Qué nota es la <strong>' + EN[i] + '</strong> de la notación inglesa?';
      opts = ES.slice(); ans = ES[i];
      explain = 'La ' + EN[i] + ' inglesa es el <strong>' + ES[i] + '</strong>.';
    } else if (t === 'germanB') {
      q = 'En el sistema alemán, ¿qué nota representa la letra <strong>B</strong>?';
      opts = ['Do', 'La', 'Si', 'Si♭']; ans = 'Si♭';
      explain = '¡Cuidado! En alemán la <strong>B</strong> es el <strong>Si♭</strong>; el Si natural es la H.';
    } else { /* germanH */
      q = 'En el sistema alemán, la letra <strong>H</strong> corresponde a…';
      opts = ['Do', 'La', 'Si', 'Si♭']; ans = 'Si';
      explain = 'La <strong>H</strong> alemana es el <strong>Si</strong> natural (y la B es el Si♭).';
    }

    opts = shuffle(opts.slice());
    return { prompt: q, options: opts, answer: opts.indexOf(ans), answerLabel: ans, explain: explain };
  }

  function tmEquivEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;
    var totalQ = PREGUNTAS_POR_TEST;
    var currentQ, score, cQ, selIdx, answered, lastSig;

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
          '<div class="tm-eq-q" id="' + uid + '_q"></div>' +
          '<div class="tm-grid" id="' + uid + '_opts"></div>' +
          '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>' +
          '<div id="' + uid + '_fb" class="tm-fb"></div>' +
          '<button id="' + uid + '_nxt" class="tm-nxt">Siguiente →</button>' +
        '</div>';
      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);
      nextQ();
    }

    function renderOptions() {
      var el = document.getElementById(uid + '_opts');
      el.innerHTML = cQ.options.map(function (n, i) {
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
      var correct = selIdx === cQ.answer;
      if (correct) score++;
      var elFb = document.getElementById(uid + '_fb');
      elFb.className = 'tm-fb tm-show ' + (correct ? 'tm-ok' : 'tm-ko');
      elFb.innerHTML = (correct ? '<strong>✓ ¡Correcto!</strong> ' : '<strong>✗ Incorrecto.</strong> ') + cQ.explain;
      document.getElementById(uid + '_badge').textContent = '✓ ' + score;
      document.getElementById(uid + '_opts').querySelectorAll('.tm-opt').forEach(function (b) {
        b.disabled = true;
        if (parseInt(b.dataset.i, 10) === cQ.answer) b.classList.add('tm-ok');
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
      /* nueva pregunta, evitando repetir la anterior */
      do { cQ = makeQuestion(); } while (cQ.prompt === lastSig);
      lastSig = cQ.prompt;
      document.getElementById(uid + '_q').innerHTML = '<span>' + cQ.prompt + '</span>';
      renderOptions();
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
        currentQ = 0; score = 0; startQuiz();
      });
    }

    currentQ = 0; score = 0;
    startQuiz();
  }

  window.tmEquivEngine = tmEquivEngine;
})();
