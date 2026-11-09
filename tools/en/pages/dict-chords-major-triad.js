const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/major-triad/',
  esPath: '/diccionario-musical/acordes/acorde-perfecto-mayor/',
  title: 'Major Chord (Major Triad): How to Build It and Symbol',
  description: 'The major chord is a triad with a major 3rd and a perfect 5th (C–E–G), with a bright sound. How it is built, its symbol and the degrees where it appears.',
  h1: 'Major Chord (Major Triad)',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Chords', '/diccionario-musical/acordes/']],
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio'],
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
