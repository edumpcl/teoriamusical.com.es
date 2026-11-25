const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/major-triad/',
  esPath: '/diccionario-musical/acordes/acorde-perfecto-mayor/',
  title: 'Major Chord (Major Triad): How to Build It and Symbol',
  description: 'The major chord is a triad with a major 3rd and a perfect 5th (C–E–G), with a bright sound. How it is built, its symbol and the degrees where it appears.',
  h1: 'Major Chord (Major Triad)',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Chords', '/diccionario-musical/acordes/']],
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio', 'tm-mei', 'tm-notacion', 'explorador-septimas-engine'],
  body: `
<p>The <strong>major chord</strong> (major triad) is the most stable and recognizable <a href="/diccionario-musical/acordes/acordes-triadas/">triad</a> in tonal music. It is built with a <strong>major 3rd</strong> and a <strong>perfect 5th</strong> above the root, and its sound is <strong>bright, open and happy</strong>. It is one of the <a href="/diccionario-musical/acordes/acordes-triadas/">four types of triad</a>, together with the <a href="/diccionario-musical/acordes/acorde-perfecto-menor/">minor</a>, the <a href="/diccionario-musical/acordes/acorde-aumentado/">augmented</a> and the <a href="/diccionario-musical/acordes/acorde-disminuido/">diminished</a> triads. (Spanish textbooks call it the "acorde perfecto mayor", the "perfect major chord".)</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/acordes/triada-mayor.svg" width="220" height="122" alt="C major chord on the staff: C, E and G" loading="lazy" decoding="async">
<figcaption>C major chord: <strong>C – E – G</strong>.</figcaption>
</figure>

<h2>How to build a major chord</h2>
<p>Start from the <strong>root</strong>. Stack a <strong>major 3rd</strong> (2 whole steps; UK: tones) and, on top of it, a <strong>minor 3rd</strong> (1½ whole steps). The result is a <strong>perfect 5th</strong> between the lowest and the highest note. With C as the root:</p>

<p>That major 3rd above the tonic is what makes a melody sound major. To learn to recognize it by ear, try the listening exercise <a href="/ejercicios/auditivos/mayor-o-menor/">Major or minor?</a></p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Note</th><th>Chord member</th><th>Interval above the root</th></tr>
  </thead>
  <tbody>
    <tr><td>C</td><td>Root</td><td>—</td></tr>
    <tr><td>E</td><td>Third</td><td><a href="/diccionario-musical/intervalos/intervalos-musicales/">Major 3rd</a> (2 whole steps)</td></tr>
    <tr><td>G</td><td>Fifth</td><td>Perfect 5th (3½ whole steps)</td></tr>
  </tbody>
</table>
</div>

<p>The key to its character is the <strong>major 3rd</strong>: it is what distinguishes the major chord from the <a href="/diccionario-musical/acordes/acorde-perfecto-menor/">minor</a> one, which has a minor 3rd. The perfect 5th, shared by both, gives stability.</p>

<h2>Explore the major chord on any note</h2>
<p>Choose the root and the position to see how it is written on the staff: each note has the color of its function (root, 3rd and 5th) and you can hear it as a block chord or as an arpeggio.</p>
<div class="tm-xs" data-familia="triada" data-tipo="M" data-fijo></div>

<h2>Major chord symbol</h2>
<p>In lead-sheet chord symbols, the major chord is written simply with the <strong>letter of its root</strong>, with no added symbol:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Chord</th><th>Symbol</th></tr>
  </thead>
  <tbody>
    <tr><td>C major</td><td><strong>C</strong> (sometimes CM or Cmaj)</td></tr>
    <tr><td>G major</td><td>G</td></tr>
    <tr><td>D major</td><td>D</td></tr>
    <tr><td>F major</td><td>F</td></tr>
  </tbody>
</table>
</div>

<h2>The major chords on every note</h2>
<p>Every major chord is built the same way (major 3rd and perfect 5th above the root); only the starting note changes. This table lists the 14 most common ones with their chord symbol and correctly spelled notes. Chords that start on an altered note are spelled with sharps or flats according to the root: <strong>C♯</strong> and <strong>D♭</strong>, or <strong>F♯</strong> and <strong>G♭</strong>, sound the same but are written differently.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Symbol</th><th>Chord</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td><strong>C</strong></td><td>C major</td><td>C – E – G</td></tr>
    <tr><td><strong>C♯</strong></td><td>C♯ major</td><td>C♯ – E♯ – G♯</td></tr>
    <tr><td><strong>D♭</strong></td><td>D♭ major</td><td>D♭ – F – A♭</td></tr>
    <tr><td><strong>D</strong></td><td>D major</td><td>D – F♯ – A</td></tr>
    <tr><td><strong>E♭</strong></td><td>E♭ major</td><td>E♭ – G – B♭</td></tr>
    <tr><td><strong>E</strong></td><td>E major</td><td>E – G♯ – B</td></tr>
    <tr><td><strong>F</strong></td><td>F major</td><td>F – A – C</td></tr>
    <tr><td><strong>F♯</strong></td><td>F♯ major</td><td>F♯ – A♯ – C♯</td></tr>
    <tr><td><strong>G♭</strong></td><td>G♭ major</td><td>G♭ – B♭ – D♭</td></tr>
    <tr><td><strong>G</strong></td><td>G major</td><td>G – B – D</td></tr>
    <tr><td><strong>A♭</strong></td><td>A♭ major</td><td>A♭ – C – E♭</td></tr>
    <tr><td><strong>A</strong></td><td>A major</td><td>A – C♯ – E</td></tr>
    <tr><td><strong>B♭</strong></td><td>B♭ major</td><td>B♭ – D – F</td></tr>
    <tr><td><strong>B</strong></td><td>B major</td><td>B – D♯ – F♯</td></tr>
  </tbody>
</table>
</div>

<h2>On which degrees does it appear?</h2>
<p>In the <a href="/diccionario-musical/tonalidades/escalas-mayores/">major scale</a>, major triads are built on the <strong>main degrees</strong>: I (tonic), IV (subdominant) and V (dominant). In C major they are <strong>C (I), F (IV) and G (V)</strong>. These three chords define and support the key; much of the repertoire can be harmonized with them alone. To see how each degree is named, see the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degrees</a>.</p>

<p>If you add a minor 7th above a major triad, you get the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh chord</a>, the chord of tension and resolution.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a major chord?</div>
      <div class="tm-faq-a">A major chord (major triad) is made of a major 3rd and a perfect 5th above the root. On C the notes are C–E–G. It is the most stable chord in tonal music, with a bright, happy sound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build a major chord?</div>
      <div class="tm-faq-a">Stack a major 3rd (2 whole steps) on the root and a minor 3rd (1½ whole steps) on top of it. This gives a perfect 5th between the lowest and highest note. On C: C to E is a major 3rd, E to G is a minor 3rd, and C to G is a perfect 5th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is a major chord written as a symbol?</div>
      <div class="tm-faq-a">Just the letter of the root: C for C major, G for G major, and so on. "M" or "maj" is sometimes added (CM, Cmaj), but it is not needed.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">On which scale degrees does the major chord appear?</div>
      <div class="tm-faq-a">In the major scale, major triads are built on degrees I (tonic), IV (subdominant) and V (dominant). That is why these chords define the key.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
