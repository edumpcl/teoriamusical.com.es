const dictionaryPage = require('../dictionary-page');

// Fretboard table (6 strings x 12 frets), generated so every note is computed, not typed.
const NAMES = [['C'], ['C♯', 'D♭'], ['D'], ['D♯', 'E♭'], ['E'], ['F'], ['F♯', 'G♭'], ['G'], ['G♯', 'A♭'], ['A'], ['A♯', 'B♭'], ['B']];
const name = (midi, withAlt) => {
  const [a, b] = NAMES[midi % 12];
  const oct = Math.floor(midi / 12) - 1;
  return a + oct + (withAlt && b ? `<small>${b}${oct}</small>` : '');
};
const STRINGS = [['6th', 40], ['5th', 45], ['4th', 50], ['3rd', 55], ['2nd', 59], ['1st', 64]];
const MARKED = [3, 5, 7, 9, 12];
const head = ['<th scope="col">String</th><th scope="col">Open</th>']
  .concat(Array.from({ length: 12 }, (_, i) => {
    const f = i + 1;
    return `<th scope="col"${f === 12 ? ' class="tm-trastes-oct"' : ''}>${f}${MARKED.includes(f) ? ' ·' : ''}</th>`;
  })).join('\n');
const rows = STRINGS.map(([s, open]) => {
  const cells = Array.from({ length: 13 }, (_, f) => `<td${f === 12 ? ' class="tm-trastes-oct"' : ''}>${name(open + f, f > 0)}</td>`).join('\n');
  return `<tr><th scope="row">${s} <span class="tm-trastes-aire">(${name(open)})</span></th>\n${cells}\n</tr>`;
}).join('\n');
const TABLE = `<div class="tm-table-wrap">
<table class="tm-table tm-trastes">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">Every note on the guitar: 6 strings × 12 frets</caption>
<thead><tr>${head}</tr></thead><tbody>
${rows}
</tbody></table></div>`;

const STR2 = [['6th', 'E2', 6], ['5th', 'A2', 5], ['4th', 'D3', 4], ['3rd', 'G3', 3.2], ['2nd', 'B3', 2.4], ['1st', 'E4', 1.6]]
  .map(([n, nt, w], i) => { const y = 28 + 36 * i; return `<text x="16" y="${y + 5}" font-family="Arial" font-size="15" font-weight="bold" fill="#8b6914">${n}</text><text x="62" y="${y + 5}" font-family="Arial" font-size="15" fill="#1a1a1a">${nt}</text><line x1="104" y1="${y}" x2="456" y2="${y}" stroke="#6b5010" stroke-width="${w}" stroke-linecap="round"/>`; })
  .join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/guitar-notes/',
  esPath: '/diccionario-musical/notas-de-la-guitarra/',
  title: 'Guitar Notes: Fretboard Chart and Open Strings',
  description: 'All guitar notes: the six open strings (E2 A2 D3 G3 B3 E4), a 6-string by 12-fret chart, how frets work, tab and why it sounds an octave lower.',
  h1: 'Guitar Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  body: `
<p>The <strong>guitar</strong> is probably the instrument most people start music with. And it has a big advantage for learning where each note is: unlike the <a href="/diccionario-musical/notas-del-violin/">violin</a>, it <strong>has frets</strong>, so each note sits in a definite place and does not depend on your ear. Here is the <strong>complete chart of the six strings across the first twelve frets</strong>, how frets work, why the same note appears in several places, and how <strong>tablature</strong> works. It helps whether you read standard notation or not.</p>

<figure style="margin:18px auto;max-width:440px;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/guitarra/instrumento.webp"><img src="/assets/img/guitarra/instrumento.jpg" width="3545" height="1291" loading="lazy" alt="A classical guitar lying horizontally: the headstock on the left, the fretted neck, and the sound hole and body on the right" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A classical guitar. Photo by <a href="https://commons.wikimedia.org/wiki/File:Gitara_klasyczna_C30M_firmy_Yamaha.jpg" rel="nofollow">muzyczny.pl</a>, CC BY-SA 4.0, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The guitar at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Plucked string (with the fingers or a pick)</td></tr>
<tr><th scope="row">Open strings</th><td>E2 · A2 · D3 · G3 · B3 · E4 (6th to 1st)</td></tr>
<tr><th scope="row">Tuning</th><td>In <strong>perfect 4ths</strong>, with a <strong>major 3rd</strong> between the 3rd and 2nd strings</td></tr>
<tr><th scope="row">Transposition</th><td>Sounds an <strong>octave lower</strong> than written</td></tr>
<tr><th scope="row">Range (sounding)</th><td>E2 to E5 with 12 frets (B5 with 19 frets, as on a classical guitar; E6 with 24)</td></tr>
<tr><th scope="row">Mechanism</th><td><strong>Frets</strong>: each fret raises the pitch by a half step (UK: semitone)</td></tr>
<tr><th scope="row">Clef</th><td>Treble, with an 8 below (octave treble clef)</td></tr>
</tbody>
</table></div>

<h2>The six strings: E, A, D, G, B, E</h2>

<p>A guitar has <strong>six strings</strong>, and these six "open" notes (with no fret pressed) are the basis of everything else. They are numbered <strong>the opposite way from what you might expect</strong>: the <strong>1st</strong> string is the thinnest and highest (the one nearest the floor as you play), and the <strong>6th</strong> is the thickest and lowest (nearest your face).</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>String</th><th>Note</th><th>Frequency</th><th>Sound</th></tr></thead>
<tbody>
<tr><td>6th (thickest)</td><td><strong>E2</strong></td><td>82.4 Hz</td><td>Low, full-bodied</td></tr>
<tr><td>5th</td><td><strong>A2</strong></td><td>110 Hz</td><td>Low, round</td></tr>
<tr><td>4th</td><td><strong>D3</strong></td><td>146.8 Hz</td><td>Medium, warm</td></tr>
<tr><td>3rd</td><td><strong>G3</strong></td><td>196 Hz</td><td>Medium</td></tr>
<tr><td>2nd</td><td><strong>B3</strong></td><td>246.9 Hz</td><td>Medium-high</td></tr>
<tr><td>1st (thinnest)</td><td><strong>E4</strong></td><td>329.6 Hz</td><td>Bright, singing</td></tr>
</tbody>
</table></div>

<figure style="margin:16px auto;max-width:470px;text-align:center;">
<svg viewBox="0 0 470 236" role="img" aria-label="The six open strings of the guitar, from the 6th (low E, top) to the 1st (high E, bottom). The thicker the string, the lower the note." style="width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fdfcf9">
${STR2}
</svg>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">The six open strings as you see them when playing: the 6th (low E, the thickest) at the top and the 1st (high E, the thinnest) at the bottom. The thicker the string, the lower it sounds.</figcaption>
</figure>

<p>Notice that the <strong>6th and 1st strings are both E</strong>, two octaves apart. Between one string and the next there is a <strong>perfect 4th</strong>, with one exception: between the <strong>3rd (G) and the 2nd (B)</strong> there is a <strong>major 3rd</strong>. That odd "jump" is not a whim: it makes the most common chords fall comfortably under the hand.</p>

<p>A classic way to remember the strings from the 6th to the 1st is the phrase "<strong>E</strong>ddie <strong>A</strong>te <strong>D</strong>ynamite, <strong>G</strong>ood <strong>B</strong>ye <strong>E</strong>ddie" (E-A-D-G-B-E). To <strong>tune</strong> it, the easiest way is a <a href="/herramientas/afinador/guitarra/">guitar tuner</a> that gives you each string. By ear, pressing the <strong>5th fret</strong> of a string should sound the same as the next string open (except between the 3rd and 2nd strings, where the reference is the 4th fret, because of that major 3rd).</p>

<h2>How frets work: one half step each</h2>

<p>Here is the big difference from the violin. On the guitar the neck is divided by <strong>frets</strong> (the metal bars). When you press a string just behind a fret, you shorten the part that vibrates and the note goes <strong>up</strong>. It goes up in a very orderly way: <strong>each fret is one half step</strong>.</p>

<p>That turns the neck into a kind of ruler of notes. If the open 6th string is E2:</p>

<ul>
  <li>Fret 1 → F2 (one half step higher)</li>
  <li>Fret 2 → F♯2</li>
  <li>Fret 3 → G2</li>
  <li>… and so on, one half step per fret.</li>
</ul>

<p>Since an <strong>octave</strong> is twelve half steps, at <strong>fret 12</strong> you hear the same note as the open string, an octave higher. That is why fret 12 usually has a double marker: it is the point where the neck "repeats". After it, everything starts again.</p>

${TABLE}
<p class="tm-nota-tabla">Read it as the guitar in playing position: the <strong>6th string</strong> (the thickest and lowest) on top and the <strong>1st</strong> at the bottom. Each fret raises the pitch by a <strong>half step</strong>, so at <strong>fret 12</strong> the open-string note returns an octave higher, which is why that column is marked. The frets with a dot (3, 5, 7, 9 and 12) are the ones with markers on the neck; they help you find your place without looking. Sharp notes show their flat equivalent below: <strong>F♯ and G♭ are the same key</strong>, only the spelling changes. The numbers are the octave: the E2 of the 6th string sounds two octaves below the E4 of the 1st. Careful: this is what <em>sounds</em>; on the score the guitar is written an octave higher.</p>

<h3>The Spanish page has an interactive fretboard diagram</h3>

<p>The Spanish edition has an interactive diagram that shows any note on a real photo of the neck and on a drawn fretboard, writes it in tablature and on the staff, and plays it, from the open 6th string (E2) to fret 12 of the 1st string (E5). It is not available in English yet. Because <strong>one note lives in several places</strong> on the guitar, it lights up <strong>all of them</strong> at once. To tune, use the <a href="/herramientas/afinador/guitarra/">guitar tuner</a>.</p>

<h2>Tablature: playing the guitar without reading standard notation</h2>

<p>The guitar has its own notation system that needs no music reading: <strong>tablature</strong> (or "tab"). It is a direct drawing of the neck. There are <strong>six lines</strong>, one per string, but <strong>upside down compared with the staff</strong>: the <strong>top</strong> line is the 1st string (high E) and the <strong>bottom</strong> line is the 6th (low E).</p>

<pre style="font-family:'Courier New',monospace;font-size:1rem;line-height:1.5;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:12px 16px;overflow-x:auto">e │──0──│   ← 1st string (high E)
B │──1──│
G │──0──│
D │──2──│
A │──3──│
E │─────│   ← 6th string (low E, not played)</pre>

<p>The <strong>number</strong> written on a line says which <strong>fret</strong> to press on that string; a <strong>0</strong> means play it <strong>open</strong>. The example above is a C major chord. Tab tells you <strong>where to put your fingers</strong> but not the <strong>rhythm</strong>, so it is best read <strong>together with standard notation</strong>, which does show the note values.</p>

<h2>Why the same note is on several strings</h2>

<p>If you look at the chart you will see that almost any note appears <strong>in more than one place</strong>. <strong>E4</strong>, for example, can be played in three ways:</p>

<ul>
  <li>The <strong>1st string open</strong> (fret 0).</li>
  <li>The <strong>5th fret of the 2nd string</strong>.</li>
  <li>The <strong>9th fret of the 3rd string</strong>.</li>
</ul>

<p>It is the <strong>same pitch</strong>, the same note, and yet it <strong>does not sound exactly the same</strong>: open, the string vibrates freely and sounds <strong>brighter</strong> (but cannot take vibrato); pressed on a thicker string it sounds <strong>rounder and warmer</strong> and does allow vibrato. This happens because the six strings <strong>overlap</strong>: each starts on a different note, so their ranges cross again and again.</p>

<p>So <strong>which one does a guitarist use?</strong> There is no fixed answer. It depends on:</p>

<ul>
  <li>The <strong>chord</strong> or hand position: you choose the spot that is closest to what you play before and after.</li>
  <li>The <strong>phrasing</strong>: to connect a smooth melody it helps to stay on the same string; for a fast leap, change strings.</li>
  <li>The <strong>tone color</strong>: an open string "sings" differently from a fretted note, and sometimes that color is wanted (or avoided).</li>
  <li><strong>Comfort</strong>: in a fast passage the nearest fingering wins.</li>
</ul>

<p>That is why choosing where to play a note is not a whim: it is a <strong>musical and fingering decision</strong>. It is one of the things that confuses beginners most, and one of the reasons the guitar, though easy to start, has so much depth.</p>

<h2>Why the guitar "sounds lower" than it reads</h2>

<p>The guitar is an <strong>octave-transposing instrument</strong>. It is written in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>, but it <strong>sounds an octave lower</strong> than it appears on the page. That is why its clef often carries a small <strong>8 below</strong> (octave treble clef).</p>

<p>Why is it done this way? Because the guitar is a fairly <strong>low</strong> instrument: if it were written at its real pitch, a good part of its notes would fall far below the staff (UK: stave), full of awkward <strong>ledger lines</strong>. Writing everything an octave higher fits the music comfortably on the staff. It is the same reason why the open 1st string, which sounds E4, is <strong>written</strong> as E5.</p>

<h2>The guitar and the plucked-string family</h2>

<p>The guitar belongs to the <a href="/diccionario-musical/instrumentos-de-cuerda-pulsada/"><strong>plucked strings</strong></a>: instruments whose strings are not rubbed with a bow (as on the violin) but <strong>plucked</strong> with the fingers or a pick. It is a huge family spread all over the world: the <a href="/diccionario-musical/notas-del-bajo-electrico/"><strong>electric bass</strong></a> (four strings tuned like the four lowest strings of the guitar, but an octave lower), the <strong>electric guitar</strong>, the <strong>harp</strong>, the <strong>bandurria</strong> and the <strong>lute</strong> of Spanish folk ensembles, or the <a href="/diccionario-musical/notas-del-ukelele/"><strong>ukulele</strong></a>. They all share the idea of frets or open strings, each with its own tuning.</p>

<h2>What about the electric guitar?</h2>

<p>Good news: <strong>the notes are exactly the same</strong>. The electric guitar has <strong>six strings</strong> with the <strong>same standard tuning</strong> (E2-A2-D3-G3-B3-E4), the same half-step frets and the same tablature. Everything on this page (where each note falls, why it repeats on several strings, the octave transposition) applies <strong>just the same</strong> to the electric. What changes is not <em>where</em> the notes are but <em>how they sound</em>: instead of a resonating body, <strong>pickups</strong> sense the string's vibration and send it to an amplifier.</p>

<p>The few differences that do affect the notes are about <strong>reach</strong>, not about the system:</p>

<ul>
  <li><strong>More frets.</strong> Many electric guitars have <strong>22 or 24 frets</strong> (against about 19 on a classical guitar), so they reach <strong>higher</strong> notes on each string.</li>
  <li><strong>Alternate tunings.</strong> In rock and metal it is very common to <strong>lower</strong> the tuning: <em>Drop D</em> (the 6th string from E down to D), a half step down, a whole step down… They change the pitch of the open strings, but the logic of the neck stays the same.</li>
</ul>

<p>In other words: if you learn the notes on an acoustic or classical guitar, you already know the electric. The sound and the style change, not the map of the fretboard.</p>

<h2>Common mistakes when learning guitar notes</h2>

<ul>
  <li><strong>Numbering the strings backwards.</strong> The 1st is the thinnest (highest), not the thickest. The 6th is the thick (low) one.</li>
  <li><strong>Believing the guitar sounds as it reads.</strong> It sounds an octave below what is written; it is an octave-transposing instrument.</li>
  <li><strong>Thinking each note is in only one place.</strong> Almost all are in several, and they do not sound the same: the color and the comfort change.</li>
  <li><strong>Forgetting the "jump" between the 3rd and 2nd strings.</strong> There the tuning is a major 3rd, not a 4th; that is why when tuning by ear you use the 4th fret and not the 5th.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The guitar has <strong>six strings</strong> (E2, A2, D3, G3, B3, E4) tuned in <strong>4ths</strong>, with a <strong>major 3rd</strong> between the 3rd and 2nd strings.</li>
  <li>It <strong>has frets</strong>: each fret raises the pitch a <strong>half step</strong>, and at fret 12 the open-string note repeats an octave higher.</li>
  <li>You can read it in <strong>tablature</strong> (six lines, one number per fret) with no need for standard notation, or in <strong>standard notation</strong>.</li>
  <li>The <strong>same note</strong> appears in several places, and each one has its own color and fingering.</li>
  <li>It <strong>transposes</strong>: it is written in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a> but sounds an <strong>octave lower</strong>.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>chitarra</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>guitar</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Gitarre</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>guitare</dd></div>
    <div class="tm-nombres-par"><dt>Abbreviation</dt><dd>Gtr.</dd></div>
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
      <div class="tm-faq-q">What are the notes of the guitar strings?</div>
      <div class="tm-faq-a">From the 6th string (the thickest) to the 1st (the thinnest): E2, A2, D3, G3, B3 and E4. A phrase to remember them from the 6th to the 1st is "Eddie Ate Dynamite, Good Bye Eddie" (E-A-D-G-B-E). They are tuned in perfect 4ths, except between the 3rd and 2nd strings (G-B), where there is a major 3rd.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a fret and how does it work on the guitar?</div>
      <div class="tm-faq-a">A fret is one of the metal bars on the neck. When you press the string just behind a fret you shorten its vibrating length and raise the note. Each fret raises the pitch by exactly one half step: from fret 0 (open string) to fret 1 is one half step, from 1 to 2 another, and so on. Twelve frets make an octave, so at fret 12 you hear the same note as the open string, an octave higher.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is guitar tablature and how do you read it?</div>
      <div class="tm-faq-a">Tablature (or "tab") is a way of writing music specific to the guitar that needs no music reading. It has six lines, one per string: the top one is the 1st string (high E) and the bottom one the 6th (low E). The number written on a line says which fret to press on that string; a 0 means play it open. It shows where to put your fingers but not the rhythm, so it often goes with standard notation.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why can the same note be played in several places on the guitar?</div>
      <div class="tm-faq-a">Because the strings overlap. For example, E4 is the 1st string open, but also the 5th fret of the 2nd string and the 9th fret of the 3rd string. It is the same pitch, but it does not sound the same: open, the string is brighter and takes no vibrato; pressed on a thicker string it sounds rounder and warmer. Choosing where to play it is a decision about fingering and tone color.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the guitar sound as written?</div>
      <div class="tm-faq-a">No. The guitar is an octave-transposing instrument: it is written in treble clef but sounds an octave lower than it appears on the page. That is why its clef often carries a small 8 below (octave treble clef). It is done this way to avoid filling the score with ledger lines below the staff, since the guitar is a fairly low instrument.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you tune the guitar?</div>
      <div class="tm-faq-a">Standard tuning is, from the 6th to the 1st string, E2-A2-D3-G3-B3-E4. You can tune with a chromatic tuner string by string, or by ear: pressing the 5th fret of a string should sound the same as the next string open, except between the 3rd and 2nd strings, where the reference is the 4th fret. The 6th and 1st strings are both E, two octaves apart.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
