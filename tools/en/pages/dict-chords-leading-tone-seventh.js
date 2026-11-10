const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/leading-tone-seventh-chord/',
  esPath: '/diccionario-musical/acordes/acorde-de-septima-de-sensible/',
  title: 'Half-Diminished Seventh Chord (Leading-Tone Seventh)',
  description: 'The half-diminished (leading-tone) seventh chord on degree vii of a major key: notes, intervals, inversions and figured bass, and how it resolves.',
  h1: 'Leading-Tone Seventh Chord (Half-Diminished)',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Chords', '/diccionario-musical/acordes/']],
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>leading-tone seventh chord</strong>, also called the <strong>half-diminished seventh chord</strong>, is a four-note chord built on the seventh degree (the leading tone; UK: leading note) of the major scale. It is one of the <a href="/diccionario-musical/acordes/acordes-de-septima/">seventh chords</a>. For background, see the pages on <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degrees</a> and <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>

<h2>Construction and function</h2>

<p>In a major key, the seventh degree naturally produces a <a href="/diccionario-musical/acordes/acordes-triadas/">diminished triad</a>. Adding a seventh, which in major is a minor 7th above the root, gives the half-diminished chord. In <strong>C major</strong>:</p>

<ul>
  <li>Root: <strong>B</strong> (degree VII, the leading tone)</li>
  <li>Minor 3rd: <strong>D</strong> (3 half steps; UK: semitones)</li>
  <li>Diminished 5th: <strong>F</strong> (6 half steps)</li>
  <li>Minor 7th: <strong>A</strong> (10 half steps)</li>
</ul>

<p>Its harmonic function is similar to that of the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">V7</a>: both contain the same tritone (B–F in C major) and both tend to resolve to the tonic. The difference is the interval content: the half-diminished chord has a minor 3rd and a diminished 5th where V7 has a major 3rd and a perfect 5th, which makes it somewhat less bright but just as unstable.</p>

<p>Do not confuse it with the <a href="/diccionario-musical/acordes/acorde-de-septima-disminuida/">diminished seventh chord</a>, which is built on the seventh degree of the harmonic minor scale and has a diminished 7th, making it completely symmetrical. Here, in major, the seventh is minor and the chord is not symmetrical.</p>

<h2>Summary of intervals in each position</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Position</th><th>Figured bass</th><th>Intervals above the bass</th><th>Notes in B half-diminished 7th (C major)</th></tr>
  </thead>
  <tbody>
    <tr><td>Root position</td><td>7 5̄</td><td>m3 · d5 · m7</td><td>B–D–F–A</td></tr>
    <tr><td>First inversion</td><td>+6 5</td><td>m3 · P5 · M6</td><td>D–F–A–B</td></tr>
    <tr><td>Second inversion</td><td>+4 3</td><td>M3 · A4 · M6</td><td>F–A–B–D</td></tr>
    <tr><td>Third inversion</td><td>4 +2</td><td>M2 · P4 · m6</td><td>A–B–D–F</td></tr>
  </tbody>
</table></div>

<h2 id="root-position">Root position</h2>

<p>The chord is built with a minor 3rd, a diminished 5th and a minor 7th above the root.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="B D F A"><img src="/assets/img/notacion/acordes-septimas/sen-fundamental-acorde.svg" width="260" height="122" alt="Leading-tone seventh chord in root position" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-fundamental-par1.svg" width="260" height="153" alt="Minor seventh of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-fundamental-par2.svg" width="260" height="153" alt="Diminished fifth of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-fundamental-par3.svg" width="260" height="153" alt="Minor third of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/sen-fundamental-cifrado-1.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in root position, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-fundamental-cifrado-2.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in root position, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-fundamental-cifrado-3.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in root position, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-fundamental-cifrado-4.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in root position, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is 7 and a slashed 5: the 7 says that the distance between the outer notes is a seventh, and the slashed 5 says that the fifth is diminished. It is the same in every key.</p>

<h2 id="first-inversion">First inversion</h2>

<p>The third is in the bass. Above the bass the chord has a minor 3rd, a perfect 5th and a major 6th.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="D F A B"><img src="/assets/img/notacion/acordes-septimas/sen-1a-acorde.svg" width="260" height="122" alt="Leading-tone seventh chord in first inversion" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-1a-par1.svg" width="260" height="153" alt="Major sixth in the first inversion of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-1a-par2.svg" width="260" height="153" alt="Perfect fifth in the first inversion of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-1a-par3.svg" width="260" height="153" alt="Minor third in the first inversion of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/sen-1a-cifrado-1.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in first inversion, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-1a-cifrado-2.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in first inversion, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-1a-cifrado-3.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in first inversion, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-1a-cifrado-4.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in first inversion, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is +6 and 5: the +6 says that the sixth is the leading tone; the 5 is added to tell it apart from the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/#second-inversion">dominant seventh in second inversion</a>. It is the same in every key.</p>

<h2 id="second-inversion">Second inversion</h2>

<p>The fifth is in the bass. Above the bass the chord has a major 3rd, an augmented 4th and a major 6th.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="F A B D"><img src="/assets/img/notacion/acordes-septimas/sen-2a-acorde.svg" width="260" height="122" alt="Leading-tone seventh chord in second inversion" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-2a-par1.svg" width="260" height="153" alt="Major sixth in the second inversion of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-2a-par2.svg" width="260" height="153" alt="Augmented fourth in the second inversion of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-2a-par3.svg" width="260" height="153" alt="Major third in the second inversion of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/sen-2a-cifrado-1.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in second inversion, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-2a-cifrado-2.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in second inversion, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-2a-cifrado-3.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in second inversion, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-2a-cifrado-4.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in second inversion, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is +4 and 3: the +4 says that the fourth is the leading tone; the 3 is added to tell it apart from the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/#third-inversion">dominant seventh in third inversion</a>. It is the same in every key.</p>

<h2 id="third-inversion">Third inversion</h2>

<p>The seventh is in the bass. Above the bass the chord has a major 2nd, a perfect 4th and a minor 6th.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="A B D F"><img src="/assets/img/notacion/acordes-septimas/sen-3a-acorde.svg" width="260" height="122" alt="Leading-tone seventh chord in third inversion" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-3a-par1.svg" width="260" height="153" alt="Minor sixth in the third inversion of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-3a-par2.svg" width="260" height="153" alt="Perfect fourth in the third inversion of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-3a-par3.svg" width="260" height="153" alt="Major second in the third inversion of the leading-tone seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/sen-3a-cifrado-1.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in third inversion, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-3a-cifrado-2.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in third inversion, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-3a-cifrado-3.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in third inversion, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/sen-3a-cifrado-4.svg" width="260" height="193" alt="Figured bass of the leading-tone seventh chord in third inversion, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is 4 and +2: the 4 gives the distance of a fourth and the +2 says that the second is the leading tone. It is the same in every key.</p>

<p>To practice this chord there is an exercise on <a href="/ejercicios/acordes/construir-septima-de-sensible/">building the leading-tone seventh</a> (in its four positions) and another on <a href="/ejercicios/acordes/septimas-en-fundamental/">recognizing it</a> next to the dominant seventh and the diminished seventh.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What is the leading-tone seventh chord?</div>
<div class="tm-faq-a">It is the four-note chord built on the seventh degree (the leading tone) of the major scale. It is made of a minor 3rd, a diminished 5th and a minor 7th above the root. It is also called the half-diminished seventh chord.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How does it differ from the dominant seventh chord?</div>
<div class="tm-faq-a">The leading-tone seventh is built on degree VII with a minor 3rd, a diminished 5th and a minor 7th; the dominant seventh is built on degree V with a major 3rd, a perfect 5th and a minor 7th. Both share the same tritone.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How many inversions does it have?</div>
<div class="tm-faq-a">Three, in addition to root position: first (+6 and 5), second (+4 and 3) and third (4 and +2). Each inversion carries an extra number in the figured bass to tell it apart from the dominant seventh chord.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What are the notes of the leading-tone seventh chord in C major?</div>
<div class="tm-faq-a">In C major it is built on degree VII, B. Its notes are B–D–F–A: a minor 3rd (B–D), a diminished 5th (B–F) and a minor 7th (B–A).</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How does it resolve?</div>
<div class="tm-faq-a">It resolves to the tonic: the leading tone rises a half step to the tonic, the diminished 5th falls to the third of the tonic chord, and the seventh falls by step. In C major: B→C, F→E, A→G, and D goes to C or E.</div>
</div>
</div>
</div>
</div>
</section>
`,
});
