const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-chromatic-scale/',
  esPath: '/ejercicios/escalas/construir-escala-cromatica/',
  title: "Build the Chromatic Scale on the Staff: Exercise",
  description: "Write the chromatic scale, ascending or descending, from any note. Free interactive exercise: sharps going up, flats going down.",
  h1: "Build the Chromatic Scale",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-construir-engine'],
  body: `<p>The name of a <strong>chromatic</strong> scale appears, with its direction: <strong>ascending</strong>, <strong>descending</strong> or, in the mixed level, either one at random. Your task is to write its <strong>13 notes</strong> on the staff, one after another a half step apart, with the right accidental on each.</p>

<div id="tmec_crom"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsConstrEngine("tmec_crom", {
      scales: TM_CONSTRUIR_SCALES["cromatica"],
      titulo: "la Escala Cromática",
      subtitulo: "Elige el sentido",
      grupos: [
        { lbl: "Ascendente", desc: "Con sostenidos", filtro: function (s) { return s.dir === "asc"; } },
        { lbl: "Descendente", desc: "Con bemoles", filtro: function (s) { return s.dir === "desc"; } },
        { lbl: "Mezcladas", desc: "Las dos, al azar", filtro: function () { return true; } }
      ]
    });
  });
</script>

<h2>Sharps going up, flats going down</h2>
<p>The chromatic scale is the series of the twelve different pitches inside an octave, each a half step (UK: semitone) from the previous one. That is thirteen notes if you count the octave at the end. To write it you use the seven natural notes and alter each one that needs to go up or down one more half step. Between E-F and B-C there is already a natural half step, so those pairs need no altered note.</p>
<p>The usual convention is: <strong>going up, with sharps</strong> (C, C♯, D, D♯, E, F, F♯...); <strong>going down, with flats</strong> (C, B, B♭, A, A♭, G...). That is why the same pitch can be spelled with different accidentals depending on the direction of the scale.</p>
<p><strong>Ascending from C:</strong> C · C♯ · D · D♯ · E · F · F♯ · G · G♯ · A · A♯ · B · C.</p>
<p><strong>Descending from C:</strong> C · B · B♭ · A · A♭ · G · G♭ · F · E · E♭ · D · D♭ · C.</p>

<h2>The same pattern from any note</h2>
<p>Starting on any tonic, the pattern does not change: you always go up (or down) half step by half step, with sharps going up and flats going down. The starting note is repeated at the end, an octave higher or lower, keeping its accidental: an ascending chromatic scale from F♯ ends on F♯, and a descending one from B♭ ends on B♭.</p>
<p>To work on fingering and intonation across the whole instrument, practice very slowly at first with the <a href="/herramientas/metronomo/">online metronome</a> and check each note with the <a href="/herramientas/afinador/">online tuner</a>. The full theory, with the scale written in all 12 keys, is in <a href="/diccionario-musical/tonalidades/escala-cromatica/">what is the chromatic scale</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you write the chromatic scale?</div>
      <div class="tm-faq-a">Use the 7 natural notes and alter each one that needs to go up or down one more half step, until all 12 pitches of the octave are covered. Between E-F and B-C no accidental is needed, because they are already a half step apart.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do you use sharps or flats in the chromatic scale?</div>
      <div class="tm-faq-a">It depends on the direction. Going up (ascending) you use sharps: C, C♯, D, D♯, E... Going down (descending) you use flats: C, B, B♭, A, A♭... This is the usual convention.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is there no altered note between E and F?</div>
      <div class="tm-faq-a">Because E and F (like B and C) are already a half step apart: there is no black key between them on the piano. So the chromatic scale needs an accidental in only 5 of the 7 steps between letter names, not in all 7.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many notes does the chromatic scale have?</div>
      <div class="tm-faq-a">The chromatic scale has 12 different pitches within an octave. Written complete, from a note up to its octave, it has 13 notes, because the starting note appears again at the end.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why practice the chromatic scale?</div>
      <div class="tm-faq-a">To master the keyboard or fingerboard of your instrument, to improve fingering and intonation on every half step, and to understand at a glance why the same key or position is written differently going up and going down.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
