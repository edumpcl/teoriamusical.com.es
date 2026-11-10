const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/dominant-seventh-chord/',
  esPath: '/diccionario-musical/acordes/acorde-de-septima-de-dominante/',
  title: 'Dominant Seventh Chord (V7): What It Is and Resolution',
  description: 'The dominant seventh chord (V7) has a major 3rd, perfect 5th and minor 7th on degree V. Notes, inversions, figured bass and how it resolves to the tonic.',
  h1: 'Dominant Seventh Chord',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Chords', '/diccionario-musical/acordes/']],
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>dominant seventh chord</strong> is a four-note chord built on the fifth degree (the dominant) of the scale. It is made of a major 3rd, a perfect 5th and a minor 7th above the root. It is the most important of the <a href="/diccionario-musical/acordes/acordes-de-septima/">seventh chords</a>. For background, see the pages on <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degrees</a> and <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>

<h2>Why does V7 resolve to the tonic?</h2>

<p>V7 is the chord with the most tension in a key, because it contains two opposite forces that pull toward each other:</p>

<ul>
  <li><strong>The leading tone</strong> (UK: leading note), the third of the chord (for example B in C major), tends to rise a half step (UK: semitone) to the tonic (C).</li>
  <li><strong>The seventh</strong> of the chord (for example F in C major) tends to fall a half step to the third of the tonic chord (E).</li>
</ul>

<p>Between the leading tone and the seventh there is a <a href="/diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/">tritone</a> (an augmented 4th or diminished 5th), the most unstable interval in the scale. That instability demands resolution. The <a href="/diccionario-musical/cadencias/">V7–I cadence</a> (or V7–i in minor) is the most conclusive in tonal harmony and appears in almost all Western music from the Baroque to the 20th century.</p>

<p>The same driving tritone appears in two other chords with dominant function: the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">leading-tone seventh chord</a> (half-diminished), which can stand in for V7 in major, and the <a href="/diccionario-musical/acordes/acorde-de-septima-disminuida/">diminished seventh chord</a>, which does the same job in minor with even more tension.</p>

<h2>Summary of intervals in each position</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Position</th><th>Figured bass</th><th>Intervals above the bass</th><th>Notes in G7 (C major)</th></tr>
  </thead>
  <tbody>
    <tr><td>Root position</td><td>7 (+)</td><td>M3 · P5 · m7</td><td>G–B–D–F</td></tr>
    <tr><td>First inversion</td><td>6 5̄</td><td>m3 · d5 · m6</td><td>B–D–F–G</td></tr>
    <tr><td>Second inversion</td><td>+6</td><td>m3 · P4 · M6</td><td>D–F–G–B</td></tr>
    <tr><td>Third inversion</td><td>+4</td><td>M2 · A4 · M6</td><td>F–G–B–D</td></tr>
  </tbody>
</table></div>

<h2 id="root-position">Root position</h2>

<p>The chord is built with a major 3rd, a perfect 5th and a minor 7th above the root.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="G B D F"><img src="/assets/img/notacion/acordes-septimas/dom-fundamental-acorde.svg" width="260" height="122" alt="Dominant seventh chord in root position" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-fundamental-par1.svg" width="260" height="153" alt="Minor seventh of the dominant seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-fundamental-par2.svg" width="260" height="153" alt="Perfect fifth of the dominant seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-fundamental-par3.svg" width="260" height="153" alt="Major third of the dominant seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/dom-fundamental-cifrado-1.svg" width="260" height="193" alt="Figured bass of the dominant seventh chord in root position, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-fundamental-cifrado-2.svg" width="260" height="193" alt="Figured bass of the dominant seventh chord in root position, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-fundamental-cifrado-3.svg" width="260" height="193" alt="Figured bass of the dominant seventh chord in root position, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-fundamental-cifrado-4.svg" width="260" height="193" alt="Figured bass of the dominant seventh chord in root position, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is 7 and +: the 7 says that the distance from the root to the top note is a seventh, and the + says that the third is the leading tone. It is the same in every key.</p>

<h2 id="first-inversion">First inversion</h2>

<p>The third is in the bass. Above the bass the chord has a minor 3rd, a diminished 5th and a minor 6th.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="B D F G"><img src="/assets/img/notacion/acordes-septimas/dom-1a-acorde.svg" width="260" height="122" alt="Dominant seventh chord in first inversion" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-1a-par1.svg" width="260" height="153" alt="Minor sixth in the first inversion of the dominant seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-1a-par2.svg" width="260" height="153" alt="Diminished fifth in the first inversion of the dominant seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-1a-par3.svg" width="260" height="153" alt="Minor third in the first inversion of the dominant seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/dom-1a-cifrado-1.svg" width="260" height="193" alt="Figured bass of the dominant seventh chord in first inversion, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-1a-cifrado-2.svg" width="260" height="193" alt="Figured bass of the dominant seventh chord in first inversion, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-1a-cifrado-3.svg" width="260" height="193" alt="Figured bass of the dominant seventh chord in first inversion, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-1a-cifrado-4.svg" width="260" height="193" alt="Figured bass of the dominant seventh chord in first inversion, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is 6 and a slashed 5: the 6 says that the distance from the bass to the top note is a sixth, and the slashed 5 says that the fifth is diminished. It is the same in every key.</p>

<h2 id="second-inversion">Second inversion</h2>

<p>The fifth is in the bass. Above the bass the chord has a minor 3rd, a perfect 4th and a major 6th.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="D F G B"><img src="/assets/img/notacion/acordes-septimas/dom-2a-acorde.svg" width="260" height="122" alt="Dominant seventh chord in second inversion" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-2a-par1.svg" width="260" height="153" alt="Major sixth in the second inversion of the dominant seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-2a-par2.svg" width="260" height="153" alt="Perfect fourth in the second inversion of the dominant seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-2a-par3.svg" width="260" height="153" alt="Minor third in the second inversion of the dominant seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/dom-2a-cifrado-1.svg" width="260" height="159" alt="Figured bass of the dominant seventh chord in second inversion, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-2a-cifrado-2.svg" width="260" height="159" alt="Figured bass of the dominant seventh chord in second inversion, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-2a-cifrado-3.svg" width="260" height="159" alt="Figured bass of the dominant seventh chord in second inversion, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-2a-cifrado-4.svg" width="260" height="159" alt="Figured bass of the dominant seventh chord in second inversion, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is +6: the +6 says that the sixth is the leading tone. It is the same in every key.</p>

<h2 id="third-inversion">Third inversion</h2>

<p>The seventh is in the bass. Above the bass the chord has a major 2nd, an augmented 4th and a major 6th.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="F G B D"><img src="/assets/img/notacion/acordes-septimas/dom-3a-acorde.svg" width="260" height="122" alt="Dominant seventh chord in third inversion" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-3a-par1.svg" width="260" height="153" alt="Major sixth in the third inversion of the dominant seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-3a-par2.svg" width="260" height="153" alt="Augmented fourth in the third inversion of the dominant seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-3a-par3.svg" width="260" height="153" alt="Major second in the third inversion of the dominant seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/dom-3a-cifrado-1.svg" width="260" height="159" alt="Figured bass of the dominant seventh chord in third inversion, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-3a-cifrado-2.svg" width="260" height="159" alt="Figured bass of the dominant seventh chord in third inversion, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-3a-cifrado-3.svg" width="260" height="159" alt="Figured bass of the dominant seventh chord in third inversion, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dom-3a-cifrado-4.svg" width="260" height="159" alt="Figured bass of the dominant seventh chord in third inversion, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is +4: the +4 says that the fourth is the leading tone. It is the same in every key.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What is the dominant seventh chord?</div>
<div class="tm-faq-a">It is a four-note chord built on the fifth degree (the dominant) of the scale. It is made of a major 3rd, a perfect 5th and a minor 7th above the root. Its figured bass in root position is 7 with the + sign.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How many inversions does the dominant seventh chord have?</div>
<div class="tm-faq-a">Three, in addition to root position: first inversion (a minor 6th, a diminished 5th and a minor 3rd above the bass), second inversion (figured bass +6, for the leading tone) and third inversion (figured bass +4, for the leading tone).</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Why is it called the dominant seventh chord?</div>
<div class="tm-faq-a">Because it is built on the fifth degree of the scale, called the dominant. The minor 7th added to that major triad gives it a strong pull toward the tonic.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What are the notes of the dominant seventh chord in C major?</div>
<div class="tm-faq-a">In C major it is built on G (degree V). Its notes are G–B–D–F: a major 3rd (G–B), a perfect 5th (G–D) and a minor 7th (G–F). The tritone between B and F is what drives it toward the tonic chord.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How does the dominant seventh chord resolve?</div>
<div class="tm-faq-a">The leading tone rises a half step to the tonic and the seventh falls a half step to the third of the tonic chord. In C major: B→C and F→E, usually landing on the C major chord.</div>
</div>
</div>
</div>
</div>
</section>
`,
});
