/* Diagrama de digitaciones del fagot (sistema alemán/Heckel) — interactivo.
   Fagot horizontal propio: caña y tudel a la izquierda, culata a la derecha y
   campana volviendo hacia la izquierda (los dos tubos paralelos). Llave plateada =
   abierta, llave dorada = pulsada. Los pulgares (9 llaves el izquierdo, 3 dibujadas
   del derecho) van entre los dos tubos; los meñiques, bajo el tubo grave.
   Uso: <div id="x"></div><script>tmFagotEngine('x');</script>
   Datos verificados contra la carta oficial de Fox Products ("Let's Play Bassoon",
   Hugo Fox, págs. 14-20), decodificada del PDF celda a celda; es la carta base de
   afinación de los fagotes Fox y "aplica a la mayoría de Heckel".
   Nota: en Si♭1–Mi2 la carta no marca la llave de piano (whisper) porque la cierra
   el puente mecánico de las llaves graves del pulgar.
   El pentagrama usa la clave real de lectura: fa en 4ª hasta Sol3, do en 4ª hasta
   Sol4 y sol en el sobreagudo (se evitan líneas adicionales). */
(function () {
  'use strict';

  // Elementos que se ENCIENDEN (data-k). El resto del dibujo es decorativo.
  var KEYS = [
    // Pulgar izquierdo (entre los tubos, zona izquierda)
    { id: 'W',   sh: 'small', x: 128, y: 140 },  // llave de piano (whisper)
    { id: 'HD',  sh: 'oct',   x: 158, y: 140 },  // llave aguda de Re
    { id: 'HC',  sh: 'oct',   x: 180, y: 140 },  // llave aguda de Do
    { id: 'HA',  sh: 'oct',   x: 202, y: 140 },  // llave aguda de La
    { id: 'LD',  sh: 'touch', x: 238, y: 140 },  // Re grave
    { id: 'LC',  sh: 'touch', x: 262, y: 140 },  // Do grave
    { id: 'LB',  sh: 'touch', x: 286, y: 140 },  // Si grave
    { id: 'LBB', sh: 'touch', x: 310, y: 140 },  // Si♭ grave
    { id: 'CS',  sh: 'oct',   x: 336, y: 140 },  // Do♯ (pulgar izq.)
    // Pulgar derecho (entre los tubos, zona derecha)
    { id: 'BB',  sh: 'loop',  x: 452, y: 140 },  // Si♭ (pulgar dcho.)
    { id: 'LE',  sh: 'pan',   x: 482, y: 141 },  // Mi grave («pancake»)
    { id: 'FS',  sh: 'oct',   x: 510, y: 140 },  // Fa♯ (pulgar dcho.)
    // Agujeros del tubo (mano izq. 1-3, mano dcha. 4-6)
    { id: 'H1',  sh: 'hole',  x: 170, y: 181 },
    { id: 'H1h', sh: 'half',  x: 170, y: 181 },  // medio agujero sobre el 1
    { id: 'H2',  sh: 'hole',  x: 205, y: 181 },
    { id: 'H3',  sh: 'hole',  x: 240, y: 181 },
    { id: 'H4',  sh: 'hole',  x: 355, y: 182 },
    { id: 'H5',  sh: 'hole',  x: 390, y: 182 },
    { id: 'G6',  sh: 'hole',  x: 425, y: 182, r: 10 },  // plato del 6 (Sol)
    // Meñiques y frontales (bajo el tubo)
    { id: 'TRC', sh: 'tiny',  x: 340, y: 226 },  // trino de Do♯ (mano dcha.)
    { id: 'EBR', sh: 'spat',  x: 250, y: 232 },  // Mi♭ de resonancia (meñique izq.)
    { id: 'LCS', sh: 'spat',  x: 274, y: 240 },  // Do♯ grave (meñique izq.)
    { id: 'FK',  sh: 'loop',  x: 430, y: 232 },  // llave de Fa (meñique dcho.)
    { id: 'AB',  sh: 'loop',  x: 456, y: 240 }   // Sol♯/La♭ (meñique dcho.)
  ];
  var SVG_W = 680, SVG_H = 300;

  // Nombres para el desglose de la digitación en el marcador
  var NAMES = {
    W: 'll. de piano', HD: 'll. aguda de Re', HC: 'll. aguda de Do', HA: 'll. aguda de La',
    LD: 'Re grave', LC: 'Do grave', LB: 'Si grave', LBB: 'Si♭ grave', CS: 'Do♯ (pulgar)',
    BB: 'Si♭ (pulgar dcho.)', LE: 'Mi grave', FS: 'Fa♯ (pulgar dcho.)',
    H1: 'agujero 1', H1h: '½ agujero 1', H2: 'agujero 2', H3: 'agujero 3',
    H4: 'agujero 4', H5: 'agujero 5', G6: 'plato 6 (Sol)',
    TRC: 'trino de Do♯', EBR: 'Mi♭ resonancia', LCS: 'Do♯ grave (meñique)',
    FK: 'll. de Fa', AB: 'Sol♯ (meñique)'
  };

  // Digitaciones estándar (carta Fox), Si♭1–Mi♭5.
  var FING = {
    'La#1': { keys: ['LBB', 'LB', 'LC', 'LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Si1':  { keys: ['LB', 'LC', 'LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Do2':  { keys: ['LC', 'LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Do#2': { keys: ['LC', 'LD', 'LCS', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Re2':  { keys: ['LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Re#2': { keys: ['LD', 'EBR', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Mi2':  { keys: ['H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Fa2':  { keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK'] },
    'Fa#2': { keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FS'] },
    'Sol2': { keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6'] },
    'Sol#2':{ keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'AB'] },
    'La2':  { keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5'] },
    'La#2': { keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5', 'BB'] },
    'Si2':  { keys: ['W', 'H1', 'H2', 'H3', 'H4'] },
    'Do3':  { keys: ['W', 'H1', 'H2', 'H3'] },
    'Do#3': { keys: ['W', 'H1', 'H2', 'H3', 'CS', 'LD'] },
    'Re3':  { keys: ['W', 'H1', 'H2'] },
    'Re#3': { keys: ['W', 'H1', 'H3'] },
    'Mi3':  { keys: ['W', 'H1'] },
    'Fa3':  { keys: ['W'] },
    'Fa#3': { keys: ['W', 'H1h', 'H2', 'H3', 'H4', 'H5', 'G6', 'FS'] },
    'Sol3': { keys: ['W', 'H1h', 'H2', 'H3', 'H4', 'H5', 'G6', 'EBR'] },
    'Sol#3':{ keys: ['W', 'H1h', 'H2', 'H3', 'H4', 'H5', 'G6', 'AB'] },
    'La3':  { keys: ['H1', 'H2', 'H3', 'H4', 'H5'] },
    'La#3': { keys: ['H1', 'H2', 'H3', 'H4', 'H5', 'BB'] },
    'Si3':  { keys: ['H1', 'H2', 'H3', 'H4'] },
    'Do4':  { keys: ['H1', 'H2', 'H3'] },
    'Do#4': { keys: ['H1', 'H2', 'H3', 'CS', 'LD'] },
    'Re4':  { keys: ['H1', 'H2'] },
    'Re#4': { keys: ['H1', 'H2', 'H4', 'H5', 'G6'] },
    'Mi4':  { keys: ['H1', 'H3', 'EBR', 'H4', 'H5', 'G6'] },
    'Fa4':  { keys: ['H1', 'H3', 'EBR', 'H4', 'H5'] },
    'Fa#4': { keys: ['H2', 'H3', 'EBR', 'H4', 'H5', 'FK'] },
    'Sol4': { keys: ['W', 'H1h', 'H2', 'H3', 'EBR', 'H4', 'FK'] },
    'Sol#4':{ keys: ['W', 'H1h', 'H2', 'H3', 'EBR', 'G6'] },
    'La4':  { keys: ['HA', 'CS', 'H1', 'H2', 'H3', 'EBR', 'G6'] },
    'La#4': { keys: ['HA', 'CS', 'H1', 'H2', 'H3', 'EBR', 'H4', 'H5', 'FK'] },
    'Si4':  { keys: ['HC', 'H1', 'H2', 'EBR', 'H4', 'H5', 'FK'] },
    'Do5':  { keys: ['HC', 'H1', 'EBR', 'H4', 'H5', 'BB', 'FK'] },
    'Do#5': { keys: ['HD', 'HC', 'H1', 'H3', 'EBR', 'H4', 'G6'] },
    'Re5':  { keys: ['HD', 'H3', 'EBR', 'BB', 'G6', 'AB'] },
    'Re#5': { keys: ['H1h', 'H2', 'H3', 'CS', 'EBR', 'TRC', 'AB'] }
  };
  var ORDEN = [
    'La#1', 'Si1', 'Do2', 'Do#2', 'Re2', 'Re#2', 'Mi2', 'Fa2', 'Fa#2', 'Sol2', 'Sol#2', 'La2', 'La#2', 'Si2',
    'Do3', 'Do#3', 'Re3', 'Re#3', 'Mi3', 'Fa3', 'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3', 'Si3',
    'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5'
  ];
  var SUB = { '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅' };
  var FLAT = {
    'La#1': 'Si♭₁', 'Re#2': 'Mi♭₂', 'Sol#2': 'La♭₂', 'La#2': 'Si♭₂',
    'Re#3': 'Mi♭₃', 'Sol#3': 'La♭₃', 'La#3': 'Si♭₃',
    'Re#4': 'Mi♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄', 'Re#5': 'Mi♭₅'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  // Registros como en la página: grave Si♭1–Sol2, medio –Sol3, agudo –Sol4, sobreagudo –Mi♭5.
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Sol2')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Sol3')) return 'Registro medio';
    if (i <= ORDEN.indexOf('Sol4')) return 'Registro agudo';
    return 'Registro sobreagudo';
  }
  // Clave real de lectura según el registro (evita líneas adicionales)
  function claveDe(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Sol3')) return 'bass';
    if (i <= ORDEN.indexOf('Sol4')) return 'tenor';
    return 'treble';
  }
  var CLAVE_ES = { bass: 'fa en 4ª', tenor: 'do en 4ª', treble: 'sol' };

  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var AUDIO_BASE = '/assets/audio/fagot/';
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
    '.tm-fg-wrap{margin:18px 0;}',
    '.tm-fg-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-fg-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-fg-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-fg-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-fg-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;display:flex;justify-content:center;}',
    '.tm-fg-svg{display:block;max-width:640px;width:100%;height:auto;margin:0 auto;}',
    '.tm-fg-key .k-pad{fill:#e9eaee;stroke:#8f9199;stroke-width:1.5;}',
    '.tm-fg-key.on .k-pad{fill:#8b6914;stroke:#6b5010;}',
    '.tm-fg-key .k-ring{fill:none;stroke:#8f9199;stroke-width:1.2;}',
    '.tm-fg-key.on .k-ring{stroke:#e8dcc0;}',
    '.tm-fg-half .k-pad{fill:transparent;stroke:none;}',
    '.tm-fg-half.on .k-pad{fill:#8b6914;}',
    '.tm-fg-klab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#555;text-anchor:middle;}',
    '.tm-fg-klab2{font-family:Arial,Helvetica,sans-serif;font-size:9px;fill:#777;text-anchor:middle;}',
    '.tm-fg-grp{font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:#8b6914;text-anchor:middle;font-weight:bold;}',
    '.tm-fg-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-fg-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-fg-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-fg-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fg-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-fg-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-fg-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-fg-play:hover{background:#6b5010;}',
    '.tm-fg-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-fg-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-fg-css')) return;
    var s = document.createElement('style'); s.id = 'tm-fg-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Dibujo estático: los dos tubos paralelos (campana arriba a la izq., culata a la
  // dcha.), tudel con caña, anillas, varillas y etiquetas.
  var DECO =
    '<defs><linearGradient id="tmFgWood" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#7d4e28"/><stop offset="0.3" stop-color="#5a3418"/>' +
      '<stop offset="0.6" stop-color="#3f2210"/><stop offset="1" stop-color="#2a1408"/>' +
    '</linearGradient></defs>' +
    // caña (pala + atadura) y tudel curvo
    '<path d="M31 58 L45 62 L43 84 L33 82 Z" fill="#d9b26a" stroke="#a8843e" stroke-width="1"/>' +
    '<line x1="33" y1="70" x2="44" y2="72" stroke="#b58f47" stroke-width="0.8"/>' +
    '<rect x="31" y="82" width="14" height="9" rx="2.5" fill="#7a3040" stroke="#5e2432" stroke-width="1"/>' +
    '<path d="M38 91 C40 118 62 158 90 170 L106 176 L118 180" stroke="#b9bbc1" stroke-width="5" fill="none" stroke-linecap="round"/>' +
    // tubo grave (campana) arriba: de la culata a la campana en la izquierda
    '<path d="M596 88 L150 90 C120 88 104 84 96 78 L96 126 C104 120 120 116 150 114 L596 112 Z" fill="url(#tmFgWood)" stroke="#1c0f06" stroke-width="1"/>' +
    '<ellipse cx="96" cy="102" rx="5.5" ry="25" fill="#17100a" stroke="#0d0805" stroke-width="1"/>' +
    '<ellipse cx="96" cy="102" rx="3" ry="18" fill="#4a3020"/>' +
    '<rect x="146" y="88" width="7" height="26" rx="2" fill="#e8e2d0" stroke="#b8b09a" stroke-width="0.8"/>' +
    '<line x1="160" y1="92" x2="588" y2="90.5" stroke="#96684044" stroke-width="1"/>' +
    // tubo agudo (alas y culata) abajo: del tudel a la culata
    '<path d="M118 170 L596 164 L596 200 L118 192 Z" fill="url(#tmFgWood)" stroke="#1c0f06" stroke-width="1"/>' +
    '<line x1="130" y1="173" x2="588" y2="167" stroke="#9668404d" stroke-width="1"/>' +
    // culata a la derecha (une los dos tubos) con banda metálica
    '<rect x="594" y="76" width="54" height="132" rx="14" fill="url(#tmFgWood)" stroke="#1c0f06" stroke-width="1"/>' +
    '<rect x="590" y="76" width="7" height="132" rx="2" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    '<path d="M640 100 C652 112 652 172 640 184" stroke="#3f2210" stroke-width="2" fill="none"/>' +
    // anillas de uniones
    '<rect x="296" y="165" width="7" height="34" rx="2" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    '<rect x="330" y="88" width="7" height="25" rx="2" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    // ejes de mecánica y varillas hacia las llaves
    '<line x1="150" y1="167" x2="586" y2="162" stroke="#b9bbc1" stroke-width="1.4"/>' +
    '<line x1="128" y1="168" x2="128" y2="149" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="158" y1="167" x2="158" y2="150" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="180" y1="167" x2="180" y2="150" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="202" y1="167" x2="202" y2="150" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="336" y1="166" x2="336" y2="150" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="238" y1="112" x2="238" y2="130" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="262" y1="112" x2="262" y2="130" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="286" y1="112" x2="286" y2="130" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="310" y1="112" x2="310" y2="130" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="452" y1="166" x2="452" y2="147" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="482" y1="166" x2="482" y2="152" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="510" y1="166" x2="510" y2="148" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="250" y1="194" x2="250" y2="227" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="274" y1="195" x2="274" y2="235" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="340" y1="198" x2="340" y2="221" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="430" y1="199" x2="430" y2="226" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="456" y1="199" x2="456" y2="234" stroke="#b9bbc1" stroke-width="1.3"/>' +
    // etiquetas
    '<text class="tm-fg-klab" x="38" y="52">Caña</text>' +
    '<text class="tm-fg-klab" x="99" y="66">Campana</text>' +
    '<text class="tm-fg-klab" x="620" y="224">Culata</text>' +
    '<text class="tm-fg-grp" x="232" y="126">Pulgar izquierdo</text>' +
    '<text class="tm-fg-grp" x="481" y="126">Pulgar derecho</text>' +
    '<text class="tm-fg-klab2" x="128" y="160">piano</text>' +
    '<text class="tm-fg-klab2" x="158" y="160">Re</text>' +
    '<text class="tm-fg-klab2" x="180" y="160">Do</text>' +
    '<text class="tm-fg-klab2" x="202" y="160">La</text>' +
    '<text class="tm-fg-klab2" x="238" y="160">Re</text>' +
    '<text class="tm-fg-klab2" x="262" y="160">Do</text>' +
    '<text class="tm-fg-klab2" x="286" y="160">Si</text>' +
    '<text class="tm-fg-klab2" x="310" y="160">Si♭</text>' +
    '<text class="tm-fg-klab2" x="336" y="160">Do♯</text>' +
    '<text class="tm-fg-klab2" x="452" y="160">Si♭</text>' +
    '<text class="tm-fg-klab2" x="482" y="162">Mi</text>' +
    '<text class="tm-fg-klab2" x="510" y="160">Fa♯</text>' +
    '<text class="tm-fg-klab" x="170" y="214">1</text><text class="tm-fg-klab" x="205" y="214">2</text><text class="tm-fg-klab" x="240" y="214">3</text>' +
    '<text class="tm-fg-klab" x="355" y="214">4</text><text class="tm-fg-klab" x="390" y="214">5</text><text class="tm-fg-klab" x="425" y="214">6</text>' +
    '<text class="tm-fg-klab" x="340" y="216">tr</text>' +
    '<text class="tm-fg-klab" x="262" y="258">Meñique izq.</text>' +
    '<text class="tm-fg-klab" x="443" y="258">Meñique dcho.</text>' +
    '<text class="tm-fg-grp" x="205" y="286">Mano izquierda</text>' +
    '<text class="tm-fg-grp" x="390" y="286">Mano derecha</text>';

  function keyShape(k) {
    if (k.sh === 'half') {
      // semicírculo superior del agujero 1; invisible salvo cuando está .on
      return '<g class="tm-fg-key tm-fg-half" data-k="' + k.id + '">' +
        '<path class="k-pad" d="M' + (k.x - 9) + ' ' + k.y + ' A9 9 0 0 1 ' + (k.x + 9) + ' ' + k.y + ' Z"/></g>';
    }
    var open = '<g class="tm-fg-key" data-k="' + k.id + '">', close = '</g>';
    if (k.sh === 'oct') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="5.5" ry="8"/>' + close;
    }
    if (k.sh === 'small') {
      return open + '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="7"/>' + close;
    }
    if (k.sh === 'touch') {
      return open + '<rect class="k-pad" x="' + (k.x - 7.5) + '" y="' + (k.y - 9) + '" width="15" height="18" rx="5"/>' + close;
    }
    if (k.sh === 'pan') {
      return open + '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="10"/>' +
        '<circle class="k-ring" cx="' + k.x + '" cy="' + k.y + '" r="4"/>' + close;
    }
    if (k.sh === 'loop') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="8" ry="6"/>' + close;
    }
    if (k.sh === 'tiny') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="5" ry="4"/>' + close;
    }
    if (k.sh === 'spat') {
      return open + '<rect class="k-pad" x="' + (k.x - 7.5) + '" y="' + (k.y - 4) + '" width="15" height="8" rx="4"/>' + close;
    }
    // hole: plato con anillo decorativo
    var r = k.r || 9;
    return open +
      '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="' + r + '"/>' +
      '<circle class="k-ring" cx="' + k.x + '" cy="' + k.y + '" r="4"/>' + close;
  }

  function tmFagotEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var keysSvg = KEYS.map(keyShape).join('');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-fg-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-fg-wrap">' +
        '<div class="tm-fg-readout" id="' + uid + '_ro"><span class="tm-fg-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-fg-diagram"><svg class="tm-fg-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" role="img" aria-label="Diagrama de digitación del fagot: instrumento horizontal con la caña a la izquierda, la culata a la derecha y la campana volviendo por arriba; las llaves pulsadas se muestran en dorado">' +
          DECO + keysSvg +
        '</svg></div>' +
        '<div class="tm-fg-btns">' + btns + '</div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-fg-svg');
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
      var clef = claveDe(n);
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(150, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 34, 132);
      stave.addClef(clef).setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: clef });
      if (vn.acc) note.addModifier(new V.Accidental(vn.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) { s.setAttribute('viewBox', '0 0 150 150'); s.style.width = '140px'; s.style.maxWidth = '100%'; s.style.height = 'auto'; }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-fg-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      svg.querySelectorAll('.tm-fg-key').forEach(function (c) { c.classList.remove('on'); });
      var nombres = [];
      if (data) data.keys.forEach(function (id) {
        var c = svg.querySelector('.tm-fg-key[data-k="' + id + '"]'); if (c) c.classList.add('on');
        if (NAMES[id]) nombres.push(NAMES[id]);
      });
      ro.innerHTML =
        '<div class="tm-fg-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-fg-noterow"><span class="tm-fg-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-fg-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-fg-reg">' + intl(n) + ' · ' + registro(n) + ' · clave de ' + CLAVE_ES[claveDe(n)] + '</div>' +
        '<div class="tm-fg-keysline">' + (nombres.length ? nombres.join(' · ') : '—') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-fg-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-fg-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmFagotEngine = tmFagotEngine;
})();
