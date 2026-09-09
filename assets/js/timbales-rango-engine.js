/* ¿En qué timbal va esta nota? — interactivo de la página de los timbales.
   Elegida una nota, se ilumina sobre la foto el parche del timbal (o los dos) donde
   entra, y debajo aparece en qué punto de su rango cae: un timbal NO suena igual de
   bien en todo su recorrido —cerca del grave el parche queda flojo y la nota pierde
   definición, y cerca del agudo el sonido se estrangula—.
   Los rangos son los estándar (varían algo por fabricante).
   Uso: <div id="x"></div><script>tmTimbalesRango('x');</script> */
(function () {
  'use strict';

  /* Cada timbal cubre 7 semitonos (una quinta justa) y solapa con el siguiente, de modo
     que los cinco recorren Re2–Do4 sin huecos. lo/hi = nota MIDI mínima y máxima.
     `el` = elipse del parche en la foto (coordenadas del viewBox, medidas sobre la
     imagen: son la zona beige visible de cada parche, no una estimación a ojo). */
  var TIMBALES = [
    { nom: 'Piccolo',    pulg: '20″', cm: '51 cm', lo: 53, hi: 60,   // Fa3 – Do4
      el: { cx: 836.5, cy: 77,    rx: 93.5,  ry: 12   } },
    { nom: 'Pequeño',    pulg: '23″', cm: '58 cm', lo: 50, hi: 57,   // Re3 – La3
      el: { cx: 689.5, cy: 33.5,  rx: 90.5,  ry: 10.5 } },
    { nom: 'Mediano',    pulg: '26″', cm: '66 cm', lo: 46, hi: 53,   // Si♭2 – Fa3
      el: { cx: 480,   cy: 19.5,  rx: 91,    ry: 12.5 } },
    { nom: 'Grande',     pulg: '29″', cm: '74 cm', lo: 41, hi: 48,   // Fa2 – Do3
      el: { cx: 296.5, cy: 60.5,  rx: 106.5, ry: 17.5 } },
    { nom: 'Contrabajo', pulg: '32″', cm: '81 cm', lo: 38, hi: 45,   // Re2 – La2
      el: { cx: 160,   cy: 139,   rx: 132,   ry: 25   } }
  ];
  /* Re2 = MIDI 38 = 73,4 Hz. Los timbales son GRAVES: el error facil es escribir estos
     rangos una octava arriba. */
  var MIN = 38, MAX = 60;                       // Re2 … Do4

  /* La foto: los cinco timbales del juego, del mayor (izquierda) al menor (derecha).
     El viewBox tiene que ser EXACTAMENTE el tamaño de la imagen para que la capa SVG
     y el <img> resuelvan la misma caja. */
  var FOTO = { base: '/assets/img/timbales/juego-de-cinco', w: 960, h: 494 };

  var AUDIO_BASE = '/assets/audio/timbales/';
  var LETRA = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
  function fichero(m) { return LETRA[m % 12] + (Math.floor(m / 12) - 1); }

  var ES = ['Do', 'Do♯', 'Re', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'Si♭', 'Si'];
  var SUB = { '2': '₂', '3': '₃', '4': '₄' };
  function nombre(m) {
    var oct = Math.floor(m / 12) - 1;
    return ES[((m % 12) + 12) % 12] + (SUB[String(oct)] || oct);
  }

  /* Zona dentro del rango de un timbal. Los dos semitonos de abajo y los dos de arriba
     son los problemáticos; los cuatro de en medio, la zona buena. Es una simplificación
     orientativa, no una frontera exacta. */
  function zona(t, m) {
    if (m < t.lo || m > t.hi) return null;
    if (m <= t.lo + 1) return 'flojo';
    if (m >= t.hi - 1) return 'tenso';
    return 'optima';
  }
  var ETIQUETA = {
    optima: 'zona óptima',
    flojo:  'cerca de su grave: pierde definición',
    tenso:  'cerca de su agudo: suena estrangulado'
  };
  var CHIP = { optima: 'zona óptima', flojo: 'zona floja', tenso: 'zona tensa' };
  var CORTA = { flojo: 'cerca de su grave', tenso: 'cerca de su agudo' };

  /* 'en el piccolo (cerca de su grave) y en el mediano (cerca de su agudo)':
     con parentesis, porque encadenar comas dentro de cada elemento se lee fatal */
  function lista(cs) {
    var p = cs.map(function (c) { return 'en el ' + c.t.nom.toLowerCase() + ' (' + CORTA[c.z] + ')'; });
    return p.length < 2 ? p[0] : p.slice(0, -1).join(', ') + ' y ' + p[p.length - 1];
  }

  var CSS = [
    '.tm-tb-wrap{margin:18px 0;}',
    '.tm-tb-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:64px;}',
    '.tm-tb-notarow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-tb-nota{font-size:1.6rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-tb-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-tb-play:hover{background:#6b5010;}',
    '.tm-tb-veredicto{font-size:.95rem;color:#555;margin-top:4px;}',
    '.tm-tb-veredicto strong{color:#1a1a1a;}',
    '.tm-tb-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    /* foto + capa de parches encendidos */
    '.tm-tb-foto{position:relative;margin:0;line-height:0;}',
    '.tm-tb-foto img{display:block;width:100%;height:auto;}',
    '.tm-tb-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}',
    '.tm-tb-parche{fill:#ff9500;fill-opacity:0;stroke:#ff9500;stroke-width:0;vector-effect:non-scaling-stroke;transition:fill-opacity .18s,stroke-width .18s;}',
    '.tm-tb-parche.on{fill-opacity:.42;stroke-width:3;filter:drop-shadow(0 0 9px rgba(255,149,0,.95));}',
    '.tm-tb-parche.flojo,.tm-tb-parche.tenso{fill-opacity:.22;stroke-width:2;stroke-dasharray:7 6;filter:none;}',
    /* fichas del timbal (o los dos) donde entra la nota */
    '.tm-tb-detalle{display:flex;flex-direction:column;gap:9px;margin-top:12px;}',
    '.tm-tb-fila{display:grid;grid-template-columns:minmax(118px,auto) 1fr;gap:12px;align-items:center;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:10px 12px;}',
    '.tm-tb-fila.sec{opacity:.72;}',
    '.tm-tb-nom{font-size:.82rem;color:#666;line-height:1.3;min-width:0;}',
    '.tm-tb-nom b{color:#1a1a1a;display:block;font-size:.95rem;}',
    '.tm-tb-zona{font-size:.72rem;color:#8b6914;margin-top:2px;}',
    '.tm-tb-zona.aviso{color:#a06a1e;}',
    '.tm-tb-barra{position:relative;height:26px;background:#f2efe8;border-radius:13px;min-width:0;}',
    '.tm-tb-buena{position:absolute;top:0;bottom:0;background:#cbb98f;}',
    '.tm-tb-punto{position:absolute;top:50%;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:#ff9500;border:2.5px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.15),0 0 9px #ff9500;}',
    '.tm-tb-vacio{background:#fdfcf9;border:1px dashed #e0d8c2;border-radius:8px;padding:12px;text-align:center;color:#777;font-size:.9rem;}',
    '.tm-tb-btns{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:14px;}',
    '.tm-tb-btn{min-width:46px;padding:9px 10px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.92rem;}',
    '.tm-tb-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-tb-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-tb-btn:focus-visible{outline:3px solid #8b6914;outline-offset:2px;}',
    /* las @media van al final: no añaden especificidad */
    '@media(max-width:600px){.tm-tb-fila{grid-template-columns:minmax(92px,auto) 1fr;gap:8px;padding:9px 10px;}.tm-tb-nom{font-size:.74rem;}.tm-tb-nom b{font-size:.85rem;}}',
    '@media(prefers-reduced-motion:reduce){.tm-tb-parche{transition:none;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-tb-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-tb-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmTimbalesRango(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var parches = TIMBALES.map(function (t, i) {
      return '<ellipse class="tm-tb-parche" data-i="' + i + '" cx="' + t.el.cx + '" cy="' + t.el.cy +
             '" rx="' + t.el.rx + '" ry="' + t.el.ry + '"></ellipse>';
    }).join('');

    var btns = '';
    for (var m = MIN; m <= MAX; m++) {
      btns += '<button class="tm-tb-btn" type="button" data-m="' + m + '">' + nombre(m) + '</button>';
    }

    wrap.innerHTML =
      '<div class="tm-tb-wrap">' +
        '<div class="tm-tb-readout" id="' + uid + '_ro">' +
          '<span class="tm-tb-hint">Elige una nota y te digo en qué timbal va</span></div>' +
        '<figure class="tm-tb-foto">' +
          '<picture>' +
            '<source srcset="' + FOTO.base + '.webp" type="image/webp">' +
            '<img src="' + FOTO.base + '.jpg" width="' + FOTO.w + '" height="' + FOTO.h + '" ' +
              'alt="Juego de cinco timbales de concierto en semicírculo, del mayor (32 pulgadas) a la izquierda al menor (20 pulgadas) a la derecha">' +
          '</picture>' +
          '<svg class="tm-tb-svg" viewBox="0 0 ' + FOTO.w + ' ' + FOTO.h + '" ' +
            'preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' + parches + '</svg>' +
        '</figure>' +
        '<div class="tm-tb-detalle" id="' + uid + '_det"></div>' +
        '<div class="tm-tb-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var det = document.getElementById(uid + '_det');
    var elipses = wrap.querySelectorAll('.tm-tb-parche');
    var audio = new Audio();

    function suena(m) {
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + fichero(m) + '.mp3';
      audio.currentTime = 0;
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () {});
    }

    /* Ficha de un timbal: la barra va de SU grave a SU agudo (escala local), que a este
       tamaño se lee mucho mejor que una escala común a los cinco. */
    function ficha(t, z, m, secundario) {
      var pos = ((m - t.lo) / (t.hi - t.lo)) * 100;
      var bIzq = (2 / (t.hi - t.lo)) * 100;
      return '<div class="tm-tb-fila' + (secundario ? ' sec' : '') + '">' +
        '<div class="tm-tb-nom"><b>' + t.nom + '</b>' + t.cm + ' · ' + t.pulg +
          '<div class="tm-tb-zona' + (z === 'optima' ? '' : ' aviso') + '">' +
            nombre(t.lo) + '–' + nombre(t.hi) + ' · ' + CHIP[z] + '</div></div>' +
        '<div class="tm-tb-barra">' +
          '<div class="tm-tb-buena" style="left:' + bIzq + '%;right:' + bIzq + '%"></div>' +
          '<div class="tm-tb-punto" style="left:calc(' + pos + '% - ' + (pos * 0.22).toFixed(2) + 'px + 11px)"></div>' +
        '</div>' +
      '</div>';
    }

    function elegir(m, btn, mudo) {
      wrap.querySelectorAll('.tm-tb-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');

      var cabe = [];
      TIMBALES.forEach(function (t, i) {
        var z = zona(t, m), e = elipses[i];
        e.classList.remove('on', 'flojo', 'tenso');
        if (z) {
          e.classList.add(z === 'optima' ? 'on' : z);
          cabe.push({ t: t, z: z });
        }
      });
      /* primero el que suena mejor: la elección práctica va delante */
      cabe.sort(function (a, b) { return (a.z === 'optima' ? 0 : 1) - (b.z === 'optima' ? 0 : 1); });

      var texto;
      if (!cabe.length) {
        texto = 'Ningún timbal del juego llega a esta nota.';
        det.innerHTML = '<div class="tm-tb-vacio">Fuera del registro de los cinco timbales.</div>';
      } else {
        var buenos = cabe.filter(function (c) { return c.z === 'optima'; });
        if (buenos.length) {
          texto = 'Va en el <strong>' + buenos[0].t.nom.toLowerCase() + '</strong> (' + buenos[0].t.pulg + '), en su ' +
                  ETIQUETA.optima + '.';
          if (buenos.length > 1) {
            texto += ' También queda bien en el ' + buenos[1].t.nom.toLowerCase() + ' (' + buenos[1].t.pulg + ').';
          }
          var malos = cabe.filter(function (c) { return c.z !== 'optima'; });
          if (malos.length) {
            texto += ' Entra además ' + lista(malos) + '.';
          }
        } else if (cabe.length === 1) {
          texto = 'Solo entra en el <strong>' + cabe[0].t.nom.toLowerCase() + '</strong> (' + cabe[0].t.pulg + '), y ' +
                  ETIQUETA[cabe[0].z] + '.';
        } else {
          texto = 'Ningún timbal la deja en su zona buena: entra ' + lista(cabe) + '.';
        }
        det.innerHTML = cabe.map(function (c, k) { return ficha(c.t, c.z, m, k > 0); }).join('');
      }

      ro.innerHTML = '<div class="tm-tb-notarow"><span class="tm-tb-nota">' + nombre(m) + '</span>' +
                       '<button class="tm-tb-play" type="button" aria-label="Escuchar la nota">▶</button></div>' +
                     '<div class="tm-tb-veredicto">' + texto + '</div>';
      var pb = ro.querySelector('.tm-tb-play');
      if (pb) pb.addEventListener('click', function () { suena(m); });
      if (!mudo) suena(m);        // al arrancar la pagina NO suena: solo al elegir
    }

    wrap.querySelectorAll('.tm-tb-btn').forEach(function (b) {
      b.addEventListener('click', function () { elegir(parseInt(b.dataset.m, 10), b); });
    });

    // Arranca con una nota puesta (la página no debe abrirse en blanco), pero MUDA.
    var inicial = wrap.querySelector('.tm-tb-btn[data-m="50"]');   // Re₃
    if (inicial) elegir(50, inicial, true);
  }

  window.tmTimbalesRango = tmTimbalesRango;
})();
