const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/keys/neighboring-keys/',
  esPath: '/ejercicios/tonalidades/tonalidades-vecinas/',
  title: 'Neighboring Keys Exercises: Closely Related Keys Quiz',
  description: 'Practice finding the closely related (neighboring) keys of any key. Interactive quiz: fill in the five neighbors and decide whether two keys are neighbors.',
  h1: 'Neighboring Keys',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Key Signatures', '/ejercicios/tonalidades/']],
  scripts: ['tonalidades-vecinas-engine'],
  body: `<p>Two keys are <strong>neighbors</strong> (also called <strong>closely related keys</strong>) when their key signatures differ by at most one accidental. That means they share six of their seven notes, which is why modulating between them sounds completely natural. Every key has exactly <strong>five neighbors</strong>: its relative key (same key signature), plus the keys a fifth above and a fifth below, together with their relatives.</p>

<h2 id="h-exercise-1">Exercise 1: Complete the table of neighbors</h2>

<p>A key is shown. Write its 5 neighboring keys in the matching cells and press <em>Check</em>. You can move between cells with <kbd>Enter</kbd>.</p>

<div id="tmvec_tabla"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmVecinaTabla("tmvec_tabla");
  });
</script>

<h2 id="h-exercise-2" style="margin-top: 2.5rem;">Exercise 2: Are they neighbors?</h2>

<p>Two keys are shown. Decide whether they are neighbors (their key signatures differ by 0 or 1 accidental) or distant (they differ by 2 or more).</p>

<div id="tmvec_sonvecinas"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmVecinaSonVecinas("tmvec_sonvecinas");
  });
</script>

<p>To review the theory first, read the full guide to <a href="/diccionario-musical/tonalidades/tonalidades-vecinas/">closely related keys</a> before practicing.</p>

<p>Playing scales with the <a href="/herramientas/metronomo/">online metronome</a> builds muscle memory. The <a href="/herramientas/afinador/">online tuner</a> lets you check that the altered notes of each key signature are in tune.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are neighboring keys?</div>
      <div class="tm-faq-a">The neighboring keys of a key are those whose key signature has one sharp or flat more or fewer than the starting key (or the same key signature). Every major key has exactly 5 neighbors: its dominant key (one more sharp), its subdominant key (one more flat) and the relative minors of all three.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many neighboring keys does a major key have?</div>
      <div class="tm-faq-a">Five: the dominant (major key on the 5th degree), the subdominant (major key on the 4th degree), the relative minor (on the 6th degree), the relative minor of the dominant and the relative minor of the subdominant. Together they form the immediate harmonic neighborhood of the key.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why do neighboring keys matter in composition?</div>
      <div class="tm-faq-a">Modulations to neighboring keys are the most natural and common in tonal music. Because the keys share almost all their notes, the change is smooth and the ear hears it as coherent. Composers such as Bach, Mozart and Beethoven modulate to neighboring keys constantly to create variety without losing the sense of a home key.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can I tell if two keys are neighbors?</div>
      <div class="tm-faq-a">Compare their key signatures. If they differ by a single accidental (one has one more sharp or flat than the other), they are neighbors. For example, C major (no accidentals) and G major (1 sharp) are neighbors. C major and D major (2 sharps) are not direct neighbors.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the neighboring keys of C major?</div>
      <div class="tm-faq-a">The 5 neighbors of C major are G major (1♯), F major (1♭), A minor (the relative minor of C major, no accidentals), E minor (the relative minor of G major, 1♯) and D minor (the relative minor of F major, 1♭).</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
