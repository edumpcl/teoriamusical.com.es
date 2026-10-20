/* Demostraciones de audio de las páginas de «Efectos de ejecución» (glissando, portamento, arpegiado, vibrato y trémolo).
   Cada botón <button class="tm-gl-btn" data-modo="..."> suena de una manera (nota de salida «de» y de llegada «a» en MIDI; 60 = Do central):
     continuo     data-de="60" data-a="72" data-dur="2"      glissando: sostiene la nota de salida 0,5 s, desliza en línea recta (en cents) y sostiene la de llegada
                                                              (con data-dur muy corto es un salto directo, sin deslizar)
     portamento   data-de="60" data-a="64" data-dur="0.2"    arrastre breve: sostiene la salida 0,6 s y se desliza con una curva suave (sale despacio, acelera y frena)
     vibrato      data-nota="69" data-prof="25" data-vel="5.5" data-dur="3"
                                                              nota sostenida cuya altura oscila ±prof cents, vel veces por segundo (prof = 0: sin vibrato)
     repetida     data-nota="69" data-veces="30" data-dur="3" la misma nota atacada «veces» veces en «dur» s (trémolo de nota repetida)
     escalonado   data-melodia="c/4:32 d/4:32 ..." data-bpm="120"   notas del piano seguidas (glissando de piano)
     piano        data-eventos="60:0:2 64:0.1:2 ..."          notas del piano con «midi:cuándo:duración» exactos (acordes, arpegiados, trémolo alternado)
   Los modos de piano usan las muestras del sitio (assets/js/tm-piano-audio.js).
   Solo suena un ejemplo a la vez: al pulsar otro se corta el anterior, y volver a pulsar el que suena lo detiene. */
(function () {
  'use strict';
  var actx = null, actual = null, token = 0;
  var VOL = 0.4;
  function ctx() { if (!actx) { var AC = window.AudioContext || window.webkitAudioContext; if (AC) actx = new AC(); } return actx; }
  var hz = function (m) { return 440 * Math.pow(2, (m - 69) / 12); };
  var num = function (b, k) { var v = b.hasAttribute(k) ? Number(b.getAttribute(k)) : NaN; return isFinite(v) ? v : NaN; };

  function estado(b, sonando) { b.classList.toggle('tm-gl-sonando', sonando); b.setAttribute('aria-pressed', sonando ? 'true' : 'false'); }
  function todos() { return Array.prototype.slice.call(document.querySelectorAll('.tm-gl-btn')); }

  /* Corta lo que suena (con un fundido de 50 ms para que no haga clic) y apaga todos los botones. */
  function parar() {
    token++;
    var a = actual; actual = null;
    if (a && a.gain && actx) {
      var t = actx.currentTime, p = a.gain.gain;
      try { if (p.cancelAndHoldAtTime) p.cancelAndHoldAtTime(t); else p.cancelScheduledValues(t); p.exponentialRampToValueAtTime(0.0001, t + 0.05); } catch (e) {}
      a.oscs.forEach(function (o) { try { o.stop(t + 0.06); } catch (e) {} });
    }
    if (window.tmPiano && window.tmPiano.stopAll) window.tmPiano.stopAll();
    todos().forEach(function (b) { estado(b, false); });
  }

  /* Dos osciladores (seno y triángulo) con su envolvente de volumen. Devuelve {c, t, g, oscs, crea(), fin} */
  function voz(total) {
    var c = ctx(), t = c.currentTime + 0.05, fin = t + total, g = c.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(VOL, t + 0.06);
    g.gain.setValueAtTime(VOL, fin - 0.12); g.gain.exponentialRampToValueAtTime(0.0001, fin);
    g.connect(c.destination);
    var v = { c: c, t: t, fin: fin, gain: g, oscs: [], pares: [] };
    [['sine', 1], ['triangle', 0.35]].forEach(function (p) {
      var o = c.createOscillator(); o.type = p[0];
      var gg = c.createGain(); gg.gain.value = p[1];
      o.connect(gg); gg.connect(g);
      v.oscs.push(o); v.pares.push(o);
    });
    v.arranca = function () { v.oscs.forEach(function (o) { o.start(t); o.stop(fin + 0.05); }); };
    return v;
  }

  /* Un tono que mantiene f1 «m1» s, pasa a f2 en «dur» s y mantiene f2 «m2» s.
     Glissando: rampa exponencial en frecuencia = recta en cents. Portamento (suave): la misma distancia en cents pero con curva suave. */
  function tono(f1, f2, m1, dur, m2, suave) {
    var v = voz(m1 + dur + m2), t = v.t;
    v.oscs.forEach(function (o) {
      o.frequency.setValueAtTime(f1, t);
      if (suave) {
        var N = 64, curva = new Float32Array(N + 1);
        for (var i = 0; i <= N; i++) { var u = i / N, e = (1 - Math.cos(Math.PI * u)) / 2; curva[i] = f1 * Math.pow(f2 / f1, e); }
        o.frequency.setValueCurveAtTime(curva, t + m1, dur);
      } else {
        o.frequency.setValueAtTime(f1, t + m1);
        o.frequency.exponentialRampToValueAtTime(f2, t + m1 + dur);
      }
    });
    v.arranca();
    return { oscs: v.oscs, gain: v.gain, total: m1 + dur + m2 + 0.2 };
  }

  /* Nota sostenida con vibrato: un oscilador lento (vel Hz) mueve la frecuencia ±prof cents. */
  function vibrato(f, prof, vel, dur) {
    var v = voz(dur), c = v.c;
    v.oscs.forEach(function (o) { o.frequency.setValueAtTime(f, v.t); });
    var extra = [];
    if (prof > 0) {
      var lfo = c.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = vel;
      var amp = c.createGain(); amp.gain.value = f * (Math.pow(2, prof / 1200) - 1);      // amplitud en Hz de ±prof cents
      lfo.connect(amp);
      v.oscs.forEach(function (o) { amp.connect(o.frequency); });
      lfo.start(v.t); lfo.stop(v.fin + 0.05); extra.push(lfo);
    }
    v.arranca();
    return { oscs: v.oscs.concat(extra), gain: v.gain, total: dur + 0.2 };
  }

  /* La misma nota atacada «veces» veces en «dur» s: cada golpe sube rápido a VOL y decae. */
  function repetida(f, veces, dur) {
    var c = ctx(), t = c.currentTime + 0.05, fin = t + dur, g = c.createGain(), paso = dur / veces, oscs = [];
    g.gain.setValueAtTime(0.0001, t);
    for (var i = 0; i < veces; i++) {
      var ti = t + i * paso;
      g.gain.linearRampToValueAtTime(VOL, ti + 0.008);
      g.gain.exponentialRampToValueAtTime(0.06, ti + paso * 0.95);
    }
    g.gain.exponentialRampToValueAtTime(0.0001, fin + 0.15);
    g.connect(c.destination);
    [['sine', 1], ['triangle', 0.35]].forEach(function (p) {
      var o = c.createOscillator(); o.type = p[0]; o.frequency.value = f;
      var gg = c.createGain(); gg.gain.value = p[1];
      o.connect(gg); gg.connect(g); o.start(t); o.stop(fin + 0.2); oscs.push(o);
    });
    return { oscs: oscs, gain: g, total: dur + 0.4 };
  }

  function acaba(b, mi, seg) {
    setTimeout(function () { if (mi === token) { actual = null; estado(b, false); } }, seg * 1000 + 100);
  }
  function apaga(b, mi) { if (mi === token) { actual = null; estado(b, false); } }

  function arranca(b, mi) {
    var modo = b.getAttribute('data-modo'), de = num(b, 'data-de'), a = num(b, 'data-a'), dur = num(b, 'data-dur');
    var piano = window.tmPiano;
    if (modo === 'continuo' || modo === 'portamento') {
      if (!isFinite(de) || !isFinite(a)) { estado(b, false); return; }          // atributos que faltan: no se programa nada inválido
      var cont = modo === 'continuo';
      var r = tono(hz(de), hz(a), cont ? 0.5 : 0.6, dur > 0 ? dur : (cont ? 2 : 0.2), cont ? 0.7 : 0.8, !cont);
      actual = { boton: b, oscs: r.oscs, gain: r.gain };
      acaba(b, mi, r.total);
    } else if (modo === 'vibrato') {
      var nota = num(b, 'data-nota'), prof = num(b, 'data-prof'), vel = num(b, 'data-vel');
      if (!isFinite(nota) || !isFinite(prof) || (prof > 0 && !(vel > 0))) { estado(b, false); return; }
      var rv = vibrato(hz(nota), prof, vel, dur > 0 ? dur : 3);
      actual = { boton: b, oscs: rv.oscs, gain: rv.gain };
      acaba(b, mi, rv.total);
    } else if (modo === 'repetida') {
      var n2 = num(b, 'data-nota'), veces = num(b, 'data-veces');
      if (!isFinite(n2) || !(veces >= 1)) { estado(b, false); return; }
      var rr = repetida(hz(n2), Math.round(veces), dur > 0 ? dur : 3);
      actual = { boton: b, oscs: rr.oscs, gain: rr.gain };
      acaba(b, mi, rr.total);
    } else if (modo === 'escalonado' && piano && piano.playMelody) {
      actual = { boton: b, oscs: [], gain: null };
      var tokens = (b.getAttribute('data-melodia') || '').split(/\s+/).filter(Boolean);
      Promise.resolve(piano.playMelody(tokens, num(b, 'data-bpm') || 120)).then(function (d) { if (mi === token) acaba(b, mi, d || 1); }, function () { apaga(b, mi); });
    } else if (modo === 'piano' && piano && piano.playEvents) {
      var ev = (b.getAttribute('data-eventos') || '').split(/\s+/).filter(Boolean).map(function (x) { var q = x.split(':').map(Number); return { midi: q[0], when: q[1], dur: q[2] }; });
      if (!ev.length || ev.some(function (e) { return !isFinite(e.midi) || !isFinite(e.when) || !(e.dur > 0); })) { estado(b, false); return; }
      actual = { boton: b, oscs: [], gain: null };
      Promise.resolve(piano.playEvents(ev)).then(function (d) { if (mi === token) acaba(b, mi, d || 1); }, function () { apaga(b, mi); });
    } else { estado(b, false); }
  }

  function wire() {
    todos().forEach(function (b) {
      var m = b.getAttribute('data-modo'), piano = window.tmPiano;
      if ((m === 'escalonado' && !(piano && piano.playMelody)) || (m === 'piano' && !(piano && piano.playEvents))) { b.hidden = true; return; }
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () {
        if (actual && actual.boton === b) { parar(); return; }       // pulsar el que suena lo detiene
        parar();
        var mi = token, c = ctx();
        estado(b, true);
        if (!c) { estado(b, false); return; }
        var go = function () { if (mi === token) arranca(b, mi); };
        if (c.state === 'suspended') c.resume().then(go, go); else go();
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire); else wire();
})();
