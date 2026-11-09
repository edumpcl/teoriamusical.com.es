const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/6-8-time/',
  esPath: '/diccionario-musical/compases/compas-de-6-8/',
  title: '6/8 Time Signature: How to Count It, With Examples',
  description: '6/8 is a compound meter with two dotted-quarter-note beats per measure. Learn how to count it, why it is felt in two, and how it differs from 3/4.',
  h1: '6/8 Time Signature',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>6/8 time</strong> is a <strong>compound meter</strong> with two beats. Although the top number says that six <strong>eighth notes</strong> (UK: quavers) fit in each measure (UK: bar), it is not counted in six but <strong>in two pulses</strong>, each equal to a <a href="/diccionario-musical/puntillo/">dotted quarter note</a> (UK: dotted crotchet). It is one of the most common meters in traditional and popular music, and it is responsible for the characteristic sway of jigs, barcarolles and ballads.</p>

<h2>What does 6/8 mean?</h2>

<p>In the <a href="/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/">time signature</a>, the top number <strong>6</strong> tells you how many eighth notes fit in each measure, and the bottom number <strong>8</strong> says the reference note value is the eighth note (one eighth of a whole note). But those six eighth notes <strong>are not six beats</strong>: they group in threes to form <strong>two beats</strong>. That is why 6/8 is a compound meter and is counted in <strong>two</strong>.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-6-8-pulso.svg" width="199" height="122" alt="A measure of 6/8 with two dotted quarter notes, one for each beat" loading="lazy" decoding="async"><figcaption>6/8 is counted in <strong>two pulses</strong>; each is a <strong>dotted quarter note</strong>.</figcaption></figure>

<h2>How to count 6/8</h2>

<p>Each of the two beats divides into <strong>three eighth notes</strong> (ternary subdivision). The usual way to count aloud is <strong>"1&nbsp;2&nbsp;3&nbsp;–&nbsp;4&nbsp;5&nbsp;6"</strong>, stressing the 1 (the strong beat) and, less strongly, the 4 (the second beat). At a fast tempo, those two accents, on 1 and 4, are all you feel, which is why 6/8 feels like counting in two.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-6-8-subdivision.svg" width="257" height="122" alt="Six eighth notes in 6/8 grouped in two sets of three (3+3)" loading="lazy" decoding="async"><figcaption>The six eighth notes group <strong>3+3</strong>: each group is one beat.</figcaption></figure>

<h2>Why isn't 6/8 counted in six?</h2>

<p>Because the six eighth notes <strong>are not six beats, but the subdivision of two</strong>. Counting "1-2-3-4-5-6" would count the eighth notes (the subdivision), not the pulse. At any tempo that is not very slow, the ear hears only <strong>two accents</strong>, on the first and fourth eighth notes, just as when walking you feel two steps and not the six movements that make them up. Only in practice, at a very slow tempo, do you count all six eighth notes to place each note precisely. As soon as the tempo rises, you feel it "in two" again.</p>

<h2>The beat is the dotted quarter note</h2>

<p>The <a href="/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/">beat unit</a> of 6/8 is not the single eighth note but the <strong>dotted quarter note</strong>, which equals exactly three eighth notes. This is what separates compound meters from simple ones: in a simple meter such as <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-simples/">2/4</a> the beat is a quarter note (two eighth notes), while in 6/8 the beat "has a dot" because it divides into three.</p>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Element</th><th>In 6/8</th></tr></thead>
  <tbody>
    <tr><td>Type of meter</td><td>Compound (duple)</td></tr>
    <tr><td>Beats per measure</td><td>2</td></tr>
    <tr><td>Beat unit</td><td>Dotted quarter note</td></tr>
    <tr><td>Subdivision of each beat</td><td>3 eighth notes (ternary)</td></tr>
    <tr><td>Eighth notes per measure</td><td>6 (grouped 3+3)</td></tr>
    <tr><td>Accent pattern</td><td>Strong – Weak</td></tr>
  </tbody>
</table></div>

<h2>Example melody in 6/8</h2>

<p>This short melody in C major shows the rocking character of 6/8. Notice how the eighth notes group in threes, and how the final measure resolves on two dotted quarter notes, one per beat:</p>

<figure class="tm-staff" data-tm-melody="g/4:8 a/4:8 g/4:8 e/4:q e/4:8 | f/4:8 g/4:8 f/4:8 d/4:q d/4:8 | e/4:8 f/4:8 g/4:8 a/4:8 b/4:8 c/5:8 | g/4:q. c/4:q." data-tm-bpm="144"><img src="/assets/img/notacion/compases/compas-6-8-melodia.svg" width="712" height="122" alt="Example melody of four measures in 6/8, in C major, with eighth notes grouped 3+3" loading="lazy" decoding="async"><figcaption>Example melody in 6/8: the characteristic sway of barcarolles and jigs. Press ▶ to listen.</figcaption></figure>

<h2>Where is 6/8 used?</h2>

<p>6/8 appears whenever the music calls for a flowing, undulating movement. Some typical examples:</p>

<ul>
  <li><strong>Jig (gigue):</strong> the Celtic and Irish dance par excellence, fast and bouncy.</li>
  <li><strong>Barcarolle:</strong> the rocking of the water, as in the songs of Venetian gondoliers.</li>
  <li><strong>Tarantella:</strong> a lively Italian dance, usually written in fast 6/8.</li>
  <li><strong>Ballads and lullabies:</strong> the sway of 6/8 gives a rocking feeling, ideal for cradle songs.</li>
  <li><strong>Pop and rock:</strong> slow ballads with a steady triplet feel are written in 6/8 or in 12/8.</li>
</ul>

<h2>6/8 compared with 3/4: they are not the same</h2>

<p>This is the most common confusion, because <strong>both contain six eighth notes</strong>. The difference is in the grouping: <strong><a href="/diccionario-musical/compases/compas-de-3-4/">3/4</a></strong> has <strong>three</strong> beats with a binary subdivision (2+2+2), while <strong>6/8</strong> has <strong>two</strong> beats with a ternary subdivision (3+3). That is why the waltz (3/4) has a clear triple pulse and 6/8 sounds rocking. This difference is explained in detail, with an accent table, on the page about <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-compuestos/">accents in compound meters</a>.</p>

<p>To train this difference by ear, try the listening exercise <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the meter by ear</a>, which has melodies in 6/8, 3/4 and the other simple and compound meters.</p>

<h2>How to practice 6/8</h2>

<p>The best way to absorb the sway of 6/8 is to practice with a steady pulse. On the <a href="/herramientas/metronomo/?meter=6/8&amp;bpm=120">online metronome with 6/8 already selected</a> you hear the accent on the first beat of each group. Start at a comfortable tempo (around 60–80&nbsp;BPM per dotted quarter note) and speed up gradually until you feel the two accents without counting the six eighth notes. To check whether a melody is correctly written in 6/8, you can also use the <a href="/diccionario-musical/compases/analizar-compases/">time signature analyzer</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is 6/8 time?</div>
      <div class="tm-faq-a">6/8 is a compound meter with two beats. Each measure holds six eighth notes, but they group in threes to form two pulses, each equal to a dotted quarter note. That is why it is counted in two and not in six.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is 6/8 simple or compound?</div>
      <div class="tm-faq-a">6/8 is a compound meter, because each beat divides into three equal parts (three eighth notes). In simple meters each beat divides into two.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many beats are in a measure of 6/8?</div>
      <div class="tm-faq-a">It is counted in two beats. Although it has six eighth notes, they group in two sets of three (3+3), so only two pulses are felt: the first strong and the second weak.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which note value is the beat in 6/8?</div>
      <div class="tm-faq-a">The beat unit of 6/8 is the dotted quarter note, which equals three eighth notes. Each of the two beats in the measure is a dotted quarter note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between 6/8 and 3/4?</div>
      <div class="tm-faq-a">Both contain six eighth notes, but 3/4 has three beats with a binary subdivision (2+2+2) and 6/8 has two beats with a ternary subdivision (3+3). 3/4 sounds like a waltz and 6/8 sounds rocking.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
