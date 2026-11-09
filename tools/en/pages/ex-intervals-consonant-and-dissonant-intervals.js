const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/consonant-and-dissonant-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/intervalos-consonantes-y-disonantes/',
  title: 'Consonant and Dissonant Intervals: Free Online Quiz',
  description: 'Classify intervals by harmonic stability: perfect and imperfect consonances, semi-consonance and dissonances. Free interactive quiz.',
  h1: 'Consonance and Dissonance',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>Intervals are classified by their harmonic stability: perfect consonances, imperfect consonances and dissonances. This quiz uses the five groups of the table below, so check it first and then practice the classification.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Group</th>
      <th>Intervals included</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><strong>Perfect consonance</strong></td><td>Perfect unison, perfect 4th, perfect 5th, perfect octave</td></tr>
    <tr><td><strong>Imperfect consonance</strong></td><td>Major 3rd, minor 3rd, major 6th, minor 6th</td></tr>
    <tr><td><strong>Semi-consonance</strong></td><td>The tritone: augmented 4th and diminished 5th</td></tr>
    <tr><td><strong>Absolute dissonance</strong></td><td>Major 2nd, minor 2nd, major 7th, minor 7th, and the augmented or diminished intervals whose enharmonic equivalent is also a dissonance or the tritone</td></tr>
    <tr><td><strong>Conditional dissonance</strong></td><td>Augmented or diminished intervals whose enharmonic equivalent is a consonance (for example, a diminished 4th = a major 3rd, an augmented 5th = a minor 6th)</td></tr>
  </tbody>
</table>
</div>

<p><strong>A note on the perfect 4th:</strong> it is listed as a perfect consonance here, because it is a stable interval on its own and in melodies. In strict counterpoint, however, a perfect 4th between the bass and an upper voice is treated as a dissonance.</p>

<div id="tmcons"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmcons", {test:"consonancia"});
  });
</script>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is consonance in music?</div>
      <div class="tm-faq-a">A consonant interval sounds stable and settled: it creates no tension that asks for resolution. The perfect consonances are the unison, the perfect 4th, the perfect 5th and the octave. The imperfect consonances are the major 3rd, the minor 3rd, the major 6th and the minor 6th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is dissonance in music?</div>
      <div class="tm-faq-a">A dissonant interval creates tension and asks to resolve to a consonant interval. The dissonant intervals are the major and minor 2nd, the major and minor 7th, and the tritone (augmented 4th or diminished 5th). Dissonance is not bad: it is the engine of tonal harmony.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which interval is the most dissonant?</div>
      <div class="tm-faq-a">The answer depends on the criteria. The tritone (augmented 4th or diminished 5th, 6 half steps) is the most unstable interval in tonal harmony and it has long been nicknamed "diabolus in musica" (the devil in music). The minor 2nd and the major 7th are the harshest when sounded together. The tritone splits the octave exactly in half, and its resolution to a 3rd or a 6th is one of the most powerful moves in tonal music.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why do consonance and dissonance matter?</div>
      <div class="tm-faq-a">They are the basic mechanism of harmonic tension and release. Tonal music creates expectation by introducing dissonance and satisfies the listener by resolving it into consonance. Without dissonance, music would sound flat and aimless; without consonance, there would be no place to rest.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many half steps does each interval have?</div>
      <div class="tm-faq-a">Minor 2nd: 1. Major 2nd: 2. Minor 3rd: 3. Major 3rd: 4. Perfect 4th: 5. Tritone: 6. Perfect 5th: 7. Minor 6th: 8. Major 6th: 9. Minor 7th: 10. Major 7th: 11. Perfect octave: 12.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
