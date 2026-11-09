const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/minor-seventh-chord/',
  esPath: '/diccionario-musical/acordes/acorde-de-septima-menor/',
  title: 'Minor Seventh Chord (Cm7): What It Is and How to Build It',
  description: 'The minor seventh chord (Cm7) is a minor triad plus a minor 7th: C–E♭–G–B♭. How it is built, its symbols, its sound and the scale degrees where it appears.',
  h1: 'Minor Seventh Chord',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Chords', '/diccionario-musical/acordes/']],
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>minor seventh chord</strong> (symbol <strong>Cm7</strong>) is a four-note chord: a <a href="/diccionario-musical/acordes/acorde-perfecto-menor/">minor triad</a> with a <strong>minor 7th</strong> added on top. Its sound is <strong>dark but soft and stable</strong> (it is not a chord of tension), and it is one of the most characteristic sounds of jazz, pop and bossa nova. It is one of the five <a href="/diccionario-musical/acordes/acordes-de-septima/">seventh chords</a>.</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/acordes/septima-menor.svg" width="220" height="122" alt="C minor seventh chord (Cm7) on the staff: C, E flat, G, B flat" loading="lazy" decoding="async">
<figcaption>Minor seventh chord on C (Cm7): <strong>C – E♭ – G – B♭</strong>.</figcaption>
</figure>

<h2>How to build a minor seventh chord</h2>
<p>Stack a minor triad (minor 3rd + perfect 5th) on the <strong>root</strong> and, above it, a <strong>minor 7th</strong>. With C as the root:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Note</th><th>Chord member</th><th>Interval above the root</th></tr></thead>
  <tbody>
    <tr><td>C</td><td>Root</td><td>—</td></tr>
    <tr><td>E♭</td><td>Third</td><td><a href="/diccionario-musical/intervalos/intervalos-musicales/">Minor 3rd</a></td></tr>
    <tr><td>G</td><td>Fifth</td><td>Perfect 5th</td></tr>
    <tr><td>B♭</td><td>Seventh</td><td>Minor 7th</td></tr>
  </tbody>
</table>
</div>
<p>It differs from the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh chord</a> in the <strong>third</strong> (minor instead of major), and from the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">half-diminished (leading-tone seventh) chord</a> in the <strong>fifth</strong> (perfect instead of diminished).</p>

<h2>Minor seventh chord symbols</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Chord</th><th>Symbol</th></tr></thead>
  <tbody>
    <tr><td>C minor seventh</td><td><strong>Cm7</strong> · C−7 · Cmin7</td></tr>
    <tr><td>D minor seventh</td><td>Dm7</td></tr>
    <tr><td>A minor seventh</td><td>Am7</td></tr>
  </tbody>
</table>
</div>

<h2>On which degrees does it appear?</h2>
<p>In the <a href="/diccionario-musical/tonalidades/escalas-mayores/">major scale</a>, the minor seventh chord is built on degrees <strong>ii, iii and vi</strong>. In C major they are <strong>Dm7 (ii), Em7 (iii) and Am7 (vi)</strong>. It is also the well-known <strong>ii</strong> chord in the jazz ii–V–I progression.</p>

<p><strong>A note on terminology:</strong> "minor seventh chord" is the name used with <strong>lead-sheet chord symbols and in jazz</strong>. In classical harmonic analysis this chord has no functional name of its own (unlike the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh</a> or the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">leading-tone seventh</a>): it is simply the diatonic seventh chord built on degree ii, iii or vi.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a minor seventh chord?</div>
      <div class="tm-faq-a">It is a four-note chord made of a minor triad plus a minor 7th. On C the notes are C–E♭–G–B♭. It is written Cm7 and has a dark but soft, stable sound, widely used in jazz and pop.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build a minor seventh chord?</div>
      <div class="tm-faq-a">Stack a minor 3rd, a perfect 5th and a minor 7th on the root. On C: C (root), E♭ (minor 3rd), G (perfect 5th) and B♭ (minor 7th).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a minor seventh and a dominant seventh?</div>
      <div class="tm-faq-a">They differ in the third: the minor seventh has a minor 3rd (E♭ on C) and sounds stable; the dominant seventh has a major 3rd (E) and creates tension. The perfect 5th and the minor 7th are the same in both.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">On which degrees does the minor seventh chord appear?</div>
      <div class="tm-faq-a">In the major scale, on degrees ii, iii and vi. In C major: Dm7, Em7 and Am7. It is the ii chord in the ii–V–I progression.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
