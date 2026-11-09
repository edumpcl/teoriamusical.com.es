const dictionaryPage = require('../dictionary-page');

// One-octave keyboard (C4 to C5) as a static SVG. Labels: Arial, 16 px.
function keyboardSvg() {
  const W = 56, H = 170, BW = 34, BH = 104;
  const whites = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];
  const octave = ['4', '4', '4', '4', '4', '4', '4', '5'];
  // black keys: boundary index between white keys, sharp name, flat name
  const blacks = [[1, 'C♯', 'D♭'], [2, 'D♯', 'E♭'], [4, 'F♯', 'G♭'], [5, 'G♯', 'A♭'], [6, 'A♯', 'B♭']];
  const top = 34;
  let s = '<svg viewBox="0 0 ' + (W * 8 + 2) + ' ' + (H + top + 36) + '" role="img" aria-label="One octave of a piano keyboard from C4 (middle C) to C5: eight white keys and five black keys, in a group of two and a group of three" style="width:100%;height:auto;max-width:520px;display:block;margin:0 auto">';
  whites.forEach((n, i) => {
    const x = 1 + i * W;
    const mark = (n === 'C' && i === 0) || n === 'F';
    s += '<rect x="' + x + '" y="' + top + '" width="' + W + '" height="' + H + '" fill="' + (mark ? '#fff3cf' : '#ffffff') + '" stroke="#1a1a1a" stroke-width="1.5"/>';
    s += '<text x="' + (x + W / 2) + '" y="' + (top + H - 12) + '" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#1a1a1a">' + n + octave[i] + '</text>';
  });
  blacks.forEach(([b, sh, fl]) => {
    const x = 1 + b * W - BW / 2;
    s += '<rect x="' + x + '" y="' + top + '" width="' + BW + '" height="' + BH + '" rx="3" fill="#1a1a1a"/>';
    s += '<text x="' + (x + BW / 2) + '" y="' + (top + BH - 44) + '" text-anchor="middle" font-family="Arial" font-size="16" fill="#ffffff">' + sh + '</text>';
    s += '<text x="' + (x + BW / 2) + '" y="' + (top + BH - 20) + '" text-anchor="middle" font-family="Arial" font-size="16" fill="#ffffff">' + fl + '</text>';
  });
  // group brackets above the black keys
  const bx = i => 1 + i * W;
  s += '<line x1="' + (bx(1) - 12) + '" y1="22" x2="' + (bx(2) + 12) + '" y2="22" stroke="#1a1a1a" stroke-width="2"/>';
  s += '<text x="' + bx(1.5) + '" y="16" text-anchor="middle" font-family="Arial" font-size="16" fill="#1a1a1a">2 black keys</text>';
  s += '<line x1="' + (bx(4) - 12) + '" y1="22" x2="' + (bx(6) + 12) + '" y2="22" stroke="#1a1a1a" stroke-width="2"/>';
  s += '<text x="' + bx(5) + '" y="16" text-anchor="middle" font-family="Arial" font-size="16" fill="#1a1a1a">3 black keys</text>';
  s += '</svg>';
  return s;
}

module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/piano-notes/',
  esPath: '/diccionario-musical/notas-del-piano/',
  title: 'Piano Notes: Where They Are on the Keyboard',
  description: 'Where the notes are on the piano keyboard: the white and black key pattern, the trick of the 2 and 3 black-key groups, middle C, octaves and the 88 keys.',
  h1: 'Piano Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: [],
  body: `
<p>On the piano, the <strong>notes</strong> are the same <strong>seven</strong> as on any instrument: <strong>C, D, E, F, G, A and B</strong>. What changes is <strong>where they are placed</strong>. The keyboard repeats one pattern of <strong>12 keys</strong> (7 white and 5 black) over and over, so once you learn that pattern you know the whole piano.</p>

<p>(In Spanish-, French- and Italian-speaking countries the notes are called by the fixed-do syllables: <strong>Do = C, Re = D, Mi = E, Fa = F, Sol = G, La = A, Si = B</strong>. This page uses letters. If you want to see the piano among the other keyboards, read the guide to <a href="/diccionario-musical/instrumentos-de-teclado/">keyboard instruments</a>: organ, harpsichord, accordion, synthesizer and celesta.)</p>

<ul>
  <li>The <strong>white keys</strong> are the 7 natural notes: C, D, E, F, G, A, B.</li>
  <li>The <strong>black keys</strong> are the accidentals (sharps and flats): there are 5 in each octave.</li>
  <li>The 12-key pattern <strong>repeats</strong>: each repetition is an <a href="/diccionario-musical/indice-acustico/">octave</a>.</li>
</ul>

<figure style="margin:18px auto;text-align:center;">
${keyboardSvg()}
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">One octave of the keyboard, from middle C (C4) to C5. Each black key has two names: the sharp of the white key on its left and the flat of the white key on its right. The two keys highlighted in yellow, C and F, are the ones you can find from the black-key groups.</figcaption>
</figure>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">The Spanish page has an interactive 88-key keyboard that plays each key (Salamander Grand Piano samples by Alexander Holm, CC BY 3.0); it is not available in English yet.</p>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The piano at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Keyboard (struck strings)</td></tr>
<tr><th scope="row">Pitch</th><td>C (not a transposing instrument)</td></tr>
<tr><th scope="row">Transposition</th><td>None: it sounds as written</td></tr>
<tr><th scope="row">Range</th><td>A0 to C8 (88 keys): 27.5 Hz to about 4186 Hz</td></tr>
<tr><th scope="row">Mechanism</th><td>88 keys (52 white + 36 black)</td></tr>
<tr><th scope="row">Clef</th><td>Treble and bass (a two-staff system, called the grand staff)</td></tr>
</tbody>
</table></div>

<h2>The trick for finding your way: groups of 2 and 3 black keys</h2>

<p>The black keys are not spread evenly: they come in blocks of <strong>2</strong> and <strong>3</strong>. That pattern is the compass of the keyboard, because it tells you exactly where you are without counting from the end:</p>

<ul>
  <li>The white key <strong>just to the left of the group of 2 black keys</strong> is always a <strong>C</strong>.</li>
  <li>The white key <strong>just to the left of the group of 3 black keys</strong> is always an <strong>F</strong>.</li>
</ul>

<p>From those two landmarks the rest follows, going up in order: C, D, E (then you reach the group of 3, where F begins), F, G, A, B, and back to C.</p>

<h2>The white keys: the 7 natural notes</h2>

<p>From left (low) to right (high), the white keys run <strong>C – D – E – F – G – A – B</strong> and start again. They are the same natural notes you read on the <a href="/diccionario-musical/pentagramas/">staff</a> (UK: stave). If you want to review what they are called in Spanish, English and German, see <a href="/diccionario-musical/nombres-de-las-notas-musicales/">the names of the musical notes</a>.</p>

<h2>The black keys: sharps and flats</h2>

<p>Each black key sits <em>between</em> two white keys and has <strong>two names</strong>, depending on where you look from: it is the <strong>sharp</strong> (♯) of the note on its left and the <strong>flat</strong> (♭) of the note on its right. These are <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic</a> notes: they sound the same but are written differently depending on the context.</p>

<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>Black key (between…)</th><th>Names</th></tr></thead>
<tbody>
<tr><td>Between C and D</td><td>C♯ / D♭</td></tr>
<tr><td>Between D and E</td><td>D♯ / E♭</td></tr>
<tr><td>Between F and G</td><td>F♯ / G♭</td></tr>
<tr><td>Between G and A</td><td>G♯ / A♭</td></tr>
<tr><td>Between A and B</td><td>A♯ / B♭</td></tr>
</tbody>
</table>
</div>

<p>Notice an important detail: <strong>there is no black key between E and F, or between B and C</strong>. Those pairs are natural <a href="/diccionario-musical/intervalos/tono-y-semitono/">half steps</a> (UK: semitones), which is why the groups of black keys are separated by a gap. Every other pair of neighboring white keys is a whole step (UK: tone), with a black key in the middle.</p>

<h2>Middle C (C4)</h2>

<p><strong>Middle C</strong> is the C near the <strong>center of the keyboard</strong> (the exact center of an 88-key piano falls between E4 and F4). It is the reference note that joins the right hand (which usually reads in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>) and the left hand (usually in <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a>): on the staff it sits on a ledger line between the two clefs. In the international <a href="/diccionario-musical/indice-acustico/">scientific pitch notation</a> used on this site, that note is called <strong>C4</strong> (about 261.6 Hz). Some manufacturers and music programs number the octaves differently and call it C3, so check the convention when you read an octave number somewhere else.</p>

<h2>Octaves: why the notes repeat</h2>

<p>Each time the 12-key pattern is completed, the notes start again one <strong>octave</strong> higher. A standard piano has <strong>88 keys</strong> (52 white and 36 black), a little more than seven octaves, from <strong>A0</strong> (the lowest note, on the far left) to <strong>C8</strong> (the highest, on the far right). The octave number changes at every C: B3 is followed by C4.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Landmark</th><th>Note</th><th>Frequency</th></tr></thead>
<tbody>
<tr><td>Lowest key</td><td>A0</td><td>27.5 Hz</td></tr>
<tr><td>Middle C</td><td>C4</td><td>261.6 Hz</td></tr>
<tr><td>Concert A (orchestra tuning note)</td><td>A4</td><td>440 Hz</td></tr>
<tr><td>Highest key</td><td>C8</td><td>4186 Hz</td></tr>
</tbody>
</table></div>

<h2>How to find any note, step by step</h2>

<ol>
  <li>Find a group of <strong>2 black keys</strong>.</li>
  <li>The white key to its left is <strong>C</strong>.</li>
  <li>From there, go up the white keys in order: D, E, F, G, A, B.</li>
  <li>For a black key, think of it as the ♯ of the white key on its left or the ♭ of the one on its right.</li>
</ol>

<p>Want to practice? Test the names in Spanish, English and German with the <a href="/ejercicios/equivalencias-de-notas/">note equivalence quiz</a>, or identify notes on the staff with the <a href="/ejercicios/identificar-notas/">note-reading exercises</a>.</p>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>pianoforte</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>piano</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Klavier</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>piano</dd></div>
    <div class="tm-nombres-par"><dt>Score abbreviation</dt><dd>Pf.</dd></div>
  </dl>
  <p class="tm-nombres-pie">All of them, with their false friends, are in <a href="/diccionario-musical/nombres-de-los-instrumentos-en-otros-idiomas/">instrument names in other languages</a>.</p>
</aside>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many keys does a piano have?</div>
      <div class="tm-faq-a">A standard piano has 88 keys: 52 white and 36 black. They cover a little more than seven octaves, from A0 (the lowest note) to C8 (the highest). Keyboards and digital pianos often have 61, 76 or 88 keys.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where is C on the piano?</div>
      <div class="tm-faq-a">C is the white key just to the left of every group of 2 black keys. Middle C (C4) is the one closest to the center of the keyboard, although the exact midpoint of the 88 keys falls between E4 and F4.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the black keys of the piano called?</div>
      <div class="tm-faq-a">Each black key has two names: it is the sharp (♯) of the white note on its left and the flat (♭) of the white note on its right. For example, the key between C and D is C♯ or D♭. They are enharmonic notes: they sound the same but are written differently.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is there no black key between E and F or between B and C?</div>
      <div class="tm-faq-a">Because E and F, and B and C, are only a half step apart (they are natural half steps), so there is no room for a note in between. That is why the black keys come in groups of 2 and 3, leaving those gaps.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
