const dictionaryPage = require('../dictionary-page');
const img = (f, w, alt) => `<img src="/assets/img/digitaciones/pentagramas/${f}.svg" width="${w}" height="78" alt="${alt}" loading="lazy" decoding="async">`;
const row = (h, a, b, small) => `<tr><th scope="row">${h}</th>` + [a, b].map(([f, w, n], i) =>
  `<td class="tm-dg-corneta">${img(f, w, n + ' on the treble staff')}<strong>${n}</strong>${small ? '<small>flat</small>' : ''}</td>`).join('') + '</tr>';
const ROWS = [
  ['3rd', ['solc-g4', 88, 'G4'], ['solc-af4', 94, 'A♭4']],
  ['4th', ['solc-c5', 88, 'C5'], ['solc-df5', 94, 'D♭5']],
  ['5th', ['solc-e5', 88, 'E5'], ['solc-f5', 88, 'F5']],
  ['6th', ['solc-g5', 88, 'G5'], ['solc-af5', 95, 'A♭5']],
  ['7th', ['solc-bf5', 95, 'B♭5'], ['solc-cf6', 95, 'C♭6'], true],
  ['8th', ['solc-c6', 88, 'C6'], ['solc-df6', 95, 'D♭6']],
  ['9th', ['solc-d6', 88, 'D6'], ['solc-ef6', 95, 'E♭6']],
  ['10th', ['solc-e6', 88, 'E6'], ['solc-f6', 88, 'F6']],
].map(r => row(r[0], r[1], r[2], r[3])).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/cornet-notes/',
  esPath: '/diccionario-musical/notas-de-la-corneta/',
  title: 'Cornet Notes: Spanish Corneta Range and Harmonics',
  description: 'Which notes the Spanish corneta (bugle-type brass) can play: the two harmonic series switched by the palometa, its G4–F6 range and the cornet types.',
  h1: 'Cornet Notes: The Spanish Corneta',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  body: `
<p>The <strong>corneta</strong> is a <a href="/diccionario-musical/instrumentos-de-viento-metal/">brass instrument</a> with a very Spanish life: <strong>Holy Week</strong> processions and the <strong>military</strong>. It has a trait almost no other instrument has: <strong>it cannot play every note</strong>. It has no holes and none of the three valves of the trumpet, so it plays only the notes of the <a href="/diccionario-musical/serie-armonica/">harmonic series</a>, <em>doubled</em> thanks to a part called the <strong>palometa</strong>. This page shows exactly which notes it plays, why those and no others, and why that explains the sound of Spanish processional marches.</p>

<div class="tm-callout">
<p><strong>A note on the name.</strong> The Spanish <em>corneta</em> on this page is a bugle-type instrument (conical bore, military calls, drum-and-bugle bands). It is <strong>not</strong> the English <em>cornet</em>, which Spanish players call <em>cornetín</em>: a three-valve B♭ brass instrument fingered like the trumpet. If you are looking for the three-valve cornet, there is a short summary <a href="#cornet-vs-corneta">below</a>.</p>
</div>

<figure style="margin:18px auto;max-width:330px;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/corneta/instrumento.webp"><img src="/assets/img/corneta/instrumento.jpg" width="651" height="649" loading="lazy" alt="Spanish corneta with a palometa: bell at the lower right, tuning slide above and the palometa with its extra loop (bomba) in the center" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A corneta with a palometa. The <strong>palometa</strong> is in the center and, just above it, the loop of tubing called the <strong>bomba</strong>. Photo by <a href="https://commons.wikimedia.org/wiki/File:Corneta_DO-RE.jpg" rel="nofollow">123yo123</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The corneta at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Brass (conical tube)</td></tr>
<tr><th scope="row">Pitch</th><td>C/D♭ (the one used in drum-and-bugle bands); also C/B♭</td></tr>
<tr><th scope="row">Mechanism</th><td>A key or lever, the <strong>palometa</strong> (models with 1, 2 or 3 valves also exist)</td></tr>
<tr><th scope="row">Notes it plays</th><td>Harmonics only: those of C and those of D♭, depending on the palometa</td></tr>
<tr><th scope="row">Range</th><td>G4–F6 (C/D♭ corneta, sounding pitch)</td></tr>
<tr><th scope="row">Transposition</th><td>None: written in treble clef, as it sounds</td></tr>
<tr><th scope="row">Keys it favors</th><td>F minor, A♭ major, C minor and E♭ major</td></tr>
<tr><th scope="row">Also called</th><td>Holy Week corneta · signal corneta (military)</td></tr>
</tbody>
</table></div>

<h2 id="cornet-vs-corneta">Corneta, cornet (cornetín) or trumpet?</h2>

<p>In Spanish the word <em>corneta</em> covers different things, and the English words do not line up with it:</p>

<ul>
  <li><strong>The corneta</strong> (this page) is the instrument of the <strong>drum-and-bugle bands</strong> and military calls: <strong>conical</strong> tube, dark and penetrating sound, and a <strong>palometa</strong> or a few valves. Its nearest English relative is the bugle.</li>
  <li><strong>The cornet</strong> (Spanish <em>cornetín</em>) is a <strong>three-valve B♭</strong> brass instrument of the wind band and the brass band. It plays every note, is fingered like the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a> and has a mellow tone, a close cousin of the <a href="/diccionario-musical/notas-del-fliscorno/">flugelhorn</a>. Like the B♭ trumpet, it is a transposing instrument: it sounds a major 2nd (whole step, UK: tone) lower than written.</li>
  <li><strong>The trumpet</strong> has a <strong>cylindrical</strong> tube: brighter and more direct.</li>
</ul>

<p>In short: if you want three-valve fingerings, go to the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a> page. If you want to know why a corneta plays only a few notes, keep reading.</p>

<h2>Why the corneta plays only a few notes</h2>

<p>On any brass instrument the sound starts with the <strong>lips</strong> vibrating in the mouthpiece, and with a <strong>fixed tube length</strong> only the notes of that tube's <a href="/diccionario-musical/serie-armonica/">harmonic series</a> can be produced. The trumpet fills the gaps between harmonics with three valves that lengthen the tube; the corneta <strong>has none</strong>. A saying sums it up: <em>"the corneta has the register it has, and we cannot go beyond it."</em></p>

<p>It has few parts, and all of them matter:</p>

<ul>
  <li><strong>The mouthpiece</strong>, where the lips vibrate.</li>
  <li><strong>The tudel</strong> (mouthpipe and tuning slide), the tube the air enters. Pull it out to lower the pitch, push it in to raise it.</li>
  <li><strong>The palometa</strong> (the key), the mechanism that changes everything.</li>
  <li><strong>The bell</strong>, which amplifies the sound at the end.</li>
</ul>

<h2>The palometa: two instruments in one</h2>

<p>The <strong>palometa</strong> is a key that sends the air one way or another through the instrument. That is the whole trick of the corneta:</p>

<ul>
  <li><strong>In the "C" position</strong>, the air runs through the full tube, including the <strong>bomba</strong>, and the instrument sounds the <strong>harmonics of C</strong>.</li>
  <li><strong>Turned</strong>, the air skips the <strong>bomba</strong>, the tube is shorter and the instrument sounds the <strong>harmonics of D♭</strong> (on the C/D♭ corneta, the most common). The D♭ series is a half step (UK: semitone) higher, which is why that position uses the shorter tube.</li>
</ul>

<p>It is the same idea as the thumb valve of the <a href="/diccionario-musical/notas-de-la-trompa/">double horn</a>: two instruments in one, switched with a single gesture. That is why the palometa is also called the <strong>transposer</strong> (<em>transpositor</em>).</p>

<p>The important point: the palometa <strong>does not add a note</strong>. It <strong>shifts the whole series</strong> by a half step. Turning it does not give you one extra pitch: it changes all the notes available at once.</p>

<!-- TODO-IMG: /assets/img/corneta/palometa-dos-posiciones.png (and .webp): photo of the two palometa positions with Spanish labels ("Palometa en do", "Palometa girada", "Suenan los armónicos de Do"). It needs an English version. Note: the Spanish image and text say that in the turned position the air goes through the extra loop (bomba), which lengthens the tube, and that this gives the D♭ series. That is physically impossible: a longer tube gives a LOWER series. -->

<h2>The notes of the C/D♭ corneta</h2>

<p>These are the sounding notes of each palometa position. The ordinal is the <strong>harmonic number</strong> in each series:</p>

<div class="tm-table-wrap">
<table class="tm-table tm-digitaciones">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The 16 notes of the C/D♭ corneta, with their staff notation</caption>
<thead><tr><th scope="col">Harmonic</th><th scope="col">Palometa in C<small>C series</small></th><th scope="col">Palometa turned<small>D♭ series</small></th></tr></thead>
<tbody>
${ROWS}
</tbody></table></div>
<p class="tm-nota-tabla">The notes of the two series <strong>alternate</strong>: each one is a half step from the other. The <strong>7th harmonic</strong> sounds naturally low (flat) and is hardly used. The corneta is written in treble clef and does not transpose.</p>

<p>In total the range is <strong>G4 to F6</strong>, from the G on the second line of the treble staff (UK: stave) to a very high F, in <a href="/diccionario-musical/indice-acustico/">scientific pitch notation</a> (C4 is middle C). The <strong>7th harmonic</strong> is flat by about <strong>31 cents</strong> compared with the B♭ of the piano, almost a third of a half step, so it is unusable against a tempered instrument. That is not the player's fault: it is the <a href="/diccionario-musical/serie-armonica/">physics of the harmonic series</a>, and the same happens on the trumpet and the horn. Below the 3rd harmonic are the <strong>pedal</strong> C and D♭ (the fundamental of the tube, a C3 of about 131 Hz). They exist, but they are poor and hardly used.</p>

<h3>The corneta has no fingering chart</h3>

<p>On a palometa corneta there are no fingerings: you only choose one of the <strong>two palometa positions</strong> and the <strong>harmonic</strong> you set with your lips. (The Spanish page has an interactive diagram that shows, for each note, its harmonic and the palometa position. It is not available in English yet.)</p>

<h2>Why Holy Week marches sound like F minor</h2>

<p>Put the two columns of the table together and look at the notes:</p>

<p style="text-align:center;font-size:1.15rem;letter-spacing:.05em"><strong>C · D♭ · D · E♭ · E♮ · F · G · A♭ · B♭</strong></p>

<p>That is not an arbitrary collection: it is almost exactly the <strong>F natural and harmonic minor</strong> scales put together, with their four flats and the E natural as leading tone (plus a D, which is not in either scale). The C/D♭ corneta does not "choose" to play in F minor: <strong>it is the only thing it can play</strong>. The same notes also give the main chords and melodies of <strong>A♭ major</strong>, <strong>C minor</strong> and <strong>E♭ major</strong>.</p>

<p>That is why the Holy Week repertoire lives in those four keys, and why processional marches have that unmistakable color: <strong>it is not an aesthetic decision, it is the instrument</strong>. A composer writing for a drum-and-bugle band writes inside what the palometa allows.</p>

<h2>Types of corneta</h2>

<blockquote style="border-left:3px solid #b8860b;background:#fdfcf9;padding:10px 14px;margin:16px 0;font-size:.95rem">Everything above describes the <strong>C/D♭ palometa corneta</strong>, the most common in Spain. If yours has <strong>valves</strong>, you are not limited to the harmonics: the valves fill the gaps between them, and the more valves, the more notes.</blockquote>

<p>There is not just one corneta. The two big families are the <strong>palometa (key)</strong> models and the <strong>valve</strong> models:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Type</th><th>Mechanism</th><th>Range</th><th>Where it is used</th></tr></thead>
<tbody>
<tr><td><strong>C/D♭ corneta</strong></td><td>Palometa</td><td>G4–F6</td><td>The most common in drum-and-bugle bands</td></tr>
<tr><td><strong>Bright C/D♭</strong></td><td>Palometa</td><td>A half step higher</td><td>Some bands (the other instruments must transpose)</td></tr>
<tr><td><strong>C/B♭ corneta</strong></td><td>Palometa</td><td>Lowest note F4</td><td>Music groups and bands, depending on the repertoire</td></tr>
<tr><td><strong>One valve</strong></td><td>1 valve</td><td>Depends on the model (C/D♭ or C/B♭)</td><td>Bands and music groups</td></tr>
<tr><td><strong>Two valves</strong></td><td>2 valves</td><td>Reaches below the G4</td><td>Bands and music groups</td></tr>
<tr><td><strong>Three valves</strong></td><td>3 valves</td><td>The widest of all</td><td>The most versatile; close to the cornet</td></tr>
</tbody>
</table></div>

<p>The more valves, the more notes: the three-valve model already fills the gaps between harmonics and has the widest range. The <strong>C/B♭ corneta</strong>, with its palometa, combines the series of C and of B♭, a different color from the C/D♭ model, and starts sounding from F4.</p>

<h2>Its role in the drum-and-bugle band</h2>

<p>In a drum-and-bugle band (<em>banda de cornetas y tambores</em>) the C/D♭ cornetas <strong>carry the main melody</strong> (the first voice) and the others provide the <strong>harmonic accompaniment</strong>; depending on the piece there are three or more voices. When the corneta is used inside a <strong>music group</strong> that also has trumpets, the roles reverse: the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a> carries the main voice and the corneta <strong>reinforces the melody</strong>, sounding higher and brighter in some passages, and supports the harmony.</p>

<h2>A little history</h2>

<p>The corneta began as a <strong>military instrument</strong>: a simple tube with no mechanism, used to send <strong>orders</strong> at a distance. With its few notes, dozens of <strong>calls</strong> were coded: march, halt, quicken the pace, salute the anthem, taps. Having few notes was not a defect, it was the point: a call had to be recognized from far away without doubt.</p>

<p>From the military world it passed to the <strong>drum-and-bugle bands</strong> of Holy Week, and something curious happened: its limited set of notes, far from being a problem, <strong>ended up defining a musical style of its own</strong>, that of processional marches. Once again: it is not an aesthetic decision, it is the instrument.</p>

<h2>Common mistakes with corneta notes</h2>

<ul>
  <li><strong>Looking for corneta fingerings.</strong> On a palometa corneta there are none: only <strong>two positions</strong> and the harmonic you set with your lips. If you want valve combinations, you want the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a> or the cornet.</li>
  <li><strong>Thinking the corneta is "out of tune".</strong> The 7th harmonic is flat <em>because of physics</em>, not because of you. It is the harmonic series, the same on every brass instrument.</li>
  <li><strong>Mixing it up with the trumpet.</strong> They are different instruments: the corneta is conical with a palometa; the trumpet is cylindrical with three valves.</li>
  <li><strong>Forcing notes outside the register.</strong> The pedal notes exist but sound poor; the instrument "has the register it has".</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The corneta is a <strong>conical</strong> brass instrument with no valves (or very few): it can play only the <strong>harmonics</strong> of its tube.</li>
  <li>The <strong>palometa</strong> switches between two series: <strong>C</strong> and <strong>D♭</strong>. Two instruments in one.</li>
  <li>The <strong>C/D♭</strong> corneta, the most common in drum-and-bugle bands, covers <strong>G4 to F6</strong>.</li>
  <li>The two series together give the notes of <strong>F minor</strong> (and of A♭ major, C minor and E♭ major): <strong>that is why Holy Week marches are in those keys</strong>.</li>
  <li>The <strong>corneta</strong> is not the English <strong>cornet</strong> (three valves in B♭, like the trumpet) and it is not the trumpet.</li>
</ul>

<p style="font-size:.9rem;color:#686868;border-top:1px solid #e8e0cc;padding-top:12px;margin-top:26px">The harmonics of each series were checked by calculation.</p>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Spanish</dt><dd>corneta</dd></div>
    <div class="tm-nombres-par"><dt>Italian</dt><dd>cornetta</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>bugle (nearest to the corneta); cornet = the three-valve cornetín</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Kornett</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>cornet (à pistons)</dd></div>
    <div class="tm-nombres-par"><dt>Abbreviation</dt><dd>Cnt.</dd></div>
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
      <div class="tm-faq-q">Which notes can a corneta play?</div>
      <div class="tm-faq-a">Only the notes of the harmonic series of its tube, because it has no holes and none of the trumpet's three valves. The palometa gives it two series: in the C position the harmonics of C (G4, C5, E5, G5, C6, D6, E6) and, turned, those of D♭ (A♭4, D♭5, F5, A♭5, D♭6, E♭6, F6). In total the range is G4 to F6 on the C/D♭ corneta, the most common in drum-and-bugle bands.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the palometa of the corneta?</div>
      <div class="tm-faq-a">It is the key that sends the air through one path or another inside the instrument. In the C position the air runs through the full tube, with the bomba, and the corneta sounds the harmonics of C; turned, the air skips the bomba, the tube is shorter and it sounds the harmonics of D♭, a half step higher. It is also called the transposer. It is the same idea as the thumb valve of the double horn: two instruments in one.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are Holy Week marches in F minor?</div>
      <div class="tm-faq-a">Because that is what the corneta can play. Putting the two harmonic series of a C/D♭ corneta together gives the notes C, D♭, D, E♭, E natural, F, G, A♭ and B♭: almost exactly the F natural and harmonic minor scales together, with their four flats. The same material also gives A♭ major, C minor and E♭ major. It is not an aesthetic choice by the composer, it is the instrument.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the corneta the same as the cornet or the trumpet?</div>
      <div class="tm-faq-a">No. The Spanish corneta has a conical tube, a palometa or a few valves, and belongs to drum-and-bugle bands and military calls. The English cornet (Spanish cornetín) is a three-valve B♭ brass instrument fingered like the trumpet, with a mellow sound like the flugelhorn. The trumpet has a cylindrical tube, a brighter sound and plays every note.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
