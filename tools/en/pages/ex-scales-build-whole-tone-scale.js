const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-whole-tone-scale/',
  esPath: '/ejercicios/escalas/construir-escala-hexatona/',
  title: 'Build the Whole-Tone Scale on the Staff: Exercise',
  description: 'Write the whole-tone scale from any note: six notes a whole step apart. Any correct spelling is accepted. Free interactive staff exercise.',
  h1: 'Build the Whole-Tone Scale',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-construir-engine'],
  body: `<p>The name of a <strong>whole-tone</strong> scale appears and you write its <strong>7 notes</strong> on the staff, from the tonic to its octave, each one a <strong>whole step</strong> (UK: tone) above the previous one and with the right accidental.</p>

<div id="tmec_hex"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsConstrEngine("tmec_hex", {
      scales: TM_CONSTRUIR_SCALES["hexatona"],
      titulo: "la Escala Hexátona",
      subtitulo: "Elige la tónica",
      grupos: [
        { lbl: "Tónica natural", desc: "Do, Re, Mi, Fa, Sol, La, Si", filtro: function (s) { return !s.alterada; } },
        { lbl: "Tónica alterada", desc: "Do♯, Mi♭, Fa♯, La♭, Si♭", filtro: function (s) { return s.alterada; } },
        { lbl: "Mezcladas (las 12)", desc: "Cualquier tónica", filtro: function () { return true; } }
      ]
    });
  });
</script>

<p><strong>How to use the exercise:</strong> click (or drag) on the staff to place each note, in the order you hear it. Before placing it, choose the accidental with the ♭ ♮ ♯ buttons if the note needs one. <em>Undo</em> removes the last note and <em>Clear</em> starts again. The magnifier shows an enlarged view of the note you are about to place.</p>

<h2>Six notes a whole step apart</h2>
<p>The whole-tone scale splits the octave into <strong>six equal whole steps</strong>: it has no half steps at all, and so no leading tone either. Written in full, from the tonic to its octave, it has seven notes.</p>
<p><strong>From C:</strong> C · D · E · F♯ · G♯ · A♯ · C.<br>
<strong>From D:</strong> D · E · F♯ · G♯ · A♯ · B♯ · D.</p>

<h2>One letter is always left out</h2>
<p>Six notes cannot fill the seven letters of the octave, so somewhere one <strong>letter is skipped</strong>: those two notes form a diminished 3rd, which sounds the same as a whole step. In the example from D, B♯–D skips C. The most common spelling is the one above, where the scale moves through consecutive letters and skips at the end (1 · 2 · 3 · ♯4 · ♯5 · ♯6 · 8). When that would need a double sharp, another letter is skipped earlier: from C♯, C♯ · D♯ · F · G · A · B · C♯.</p>
<p>That is why the exercise accepts <strong>any correct spelling</strong>: the scale must start and end on the tonic, each note must be a whole step above the previous one and no letter may repeat. If you write another valid spelling, the correction also shows you the most common one.</p>
<p>The full theory, with the scale written from all 12 tonics, is on the page <a href="/diccionario-musical/tonalidades/escala-de-tonos-enteros/">whole-tone scale</a>. To practice the scale that moves by half steps instead, try <a href="/ejercicios/escalas/construir-escala-cromatica/">building the chromatic scale</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you write a whole-tone scale?</div>
      <div class="tm-faq-a">From the tonic, go up six whole steps in a row until you reach the octave: from C, C D E F♯ G♯ A♯ C. Since there are only six notes for seven letters, one letter is skipped somewhere; the usual spelling moves through consecutive letters and skips at the end.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is a hexatonic scale the same as the whole-tone scale?</div>
      <div class="tm-faq-a">The whole-tone scale is a hexatonic scale (six notes per octave), but not every hexatonic scale is whole-tone: the blues scale, for example, also has six notes. In Spanish-language conservatories "escala hexátona" or "hexatónica" usually means the whole-tone scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the whole-tone scale have no leading tone?</div>
      <div class="tm-faq-a">Because all its intervals are whole steps: there is no half step, and the leading tone is the note a half step below the tonic. Without it the scale sounds suspended, with no clear tonal center.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many whole-tone scales are there?</div>
      <div class="tm-faq-a">Only two different ones: the one that contains C (C D E F♯ G♯ A♯) and the one that contains C♯ (C♯ D♯ F G A B). Any other is one of these two starting on another note, written with its own spelling.</div>
    </div>
  </div>
</div>
</div>
</section>`
});
