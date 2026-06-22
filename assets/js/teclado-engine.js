/* Teclado de piano interactivo. Al pulsar (o pasar por) una tecla muestra su nota y octava.
   No depende de nada externo. Uso:
     <div id="x"></div><script>tmTecladoEngine('x',{startOct:3,octaves:2});</script>  */
(function () {
  'use strict';

  var ES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var EN = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  var BLACK_AFTER = [0, 1, 3, 4, 5];            /* hay negra tras las blancas 0,1,3,4,5 */
  var BLACK_ES = ['Do♯/Re♭', 'Re♯/Mi♭', 'Fa♯/Sol♭', 'Sol♯/La♭', 'La♯/Si♭'];
  var BLACK_EN = ['C♯/D♭', 'D♯/E♭', 'F♯/G♭', 'G♯/A♭', 'A♯/B♭'];
  var SUB = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };

  function sub(o) { return ('' + o).replace(/\d/g, function (d) { return SUB[d]; }); }

  var WW = 40, KH = 168, BW = 24, BH = 104;

  var CSS = [
    '.tm-kbd-wrap{margin:18px 0;}',
    '.tm-kbd-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:58px;display:flex;flex-direction:column;justify-content:center;}',
    '.tm-kbd-note{font-size:1.6rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-kbd-sub{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-kbd-hint{font-size:1.05rem;color:#999;font-weight:600;}',
    '.tm-kbd-svgwrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}',
    '.tm-kbd-svg{display:block;width:100%;min-width:460px;height:auto;user-select:none;touch-action:manipulation;}',
    '.tm-wkey{fill:#fff;stroke:#333;stroke-width:1.2;cursor:pointer;}',
    '.tm-wkey:hover{fill:#f3eede;}',
    '.tm-wkey.tm-active{fill:#f0e0b8;}',
    '.tm-bkey{fill:#1a1a1a;stroke:#000;stroke-width:1;cursor:pointer;}',
    '.tm-bkey:hover{fill:#4a3a1a;}',
    '.tm-bkey.tm-active{fill:#8b6914;}',
    '.tm-klabel{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#1a1a1a;text-anchor:middle;pointer-events:none;opacity:0;}',
    '.tm-koct{font-family:Arial,Helvetica,sans-serif;font-size:10px;fill:#8b6914;text-anchor:middle;pointer-events:none;font-weight:bold;}',
    '.tm-kbd-svg.tm-show-names .tm-klabel{opacity:1;}',
    '.tm-kbd-mid{font-family:Arial,Helvetica,sans-serif;font-size:7.5px;fill:#8b6914;text-anchor:middle;pointer-events:none;font-weight:bold;}',
    '.tm-kbd-btn{display:inline-block;margin-top:12px;padding:10px 16px;background:#8b6914;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.92rem;}',
    '.tm-kbd-btn:hover{background:#6b5010;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-kbd-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-kbd-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmTecladoEngine(containerId, config) {
    injectCSS();
    config = config || {};
    var startOct = config.startOct != null ? config.startOct : 3;
    var octaves = config.octaves != null ? config.octaves : 2;
    var midName = 'Do', midOct = 4;             /* Do central a resaltar */
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var totalWhites = octaves * 7 + 1;
    var whites = [], blacks = [];
    for (var k = 0; k < totalWhites; k++) {
      var oct = startOct + Math.floor(k / 7);
      var wi = k % 7;
      whites.push({ es: ES[wi], en: EN[wi], oct: oct, wi: wi, col: k });
      if (BLACK_AFTER.indexOf(wi) >= 0 && k < totalWhites - 1) {
        var bi = BLACK_AFTER.indexOf(wi);
        blacks.push({ es: BLACK_ES[bi], en: BLACK_EN[bi], oct: oct, left: k });
      }
    }

    var W = totalWhites * WW;
    var svg = '<svg class="tm-kbd-svg" viewBox="0 0 ' + W + ' ' + (KH + 6) + '" role="img" aria-label="Teclado de piano interactivo">';
    /* teclas blancas */
    whites.forEach(function (w) {
      var x = w.col * WW;
      var isMid = (w.es === midName && w.oct === midOct);
      svg += '<rect class="tm-wkey" data-es="' + w.es + '" data-en="' + w.en + '" data-oct="' + w.oct + '" data-black="0" x="' + x + '" y="0" width="' + (WW - 1) + '" height="' + KH + '" rx="3"></rect>';
      svg += '<text class="tm-klabel" x="' + (x + WW / 2) + '" y="' + (KH - 10) + '">' + w.es + '</text>';
      if (w.wi === 0) svg += '<text class="tm-koct" x="' + (x + WW / 2) + '" y="' + (KH - 26) + '">' + w.oct + '</text>';
      if (isMid) svg += '<text class="tm-kbd-mid" x="' + (x + WW / 2) + '" y="' + (BH + 22) + '">Do central</text>';
    });
    /* teclas negras (encima) */
    blacks.forEach(function (b) {
      var x = (b.left + 1) * WW - BW / 2;
      svg += '<rect class="tm-bkey" data-es="' + b.es + '" data-en="' + b.en + '" data-oct="' + b.oct + '" data-black="1" x="' + x + '" y="0" width="' + BW + '" height="' + BH + '" rx="2"></rect>';
    });
    svg += '</svg>';

    wrap.innerHTML =
      '<div class="tm-kbd-wrap">' +
        '<div class="tm-kbd-readout" id="' + uid + '_ro"><span class="tm-kbd-hint">Pulsa una tecla para ver su nota</span></div>' +
        '<div class="tm-kbd-svgwrap">' + svg + '</div>' +
        '<div style="text-align:center"><button class="tm-kbd-btn" id="' + uid + '_toggle" type="button">Mostrar los nombres</button></div>' +
      '</div>';

    var svgEl = wrap.querySelector('.tm-kbd-svg');
    var ro = document.getElementById(uid + '_ro');

    function show(rect) {
      svgEl.querySelectorAll('.tm-active').forEach(function (r) { r.classList.remove('tm-active'); });
      rect.classList.add('tm-active');
      var es = rect.getAttribute('data-es'), en = rect.getAttribute('data-en'), oct = rect.getAttribute('data-oct');
      var isBlack = rect.getAttribute('data-black') === '1';
      var noteTxt = isBlack ? (es.replace('/', sub(oct) + ' / ') + sub(oct)) : (es + sub(oct));
      ro.innerHTML = '<span class="tm-kbd-note">' + noteTxt + '</span>' +
        '<span class="tm-kbd-sub">' + (isBlack ? 'En inglés: ' + en : 'En inglés: ' + en + sub(oct)) + '</span>';
    }

    svgEl.querySelectorAll('.tm-wkey,.tm-bkey').forEach(function (rect) {
      rect.addEventListener('click', function () { show(rect); });
      rect.addEventListener('mouseenter', function () {
        if (svgEl.querySelector('.tm-active')) return; /* no pisar la selección */
        var es = rect.getAttribute('data-es'), oct = rect.getAttribute('data-oct');
        var isBlack = rect.getAttribute('data-black') === '1';
        ro.innerHTML = '<span class="tm-kbd-note">' + (isBlack ? es : es + sub(oct)) + '</span>';
      });
    });

    var btn = document.getElementById(uid + '_toggle');
    btn.addEventListener('click', function () {
      var on = svgEl.classList.toggle('tm-show-names');
      btn.textContent = on ? 'Ocultar los nombres' : 'Mostrar los nombres';
    });
  }

  window.tmTecladoEngine = tmTecladoEngine;
})();
