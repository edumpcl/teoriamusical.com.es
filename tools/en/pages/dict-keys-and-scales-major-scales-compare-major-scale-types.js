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

const TYPES = [
  ['Mixolydian', [6], 'mixolidia'],
  ['harmonic major', [5], 'mixta-principal'],
  ['melodic major', [5, 6], 'mixta-secundaria'],
];
const allKeys = KEYS.map(([t]) => {
  const where = t === 'C' ? 'dentro' : 'armadura';
  return `<h3>${t} major</h3>\n\n${natFig(t)}\n${TYPES.map(([n, low, stem]) => fig(t, low, n, stem, where)).join('\n')}`;
}).join('\n\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/major-scales/compare-major-scale-types/',
  esPath: '/diccionario-musical/tonalidades/escalas-mayores/comparar-los-tipos-de-escalas-mayores/',
  title: 'Major Scale Types Compared: Mixolydian, Harmonic, Melodic',
  description: 'Compare four major scales: natural, Mixolydian, harmonic major and melodic major. Note-by-note table, interval patterns and staff examples in every key.',
  h1: 'Comparing the Types of Major Scales',
  crumbs: CRUMBS,
  articleAttrs: 'data-scale-compare="mayor"',
  scripts: ['tm-piano-audio'],
  body: `
<p>Besides the natural major scale, three variants are taught as "types" of major scale: <strong>Mixolydian</strong>, <strong>harmonic major</strong> and <strong>melodic major</strong>. All three start from the natural major scale and differ from it in only one or two degrees. (Spanish conservatory teaching calls the last two <em>mixta principal</em> and <em>mixta secundaria</em>, "main" and "secondary" mixed major scales.) Being able to tell them apart at a glance is essential for <a href="/ejercicios/escalas/">scale exercises</a> and for modal harmony. The natural major scale is the reference, and the others are changes to it.</p>

<h2 id="comparison-table">Comparison table</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>Altered degrees</th><th>Example on C</th><th>Other names</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Natural major</strong></td><td>None</td><td>C D E F G A B</td><td>Ionian mode</td></tr>
    <tr><td><strong>Mixolydian</strong></td><td>7th lowered a half step (♭7)</td><td>C D E F G A B♭</td><td>Mixolydian mode, major with ♭7, "dominant scale"</td></tr>
    <tr><td><strong>Harmonic major</strong></td><td>6th lowered a half step (♭6)</td><td>C D E F G A♭ B</td><td>Ionian ♭6; Spanish "mixta principal"</td></tr>
    <tr><td><strong>Melodic major</strong></td><td>6th and 7th lowered a half step (♭6, ♭7)</td><td>C D E F G A♭ B♭</td><td>Mixolydian ♭6, Aeolian dominant; Spanish "mixta secundaria"</td></tr>
  </tbody>
</table>
</div>

<h2 id="interval-patterns">Interval patterns (W = whole step, H = half step, A2 = augmented second)</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>1–2</th><th>2–3</th><th>3–4</th><th>4–5</th><th>5–6</th><th>6–7</th><th>7–8</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Natural major</strong></td><td>W</td><td>W</td><td>H</td><td>W</td><td>W</td><td>W</td><td>H</td></tr>
    <tr><td><strong>Mixolydian</strong></td><td>W</td><td>W</td><td>H</td><td>W</td><td>W</td><td>H</td><td>W</td></tr>
    <tr><td><strong>Harmonic major</strong></td><td>W</td><td>W</td><td>H</td><td>W</td><td>H</td><td>A2</td><td>H</td></tr>
    <tr><td><strong>Melodic major</strong></td><td>W</td><td>W</td><td>H</td><td>W</td><td>H</td><td>W</td><td>W</td></tr>
  </tbody>
</table>
</div>

<p>Harmonic major has an <strong>augmented second</strong> (3 half steps) between the 6th and 7th degrees, because only the sixth is lowered. This gives it an exotic sound similar to the harmonic minor scale. Melodic major avoids that leap by lowering the seventh as well. Its upper half (G A♭ B♭ C in C) is the same as the upper half of C natural minor and of descending C melodic minor, while its lower half (C D E F) is major. In other words, it is the mirror image of ascending melodic minor, which has a minor lower half and a major upper half.</p>

<p>Each type has its own page with a table of all 15 keys: <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixolidias/">Mixolydian scales</a> and <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixtas-principales/">harmonic major scales</a>.</p>

<p>The examples below show the staff for the <strong>4 types</strong> (natural major, Mixolydian, harmonic major and melodic major) in every major key. The changed notes are marked in red.</p>

<h2 id="every-major-key">Every major key in its 4 types</h2>

${allKeys}

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why compare the types of major scales?</div>
      <div class="tm-faq-a">Comparing the four types lets you see which notes change from one to the next. The natural major scale is the reference: Mixolydian lowers the 7th degree, harmonic major lowers the 6th, and melodic major lowers both the 6th and the 7th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of major scale are there?</div>
      <div class="tm-faq-a">Four are usually studied together: the natural major scale, the Mixolydian scale, the harmonic major scale and the melodic major scale. Many more scales can be derived from the major scale, but these differ from it by only one or two degrees.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between harmonic major and melodic major?</div>
      <div class="tm-faq-a">Harmonic major lowers only the sixth degree, while melodic major lowers both the sixth and the seventh. Both are built from the natural major scale. Harmonic major keeps the leading tone and has an augmented second; melodic major has no leading tone and no augmented second.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What music uses the Mixolydian scale?</div>
      <div class="tm-faq-a">The Mixolydian scale is very common in jazz, blues, rock and folk music, including Celtic folk. Lowering the seventh degree adds a characteristic tension without losing the major character. It is often used over dominant seventh chords: C Mixolydian fits a C7 chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the melodic major scale built?</div>
      <div class="tm-faq-a">Lower the sixth and seventh degrees of the natural major scale by a half step. For example, C melodic major is C-D-E-F-G-A♭-B♭. Its lower half is major and its upper half is minor, and it is the fifth mode of the F melodic minor scale. In jazz it is also called the Mixolydian ♭6 or Aeolian dominant scale.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
