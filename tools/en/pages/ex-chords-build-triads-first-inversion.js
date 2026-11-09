const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/build-triads-first-inversion/",
  esPath: "/ejercicios/acordes/construir-triadas-primera-inversion/",
  title: "Build Triads in First Inversion: Staff Exercise",
  description: "Write triads in first inversion on the staff: you get the third in the bass and the chord type, and add the fifth and the root. Free exercise.",
  h1: "Build Triads in First Inversion",
  crumbs: [['Music Exercises','/ejercicios/'],['Chord exercises','/ejercicios/acordes/']],
  scripts: ['tm-mei','tm-notacion','acordes-engine'],
  body: `<p>The <strong>third of the chord</strong> (the bass note in first inversion), the <strong>type of chord</strong> and the <strong>root</strong> are shown. Your task is to place the <strong>fifth and the root</strong> on the staff, in the correct octave. Click on the staff to place each note, and use the accidental buttons before placing it.</p>

<p>Do you want it as a game? In <a href="/juegos/teoria/billar/">Billiards</a> every ball carries a chord: you build its notes on the staff and, if they are right, the ball goes in, also in inversions. You can play alone or in class, taking turns.</p>

<h2>What is first inversion?</h2>
<p>In <strong>first inversion</strong> the third of the chord is in the bass. The other two notes (the fifth and the root) go above it in close position.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Chord</th><th>Bass (given)</th><th>Draw: fifth</th><th>Draw: root</th></tr>
  </thead>
  <tbody>
    <tr><td>C major</td><td>E (third)</td><td>G</td><td>C (octave)</td></tr>
    <tr><td>A minor</td><td>C (minor third)</td><td>E</td><td>A (octave)</td></tr>
  </tbody>
</table>
</div>

<h2>Exercise</h2>
<div id="tmac_ct1"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAcEngine("tmac_ct1", { test: 'construir', inversion: '1a' });
  });
</script>

<p><a href="/ejercicios/acordes/">See all the chord exercises →</a> Or practice the opposite skill: <a href="/ejercicios/acordes/triadas-en-primera-inversion/">identify triads in first inversion</a>.</p>

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
      <div class="tm-faq-q">How do you build a triad in first inversion?</div>
      <div class="tm-faq-a">In first inversion the third of the chord is in the bass. Write the third of the chord as the bass note. Then add the fifth above it (a third above the bass) and the root in the highest voice (a sixth above the bass).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which intervals make up a first inversion, counted from the bass?</div>
      <div class="tm-faq-a">From the bass (the third of the chord) there is a third up to the fifth of the chord and a sixth up to the root. The exact qualities depend on the type: a major chord in first inversion has a minor 3rd and a minor 6th above the bass (E–G–C), while a minor chord has a major 3rd and a major 6th (C–E–A).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is it harder to build chords in inversion?</div>
      <div class="tm-faq-a">Because you have to think about which note is the root of the chord (it is not in the bass) and then work out the other notes from that root. You need to know the structure of each triad well before you can place it in an inversion.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the most common mistake when building a first inversion?</div>
      <div class="tm-faq-a">Putting the root in the bass instead of the third. You can catch the error by checking that the bass is really the third of the chord asked for. If the task is C major in first inversion, the bass must be E, not C.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can I practice building chords in inversion?</div>
      <div class="tm-faq-a">First work out which note must go in the bass for the inversion asked. Then build the whole chord from the notes you know belong to it, and check that the intervals above the bass are right for that inversion.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
