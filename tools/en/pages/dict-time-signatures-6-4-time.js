const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/6-4-time/',
  esPath: '/diccionario-musical/compases/compas-de-6-4/',
  title: '6/4 Time Signature: Meaning, Counting and Hemiola',
  description: '6/4 is a compound meter with two dotted-half-note beats per measure. Learn how to count it, how it differs from 6/8 and 3/2, and what a hemiola is.',
  h1: '6/4 Time Signature',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>6/4 time</strong> is a <strong>compound meter</strong> with two beats: the six quarter notes (UK: crotchets) group in threes to form <strong>two pulses</strong>, each equal to a <strong>dotted half note</strong> (UK: dotted minim). It is the "big brother" of <a href="/diccionario-musical/compases/compas-de-6-8/">6/8</a>: the same structure, but with the quarter note as the subdivision instead of the eighth note.</p>

<h2>What does 6/4 mean?</h2>

<p>In the <a href="/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/">time signature</a>, the top number <strong>6</strong> says that six quarter notes fit in the measure (UK: bar) and the bottom number <strong>4</strong> says the reference note value is the quarter note. Those six quarter notes group into <strong>two sets of three</strong>, so 6/4 is normally counted in <strong>two</strong> (although at very slow tempos it can be felt in six).</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-6-4-pulso.svg" width="257" height="122" alt="A measure of 6/4 with two dotted half notes, one for each beat" loading="lazy" decoding="async"><figcaption>6/4 is counted in <strong>two pulses</strong>; each is a <strong>dotted half note</strong>.</figcaption></figure>

<h2>How to count 6/4</h2>

<p>Each of the two beats divides into <strong>three quarter notes</strong> (ternary subdivision). The six quarter notes group 3+3, with the strong accent on the first note of each group:</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-6-4-subdivision.svg" width="347" height="122" alt="Six quarter notes in 6/4 grouped conceptually in threes (3+3)" loading="lazy" decoding="async"><figcaption>Each beat divides into <strong>three quarter notes</strong>: the six are grouped <strong>3+3</strong>.</figcaption></figure>

<h2>6/4 at a glance</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Element</th><th>In 6/4</th></tr></thead>
  <tbody>
    <tr><td>Type of meter</td><td>Compound (duple)</td></tr>
    <tr><td>Beats per measure</td><td>2</td></tr>
    <tr><td>Beat unit</td><td>Dotted half note</td></tr>
    <tr><td>Subdivision of each beat</td><td>3 quarter notes (ternary)</td></tr>
    <tr><td>Quarter notes per measure</td><td>6 (grouped 3+3)</td></tr>
    <tr><td>Accent pattern</td><td>Strong – Weak</td></tr>
  </tbody>
</table></div>

<h2>Example melody in 6/4</h2>

<p>This melody in C major shows the broad character of 6/4. It ends with two dotted half notes, one for each beat:</p>

<figure class="tm-staff" data-tm-melody="c/4:q d/4:8 e/4:8 f/4:q g/4:q a/4:8 g/4:8 e/4:q | g/4:h. c/4:h." data-tm-bpm="100"><img src="/assets/img/notacion/compases/compas-6-4-melodia.svg" width="547" height="122" alt="Example melody of two measures in 6/4, in C major" loading="lazy" decoding="async"><figcaption>Example melody in 6/4: two broad ternary beats. Press ▶ to listen.</figcaption></figure>

<h2>Where is 6/4 used?</h2>

<ul>
  <li><strong>Renaissance and Baroque music:</strong> frequent in broad passages of a solemn character.</li>
  <li><strong>Modern music:</strong> it appears in passages that look for a wide, swaying triple feel.</li>
</ul>

<h2>6/4 compared with 6/8 and 3/2</h2>

<p>6/4 and <a href="/diccionario-musical/compases/compas-de-6-8/">6/8</a> have the <strong>same structure</strong>: two compound beats grouped 3+3. Only the beat unit changes (a dotted half note in 6/4, a dotted quarter note in 6/8). <a href="/diccionario-musical/compases/compas-de-3-2/">3/2</a>, on the other hand, also holds six quarter notes, but grouped <strong>2+2+2</strong> (three simple beats), not 3+3.</p>

<h2>6/4 and the hemiola (3 against 2)</h2>

<p>The fact that 6/4 and <a href="/diccionario-musical/compases/compas-de-3-2/">3/2</a> hold the <strong>same six quarter notes</strong>, grouped 3+3 in one and 2+2+2 in the other, is the basis of an important rhythmic device, the <strong>hemiola</strong> (from the Greek <em>hēmiólios</em>, "one and a half," the <strong>3:2</strong> ratio).</p>

<p>A hemiola happens when, within a measure of 6/4 (or across two measures of <a href="/diccionario-musical/compases/compas-de-3-4/">3/4</a>), the music <strong>re-accents</strong> the six quarter notes as <strong>three groups of two</strong> instead of two groups of three. For a moment the ear moves from feeling "two" (6/4) to feeling "three" (3/2), without any change in the time signature:</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-6-4-hemiolia.svg" width="347" height="122" alt="Hemiola in 6/4: the six quarter notes re-accented on beats 1, 3 and 5 (three groups of two)" loading="lazy" decoding="async"><figcaption>Hemiola: the six quarter notes of 6/4, normally accented on 1 and 4 (3+3), are re-accented on <strong>1, 3 and 5</strong> (2+2+2) and sound like <a href="/diccionario-musical/compases/compas-de-3-2/">3/2</a>.</figcaption></figure>

<p>The hemiola is typical of <strong>Baroque cadences</strong> (Bach and Handel use it constantly before the final chord), of the French <em>courante</em>, and of <strong>Spanish and Latin American</strong> music: the 6/8 ↔ 3/4 sway of the jota, the guajira or the huapango, known in Spanish tradition as the <em>sesquialtera</em>, is the same game of 3 against 2.</p>

<h2>How to practice 6/4</h2>

<p>Practice the two ternary beats with a steady pulse on the <a href="/herramientas/metronomo/">online metronome</a>, and check the time signature of a score with the <a href="/diccionario-musical/compases/analizar-compases/">time signature analyzer</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is 6/4 time?</div>
      <div class="tm-faq-a">6/4 is a compound meter with two beats. The six quarter notes group in threes (3+3), so it is counted in two pulses, each equal to a dotted half note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is 6/4 simple or compound?</div>
      <div class="tm-faq-a">6/4 is normally treated as a compound meter with two beats, with the dotted half note as the beat unit. At very slow tempos it can also be felt in six.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between 6/4 and 6/8?</div>
      <div class="tm-faq-a">They have the same structure (two compound beats, grouped 3+3). Only the beat unit changes: a dotted half note in 6/4 and a dotted quarter note in 6/8.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between 6/4 and 3/2?</div>
      <div class="tm-faq-a">Both hold six quarter notes, but 6/4 groups them 3+3 (two compound beats) and 3/2 groups them 2+2+2 (three simple beats).</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
