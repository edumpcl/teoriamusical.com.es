/* Audio de piano reutilizable (muestras Salamander afinadas con Web Audio).
   API:  window.tmPiano.playScale(['Do','Re',...], {step,baseOct})
         window.tmPiano.playMidi(midi)
   Auto-cablea un botón ▶ en cada fila de las tablas con clase "tm-scales"
   (reproduce las notas de la última celda) y en elementos con [data-tm-scale]. */
(function () {
  'use strict';

  var AUDIO_BASE = '/assets/audio/piano/';
  // Por cada clase cromática: [muestra, desplazamiento de octava, semitonos a afinar]
  var SAMP = { 0: ['C', 0, 0], 1: ['C', 0, 1], 2: ['Ds', 0, -1], 3: ['Ds', 0, 0], 4: ['Ds', 0, 1], 5: ['Fs', 0, -1], 6: ['Fs', 0, 0], 7: ['Fs', 0, 1], 8: ['A', 0, -1], 9: ['A', 0, 0], 10: ['A', 0, 1], 11: ['C', 1, -1] };
  var BASE = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };

  var actx = null, cache = {};
  function ctx() { if (!actx) { var AC = window.AudioContext || window.webkitAudioContext; if (AC) actx = new AC(); } return actx; }
  function loadBuf(file) {
    if (cache[file]) return cache[file];
    cache[file] = fetch(AUDIO_BASE + file + '.ogg')
      .then(function (r) { return r.arrayBuffer(); })
      .then(function (a) { return new Promise(function (res, rej) { ctx().decodeAudioData(a, res, rej); }); });
    return cache[file];
  }
  function sampOf(m) { var s = ((m % 12) + 12) % 12, oct = Math.floor(m / 12) - 1, map = SAMP[s]; return { file: map[0] + (oct + map[1]), rate: Math.pow(2, map[2] / 12) }; }
  /* Envolvente: la nota sostiene hasta que entra la siguiente y luego hace un
     release corto que solapa con ella (ligado, sin silencios y sin que se amontonen). */
  function startAt(c, m, when, bmap, hold, isLast) {
    var sp = sampOf(m), src = c.createBufferSource();
    src.buffer = bmap[sp.file]; src.playbackRate.value = sp.rate;
    var g = c.createGain();
    var peak = 0.85, rel = isLast ? 0.6 : 0.07, end = when + (hold || 0.34);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(peak, when + 0.012);   // ataque rápido
    g.gain.setValueAtTime(peak, end);                          // sostiene hasta el relevo
    g.gain.exponentialRampToValueAtTime(0.0008, end + rel);    // release breve que solapa la siguiente
    src.connect(g).connect(c.destination);
    src.start(when); src.stop(end + rel + 0.03);
  }

  function nameToPc(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)([♯♭#b]?)/.exec((n || '').trim());
    if (!m) return null;
    var pc = BASE[m[1]];
    if (m[2] === '♯' || m[2] === '#') pc += 1;
    else if (m[2] === '♭' || m[2] === 'b') pc -= 1;
    return ((pc % 12) + 12) % 12;
  }
  function scaleToMidis(names, baseOct) {
    baseOct = baseOct || 4;
    var out = [], prev = -1;
    names.forEach(function (nm) {
      var pc = nameToPc(nm); if (pc == null) return;
      var midi = (baseOct + 1) * 12 + pc;
      while (midi <= prev) midi += 12;
      out.push(midi); prev = midi;
    });
    if (out.length) out.push(out[0] + 12);   // octava de la tónica al final
    return out;
  }

  function playMidi(m) {
    var c = ctx(); if (!c) return;
    if (c.state === 'suspended') c.resume();
    var sp = sampOf(m);
    loadBuf(sp.file).then(function (buf) { var b = {}; b[sp.file] = buf; startAt(c, m, c.currentTime + 0.02, b, 0.9, true); }).catch(function () {});
  }

  /* Reproduce una secuencia de notas MIDI ya calculada (permite escalas que bajan, p. ej. la menor melódica). */
  function playMidis(midis, opts) {
    opts = opts || {};
    var step = opts.step || 0.34;
    var c = ctx(); if (!c) return Promise.resolve();
    if (c.state === 'suspended') c.resume();
    if (!midis || !midis.length) return Promise.resolve();
    var files = {}; midis.forEach(function (m) { files[sampOf(m).file] = 1; });
    return Promise.all(Object.keys(files).map(function (f) { return loadBuf(f).then(function (buf) { return [f, buf]; }); }))
      .then(function (arr) {
        var bmap = {}; arr.forEach(function (o) { bmap[o[0]] = o[1]; });
        var t0 = c.currentTime + 0.06, last = midis.length - 1;
        midis.forEach(function (m, i) { startAt(c, m, t0 + i * step, bmap, step, i === last); });
        return midis.length * step;
      }).catch(function () {});
  }

  function playScale(names, opts) {
    opts = opts || {};
    return playMidis(scaleToMidis(names, opts.baseOct), opts);
  }

  var CSS = '.tm-play-scale{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.66rem;cursor:pointer;margin-left:8px;vertical-align:middle;line-height:1;flex:0 0 auto;}.tm-play-scale:hover{background:#6b5010;}.tm-play-scale.tm-playing{background:#27ae60;}'
    + 'figure.tm-has-play{position:relative;padding-left:44px;}figure.tm-has-play img{max-width:100%;}.tm-play-scale--fig{position:absolute;left:4px;top:50%;transform:translateY(-50%);margin:0;width:34px;height:34px;font-size:.8rem;box-shadow:0 1px 4px rgba(0,0,0,.3);z-index:2;}';
  function injectCSS() { if (document.getElementById('tm-piano-css')) return; var s = document.createElement('style'); s.id = 'tm-piano-css'; s.textContent = CSS; document.head.appendChild(s); }

  function makeBtnFromPlay(starter, label, extraClass) {
    var btn = document.createElement('button');
    btn.className = 'tm-play-scale' + (extraClass ? ' ' + extraClass : ''); btn.type = 'button';
    btn.setAttribute('aria-label', label || 'Escuchar'); btn.textContent = '▶';
    btn.addEventListener('click', function () {
      btn.classList.add('tm-playing');
      Promise.resolve(starter()).then(function (dur) {
        setTimeout(function () { btn.classList.remove('tm-playing'); }, ((dur || 1) * 1000) + 200);
      });
    });
    return btn;
  }
  function makeBtn(names, label, extraClass) { return makeBtnFromPlay(function () { return playScale(names); }, label, extraClass); }
  function makeBtnMidis(midis, label, extraClass) { return makeBtnFromPlay(function () { return playMidis(midis); }, label, extraClass); }

  /* Notas (MIDI) de una escala a partir de su nombre completo: "Do Mayor Mixolidia", "La menor melódica"…
     Solo se usa en las páginas de comparar (acotado con [data-scale-compare]). */
  function comparativeMidis(alt) {
    var root = normRoot(alt), pc = root == null ? null : nameToPc(root);
    if (pc == null) return null;
    var s = alt.toLowerCase(), iv = null, seq = null;
    if (/menor/.test(s)) {
      if (/mel[oó]dica/.test(s)) seq = [0, 2, 3, 5, 7, 9, 11, 12, 10, 8, 7, 5, 3, 2, 0]; // asc + desc (15 notas)
      else if (/arm[oó]nica/.test(s)) iv = [0, 2, 3, 5, 7, 8, 11];
      else if (/d[oó]rica/.test(s)) iv = [0, 2, 3, 5, 7, 9, 10];
      else if (/natural/.test(s)) iv = [0, 2, 3, 5, 7, 8, 10];
    } else if (/mayor/.test(s)) {
      if (/mixolidia/.test(s)) iv = [0, 2, 4, 5, 7, 9, 10];
      else if (/mixta principal/.test(s)) iv = [0, 2, 4, 5, 7, 8, 11];
      else if (/mixta secundaria/.test(s)) iv = [0, 2, 4, 5, 7, 8, 10];
      else if (/natural/.test(s)) iv = [0, 2, 4, 5, 7, 9, 11];
    }
    if (!iv && !seq) return null;
    var base = 60 + pc;                          // tónica en la 4ª octava
    if (seq) return seq.map(function (o) { return base + o; });
    var midis = iv.map(function (o) { return base + o; }); midis.push(base + 12); // añade la octava
    return midis;
  }

  /* racha inicial de tokens que son notas válidas */
  function leadingNotes(str) {
    var raw = (str || '').trim().split(/[\s,·]+/);
    var out = [];
    for (var i = 0; i < raw.length; i++) {
      var t = raw[i].replace(/[().;]+$/, '').replace(/^[(]+/, '');
      if (nameToPc(t) != null) out.push(t); else break;
    }
    return out;
  }

  /* Tónica (con su escritura: Fa♯ y Sol♭ son distintas) a partir de un texto libre,
     ya sea con símbolos ("Fa♯ menor") o con palabras ("Escala de Fa sostenido menor"). */
  function normRoot(str) {
    if (!str) return null;
    var s = String(str)
      .replace(/(Do|Re|Mi|Fa|Sol|La|Si)\s+sostenido/gi, '$1♯')
      .replace(/(Do|Re|Mi|Fa|Sol|La|Si)\s+bemol/gi, '$1♭')
      .replace(/(Do|Re|Mi|Fa|Sol|La|Si)#/g, '$1♯')
      .replace(/(Do|Re|Mi|Fa|Sol|La|Si)b/g, '$1♭');
    var m = /(Do|Re|Mi|Fa|Sol|La|Si)([♯♭]?)/.exec(s);
    return m ? m[1] + m[2] : null;
  }

  /* Rejillas de pentagramas por tónica: el contenedor lleva data-scale-grid="<tipo>"
     y cada <figure> tiene un figcaption con solo la tónica. Se calculan las notas desde ella
     (el sonido solo depende de la altura, así que la escritura del nombre es indiferente). */
  var GRIDS = {
    cromatica: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    'tonos-enteros': [0, 2, 4, 6, 8, 10],
    blues: [0, 3, 5, 6, 7, 10]
  };
  var PCNAME = ['Do', 'Do♯', 'Re', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
  function notesFromRoot(rootPc, intervals) { return intervals.map(function (iv) { return PCNAME[(rootPc + iv) % 12]; }); }

  function wire() {
    injectCSS();
    /* Tablas marcadas con .tm-scales: ▶ por fila. data-notes-col fija la columna (0-based); por defecto la última.
       Las tablas con data-figures NO llevan botón: solo aportan las notas a los pentagramas (ver abajo). */
    document.querySelectorAll('table.tm-scales:not([data-figures])').forEach(function (tbl) {
      var colAttr = tbl.getAttribute('data-notes-col');
      var colsAttr = tbl.getAttribute('data-notes-cols');   // rango "1-7": una nota por columna
      var range = null;
      if (colsAttr) { var mm = colsAttr.split('-'); range = [parseInt(mm[0], 10), parseInt(mm[1], 10)]; }
      tbl.querySelectorAll('tbody tr').forEach(function (tr) {
        if (tr.querySelector('.tm-play-scale')) return;
        var cells = tr.querySelectorAll('td');
        if (!cells.length) return;
        var names, target;
        if (range) {
          names = [];
          for (var ci = range[0]; ci <= range[1] && ci < cells.length; ci++) {
            var tk = leadingNotes(cells[ci].textContent);
            if (tk.length) names.push(tk[0]);
          }
          target = cells[Math.min(range[1], cells.length - 1)];
        } else {
          target = (colAttr != null) ? cells[parseInt(colAttr, 10)] : cells[cells.length - 1];
          if (!target) return;
          names = leadingNotes(target.textContent);
        }
        if (names.length < 2) return;
        target.appendChild(document.createTextNode(' '));
        target.appendChild(makeBtn(names, 'Escuchar la escala'));
      });
    });
    /* Elementos con data-tm-scale="Do Re Mi…" */
    document.querySelectorAll('[data-tm-scale]').forEach(function (el) {
      if (el.querySelector && el.querySelector('.tm-play-scale')) return;
      var names = leadingNotes(el.getAttribute('data-tm-scale'));
      if (names.length < 2) return;
      el.appendChild(makeBtn(names, 'Escuchar la escala'));
    });
    /* Pentagramas emparejados con una tabla .tm-scales[data-figures]:
       se construye un mapa tónica->notas desde la tabla y se cablea un ▶ sobre cada <figure>
       cuyo alt de imagen empiece por esa tónica (incluye las versiones "con armadura"). */
    document.querySelectorAll('table.tm-scales[data-figures]').forEach(function (tbl) {
      var colsAttr = tbl.getAttribute('data-notes-cols');
      var range = null;
      if (colsAttr) { var mm = colsAttr.split('-'); range = [parseInt(mm[0], 10), parseInt(mm[1], 10)]; }
      var map = {};
      tbl.querySelectorAll('tbody tr').forEach(function (tr) {
        var cells = tr.querySelectorAll('td');
        if (!cells.length) return;
        var root = normRoot(cells[0].textContent);
        if (!root) return;
        var names = [];
        if (range) {
          for (var ci = range[0]; ci <= range[1] && ci < cells.length; ci++) {
            var tk = leadingNotes(cells[ci].textContent);
            if (tk.length) names.push(tk[0]);
          }
        } else {
          names = leadingNotes(cells[cells.length - 1].textContent);
        }
        if (names.length >= 2 && !map[root]) map[root] = names;
      });
      var matchWord = (tbl.getAttribute('data-fig-match') || '').toLowerCase();
      document.querySelectorAll('figure').forEach(function (fig) {
        if (fig.querySelector('.tm-play-scale')) return;
        var img = fig.querySelector('img');
        if (!img) return;
        var alt = img.getAttribute('alt') || '';
        if (matchWord && alt.toLowerCase().indexOf(matchWord) < 0) return;   // solo figuras del tipo indicado
        var root = normRoot(alt);
        if (!root || !map[root]) return;
        fig.classList.add('tm-has-play');
        fig.appendChild(makeBtn(map[root], 'Escuchar la escala', 'tm-play-scale--fig'));
      });
    });
    /* Páginas de comparar: ▶ sobre cada pentagrama, notas calculadas desde el nombre completo del alt. */
    document.querySelectorAll('[data-scale-compare]').forEach(function (box) {
      box.querySelectorAll('figure').forEach(function (fig) {
        if (fig.querySelector('.tm-play-scale')) return;
        var img = fig.querySelector('img');
        if (!img) return;
        var midis = comparativeMidis(img.getAttribute('alt') || '');
        if (!midis) return;
        fig.classList.add('tm-has-play');
        fig.appendChild(makeBtnMidis(midis, 'Escuchar la escala', 'tm-play-scale--fig'));
      });
    });
    /* Rejillas data-scale-grid: ▶ sobre cada pentagrama, notas calculadas desde la tónica del figcaption. */
    document.querySelectorAll('[data-scale-grid]').forEach(function (box) {
      var ivs = GRIDS[box.getAttribute('data-scale-grid')];
      if (!ivs) return;
      box.querySelectorAll('figure').forEach(function (fig) {
        if (fig.querySelector('.tm-play-scale')) return;
        var cap = fig.querySelector('figcaption');
        var rootPc = cap ? nameToPc(cap.textContent) : null;
        if (rootPc == null) return;
        fig.classList.add('tm-has-play');
        fig.appendChild(makeBtn(notesFromRoot(rootPc, ivs), 'Escuchar la escala', 'tm-play-scale--fig'));
      });
    });
    /* Pentagramas con figcaption "…: Do Re Mi…" -> ▶ si tras los : empieza una lista de notas */
    document.querySelectorAll('figure.tm-staff figcaption').forEach(function (cap) {
      if (cap.querySelector('.tm-play-scale')) return;
      var txt = cap.textContent || '';
      var idx = txt.lastIndexOf(':');
      if (idx < 0) return;
      var tokens = leadingNotes(txt.slice(idx + 1));
      if (tokens.length < 3) return;
      cap.appendChild(document.createTextNode(' '));
      cap.appendChild(makeBtn(tokens, 'Escuchar la escala'));
    });
  }

  window.tmPiano = { playScale: playScale, playMidi: playMidi, nameToPc: nameToPc };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
})();
