const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/blog/how-to-read-chord-symbols/',
  esPath: '/blog/como-leer-cifrado-de-acordes/',
  title: 'How to Read Chord Symbols (C, Am, G7, Cmaj7…)',
  description: 'Learn to read chord symbols and lead sheets: letters A–G, major and minor, seventh chords, sus2/sus4, slash chords (C/G) and a summary chart.',
  h1: 'How to Read Chord Symbols',
  crumbs: [['Blog', '/blog/']],
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio'],
  datePublished: '2026-06-17',
  dateModified: '2026-06-17',
  body: `
<p>When you look at the sheet music of a modern song, symbols like <strong>C, Am, G7 or Cmaj7</strong> appear above the staff (or on a lead sheet). These are <strong>chord symbols</strong>, a quick system for writing chords with letters and numbers. Here you will learn to read them from start to finish.</p>

<h2>The letters are the notes</h2>
<p>Chord symbols use the letter names of the <a href="/diccionario-musical/nombres-de-las-notas-musicales/">notes</a>: each letter is one note. If you learned the fixed-do names (Do, Re, Mi… used in Spanish-, French- and Italian-speaking countries), this is the equivalence:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th></tr></thead>
  <tbody><tr><td>La</td><td>Si</td><td>Do</td><td>Re</td><td>Mi</td><td>Fa</td><td>Sol</td></tr></tbody>
</table>
</div>
<p>So <strong>C</strong> is a chord whose root is C, <strong>G</strong> is one whose root is G, and so on. Sharps and flats are added with ♯ and ♭ (in plain text you will often see # and b): <strong>F♯</strong> is F sharp and <strong>B♭</strong> is B flat.</p>

<h2>The basic rule: a letter alone is major, “m” means minor</h2>
<p>A letter on its own means a <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">major chord</a>; with a lowercase <strong>m</strong> after it, the chord is <a href="/diccionario-musical/acordes/acorde-perfecto-menor/">minor</a>.</p>
<ul>
  <li><strong>C</strong> = C major (C–E–G)</li>
  <li><strong>Cm</strong> = C minor (C–E♭–G)</li>
  <li><strong>Am</strong> = A minor · <strong>G</strong> = G major</li>
</ul>
<div class="tm-img-grid-2">
  <figure class="tm-staff"><img src="/assets/img/notacion/acordes/blog-triada-mayor.svg" width="220" height="122" alt="C chord (C major) on the staff: C–E–G" loading="lazy" decoding="async"><figcaption>C = C major</figcaption></figure>
  <figure class="tm-staff"><img src="/assets/img/notacion/acordes/blog-triada-menor.svg" width="220" height="122" alt="Cm chord (C minor) on the staff: C–E flat–G" loading="lazy" decoding="async"><figcaption>Cm = C minor</figcaption></figure>
</div>
<p>You will also see <strong>Cmin</strong> or <strong>C−</strong> for minor. They all mean the same thing. A capital <strong>M</strong> is sometimes used for major (CM7 = Cmaj7), so pay attention to the case.</p>

<h2>Augmented and diminished</h2>
<ul>
  <li><strong>C+</strong> or <strong>Caug</strong> = <a href="/diccionario-musical/acordes/acorde-aumentado/">augmented chord</a> (C–E–G♯)</li>
  <li><strong>C°</strong> or <strong>Cdim</strong> = <a href="/diccionario-musical/acordes/acorde-disminuido/">diminished chord</a> (C–E♭–G♭)</li>
</ul>

<h2>The numbers: seventh chords</h2>
<p>A number adds one more note to the chord. The most common is 7, which on a major chord gives the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh chord</a>. These are the <a href="/diccionario-musical/acordes/acordes-de-septima/">five main seventh chords</a>:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Symbol</th><th>Chord</th><th>Notes (on C)</th></tr></thead>
  <tbody>
    <tr><td>C7</td><td><a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">Dominant seventh</a></td><td>C–E–G–B♭</td></tr>
    <tr><td>Cmaj7 · CΔ7</td><td><a href="/diccionario-musical/acordes/acorde-de-septima-mayor/">Major seventh</a></td><td>C–E–G–B</td></tr>
    <tr><td>Cm7</td><td><a href="/diccionario-musical/acordes/acorde-de-septima-menor/">Minor seventh</a></td><td>C–E♭–G–B♭</td></tr>
    <tr><td>Cm7♭5 · Cø</td><td><a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">Half-diminished seventh</a></td><td>C–E♭–G♭–B♭</td></tr>
    <tr><td>C°7 · Cdim7</td><td><a href="/diccionario-musical/acordes/acorde-de-septima-disminuida/">Diminished seventh</a></td><td>C–E♭–G♭–B♭♭ (sounds like A)</td></tr>
  </tbody>
</table>
</div>
<p>Note that a plain <strong>7</strong> always means a <em>minor</em> seventh above the root (B♭ above C). For a major seventh (B above C) the symbol must say <strong>maj7</strong>.</p>

<h2>Suspended and added notes</h2>
<ul>
  <li><strong>Csus4</strong>: the 3rd is replaced by the 4th (C–F–G); <strong>Csus2</strong> replaces it with the 2nd (C–D–G). A plain <strong>Csus</strong> usually means sus4.</li>
  <li><strong>C6</strong>: a major chord with an added 6th (C–E–G–A).</li>
  <li><strong>Cadd9</strong>: a major chord with an added 9th and no 7th (C–E–G–D).</li>
  <li><strong>C9, C11, C13</strong>: dominant seventh chords with higher extensions. C9 includes the 7th (C–E–G–B♭–D), unlike add9. With maj or m in front (Cmaj9, Cm9), the 7th is major or minor accordingly.</li>
  <li><strong>C5</strong> (<em>power chord</em>): only the root and the 5th, <strong>with no 3rd</strong> (C–G). Without a 3rd it is neither major nor minor; it is the signature chord of rock and distorted electric guitar.</li>
</ul>
<figure class="tm-staff"><img src="/assets/img/notacion/acordes/acorde-c5.svg" width="200" height="122" alt="C5 power chord on the staff: C and G, no third" loading="lazy" decoding="async"><figcaption>C5: only the root and the 5th (C–G).</figcaption></figure>

<h2>Slash chords (added bass note)</h2>
<p>A slash shows which note goes in the <strong>bass</strong>, which may not be the root. It is a way of writing <a href="/diccionario-musical/acordes/acordes-triadas/">inversions</a> in chord symbols.</p>
<ul>
  <li><strong>C/E</strong> = a C major chord with E in the bass (first inversion).</li>
  <li><strong>C/G</strong> = C major with G in the bass (second inversion).</li>
  <li><strong>D/F♯</strong> = D major with F♯ in the bass (first inversion).</li>
</ul>
<p>The bass note does not have to belong to the chord: <strong>C/D</strong>, for example, puts a D under a C major chord.</p>

<h2>Summary chart</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Symbol</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>C</td><td>Major</td></tr>
    <tr><td>m · min · −</td><td>Minor</td></tr>
    <tr><td>+ · aug</td><td>Augmented</td></tr>
    <tr><td>° · dim</td><td>Diminished</td></tr>
    <tr><td>7</td><td>Seventh (dominant)</td></tr>
    <tr><td>maj7 · Δ7</td><td>Major seventh</td></tr>
    <tr><td>ø · m7♭5</td><td>Half-diminished</td></tr>
    <tr><td>sus2 / sus4</td><td>Suspended (2nd / 4th)</td></tr>
    <tr><td>5</td><td>Power chord (no 3rd)</td></tr>
    <tr><td>6 · add9</td><td>Added note (6th / 9th)</td></tr>
    <tr><td>/X</td><td>That note X in the bass</td></tr>
  </tbody>
</table>
</div>

<h2>How to decode any chord in 4 steps</h2>
<p>When you meet a symbol you do not recognize, always read it in this order and you will not go wrong:</p>
<ol>
  <li><strong>The letter (and its accidental)</strong> gives you the <strong>root</strong>: C is C, B♭ is B flat.</li>
  <li><strong>A capital letter alone, or with “m”?</strong> This decides whether it is major or minor. Here you also look for <strong>+</strong> (augmented) or <strong>°</strong> (diminished).</li>
  <li><strong>Is there a number or “maj”?</strong> (7, maj7, 6, 9…) Add that note to the chord.</li>
  <li><strong>Is there a slash “/X”?</strong> That note goes in the <strong>bass</strong>.</li>
</ol>
<p>Example: <strong>Dm7/F</strong> → (1) D, (2) minor, (3) with a minor 7th, (4) with F in the bass. The reverse is also useful: what does <em>not</em> appear tells you something too. No “m” means major, and no number means a simple triad.</p>

<h2>An example</h2>
<p>The sequence <strong>C – Am – F – G7</strong> reads: C major, A minor, F major and G dominant seventh. It is one of the most widely used progressions in pop music. To understand why these chords fit together so well, review the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degrees</a> and the <a href="/diccionario-musical/cadencias/">cadences</a>.</p>

<p>With this you can already decode most lead sheets. If you want to learn how each chord is built, you will find all the detail in <a href="/diccionario-musical/acordes/">musical chords</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are chord symbols?</div>
      <div class="tm-faq-a">They are a system for writing chords with letters and numbers: each letter is a note (C, G…), a capital letter alone means a major chord, and added symbols (m, 7, sus, °, +) specify the type. They are widely used in guitar, piano and lead sheets.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the “m” mean in a chord like Am?</div>
      <div class="tm-faq-a">A lowercase m means the chord is minor. Am is A minor (A–C–E). Without the m, the letter alone is major: A would be A major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the 7 mean in a chord like G7?</div>
      <div class="tm-faq-a">The 7 adds a minor 7th to the major chord, forming the dominant seventh chord. G7 is G–B–D–F. Do not confuse it with maj7 (major seventh) or m7 (minor seventh).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does a slash chord like C/G mean?</div>
      <div class="tm-faq-a">The slash shows which note goes in the bass. C/G is a C major chord with G in the bass (a second inversion). The note after the slash does not change the chord, only which note is the lowest.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a power chord (C5)?</div>
      <div class="tm-faq-a">A power chord is written with a 5 (C5) and contains only the root and the fifth, with no third (C–G). Without a third it is neither major nor minor; it is the typical chord of rock and distorted electric guitar.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
