const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/major-seventh-chord/',
  esPath: '/diccionario-musical/acordes/acorde-de-septima-mayor/',
  title: 'Major Seventh Chord (Cmaj7): What It Is and How to Build It',
  description: 'The major seventh chord (Cmaj7) is a major triad plus a major 7th: C–E–G–B. How it is built, its symbols, its bright sound and where it appears.',
  h1: 'Major Seventh Chord',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Chords', '/diccionario-musical/acordes/']],
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>major seventh chord</strong> (symbol <strong>Cmaj7</strong>) is a four-note chord: a <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">major triad</a> with a <strong>major 7th</strong> added on top. Its sound is <strong>bright, sweet and "floating"</strong>, very typical of jazz, bossa nova and pop. It is one of the five <a href="/diccionario-musical/acordes/acordes-de-septima/">seventh chords</a>.</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/acordes/septima-mayor.svg" width="220" height="122" alt="C major seventh chord (Cmaj7) on the staff: C, E, G, B" loading="lazy" decoding="async">
<figcaption>Major seventh chord on C (Cmaj7): <strong>C – E – G – B</strong>.</figcaption>
</figure>

<h2>How to build a major seventh chord</h2>
<p>Stack a major triad (major 3rd + perfect 5th) on the <strong>root</strong> and, above it, a <strong>major 7th</strong>. With C as the root:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Note</th><th>Chord member</th><th>Interval above the root</th></tr></thead>
  <tbody>
    <tr><td>C</td><td>Root</td><td>—</td></tr>
    <tr><td>E</td><td>Third</td><td><a href="/diccionario-musical/intervalos/intervalos-musicales/">Major 3rd</a></td></tr>
    <tr><td>G</td><td>Fifth</td><td>Perfect 5th</td></tr>
    <tr><td>B</td><td>Seventh</td><td>Major 7th</td></tr>
  </tbody>
</table>
</div>
<p>The key to its color is the <strong>major 7th</strong> (C–B), only a half step (UK: semitone) below the octave. This sets it apart from the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh chord</a>, which has a <em>minor</em> 7th (B♭) and sounds tense. The major seventh, in contrast, is stable and bright.</p>

<h2>Major seventh chord symbols</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Chord</th><th>Symbol</th></tr></thead>
  <tbody>
    <tr><td>C major seventh</td><td><strong>Cmaj7</strong> · CM7 · C△7 · Cma7</td></tr>
    <tr><td>G major seventh</td><td>Gmaj7</td></tr>
    <tr><td>F major seventh</td><td>Fmaj7</td></tr>
  </tbody>
</table>
</div>

<h2>On which degrees does it appear?</h2>
<p>In the <a href="/diccionario-musical/tonalidades/escalas-mayores/">major scale</a>, the major seventh chord is built on degrees <strong>I and IV</strong>. In C major they are <strong>Cmaj7 (I)</strong> and <strong>Fmaj7 (IV)</strong>.</p>

<p><strong>A note on terminology:</strong> "major seventh chord" is the name used with <strong>lead-sheet chord symbols and in jazz</strong>. In classical harmonic analysis this chord is simply the seventh chord built on degree I or IV, with no functional name of its own (unlike the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh</a> or the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">leading-tone seventh</a>).</p>
<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a major seventh chord?</div>
      <div class="tm-faq-a">It is a four-note chord made of a major triad plus a major 7th. On C the notes are C–E–G–B. It is written Cmaj7 and has a stable, bright, sweet sound, widely used in jazz and pop.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build a major seventh chord?</div>
      <div class="tm-faq-a">Stack a major 3rd, a perfect 5th and a major 7th on the root. On C: C (root), E (major 3rd), G (perfect 5th) and B (major 7th).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a major seventh and a dominant seventh?</div>
      <div class="tm-faq-a">Only the seventh changes. The major seventh has a major 7th (B on C) and sounds stable and bright; the dominant seventh has a minor 7th (B♭) that creates tension and asks to resolve. The major triad is the same in both.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is a major seventh chord written as a symbol?</div>
      <div class="tm-faq-a">With the root letter and "maj7", "M7" or the symbol "△7": Cmaj7 for C, Gmaj7 for G, and so on.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
