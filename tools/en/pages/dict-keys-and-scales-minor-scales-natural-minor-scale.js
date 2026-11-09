const dictionaryPage = require('../dictionary-page');

// [name, notes 1-7, key signature count, accidentals in order, Spanish file slug, width (inside), width (key signature)]
const S = [
  ['A', 'A B C D E F G', '', '', 'la', 840, 0],
  ['E', 'E F♯ G A B C D', '1♯', 'F♯', 'mi', 840, 862],
  ['B', 'B C♯ D E F♯ G A', '2♯', 'F♯ C♯', 'si', 840, 874],
  ['F♯', 'F♯ G♯ A B C♯ D E', '3♯', 'F♯ C♯ G♯', 'fa-sostenido', 854, 888],
  ['C♯', 'C♯ D♯ E F♯ G♯ A B', '4♯', 'F♯ C♯ G♯ D♯', 'do-sostenido', 856, 901],
  ['G♯', 'G♯ A♯ B C♯ D♯ E F♯', '5♯', 'F♯ C♯ G♯ D♯ A♯', 'sol-sostenido', 854, 914],
  ['D♯', 'D♯ E♯ F♯ G♯ A♯ B C♯', '6♯', 'F♯ C♯ G♯ D♯ A♯ E♯', 're-sostenido', 854, 926],
  ['A♯', 'A♯ B♯ C♯ D♯ E♯ F♯ G♯', '7♯', 'F♯ C♯ G♯ D♯ A♯ E♯ B♯', 'la-sostenido', 854, 940],
  ['D', 'D E F G A B♭ C', '1♭', 'B♭', 're', 840, 860],
  ['G', 'G A B♭ C D E♭ F', '2♭', 'B♭ E♭', 'sol', 840, 871],
  ['C', 'C D E♭ F G A♭ B♭', '3♭', 'B♭ E♭ A♭', 'do', 840, 883],
  ['F', 'F G A♭ B♭ C D♭ E♭', '4♭', 'B♭ E♭ A♭ D♭', 'fa', 840, 895],
  ['B♭', 'B♭ C D♭ E♭ F G♭ A♭', '5♭', 'B♭ E♭ A♭ D♭ G♭', 'si-bemol', 853, 906],
  ['E♭', 'E♭ F G♭ A♭ B♭ C♭ D♭', '6♭', 'B♭ E♭ A♭ D♭ G♭ C♭', 'mi-bemol', 853, 918],
  ['A♭', 'A♭ B♭ C♭ D♭ E♭ F♭ G♭', '7♭', 'B♭ E♭ A♭ D♭ G♭ C♭ F♭', 'la-bemol', 853, 929],
];
const ksText = k => (k.endsWith('♯') ? k.slice(0, -1) + (k[0] === '1' ? ' sharp' : ' sharps') : k.slice(0, -1) + (k[0] === '1' ? ' flat' : ' flats'));
const row = s => {
  const a = s[1].split(' ');
  return `    <tr><td><strong>${s[0]} natural minor</strong></td>${a.map(n => `<td>${n}</td>`).join('')}<td>${s[2] ? s[2] + ': ' + s[3] : 'None'}</td></tr>`;
};
const fig = (s, kind) => {
  const a = s[1].split(' ');
  const notes = [...a, s[0]].join(', ');
  const name = s[0] + ' natural minor';
  const steps = ' Between one note and the next: whole step, half step, whole step, whole step, half step, whole step, whole step.';
  const alt = kind === 'dentro'
    ? `${name}, with the accidentals written next to each note: ${notes}.${steps}`
    : `${name} with a key signature of ${ksText(s[2])}: ${notes}.`;
  const w = kind === 'dentro' ? s[5] : s[6];
  const h = kind === 'dentro' ? 147 : 122;
  return `<h4>${s[0]} natural minor</h4>

<figure>
  <img src="/assets/img/escalas/${s[4]}-menor-natural-${kind}.svg" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async">
</figure>`;
};
const group = kind => `<h3>Natural minor scales with sharps</h3>

${S.slice(1, 8).map(s => fig(s, kind)).join('\n\n')}

<h3>Natural minor scales with flats</h3>

${S.slice(8).map(s => fig(s, kind)).join('\n\n')}`;
const order = (list, word) => list.map(s => `  <li>${s[0]} minor has ${s[2].slice(0, -1)} ${word}${s[2][0] === '1' ? '' : 's'}.</li>`).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/minor-scales/natural-minor-scale/',
  esPath: '/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/',
  title: 'Natural Minor Scale: Notes, Pattern and All 15 Keys',
  description: 'The natural minor scale follows the pattern whole, half, whole, whole, half, whole, whole. Notes, key signature and staff for all 15 minor keys.',
  h1: 'Natural Minor Scales',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Keys and Scales', '/diccionario-musical/tonalidades/'], ['Minor Scales', '/diccionario-musical/tonalidades/escalas-menores/']],
  scripts: ['tm-piano-audio'],
  body: `<p>The natural minor scale is the basic minor scale of the tonal system. It has 8 notes and follows this pattern of intervals: <strong>whole step – half step – whole step – whole step – half step – whole step – whole step</strong>. (A whole step is a tone in UK terms, and a half step is a semitone.) Apply the pattern from any note and you get the natural minor scale of that note.</p>

<h2>How is a natural minor scale built?</h2>

<p>Every natural minor scale has 8 notes in stepwise order that follow the pattern:</p>

<p>Whole step – half step – whole step – whole step – half step – whole step – whole step</p>

<p>The staff (UK: stave) below shows A natural minor as an example:</p>

<figure>
  <img src="/assets/img/escalas/la-menor-natural-dentro.svg" width="840" height="147" alt="A natural minor, with no accidentals: A, B, C, D, E, F, G, A. Between one note and the next: whole step, half step, whole step, whole step, half step, whole step, whole step." loading="lazy" decoding="async">
</figure>

<p>Move this pattern to any tonic and you get the natural minor scale of that note.</p>

<p>The scales are shown in two equivalent forms: with the accidentals written inside the scale, and with a key signature. Which one you need depends on the exercise.</p>

<h2 id="table-natural-minor-scales">All 15 natural minor scales</h2>
<div class="tm-table-wrap">
<table class="tm-table tm-scales" data-notes-cols="1-7" data-figures>
  <thead>
    <tr><th>Scale</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>Accidentals</th></tr>
  </thead>
  <tbody>
${S.map(row).join('\n')}
  </tbody>
</table>
</div>

<h2>Accidentals written inside the scale</h2>

${group('dentro')}

<h2>Accidentals in the key signature</h2>

${group('armadura')}

<h2>Order of the minor keys with sharps</h2>

<ol>
${order(S.slice(1, 8), 'sharp')}
</ol>

<p>The order of the sharp keys comes from going up a perfect 5th each time, starting from A.</p>

<h2>Order of the minor keys with flats</h2>

<ol>
${order(S.slice(8), 'flat')}
</ol>

<p>The order of the flat keys comes from going down a perfect 5th each time, starting from A.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is a natural minor scale built?</div>
      <div class="tm-faq-a">A natural minor scale has 8 notes that follow this interval pattern: whole step, half step, whole step, whole step, half step, whole step, whole step. Apply the pattern from any note and you get the natural minor scale of that note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the natural minor scale different from the major scale?</div>
      <div class="tm-faq-a">The natural minor scale has its third, sixth and seventh degrees a half step lower than the major scale. This gives it its darker sound. The major scale follows the pattern W-W-H-W-W-W-H, while the natural minor follows W-H-W-W-H-W-W.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many natural minor scales are there?</div>
      <div class="tm-faq-a">There are 15 natural minor scales in the standard set of keys: A minor (no accidentals), 7 with sharps (E, B, F♯, C♯, G♯, D♯, A♯) and 7 with flats (D, G, C, F, B♭, E♭, A♭). Each one is the relative minor of a major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the notes of the G natural minor scale?</div>
      <div class="tm-faq-a">The G natural minor scale has the notes G, A, B♭, C, D, E♭ and F. It has two flats (B♭ and E♭) and it is the relative minor of B♭ major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the natural minor scale related to the major scale?</div>
      <div class="tm-faq-a">Every natural minor scale has the same notes as a major scale: it is the relative minor. The minor tonic is a minor third below the tonic of its relative major: A minor → C major; E minor → G major; B minor → D major.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
