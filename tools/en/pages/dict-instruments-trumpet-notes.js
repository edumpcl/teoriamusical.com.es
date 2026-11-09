const dictionaryPage = require('../dictionary-page');

// [written note, file, width, enharmonic, valves 1-2-3 as "100", sounding note, sounding enharmonic]
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
  path: '/en/music-dictionary/instruments/trumpet-notes/',
  esPath: '/diccionario-musical/notas-de-la-trompeta/',
  title: 'Trumpet Notes: Fingering Chart, B♭ Transposition, Range',
  description: 'B♭ trumpet notes: how the three valves and harmonics work, why it sounds a whole step lower than written, the F♯3–C6 range and a full fingering chart.',
  h1: 'Trumpet Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: [],
  body: `
<p>The <strong>trumpet</strong> is the bright, high voice of the <strong><a href="/diccionario-musical/instrumentos-de-viento-metal/">brass family</a></strong>, a leading instrument in the band, the orchestra and jazz alike. Unlike the woodwinds it has no holes: each note is chosen by combining <strong>three valves</strong> with the harmonic the player sets with the lips. The most common trumpet is the <strong>B♭ trumpet</strong>, a transposing instrument that sounds a <strong>whole step (UK: tone) lower</strong> than written. Below you will find its notes, written and sounding, and a complete fingering chart.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/trompeta/pistones.webp"><img src="/assets/img/trompeta/pistones.jpg" width="1200" height="655" loading="lazy" alt="A B-flat trumpet, with the mouthpiece on the left, the three valves in the center and the bell on the right" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A B♭ trumpet: mouthpiece, three valves and bell. Photo by <a href="https://commons.wikimedia.org/wiki/File:Trompette_-_corps.JPG" rel="nofollow">Eusebius</a>, <a href="https://creativecommons.org/licenses/by/3.0/" rel="nofollow">CC BY 3.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The trumpet at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Brass</td></tr>
<tr><th scope="row">Pitch</th><td>B♭ (the most common)</td></tr>
<tr><th scope="row">Transposition</th><td>Yes: sounds a whole step below the written note</td></tr>
<tr><th scope="row">Range</th><td>F♯3–C6 written (sounds E3–B♭5)</td></tr>
<tr><th scope="row">Valves</th><td>3 piston valves</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
</tbody>
</table></div>

<h2>How are the notes produced? Valves and harmonics</h2>

<p>On a brass instrument the sound starts at the <strong>lips</strong>, which buzz against the mouthpiece. With one fixed length of tubing, changing the tension of the lips gives a <strong><a href="/diccionario-musical/serie-armonica/">series of harmonics</a></strong>. The <strong>three valves</strong> fill the gaps between those harmonics: each one <strong>adds tubing</strong> and so <strong>lowers the pitch</strong>.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Valve</th><th>Lowers the note by</th></tr></thead>
<tbody>
<tr><td>2nd</td><td>a half step (UK: semitone), 1 half step</td></tr>
<tr><td>1st</td><td>a whole step, 2 half steps</td></tr>
<tr><td>1st + 2nd (or 3rd alone)</td><td>a whole step and a half, 3 half steps</td></tr>
<tr><td>2nd + 3rd</td><td>two whole steps, 4 half steps</td></tr>
<tr><td>1st + 3rd</td><td>two and a half whole steps, 5 half steps</td></tr>
<tr><td>1st + 2nd + 3rd</td><td>three whole steps, 6 half steps</td></tr>
</tbody>
</table></div>

<p>Only <strong>seven combinations</strong> (including open, with no valves) and the play of the lips cover the whole range. That is why one fingering serves for several notes: the harmonic makes the difference.</p>

<p>With <strong>no valves pressed</strong>, and only the lips changing, the written notes from low to high are <strong>C, G, C, E, G, (B♭) and C</strong>: the harmonics of the tube. For centuries trumpets were <strong>natural trumpets</strong> (no valves) and could only play those notes. <strong>Piston valves</strong> were invented in the <strong>19th century</strong>; by adding tubing they give several harmonic series and make the full chromatic scale possible.</p>

<p>One detail that matters a lot is the <strong>mouthpiece</strong>. Its size and depth affect how easy the high register is and the color of the tone; most trumpeters have a favorite.</p>

<h2>Is the trumpet a transposing instrument? The B♭</h2>

<p>The usual trumpet is <strong>in B♭</strong> and transposes like the clarinet: it sounds a <strong>major 2nd below</strong> the written note. A written <strong>C4</strong> sounds <strong>B♭3</strong>. It is written in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>. Every note name on this page is the <strong>written</strong> note unless it says "sounds".</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Written note</th><th>Sounding pitch</th></tr></thead>
<tbody>
<tr><td>C4</td><td>B♭3 (a major 2nd lower)</td></tr>
<tr><td>G4</td><td>F4</td></tr>
<tr><td>C5</td><td>B♭4</td></tr>
</tbody>
</table></div>

<p>There is also the <strong>C trumpet</strong>, very common in the orchestra, which does not transpose, and higher ones (in D, E♭, and the piccolo trumpet). They all share the same three-valve system: the pitch changes, not the fingering.</p>

<h2>Range and registers</h2>

<p>The standard written range runs from <strong>F♯3</strong> to <strong>C6</strong> (sounding <strong>E3</strong> to <strong>B♭5</strong>), about two and a half octaves, which professionals extend well above (the high register is the specialty of many trumpeters). It is usually divided like this:</p>

<div class="tm-tesitura-row" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:18px 0;">
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/trompeta-tesitura-grave.svg" width="193" height="173" alt="Low register of the trumpet: written F sharp 3 to B3" loading="lazy" decoding="async"><figcaption>Low (F♯3–B3)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/trompeta-tesitura-medio.svg" width="176" height="173" alt="Middle register of the trumpet: written C4 to B4" loading="lazy" decoding="async"><figcaption>Middle (C4–B4)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/trompeta-tesitura-agudo.svg" width="176" height="173" alt="High register of the trumpet: written C5 to C6" loading="lazy" decoding="async"><figcaption>High (C5–C6)</figcaption></figure>
</div>

<p>Octaves are in <a href="/diccionario-musical/indice-acustico/">scientific pitch notation</a> (C4 is middle C). Counting accidentals, the chart covers <strong>31 written notes</strong>.</p>

<h2>The trumpet in the band, the orchestra and jazz</h2>

<p>The trumpet is one of the few instruments that is a leading voice in all three worlds. In the <strong>concert band</strong> (and especially in the Valencian band tradition) it carries the high voice of the brass and shines in the <em>pasodoble</em> and the march. In the <strong>orchestra</strong> it brings brilliance and fanfare (there the C trumpet is very common). In <strong>jazz</strong> it is a major solo instrument, from Louis Armstrong to Miles Davis. Its close relative the <a href="/diccionario-musical/notas-del-fliscorno/"><strong>flugelhorn</strong></a> has the same fingering but a rounder, sweeter tone. And it should not be confused with the <a href="/diccionario-musical/notas-del-trombon/"><strong>trombone</strong></a>, which is lower, changes notes with a sliding <strong>slide</strong> instead of valves and, unlike the trumpet, does not transpose.</p>

<div class="tm-table-wrap">
<table class="tm-table tm-digitaciones">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">All fingerings of the B♭ trumpet: 31 notes</caption>
<thead><tr><th scope="col">Written note</th><th scope="col">On the staff<small>treble clef</small></th><th scope="col">Valves<small><abbr title="1st valve">1</abbr> <abbr title="2nd valve">2</abbr> <abbr title="3rd valve">3</abbr></small></th><th scope="col">Sounds</th></tr></thead>
<tbody>
${rows}
</tbody></table></div>
<p class="tm-nota-tabla"><strong>●</strong> means the valve is pressed and <strong>○</strong> means it is up, in the order they are under your fingers (1st, 2nd and 3rd). "Open" means no valves: only the lips. Notes with accidentals show their enharmonic name underneath, because <strong>F♯ and G♭ are the same note</strong> and you will see one or the other depending on the key.</p>
<p class="tm-nota-tabla">This is a <strong>transposing</strong> instrument: what you read and what sounds are not the same note. If you play a <strong>written C4</strong>, a <strong>B♭3</strong> sounds, a whole step lower. That is the last column. In a band this matters: your C is not the alto saxophone's C or the euphonium's bass-clef C, which sounds as written.</p>

<h2>Trumpet fingerings</h2>

<p>The Spanish page has an interactive diagram that lights up the valves for each note, shows the note on the staff and plays it (it is not available in English yet). Remember that one valve combination serves for several notes: the lips adjust the harmonic for the rest. If you want to tune up, use the <a href="/herramientas/afinador/trompeta/">trumpet tuner</a>.</p>

<h2>Common mistakes when learning trumpet notes</h2>

<ul>
  <li><strong>Thinking every note has its own fingering.</strong> There are only seven valve combinations. The same fingering gives several notes depending on the harmonic, so you have to train your ear and lips instead of memorizing 31 different positions.</li>
  <li><strong>Mixing up written and sounding notes.</strong> The B♭ trumpet sounds a whole step lower; to sound in unison with a piano you must read a whole step higher.</li>
  <li><strong>Forcing the high notes with the throat.</strong> The high register is built with the air column and the embouchure, not by squeezing the throat; forcing tires you out and goes out of tune.</li>
  <li><strong>Ignoring the tuning slides of the 3rd (and 1st) valve.</strong> Some notes (D4, C♯4, D♯4 and others that use the 1st and 3rd valves together, or all three) tend to be sharp; that is why trumpets have a trigger or ring to lengthen those slides on the fly.</li>
</ul>

<h2>In short</h2>

<ul>
  <li>The trumpet is a <strong>brass</strong> instrument: the sound comes from vibrating lips, and the <strong>three valves</strong> add tubing and, with the harmonics, give every note (only 7 combinations).</li>
  <li>The most common one is <strong>in B♭</strong> and sounds a <strong>major 2nd below</strong> the written note (written C4 sounds B♭3); it reads in <strong>treble clef</strong>.</li>
  <li>Written range <strong>F♯3–C6</strong> (sounds E3–B♭5), about <strong>31 notes</strong>, extendable upward.</li>
  <li>A leading voice in <strong>band, orchestra and jazz</strong>; it shares its fingering with the flugelhorn.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>tromba</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>trumpet</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Trompete</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>trompette</dd></div>
    <div class="tm-nombres-par"><dt>Score abbreviation</dt><dd>Tpt. (Tr. in Italian and Spanish scores)</dd></div>
  </dl>
  <p class="tm-nombres-pie">Italian <em>tromba</em> is the trumpet; <em>trombone</em> is the trombone. They look alike and are not the same.</p>
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
      <div class="tm-faq-q">How do you get all the notes with only three valves?</div>
      <div class="tm-faq-a">By combining the valves (there are seven combinations, including open) with the harmonics you get by changing the tension of the lips. The valves add tubing to lower the pitch: the 2nd lowers it a half step, the 1st a whole step, and the combinations up to three whole steps. That is why one fingering serves for several notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the trumpet a transposing instrument?</div>
      <div class="tm-faq-a">The most common one, the B♭ trumpet, is: it sounds a major 2nd below the written note (a written C sounds B♭). The C trumpet, widely used in the orchestra, does not transpose. All trumpets are written in treble clef and share the same three-valve system.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the range of the trumpet?</div>
      <div class="tm-faq-a">The standard written range runs from F♯3 to C6 (sounding E3 to B♭5 on a B♭ trumpet). That is about two and a half octaves, which many trumpeters extend well higher in the upper register.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the trumpet and the flugelhorn?</div>
      <div class="tm-faq-a">They have the same three-valve fingering and the same B♭ pitch, but the flugelhorn has a more conical, wider tube, which gives a rounder, sweeter, darker tone. The trumpet is brighter and more piercing.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
