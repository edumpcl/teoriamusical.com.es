const dictionaryPage = require('../dictionary-page');

// ---- helpers: spell every scale from its tonic (no hand-typed note lists) ----
const LET = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NAT = [0, 2, 4, 5, 7, 9, 11];
// [tonic, svg file stem, armadura width, dentro width]
const KEYS = [
  ['C', 'do', 0, 840], ['G', 'sol', 862, 840], ['D', 're', 874, 840], ['A', 'la', 888, 840], ['E', 'mi', 901, 840],
  ['B', 'si', 914, 840], ['F♯', 'fa-sostenido', 926, 854], ['C♯', 'do-sostenido', 940, 856],
  ['F', 'fa', 860, 840], ['B♭', 'si-bemol', 871, 853], ['E♭', 'mi-bemol', 883, 853], ['A♭', 'la-bemol', 895, 853],
  ['D♭', 're-bemol', 906, 853], ['G♭', 'sol-bemol', 918, 853], ['C♭', 'do-bemol', 929, 853],
];
const SHARP_KEYS = KEYS.slice(1, 8);
const FLAT_KEYS = KEYS.slice(8);
// lowered = scale degrees (0-based) that are lowered a half step compared with the natural major scale
function spell(tonic, lowered) {
  const l0 = LET.indexOf(tonic[0]);
  const a0 = tonic.length > 1 ? (tonic[1] === '♯' ? 1 : -1) : 0;
  const tpc = (NAT[l0] + a0 + 12) % 12;
  return [0, 1, 2, 3, 4, 5, 6].map(i => {
    const letter = (l0 + i) % 7;
    const pc = (tpc + NAT[i] - (lowered.includes(i) ? 1 : 0) + 12) % 12;
    const d = (pc - NAT[letter] + 12) % 12;
    return { letter: LET[letter], acc: d > 6 ? d - 12 : d };
  });
}
const ACC = { '-2': ' double flat', '-1': '♭', '0': '', '1': '♯', '2': ' double sharp' };
const plain = n => n.letter + ACC[n.acc];
// note name; shows a natural sign when the note cancels an accidental of the key signature
function label(tonic, lowered, i) {
  const n = spell(tonic, lowered)[i], k = spell(tonic, [])[i];
  return plain(n) + (n.acc === 0 && k.acc !== 0 ? '♮' : '');
}
const labels = (tonic, lowered) => [0, 1, 2, 3, 4, 5, 6].map(i => label(tonic, lowered, i));
const sigText = tonic => {
  const a = spell(tonic, []).filter(n => n.acc !== 0);
  if (!a.length) return 'no accidentals';
  const s = a[0].acc > 0 ? 'sharp' : 'flat';
  return `${a.length} ${s}${a.length > 1 ? 's' : ''}`;
};
const changedText = (tonic, lowered) => lowered.map(i => label(tonic, lowered, i));
// alt text: starts with the scale name (the audio script reads the tonic from the start)
function altText(tonic, lowered, name, where) {
  const notes = labels(tonic, lowered).concat([label(tonic, lowered, 0)]).join(', ');
  const ch = changedText(tonic, lowered);
  const where_ = where === 'armadura'
    ? ` with a key signature of ${sigText(tonic)}`
    : (tonic === 'C' && !lowered.length ? ', no accidentals' : ', with the accidentals written next to each note');
  const red = lowered.length
    ? ` In red, ${ch.length > 1 ? 'the notes that change' : 'the note that changes'} from the natural major scale: ${ch.join(', ')}.`
    : '';
  return `${tonic} ${name}${where_}: ${notes}.${red}`;
}
function fig(tonic, lowered, name, stemKind, where) {
  const k = KEYS.find(x => x[0] === tonic);
  const w = where === 'armadura' ? k[2] : k[3];
  return `<figure><img src="/assets/img/escalas/${k[1]}-${stemKind}-${where}.svg" width="${w}" height="122" alt="${altText(tonic, lowered, name, where)}" loading="lazy" decoding="async"></figure>`;
}
function natFig(tonic) {
  const k = KEYS.find(x => x[0] === tonic);
  const where = tonic === 'C' ? 'dentro' : 'armadura';
  const w = tonic === 'C' ? 840 : k[2];
  const notes = labels(tonic, []).concat([label(tonic, [], 0)]).join(', ');
  const alt = tonic === 'C'
    ? `C major (natural), no accidentals: ${notes}. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step.`
    : `${tonic} major (natural) with a key signature of ${sigText(tonic)}: ${notes}.`;
  return `<figure><img src="/assets/img/escalas/${k[1]}-mayor-${where}.svg" width="${w}" height="122" alt="${alt}" loading="lazy" decoding="async"></figure>`;
}
const diffText = (tonic, lowered) => lowered.map(i => `${plain(spell(tonic, [])[i])}→${label(tonic, lowered, i)}`).join(', ');
function scaleRows(lowered, scaleName) {
  return KEYS.map(([t]) => {
    const l = labels(t, lowered);
    return `    <tr><td><strong>${t} ${scaleName}</strong></td>${l.map((n, i) => `<td>${lowered.includes(i) ? '<strong>' + n + '</strong>' : n}</td>`).join('')}<td>${diffText(t, lowered)}</td></tr>`;
  }).join('\n');
}
function figureSections(lowered, name, stem, noun) {
  const group = (keys, where) => keys.map(([t]) => `<h4>${t} ${name}</h4>\n\n${fig(t, lowered, name, stem, where)}`).join('\n\n');
  return `<h2 id="accidentals-inside">Accidentals written inside the scale</h2>

<h3>${noun} with sharps</h3>

${group(SHARP_KEYS, 'dentro')}

<h3>${noun} with flats</h3>

${group(FLAT_KEYS, 'dentro')}

<h2 id="accidentals-in-key-signature">Accidentals in the key signature</h2>

<h3>${noun} with sharps</h3>

${group(SHARP_KEYS, 'armadura')}

<h3>${noun} with flats</h3>

${group(FLAT_KEYS, 'armadura')}`;
}
const CRUMBS = [['Music Dictionary', '/diccionario-musical/'], ['Keys and Scales', '/diccionario-musical/tonalidades/'], ['Major Scales', '/diccionario-musical/tonalidades/escalas-mayores/']];

const LOW = [5]; // 6th degree lowered
module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/major-scales/harmonic-major-scales/',
  esPath: '/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixtas-principales/',
  title: 'Harmonic Major Scale: Notes, Formula and All 15 Keys',
  description: 'The harmonic major scale is a major scale with a lowered 6th. Formula, notes in all 15 keys, staff images and how it differs from harmonic minor.',
  h1: 'Harmonic Major Scales',
  crumbs: CRUMBS,
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>harmonic major scale</strong> is a variant of the <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/">natural major scale</a> with a single change: the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">sixth degree</a> is lowered a half step (UK: semitone). That alteration gives the scale a distinctive dark color without leaving the major sound: the tonic triad is still major.</p>

<p>Other names for the same scale are <strong>Ionian ♭6</strong> (the major scale, or Ionian mode, with a lowered 6th) and, in Spanish conservatory teaching, <em>escala mayor mixta principal</em> ("main mixed major scale"). "Mixed" refers to the mix of major and minor features: a major scale that uses the sixth degree of the parallel minor. In English the usual name is harmonic major, by analogy with harmonic minor: both have an augmented second between degrees 6 and 7.</p>

<p>Start from the natural major scale:</p>

${natFig('C')}

<p>Lower the sixth degree by a half step and you get the harmonic major scale:</p>

${fig('C', LOW, 'harmonic major', 'mixta-principal', 'dentro')}

<p>In the examples, the lowered note is shown in red to make it easy to spot. You do not need to mark it in exercises.</p>

<p>The scales are shown in two ways: with the accidentals written inside the scale, and with a key signature. Both are equivalent.</p>

<h2 id="interval-pattern">Interval pattern</h2>

<p>The pattern of <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps and half steps</a> of the harmonic major scale is <strong>W–W–H–W–H–A2–H</strong> (W = whole step, H = half step, A2 = augmented second, which is 3 half steps). The lowered sixth degree creates an augmented second between degrees 6 and 7, the same interval that appears in the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a>.</p>

<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr>
  </thead>
  <tbody>
    <tr><td>Step from previous note</td><td>—</td><td>W</td><td>W</td><td>H</td><td>W</td><td><strong>H</strong></td><td>A2</td><td>H</td></tr>
    <tr><td>C harmonic major</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td><strong>A♭</strong></td><td>B</td><td>C</td></tr>
    <tr><td>C major</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>A</td><td>B</td><td>C</td></tr>
  </tbody>
</table></div>

<p>Compare it with C harmonic minor (C D E♭ F G A♭ B). The two scales share the lowered sixth, the leading tone and the augmented second. They differ only in the third degree: E in harmonic major, E♭ in harmonic minor.</p>

<p>Chords built on this scale explain its appeal. The scale contains a C major triad (I), an F minor triad (iv, with A♭) and a G dominant seventh (G-B-D-F), so it fits a I–iv–V–I progression with a minor subdominant, a classic "borrowed chord" color.</p>

<h2 id="table-harmonic-major-scales">Table of all 15 harmonic major scales</h2>
<div class="tm-table-wrap">
<table class="tm-table tm-scales" data-notes-cols="1-7" data-figures data-fig-match="harmonic major">
  <thead>
    <tr><th>Scale</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>♭6</th><th>7</th><th>Difference from the major scale</th></tr>
  </thead>
  <tbody>
${scaleRows(LOW, 'harmonic major')}
  </tbody>
</table>
</div>

${figureSections(LOW, 'harmonic major', 'mixta-principal', 'Harmonic major scales')}

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the harmonic major scale?</div>
      <div class="tm-faq-a">The harmonic major scale is a variant of the major scale in which the sixth degree is lowered a half step. This gives it a special color that clearly sets it apart from the natural major scale, and an augmented second between the sixth and seventh degrees.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How does the harmonic major scale differ from the natural major scale?</div>
      <div class="tm-faq-a">The only difference is the sixth degree, which is lowered a half step. For example, C major has A natural, while C harmonic major has A♭.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How does harmonic major differ from the Mixolydian scale?</div>
      <div class="tm-faq-a">The Mixolydian scale lowers only the seventh degree, while harmonic major lowers only the sixth. Mixolydian has no leading tone and sounds more modal. Harmonic major keeps the leading tone and has an augmented second between degrees 6 and 7, which gives it a darker, more exotic color. Both share the tonic and the other degrees with the natural major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the notes of C harmonic major?</div>
      <div class="tm-faq-a">C harmonic major has the notes C-D-E-F-G-A♭-B. The only difference from C major is the A♭ in the sixth degree (C major has A).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is harmonic major the same as harmonic minor?</div>
      <div class="tm-faq-a">No. They share the lowered sixth, the leading tone and the augmented second, but harmonic major has a major third (C D E ...) and harmonic minor has a minor third (C D E♭ ...), so one sounds major and the other minor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is it called "mixed main" in Spanish conservatories?</div>
      <div class="tm-faq-a">Spanish conservatory teaching calls it "mixta principal" to tell it apart from the Mixolydian scale (lowered 7th) and from the "mixta secundaria", or melodic major scale (lowered 6th and 7th). The name shows that only one degree, the sixth, is altered, whereas the secondary one alters two.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
