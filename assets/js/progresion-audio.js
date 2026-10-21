/* Audio de progresiones de acordes (piano). Pone un botón ▶ en cada <figure data-tm-prog="c/4 e/4 g/4, f/4 a/4 c/5, …">:
   los acordes se separan con comas; cada nota es «letra[#|b]/octava». Suenan UNO TRAS OTRO, cada uno todas sus notas a la vez,
   durante data-tm-prog-secs segundos (1,6 por defecto). Reutiliza el piano de tm-piano-audio.js (window.tmPiano.playEvents):
   suena exactamente lo que está escrito en el pentagrama, ni una nota más. Lo comprueba tools/test-funciones-tonales.js. */
(function () {
  'use strict';

  var PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  function midi(k) {
    var m = /^([a-g])([#b]?)\/(\d)$/.exec(k);
    if (!m) return null;
    return (parseInt(m[3], 10) + 1) * 12 + PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
  }
  /* "c/4 e/4 g/4, f/4 a/4 c/5" -> [[60,64,67],[65,69,72]] */
  function acordes(txt) {
    return String(txt || '').split(',').map(function (a) {
      return a.trim().split(/\s+/).map(midi).filter(function (x) { return x != null; });
    }).filter(function (a) { return a.length; });
  }
  function eventos(ac, secs) {
    var ev = [];
    ac.forEach(function (notas, i) {
      notas.forEach(function (m) { ev.push({ midi: m, when: i * secs, dur: secs * 0.96 }); });
    });
    return ev;
  }

  function boton(fig) {
    var ac = acordes(fig.getAttribute('data-tm-prog'));
    if (!ac.length || fig.querySelector('.tm-play-scale')) return;
    var secs = parseFloat(fig.getAttribute('data-tm-prog-secs')) || 1.6;
    var btn = document.createElement('button');
    btn.className = 'tm-play-scale tm-play-scale--fig'; btn.type = 'button';
    btn.setAttribute('aria-label', 'Escuchar la progresión'); btn.textContent = '▶';
    btn.addEventListener('click', function () {
      var piano = window.tmPiano;
      if (!piano || !piano.playEvents) return;
      if (btn.classList.contains('tm-loading') || btn.classList.contains('tm-playing')) return;
      btn.classList.add('tm-loading'); btn.textContent = '⏳';
      Promise.resolve(piano.playEvents(eventos(ac, secs))).then(function (dur) {
        btn.classList.remove('tm-loading'); btn.classList.add('tm-playing'); btn.textContent = '▶';
        setTimeout(function () { btn.classList.remove('tm-playing'); }, ((dur || 1) * 1000) + 200);
      }, function () { btn.classList.remove('tm-loading'); btn.textContent = '▶'; });
    });
    fig.classList.add('tm-has-play');
    fig.appendChild(btn);
  }

  function init() { Array.prototype.forEach.call(document.querySelectorAll('figure[data-tm-prog]'), boton); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.tmProgresionAudio = { acordes: acordes, eventos: eventos, midi: midi };
})();
