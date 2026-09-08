/* Diagrama de digitaciones del flautín / piccolo (sistema Boehm) — interactivo.
   FOTOGRAFIA real (Yamaha YPC-81, granadillo y plata) con una capa SVG que ilumina la
   llave que se pulsa. El flautín no tiene pie, así que no lleva las llaves de Do/Do♯
   de la flauta: son 12 controles en vez de 14.
   Uso: <div id="x"></div><script>tmFlautinEngine('x');</script>
   Digitaciones = las de la flauta travesera (mismo sistema Boehm, misma carta ya
   verificada en digitaciones-flauta-engine.js) para las notas escritas Re4–Do7;
   las dos notas del pie (Do4 y Do♯4) no existen en el flautín.
   El flautín TRANSPone a la octava: suena una octava POR ENCIMA de lo escrito;
   el marcador muestra ambas alturas y el audio reproduce la altura real
   (muestras de Sonatina Symphonic Orchestra). */
(function () {
  'use strict';

  /* Coordenadas sobre la FOTO (viewBox 1595x232 = pixeles de digitacion.jpg).
     Cabeza a la IZQUIERDA y pie a la DERECHA. Las senalo Eduardo sobre la imagen.

     El flautin es de PLATOS CERRADOS: todos los platillos son discos identicos, sin el
     agujero que en la flauta delata cual se pulsa. No se puede calibrar "a ojo" ni por
     analisis de imagen; hicieron falta seis intentos fallidos antes de aceptarlo.
     Lo que SI cierra el reparto: entre LA y RI tiene que haber exactamente DOS platos,
     que son los dos trinos. Medidos por perfil de brillo en 1115 y 1170, encajan.
     OJO: un flautin NO es una flauta a escala. Sus manos van mas juntas, asi que el
     hueco de los trinos es proporcionalmente mucho mas estrecho que en la flauta
     (0,9 veces la separacion LI-LM, frente a 3,4 alli). Trasladar las proporciones de
     la flauta da un reparto equivocado: ese fue el error que costo la tarde.

     Las DOS del pulgar (T y Tb) no salen: van en la cara oculta. Se dibujan aparte. */
  var FOTO = {
    img: 'digitacion', w: 1595, h: 232, margen: 16,
    k: {
      LI:  [ 824, 133, 30], LM: [ 968, 130, 30], LA: [1079, 112, 30],
      LG:  [1096,  30, 22],
      Tr1: [1115, 126, 24], Tr2:[1170, 126, 24],
      RI:  [1209, 130, 30], RM: [1312, 134, 30], RA: [1384, 141, 30],
      REb: [1519, 160, 30]
    }
  };
  // La tira usa el alto completo; las filas de movil recortan por arriba y por abajo,
  // que en el flautin es casi todo tubo vacio y las dejaba en 200 px cada una.
  function ventana(x, ancho, y, alto) {
    if (y == null) { y = -FOTO.margen; alto = FOTO.h + 2 * FOTO.margen; }
    return x + ' ' + y + ' ' + ancho + ' ' + alto;
  }

  var NAMES = {
    T: 'pulgar (Si)', Tb: 'pulgar (Si♭)', LI: 'índice izq.', LM: 'medio izq.', LA: 'anular izq.',
    LG: 'Sol♯ (meñique izq.)', RI: 'índice dcho.', RM: 'medio dcho.', RA: 'anular dcho.',
    Tr1: 'trino 1', Tr2: 'trino 2', REb: 'Mi♭ (meñique dcho.)'
  };

  // Digitaciones de la flauta (Boehm) sin las notas del pie: escritas Re4–Do7.
  var FING = {
    'Re4':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RM', 'RA', 'REb'] },
    'Re#4': { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RA', 'REb'] },
    'Mi4':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RM', 'REb'] },
    'Fa4':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'REb'] },
    'Fa#4': { keys: ['T', 'LI', 'LM', 'LA', 'RA', 'REb'] },
    'Sol4': { keys: ['T', 'LI', 'LM', 'LA', 'REb'] },
    'Sol#4':{ keys: ['T', 'LI', 'LM', 'LA', 'LG', 'REb'] },
    'La4':  { keys: ['T', 'LI', 'LM', 'REb'] },
    'La#4': { keys: ['T', 'LI', 'RI', 'REb'] },
    'Si4':  { keys: ['T', 'LI', 'REb'] },
    'Do5':  { keys: ['LI', 'REb'] },
    'Do#5': { keys: ['REb'] },
    'Re5':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RM', 'RA', 'REb'] },
    'Re#5': { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RA', 'REb'] },
    'Mi5':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RM', 'REb'] },
    'Fa5':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'REb'] },
    'Fa#5': { keys: ['T', 'LI', 'LM', 'LA', 'RA', 'REb'] },
    'Sol5': { keys: ['T', 'LI', 'LM', 'LA', 'REb'] },
    'Sol#5':{ keys: ['T', 'LI', 'LM', 'LA', 'LG', 'REb'] },
    'La5':  { keys: ['T', 'LI', 'LM', 'REb'] },
    'La#5': { keys: ['T', 'LI', 'RI', 'REb'] },
    'Si5':  { keys: ['T', 'LI', 'REb'] },
    'Do6':  { keys: ['LI', 'REb'] },
    'Do#6': { keys: ['REb'] },
    'Re6':  { keys: ['Tb', 'LM', 'LA', 'REb'] },
    'Re#6': { keys: ['Tb', 'LI', 'LM', 'LA', 'LG', 'RI', 'RM', 'RA', 'REb'] },
    'Mi6':  { keys: ['Tb', 'LI', 'LM', 'RI', 'RM', 'REb'] },
    'Fa6':  { keys: ['Tb', 'LI', 'LA', 'RI', 'REb'] },
    'Fa#6': { keys: ['Tb', 'LI', 'LA', 'RA', 'REb'] },
    'Sol6': { keys: ['LI', 'LM', 'LA', 'REb'] },
    'Sol#6':{ keys: ['LM', 'LA', 'LG', 'REb'] },
    'La6':  { keys: ['Tb', 'LM', 'RI', 'REb'] },
    'La#6': { keys: ['Tb', 'LI', 'Tr1', 'REb'] },
    'Si6':  { keys: ['Tb', 'LI', 'LA', 'Tr2'] },
    'Do7':  { keys: ['LI', 'LM', 'LA', 'LG', 'RI'] }
  };
  var ORDEN = [
    'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5', 'Mi5', 'Fa5', 'Fa#5', 'Sol5', 'Sol#5', 'La5', 'La#5', 'Si5',
    'Do6', 'Do#6', 'Re6', 'Re#6', 'Mi6', 'Fa6', 'Fa#6', 'Sol6', 'Sol#6', 'La6', 'La#6', 'Si6', 'Do7'
  ];
  var SUB = { '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈' };
  var FLAT = {
    'Re#4': 'Mi♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄', 'Do#5': 'Re♭₅', 'Re#5': 'Mi♭₅',
    'Sol#5': 'La♭₅', 'La#5': 'Si♭₅', 'Do#6': 'Re♭₆', 'Re#6': 'Mi♭₆', 'Sol#6': 'La♭₆', 'La#6': 'Si♭₆'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  function registro(n) {
    var o = parseInt(n.replace(/\D/g, ''), 10);
    if (o <= 4) return 'Registro grave';
    if (o === 5) return 'Registro medio';
    if (o === 6) return 'Registro agudo';
    return 'Registro agudo';
  }
  // El flautín suena una octava POR ENCIMA de lo escrito
  function suena(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return '';
    return m[1] + (m[2] ? '♯' : '') + SUB[String(parseInt(m[3], 10) + 1)];
  }

  var AUDIO_BASE = '/assets/audio/flautin/';
  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  function audioFile(n) {
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
    '.tm-fn-wrap{margin:18px 0;}',
    '.tm-fn-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-fn-note{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-fn-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-fn-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-fn-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-fn-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:10px 8px;}',
    '.tm-fn-svg{display:block;width:100%;height:auto;}',
    '.tm-fn-filas{display:none;}',
    '.tm-fn-filas .tm-fn-svg + .tm-fn-svg{margin-top:8px;}',
    // marcador: invisible en reposo, naranja intenso al pulsar. Va mas marcado que en el
    // saxofon: aqui el instrumento es pequeno y sale a poca altura en pantalla.
    '.tm-fn-key .k-dot{fill:#ff7a00;fill-opacity:0;stroke:rgba(255,255,255,0);stroke-width:0;transition:all .16s;}',
    '.tm-fn-key.on .k-dot{fill:#ff7a00;fill-opacity:.95;stroke:#fff;stroke-width:11;filter:drop-shadow(0 0 26px #ff6a00);}',
    // panel del pulgar (dibujado): tubo apagado para que el naranja destaque
    '.tm-fn-pulgar{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:10px;flex-wrap:wrap;}',
    '.tm-fn-pulgarsvg{width:min(60vw,240px);height:auto;}',
    '.tm-fn-pulgarcap{font-size:.8rem;color:#777;max-width:280px;margin:0;line-height:1.35;}',
    '.tm-fn-pulgarcap strong{color:#555;}',
    '.tm-fn-th-pad{fill:url(#tmFnMet);stroke:#7f828a;stroke-width:1.5;transition:fill .15s,stroke .15s;}',
    '.tm-fn-key.on .tm-fn-th-pad{fill:url(#tmFnMetOn);stroke:#fff;stroke-width:2.4;filter:drop-shadow(0 0 6px #ff9500);}',
    '.tm-fn-thlab{font-family:Arial,Helvetica,sans-serif;font-size:13px;fill:#555;text-anchor:middle;}',
    '.tm-fn-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:8px;}',
    '.tm-fn-credit a{color:inherit;}',
    '.tm-fn-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-fn-btn{min-width:48px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-fn-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-fn-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fn-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-fn-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-fn-play:hover{background:#6b5010;}',
    '.tm-fn-staff{display:flex;justify-content:center;align-items:center;min-height:130px;}',
    '.tm-fn-staff svg{max-width:100%;height:auto;}',
    '.tm-fn-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    /* Movil: la tira entera se queda en 26 px de alto y no se distingue una llave de
       otra, asi que se cambia por dos filas con la mecanica ampliada. VA AL FINAL: los
       media queries no suman especificidad y una regla base posterior les ganaria. */
    '@media(max-width:600px){.tm-fn-tira{display:none;}.tm-fn-filas{display:block;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-fn-css')) return;
    var s = document.createElement('style'); s.id = 'tm-fn-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmFlautinEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    // Los 10 marcadores sobre la foto. Se repiten en cada ventana (tira y filas):
    // pick() enciende todas las copias a la vez con querySelectorAll.
    function marcadores() {
      var s = '';
      for (var id in FOTO.k) {
        var c = FOTO.k[id];
        s += '<g class="tm-fn-key" data-k="' + id + '">' +
             '<circle class="k-dot" cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '"/></g>';
      }
      return s;
    }
    function vista(x, ancho, etiqueta, y, alto) {
      return '<svg class="tm-fn-svg" viewBox="' + ventana(x, ancho, y, alto) + '" role="img" aria-label="' + etiqueta + '">' +
        '<image href="/assets/img/flautin/' + FOTO.img + '.jpg" x="0" y="0" width="' + FOTO.w + '" height="' + FOTO.h + '"/>' +
        marcadores() + '</svg>';
    }

    // Las dos llaves del PULGAR van en la cara oculta del tubo y no salen en la foto:
    // se dibujan aparte y se iluminan igual (data-k="T" y "Tb").
    function buildPulgar() {
      return '<svg class="tm-fn-pulgarsvg" viewBox="0 0 260 118" role="img" aria-label="Cara oculta del flautín: las dos llaves del pulgar izquierdo se iluminan cuando hay que pulsarlas">' +
        '<defs>' +
          '<linearGradient id="tmFnMet" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="#f2f3f6"/><stop offset=".5" stop-color="#c9ccd3"/><stop offset="1" stop-color="#9fa3ab"/>' +
          '</linearGradient>' +
          '<linearGradient id="tmFnMetOn" x1="0" y1="0" x2="0" y2="1">' +
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
        '<g class="tm-fn-key" data-k="T">' +
          '<rect class="tm-fn-th-pad" x="78" y="38" width="62" height="26" rx="12"/>' +
        '</g>' +
        // llave del pulgar Si bemol (la pequena, al lado)
        '<g class="tm-fn-key" data-k="Tb">' +
          '<rect class="tm-fn-th-pad" x="150" y="41" width="38" height="20" rx="10"/>' +
        '</g>' +
        '<text class="tm-fn-thlab" x="109" y="88">Si</text>' +
        '<text class="tm-fn-thlab" x="169" y="88">Si♭</text>' +
        '<text class="tm-fn-thlab" x="130" y="110" style="font-size:11px;fill:#888">pulgar izquierdo</text>' +
        '</svg>';
    }

    var btns = ORDEN.map(function (n) {
      return '<button class="tm-fn-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-fn-wrap">' +
        '<div class="tm-fn-readout" id="' + uid + '_ro"><span class="tm-fn-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-fn-diagram">' +
          '<div class="tm-fn-tira">' +
            vista(0, FOTO.w, 'Digitación del flautín sobre una fotografía real: cabeza a la izquierda, pie a la derecha') +
          '</div>' +
          '<div class="tm-fn-filas">' +
            vista(760, 420, 'Mitad izquierda del mecanismo, ampliada', 4, 198) +
            vista(1180, 415, 'Mitad derecha del mecanismo, ampliada', 4, 198) +
          '</div>' +
          '<div class="tm-fn-pulgar">' +
            buildPulgar() +
            '<p class="tm-fn-pulgarcap"><strong>Por detrás.</strong> Las dos llaves del <strong>pulgar izquierdo</strong> van en la cara oculta del tubo, así que no salen en la foto y se dibujan aparte.</p>' +
          '</div>' +
          '<p class="tm-fn-credit">Foto: flautín Yamaha YPC-81, Yamaha Corporation vía <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Piccolo_YPC-81.png" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0. Llaves del pulgar: diagrama propio.</p>' +
        '</div>' +
        '<div class="tm-fn-btns" id="' + uid + '_btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

    function play(n) {
      var f = audioFile(n);
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
      if (s) {
        var vb = '0 0 150 150';
        try { var bb = s.getBBox(); if (bb && bb.height) { var p = 6; vb = (bb.x - p) + ' ' + (bb.y - p) + ' ' + (bb.width + 2 * p) + ' ' + (bb.height + 2 * p); } } catch (e) {}
        s.setAttribute('viewBox', vb);
        s.style.width = '140px'; s.style.maxWidth = '100%'; s.style.height = 'auto';
      }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-fn-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      wrap.querySelectorAll('.tm-fn-key').forEach(function (c) { c.classList.remove('on'); });
      var nombres = [];
      if (data) data.keys.forEach(function (id) {
        wrap.querySelectorAll('.tm-fn-key[data-k="' + id + '"]').forEach(function (c) { c.classList.add('on'); });
        if (NAMES[id]) nombres.push(NAMES[id]);
      });
      ro.innerHTML =
        '<div class="tm-fn-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-fn-noterow"><span class="tm-fn-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-fn-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-fn-reg">' + intl(n) + ' · ' + registro(n) + ' · suena ' + suena(n) + ' (octava aguda)</div>' +
        '<div class="tm-fn-keysline">' + (nombres.length ? nombres.join(' · ') : '—') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-fn-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-fn-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmFlautinEngine = tmFlautinEngine;
})();
