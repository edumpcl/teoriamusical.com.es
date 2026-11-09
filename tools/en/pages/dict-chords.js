const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/',
  esPath: '/diccionario-musical/acordes/',
  title: 'Musical Chords: Types, Formation and Function',
  description: 'Musical chords explained: triads (major, minor, augmented, diminished) and seventh chords. How they are built, their symbols and their harmonic function.',
  h1: 'Chords',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  body: `
<p>A <strong>chord</strong> is a group of three or more notes sounded together. Music students first learn the four triads (major, minor, augmented and diminished) and then the most important seventh chords: dominant seventh, leading-tone seventh (half-diminished) and diminished seventh. Each page below shows how the chord is built, its intervals and its symbols.</p>

<h2>Types of chords</h2>

<h3>Triads</h3>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/acordes/acordes-triadas/" class="tm-card-dic">
    <div class="tm-card-dic-icono">🎵</div>
    <div class="tm-card-dic-titulo">Triads</div>
    <div class="tm-card-dic-desc">Major, minor, augmented and diminished: the four three-note chords.</div>
  </a>
  <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/" class="tm-card-dic">
    <div class="tm-card-dic-icono">M</div>
    <div class="tm-card-dic-titulo">Major Triad</div>
    <div class="tm-card-dic-desc">Major 3rd + perfect 5th. The most stable chord, with a bright sound (C–E–G).</div>
  </a>
  <a href="/diccionario-musical/acordes/acorde-perfecto-menor/" class="tm-card-dic">
    <div class="tm-card-dic-icono">m</div>
    <div class="tm-card-dic-titulo">Minor Triad</div>
    <div class="tm-card-dic-desc">Minor 3rd + perfect 5th. A dark or melancholy sound (C–E♭–G).</div>
  </a>
  <a href="/diccionario-musical/acordes/acorde-aumentado/" class="tm-card-dic">
    <div class="tm-card-dic-icono">+</div>
    <div class="tm-card-dic-titulo">Augmented Triad</div>
    <div class="tm-card-dic-desc">Major 3rd + augmented 5th. Tense and unstable (C–E–G♯).</div>
  </a>
  <a href="/diccionario-musical/acordes/acorde-disminuido/" class="tm-card-dic">
    <div class="tm-card-dic-icono">°</div>
    <div class="tm-card-dic-titulo">Diminished Triad</div>
    <div class="tm-card-dic-desc">Minor 3rd + diminished 5th. Tension that wants to resolve (C–E♭–G♭).</div>
  </a>
</div>

<h3>Seventh chords</h3>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/acordes/acordes-de-septima/" class="tm-card-dic">
    <div class="tm-card-dic-icono">7</div>
    <div class="tm-card-dic-titulo">Seventh Chords</div>
    <div class="tm-card-dic-desc">The five types (dominant, major, minor, half-diminished and diminished), their structure and symbols.</div>
  </a>
  <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♭</div>
    <div class="tm-card-dic-titulo">Dominant Seventh</div>
    <div class="tm-card-dic-desc">The chord of the authentic cadence V7–I. Tension and resolution.</div>
  </a>
  <a href="/diccionario-musical/acordes/acorde-de-septima-mayor/" class="tm-card-dic">
    <div class="tm-card-dic-icono">△</div>
    <div class="tm-card-dic-titulo">Major Seventh</div>
    <div class="tm-card-dic-desc">Major triad + major 7th (Cmaj7). A bright sound, on scale degrees I and IV.</div>
  </a>
  <a href="/diccionario-musical/acordes/acorde-de-septima-menor/" class="tm-card-dic">
    <div class="tm-card-dic-icono">m7</div>
    <div class="tm-card-dic-titulo">Minor Seventh</div>
    <div class="tm-card-dic-desc">Minor triad + minor 7th (Cm7). A soft sound, on degrees ii, iii and vi.</div>
  </a>
  <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/" class="tm-card-dic">
    <div class="tm-card-dic-icono">ø</div>
    <div class="tm-card-dic-titulo">Leading-Tone Seventh</div>
    <div class="tm-card-dic-desc">The half-diminished chord: a diminished triad with a minor 7th. It resolves to the tonic.</div>
  </a>
  <a href="/diccionario-musical/acordes/acorde-de-septima-disminuida/" class="tm-card-dic">
    <div class="tm-card-dic-icono">°</div>
    <div class="tm-card-dic-titulo">Diminished Seventh</div>
    <div class="tm-card-dic-desc">The most tense of them all: four symmetrical notes stacked in minor thirds.</div>
  </a>
</div>

<h2 id="h-symbols">Intervals and symbols for each chord type</h2>

<p>The table below sums up the intervals and the usual symbols of the chords studied in this section. Lead-sheet chord symbols (letter names) are used in jazz and popular music; Roman numerals are used in harmonic analysis.</p>

<p>To practice them as a game, try <a href="/juegos/teoria/bolos/">Bowling</a>, where you recognize written triads, and <a href="/juegos/teoria/billar/">Pool</a>, where you build them yourself.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Chord</th><th>Intervals above the root</th><th>Lead-sheet symbol</th><th>Roman numeral (in C)</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Major triad</strong></td><td>Major 3rd + perfect 5th</td><td>C</td><td>I</td></tr>
    <tr><td><strong>Minor triad</strong></td><td>Minor 3rd + perfect 5th</td><td>Cm / C-</td><td>i</td></tr>
    <tr><td><strong>Augmented triad</strong></td><td>Major 3rd + augmented 5th</td><td>C+ / Caug</td><td>III+ (in A minor)</td></tr>
    <tr><td><strong>Diminished triad</strong></td><td>Minor 3rd + diminished 5th</td><td>C° / Cdim</td><td>vii°</td></tr>
    <tr><td><strong>Dominant seventh</strong></td><td>Major 3rd + perfect 5th + minor 7th</td><td>G7</td><td>V7</td></tr>
    <tr><td><strong>Leading-tone seventh</strong> (half-diminished, viiø7)</td><td>Minor 3rd + diminished 5th + minor 7th</td><td>Bø / Bm7♭5</td><td>viiø7</td></tr>
    <tr><td><strong>Diminished seventh</strong> (vii°7)</td><td>Minor 3rd + diminished 5th + diminished 7th</td><td>G♯° / G♯dim7</td><td>vii°7</td></tr>
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
    <div class="tm-faq-q">What is a musical chord?</div>
    <div class="tm-faq-a">A chord is a group of three or more notes sounded at the same time. The most basic type is the triad, made of three notes stacked in thirds.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How many types of triads are there?</div>
    <div class="tm-faq-a">There are four: major, minor, augmented and diminished. They differ in the size of the third (major or minor) and of the fifth (perfect, augmented or diminished).</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is a seventh chord?</div>
    <div class="tm-faq-a">A seventh chord adds a fourth note to a triad, a seventh above the root. The most important ones are the dominant seventh (V7), the leading-tone (half-diminished) seventh and the diminished seventh.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is a chord inversion?</div>
    <div class="tm-faq-a">A chord is in root position when its lowest note is the root. In first inversion the lowest note is the third; in second inversion it is the fifth (and in third inversion of a seventh chord, the seventh). Inversions change the color of the chord without changing its notes.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the harmonic function of a chord?</div>
    <div class="tm-faq-a">Harmonic function describes the role of a chord within a key: tonic (I), subdominant (IV) or dominant (V). The V7–I authentic cadence is the strongest move in tonal harmony, because the dominant builds tension that is released when it reaches the tonic.</div>
  </div>
</div>
</div>
</div>
</section>
`,
});
