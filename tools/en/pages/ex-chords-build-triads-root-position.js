const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/build-triads-root-position/",
  esPath: "/ejercicios/acordes/construir-triadas/",
  title: "Build Triads in Root Position: Staff Exercise",
  description: "Write major, minor, diminished and augmented triads in root position on the staff: you get the root and the type. Free interactive exercise.",
  h1: "Build Triads in Root Position",
  crumbs: [['Music Exercises','/ejercicios/'],['Chord exercises','/ejercicios/acordes/']],
  scripts: ['tm-mei','tm-notacion','acordes-engine'],
  body: `<p>The <strong>bass note</strong> (the root) and the <strong>type of chord</strong> are shown. Your task is to place the <strong>third and the fifth</strong> on the staff. Click on the staff to place each note, and use the accidental buttons before placing it.</p>

<p>Do you want it as a game? In <a href="/juegos/teoria/billar/">Billiards</a> every ball carries a chord: you build its notes on the staff and, if they are right, the ball goes in. You can play alone or in class, taking turns.</p>

<h2>Types of chord</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>Third</th><th>Fifth</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td>Major</td><td>Major 3rd (4 half steps)</td><td>Perfect 5th (7)</td><td>C – E – G</td></tr>
    <tr><td>Minor</td><td>minor 3rd (3 half steps)</td><td>Perfect 5th (7)</td><td>D – F – A</td></tr>
    <tr><td>Diminished</td><td>minor 3rd (3 half steps)</td><td>Diminished 5th (6)</td><td>B – D – F</td></tr>
    <tr><td>Augmented</td><td>Major 3rd (4 half steps)</td><td>Augmented 5th (8)</td><td>C – E – G♯</td></tr>
  </tbody>
</table>
</div>

<h2>Exercise</h2>
<div id="tmac_ct"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAcEngine("tmac_ct", { test: 'construir' });
  });
</script>

<p>For the opposite skill, <a href="/ejercicios/acordes/triadas-en-fundamental/">identify triads in root position</a>.</p>

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
      <div class="tm-faq-q">How do you build a major triad from scratch?</div>
      <div class="tm-faq-a">Write the root on the staff and go up a major third (4 half steps): two staff positions up, with the accidental needed to get exactly 4 half steps. From that note, go up a minor third (3 half steps) to get the perfect fifth. Example: C → E (major 3rd) → G (minor 3rd) = C major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build a minor triad?</div>
      <div class="tm-faq-a">Write the root and go up a minor third (3 half steps) to get the third. Then go up a major third (4 half steps) to get the fifth. The fifth is always perfect (7 half steps above the root). Example: A → C (minor 3rd) → E (major 3rd) = A minor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build a diminished triad?</div>
      <div class="tm-faq-a">Write the root and go up a minor third (3 half steps). Then go up another minor third: the result is the diminished fifth (6 half steps above the root, a tritone). Example: B → D (minor 3rd) → F (minor 3rd) = B diminished.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build an augmented triad?</div>
      <div class="tm-faq-a">Write the root and go up a major third (4 half steps). Then go up another major third: the result is the augmented fifth (8 half steps above the root). Example: C → E (major 3rd) → G♯ (major 3rd) = C augmented.</div>
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
