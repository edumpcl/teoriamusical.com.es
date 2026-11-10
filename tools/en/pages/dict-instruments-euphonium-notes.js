const dictionaryPage = require('../dictionary-page');

// [name, enharmonic, svg, width, valves 1-2-3-4] -- fingerings of the 4-valve B♭ euphonium (concert pitch, bass clef)
const NOTES = [
  ['A♯1', 'B♭1', 'fa-as1', 97, '0000'], ['B1', '', 'fa-b1', 88, '1111'], ['C2', '', 'fa-c2', 88, '1011'],
  ['C♯2', 'D♭2', 'fa-cs2', 97, '0111'], ['D2', '', 'fa-d2', 88, '1101'], ['D♯2', 'E♭2', 'fa-ds2', 97, '1001'],
  ['E2', '', 'fa-e2', 88, '0101'], ['F2', '', 'fa-f2', 88, '0001'], ['F♯2', 'G♭2', 'fa-fs2', 96, '0110'],
  ['G2', '', 'fa-g2', 88, '1100'], ['G♯2', 'A♭2', 'fa-gs2', 96, '1000'], ['A2', '', 'fa-a2', 88, '0100'],
  ['A♯2', 'B♭2', 'fa-as2', 96, '0000'], ['B2', '', 'fa-b2', 88, '0101'], ['C3', '', 'fa-c3', 88, '0001'],
  ['C♯3', 'D♭3', 'fa-cs3', 96, '0110'], ['D3', '', 'fa-d3', 88, '1100'], ['D♯3', 'E♭3', 'fa-ds3', 96, '1000'],
  ['E3', '', 'fa-e3', 88, '0100'], ['F3', '', 'fa-f3', 88, '0000'], ['F♯3', 'G♭3', 'fa-fs3', 96, '0110'],
  ['G3', '', 'fa-g3', 88, '1100'], ['G♯3', 'A♭3', 'fa-gs3', 96, '1000'], ['A3', '', 'fa-a3', 88, '0100'],
  ['A♯3', 'B♭3', 'fa-as3', 96, '0000'], ['B3', '', 'fa-b3', 88, '1100'], ['C4', '', 'fa-c4', 88, '1000'],
  ['C♯4', 'D♭4', 'fa-cs4', 97, '0100'], ['D4', '', 'fa-d4', 88, '0000'], ['D♯4', 'E♭4', 'fa-ds4', 97, '1000'],
  ['E4', '', 'fa-e4', 88, '0100'], ['F4', '', 'fa-f4', 88, '0000'], ['F♯4', 'G♭4', 'fa-fs4', 97, '1000'],
  ['G4', '', 'fa-g4', 88, '0100'], ['G♯4', 'A♭4', 'fa-gs4', 97, '0000'], ['A4', '', 'fa-a4', 88, '0100'],
  ['A♯4', 'B♭4', 'fa-as4', 97, '0000'],
];
const ORD = ['1st', '2nd', '3rd', '4th'];
const HIDE = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
const ROWS = NOTES.map(([n, alt, svg, w, v]) => {
  const dots = [...v].map(c => (c === '1' ? '<b class="tm-dg-on">●</b>' : '<span class="tm-dg-off">○</span>')).join('');
  const pressed = [...v].map((c, i) => (c === '1' ? ORD[i] : null)).filter(Boolean);
  const label = pressed.length === 0 ? 'open (no valves)' : 'valve' + (pressed.length > 1 ? 's' : '') + ' ' + pressed.map(s => s.replace(/st|nd|rd|th/, '')).join(pressed.length > 2 ? ', ' : ' and ');
  return `<tr><th scope="row">${n}${alt ? `<small>${alt}</small>` : ''}</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/${svg}.svg" width="${w}" height="92" alt="${n} in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib">${dots}<span style="${HIDE}">${label}</span></td></tr>`;
}).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/euphonium-notes/',
  esPath: '/diccionario-musical/notas-del-bombardino/',
  title: 'Euphonium Notes: Fingering Chart (4 Valves), Range, Clef',
  description: 'Euphonium notes and fingerings for the 4-valve B♭ euphonium: valves and harmonics, the 4th valve, bass clef vs treble clef, range and the baritone horn.',
  h1: 'Euphonium Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Instruments', '/diccionario-musical/familias-de-instrumentos/'], ['Brass Instruments', '/diccionario-musical/instrumentos-de-viento-metal/']],
  scripts: ['tm-pent-nota', 'digitaciones-bombardino-engine'],
  body: `
<p>The <strong>euphonium</strong> (in Spanish, <em>bombardino</em>) is the <strong>warm baritone of the brass family</strong>: a conical-bore instrument in <strong>B♭</strong>, related to the <a href="/diccionario-musical/notas-de-la-tuba/">tuba</a> but higher, with a round, singing sound. It is one of the leading voices of the <strong>concert band</strong>, especially in the Valencian tradition. Like the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a>, it picks a note by combining <strong>valves</strong> with the harmonics, but it sounds much lower and usually has <strong>four valves</strong>. In Spanish bands, and in many US bands, it is read at <strong>concert pitch in <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a></strong> (it does not transpose). This page gives its notes and fingerings.</p>

<figure style="margin:18px auto;max-width:300px;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/bombardino/instrumento.webp"><img src="/assets/img/bombardino/instrumento.jpg" width="680" height="1089" loading="lazy" alt="A B♭ euphonium with the large bell at the top, three valves in the center and a fourth valve at the side" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A four-valve euphonium (three on top and one at the side). Photo by <a href="https://commons.wikimedia.org/wiki/File:BC_Euphonium_ed1.jpg" rel="nofollow">Buffet Crampon / Besson</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The euphonium at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Brass (conical tube)</td></tr>
<tr><th scope="row">Pitch</th><td>B♭</td></tr>
<tr><th scope="row">Transposition</th><td>None in bass clef (concert pitch: Spanish and most US bands); in treble clef (British brass band, and many US parts) it sounds a major 9th lower than written</td></tr>
<tr><th scope="row">Range in the table below</th><td>B♭1 (pedal tone) to B♭4, sounding; advanced players go higher</td></tr>
<tr><th scope="row">Valves</th><td>3 or 4 (the 4th opens the low register)</td></tr>
<tr><th scope="row">Clef</th><td>Bass (treble in the British brass band tradition)</td></tr>
<tr><th scope="row">Also called</th><td><em>Bombardino</em> (Spanish) · euphonium</td></tr>
</tbody>
</table></div>

<div class="tm-callout">
<p><strong>Euphonium or baritone horn?</strong> The Spanish <em>bombardino</em> is the <strong>euphonium</strong>. In the US, the <em>baritone horn</em> (often just "baritone") is a different, smaller instrument: also in B♭ and fingered the same way, but with a narrower bore, usually three valves and a lighter sound. The German <em>Baritonhorn</em> is another narrow-bore instrument. Do not confuse <em>bombardon</em> either: in French and German it means a tuba, not a euphonium.</p>
</div>

<h2>How are the notes produced? Valves and harmonics</h2>

<p>The sound starts at the <strong>lips</strong>, which vibrate against the mouthpiece and produce a <a href="/diccionario-musical/serie-armonica/">series of harmonics</a>. The <strong>valves</strong> fill the gaps between those harmonics: each one <strong>adds tubing</strong> and lowers the pitch, as on the trumpet, but starting from B♭.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Valve</th><th>Lowers the note by</th></tr></thead>
<tbody>
<tr><td>open (none)</td><td>0 (the harmonic itself sounds)</td></tr>
<tr><td>2nd</td><td>1 half step (UK: semitone)</td></tr>
<tr><td>1st</td><td>2 half steps (a whole step; UK: tone)</td></tr>
<tr><td>3rd (or 1st + 2nd)</td><td>3 half steps</td></tr>
<tr><td>2nd + 3rd</td><td>4 half steps</td></tr>
<tr><td>4th (or 1st + 3rd)</td><td>5 half steps (a perfect 4th)</td></tr>
<tr><td>2nd + 4th</td><td>6 half steps</td></tr>
<tr><td>1st + 4th</td><td>7 half steps</td></tr>
<tr><td>1st + 2nd + 4th</td><td>8 half steps</td></tr>
</tbody>
</table></div>

<p>For example, the open harmonics of the B♭ euphonium include B♭2, F3, B♭3, D4, F4 and B♭4. Press the 4th valve on F3 and you get C3, a perfect 4th lower.</p>

<h2>The fourth valve: the low register</h2>

<p>The <strong>4th valve</strong> is usually placed at the <strong>side</strong> and pressed with the left hand on many models. It lowers the instrument by a <strong>perfect 4th</strong>. It does the same job as 1st + 3rd, but it is better in tune: the 1st + 3rd combination leaves the tubing slightly short, so the note tends to sound <em>sharp</em>. Many four-valve euphoniums are <strong>compensating</strong>: the extra tubing keeps the low valve combinations in tune. The 4th valve is the key to the low register: combined with the other three valves it reaches the notes below the low E (the table below goes down to B1, with the pedal tone B♭1 below that) and gives <strong>alternate fingerings</strong> that are better in tune. Three-valve euphoniums do not go as low.</p>

<h2>Euphonium, bombardino and the band</h2>

<p>In Spain the instrument is called <strong>bombardino</strong>; in English-speaking countries and most others, <strong>euphonium</strong>. It is the same instrument: a conical-bore brass in B♭ related to the tuba. It should not be confused with the <a href="/diccionario-musical/notas-del-trombon/">trombone</a> (cylindrical bore and brighter sound) or with the tuba (larger and lower). In the <strong>concert band</strong>, the backbone of the Valencian tradition, the euphonium shines in the <strong>lyrical melodies</strong> of the tenor-baritone register and reinforces the bass line with the tuba. In the British <strong>brass band</strong> it is also a leading solo voice.</p>

<h2>Is the euphonium a transposing instrument?</h2>

<p>It depends on the tradition, and this is the most common source of confusion:</p>

<ul>
  <li><strong>Bass clef, concert pitch.</strong> In Spanish bands, in orchestral parts and in many US concert-band parts, the euphonium is read in bass clef exactly as it sounds. It does not transpose. This page uses that notation.</li>
  <li><strong>Treble clef, in B♭.</strong> In the British brass band tradition (and in many US band parts, which often supply both versions) the euphonium is written in treble clef as a B♭ transposing instrument, <strong>a major 9th below the written note</strong> (an octave plus a whole step). A written C4 sounds B♭2.</li>
</ul>

<p>It is the same instrument and the same fingerings. A given fingering always gives the same sounding pitch; only the notation changes: the treble-clef player reads a note a major 9th higher on the page than the bass-clef player for the same sound.</p>

<div class="tm-table-wrap">
<table class="tm-table tm-digitaciones">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">All euphonium fingerings: 37 notes (4-valve B♭ euphonium, bass clef, concert pitch)</caption>
<thead><tr><th scope="col">Sounding note</th><th scope="col">On the staff<small>bass clef</small></th><th scope="col">Valves<small>1 2 3 4</small></th></tr></thead>
<tbody>
${ROWS}
</tbody></table></div>
<p class="tm-nota-tabla"><strong>●</strong> means the valve is pressed and <strong>○</strong> released, in the order they are under the fingers (1st to 4th). "Open" means no valves: only the lips. Altered notes show their equivalent name below, because <strong>F♯ and G♭ are the same note</strong> and, depending on the key, you will see one or the other. The notes are written at concert pitch: this is also what sounds. For the treble-clef version, add a major 9th to each note.</p>

<h2>Euphonium fingerings</h2>

<p>The diagram shows a euphonium with its <strong>four valves</strong> (three on top and the fourth at the side). When you pick a note, the ones you need to press light up (or none, if it is "open"). As on all brass instruments, one combination serves for several notes: the lips do the rest by adjusting the harmonic.</p>

<p>Pick a note to see its fingering and the note on the staff.</p>

<div id="tmbombardino"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmBombardinoEngine)tmBombardinoEngine("tmbombardino");});</script>

<p>To tune, use the <a href="/herramientas/afinador/bombardino/">euphonium tuner</a>.</p>

<!-- FICHA-DIGITACIONES:inicio -->
<h2>Printable worksheet (PDF)</h2>
<p>The same table on paper, on one side of A4 in two columns, for the music stand. And a <strong>second sheet to fill in</strong>: the 37 notes with the valves column left blank, so you can write the fingering yourself. The reference sheet works as the answer key.</p>
<figure class="tm-staff">
  <a href="/assets/img/digitaciones/fichas/ficha-digitaciones-bombardino.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/digitaciones/fichas/preview-ficha-digitaciones-bombardino.webp"><img src="/assets/img/digitaciones/fichas/preview-ficha-digitaciones-bombardino.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet with the euphonium fingerings"></picture></a>
  <figcaption>A4 sheet with the 37 notes and their fingering.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/digitaciones/fichas/ficha-digitaciones-bombardino.pdf" target="_blank" rel="noopener">Download the fingerings (PDF)</a>
<a class="tm-btn" href="/assets/img/digitaciones/fichas/ficha-digitaciones-bombardino-rellenar.pdf" target="_blank" rel="noopener">Download the fill-in sheet (PDF)</a></p>
<!-- FICHA-DIGITACIONES:fin -->

<h2>Common mistakes when learning euphonium notes</h2>

<ul>
  <li><strong>Thinking there is one fingering per note.</strong> As on the trumpet, there are few combinations: the same one serves several notes, depending on the harmonic.</li>
  <li><strong>Forgetting the 4th valve in the low register.</strong> The lowest notes need it (alone or combined); without it they do not sound or are out of tune.</li>
  <li><strong>Mixing up the clefs.</strong> In Spanish bands the part is in bass clef at concert pitch; in the British tradition it is in treble clef, transposed. They are different systems for the same instrument.</li>
  <li><strong>Neglecting the air.</strong> The euphonium needs a lot of airflow; its singing sound is sustained by the air column, not by forcing the lips.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The euphonium (<em>bombardino</em>) is the <strong>conical baritone of the brass</strong> in <strong>B♭</strong>: valves plus harmonics, like the trumpet but lower, and with <strong>4 valves</strong>.</li>
  <li>In Spanish bands and many US bands it is read at <strong>concert pitch in bass clef</strong> (no transposition); in the British tradition it is in treble clef, a major 9th lower than written.</li>
  <li>The <strong>4th valve</strong> (a perfect 4th lower, usually at the side) opens the low register.</li>
  <li>It is not the same as the US <strong>baritone horn</strong>, which is smaller and narrower.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>eufonio (flicorno basso)</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>euphonium</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Euphonium</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>euphonium (saxhorn basse)</dd></div>
  </dl>
  <p class="tm-nombres-pie">Watch out for "bombardon": in French and German it is not the euphonium but the tuba. And the German <em>Baritonhorn</em> is not exactly a euphonium either: it is narrower, with a less broad sound.</p>
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
      <div class="tm-faq-q">Are the bombardino and the euphonium the same instrument?</div>
      <div class="tm-faq-a">Yes, in practice: the Spanish bombardino is what other countries call the euphonium. It is a conical-bore brass instrument in B♭, in the tuba family but higher. It is not the same as the US baritone horn, which is a smaller, narrower-bore instrument usually with three valves.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the euphonium transpose?</div>
      <div class="tm-faq-a">It depends on the tradition. In Spanish bands, in orchestral parts and in many US band parts, the euphonium is read at concert pitch in bass clef: it does not transpose. In the British brass band tradition, it is written in treble clef as a B♭ transposing instrument and sounds a major 9th (an octave plus a whole step) lower than written. This page uses concert pitch in bass clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the fourth valve of the euphonium for?</div>
      <div class="tm-faq-a">The 4th valve lowers the sound by a perfect 4th (it equals 1st + 3rd but is better in tune). It lets you reach the low notes below the low E and gives more in-tune alternate fingerings. Three-valve euphoniums do not go as low.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many valves does the euphonium have?</div>
      <div class="tm-faq-a">There are three-valve and four-valve models. The four-valve one (often compensating, with the 4th valve at the side, pressed with the left hand) is the professional standard and the one that opens the whole low register. The fingering system is the same as the trumpet's, but in B♭ and with that fourth valve.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
