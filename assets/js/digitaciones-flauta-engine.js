/* Diagrama de digitaciones de la flauta travesera (sistema Boehm) — interactivo.
   Representación ORIGINAL (esquema de llaves), datos de digitación estándar.
   Uso: <div id="x"></div><script>tmFlautaEngine('x');</script>
   PROTOTIPO: solo notas confirmadas; el resto se marca "por confirmar". */
(function () {
  'use strict';

  /* Modelo de llaves (anatomía estándar Boehm), de cabeza a pie.
     id, etiqueta corta, x, y, grupo. */
  /* Llaves colocadas sobre el dibujo de la flauta (cabeza a la izq., pie a la dcha.).
     below:true -> etiqueta debajo de la llave; r -> radio del platillo. */
  var KEYS = [
    { id: 'T',   lab: 'Si',   x: 182, y: 110, r: 8, below: true },
    { id: 'Tb',  lab: 'Si♭',  x: 204, y: 110, r: 7, below: true },
    { id: 'LI',  lab: 'Í',    x: 226, y: 70, r: 9 },
    { id: 'LM',  lab: 'M',    x: 254, y: 70, r: 9 },
    { id: 'LA',  lab: 'A',    x: 282, y: 70, r: 9 },
    { id: 'LG',  lab: 'Sol♯', x: 302, y: 70, r: 6, below: true },
    { id: 'RI',  lab: 'Í',    x: 338, y: 70, r: 9 },
    { id: 'Tr1', lab: 'T1',   x: 352, y: 47, r: 4, rodx: 352 },
    { id: 'Tr2', lab: 'T2',   x: 380, y: 47, r: 4, rodx: 380 },
    { id: 'RM',  lab: 'M',    x: 366, y: 70, r: 9 },
    { id: 'RA',  lab: 'A',    x: 394, y: 70, r: 9 },
    { id: 'REb', lab: 'Mi♭',  x: 416, y: 70, r: 6, below: true },
    { id: 'RCs', lab: 'Do♯',  x: 462, y: 70, r: 7 },
    { id: 'RC',  lab: 'Do',   x: 490, y: 70, r: 7 }
  ];
  var SVG_W = 580, SVG_H = 150;

  /* Notas confirmadas (primera pasada, naturales de la 1ª octava).
     Lista de llaves pulsadas. La llave de Mi♭ (REb) va pulsada en casi todo el registro. */
  var FING = {
    /* 1ª octava (naturales + Do♯; en Do/Do♯ el meñique dcho va en la llave de pie, no en Mi♭) */
    'Do4':  { keys: ['T','LI','LM','LA','RI','RM','RA','RC'] },
    'Do#4': { keys: ['T','LI','LM','LA','RI','RM','RA','RCs'] },
    'Re4':  { keys: ['T','LI','LM','LA','RI','RM','RA','REb'] },
    'Re#4': { keys: ['T','LI','LM','LA','RI','RA','REb'] },
    'Mi4':  { keys: ['T','LI','LM','LA','RI','RM','REb'] },
    'Fa4':  { keys: ['T','LI','LM','LA','RI','REb'] },
    'Fa#4': { keys: ['T','LI','LM','LA','RA','REb'] },
    'Sol4': { keys: ['T','LI','LM','LA','REb'] },
    'Sol#4':{ keys: ['T','LI','LM','LA','LG','REb'] },
    'La4':  { keys: ['T','LI','LM','REb'] },
    'Si4':  { keys: ['T','LI','REb'] },
    'La#4': { keys: ['T','LI','RI','REb'] },
    /* 2ª octava */
    'Do5':  { keys: ['LI','REb'] },
    'Do#5': { keys: ['REb'] },
    'Re5':  { keys: ['T','LI','LM','LA','RI','RM','RA','REb'] },
    'Re#5': { keys: ['T','LI','LM','LA','RI','RA','REb'] },
    'Mi5':  { keys: ['T','LI','LM','LA','RI','RM','REb'] },
    'Fa5':  { keys: ['T','LI','LM','LA','RI','REb'] },
    'Fa#5': { keys: ['T','LI','LM','LA','RA','REb'] },
    'Sol5': { keys: ['T','LI','LM','LA','REb'] },
    'Sol#5':{ keys: ['T','LI','LM','LA','LG','REb'] },
    'La5':  { keys: ['T','LI','LM','REb'] },
    'La#5': { keys: ['T','LI','RI','REb'] },
    'Si5':  { keys: ['T','LI','REb'] },
    /* 3ª octava (dictada por Eduardo desde la carta) */
    'Do6':  { keys: ['LI','REb'] },
    'Do#6': { keys: ['REb'] },
    'Re6':  { keys: ['Tb','LM','LA','REb'] },
    'Re#6': { keys: ['Tb','LI','LM','LA','LG','RI','RM','RA','REb'] },
    'Mi6':  { keys: ['Tb','LI','LM','RI','RM','REb'] },
    'Fa6':  { keys: ['Tb','LI','LA','RI','REb'] },
    'Fa#6': { keys: ['Tb','LI','LA','RA','REb'] },
    'Sol6': { keys: ['LI','LM','LA','REb'] },
    'Sol#6':{ keys: ['LM','LA','LG','REb'] },
    'La6':  { keys: ['Tb','LM','RI','REb'] },
    'La#6': { keys: ['Tb','LI','Tr1','REb'] },
    'Si6':  { keys: ['Tb','LI','LA','Tr2'] },
    'Do7':  { keys: ['LI','LM','LA','LG','RI'] }
  };
  /* Orden completo Do₄–Do₇. Las notas sin datos salen como "por confirmar". */
  var ORDEN = [
    'Do4','Do#4','Re4','Re#4','Mi4','Fa4','Fa#4','Sol4','Sol#4','La4','La#4','Si4',
    'Do5','Do#5','Re5','Re#5','Mi5','Fa5','Fa#5','Sol5','Sol#5','La5','La#5','Si5',
    'Do6','Do#6','Re6','Re#6','Mi6','Fa6','Fa#6','Sol6','Sol#6','La6','La#6','Si6','Do7'
  ];
  var LABELS = {
    'Do4':'Do₄','Do#4':'Do♯₄','Re4':'Re₄','Re#4':'Re♯₄','Mi4':'Mi₄','Fa4':'Fa₄','Fa#4':'Fa♯₄','Sol4':'Sol₄','Sol#4':'Sol♯₄','La4':'La₄','La#4':'La♯₄','Si4':'Si₄',
    'Do5':'Do₅','Do#5':'Do♯₅','Re5':'Re₅','Re#5':'Re♯₅','Mi5':'Mi₅','Fa5':'Fa₅','Fa#5':'Fa♯₅','Sol5':'Sol₅','Sol#5':'Sol♯₅','La5':'La₅','La#5':'La♯₅','Si5':'Si₅',
    'Do6':'Do₆','Do#6':'Do♯₆','Re6':'Re₆','Re#6':'Re♯₆','Mi6':'Mi₆','Fa6':'Fa₆','Fa#6':'Fa♯₆','Sol6':'Sol₆','Sol#6':'Sol♯₆','La6':'La₆','La#6':'La♯₆','Si6':'Si₆','Do7':'Do₇'
  };

  function registro(nota) {
    var o = parseInt(nota.replace(/\D/g, ''), 10);
    if (o <= 4) return 'Registro grave';
    if (o === 5) return 'Registro medio';
    if (o === 6) return 'Registro agudo';
    return 'Registro sobreagudo';
  }

  /* Audio: nota (Do4, Do#4…) -> archivo del banco (C4, Cs4…) */
  var AUDIO_BASE = '/assets/audio/flauta/';
  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  function audioFile(noteId) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(noteId);
    return m ? LETTER[m[1]] + (m[2] ? 's' : '') + m[3] : null;
  }
  /* Notación internacional (C, C♯, D…) y clave VexFlow (c#/4) */
  function intl(noteId) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(noteId);
    return m ? LETTER[m[1]] + (m[2] ? '♯' : '') + m[3] : noteId;
  }
  function vfNote(noteId) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(noteId);
    if (!m) return null;
    var acc = m[2] ? '#' : null;
    return { key: LETTER[m[1]].toLowerCase() + (acc || '') + '/' + m[3], acc: acc };
  }

  var CSS = [
    '.tm-fl-wrap{margin:18px 0;}',
    '.tm-fl-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-fl-note{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-fl-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-fl-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-fl-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-fl-svg{display:block;width:100%;height:auto;}',
    '.tm-fl-key{fill:#fafbfc;stroke:#8f9199;stroke-width:1.4;}',
    '.tm-fl-key.on{fill:#8b6914;stroke:#6b5010;}',
    '.tm-fl-rod{stroke:#b3ab95;stroke-width:2;}',
    '.tm-fl-klab{font-family:Arial,Helvetica,sans-serif;font-size:8px;fill:#555;text-anchor:middle;}',
    '.tm-fl-grp{font-family:Arial,Helvetica,sans-serif;font-size:8.5px;fill:#8b6914;text-anchor:middle;font-weight:bold;}',
    '.tm-fl-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-fl-btn{min-width:48px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-fl-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-fl-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fl-btn.todo{opacity:.5;font-weight:500;}',
    '.tm-fl-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-fl-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-fl-play:hover{background:#6b5010;}',
    '.tm-fl-staff{display:flex;justify-content:center;align-items:center;min-height:130px;}',
    '.tm-fl-staff svg{max-width:100%;height:auto;}',
    '.tm-fl-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-fl-css')) return;
    var s = document.createElement('style'); s.id = 'tm-fl-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmFlautaEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    /* Dibujo original de la flauta (cabeza a la izq., pie a la dcha.), acabado plateado */
    var fluteBody =
      '<defs><linearGradient id="tmFlMetal" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#ffffff"/><stop offset="0.35" stop-color="#e6e7ea"/>' +
        '<stop offset="0.55" stop-color="#c7c9cf"/><stop offset="1" stop-color="#a9abb2"/>' +
      '</linearGradient></defs>' +
      /* tubo principal */
      '<rect x="14" y="60" width="540" height="20" rx="10" fill="url(#tmFlMetal)" stroke="#8f9199" stroke-width="1.2"/>' +
      /* brillo superior */
      '<rect x="20" y="63" width="528" height="3" rx="1.5" fill="#ffffff" opacity="0.6"/>' +
      /* corona (tapón izq.) */
      '<rect x="8" y="57" width="16" height="26" rx="7" fill="url(#tmFlMetal)" stroke="#8f9199" stroke-width="1.2"/>' +
      /* pie con extremo abierto */
      '<rect x="540" y="56" width="34" height="28" rx="13" fill="url(#tmFlMetal)" stroke="#8f9199" stroke-width="1.2"/>' +
      '<ellipse cx="566" cy="70" rx="5" ry="9" fill="#6f7178"/>' +
      /* uniones (tenones) */
      '<rect x="120" y="58" width="6" height="24" rx="2" fill="#cdced3" stroke="#9a9ca3" stroke-width="0.8"/>' +
      '<rect x="430" y="58" width="6" height="24" rx="2" fill="#cdced3" stroke="#9a9ca3" stroke-width="0.8"/>' +
      /* embocadura: chapa labial + agujero, en el tercio izquierdo */
      '<ellipse cx="70" cy="70" rx="20" ry="11" fill="url(#tmFlMetal)" stroke="#8f9199" stroke-width="1.1"/>' +
      '<ellipse cx="70" cy="70" rx="8" ry="5" fill="#5b5d63"/>';

    var keysSvg = KEYS.map(function (k) {
      var r = k.r || 8;
      var rod = '';
      if (k.y > 82) rod = '<line class="tm-fl-rod" x1="' + k.x + '" y1="80" x2="' + k.x + '" y2="' + (k.y - r) + '"/>';
      else if (k.y < 60) rod = '<line class="tm-fl-rod" x1="' + (k.rodx != null ? k.rodx : k.x) + '" y1="60" x2="' + k.x + '" y2="' + (k.y + r) + '"/>';
      var laby = k.below ? (k.y + r + 11 + (k.labdy || 0)) : (k.y - r - 5);
      return rod +
        '<circle class="tm-fl-key" data-k="' + k.id + '" cx="' + k.x + '" cy="' + k.y + '" r="' + r + '"></circle>' +
        '<text class="tm-fl-klab" x="' + k.x + '" y="' + laby + '">' + k.lab + '</text>';
    }).join('');

    var grupos =
      '<text class="tm-fl-grp" x="193" y="140">Pulgar</text>' +
      '<text class="tm-fl-grp" x="270" y="140">Mano izquierda</text>' +
      '<text class="tm-fl-grp" x="414" y="140">Mano derecha · pie</text>';

    var btns = ORDEN.map(function (n) {
      var hasData = !!FING[n];
      return '<button class="tm-fl-btn' + (hasData ? '' : ' todo') + '" data-n="' + n + '">' + LABELS[n] + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-fl-wrap">' +
        '<div class="tm-fl-readout" id="' + uid + '_ro"><span class="tm-fl-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-fl-diagram"><svg class="tm-fl-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" role="img" aria-label="Diagrama de digitación de la flauta">' +
          fluteBody + keysSvg + grupos +
        '</svg></div>' +
        '<div class="tm-fl-btns" id="' + uid + '_btns">' + btns + '</div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-fl-svg');
    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

    function play(n) {
      var t = audioFile(n);
      if (!t) return;
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + t + '.mp3';
      audio.currentTime = 0;
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () {});
    }

    function renderStaff(n) {
      var el = document.getElementById(uid + '_staff');
      if (!el) return;
      el.innerHTML = '';
      if (typeof Vex === 'undefined') return;
      var vn = vfNote(n); if (!vn) return;
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(150, 160);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 40, 132);
      stave.addClef('treble').setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: 'treble' });
      if (vn.acc) note.addModifier(new V.Accidental(vn.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) { s.setAttribute('viewBox', '0 0 150 160'); s.style.width = '150px'; s.style.maxWidth = '100%'; s.style.height = 'auto'; }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-fl-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      svg.querySelectorAll('.tm-fl-key').forEach(function (c) { c.classList.remove('on'); });
      if (data) {
        data.keys.forEach(function (id) {
          var c = svg.querySelector('.tm-fl-key[data-k="' + id + '"]');
          if (c) c.classList.add('on');
        });
      }
      ro.innerHTML =
        '<div class="tm-fl-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-fl-noterow"><span class="tm-fl-intl">' + intl(n) + '</span>' +
        '<button class="tm-fl-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<span class="tm-fl-reg">' + LABELS[n] + ' · ' + registro(n) + (data ? '' : ' · digitación por confirmar') + '</span>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-fl-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-fl-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmFlautaEngine = tmFlautaEngine;
})();
