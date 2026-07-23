/* Diagrama del CONTRABAJO — FOTO REAL + dónde pisar la cuerda, interactivo.
   A diferencia del viento, la nota no está en un botón: es el PUNTO exacto donde el dedo
   acorta la cuerda. Aquí se marca sobre una foto real dónde hay que pisar (no el número de
   dedo, que confunde al principiante). El contrabajo NO tiene trastes: los puntos son la posición
   física de cada nota, calculada con la fórmula de la cuerda (d = L·(1−2^(−n/12))).
   4 cuerdas por CUARTAS JUSTAS: Mi·La·Re·Sol (escritas Mi₂·La₂·Re₃·Sol₃). Clave de FA, TRANSPOSITOR: suena una 8ª más grave de lo escrito. Vertical.
   La MISMA nota vive en varios sitios (Re₄ = 4.º dedo en Sol o Re al aire) → se marcan todos.
   Toggle arco/pizzicato (dos bancos de sonido). Sonido: contrabajo de MuseScore / Muse Sounds (suena 8ª abajo).
   Uso: <div id="x"></div><script>tmContrabajoEngine('x');</script> */
(function () {
  'use strict';

  var SVG_W = 564, SVG_H = 1511;   // = píxeles de diagrama.jpg (CONTRABAJO ENTERO vertical, voluta arriba = como se toca)
  // Punto donde se pisa cada nota (x,y sobre la foto del contrabajo entero), de la cuerda al aire (n:0)
  // a la OCTAVA (n:12). Se marca hasta la octava porque cae en la mitad EXACTA de la cuerda
  // (verificable); más arriba no podemos garantizar el punto sobre la foto (se dice en el texto).
  var PTS = [
    {s:'Mi',n:0,x:270,y:200,nota:'E2',midi:40},
    {s:'Mi',n:1,x:268,y:253,nota:'F2',midi:41},
    {s:'Mi',n:2,x:267,y:304,nota:'Fs2',midi:42},
    {s:'Mi',n:3,x:266,y:351,nota:'G2',midi:43},
    {s:'Mi',n:4,x:265,y:396,nota:'Gs2',midi:44},
    {s:'Mi',n:5,x:264,y:438,nota:'A2',midi:45},
    {s:'Mi',n:6,x:263,y:478,nota:'As2',midi:46},
    {s:'Mi',n:7,x:262,y:516,nota:'B2',midi:47},
    {s:'Mi',n:8,x:261,y:552,nota:'C3',midi:48},
    {s:'Mi',n:9,x:260,y:585,nota:'Cs3',midi:49},
    {s:'Mi',n:10,x:260,y:617,nota:'D3',midi:50},
    {s:'Mi',n:11,x:259,y:647,nota:'Ds3',midi:51},
    {s:'Mi',n:12,x:258,y:675,nota:'E3',midi:52},
    {s:'La',n:0,x:277,y:200,nota:'A2',midi:45},
    {s:'La',n:1,x:276,y:253,nota:'As2',midi:46},
    {s:'La',n:2,x:276,y:304,nota:'B2',midi:47},
    {s:'La',n:3,x:275,y:351,nota:'C3',midi:48},
    {s:'La',n:4,x:275,y:396,nota:'Cs3',midi:49},
    {s:'La',n:5,x:275,y:438,nota:'D3',midi:50},
    {s:'La',n:6,x:274,y:478,nota:'Ds3',midi:51},
    {s:'La',n:7,x:274,y:516,nota:'E3',midi:52},
    {s:'La',n:8,x:274,y:552,nota:'F3',midi:53},
    {s:'La',n:9,x:273,y:585,nota:'Fs3',midi:54},
    {s:'La',n:10,x:273,y:617,nota:'G3',midi:55},
    {s:'La',n:11,x:273,y:647,nota:'Gs3',midi:56},
    {s:'La',n:12,x:273,y:675,nota:'A3',midi:57},
    {s:'Re',n:0,x:283,y:200,nota:'D3',midi:50},
    {s:'Re',n:1,x:284,y:253,nota:'Ds3',midi:51},
    {s:'Re',n:2,x:284,y:304,nota:'E3',midi:52},
    {s:'Re',n:3,x:285,y:351,nota:'F3',midi:53},
    {s:'Re',n:4,x:285,y:396,nota:'Fs3',midi:54},
    {s:'Re',n:5,x:285,y:438,nota:'G3',midi:55},
    {s:'Re',n:6,x:286,y:478,nota:'Gs3',midi:56},
    {s:'Re',n:7,x:286,y:516,nota:'A3',midi:57},
    {s:'Re',n:8,x:286,y:552,nota:'As3',midi:58},
    {s:'Re',n:9,x:287,y:585,nota:'B3',midi:59},
    {s:'Re',n:10,x:287,y:617,nota:'C4',midi:60},
    {s:'Re',n:11,x:287,y:647,nota:'Cs4',midi:61},
    {s:'Re',n:12,x:287,y:675,nota:'D4',midi:62},
    {s:'Sol',n:0,x:290,y:200,nota:'G3',midi:55},
    {s:'Sol',n:1,x:292,y:253,nota:'Gs3',midi:56},
    {s:'Sol',n:2,x:293,y:304,nota:'A3',midi:57},
    {s:'Sol',n:3,x:294,y:351,nota:'As3',midi:58},
    {s:'Sol',n:4,x:295,y:396,nota:'B3',midi:59},
    {s:'Sol',n:5,x:296,y:438,nota:'C4',midi:60},
    {s:'Sol',n:6,x:297,y:478,nota:'Cs4',midi:61},
    {s:'Sol',n:7,x:298,y:516,nota:'D4',midi:62},
    {s:'Sol',n:8,x:299,y:552,nota:'Ds4',midi:63},
    {s:'Sol',n:9,x:300,y:585,nota:'E4',midi:64},
    {s:'Sol',n:10,x:300,y:617,nota:'F4',midi:65},
    {s:'Sol',n:11,x:301,y:647,nota:'Fs4',midi:66},
    {s:'Sol',n:12,x:302,y:675,nota:'G4',midi:67}
  ];
  var CUERDA_NOM = { Mi:'Mi', La:'La', Re:'Re', Sol:'Sol' };

  // orden de botones: cromático por altura real (Sol₃…Si₅), sin duplicar las notas de solape
  var BYNOTE = {};
  PTS.forEach(function (p) { (BYNOTE[p.nota] = BYNOTE[p.nota] || []).push(p); });
  var ORDEN = Object.keys(BYNOTE).sort(function (a, b) { return BYNOTE[a][0].midi - BYNOTE[b][0].midi; });

  var NM = {C:'Do',D:'Re',E:'Mi',F:'Fa',G:'Sol',A:'La',B:'Si'};
  var SUB = {'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈'};
  function parse(f) { return /^([A-G])(s?)(\d)$/.exec(f); }
  function label(f) {   // 'Gs3' -> 'Sol♯₃'
    var m = parse(f); return m ? NM[m[1]] + (m[2] ? '♯' : '') + SUB[m[3]] : f;
  }
    var LETT = { C:0, Cs:1, D:2, Ds:3, E:4, F:5, Fs:6, G:7, Gs:8, A:9, As:10, B:11 };
  function fileMidi(f){ var m=parse(f); if(!m) return null;
    var pc=LETT[m[1]+(m[2]||'')]; return pc + (parseInt(m[3],10)+1)*12; }
  function midiLabel(mi){ var names=['Do','Do♯','Re','Re♯','Mi','Fa','Fa♯','Sol','Sol♯','La','La♯','Si'];
    return names[((mi%12)+12)%12] + SUB[String(Math.floor(mi/12)-1)]; }
  function soundLabel(f){ var mi=fileMidi(f); return mi==null?f:midiLabel(mi-12); }
  function vfKey(f) { var m = parse(f); return m[1].toLowerCase() + (m[2] ? '#' : '') + '/' + m[3]; }

  var AUDIO = { arco: '/assets/audio/contrabajo/', pizz: '/assets/audio/contrabajo-pizz/' };
  var AUDIO_V = '1';

  var CSS = [
    '.tm-cb-wrap{margin:18px 0;}',
    '.tm-cb-main{display:flex;gap:14px;align-items:flex-start;}',
    '.tm-cb-diagram{flex:0 0 auto;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-cb-photo{position:relative;width:-moz-fit-content;width:fit-content;margin:0 auto;}',
    '.tm-cb-img{display:block;height:auto;max-height:min(46vh,360px);width:auto;max-width:100%;border-radius:6px;}',
    '.tm-cb-svg{position:absolute;inset:0;width:100%;height:100%;}',
    '.tm-cb-cuerdas{text-align:center;font-size:.72rem;color:#777;margin-top:6px;line-height:1.3;}',
    '.tm-cb-mk{opacity:0;transition:opacity .15s;}',
    '.tm-cb-mk.on{opacity:1;}',
    '.tm-cb-mk circle{fill:#ff9500;stroke:#fff;stroke-width:3;filter:drop-shadow(0 0 5px rgba(0,0,0,.6));}',
    '.tm-cb-mk.aire circle{fill:#4da3ff;}',
    '.tm-cb-side{flex:1 1 auto;min-width:0;}',
    '.tm-cb-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:10px;margin-bottom:10px;min-height:48px;}',
    '.tm-cb-hint{font-size:1rem;color:#999;font-weight:600;}',
    '.tm-cb-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-cb-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-cb-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-cb-play:hover{background:#6b5010;}',
    '.tm-cb-donde{font-size:.9rem;color:#555;margin-top:4px;}',
    '.tm-cb-suena{font-size:.82rem;color:#8b6914;margin-top:2px;}',
    '.tm-cb-multi{font-size:.82rem;color:#8b6914;margin-top:4px;}',
    '.tm-cb-staff{display:flex;justify-content:center;align-items:center;min-height:96px;}',
    '.tm-cb-staff svg{max-width:100%;height:auto;}',
    '.tm-cb-modo{display:flex;gap:0;justify-content:center;margin:0 0 10px;}',
    '.tm-cb-modo button{padding:7px 16px;border:1px solid #d8d0b8;background:#f5f2ea;font-family:inherit;font-weight:600;cursor:pointer;}',
    '.tm-cb-modo button:first-child{border-radius:6px 0 0 6px;}',
    '.tm-cb-modo button:last-child{border-radius:0 6px 6px 0;border-left:none;}',
    '.tm-cb-modo button.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-cb-btns{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}',
    '.tm-cb-btn{min-width:42px;padding:7px 9px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.9rem;}',
    '.tm-cb-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-cb-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-cb-legend{text-align:center;font-size:.76rem;color:#777;margin-top:10px;}',
    '.tm-cb-sw{display:inline-block;width:11px;height:11px;border-radius:50%;margin:0 4px 0 10px;vertical-align:-1px;}',
    '.tm-cb-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:8px;}',
    '.tm-cb-credit a{color:inherit;}',
    '@media (max-width:560px){' +
      '.tm-cb-main{gap:8px;}' +
      '.tm-cb-img{max-height:30vh;}' +
      '.tm-cb-readout{padding:8px;margin-bottom:8px;}' +
      '.tm-cb-staff{min-height:70px;}' +
      '.tm-cb-intl{font-size:1.25rem;}' +
      '.tm-cb-donde{font-size:.82rem;}' +
      '.tm-cb-multi{font-size:.76rem;}' +
      '.tm-cb-modo button{padding:6px 11px;}' +
      '.tm-cb-btn{min-width:34px;padding:6px 5px;font-size:.78rem;}' +
      '.tm-cb-cuerdas{font-size:.64rem;}' +
    '}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-cb-css')) return;
    var s = document.createElement('style'); s.id = 'tm-cb-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmContrabajoEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId, modo = 'arco';

    var marks = PTS.map(function (p, i) {
      var r = p.n === 0 ? 24 : 18;
      return '<g class="tm-cb-mk' + (p.n === 0 ? ' aire' : '') + '" data-i="' + i + '">' +
        '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + r + '"/></g>';
    }).join('');

    var btns = ORDEN.map(function (f) {
      return '<button class="tm-cb-btn" data-n="' + f + '">' + label(f) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-cb-wrap">' +
        '<div class="tm-cb-readout" id="' + uid + '_ro"><span class="tm-cb-hint">Elige una nota y verás dónde pisar la cuerda</span></div>' +
        '<div class="tm-cb-main">' +
          '<div class="tm-cb-diagram">' +
            '<div class="tm-cb-photo">' +
              '<picture><source type="image/webp" srcset="/assets/img/contrabajo/diagrama.webp">' +
              '<img class="tm-cb-img" src="/assets/img/contrabajo/diagrama.jpg" width="564" height="1511" loading="lazy" alt="Un contrabajo entero visto de frente, de pie; sobre su diapasón se marca el punto exacto donde pisar cada nota"></picture>' +
              '<svg class="tm-cb-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" preserveAspectRatio="none" role="img" aria-label="Sobre la foto de un contrabajo entero se ilumina el punto del diapasón donde poner el dedo para cada nota">' +
                marks +
              '</svg>' +
            '</div>' +
            '<div class="tm-cb-cuerdas">Cuerdas (izq.→der.):<br><strong>Mi · La · Re · Sol</strong></div>' +
          '</div>' +
          '<div class="tm-cb-side">' +
            '<div class="tm-cb-modo" role="group" aria-label="Tipo de sonido">' +
              '<button data-m="arco" class="sel">🎻 Arco</button><button data-m="pizz">Pizzicato</button>' +
            '</div>' +
            '<div class="tm-cb-btns">' + btns + '</div>' +
            '<div class="tm-cb-legend">' +
              '<span class="tm-cb-sw" style="background:#4da3ff"></span>cuerda al aire' +
              '<span class="tm-cb-sw" style="background:#ff9500"></span>dónde pisar · <em>no tiene trastes: es el punto exacto</em>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<p class="tm-cb-credit">Foto: AndrewKepert vía <a href="https://commons.wikimedia.org/wiki/File:AGK_bass1_full.jpg" target="_blank" rel="noopener">Wikimedia Commons</a> (CC BY-SA 3.0) · Sonido: contrabajo de MuseScore / Muse Sounds</p>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var svg = wrap.querySelector('.tm-cb-svg');
    var audio = new Audio();

    function play(f) {
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO[modo] + f + '.mp3?v=' + AUDIO_V;
      audio.currentTime = 0;
      var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {});
    }

    function renderStaff(f) {
      var el = document.getElementById(uid + '_staff');
      if (!el || typeof Vex === 'undefined') return;
      el.innerHTML = '';
      var m = parse(f); if (!m) return;
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(150, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 34, 132);
      stave.addClef('bass').setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vfKey(f)], duration: 'w', clef: 'bass' });
      if (m[2]) note.addModifier(new V.Accidental('#'), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) {
        var vb = '0 0 150 150';
        try { var bb = s.getBBox(); if (bb && bb.height) { var p = 6; vb = (bb.x - p) + ' ' + (bb.y - p) + ' ' + (bb.width + 2 * p) + ' ' + (bb.height + 2 * p); } } catch (e) {}
        s.setAttribute('viewBox', vb);
        s.style.width = '128px'; s.style.maxWidth = '100%'; s.style.height = 'auto';
      }
    }

    var currentNote = null;
    function pick(f, btn) {
      currentNote = f;
      wrap.querySelectorAll('.tm-cb-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      svg.querySelectorAll('.tm-cb-mk').forEach(function (g) { g.classList.remove('on'); });

      var sitios = BYNOTE[f] || [];
      sitios.forEach(function (p) {
        var idx = PTS.indexOf(p);
        var g = svg.querySelector('.tm-cb-mk[data-i="' + idx + '"]');
        if (g) g.classList.add('on');
      });
      var txt = sitios.map(function (p) {
        return p.n === 0 ? 'cuerda <strong>' + CUERDA_NOM[p.s] + '</strong> al aire'
                         : 'en la cuerda <strong>' + CUERDA_NOM[p.s] + '</strong> (donde marca el punto)';
      }).join(' &nbsp;·&nbsp; o bien &nbsp;·&nbsp; ');

      ro.innerHTML =
        '<div class="tm-cb-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-cb-noterow"><span class="tm-cb-intl">' + label(f) + '</span>' +
        '<button class="tm-cb-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-cb-suena">suena una 8ª más grave · <strong>' + soundLabel(f) + '</strong></div>' +
        '<div class="tm-cb-donde">' + txt + '</div>' +
        (sitios.length > 1
          ? '<div class="tm-cb-multi">La misma nota en ' + sitios.length + ' sitios: al aire suena más brillante; pisada, más cálida y admite vibrato.</div>'
          : '');
      renderStaff(f);
      var pb = ro.querySelector('.tm-cb-play');
      if (pb) pb.addEventListener('click', function () { play(f); });
      play(f);
    }

    wrap.querySelectorAll('.tm-cb-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
    wrap.querySelectorAll('.tm-cb-modo button').forEach(function (b) {
      b.addEventListener('click', function () {
        modo = b.dataset.m;
        wrap.querySelectorAll('.tm-cb-modo button').forEach(function (x) { x.classList.remove('sel'); });
        b.classList.add('sel');
        if (currentNote) play(currentNote);
      });
    });
  }

  window.tmContrabajoEngine = tmContrabajoEngine;
})();
