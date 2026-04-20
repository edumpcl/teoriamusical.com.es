"""
Convierte el plugin PHP tm-quiz-oposiciones a un motor JS estático.
Genera assets/js/quiz-oposiciones.js e inyecta el widget en
test-tecnico-de-laboratorio/index.html.
"""
import os, re, json

ROOT     = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHP_FILE = r'C:\Users\edues\Downloads\plugins-6\tm-quiz-oposiciones\tm-quiz-oposiciones.php'
OUT_JS   = os.path.join(ROOT, 'assets', 'js', 'quiz-oposiciones.js')
HTML     = os.path.join(ROOT, 'test-tecnico-de-laboratorio', 'index.html')

BANK_MAP = [
    ('conceptos-calidad',    'bank_conceptos'),
    ('liquidos-biologicos',  'bank_liquidos'),
    ('lipidos',              'bank_lipidos'),
    ('higado-proteinas',     'bank_higado'),
    ('marcadores-tumorales', 'bank_marcadores'),
    ('hormonas-hdc',         'bank_hormonas'),
    ('digestivo-heces',      'bank_digestivo'),
]

PLACEHOLDER_TOPICS = [
    'conceptos-calidad',
    'liquidos-biologicos',
    'lipidos',
    'higado-proteinas',
    'marcadores-tumorales',
    'hormonas-hdc',
    'digestivo-heces',
]

TITULOS = {
    'conceptos-calidad':    'Conceptos Básicos de Calidad',
    'liquidos-biologicos':  'Líquidos Biológicos',
    'lipidos':              'Metabolismo Lipídico',
    'higado-proteinas':     'Función Hepática y Proteínas',
    'marcadores-tumorales': 'Marcadores Tumorales',
    'hormonas-hdc':         'Hormonas y Metabolismo de HC',
    'digestivo-heces':      'Función Digestiva y Heces',
}

def parse_php_array(text):
    """Parsea arrays PHP de la forma ['id'=>N,'q'=>'...','o'=>[...],'c'=>N]"""
    rows = []
    row_re = re.compile(
        r"\['id'=>(\d+),'q'=>'((?:[^'\\]|\\.)*)','o'=>\['((?:[^'\\]|\\.)*?)','((?:[^'\\]|\\.)*?)','((?:[^'\\]|\\.)*?)','((?:[^'\\]|\\.)*?)'\],'c'=>(\d+)\]",
        re.DOTALL
    )
    for m in row_re.finditer(text):
        row = {
            'q': m.group(2).replace("\\'", "'"),
            'o': [
                m.group(3).replace("\\'", "'"),
                m.group(4).replace("\\'", "'"),
                m.group(5).replace("\\'", "'"),
                m.group(6).replace("\\'", "'"),
            ],
            'c': int(m.group(7))
        }
        rows.append(row)
    return rows

def extract_bank(php_text, func_name):
    """Extrae el return [...] de una función PHP."""
    pattern = r'function tm_opos_' + func_name + r'\(\)[^{]*\{.*?return \[(.*?)\];\s*\}'
    m = re.search(pattern, php_text, re.DOTALL)
    if not m:
        print(f'  WARN: no encontrado {func_name}')
        return []
    return parse_php_array('[' + m.group(1) + ']')

def main():
    with open(PHP_FILE, encoding='utf-8') as f:
        php = f.read()

    banks = {}
    for tema, func in BANK_MAP:
        rows = extract_bank(php, func)
        banks[tema] = rows
        print(f'  {tema}: {len(rows)} preguntas')

    # ── Generar quiz-oposiciones.js ──────────────────────────────────────
    banks_js = 'var TM_OPOS_BANKS = ' + json.dumps(banks, ensure_ascii=False, indent=2) + ';\n'

    engine_css = r"""
.tmopos-wrap{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;max-width:760px;margin:0 auto;color:#1a1a2e;box-sizing:border-box}
.tmopos-wrap *{box-sizing:border-box}
.tmopos-hidden{display:none!important}
.tmopos-title{text-align:center;font-size:1.5rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e}
.tmopos-subtitle{text-align:center;color:#555;margin:0 0 2rem}
.tmopos-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;padding:0}
.tmopos-mode-btn{background:#fff;border:2px solid #d0d7e3;border-radius:12px;padding:1.5rem 2.5rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.3rem;min-width:120px;font-family:inherit}
.tmopos-mode-btn:hover{border-color:#3b6fd4;background:#eef3ff}
.tmopos-mode-num{font-size:2.4rem;font-weight:800;color:#3b6fd4;line-height:1;display:block}
.tmopos-mode-lbl{font-size:.85rem;color:#666;font-weight:500;text-transform:uppercase;letter-spacing:.05em;display:block}
.tmopos-header{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}
.tmopos-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0}
.tmopos-progress-bar{height:8px;background:#e4e9f2;border-radius:4px;overflow:hidden}
.tmopos-progress-fill{height:100%;background:#3b6fd4;border-radius:4px;transition:width .4s ease;width:0%}
.tmopos-counter{font-size:.85rem;color:#666;font-weight:500}
.tmopos-timer{font-size:1.1rem;font-weight:700;color:#3b6fd4;background:#eef3ff;padding:.3rem .8rem;border-radius:8px;white-space:nowrap;font-variant-numeric:tabular-nums}
.tmopos-question{font-size:1.05rem;font-weight:600;line-height:1.6;margin-bottom:1.2rem;background:#f8f9fd;border-left:4px solid #3b6fd4;padding:.9rem 1rem;border-radius:0 8px 8px 0}
.tmopos-options{display:flex;flex-direction:column;gap:.6rem}
.tmopos-opt{display:flex;align-items:flex-start;gap:.8rem;background:#fff;border:2px solid #d0d7e3;border-radius:10px;padding:.8rem 1rem;cursor:pointer;transition:all .18s;text-align:left;font-size:.95rem;line-height:1.5;width:100%;font-family:inherit;color:#1a1a2e}
.tmopos-opt:hover{border-color:#3b6fd4;background:#f0f4ff}
.tmopos-opt:disabled{cursor:default;opacity:.9}
.tmopos-opt:hover:disabled{border-color:#d0d7e3;background:#fff}
.tmopos-opt.correct:disabled{border-color:#1a9650!important;background:#f0faf4!important}
.tmopos-opt.wrong:disabled{border-color:#d63031!important;background:#fff5f5!important}
.tmopos-letter{flex-shrink:0;width:26px;height:26px;background:#e4e9f2;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;color:#555}
.tmopos-opt.correct .tmopos-letter{background:#1a9650;color:#fff}
.tmopos-opt.wrong .tmopos-letter{background:#d63031;color:#fff}
.tmopos-btn{margin-top:1.2rem;background:#3b6fd4;color:#fff;border:none;border-radius:10px;padding:.75rem 1.8rem;font-size:1rem;font-weight:600;cursor:pointer;transition:background .2s;font-family:inherit;display:inline-block}
.tmopos-btn:hover{background:#2a55b0}
.tmopos-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#3b6fd4,#2a55b0);border-radius:16px;color:#fff;margin-bottom:2rem}
.tmopos-score-num{font-size:3rem;font-weight:800;line-height:1}
.tmopos-score-pct{font-size:1.4rem;font-weight:600;opacity:.9;margin:.3rem 0}
.tmopos-score-time{font-size:.9rem;opacity:.75;margin-top:.4rem}
.tmopos-review-item{margin-bottom:1.2rem;border:1px solid #e4e9f2;border-radius:10px;overflow:hidden}
.tmopos-review-q{background:#f8f9fd;padding:.7rem 1rem;font-weight:600;font-size:.9rem;line-height:1.5;border-bottom:1px solid #e4e9f2}
.tmopos-rnum{color:#3b6fd4;margin-right:.4rem}
.tmopos-review-opts{padding:.6rem 1rem;display:flex;flex-direction:column;gap:.35rem}
.tmopos-review-opt{font-size:.88rem;padding:.35rem .7rem;border-radius:6px;line-height:1.4}
.tmopos-review-opt.rc{background:#f0faf4;color:#1a9650;font-weight:600}
.tmopos-review-opt.rw{background:#fff5f5;color:#d63031;font-weight:600}
.tmopos-review-opt.rn{color:#555}
@media(max-width:500px){.tmopos-modes{flex-direction:column;align-items:center}.tmopos-score-num{font-size:2.2rem}.tmopos-mode-btn{width:100%;max-width:200px}}
"""

    engine_js = r"""
(function() {
'use strict';

function injectCSS() {
  if (document.getElementById('tmopos-css')) return;
  var s = document.createElement('style');
  s.id = 'tmopos-css';
  s.textContent = TM_OPOS_CSS;
  document.head.appendChild(s);
}

function tmQuizOpos(containerId, tema) {
  injectCSS();
  var wrap = document.getElementById(containerId);
  if (!wrap) return;
  var BANK = TM_OPOS_BANKS[tema] || [];
  var titulo = TM_OPOS_TITULOS[tema] || tema;
  var n = BANK.length;
  var uid = containerId;

  wrap.className = 'tmopos-wrap';
  wrap.innerHTML = [
    '<div class="tmopos-screen" id="' + uid + '-mode">',
      '<h2 class="tmopos-title">Test de ' + titulo + '</h2>',
      '<p class="tmopos-subtitle">Banco de <strong>' + n + ' preguntas</strong> &mdash; elige el modo</p>',
      '<div class="tmopos-modes">',
        '<button class="tmopos-mode-btn" data-n="10"><span class="tmopos-mode-num">10</span><span class="tmopos-mode-lbl">R\u00e1pido</span></button>',
        '<button class="tmopos-mode-btn" data-n="25"><span class="tmopos-mode-num">25</span><span class="tmopos-mode-lbl">Medio</span></button>',
        '<button class="tmopos-mode-btn" data-n="50"><span class="tmopos-mode-num">50</span><span class="tmopos-mode-lbl">Completo</span></button>',
      '</div>',
    '</div>',
    '<div class="tmopos-screen tmopos-hidden" id="' + uid + '-quiz">',
      '<div class="tmopos-header">',
        '<div class="tmopos-progress-wrap">',
          '<div class="tmopos-progress-bar"><div class="tmopos-progress-fill" id="' + uid + '-fill"></div></div>',
          '<span class="tmopos-counter" id="' + uid + '-counter">1 / 10</span>',
        '</div>',
        '<div class="tmopos-timer" id="' + uid + '-timer">00:00</div>',
      '</div>',
      '<div class="tmopos-question" id="' + uid + '-qtext"></div>',
      '<div class="tmopos-options" id="' + uid + '-options"></div>',
      '<button class="tmopos-btn tmopos-hidden" id="' + uid + '-next">Siguiente &rarr;</button>',
      '<button class="tmopos-btn tmopos-hidden" id="' + uid + '-finish">Ver resultados</button>',
    '</div>',
    '<div class="tmopos-screen tmopos-hidden" id="' + uid + '-results">',
      '<div class="tmopos-score-box">',
        '<div class="tmopos-score-num" id="' + uid + '-score">0/0</div>',
        '<div class="tmopos-score-pct" id="' + uid + '-pct">0%</div>',
        '<div class="tmopos-score-time" id="' + uid + '-rtime"></div>',
      '</div>',
      '<div class="tmopos-review" id="' + uid + '-review"></div>',
      '<button class="tmopos-btn" id="' + uid + '-restart">Hacer otro test</button>',
    '</div>'
  ].join('');

  var quiz = {}, timer = null, elapsed = 0;
  var LETTERS = ['A','B','C','D'];

  function el(id) { return document.getElementById(uid + '-' + id); }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function fmt(s) {
    var m = Math.floor(s / 60), sec = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function screen(name) {
    ['mode','quiz','results'].forEach(function(s) {
      var div = el(s);
      if (div) div.classList.toggle('tmopos-hidden', s !== name);
    });
  }

  function startTimer() {
    elapsed = 0;
    el('timer').textContent = '00:00';
    timer = setInterval(function() { elapsed++; el('timer').textContent = fmt(elapsed); }, 1000);
  }

  function stopTimer() { clearInterval(timer); }

  function startQuiz(n) {
    var pool = shuffle(BANK).slice(0, Math.min(n, BANK.length));
    quiz = { pool: pool, n: pool.length, idx: 0, answers: [], score: 0 };
    screen('quiz');
    startTimer();
    renderQ();
  }

  function renderQ() {
    var q = quiz.pool[quiz.idx];
    el('fill').style.width = Math.round((quiz.idx / quiz.n) * 100) + '%';
    el('counter').textContent = (quiz.idx + 1) + ' / ' + quiz.n;
    el('qtext').textContent = q.q;
    var optsDiv = el('options');
    optsDiv.innerHTML = '';
    for (var i = 0; i < q.o.length; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tmopos-opt';
      var letter = document.createElement('span');
      letter.className = 'tmopos-letter';
      letter.textContent = LETTERS[i];
      var text = document.createElement('span');
      text.textContent = q.o[i];
      btn.appendChild(letter);
      btn.appendChild(text);
      (function(idx, question) {
        btn.addEventListener('click', function() { pick(idx, question); });
      })(i, q);
      optsDiv.appendChild(btn);
    }
    el('next').classList.add('tmopos-hidden');
    el('finish').classList.add('tmopos-hidden');
  }

  function pick(chosen, q) {
    var btns = el('options').querySelectorAll('.tmopos-opt');
    for (var i = 0; i < btns.length; i++) btns[i].disabled = true;
    btns[q.c].classList.add('correct');
    if (chosen !== q.c) btns[chosen].classList.add('wrong');
    quiz.answers.push({ chosen: chosen, correct: q.c });
    if (chosen === q.c) quiz.score++;
    if (quiz.idx < quiz.n - 1) {
      el('next').classList.remove('tmopos-hidden');
    } else {
      el('finish').classList.remove('tmopos-hidden');
    }
  }

  function nextQ() {
    quiz.idx++;
    el('next').classList.add('tmopos-hidden');
    renderQ();
  }

  function showResults() {
    stopTimer();
    var s = quiz.score, tot = quiz.n;
    var pct = Math.round((s / tot) * 100);
    el('score').textContent = s + ' / ' + tot;
    el('pct').textContent = pct + '% de aciertos';
    el('rtime').textContent = 'Tiempo: ' + fmt(elapsed);
    var rev = el('review');
    rev.innerHTML = '';
    for (var i = 0; i < quiz.pool.length; i++) {
      var q = quiz.pool[i];
      var ans = quiz.answers[i];
      var item = document.createElement('div');
      item.className = 'tmopos-review-item';
      var qDiv = document.createElement('div');
      qDiv.className = 'tmopos-review-q';
      var numSpan = document.createElement('span');
      numSpan.className = 'tmopos-rnum';
      numSpan.textContent = (i + 1) + '. ' + (ans.chosen === q.c ? '\u2713' : '\u2717');
      qDiv.appendChild(numSpan);
      qDiv.appendChild(document.createTextNode(q.q));
      item.appendChild(qDiv);
      var oDiv = document.createElement('div');
      oDiv.className = 'tmopos-review-opts';
      for (var j = 0; j < q.o.length; j++) {
        var oSpan = document.createElement('div');
        oSpan.className = 'tmopos-review-opt';
        var suffix = '';
        if (j === q.c) { oSpan.classList.add('rc'); suffix = ' \u2713'; }
        else if (j === ans.chosen && ans.chosen !== q.c) { oSpan.classList.add('rw'); suffix = ' \u2717'; }
        else { oSpan.classList.add('rn'); }
        oSpan.textContent = LETTERS[j] + ') ' + q.o[j] + suffix;
        oDiv.appendChild(oSpan);
      }
      item.appendChild(oDiv);
      rev.appendChild(item);
    }
    screen('results');
  }

  wrap.querySelectorAll('.tmopos-mode-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { startQuiz(parseInt(this.getAttribute('data-n'), 10)); });
  });
  el('next').addEventListener('click', nextQ);
  el('finish').addEventListener('click', showResults);
  el('restart').addEventListener('click', function() { stopTimer(); screen('mode'); });
  screen('mode');
}

window.tmQuizOpos = tmQuizOpos;
})();
"""

    with open(OUT_JS, 'w', encoding='utf-8') as f:
        f.write('/* Quiz Oposiciones — motor estático */\n')
        f.write('var TM_OPOS_CSS = ' + json.dumps(engine_css, ensure_ascii=False) + ';\n')
        f.write('var TM_OPOS_TITULOS = ' + json.dumps(TITULOS, ensure_ascii=False) + ';\n')
        f.write(banks_js)
        f.write(engine_js)

    print(f'  Generado: {OUT_JS}')

    # ── Actualizar index.html ────────────────────────────────────────────
    with open(HTML, encoding='utf-8') as f:
        html = f.read()

    # Inyectar script en <head> si no está
    if 'quiz-oposiciones' not in html:
        html = html.replace('</head>', '<script src="/assets/js/quiz-oposiciones.js" defer></script>\n</head>', 1)

    # Reemplazar cada placeholder con el widget apropiado
    PLACEHOLDER_RE = re.compile(
        r'<aside class="tm-quiz-placeholder" data-shortcode="tm_quiz">.*?</aside>',
        re.DOTALL
    )

    idx = [0]  # mutable counter
    def replacer(m):
        i = idx[0]
        idx[0] += 1
        if i >= len(PLACEHOLDER_TOPICS):
            return m.group(0)
        tema = PLACEHOLDER_TOPICS[i]
        uid = 'tmopos_' + tema.replace('-', '_')
        return (
            '<div id="' + uid + '"></div>\n'
            '<script>\n'
            '  document.addEventListener("DOMContentLoaded", function(){\n'
            '    tmQuizOpos("' + uid + '", "' + tema + '");\n'
            '  });\n'
            '</script>'
        )

    new_html, n = PLACEHOLDER_RE.subn(replacer, html)
    if n:
        with open(HTML, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f'  Reemplazados {n} placeholders en {HTML}')
    else:
        print('  Sin placeholders que reemplazar')

    print('\nListo.')

main()
