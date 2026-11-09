const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/articulation/',
  esPath: '/ejercicios/articulacion/',
  title: 'Articulation Quiz: Staccato, Legato, Accent, Tenuto',
  description: 'Free music articulation quiz: legato, staccato, accent, tenuto and marcato. Name the symbol on the staff or pick the name for a symbol. Online, no sign-up.',
  h1: 'Musical Articulation Exercises',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['tm-mei', 'tm-notacion', 'articulacion-engine'],
  body: `<p>A quiz on the five main articulations: <strong>legato</strong>, <strong>staccato</strong>, <strong>accent</strong>, <strong>tenuto</strong> and <strong>marcato</strong>. It works in both directions: you are given the <strong>name</strong> and must recognize the <strong>symbol</strong> drawn on the staff, or you see the symbol and must give the name.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Articulation</th><th>Symbol</th><th>Effect</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Legato</strong> (smooth, connected)</td><td>slur (curved line)</td><td>Notes joined, with no gap</td></tr>
    <tr><td><strong>Staccato</strong> (detached)</td><td>small dot above or below the note</td><td>Short, separated notes</td></tr>
    <tr><td><strong>Accent</strong></td><td>&gt; (angle sign)</td><td>Note attacked with more force</td></tr>
    <tr><td><strong>Tenuto</strong></td><td>horizontal line (—)</td><td>Hold the note for its full value, with weight</td></tr>
    <tr><td><strong>Marcato</strong></td><td>vertical wedge (strong accent)</td><td>Very marked and energetic</td></tr>
  </tbody>
</table>
</div>

<h2>Musical articulation quiz</h2>
<div id="tmart"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    if (window.tmArticulacionEngine) tmArticulacionEngine("tmart");
  });
</script>

<p><strong>How to use the exercise:</strong> Choose the direction (name → symbol, symbol → name, or mixed) and answer the questions; no articulation is repeated. The app corrects each answer right away and, if you miss, explains the correct articulation.</p>

<p><strong>What you practice:</strong> recognizing articulation symbols on the staff, linking each symbol to its name, telling staccato, tenuto, accent and marcato apart, and recognizing legato by its slur.</p>

<p>The full theory, with an example staff for each articulation, is on the page about <a href="/diccionario-musical/articulacion-musical/">musical articulation</a>.</p>

<h2>Definitions quiz</h2>
<p>This second quiz does not use the staff: you match each articulation with its <strong>definition</strong>. You are given the name and choose what it means, or you are given the meaning and choose the name.</p>
<div id="tmartdef"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    if (window.tmArticulacionDefEngine) tmArticulacionDefEngine("tmartdef");
  });
</script>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which articulations are in the quiz?</div>
      <div class="tm-faq-a">The five main ones: legato (smooth), staccato (detached), accent, tenuto and marcato. Each one comes with its name, its symbol and its effect.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What do the two directions of the quiz mean?</div>
      <div class="tm-faq-a">In "Name → Symbol" you get the name of the articulation and must recognize its symbol drawn on the staff among several options. In "Symbol → Name" it is the other way around: you see the symbol and choose its name. The "Mixed" mode combines both directions at random.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where is the articulation mark placed on the staff?</div>
      <div class="tm-faq-a">On the side opposite the stem: if the stem points up, the mark goes below the notehead; if it points down, the mark goes above. In this quiz the notes have stems pointing up, so the marks appear below the notehead.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the main musical articulations?</div>
      <div class="tm-faq-a">The ones practiced in this exercise: legato, staccato, accent, tenuto and marcato. Each has its own symbol and changes how the notes are attacked, sustained or separated.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the definitions quiz?</div>
      <div class="tm-faq-a">A second quiz, without a staff, that matches each articulation with its meaning: you get the name and choose what effect it produces (for example, staccato means short, separated notes), or the other way around.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
