const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/4-4-time/',
  esPath: '/diccionario-musical/compases/compas-de-4-4/',
  title: '4/4 Time Signature (Common Time): How to Count It',
  description: '4/4, or common time (C), is a simple meter with four quarter-note beats per measure, the most used meter in music. Learn how to count it, with examples.',
  h1: '4/4 Time Signature (Common Time)',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>4/4 time</strong> is a <strong>simple meter</strong> with four <strong>quarter-note</strong> (UK: crotchet) beats per measure (UK: bar). It is by far the most used meter in Western music, so much so that it is also called <strong>common time</strong> and written with the symbol <strong>C</strong>.</p>

<h2>What does 4/4 mean?</h2>

<p>In the <a href="/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/">time signature</a>, the top <strong>4</strong> says the measure has four beats and the bottom <strong>4</strong> says the note value that gets one beat is the <strong>quarter note</strong>. Because it is a simple meter, each of the four beats divides into two equal parts (two eighth notes, UK: quavers).</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-4-4-pulso.svg" width="263" height="122" alt="A measure of 4/4 with four quarter notes, one for each beat" loading="lazy" decoding="async"><figcaption>4/4 is counted in <strong>four beats</strong>; each beat is a <strong>quarter note</strong>.</figcaption></figure>

<h2>How to count 4/4</h2>

<p>Count <strong>"1&nbsp;–&nbsp;2&nbsp;–&nbsp;3&nbsp;–&nbsp;4"</strong>, with the accent pattern <strong>Strong – Weak – Medium – Weak</strong>: the main accent falls on beat 1 and a secondary accent on beat 3. Each beat can be divided into two eighth notes, giving eight eighth notes per measure:</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-4-4-subdivision.svg" width="313" height="122" alt="Eight eighth notes in 4/4 beamed in pairs (2+2+2+2)" loading="lazy" decoding="async"><figcaption>Each quarter note divides into <strong>two eighth notes</strong>: the eight are grouped <strong>2+2+2+2</strong>.</figcaption></figure>

<h2>The C symbol: common time</h2>

<p>4/4 is so common that it has its own symbol, inherited from old notation: the letter <strong>C</strong>, called <strong>common time</strong>. When that C is crossed by a vertical line (<strong>¢</strong>), it is no longer 4/4 but <a href="/diccionario-musical/compases/compas-partido/">cut time</a> (2/2, also called alla breve). You can see both symbols in context in the <a href="/diccionario-musical/compases/analizar-compases/">time signature analyzer</a>.</p>

<h2>4/4 at a glance</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Element</th><th>In 4/4</th></tr></thead>
  <tbody>
    <tr><td>Equivalent symbol</td><td>C (common time)</td></tr>
    <tr><td>Type of meter</td><td>Simple (quadruple)</td></tr>
    <tr><td>Beats per measure</td><td>4</td></tr>
    <tr><td>Beat unit</td><td>Quarter note</td></tr>
    <tr><td>Subdivision of each beat</td><td>2 eighth notes (binary)</td></tr>
    <tr><td>Accent pattern</td><td>Strong – Weak – Medium – Weak</td></tr>
  </tbody>
</table></div>

<h2>Example melody in 4/4</h2>

<p>This melody in C major shows the balance of 4/4. The last measure ends on a whole note (UK: semibreve), which fills all four beats:</p>

<figure class="tm-staff" data-tm-melody="c/4:q e/4:q g/4:q e/4:q | f/4:q d/4:8 e/4:8 f/4:q g/4:q | e/4:q d/4:q c/4:q d/4:q | c/4:w" data-tm-bpm="100"><img src="/assets/img/notacion/compases/compas-4-4-melodia.svg" width="746" height="122" alt="Example melody of four measures in 4/4, in C major" loading="lazy" decoding="async"><figcaption>Example melody in 4/4: four balanced beats. Press ▶ to listen.</figcaption></figure>

<h2>Where is 4/4 used?</h2>

<ul>
  <li><strong>Pop, rock and electronic music:</strong> the vast majority of modern songs are in 4/4.</li>
  <li><strong>Classical music:</strong> found in every genre, from the symphony to the sonata.</li>
  <li><strong>Marches and band music:</strong> the quadruple pulse supports much of the repertoire.</li>
</ul>

<h2>4/4 compared with 2/4 and 12/8</h2>

<p>Compared with <a href="/diccionario-musical/compases/compas-de-2-4/">2/4</a>, 4/4 has twice as many beats: it allows longer phrases and a secondary accent on beat 3. Compared with <a href="/diccionario-musical/compases/compas-de-12-8/">12/8</a>, its "compound twin," both have four beats with the same accent pattern, but 4/4 divides each beat in two and 12/8 divides it in three.</p>

<p>To practice this difference by ear, try the listening exercise <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the meter by ear</a>: count the beats from one accent to the next (4/4 versus 2/4) and notice whether each beat divides in two or in three (4/4 versus 12/8).</p>

<h2>How to practice 4/4</h2>

<p>Practice the four beats with the <a href="/herramientas/metronomo/?meter=4/4&amp;bpm=100">online metronome with 4/4 already selected</a>: you will hear the accent on the first beat of each measure. To identify the time signature of a score, use the <a href="/diccionario-musical/compases/analizar-compases/">time signature analyzer</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is 4/4 time?</div>
      <div class="tm-faq-a">4/4 is a simple meter with four beats per measure, each worth a quarter note. It is the most used meter in Western music and is also called common time, written with the symbol C.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is 4/4 simple or compound?</div>
      <div class="tm-faq-a">4/4 is a simple meter, because each beat divides into two equal parts (two eighth notes). Its compound twin is 12/8, which divides each beat into three.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the C in a time signature mean?</div>
      <div class="tm-faq-a">The C is the symbol for common time, which is the same as 4/4. When it is crossed by a vertical line (¢), it means cut time (alla breve), which is 2/2.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between 4/4 and 2/4?</div>
      <div class="tm-faq-a">4/4 has four beats and 2/4 has only two. 4/4 allows longer phrases and has a secondary accent on beat 3, while 2/4 is lighter and more marked.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
