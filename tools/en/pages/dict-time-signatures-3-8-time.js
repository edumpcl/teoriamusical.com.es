const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/3-8-time/',
  esPath: '/diccionario-musical/compases/compas-de-3-8/',
  title: '3/8 Time Signature: Simple or Compound? Examples',
  description: '3/8 is a simple meter with three eighth-note beats per measure. Find out why it is not compound, how to count it, and hear a melody in 3/8.',
  h1: '3/8 Time Signature',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>3/8 time</strong> is a <strong>simple meter</strong> with three beats in which the note value that gets one beat is the <strong>eighth note</strong> (UK: quaver). It is the main source of confusion between simple and compound meters: because of the 8 in the bottom number, many people assume it is compound. It is not.</p>

<h2>What does 3/8 mean?</h2>

<p>In the <a href="/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/">time signature</a>, the top number <strong>3</strong> says there are three beats and the bottom number <strong>8</strong> says each beat is an <strong>eighth note</strong> (one eighth of a whole note). Each beat divides into <strong>two</strong> sixteenth notes (UK: semiquavers), so 3/8 is a <strong>simple</strong> meter, exactly like 3/4 or any other three-beat meter, but with the eighth note as the beat unit instead of the quarter note.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-3-8-pulso.svg" width="186" height="122" alt="A measure (UK: bar) of 3/8 with three eighth notes, one for each beat" loading="lazy" decoding="async"><figcaption>3/8 is counted in <strong>three beats</strong>; each beat is an <strong>eighth note</strong>.</figcaption></figure>

<h2>Is 3/8 simple or compound?</h2>

<p>It is <strong>simple</strong>. The rule is clear: a meter is compound only when its top number is <strong>6, 9 or 12</strong> (beats that divide into three). With a top number of <strong>3</strong>, the meter is simple even if the bottom number is 8. Each of its three eighth notes divides into two sixteenth notes:</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-3-8-subdivision.svg" width="211" height="122" alt="Six sixteenth notes in 3/8 beamed in pairs (2+2+2)" loading="lazy" decoding="async"><figcaption>Each eighth note divides into <strong>two sixteenth notes</strong>: a binary subdivision.</figcaption></figure>

<h2>3/8 at a glance</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Element</th><th>In 3/8</th></tr></thead>
  <tbody>
    <tr><td>Type of meter</td><td>Simple (triple)</td></tr>
    <tr><td>Beats per measure</td><td>3</td></tr>
    <tr><td>Beat unit</td><td>Eighth note</td></tr>
    <tr><td>Subdivision of each beat</td><td>2 sixteenth notes (binary)</td></tr>
    <tr><td>Eighth notes per measure</td><td>3</td></tr>
    <tr><td>Accent pattern</td><td>Strong – Weak – Weak</td></tr>
  </tbody>
</table></div>

<h2>Example melody in 3/8</h2>

<p>At a fast tempo, the three eighth notes of 3/8 are often felt as <strong>a single pulse</strong> per measure, which gives a light, spinning character. The last measure ends on a dotted quarter note, which fills all three beats:</p>

<figure class="tm-staff" data-tm-melody="c/4:8 d/4:8 e/4:8 | f/4:8 e/4:8 d/4:8 | e/4:8 f/4:8 g/4:8 | c/4:q." data-tm-bpm="132"><img src="/assets/img/notacion/compases/compas-3-8-melodia.svg" width="428" height="122" alt="Example melody of four measures in 3/8, in C major" loading="lazy" decoding="async"><figcaption>Example melody in 3/8: a light character, often felt in one. Press ▶ to listen.</figcaption></figure>

<h2>Where is 3/8 used?</h2>

<ul>
  <li><strong>Scherzos and fast movements:</strong> a quick 3/8 is felt in one, which suits agile passages.</li>
  <li><strong>Lively dances:</strong> light triple-meter dances at a fast tempo.</li>
</ul>

<h2>How to practice 3/8</h2>

<p>Start by counting the three beats separately on the <a href="/herramientas/metronomo/?meter=3/8&amp;bpm=120">online metronome with 3/8 already selected</a>. When that feels comfortable, raise the tempo until you feel each measure as a single impulse. To check the time signature of a score, use the <a href="/diccionario-musical/compases/analizar-compases/">time signature analyzer</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is 3/8 simple or compound?</div>
      <div class="tm-faq-a">3/8 is a simple meter. What makes a meter compound is the top number (6, 9 or 12), not the bottom number. With a top number of 3, the meter is simple even if the bottom number is 8.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many beats are in a measure of 3/8?</div>
      <div class="tm-faq-a">Three beats, and the note value that gets one beat is the eighth note. Each eighth note divides into two sixteenth notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between 3/8 and 3/4?</div>
      <div class="tm-faq-a">Both have three beats with the same accent pattern, but in 3/4 the beat unit is the quarter note and in 3/8 it is the eighth note. 3/8 is used mostly in fast passages.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is 3/8 sometimes felt in one?</div>
      <div class="tm-faq-a">At fast tempos, the three eighth notes of 3/8 are heard as a single impulse per measure, which gives the light, spinning character typical of scherzos and lively dances.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
