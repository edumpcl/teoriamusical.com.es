/* Diagrama de la CORNETA (de llave o palometa, Do/Re♭) — interactivo.
   A diferencia del resto del metal, la corneta NO tiene pistones que rellenen los huecos
   entre armónicos: solo puede dar los sonidos de la serie armónica de su tubo. La palometa
   (llave) desvía el aire: en posición de do suenan los armónicos de Do; girada (horizontal),
   el aire pasa por la bomba de arriba y suenan los de Re♭. Juntando ambas series salen las
   notas de fa menor / La♭ M / Do m / Mi♭ M — de ahí el color de las marchas de Semana Santa.
   Ámbito Sol₄–Fa₆ (armónicos 3.º al 10.º de cada serie). Se lee en clave de sol.
   Datos: Fernández Martínez, C. (2022), Revista InstrumentUM n.º 2, ISSN 2792-5560.
   Uso: <div id="x"></div><script>tmCornetaEngine('x');</script> */
(function () {
  'use strict';

  // Coordenadas sobre la FOTO (viewBox 651×649)
  var SVG_W = 651, SVG_H = 649;
  var PAL = { x: 341, y: 361, r: 34 };   // palometa (llave rotativa)
  var BOM = { x: 351, y: 300, rx: 44, ry: 37 };  // bomba que abre la palometa

  // Las dos series se ALTERNAN nota a nota (cada una a un semitono de la otra).
  var NOTES = [
    { n:'Sol4', lbl:'Sol₄',  s:'do',  h:3,  vf:'g/4'  },
    { n:'Lab4', lbl:'La♭₄',  s:'reb', h:3,  vf:'ab/4', acc:'b' },
    { n:'Do5',  lbl:'Do₅',   s:'do',  h:4,  vf:'c/5'  },
    { n:'Reb5', lbl:'Re♭₅',  s:'reb', h:4,  vf:'db/5', acc:'b' },
    { n:'Mi5',  lbl:'Mi₅',   s:'do',  h:5,  vf:'e/5'  },
    { n:'Fa5',  lbl:'Fa₅',   s:'reb', h:5,  vf:'f/5'  },
    { n:'Sol5', lbl:'Sol₅',  s:'do',  h:6,  vf:'g/5'  },
    { n:'Lab5', lbl:'La♭₅',  s:'reb', h:6,  vf:'ab/5', acc:'b' },
    { n:'Sib5', lbl:'Si♭₅',  s:'do',  h:7,  vf:'bb/5', acc:'b', calante:true },
    { n:'Dob6', lbl:'Do♭₆',  s:'reb', h:7,  vf:'cb/6', acc:'b', calante:true },
    { n:'Do6',  lbl:'Do₆',   s:'do',  h:8,  vf:'c/6'  },
    { n:'Reb6', lbl:'Re♭₆',  s:'reb', h:8,  vf:'db/6', acc:'b' },
    { n:'Re6',  lbl:'Re₆',   s:'do',  h:9,  vf:'d/6'  },
    { n:'Mib6', lbl:'Mi♭₆',  s:'reb', h:9,  vf:'eb/6', acc:'b' },
    { n:'Mi6',  lbl:'Mi₆',   s:'do',  h:10, vf:'e/6'  },
    { n:'Fa6',  lbl:'Fa₆',   s:'reb', h:10, vf:'f/6'  }
  ];
  var BY = {};
  NOTES.forEach(function (o) { BY[o.n] = o; });

  var ORD = ['3.º','4.º','5.º','6.º','7.º','8.º','9.º','10.º'];
  function ordinal(h) { return ORD[h - 3] || (h + '.º'); }

  var CSS = [
    '.tm-co-wrap{margin:18px 0;}',
    '.tm-co-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-co-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-co-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-co-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-co-serie{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-co-armline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-co-warn{font-size:.82rem;color:#a05a00;margin-top:4px;}',
    '.tm-co-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-co-staff svg{max-width:100%;height:auto;}',
    '.tm-co-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-co-photo{position:relative;max-width:330px;margin:0 auto;}',
    '.tm-co-img{display:block;width:100%;height:auto;border-radius:6px;}',
    '.tm-co-svg{position:absolute;inset:0;width:100%;height:100%;}',
    // palometa: siempre visible; la palanca ROTA (vertical = do, horizontal = girada)
    '.tm-co-pal .p-ring{fill:#fff;fill-opacity:.10;stroke:#ff9500;stroke-width:3;transition:all .2s;}',
    '.tm-co-pal.girada .p-ring{fill:#ff9500;fill-opacity:.35;stroke:#fff;stroke-width:5;filter:drop-shadow(0 0 9px #ff9500);}',
    '.tm-co-pal .p-lever{stroke:#ff9500;stroke-width:7;stroke-linecap:round;transform-box:view-box;transform-origin:341px 361px;transition:transform .28s ease;}',
    '.tm-co-pal.girada .p-lever{stroke:#fff;transform:rotate(90deg);}',
    '.tm-co-pal .p-tag{font-family:Arial,Helvetica,sans-serif;font-size:21px;font-weight:bold;fill:#ff9500;text-anchor:middle;transition:fill .2s;}',
    '.tm-co-pal.girada .p-tag{fill:#fff;}',
    '.tm-co-pal.girada .p-tagbg{fill:#ff9500;}',
    '.tm-co-pal .p-tagbg{fill:#3a2b00;fill-opacity:.72;transition:fill .2s;}',
    // bomba: solo se ilumina cuando el aire pasa por ella
    '.tm-co-bomba .b-ring{fill:#4da3ff;fill-opacity:0;stroke:#4da3ff;stroke-width:2.5;stroke-dasharray:7 5;transition:all .25s;}',
    '.tm-co-bomba.on .b-ring{fill-opacity:.42;stroke-width:5;stroke-dasharray:none;filter:drop-shadow(0 0 9px #4da3ff);}',
    '.tm-co-bomba .b-tag{font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:bold;fill:#4da3ff;fill-opacity:.55;text-anchor:middle;transition:all .25s;}',
    '.tm-co-bomba.on .b-tag{fill:#fff;fill-opacity:1;}',
    '.tm-co-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:6px;}',
    '.tm-co-credit a{color:inherit;}',
    '.tm-co-btns{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-top:14px;}',
    '.tm-co-btn{min-width:46px;padding:9px 11px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-co-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-co-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-co-btn.s-reb{border-style:dashed;}',
    '.tm-co-legend{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:10px;font-size:.8rem;color:#777;}',
    '.tm-co-legend b{font-weight:700;}',
    '.tm-co-sw{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:5px;vertical-align:-1px;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-co-css')) return;
    var s = document.createElement('style'); s.id = 'tm-co-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmCornetaEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var btns = NOTES.map(function (o) {
      return '<button class="tm-co-btn s-' + o.s + '" data-n="' + o.n + '">' + o.lbl + '</button>';
    }).join('');

    var svgInner =
      '<g class="tm-co-bomba" id="' + uid + '_bomba">' +
        '<ellipse class="b-ring" cx="' + BOM.x + '" cy="' + BOM.y + '" rx="' + BOM.rx + '" ry="' + BOM.ry + '"/>' +
        '<text class="b-tag" x="' + BOM.x + '" y="' + (BOM.y - BOM.ry - 9) + '">BOMBA</text>' +
      '</g>' +
      '<g class="tm-co-pal" id="' + uid + '_pal">' +
        '<circle class="p-ring" cx="' + PAL.x + '" cy="' + PAL.y + '" r="' + PAL.r + '"/>' +
        '<line class="p-lever" x1="' + PAL.x + '" y1="' + PAL.y + '" x2="' + PAL.x + '" y2="' + (PAL.y - PAL.r + 4) + '"/>' +
        '<rect class="p-tagbg" x="' + (PAL.x - 46) + '" y="' + (PAL.y + PAL.r + 6) + '" width="92" height="27" rx="6"/>' +
        '<text class="p-tag" x="' + PAL.x + '" y="' + (PAL.y + PAL.r + 25) + '">en do</text>' +
      '</g>';

    wrap.innerHTML =
      '<div class="tm-co-wrap">' +
        '<div class="tm-co-readout" id="' + uid + '_ro"><span class="tm-co-hint">Elige una nota y verás qué armónico es y dónde va la palometa</span></div>' +
        '<div class="tm-co-diagram">' +
          '<div class="tm-co-photo">' +
            '<picture><source type="image/webp" srcset="/assets/img/corneta/instrumento.webp">' +
            '<img class="tm-co-img" src="/assets/img/corneta/instrumento.jpg" width="651" height="649" loading="lazy" alt="Corneta española de llave o palometa, con la campana abajo a la derecha, el tudel arriba y la palometa con su bomba en el centro"></picture>' +
            '<svg class="tm-co-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Diagrama de la corneta sobre una fotografía real: la palometa gira entre la posición de do y la horizontal, y se ilumina la bomba cuando el aire pasa por ella">' +
              svgInner +
            '</svg>' +
          '</div>' +
          '<div class="tm-co-legend">' +
            '<span><span class="tm-co-sw" style="background:#ff9500"></span><b>Palometa</b>: vertical = do · girada = Re♭</span>' +
            '<span><span class="tm-co-sw" style="background:#4da3ff"></span><b>Bomba</b>: se ilumina si el aire pasa por ella</span>' +
          '</div>' +
          '<p class="tm-co-credit">Foto: 123yo123 vía <a href="https://commons.wikimedia.org/wiki/File:Corneta_DO-RE.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0</p>' +
        '</div>' +
        '<div class="tm-co-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var pal = document.getElementById(uid + '_pal');
    var bomba = document.getElementById(uid + '_bomba');

    function renderStaff(o) {
      var el = document.getElementById(uid + '_staff');
      if (!el || typeof Vex === 'undefined') return;
      el.innerHTML = '';
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(150, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 34, 132);
      stave.addClef('treble').setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [o.vf], duration: 'w', clef: 'treble' });
      if (o.acc) note.addModifier(new V.Accidental(o.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) {
        var vb = '0 0 150 150';
        try { var bb = s.getBBox(); if (bb && bb.height) { var p = 6; vb = (bb.x - p) + ' ' + (bb.y - p) + ' ' + (bb.width + 2 * p) + ' ' + (bb.height + 2 * p); } } catch (e) {}
        s.setAttribute('viewBox', vb);
        s.style.width = '130px'; s.style.maxWidth = '100%'; s.style.height = 'auto';
      }
    }

    function pick(n, btn) {
      var o = BY[n]; if (!o) return;
      wrap.querySelectorAll('.tm-co-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');

      var girada = (o.s === 'reb');
      pal.classList.toggle('girada', girada);
      bomba.classList.toggle('on', girada);
      var tag = pal.querySelector('.p-tag');
      if (tag) tag.textContent = girada ? 'girada' : 'en do';

      ro.innerHTML =
        '<div class="tm-co-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-co-noterow"><span class="tm-co-intl">' + o.lbl + '</span></div>' +
        '<div class="tm-co-serie">' + (girada
            ? 'Palometa <strong>girada</strong> · serie de Re♭'
            : 'Palometa <strong>en do</strong> · serie de Do') + '</div>' +
        '<div class="tm-co-armline">' + ordinal(o.h) + ' armónico' + (girada ? ' de Re♭' : ' de Do') + '</div>' +
        (o.calante ? '<div class="tm-co-warn">⚠ El 7.º armónico suena <strong>calante</strong> por física de la serie: apenas se usa.</div>' : '');
      renderStaff(o);
    }

    wrap.querySelectorAll('.tm-co-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmCornetaEngine = tmCornetaEngine;
})();
