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
  /* Como scaleToMidis pero SIN añadir la octava: reproduce exactamente las notas dadas, ascendentes. */
  function seqMidis(names, baseOct) {
    baseOct = (baseOct == null) ? 4 : baseOct;
    var out = [], prev = -1;
    names.forEach(function (nm) {
      var pc = nameToPc(nm); if (pc == null) return;
      var midi = (baseOct + 1) * 12 + pc;
      while (midi <= prev) midi += 12;
      out.push(midi); prev = midi;
    });
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
        if (opts.chord) {   // todas a la vez (intervalo/acorde armónico)
          midis.forEach(function (m) { startAt(c, m, t0, bmap, 1.3, true); });
          return 1.6;
        }
        midis.forEach(function (m, i) { startAt(c, m, t0 + i * step, bmap, step, i === last); });
        return midis.length * step;
      }).catch(function () {});
  }

  function playScale(names, opts) {
    opts = opts || {};
    return playMidis(scaleToMidis(names, opts.baseOct), opts);
  }

  /* Extrae los nombres de nota de un texto libre, con alteraciones por símbolo o palabra
     ("Fa sostenido" -> Fa♯, "Re bemol" -> Re♭). No confunde notas dentro de otras palabras. */
  function extractNotes(str) {
    var re = /(Do|Re|Mi|Fa|Sol|La|Si)(?![a-záéíóúñ])(\s+doble\s+sostenido|\s+doble\s+bemol|\s+sostenido|\s+bemol|[♯♭#b])?/g;
    var m, out = [];
    while ((m = re.exec(str || ''))) {
      var n = m[1], a = (m[2] || '').trim();
      if (/sostenido/.test(a)) n += /doble/.test(a) ? '♯♯' : '♯';
      else if (/bemol/.test(a)) n += /doble/.test(a) ? '♭♭' : '♭';
      else if (a === '#' || a === '♯') n += '♯';
      else if (a === 'b' || a === '♭') n += '♭';
      out.push(n);
    }
    return out;
  }
  /* Semitonos de un intervalo a partir de su nombre ("2ª Aumentada", "5ª Justa", "3ª menor"). */
  function intervalSemitones(text) {
    var s = (text || '').toLowerCase(), num = null;
    // Debe nombrar una calidad: descarta movimientos como "subir una 15ª" o "una octava".
    if (!/aumentad|mayor|menor|just|disminuid/.test(s)) return null;
    // Solo cifra ordinal ("2ª", "8ª", "12ª"): evita falsos positivos con "una octava" (movimiento), etc.
    var nums = [], re = /(\d+)\s*ª/g, mm;
    while ((mm = re.exec(s))) nums.push(parseInt(mm[1], 10));
    if (!nums.length) return null;
    num = /reduc|resultado/.test(s) ? nums[nums.length - 1] : nums[0];   // en una reducción, el resultado es el último
    var octaves = 0;
    while (num > 8) { num -= 7; octaves++; }   // reduce el compuesto a intervalo simple + octavas
    var base = [null, 0, 2, 4, 5, 7, 9, 11, 12][num];
    if (base == null) return null;
    var perfectable = (num === 1 || num === 4 || num === 5 || num === 8);
    if (/aumentad/.test(s)) base += 1;
    else if (/disminuid/.test(s)) base += perfectable ? -1 : -2;
    else if (/men/.test(s)) base += perfectable ? 0 : -1;
    return base + octaves * 12;   // mayor / justa por defecto
  }
  /* MIDIs colocando cada nota en la octava más cercana según la dirección (+1 asc, -1 desc, 0 al unísono). */
  function dirMidis(names, baseOct, dir) {
    baseOct = (baseOct == null) ? 4 : baseOct;
    var out = [], prev = null;
    names.forEach(function (nm) {
      var pc = nameToPc(nm); if (pc == null) return;
      var midi = (baseOct + 1) * 12 + pc;
      if (prev != null) {
        if (dir > 0) { while (midi <= prev) midi += 12; }
        else if (dir < 0) { while (midi >= prev) midi -= 12; }
      }
      out.push(midi); prev = midi;
    });
    return out;
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
  var CLEF_OCT = { sol2: 4, sol: 4, do1: 4, do2: 4, do3: 4, do4: 3, fa3: 3, fa4: 3 };
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
    /* Páginas de intervalos ([data-tm-intervals]): ▶ en cada pentagrama de intervalo, sea <figure> o
       celda de tabla. Lee las notas y el tipo del alt; armónico (a la vez) si dice "armónico/simultáneo",
       descendente o unísono según el texto; melódico ascendente por defecto. Ignora el teclado. */
    document.querySelectorAll('[data-tm-intervals] img').forEach(function (img) {
      var alt = img.getAttribute('alt') || '', s = alt.toLowerCase();
      if (/teclado/.test(s) || /melod[ií]a/.test(s)) return;   // teclado no es pentagrama; melodías = contorno desconocido
      var host = (img.closest && (img.closest('figure') || img.closest('td'))) || img.parentElement;
      if (!host || host.querySelector('.tm-play-scale')) return;
      var unison = /un[ií]sono/.test(s), enh = /enarm[oó]nic/.test(s);
      var names = extractNotes(alt), midis, chord;
      if (names.length >= 2 || unison || enh) {           // el alt nombra las notas
        chord = !enh && /\barm[oó]nic|simult/.test(s);   // "enarmónicas" NO es acorde
        var dir = (unison || enh) ? 0 : (/descend/.test(s) ? -1 : 1);   // unísono y enarmónicos suenan a la misma altura
        midis = dirMidis(names, 4, dir);
        if (/compuest|novena|d[eé]cima|oncena|docena|trecena|una octava m[aá]s/.test(s) && midis.length >= 2) {
          midis[midis.length - 1] += 12;   // intervalos compuestos: la última nota una octava más
        }
      } else {                                            // solo el nombre del intervalo (figuras por especie)
        var semi = intervalSemitones(alt);
        if (semi == null) return;
        chord = true;                                     // se dibujan como intervalo armónico sobre Do
        midis = (semi === 0) ? [60] : [60, 60 + semi];
      }
      if (!midis || !midis.length) return;
      var isFig = host.tagName === 'FIGURE';
      if (isFig) host.classList.add('tm-has-play');
      host.appendChild(makeBtnFromPlay(function () { return playMidis(midis, { chord: chord }); }, 'Escuchar el intervalo', isFig ? 'tm-play-scale--fig' : ''));
    });
    /* Elementos con data-tm-notes="Mi Fa Sol…": reproduce exactamente esas notas ascendentes
       desde data-tm-baseoct (octava de la 1ª nota; por defecto 4). Útil para claves e intervalos melódicos. */
    document.querySelectorAll('[data-tm-notes]').forEach(function (el) {
      if (el.querySelector && el.querySelector('.tm-play-scale')) return;
      var raw = el.getAttribute('data-tm-notes') || '';
      if (!raw.trim()) {   // vacío: leer las notas del alt de la imagen, tras los ':'
        var img = el.querySelector && el.querySelector('img');
        var alt = img ? (img.getAttribute('alt') || '') : '';
        var ci = alt.lastIndexOf(':'); raw = ci >= 0 ? alt.slice(ci + 1) : '';
      }
      var names = raw.trim().split(/[\s,]+/).filter(function (t) { return nameToPc(t) != null; });
      if (!names.length) return;
      var oct = parseInt(el.getAttribute('data-tm-baseoct'), 10); if (isNaN(oct)) oct = 4;
      var midis = seqMidis(names, oct);
      if (!midis.length) return;
      var isFig = el.tagName === 'FIGURE';
      if (isFig) el.classList.add('tm-has-play');
      el.appendChild(makeBtnMidis(midis, 'Escuchar', isFig ? 'tm-play-scale--fig' : ''));
    });
    /* Pentagramas de claves (figure[data-tm-clef]): reproducen Do Re Mi Fa Sol La Si Do
       en el registro propio de la clave (Sol/soprano/mezzo/alto en 4ª octava; tenor/barítono/Fa en 3ª). */
    document.querySelectorAll('figure[data-tm-clef]').forEach(function (fig) {
      if (fig.querySelector('.tm-play-scale')) return;
      var oct = CLEF_OCT[fig.getAttribute('data-tm-clef')] || 4;
      fig.classList.add('tm-has-play');
      fig.appendChild(makeBtnFromPlay(function () {
        return playScale(['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], { baseOct: oct });
      }, 'Escuchar las notas', 'tm-play-scale--fig'));
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
