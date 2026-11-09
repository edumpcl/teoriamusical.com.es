const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/repeat-signs/',
  esPath: '/diccionario-musical/signos-de-repeticion/',
  title: 'Repeat Signs in Music: D.C., D.S., Coda, Endings',
  description: 'Learn musical repeat signs: repeat barlines, first and second endings, Da Capo, Dal Segno, Coda and Fine, with examples and interactive audio.',
  h1: 'Repeat Signs in Music',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>Repeat signs are the symbols of music notation that tell you to play a passage again or to jump to another place in the score.</strong> They save writing the same passage twice, and knowing how to read them is essential to follow the <strong>playing order</strong> of a piece. In each example on this page you can <strong>press ▶ to hear the real order in which it is played</strong>: not what is written, but how it sounds once the repeats are worked out.</p>

<h2>Repeat barlines</h2>

<p>These are two dots next to a double bar line. The <strong>opening repeat sign</strong> <strong>|:</strong> marks where the repeated section begins, and the <strong>closing one</strong> <strong>:|</strong> marks the end. At <strong>:|</strong> you go back to <strong>|:</strong> (or to the beginning, if there is no opening sign) and play the passage <strong>a second time</strong>.</p>

<figure class="tm-staff" data-tm-melody="c/4:q d/4:q e/4:q f/4:q | g/4:q a/4:q g/4:q e/4:q | c/4:q d/4:q e/4:q f/4:q | g/4:q a/4:q g/4:q e/4:q" data-tm-bpm="108"><img src="/assets/img/notacion/compases/repeticion-barras.svg" width="477" height="122" alt="Two measures between an opening and a closing repeat sign" loading="lazy" decoding="async"><figcaption>Written: 2 measures (UK: bars) between <strong>|:</strong> and <strong>:|</strong>. Press ▶: they are played <strong>twice</strong> (that is the real order).</figcaption></figure>

<h2>First and second endings</h2>

<p>When a repeated section ends differently the first and second time, <strong>endings</strong> are used (UK: first- and second-time bars, also called <em>volta</em> brackets): a bracket with the number <strong>1.</strong> over the end of the first pass and another with <strong>2.</strong> over the end of the second. You play the common part and the <strong>first ending</strong>, go back to the start, play the common part again and, this time, <strong>skip the first ending</strong> and go straight to the <strong>second</strong>.</p>

<figure class="tm-staff" data-tm-melody="c/4:q e/4:q g/4:q e/4:q | f/4:q e/4:q d/4:q c/4:q | c/4:q e/4:q g/4:q e/4:q | g/4:q g/4:q c/5:q c/5:q" data-tm-bpm="108"><img src="/assets/img/notacion/compases/repeticion-casillas.svg" width="643" height="124" alt="One common measure and two endings: the first with a repeat sign and the second as the final measure" loading="lazy" decoding="async"><figcaption>Real order (▶): common measure → <strong>first ending</strong> → back to the start → common measure → <strong>second ending</strong>.</figcaption></figure>

<h2>Da Capo (D.C.) and Fine</h2>

<p><strong>Da Capo</strong> means "from the head", that is, from the beginning. At the marking <strong>D.C.</strong> (or <em>D.C. al Fine</em>) you go back to the start of the piece and play again until the word <strong>Fine</strong> ("end"), where you stop, even if more measures are written after it.</p>

<figure class="tm-staff" data-tm-melody="c/4:q e/4:q g/4:q e/4:q | f/4:q e/4:q d/4:q c/4:q | g/4:q a/4:q g/4:q e/4:q | c/4:q e/4:q g/4:q e/4:q | f/4:q e/4:q d/4:q c/4:q" data-tm-bpm="108"><img src="/assets/img/notacion/compases/repeticion-dc-fine.svg" width="633" height="159" alt="Score with the word Fine over one measure and D.C. al Fine at the end" loading="lazy" decoding="async"><figcaption>Real order (▶): play to the end → <strong>D.C.</strong> goes back to the beginning → play again until <strong>Fine</strong> (the last measure is not played the second time).</figcaption></figure>

<h2>Dal Segno (D.S.), the Segno and the Coda</h2>

<p><strong>Dal Segno</strong> means "from the sign". At <strong>D.S.</strong> you go back, not to the beginning, but to the <strong>sign</strong> <span aria-hidden="true">𝄋</span> (<em>segno</em>) placed earlier in the score. The <strong>Coda</strong> <span aria-hidden="true">𝄌</span> is a closing section: with <em>D.S. al Coda</em>, on the repeat you play up to the <strong>To Coda</strong> mark and from there jump straight to the Coda.</p>

<figure class="tm-staff" data-tm-melody="c/4:q e/4:q g/4:q e/4:q | f/4:q e/4:q d/4:q c/4:q | g/4:q a/4:q g/4:q e/4:q | c/4:q e/4:q g/4:q e/4:q | f/4:q e/4:q d/4:q c/4:q | c/5:q b/4:q c/5:q c/5:q" data-tm-bpm="108"><img src="/assets/img/notacion/compases/repeticion-segno-coda.svg" width="443" height="266" alt="Score with the segno sign, the To Coda mark, D.S. al Coda and the Coda section" loading="lazy" decoding="async"><figcaption>Real order (▶): play to <strong>D.S. al Coda</strong> → back to the <strong>segno</strong> 𝄋 → at <strong>To Coda</strong> jump to the <strong>Coda</strong> 𝄌 (the final measure).</figcaption></figure>

<h2>How do you read repeat signs? (playing order)</h2>

<p>To avoid getting lost in a score with repeats, follow this order:</p>

<ol>
  <li><strong>Play normally</strong> until you meet the first repeat sign.</li>
  <li><strong>Repeat barlines:</strong> at <strong>:|</strong>, go back to <strong>|:</strong> (or to the beginning if there is no opening sign) and repeat that section once.</li>
  <li><strong>Endings:</strong> if there are first and second endings, play the first on the first pass. On the repeat, skip it and play the second.</li>
  <li><strong>D.C. or D.S.:</strong> at a <em>Da Capo</em> go back to the beginning. At a <em>Dal Segno</em>, go back to the sign 𝄋.</li>
  <li><strong>Fine and Coda:</strong> after a D.C. or D.S., you finish at <strong>Fine</strong>, or jump to the <strong>Coda</strong> 𝄌 when you reach the <em>To Coda</em> mark.</li>
</ol>

<p>The order that confuses people most is <strong>D.S. al Coda</strong>: you play to the end, go back to the segno, repeat up to "To Coda" and jump to the Coda from there. You can hear this route by pressing ▶ in the <em>Dal Segno</em> example above.</p>

<h2>Table of repeat signs</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Sign</th><th>Name</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><strong>|:</strong></td><td>Repeat sign (opening)</td><td>Start of the section to be repeated.</td></tr>
    <tr><td><strong>:|</strong></td><td>Repeat sign (closing)</td><td>End of the section; go back to the opening sign (or the start).</td></tr>
    <tr><td><strong>1. · 2.</strong></td><td>First and second endings</td><td>A different ending for the first and second pass.</td></tr>
    <tr><td><strong>D.C.</strong></td><td>Da Capo</td><td>Go back to the beginning.</td></tr>
    <tr><td><strong>D.C. al Fine</strong></td><td>Da Capo al Fine</td><td>Go back to the beginning and play until "Fine".</td></tr>
    <tr><td><strong>Fine</strong></td><td>Fine</td><td>The point where the piece ends after a D.C. or D.S.</td></tr>
    <tr><td><span aria-hidden="true">𝄋</span></td><td>Segno</td><td>The point you return to at a "Dal Segno".</td></tr>
    <tr><td><strong>D.S.</strong></td><td>Dal Segno</td><td>Go back to the sign 𝄋.</td></tr>
    <tr><td><strong>D.S. al Coda</strong></td><td>Dal Segno al Coda</td><td>Go back to the sign and, at "To Coda", jump to the Coda.</td></tr>
    <tr><td><span aria-hidden="true">𝄌</span> · To Coda</td><td>Coda / To Coda</td><td>Closing section, and the mark from which you jump to it.</td></tr>
    <tr><td><strong>bis</strong></td><td>Bis</td><td>Repeat the marked passage (usually shown with a bracket).</td></tr>
  </tbody>
</table></div>

<p>These signs organize <a href="/diccionario-musical/la-frase-musical/">musical form</a> and rely on the structure of <a href="/diccionario-musical/compases/">measures</a>. To keep the beat steady while you read a score with repeats, practice with the <a href="/herramientas/metronomo/">online metronome</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are repeat signs?</div>
      <div class="tm-faq-a">They are the marks that tell you to repeat a section of the score or jump to another point, so the same music need not be written twice. The main ones are repeat barlines, first and second endings, Da Capo, Dal Segno, Coda and Fine.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What do the double bar lines with dots (|: and :|) mean?</div>
      <div class="tm-faq-a">They are repeat barlines. The opening one |: marks where the repeated section starts and the closing one :| marks where it ends. At :| you go back to |: (or to the beginning if there is no opening sign) and play the passage a second time.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does D.C. al Fine mean?</div>
      <div class="tm-faq-a">Da Capo al Fine means go back to the beginning of the piece (Da Capo = "from the head") and play again until the word Fine, where you stop, even if more measures are written after it.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is Dal Segno (D.S.)?</div>
      <div class="tm-faq-a">Dal Segno means "from the sign". At D.S. you go back to the sign 𝄋 (segno) placed earlier in the score, not to the beginning. With D.S. al Coda, on the repeat you jump to the Coda at the To Coda mark.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are first and second endings for?</div>
      <div class="tm-faq-a">They are used when a repeat ends differently each time. The first ending is played on the first pass and the second on the repeat: you play the common part again and, on returning, skip the first ending to play the second.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
