const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/music-dictionary/keys-and-scales/major-scales/natural-major-scales/",
  esPath: "/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/",
  title: "Natural Major Scales: All 15 Keys, Notes and Key Signatures",
  description: "The 15 major scales with notes and key signatures: the whole-whole-half-whole-whole-whole-half pattern, from C major to every key with sharps or flats.",
  h1: "Natural Major Scales",
  crumbs: [["Music Dictionary","/diccionario-musical/"],["Keys and Scales","/diccionario-musical/tonalidades/"],["Major Scales","/diccionario-musical/tonalidades/escalas-mayores/"]],
  scripts: ['tm-piano-audio'],
  body: `<p>The major scale is the most basic scale of Western music. Every major scale has eight notes in a row (seven different notes, then the octave) and follows the same pattern of steps: <strong>whole step, whole step, half step, whole step, whole step, whole step, half step</strong> (UK: tone, tone, semitone, tone, tone, tone, semitone). Start that pattern on any note and you get the major scale of that note. On this page we call it the <em>natural major scale</em> to tell it apart from the variants that change one or two of its notes: the <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixtas-principales/">harmonic major</a>, <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixolidias/">Mixolydian</a> and <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixtas-secundarias/">melodic major</a> scales. Each of the seven notes is a <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degree</a> with its own name and function (tonic, dominant, leading tone...).</p>

<figure><img src="/assets/img/escalas/do-mayor-dentro.svg" width="840" height="147" alt="C major scale, no accidentals: C, D, E, F, G, A, B, C. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<p>A scale can be written in two ways: with the accidentals written next to the notes inside the scale, or with a <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">key signature</a> at the start of the staff (UK: stave). Both ways sound the same. Exercises usually ask for one of them, so practice both.</p>

<h2 id="table-natural-major-scales">All 15 natural major scales</h2>
<p>Fifteen major keys are usually written out: C major (no accidentals), seven keys with sharps and seven keys with flats. The last column shows the key signature.</p>
<div class="tm-table-wrap">
<table class="tm-table tm-scales" data-notes-cols="1-7" data-figures>
  <thead>
    <tr><th>Scale</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>Accidentals</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>C major</strong></td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>A</td><td>B</td><td>None</td></tr>
    <tr><td><strong>G major</strong></td><td>G</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F♯</td><td>1♯: F♯</td></tr>
    <tr><td><strong>D major</strong></td><td>D</td><td>E</td><td>F♯</td><td>G</td><td>A</td><td>B</td><td>C♯</td><td>2♯: F♯ C♯</td></tr>
    <tr><td><strong>A major</strong></td><td>A</td><td>B</td><td>C♯</td><td>D</td><td>E</td><td>F♯</td><td>G♯</td><td>3♯: F♯ C♯ G♯</td></tr>
    <tr><td><strong>E major</strong></td><td>E</td><td>F♯</td><td>G♯</td><td>A</td><td>B</td><td>C♯</td><td>D♯</td><td>4♯: F♯ C♯ G♯ D♯</td></tr>
    <tr><td><strong>B major</strong></td><td>B</td><td>C♯</td><td>D♯</td><td>E</td><td>F♯</td><td>G♯</td><td>A♯</td><td>5♯: F♯ C♯ G♯ D♯ A♯</td></tr>
    <tr><td><strong>F♯ major</strong></td><td>F♯</td><td>G♯</td><td>A♯</td><td>B</td><td>C♯</td><td>D♯</td><td>E♯</td><td>6♯: F♯ C♯ G♯ D♯ A♯ E♯</td></tr>
    <tr><td><strong>C♯ major</strong></td><td>C♯</td><td>D♯</td><td>E♯</td><td>F♯</td><td>G♯</td><td>A♯</td><td>B♯</td><td>7♯: F♯ C♯ G♯ D♯ A♯ E♯ B♯</td></tr>
    <tr><td><strong>F major</strong></td><td>F</td><td>G</td><td>A</td><td>B♭</td><td>C</td><td>D</td><td>E</td><td>1♭: B♭</td></tr>
    <tr><td><strong>B♭ major</strong></td><td>B♭</td><td>C</td><td>D</td><td>E♭</td><td>F</td><td>G</td><td>A</td><td>2♭: B♭ E♭</td></tr>
    <tr><td><strong>E♭ major</strong></td><td>E♭</td><td>F</td><td>G</td><td>A♭</td><td>B♭</td><td>C</td><td>D</td><td>3♭: B♭ E♭ A♭</td></tr>
    <tr><td><strong>A♭ major</strong></td><td>A♭</td><td>B♭</td><td>C</td><td>D♭</td><td>E♭</td><td>F</td><td>G</td><td>4♭: B♭ E♭ A♭ D♭</td></tr>
    <tr><td><strong>D♭ major</strong></td><td>D♭</td><td>E♭</td><td>F</td><td>G♭</td><td>A♭</td><td>B♭</td><td>C</td><td>5♭: B♭ E♭ A♭ D♭ G♭</td></tr>
    <tr><td><strong>G♭ major</strong></td><td>G♭</td><td>A♭</td><td>B♭</td><td>C♭</td><td>D♭</td><td>E♭</td><td>F</td><td>6♭: B♭ E♭ A♭ D♭ G♭ C♭</td></tr>
    <tr><td><strong>C♭ major</strong></td><td>C♭</td><td>D♭</td><td>E♭</td><td>F♭</td><td>G♭</td><td>A♭</td><td>B♭</td><td>7♭: B♭ E♭ A♭ D♭ G♭ C♭ F♭</td></tr>
  </tbody>
</table>
</div>

<h2>Accidentals written inside the scale</h2>

<h3>Keys with sharps</h3>

<h4>G Major Scale</h4>

<figure><img src="/assets/img/escalas/sol-mayor-dentro.svg" width="840" height="147" alt="G major scale, with the accidentals written next to each note: G, A, B, C, D, E, F♯, G. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>D Major Scale</h4>

<figure><img src="/assets/img/escalas/re-mayor-dentro.svg" width="840" height="147" alt="D major scale, with the accidentals written next to each note: D, E, F♯, G, A, B, C♯, D. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>A Major Scale</h4>

<figure><img src="/assets/img/escalas/la-mayor-dentro.svg" width="840" height="147" alt="A major scale, with the accidentals written next to each note: A, B, C♯, D, E, F♯, G♯, A. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>E Major Scale</h4>

<figure><img src="/assets/img/escalas/mi-mayor-dentro.svg" width="840" height="147" alt="E major scale, with the accidentals written next to each note: E, F♯, G♯, A, B, C♯, D♯, E. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>B Major Scale</h4>

<figure><img src="/assets/img/escalas/si-mayor-dentro.svg" width="840" height="147" alt="B major scale, with the accidentals written next to each note: B, C♯, D♯, E, F♯, G♯, A♯, B. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>F♯ Major Scale</h4>

<figure><img src="/assets/img/escalas/fa-sostenido-mayor-dentro.svg" width="854" height="147" alt="F♯ major scale, with the accidentals written next to each note: F♯, G♯, A♯, B, C♯, D♯, E♯, F♯. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>C♯ Major Scale</h4>

<figure><img src="/assets/img/escalas/do-sostenido-mayor-dentro.svg" width="856" height="147" alt="C♯ major scale, with the accidentals written next to each note: C♯, D♯, E♯, F♯, G♯, A♯, B♯, C♯. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h3>Keys with flats</h3>

<h4>F Major Scale</h4>

<figure><img src="/assets/img/escalas/fa-mayor-dentro.svg" width="840" height="147" alt="F major scale, with the accidentals written next to each note: F, G, A, B♭, C, D, E, F. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>B♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/si-bemol-mayor-dentro.svg" width="853" height="147" alt="B♭ major scale, with the accidentals written next to each note: B♭, C, D, E♭, F, G, A, B♭. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>E♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/mi-bemol-mayor-dentro.svg" width="853" height="147" alt="E♭ major scale, with the accidentals written next to each note: E♭, F, G, A♭, B♭, C, D, E♭. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>A♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/la-bemol-mayor-dentro.svg" width="853" height="147" alt="A♭ major scale, with the accidentals written next to each note: A♭, B♭, C, D♭, E♭, F, G, A♭. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>D♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/re-bemol-mayor-dentro.svg" width="853" height="147" alt="D♭ major scale, with the accidentals written next to each note: D♭, E♭, F, G♭, A♭, B♭, C, D♭. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>G♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/sol-bemol-mayor-dentro.svg" width="853" height="147" alt="G♭ major scale, with the accidentals written next to each note: G♭, A♭, B♭, C♭, D♭, E♭, F, G♭. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h4>C♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/do-bemol-mayor-dentro.svg" width="853" height="147" alt="C♭ major scale, with the accidentals written next to each note: C♭, D♭, E♭, F♭, G♭, A♭, B♭, C♭. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"></figure>

<h2>Accidentals in the key signature</h2>

<h3>Keys with sharps</h3>

<h4>G Major Scale</h4>

<figure><img src="/assets/img/escalas/sol-mayor-armadura.svg" width="862" height="122" alt="G major scale with a key signature of 1 sharp: G, A, B, C, D, E, F♯, G." loading="lazy" decoding="async"></figure>

<h4>D Major Scale</h4>

<figure><img src="/assets/img/escalas/re-mayor-armadura.svg" width="874" height="122" alt="D major scale with a key signature of 2 sharps: D, E, F♯, G, A, B, C♯, D." loading="lazy" decoding="async"></figure>

<h4>A Major Scale</h4>

<figure><img src="/assets/img/escalas/la-mayor-armadura.svg" width="888" height="122" alt="A major scale with a key signature of 3 sharps: A, B, C♯, D, E, F♯, G♯, A." loading="lazy" decoding="async"></figure>

<h4>E Major Scale</h4>

<figure><img src="/assets/img/escalas/mi-mayor-armadura.svg" width="901" height="122" alt="E major scale with a key signature of 4 sharps: E, F♯, G♯, A, B, C♯, D♯, E." loading="lazy" decoding="async"></figure>

<h4>B Major Scale</h4>

<figure><img src="/assets/img/escalas/si-mayor-armadura.svg" width="914" height="122" alt="B major scale with a key signature of 5 sharps: B, C♯, D♯, E, F♯, G♯, A♯, B." loading="lazy" decoding="async"></figure>

<h4>F♯ Major Scale</h4>

<figure><img src="/assets/img/escalas/fa-sostenido-mayor-armadura.svg" width="926" height="122" alt="F♯ major scale with a key signature of 6 sharps: F♯, G♯, A♯, B, C♯, D♯, E♯, F♯." loading="lazy" decoding="async"></figure>

<h4>C♯ Major Scale</h4>

<figure><img src="/assets/img/escalas/do-sostenido-mayor-armadura.svg" width="940" height="122" alt="C♯ major scale with a key signature of 7 sharps: C♯, D♯, E♯, F♯, G♯, A♯, B♯, C♯." loading="lazy" decoding="async"></figure>

<h3>Keys with flats</h3>

<h4>F Major Scale</h4>

<figure><img src="/assets/img/escalas/fa-mayor-armadura.svg" width="860" height="122" alt="F major scale with a key signature of 1 flat: F, G, A, B♭, C, D, E, F." loading="lazy" decoding="async"></figure>

<h4>B♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/si-bemol-mayor-armadura.svg" width="871" height="122" alt="B♭ major scale with a key signature of 2 flats: B♭, C, D, E♭, F, G, A, B♭." loading="lazy" decoding="async"></figure>

<h4>E♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/mi-bemol-mayor-armadura.svg" width="883" height="122" alt="E♭ major scale with a key signature of 3 flats: E♭, F, G, A♭, B♭, C, D, E♭." loading="lazy" decoding="async"></figure>

<h4>A♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/la-bemol-mayor-armadura.svg" width="895" height="122" alt="A♭ major scale with a key signature of 4 flats: A♭, B♭, C, D♭, E♭, F, G, A♭." loading="lazy" decoding="async"></figure>

<h4>D♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/re-bemol-mayor-armadura.svg" width="906" height="122" alt="D♭ major scale with a key signature of 5 flats: D♭, E♭, F, G♭, A♭, B♭, C, D♭." loading="lazy" decoding="async"></figure>

<h4>G♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/sol-bemol-mayor-armadura.svg" width="918" height="122" alt="G♭ major scale with a key signature of 6 flats: G♭, A♭, B♭, C♭, D♭, E♭, F, G♭." loading="lazy" decoding="async"></figure>

<h4>C♭ Major Scale</h4>

<figure><img src="/assets/img/escalas/do-bemol-mayor-armadura.svg" width="929" height="122" alt="C♭ major scale with a key signature of 7 flats: C♭, D♭, E♭, F♭, G♭, A♭, B♭, C♭." loading="lazy" decoding="async"></figure>

<h2>Order of the keys with sharps</h2>

<ol>
  <li>G major has 1 sharp.</li>
  <li>D major has 2 sharps.</li>
  <li>A major has 3 sharps.</li>
  <li>E major has 4 sharps.</li>
  <li>B major has 5 sharps.</li>
  <li>F♯ major has 6 sharps.</li>
  <li>C♯ major has 7 sharps.</li>
</ol>

<p>Each new key with sharps is found by going up a perfect 5th from the previous tonic, starting on C (C, G, D, A, E, B, F♯, C♯). It adds one sharp, always on the new leading tone.</p>

<h2>Order of the keys with flats</h2>

<ol>
  <li>F major has 1 flat.</li>
  <li>B♭ major has 2 flats.</li>
  <li>E♭ major has 3 flats.</li>
  <li>A♭ major has 4 flats.</li>
  <li>D♭ major has 5 flats.</li>
  <li>G♭ major has 6 flats.</li>
  <li>C♭ major has 7 flats.</li>
</ol>

<p>Each new key with flats is found by going down a perfect 5th from the previous tonic, starting on C (C, F, B♭, E♭, A♭, D♭, G♭, C♭). It adds one flat. Three pairs of keys sound the same although they are written differently (B major and C♭ major, F♯ major and G♭ major, C♯ major and D♭ major); this is an example of <a href="/diccionario-musical/intervalos/notas-enarmonicas/">enharmony</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is a major scale built?</div>
      <div class="tm-faq-a">A major scale is built by applying the pattern whole step, whole step, half step, whole step, whole step, whole step, half step from the tonic. These seven steps give the eight notes of any major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many major scales are there?</div>
      <div class="tm-faq-a">Fifteen major scales are usually written out: C major (no accidentals), seven with sharps (G, D, A, E, B, F♯, C♯) and seven with flats (F, B♭, E♭, A♭, D♭, G♭, C♭). Because B, F♯ and C♯ major sound the same as C♭, G♭ and D♭ major, there are only 12 different major scales by sound. Conservatories ask for all 15 to practice reading key signatures.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many sharps or flats does each major key have?</div>
      <div class="tm-faq-a">G major has 1 sharp, D major 2, A major 3, E major 4, B major 5, F♯ major 6 and C♯ major 7. For flats: F major has 1, B♭ major 2, E♭ major 3, A♭ major 4, D♭ major 5, G♭ major 6 and C♭ major 7.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the notes of the G major scale?</div>
      <div class="tm-faq-a">G A B C D E F♯. It is the first key with sharps and has only one, F♯. Applying the pattern whole, whole, half, whole, whole, whole, half from G gives exactly these seven notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I build a major scale step by step?</div>
      <div class="tm-faq-a">Choose the tonic and apply the pattern: whole step (2 half steps), whole step, half step (1 half step), whole step, whole step, whole step, half step. For example, from D: D, E (whole step), F♯ (whole step), G (half step), A (whole step), B (whole step), C♯ (whole step), D (half step). A scale uses seven different letter names, one for each degree.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
