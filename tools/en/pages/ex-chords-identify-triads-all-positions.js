const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/identify-triads-all-positions/",
  esPath: "/ejercicios/acordes/triadas-todas-las-posiciones/",
  title: "Identify Triads in All Three Positions: Quiz",
  description: "Final challenge: identify major, minor, diminished and augmented triads in root position, first or second inversion. Free interactive staff quiz.",
  h1: "Identify Triads: All Three Positions",
  crumbs: [['Music Exercises','/ejercicios/'],['Chord exercises','/ejercicios/acordes/']],
  scripts: ['tm-mei','tm-notacion','acordes-engine'],
  body: `<p>This is the <strong>final challenge</strong>: the chords appear in any of the three positions, chosen at random. The goal is to identify the type of triad without knowing in advance whether it is in root position, first inversion or second inversion. When you miss, the feedback also tells you which position it was.</p>

<h2>1. The three positions at a glance</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Position</th><th>Bass note</th><th>Middle note</th><th>Top note</th></tr>
  </thead>
  <tbody>
    <tr><td>Root position</td><td>Root (1)</td><td>Third (3)</td><td>Fifth (5)</td></tr>
    <tr><td>First inversion</td><td>Third (3)</td><td>Fifth (5)</td><td>Root (1)</td></tr>
    <tr><td>Second inversion</td><td>Fifth (5)</td><td>Root (1)</td><td>Third (3)</td></tr>
  </tbody>
</table>
</div>

<h2>2. A quick strategy</h2>
<p><strong>The universal method:</strong> whatever the position, you can always <strong>rearrange the three notes in your head</strong> and stack them in thirds going up. Once the chord is in root position, apply the standard analysis: the quality of the third (major = 4 half steps, minor = 3) and the quality of the fifth (perfect = 7, diminished = 6, augmented = 8).</p>

<h2>3. Interactive final challenge</h2>
<p>The chords appear in a <strong>random position</strong>. If you miss, the feedback also tells you which position the chord was in.</p>

<div id="tmac4"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAcEngine("tmac4", { inversion: 'todas' });
  });
</script>

<p>If you want to start with one position at a time, go back to <a href="/ejercicios/acordes/triadas-en-fundamental/">root position</a>, <a href="/ejercicios/acordes/triadas-en-primera-inversion/">first inversion</a> or <a href="/ejercicios/acordes/triadas-en-segunda-inversion/">second inversion</a>. To practice the opposite skill, <a href="/ejercicios/acordes/construir-triadas-todas-posiciones/">build triads in all three positions</a>.</p>

<p>If you practice these chords on an instrument, the <a href="/herramientas/metronomo/">online metronome</a> helps you build speed gradually: start slowly (50-60 BPM) and speed up a little at a time. The <a href="/herramientas/afinador/">online tuner</a> lets you check that every note of the chord is in tune.</p>

<p>For the full theory of each triad, see the page on <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a>, with the <a href="/diccionario-musical/acordes/acorde-disminuido/">diminished chord</a> and the <a href="/diccionario-musical/acordes/acorde-aumentado/">augmented chord</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many positions can a triad have?</div>
      <div class="tm-faq-a">A triad has three positions: root position (the root in the bass), first inversion (the third in the bass) and second inversion (the fifth in the bass). Each position has its own harmonic character: root position is stable, first inversion sounds lighter and second inversion sounds tense.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can I quickly tell which position a triad is in?</div>
      <div class="tm-faq-a">Look at the interval between the bass and the middle note. If it is a fourth, the chord is in second inversion. If it is a third, look at the top note: a fifth above the bass means root position, and a sixth means first inversion. In short: root position is 3rd + 5th, first inversion is 3rd + 6th, and second inversion is 4th + 6th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do inversions change the sound of a chord?</div>
      <div class="tm-faq-a">Inversions change the weight and direction of the chord. Root position is stable and conclusive. First inversion is lighter and allows melodic bass lines. Second inversion is the most tense and usually leads to a chord in root position.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is figured bass for triads?</div>
      <div class="tm-faq-a">Figured bass shows the position with numbers under the bass note. No number (or 5/3): root position. 6/3, or just 6: first inversion. 6/4: second inversion. The numbers are the intervals above the bass: in first inversion there is a 6th between the bass and the root, hence the 6.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">In what order should I learn the positions?</div>
      <div class="tm-faq-a">The natural order is: first master root position for the four types (major, minor, diminished, augmented), then first inversion, and finally second inversion. Practicing all three positions mixed, as in this final challenge, is the last step toward reading chords automatically in real scores.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
