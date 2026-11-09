const dictionaryPage = require('../dictionary-page');

// [card id, key name, relative minor, svg file, svg width, kind, accidentals, enharmonic card id (optional)]
const KEYS = [
  ['c-major', 'C', 'A', 'do-mayor', 154, 0, [], null],
  ['g-major', 'G', 'E', 'sol-mayor', 176, 's', ['F♯'], null],
  ['d-major', 'D', 'B', 're-mayor', 189, 's', ['F♯', 'C♯'], null],
  ['a-major', 'A', 'F♯', 'la-mayor', 202, 's', ['F♯', 'C♯', 'G♯'], null],
  ['e-major', 'E', 'C♯', 'mi-mayor', 215, 's', ['F♯', 'C♯', 'G♯', 'D♯'], null],
  ['b-major', 'B', 'G♯', 'si-mayor', 228, 's', ['F♯', 'C♯', 'G♯', 'D♯', 'A♯'], 'c-flat-major'],
  ['f-sharp-major', 'F♯', 'D♯', 'fa-sostenido-mayor', 241, 's', ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯'], 'g-flat-major'],
  ['c-sharp-major', 'C♯', 'A♯', 'do-sostenido-mayor', 254, 's', ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯', 'B♯'], 'd-flat-major'],
  ['f-major', 'F', 'D', 'fa-mayor', 174, 'f', ['B♭'], null],
  ['b-flat-major', 'B♭', 'G', 'si-bemol-mayor', 186, 'f', ['B♭', 'E♭'], null],
  ['e-flat-major', 'E♭', 'C', 'mi-bemol-mayor', 197, 'f', ['B♭', 'E♭', 'A♭'], null],
  ['a-flat-major', 'A♭', 'F', 'la-bemol-mayor', 209, 'f', ['B♭', 'E♭', 'A♭', 'D♭'], null],
  ['d-flat-major', 'D♭', 'B♭', 're-bemol-mayor', 220, 'f', ['B♭', 'E♭', 'A♭', 'D♭', 'G♭'], 'c-sharp-major'],
  ['g-flat-major', 'G♭', 'E♭', 'sol-bemol-mayor', 232, 'f', ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'], 'f-sharp-major'],
  ['c-flat-major', 'C♭', 'A♭', 'do-bemol-mayor', 244, 'f', ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭'], 'b-major'],
];
const NUM = ['no', '1', '2', '3', '4', '5', '6', '7'];
const NAMES = {};
KEYS.forEach(k => { NAMES[k[0]] = k[1]; });
const list = a => a.length <= 1 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const SPELL = { 'E♯': ', which sounds like F natural', 'B♯': ', which sounds like C natural' };

function card([id, key, rel, svg, w, kind, acc, enh]) {
  const n = acc.length;
  const word = kind === 's' ? (n === 1 ? 'sharp' : 'sharps') : (n === 1 ? 'flat' : 'flats');
  const sym = kind === 's' ? '♯' : '♭';
  let intro, alt, last;
  if (n === 0) {
    intro = 'C major has no accidentals: every note is natural. It is the reference key, and it shares its key signature with its relative minor, <strong>A minor</strong>.';
    alt = 'C major key signature on the treble clef: no accidentals.';
    last = 'It is the only key with no sharps or flats, and it is the starting point for counting the accidentals of every other key.';
  } else {
    intro = `${key} major has <strong>${n} ${word}</strong>: ${list(acc)}. ${n === 7 ? `Every note is ${kind === 's' ? 'sharped' : 'flatted'}. ` : ''}It shares its key signature with its relative minor, <strong>${rel} minor</strong>.`;
    alt = `${key} major key signature on the treble clef: ${n} ${word} (${acc.join(', ')}).`;
    if (kind === 's') {
      const l = acc[n - 1];
      last = n === 1 ? 'The tonic, G, is a half step above the only sharp (F♯).'
        : `The tonic, ${key}, is a half step above the last sharp (${l}${SPELL[l] || ''}).`;
    } else if (n === 1) {
      last = 'This is the exception to the next-to-last-flat rule: with a single flat there is no next-to-last, so the key is always F major.';
    } else {
      last = `The tonic is the next-to-last flat of the key signature: ${key}.`;
    }
    if (enh) {
      const note = { 'b-major': '', 'f-sharp-major': '', 'c-sharp-major': ', but it is much less used in practice because D♭ major has fewer accidentals', 'd-flat-major': ', but it is used far more often because it has fewer accidentals', 'g-flat-major': '', 'c-flat-major': ', but it is much less used in practice because B major has fewer accidentals' }[id];
      last += ` ${key} major is enharmonic with <a href="#${enh}" class="tm-key-link">${NAMES[enh]} major</a>${note}.`;
    }
  }
  return `<div id="${id}" class="tm-key-card" data-vex="${key.replace('♯', '#').replace('♭', 'b')}" hidden>
  <h3>${key} major key signature</h3>
  <p>${intro}</p>
  <div class="tm-key-staff"><div class="tm-key-svg"><img src="/assets/img/armaduras/${svg}.svg" width="${w}" height="122" alt="${alt}" decoding="async"></div></div>
  <p>${last}</p>
</div>`;
}

const ROWS = [
  [7, 'F♯ C♯ G♯ D♯ A♯ E♯ B♯', 'c-sharp-major', 'C♯', 'A♯'],
  [6, 'F♯ C♯ G♯ D♯ A♯ E♯', 'f-sharp-major', 'F♯', 'D♯'],
  [5, 'F♯ C♯ G♯ D♯ A♯', 'b-major', 'B', 'G♯'],
  [4, 'F♯ C♯ G♯ D♯', 'e-major', 'E', 'C♯'],
  [3, 'F♯ C♯ G♯', 'a-major', 'A', 'F♯'],
  [2, 'F♯ C♯', 'd-major', 'D', 'B'],
  [1, 'F♯', 'g-major', 'G', 'E'],
].map(([n, o, id, mj, mn]) => `    <tr><td>${n} ♯</td><td>${o}</td><td><a href="#${id}" class="tm-key-link">${mj} major →</a></td><td><a href="#${id}" class="tm-key-link">${mn} minor →</a></td></tr>`)
  .concat([`    <tr><td><strong>0</strong></td><td>—</td><td><strong><a href="#c-major" class="tm-key-link">C major →</a></strong></td><td><strong><a href="#c-major" class="tm-key-link">A minor →</a></strong></td></tr>`])
  .concat([
    [1, 'B♭', 'f-major', 'F', 'D'],
    [2, 'B♭ E♭', 'b-flat-major', 'B♭', 'G'],
    [3, 'B♭ E♭ A♭', 'e-flat-major', 'E♭', 'C'],
    [4, 'B♭ E♭ A♭ D♭', 'a-flat-major', 'A♭', 'F'],
    [5, 'B♭ E♭ A♭ D♭ G♭', 'd-flat-major', 'D♭', 'B♭'],
    [6, 'B♭ E♭ A♭ D♭ G♭ C♭', 'g-flat-major', 'G♭', 'E♭'],
    [7, 'B♭ E♭ A♭ D♭ G♭ C♭ F♭', 'c-flat-major', 'C♭', 'A♭'],
  ].map(([n, o, id, mj, mn]) => `    <tr><td>${n} ♭</td><td>${o}</td><td><a href="#${id}" class="tm-key-link">${mj} major →</a></td><td><a href="#${id}" class="tm-key-link">${mn} minor →</a></td></tr>`))
  .join('\n');

const BUTTONS = KEYS.map(k => `  <button type="button" data-key="${k[0]}">${k[1]} major</button>`).join('\n');
const CARDS = KEYS.map(card).join('\n\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/keys-and-key-signatures/',
  esPath: '/diccionario-musical/tonalidades/tonalidades-y-armaduras/',
  title: 'Keys and Key Signatures: Chart and How to Read Them',
  description: 'Chart of all 15 major and minor key signatures, with the sharps rule (last sharp + half step) and flats rule (next-to-last flat) to name any key.',
  h1: 'Keys and Key Signatures',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Keys and Scales', '/diccionario-musical/tonalidades/']],
  scripts: ['armadura-tabla'],
  body: `
<p>A <strong>key signature</strong> is the set of sharps or flats written next to the clef at the start of every staff (UK: stave). Once you know the order in which those accidentals are added, you can name the key of any piece in seconds. It also works the other way around: given the name of a key, you can tell exactly which accidentals its key signature contains. This page builds on the <a href="/diccionario-musical/tonalidades/orden-de-los-sostenidos-y-bemoles/">order of sharps and flats in key signatures</a>.</p>

<p>A <strong>key</strong> is the home-base note (the <em>tonic</em>) together with the scale built on it. The key signature tells you which notes of that scale are sharp or flat, so you do not have to write the accidental every time. In this page, notes are named with letters (C D E F G A B). In Spanish-, French- and Italian-speaking countries the fixed-do names are used instead: C = Do, D = Re, E = Mi, F = Fa, G = Sol, A = La, B = Si.</p>

<h2 id="full-chart">Complete chart of keys and key signatures</h2>

<p>The chart below shows all 15 key signatures with their major and minor keys. Each major/minor pair shares exactly the same key signature: they are called <strong>relative keys</strong>.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Accidentals</th><th>Key signature (in order)</th><th>Major key</th><th>Minor key</th></tr>
  </thead>
  <tbody>
${ROWS}
  </tbody>
</table>
</div>

<p>F♯ major and G♭ major are enharmonic: they sound the same on the piano but are written differently. The same is true of C♯ major and D♭ major, and of B major and C♭ major.</p>

<p>The order of sharps (F♯ C♯ G♯ D♯ A♯ E♯ B♯) and the order of flats (B♭ E♭ A♭ D♭ G♭ C♭ F♭) are the same in every key and every clef position. A common memory aid for the sharps is "Father Charles Goes Down And Ends Battle", and for the flats you simply read the sharps backward: "Battle Ends And Down Goes Charles's Father".</p>

<h2 id="major-keys">Rules for major keys</h2>

<h3 id="major-sharps">Key signatures with sharps</h3>

<p>The major keys with sharps are, from fewest to most: G, D, A, E, B, F♯ and C♯. The only major key without sharps that is not C is <strong>F major</strong>, which has 1 flat.</p>

<p><strong>From the key signature to the key:</strong> the <strong>last sharp</strong> of the key signature, raised a half step (UK: semitone), is the tonic of the major key.</p>
<ul>
  <li>Key signature of 2 sharps (F♯, C♯): last sharp = C♯, a half step higher → <strong>D major</strong>.</li>
  <li>Key signature of 3 sharps (F♯, C♯, G♯): last sharp = G♯, a half step higher → <strong>A major</strong>.</li>
  <li>Key signature of 5 sharps (F♯, C♯, G♯, D♯, A♯): last sharp = A♯, a half step higher → <strong>B major</strong>.</li>
</ul>

<p><strong>From the name of the key to the key signature:</strong> the tonic lowered a half step is the last sharp of the key signature. Write all the sharps in order up to that one.</p>
<ul>
  <li>A major: tonic A, a half step lower → G♯ (the last sharp). Key signature: F♯, C♯, G♯ (3 sharps).</li>
  <li>E major: tonic E, a half step lower → D♯. Key signature: F♯, C♯, G♯, D♯ (4 sharps).</li>
</ul>

<h3 id="major-flats">Key signatures with flats</h3>

<p>The major keys with flats are: F, B♭, E♭, A♭, D♭, G♭ and C♭.</p>

<p><strong>From the key signature to the key:</strong> the <strong>next-to-last flat</strong> of the key signature is the tonic of the major key. Exception: with only 1 flat (B♭) the key is <strong>F major</strong>, because there is no next-to-last flat.</p>
<ul>
  <li>Key signature of 3 flats (B♭, E♭, A♭): next-to-last flat = E♭ → <strong>E♭ major</strong>.</li>
  <li>Key signature of 4 flats (B♭, E♭, A♭, D♭): next-to-last flat = A♭ → <strong>A♭ major</strong>.</li>
  <li>Key signature of 1 flat (B♭): exception → <strong>F major</strong>.</li>
</ul>

<p><strong>From the name of the key to the key signature:</strong> write the flats in order up to the flat that has the name of the key, then add one more at the end.</p>
<ul>
  <li>B♭ major: the name contains B♭ → B♭, plus one more → B♭, E♭ (2 flats).</li>
  <li>E♭ major: B♭, E♭, plus A♭ → 3 flats.</li>
</ul>

<h2 id="minor-keys">Rules for minor keys</h2>

<p>A minor key shares its key signature with its <strong>relative major</strong>. You find the relative major of any minor key by going up a minor third (3 half steps) from the tonic.</p>

<h3 id="minor-from-name">From the name of a minor key</h3>

<p>The tonic raised a minor third (3 half steps) is the tonic of the relative major. From there, apply the rules above for that major key.</p>
<ul>
  <li>B minor: a minor 3rd above B is D. The relative major is D major (2 sharps: F♯, C♯).</li>
  <li>G minor: a minor 3rd above G is B♭. The relative major is B♭ major (2 flats: B♭, E♭).</li>
</ul>

<h3 id="minor-from-signature">From a key signature to the minor key</h3>

<p>First identify the major key of that key signature using the rules above. Then go down a minor third (3 half steps) from its tonic: the result is the tonic of the relative minor.</p>
<ul>
  <li>Key signature of 3 sharps: the major key is A major. A minor 3rd below A is F♯, so the minor key is F♯ minor.</li>
  <li>Key signature of 2 flats: the major key is B♭ major. A minor 3rd below B♭ is G, so the minor key is G minor.</li>
</ul>

<p><strong>Shortcut for sharp keys:</strong> the tonic of the relative minor is a whole step (UK: tone) below the last sharp. With 3 sharps, the last sharp is G♯ and a whole step lower is F♯, so the minor key is F♯ minor.</p>

<h3 id="major-or-minor">Major or minor? Two keys, one key signature</h3>

<p>Every key signature belongs to two keys, so the signature alone does not settle which one a piece is in. Check the music itself: look at the first and last notes and chords, and watch for the leading tone. In a minor key the seventh degree is usually raised with an accidental (for example G♯ in A minor), which a major key with the same signature would never need.</p>

<p>The relationship between keys based on their key signatures is covered in <a href="/diccionario-musical/tonalidades/tonalidades-vecinas/">closely related keys</a>: two keys whose signatures differ by only one accidental are the closest to each other harmonically.</p>

<style>
  .tm-key-list{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0;}
  .tm-key-list button{border:1px solid #d8d0b8;background:#fff;border-radius:6px;padding:7px 13px;font:inherit;font-size:.85rem;font-weight:600;cursor:pointer;color:#514232;}
  .tm-key-list button:hover{border-color:#8b6914;}
  .tm-key-list button[aria-current="true"]{background:#8b6914;border-color:#8b6914;color:#fff;}
  .tm-key-card{background:#faf7f2;border:1px solid #e8e0cc;border-radius:12px;padding:22px 26px;margin:16px 0;}
  .tm-key-card[hidden]{display:none;}
  .tm-key-card h3{margin-top:0;}
  .tm-key-staff{display:flex;justify-content:center;margin:14px 0;}
</style>

<h2 id="each-key-in-detail">The key signature of each key, in detail</h2>
<p>Choose a key and its key signature is drawn right below, with its accidentals, its relative minor and the rule for recognizing it.</p>

<div class="tm-key-list" id="tm-key-selector">
${BUTTONS}
</div>

${CARDS}

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a key signature?</div>
      <div class="tm-faq-a">A key signature is the set of sharps or flats placed at the beginning of each staff, next to the clef. It shows which notes are altered throughout the whole piece, and it lets you identify the key without analyzing every note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you find the major key from a key signature with sharps?</div>
      <div class="tm-faq-a">Raise the last sharp of the key signature by a half step (a minor second). That note is the tonic of the major key. For example, if the last sharp is G♯, the major key is A major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you find the major key from a key signature with flats?</div>
      <div class="tm-faq-a">Take the next-to-last flat of the key signature: that note is the tonic of the major key. For example, with B♭, E♭ and A♭ (3 flats), the next-to-last is E♭, so the key is E♭ major. Exception: with one flat (B♭) the key is F major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you find the minor key from a key signature?</div>
      <div class="tm-faq-a">First identify the major key for that key signature, then go down a minor third. The note you reach is the tonic of the relative minor. For example, the relative minor of C major is A minor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can you tell whether a piece is in the major or the minor key of a key signature?</div>
      <div class="tm-faq-a">Look at where the music starts and ends and which chord feels like home. In the minor key the seventh degree is usually raised by an accidental (G♯ in A minor, for instance), while the major key with the same key signature does not need it.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many major keys are there?</div>
      <div class="tm-faq-a">There are 15 major keys with a key signature: 7 with sharps (G, D, A, E, B, F♯ and C♯ major), 7 with flats (F, B♭, E♭, A♭, D♭, G♭ and C♭ major) and C major with no accidentals. F♯ major and G♭ major are enharmonic, as are C♯ major and D♭ major, and B major and C♭ major.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
