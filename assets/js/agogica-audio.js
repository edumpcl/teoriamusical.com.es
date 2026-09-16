/* Oír los cambios de tempo — /diccionario-musical/agogica/

   La agógica se entiende oyéndola: estos botones no reproducen un tempo fijo,
   sino el CAMBIO. Un accelerando va de 60 a 132 pulsaciones en ocho segundos,
   un ritardando frena de 120 a 60, el ritenuto baja de golpe, el calderón se
   queda esperando y el rubato roba y devuelve tiempo dentro del compás.

   Uso: <button class="tm-ag-play" data-tipo="accelerando"></button>
        <script src="/assets/js/agogica-audio.js" defer></script>

   Cada clic se programa por adelantado en el reloj de Web Audio (no con
   setInterval, que se desvía). Como el tempo cambia, el hueco hasta el clic
   siguiente se calcula con el bpm que toca en ese instante.
   Se audita con node tools/verificar-agogica-audio.js, que mide los pulsos. */
(function () {
  'use strict';

  var ADELANTO = 0.2;    // segundos de clics programados por adelantado
  var REVISION = 25;     // cada cuánto se revisa (ms)

  /* de/a = pulsaciones por minuto; dura = segundos del tramo que cambia.
     rampa: 'lineal' reparte el cambio poco a poco; 'golpe' lo hace de una vez. */
  var DEMOS = {
    accelerando: { de: 60, a: 132, dura: 8, rampa: 'lineal', etiqueta: 'Accelerando: de 60 a 132' },
    ritardando: { de: 120, a: 60, dura: 8, rampa: 'lineal', etiqueta: 'Ritardando: de 120 a 60' },
    ritenuto: { de: 120, a: 84, dura: 8, rampa: 'golpe', golpeEn: 4, etiqueta: 'Ritenuto: 120 y de golpe 84' },
    'a-tempo': { de: 120, a: 60, dura: 8, rampa: 'lineal', vuelta: true, etiqueta: 'Ritardando y a tempo' },
    calderon: { de: 96, a: 96, dura: 9, rampa: 'lineal', calderonEn: 4, esperaCalderon: 2.5, etiqueta: 'Calderón: el pulso se detiene' },
    rubato: { de: 92, a: 92, dura: 10, rampa: 'rubato', etiqueta: 'Rubato: roba y devuelve' }
  };

  var ctx = null, demo = null, siguiente = 0, t0 = 0, pulso = 0, temporizador = null, activo = null;
  var registro = [];

  function contexto() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
    return ctx;
  }

  /* Pulsaciones por minuto en el segundo t del recorrido. */
  function bpmEn(d, t) {
    var x = Math.max(0, Math.min(1, t / d.dura));
    if (d.rampa === 'golpe') return t < d.golpeEn ? d.de : d.a;
    if (d.rampa === 'rubato') {
      // Un vaivén suave alrededor del tempo base: ni acelera ni frena del todo.
      return d.de * (1 + 0.18 * Math.sin(2 * Math.PI * t / 4));
    }
    if (d.vuelta) {
      // Frena la primera mitad y al llegar al «a tempo» recupera la velocidad inicial.
      return t < d.dura / 2 ? d.de + (d.a - d.de) * (t / (d.dura / 2)) : d.de;
    }
    return d.de + (d.a - d.de) * x;
  }

  function clic(t, fuerte) {
    var osc = ctx.createOscillator(), vol = ctx.createGain();
    osc.frequency.value = fuerte ? 1600 : 1100;
    osc.type = 'square';
    vol.gain.setValueAtTime(0.0001, t);
    vol.gain.exponentialRampToValueAtTime(fuerte ? 0.5 : 0.32, t + 0.001);
    vol.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    osc.connect(vol).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
    registro.push({ t: t - t0, bpm: Math.round(bpmEn(demo, t - t0)) });
  }

  function planificar() {
    while (siguiente - t0 < demo.dura && siguiente < ctx.currentTime + ADELANTO) {
      var t = siguiente - t0;
      clic(siguiente, pulso % 4 === 0);
      var hueco = 60 / bpmEn(demo, t);
      // El calderón: el pulso se para un momento antes de seguir.
      if (demo.calderonEn && t < demo.calderonEn && t + hueco >= demo.calderonEn) hueco += demo.esperaCalderon;
      siguiente += hueco;
      pulso++;
    }
    if (siguiente - t0 >= demo.dura && ctx.currentTime > siguiente) parar();
  }

  function parar() {
    clearInterval(temporizador);
    temporizador = null;
    demo = null;
    if (activo) {
      activo.setAttribute('aria-pressed', 'false');
      activo.querySelector('.tm-ag-txt').textContent = activo.dataset.txt;
      activo = null;
    }
  }

  function tocar(btn) {
    var c = contexto();
    if (!c) return;
    parar();
    demo = DEMOS[btn.dataset.tipo];
    if (!demo) return;
    registro = [];
    pulso = 0;
    t0 = c.currentTime + 0.08;
    siguiente = t0;
    activo = btn;
    btn.setAttribute('aria-pressed', 'true');
    btn.querySelector('.tm-ag-txt').textContent = 'Parar';
    planificar();
    temporizador = setInterval(planificar, REVISION);
  }

  function preparar(btn) {
    var d = DEMOS[btn.dataset.tipo];
    if (!d) return;
    btn.type = 'button';
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Escuchar un ' + btn.dataset.tipo.replace('-', ' ') + '. ' + d.etiqueta);
    btn.dataset.txt = btn.dataset.txt || (btn.textContent || '').trim() || 'Escuchar';
    btn.innerHTML = '<span class="tm-ag-ico" aria-hidden="true"></span><span class="tm-ag-txt">' + btn.dataset.txt + '</span>';
    btn.hidden = false;   // sin JavaScript no sonaría: mejor que no aparezca
    btn.addEventListener('click', function () { if (activo === btn) parar(); else tocar(btn); });
  }

  function iniciar() {
    var btns = document.querySelectorAll('.tm-ag-play');
    if (!btns.length) return;
    Array.prototype.forEach.call(btns, preparar);
    document.addEventListener('visibilitychange', function () { if (document.hidden) parar(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();

  window.tmAgogicaAudio = {
    DEMOS: DEMOS,
    parar: parar,
    sonando: function () { return activo ? activo.dataset.tipo : null; },
    pulsos: function () { return registro.slice(); }   // para el verificador
  };
})();
