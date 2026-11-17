const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/widen-narrow-and-invert-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/ampliar-reducir-e-invertir/',
  title: 'Widen, Narrow and Invert Intervals: Staff Exercises',
  description: 'Widen simple intervals into compound ones, narrow compound intervals to simple ones and invert intervals by writing the note on the staff. Free.',
  h1: 'Widen, Narrow and Invert Intervals',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'transformar-intervalos-engine'],
  body: `<p>All three operations move one note of the interval by an octave. In each exercise you see a written interval; the next bar repeats its first note and you write the second one, just like in a music theory exam. As on the theory pages of this site, <strong>the first note stays put and the second one moves</strong>.</p>

<h2>What to do in each case</h2>
<div class="tm-table-wrap">
<table>
<thead><tr><th>Operation</th><th>Ascending interval</th><th>Descending interval</th><th>What changes</th></tr></thead>
<tbody>
<tr><td><strong>Widen</strong></td><td>The second note goes up an octave</td><td>The second note goes down an octave</td><td>Simple → compound: add 7 to the number, the quality stays (major 3rd → major 10th)</td></tr>
<tr><td><strong>Narrow</strong></td><td>The second note goes down an octave</td><td>The second note goes up an octave</td><td>Compound → simple: subtract 7 from the number, the quality stays (major 10th → major 3rd)</td></tr>
<tr><td><strong>Invert</strong></td><td>The second note goes down an octave</td><td>The second note goes up an octave</td><td>The numbers add up to 9 and the quality flips (ascending major 3rd → descending minor 6th)</td></tr>
</tbody>
</table>
</div>
<p>Moving a note by an octave does not change its accidental, but in the exercise <strong>you have to write it</strong>, as in class: choose ♭, ♮ or ♯ before placing the note (the buttons go back to ♮ on every question). The full explanations, with examples on the staff, are on the pages <a href="/diccionario-musical/intervalos/ampliacion-reduccion-de-intervalos/">widening and narrowing intervals</a> and <a href="/diccionario-musical/intervalos/inversion/">inversion of intervals</a>.</p>

<h2>Widening intervals</h2>
<p>You get a simple interval. Write the second note an octave further away so that it becomes compound: a perfect 4th becomes a perfect 11th.</p>
<div id="tmti_amp"></div>

<h2>Narrowing intervals</h2>
<p>You get a compound interval. Bring the second note an octave closer so that it becomes simple: a minor 13th becomes a minor 6th.</p>
<div id="tmti_red"></div>

<h2>Inverting intervals</h2>
<p>You get a simple interval. Move the second note an octave in the opposite direction: a 2nd becomes a 7th, a 3rd a 6th, a 4th a 5th, and the quality flips (major ↔ minor, augmented ↔ diminished; perfect stays perfect).</p>
<div id="tmti_inv"></div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmTransformarIv("tmti_amp", { op: "ampliar" });
    tmTransformarIv("tmti_red", { op: "reducir" });
    tmTransformarIv("tmti_inv", { op: "invertir" });
  });
</script>

<p><strong>How to use the exercises:</strong> choose the accidental with the buttons and move the mouse (or your finger) over the staff and the magnifier shows the note you are about to place; let go to place it in the second bar. You can change the note or the accidental as often as you like before pressing <em>Check</em>. The correction shows the right note in green and the names of both intervals.</p>

<p>To practice naming intervals first, try the <a href="/ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/">complete interval analysis</a>; to write them from a given note, the exercises on <a href="/ejercicios/ejercicios-de-intervalos-musicales/terceras/">building thirds</a>, <a href="/ejercicios/ejercicios-de-intervalos-musicales/quintas/">fifths</a> and the rest of the <a href="/ejercicios/ejercicios-de-intervalos-musicales/">interval section</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does widening an interval mean?</div>
      <div class="tm-faq-a">Widening an interval makes it an octave larger: the second note moves an octave further from the first (up if the interval ascends, down if it descends). The number grows by 7 and the quality stays the same: a widened major 3rd is a major 10th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does narrowing an interval mean?</div>
      <div class="tm-faq-a">Narrowing turns a compound interval into a simple one: the second note moves an octave closer to the first. The number drops by 7 and the quality is kept: a narrowed perfect 12th is a perfect 5th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you invert an interval?</div>
      <div class="tm-faq-a">Keep the first note and move the second one an octave in the opposite direction. The numbers of an interval and its inversion add up to 9, and the quality flips: major and minor, augmented and diminished, perfect and perfect. An ascending major 3rd inverts to a descending minor 6th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the accidental change when you widen, narrow or invert?</div>
      <div class="tm-faq-a">No. The three operations only change the octave of the second note: it is still the same note, with its sharp or flat. What changes is the number of the interval and, in an inversion, also its quality.</div>
    </div>
  </div>
</div>
</div>
</section>`
});
