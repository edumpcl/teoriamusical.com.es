const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/identify-melodic-minor-scales/',
  esPath: '/ejercicios/escalas/escalas-menores-melodica/',
  title: "Melodic Minor Scale Quiz: Identify It on the Staff",
  description: "Practice recognizing the 15 melodic minor scales on the staff, ascending and descending. Free interactive quiz with easy and hard modes.",
  h1: "Identify Melodic Minor Scales",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-menores-engine'],
  body: `<p>The staff shows a complete melodic minor scale (15 notes, ascending and descending), and your task is to recognize which one it is. On <strong>easy</strong> you choose from 4 options; on <strong>hard</strong> you first pick the root note and then its accidental.</p>

<div id="tmesc_menor_m"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEscMenores("tmesc_menor_m", "melódica");
  });
</script>

<p><strong>Tip:</strong> In its ascending form, the melodic minor scale raises both the 6th and the 7th degree, which removes the augmented second of the harmonic minor scale. It sounds almost like a major scale, except that the 3rd stays lowered. That lowered 3rd confirms it is a minor scale.</p>

<h2>What is the melodic minor scale?</h2>
<p>The <strong>melodic minor scale</strong> changes with the direction. <strong>Ascending</strong>, the 6th and 7th degrees are raised by a half step compared with the natural minor scale, giving the pattern <strong>W-H-W-W-W-W-H</strong> (UK: tone and semitone). <strong>Descending</strong>, the scale goes back to the natural minor scale: <strong>W-W-H-W-W-H-W</strong> read from the top down.</p>
<p>The reason is melodic. When the line climbs to the tonic, raising the 6th and 7th avoids the augmented second of the harmonic minor scale and makes a smoother line. When it goes down, the pull toward the tonic is no longer needed and the darker natural minor is used.</p>

<h3>Example: A melodic minor</h3>
<p>Ascending: <strong>A-B-C-D-E-F♯-G♯-A</strong> (6th and 7th raised). Descending: <strong>A-G-F-E-D-C-B-A</strong> (the same as natural minor).</p>

<h3>How it differs from the harmonic minor scale</h3>
<p>The <strong>harmonic minor scale</strong> raises only the 7th and keeps the 6th unaltered, which leaves an augmented second. The <strong>ascending melodic minor scale</strong> raises the 6th too, which removes that augmented second and gives a smoother, more vocal line.</p>

<h3>The 15 melodic minor scales</h3>
<p>There are 15 melodic minor scales, one for each key. The exercise shows the complete scale: the ascending form (with the raised 6th and 7th) followed by the descending form (back to natural minor). In each key the 6th and 7th degrees can appear as naturals (if the key signature had them flat) or as sharps (if the key signature had them natural).</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the melodic minor scale?</div>
      <div class="tm-faq-a">It is the form of the minor scale that raises both the 6th and the 7th degree on the way up, to avoid the augmented second of the harmonic minor scale. On the way down, the natural degrees return, so the descending form is the natural minor scale. It is one scale with two directions.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the pattern of the ascending melodic minor scale?</div>
      <div class="tm-faq-a">W-H-W-W-W-W-H. Compared with the major scale (W-W-H-W-W-W-H), it differs only in the 3rd degree: the half step comes between the 2nd and 3rd degrees. From the 4th degree up, the notes are the same as in the parallel major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the melodic minor scale change when it goes down?</div>
      <div class="tm-faq-a">The raised 6th and 7th make the ascent smooth and lead the line to the tonic. Going down, away from the tonic, that pull is not needed, so the natural minor degrees come back.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you identify an ascending melodic minor scale on the staff?</div>
      <div class="tm-faq-a">Look for a scale with the minor 3rd of the natural minor, but with 6th and 7th degrees that match the parallel major scale. If accidentals raise the 6th and 7th, it is the ascending melodic minor scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the notes of A melodic minor?</div>
      <div class="tm-faq-a">Ascending: A-B-C-D-E-F♯-G♯-A. The 6th and 7th degrees (F and G) are raised a half step (F♯ and G♯). Descending: A-G-F-E-D-C-B-A, the same as natural minor, with no accidentals.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
