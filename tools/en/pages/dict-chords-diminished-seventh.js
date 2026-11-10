const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/diminished-seventh-chord/',
  esPath: '/diccionario-musical/acordes/acorde-de-septima-disminuida/',
  title: 'Diminished Seventh Chord (dim7): Formation and Use',
  description: 'The diminished seventh chord is three stacked minor thirds on the leading tone of a minor key. Formation, enharmonic spellings, inversions and use.',
  h1: 'Diminished Seventh Chord',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Chords', '/diccionario-musical/acordes/']],
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>diminished seventh chord</strong> is a four-note chord built on the seventh degree (the leading tone; UK: leading note) of the minor key, or of the major key with a lowered sixth degree. It is made of three minor thirds stacked on top of each other. It is the most tense of the <a href="/diccionario-musical/acordes/acordes-de-septima/">seventh chords</a>. For background, see the pages on <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degrees</a> and <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>

<h2>Construction and unique properties</h2>

<p>In the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a>, the raised seventh degree (the leading tone) gives the diminished seventh chord. In <strong>A harmonic minor</strong>:</p>

<ul>
  <li>Root: <strong>G♯</strong> (degree VII, the leading tone)</li>
  <li>Minor 3rd: <strong>B</strong> (3 half steps; UK: semitones)</li>
  <li>Diminished 5th: <strong>D</strong> (6 half steps)</li>
  <li>Diminished 7th: <strong>F</strong> (9 half steps)</li>
</ul>

<p>The most unusual property of this chord is that <strong>all its notes are a minor third apart</strong> (exactly 3 half steps each). This makes the chord <em>symmetrical</em>: all four of its inversions have the same structure of intervals. In practice, a diminished seventh chord can be spelled in four ways, because the same four pitches can be named from any of them as the root: G♯°7, B°7, D°7 and F°7 contain the same sounds (with <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic</a> respelling of the notes).</p>

<p>This ambiguity makes it one of the most common chords for <strong>modulating</strong> suddenly to distant keys: from any of its four notes it can be resolved as the leading-tone chord of a different key.</p>

<h2>Comparison with the half-diminished chord</h2>

<p>The half-diminished chord is the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">leading-tone seventh chord</a>: it starts from the same diminished triad, but its seventh is minor instead of diminished, so it appears in major and is not symmetrical. The table sums up the difference:</p>

<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Chord</th><th>3rd</th><th>5th</th><th>7th</th><th>Where it appears</th></tr>
  </thead>
  <tbody>
    <tr><td>Half-diminished seventh (viiø7)</td><td>Minor (3 half steps)</td><td>Diminished (6)</td><td>Minor (10)</td><td>Major key (degree VII)</td></tr>
    <tr><td>Diminished seventh (vii°7)</td><td>Minor (3 half steps)</td><td>Diminished (6)</td><td>Diminished (9)</td><td>Harmonic minor key (degree VII)</td></tr>
  </tbody>
</table></div>

<h2 id="root-position">Root position</h2>

<p>The examples below use C harmonic minor, where the chord is B–D–F–A♭. It is built with a minor 3rd, a diminished 5th and a diminished 7th above the root.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="B D F A♭"><img src="/assets/img/notacion/acordes-septimas/dis-fundamental-acorde.svg" width="260" height="122" alt="Diminished seventh chord in root position" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-fundamental-par1.svg" width="260" height="153" alt="Diminished seventh of the diminished seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-fundamental-par2.svg" width="260" height="153" alt="Diminished fifth of the diminished seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-fundamental-par3.svg" width="260" height="153" alt="Minor third of the diminished seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/dis-fundamental-cifrado-1.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in root position, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-fundamental-cifrado-2.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in root position, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-fundamental-cifrado-3.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in root position, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-fundamental-cifrado-4.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in root position, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is a slashed 7 and a slashed 5: the slashed 7 says that the seventh is diminished and the slashed 5 says that the fifth is diminished. It is the same in every key.</p>

<h2 id="first-inversion">First inversion</h2>

<p>The third is in the bass. Above the bass the chord has a minor 3rd, a diminished 5th and a major 6th.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="D F A♭ B"><img src="/assets/img/notacion/acordes-septimas/dis-1a-acorde.svg" width="260" height="122" alt="Diminished seventh chord in first inversion" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-1a-par1.svg" width="260" height="153" alt="Major sixth in the first inversion of the diminished seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-1a-par2.svg" width="260" height="153" alt="Diminished fifth in the first inversion of the diminished seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-1a-par3.svg" width="260" height="153" alt="Minor third in the first inversion of the diminished seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/dis-1a-cifrado-1.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in first inversion, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-1a-cifrado-2.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in first inversion, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-1a-cifrado-3.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in first inversion, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-1a-cifrado-4.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in first inversion, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is +6 and a slashed 5: the +6 says that the leading tone is a sixth above the bass and the slashed 5 says that the fifth is diminished. It is the same in every key.</p>

<h2 id="second-inversion">Second inversion</h2>

<p>The fifth is in the bass. Above the bass the chord has a minor 3rd, an augmented 4th and a major 6th.</p>

<div class="tm-img-grid-4">
<figure data-tm-chord-notes="F A♭ B D"><img src="/assets/img/notacion/acordes-septimas/dis-2a-acorde.svg" width="260" height="122" alt="Diminished seventh chord in second inversion" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-2a-par1.svg" width="260" height="153" alt="Major sixth in the second inversion of the diminished seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-2a-par2.svg" width="260" height="153" alt="Augmented fourth in the second inversion of the diminished seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-2a-par3.svg" width="260" height="153" alt="Minor third in the second inversion of the diminished seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/dis-2a-cifrado-1.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in second inversion, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-2a-cifrado-2.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in second inversion, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-2a-cifrado-3.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in second inversion, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-2a-cifrado-4.svg" width="260" height="193" alt="Figured bass of the diminished seventh chord in second inversion, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is +4 and the corresponding accidental on the 3: the +4 says that the fourth is the leading tone, and the 3 with whatever accidental the key requires gives the third. The figured bass varies with the key.</p>

<h2 id="third-inversion">Third inversion</h2>

<p>The seventh is in the bass. Above the bass the chord has an augmented 2nd, an augmented 4th and a major 6th.</p>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/dis-3a-acorde.svg" width="260" height="122" alt="Diminished seventh chord in third inversion" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-3a-par1.svg" width="260" height="153" alt="Major sixth in the third inversion of the diminished seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-3a-par2.svg" width="260" height="153" alt="Augmented fourth in the third inversion of the diminished seventh chord" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-3a-par3.svg" width="260" height="153" alt="Augmented second in the third inversion of the diminished seventh chord" loading="lazy" decoding="async"></figure>
</div>

<h3>Figured bass</h3>

<div class="tm-img-grid-4">
<figure><img src="/assets/img/notacion/acordes-septimas/dis-3a-cifrado-1.svg" width="260" height="159" alt="Figured bass of the diminished seventh chord in third inversion, example 1" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-3a-cifrado-2.svg" width="260" height="159" alt="Figured bass of the diminished seventh chord in third inversion, example 2" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-3a-cifrado-3.svg" width="260" height="159" alt="Figured bass of the diminished seventh chord in third inversion, example 3" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/acordes-septimas/dis-3a-cifrado-4.svg" width="260" height="159" alt="Figured bass of the diminished seventh chord in third inversion, example 4" loading="lazy" decoding="async"></figure>
</div>

<p>The figured bass is +2: the +2 says that the second is the leading tone. It is the same in every key.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What is a diminished seventh chord?</div>
<div class="tm-faq-a">It is a four-note chord made of three stacked minor thirds: a diminished triad plus a diminished 7th. It is built on the seventh degree of the minor key, or of the major key with a lowered sixth degree.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How does it differ from the leading-tone (half-diminished) seventh chord?</div>
<div class="tm-faq-a">The diminished seventh has a diminished 7th (a major 6th spelled as a 7th, 9 half steps above the root), while the half-diminished has a minor 7th (10 half steps). As a result the diminished seventh is completely symmetrical: its four notes are spread in equal minor thirds.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Why does the diminished seventh chord have so many enharmonic spellings?</div>
<div class="tm-faq-a">Because it is made of equal minor thirds, its four positions (root position and three inversions) contain the same intervals, so each inversion sounds like the root position of another diminished seventh. C♯°7 and E°7, for example, sound exactly the same.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How many inversions does it have?</div>
<div class="tm-faq-a">Three, like every four-note chord. In the first inversion the third is in the bass, in the second the fifth, and in the third the seventh.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the diminished seventh chord used for?</div>
<div class="tm-faq-a">Mainly as a substitute for the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant (V7)</a>, resolving to the tonic with great tension, especially in minor-key cadences. It is also used as a chromatic passing chord between two diatonic chords, and its symmetry makes it very useful for modulating to distant keys.</div>
</div>
</div>
</div>
</div>
</section>
`,
});
