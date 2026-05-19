/* teoriamusical-herramientas — afinador.js */
(function() {
  // ── ESTADO ──────────────────────────────────────────────────────────────────
  let audioCtx = null;
  let analyser = null;
  let mediaStream = null;
  let rafId = null;
  let isActive = false;
  let wakeLock = null;
  let a4Ref = 442;
  let smoothFreq = 0;
  let lastNoteData = null;
  let lastSignalTime = 0;
  const HOLD_MS = 800; // ms que la nota se mantiene visible tras perder señal
  let transpSemitones = 0; // positivo = instrumento en Sib (sube 2st), etc.
  let refCtx = null;
  let refOsc = null;
  let refGain = null;
  let playingRefBtn = null;
  const AFIN_STRINGS = window.AFIN_STRINGS || null;
  const strItems = [];

  async function acquireWakeLock() {
    if (!('wakeLock' in navigator)) return;
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    } catch (e) {}
  }

  function releaseWakeLock() {
    if (wakeLock) { wakeLock.release(); wakeLock = null; }
  }

  // Notas en español
  const NOTE_NAMES = ['Do','Do#','Re','Re#','Mi','Fa','Fa#','Sol','Sol#','La','La#','Si'];
  const NOTE_NAMES_DISPLAY = ['Do','Do♯','Re','Re♯','Mi','Fa','Fa♯','Sol','Sol♯','La','La♯','Si'];

  // Instrumentos transpositores: nombre, semitonos que sube la nota escrita respecto a la real
  // Si un Sib suena Do cuando lee Re → escrita = real + 2
  const INSTRUMENTS = [
    { name: 'C (Concert)', st: 0 },
    { name: 'Sib (Bb)',    st: 2 },
    { name: 'La (A)',      st: 3 },
    { name: 'Mib (Eb)',    st: -3 },
    { name: 'Fa (F)',      st: -5 },
    { name: 'Sol (G)',     st: -7 },
    { name: 'Re (D)',      st: -2 },
  ];

  // Notas de referencia: Do4–Si4 + Do5–Sol5 (12 notas)
  const REF_NOTES = [
    {name:'Do', oct:4}, {name:'Re', oct:4}, {name:'Mi', oct:4},
    {name:'Fa', oct:4}, {name:'Sol', oct:4}, {name:'La', oct:4},
    {name:'Si', oct:4}, {name:'Do', oct:5}, {name:'Re', oct:5},
    {name:'Mi', oct:5}, {name:'Fa', oct:5}, {name:'Sol', oct:5},
  ];

  // ── DOM ──────────────────────────────────────────────────────────────────────
  const domNoteName    = document.getElementById('note-name');
  const domNoteOctave  = document.getElementById('note-octave');
  const domNoteFreq    = document.getElementById('note-freq');
  const domNoteWritten = document.getElementById('note-written');
  const domNoteWritOct = document.getElementById('note-written-oct');
  const domNoteDisplay = document.getElementById('note-display');
  const domCents       = document.getElementById('cents-display');
  const domNeedle      = document.getElementById('gauge-needle');
  const domDot         = document.getElementById('gauge-dot');
  const domFill        = document.getElementById('gauge-fill');
  const domBtnMic      = document.getElementById('btn-mic');
  const domMicLabel    = document.getElementById('mic-label');
  const domStatNote    = document.getElementById('stat-note');
  const domStatFreq    = document.getElementById('stat-freq');
  const domStatCents   = document.getElementById('stat-cents');

  // ── FRECUENCIA → NOTA ────────────────────────────────────────────────────────
  function freqToNote(freq) {
    if (freq <= 0) return null;
    const semitones = 12 * Math.log2(freq / a4Ref) + 69; // MIDI note
    const midi = Math.round(semitones);
    const cents = Math.round((semitones - midi) * 100);
    const noteIdx = ((midi % 12) + 12) % 12;
    const octave = Math.floor(midi / 12) - 1;
    return { name: NOTE_NAMES_DISPLAY[noteIdx], octave, cents, freq };
  }

  function noteToFreq(noteIdx, octave) {
    const midi = noteIdx + (octave + 1) * 12;
    return a4Ref * Math.pow(2, (midi - 69) / 12);
  }

  // ── YIN PITCH DETECTION ──────────────────────────────────────────────────────
  function yin(buffer, sampleRate) {
    const bufLen = buffer.length;
    const half = Math.floor(bufLen / 2);
    const threshold = 0.15;
    const tauMin = Math.max(2, Math.ceil(sampleRate / 4200));
    const tauMax = Math.min(half - 1, Math.floor(sampleRate / 40));
    const diff = new Float32Array(tauMax + 1);

    // Difference function (only up to tauMax — covers 40–4200 Hz)
    diff[0] = 0;
    for (let tau = 1; tau <= tauMax; tau++) {
      let s = 0;
      for (let i = 0; i < half; i++) {
        const d = buffer[i] - buffer[i + tau];
        s += d * d;
      }
      diff[tau] = s;
    }

    // Cumulative mean normalized difference
    const cmnd = new Float32Array(tauMax + 1);
    cmnd[0] = 1;
    let runSum = 0;
    for (let tau = 1; tau <= tauMax; tau++) {
      runSum += diff[tau];
      cmnd[tau] = runSum === 0 ? 0 : diff[tau] * tau / runSum;
    }

    // Absolute threshold (search from tauMin)
    let tau = tauMin;
    while (tau <= tauMax) {
      if (cmnd[tau] < threshold) {
        while (tau + 1 <= tauMax && cmnd[tau + 1] < cmnd[tau]) tau++;
        break;
      }
      tau++;
    }
    if (tau > tauMax || cmnd[tau] >= threshold) return -1;

    // Parabolic interpolation
    const x0 = tau > 1 ? tau - 1 : tau;
    const x2 = tau + 1 <= tauMax ? tau + 1 : tau;
    let betterTau;
    if (x0 === tau) {
      betterTau = cmnd[tau] <= cmnd[x2] ? tau : x2;
    } else if (x2 === tau) {
      betterTau = cmnd[tau] <= cmnd[x0] ? tau : x0;
    } else {
      const s0 = cmnd[x0], s1 = cmnd[tau], s2 = cmnd[x2];
      betterTau = tau + (s2 - s0) / (2 * (2 * s1 - s2 - s0));
    }

    return sampleRate / betterTau;
  }

  // ── RMS ──────────────────────────────────────────────────────────────────────
  function rms(buffer) {
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
    return Math.sqrt(sum / buffer.length);
  }

  // ── GAUGE ────────────────────────────────────────────────────────────────────
  // Arc: pivot at (150,110), radius 120, from -90° (top) swinging ±90° for ±50¢
  function centsToAngle(cents) {
    return Math.max(-90, Math.min(90, cents / 50 * 90));
  }

  function polarToXY(angleDeg, radius, cx, cy) {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function updateGauge(cents, state) {
    const angle = centsToAngle(cents || 0);
    domNeedle.style.transform = `rotate(${angle}deg)`;
    domNeedle.style.transformOrigin = '150px 150px';
    domDot.style.transformOrigin   = '150px 150px';

    let color;
    if (state === 'in-tune') color = 'var(--green)';
    else if (state === 'flat') color = 'var(--red)';
    else if (state === 'sharp') color = 'var(--red)';
    else color = 'var(--border)';

    domNeedle.style.stroke = color;
    domDot.style.fill = color;

    const cx = 150, cy = 150, r = 110;
    const startPt = polarToXY(0, r, cx, cy);
    const endPt   = polarToXY(angle, r, cx, cy);
    const largeArc = Math.abs(angle) > 180 ? 1 : 0;
    const sweep = angle >= 0 ? 1 : 0;

    if (state === 'silent') {
      domFill.setAttribute('d', `M ${cx} ${cy}`);
    } else {
      domFill.setAttribute('d',
        `M ${startPt.x} ${startPt.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${endPt.x} ${endPt.y}`
      );
      domFill.style.stroke = color;
      domFill.style.opacity = '0.5';
    }
  }

  // ── DISPLAY UPDATE ───────────────────────────────────────────────────────────
  function writtenNote(realMidi) {
    // Nota escrita = nota real + semitonos de transposición
    const writtenMidi = realMidi + transpSemitones;
    const noteIdx = ((writtenMidi % 12) + 12) % 12;
    const octave = Math.floor(writtenMidi / 12) - 1;
    return { name: NOTE_NAMES_DISPLAY[noteIdx], octave };
  }

  function setDisplay(noteData) {
    const hasTransp = transpSemitones !== 0;
    domNoteDisplay.classList.toggle('no-transp', !hasTransp);

    if (!noteData) {
      domNoteName.className = 'note-name silent';
      domNoteName.textContent = '—';
      domNoteOctave.textContent = '';
      domNoteFreq.textContent = '';
      domNoteWritten.className = 'note-name written silent';
      domNoteWritten.textContent = '—';
      domNoteWritOct.textContent = '';
      domCents.className = 'cents-display';
      domCents.textContent = '— ¢';
      domStatNote.textContent = '—';
      domStatFreq.textContent = '—';
      domStatCents.textContent = '—';
      updateGauge(0, 'silent');
      if (AFIN_STRINGS) resetStringPanel();
      return;
    }

    const { name, octave, cents, freq } = noteData;
    let state;
    if (Math.abs(cents) <= 5) state = 'in-tune';
    else if (cents < 0)        state = 'flat';
    else                       state = 'sharp';

    // Nota real
    domNoteName.className = `note-name ${state}`;
    domNoteName.textContent = name;
    domNoteOctave.textContent = octave;
    domNoteFreq.textContent = freq.toFixed(1) + ' Hz';

    // Nota escrita (transpositores)
    if (hasTransp) {
      const semitones = 12 * Math.log2(freq / a4Ref) + 69;
      const midi = Math.round(semitones);
      const w = writtenNote(midi);
      domNoteWritten.className = `note-name written ${state}`;
      domNoteWritten.textContent = w.name;
      domNoteWritOct.textContent = w.octave;
    } else {
      domNoteWritten.className = 'note-name written';
      domNoteWritten.textContent = '—';
      domNoteWritOct.textContent = '';
    }

    domCents.className = `cents-display ${state}`;
    const sign = cents > 0 ? '+' : '';
    domCents.textContent = `${sign}${cents} ¢`;

    domStatNote.textContent = name + octave;
    domStatFreq.textContent = freq.toFixed(1);
    domStatCents.textContent = `${sign}${cents}`;
    domStatCents.style.color = state === 'in-tune' ? 'var(--green)' : 'var(--red)';

    updateGauge(cents, state);
    if (AFIN_STRINGS) { const mf = 12 * Math.log2(freq / a4Ref) + 69; updateStringPanel(mf); }
  }

  // ── ANÁLISIS ─────────────────────────────────────────────────────────────────
  function analyse() {
    if (!isActive || !analyser) return;
    const bufLen = analyser.fftSize;
    const buffer = new Float32Array(bufLen);
    analyser.getFloatTimeDomainData(buffer);

    const now = performance.now();
    const amplitude = rms(buffer);

    if (amplitude < 0.01) {
      // Sin señal: mantener nota visible durante HOLD_MS
      if (lastNoteData && (now - lastSignalTime) > HOLD_MS) {
        setDisplay(null);
        lastNoteData = null;
        smoothFreq = 0;
      }
      rafId = requestAnimationFrame(analyse);
      return;
    }

    const freq = yin(buffer, audioCtx.sampleRate);
    if (freq < 40 || freq > 4200) {
      // Frecuencia fuera de rango: mismo tratamiento que sin señal
      if (lastNoteData && (now - lastSignalTime) > HOLD_MS) {
        setDisplay(null);
        lastNoteData = null;
        smoothFreq = 0;
      }
      rafId = requestAnimationFrame(analyse);
      return;
    }

    // Señal válida — actualizar timestamp y suavizado
    lastSignalTime = now;
    smoothFreq = smoothFreq === 0 ? freq : smoothFreq * 0.75 + freq * 0.25;
    const noteData = freqToNote(smoothFreq);
    if (noteData) {
      lastNoteData = noteData;
      setDisplay(noteData);
    }

    rafId = requestAnimationFrame(analyse);
  }

  // ── MIC ──────────────────────────────────────────────────────────────────────
  const domMicError = document.getElementById('mic-error');
  function showMicError(msg) {
    domMicError.textContent = msg;
    domMicError.style.display = 'block';
  }
  function clearMicError() { domMicError.style.display = 'none'; }

  async function startMic() {
    clearMicError();
    domBtnMic.style.background = 'var(--gold)';
    domBtnMic.style.borderColor = 'var(--gold)';
    domBtnMic.style.color = '#fff';
    domMicLabel.textContent = '...';

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
        video: false
      });

      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') await audioCtx.resume();

      const source = audioCtx.createMediaStreamSource(mediaStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 4096;
      analyser.smoothingTimeConstant = 0;
      source.connect(analyser);

      isActive = true;
      acquireWakeLock();
      smoothFreq = 0;
      lastNoteData = null;
      lastSignalTime = 0;

      domBtnMic.classList.add('active');
      domBtnMic.style.background = '';
      domBtnMic.style.borderColor = '';
      domBtnMic.style.color = '';
      domMicLabel.textContent = 'Activo';

      rafId = requestAnimationFrame(analyse);

    } catch (err) {
      domBtnMic.style.background = '';
      domBtnMic.style.borderColor = '';
      domBtnMic.style.color = '';
      domMicLabel.textContent = 'Activar';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        showMicError('Permiso de micrófono denegado. Haz clic en el icono del candado en la barra de direcciones y permite el acceso al micrófono.');
      } else if (err.name === 'NotFoundError') {
        showMicError('No se detectó ningún micrófono. Conecta un micrófono e inténtalo de nuevo.');
      } else {
        showMicError('No se pudo acceder al micrófono (' + err.name + '). Comprueba que ninguna otra aplicación lo esté usando.');
      }
      stopMic();
    }
  }

  function stopRefNote() {
    if (refOsc && refCtx) {
      const now = refCtx.currentTime;
      refGain.gain.cancelScheduledValues(now);
      refGain.gain.setValueAtTime(refGain.gain.value, now);
      refGain.gain.linearRampToValueAtTime(0, now + 0.05);
      try { refOsc.stop(now + 0.06); } catch(e) {}
      refOsc = null;
    }
    if (playingRefBtn) {
      playingRefBtn.classList.remove('playing');
      playingRefBtn = null;
    }
  }

  function stopMic() {
    isActive = false;
    releaseWakeLock();
    stopRefNote();
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    if (mediaStream) { mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null; }
    if (audioCtx) { audioCtx.close(); audioCtx = null; }
    analyser = null;
    smoothFreq = 0;
    lastNoteData = null;
    lastSignalTime = 0;
    domBtnMic.classList.remove('active');
    domBtnMic.style.background = '';
    domBtnMic.style.borderColor = '';
    domBtnMic.style.color = '';
    domMicLabel.textContent = 'Activar';
    setDisplay(null);
  }

  domBtnMic.addEventListener('click', () => {
    if (isActive) stopMic(); else startMic();
  });

  // Limpiar micrófono al cambiar de pestaña
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isActive) stopMic();
  });

  // ── REFERENCIA A4 ─────────────────────────────────────────────────────────────
  const domRefValue = document.getElementById('ref-value');
  function updateRefDisplay() { domRefValue.textContent = a4Ref + ' Hz'; }

  function changeRef(delta) {
    a4Ref = Math.max(390, Math.min(480, a4Ref + delta));
    updateRefDisplay();
  }

  function setupRefBtn(btn, delta) {
    let interval = null, timeout = null;
    const start = () => {
      stop();
      changeRef(delta);
      timeout = setTimeout(() => {
        interval = setInterval(() => changeRef(delta), 80);
      }, 400);
    };
    const stop = () => { clearTimeout(timeout); clearInterval(interval); timeout = null; interval = null; };
    btn.addEventListener('mousedown', start);
    btn.addEventListener('mouseup', stop);
    btn.addEventListener('mouseleave', stop);
    btn.addEventListener('touchstart', e => { e.preventDefault(); start(); });
    btn.addEventListener('touchend', e => { e.preventDefault(); stop(); });
    btn.addEventListener('touchcancel', stop);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
  }

  setupRefBtn(document.getElementById('ref-minus'), -1);
  setupRefBtn(document.getElementById('ref-plus'),  +1);

  // ── NOTAS DE REFERENCIA ───────────────────────────────────────────────────────
  function buildRefNotes() {
    const grid = document.getElementById('ref-notes-grid');
    grid.innerHTML = '';
    REF_NOTES.forEach(({name, oct}) => {
      const noteIdx = NOTE_NAMES.indexOf(name.replace('♯','#'));
      const btn = document.createElement('div');
      btn.className = 'ref-note-btn';
      btn.innerHTML = `
        <span class="ref-note-name">${name}</span>
        <span class="ref-note-oct">${oct}</span>
      `;
      btn.addEventListener('click', () => playRefNote(noteIdx, oct, btn));
      grid.appendChild(btn);
    });
  }

  function playRefNote(noteIdx, octave, btn) {
    stopRefNote();
    // Si era el mismo botón, solo detener
    if (btn === playingRefBtn) return;

    if (!refCtx) refCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (refCtx.state === 'suspended') refCtx.resume();

    const freq = noteToFreq(noteIdx, octave);
    refOsc  = refCtx.createOscillator();
    refGain = refCtx.createGain();
    refOsc.type = 'sine';
    refOsc.frequency.value = freq;
    refOsc.connect(refGain);
    refGain.connect(refCtx.destination);

    const now = refCtx.currentTime;
    refGain.gain.setValueAtTime(0, now);
    refGain.gain.linearRampToValueAtTime(0.5, now + 0.01);
    refGain.gain.setValueAtTime(0.5, now + 2.7);
    refGain.gain.linearRampToValueAtTime(0, now + 3);

    refOsc.start(now);
    refOsc.stop(now + 3.1);

    btn.classList.add('playing');
    playingRefBtn = btn;

    refOsc.onended = () => {
      btn.classList.remove('playing');
      if (playingRefBtn === btn) playingRefBtn = null;
      refOsc = null;
    };
  }

  // ── TRANSPOSICIÓN ─────────────────────────────────────────────────────────────
  const domTranspVal = document.getElementById('transp-val');

  function updateTranspDisplay() {
    const sign = transpSemitones > 0 ? '+' : '';
    domTranspVal.textContent = `${sign}${transpSemitones} st`;
    domTranspVal.style.color = transpSemitones === 0 ? 'var(--muted)' : 'var(--rust)';
  }

  function setTransp(st) {
    transpSemitones = Math.max(-12, Math.min(12, st));
    updateTranspDisplay();
    // Deselect all pills if manual
    document.querySelectorAll('.transp-pill').forEach(p => {
      p.classList.toggle('active', parseInt(p.dataset.st) === transpSemitones);
    });
  }

  function buildTranspInstruments() {
    const container = document.getElementById('transp-instruments');
    INSTRUMENTS.forEach(inst => {
      const pill = document.createElement('span');
      pill.className = 'transp-pill' + (inst.st === 0 ? ' active' : '');
      pill.dataset.st = inst.st;
      pill.textContent = inst.name;
      pill.addEventListener('click', () => setTransp(inst.st));
      container.appendChild(pill);
    });
  }

  function setupTranspBtn(btn, delta) {
    let interval = null, timeout = null;
    const start = () => {
      stop();
      setTransp(transpSemitones + delta);
      timeout = setTimeout(() => {
        interval = setInterval(() => setTransp(transpSemitones + delta), 120);
      }, 400);
    };
    const stop = () => { clearTimeout(timeout); clearInterval(interval); timeout = null; interval = null; };
    btn.addEventListener('mousedown', start);
    btn.addEventListener('mouseup', stop);
    btn.addEventListener('mouseleave', stop);
    btn.addEventListener('touchstart', e => { e.preventDefault(); start(); });
    btn.addEventListener('touchend', e => { e.preventDefault(); stop(); });
    btn.addEventListener('touchcancel', stop);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
  }

  setupTranspBtn(document.getElementById('transp-minus'), -1);
  setupTranspBtn(document.getElementById('transp-plus'),  +1);

  // ── INIT ──────────────────────────────────────────────────────────────────────
  buildRefNotes();
  buildTranspInstruments();
  if (window.AFIN_TRANSP) setTransp(window.AFIN_TRANSP);
  else updateTranspDisplay();
  setDisplay(null);
  updateGauge(0, 'silent');
  updateRefDisplay();

  // ── CUERDAS ──────────────────────────────────────────────────────────────────
  function wireThick(midi) {
    if (midi <= 30) return 5;
    if (midi <= 42) return 4;
    if (midi <= 52) return 3;
    if (midi <= 62) return 2;
    return 1;
  }

  function initStringPanel() {
    const aWrap = document.querySelector('.tm-afinador-wrap');
    const acBox = aWrap.querySelector('.ctrl-box.accent-box');
    const panel = document.createElement('div');
    panel.className = 'ctrl-box';
    panel.id = 'afin-strings-panel';
    const lbl = document.createElement('div');
    lbl.className = 'box-label';
    lbl.textContent = 'Cuerdas';
    const grid = document.createElement('div');
    grid.className = 'afin-strings';
    AFIN_STRINGS.forEach(s => {
      const item = document.createElement('div');
      item.className = 'afin-string-item';
      const wire = document.createElement('div');
      wire.className = 'afin-string-wire';
      wire.style.height = wireThick(s.midi) + 'px';
      const lname = document.createElement('div');
      lname.className = 'afin-string-name';
      lname.innerHTML = s.name + '<span class="afin-string-oct">' + s.oct + '</span>';
      const cEl = document.createElement('div');
      cEl.className = 'afin-string-cents';
      item.append(wire, lname, cEl);
      grid.appendChild(item);
      strItems.push(item);
    });
    panel.append(lbl, grid);
    acBox.insertAdjacentElement('afterend', panel);
  }

  function updateStringPanel(midiFloat) {
    let bIdx = 0, bDist = Infinity;
    for (let i = 0; i < AFIN_STRINGS.length; i++) {
      const d = Math.abs(midiFloat - AFIN_STRINGS[i].midi);
      if (d < bDist) { bDist = d; bIdx = i; }
    }
    strItems.forEach((item, i) => {
      const cEl = item.querySelector('.afin-string-cents');
      if (i === bIdx) {
        const c = Math.round((midiFloat - AFIN_STRINGS[i].midi) * 100);
        item.className = 'afin-string-item ' + (Math.abs(c) <= 5 ? 's-intune' : c < 0 ? 's-flat' : 's-sharp');
        cEl.textContent = (c > 0 ? '+' : '') + c + '¢';
      } else {
        item.className = 'afin-string-item';
        cEl.textContent = '';
      }
    });
  }

  function resetStringPanel() {
    strItems.forEach(item => {
      item.className = 'afin-string-item';
      item.querySelector('.afin-string-cents').textContent = '';
    });
  }

  if (AFIN_STRINGS) initStringPanel();

  // ── FULLSCREEN ────────────────────────────────────────────────────────────────
  const afinWrap = document.querySelector('.tm-afinador-wrap');
  const fsBtn    = document.getElementById('afin-btn-fullscreen');
  const fsIcon   = document.getElementById('afin-fs-icon');
  const fsLabel  = fsBtn ? fsBtn.querySelector('.afin-fs-label') : null;
  let _isFullscreen = false;
  const FS_ENTER = '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>';
  const FS_EXIT  = '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/>';

  function setAfinFullscreen(on) {
    _isFullscreen = on;
    afinWrap.classList.toggle('is-fullscreen', on);
    document.body.classList.toggle('has-fullscreen', on);
    if (fsIcon)  fsIcon.innerHTML = on ? FS_EXIT : FS_ENTER;
    if (fsLabel) fsLabel.textContent = on ? 'Salir' : 'Pantalla completa';
    if (fsBtn)   fsBtn.title = on ? 'Salir de pantalla completa' : 'Pantalla completa';
  }

  if (fsBtn) fsBtn.addEventListener('click', () => setAfinFullscreen(!_isFullscreen));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && _isFullscreen) setAfinFullscreen(false);
  });

})();
