const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/inversion/',
  esPath: '/diccionario-musical/intervalos/inversion/',
  title: 'Inversion of Intervals: The Rule of 9 and Quality Chart',
  description: 'How to invert an interval: the rule of 9 (2nd↔7th, 3rd↔6th, 4th↔5th), how quality changes, and how simple and compound intervals differ.',
  h1: 'Inversion of Intervals',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],
  articleAttrs: 'data-tm-intervals',
  scripts: ['tm-piano-audio'],
  body: `<p>To invert an interval, keep the first note fixed and move the second note one octave in the opposite direction to the interval: if the interval is ascending, the second note drops an octave; if it is descending, the second note rises an octave. The key rule is that the number of the original interval and the number of its inversion always add up to 9 (for simple intervals), and the quality is swapped: major ↔ minor, augmented ↔ diminished, perfect ↔ perfect.</p>

<h2>Chart of inversions of simple intervals</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Original interval</th><th>Quality</th><th>Inversion</th><th>Resulting quality</th><th>Example (from the first note)</th></tr>
  </thead>
  <tbody>
    <tr><td>Unison (1st)</td><td>Perfect</td><td>Octave (8th)</td><td>Perfect</td><td>C–C → C–C (octave)</td></tr>
    <tr><td>2nd</td><td>Major</td><td>7th</td><td>minor</td><td>C–D → C–D (octave lower)</td></tr>
    <tr><td>2nd</td><td>minor</td><td>7th</td><td>Major</td><td>E–F → E–F (octave lower)</td></tr>
    <tr><td>3rd</td><td>Major</td><td>6th</td><td>minor</td><td>C–E → C–E (octave lower)</td></tr>
    <tr><td>3rd</td><td>minor</td><td>6th</td><td>Major</td><td>D–F → D–F (octave lower)</td></tr>
    <tr><td>4th</td><td>Perfect</td><td>5th</td><td>Perfect</td><td>C–F → C–F (octave lower)</td></tr>
    <tr><td>4th</td><td>Augmented</td><td>5th</td><td>Diminished</td><td>F–B → F–B (octave lower)</td></tr>
    <tr><td>5th</td><td>Perfect</td><td>4th</td><td>Perfect</td><td>C–G → C–G (octave lower)</td></tr>
    <tr><td>5th</td><td>Diminished</td><td>4th</td><td>Augmented</td><td>B–F → B–F (octave lower)</td></tr>
    <tr><td>6th</td><td>Major</td><td>3rd</td><td>minor</td><td>C–A → C–A (octave lower)</td></tr>
    <tr><td>6th</td><td>minor</td><td>3rd</td><td>Major</td><td>E–C → E–C (octave lower)</td></tr>
    <tr><td>7th</td><td>Major</td><td>2nd</td><td>minor</td><td>C–B → C–B (octave lower)</td></tr>
    <tr><td>7th</td><td>minor</td><td>2nd</td><td>Major</td><td>G–F → G–F (octave lower)</td></tr>
    <tr><td>Octave (8th)</td><td>Perfect</td><td>Unison (1st)</td><td>Perfect</td><td>C–C (octave) → C–C (unison)</td></tr>
  </tbody>
</table></div>
<p>In the examples, the first note stays fixed and the second note drops an octave ("octave lower"); if the interval were descending, the second note would rise an octave. For instance, the major 2nd C4–D4 inverts to C4 with D3 below it: a minor 7th (from D3 up to C4 is 10 half steps).</p>

<h2>What is inversion used for in practice?</h2>

<p>Knowing inversions is not an abstract exercise: it has direct uses in harmony and analysis.</p>

<ul>
  <li><strong>Chord inversions.</strong> When the fifth of a chord goes to the bass, the 5th between root and fifth becomes a 4th above the bass. This is why a <a href="/diccionario-musical/acordes/acordes-triadas/">triad in second inversion</a> is labeled 6/4.</li>
  <li><strong>Ear training.</strong> It is easier to recognize a minor 7th as "the inversion of a major 2nd" than to identify it directly.</li>
  <li><strong>Reducing compound intervals.</strong> A major 9th is a major 2nd plus an octave, so its reduction gives the same interval as the major 2nd. See the guide to <a href="/diccionario-musical/intervalos/ampliacion-reduccion-de-intervalos/">augmenting and reducing intervals</a>.</li>
</ul>

<h2>How to invert simple intervals</h2>

<p>To invert a simple interval, the first note stays fixed and the second note moves one octave in the opposite direction to the interval: if the interval is ascending, the second note drops an octave; if it is descending, the second note rises an octave. (The same result comes from moving the lower note up an octave.)</p>

<figure><img src="/assets/img/notacion/intervalos/inversion-simple-1.svg" width="480" height="159" alt="Inversion of a simple interval: the second note moves down one octave" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/intervalos/inversion-simple-2.svg" width="480" height="165" alt="Second example of the inversion of a simple interval" loading="lazy" decoding="async"></figure>

<h3>How to check that the inversion is correct</h3>

<p>For simple intervals, the number of the original interval plus the number of its inversion is always <strong>9</strong>. As for quality:</p>

<ul>
  <li>Perfect → the inversion is <strong>perfect</strong></li>
  <li>Major → the inversion is <strong>minor</strong></li>
  <li>minor → the inversion is <strong>major</strong></li>
  <li>Augmented → the inversion is <strong>diminished</strong></li>
  <li>Diminished → the inversion is <strong>augmented</strong></li>
</ul>

<h2>How to invert compound intervals</h2>

<p>To invert a compound interval, the first note stays fixed and the second note moves three octaves (a 22nd) in the opposite direction: if the interval is ascending, the second note drops a 22nd; if it is descending, the second note rises a 22nd.</p>

<figure><img src="/assets/img/notacion/intervalos/inversion-compuesto-1.svg" width="480" height="197" alt="Inversion of a compound interval: the second note moves down three octaves (22nd)" loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/notacion/intervalos/inversion-compuesto-2.svg" width="480" height="202" alt="Second example of the inversion of a compound interval" loading="lazy" decoding="async"></figure>

<h3>How to check that the inversion is correct</h3>

<p>The number of a compound interval and the number of its inversion add up to <strong>23</strong>. The quality rules are the same as for simple intervals: perfect ↔ perfect, major ↔ minor, augmented ↔ diminished.</p>

<p>For the full chart of intervals with their half steps and qualities, see <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the inversion of an interval?</div>
    <div class="tm-faq-a">To invert an interval, keep the first note fixed and move the second note one octave in the opposite direction to the interval (if it ascends, the second note drops; if it descends, the second note rises). The result is a new interval whose number plus the original number adds up to 9 for simple intervals, and whose quality is swapped: major ↔ minor, augmented ↔ diminished, perfect ↔ perfect.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What do the numbers of a simple interval and its inversion add up to?</div>
    <div class="tm-faq-a">Always 9. For example: a 3rd inverts to a 6th (3+6=9), a 4th inverts to a 5th (4+5=9), and a 2nd inverts to a 7th (2+7=9).</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How do you invert a compound interval?</div>
    <div class="tm-faq-a">The first note stays fixed and the second note moves three octaves (a 22nd) in the opposite direction. The numbers of the original and its inversion add up to 23, and the quality rule is the same: major ↔ minor, augmented ↔ diminished, perfect ↔ perfect.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How does the quality of an interval change when it is inverted?</div>
    <div class="tm-faq-a">The quality is swapped by fixed rules: major ↔ minor, augmented ↔ diminished, perfect ↔ perfect. For example, a major 3rd inverts to a minor 6th, an augmented 4th inverts to a diminished 5th, and a perfect 5th inverts to a perfect 4th.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Why is it useful to know interval inversions?</div>
    <div class="tm-faq-a">It is essential for understanding chord inversions: when the bass note moves up an octave, the interval between the voices is inverted. It also makes difficult intervals easier to classify: a minor 7th can be analyzed as the inversion of a major 2nd, which is more intuitive.</div>
  </div>
</div>
</div>
</div>
</section>
`,
});
