/* Diagrama de digitaciones del clarinete alto (sistema Boehm) — interactivo.
   El clarinete alto hereda las digitaciones del clarinete en Si♭ (misma carta
   Yamaha verificada en digitaciones-clarinete-engine.js), incluida la llave del
   Mi♭3 grave escrito. Está en Mi♭ y suena una SEXTA MAYOR (9 semitonos) por
   debajo de lo escrito. Visual: cuello curvado metálico con la boquilla a la
   izquierda y campana metálica vuelta hacia arriba. El marcador muestra ambas
   alturas y el audio reproduce la altura real. Uso:
   <div id="x"></div><script>tmClarineteAltoEngine('x');</script> */
(function () {
  'use strict';

  var KEYS = [
    // Traseras (pulgar izquierdo), dibujadas encima del tubo
    { id: 'R',    sh: 'oct',   x: 140, y: 118 },  // llave de registro (12ª)
    { id: 'T',    sh: 'small', x: 165, y: 118 },  // agujero del pulgar
    // Garganta (mano izquierda, arriba)
    { id: 'A',    sh: 'tear',  x: 193, y: 116 },  // llave de La
    { id: 'GS',   sh: 'small', x: 216, y: 118, r: 6 },  // llave de Sol# de garganta
    // Agujeros (mano izq. 1-3, mano dcha. 4-6)
    { id: 'H1',   sh: 'hole',  x: 215, y: 165 },
    { id: 'H2',   sh: 'hole',  x: 250, y: 165 },
    { id: 'EBBA', sh: 'sliv',  x: 268, y: 150 },  // banana Mi♭/Si♭ (entre 2 y 3)
    { id: 'H3',   sh: 'hole',  x: 285, y: 165 },
    { id: 'H4',   sh: 'hole',  x: 345, y: 166 },
    { id: 'SLI',  sh: 'sliv',  x: 363, y: 151 },  // deslizante Si/Fa♯ (entre 4 y 5)
    { id: 'H5',   sh: 'hole',  x: 380, y: 166 },
    { id: 'H6',   sh: 'hole',  x: 415, y: 166 },
    // Meñique izquierdo ENCIMA del tubo (vista frontal, boquilla a la izq.),
    // en la unión entre los agujeros 3 y 4
    { id: 'LEB',  sh: 'spat',  x: 296, y: 120 },  // palanca de Mi/Si
    { id: 'LFCS', sh: 'spat',  x: 320, y: 112 },  // palanca de Fa♯/Do♯
    { id: 'CSGS', sh: 'loop',  x: 308, y: 96 },   // llave de Do♯/Sol♯
    // Meñique derecho (bajo el tubo, tras el agujero 6): racimo de 4 llaves.
    // REB y RFCS son las palancas de las digitaciones alternativas (no se encienden
    // con las principales, pero forman parte del racimo real).
    { id: 'RFC',  sh: 'spat',  x: 438, y: 210 },  // Fa/Do
    { id: 'RAB',  sh: 'loop',  x: 466, y: 214 },  // La♭/Mi♭
    { id: 'REB',  sh: 'spat',  x: 444, y: 228 },  // Mi/Si (alternativa dcha.)
    { id: 'RFCS', sh: 'spat',  x: 470, y: 232 },  // Fa♯/Do♯ (alternativa dcha.)
    { id: 'EBG',  sh: 'loop',  x: 500, y: 222 }   // Mi♭ grave (escrita; el alto también la lleva)
  ];
  var SVG_W = 680, SVG_H = 280;

  var NAMES = {
    R: 'registro', T: 'pulgar', A: 'La (garganta)', GS: 'Sol♯ (garganta)',
    H1: 'agujero 1', H2: 'agujero 2', H3: 'agujero 3', H4: 'agujero 4', H5: 'agujero 5', H6: 'agujero 6',
    EBBA: 'banana Mi♭/Si♭', SLI: 'deslizante Si/Fa♯',
    LEB: 'Mi/Si (meñique izq.)', LFCS: 'Fa♯/Do♯ (meñique izq.)', CSGS: 'Do♯/Sol♯ (meñique izq.)',
    RFC: 'Fa/Do (meñique dcho.)', RAB: 'La♭/Mi♭ (meñique dcho.)',
    REB: 'Mi/Si (meñique dcho.)', RFCS: 'Fa♯/Do♯ (meñique dcho.)', EBG: 'Mi♭ grave'
  };

  var ALL6 = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  // Digitaciones estándar (carta Yamaha), notas ESCRITAS Mi3–La6.
  var FING = {
    'Re#3': { keys: ['T'].concat(ALL6, ['LEB', 'EBG']) },     // Mi♭ grave: como Mi3 + llave de Mi♭
    'Mi3':  { keys: ['T'].concat(ALL6, ['LEB']) },
    'Fa3':  { keys: ['T'].concat(ALL6, ['RFC']) },
    'Fa#3': { keys: ['T'].concat(ALL6, ['LFCS']) },
    'Sol3': { keys: ['T'].concat(ALL6) },
    'Sol#3':{ keys: ['T'].concat(ALL6, ['RAB']) },
    'La3':  { keys: ['T', 'H1', 'H2', 'H3', 'H4', 'H5'] },
    'La#3': { keys: ['T', 'H1', 'H2', 'H3', 'H4'] },
    'Si3':  { keys: ['T', 'H1', 'H2', 'H3', 'H5'] },          // horquilla clásica
    'Do4':  { keys: ['T', 'H1', 'H2', 'H3'] },
    'Do#4': { keys: ['T', 'H1', 'H2', 'H3', 'CSGS'] },
    'Re4':  { keys: ['T', 'H1', 'H2'] },
    'Re#4': { keys: ['T', 'H1', 'H2', 'EBBA'] },
    'Mi4':  { keys: ['T', 'H1'] },
    'Fa4':  { keys: ['T'] },
    'Fa#4': { keys: ['H1'] },                                  // sin pulgar
    'Sol4': { keys: [] },                                      // al aire
    'Sol#4':{ keys: ['GS'] },
    'La4':  { keys: ['A'] },
    'La#4': { keys: ['A', 'R'] },
    // Clarín = chalumeau + llave de registro (12ª)
    'Si4':  { keys: ['R', 'T'].concat(ALL6, ['LEB']) },
    'Do5':  { keys: ['R', 'T'].concat(ALL6, ['RFC']) },
    'Do#5': { keys: ['R', 'T'].concat(ALL6, ['LFCS']) },
    'Re5':  { keys: ['R', 'T'].concat(ALL6) },
    'Re#5': { keys: ['R', 'T'].concat(ALL6, ['RAB']) },
    'Mi5':  { keys: ['R', 'T', 'H1', 'H2', 'H3', 'H4', 'H5'] },
    'Fa5':  { keys: ['R', 'T', 'H1', 'H2', 'H3', 'H4'] },
    'Fa#5': { keys: ['R', 'T', 'H1', 'H2', 'H3', 'H5'] },
    'Sol5': { keys: ['R', 'T', 'H1', 'H2', 'H3'] },
    'Sol#5':{ keys: ['R', 'T', 'H1', 'H2', 'H3', 'CSGS'] },
    'La5':  { keys: ['R', 'T', 'H1', 'H2'] },
    'La#5': { keys: ['R', 'T', 'H1', 'H2', 'EBBA'] },
    'Si5':  { keys: ['R', 'T', 'H1'] },
    'Do6':  { keys: ['R', 'T'] },
    // Sobreagudo (altissimo)
    'Do#6': { keys: ['R', 'T', 'H2', 'H3', 'H4', 'H5'] },
    'Re6':  { keys: ['R', 'T', 'H2', 'H3', 'H4', 'RAB'] },
    'Re#6': { keys: ['R', 'T', 'H2', 'H3', 'H4', 'SLI', 'RAB'] },
    'Mi6':  { keys: ['R', 'T', 'H2', 'H3', 'RAB'] },
    'Fa6':  { keys: ['R', 'T', 'H2', 'CSGS', 'RAB'] },
    'Fa#6': { keys: ['R', 'T', 'H2', 'RAB'] },
    'Sol6': { keys: ['R', 'T', 'H2', 'H4', 'H5', 'RAB'] },
    'Sol#6':{ keys: ['R', 'T', 'H2', 'H3', 'H4', 'SLI', 'RAB'] }, // mismo dedaje que Re#6 (otro parcial)
    'La6':  { keys: ['R', 'T', 'H2', 'H3', 'LFCS', 'RAB'] }
  };
  var ORDEN = [
    'Re#3', 'Mi3', 'Fa3', 'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3', 'Si3',
    'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5', 'Mi5', 'Fa5', 'Fa#5', 'Sol5', 'Sol#5', 'La5', 'La#5', 'Si5',
    'Do6', 'Do#6', 'Re6', 'Re#6', 'Mi6', 'Fa6', 'Fa#6', 'Sol6', 'Sol#6', 'La6'
  ];
  var SUB = { '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆' };
  var FLAT = {
    'Re#3': 'Mi♭₃', 'Fa#3': 'Sol♭₃', 'Sol#3': 'La♭₃', 'La#3': 'Si♭₃', 'Do#4': 'Re♭₄', 'Re#4': 'Mi♭₄',
    'Fa#4': 'Sol♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄', 'Do#5': 'Re♭₅', 'Re#5': 'Mi♭₅',
    'Fa#5': 'Sol♭₅', 'Sol#5': 'La♭₅', 'La#5': 'Si♭₅', 'Do#6': 'Re♭₆', 'Re#6': 'Mi♭₆',
    'Fa#6': 'Sol♭₆', 'Sol#6': 'La♭₆'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Fa#4')) return 'Chalumeau (grave)';
    if (i <= ORDEN.indexOf('La#4')) return 'Garganta';
    if (i <= ORDEN.indexOf('Do6')) return 'Clarín (medio)';
    return 'Sobreagudo';
  }

  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var ES_FLAT = ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
  function midiOf(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return null;
    var semis = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
    return semis[m[1]] + (m[2] ? 1 : 0) + (parseInt(m[3], 10) + 1) * 12;
  }
  // El clarinete alto en Mi♭ suena una sexta mayor (9 semitonos) por debajo de lo escrito
  function suena(n) {
    var midi = midiOf(n) - 9;
    return ES_FLAT[midi % 12] + SUB[String(Math.floor(midi / 12) - 1)];
  }
  var AUDIO_BASE = '/assets/audio/clarinete-alto/';
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
    '.tm-ca-wrap{margin:18px 0;}',
    '.tm-ca-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-ca-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-ca-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-ca-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-ca-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;display:flex;justify-content:center;}',
    '.tm-ca-svg{display:block;height:min(72vh,560px);width:auto;max-width:100%;margin:0 auto;}',
    '.tm-ca-key .k-pad{fill:#e9eaee;stroke:#8f9199;stroke-width:1.5;}',
    '.tm-ca-key.on .k-pad{fill:#8b6914;stroke:#6b5010;}',
    '.tm-ca-key .k-ring{fill:none;stroke:#8f9199;stroke-width:1.2;}',
    '.tm-ca-key.on .k-ring{stroke:#e8dcc0;}',
    '.tm-ca-klab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#555;text-anchor:middle;}',
    '.tm-ca-klab2{font-family:Arial,Helvetica,sans-serif;font-size:9px;fill:#777;text-anchor:middle;}',
    '.tm-ca-grp{font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:#8b6914;text-anchor:middle;font-weight:bold;}',
    '.tm-ca-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-ca-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-ca-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-ca-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-ca-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-ca-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-ca-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-ca-play:hover{background:#6b5010;}',
    '.tm-ca-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-ca-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-ca-css')) return;
    var s = document.createElement('style'); s.id = 'tm-ca-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Dibujo estático: boquilla con caña, barrilete, cuerpo de granadillo, campana,
  // anillas, eje de mecánica, varillas y etiquetas.
  var DECO =
    '<defs><linearGradient id="tmCaWood" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#4a453f"/><stop offset="0.3" stop-color="#2c2825"/>' +
      '<stop offset="0.6" stop-color="#1a1715"/><stop offset="1" stop-color="#0d0b0a"/>' +
    '</linearGradient></defs>' +
    // boquilla sobre CUELLO CURVADO metálico (característico del clarinete alto)
    '<path d="M30 96 L62 88 L66 100 L38 108 Q28 104 30 96 Z" fill="#1d1a18" stroke="#0d0b0a" stroke-width="1"/>' +
    '<rect x="50" y="88" width="13" height="16" rx="3" fill="#8a8d94" stroke="#5f6167" stroke-width="1" transform="rotate(-12 56 96)"/>' +
    '<path d="M64 96 C92 100 110 124 116 152 L120 166" stroke="#b9bbc1" stroke-width="7" fill="none" stroke-linecap="round"/>' +
    '<rect x="112" y="148" width="18" height="8" rx="3" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8" transform="rotate(64 121 152)"/>' +
    // cuerpo de granadillo y CAMPANA METÁLICA vuelta hacia arriba
    '<path d="M122 151 L560 148 L560 185.5 L122 181 Z" fill="url(#tmCaWood)" stroke="#0d0b0a" stroke-width="1"/>' +
    '<path d="M560 166 C598 165 616 152 620 122 C623 100 634 88 648 82" stroke="#a9abb2" stroke-width="15" fill="none" stroke-linecap="round"/>' +
    '<path d="M560 166 C598 165 616 152 620 122 C623 100 634 88 648 82" stroke="#d7d8dc" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>' +
    '<ellipse cx="652" cy="78" rx="10" ry="22" fill="url(#tmFnMetalCA)" stroke="#8f9199" stroke-width="1.2" transform="rotate(28 652 78)"/>' +
    '<defs><linearGradient id="tmFnMetalCA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f3f5"/><stop offset="1" stop-color="#a9abb2"/></linearGradient></defs>' +
    '<line x1="132" y1="153" x2="552" y2="150" stroke="#6e655c" stroke-width="1" opacity="0.75"/>' +
    // anilla de unión entre cuerpos
    '<rect x="312" y="150" width="7" height="33" rx="1.5" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    // eje de la mecánica y varillas
    '<line x1="150" y1="149" x2="548" y2="146.5" stroke="#b9bbc1" stroke-width="1.4"/>' +
    '<line x1="140" y1="150" x2="140" y2="127" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="165" y1="150" x2="165" y2="127" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="193" y1="150" x2="193" y2="126" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="216" y1="150" x2="216" y2="126" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="296" y1="150" x2="296" y2="126" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="320" y1="150" x2="320" y2="118" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="308" y1="150" x2="308" y2="102" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="438" y1="184" x2="438" y2="205" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="466" y1="184" x2="466" y2="209" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="444" y1="184" x2="444" y2="223" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="470" y1="184" x2="470" y2="227" stroke="#b9bbc1" stroke-width="1.3"/>' +
    // etiquetas
    '<text class="tm-ca-klab" x="44" y="76">Boquilla</text>' +
    '<text class="tm-ca-klab" x="86" y="134">Cuello curvado</text>' +
    '<text class="tm-ca-grp" x="152" y="88">Pulgar (detrás)</text>' +
    '<text class="tm-ca-klab2" x="139" y="100">registro · pulgar</text>' +
    '<text class="tm-ca-grp" x="216" y="102">Garganta</text>' +
    '<text class="tm-ca-klab" x="595" y="200">Campana metálica</text>' +
    '<text class="tm-ca-klab" x="215" y="205">1</text><text class="tm-ca-klab" x="250" y="205">2</text><text class="tm-ca-klab" x="285" y="205">3</text>' +
    '<text class="tm-ca-klab" x="345" y="206">4</text><text class="tm-ca-klab" x="380" y="206">5</text><text class="tm-ca-klab" x="415" y="206">6</text>' +
    '<text class="tm-ca-klab2" x="268" y="143">banana</text>' +
    '<text class="tm-ca-klab2" x="363" y="144">desliz.</text>' +
    '<text class="tm-ca-klab" x="308" y="84">Meñique izq.</text>' +
    '<text class="tm-ca-klab" x="454" y="252">Meñique dcho.</text>' +
    '<text class="tm-ca-grp" x="250" y="274">Mano izquierda</text>' +
    '<text class="tm-ca-grp" x="415" y="274">Mano derecha</text>';

  function keyShape(k) {
    var open = '<g class="tm-ca-key" data-k="' + k.id + '">', close = '</g>';
    if (k.sh === 'oct') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="5" ry="8"/>' + close;
    }
    if (k.sh === 'small') {
      return open + '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="' + (k.r || 7) + '"/>' + close;
    }
    if (k.sh === 'tear') {
      // gota (llave de La de garganta)
      return open + '<path class="k-pad" d="M' + k.x + ' ' + (k.y - 9) +
        ' C' + (k.x + 6) + ' ' + (k.y - 3) + ' ' + (k.x + 5) + ' ' + (k.y + 5) + ' ' + k.x + ' ' + (k.y + 8) +
        ' C' + (k.x - 5) + ' ' + (k.y + 5) + ' ' + (k.x - 6) + ' ' + (k.y - 3) + ' ' + k.x + ' ' + (k.y - 9) + ' Z"/>' + close;
    }
    if (k.sh === 'sliv') {
      // palanca fina inclinada sobre el tubo
      return open + '<rect class="k-pad" x="' + (k.x - 8) + '" y="' + (k.y - 3) + '" width="16" height="6" rx="3" transform="rotate(-12 ' + k.x + ' ' + k.y + ')"/>' + close;
    }
    if (k.sh === 'spat') {
      return open + '<rect class="k-pad" x="' + (k.x - 7.5) + '" y="' + (k.y - 4) + '" width="15" height="8" rx="4"/>' + close;
    }
    if (k.sh === 'loop') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="8" ry="6"/>' + close;
    }
    // hole: anillo Boehm (plato con anillo)
    return open +
      '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="9"/>' +
      '<circle class="k-ring" cx="' + k.x + '" cy="' + k.y + '" r="4"/>' + close;
  }

  function tmClarineteAltoEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var keysSvg = KEYS.map(keyShape).join('');
    // Vertical (como se toca): el grupo entero gira 90° y cada etiqueta se
    // contrarrota -90° sobre su propio ancla para seguir siendo legible.
    var DECOV = DECO
      .replace(/<text[^>]*>Mano izquierda<\/text>/, '')   // etiquetas de ancho que no aplican en vertical
      .replace(/<text[^>]*>Mano derecha<\/text>/, '')
      .replace(/<text class="([^"]+)" x="([\d.]+)" y="([\d.]+)">/g,
        '<text class="$1" x="$2" y="$3" transform="rotate(-90 $2 $3)">');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-ca-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-ca-wrap">' +
        '<div class="tm-ca-readout" id="' + uid + '_ro"><span class="tm-ca-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-ca-diagram"><svg class="tm-ca-svg" viewBox="0 0 300 ' + SVG_W + '" role="img" aria-label="Diagrama de digitación del clarinete alto: instrumento en vertical (como se toca), con la boquilla y el cuello curvado arriba y la campana metálica abajo; las llaves pulsadas se muestran en dorado">' +
          '<g transform="rotate(90) translate(0,-300)">' + DECOV + keysSvg + '</g>' +
        '</svg></div>' +
        '<div class="tm-ca-btns">' + btns + '</div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-ca-svg');
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
      wrap.querySelectorAll('.tm-ca-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      svg.querySelectorAll('.tm-ca-key').forEach(function (c) { c.classList.remove('on'); });
      var nombres = [];
      if (data) data.keys.forEach(function (id) {
        var c = svg.querySelector('.tm-ca-key[data-k="' + id + '"]'); if (c) c.classList.add('on');
        if (NAMES[id]) nombres.push(NAMES[id]);
      });
      ro.innerHTML =
        '<div class="tm-ca-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-ca-noterow"><span class="tm-ca-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-ca-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-ca-reg">' + intl(n) + ' · ' + registro(n) + ' · suena ' + suena(n) + ' (6ª mayor abajo)</div>' +
        '<div class="tm-ca-keysline">' + (nombres.length ? nombres.join(' · ') : 'al aire (nada pulsado)') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-ca-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-ca-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmClarineteAltoEngine = tmClarineteAltoEngine;
})();
