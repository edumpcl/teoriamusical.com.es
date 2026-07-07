/* Diagrama de digitaciones del corno inglés (sistema Conservatorio) — interactivo.
   El corno inglés es el contralto del oboe: MISMAS digitaciones (hereda la tabla
   verificada del motor del oboe, tablas de Cdang en Commons), con dos diferencias:
   no tiene la llave de Si♭ grave (su nota más grave escrita es el Si3) y suena una
   QUINTA JUSTA por debajo de lo escrito (está en Fa); el marcador muestra ambas
   alturas y el audio reproduce la altura real. Visual: tudel curvado con la caña
   y campana periforme (la "pera") en lugar de la campana abierta del oboe.
   Uso: <div id="x"></div><script>tmCornoInglesEngine('x');</script> */
(function () {
  'use strict';

  // Elementos que se ENCIENDEN (data-k). El resto de la mecánica es decorativa (estática).
  // hole: 6 agujeros/platos (L1-L3 mano izq., R1-R3 mano der.). half: medio agujero sobre L1.
  // oct: llaves de octava. loop/spat: llaves de meñique y llave de Fa.
  var KEYS = [
    { id: 'OCT3', sh: 'oct',  x: 126, y: 93 },   // 3ª llave de octava (sobreagudo)
    { id: 'OCT1', sh: 'oct',  x: 150, y: 88 },   // 1ª llave de octava
    { id: 'OCT2', sh: 'oct',  x: 176, y: 83 },   // 2ª llave de octava
    { id: 'L1',   sh: 'hole', x: 205, y: 120 },
    { id: 'L1h',  sh: 'half', x: 205, y: 120 },  // medio agujero sobre L1
    { id: 'L2',   sh: 'hole', x: 245, y: 120 },
    { id: 'L3',   sh: 'hole', x: 285, y: 120 },
    { id: 'R1',   sh: 'hole', x: 370, y: 120 },
    { id: 'R2',   sh: 'hole', x: 410, y: 120 },
    { id: 'R3',   sh: 'hole', x: 450, y: 120 },
    { id: 'FK',   sh: 'loop', x: 430, y: 148 },  // llave de Fa
    // Meñique izquierdo ARRIBA del tubo, como en la carta de Cdang rotada 90° CCW:
    // elipse del Sol# aparte y tridente de tres bastones curvados desde un tronco común
    // (la punta curvada mira al tudel; de arriba abajo: Si grave, Mib izq. — el corno inglés no tiene Si♭ grave).
    { id: 'LP1',  sh: 'loop',  x: 270, y: 86 },  // Sol# (meñique izq.)
    { id: 'LP3',  sh: 'prong', x: 302, y: 73 },  // Si grave
    { id: 'LP2',  sh: 'prong', x: 302, y: 87 },  // Mib izquierdo
    { id: 'RP1',  sh: 'loop', x: 482, y: 153 },  // Do grave (meñique dcho.)
    { id: 'RP2',  sh: 'loop', x: 506, y: 157 },  // Do#
    { id: 'RP3',  sh: 'loop', x: 494, y: 170 }   // Mib
  ];
  var SVG_W = 680, SVG_H = 220;

  var ALL6 = ['L1', 'L2', 'L3', 'R1', 'R2', 'R3'];
  // Digitaciones verificadas contra la tabla de Cdang (Commons,
  // "Tablature hautbois 18 clefs deux octaves"), columna a columna.
  // L1h = medio agujero en L1. FK = llave de Fa.
  var FING = {
    'Si3':  { keys: ALL6.concat(['LP3', 'RP1']) },            // 6 + Si grave + Do
    'Do4':  { keys: ALL6.concat(['RP1']) },                   // 6 + Do grave
    'Do#4': { keys: ALL6.concat(['RP2']) },                   // 6 + Do#
    'Re4':  { keys: ALL6.slice() },
    'Re#4': { keys: ALL6.concat(['RP3']) },                   // alt: ALL6 + LP2 (Mib izq.)
    'Mi4':  { keys: ['L1', 'L2', 'L3', 'R1', 'R2'] },
    'Fa4':  { keys: ['L1', 'L2', 'L3', 'R1', 'R2', 'FK'] },   // alt horquilla: L1 L2 L3 R1 R3
    'Fa#4': { keys: ['L1', 'L2', 'L3', 'R1'] },
    'Sol4': { keys: ['L1', 'L2', 'L3'] },
    'Sol#4':{ keys: ['L1', 'L2', 'L3', 'LP1'] },
    'La4':  { keys: ['L1', 'L2'] },
    'La#4': { keys: ['L1', 'L2', 'R1'] },                     // Sib4: 1-2 + 4
    'Si4':  { keys: ['L1'] },
    'Do5':  { keys: ['L1', 'R1'] },                           // 1 + 4
    'Do#5': { keys: ['L1h', 'L2', 'L3', 'R1', 'R2', 'R3', 'RP2'] },
    'Re5':  { keys: ['L1h', 'L2', 'L3', 'R1', 'R2', 'R3'] },  // ½ + 2-6 (SIN llave de octava)
    'Re#5': { keys: ['L1h', 'L2', 'L3', 'R1', 'R2', 'R3', 'RP3'] }, // alt: con LP2
    'Mi5':  { keys: ['OCT1', 'L1', 'L2', 'L3', 'R1', 'R2'] },
    'Fa5':  { keys: ['OCT1', 'L1', 'L2', 'L3', 'R1', 'R2', 'FK'] }, // alt horquilla: OCT1 + 1 2 3 4 6
    'Fa#5': { keys: ['OCT1', 'L1', 'L2', 'L3', 'R1'] },
    'Sol5': { keys: ['OCT1', 'L1', 'L2', 'L3'] },
    'Sol#5':{ keys: ['OCT1', 'L1', 'L2', 'L3', 'LP1'] },
    'La5':  { keys: ['OCT2', 'L1', 'L2'] },                   // 2ª octava desde La5
    'La#5': { keys: ['OCT2', 'L1', 'L2', 'R1'] },             // Sib5: 1-2 + 4
    'Si5':  { keys: ['OCT2', 'L1'] },
    'Do6':  { keys: ['OCT2', 'L1', 'R1'] },                   // 1 + 4
    // Sobreagudo (tabla "contre notes" de Cdang). OCT3 = 3ª llave de octava.
    'Do#6': { keys: ['L2', 'L3', 'R1', 'RP1'] },              // 2-3 + 4 + Do grave
    'Re6':  { keys: ['L1h', 'L2', 'L3', 'RP1'] },             // ½ + 2-3 + Do grave
    'Re#6': { keys: ['L1h', 'L2', 'L3', 'R2', 'R3', 'LP3'] }, // ½ + 2-3 + 5-6 + Si grave
    'Mi6':  { keys: ['OCT3', 'L1h', 'L2', 'L3', 'R2', 'R3', 'LP1', 'LP2'] }, // alt: con Mib dcho.
    'Fa6':  { keys: ['OCT3', 'L1h', 'L2', 'R2', 'R3', 'LP1', 'LP2'] },       // alt: con Mib dcho.
    'Fa#6': { keys: ['OCT3', 'L1', 'L2', 'R1', 'RP1'] },      // alt cromática: 1 + 5-6 + Mib dcho.
    'Sol6': { keys: ['OCT3', 'L1', 'L3', 'R1'] }
  };
  var ORDEN = [
    'Si3', 'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5', 'Mi5', 'Fa5', 'Fa#5', 'Sol5', 'Sol#5', 'La5', 'La#5', 'Si5',
    'Do6', 'Do#6', 'Re6', 'Re#6', 'Mi6', 'Fa6', 'Fa#6', 'Sol6'
  ];
  var SUB = { '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆' };
  var FLAT = { 'La#4': 'Si♭₄', 'La#5': 'Si♭₅' };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  // Registros como en la página: grave Si♭3–Sol4, medio –Sol5, agudo –Re6, sobreagudo –Sol6.
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Sol4')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Sol5')) return 'Registro medio';
    if (i <= ORDEN.indexOf('Re6')) return 'Registro agudo';
    return 'Registro sobreagudo';
  }
  // El corno inglés (en Fa) suena una quinta justa (7 semitonos) por debajo de lo escrito
  var ES_FLAT = ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
  function suena(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return '';
    var semis = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
    var midi = semis[m[1]] + (m[2] ? 1 : 0) + (parseInt(m[3], 10) + 1) * 12 - 7;
    return ES_FLAT[midi % 12] + SUB[String(Math.floor(midi / 12) - 1)];
  }
  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var AUDIO_BASE = '/assets/audio/corno-ingles/';
  function sampleFile(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    return m ? LETTER[m[1]] + (m[2] ? 's' : '') + m[3] : null;
  }
  function intl(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    return m ? LETTER[m[1]] + (m[2] ? '♯' : '') + m[3] : n;
  }
  function vfNote(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return null;
    var acc = m[2] ? '#' : null;
    return { key: LETTER[m[1]].toLowerCase() + (acc || '') + '/' + m[3], acc: acc };
  }

  var CSS = [
    '.tm-ci-wrap{margin:18px 0;}',
    '.tm-ci-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-ci-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-ci-prov{color:#b06a00;}',
    '.tm-ci-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-ci-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;display:flex;justify-content:center;}',
    '.tm-ci-svg{display:block;max-width:640px;width:100%;height:auto;margin:0 auto;}',
    '.tm-ci-key .k-pad{fill:#e9eaee;stroke:#8f9199;stroke-width:1.5;}',
    '.tm-ci-key.on .k-pad{fill:#8b6914;stroke:#6b5010;}',
    '.tm-ci-key .k-ring{fill:none;stroke:#8f9199;stroke-width:1.2;}',
    '.tm-ci-key.on .k-ring{stroke:#e8dcc0;}',
    '.tm-ci-half .k-pad{fill:transparent;stroke:none;}',
    '.tm-ci-half.on .k-pad{fill:#8b6914;}',
    '.tm-ci-trill{fill:#e9eaee;stroke:#8f9199;stroke-width:1.2;}',
    '.tm-ci-trill-rod{stroke:#b9bbc1;stroke-width:1.2;}',
    '.tm-ci-klab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#555;text-anchor:middle;}',
    '.tm-ci-grp{font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:#8b6914;text-anchor:middle;font-weight:bold;}',
    '.tm-ci-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-ci-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-ci-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-ci-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-ci-btn.todo{opacity:.5;font-weight:500;}',
    '.tm-ci-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-ci-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-ci-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-ci-play:hover{background:#6b5010;}',
    '.tm-ci-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-ci-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-ci-css')) return;
    var s = document.createElement('style'); s.id = 'tm-ci-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Dibujo estático del instrumento (horizontal): caña, cuerpo de granadillo,
  // anillas de las uniones, eje de la mecánica, varillas y etiquetas.
  var DECO =
    '<defs><linearGradient id="tmCiWood" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#5b5148"/><stop offset="0.28" stop-color="#37302a"/>' +
      '<stop offset="0.55" stop-color="#1e1915"/><stop offset="1" stop-color="#0e0b09"/>' +
    '</linearGradient></defs>' +
    // caña sobre TUDEL curvado (el bocal metálico característico del corno inglés)
    '<path d="M28 96 Q46 88 62 92 L64 100 Q48 98 32 104 Q26 100 28 96 Z" fill="#d9b26a" stroke="#a8843e" stroke-width="1"/>' +
    '<rect x="58" y="90" width="12" height="12" rx="2.5" fill="#7a3040" stroke="#5e2432" stroke-width="1" transform="rotate(8 64 96)"/>' +
    '<path d="M68 96 C88 96 104 104 116 116" stroke="#b9bbc1" stroke-width="4.5" fill="none" stroke-linecap="round"/>' +
    // cuerpo cónico y campana PERIFORME (la "pera" del corno inglés)
    '<path d="M116 110 L300 108.5 L470 107 L560 105.5 L560 134.5 L470 133 L300 131.5 L116 130 Z" fill="url(#tmCiWood)" stroke="#0c0a08" stroke-width="1"/>' +
    '<path d="M558 105.5 C596 100 626 106 632 120 C626 134 596 140 558 134.5 Z" fill="url(#tmCiWood)" stroke="#0c0a08" stroke-width="1"/>' +
    '<ellipse cx="631" cy="120" rx="3.5" ry="8" fill="#17120e" stroke="#0c0a08" stroke-width="1"/>' +
    '<line x1="128" y1="112" x2="550" y2="109.5" stroke="#7d6f63" stroke-width="1" opacity="0.8"/>' +
    // anillas metálicas de las uniones
    '<rect x="116" y="108" width="6" height="23" rx="1.5" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    '<rect x="296" y="106" width="7" height="27" rx="1.5" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    '<rect x="466" y="105" width="7" height="29" rx="1.5" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    // eje longitudinal de la mecánica y varillas hacia las llaves
    '<line x1="192" y1="110" x2="548" y2="108" stroke="#b9bbc1" stroke-width="1.6"/>' +
    '<line x1="126" y1="101" x2="126" y2="110" stroke="#b9bbc1" stroke-width="1.6"/>' +
    '<line x1="150" y1="96" x2="150" y2="110" stroke="#b9bbc1" stroke-width="1.6"/>' +
    '<line x1="176" y1="91" x2="176" y2="110" stroke="#b9bbc1" stroke-width="1.6"/>' +
    '<line x1="270" y1="109" x2="270" y2="93" stroke="#b9bbc1" stroke-width="1.4"/>' +
    '<line x1="312" y1="109" x2="312" y2="56" stroke="#b9bbc1" stroke-width="1.6"/>' +
    '<line x1="430" y1="131" x2="430" y2="143" stroke="#b9bbc1" stroke-width="1.4"/>' +
    '<line x1="482" y1="133" x2="482" y2="148" stroke="#b9bbc1" stroke-width="1.4"/>' +
    '<line x1="506" y1="133" x2="506" y2="152" stroke="#b9bbc1" stroke-width="1.4"/>' +
    // llaves de trino (decorativas: un oboe real las lleva para trinos rápidos,
    // pero no cambian ninguna digitación de esta tabla, así que nunca se encienden)
    '<line class="tm-ci-trill-rod" x1="225" y1="99" x2="225" y2="110"/>' +
    '<ellipse class="tm-ci-trill" cx="225" cy="99" rx="5" ry="4"/>' +
    '<line class="tm-ci-trill-rod" x1="265" y1="99" x2="265" y2="110"/>' +
    '<ellipse class="tm-ci-trill" cx="265" cy="99" rx="5" ry="4"/>' +
    '<line class="tm-ci-trill-rod" x1="390" y1="97" x2="390" y2="109"/>' +
    '<ellipse class="tm-ci-trill" cx="390" cy="97" rx="5" ry="4"/>' +
    // etiquetas
    '<text class="tm-ci-klab" x="163" y="66">Llaves de octava</text>' +
    '<text class="tm-ci-klab" x="205" y="96">1</text><text class="tm-ci-klab" x="245" y="96">2</text><text class="tm-ci-klab" x="285" y="96">3</text>' +
    '<text class="tm-ci-klab" x="370" y="96">4</text><text class="tm-ci-klab" x="410" y="96">5</text><text class="tm-ci-klab" x="450" y="96">6</text>' +
    '<text class="tm-ci-klab" x="42" y="120">Caña</text>' +
    '<text class="tm-ci-klab" x="92" y="130">Tudel</text>' +
    '<text class="tm-ci-klab" x="596" y="162">Campana periforme</text>' +
    '<text class="tm-ci-klab" x="302" y="48">Meñique izq.</text>' +
    '<text class="tm-ci-klab" x="494" y="192">Meñique dcho.</text>' +
    '<text class="tm-ci-grp" x="245" y="212">Mano izquierda</text>' +
    '<text class="tm-ci-grp" x="410" y="212">Mano derecha</text>';

  function keyShape(k) {
    if (k.sh === 'half') {
      // semicírculo superior de L1 (medio agujero); invisible salvo cuando está .on
      return '<g class="tm-ci-key tm-ci-half" data-k="' + k.id + '">' +
        '<path class="k-pad" d="M' + (k.x - 11) + ' ' + k.y + ' A11 11 0 0 1 ' + (k.x + 11) + ' ' + k.y + ' Z"/></g>';
    }
    var open = '<g class="tm-ci-key" data-k="' + k.id + '">', close = '</g>';
    if (k.sh === 'prong') {
      // bastón horizontal (palanca del meñique): barra con la punta izquierda curvada
      // hacia abajo — el símbolo de la carta de Cdang rotado 90° CCW
      var x = k.x, y = k.y;
      return open + '<path class="k-pad" d="M' + (x + 10) + ' ' + (y - 3.5) +
        ' L' + (x - 5) + ' ' + (y - 3.5) +
        ' Q' + (x - 10) + ' ' + (y - 3.5) + ' ' + (x - 10) + ' ' + (y + 1) +
        ' L' + (x - 10) + ' ' + (y + 6) +
        ' Q' + (x - 10) + ' ' + (y + 9.5) + ' ' + (x - 6.5) + ' ' + (y + 9.5) +
        ' Q' + (x - 3) + ' ' + (y + 9.5) + ' ' + (x - 3) + ' ' + (y + 6.5) +
        ' L' + (x - 3) + ' ' + (y + 3.5) +
        ' L' + (x + 10) + ' ' + (y + 3.5) + ' Z"/>' + close;
    }
    if (k.sh === 'oct') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="6" ry="8"/>' + close;
    }
    if (k.sh === 'loop') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="8" ry="6"/>' + close;
    }
    // hole: plato con anillo decorativo encima
    return open +
      '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="11"/>' +
      '<circle class="k-ring" cx="' + k.x + '" cy="' + k.y + '" r="4.5"/>' + close;
  }

  function tmCornoInglesEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var keysSvg = KEYS.map(keyShape).join('');
    var btns = ORDEN.map(function (n) {
      var hasData = !!FING[n];
      return '<button class="tm-ci-btn' + (hasData ? '' : ' todo') + '" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-ci-wrap">' +
        '<div class="tm-ci-readout" id="' + uid + '_ro"><span class="tm-ci-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-ci-diagram"><svg class="tm-ci-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" role="img" aria-label="Diagrama de digitación del corno inglés: instrumento horizontal con el tudel y la caña a la izquierda y la campana periforme a la derecha; las llaves pulsadas se muestran en dorado">' +
          DECO + keysSvg +
        '</svg></div>' +
        '<div class="tm-ci-btns">' + btns + '</div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-ci-svg');
    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

    function play(n) {
      var f = sampleFile(n);
      if (!f) return;
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + f + '.mp3';
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
      r.resize(150, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 34, 132);
      stave.addClef('treble').setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: 'treble' });
      if (vn.acc) note.addModifier(new V.Accidental(vn.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) { s.setAttribute('viewBox', '0 0 150 150'); s.style.width = '140px'; s.style.maxWidth = '100%'; s.style.height = 'auto'; }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-ci-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      svg.querySelectorAll('.tm-ci-key').forEach(function (c) { c.classList.remove('on'); });
      if (data) data.keys.forEach(function (id) {
        var c = svg.querySelector('.tm-ci-key[data-k="' + id + '"]'); if (c) c.classList.add('on');
      });
      var estado = data ? '' : ' · <span class="tm-ci-prov">digitación por confirmar</span>';
      ro.innerHTML =
        '<div class="tm-ci-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-ci-noterow"><span class="tm-ci-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-ci-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-ci-reg">' + intl(n) + ' · ' + registro(n) + ' · suena ' + suena(n) + ' (5ª justa abajo)' + estado + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-ci-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-ci-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmCornoInglesEngine = tmCornoInglesEngine;
})();
