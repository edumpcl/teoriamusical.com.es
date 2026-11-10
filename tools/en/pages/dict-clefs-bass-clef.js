const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/clefs/bass-clef/',
  esPath: '/diccionario-musical/claves-musicales/clave-de-fa/',
  title: 'Bass Clef: What It Is, Notes and How to Read It',
  description: 'The bass clef (F clef) puts F3 on the 4th line of the staff. Learn all its notes, a memory trick, ledger lines and the instruments that read it.',
  h1: 'Bass Clef (F Clef)',
  crumbLabel: 'Bass Clef',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Clefs', '/diccionario-musical/claves-musicales/']],
  scripts: ['tm-piano-audio'],
  body: `
<figure class="fig-sm">
  <img src="/assets/img/notacion/claves/glifo-clave-fa.svg" width="156" height="122" alt="The bass clef symbol on the 4th line of the staff" decoding="async">
</figure>

<p>The <strong>bass clef</strong>, also called the <strong>F clef</strong>, is the sign at the start of a staff that places the note <strong>F3</strong> (the F below middle C) on the <strong>4th line</strong>. Its full name is “F clef on the 4th line”. It is the <strong>clef for low registers</strong> and the second most used, after the <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>. It is one of the three <a href="/diccionario-musical/claves-musicales/">clefs</a>, together with the treble clef and the <a href="/diccionario-musical/claves-musicales/clave-de-do/">C clef</a>.</p>

<h2>Where does the bass clef go?</h2>
<p>The <strong>two dots</strong> of the sign sit one above and one below the <strong>4th line</strong> (counting from the bottom), hugging it: that is the line where <strong>F</strong> is. There is also an <strong>F clef on the 3rd line</strong> (the baritone clef), which puts F on the middle line. It is rare today and is found mostly in old scores and in conservatory study. When people say “bass clef” without more detail, they mean the one on the 4th line.</p>

<h2>Why the symbol has two dots: where the bass clef comes from</h2>
<p>The bass clef is a <strong>distorted letter F</strong>. In medieval notation, a scribe wrote at the start of the line the letter of the reference note, and F is the letter name for the note F. Written quickly again and again, that F gradually lost its crossbars and became the hook we know.</p>
<p>The <strong>two dots</strong> are traditionally explained as what remains of the two horizontal arms of the F, which is why they are placed on each side of the F line. If you put them somewhere else, the clef no longer points to the right note. In Spanish it is called <em>clave de Fa</em>, just as the treble clef is <em>clave de Sol</em> (the G clef).</p>
<p>The system comes from the staff that is credited to <strong>Guido of Arezzo</strong> in the 11th century. The F clef is in fact <strong>one of the two oldest clefs</strong>, along with the C clef: the G clef came later, even though it is the most common today.</p>

<h2>How to draw the bass clef step by step</h2>
<p>It is the easiest of the three clefs, but it has one detail that decides whether it is right or wrong:</p>
<ol>
  <li><strong>Start with a thick dot</strong> on the 4th line, at the left side of the staff.</li>
  <li><strong>Go up and curve to the right</strong>, making an arc that comes down to near the 1st line, like a big comma.</li>
  <li><strong>Add the two dots</strong> to the right of the hook: one in the space above the 4th line and one in the space below.</li>
</ol>
<p>The last step is the one that matters: <strong>the two dots must hug the 4th line</strong>. If they end up around the 3rd line, what you wrote is an F clef on the 3rd line (baritone clef) and every note changes its name.</p>

<h3>Printable worksheet: tracing the clef with decreasing help</h3>
<p>For the youngest learners, reading the explanation is not enough: the clef has to be traced many times. This PDF worksheet takes the help away little by little — first the model, then the dotted clef to trace over, then with the dots farther and farther apart, then only the dot that marks the 4th line, and finally the empty staff. The stroke is <strong>a single line</strong>, the one the pencil makes without being lifted.</p>

<figure class="fig-sm">
  <a href="/assets/img/claves/ficha-dibujar-clave-de-fa.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/claves/preview-ficha-clave-de-fa.webp"><img src="/assets/img/claves/preview-ficha-clave-de-fa.png" width="300" height="127" loading="lazy" alt="Printable worksheet for learning to draw the bass clef: staves with the dotted clef to trace over"></picture></a>
</figure>

<p><a class="tm-btn tm-btn-dorado" href="/assets/img/claves/ficha-dibujar-clave-de-fa.pdf" target="_blank" rel="noopener">Download the worksheet as a PDF (A4)</a></p>
<p>You may print and photocopy it freely for the classroom or for home. There are also the <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef worksheet</a> and the <a href="/diccionario-musical/claves-musicales/clave-de-do/">C clef worksheet</a>.</p>

<h2>Notes in the bass clef: how to read them all</h2>
<p>The reference note is <strong>F</strong> on the 4th line. From there, every note in the bass clef is read by counting up or down from that position. It is the clef of the cello, double bass, the left hand of the piano and the electric bass:</p>

<figure class="tm-staff" data-tm-notes data-tm-baseoct="2">
<img src="/assets/img/notacion/claves/notas-clave-fa.svg" width="449" height="144" alt="Notes in the bass clef (F clef on the 4th line) on the staff: G, A, B, C, D, E, F, G, A" loading="lazy" decoding="async">
<figcaption>The notes in the bass clef, line by line and space by space.</figcaption>
</figure>

<p>In the bass clef, the <strong>lines</strong>, from bottom to top, are <strong>G, B, D, F and A</strong>, and the <strong>spaces</strong>, from bottom to top, are <strong>A, C, E and G</strong>.</p>

<figure>
<picture><source srcset="/assets/img/notacion/claves/notas-clave-fa-piano.webp" type="image/webp"><img src="/assets/img/notacion/claves/notas-clave-fa-piano.png" width="720" height="430" alt="Notes in the bass clef: a staff with the nine notes of the clef (G, A, B, C, D, E, F, G, A) and, below, the same notes lit up on the piano keyboard, from G₂ to A₃, with Middle C marked on the right." loading="lazy" decoding="async"></picture>
<figcaption>The same nine notes on the piano: G₂ to A₃, played with the left hand. Middle C sits just to the right.</figcaption>
</figure>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Position (top to bottom)</th><th>Note</th></tr>
  </thead>
  <tbody>
    <tr><td>5th line</td><td>A</td></tr>
    <tr><td>4th space</td><td>G</td></tr>
    <tr><td>4th line</td><td><strong>F</strong> (reference)</td></tr>
    <tr><td>3rd space</td><td>E</td></tr>
    <tr><td>3rd line</td><td>D</td></tr>
    <tr><td>2nd space</td><td>C</td></tr>
    <tr><td>2nd line</td><td>B</td></tr>
    <tr><td>1st space</td><td>A</td></tr>
    <tr><td>1st line</td><td>G</td></tr>
    <tr><td>1st ledger line above</td><td>C (middle C)</td></tr>
  </tbody>
</table>
</div>

<h2>A trick to memorize them</h2>
<p>A simple memory aid: the <strong>lines</strong>, from bottom to top, are <strong>G–B–D–F–A</strong>; the <strong>spaces</strong>, from bottom to top, are <strong>A–C–E–G</strong>. Notice that <strong>middle C</strong>, which sits <em>below</em> the staff in the treble clef, sits <em>above</em> the staff in the bass clef: it is the same note written in a different place. To review note positions, see <a href="/diccionario-musical/nombres-de-las-notas-musicales/">note names</a>. (The fixed-do names used in Spanish-, French- and Italian-speaking countries are Do, Re, Mi, Fa, Sol, La, Si for C, D, E, F, G, A, B.)</p>

<h2>Practice now: which note is it?</h2>
<p>Knowing the trick is not the same as reading fluently, and the bass clef is harder because almost nobody practices it as much as the treble clef. You can practice with the exercises: <a href="/ejercicios/identificar-notas/clave-de-fa-en-4/">identify notes in the bass clef</a> or <a href="/ejercicios/escribir-notas/clave-de-fa-en-4/">write notes in the bass clef</a>.</p>

<h2>Notes outside the staff: ledger lines</h2>
<p>The staff has only five lines, and the low register easily goes below it. When a note does not fit, it gets its own short line: a <strong>ledger line</strong>. Ledger lines are counted moving away from the staff, and you must draw all the ones in between.</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/claves/lineas-adicionales-clave-fa.svg" width="469" height="165" alt="Ledger lines in the bass clef: C2, D2, E2 and F2 below the staff; B3, C4, D4 and E4 above" loading="lazy" decoding="async">
<figcaption>The most common notes on ledger lines in the bass clef, below and above the staff.</figcaption>
</figure>

<ul>
  <li><strong>C4 (middle C)</strong> is on the first ledger line <em>above</em> the staff. It is the meeting point with the <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>, where the same C appears on the first ledger line <em>below</em>. That note is the hinge of the piano: where the left hand ends and the right hand begins.</li>
  <li><strong>F2 does not need a ledger line</strong>: it sits in the space below the 1st line. The first note going down that does need one is E2.</li>
</ul>

<p>Octave numbers here use scientific pitch notation (C4 = middle C); see <a href="/diccionario-musical/indice-acustico/">octave numbering</a>.</p>

<h2>Differences between the bass, treble and C clefs</h2>
<p>The three clefs share out the range. Each puts its reference note on a different line so that the music of each instrument fits on the staff <strong>without filling up with ledger lines</strong>.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Clef</th><th>Note it places</th><th>Line</th><th>Register</th><th>Who uses it</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Bass (F)</strong></td><td>F3</td><td>4th</td><td>Low</td><td>Cello, double bass, tuba, left hand of the piano</td></tr>
    <tr><td><strong>Treble (G)</strong></td><td>G4</td><td>2nd</td><td>High and medium-high</td><td>Violin, flute, trumpet, right hand of the piano</td></tr>
    <tr><td><strong>C clef</strong></td><td>C4</td><td>3rd or 4th</td><td>Medium</td><td>Viola, bassoon and trombone (high register)</td></tr>
  </tbody>
</table>
</div>

<p>The practical consequence takes time to absorb: <strong>the same position on the staff is not always the same note</strong>. The 4th line is F in the bass clef, but D in the treble clef. That is why you do not “read the staff”: you read the staff <em>in a clef</em>. You can see them compared on the <a href="/diccionario-musical/claves-musicales/">clefs</a> page.</p>

<h2>What is it for, and which instruments use it?</h2>
<p>The bass clef centers the <strong>low registers</strong> on the staff; in the treble clef they would need a great many ledger lines below. It is used by:</p>
<ul>
  <li><strong>Low strings:</strong> <a href="/diccionario-musical/notas-del-violonchelo/">cello</a>, <a href="/diccionario-musical/notas-del-contrabajo/">double bass</a> and <a href="/diccionario-musical/notas-del-bajo-electrico/">electric bass</a> (the double bass and the electric bass sound an octave lower than written).</li>
  <li><strong>Low woodwinds:</strong> <a href="/diccionario-musical/notas-del-fagot/">bassoon</a> and <a href="/diccionario-musical/notas-del-contrafagot/">contrabassoon</a>.</li>
  <li><strong>Low brass:</strong> <a href="/diccionario-musical/notas-de-la-tuba/">tuba</a>, <a href="/diccionario-musical/notas-del-trombon/">trombone</a>, <a href="/diccionario-musical/notas-del-trombon-bajo/">bass trombone</a>, <a href="/diccionario-musical/notas-del-bombardino/">euphonium</a> and the <a href="/diccionario-musical/notas-de-la-trompa/">horn</a> in its low register.</li>
  <li><strong>Keyboard:</strong> the left hand of the <a href="/diccionario-musical/notas-del-piano/">piano</a> (in the two-staff system).</li>
  <li><strong>Voices:</strong> bass and baritone.</li>
</ul>
<p>Mastering the treble clef and the bass clef lets you read most Western music, since between them they cover the high and low registers. You can see the notes of each instrument on <a href="/diccionario-musical/notas-en-los-instrumentos/">notes on instruments</a>.</p>

<h2>Common mistakes when learning the bass clef</h2>
<ul>
  <li><strong>Reading it as if it were the treble clef.</strong> This is the number one mistake for pianists who started with the right hand: the same position sounds different. The 4th line is F here and D in the treble clef.</li>
  <li><strong>Putting the two dots around the 3rd line.</strong> That turns the sign into an F clef on the 3rd line (baritone) and moves every note.</li>
  <li><strong>Looking for middle C below the staff.</strong> In the bass clef, C4 is <em>above</em> the staff, not below as in the treble clef.</li>
  <li><strong>Counting the lines from the top.</strong> Lines are always counted from the bottom: the 4th line is the fourth one starting from the very lowest.</li>
  <li><strong>Learning it only by memory.</strong> The memory trick finds a single note, but reading fluently takes repetition: that is what the exercises are for.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the bass clef?</div>
      <div class="tm-faq-a">The bass clef (F clef) is the sign at the start of the staff that places the note F3, the F below middle C, on the 4th line. It is the clef of low registers and the second most used after the treble clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where does the bass clef go?</div>
      <div class="tm-faq-a">The modern bass clef is on the 4th line of the staff: the two dots of the sign sit one above and one below, hugging that fourth line, which is where F is. There is also an F clef on the 3rd line (baritone), rare today.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you read notes in the bass clef?</div>
      <div class="tm-faq-a">Starting from F on the 4th line, the lines from bottom to top are G-B-D-F-A and the spaces from bottom to top are A-C-E-G. Above the 5th line, on the first ledger line above, is middle C.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which instruments use the bass clef?</div>
      <div class="tm-faq-a">Low instruments and voices: cello, double bass, electric bass, bassoon, tuba, trombone, euphonium, the left hand of the piano and the bass voice.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the bass clef have two dots?</div>
      <div class="tm-faq-a">The two dots are traditionally explained as what is left of the horizontal arms of the medieval letter F that the symbol comes from. They sit on each side of the F line because they point out which line it is. If they are placed around another line, the clef is no longer an F clef on the 4th line.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you draw the bass clef step by step?</div>
      <div class="tm-faq-a">Start with a thick dot on the 4th line, go up curving to the right in an arc that comes down to near the 1st line, like a big comma, and place the two dots to the right of the hook: one in the space above the 4th line and one in the space below.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where is middle C in the bass clef?</div>
      <div class="tm-faq-a">On the first ledger line above the staff. It is the same note that appears on the first ledger line below the staff in the treble clef: that C is the hinge between the two clefs and, on the piano, between the left and right hands.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
