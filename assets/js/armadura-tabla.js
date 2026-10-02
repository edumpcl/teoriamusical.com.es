/* Selector de "Armadura de cada tonalidad" — /diccionario-musical/tonalidades/tonalidades-y-armaduras/
   Las 15 tarjetas (.tm-key-card) ya están en el HTML con su texto completo (para que
   Google las indexe aunque no ejecute el JS); este script solo: 1) dibuja el pentagrama
   de cada una con VexFlow, 2) muestra una sola tarjeta a la vez con un selector de
   botones, y 3) hace que los enlaces de la tabla de arriba bajen y seleccionen la
   tarjeta correcta. */
(function () {
  'use strict';

  function init() {
    var VF = (window.Vex && window.Vex.Flow) || window.VexFlow;
    if (!VF) return;

    var cards = Array.prototype.slice.call(document.querySelectorAll('.tm-key-card'));
    var botones = Array.prototype.slice.call(document.querySelectorAll('#tm-key-selector button[data-key]'));
    if (!cards.length || !botones.length) return;

    function dibujar(card) {
      var div = card.querySelector('.tm-key-svg');
      if (!div || div.childNodes.length) return;
      var rend = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      rend.resize(200, 130);
      var ctx = rend.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new VF.Stave(10, 25, 180);
      stave.addClef('treble').addKeySignature(card.getAttribute('data-vex'));
      stave.setContext(ctx).draw();
    }

    function mostrar(key, scroll) {
      var encontrada = null;
      cards.forEach(function (c) {
        var es = c.id === key;
        c.hidden = !es;
        if (es) { encontrada = c; dibujar(c); }
      });
      botones.forEach(function (b) { b.setAttribute('aria-current', b.getAttribute('data-key') === key ? 'true' : 'false'); });
      if (scroll && encontrada) encontrada.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return !!encontrada;
    }

    botones.forEach(function (b) {
      b.addEventListener('click', function () {
        mostrar(b.getAttribute('data-key'), false);
        history.replaceState(null, '', '#' + b.getAttribute('data-key'));
      });
    });
    document.querySelectorAll('.tm-key-link').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        var key = a.getAttribute('href').replace('#', '');
        if (!mostrar(key, true)) return;
        ev.preventDefault();
        history.replaceState(null, '', '#' + key);
      });
    });

    var inicial = location.hash.replace('#', '');
    if (!mostrar(inicial, false)) mostrar('do-mayor', false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
