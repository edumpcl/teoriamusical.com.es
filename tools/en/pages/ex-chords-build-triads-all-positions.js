const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/build-triads-all-positions/",
  esPath: "/ejercicios/acordes/construir-triadas-todas-posiciones/",
  title: "Build Triads in All Three Positions: Exercise",
  description: "Final challenge: write triads on the staff in root position, first or second inversion. You get the bass and the type, and add the missing notes.",
  h1: "Build Triads: All Three Positions",
  crumbs: [['Music Exercises','/ejercicios/'],['Chord exercises','/ejercicios/acordes/']],
  scripts: ['tm-mei','tm-notacion','acordes-engine'],
  body: `<p>The bass note (which can be the root, the third or the fifth), the type of chord and the root are shown. Your task is to work out the position and place the two missing notes in the correct octave. Each question names the position in parentheses (<strong>root position</strong>, <strong>1st inversion</strong> or <strong>2nd inversion</strong>), telling you which note of the chord is in the bass and which ones you have to add.</p>

<p>Do you want it as a game? In <a href="/juegos/teoria/billar/">Billiards</a> every ball carries a chord: you build its notes on the staff and, if they are right, the ball goes in, also in inversions. You can play alone or in class, taking turns.</p>

<h2>The positions at a glance</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Position</th><th>Bass note</th><th>Notes to draw</th></tr>
  </thead>
  <tbody>
    <tr><td>Root position</td><td>Root</td><td>Third and fifth</td></tr>
    <tr><td>First inversion</td><td>Third</td><td>Fifth and root</td></tr>
    <tr><td>Second inversion</td><td>Fifth</td><td>Root and third</td></tr>
  </tbody>
</table>
</div>

<h2>Exercise</h2>
<div id="tmac_cta"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAcEngine("tmac_cta", { test: 'construir', inversion: 'todas' });
  });
</script>

<p>For the opposite skill, <a href="/ejercicios/acordes/triadas-todas-las-posiciones/">identify triads in all three positions</a>.</p>

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
      <div class="tm-faq-q">How do I master building triads in all three positions?</div>
      <div class="tm-faq-a">Follow this order: 1) Memorize the notes of the four types of triad (major, minor, diminished, augmented). 2) Practice putting the right note in the bass (the root for root position, the third for first inversion, the fifth for second inversion). 3) Complete the chord by working out the correct intervals.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is figured bass and how does it show inversions?</div>
      <div class="tm-faq-a">Figured bass shows the position with numbers under the bass note. No number (5/3 is implied): root position. 6 or 6/3: first inversion. 6/4: second inversion. The numbers are the intervals from the bass up to the other notes of the chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is it important to know all three positions?</div>
      <div class="tm-faq-a">Because in real scores chords appear in any position. Being able to identify and build them in every position is essential for harmonic analysis, composition and accompaniment.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which position is the hardest to build?</div>
      <div class="tm-faq-a">Usually the second inversion, because you have to remember that the fifth goes in the bass and work upward from there. A trick: put the fifth in the bass, go up a fourth to the root (perfect in major and minor chords), and then add the third above the root.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I check that a triad I built is correct?</div>
      <div class="tm-faq-a">Check the two intervals above the bass note. 1) The middle note must be the right number of half steps above the root: 4 for a major third, 3 for a minor third. 2) The top note must be 7 half steps above the root (perfect fifth), 6 (diminished) or 8 (augmented). If both are right, the triad is correct. In an inversion, do this check on the chord rearranged in root position.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
