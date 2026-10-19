/* Ajusta la altura de los juegos incrustados (iframe.tm-juego) a su contenido.
   El juego vive en la misma web (mismo origen), así que se puede medir su documento.
   En móvil el panel se apila bajo la pista y el juego es mucho más alto que en ordenador:
   sin esto saldría una barra de desplazamiento dentro de la página. */
(function () {
  'use strict';
  function ajusta(f) {
    try {
      var d = f.contentDocument;
      if (!d || !d.documentElement) return;
      var h = Math.max(d.documentElement.scrollHeight, d.body ? d.body.scrollHeight : 0);
      if (h > 200) f.style.height = h + 'px';
    } catch (e) { /* otro origen: se deja la altura mínima */ }
  }
  function conecta(f) {
    function listo() {
      ajusta(f);
      try {
        var d = f.contentDocument;
        if (window.ResizeObserver && d && d.body) new ResizeObserver(function () { ajusta(f); }).observe(d.body);
      } catch (e) {}
    }
    f.addEventListener('load', listo);
    if (f.contentDocument && f.contentDocument.readyState === 'complete') listo();
  }
  /* Medición de uso. El juego avisa con postMessage («juego_inicio», «juego_fin», «juego_mic_error»); aquí se pasa a Analytics.
     gtag ya está cargado con Consent Mode: si la persona no ha aceptado la analítica, no se guardan cookies ni se identifica a nadie.
     Solo se admiten eventos y parámetros conocidos, con valores cortos: nunca nombres ni nada escrito por el jugador. */
  var EVENTOS = { juego_inicio: 1, juego_fin: 1, juego_mic_error: 1 };
  var PARAMS = { juego: 'texto', dificultad: 'texto', modo: 'texto', resultado: 'texto', acordes: 'texto', motivo: 'texto', intervalos: 'texto', intervalo: 'texto', sentido: 'texto', metros: 'numero', carrera: 'numero', salto: 'numero', glissando: 'numero', remate: 'numero' };
  function mide(e) {
    var d = e.data;
    if (e.origin !== location.origin || !d || d.tmJuego !== true || !EVENTOS[d.evento]) return;
    var ours = Array.prototype.some.call(document.querySelectorAll('iframe.tm-juego'), function (f) { return f.contentWindow === e.source; });
    if (!ours || typeof window.gtag !== 'function') return;
    var p = {};
    Object.keys(d.params || {}).forEach(function (k) {
      var v = d.params[k];
      if (PARAMS[k] === 'texto' && typeof v === 'string' && /^[A-Za-z_]{1,30}$/.test(v)) p[k] = v;
      else if (PARAMS[k] === 'numero' && typeof v === 'number' && isFinite(v) && v >= 0 && v < 100) p[k] = v;
    });
    window.gtag('event', d.evento, p);
  }
  window.addEventListener('message', mide);

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('iframe.tm-juego'), conecta);
    window.addEventListener('resize', function () {
      Array.prototype.forEach.call(document.querySelectorAll('iframe.tm-juego'), ajusta);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
