const dictionaryPage = require('../dictionary-page');
const ROOTS = [
  ['do', 'C', 723, 'C', 'C C♯ D D♯ E F F♯ G G♯ A A♯ B'],
  ['do-sostenido', 'C♯', 736, 'C♯', 'C♯ D D♯ E F F♯ G G♯ A A♯ B C'],
  ['re', 'D', 723, 'D', 'D D♯ E F F♯ G G♯ A A♯ B C C♯'],
  ['mi-bemol', 'E♭', 733, 'E♭', 'E♭ E F F♯ G G♯ A A♯ B C C♯ D'],
  ['mi', 'E', 723, 'E', 'E F F♯ G G♯ A A♯ B C C♯ D D♯'],
  ['fa', 'F', 723, 'F', 'F F♯ G G♯ A A♯ B C C♯ D D♯ E'],
  ['fa-sostenido', 'F♯', 736, 'F♯', 'F♯ G G♯ A A♯ B C C♯ D D♯ E F'],
  ['sol', 'G', 723, 'G', 'G G♯ A A♯ B C C♯ D D♯ E F F♯'],
  ['la-bemol', 'A♭', 733, 'A♭', 'A♭ A A♯ B C C♯ D D♯ E F F♯ G'],
  ['la', 'A', 723, 'A', 'A A♯ B C C♯ D D♯ E F F♯ G G♯'],
  ['si-bemol', 'B♭', 735, 'B♭', 'B♭ B C C♯ D D♯ E F F♯ G G♯ A'],
  ['si', 'B', 723, 'B', 'B C C♯ D D♯ E F F♯ G G♯ A A♯'],
];
const seq = n => n.split(' ');
const alt = (r, notes) => `Chromatic scale on ${r.replace('♯', ' sharp').replace('♭', ' flat')}, with the accidentals written next to each note: ${seq(notes).concat([seq(notes)[0]]).map(x => x.replace('♯', ' sharp').replace('♭', ' flat')).join(', ')}.`;
const rows = ROOTS.map(([, r, , , n]) => `<tr><td><strong>${r}</strong></td><td>${n}</td></tr>`).join('\n');
const figs = ROOTS.map(([f, r, w, , n]) => `<figure class="tm-staff"><img src="/assets/img/escalas/${f}-cromatica-dentro.svg" width="${w}" height="122" alt="${alt(r, n)}" loading="lazy" decoding="async"><figcaption>${r}</figcaption></figure>`).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/chromatic-scale/',
  esPath: '/diccionario-musical/tonalidades/escala-cromatica/',
  title: 'Chromatic Scale: What It Is, Notes and Uses',
  description: 'The chromatic scale: the 12 notes a half step apart. How to write it going up and down, an example on C, the scale in every key and what it is used for.',
  h1: 'Chromatic Scale',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Keys and Scales', '/diccionario-musical/tonalidades/']],
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>chromatic scale</strong> runs through all twelve notes of Western music, each separated from the next by a <a href="/diccionario-musical/intervalos/tono-y-semitono/">half step (UK: semitone)</a>, dividing the octave into twelve equal steps. Unlike the <a href="/diccionario-musical/tonalidades/escalas-mayores/">major</a> and <a href="/diccionario-musical/tonalidades/escalas-menores/">minor</a> scales, it has no tonic and no tonal hierarchy: all its notes are equally spaced.</p>

<h2>What is the chromatic scale?</h2>
<p>It is the series of the twelve different pitches that fit in an octave, each a half step from the previous one (thirteen notes if you count the arrival octave). It is therefore not a seven-note <em>diatonic</em> scale, but the complete sound material from which all other scales are drawn. Its character is neutral and tense at the same time, with no point of rest.</p>

<h2>How it is written: sharps going up, flats going down</h2>
<p>As a convention for readability, when <strong>ascending</strong> the altered notes are written with <strong>sharps</strong> and when <strong>descending</strong> with <strong>flats</strong>, so that the accidental points in the direction of the movement. Writing C♯ or D♭ for the same pitch reflects the difference between a <a href="/diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/">diatonic and a chromatic half step</a>.</p>
<p><strong>Ascending from C:</strong> C · C♯ · D · D♯ · E · F · F♯ · G · G♯ · A · A♯ · B · C.</p>
<figure class="tm-staff"><img src="/assets/img/escalas/do-cromatica-dentro.svg" width="723" height="122" alt="${alt('C', ROOTS[0][4])}" loading="lazy" decoding="async"><figcaption>Ascending chromatic scale from C.</figcaption></figure>
<p><strong>Descending from C:</strong> C · B · B♭ · A · A♭ · G · G♭ · F · E · E♭ · D · D♭ · C.</p>
<p>To practice this spelling with any starting note, ascending or descending, there is an interactive exercise: <a href="/ejercicios/escalas/construir-escala-cromatica/">build the chromatic scale</a>.</p>

<h2>What it is used for</h2>
<ul>
  <li><strong>Chromatic passing notes:</strong> connecting two notes of the diatonic scale through the note in between, very common in melodies and bass lines.</li>
  <li><strong>Color and tension:</strong> adding chromaticism to a tonal phrase without changing key.</li>
  <li><strong>Voice leading:</strong> approaching the target note of a chord by half step, a central device in jazz and Romantic music.</li>
  <li><strong>Technique:</strong> it is the warm-up exercise par excellence on any instrument.</li>
</ul>

<h2>The chromatic scale in every key</h2>
<p>The chromatic scale written from each of the 12 starting notes, with its correct spelling and its <a href="/diccionario-musical/pentagramas/">staff</a>:</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead>
<tr><th>Starting note</th><th>Notes (ascending)</th></tr>
</thead>
<tbody>
${rows}
</tbody>
</table>
</div>
<h3>Staff for each starting note</h3>
<div class="tm-img-grid-2" data-scale-grid="cromatica">
${figs}
</div>
<p>The solfège names used in Spanish-, French- and Italian-speaking countries (Do, Re, Mi, Fa, Sol, La, Si) correspond to C, D, E, F, G, A, B.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">How many notes does the chromatic scale have?</div>
<div class="tm-faq-a">It has 12 different notes within an octave (13 counting the arrival octave), all a half step apart. It is the scale with the most notes in the Western system.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Why is it written with sharps going up and flats going down?</div>
<div class="tm-faq-a">It is a readability convention: the accidental points in the direction of the movement. Going up, sharps are used (C♯, D♯…) and going down, flats (B♭, A♭…), even though the same keys sound.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Does the chromatic scale have a tonic?</div>
<div class="tm-faq-a">No. Because it is made of equal half steps it is symmetrical and has no resting note and no tonal hierarchy, unlike the major and minor scales.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How is it different from the major scale?</div>
<div class="tm-faq-a">The major scale uses 7 notes with the pattern whole-whole-half-whole-whole-whole-half; the chromatic scale uses all 12 notes in a row by half steps. The major scale defines a key; the chromatic scale is the complete sound material.</div>
</div>
</div>
</div>
</div>
</section>
`,
});
