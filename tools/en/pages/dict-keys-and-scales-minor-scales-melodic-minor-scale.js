const dictionaryPage = require('../dictionary-page');

// [name, ascending notes 1-7, descending 7th, descending 6th, key signature, Spanish file slug, width (inside), width (key signature)]
const S = [
  ['A', 'A B C D E F♯ G♯', 'G♮', 'F♮', '', 'la', 823, 0],
  ['E', 'E F♯ G A B C♯ D♯', 'D♮', 'C♮', '1♯', 'mi', 823, 845],
  ['B', 'B C♯ D E F♯ G♯ A♯', 'A♮', 'G♮', '2♯', 'si', 823, 859],
  ['F♯', 'F♯ G♯ A B C♯ D♯ E♯', 'E♮', 'D♮', '3♯', 'fa-sostenido', 837, 871],
  ['C♯', 'C♯ D♯ E F♯ G♯ A♯ B♯', 'B♮', 'A♮', '4♯', 'do-sostenido', 839, 885],
  ['G♯', 'G♯ A♯ B C♯ D♯ E♯ F𝄪', 'F♯', 'E♮', '5♯', 'sol-sostenido', 837, 897],
  ['D♯', 'D♯ E♯ F♯ G♯ A♯ B♯ C𝄪', 'C♯', 'B♮', '6♯', 're-sostenido', 837, 911],
  ['A♯', 'A♯ B♯ C♯ D♯ E♯ F𝄪 G𝄪', 'G♯', 'F♯', '7♯', 'la-sostenido', 837, 923],
  ['D', 'D E F G A B♮ C♯', 'C♮', 'B♭', '1♭', 're', 823, 843],
  ['G', 'G A B♭ C D E♮ F♯', 'F♮', 'E♭', '2♭', 'sol', 823, 856],
  ['C', 'C D E♭ F G A♮ B♮', 'B♭', 'A♭', '3♭', 'do', 823, 866],
  ['F', 'F G A♭ B♭ C D♮ E♮', 'E♭', 'D♭', '4♭', 'fa', 823, 878],
  ['B♭', 'B♭ C D♭ E♭ F G♮ A♮', 'A♭', 'G♭', '5♭', 'si-bemol', 837, 889],
  ['E♭', 'E♭ F G♭ A♭ B♭ C♮ D♮', 'D♭', 'C♭', '6♭', 'mi-bemol', 836, 901],
  ['A♭', 'A♭ B♭ C♭ D♭ E♭ F♮ G♮', 'G♭', 'F♭', '7♭', 'la-bemol', 836, 914],
];
const words = n => n.replace('𝄪', ' double sharp');
const info = s => {
  const a = s[1].split(' ');
  const desc = [s[0], s[2], s[3], a[4], a[3], a[2], a[1], a[0]];
  const changed = [a[5], a[6], s[2], s[3]];
  return { a, asc: [...a, s[0]], desc, changed };
};
const ksText = k => (k.endsWith('♯') ? k.slice(0, -1) + (k[0] === '1' ? ' sharp' : ' sharps') : k.slice(0, -1) + (k[0] === '1' ? ' flat' : ' flats'));
const row = s => {
  const { a } = info(s);
  const alt = (s[4] ? s[4] + ' + ' : '+ ') + a[5] + ', ' + a[6];
  return `    <tr><td><strong>${s[0]} melodic minor</strong></td>${a.map(n => `<td>${words(n)}</td>`).join('')}<td>${words(alt)}</td></tr>`;
};
const fig = (s, kind) => {
  const { asc, desc, changed } = info(s);
  const name = s[0] + ' melodic minor';
  const w = kind === 'dentro' ? s[6] : s[7];
  const lead = kind === 'dentro'
    ? `${name}, with the accidentals written next to each note`
    : `${name} with a key signature of ${ksText(s[4])}`;
  const alt = `${lead}: ascending: ${asc.join(', ')}; descending: ${desc.join(', ')}. In red, the notes that change from the natural minor scale: ${changed.join(', ')}.`;
  const file = `${s[5]}-menor-melodica-${kind}.svg`;
  return `<h4>${s[0]} melodic minor</h4>

<figure>
  <img src="/assets/img/escalas/${file}" width="${w}" height="122" alt="${alt}" loading="lazy" decoding="async">
</figure>`;
};
const group = kind => `<h3>Melodic minor scales with sharps</h3>

${S.slice(1, 8).map(s => fig(s, kind)).join('\n\n')}

<h3>Melodic minor scales with flats</h3>

${S.slice(8).map(s => fig(s, kind)).join('\n\n')}`;

module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/minor-scales/melodic-minor-scale/',
  esPath: '/diccionario-musical/tonalidades/escalas-menores/escalas-menores-melodicas/',
  title: 'Melodic Minor Scale: Notes, Pattern and All 15 Keys',
  description: 'The melodic minor scale raises the 6th and 7th degrees going up and returns to the natural minor going down. Notes and staff for all 15 keys.',
  h1: 'Melodic Minor Scales',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Keys and Scales', '/diccionario-musical/tonalidades/'], ['Minor Scales', '/diccionario-musical/tonalidades/escalas-menores/']],
  scripts: ['tm-piano-audio'],
  body: `<p>The melodic minor scale is built from the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/">natural minor scale</a> by raising the sixth and seventh degrees by a half step (UK: semitone) when the scale goes up. When it goes down, those two degrees return to their natural minor values. This double behavior smooths out the augmented second that the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a> creates.</p>

<h2 id="h-why-it-exists">Why does the melodic minor scale exist?</h2>

<p>It helps to start with the problem it solves. The <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/">natural minor scale</a> has a lowered seventh degree (G♮ in A minor), which weakens the pull toward the tonic. The <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a> fixes this by raising the seventh degree (G♯), which creates a leading tone (UK: leading note) that resolves up to A. But that change causes a new problem: between the sixth degree (F) and the raised seventh (G♯) there are three half steps. This interval is an <strong>augmented second</strong>, and it is awkward to sing.</p>

<p>The solution is to raise the sixth degree as well when going up (F → F♯). Now F♯ to G♯ is an ordinary whole step (UK: tone), and the melody rises smoothly. When going down, the leading tone is no longer needed, because the melody is moving away from the tonic. Both degrees go back to their natural values.</p>

<h2 id="h-comparison">The three minor scales compared</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>A natural minor</th><th>A harmonic minor</th><th>A melodic minor (ascending)</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>A</td><td>A</td><td>A</td></tr>
    <tr><td>2</td><td>B</td><td>B</td><td>B</td></tr>
    <tr><td>3</td><td>C</td><td>C</td><td>C</td></tr>
    <tr><td>4</td><td>D</td><td>D</td><td>D</td></tr>
    <tr><td>5</td><td>E</td><td>E</td><td>E</td></tr>
    <tr><td>6</td><td>F</td><td>F</td><td><strong>F♯</strong></td></tr>
    <tr><td>7</td><td>G</td><td><strong>G♯</strong></td><td><strong>G♯</strong></td></tr>
    <tr><td>8</td><td>A</td><td>A</td><td>A</td></tr>
  </tbody>
</table>
</div>

<p>The ascending melodic minor raises the 6th and 7th degrees. The descending melodic minor is identical to the natural minor.</p>

<h2 id="h-pattern">Interval pattern</h2>

<p>The distances between degrees (W = whole step, H = half step) are different going up and going down. Each column names the same pair of neighboring degrees in both rows; in the descending row the notes are simply played in the opposite order:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Direction</th><th>1–2</th><th>2–3</th><th>3–4</th><th>4–5</th><th>5–6</th><th>6–7</th><th>7–8</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Ascending</strong></td><td>W</td><td>H</td><td>W</td><td>W</td><td>W</td><td>W</td><td>H</td></tr>
    <tr><td><strong>Descending</strong></td><td>W</td><td>H</td><td>W</td><td>W</td><td>H</td><td>W</td><td>W</td></tr>
  </tbody>
</table>
</div>

<p>Start from the natural minor scale:</p>

<figure>
  <img src="/assets/img/escalas/la-menor-natural-dentro.svg" width="840" height="122" alt="A natural minor, with no accidentals: A, B, C, D, E, F, G, A. Between one note and the next: whole step, half step, whole step, whole step, half step, whole step, whole step." loading="lazy" decoding="async">
</figure>

<p>Raise the sixth and seventh notes by a half step and you get the ascending melodic minor scale:</p>

<figure>
  <img src="/assets/img/escalas/la-menor-melodica-dentro.svg" width="823" height="122" alt="A melodic minor, with the accidentals written next to each note: ascending: A, B, C, D, E, F♯, G♯, A; descending: G♮, F♮, E, D, C, B, A. In red, the notes that change from the natural minor scale: F♯, G♯, G♮, F♮." loading="lazy" decoding="async">
</figure>

<p>On the staves of this page the raised notes are marked in red to make them easy to spot. In exercises you do not need to mark them.</p>

<p>Move this pattern to any tonic and you get the melodic minor scale of that note.</p>

<p>The scales are shown in two equivalent forms: with the accidentals written inside the scale, and with a key signature. Which one you need depends on the exercise.</p>

<h2 id="table-melodic-minor-scales">All 15 melodic minor scales (ascending form)</h2>
<p>In the <strong>descending form</strong>, the sixth and seventh degrees return to the values of the natural minor scale.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Scale</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6↑</th><th>7↑</th><th>Key signature + accidentals</th></tr>
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

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a melodic minor scale?</div>
      <div class="tm-faq-a">The melodic minor scale is a variant of the natural minor scale in which the sixth and seventh degrees are raised by a half step when going up. Going down, the original natural minor degrees come back. This two-way form smooths out the augmented second of the harmonic minor scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the melodic minor scale different from the harmonic minor?</div>
      <div class="tm-faq-a">The harmonic minor raises only the seventh degree, which creates an augmented second between the sixth and seventh degrees. The melodic minor also raises the sixth degree when going up, which removes that leap and makes the melody flow. Going down, the melodic minor returns to the natural minor degrees, while the harmonic minor keeps the raised seventh in both directions.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the melodic minor scale change when it goes down?</div>
      <div class="tm-faq-a">Going down, the pull of the leading tone toward the tonic is no longer needed, because the melody is moving away from the tonic. So the natural degrees come back, and they sound smoother in a descending line.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the notes of the A melodic minor scale?</div>
      <div class="tm-faq-a">Ascending, A melodic minor has the notes A, B, C, D, E, F♯, G♯, A. Descending, it returns to the natural minor: A, G, F, E, D, C, B, A.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the melodic minor scale the same in jazz and in classical music?</div>
      <div class="tm-faq-a">No. In classical theory the ascending and descending forms are different. In jazz, the ascending form is used in both directions (the jazz melodic minor). It is the same as a major scale with a lowered third degree.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
