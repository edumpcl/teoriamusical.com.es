const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/time-signatures/off-beat-notes/',
  esPath: '/ejercicios/compases/contratiempo/',
  title: 'Off-Beat Notes Exercises Online: Find the Off-Beat',
  description: 'Free off-beat exercise: tap the note that is off the beat, or "no off-beat". Off-beat on a half beat and on a whole beat. Worksheets.',
  h1: 'Off-Beat Notes Exercises',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Time Signature Exercises', '/ejercicios/compases/']],
  scripts: ['tm-mei', 'tm-notacion', 'contratiempo-engine', 'ficha-contratiempo-engine'],
  body: `<p>This exercise teaches you to recognize an off-beat note without confusing it with a normal entrance, a syncopation or some other rhythmic rest. A rhythm excerpt appears in 2/4, 3/4 or 4/4, with quarter notes, eighth notes and rests. You have to <strong>tap on the staff</strong> the note that is <strong>off the beat</strong> (the one that is attacked on a weak beat or weak part of the beat, with a rest right before it and no tie), or press "No off-beat" if the excerpt has none.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>Where the rest is</th><th>Where the note is attacked</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Off-beat on a half beat</strong></td><td>The strong part of a beat</td><td>The "and" (weak part) of the same beat</td></tr>
    <tr><td><strong>Off-beat on a whole beat</strong></td><td>A whole strong beat</td><td>The next, weaker beat</td></tr>
  </tbody>
</table>
</div>

<h2>Off-beat quiz</h2>
<div id="tmct"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    if (window.tmContratiempoEngine) tmContratiempoEngine("tmct");
    if (window.tmFichaContratiempo) tmFichaContratiempo("tmfc");
    if (window.tmFichaContratiempo) tmFichaContratiempo("tmfcd", { dificil: true });
  });
</script>

<p><strong>How to use the exercise:</strong> choose between the <strong>normal</strong> mode (an excerpt of one measure, with no off-beat note or at most one) and the <strong>hard</strong> mode (excerpts of 2 measures, where there can be several off-beat notes at once, or none). Tap the note or notes that you think are off the beat, or "No off-beat" if the excerpt has none, and press Check. The app corrects right away and explains why it is or is not an off-beat note. Each test has 10 computer-generated questions with random notes, so the same excerpt almost never comes up twice.</p>

<p><strong>What you practice:</strong> telling a real off-beat note from two classic distractors: a rest that comes before a note that does NOT fall on a weak part (it enters normally, so it is not off-beat) and a real <a href="/diccionario-musical/compases/sincopa/">syncopation</a> (there is a tie, not a rest). <strong>Hint:</strong> look for the rest first; if right after it there is a note on a weak beat or weak part, it is off-beat. The rest does not need to be stronger than the note, only the note has to fall on a weak part.</p>

<p>The full theory, with staff examples, is in <a href="/diccionario-musical/compases/notas-a-contratiempo/">off-beat notes</a>.</p>

<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: <strong>seventeen rhythmic excerpts</strong> on one A4 sheet. The student circles the note they think is off the beat, or ticks the "No off-beat" box. With a separate <strong>answer sheet</strong>, with the note in red.</p>
<figure class="tm-staff">
  <a href="/assets/img/compases/fichas/ficha-contratiempo.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/compases/fichas/preview-ficha-contratiempo.webp"><img src="/assets/img/compases/fichas/preview-ficha-contratiempo.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for the off-beat exercise"></picture></a>
  <figcaption>A4 sheet with seventeen rhythmic excerpts.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/compases/fichas/ficha-contratiempo.pdf" target="_blank" rel="noopener">Download the worksheet (A4 PDF)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/compases/fichas/ficha-contratiempo-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You can print and photocopy it freely for class.</p>

<h2>More worksheets</h2>
<p>The same exercise on paper, for class: you can generate <strong>more worksheets</strong>, each with different excerpts, and print them straight from your browser. The student circles the note that is off the beat, or ticks the "No off-beat" box. Each sheet comes with its own answer sheet.</p>
<div id="tmfc"></div>

<h2>Hard mode worksheet (PDF)</h2>
<p>The advanced version on paper: <strong>ten excerpts</strong> of 2 measures, where there can be several off-beat notes at once, or none. The student circles every note they think is off the beat, or ticks the "No off-beat" box. With a separate <strong>answer sheet</strong>, with each note in red.</p>
<figure class="tm-staff">
  <a href="/assets/img/compases/fichas/ficha-contratiempo-dificil.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/compases/fichas/preview-ficha-contratiempo-dificil.webp"><img src="/assets/img/compases/fichas/preview-ficha-contratiempo-dificil.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for the off-beat exercise, hard level"></picture></a>
  <figcaption>A4 sheet with ten excerpts of 2 measures.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/compases/fichas/ficha-contratiempo-dificil.pdf" target="_blank" rel="noopener">Download the worksheet (A4 PDF)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/compases/fichas/ficha-contratiempo-dificil-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You can print and photocopy it freely for class.</p>

<h2>More hard mode worksheets</h2>
<p>The advanced version on paper: excerpts of 2 measures, where there can be several off-beat notes at once, or none. The student circles every off-beat note, or ticks "No off-beat". Generate as many sheets as you need, each with different excerpts.</p>
<div id="tmfcd"></div>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is an off-beat note?</div>
      <div class="tm-faq-a">It is a note attacked on a weak beat or weak part of the beat with a rest right before it and no tie. The rest does not need to be stronger than the note: it is enough that the note falls on a weak part and a rest comes before it. If there is no rest, there cannot be an off-beat note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I know if a note is off the beat?</div>
      <div class="tm-faq-a">Look for the rest first. For a note to be off the beat, it must enter on a weak beat or weak part right after a rest, and it must not be tied to any note. If there is no rest immediately before it, if the note does not fall on a weak part, or if the note is tied, it is not an off-beat note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which types of off-beat note appear?</div>
      <div class="tm-faq-a">Off-beat on a half beat (an eighth rest on the strong part of a beat, the note on the "and") and off-beat on a whole beat (a whole beat of silence, the note on the next weak beat). In both cases the note ends before the next strong part: if it sounded over it without being attacked again, it would be a syncopation, not an off-beat note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are some excerpts with a rest not off-beat?</div>
      <div class="tm-faq-a">Because, although there is a rest, the note that enters after it does not fall on a weak part (it enters on a strong or medium-strong beat): it enters normally, not off the beat. The case of a real syncopation (a weak note tied to the strong one, with no rest) is also included.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between an off-beat note and syncopation?</div>
      <div class="tm-faq-a">In an off-beat note there is an explicit rest right before the weak note. In syncopation there is no rest: the strong beat is absorbed by a tie, and the weak note is held over it. The off-beat note is sharper; the syncopation is smoother.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are there printable worksheets?</div>
      <div class="tm-faq-a">Yes. You can generate as many different worksheets as you want directly in your browser, in a normal and a hard version, each with its own answer sheet, and print them freely for class.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the hard mode different from the normal one?</div>
      <div class="tm-faq-a">In the normal mode each excerpt has at most one off-beat note. In the hard mode the excerpt lasts 2 measures and can have several off-beat notes at once (or none): you have to tap every note that is off the beat.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
