const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/unison-and-enharmonic-notes/',
  esPath: '/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/',
  title: 'Unison and Enharmonic Notes: Chart and Examples',
  description: 'What enharmonic notes are (C♯ = D♭, F♯ = G♭) and what a unison is. Full chart of enharmonic equivalents and how they are used in harmony.',
  h1: 'Unison and Enharmonic Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],
  articleAttrs: 'data-tm-intervals',
  scripts: ['tm-piano-audio'],
  body: `<p>The <strong>unison</strong> is the zero distance between two notes that have the same name and sound exactly alike. <strong>Enharmonic notes</strong> sound the same but have different names, such as C sharp and D flat. Both ideas are basic to music writing and to the <a href="/diccionario-musical/intervalos/intervalos-musicales/">theory of intervals</a>.</p>

<h2 id="unison">Unison</h2>

<p>A unison happens when two voices or instruments play the same note at the same time. As a distance it is zero half steps: the notes neither rise nor fall. It is written as a <em>perfect unison</em> (perfect 1st) in the classification of intervals. In counterpoint it needs no preparation or resolution, and it is the most complete <a href="/diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/">consonance</a> possible.</p>

<p>Examples on the staff:</p>

<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/unisono-do.svg" width="420" height="122" alt="Two C notes in unison on the staff" loading="lazy" decoding="async">
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/unisono-sol.svg" width="420" height="122" alt="Two G notes in unison on the staff" loading="lazy" decoding="async">
  </figure>
</div>

<h2 id="enharmonic-notes">Enharmonic notes</h2>

<p>Enharmonic notes sound the same but are written with different names. This happens because the notation system uses only 7 note names, and when they are altered with sharps or flats, some notes with different names land on the same pitch.</p>

<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/enarmonicas-do-sostenido.svg" width="420" height="122" alt="C sharp and D flat as enharmonic notes on the staff" loading="lazy" decoding="async">
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/enarmonicas-sol-sostenido.svg" width="420" height="122" alt="G sharp and A flat as enharmonic notes on the staff" loading="lazy" decoding="async">
  </figure>
</div>

<h2 id="enharmonic-chart">Full chart of enharmonic equivalents</h2>

<p>All the notes that can have an alternative name in equal temperament:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Note</th><th>Enharmonic equivalent</th><th>Most common use</th></tr>
  </thead>
  <tbody>
    <tr><td>C♯</td><td>D♭</td><td>C♯ in keys with sharps; D♭ in keys with flats</td></tr>
    <tr><td>D♯</td><td>E♭</td><td>D♯ is uncommon; E♭ is usual in B♭, E♭ and A♭ major</td></tr>
    <tr><td>E</td><td>F♭</td><td>F♭ appears only in keys with 7 flats (C♭ major, A♭ minor)</td></tr>
    <tr><td>F</td><td>E♯</td><td>E♯ appears only in keys with 6 or 7 sharps (F♯ major, C♯ major, D♯ minor, A♯ minor)</td></tr>
    <tr><td>F♯</td><td>G♭</td><td>F♯ in keys with sharps; G♭ in keys with flats</td></tr>
    <tr><td>G♯</td><td>A♭</td><td>G♯ in keys with sharps; A♭ in keys with flats</td></tr>
    <tr><td>A♯</td><td>B♭</td><td>A♯ is uncommon; B♭ is usual in F, B♭, E♭… major</td></tr>
    <tr><td>B</td><td>C♭</td><td>C♭ appears only in keys with 6 or 7 flats (G♭ major, C♭ major, E♭ minor, A♭ minor)</td></tr>
    <tr><td>C</td><td>B♯</td><td>B♯ appears only in keys with 7 sharps (C♯ major, A♯ minor)</td></tr>
  </tbody>
</table>
</div>

<p>The five most frequent pairs are: <strong>C♯ = D♭, D♯ = E♭, F♯ = G♭, G♯ = A♭</strong> and <strong>A♯ = B♭</strong>. The pairs involving E♯/F♭ and B♯/C♭ appear only in keys with many accidentals (6 or 7).</p>

<h2 id="enharmonic-keys">Enharmonic keys</h2>

<p>Enharmony also applies to whole keys. There are three pairs of major keys that sound the same but are written with different names and key signatures:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Key (with sharps)</th><th>Enharmonic key (with flats)</th></tr>
  </thead>
  <tbody>
    <tr><td>F♯ major (6♯)</td><td>G♭ major (6♭)</td></tr>
    <tr><td>B major (5♯)</td><td>C♭ major (7♭)</td></tr>
    <tr><td>C♯ major (7♯)</td><td>D♭ major (5♭)</td></tr>
  </tbody>
</table>
</div>

<p>A player who plays in F♯ major and one who plays in G♭ major make exactly the same sound, but the composer chooses one spelling or the other according to the direction of the music or how easy it is to read for each instrument.</p>

<h2 id="why-names-matter">Why does the name of the note matter?</h2>

<p>In tonal harmony, a note's name is not just a label: it shows its <strong>function and its tendency to move</strong>:</p>
<ul>
  <li><strong>C♯</strong> in D major is the <em>leading tone</em> (UK: leading note): it tends to rise to D.</li>
  <li><strong>D♭</strong> in A♭ major is the <em>subdominant</em> (4th degree): it tends to fall to C.</li>
</ul>
<p>Although they sound the same on the piano, a good musician hears them with different expectations. Enharmony is also the gateway to <strong>enharmonic modulations</strong>: a pivot note is reinterpreted as another to jump between distant keys, a device widely used in Romantic music.</p>

<p>To understand the difference between diatonic and chromatic half steps, which is closely tied to enharmony, see <a href="/diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/">diatonic and chromatic half steps</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is a unison in music?</div>
    <div class="tm-faq-a">The unison is the zero distance between two notes that have the same name and sound exactly alike. Strictly speaking it is not a true interval, but the starting point for measuring intervals.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What are enharmonic notes?</div>
    <div class="tm-faq-a">Enharmonic notes sound the same but have different names. For example, C sharp and D flat are the same pitch written two different ways.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is enharmonic spelling used for?</div>
    <div class="tm-faq-a">Enharmony lets you rewrite a note in the way that best fits the key. For example, the same pitch is written C♯ in D major (where it is the leading tone) and D♭ in A♭ major (where it is the subdominant), so that each key reads and analyzes correctly.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How many pairs of enharmonic notes are there?</div>
    <div class="tm-faq-a">In equal temperament there are five basic pairs: C♯ = D♭, D♯ = E♭, F♯ = G♭, G♯ = A♭ and A♯ = B♭. B = C♭, E = F♭, F = E♯ and C = B♯ also exist in certain keys. Any of the 12 pitches of the chromatic scale can be spelled in more than one way.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Why do enharmonic notes have different names if they sound the same?</div>
    <div class="tm-faq-a">Because in tonal harmony the name implies function: C♯ is the leading tone of D major and tends to rise, while D♭ is the subdominant of A♭ major and tends to fall. The name sets the harmonic direction, not just the pitch.</div>
  </div>
</div>
</div>
</div>
</section>
`,
});
