const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/note-names/',
  esPath: '/ejercicios/equivalencias-de-notas/',
  title: 'Note Names Quiz: Letters, Do-Re-Mi and German H',
  description: 'Free quiz to memorize note names: letters (C-B), fixed-do solfège (Do-Si) and German (C-H). 10 questions, including the German B and H trap.',
  h1: 'Note Names Quiz: Letters, Solfège and German',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['equivalencias-engine'],
  body: `<p>Test how well you know the <strong>names of the notes</strong> in the three most common systems: <strong>letters</strong> (C, D, E…, used in English-speaking countries), <strong>fixed-do solfège</strong> (Do, Re, Mi…, the names used in Spanish-, French- and Italian-speaking countries, where Do is always C) and the <strong>German</strong> system. There are <strong>10 questions</strong> with instant answers, and the quiz includes the famous German trap: <strong>H</strong> and <strong>B</strong>.</p>
<div id="tmequiv"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmEquivEngine("tmequiv");});</script>
<p>Need to review first? Read the full guide to <a href="/diccionario-musical/nombres-de-las-notas-musicales/">note names</a>, with the equivalence tables for letters, fixed-do solfège and German.</p>
<p>More exercises: <a href="/ejercicios/identificar-notas/">identify notes on the staff</a> and <a href="/ejercicios/escribir-notas/">write notes on the staff</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does this quiz practice?</div>
      <div class="tm-faq-a">The equivalences between note names as letters (C, D, E…), as fixed-do solfège (Do, Re, Mi…) and in German (where B natural is H and B♭ is B). Each question shows the answer and a short explanation.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can I memorize the equivalences quickly?</div>
      <div class="tm-faq-a">With repetition: retake the quiz until you answer without hesitating. Start with the letters (C-D-E-F-G-A-B = Do-Re-Mi-Fa-Sol-La-Si) and leave German for last, because it only changes B natural (H) and B♭ (B).</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
