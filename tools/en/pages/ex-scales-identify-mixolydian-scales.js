const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/identify-mixolydian-scales/',
  esPath: '/ejercicios/escalas/escalas-mixolidia/',
  title: "Mixolydian Scale Quiz: Identify It on the Staff",
  description: "Practice recognizing Mixolydian scales on the staff: a major scale with a lowered 7th. Free interactive quiz with easy and hard modes.",
  h1: "Identify Mixolydian Scales",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-mayores-engine'],
  body: `<p>The staff shows the 8 notes of a Mixolydian scale, and your task is to recognize which one it is. On <strong>easy</strong> you choose from 4 options; on <strong>hard</strong> you first pick the root note and then its accidental.</p>

<div id="tmesc_mixolidia"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEscMayores("tmesc_mixolidia", "mixolidia");
  });
</script>

<p><strong>Tip:</strong> Mixolydian is a major-sounding mode with a <strong>minor 7th</strong>: the 7th degree is lowered by a half step compared with the major scale.</p>

<h2>What is the Mixolydian scale?</h2>
<p>The <strong>Mixolydian scale</strong> is the major scale with the <strong>7th degree lowered</strong> by a half step. Its pattern of whole steps (UK: tones) and half steps (UK: semitones) is <strong>W-W-H-W-W-H-W</strong>. It sounds major but has no leading tone, which gives it an open character typical of blues, rock and folk music.</p>

<h3>Example: G Mixolydian</h3>
<p>Start from G major (G-A-B-C-D-E-F♯) and lower the 7th degree (F♯ becomes F♮): <strong>G-A-B-C-D-E-F-G</strong>. The key signature is the one of G major (one sharp), and the 7th is lowered with a natural sign.</p>

<h3>The key signature of Mixolydian</h3>
<p>A Mixolydian scale uses the <strong>key signature of the major scale</strong> on the same tonic. The lowered 7th is not in the key signature: it is written as an accidental, a natural sign if the key signature raised that note, or a flat if it did not alter it.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning first. You can also <a href="/ejercicios/escalas/construir-escala-mixolidia/">build it note by note</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Mixolydian scale?</div>
      <div class="tm-faq-a">It is a major mode: the major scale with the 7th degree lowered by a half step. It keeps the major 3rd but has a minor 7th, so there is no leading tone.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it different from the major scale?</div>
      <div class="tm-faq-a">Only in the 7th degree: Mixolydian lowers it by a half step. The other notes are the same as in the major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What key signature does the Mixolydian scale have?</div>
      <div class="tm-faq-a">The key signature of the major scale on the same tonic. The lowered 7th is not in the key signature; it is written as an accidental.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where is the Mixolydian scale used?</div>
      <div class="tm-faq-a">In blues, rock, funk and many folk traditions, because of its minor 7th. It is also the scale that fits a dominant seventh chord.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
