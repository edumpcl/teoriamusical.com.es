/* Motor de ejercicios de intervalos — equivalente al plugin WP tm_iv_engine */
(function () {
  'use strict';

  var DEFS = {
    "1j":[0,0,"1","Justa"], "2d":[1,0,"2","Dis"],  "2m":[1,1,"2","menor"],
    "2M":[1,2,"2","Mayor"], "3d":[2,2,"3","Dis"],  "3m":[2,3,"3","menor"],
    "3M":[2,4,"3","Mayor"], "4d":[3,4,"4","Dis"],  "4j":[3,5,"4","Justa"],
    "4A":[3,6,"4","Aum"],   "5d":[4,6,"5","Dis"],  "5j":[4,7,"5","Justa"],
    "5A":[4,8,"5","Aum"],   "6m":[5,8,"6","menor"],"6M":[5,9,"6","Mayor"],
    "7m":[6,10,"7","menor"],"7M":[6,11,"7","Mayor"],"8j":[7,12,"8","Justa"]
  };
  var NS = [0,2,4,5,7,9,11];
  var VF_NAMES = ["c","d","e","f","g","a","b"];

  var CSS = [
    '.tm-iv-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-iv-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-iv-wrap .tm-staff{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;min-height:140px;display:flex;justify-content:center;}',
    '.tm-iv-wrap .tm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:10px;margin-top:10px;}',
    '.tm-iv-wrap .tm-opt{font-size:.85rem;font-weight:700;padding:12px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;transition:0.2s;text-align:center;}',
    '.tm-iv-wrap .tm-opt.tm-sel{background:#8b6914!important;color:#fff!important;border-color:#8b6914!important;box-shadow:0 4px 10px rgba(139,105,20,0.3);}',
    '.tm-iv-wrap .tm-opt.tm-ok{background:#27ae60!important;color:#fff!important;}',
    '.tm-iv-wrap .tm-opt.tm-ko{background:#c0392b!important;color:#fff!important;}',
    '.tm-iv-wrap .tm-submit{width:100%;margin-top:20px;padding:15px;background:#d8d0b8;color:#fff;border:none;border-radius:6px;font-weight:800;cursor:not-allowed;}',
    '.tm-iv-wrap .tm-submit.tm-ready{background:#8b6914;cursor:pointer;}',
    '.tm-iv-wrap .tm-fb{display:none;margin-top:15px;padding:15px;border-radius:6px;font-weight:600;}',
    '.tm-iv-wrap .tm-fb.tm-show{display:block;}',
    '.tm-iv-wrap .tm-fb.tm-ok{background:#e8f5e9;color:#2e7d32;}',
    '.tm-iv-wrap .tm-fb.tm-ko{background:#ffebee;color:#c62828;}',
    '.tm-iv-wrap .tm-nxt{display:none;width:100%;margin-top:10px;padding:15px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;}',
    '.tm-iv-wrap .tm-nxt.tm-show{display:block;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-iv-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-iv-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmIvEngine(containerId, config) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';

    var uid = containerId;
    wrap.innerHTML = [
      '<div class="tm-card">',
        '<div class="tm-staff"><div id="' + uid + '_not"></div></div>',
        '<div id="' + uid + '_content"></div>',
        '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>',
        '<div id="' + uid + '_fb" class="tm-fb"></div>',
        '<button id="' + uid + '_nxt" class="tm-nxt">Siguiente →</button>',
      '</div>'
    ].join('');

    var st = { ans: false };
    var sel = {};
    var cQ = null;

    var elNot  = document.getElementById(uid + '_not');
    var elCont = document.getElementById(uid + '_content');
    var elBtn  = document.getElementById(uid + '_btn');
    var elFb   = document.getElementById(uid + '_fb');
    var elNxt  = document.getElementById(uid + '_nxt');

    function selOpt(g, v, btn) {
      if (st.ans) return;
      btn.parentElement.querySelectorAll('.tm-opt').forEach(function (x) { x.classList.remove('tm-sel'); });
      btn.classList.add('tm-sel');
      sel[g] = v;
      elBtn.classList.add('tm-ready');
    }

    function genQ() {
      var keys = Object.keys(DEFS);
      if (config.test === 'grupo') keys = keys.filter(function (k) { return DEFS[k][2] === config.val; });
      var k   = keys[Math.floor(Math.random() * keys.length)];
      var def = DEFS[k];
      var n1  = Math.floor(Math.random() * 7);
      var n2  = (n1 + def[0]) % 7;
      var nd  = NS[n2] - NS[n1]; if (nd < 0) nd += 12;
      cQ = { k: k, def: def, n1: n1, n2: n2, a2: def[1] - nd };
    }

    function renderContent() {
      var h = '';
      if (config.test === 'completo') {
        h += '<div><div class="tm-grid">' +
          ['2','3','4','5','6','7','8'].map(function (n) {
            return '<button class="tm-opt" data-g="num" data-v="' + n + '">' + n + 'ª</button>';
          }).join('') + '</div></div>';
        h += '<div style="margin-top:10px"><div class="tm-grid">' +
          ['Mayor','menor','Justa','Aumentada','Disminuida'].map(function (t) {
            return '<button class="tm-opt" data-g="tipo" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div></div>';
      } else if (config.test === 'consonancia') {
        h += '<div class="tm-grid">' +
          ['Consonancia Perfecta','Consonancia Imperfecta','Semiconsonancia','Disonancia Absoluta','Disonancia Condicional'].map(function (t) {
            return '<button class="tm-opt" data-g="ans" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div>';
      } else {
        h += '<div class="tm-grid">' +
          ['Mayor','menor','Justa','Aumentada','Disminuida'].map(function (t) {
            return '<button class="tm-opt" data-g="ans" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div>';
      }
      elCont.innerHTML = h;
      elCont.querySelectorAll('.tm-opt').forEach(function (btn) {
        btn.addEventListener('click', function () { selOpt(btn.dataset.g, btn.dataset.v, btn); });
      });
    }

    function drawStaff() {
      elNot.innerHTML = '';
      var V = Vex.Flow;
      var r = new V.Renderer(elNot, V.Renderer.Backends.SVG);
      r.resize(300, 130);
      var ctx = r.getContext();
      var stave = new V.Stave(10, 10, 280);
      stave.addClef('treble').setContext(ctx).draw();
      var sn1 = new V.StaveNote({ keys: [VF_NAMES[cQ.n1] + '/4'], duration: 'h' });
      var sn2 = new V.StaveNote({ keys: [VF_NAMES[cQ.n2] + '/' + (cQ.n2 < cQ.n1 ? 5 : 4)], duration: 'h' });
      if (cQ.a2 !== 0) sn2.addModifier(new V.Accidental(cQ.a2 === 1 ? '#' : 'b'), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([sn1, sn2]);
      new V.Formatter().joinVoices([voice]).format([voice], 180);
      voice.draw(ctx, stave);
    }

    function nextQ() {
      st.ans = false; sel = {};
      elFb.className = 'tm-fb';
      elNxt.className = 'tm-nxt';
      elBtn.style.display = 'block';
      elBtn.classList.remove('tm-ready');
      genQ(); renderContent(); drawStaff();
    }

    elBtn.addEventListener('click', function () {
      if (!elBtn.classList.contains('tm-ready')) return;
      st.ans = true;
      elBtn.style.display = 'none';
      elNxt.className = 'tm-nxt tm-show';
      elFb.className = 'tm-fb tm-show tm-ok';
      elFb.textContent = '¡Hecho! Respuesta registrada.';
      elCont.querySelectorAll('.tm-opt').forEach(function (b) {
        if (b.classList.contains('tm-sel')) b.classList.add('tm-ok');
        b.disabled = true;
      });
    });

    elNxt.addEventListener('click', nextQ);

    if (typeof Vex !== 'undefined') {
      nextQ();
    } else {
      window.addEventListener('vexflow-ready', nextQ, { once: true });
    }
  }

  window.tmIvEngine = tmIvEngine;
})();
