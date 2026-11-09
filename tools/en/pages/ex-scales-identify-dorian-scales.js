const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/identify-dorian-scales/',
  esPath: '/ejercicios/escalas/escalas-menores-dorica/',
  title: "Dorian Scale Quiz: Identify It on the Staff",
  description: "Practice recognizing Dorian scales on the staff: a minor scale with a raised 6th. Free interactive quiz with easy and hard modes.",
  h1: "Identify Dorian Scales",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-menores-engine'],
  body: `<p>The staff shows the 8 notes of a Dorian scale, and your task is to recognize which one it is. On <strong>easy</strong> you choose from 4 options; on <strong>hard</strong> you first pick the root note and then its accidental.</p>

<div id="tmesc_dorica"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEscMenores("tmesc_dorica", "dórica");
  });
</script>

<p><strong>Tip:</strong> Dorian is a minor mode with a <strong>major 6th</strong>: the 6th degree is raised by a half step compared with the natural minor scale. That is what separates it from the natural minor and the harmonic minor scales.</p>

<h2>What is the Dorian scale?</h2>
<p>The <strong>Dorian scale</strong> is the natural minor scale with the <strong>6th degree raised</strong> by a half step. Its pattern of whole steps (UK: tones) and half steps (UK: semitones) is <strong>W-H-W-W-W-H-W</strong>. It keeps the minor character (minor 3rd) but its major 6th gives it a more open color, common in folk, modal jazz and Celtic music.</p>

<h3>Example: D Dorian</h3>
<p>Start from D natural minor (D-E-F-G-A-B♭-C) and raise the 6th degree (B♭ becomes B♮): <strong>D-E-F-G-A-B-C-D</strong>. It uses the key signature of D minor (one flat), and the 6th is raised with a natural sign.</p>

<h3>The key signature of Dorian</h3>
<p>A Dorian scale uses the <strong>key signature of the minor scale</strong> on the same tonic. The raised 6th is not in the key signature: it is written as an accidental, a natural sign if the key signature lowered that note, or a sharp if it did not alter it.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning first. You can also <a href="/ejercicios/escalas/construir-escala-menor-dorica/">build it note by note</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Dorian scale?</div>
      <div class="tm-faq-a">It is a minor mode: the natural minor scale with the 6th degree raised by a half step. It keeps the minor 3rd but has a major 6th, which gives it a brighter color.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it different from the natural minor scale?</div>
      <div class="tm-faq-a">Only in the 6th degree: Dorian raises it by a half step. The other notes are the same as in the natural minor scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What key signature does the Dorian scale have?</div>
      <div class="tm-faq-a">The key signature of the minor scale on the same tonic (the same as the natural minor). The raised 6th is not in the key signature; it is written as an accidental.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where is the Dorian scale used?</div>
      <div class="tm-faq-a">In folk and Celtic music, modal jazz, rock and a lot of early and popular repertoire, because of its minor mode with a major 6th.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
