/* Selector de "Armadura de cada tonalidad" — /diccionario-musical/tonalidades/tonalidades-y-armaduras/
   Las 15 tarjetas (.tm-key-card) ya están en el HTML con su texto completo (para que
   Google las indexe aunque no ejecute el JS), y cada una lleva ya su pentagrama como SVG
   (assets/img/armaduras/, generado con tools/gen-armaduras-verovio.js: no hace falta
   ninguna librería de notación). Este script solo: 1) muestra una sola tarjeta a la vez
   con un selector de botones, y 2) hace que los enlaces de la tabla de arriba bajen y
   seleccionen la tarjeta correcta. */
(function () {
  'use strict';

  function init() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.tm-key-card'));
    var botones = Array.prototype.slice.call(document.querySelectorAll('#tm-key-selector button[data-key]'));
    if (!cards.length || !botones.length) return;

    function mostrar(key, scroll) {
      var encontrada = null;
      cards.forEach(function (c) {
        var es = c.id === key;
        c.hidden = !es;
        if (es) encontrada = c;
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
