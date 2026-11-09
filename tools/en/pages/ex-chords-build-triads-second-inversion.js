const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/build-triads-second-inversion/",
  esPath: "/ejercicios/acordes/construir-triadas-segunda-inversion/",
  title: "Build Triads in Second Inversion: Staff Exercise",
  description: "Write triads in second inversion on the staff: you get the fifth in the bass and the chord type, and add the root and the third. Free exercise.",
  h1: "Build Triads in Second Inversion",
  crumbs: [['Music Exercises','/ejercicios/'],['Chord exercises','/ejercicios/acordes/']],
  scripts: ['tm-mei','tm-notacion','acordes-engine'],
  body: `<p>The <strong>fifth of the chord</strong> (the bass note in second inversion), the <strong>type of chord</strong> and the <strong>root</strong> are shown. Your task is to place the <strong>root and the third</strong> on the staff, in the correct octave. Click on the staff to place each note, and use the accidental buttons before placing it.</p>

<p>Do you want it as a game? In <a href="/juegos/teoria/billar/">Billiards</a> every ball carries a chord: you build its notes on the staff and, if they are right, the ball goes in, also in inversions. You can play alone or in class, taking turns.</p>

<h2>What is second inversion?</h2>
<p>In <strong>second inversion</strong> the fifth of the chord is in the bass. The other two notes (the root and the third) go above it in close position.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Chord</th><th>Bass (given)</th><th>Draw: root</th><th>Draw: third</th></tr>
  </thead>
  <tbody>
    <tr><td>C major</td><td>G (fifth)</td><td>C (octave)</td><td>E</td></tr>
    <tr><td>A minor</td><td>E (fifth)</td><td>A (octave)</td><td>C</td></tr>
  </tbody>
</table>
</div>

<h2>Exercise</h2>
<div id="tmac_ct2"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAcEngine("tmac_ct2", { test: 'construir', inversion: '2a' });
  });
</script>

<p><a href="/ejercicios/acordes/">See all the chord exercises →</a> Or practice the opposite skill: <a href="/ejercicios/acordes/triadas-en-segunda-inversion/">identify triads in second inversion</a>.</p>

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
      <div class="tm-faq-q">How do you build a triad in second inversion?</div>
      <div class="tm-faq-a">In second inversion the fifth of the chord is in the bass. Write the fifth as the bass note. Then place the root above it (a fourth above the bass for major and minor chords) and the third of the chord above the root (a sixth above the bass).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which intervals make up a second inversion, counted from the bass?</div>
      <div class="tm-faq-a">From the bass (the fifth of the chord) there is a fourth up to the root and a sixth up to the third. In a major or minor chord the fourth is perfect (G–C in C major); in a diminished chord it is augmented (F–B), and in an augmented chord it is diminished (G♯–C). The fourth is the visual signature of a second inversion.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the second inversion the most tense position?</div>
      <div class="tm-faq-a">Because in traditional harmony the fourth above the bass is treated as a dissonance, and it asks to resolve. For this reason a second inversion is usually followed by a chord in root position, especially in the cadential six-four chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the most important six-four chord?</div>
      <div class="tm-faq-a">The tonic chord in second inversion over the dominant bass (the cadential six-four chord). In C major: G in the bass, with C and E above. It creates strong tension before a perfect authentic cadence and is very common in classical style.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I avoid confusing second inversion with first inversion?</div>
      <div class="tm-faq-a">Look at the interval between the bass and the next note up. A fourth means second inversion. A third means root position or first inversion, and the top note then tells them apart: a fifth above the bass for root position, a sixth for first inversion.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
