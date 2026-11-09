const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/cut-time/',
  esPath: '/diccionario-musical/compases/compas-partido/',
  title: 'Cut Time (Alla Breve, 2/2): Meaning and How to Count',
  description: 'Cut time, or alla breve (¢), equals 2/2: two half-note beats per measure. Learn what the symbol means, how it differs from common time, and hear it.',
  h1: 'Cut Time (Alla Breve, 2/2)',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>Cut time</strong>, also called <em>alla breve</em>, is a <strong>simple meter</strong> with two <strong>half-note</strong> (UK: minim) beats per measure (UK: bar), equal to <strong>2/2</strong>. It is written with the symbol <strong>¢</strong> (a C with a vertical line through it), and it means counting "in two" what would otherwise be written in four beats. In Spanish it is called <em>compás partido</em>, "split time."</p>

<h2>What is cut time?</h2>

<p>Cut time is the same as the time signature <strong>2/2</strong>: two beats per measure, each worth a <strong>half note</strong>. The name comes from the symbol: <a href="/diccionario-musical/compases/analizar-compases/">common time</a> (the C that stands for 4/4) is "cut" by a vertical line, which halves the number of beats: instead of four quarter-note beats you count two half-note beats.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-partido-pulso.svg" width="223" height="122" alt="A measure of cut time (alla breve) with two half notes, one for each beat" loading="lazy" decoding="async"><figcaption>Cut time is counted in <strong>two beats</strong>; each beat is a <strong>half note</strong>.</figcaption></figure>

<h2>How to count cut time</h2>

<p>Count <strong>"1&nbsp;–&nbsp;2"</strong>, leaning on the 1. Each half note divides into <strong>two quarter notes</strong> (UK: crotchets), so the four quarter notes of the measure group 2+2. The point of <em>alla breve</em> is exactly this: although there are four quarter notes, you feel <strong>two pulses</strong>, not four, which lightens the music at fast tempos.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-partido-subdivision.svg" width="263" height="122" alt="Four quarter notes in cut time grouped in pairs (2+2)" loading="lazy" decoding="async"><figcaption>Each half note divides into <strong>two quarter notes</strong>: the four are grouped <strong>2+2</strong>.</figcaption></figure>

<h2>Cut time (2/2) at a glance</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Element</th><th>In cut time (¢)</th></tr></thead>
  <tbody>
    <tr><td>Symbol</td><td>¢ (cut C)</td></tr>
    <tr><td>Equivalent time signature</td><td>2/2</td></tr>
    <tr><td>Type of meter</td><td>Simple (duple)</td></tr>
    <tr><td>Beats per measure</td><td>2</td></tr>
    <tr><td>Beat unit</td><td>Half note</td></tr>
    <tr><td>Subdivision of each beat</td><td>2 quarter notes (binary)</td></tr>
    <tr><td>Accent pattern</td><td>Strong – Weak</td></tr>
  </tbody>
</table></div>

<h2>Example melody in cut time</h2>

<p>This melody in C major is felt "in two" even though the first measure has four quarter notes. That is the light character of <em>alla breve</em>:</p>

<figure class="tm-staff" data-tm-melody="g/4:q e/4:q c/4:q e/4:q | g/4:h c/5:h" data-tm-bpm="120"><img src="/assets/img/notacion/compases/compas-partido-melodia.svg" width="403" height="122" alt="Example melody of two measures in cut time (alla breve), in C major" loading="lazy" decoding="async"><figcaption>Example melody in cut time: two half-note pulses, with an agile character. Press ▶ to listen.</figcaption></figure>

<h2>Cut time (¢) compared with common time (C)</h2>

<p>This is the most frequent confusion between the two symbols inherited from old notation:</p>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Symbol</th><th>Means</th><th>Beats</th><th>Beat unit</th></tr></thead>
  <tbody>
    <tr><td><strong>C</strong> (common time)</td><td>4/4</td><td>4</td><td>Quarter note</td></tr>
    <tr><td><strong>¢</strong> (cut time)</td><td>2/2</td><td>2</td><td>Half note</td></tr>
  </tbody>
</table></div>

<p>Both meters hold the same total length (one whole note), but common time is felt in four and cut time in two. You can see both symbols in context in the <a href="/diccionario-musical/compases/analizar-compases/">time signature analyzer</a>.</p>

<h2>Where is cut time used?</h2>

<ul>
  <li><strong>Fast marches:</strong> <em>alla breve</em> gives the brisk pulse of a lively march.</li>
  <li><strong>Early and Baroque music:</strong> common in fast movements and fugues.</li>
  <li><strong>Overtures and finales:</strong> counting in two conveys lightness and speed.</li>
</ul>

<h2>How to practice cut time</h2>

<p>Practice the half-note pulse with a steady click on the <a href="/herramientas/metronomo/">online metronome</a>, and check the time signature of a score with the <a href="/diccionario-musical/compases/analizar-compases/">time signature analyzer</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is cut time?</div>
      <div class="tm-faq-a">Cut time, or alla breve, is a simple meter with two half-note beats per measure, equal to 2/2. It is written with the symbol ¢ (a C with a vertical line through it) and means counting in two what would otherwise be written in four.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the ¢ symbol mean?</div>
      <div class="tm-faq-a">The symbol ¢ means cut time (alla breve), that is, 2/2. It is common time (C, which is 4/4) "cut" in half: instead of four quarter-note beats you count two half-note beats.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between cut time and common time?</div>
      <div class="tm-faq-a">Common time (C) is 4/4: four quarter-note beats. Cut time (¢) is 2/2: two half-note beats. Both add up to a whole note, but common time is felt in four and cut time in two.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is cut time used?</div>
      <div class="tm-faq-a">It makes fast music feel agile: counting two half-note beats instead of four quarter-note beats lets the music flow more lightly. It is common in fast marches, Baroque music and overtures.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
