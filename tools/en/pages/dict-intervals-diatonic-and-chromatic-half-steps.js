const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/diatonic-and-chromatic-half-steps/',
  esPath: '/diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/',
  title: 'Diatonic and Chromatic Half Steps: Differences',
  description: 'Diatonic half steps join two different note names (E–F); chromatic half steps alter the same note (C–C♯). Examples on the staff and in scales.',
  h1: 'Diatonic and Chromatic Half Steps',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],
  articleAttrs: 'data-tm-intervals',
  scripts: ['tm-piano-audio'],
  body: `<p>A <strong>diatonic half step</strong> (UK: diatonic semitone) is formed between two notes with <strong>different letter names</strong>, such as E–F or B–C. A <strong>chromatic half step</strong> is formed between two notes with the <strong>same letter name</strong> and a different accidental, such as C–C♯. Both measure exactly the same, one half step, but they are written and they work differently. This distinction is one of the keys to music notation and to the study of <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps and half steps</a>: the diatonic half step is written as a minor 2nd and the chromatic half step as an augmented unison.</p>

<!-- TODO-IMG: /assets/img/notacion/intervalos/semitono-cromatico-vs-diatonico.svg (C–C♯ chromatic vs C–D♭ diatonic, same sound written two ways) -->
<p><strong>The same sound, two spellings:</strong> C–C♯ is a <strong>chromatic</strong> half step (same letter name) and C–D♭ is a <strong>diatonic</strong> one (different letter names).</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Type</th>
      <th>Notes</th>
      <th>Examples</th>
      <th>Written interval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Diatonic</strong></td>
      <td>Different letter names</td>
      <td>E–F, B–C, A♯–B, D♯–E</td>
      <td>minor 2nd</td>
    </tr>
    <tr>
      <td><strong>Chromatic</strong></td>
      <td>Same letter name</td>
      <td>C–C♯, G♯–G, B–B♯, E–E♭</td>
      <td>Augmented unison</td>
    </tr>
  </tbody>
</table>
</div>

<p>In equal temperament both types measure exactly the same (100 cents, one half step). The difference lies only in spelling and in harmonic function.</p>

<h2 id="what-is-a-diatonic-half-step">What is a diatonic half step?</h2>

<p>A <strong>diatonic half step</strong> is one in which the letter names of the two notes are different, for example <strong>E–F</strong>, <strong>B–C</strong> or A♯–B, always keeping the distance of one half step. Because it uses two different letter names, it is written as a <strong>minor 2nd</strong>, and it is the half step that occurs naturally within scales.</p>

<p>The staves below show several examples of diatonic half steps.</p>

<div class="tm-img-grid-2">
<figure><img src="/assets/img/notacion/intervalos/semitono-diatonico-3.svg" width="420" height="122" alt="Diatonic half step: A sharp and B on the staff" loading="lazy" decoding="async"><figcaption>A♯ - B</figcaption></figure>
<figure><img src="/assets/img/notacion/intervalos/semitono-diatonico-4.svg" width="420" height="122" alt="Diatonic half step: D sharp and E on the staff" loading="lazy" decoding="async"><figcaption>D♯ - E</figcaption></figure>
</div>

<div class="tm-img-grid-2">
<figure><img src="/assets/img/notacion/intervalos/semitono-diatonico-1.svg" width="420" height="122" alt="Diatonic half step: E and F on the staff" loading="lazy" decoding="async"><figcaption>E - F</figcaption></figure>
<figure><img src="/assets/img/notacion/intervalos/semitono-diatonico-2.svg" width="420" height="122" alt="Diatonic half step: G and A flat on the staff" loading="lazy" decoding="async"><figcaption>G - A♭</figcaption></figure>
</div>

<h2 id="what-is-a-chromatic-half-step">What is a chromatic half step?</h2>

<p>A <strong>chromatic half step</strong> is one in which the two note names are the same, with a different <a href="/diccionario-musical/alteraciones/">accidental</a>, always keeping the distance of one half step.</p>

<p>The staves below show several examples of chromatic half steps.</p>

<div class="tm-img-grid-2">
<figure><img src="/assets/img/notacion/intervalos/semitono-cromatico-4.svg" width="420" height="122" alt="Chromatic half step: B and B sharp on the staff" loading="lazy" decoding="async"><figcaption>B - B♯</figcaption></figure>
<figure><img src="/assets/img/notacion/intervalos/semitono-cromatico-3.svg" width="420" height="122" alt="Chromatic half step: C and C sharp on the staff" loading="lazy" decoding="async"><figcaption>C - C♯</figcaption></figure>
</div>

<div class="tm-img-grid-2">
<figure><img src="/assets/img/notacion/intervalos/semitono-cromatico-2.svg" width="420" height="122" alt="Chromatic half step: G sharp and G on the staff" loading="lazy" decoding="async"><figcaption>G♯ - G</figcaption></figure>
<figure><img src="/assets/img/notacion/intervalos/semitono-cromatico-1.svg" width="420" height="122" alt="Chromatic half step: E and E flat on the staff" loading="lazy" decoding="async"><figcaption>E - E♭</figcaption></figure>
</div>

<h2 id="how-to-tell">How to tell the two types apart</h2>

<p>The rule is simple: look at the letter names.</p>
<ul>
  <li>If the two notes have <strong>different letter names</strong> (C and D♭, E and F, A♯ and B) → <strong>diatonic</strong>. It is written as a <em>minor 2nd</em>.</li>
  <li>If the two notes have <strong>the same letter name</strong> (C and C♯, G and G♭) → <strong>chromatic</strong>. It is written as an <em>augmented unison</em>.</li>
</ul>

<p>In scales and most melodies, the half steps between consecutive scale degrees are <strong>diatonic</strong>: the notes always have different letter names. Chromatic half steps appear when a note is altered in passing, as in a chromatic passage, where the direction of the line usually decides the spelling (C–C♯ going up, D–D♭ going down). Writing C–C♯ where the key and the context call for C–D♭ is a spelling error, even though the notes sound the same on the piano.</p>

<h2 id="in-scales">Where diatonic half steps appear in scales</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Scale</th><th>Diatonic half steps</th><th>Between scale degrees</th></tr>
  </thead>
  <tbody>
    <tr><td>C major</td><td>E–F, B–C</td><td>3–4 and 7–8</td></tr>
    <tr><td>A natural minor</td><td>B–C, E–F</td><td>2–3 and 5–6</td></tr>
    <tr><td>A harmonic minor</td><td>B–C, E–F, G♯–A</td><td>2–3, 5–6 and 7–8</td></tr>
    <tr><td>A melodic minor (ascending)</td><td>B–C, G♯–A</td><td>2–3 and 7–8</td></tr>
  </tbody>
</table>
</div>

<p>In all these cases, the half steps within the scale are <strong>diatonic</strong>: between notes with different letter names.</p>

<p>The chromatic half step is closely related to the idea of <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic notes</a>: C and C♯ share a letter name, but C♯ sounds the same as D♭, which has a different letter name.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is a diatonic half step?</div>
    <div class="tm-faq-a">A diatonic half step is the distance of a half step between two notes with different letter names, such as E–F or B–C. It is the natural half step that appears between the 3rd and 4th degrees and between the 7th and 8th degrees of the major scale.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is a chromatic half step?</div>
    <div class="tm-faq-a">A chromatic half step is the distance of a half step between two notes with the same letter name and a different accidental, such as C–C♯ or F–F♯. It alters a note without changing its scale degree.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the difference between a diatonic and a chromatic half step?</div>
    <div class="tm-faq-a">A diatonic half step is formed between two notes with different letter names, such as E and F. A chromatic half step is formed between two notes with the same letter name and a different accidental, such as C and C sharp.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Do a diatonic and a chromatic half step sound the same?</div>
    <div class="tm-faq-a">Yes. In equal temperament both measure exactly the same. The difference is in the spelling: the diatonic half step uses two different letter names and the chromatic half step uses the same letter name with a different accidental.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is an example of a diatonic half step?</div>
    <div class="tm-faq-a">The most common examples are E–F and B–C among the natural notes. A♯–B and D♯–E are also diatonic half steps, because they use two different letter names.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Where do diatonic half steps fall in the major scale?</div>
    <div class="tm-faq-a">In the major scale, the diatonic half steps always fall between the 3rd and 4th degrees (E–F in C major) and between the 7th and 8th degrees (B–C in C major). These two fixed positions give the major scale its characteristic sound.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Why does it matter to tell diatonic and chromatic half steps apart?</div>
    <div class="tm-faq-a">Because tonal notation uses a different letter name for each scale degree: a diatonic half step (E–F) and a chromatic one (E–E♯) sound the same but are written differently. Using the wrong type produces spelling errors and makes the music harder to read at sight.</div>
  </div>
</div>
</div>
</div>
</section>
`,
});
