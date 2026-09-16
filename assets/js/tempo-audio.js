/* Escuchar los tempos en la propia página — /diccionario-musical/tempo-musical/

   Cada término de tempo (Largo, Andante, Allegro…) lleva un botón que hace sonar
   el pulso a su velocidad, sin salir de la página. Para practicar de verdad está
   el metrónomo, que se abre con el tempo ya puesto.

   Uso: <button class="tm-tempo-play" data-bpm="120" data-nombre="Allegro"></button>
        y al final <script src="/assets/js/tempo-audio.js" defer></script>

   El sonido es un clic corto de Web Audio, programado por adelantado (no con
   setInterval, que se desvía): el temporizador solo mira si hay que programar los
   clics de los próximos 150 ms y el reloj del audio hace el resto. Se audita con
   node tools/verificar-tempo-audio.js, que mide los pulsos reales. */
(function () {
  'use strict';

  var ADELANTO = 0.15;   // segundos de clics programados por adelantado
  var REVISION = 25;     // cada cuánto se revisa (ms)
  var MAXIMO = 30;       // se para solo a los 30 s: es una muestra, no un metrónomo

  var ctx = null, fuente = null, siguiente = 0, temporizador = null, activo = null;
  var registro = [];     // tiempos de los clics programados (para el verificador)

  function contexto() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
    return ctx;
  }

  function clic(t, fuerte) {
    var osc = ctx.createOscillator(), vol = ctx.createGain();
    osc.frequency.value = fuerte ? 1600 : 1100;
    osc.type = 'square';
    // Envolvente corta: ataque de 1 ms y caída de 30 ms, para que no chasquee.
    vol.gain.setValueAtTime(0.0001, t);
    vol.gain.exponentialRampToValueAtTime(fuerte ? 0.5 : 0.32, t + 0.001);
    vol.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    osc.connect(vol).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
    registro.push(t);
    if (registro.length > 200) registro.shift();
  }

  function planificar() {
    var intervalo = 60 / fuente.bpm;
    while (siguiente < ctx.currentTime + ADELANTO) {
      clic(siguiente, fuente.pulso % 4 === 0);
      fuente.pulso++;
      siguiente += intervalo;
    }
    if (ctx.currentTime - fuente.inicio > MAXIMO) parar();
  }

  function parar() {
    clearInterval(temporizador);
    temporizador = null;
    fuente = null;
    if (activo) {
      activo.setAttribute('aria-pressed', 'false');
      activo.classList.remove('tm-tempo-sonando');
      activo.querySelector('.tm-tempo-txt').textContent = activo.dataset.txt;
      activo = null;
    }
  }

  function tocar(btn) {
    var c = contexto();
    if (!c) return;
    parar();
    var bpm = Math.max(20, Math.min(300, Number(btn.dataset.bpm) || 60));
    registro = [];
    fuente = { bpm: bpm, pulso: 0, inicio: c.currentTime };
    siguiente = c.currentTime + 0.08;   // un respiro para el primer clic
    activo = btn;
    btn.setAttribute('aria-pressed', 'true');
    btn.classList.add('tm-tempo-sonando');
    btn.querySelector('.tm-tempo-txt').textContent = 'Parar';
    planificar();
    temporizador = setInterval(planificar, REVISION);
  }

  function preparar(btn) {
    var bpm = Number(btn.dataset.bpm) || 60;
    var nombre = btn.dataset.nombre || '';
    btn.type = 'button';
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Escuchar el pulso de ' + nombre + ' a ' + bpm + ' pulsaciones por minuto');
    btn.dataset.txt = btn.dataset.txt || (btn.textContent || '').trim() || 'Escuchar';
    btn.innerHTML = '<span class="tm-tempo-ico" aria-hidden="true"></span><span class="tm-tempo-txt">' + btn.dataset.txt + '</span>';
    // El botón nace oculto en el HTML: sin JavaScript no sonaría nada y sería un
    // botón mudo, así que solo aparece cuando el motor está vivo. El enlace al
    // metrónomo de esa misma fila sigue funcionando siempre.
    btn.hidden = false;
    btn.addEventListener('click', function () {
      if (activo === btn) parar(); else tocar(btn);
    });
  }

  function iniciar() {
    var btns = document.querySelectorAll('.tm-tempo-play');
    if (!btns.length) return;
    Array.prototype.forEach.call(btns, preparar);
    // Si se cambia de pestaña, se calla: nadie quiere un clic de fondo.
    document.addEventListener('visibilitychange', function () { if (document.hidden) parar(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();

  window.tmTempoAudio = {
    parar: parar,
    sonando: function () { return activo ? Number(activo.dataset.bpm) : null; },
    pulsos: function () { return registro.slice(); }   // para el verificador
  };
})();
