/* Diagrama de digitaciones de la flauta travesera (sistema Boehm) — interactivo.
   FOTOGRAFIA real (Yamaha YFL-372) con una capa SVG que ilumina la llave que se pulsa.
   Los datos de digitación no cambian respecto al dibujo anterior.
   Uso: <div id="x"></div><script>tmFlautaEngine('x');</script> */
(function () {
  'use strict';

  /* Coordenadas sobre la FOTO (viewBox 3200x230 = pixeles de digitacion.jpg).
     Cabeza a la IZQUIERDA y pie a la DERECHA, que es como Yamaha publica sus fotos y
     como se dibujan las cartas de digitacion. Calibradas a mano sobre la imagen.

     Como identificarlas si hay que recalibrar:
       - Los SEIS platos de dedo (LI LM LA / RI RM RA) tienen AGUJERO en el centro.
       - Los DOS trinos van entre las dos manos y son platos CERRADOS, sin agujero.
       - Las piezas puntiagudas que cuelgan entre plato y plato son BRAZOS del
         mecanismo, no llaves: es el error facil de cometer.
       - Sol# es la unica palanca curva del grupo izquierdo, por encima del tubo.
     Las DOS del pulgar (T y Tb) NO salen: van en la cara oculta del tubo. Se dibujan
     aparte en buildPulgar(), igual que la llave de octava del saxofon.
     El tercer numero de cada llave es el radio del marcador, ajustado a su tamano real. */
  var FOTO = {
    img: 'digitacion', w: 3200, h: 230, margen: 14,
    k: {
      LI:  [1702, 113, 38], LM: [1806, 115, 38], LA: [1915,  86, 38],
      LG:  [1915,  16, 24],
      Tr1: [2022,  88, 34], Tr2:[2135, 100, 34],
      RI:  [2265, 110, 38], RM: [2392, 109, 38], RA: [2531, 111, 38],
      REb: [2685, 177, 30],
      RCs: [2827, 187, 36], RC: [2995, 187, 36]
    }
  };
  /* Ventanas del viewBox. En escritorio, una sola tira con la flauta entera. En movil
     esa tira mide 26 px de alto y no se ve nada, asi que se parte en dos filas con solo
     la mecanica (la cabeza no tiene ni una llave). Misma foto y mismas coordenadas. */
  function ventana(x, ancho) {
    return x + ' ' + (-FOTO.margen) + ' ' + ancho + ' ' + (FOTO.h + 2 * FOTO.margen);
  }

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
    '.tm-fl-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-fl-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-fl-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:10px 8px;}',
    '.tm-fl-svg{display:block;width:100%;height:auto;}',
    '.tm-fl-filas{display:none;}',
    '.tm-fl-filas .tm-fl-svg + .tm-fl-svg{margin-top:8px;}',
    // marcador: invisible en reposo, naranja intenso al pulsar. Va mas marcado que en el
    // saxofon porque la flauta es plateada y sus llaves no contrastan con el tubo.
    '.tm-fl-key .k-dot{fill:#ff7a00;fill-opacity:0;stroke:rgba(255,255,255,0);stroke-width:0;transition:all .16s;}',
    '.tm-fl-key.on .k-dot{fill:#ff7a00;fill-opacity:.95;stroke:#fff;stroke-width:11;filter:drop-shadow(0 0 26px #ff6a00);}',
    // panel del pulgar (dibujado): tubo apagado para que el naranja destaque
    '.tm-fl-pulgar{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:10px;flex-wrap:wrap;}',
    '.tm-fl-pulgarsvg{width:min(60vw,240px);height:auto;}',
    '.tm-fl-pulgarcap{font-size:.8rem;color:#777;max-width:280px;margin:0;line-height:1.35;}',
    '.tm-fl-pulgarcap strong{color:#555;}',
    '.tm-fl-th-pad{fill:url(#tmFlMet);stroke:#7f828a;stroke-width:1.5;transition:fill .15s,stroke .15s;}',
    '.tm-fl-key.on .tm-fl-th-pad{fill:url(#tmFlMetOn);stroke:#fff;stroke-width:2.4;filter:drop-shadow(0 0 6px #ff9500);}',
    '.tm-fl-thlab{font-family:Arial,Helvetica,sans-serif;font-size:13px;fill:#555;text-anchor:middle;}',
    '.tm-fl-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:8px;}',
    '.tm-fl-credit a{color:inherit;}',
    '.tm-fl-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-fl-btn{min-width:48px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-fl-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-fl-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fl-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-fl-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-fl-play:hover{background:#6b5010;}',
    '.tm-fl-staff{display:flex;justify-content:center;align-items:center;min-height:130px;}',
    '.tm-fl-staff svg{max-width:100%;height:auto;}',
    '.tm-fl-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    /* Movil: la tira entera se queda en 26 px de alto y no se distingue una llave de
       otra, asi que se cambia por dos filas con la mecanica ampliada. VA AL FINAL: los
       media queries no suman especificidad y una regla base posterior les ganaria. */
    '@media(max-width:600px){.tm-fl-tira{display:none;}.tm-fl-filas{display:block;}}'
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

    // Los 12 marcadores sobre la foto. Se repiten en cada ventana (tira y filas):
    // pick() enciende todas las copias a la vez con querySelectorAll.
    function marcadores() {
      var s = '';
      for (var id in FOTO.k) {
        var c = FOTO.k[id];
        s += '<g class="tm-fl-key" data-k="' + id + '">' +
             '<circle class="k-dot" cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '"/></g>';
      }
      return s;
    }
    function vista(x, ancho, etiqueta) {
      return '<svg class="tm-fl-svg" viewBox="' + ventana(x, ancho) + '" role="img" aria-label="' + etiqueta + '">' +
        '<image href="/assets/img/flauta/' + FOTO.img + '.jpg" x="0" y="0" width="' + FOTO.w + '" height="' + FOTO.h + '"/>' +
        marcadores() + '</svg>';
    }

    // Las dos llaves del PULGAR van en la cara oculta del tubo y no salen en la foto:
    // se dibujan aparte y se iluminan igual (data-k="T" y "Tb").
    function buildPulgar() {
      return '<svg class="tm-fl-pulgarsvg" viewBox="0 0 260 118" role="img" aria-label="Cara oculta de la flauta: las dos llaves del pulgar izquierdo se iluminan cuando hay que pulsarlas">' +
        '<defs>' +
          '<linearGradient id="tmFlMet" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="#f2f3f6"/><stop offset=".5" stop-color="#c9ccd3"/><stop offset="1" stop-color="#9fa3ab"/>' +
          '</linearGradient>' +
          '<linearGradient id="tmFlMetOn" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="#ffd08a"/><stop offset=".5" stop-color="#ffb347"/><stop offset="1" stop-color="#e08800"/>' +
          '</linearGradient>' +
          '<linearGradient id="tmFlTubo" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="#9a9da4"/><stop offset=".45" stop-color="#babdc4"/><stop offset="1" stop-color="#82858c"/>' +
          '</linearGradient>' +
        '</defs>' +
        // trozo de tubo visto por detras (apagado: si va tan claro como la foto, el
        // marcador naranja no destaca)
        '<rect x="8" y="34" width="244" height="34" rx="17" fill="url(#tmFlTubo)" stroke="#6f7278" stroke-width="1.2"/>' +
        // llave del pulgar Si (la grande, donde descansa el dedo)
        '<g class="tm-fl-key" data-k="T">' +
          '<rect class="tm-fl-th-pad" x="78" y="38" width="62" height="26" rx="12"/>' +
        '</g>' +
        // llave del pulgar Si bemol (la pequena, al lado)
        '<g class="tm-fl-key" data-k="Tb">' +
          '<rect class="tm-fl-th-pad" x="150" y="41" width="38" height="20" rx="10"/>' +
        '</g>' +
        '<text class="tm-fl-thlab" x="109" y="88">Si</text>' +
        '<text class="tm-fl-thlab" x="169" y="88">Si♭</text>' +
        '<text class="tm-fl-thlab" x="130" y="110" style="font-size:11px;fill:#888">pulgar izquierdo</text>' +
        '</svg>';
    }

    var btns = ORDEN.map(function (n) {
      var hasData = !!FING[n];
      return '<button class="tm-fl-btn' + (hasData ? '' : ' todo') + '" data-n="' + n + '">' + LABELS[n] + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-fl-wrap">' +
        '<div class="tm-fl-readout" id="' + uid + '_ro"><span class="tm-fl-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-fl-diagram">' +
          '<div class="tm-fl-tira">' +
            vista(0, FOTO.w, 'Digitación de la flauta sobre una fotografía real: cabeza a la izquierda, pie a la derecha') +
          '</div>' +
          '<div class="tm-fl-filas">' +
            vista(1250, 975, 'Mitad izquierda del mecanismo, ampliada') +
            vista(2225, 975, 'Mitad derecha del mecanismo y el pie, ampliada') +
          '</div>' +
          '<div class="tm-fl-pulgar">' +
            buildPulgar() +
            '<p class="tm-fl-pulgarcap"><strong>Por detrás.</strong> Las dos llaves del <strong>pulgar izquierdo</strong> van en la cara oculta del tubo, así que no salen en la foto y se dibujan aparte.</p>' +
          '</div>' +
          '<p class="tm-fl-credit">Foto: flauta Yamaha YFL-372, Yamaha Corporation vía <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Flute_YFL-372.tif" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0. Llaves del pulgar: diagrama propio.</p>' +
        '</div>' +
        '<div class="tm-fl-btns" id="' + uid + '_btns">' + btns + '</div>' +
      '</div>';

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
      wrap.querySelectorAll('.tm-fl-key').forEach(function (c) { c.classList.remove('on'); });
      if (data) {
        data.keys.forEach(function (id) {
          wrap.querySelectorAll('.tm-fl-key[data-k="' + id + '"]').forEach(function (c) { c.classList.add('on'); });
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
