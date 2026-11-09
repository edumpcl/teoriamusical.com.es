const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/octave-numbering/',
  esPath: '/diccionario-musical/indice-acustico/',
  title: 'Octave Numbers: Scientific Pitch vs Franco-Belgian',
  description: 'Octave numbers name the exact C, A or F you mean. Compare scientific pitch notation (middle C = C4) with the Franco-Belgian system (C3), with a chart.',
  h1: 'Octave Numbering: Scientific Pitch Notation and Other Systems',
  crumbLabel: 'Octave Numbering',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  body: `
<p>An <strong>octave number</strong> (in Spanish and French, the <em>índice acústico</em>) is the digit added to a note name to show which <strong>octave</strong> the note belongs to. The letter name C repeats in every octave, so the number tells you <em>which C</em> you mean: middle C, the C an octave above it, and so on. The catch is that <strong>two numbering systems</strong> are in use, the scientific (international) one and the Franco-Belgian one, so the same note can get two different numbers.</p>

<h2>What is an octave number?</h2>

<p>Every <a href="/diccionario-musical/nombres-de-las-notas-musicales/">note</a> has a letter name (C, D, E…) and a specific <strong>pitch</strong>. But the name repeats octave after octave: there are many Cs on <a href="/diccionario-musical/notas-del-piano/">a piano</a>. Octave numbers remove the ambiguity by <strong>numbering the octaves</strong>: each note gets the number of the octave it is in (C3, A4, F5…). So <strong>C3 and C4 are two different notes</strong>, one octave apart.</p>

<p>The number changes every time you reach a <strong>C</strong>: all the notes from one C up to (but not including) the next C share the same number. For example, in the scientific system, starting on middle C: C4, D4, E4, F4, G4, A4, B4, and then the next C starts the series 5.</p>

<h2>Scientific pitch notation (the international system)</h2>

<p><strong>Scientific pitch notation</strong> is the standard in most of the world. It starts counting from the lowest octave: <strong>0</strong> is given to the lowest C on a large pipe organ (C0, about 16.35 Hz). In this system:</p>

<ul>
  <li><strong>Middle C</strong> on the piano (261.63 Hz) is <strong>C4</strong>.</li>
  <li><strong>Concert A</strong>, the tuning pitch (440 Hz), is <strong>A4</strong>.</li>
</ul>

<p>It is the system used by notation software, synthesizers, MIDI documentation and most international books. The lowest key on a standard 88-key piano is A0 and the highest is C8.</p>

<h2>The Franco-Belgian system</h2>

<p>The <strong>Franco-Belgian system</strong> is the one traditionally used in Spain, France, Belgium and Italy, and in conservatories that follow those traditions. Its numbering starts one step later, so the same middle C gets a number one lower:</p>

<ul>
  <li><strong>Middle C</strong> (261.63 Hz) is <strong>C3</strong>.</li>
  <li><strong>Concert A</strong> (440 Hz) is <strong>A3</strong>.</li>
</ul>

<p>For low notes this system uses <strong>negative numbers</strong> (C₋₁, C₋₂…). The lowest organ C, which is C0 in scientific notation, is C₋₁ here.</p>

<p>These countries also teach fixed-do note names (Do, Re, Mi, Fa, Sol, La, Si) instead of letters, so in a Spanish or French book you will see “La3” where an American book writes A4.</p>

<h2>Conversion chart</h2>

<p>The rule is simple: <strong>the Franco-Belgian number is always one less than the scientific number.</strong> The note sounds exactly the same; only the digit changes. The chart shows the Cs of each octave:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Scientific (international)</th><th>Franco-Belgian</th><th>Reference</th></tr>
  </thead>
  <tbody>
    <tr><td>C0</td><td>C₋₁</td><td>Lowest C of a large organ (16.35 Hz)</td></tr>
    <tr><td>C1</td><td>C0</td><td>—</td></tr>
    <tr><td>C2</td><td>C1</td><td>C on the 2nd ledger line below the staff in bass clef</td></tr>
    <tr><td>C3</td><td>C2</td><td>—</td></tr>
    <tr><td><strong>C4</strong></td><td><strong>C3</strong></td><td><strong>Middle C (261.63 Hz)</strong></td></tr>
    <tr><td>C5</td><td>C4</td><td>—</td></tr>
    <tr><td>C6</td><td>C5</td><td>—</td></tr>
    <tr><td>C7</td><td>C6</td><td>—</td></tr>
    <tr><td>C8</td><td>C7</td><td>Highest key on a standard piano (4186 Hz)</td></tr>
  </tbody>
</table>
</div>

<p>And the most quoted case, <strong>concert A</strong>: it is <strong>A4</strong> in scientific notation and <strong>A3</strong> in the Franco-Belgian system, both at 440 Hz.</p>

<h2>Which one should I use?</h2>

<p>It depends on the context. If you read books or study with material from a Spanish, French or Belgian conservatory tradition, middle C will be <strong>C3</strong>. If you work with <strong>music software, synthesizers or English-language books</strong>, middle C is <strong>C4</strong>. Some software and keyboard makers use yet another offset (for instance, labeling middle C as C3 or C5), so always check the manual. The important thing is to <strong>state which system you use</strong>, because the same number points to different notes in different systems. To convert, add 1 (Franco-Belgian to scientific) or subtract 1 (scientific to Franco-Belgian).</p>

<p>This page builds on the <a href="/diccionario-musical/pentagramas/">staff</a>, the <a href="/diccionario-musical/claves-musicales/">clefs</a> and the <a href="/diccionario-musical/nombres-de-las-notas-musicales/">names of the notes</a>: middle C, for example, is the reference note that links the treble clef and the bass clef.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What are octave numbers?</div>
<div class="tm-faq-a">An octave number is the digit added to a note name to show which octave the note belongs to, and so its exact pitch. For example, C3 and C4 are two different Cs one octave apart. The number keeps notes with the same letter name but different pitches from being confused.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Is middle C C3 or C4?</div>
<div class="tm-faq-a">It depends on the system. In scientific pitch notation, the international standard, middle C (261.63 Hz) is C4. In the Franco-Belgian system, used in Spain and in conservatories of French and Belgian tradition, the same middle C is C3. It is the same note; only the number changes.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the difference between scientific and Franco-Belgian numbering?</div>
<div class="tm-faq-a">The starting point of the numbering. The Franco-Belgian number is always one less than the scientific one: middle C is C4 in scientific notation and C3 in Franco-Belgian, and concert A (440 Hz) is A4 and A3 respectively. The note sounds the same; only the digit changes.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Which system is used in Spain?</div>
<div class="tm-faq-a">Spain and conservatories of French and Belgian tradition traditionally use the Franco-Belgian system (middle C = C3). Scientific pitch notation (middle C = C4) is the standard in the rest of the world and in notation software, synthesizers and MIDI.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How do I convert from one system to the other?</div>
<div class="tm-faq-a">Add or subtract 1. To go from Franco-Belgian to scientific, add 1 (C3 becomes C4); to go from scientific to Franco-Belgian, subtract 1 (A4 becomes A3). The note name does not change, only the number.</div>
</div>
</div>
</div>
</div>
</section>
`,
});
