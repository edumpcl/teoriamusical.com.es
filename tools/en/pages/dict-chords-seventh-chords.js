const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/seventh-chords/',
  esPath: '/diccionario-musical/acordes/acordes-de-septima/',
  title: 'Seventh Chords: The 5 Types, Symbols and Structure',
  description: 'Seventh chords explained: the 5 types (dominant, major, minor, half-diminished, diminished), their structure and symbols (C7, Cmaj7, Cm7…).',
  h1: 'Seventh Chords',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Chords', '/diccionario-musical/acordes/']],
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio'],
  body: `
<p>A <strong>seventh chord</strong> is a <strong>four-note chord</strong> made by adding one more third on top of a <a href="/diccionario-musical/acordes/acordes-triadas/">triad</a>: the top note lies a <strong>seventh</strong> above the root. Its notes are therefore the <strong>root, 3rd, 5th and 7th</strong>. Seventh chords add more color and tension than triads, and they are the basis of tonal harmony and, above all, of jazz.</p>

<h2>The 5 types of seventh chord</h2>

<p>Depending on the quality of the triad and of the seventh, there are five main types. All the examples are written on <strong>C</strong>:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>Structure</th><th>Symbol</th><th>On C</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Dominant seventh</strong></td><td>major triad + minor 7th</td><td>C7</td><td>C · E · G · B♭</td></tr>
    <tr><td><strong>Major seventh</strong></td><td>major triad + major 7th</td><td>Cmaj7 (CM7)</td><td>C · E · G · B</td></tr>
    <tr><td><strong>Minor seventh</strong></td><td>minor triad + minor 7th</td><td>Cm7</td><td>C · E♭ · G · B♭</td></tr>
    <tr><td><strong>Half-diminished seventh</strong> (leading-tone seventh)</td><td>diminished triad + minor 7th</td><td>Cm7♭5 (Cø7)</td><td>C · E♭ · G♭ · B♭</td></tr>
    <tr><td><strong>Diminished seventh</strong></td><td>diminished triad + diminished 7th</td><td>C°7 (Cdim7)</td><td>C · E♭ · G♭ · B double flat</td></tr>
  </tbody>
</table>
</div>

<h3>1. Dominant seventh (C7)</h3>
<p>A major triad with a minor seventh. It is the <strong>most important</strong> seventh chord: built on the fifth degree, its inner tritone "demands" to resolve to the tonic. It is the basis of the V–I cadence. You will find its details, inversions and symbols on the page about the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh chord</a>.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/acordes/septima-dominante.svg" width="220" height="122" alt="Dominant seventh chord on C on the staff: C, E, G, B flat" loading="lazy" decoding="async"><figcaption>Dominant seventh: C E G B♭ (C7).</figcaption></figure>

<h3>2. Major seventh (Cmaj7)</h3>
<p>A major triad with a major seventh. It has a sweet, stable sound and is very typical of jazz and bossa nova. It occurs diatonically on the I and IV degrees of the major scale. <strong>→ <a href="/diccionario-musical/acordes/acorde-de-septima-mayor/">Complete guide to the major seventh chord</a></strong>.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/acordes/septima-mayor.svg" width="220" height="122" alt="Major seventh chord on C on the staff: C, E, G, B" loading="lazy" decoding="async"><figcaption>Major seventh: C E G B (Cmaj7).</figcaption></figure>

<h3>3. Minor seventh (Cm7)</h3>
<p>A minor triad with a minor seventh. It has a soft, consonant sound and is the most common seventh chord on the ii, iii and vi degrees of the major scale. <strong>→ <a href="/diccionario-musical/acordes/acorde-de-septima-menor/">Complete guide to the minor seventh chord</a></strong>.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/acordes/septima-menor.svg" width="220" height="122" alt="Minor seventh chord on C on the staff: C, E flat, G, B flat" loading="lazy" decoding="async"><figcaption>Minor seventh: C E♭ G B♭ (Cm7).</figcaption></figure>

<h3>4. Half-diminished (leading-tone) seventh (Cm7♭5)</h3>
<p>A diminished triad with a minor seventh. It appears on the <strong>leading tone</strong> (UK: leading note), the VII degree of the major scale. It is tense, but less so than the fully diminished seventh, because its seventh is minor (not diminished). More details are on the page about the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">leading-tone seventh chord</a>.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/acordes/septima-sensible.svg" width="220" height="122" alt="Half-diminished seventh chord on C on the staff: C, E flat, G flat, B flat" loading="lazy" decoding="async"><figcaption>Half-diminished seventh: C E♭ G♭ B♭ (Cm7♭5).</figcaption></figure>

<h3>5. Diminished seventh (C°7)</h3>
<p>A diminished triad with a diminished seventh. It is <strong>symmetrical</strong> (all minor thirds) and the most tense of all; it is widely used as a passing chord and to modulate. You will find how it works and its inversions on the page about the <a href="/diccionario-musical/acordes/acorde-de-septima-disminuida/">diminished seventh chord</a>.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/acordes/septima-disminuida.svg" width="220" height="122" alt="Diminished seventh chord on C on the staff: C, E flat, G flat, B double flat" loading="lazy" decoding="async"><figcaption>Diminished seventh: C E♭ G♭ B𝄫 (C°7).</figcaption></figure>

<h2>How seventh chords are written</h2>

<p>Lead-sheet chord symbols start with the letter of the root and add a suffix for the type: <strong>7</strong> for the dominant seventh (C7), <strong>maj7</strong> for the major seventh (Cmaj7), <strong>m7</strong> for the minor seventh (Cm7), <strong>m7♭5</strong> or <strong>ø7</strong> for the half-diminished seventh and <strong>°7</strong> or <strong>dim7</strong> for the diminished seventh. (In Spanish-, French- and Italian-speaking countries the fixed-do names are used for the notes: C = Do, D = Re, E = Mi, F = Fa, G = Sol, A = La, B = Si.) To review the equivalences, see <a href="/diccionario-musical/nombres-de-las-notas-musicales/">note names</a>.</p>

<h2>Seventh chords of the major scale</h2>

<p>Stacking a seventh chord on each <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degree</a> of a major scale gives its diatonic seventh chords. In <strong>C major</strong>:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>Chord</th><th>Symbol</th><th>Type</th></tr>
  </thead>
  <tbody>
    <tr><td>I</td><td>C E G B</td><td>Cmaj7</td><td>Major seventh</td></tr>
    <tr><td>II</td><td>D F A C</td><td>Dm7</td><td>Minor seventh</td></tr>
    <tr><td>III</td><td>E G B D</td><td>Em7</td><td>Minor seventh</td></tr>
    <tr><td>IV</td><td>F A C E</td><td>Fmaj7</td><td>Major seventh</td></tr>
    <tr><td>V</td><td>G B D F</td><td>G7</td><td>Dominant seventh</td></tr>
    <tr><td>VI</td><td>A C E G</td><td>Am7</td><td>Minor seventh</td></tr>
    <tr><td>VII</td><td>B D F A</td><td>Bm7♭5</td><td>Half-diminished seventh</td></tr>
  </tbody>
</table>
</div>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a seventh chord?</div>
      <div class="tm-faq-a">A seventh chord is a four-note chord made by adding another third on top of a triad, so that the top note is a seventh above the root. Its notes are the root, 3rd, 5th and 7th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of seventh chords are there?</div>
      <div class="tm-faq-a">The five main types are: dominant seventh (C7), major seventh (Cmaj7), minor seventh (Cm7), half-diminished or leading-tone seventh (Cm7♭5) and diminished seventh (C°7). They differ in the quality of their triad and of their seventh.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the most important seventh chord?</div>
      <div class="tm-faq-a">The dominant seventh (V7). Built on the fifth degree, it contains the tritone between the leading tone and the subdominant, which creates maximum tension and calls for resolution to the tonic. It is the basis of the V–I cadence.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How are seventh chords written in chord symbols?</div>
      <div class="tm-faq-a">With the letter of the root and a suffix: C7 (dominant seventh), Cmaj7 or CM7 (major seventh), Cm7 (minor seventh), Cm7♭5 or Cø7 (half-diminished) and C°7 or Cdim7 (diminished).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the half-diminished and the diminished seventh?</div>
      <div class="tm-faq-a">Both have a diminished triad, but the seventh is different: the half-diminished chord has a minor seventh (C E♭ G♭ B♭), while the diminished chord has a diminished seventh (C E♭ G♭ B double flat). The diminished chord is symmetrical and even more tense.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
