const dictionaryPage = require('../dictionary-page');

const card = (href, icon, title, desc) => `  <a href="${href}" class="tm-card-dic">
    <div class="tm-card-dic-icono">${icon}</div>
    <div class="tm-card-dic-titulo">${title}</div>
    <div class="tm-card-dic-desc">${desc}</div>
  </a>`;
const P = '/diccionario-musical/compases/';

module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/',
  esPath: '/diccionario-musical/compases/',
  title: 'Time Signatures: Simple and Compound Meter Explained',
  description: 'What a time signature and a measure are, how simple and compound meters differ, and how to read the numbers. Examples in 2/4, 3/4, 4/4, 6/8, 9/8 and 12/8.',
  h1: 'Time Signatures and Meter',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  crumbLabel: 'Time Signatures',
  articleClass: 'tm-article tm-article--wide',
  body: `<h2>What are time signatures?</h2>

<p>Meter is how music organizes time. The score is divided into equal sections called <strong>measures</strong> (UK: bars), and every measure has the same number of beats and the same pattern of strong and weak beats. The <strong>time signature</strong> is written at the beginning of the score as a fraction: the top number (numerator) tells you how many beats there are in each measure, and the bottom number (denominator) tells you which note value is one beat.</p>

<h2>The parts of a time signature</h2>

<p>The time signature appears at the beginning of the score, next to the clef, as two stacked numbers:</p>

<ul>
<li><strong>Top number (numerator):</strong> how many beats fit in each measure. If the top number is 3, the measure has three beats.</li>
<li><strong>Bottom number (denominator):</strong> which note value counts as one beat. 4 stands for the quarter note (UK: crotchet), 8 for the eighth note (UK: quaver) and 2 for the half note (UK: minim).</li>
</ul>

<p>We explain it step by step, with examples, in <a href="${P}unidad-de-tiempo-y-unidad-de-compas/">beat unit and measure unit</a>.</p>

<h2>Simple and compound meter</h2>

<p>There are dozens of time signatures, but in practice most music uses two main types:</p>

<p>Can you tell them apart by ear? Test yourself with the ear-training exercise <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the meter by ear</a>.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Type of meter</th>
      <th>How each beat divides</th>
      <th>Traditional examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Simple meter</strong></td>
      <td>Each beat divides into 2 equal parts (duple subdivision)</td>
      <td>2/4, 3/4 (classic waltz), 4/4 (typical pop)</td>
    </tr>
    <tr>
      <td><strong>Compound meter</strong></td>
      <td>Each beat divides into 3 equal parts (triple subdivision)</td>
      <td>6/8, 9/8, 12/8</td>
    </tr>
  </tbody>
</table>
</div>

<p>This natural subdivision can be broken for a moment by a <a href="/diccionario-musical/grupos-de-valoracion-especial/">tuplet</a>: a <strong>triplet</strong> puts three notes where two would fit (in simple meter), and a <strong>duplet</strong> puts two where three would fit (in compound meter).</p>

<p>To practice, there are <a href="/ejercicios/compases/">time signature exercises</a>: analyze the time signature, complete measures that are missing a note value, and recognize the meter from a written rhythm, with printable PDF worksheets.</p>

<h2>Bar lines</h2>

<p><strong>Bar lines</strong> mark the limits of each measure on the staff (UK: stave). They are thin vertical lines that cross the staff from top to bottom. Each time a bar line appears, the previous measure ends and a new one begins.</p>

<p>Before the 16th century, sacred vocal music rarely used regular measures marked by bar lines. Singers followed the stress of the syllables in the Latin text to organize time.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a measure in music?</div>
      <div class="tm-faq-a">A measure (UK: bar) is one of the equal sections that divide the music in time. The time signature, written at the start of the score as a fraction, tells you how many beats each measure has (top number) and which note value is one beat (bottom number).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between simple and compound meter?</div>
      <div class="tm-faq-a">In simple meter each beat divides into two equal parts (duple subdivision), as in 2/4, 3/4 and 4/4. In compound meter each beat divides into three equal parts (triple subdivision), as in 6/8, 9/8 and 12/8.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What do the top and bottom numbers of a time signature mean?</div>
      <div class="tm-faq-a">The top number tells you how many beats fit in each measure. The bottom number tells you which note value is one beat: 4 stands for the quarter note, 8 for the eighth note and 2 for the half note. (In compound meters such as 6/8 the top number counts subdivisions, not beats.)</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you find the strong beat of a measure?</div>
      <div class="tm-faq-a">The first beat of every measure is always strong. In 2/4 there is one strong and one weak beat. In 3/4 there is one strong and two weak beats (the waltz pattern). In 4/4 beat 1 is the strongest and beat 3 is medium-strong, while beats 2 and 4 are weak.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between 6/8 and 3/4?</div>
      <div class="tm-faq-a">Both have six eighth notes per measure, but they are different. 3/4 is simple meter with 3 quarter-note beats (duple subdivision), while 6/8 is compound meter with 2 dotted-quarter-note beats (triple subdivision). 6/8 sounds like two groups of three eighth notes; 3/4 sounds like three groups of two.</div>
    </div>
  </div>
</div>
</div>
</section>

<h2>More about time signatures</h2>
<div class="tm-grid-diccionario">
${card(P + 'compas-simple-y-compuesto/', '♪≡', 'Simple and Compound Meter', 'The big division: each beat splits in two (simple) or in three (compound). How to tell them apart.')}
${card(P + 'compas-de-4-4/', 'C', 'The 4/4 Time Signature', 'Common time: the most used meter in music, four quarter-note beats, with examples.')}
${card(P + 'compas-de-3-4/', '♩♩♩', 'The 3/4 Time Signature', 'The waltz meter: three quarter-note beats. How it differs from 6/8, with examples.')}
${card(P + 'compas-de-2-4/', '♩♩', 'The 2/4 Time Signature', 'Simple meter with two beats: the march and the polka, with examples on the staff.')}
${card(P + 'compas-de-3-8/', '♪♪♪', 'The 3/8 Time Signature', 'Simple or compound? The most common confusion with an 8 on the bottom, solved with examples.')}
${card(P + 'compas-de-6-8/', '♩.', 'The 6/8 Time Signature', 'Compound meter with two beats: how to count it, with examples on the staff.')}
${card(P + 'compas-de-9-8/', '♩.', 'The 9/8 Time Signature', 'Compound meter with three beats, the twin of 3/4, with examples on the staff.')}
${card(P + 'compas-de-12-8/', '♩.', 'The 12/8 Time Signature', 'Compound meter with four beats: slow blues and ballads, with examples.')}
${card(P + 'compas-de-6-4/', '𝅗𝅥.', 'The 6/4 Time Signature', 'Compound meter with two dotted-half-note beats, with examples on the staff.')}
${card(P + 'compas-de-3-2/', '𝅗𝅥', 'The 3/2 Time Signature', 'Simple meter with three half-note beats, typical of early music, with examples.')}
${card(P + 'compas-partido/', '¢', 'Cut Time (¢)', 'Alla breve: counting in two what would be written in four. Compared with common time.')}
${card(P + 'unidad-de-tiempo-y-unidad-de-compas/', '𝄴', 'Beat Unit and Measure Unit', 'Which note value fills the measure, what one beat is, and how to read the numbers.')}
${card(P + 'analizar-compases/', '𝄵', 'Analyzing Time Signatures', 'How to identify the type of meter and the value of its beats.')}
${card(P + 'acentuacion-ritmica-de-los-compases-simples/', '♩', 'Accents in Simple Meter', 'Strong and weak beats in meters with duple subdivision.')}
${card(P + 'acentuacion-ritmica-de-los-compases-compuestos/', '♩.', 'Accents in Compound Meter', 'Where the accents fall in meters with triple subdivision.')}
${card(P + 'sincopa/', '♩', 'Syncopation', 'Moving the accent to a weak beat with a tie.')}
${card(P + 'notas-a-contratiempo/', '𝄽', 'Off-Beat Notes', 'A note that starts on a weak beat while the strong beat is silent.')}
${card(P + 'anacrusa/', '♪♩', 'The Pickup (Anacrusis)', 'The lead-in notes before the first strong beat, and how the last measure is completed.')}
</div>`,
});
