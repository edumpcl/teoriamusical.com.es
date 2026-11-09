const dictionaryPage = require('../dictionary-page');
const IMG = '/assets/img/notacion/figuras/';
const rows = [
  ['Dotted whole note', 'figura-redonda-puntillo', 338, '4 + 2', '6 beats'],
  ['Dotted half note', 'figura-blanca-puntillo', 261, '2 + 1', '3 beats'],
  ['Dotted quarter note', 'figura-negra-puntillo', 212, '1 + ½', '1½ beats'],
  ['Dotted eighth note', 'figura-corchea-puntillo', 184, '½ + ¼', '¾ beat'],
  ['Dotted sixteenth note', 'figura-semicorchea-puntillo', 184, '¼ + ⅛', '⅜ beat'],
  ['Dotted thirty-second note', 'figura-fusa-puntillo', 184, '⅛ + 1/16', '3/16 beat'],
  ['Dotted sixty-fourth note', 'figura-semifusa-puntillo', 184, '1/16 + 1/32', '3/32 beat'],
].map(r => `    <tr><td data-label="Dotted note"><strong>${r[0]}</strong></td><td class="tm-celda-img" data-label="Symbol"><img src="${IMG}${r[1]}.svg" width="${r[2]}" height="220" alt="${r[0]}" decoding="async"></td><td data-label="Value + half">${r[3]}</td><td data-label="Total duration">${r[4]}</td></tr>`).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/dotted-notes/',
  esPath: '/diccionario-musical/puntillo/',
  title: 'Dotted Notes: How a Dot Works, Values and Double Dots',
  description: 'A dot adds half the value of a note. See the value of every dotted note, how rests and double dots work, and why a dotted note equals a tie.',
  h1: 'Dotted Notes and the Dot',
  crumbLabel: 'Dotted Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Note Values', '/diccionario-musical/figuras-musicales/']],
  articleClass: 'tm-article tm-article--wide',
  body: `<p>The <strong>dot</strong> is a small point written to the right of a <a href="/diccionario-musical/figuras-musicales/">note</a> (or a rest). It <strong>lengthens the note by half of its value</strong>. It is one of the most common tools of rhythmic notation.</p>

<h2>What is a dot and how is it calculated?</h2>

<p>The rule is simple: <strong>the dot adds half of the note's own value</strong>. A dotted note therefore lasts its original value plus half of that value, which is one and a half times its length.</p>

<p>For example, a <strong>quarter note</strong> (UK: crotchet) is worth 1 beat. Half of that is half a beat (an eighth note, UK: quaver). So a <strong>dotted quarter note</strong> is worth 1 + ½ = <strong>1.5 beats</strong>, the same as a quarter note tied to an eighth note.</p>

<figure class="tm-staff"><img src="${IMG}figura-negra-puntillo.svg" width="212" height="220" alt="Dotted quarter note on the staff" decoding="async"><figcaption>Dotted quarter note = 1.5 beats.</figcaption></figure>

<h2>The value of each dotted note</h2>

<p><strong>Any note value can have a dot.</strong> Taking the quarter note as the beat, these are the durations of the seven dotted notes:</p>

<div class="tm-table-wrap">
<table class="tm-table tm-table--tarjetas">
  <thead>
    <tr><th>Dotted note</th><th>Symbol</th><th>Value + half</th><th>Total duration</th></tr>
  </thead>
  <tbody>
${rows}
  </tbody>
</table>
</div>

<h2>The dot on rests</h2>

<p>The dot works in exactly the same way on <a href="/diccionario-musical/figuras-musicales/">rests</a>: it lengthens the rest by half of its value. A dotted quarter rest is 1.5 beats of silence, just as a dotted quarter note is 1.5 beats of sound.</p>

<h2>The double dot</h2>

<p>The <strong>double dot</strong> is <strong>two dots in a row</strong> to the right of the note. The second dot adds half of the value of the first one, which is <strong>a quarter of the original note value</strong>. A double-dotted note therefore lasts its value plus a half plus a quarter (one and three quarters of its length).</p>

<p>For example, a <strong>double-dotted quarter note</strong> lasts 1 + ½ + ¼ = <strong>1.75 beats</strong>, equal to a quarter note plus an eighth note plus a sixteenth note. The double dot is less common than the single dot, but it often appears in marches and in Baroque music.</p>

<h2>The value of a dotted note depends on the time signature</h2>

<p>The durations on this page take the quarter note as the beat, as in 2/4, 3/4 and 4/4. In compound meters (6/8, 9/8, 12/8) the beat is the dotted quarter note, so the counting changes: a <strong>dotted quarter note</strong> is worth <strong>1.5 beats in 2/4</strong> but <strong>1 beat in 6/8</strong>. To practice, try the exercise on the <a href="/ejercicios/figuras/valor-de-las-figuras/">value of notes in each time signature</a>, with a PDF worksheet and answers.</p>

<h2>Practice: the dot is a tie</h2>

<p>One thing does not depend on the time signature: every dotted note sounds <strong>exactly the same</strong> as a pair of tied notes (with a double dot, three tied notes). A dotted quarter note and a quarter note tied to an eighth note are the same sound written two ways. Test this equivalence in both directions with the <a href="/ejercicios/figuras/puntillo-y-ligadura/">interactive exercise</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What is a dot in music?</div>
<div class="tm-faq-a">A dot is a point written to the right of a note or a rest that lengthens it by half of its value. Any note value can have one.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How much does a dot add to a note?</div>
<div class="tm-faq-a">The dot adds half of the note's value. A dotted note therefore lasts its original value plus half of it: one and a half times its length.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How long is a dotted quarter note?</div>
<div class="tm-faq-a">A quarter note is worth 1 beat and half of that is half a beat (an eighth note), so a dotted quarter note lasts 1.5 beats, the same as a quarter note plus an eighth note.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is a double dot?</div>
<div class="tm-faq-a">A double dot is two dots in a row. The second dot adds half of the value of the first, which is a quarter of the original note value. A double-dotted note lasts its value plus a half plus a quarter. For example, a double-dotted quarter note lasts 1.75 beats.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Can a rest have a dot?</div>
<div class="tm-faq-a">Yes. The dot works on rests just as on notes: it lengthens the rest by half of its value. A dotted quarter rest equals 1.5 beats of silence.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How much is a dot worth?</div>
<div class="tm-faq-a">The dot is worth half of the note it follows. If the note lasts 2 beats, the dot adds 1; if it lasts 1, the dot adds ½. That is why a dotted note always lasts one and a half times its original value.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How long is a dotted half note?</div>
<div class="tm-faq-a">A half note is worth 2 beats and half of that is 1 beat (a quarter note), so a dotted half note lasts 3 beats, the same as a half note plus a quarter note. It is the note that fills a measure of 3/4.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How long is a dotted eighth note?</div>
<div class="tm-faq-a">An eighth note is worth ½ beat and half of that is ¼ beat (a sixteenth note), so a dotted eighth note lasts ¾ of a beat, the same as an eighth note plus a sixteenth note.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How long is a dotted whole note?</div>
<div class="tm-faq-a">A whole note is worth 4 beats and half of that is 2 beats (a half note), so a dotted whole note lasts 6 beats, the same as a whole note plus a half note.</div>
</div>
</div>
</div>
</div>
</section>`,
});
