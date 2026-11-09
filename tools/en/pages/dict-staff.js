const dictionaryPage = require('../dictionary-page');

// Printable staff paper cards
const card = (pdf, prev, alt, label) => `  <a class="tm-card-plantilla" href="/assets/img/2020/01/${pdf}" target="_blank" rel="noopener"><span class="tm-card-plantilla-img"><picture><source type="image/webp" srcset="/assets/img/pentagramas/${prev}.webp"><img src="/assets/img/pentagramas/${prev}.png" width="300" height="220" loading="lazy" alt="${alt}"></picture></span><span class="tm-card-plantilla-tit">${label}</span><span class="tm-card-plantilla-dl">Open or download PDF</span></a>`;
const grid = cards => `<div class="tm-grid-plantillas">\n${cards.join('\n')}\n</div>`;

const blank = grid([
  card('pentagrama-vertical.pdf', 'preview-pentagrama-en-blanco', 'Blank staff paper to print, portrait (A4 PDF)', 'Blank · portrait'),
  card('pentagrama-apaisada.pdf', 'preview-pentagrama-en-blanco', 'Blank staff paper to print, landscape (A4 PDF)', 'Blank · landscape'),
]);
const clefs = grid([
  card('pentagrama-con-clave-de-sol-vertical.pdf', 'preview-pentagrama-clave-sol', 'Staff paper with treble clef to print, portrait (A4 PDF)', 'Treble clef · portrait'),
  card('pentagrama-con-clave-de-sol-apaisada-1.pdf', 'preview-pentagrama-clave-sol', 'Staff paper with treble clef to print, landscape (A4 PDF)', 'Treble clef · landscape'),
  card('pentagrama-con-clave-de-fa-en-4ª-vertical.pdf', 'preview-pentagrama-clave-fa-4', 'Staff paper with bass clef (4th line) to print, portrait (A4 PDF)', 'Bass clef (4th line) · portrait'),
  card('pentagrama-con-clave-de-fa-en-4ª-apaisado.pdf', 'preview-pentagrama-clave-fa-4', 'Staff paper with bass clef (4th line) to print, landscape (A4 PDF)', 'Bass clef (4th line) · landscape'),
  card('pentagrama-con-clave-de-fa-en-3ª-vertical.pdf', 'preview-pentagrama-clave-fa-3', 'Staff paper with F clef on the 3rd line to print, portrait (A4 PDF)', 'F clef on the 3rd line · portrait'),
  card('pentagrama-con-clave-de-fa-en-3ª-apaisado.pdf', 'preview-pentagrama-clave-fa-3', 'Staff paper with F clef on the 3rd line to print, landscape (A4 PDF)', 'F clef on the 3rd line · landscape'),
  ...[1, 2, 3, 4].flatMap(n => [
    card(`pentagrama-con-clave-de-do-en-${n}ª-vertical.pdf`, `preview-pentagrama-clave-do-${n}`, `Staff paper with C clef on line ${n} to print, portrait (A4 PDF)`, `C clef on line ${n} · portrait`),
    card(`pentagrama-con-clave-de-do-en-${n}ª-apaisada.pdf`, `preview-pentagrama-clave-do-${n}`, `Staff paper with C clef on line ${n} to print, landscape (A4 PDF)`, `C clef on line ${n} · landscape`),
  ]),
]);
const grand = grid([
  card('pentagrama-doble-vertical.pdf', 'preview-pentagrama-doble', 'Two-staff system without clefs to print, portrait (A4 PDF)', 'Two staves (no clef) · portrait'),
  card('pentagrama-doble-apaisada.pdf', 'preview-pentagrama-doble', 'Two-staff system without clefs to print, landscape (A4 PDF)', 'Two staves (no clef) · landscape'),
  card('pentagrama-doble-vertical-clave-de-sol-y-fa.pdf', 'preview-pentagrama-doble-sol-fa', 'Two-staff system with treble and bass clefs to print, portrait (A4 PDF)', 'Two staves · treble and bass clef · portrait'),
  card('pentagrama-doble-apaisada-clave-de-sol-y-fa.pdf', 'preview-pentagrama-doble-sol-fa', 'Two-staff system with treble and bass clefs to print, landscape (A4 PDF)', 'Two staves · treble and bass clef · landscape'),
]);

module.exports = dictionaryPage({
  path: '/en/music-dictionary/staff/',
  esPath: '/diccionario-musical/pentagramas/',
  title: 'Musical Staff: What It Is, Lines, Spaces and Free PDFs',
  description: 'The musical staff has 5 lines and 4 spaces. Learn its structure, ledger lines, treble clef note names and download 20 free blank staff paper PDFs.',
  h1: 'The Musical Staff',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  scripts: ['tm-mei', 'tm-notacion'],
  body: `<h2>What is a musical staff?</h2>

<p>The <strong>staff</strong> (UK: <em>stave</em>; plural <em>staves</em>) is the set of lines on which notes and other symbols are written in Western music notation. It has <strong>five horizontal lines</strong> and <strong>four spaces</strong> between them. Lines and spaces are always counted from the bottom up. To place notes correctly you also need to know the <a href="/diccionario-musical/claves-musicales/">clefs</a>.</p>

<ul>
  <li><strong>The 1st line</strong> is the lowest and the <strong>5th line</strong> is the highest.</li>
  <li><strong>The 1st space</strong> is between the 1st and 2nd lines.</li>
</ul>

<h2>A short history: from one line to five</h2>

<p>The staff did not always have five lines. In the Middle Ages, scribes used a single colored line (red or yellow) to guide the singer. Later, <strong>Guido d'Arezzo</strong> (11th century) promoted the four-line staff, which is still used today for Gregorian chant. The five-line staff became standard in the following centuries, because it lets a melody cover a wider range without so many ledger lines.</p>

<h2>Structure and ledger lines</h2>

<p>When a note is too high or too low to fit on the five lines, <strong>ledger lines</strong> are used. These are short strokes drawn above or below the staff that extend it for a moment.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Element</th><th>Number</th><th>Function</th></tr>
  </thead>
  <tbody>
    <tr><td>Lines</td><td>5</td><td>Define the main pitch positions of the notes.</td></tr>
    <tr><td>Spaces</td><td>4</td><td>Hold the notes between two neighboring lines.</td></tr>
    <tr><td>Ledger lines</td><td>Variable</td><td>For extreme notes (very high or very low).</td></tr>
  </tbody>
</table>
</div>

<h2>Main types of staff</h2>

<p>Depending on the instrument or ensemble, the staff can appear in several forms:</p>

<ul>
  <li><strong>Single staff:</strong> one staff on its own (for example, for flute, violin or guitar).</li>
  <li><strong>Grand staff (system):</strong> two staves joined by a brace. It is the standard format for piano and harp. The upper staff usually has a treble clef and the lower one a <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a>.</li>
  <li><strong>Percussion staff:</strong> it sometimes has fewer than five lines when the instruments have no definite pitch (such as a triangle or a snare drum), and it uses a percussion clef instead of a treble or bass clef. Each of these instruments, with its photo, is in the <a href="/diccionario-musical/instrumentos-de-percusion-no-afinada/">guide to unpitched percussion</a>.</li>
  <li><strong>Tablature (TAB):</strong> it is not a true staff, but it looks like one. For guitar it has 6 lines that stand for <a href="/diccionario-musical/notas-de-la-guitarra/">the strings and their notes</a>, not for musical pitches.</li>
</ul>

<p><strong>Note:</strong> the staff works like a coordinate system. The vertical axis shows <strong>pitch</strong> (higher on the staff means higher in sound) and the horizontal axis shows <strong>time</strong> (from left to right).</p>

<h2 id="h-notes-treble-clef">Notes on the staff with a treble clef</h2>

<p>Once the <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a> is placed on the 2nd line, every position on the staff is assigned to a specific note. Notes alternate between lines and spaces from the bottom up:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Position</th><th>Note (treble clef)</th></tr>
  </thead>
  <tbody>
    <tr><td>5th line</td><td>F</td></tr>
    <tr><td>4th space</td><td>E</td></tr>
    <tr><td>4th line</td><td>D</td></tr>
    <tr><td>3rd space</td><td>C</td></tr>
    <tr><td>3rd line</td><td>B</td></tr>
    <tr><td>2nd space</td><td>A</td></tr>
    <tr><td>2nd line</td><td>G</td></tr>
    <tr><td>1st space</td><td>F</td></tr>
    <tr><td>1st line</td><td>E</td></tr>
    <tr><td>1st ledger line below</td><td>C (middle C)</td></tr>
  </tbody>
</table>
</div>

<p>A memory aid: the <strong>lines</strong> (from the bottom up) are <strong>E–G–B–D–F</strong> ("Every Good Boy Does Fine"), and the <strong>spaces</strong> spell <strong>F–A–C–E</strong>. The 1st ledger line below the staff is middle C, the reference point between the treble clef and the <a href="/diccionario-musical/claves-musicales/">bass clef</a>. In scientific pitch notation (see the <a href="/diccionario-musical/indice-acustico/">octave numbering page</a>) middle C is C4. Some French and Belgian sources number it C3.</p>

<p>Notes are named here with letters. In Spanish-, French- and Italian-speaking countries the same notes are called Do Re Mi Fa Sol La Si (C D E F G A B); see <a href="/diccionario-musical/nombres-de-las-notas-musicales/">note names</a>.</p>

<p>For the bass clef and the five C clefs, see the page on <a href="/diccionario-musical/claves-musicales/">clefs</a>.</p>

<h2 id="h-how-to-use">What are blank staves used for?</h2>

<p>Blank staff paper is a basic tool for studying music theory and sight-singing. Common uses:</p>
<ul>
  <li><strong>Writing scales and chords:</strong> writing notes on paper helps you memorize their positions.</li>
  <li><strong>Melodic dictation:</strong> the teacher plays or sings a melody and the student writes it on the staff.</li>
  <li><strong>Composing:</strong> sketching musical ideas by hand before moving to the computer.</li>
  <li><strong>Interval exercises:</strong> writing and measuring distances between notes on printed paper.</li>
</ul>

<p>Below you will find free <strong>printable staff paper</strong>: <strong>blank manuscript paper</strong> in <strong>PDF</strong>, <strong>A4</strong> size, in portrait and landscape. You can choose <strong>blank staves</strong> (no clef) or staves with a <a href="/diccionario-musical/claves-musicales/">treble, bass or C clef</a>, and even two-staff systems. Click a template to open or download it.</p>

<h2>Blank staff paper to print (no clef)</h2>

${blank}

<h2>Staff paper with clef to print</h2>

${clefs}

<h2>Two-staff systems to print</h2>

${grand}

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many lines does a staff have?</div>
      <div class="tm-faq-a">A staff has 5 horizontal lines and 4 spaces between them. Notes are placed on the lines or in the spaces, and they are always counted from the bottom up: the 1st line is the lowest and the 5th line is the highest.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What types of staff are there?</div>
      <div class="tm-faq-a">The main ones are: the single staff (one staff, for flute, violin or guitar), the grand staff or system (two staves joined by a brace, for piano and harp), the percussion staff (sometimes with fewer than five lines, for instruments of indefinite pitch) and tablature (which looks like a staff but shows strings, not notes).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are ledger lines for?</div>
      <div class="tm-faq-a">Ledger lines are short, temporary strokes added above or below the staff to show notes that are too high or too low to fit on the five main lines. They are drawn only when they are needed.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the grand staff?</div>
      <div class="tm-faq-a">The grand staff (or system) is two staves joined by a brace. It is the standard format for piano and harp: the upper staff has a treble clef (usually the right hand) and the lower staff has a bass clef (usually the left hand).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How are the notes named in the treble clef?</div>
      <div class="tm-faq-a">In the treble clef, the notes on the five lines (from the bottom up) are E, G, B, D and F. The notes in the four spaces are F, A, C and E. To remember them: "E-G-B-D-F" for the lines and "F-A-C-E" for the spaces.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a clef and why does the staff need one?</div>
      <div class="tm-faq-a">The clef is the symbol at the start of the staff that gives a specific note name to each line and space. Without a clef, the positions would have no pitch reference. The treble clef, which curls around the 2nd line, is the most common clef in Western music.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
