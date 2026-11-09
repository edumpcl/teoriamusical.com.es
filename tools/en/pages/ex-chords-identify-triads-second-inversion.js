const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/identify-triads-second-inversion/",
  esPath: "/ejercicios/acordes/triadas-en-segunda-inversion/",
  title: "Identify Triads in Second Inversion: Staff Quiz",
  description: "Identify major, minor, diminished and augmented triads in second inversion on the staff. Free interactive quiz with real notation.",
  h1: "Identify Triads in Second Inversion",
  crumbs: [['Music Exercises','/ejercicios/'],['Chord exercises','/ejercicios/acordes/']],
  scripts: ['tm-mei','tm-notacion','acordes-engine'],
  body: `<p>In <strong>second inversion</strong>, the <strong>fifth</strong> of the chord is in the bass. It is the inversion that sounds least stable and the hardest one to recognize by sight, because on the staff you see a <strong>fourth at the bottom</strong> and a third at the top.</p>

<h2>1. What it looks like on the staff</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>Root position</th><th>Second inversion (fifth in the bass)</th></tr>
  </thead>
  <tbody>
    <tr><td>Major</td><td>C – E – G</td><td>G – C – E</td></tr>
    <tr><td>Minor</td><td>D – F – A</td><td>A – D – F</td></tr>
    <tr><td>Diminished</td><td>B – D – F</td><td>F – B – D</td></tr>
    <tr><td>Augmented</td><td>C – E – G♯</td><td>G♯ – C – E</td></tr>
  </tbody>
</table>
</div>

<h2>2. How to analyze it</h2>
<p><strong>Tip:</strong> When the chord is written in close position, the <strong>middle note is the root</strong>. The bass is the fifth and the top note is the third. Rebuild the chord upward from that root to recognize its type.</p>

<h2>3. Interactive exercise</h2>
<p>All the chords are in <strong>second inversion</strong>: the fifth is in the bass. Your task is to identify the type of triad.</p>

<div id="tmac3"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAcEngine("tmac3", { inversion: '2a' });
  });
</script>

<p>Next exercise: <a href="/ejercicios/acordes/triadas-todas-las-posiciones/">identify triads in all three positions</a>. To practice the opposite skill, <a href="/ejercicios/acordes/construir-triadas-segunda-inversion/">build triads in second inversion</a>.</p>

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
      <div class="tm-faq-q">What is the second inversion of a triad?</div>
      <div class="tm-faq-a">In second inversion the fifth of the chord is in the bass. For example, in C major in second inversion the bass is G, and the upper notes are C and E. The chord is still C major (C–E–G), but with the fifth in the lowest voice.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a second inversion on the staff?</div>
      <div class="tm-faq-a">In second inversion the interval from the bass to the middle note is a fourth, and from the bass to the top note it is a sixth. This combination of a 4th and a 6th (written 6/4 in figured bass) is the visual signature of a second inversion.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the second inversion sound especially unstable?</div>
      <div class="tm-faq-a">Because the fourth above the bass is treated as a dissonance in traditional harmony. For this reason a second-inversion chord usually asks to be resolved. The cadential 6/4 chord (on the fifth degree of the bass) is one of the most common devices before a cadence.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the cadential six-four chord?</div>
      <div class="tm-faq-a">It is the tonic triad in second inversion, with the dominant note in the bass. In C major it is C–E–G with G in the bass, followed by the G major chord in root position. It creates tension just before the final resolution and is very common in classical-style cadences.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can I practice recognizing the three positions?</div>
      <div class="tm-faq-a">Learn to read the intervals above the bass. A 3rd and a 5th: root position. A 3rd and a 6th: first inversion. A 4th and a 6th: second inversion. Practice with each type of triad until the identification is automatic.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
