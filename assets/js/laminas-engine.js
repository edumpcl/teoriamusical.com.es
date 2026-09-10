/* Instrumentos de láminas: qué nota suena de verdad y dónde cae en el teclado.
   El lío de esta familia no es localizar la nota —las láminas son el teclado del piano—
   sino que xilófono y lira NO suenan donde están escritos: el xilófono una octava más
   agudo y la lira dos. Aquí se elige la nota ESCRITA y el motor dice y toca la que SUENA.
   La foto real de cada instrumento se enchufa después con `foto` y `laminas`.
   Uso: <div id="x"></div><script>tmLaminas('x', {...});</script> */
(function () {
  'use strict';

  var ES = ['Do', 'Do♯', 'Re', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'Si♭', 'Si'];
  var SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  var NEGRA = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
  var LETRA = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];

  function octava(m) { return Math.floor(m / 12) - 1; }
  function nombre(m) {
    var o = octava(m);
    return ES[((m % 12) + 12) % 12] + (SUB[o] || o);
  }
  function fichero(m) { return LETRA[m % 12] + octava(m); }

  var CSS = [
    '.tm-lm-wrap{margin:18px 0;}',
    '.tm-lm-readout{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;text-align:center;}',
    '.tm-lm-par{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;}',
    '.tm-lm-caja{min-width:104px;}',
    '.tm-lm-et{display:block;font-size:.7rem;text-transform:uppercase;letter-spacing:.07em;color:#999;font-weight:700;}',
    '.tm-lm-nota{font-size:1.55rem;font-weight:800;color:#1a1a1a;line-height:1.15;}',
    '.tm-lm-nota.suena{color:#8b6914;}',
    '.tm-lm-flecha{font-size:1.1rem;color:#b9ac8c;}',
    '.tm-lm-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-lm-play:hover{background:#6b5010;}',
    '.tm-lm-pie{font-size:.9rem;color:#555;margin-top:6px;}',
    '.tm-lm-pie strong{color:#1a1a1a;}',
    /* teclado de láminas: la misma disposición que el piano, en dos filas */
    '.tm-lm-teclado{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:12px 10px 8px;}',
    '.tm-lm-svg{display:block;width:100%;height:auto;}',
    '.tm-lm-nat{fill:#efe9db;stroke:#d6cdb4;stroke-width:.6;}',
    '.tm-lm-alt{fill:#6d604a;stroke:#4e442f;stroke-width:.6;}',
    '.tm-lm-nat.on{fill:#ff9500;stroke:#c26f00;}',
    '.tm-lm-alt.on{fill:#ff9500;stroke:#c26f00;}',
    '.tm-lm-lim{font:600 3px sans-serif;fill:#8a7f66;}',
    '.tm-lm-cap{font-size:.78rem;color:#8a7f66;text-align:center;margin-top:6px;}',
    /* foto real: se activa cuando hay imagen y láminas marcadas */
    '.tm-lm-foto{position:relative;margin:0 0 12px;line-height:0;}',
    '.tm-lm-foto img{display:block;width:100%;height:auto;border-radius:8px;}',
    '.tm-lm-capa{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}',
    '.tm-lm-lam{fill:#ff9500;fill-opacity:0;stroke:#ff9500;stroke-width:0;vector-effect:non-scaling-stroke;transition:fill-opacity .18s;}',
    '.tm-lm-lam.on{fill-opacity:.45;stroke-width:2.5;filter:drop-shadow(0 0 8px rgba(255,149,0,.9));}',
    /* selector: octava + las doce notas */
    '.tm-lm-oct{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:14px;}',
    '.tm-lm-notas{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:8px;}',
    '.tm-lm-btn{min-width:44px;padding:8px 10px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.9rem;color:#1a1a1a;}',
    '.tm-lm-btn:hover:not(:disabled){background:#fdf8ee;border-color:#8b6914;}',
    '.tm-lm-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-lm-btn:disabled{opacity:.32;cursor:not-allowed;}',
    '.tm-lm-btn:focus-visible{outline:3px solid #8b6914;outline-offset:2px;}',
    '.tm-lm-oct .tm-lm-btn{min-width:52px;font-size:.85rem;}',
    /* las @media al final: no añaden especificidad */
    '@media(max-width:600px){.tm-lm-nota{font-size:1.3rem;}.tm-lm-caja{min-width:88px;}.tm-lm-btn{min-width:40px;padding:8px;font-size:.85rem;}}',
    '@media(prefers-reduced-motion:reduce){.tm-lm-lam{transition:none;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-lm-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-lm-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* Dibuja el compás entero como un teclado: naturales abajo, alteradas arriba y
     encajadas entre ellas, que es exactamente como están puestas las láminas. */
  function teclado(lo, hi) {
    var nats = [];
    for (var m = lo; m <= hi; m++) if (!NEGRA[m % 12]) nats.push(m);
    var W = 10, GAP = 1, ALT_W = 8;
    var Y_ALT = 0, H_ALT = 15, Y_NAT = 19, H_NAT = 17;   // dos filas separadas, no solapadas
    var ancho = nats.length * W;
    var pos = {};
    var svg = '';
    nats.forEach(function (m, i) {
      pos[m] = i * W;
      svg += '<rect class="tm-lm-nat" data-m="' + m + '" x="' + (i * W + GAP / 2) + '" y="' + Y_NAT + '" ' +
             'width="' + (W - GAP) + '" height="' + H_NAT + '" rx="1.2"></rect>';
    });
    for (var m2 = lo; m2 <= hi; m2++) {
      if (!NEGRA[m2 % 12]) continue;
      var izq = pos[m2 - 1];                       // la natural inmediatamente inferior
      if (izq == null) continue;
      svg += '<rect class="tm-lm-alt" data-m="' + m2 + '" x="' + (izq + W - ALT_W / 2) + '" y="' + Y_ALT + '" ' +
             'width="' + ALT_W + '" height="' + H_ALT + '" rx="1.2"></rect>';
    }
    return { svg: svg, ancho: ancho, alto: Y_NAT + H_NAT };
  }

  function tmLaminas(containerId, cfg) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;

    var lo = cfg.escrito[0], hi = cfg.escrito[1];
    var trans = cfg.trans || 0;
    var actual = cfg.inicial != null ? cfg.inicial : lo + Math.floor((hi - lo) / 2);
    var tec = teclado(lo, hi);

    /* La foto solo se pinta cuando existe imagen Y láminas marcadas sobre ella. */
    var hayFoto = !!(cfg.foto && cfg.laminas);
    var foto = '';
    if (hayFoto) {
      var formas = Object.keys(cfg.laminas).map(function (m) {
        var l = cfg.laminas[m];
        return '<polygon class="tm-lm-lam" data-m="' + m + '" points="' + l + '"></polygon>';
      }).join('');
      foto = '<figure class="tm-lm-foto">' +
               '<picture><source srcset="' + cfg.foto.base + '.webp" type="image/webp">' +
               '<img src="' + cfg.foto.base + '.jpg" width="' + cfg.foto.w + '" height="' + cfg.foto.h +
               '" alt="' + (cfg.alt || '') + '"></picture>' +
               '<svg class="tm-lm-capa" viewBox="0 0 ' + cfg.foto.w + ' ' + cfg.foto.h + '" ' +
               'preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' + formas + '</svg>' +
             '</figure>';
    }

    var octs = [];
    for (var o = octava(lo); o <= octava(hi); o++) octs.push(o);
    var octBtns = octs.map(function (o) {
      return '<button class="tm-lm-btn" type="button" data-oct="' + o + '">Octava ' + (SUB[o] || o) + '</button>';
    }).join('');
    var notaBtns = ES.map(function (n, i) {
      return '<button class="tm-lm-btn" type="button" data-pc="' + i + '">' + n + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-lm-wrap">' +
        '<div class="tm-lm-readout" id="' + containerId + '_ro"></div>' +
        foto +
        '<div class="tm-lm-teclado">' +
          '<svg class="tm-lm-svg" viewBox="0 0 ' + tec.ancho + ' ' + tec.alto + '" ' +
            'role="img" aria-label="Teclado de láminas del ' + (cfg.nombre || 'instrumento') + '">' +
            tec.svg + '</svg>' +
          '<div class="tm-lm-cap">De ' + nombre(lo) + ' a ' + nombre(hi) + ', ' +
            (trans ? 'tal como se <strong>escribe</strong>' : 'tal como suena') + '</div>' +
        '</div>' +
        '<div class="tm-lm-oct">' + octBtns + '</div>' +
        '<div class="tm-lm-notas">' + notaBtns + '</div>' +
      '</div>';

    var ro = document.getElementById(containerId + '_ro');
    var audio = new Audio();

    function suena(m) {
      try { audio.pause(); } catch (e) {}
      audio.src = cfg.audio + fichero(m + trans) + '.mp3';
      audio.currentTime = 0;
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () {});
    }

    function existe(m) { return m >= lo && m <= hi; }

    function pinta(mudo) {
      wrap.querySelectorAll('.tm-lm-nat, .tm-lm-alt, .tm-lm-lam').forEach(function (e) {
        e.classList.toggle('on', +e.dataset.m === actual);
      });
      wrap.querySelectorAll('[data-oct]').forEach(function (b) {
        b.classList.toggle('sel', +b.dataset.oct === octava(actual));
      });
      wrap.querySelectorAll('[data-pc]').forEach(function (b) {
        var pc = +b.dataset.pc;
        var m = octava(actual) * 12 + 12 + pc;
        b.disabled = !existe(m);
        b.classList.toggle('sel', m === actual);
      });

      var son = actual + trans;
      var salto = trans === 12 ? 'una octava más agudo' : (trans === 24 ? 'dos octavas más agudo' : null);
      ro.innerHTML =
        '<div class="tm-lm-par">' +
          '<div class="tm-lm-caja"><span class="tm-lm-et">Escrito</span>' +
            '<span class="tm-lm-nota">' + nombre(actual) + '</span></div>' +
          (trans ? '<span class="tm-lm-flecha">→</span>' +
            '<div class="tm-lm-caja"><span class="tm-lm-et">Suena</span>' +
              '<span class="tm-lm-nota suena">' + nombre(son) + '</span></div>' : '') +
          '<button class="tm-lm-play" type="button" aria-label="Escuchar la nota">▶</button>' +
        '</div>' +
        '<div class="tm-lm-pie">' +
          (salto ? 'En el pentagrama pone <strong>' + nombre(actual) + '</strong>, pero la lámina que golpeas suena <strong>' +
                   nombre(son) + '</strong>: ' + salto + '.'
                 : (cfg.igual ||
                    (cfg.art || 'El') + ' ' + (cfg.nombre || 'instrumento') +
                    ' <strong>suena donde está escrito</strong>: la lámina de {n} da un {n}.'
                   ).replace(/\{n\}/g, nombre(actual))) +
        '</div>';
      var pb = ro.querySelector('.tm-lm-play');
      if (pb) pb.addEventListener('click', function () { suena(actual); });
      if (!mudo) suena(actual);
    }

    function elige(m, mudo) {
      if (!existe(m)) return;
      actual = m;
      pinta(mudo);
    }

    wrap.querySelectorAll('[data-oct]').forEach(function (b) {
      b.addEventListener('click', function () {
        var o = +b.dataset.oct, pc = ((actual % 12) + 12) % 12;
        var m = o * 12 + 12 + pc;
        if (!existe(m)) {                       // esa nota no existe en la octava elegida
          m = o * 12 + 12;
          while (!existe(m) && m <= o * 12 + 23) m++;
        }
        elige(m);
      });
    });
    wrap.querySelectorAll('[data-pc]').forEach(function (b) {
      b.addEventListener('click', function () { elige(octava(actual) * 12 + 12 + (+b.dataset.pc)); });
    });
    wrap.querySelectorAll('.tm-lm-nat, .tm-lm-alt').forEach(function (r) {
      r.style.cursor = 'pointer';
      r.addEventListener('click', function () { elige(+r.dataset.m); });
    });

    pinta(true);          // la página no debe abrirse sonando sola
  }

  window.tmLaminas = tmLaminas;
})();
