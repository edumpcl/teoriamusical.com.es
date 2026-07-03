/* Diagrama de digitaciones de la flauta travesera (sistema Boehm) — interactivo.
   Dibujo horizontal realista PROPIO (mecanismo Boehm visible, platillos abiertos,
   espátulas de pulgar); los datos de digitación no cambian.
   Uso: <div id="x"></div><script>tmFlautaEngine('x');</script>
   PROTOTIPO: solo notas confirmadas; el resto se marca "por confirmar". */
(function () {
  'use strict';

  /* Modelo de llaves (anatomía estándar Boehm), de cabeza a pie.
     sh -> forma: 'plate' platillo abierto con anillo, 'cup' copa cerrada,
     'trill' llave de trino pequeña, 'loop' palanca ovalada, 'spat' espátula de pulgar. */
  var KEYS = [
    { id: 'T',   sh: 'spat',  x: 215, y: 156, w: 18, h: 11 }, // pulgar Si
    { id: 'Tb',  sh: 'spat',  x: 243, y: 163, w: 15, h: 10 }, // pulgar Si♭
    { id: 'LI',  sh: 'plate', x: 255, y: 120 },
    { id: 'LM',  sh: 'plate', x: 290, y: 120 },
    { id: 'LA',  sh: 'plate', x: 325, y: 120 },
    { id: 'LG',  sh: 'loop',  x: 352, y: 150 },               // Sol#
    { id: 'RI',  sh: 'plate', x: 415, y: 120 },
    { id: 'Tr1', sh: 'trill', x: 432, y: 94 },
    { id: 'Tr2', sh: 'trill', x: 467, y: 91 },
    { id: 'RM',  sh: 'plate', x: 450, y: 120 },
    { id: 'RA',  sh: 'plate', x: 485, y: 120 },
    { id: 'REb', sh: 'loop',  x: 505, y: 152 },               // Mi♭
    { id: 'RCs', sh: 'cup',   x: 555, y: 120 },               // pie Do#
    { id: 'RC',  sh: 'cup',   x: 588, y: 120 }                // pie Do
  ];
  var SVG_W = 680, SVG_H = 220;

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
    '.tm-fl-svg{display:block;max-width:640px;width:100%;height:auto;margin:0 auto;}',
    '.tm-fl-key .k-pad{fill:#e9eaee;stroke:#8f9199;stroke-width:1.5;}',
    '.tm-fl-key.on .k-pad{fill:#8b6914;stroke:#6b5010;}',
    '.tm-fl-key .k-ring{fill:none;stroke:#8f9199;stroke-width:1.2;}',
    '.tm-fl-key.on .k-ring{stroke:#e8dcc0;}',
    '.tm-fl-klab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#555;text-anchor:middle;}',
    '.tm-fl-grp{font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:#8b6914;text-anchor:middle;font-weight:bold;}',
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

    /* Dibujo realista de la flauta (cabeza a la izq., pie a la dcha.), acabado plateado.
       Varillas y etiquetas son estáticas; solo las llaves (KEYS) cambian de estado. */
    var fluteBody =
      '<defs><linearGradient id="tmFlMetal" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#ffffff"/><stop offset="0.35" stop-color="#e6e7ea"/>' +
        '<stop offset="0.55" stop-color="#c7c9cf"/><stop offset="1" stop-color="#a9abb2"/>' +
      '</linearGradient></defs>' +
      // tubo principal + brillo
      '<rect x="70" y="109" width="560" height="22" rx="11" fill="url(#tmFlMetal)" stroke="#8f9199" stroke-width="1.2"/>' +
      '<rect x="76" y="112" width="548" height="3" rx="1.5" fill="#ffffff" opacity="0.6"/>' +
      // corona (tapón) y boca abierta del pie
      '<rect x="48" y="106" width="24" height="28" rx="8" fill="url(#tmFlMetal)" stroke="#8f9199" stroke-width="1.2"/>' +
      '<ellipse cx="630" cy="120" rx="4.5" ry="11" fill="#6f7178"/>' +
      // anillas de las uniones (cabeza-cuerpo y cuerpo-pie)
      '<rect x="175" y="107" width="6" height="26" rx="2" fill="#cdced3" stroke="#9a9ca3" stroke-width="0.8"/>' +
      '<rect x="520" y="107" width="6" height="26" rx="2" fill="#cdced3" stroke="#9a9ca3" stroke-width="0.8"/>' +
      // placa de embocadura con agujero
      '<ellipse cx="112" cy="120" rx="21" ry="12" fill="url(#tmFlMetal)" stroke="#8f9199" stroke-width="1.1"/>' +
      '<ellipse cx="112" cy="120" rx="8" ry="5" fill="#5b5d63"/>' +
      // eje longitudinal del mecanismo
      '<line x1="190" y1="110" x2="615" y2="110" stroke="#b9bbc1" stroke-width="1.6"/>' +
      // varillas: pulgar (T, Tb), Sol#, Mib, trinos
      '<line x1="215" y1="131" x2="215" y2="151" stroke="#b9bbc1" stroke-width="1.4"/>' +
      '<line x1="243" y1="131" x2="243" y2="158" stroke="#b9bbc1" stroke-width="1.4"/>' +
      '<line x1="352" y1="131" x2="352" y2="144" stroke="#b9bbc1" stroke-width="1.4"/>' +
      '<line x1="505" y1="131" x2="505" y2="146" stroke="#b9bbc1" stroke-width="1.4"/>' +
      '<line x1="432" y1="109" x2="432" y2="99" stroke="#b9bbc1" stroke-width="1.4"/>' +
      '<line x1="467" y1="109" x2="467" y2="96" stroke="#b9bbc1" stroke-width="1.4"/>' +
      // etiquetas de llaves
      '<text class="tm-fl-klab" x="112" y="150">Embocadura</text>' +
      '<text class="tm-fl-klab" x="255" y="98">Í</text><text class="tm-fl-klab" x="290" y="98">M</text><text class="tm-fl-klab" x="325" y="98">A</text>' +
      '<text class="tm-fl-klab" x="415" y="98">Í</text><text class="tm-fl-klab" x="450" y="98">M</text><text class="tm-fl-klab" x="485" y="98">A</text>' +
      '<text class="tm-fl-klab" x="432" y="80">T1</text><text class="tm-fl-klab" x="467" y="77">T2</text>' +
      '<text class="tm-fl-klab" x="555" y="98">Do♯</text><text class="tm-fl-klab" x="588" y="98">Do</text>' +
      '<text class="tm-fl-klab" x="208" y="180">Si</text><text class="tm-fl-klab" x="250" y="184">Si♭</text>' +
      '<text class="tm-fl-klab" x="352" y="172">Sol♯</text><text class="tm-fl-klab" x="505" y="172">Mi♭</text>' +
      // etiquetas de grupo
      '<text class="tm-fl-grp" x="215" y="212">Pulgar</text>' +
      '<text class="tm-fl-grp" x="325" y="212">Mano izquierda</text>' +
      '<text class="tm-fl-grp" x="490" y="212">Mano derecha · pie</text>';

    var keysSvg = KEYS.map(function (k) {
      var body;
      if (k.sh === 'plate') {
        body = '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="11"/>' +
               '<circle class="k-ring" cx="' + k.x + '" cy="' + k.y + '" r="4.5"/>';
      } else if (k.sh === 'cup') {
        body = '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="9"/>';
      } else if (k.sh === 'trill') {
        body = '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="5"/>';
      } else if (k.sh === 'loop') {
        body = '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="8" ry="6"/>';
      } else { // spat
        body = '<rect class="k-pad" x="' + (k.x - k.w / 2) + '" y="' + (k.y - k.h / 2) +
               '" width="' + k.w + '" height="' + k.h + '" rx="5"/>';
      }
      return '<g class="tm-fl-key" data-k="' + k.id + '">' + body + '</g>';
    }).join('');

    var btns = ORDEN.map(function (n) {
      var hasData = !!FING[n];
      return '<button class="tm-fl-btn' + (hasData ? '' : ' todo') + '" data-n="' + n + '">' + LABELS[n] + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-fl-wrap">' +
        '<div class="tm-fl-readout" id="' + uid + '_ro"><span class="tm-fl-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-fl-diagram"><svg class="tm-fl-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" role="img" aria-label="Diagrama de digitación de la flauta">' +
          fluteBody + keysSvg +
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
