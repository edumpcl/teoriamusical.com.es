const dictionaryPage = require('../dictionary-page');
const fig3 = (dir, items) => '<div class="tm-img-grid-3">\n' + items.map(([f, w, h, alt]) => `<figure><img src="/assets/img/notacion/acordes/${f}.svg" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async"></figure>`).join('\n') + '\n</div>';
const figSm = (f, h, alt) => `<figure class="fig-sm">\n<img src="/assets/img/notacion/acordes/${f}.svg" width="220" height="${h}" alt="${alt}" loading="lazy" decoding="async">\n</figure>`;

module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/triads/',
  esPath: '/diccionario-musical/acordes/acordes-triadas/',
  title: 'Triads: The 4 Types, Inversions and Figured Bass',
  description: 'Triads explained: major, minor, augmented and diminished, their inversions, the triads of the major and natural minor scales and figured bass.',
  h1: 'Triads',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Chords', '/diccionario-musical/acordes/']],
  articleClass: 'tm-article tm-article--wide',
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio'],
  body: `
<p>Triads are three-note chords built from stacked thirds. This page presents the four types in root position, their inversions and their figured-bass numerals. To review intervals first, see the page on <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>
${figSm('ejemplo-triada', 122, 'Example of a triad on the staff: C, E and G')}
<p>The four types in root position come first, followed by the inversions and the figured bass.</p>

<h2>What is root position?</h2>
<p>Root position is the arrangement in which the lowest note (the bass) is the root, with the third and the fifth above it. When the chord is not in this arrangement, it is in one of the inversions explained below.</p>

<h2>The four types of triad in root position</h2>
<p>Depending on the distances between the notes, a triad can be:</p>

<h3>Diminished (diminished 5th)</h3>
<p>From the root: minor 3rd + diminished 5th. <strong>→ <a href="/diccionario-musical/acordes/acorde-disminuido/">Complete guide to the diminished triad</a></strong>.</p>
${fig3('', [
  ['disminuida-acorde', 220, 122, 'Diminished triad in root position: C, E flat and G flat'],
  ['disminuida-quinta', 220, 122, 'Diminished 5th: C and G flat'],
  ['disminuida-tercera', 220, 122, 'minor 3rd: C and E flat'],
])}
<p>Adding a seventh to this diminished triad gives two fundamental four-note chords of the repertoire: the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">half-diminished (leading-tone) seventh chord</a> (with a minor seventh, belonging to the major mode) and the <a href="/diccionario-musical/acordes/acorde-de-septima-disminuida/">diminished seventh chord</a> (with a diminished seventh, belonging to the harmonic minor mode).</p>

<h3>Minor (perfect minor)</h3>
<p>From the root: minor 3rd + perfect 5th. <strong>→ <a href="/diccionario-musical/acordes/acorde-perfecto-menor/">Complete guide to the minor triad</a></strong>.</p>
${fig3('', [
  ['menor-acorde', 220, 122, 'Minor triad in root position: C, E flat and G'],
  ['menor-quinta', 220, 122, 'Perfect 5th: C and G'],
  ['menor-tercera', 220, 122, 'minor 3rd: C and E flat'],
])}

<h3>Major (perfect major)</h3>
<p>From the root: major 3rd + perfect 5th. <strong>→ <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">Complete guide to the major triad</a></strong>.</p>
${fig3('', [
  ['mayor-acorde', 220, 122, 'Major triad in root position: C, E and G'],
  ['mayor-quinta', 220, 122, 'Perfect 5th: C and G'],
  ['mayor-tercera', 220, 122, 'Major 3rd: C and E'],
])}

<h3>Augmented (augmented 5th)</h3>
<p>From the root: major 3rd + augmented 5th. <strong>→ <a href="/diccionario-musical/acordes/acorde-aumentado/">Complete guide to the augmented triad</a></strong>.</p>
${fig3('', [
  ['aumentada-acorde', 220, 122, 'Augmented triad in root position: C, E and G sharp'],
  ['aumentada-quinta', 220, 122, 'Augmented 5th: C and G sharp'],
  ['aumentada-tercera', 220, 122, 'Major 3rd: C and E'],
])}

<h2>Summary of the four types</h2>
<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Type</th><th>3rd</th><th>5th</th><th>Symbol on C</th><th>Example on C</th></tr>
  </thead>
  <tbody>
    <tr><td>Major</td><td>Major (4 half steps)</td><td>Perfect (7 half steps)</td><td>C</td><td>C–E–G</td></tr>
    <tr><td>Minor</td><td>minor (3 half steps)</td><td>Perfect (7 half steps)</td><td>Cm</td><td>C–E♭–G</td></tr>
    <tr><td>Augmented</td><td>Major (4 half steps)</td><td>Augmented (8 half steps)</td><td>Caug (C+)</td><td>C–E–G♯</td></tr>
    <tr><td>Diminished</td><td>minor (3 half steps)</td><td>Diminished (6 half steps)</td><td>Cdim (C°)</td><td>C–E♭–G♭</td></tr>
  </tbody>
</table></div>

<h2>The 7 triads of the major scale</h2>
<p>If you build a triad on each <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degree</a> of the <a href="/diccionario-musical/tonalidades/escalas-mayores/">major scale</a>, using only the notes of that scale, you always get the same pattern of types. In C major:</p>
<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>Numeral</th><th>Notes in C major</th><th>Triad type</th></tr>
  </thead>
  <tbody>
    <tr><td>I — Tonic</td><td>I</td><td>C–E–G</td><td>Major</td></tr>
    <tr><td>II — Supertonic</td><td>ii</td><td>D–F–A</td><td>Minor</td></tr>
    <tr><td>III — Mediant</td><td>iii</td><td>E–G–B</td><td>Minor</td></tr>
    <tr><td>IV — Subdominant</td><td>IV</td><td>F–A–C</td><td>Major</td></tr>
    <tr><td>V — Dominant</td><td>V</td><td>G–B–D</td><td>Major</td></tr>
    <tr><td>VI — Submediant</td><td>vi</td><td>A–C–E</td><td>Minor</td></tr>
    <tr><td>VII — Leading tone (UK: leading note)</td><td>vii°</td><td>B–D–F</td><td>Diminished</td></tr>
  </tbody>
</table></div>
<p>The pattern is <strong>major – minor – minor – major – major – minor – diminished</strong> in every major scale. In G major the chords are G–Am–Bm–C–D–Em–F♯°; in D major, D–Em–F♯m–G–A–Bm–C♯°, and so on.</p>

<h2>The 7 triads of the natural minor scale</h2>
<p>In the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/">natural minor scale</a> the pattern changes. In A minor:</p>
<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>Numeral</th><th>Notes in A minor</th><th>Triad type</th></tr>
  </thead>
  <tbody>
    <tr><td>I — Tonic</td><td>i</td><td>A–C–E</td><td>Minor</td></tr>
    <tr><td>II — Supertonic</td><td>ii°</td><td>B–D–F</td><td>Diminished</td></tr>
    <tr><td>III — Mediant</td><td>III</td><td>C–E–G</td><td>Major</td></tr>
    <tr><td>IV — Subdominant</td><td>iv</td><td>D–F–A</td><td>Minor</td></tr>
    <tr><td>V — Dominant</td><td>v</td><td>E–G–B</td><td>Minor</td></tr>
    <tr><td>VI — Submediant</td><td>VI</td><td>F–A–C</td><td>Major</td></tr>
    <tr><td>VII — Subtonic</td><td>VII</td><td>G–B–D</td><td>Major</td></tr>
  </tbody>
</table></div>
<p>In the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a> the seventh degree is raised by a half step (G♯ in A minor), which turns the V chord into a major triad (E–G♯–B) and strengthens the V–i cadence.</p>

<h2 id="inversions">Chord inversions</h2>
<h3 id="first-inversion">First inversion</h3>
<p>From the bass: a 3rd up to the middle note and a 6th up to the top note. The third of the chord is in the bass.</p>
<p>To practice building them in a game, try <a href="/juegos/teoria/billar/">Billiards</a>: each ball carries a chord (in root position or in an inversion) and, to pocket it, you write its notes on the staff. If you would rather recognize chords, there is <a href="/juegos/teoria/bolos/">Bowling</a>.</p>
${fig3('', [
  ['inv1-acorde', 220, 122, 'First inversion of C major: E, G and C'],
  ['inv1-sexta', 220, 122, 'Sixth above the bass: E and C'],
  ['inv1-tercera', 220, 122, 'Third above the bass: E and G'],
])}

<h3 id="second-inversion">Second inversion</h3>
<p>From the bass: a 4th up to the middle note and a 6th up to the top note. The fifth of the chord is in the bass.</p>
${fig3('', [
  ['inv2-acorde', 220, 122, 'Second inversion of C major: G, C and E'],
  ['inv2-sexta', 220, 122, 'Sixth above the bass: G and E'],
  ['inv2-cuarta', 220, 122, 'Fourth above the bass: G and C'],
])}

<h2 id="figured-bass">Figured bass for triads</h2>
<p>Figured bass is the shorthand of numerals written under the bass note that tells you which chord to play above it. For triads only three cases matter:</p>
<h3>Root position</h3>
${figSm('cif-fund', 122, 'Figured bass for a triad in root position: no figure')}
<p>A triad in root position has <strong>no figure</strong>: the bass note alone implies the third and the fifth above it.</p>
<h3>First inversion: 6</h3>
${figSm('cif-1a', 159, 'Figured bass for a triad in first inversion: 6')}
<p>The numeral <strong>6</strong> (short for 6/3) shows that the third of the chord is in the bass: the upper notes are a sixth and a third above it.</p>
<h3>Second inversion: 6/4</h3>
${figSm('cif-2a', 193, 'Figured bass for a triad in second inversion: 6 over 4')}
<p>The numerals <strong>6/4</strong> show that the fifth is in the bass: the upper notes are a sixth and a fourth above it.</p>
<p>An accidental written next to a figure, or alone under the bass note, changes the note that figure refers to; an accidental alone refers to the third. Seventh chords add the figures 7, 6/5, 4/3 and 4/2.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What is a triad?</div>
<div class="tm-faq-a">A triad is a three-note chord made of two stacked thirds: a root, its third and its fifth. On C the triad is C-E-G. It is the most basic type of chord in tonal harmony.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How many types of triads are there?</div>
<div class="tm-faq-a">There are four, according to their intervals: major (perfect 5th and major 3rd), minor (perfect 5th and minor 3rd), augmented (augmented 5th and major 3rd) and diminished (diminished 5th and minor 3rd).</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is root position?</div>
<div class="tm-faq-a">Root position is the arrangement in which the root of the chord is the lowest note. The other two notes, the third and the fifth, lie above it.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the first inversion of a triad?</div>
<div class="tm-faq-a">The first inversion is when the third of the chord is in the bass. The distances above that bass note are a sixth and a third, and the chord is figured with a 6.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How is the second inversion of a triad formed?</div>
<div class="tm-faq-a">The second inversion puts the fifth of the chord in the bass. The distances above that bass note are a sixth and a fourth, and it is figured 6/4. In C major the second inversion is G–C–E (G in the bass).</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the difference between a major and a minor triad?</div>
<div class="tm-faq-a">Only the third: a major triad uses a major third (4 half steps) and a minor triad a minor third (3 half steps). The fifth is perfect in both. So C major is C–E–G and C minor is C–E♭–G.</div>
</div>
</div>
</div>
</div>
</section>
`,
});
