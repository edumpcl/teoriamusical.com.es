const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/identify-triads-first-inversion/",
  esPath: "/ejercicios/acordes/triadas-en-primera-inversion/",
  title: "Identify Triads in First Inversion: Staff Quiz",
  description: "Identify major, minor, diminished and augmented triads in first inversion on the staff. Free interactive quiz with real notation.",
  h1: "Identify Triads in First Inversion",
  crumbs: [['Music Exercises','/ejercicios/'],['Chord exercises','/ejercicios/acordes/']],
  scripts: ['tm-mei','tm-notacion','acordes-engine'],
  body: `<p>In <strong>first inversion</strong>, the <strong>third</strong> of the chord is in the bass. The type of triad does not change: it is still major, minor, diminished or augmented. But it looks different on the staff: from the bass you see a <strong>sixth</strong> up to the top note, and the two upper notes are a <strong>fourth</strong> apart (or an altered version of it).</p>

<h2>1. What it looks like on the staff</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>Root position</th><th>First inversion (third in the bass)</th></tr>
  </thead>
  <tbody>
    <tr><td>Major</td><td>C – E – G</td><td>E – G – C</td></tr>
    <tr><td>Minor</td><td>D – F – A</td><td>F – A – D</td></tr>
    <tr><td>Diminished</td><td>B – D – F</td><td>D – F – B</td></tr>
    <tr><td>Augmented</td><td>C – E – G♯</td><td>E – G♯ – C</td></tr>
  </tbody>
</table>
</div>

<h2>2. How to analyze it</h2>
<p><strong>Tip:</strong> When the chord is written in close position, the <strong>top note is the root</strong>. Start from it and identify the type as if the chord were in root position: stack the notes in thirds in your head, then count the half steps (UK: semitones) from the root to the third and to the fifth.</p>

<h2>3. Interactive exercise</h2>
<p>All the chords are in <strong>first inversion</strong>: the third is in the bass. Your task is to identify the type of triad.</p>

<div id="tmac2"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAcEngine("tmac2", { inversion: '1a' });
  });
</script>

<p>Next exercise: <a href="/ejercicios/acordes/triadas-en-segunda-inversion/">identify triads in second inversion</a>. To practice the opposite skill, <a href="/ejercicios/acordes/construir-triadas-primera-inversion/">build triads in first inversion</a>.</p>

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
      <div class="tm-faq-q">What is the first inversion of a triad?</div>
      <div class="tm-faq-a">In first inversion the third of the chord (not the root) is in the bass. For example, in C major in first inversion the bass is E, and the upper notes are G and C. It is the same chord (C–E–G), with a different note in the bass.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a first inversion on the staff?</div>
      <div class="tm-faq-a">In first inversion the interval from the bass to the middle note is a third, and from the bass to the top note it is a sixth. This combination of a 3rd and a 6th (written 6/3 in figured bass) is the visual signature of a first inversion.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the visual difference between root position and first inversion?</div>
      <div class="tm-faq-a">In root position the bass is the root. In first inversion the bass is the third. In practice you find out by counting the intervals from the bass: a 3rd and a 5th mean root position; a 3rd and a 6th mean first inversion.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the first inversion used for in harmony?</div>
      <div class="tm-faq-a">A first inversion gives a chord more movement and lightness than root position. It is especially useful for making bass lines that move by step, for smoothing a chord progression, and for linking two root-position chords without a leap in the bass. In figured bass it is written 6/3, or simply 6.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which chord is the hardest to identify in first inversion?</div>
      <div class="tm-faq-a">The diminished triad is the one most often misread. From the bass, its intervals are a minor 3rd and a major 6th (for example D–F–B), which can look like a major chord at first glance. The giveaway is the interval between the two upper notes: it is an augmented fourth (a tritone), not a perfect fourth.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
