const dictionaryPage = require('../dictionary-page');

// [written note, file, width, enharmonic, valves, sounding note, sounding enharmonic]
const T = [
  ['F♯3', 'fs3', 96, 'G♭3', '111', 'E3'],
  ['G3', 'g3', 88, '', '101', 'F3'],
  ['G♯3', 'gs3', 96, 'A♭3', '011', 'F♯3', 'G♭3'],
  ['A3', 'a3', 88, '', '110', 'G3'],
  ['A♯3', 'as3', 96, 'B♭3', '100', 'G♯3', 'A♭3'],
  ['B3', 'b3', 88, '', '010', 'A3'],
  ['C4', 'c4', 88, '', '000', 'B♭3'],
  ['C♯4', 'cs4', 96, 'D♭4', '111', 'B3'],
  ['D4', 'd4', 88, '', '101', 'C4'],
  ['D♯4', 'ds4', 96, 'E♭4', '011', 'C♯4', 'D♭4'],
  ['E4', 'e4', 88, '', '110', 'D4'],
  ['F4', 'f4', 88, '', '100', 'D♯4', 'E♭4'],
  ['F♯4', 'fs4', 96, 'G♭4', '010', 'E4'],
  ['G4', 'g4', 88, '', '000', 'F4'],
  ['G♯4', 'gs4', 96, 'A♭4', '011', 'F♯4', 'G♭4'],
  ['A4', 'a4', 88, '', '110', 'G4'],
  ['A♯4', 'as4', 96, 'B♭4', '100', 'G♯4', 'A♭4'],
  ['B4', 'b4', 88, '', '010', 'A4'],
  ['C5', 'c5', 88, '', '000', 'B♭4'],
  ['C♯5', 'cs5', 96, 'D♭5', '110', 'B4'],
  ['D5', 'd5', 88, '', '100', 'C5'],
  ['D♯5', 'ds5', 96, 'E♭5', '010', 'C♯5', 'D♭5'],
  ['E5', 'e5', 88, '', '000', 'D5'],
  ['F5', 'f5', 88, '', '100', 'D♯5', 'E♭5'],
  ['F♯5', 'fs5', 96, 'G♭5', '010', 'E5'],
  ['G5', 'g5', 88, '', '000', 'F5'],
  ['G♯5', 'gs5', 96, 'A♭5', '011', 'F♯5', 'G♭5'],
  ['A5', 'a5', 88, '', '110', 'G5'],
  ['A♯5', 'as5', 96, 'B♭5', '100', 'G♯5', 'A♭5'],
  ['B5', 'b5', 88, '', '010', 'A5'],
  ['C6', 'c6', 88, '', '000', 'B♭5'],
];
const hid = t => `<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">${t}</span>`;
const ordn = ['1st', '2nd', '3rd'];
const rows = T.map(([n, f, w, en, v, s, se]) => {
  const on = [0, 1, 2].filter(i => v[i] === '1');
  const dots = [0, 1, 2].map(i => v[i] === '1' ? '<b class="tm-dg-on">●</b>' : '<span class="tm-dg-off">○</span>').join('');
  const label = on.length === 0 ? 'open (no valves)' : on.map(i => ordn[i]).join(' and ') + (on.length === 1 ? ' valve' : ' valves');
  const small = x => x ? `<small>${x}</small>` : '';
  return `<tr><th scope="row">${n}${small(en)}</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/sol-${f}.svg" width="${w}" height="75" alt="${n} in treble clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib">${dots}${hid(label)}</td><td class="tm-dg-suena">${s}${small(se)}</td></tr>`;
}).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/flugelhorn-notes/',
  esPath: '/diccionario-musical/notas-del-fliscorno/',
  title: 'Flugelhorn Notes: Fingering Chart, B♭ Transposition',
  description: 'B♭ flugelhorn notes: same three-valve fingerings as the trumpet, why it sounds a whole step lower, its mellow tone, F♯3–C6 range and a full chart.',
  h1: 'Flugelhorn Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: [],
  body: `
<p>The <strong>flugelhorn</strong> is the mellow cousin of the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a>. You play it <strong>exactly the same way</strong>: the same three valves, the same B♭ pitch, the same transposition. But it sounds much <strong>rounder, darker and more velvety</strong>. It is a beloved voice in the <strong>band</strong> and a favorite of <strong>jazz</strong> soloists. Below you will find its notes, written and sounding, and a complete fingering chart.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/fliscorno/instrumento.webp"><img src="/assets/img/fliscorno/instrumento.jpg" width="560" height="274" loading="lazy" alt="A brass flugelhorn, more compact than a trumpet and with a wider bell" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A flugelhorn: three valves like the trumpet, but with a more conical tube and a wider bell. Photo by <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Flugelhorn_YFH-8310Z.jpg" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The flugelhorn at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Brass (conical bore)</td></tr>
<tr><th scope="row">Pitch</th><td>B♭</td></tr>
<tr><th scope="row">Transposition</th><td>Yes: sounds a whole step below the written note</td></tr>
<tr><th scope="row">Range</th><td>F♯3–C6 written (sounds E3–B♭5), like the trumpet</td></tr>
<tr><th scope="row">Valves</th><td>3 piston valves (some models add a fourth)</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
<tr><th scope="row">Also called</th><td>Flugel, fliscorno (Spanish)</td></tr>
</tbody>
</table></div>

<h2>Trumpet and flugelhorn: same fingers, different tone</h2>

<p>If you can play the trumpet, you can play the flugelhorn: the <strong>fingerings are identical</strong>. What changes is the shape of the tube. The trumpet is mostly <strong>cylindrical</strong> (it keeps almost the same width up to the bell), which gives a bright, piercing sound. The flugelhorn is <strong>conical</strong> (it widens gradually from the mouthpiece) and has a wider bell, which gives a <strong>warm, dark, enveloping</strong> tone that many describe as closer to the human voice. The gradual widening changes the balance of the <a href="/diccionario-musical/serie-armonica/">harmonics</a>: the low and middle partials are stronger and the high ones weaker, so the flugelhorn has less brilliance and more roundness than the trumpet.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th></th><th>Trumpet</th><th>Flugelhorn</th></tr></thead>
<tbody>
<tr><td>Tube</td><td>Mostly cylindrical</td><td>Conical (widening)</td></tr>
<tr><td>Tone</td><td>Bright, piercing</td><td>Round, dark, sweet</td></tr>
<tr><td>Fingering</td><td colspan="2" style="text-align:center">The same (3 valves, in B♭)</td></tr>
<tr><td>Transposition</td><td colspan="2" style="text-align:center">Sounds a major 2nd below the written note</td></tr>
</tbody>
</table></div>

<h2>The flugelhorn mouthpiece</h2>

<p>A good part of that warm color comes from the <strong>mouthpiece</strong>. The flugelhorn's has a <strong>deeper, funnel-shaped cup</strong> than the trumpet's, which reinforces the dark, velvety sound. Even if a trumpet mouthpiece fits, it is <strong>better not to swap them</strong>: using a trumpet mouthpiece takes away the flugelhorn's character (and often hurts the intonation), unless you want a brighter sound on purpose.</p>

<h2>How are the notes produced?</h2>

<p>Exactly as on the trumpet: the vibration of the <strong>lips</strong> picks a harmonic and the <strong>three valves</strong> lengthen the tube to fill the gaps. With only <strong>seven combinations</strong> (including open) and the play of the lips, the whole range is covered, so one fingering serves for several notes. In practice there are also <strong>alternate</strong> fingerings to improve the tuning or ease some passages. To understand why in depth, read about the <a href="/diccionario-musical/serie-armonica/">harmonic series</a> and review the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet notes</a>.</p>

<h2>Is the flugelhorn a transposing instrument? The B♭</h2>

<p>Yes, like the trumpet and the clarinet: it is <strong>in B♭</strong> and sounds a <strong>major 2nd below</strong> the written note. A written <strong>C4</strong> sounds <strong>B♭3</strong>. It is written in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>. Every note name on this page is the <strong>written</strong> note unless it says "sounds".</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Written note</th><th>Sounding pitch</th></tr></thead>
<tbody>
<tr><td>C4</td><td>B♭3 (a major 2nd lower)</td></tr>
<tr><td>G4</td><td>F4</td></tr>
<tr><td>C5</td><td>B♭4</td></tr>
</tbody>
</table></div>

<h2>Range and registers</h2>

<p>The usual written range runs from <strong>F♯3</strong> to <strong>C6</strong>, which at sounding pitch is <strong>E3</strong> to <strong>B♭5</strong>, the same as the trumpet. The flugelhorn is most at home in the <strong>middle and low</strong> registers, where its warm tone shines; the extreme high register is harder and less common than on the trumpet.</p>

<div class="tm-tesitura-row" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:18px 0;">
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/fliscorno-tesitura-grave.svg" width="193" height="173" alt="Low register of the flugelhorn: written F sharp 3 to B3" loading="lazy" decoding="async"><figcaption>Low (F♯3–B3)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/fliscorno-tesitura-medio.svg" width="176" height="173" alt="Middle register of the flugelhorn: written C4 to B4" loading="lazy" decoding="async"><figcaption>Middle (C4–B4)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/fliscorno-tesitura-agudo.svg" width="176" height="173" alt="High register of the flugelhorn: written C5 to C6" loading="lazy" decoding="async"><figcaption>High (C5–C6)</figcaption></figure>
</div>

<p>Octaves are in <a href="/diccionario-musical/indice-acustico/">scientific pitch notation</a> (C4 is middle C). Counting accidentals, the chart covers <strong>31 written notes</strong>.</p>

<h2>The flugelhorn in the band and in jazz</h2>

<p>The flugelhorn developed in the <strong>19th century</strong> from signal horns and bugles and became popular in central European <strong>military bands</strong>; from there it passed to civilian bands and, in the 20th century, to jazz.</p>

<p>In Spanish bands, and especially in the <strong>Valencian tradition</strong>, flugelhorns have <strong>their own section</strong>: they carry many of the <strong>cantabile melodies</strong>, with a sweet sound that rounds off the brass and bridges to the woodwinds. In British-style brass bands it is also a regular member; in a typical American concert band it appears only when a part calls for it. In <strong>jazz</strong> it is a cult solo instrument for its lyricism, made famous by <strong>Chuck Mangione</strong>, <strong>Art Farmer</strong>, <strong>Clark Terry</strong> and <strong>Miles Davis</strong>, who alternated it with the trumpet for the most intimate passages. In the symphony orchestra it rarely appears.</p>

<div class="tm-table-wrap">
<table class="tm-table tm-digitaciones">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">All fingerings of the B♭ flugelhorn: 31 notes</caption>
<thead><tr><th scope="col">Written note</th><th scope="col">On the staff<small>treble clef</small></th><th scope="col">Valves<small><abbr title="1st valve">1</abbr> <abbr title="2nd valve">2</abbr> <abbr title="3rd valve">3</abbr></small></th><th scope="col">Sounds</th></tr></thead>
<tbody>
${rows}
</tbody></table></div>
<p class="tm-nota-tabla"><strong>●</strong> means the valve is pressed and <strong>○</strong> means it is up, in the order they are under your fingers (1st, 2nd and 3rd). "Open" means no valves: only the lips. Notes with accidentals show their enharmonic name underneath, because <strong>F♯ and G♭ are the same note</strong> and you will see one or the other depending on the key.</p>
<p class="tm-nota-tabla">This is a <strong>transposing</strong> instrument: what you read and what sounds are not the same note. If you play a <strong>written C4</strong>, a <strong>B♭3</strong> sounds, a whole step lower. That is the last column. In a band this matters: your C is not the alto saxophone's C or the euphonium's bass-clef C, which sounds as written.</p>

<h2>Flugelhorn fingerings</h2>

<p>The Spanish page has an interactive diagram that lights up the valves for each note, shows the note on the staff and plays a flugelhorn sound; it is not available in English yet. As on the trumpet, one valve combination serves for several notes: the lips adjust the harmonic. If you want to tune up, use the <a href="/herramientas/afinador/fliscorno/">flugelhorn tuner</a>.</p>

<h2>Common mistakes when learning flugelhorn notes</h2>

<ul>
  <li><strong>Treating it like a trumpet.</strong> The fingers are the same, but it asks for more air and a slightly more relaxed embouchure; forcing it like a trumpet takes away exactly what makes it special, its sweetness.</li>
  <li><strong>Believing every note has its own fingering.</strong> As on the trumpet, there are only seven combinations: the same one serves for several notes depending on the harmonic.</li>
  <li><strong>Mixing up written and sounding notes.</strong> It sounds a whole step lower; to sound in unison with a piano you must read a whole step higher.</li>
  <li><strong>Insisting on the high register.</strong> The flugelhorn shines in the middle and low registers; the very high register is awkward and spoils its tone.</li>
</ul>

<h2>In short</h2>

<ul>
  <li>The flugelhorn is a <strong>brass</strong> instrument in <strong>B♭</strong>: the same <strong>three valves</strong>, fingerings and transposition as the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a> (it sounds a major 2nd below the written note).</li>
  <li>Its trademark is its <strong>tone</strong>: conical tube and wide bell give a round, dark, sweet sound.</li>
  <li>Written range <strong>F♯3–C6</strong> (sounds E3–B♭5); it shines in the <strong>middle and low</strong> registers.</li>
  <li>A lyrical voice of the <strong>band</strong> and a cult <strong>jazz</strong> soloist; it reads in <strong>treble clef</strong>.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>flicorno (soprano)</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>flugelhorn</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Flügelhorn</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>bugle</dd></div>
  </dl>
  <p class="tm-nombres-pie">In French it is plain <em>bugle</em>; the English "bugle" (as in a bugle call) is something else: the military horn without valves.</p>
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
      <div class="tm-faq-q">Is the flugelhorn played like the trumpet?</div>
      <div class="tm-faq-a">Yes: the same three valves, the same B♭ pitch and the same fingerings. A trumpeter can pick up a flugelhorn and play. What changes is the tone: the conical tube and wide bell give a rounder, darker, sweeter sound than the trumpet's bright one.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the flugelhorn a transposing instrument?</div>
      <div class="tm-faq-a">Yes. It is in B♭ and sounds a major 2nd below the written note, like the trumpet and the clarinet. A written C sounds B♭. It is written in treble clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the flugelhorn and the trumpet?</div>
      <div class="tm-faq-a">The fingering and pitch are identical; the difference is the shape of the tube. The trumpet is mainly cylindrical (bright, piercing sound) and the flugelhorn is conical with a wider bell (warm, dark, velvety sound). The flugelhorn shines in the middle and low registers and is widely used in bands and jazz.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the range of the flugelhorn?</div>
      <div class="tm-faq-a">The usual written range runs from F♯3 to C6 (sounding E3 to B♭5), the same as the trumpet. Its natural territory is the middle and low register, where its tone shines; the extreme high register is less common than on the trumpet.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
