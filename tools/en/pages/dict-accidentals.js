const dictionaryPage = require('../dictionary-page');
const IMG = '/assets/img/notacion/alteraciones/';
module.exports = dictionaryPage({
  path: '/en/music-dictionary/accidentals/',
  esPath: '/diccionario-musical/alteraciones/',
  title: 'Accidentals in Music: Sharp, Flat, Natural and Double',
  description: 'Accidentals raise or lower a note: sharp, flat, natural, double sharp and double flat. Learn what each does and how long an accidental lasts in a measure.',
  h1: 'Accidentals in Music',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  body: `<p><strong>Accidentals</strong> are the signs that change the <strong>pitch</strong> of a note, raising or lowering it by one or two <a href="/diccionario-musical/intervalos/tono-y-semitono/">half steps</a> (UK: semitones). The three basic ones are the <strong>sharp</strong> (♯), the <strong>flat</strong> (♭) and the <strong>natural</strong> (♮). The double sharp (𝄪) and the double flat (𝄫) complete the set.</p>

<h2>What is an accidental?</h2>

<p>An accidental is a sign placed to the <strong>left of a note</strong> (or at the beginning of the staff, in the key signature). It changes the pitch without changing the line or space the note sits on. This is what separates F from F♯: the same position on the staff, a different sound.</p>

<h2>The five accidentals</h2>

<div class="tm-table-wrap">
<table class="tm-table tm-table--tarjetas">
  <thead>
    <tr><th>Accidental</th><th>Symbol</th><th>Effect</th></tr>
  </thead>
  <tbody>
    <tr><td data-label="Accidental"><strong>Sharp</strong></td><td class="tm-celda-img" data-label="Symbol"><img src="${IMG}alteracion-sostenido.svg" width="313" height="220" alt="Sharp on a note" decoding="async"></td><td data-label="Effect">Raises the note by a half step</td></tr>
    <tr><td data-label="Accidental"><strong>Flat</strong></td><td class="tm-celda-img" data-label="Symbol"><img src="${IMG}alteracion-bemol.svg" width="311" height="220" alt="Flat on a note" decoding="async"></td><td data-label="Effect">Lowers the note by a half step</td></tr>
    <tr><td data-label="Accidental"><strong>Natural</strong></td><td class="tm-celda-img" data-label="Symbol"><img src="${IMG}alteracion-becuadro.svg" width="308" height="220" alt="Natural on a note" decoding="async"></td><td data-label="Effect">Cancels a previous accidental (natural note)</td></tr>
    <tr><td data-label="Accidental"><strong>Double sharp</strong></td><td class="tm-celda-img" data-label="Symbol"><img src="${IMG}alteracion-doble-sostenido.svg" width="317" height="220" alt="Double sharp on a note" decoding="async"></td><td data-label="Effect">Raises the note by a whole step (two half steps)</td></tr>
    <tr><td data-label="Accidental"><strong>Double flat</strong></td><td class="tm-celda-img" data-label="Symbol"><img src="${IMG}alteracion-doble-bemol.svg" width="324" height="220" alt="Double flat on a note" decoding="async"></td><td data-label="Effect">Lowers the note by a whole step (two half steps)</td></tr>
  </tbody>
</table>
</div>

<p>Raising or lowering a note often produces <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic notes</a>: C♯ and D♭ sit in different places on the staff but sound exactly the same.</p>

<h2>Key-signature accidentals, accidentals in the music and cautionary accidentals</h2>

<p>Depending on where they appear and what they are for, accidentals fall into three types:</p>

<ul>
  <li><strong>Key-signature accidentals:</strong> the ones written in the <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">key signature</a>, right after the clef. They affect every note with that letter name (in every octave) throughout <strong>the whole piece</strong> and they define the key.</li>
  <li><strong>Accidentals in the music (the common meaning of "accidental"):</strong> they appear inside a measure, in front of a particular note. They affect only the notes on the <strong>same line or space</strong> (same octave) <strong>until the end of that measure</strong>.</li>
  <li><strong>Cautionary (courtesy) accidentals:</strong> reminders, sometimes in parentheses, that do not change the sound. They only tell the player that an earlier accidental is no longer in force.</li>
</ul>

<h2>The measure rule and the natural sign</h2>

<p>An accidental in the music <strong>lasts until the end of the measure</strong> (UK: bar) on its line or space. So if a measure has an <strong>F♯</strong> and later in that same measure you want an <strong>F natural</strong>, you must write a <strong>natural sign</strong> in front of it. Without it, the F would still be sharp. After the bar line, accidentals in the music stop working and only the key signature remains. (One exception: if the note is tied across the bar line, the accidental still applies to the tied note.)</p>

<h2>Accidentals and half steps</h2>

<p>The effect of an accidental is measured in half steps. A <a href="/diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/">chromatic half step</a> (C–C♯) uses the same letter name with a different accidental, while a diatonic half step (E–F) uses two different letter names. Accidentals are therefore the tool that lets us write every note of the equal-tempered system using only the seven natural note names.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What is an accidental in music?</div>
<div class="tm-faq-a">An accidental is a sign that changes the pitch of a note by raising or lowering it by one or two half steps, without changing the line or space it sits on. The three basic ones are the sharp, the flat and the natural.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What are the musical accidentals?</div>
<div class="tm-faq-a">There are five: the sharp (♯, raises a half step), the flat (♭, lowers a half step), the natural (♮, cancels a previous accidental), the double sharp (𝄪, raises a whole step) and the double flat (𝄫, lowers a whole step).</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What does a sharp do and what does a flat do?</div>
<div class="tm-faq-a">A sharp (♯) raises a note by a half step. A flat (♭) lowers it by a half step. For example, F♯ sounds a half step above F, and B♭ sounds a half step below B.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the natural sign for?</div>
<div class="tm-faq-a">The natural sign (♮) cancels a previous accidental and returns the note to its natural pitch. If a measure has an F♯ and you then want an F natural, you have to write a natural sign in front of it.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How long does an accidental last?</div>
<div class="tm-faq-a">An accidental in the music affects every note on the same line or space (in the same octave) until the end of the measure. The bar line of the next measure cancels its effect.</div>
</div>
</div>
</div>
</div>
</section>`,
});
