const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/',
  esPath: '/diccionario-musical/intervalos/',
  title: 'Musical Intervals: Complete Theory Guide',
  description: 'Musical intervals: what they are, how to measure them in half steps, types by number and quality, inversion, consonance and dissonance, with examples.',
  h1: 'Intervals',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>Musical intervals</strong> are the distance in pitch between two notes, measured in whole steps (UK: tones) and half steps (UK: semitones). They are the basic unit of harmony: scales, chords and melodies are built from them. This section gathers all the concepts: definition, classification by number and quality, consonance and dissonance, inversion, widening and narrowing.</p>

<h2>Interval concepts</h2>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/intervalos/intervalos-musicales/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♬</div>
    <div class="tm-card-dic-titulo">Musical Intervals</div>
    <div class="tm-card-dic-desc">Full classification: number, quality and kind of intervals.</div>
  </a>
  <a href="/diccionario-musical/intervalos/intervalos-armonicos-y-melodicos/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♪</div>
    <div class="tm-card-dic-titulo">Harmonic and Melodic</div>
    <div class="tm-card-dic-desc">Successive notes (melodic) versus simultaneous notes (harmonic), with examples.</div>
  </a>
  <a href="/diccionario-musical/intervalos/intervalos-conjuntos-y-disjuntos/" class="tm-card-dic">
    <div class="tm-card-dic-icono">↗</div>
    <div class="tm-card-dic-titulo">Conjunct and Disjunct</div>
    <div class="tm-card-dic-desc">Adjacent notes (2nd) versus leaps (3rd or more) and melodic motion.</div>
  </a>
  <a href="/diccionario-musical/intervalos/intervalos-simples-y-compuestos/" class="tm-card-dic">
    <div class="tm-card-dic-icono">↕</div>
    <div class="tm-card-dic-titulo">Simple and Compound</div>
    <div class="tm-card-dic-desc">Within the octave (simple) versus larger than an octave (compound).</div>
  </a>
  <a href="/diccionario-musical/intervalos/tono-y-semitono/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄻</div>
    <div class="tm-card-dic-titulo">Whole Step and Half Step</div>
    <div class="tm-card-dic-desc">The two basic units of distance between scale notes.</div>
  </a>
  <a href="/diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♯♭</div>
    <div class="tm-card-dic-titulo">Diatonic and Chromatic Half Step</div>
    <div class="tm-card-dic-desc">The difference between half steps with different letter names and with the same letter name.</div>
  </a>
  <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/" class="tm-card-dic">
    <div class="tm-card-dic-icono">=</div>
    <div class="tm-card-dic-titulo">Unison and Enharmonic Notes</div>
    <div class="tm-card-dic-desc">Notes with the same sound but a different name on the staff.</div>
  </a>
  <a href="/diccionario-musical/intervalos/inversion/" class="tm-card-dic">
    <div class="tm-card-dic-icono">↩</div>
    <div class="tm-card-dic-titulo">Inversion of Intervals</div>
    <div class="tm-card-dic-desc">The rule of 9 and how quality changes when an interval is inverted.</div>
  </a>
  <a href="/diccionario-musical/intervalos/ampliacion-reduccion-de-intervalos/" class="tm-card-dic">
    <div class="tm-card-dic-icono">↔</div>
    <div class="tm-card-dic-titulo">Widening and Narrowing</div>
    <div class="tm-card-dic-desc">How moving one note by an octave makes an interval wider or narrower.</div>
  </a>
  <a href="/diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/" class="tm-card-dic">
    <div class="tm-card-dic-icono">⚖</div>
    <div class="tm-card-dic-titulo">Consonant and Dissonant</div>
    <div class="tm-card-dic-desc">Intervals that rest or that create harmonic tension.</div>
  </a>
</div>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is a musical interval?</div>
    <div class="tm-faq-a">A musical interval is the distance in pitch between two notes, measured in whole steps and half steps. It is the basic unit of harmony: scales, chords and melodies are built from intervals.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How are intervals classified?</div>
    <div class="tm-faq-a">Intervals are classified by number (how many letter names they span: 2nd, 3rd, 4th, 5th, 6th, 7th or octave) and by quality (perfect, major, minor, augmented or diminished). They are also divided into simple and compound intervals.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the difference between a harmonic and a melodic interval?</div>
    <div class="tm-faq-a">A harmonic interval is formed when the two notes sound at the same time. A melodic interval occurs when the notes sound one after the other, forming a sequence.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How do you invert an interval?</div>
    <div class="tm-faq-a">To invert an interval, move the lower note up an octave (or the upper note down an octave). The number changes: an interval and its inversion always add up to 9. The quality changes too: major becomes minor, augmented becomes diminished, and perfect stays perfect.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What are consonant and dissonant intervals?</div>
    <div class="tm-faq-a">Consonant intervals sound stable and do not need to resolve: unison, octave, perfect 5th, and major and minor 3rds and 6ths. Dissonant intervals create tension and ask to resolve: 2nds, 7ths and the tritone (augmented 4th / diminished 5th). The perfect 4th is a special case: consonant in a melody and often treated as dissonant in harmony.</div>
  </div>
</div>
</div>
</div>
</section>
`,
});
