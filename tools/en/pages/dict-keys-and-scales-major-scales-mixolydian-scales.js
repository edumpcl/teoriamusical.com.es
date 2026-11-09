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

const LOW = [6]; // 7th degree lowered
module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/major-scales/mixolydian-scales/',
  esPath: '/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixolidias/',
  title: 'Mixolydian Scale: Notes, Formula and All 15 Keys',
  description: 'The Mixolydian scale is a major scale with a lowered 7th. Formula, notes in all 15 keys, staff images, how it differs from major and where it is used.',
  h1: 'Mixolydian Scales',
  crumbs: CRUMBS,
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>Mixolydian scale</strong> is a variant of the <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/">natural major scale</a> with a single change: the seventh degree is lowered a half step (UK: semitone). That one alteration creates the characteristic modal sound of the fifth mode of the major scale, which is very common in jazz, blues, rock and folk music.</p>

<p>It is also called the <strong>Mixolydian mode</strong> and in major-scale teaching it is the <strong>major scale with a lowered 7th (♭7)</strong>. It is the <strong>5th of the <a href="/diccionario-musical/tonalidades/modos-griegos/">Greek modes</a></strong>. Its pattern of whole steps (W) and half steps (H) is <strong>W-W-H-W-W-H-W</strong>. Because it shares its notes with the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh chord</a>, it has the "dominant" color that is so typical of blues and rock.</p>

<p>In the Spanish conservatory scheme this scale is one of four "types" of major scale (natural, Mixolydian, "mixed main" = <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixtas-principales/">harmonic major</a>, and "mixed secondary" = melodic major). Outside that scheme it is simply the Mixolydian scale.</p>

<p>Start from the natural major scale:</p>

${natFig('C')}

<p>Lower the seventh degree by a half step and you get the Mixolydian scale:</p>

${fig('C', LOW, 'Mixolydian', 'mixolidia', 'dentro')}

<p>In the examples, the lowered note is shown in red to make it easy to spot. You do not need to mark it in exercises.</p>

<p>The scales are shown in two ways: with the accidentals written inside the scale, and with a key signature. Both are equivalent.</p>

<h2 id="interval-pattern">Interval pattern</h2>

<p>The pattern of <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps and half steps</a> of the Mixolydian scale is <strong>W–W–H–W–W–H–W</strong>. It is identical to the natural major scale except at the seventh degree. In the major scale the step from degree 7 up to the octave is a diatonic half step (the leading tone). In the Mixolydian scale it is a whole step, so the seventh is a subtonic (a "flat seventh") and the scale has no leading tone.</p>

<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr>
  </thead>
  <tbody>
    <tr><td>Step from previous note</td><td>—</td><td>W</td><td>W</td><td>H</td><td>W</td><td>W</td><td><strong>H</strong></td><td>W</td></tr>
    <tr><td>C Mixolydian</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>A</td><td><strong>B♭</strong></td><td>C</td></tr>
    <tr><td>C major</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>A</td><td>B</td><td>C</td></tr>
  </tbody>
</table></div>

<p>Thanks to this pattern, the Mixolydian scale is the same as the fifth mode of a major scale: C Mixolydian has the same notes as F major, starting from its fifth degree.</p>

<h2 id="table-mixolydian-scales">Table of all 15 Mixolydian scales</h2>
<div class="tm-table-wrap">
<table class="tm-table tm-scales" data-notes-cols="1-7" data-figures data-fig-match="mixolydian">
  <thead>
    <tr><th>Scale</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>♭7</th><th>Difference from the major scale</th></tr>
  </thead>
  <tbody>
${scaleRows(LOW, 'Mixolydian')}
  </tbody>
</table>
</div>

${figureSections(LOW, 'Mixolydian', 'mixolidia', 'Mixolydian scales')}

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Mixolydian scale?</div>
      <div class="tm-faq-a">The Mixolydian scale is a major scale with the seventh degree lowered a half step. It has a major triad and a dominant seventh chord on its tonic, which gives it a relaxed, bluesy sound that is less "resolved" than the major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How does the Mixolydian scale differ from the major scale?</div>
      <div class="tm-faq-a">The only difference is the seventh degree, which is lowered a half step in the Mixolydian scale. For example, C major has B natural, while C Mixolydian has B♭.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Mixolydian scale used for?</div>
      <div class="tm-faq-a">It is the fifth mode of the major scale and is used constantly in folk, rock, blues and jazz. A common use is over a dominant seventh chord: C Mixolydian fits a C7 chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the notes of C Mixolydian?</div>
      <div class="tm-faq-a">C Mixolydian has the notes C-D-E-F-G-A-B♭. The only difference from C major is the B♭ in the seventh degree (C major has B).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where does the name Mixolydian come from?</div>
      <div class="tm-faq-a">Mixolydian is the fifth mode of the major scale. Play the notes of C major starting on G (G-A-B-C-D-E-F) and you get G Mixolydian. The name comes from the Mixolydian mode of Greek and medieval modal theory, although the medieval mode is not the same scale as the ancient Greek one.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
