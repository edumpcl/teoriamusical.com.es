/* teoriamusical-herramientas — metronomo.js */
(function() {
  // ── ESTADO GLOBAL ──────────────────────────────────────────────────────────
  let bpm = 120;
  let isPlaying = false;
  let currentBeat = 0;
  let measureCount = 0;
  let totalBeats = 0;
  let subdivision = 1;
  let meter = '2/4';
  let beatsPerMeasure = 2;
  let mutedBeats = [];
  let practiceActive = false;
  let practiceProgress = 0;
  let _metGeneration = 0;
  let _drGeneration = 0;
  let _pendulumDir = 1;
  let tapTimes = [];

  // DOM cache
  let _domBpmNum, _domTempoName, _domBpmSlider, _domBeatDots, _domStBeat, _domStMeasure, _domStInterval, _domStTotal, _domPlayIcon, _domPracBar, _domPendG, _domPendBall;

  // Audio
  let audioCtx = null;
  let compressor = null;
  let masterGain = null;
  let volClick = 0.8;
  let volAccent = 1.0;

  // Drum machine
  let drEnabled = false;
  const DR_INSTS = ['KICK', 'SNARE', 'HH-C', 'HH-O'];
  const DR_STEPS = 16;
  let drPattern = DR_INSTS.map(() => new Array(DR_STEPS).fill(false));
  let drVolumes = [0.8, 0.7, 0.6, 0.5];
  let drCurrentStep = 0;

  // ── PATRONES POR COMPÁS ────────────────────────────────────────────────────
  const METER_PATTERNS = {
    '2/4': [
      { name: 'Marcha',
        kick:  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
        hhc:   [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        hho:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
      { name: 'Polka',
        kick:  [1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0],
        snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
        hhc:   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        hho:   [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1] },
    ],
    '3/4': [
      { name: 'Vals',
        kick:  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        snare: [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],
        hhc:   [1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0],
        hho:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
      { name: 'Bolero',
        kick:  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
        snare: [0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0],
        hhc:   [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0],
        hho:   [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0] },
      { name: 'Mazurca',
        kick:  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
        snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
        hhc:   [1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0],
        hho:   [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0] },
    ],
    '4/4': [
      { name: 'Rock',
        kick:  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
        hhc:   [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        hho:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1] },
      { name: 'Pop',
        kick:  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
        hhc:   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        hho:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0] },
      { name: 'Funk',
        kick:  [1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0],
        snare: [0,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0],
        hhc:   [1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
        hho:   [0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0] },
      { name: 'Bossa',
        kick:  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
        snare: [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
        hhc:   [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        hho:   [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1] },
      { name: 'Reggae',
        kick:  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        snare: [0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0],
        hhc:   [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
        hho:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
      { name: 'Shuffle',
        kick:  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
        hhc:   [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1],
        hho:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
    ],
    '6/8': [
      { name: 'Balada',
        kick:  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
        snare: [0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
        hhc:   [1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0],
        hho:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
      { name: 'Jig',
        kick:  [1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0],
        snare: [0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0],
        hhc:   [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
        hho:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
      { name: 'Siciliana',
        kick:  [1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0],
        snare: [0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
        hhc:   [1,0,1,1,0,1,1,0,1,1,0,1,0,0,0,0],
        hho:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
    ],
  };

  const EMPTY_PATTERN = { name: 'Custom',
    kick: new Array(16).fill(0), snare: new Array(16).fill(0),
    hhc:  new Array(16).fill(0), hho:   new Array(16).fill(0) };

  let currentPatternIdx = -1; // -1 = Off, 0..n = patrón del compás actual
  let currentMeterPatterns = [];

  function getPatternsForMeter(m) {
    if (METER_PATTERNS[m]) return METER_PATTERNS[m];
    // Fallbacks por familia
    if (m === '1/4') return METER_PATTERNS['2/4'];
    if (m === '5/4' || m === '7/4') return METER_PATTERNS['4/4'];
    if (m === '3/8' || m === '9/8' || m === '12/8' || m === '15/8') return METER_PATTERNS['6/8'];
    return METER_PATTERNS['4/4'];
  }

  function patternToArrays(p) {
    return [p.kick.map(Boolean), p.snare.map(Boolean), p.hhc.map(Boolean), p.hho.map(Boolean)];
  }


  // Tempo names
  const TEMPOS = [
    [15,  39,  'Grave'],
    [40,  59,  'Largo'],
    [60,  65,  'Larghetto'],
    [66,  75,  'Adagio'],
    [76,  89,  'Andante'],
    [90,  104, 'Moderato'],
    [105, 114, 'Allegretto'],
    [115, 129, 'Allegro'],
    [130, 167, 'Vivace'],
    [168, 199, 'Presto'],
    [200, 300, 'Prestissimo']
  ];

  function getTempoName(b) {
    for (const [lo, hi, name] of TEMPOS) if (b >= lo && b <= hi) return name;
    return '';
  }

  // Compound meters (x/8 with numerator divisible by 3) count beats as groups of 3
  const COMPOUND_METERS = { '3/8':1, '6/8':2, '9/8':3, '12/8':4, '15/8':5 };

  function isCompound(m) { return m in COMPOUND_METERS; }

  function parseMeter(m) {
    if (isCompound(m)) return COMPOUND_METERS[m];
    const [n] = m.split('/').map(Number);
    return n;
  }

  // ── AUDIO ─────────────────────────────────────────────────────────────────
  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.value = -24;
      compressor.ratio.value = 4;
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 1.4;
      compressor.connect(masterGain);
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playClick(isAccent, isSubdiv, when, isMedium) {
    const ctx = getAudioCtx();
    const gainNode = ctx.createGain();
    gainNode.connect(compressor);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.connect(gainNode);
    let freq, duration, vol;
    if (isAccent)       { freq = 1800; duration = 0.12;  vol = volAccent; }
    else if (isMedium)  { freq = 1200; duration = 0.08;  vol = volClick * 0.85; }
    else if (isSubdiv)  { freq = 600;  duration = 0.025; vol = volClick * 0.5; }
    else                { freq = 1000; duration = 0.06;  vol = volClick; }
    osc.frequency.setValueAtTime(freq, when);
    gainNode.gain.setValueAtTime(0, when);
    gainNode.gain.linearRampToValueAtTime(vol, when + 0.0005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, when + duration);
    osc.start(when);
    osc.stop(when + duration + 0.01);
  }

  function playDrum(instIdx, vol, when) {
    const ctx = getAudioCtx();
    const gainNode = ctx.createGain();
    gainNode.connect(compressor);
    gainNode.gain.setValueAtTime(vol, when);

    if (instIdx === 0) { // KICK
      const osc = ctx.createOscillator();
      osc.connect(gainNode);
      osc.frequency.setValueAtTime(150, when);
      osc.frequency.exponentialRampToValueAtTime(45, when + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.001, when + 0.3);
      osc.start(when); osc.stop(when + 0.35);
    } else if (instIdx === 1) { // SNARE
      const noise = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      noise.buffer = buf;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass'; hp.frequency.value = 1000;
      noise.connect(hp); hp.connect(gainNode);
      gainNode.gain.exponentialRampToValueAtTime(0.001, when + 0.15);
      noise.start(when); noise.stop(when + 0.2);
    } else if (instIdx === 2) { // HH-C
      const noise = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      noise.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 8000; bp.Q.value = 1.5;
      noise.connect(bp); bp.connect(gainNode);
      gainNode.gain.exponentialRampToValueAtTime(0.001, when + 0.05);
      noise.start(when); noise.stop(when + 0.08);
    } else { // HH-O
      const noise = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      noise.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 6000; bp.Q.value = 0.8;
      noise.connect(bp); bp.connect(gainNode);
      gainNode.gain.exponentialRampToValueAtTime(0.001, when + 0.25);
      noise.start(when); noise.stop(when + 0.3);
    }
  }

  // ── SCHEDULER ─────────────────────────────────────────────────────────────
  let nextBeatTime = 0;
  let schedulerInterval = null;

  function _applyBpm(newBpm) {
    bpm = Math.max(15, Math.min(300, newBpm));
    updateBpmDisplay();
  }

  function schedule() {
    if (!audioCtx) return;
    const lookAhead = 0.1;
    const now = audioCtx.currentTime;
    // Compound meters: BPM refers to the dotted-quarter (group of 3 eighth notes)
    // Simple meters: BPM refers to the quarter note
    const beatInterval = isCompound(meter) ? (60 / bpm) : (60 / bpm);

    while (nextBeatTime < now + lookAhead) {
      const beat = currentBeat;
      const accentLevel = beatAccents[beat] || 'weak';
      const isAccent = accentLevel === 'strong';
      const isMedium = accentLevel === 'medium';
      const isMuted  = accentLevel === 'muted';

      if (!isMuted) {
        playClick(isAccent, false, nextBeatTime, isMedium);
      }

      // Manual subdivisions
      if (subdivision > 1) {
        const subInterval = beatInterval / subdivision;
        for (let s = 1; s < subdivision; s++) {
          const subTime = nextBeatTime + s * subInterval;
          playClick(false, true, subTime);
        }
      }

      // drum machine
      if (drEnabled) {
        // In compound meters each beat = 3 eighth notes; DR_STEPS covers the full measure
        const totalBeatsInMeasure = beatsPerMeasure;
        const stepsPerBeat = DR_STEPS / totalBeatsInMeasure;
        const startStep = Math.round(beat * stepsPerBeat) % DR_STEPS;
        // For compound meters the step duration is an eighth note (beatInterval/3)
        const stepDuration = isCompound(meter) ? beatInterval / 3 : beatInterval / stepsPerBeat;
        const totalStepsThisBeat = isCompound(meter) ? 3 : stepsPerBeat;
        for (let s = 0; s < totalStepsThisBeat; s++) {
          const stepIdx = (startStep + s) % DR_STEPS;
          const stepTime = nextBeatTime + s * stepDuration;
          DR_INSTS.forEach((_, i) => {
            if (drPattern[i][stepIdx]) playDrum(i, drVolumes[i], stepTime);
          });
        }
      }

      // schedule visual update
      const beatCapture = beat;
      const timeCapture = nextBeatTime;
      const delay = Math.max(0, (timeCapture - now) * 1000);
      const gen = _metGeneration;
      // capture dr step for highlight
      const drStepCapture = drEnabled ? Math.round(beat * (DR_STEPS / beatsPerMeasure)) % DR_STEPS : -1;
      setTimeout(() => {
        if (_metGeneration !== gen) return;
        visualBeat(beatCapture);
        totalBeats++;
        updateStats(beatCapture);
        // drum machine step highlight
        if (drEnabled && drStepCapture >= 0) {
          document.querySelectorAll('.dr-step').forEach(el => el.classList.remove('playing'));
          document.querySelectorAll(`.dr-step[data-step="${drStepCapture}"]`).forEach(el => el.classList.add('playing'));
        }
      }, delay);

      currentBeat = (currentBeat + 1) % beatsPerMeasure;
      if (currentBeat === 0) measureCount++;

      // practice mode
      if (practiceActive) {
        const pracMeasures = parseInt(document.getElementById('prac-measures').value) || 8;
        const pracBpmStart = parseInt(document.getElementById('prac-bpm-start').value) || 60;
        const pracBpmEnd = parseInt(document.getElementById('prac-bpm-end').value) || 120;
        practiceProgress = Math.min(measureCount / pracMeasures, 1);
        const newBpm = Math.round(pracBpmStart + (pracBpmEnd - pracBpmStart) * practiceProgress);
        if (newBpm !== bpm) _applyBpm(newBpm);
        setTimeout(() => {
          if (_domPracBar) _domPracBar.style.width = (practiceProgress * 100) + '%';
        }, delay);
        if (measureCount >= pracMeasures && currentBeat === 0) {
          setTimeout(() => { if (_metGeneration === gen) stopMet(); }, delay + 100);
        }
      }

      nextBeatTime += beatInterval;
    }
  }

  function startMet() {
    getAudioCtx();
    isPlaying = true;
    currentBeat = 0;
    if (!practiceActive) measureCount = 0;
    nextBeatTime = audioCtx.currentTime + 0.05;
    _metGeneration++;
    schedulerInterval = setInterval(schedule, 20);
    updatePlayBtn();
    animatePendulum();
  }

  function stopMet() {
    isPlaying = false;
    _metGeneration++;
    clearInterval(schedulerInterval);
    schedulerInterval = null;
    stopPendulum();
    updatePlayBtn();
    clearBeatDots();
    updateStats(null);
  }

  function togglePlay() {
    if (isPlaying) stopMet(); else startMet();
  }

  // ── PENDULUM ──────────────────────────────────────────────────────────────
  let pendRaf = null;
  let pendCycleStart = null;

  function animatePendulum() {
    if (pendRaf) cancelAnimationFrame(pendRaf);
    pendCycleStart = null;

    function frame(ts) {
      if (!isPlaying) return;
      const beatMs = (60 / bpm) * 1000;
      if (!pendCycleStart) pendCycleStart = ts;
      const elapsed = (ts - pendCycleStart) % (beatMs * 2);
      // Full swing cycle = 2 beats: left→right→left using sine
      const angle = 28 * Math.sin((elapsed / (beatMs * 2)) * Math.PI * 2);
      if (_domPendG) _domPendG.style.transform = `rotate(${angle}deg)`;
      pendRaf = requestAnimationFrame(frame);
    }
    pendRaf = requestAnimationFrame(frame);
  }

  function swingPendulum() {
    // No-op: pendulum now runs continuously, no per-beat restart needed
  }

  function stopPendulum() {
    if (pendRaf) { cancelAnimationFrame(pendRaf); pendRaf = null; }
    pendCycleStart = null;
    if (_domPendG) _domPendG.style.transform = 'rotate(0deg)';
    _pendulumDir = 1;
  }

  // ── VISUALS ───────────────────────────────────────────────────────────────
  function visualBeat(beat) {
    const dots = document.querySelectorAll('.beat-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === beat));
    swingPendulum();
    if (_domBpmNum) {
      _domBpmNum.classList.remove('beat-flash');
      void _domBpmNum.offsetWidth;
      _domBpmNum.classList.add('beat-flash');
    }
  }

  function clearBeatDots() {
    document.querySelectorAll('.beat-dot').forEach(d => d.classList.remove('active'));
  }

  function updateStats(beat) {
    if (_domStBeat) _domStBeat.textContent = beat !== null ? beat + 1 : '—';
    if (_domStMeasure) _domStMeasure.textContent = beat !== null ? measureCount + 1 : '—';
    if (_domStInterval) _domStInterval.textContent = isPlaying ? Math.round(60000 / bpm) : '—';
    if (_domStTotal) _domStTotal.textContent = totalBeats;
  }

  function updateBpmDisplay() {
    if (_domBpmNum) _domBpmNum.textContent = bpm;
    if (_domTempoName) _domTempoName.textContent = getTempoName(bpm);
    if (_domBpmSlider) _domBpmSlider.value = bpm;
    if (isPlaying) nextBeatTime = audioCtx ? audioCtx.currentTime + 0.05 : nextBeatTime;
  }

  function updatePlayBtn() {
    if (!_domPlayIcon) return;
    if (isPlaying) {
      _domPlayIcon.innerHTML = '<rect x="5" y="4" width="4" height="16" rx="1" fill="#fff"/><rect x="15" y="4" width="4" height="16" rx="1" fill="#fff"/>';
    } else {
      _domPlayIcon.innerHTML = '<polygon points="5,3 19,12 5,21" fill="#fff"/>';
    }
  }

  // beatAccents[i]: 'strong' | 'medium' | 'weak' | 'muted'
  let beatAccents = [];
  const ACCENT_CYCLE = ['strong', 'medium', 'weak', 'muted'];
  const ACCENT_LABELS = { strong: 'Fuerte', medium: 'Medio', weak: 'Débil', muted: 'Silencio' };

  function initAccents(n) {
    beatAccents = Array.from({length: n}, (_, i) => i === 0 ? 'strong' : 'weak');
  }

  function buildBeatDots() {
    const container = _domBeatDots;
    if (!container) return;
    if (beatAccents.length !== beatsPerMeasure) initAccents(beatsPerMeasure);
    container.innerHTML = '';
    container.style.paddingBottom = '0';
    for (let i = 0; i < beatsPerMeasure; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'beat-dot-wrap';

      const btn = document.createElement('div');
      btn.className = 'beat-dot';
      btn.dataset.beat = i;
      btn.dataset.accent = beatAccents[i];

      const num = document.createElement('div');
      num.className = 'beat-dot-num';
      num.textContent = i + 1;

      const lbl = document.createElement('div');
      lbl.className = 'dot-accent-label';
      lbl.textContent = ACCENT_LABELS[beatAccents[i]];

      btn.appendChild(num);
      btn.appendChild(lbl);
      wrap.appendChild(btn);

      wrap.addEventListener('click', () => {
        const cur = ACCENT_CYCLE.indexOf(beatAccents[i]);
        beatAccents[i] = ACCENT_CYCLE[(cur + 1) % ACCENT_CYCLE.length];
        btn.dataset.accent = beatAccents[i];
        lbl.textContent = ACCENT_LABELS[beatAccents[i]];
      });

      container.appendChild(wrap);
    }
  }

  function setMeter(m) {
    meter = m;
    beatsPerMeasure = parseMeter(m);
    mutedBeats = mutedBeats.filter(b => b < beatsPerMeasure);
    buildBeatDots();
    document.querySelectorAll('.meter-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.meter === m);
    });
    loadMeterPatterns(m);
    if (isPlaying) { stopMet(); startMet(); }
  }

  // ── TAP TEMPO ─────────────────────────────────────────────────────────────
  let tapResetTimeout = null;
  function tapTempo() {
    const now = performance.now();
    // Reset if more than 2s since last tap
    if (tapTimes.length > 0 && now - tapTimes[tapTimes.length - 1] > 2000) {
      tapTimes = [];
    }
    clearTimeout(tapResetTimeout);
    tapResetTimeout = setTimeout(() => { tapTimes = []; }, 2000);

    tapTimes.push(now);
    if (tapTimes.length > 5) tapTimes.shift();
    if (tapTimes.length >= 2) {
      const intervals = [];
      for (let i = 1; i < tapTimes.length; i++) intervals.push(tapTimes[i] - tapTimes[i-1]);
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const newBpm = Math.round(60000 / avg);
      _applyBpm(newBpm);
      if (isPlaying) { stopMet(); startMet(); }
    }
  }

  // ── DRUM MACHINE ──────────────────────────────────────────────────────────
  function buildDrPatternPills() {
    const container = document.getElementById('dr-patterns');
    if (!container) return;
    container.innerHTML = '';
    // Off pill
    const offPill = document.createElement('span');
    offPill.className = 'pill' + (currentPatternIdx === -1 ? ' active' : '');
    offPill.textContent = 'Off';
    offPill.addEventListener('click', () => setDrPattern(-1));
    container.appendChild(offPill);
    // Pattern pills for current meter
    currentMeterPatterns.forEach((p, i) => {
      const pill = document.createElement('span');
      pill.className = 'pill' + (currentPatternIdx === i ? ' active' : '');
      pill.textContent = p.name;
      pill.addEventListener('click', () => setDrPattern(i));
      container.appendChild(pill);
    });
    // Custom pill
    const customPill = document.createElement('span');
    const customIdx = currentMeterPatterns.length;
    customPill.className = 'pill' + (currentPatternIdx === customIdx ? ' active' : '');
    customPill.textContent = 'Custom';
    customPill.addEventListener('click', () => setDrPattern(customIdx));
    container.appendChild(customPill);
  }

  function buildDrumGrid() {
    const container = document.getElementById('dr-instruments');
    if (!container) return;
    container.innerHTML = '';
    DR_INSTS.forEach((name, instIdx) => {
      const row = document.createElement('div');
      row.className = 'dr-row';
      const label = document.createElement('span');
      label.className = 'dr-inst-label';
      label.textContent = name;
      row.appendChild(label);
      const steps = document.createElement('div');
      steps.className = 'dr-steps';
      for (let s = 0; s < DR_STEPS; s++) {
        const step = document.createElement('div');
        step.className = 'dr-step inst-' + name.toLowerCase().replace('-','') + (drPattern[instIdx][s] ? ' on' : '');
        step.dataset.inst = instIdx;
        step.dataset.step = s;
        step.addEventListener('click', () => {
          drPattern[instIdx][s] = !drPattern[instIdx][s];
          step.classList.toggle('on', drPattern[instIdx][s]);
          // Switch to custom if editing a preset
          const customIdx = currentMeterPatterns.length;
          if (currentPatternIdx !== customIdx) setDrPattern(customIdx, false);
        });
        steps.appendChild(step);
      }
      row.appendChild(steps);
      const vol = document.createElement('input');
      vol.type = 'range'; vol.className = 'dr-vol-slider';
      vol.min = 0; vol.max = 100; vol.value = Math.round(drVolumes[instIdx] * 100);
      vol.addEventListener('input', () => { drVolumes[instIdx] = vol.value / 100; });
      row.appendChild(vol);
      container.appendChild(row);
    });
  }

  function setDrPattern(idx, rebuild = true) {
    const customIdx = currentMeterPatterns.length;
    currentPatternIdx = idx;
    drEnabled = idx !== -1;
    if (idx === -1) {
      drPattern = DR_INSTS.map(() => new Array(DR_STEPS).fill(false));
    } else if (idx < currentMeterPatterns.length) {
      drPattern = patternToArrays(currentMeterPatterns[idx]);
    } else {
      // Custom — keep existing drPattern
    }
    buildDrPatternPills();
    if (rebuild) buildDrumGrid();
  }

  function loadMeterPatterns(m) {
    currentMeterPatterns = getPatternsForMeter(m);
    // Reset to Off when meter changes
    currentPatternIdx = -1;
    drEnabled = false;
    drPattern = DR_INSTS.map(() => new Array(DR_STEPS).fill(false));
    buildDrPatternPills();
    buildDrumGrid();
  }

  // ── LONG PRESS BPM ────────────────────────────────────────────────────────
  function setupBpmBtn(btn, delta) {
    let interval = null;
    let timeout = null;
    const start = () => {
      stop(); // limpiar cualquier estado anterior
      _applyBpm(bpm + delta);
      if (isPlaying) nextBeatTime = audioCtx ? audioCtx.currentTime + 0.05 : nextBeatTime;
      timeout = setTimeout(() => {
        interval = setInterval(() => {
          _applyBpm(bpm + delta);
          if (isPlaying) nextBeatTime = audioCtx ? audioCtx.currentTime + 0.05 : nextBeatTime;
        }, 80);
      }, 400);
    };
    const stop = () => {
      clearTimeout(timeout);
      clearInterval(interval);
      timeout = null;
      interval = null;
    };
    btn.addEventListener('mousedown', start);
    btn.addEventListener('mouseup', stop);
    btn.addEventListener('mouseleave', stop);
    btn.addEventListener('touchstart', e => { e.preventDefault(); start(); });
    btn.addEventListener('touchend', e => { e.preventDefault(); stop(); });
    btn.addEventListener('touchcancel', stop);
    // Safety net: si el dedo se levanta fuera del botón
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
  }

  // ── INIT ──────────────────────────────────────────────────────────────────
  function init() {
    _domBpmNum = document.getElementById('bpm-num');
    _domTempoName = document.getElementById('tempo-name');
    _domBpmSlider = document.getElementById('bpm-slider');
    _domBeatDots = document.getElementById('beat-dots');
    _domStBeat = document.getElementById('st-beat');
    _domStMeasure = document.getElementById('st-measure');
    _domStInterval = document.getElementById('st-ms');
    _domStTotal = document.getElementById('st-total');
    _domPlayIcon = document.getElementById('play-icon');
    _domPracBar = document.getElementById('prac-bar');
    _domPendG = document.getElementById('pendulum-g');
    _domPendBall = document.getElementById('pend-ball');

    // BPM slider
    _domBpmSlider.addEventListener('input', () => {
      _applyBpm(parseInt(_domBpmSlider.value));
      if (isPlaying) nextBeatTime = audioCtx ? audioCtx.currentTime + 0.05 : nextBeatTime;
    });

    // BPM buttons
    setupBpmBtn(document.getElementById('btn-minus'), -1);
    setupBpmBtn(document.getElementById('btn-plus'), 1);

    // Play
    document.getElementById('btn-play').addEventListener('click', togglePlay);

    // Tap
    document.getElementById('btn-tap').addEventListener('click', tapTempo);

    // Reset
    document.getElementById('btn-reset').addEventListener('click', () => {
      stopMet();
      bpm = 120; _applyBpm(120);
      measureCount = 0; totalBeats = 0;
      _pendulumDir = 1;
      updateStats(null);
    });

    // Meter pills
    document.querySelectorAll('.meter-pill').forEach(p => {
      p.addEventListener('click', () => setMeter(p.dataset.meter));
    });

    // Free meter editor (groups of 1, 2 or 3 eighth notes)
    let freeGroups = []; // e.g. [2,3,2] for 7/8
    const freeGroupsDisplay = document.getElementById('free-groups-display');

    function renderFreeGroups() {
      if (freeGroups.length === 0) {
        freeGroupsDisplay.innerHTML = '<span style="font-family:\'DM Mono\',monospace;font-size:11px;color:var(--muted);">Sin grupos</span>';
        return;
      }
      const total = freeGroups.reduce((a, b) => a + b, 0);
      freeGroupsDisplay.innerHTML = freeGroups.map((g, i) =>
        `<span style="
          padding:4px 10px;
          border-radius:6px;
          background:var(--bg3);
          border:1px solid ${g === 1 ? 'var(--muted)' : g === 2 ? 'var(--blue)' : 'var(--orange)'};
          font-family:'DM Mono',monospace;
          font-size:13px;
          color:${g === 1 ? 'var(--muted)' : g === 2 ? 'var(--blue)' : 'var(--orange)'};
        ">${g}</span>${i < freeGroups.length - 1 ? '<span style="color:var(--muted);font-family:DM Mono,monospace;font-size:12px;">+</span>' : ''}`
      ).join('') + `<span style="font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);margin-left:8px;">(${total}/8)</span>`;
    }

    document.getElementById('free-add1').addEventListener('click', () => { freeGroups.push(1); renderFreeGroups(); });
    document.getElementById('free-add2').addEventListener('click', () => { freeGroups.push(2); renderFreeGroups(); });
    document.getElementById('free-add3').addEventListener('click', () => { freeGroups.push(3); renderFreeGroups(); });
    document.getElementById('free-undo').addEventListener('click', () => { freeGroups.pop(); renderFreeGroups(); });
    document.getElementById('free-clear').addEventListener('click', () => { freeGroups = []; renderFreeGroups(); });

    document.getElementById('free-apply').addEventListener('click', () => {
      if (freeGroups.length === 0) return;
      document.querySelectorAll('.meter-pill').forEach(p => p.classList.remove('active'));
      beatsPerMeasure = freeGroups.length;
      meter = freeGroups.reduce((a,b)=>a+b,0) + '/8';
      mutedBeats = mutedBeats.filter(b => b < beatsPerMeasure);
      buildBeatDots();
      if (isPlaying) { stopMet(); startMet(); }
    });

    // Subdivisions
    document.querySelectorAll('.subdiv-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        subdivision = parseInt(btn.dataset.div);
        document.querySelectorAll('.subdiv-btn').forEach(b => b.classList.toggle('active', b === btn));
      });
    });

    // Volumes
    const volClickSlider = document.getElementById('vol-click');
    const volAccentSlider = document.getElementById('vol-accent');
    volClickSlider.addEventListener('input', () => {
      volClick = volClickSlider.value / 100;
      document.getElementById('vol-click-num').textContent = volClickSlider.value;
    });
    volAccentSlider.addEventListener('input', () => {
      volAccent = volAccentSlider.value / 100;
      document.getElementById('vol-accent-num').textContent = volAccentSlider.value;
    });

    // Practice
    document.getElementById('btn-prac').addEventListener('click', () => {
      practiceActive = !practiceActive;
      const btn = document.getElementById('btn-prac');
      btn.classList.toggle('active', practiceActive);
      btn.textContent = practiceActive ? 'DETENER ENSAYO' : 'INICIAR ENSAYO';
      if (practiceActive) {
        const s = parseInt(document.getElementById('prac-bpm-start').value) || 60;
        _applyBpm(s);
        practiceProgress = 0;
        if (_domPracBar) _domPracBar.style.width = '0%';
        measureCount = 0;
        if (!isPlaying) startMet();
      }
    });

    // Drum patterns — pills are built dynamically by loadMeterPatterns

    // Keyboard
    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT') return;
      if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
      if (e.code === 'KeyT') tapTempo();
      if (e.code === 'ArrowUp') {
        e.preventDefault();
        const delta = e.shiftKey && (e.metaKey || e.ctrlKey) ? 10 : e.shiftKey ? 5 : 1;
        _applyBpm(bpm + delta);
        if (isPlaying) nextBeatTime = audioCtx ? audioCtx.currentTime + 0.05 : nextBeatTime;
      }
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        const delta = e.shiftKey && (e.metaKey || e.ctrlKey) ? 10 : e.shiftKey ? 5 : 1;
        _applyBpm(bpm - delta);
        if (isPlaying) nextBeatTime = audioCtx ? audioCtx.currentTime + 0.05 : nextBeatTime;
      }
    });

    // Visibility change
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    });

    // Build initial state
    buildBeatDots();
    loadMeterPatterns(meter); // carga patrones del compás inicial (2/4)
    updateBpmDisplay();
    updateStats(null);
  }

  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();
})();
