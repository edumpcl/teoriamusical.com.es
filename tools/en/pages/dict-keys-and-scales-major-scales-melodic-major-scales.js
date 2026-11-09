const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/music-dictionary/keys-and-scales/major-scales/melodic-major-scales/",
  esPath: "/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixtas-secundarias/",
  title: "Melodic Major Scale (Mixolydian ♭6): All 15 Keys",
  description: "The melodic major scale lowers the 6th and 7th degrees of the major scale (1 2 3 4 5 ♭6 ♭7). Notes in all 15 keys and how it differs from similar scales.",
  h1: "Melodic Major Scales",
  crumbs: [["Music Dictionary","/diccionario-musical/"],["Keys and Scales","/diccionario-musical/tonalidades/"],["Major Scales","/diccionario-musical/tonalidades/escalas-mayores/"]],
  scripts: ['tm-piano-audio'],
  body: `<p>The <strong>melodic major scale</strong> is a variant of the <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/">major scale</a> in which both the sixth and the seventh degrees are lowered by a half step (UK: semitone): 1 2 3 4 5 ♭6 ♭7. It keeps the major third of the major scale but takes the minor sixth and minor seventh of the natural minor scale.</p>

<p><strong>Names.</strong> Besides <em>melodic major</em>, this scale is also called <em>Mixolydian ♭6</em>, <em>Aeolian dominant</em>, <em>Hindu scale</em> or <em>Aeolian ♮3</em>. It is the fifth mode of the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-melodicas/">melodic minor scale</a>: the notes of F melodic minor going up (F G A♭ B♭ C D E), played from C, give C melodic major. Spanish-language conservatory teaching calls it the <em>escala mayor mixta secundaria</em> ("secondary mixed major scale"), because it mixes a major third with the minor sixth and seventh. The scale that lowers only the sixth degree is the <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixtas-principales/">harmonic major scale</a> (the "primary mixed" scale), and the one that lowers only the seventh is the <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixolidias/">Mixolydian scale</a>. The melodic major scale makes both changes at once.</p>

<p>We start from the major scale:</p>

<figure><img src="/assets/img/escalas/do-mayor-dentro.svg" width="840" height="122" alt="C major scale, no accidentals: C, D, E, F, G, A, B, C. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<p>Lowering the sixth and seventh degrees by a half step gives the melodic major scale:</p>

<figure><img src="/assets/img/escalas/do-mixta-secundaria-dentro.svg" width="840" height="122" alt="C melodic major scale, with the accidentals written next to each note: C, D, E, F, G, A♭, B♭, C. In red, the notes that differ from the major scale: A♭, B♭." loading="lazy" decoding="async"></figure>

<p>In the examples the lowered notes appear in red to make them easy to see; in exercises you do not need to mark them.</p>

<p>The scales are shown in two ways: with the accidentals written inside the scale and with the key signature. Both ways are equivalent.</p>

<h2>Interval pattern</h2>

<p>The pattern of <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps and half steps</a> of the melodic major scale is <strong>W–W–H–W–H–W–W</strong> (W = whole step, H = half step). The lowered sixth degree creates a half step between the 5th and 6th degrees and a whole step between the 6th and 7th.</p>

<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr>
  </thead>
  <tbody>
    <tr><td>Step from the previous degree</td><td>—</td><td>W</td><td>W</td><td>H</td><td>W</td><td><strong>H</strong></td><td>W</td><td>W</td></tr>
    <tr><td>C melodic major</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td><strong>A♭</strong></td><td><strong>B♭</strong></td><td>C</td></tr>
    <tr><td>C major</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>A</td><td>B</td><td>C</td></tr>
  </tbody>
</table></div>

<p>Compare it with the natural minor scale on the same tonic (C D E♭ F G A♭ B♭). The two scales differ only in the third degree: E in melodic major, E♭ in natural minor. Do not confuse the melodic major scale with the relative minor of the same key signature: C melodic major (C D E F G A♭ B♭) does <em>not</em> have the same notes as A natural minor (A B C D E F G).</p>

<p>In this scale the tonic triad is major (C–E–G), while the triads built on the fourth and fifth degrees are minor (F–A♭–C and G–B♭–D).</p>

<h2 id="table-melodic-major-scales">All 15 melodic major scales</h2>
<div class="tm-table-wrap">
<table class="tm-table tm-scales" data-notes-cols="1-7" data-figures data-fig-match="melodic major">
  <thead>
    <tr><th>Scale</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6↓</th><th>7↓</th><th>Change from the major scale</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>C melodic major</strong></td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>A♭</td><td>B♭</td><td>A→A♭, B→B♭</td></tr>
    <tr><td><strong>G melodic major</strong></td><td>G</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E♭</td><td>F♮</td><td>E→E♭, F♯→F♮</td></tr>
    <tr><td><strong>D melodic major</strong></td><td>D</td><td>E</td><td>F♯</td><td>G</td><td>A</td><td>B♭</td><td>C♮</td><td>B→B♭, C♯→C♮</td></tr>
    <tr><td><strong>A melodic major</strong></td><td>A</td><td>B</td><td>C♯</td><td>D</td><td>E</td><td>F♮</td><td>G♮</td><td>F♯→F♮, G♯→G♮</td></tr>
    <tr><td><strong>E melodic major</strong></td><td>E</td><td>F♯</td><td>G♯</td><td>A</td><td>B</td><td>C♮</td><td>D♮</td><td>C♯→C♮, D♯→D♮</td></tr>
    <tr><td><strong>B melodic major</strong></td><td>B</td><td>C♯</td><td>D♯</td><td>E</td><td>F♯</td><td>G♮</td><td>A♮</td><td>G♯→G♮, A♯→A♮</td></tr>
    <tr><td><strong>F♯ melodic major</strong></td><td>F♯</td><td>G♯</td><td>A♯</td><td>B</td><td>C♯</td><td>D♮</td><td>E♮</td><td>D♯→D♮, E♯→E♮</td></tr>
    <tr><td><strong>C♯ melodic major</strong></td><td>C♯</td><td>D♯</td><td>E♯</td><td>F♯</td><td>G♯</td><td>A♮</td><td>B♮</td><td>A♯→A♮, B♯→B♮</td></tr>
    <tr><td><strong>F melodic major</strong></td><td>F</td><td>G</td><td>A</td><td>B♭</td><td>C</td><td>D♭</td><td>E♭</td><td>D→D♭, E→E♭</td></tr>
    <tr><td><strong>B♭ melodic major</strong></td><td>B♭</td><td>C</td><td>D</td><td>E♭</td><td>F</td><td>G♭</td><td>A♭</td><td>G→G♭, A→A♭</td></tr>
    <tr><td><strong>E♭ melodic major</strong></td><td>E♭</td><td>F</td><td>G</td><td>A♭</td><td>B♭</td><td>C♭</td><td>D♭</td><td>C→C♭, D→D♭</td></tr>
    <tr><td><strong>A♭ melodic major</strong></td><td>A♭</td><td>B♭</td><td>C</td><td>D♭</td><td>E♭</td><td>F♭</td><td>G♭</td><td>F→F♭, G→G♭</td></tr>
    <tr><td><strong>D♭ melodic major</strong></td><td>D♭</td><td>E♭</td><td>F</td><td>G♭</td><td>A♭</td><td>B double flat</td><td>C♭</td><td>B♭→B double flat, C→C♭</td></tr>
    <tr><td><strong>G♭ melodic major</strong></td><td>G♭</td><td>A♭</td><td>B♭</td><td>C♭</td><td>D♭</td><td>E double flat</td><td>F♭</td><td>E♭→E double flat, F→F♭</td></tr>
    <tr><td><strong>C♭ melodic major</strong></td><td>C♭</td><td>D♭</td><td>E♭</td><td>F♭</td><td>G♭</td><td>A double flat</td><td>B double flat</td><td>A♭→A double flat, B♭→B double flat</td></tr>
  </tbody>
</table>
</div>

<h2>Accidentals written inside the scale</h2>

<h3>Keys with sharps</h3>

<h4>G Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/sol-mixta-secundaria-dentro.svg" width="840" height="122" alt="G melodic major scale, with the accidentals written next to each note: G, A, B, C, D, E♭, F♮, G. In red, the notes that differ from the major scale: E♭, F♮." loading="lazy" decoding="async"></figure>

<h4>D Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/re-mixta-secundaria-dentro.svg" width="840" height="122" alt="D melodic major scale, with the accidentals written next to each note: D, E, F♯, G, A, B♭, C♮, D. In red, the notes that differ from the major scale: B♭, C♮." loading="lazy" decoding="async"></figure>

<h4>A Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/la-mixta-secundaria-dentro.svg" width="840" height="122" alt="A melodic major scale, with the accidentals written next to each note: A, B, C♯, D, E, F♮, G♮, A. In red, the notes that differ from the major scale: F♮, G♮." loading="lazy" decoding="async"></figure>

<h4>E Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/mi-mixta-secundaria-dentro.svg" width="840" height="122" alt="E melodic major scale, with the accidentals written next to each note: E, F♯, G♯, A, B, C♮, D♮, E. In red, the notes that differ from the major scale: C♮, D♮." loading="lazy" decoding="async"></figure>

<h4>B Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/si-mixta-secundaria-dentro.svg" width="840" height="122" alt="B melodic major scale, with the accidentals written next to each note: B, C♯, D♯, E, F♯, G♮, A♮, B. In red, the notes that differ from the major scale: G♮, A♮." loading="lazy" decoding="async"></figure>

<h4>F♯ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/fa-sostenido-mixta-secundaria-dentro.svg" width="854" height="122" alt="F♯ melodic major scale, with the accidentals written next to each note: F♯, G♯, A♯, B, C♯, D♮, E♮, F♯. In red, the notes that differ from the major scale: D♮, E♮." loading="lazy" decoding="async"></figure>

<h4>C♯ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/do-sostenido-mixta-secundaria-dentro.svg" width="856" height="122" alt="C♯ melodic major scale, with the accidentals written next to each note: C♯, D♯, E♯, F♯, G♯, A♮, B♮, C♯. In red, the notes that differ from the major scale: A♮, B♮." loading="lazy" decoding="async"></figure>

<h3>Keys with flats</h3>

<h4>F Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/fa-mixta-secundaria-dentro.svg" width="840" height="122" alt="F melodic major scale, with the accidentals written next to each note: F, G, A, B♭, C, D♭, E♭, F. In red, the notes that differ from the major scale: D♭, E♭." loading="lazy" decoding="async"></figure>

<h4>B♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/si-bemol-mixta-secundaria-dentro.svg" width="853" height="122" alt="B♭ melodic major scale, with the accidentals written next to each note: B♭, C, D, E♭, F, G♭, A♭, B♭. In red, the notes that differ from the major scale: G♭, A♭." loading="lazy" decoding="async"></figure>

<h4>E♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/mi-bemol-mixta-secundaria-dentro.svg" width="853" height="122" alt="E♭ melodic major scale, with the accidentals written next to each note: E♭, F, G, A♭, B♭, C♭, D♭, E♭. In red, the notes that differ from the major scale: C♭, D♭." loading="lazy" decoding="async"></figure>

<h4>A♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/la-bemol-mixta-secundaria-dentro.svg" width="853" height="122" alt="A♭ melodic major scale, with the accidentals written next to each note: A♭, B♭, C, D♭, E♭, F♭, G♭, A♭. In red, the notes that differ from the major scale: F♭, G♭." loading="lazy" decoding="async"></figure>

<h4>D♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/re-bemol-mixta-secundaria-dentro.svg" width="853" height="122" alt="D♭ melodic major scale, with the accidentals written next to each note: D♭, E♭, F, G♭, A♭, B double flat, C♭, D♭. In red, the notes that differ from the major scale: B double flat, C♭." loading="lazy" decoding="async"></figure>

<h4>G♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/sol-bemol-mixta-secundaria-dentro.svg" width="853" height="122" alt="G♭ melodic major scale, with the accidentals written next to each note: G♭, A♭, B♭, C♭, D♭, E double flat, F♭, G♭. In red, the notes that differ from the major scale: E double flat, F♭." loading="lazy" decoding="async"></figure>

<h4>C♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/do-bemol-mixta-secundaria-dentro.svg" width="853" height="122" alt="C♭ melodic major scale, with the accidentals written next to each note: C♭, D♭, E♭, F♭, G♭, A double flat, B double flat, C♭. In red, the notes that differ from the major scale: A double flat, B double flat." loading="lazy" decoding="async"></figure>

<h2>Accidentals in the key signature</h2>

<h3>Keys with sharps</h3>

<h4>G Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/sol-mixta-secundaria-armadura.svg" width="862" height="122" alt="G melodic major scale with a key signature of 1 sharp: G, A, B, C, D, E♭, F♮, G. In red, the notes that differ from the major scale: E♭, F♮." loading="lazy" decoding="async"></figure>

<h4>D Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/re-mixta-secundaria-armadura.svg" width="874" height="122" alt="D melodic major scale with a key signature of 2 sharps: D, E, F♯, G, A, B♭, C♮, D. In red, the notes that differ from the major scale: B♭, C♮." loading="lazy" decoding="async"></figure>

<h4>A Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/la-mixta-secundaria-armadura.svg" width="888" height="122" alt="A melodic major scale with a key signature of 3 sharps: A, B, C♯, D, E, F♮, G♮, A. In red, the notes that differ from the major scale: F♮, G♮." loading="lazy" decoding="async"></figure>

<h4>E Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/mi-mixta-secundaria-armadura.svg" width="901" height="122" alt="E melodic major scale with a key signature of 4 sharps: E, F♯, G♯, A, B, C♮, D♮, E. In red, the notes that differ from the major scale: C♮, D♮." loading="lazy" decoding="async"></figure>

<h4>B Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/si-mixta-secundaria-armadura.svg" width="914" height="122" alt="B melodic major scale with a key signature of 5 sharps: B, C♯, D♯, E, F♯, G♮, A♮, B. In red, the notes that differ from the major scale: G♮, A♮." loading="lazy" decoding="async"></figure>

<h4>F♯ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/fa-sostenido-mixta-secundaria-armadura.svg" width="926" height="122" alt="F♯ melodic major scale with a key signature of 6 sharps: F♯, G♯, A♯, B, C♯, D♮, E♮, F♯. In red, the notes that differ from the major scale: D♮, E♮." loading="lazy" decoding="async"></figure>

<h4>C♯ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/do-sostenido-mixta-secundaria-armadura.svg" width="940" height="122" alt="C♯ melodic major scale with a key signature of 7 sharps: C♯, D♯, E♯, F♯, G♯, A♮, B♮, C♯. In red, the notes that differ from the major scale: A♮, B♮." loading="lazy" decoding="async"></figure>

<h3>Keys with flats</h3>

<h4>F Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/fa-mixta-secundaria-armadura.svg" width="860" height="122" alt="F melodic major scale with a key signature of 1 flat: F, G, A, B♭, C, D♭, E♭, F. In red, the notes that differ from the major scale: D♭, E♭." loading="lazy" decoding="async"></figure>

<h4>B♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/si-bemol-mixta-secundaria-armadura.svg" width="871" height="122" alt="B♭ melodic major scale with a key signature of 2 flats: B♭, C, D, E♭, F, G♭, A♭, B♭. In red, the notes that differ from the major scale: G♭, A♭." loading="lazy" decoding="async"></figure>

<h4>E♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/mi-bemol-mixta-secundaria-armadura.svg" width="883" height="122" alt="E♭ melodic major scale with a key signature of 3 flats: E♭, F, G, A♭, B♭, C♭, D♭, E♭. In red, the notes that differ from the major scale: C♭, D♭." loading="lazy" decoding="async"></figure>

<h4>A♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/la-bemol-mixta-secundaria-armadura.svg" width="895" height="122" alt="A♭ melodic major scale with a key signature of 4 flats: A♭, B♭, C, D♭, E♭, F♭, G♭, A♭. In red, the notes that differ from the major scale: F♭, G♭." loading="lazy" decoding="async"></figure>

<h4>D♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/re-bemol-mixta-secundaria-armadura.svg" width="906" height="122" alt="D♭ melodic major scale with a key signature of 5 flats: D♭, E♭, F, G♭, A♭, B double flat, C♭, D♭. In red, the notes that differ from the major scale: B double flat, C♭." loading="lazy" decoding="async"></figure>

<h4>G♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/sol-bemol-mixta-secundaria-armadura.svg" width="918" height="122" alt="G♭ melodic major scale with a key signature of 6 flats: G♭, A♭, B♭, C♭, D♭, E double flat, F♭, G♭. In red, the notes that differ from the major scale: E double flat, F♭." loading="lazy" decoding="async"></figure>

<h4>C♭ Melodic Major Scale</h4>

<figure><img src="/assets/img/escalas/do-bemol-mixta-secundaria-armadura.svg" width="929" height="122" alt="C♭ melodic major scale with a key signature of 7 flats: C♭, D♭, E♭, F♭, G♭, A double flat, B double flat, C♭. In red, the notes that differ from the major scale: A double flat, B double flat." loading="lazy" decoding="async"></figure>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the melodic major scale?</div>
      <div class="tm-faq-a">The melodic major scale is the major scale with the sixth and seventh degrees lowered by a half step: 1 2 3 4 5 ♭6 ♭7. It is also called Mixolydian ♭6, Aeolian dominant or Hindu scale. Spanish-language conservatory books call it the secondary mixed major scale (escala mayor mixta secundaria).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the melodic major scale different from the harmonic major scale?</div>
      <div class="tm-faq-a">The harmonic major scale lowers only the sixth degree (1 2 3 4 5 ♭6 7), while the melodic major scale lowers both the sixth and the seventh (1 2 3 4 5 ♭6 ♭7). The harmonic major scale keeps the leading tone and has an augmented 2nd between the 6th and 7th degrees; the melodic major scale has neither.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it different from the Mixolydian scale?</div>
      <div class="tm-faq-a">The Mixolydian scale lowers only the seventh degree (1 2 3 4 5 6 ♭7). The melodic major scale lowers the sixth as well, so it has a minor sixth where Mixolydian has a major sixth.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the notes of C melodic major?</div>
      <div class="tm-faq-a">C D E F G A♭ B♭. Compared with C major, A becomes A♭ and B becomes B♭.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the melodic major scale the same as the descending melodic minor scale?</div>
      <div class="tm-faq-a">No. The descending melodic minor scale is the natural minor scale (C D E♭ F G A♭ B♭ for C minor). C melodic major has the same notes except for the third, which is E instead of E♭. It is also not the same set of notes as the relative minor of C, A natural minor. The correct relation is that melodic major is the fifth mode of the melodic minor scale: C melodic major is the fifth mode of F melodic minor.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
