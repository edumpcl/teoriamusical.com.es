const dictionaryPage = require('../dictionary-page');

// Bass trombone in B♭ with two independent rotary valves, B♭/F/G♭/D (F valve; G♭ valve; both together = D).
// [name, enharmonic, svg, slide position, harmonic, valves ('' none, 'F', 'FG' both)]
// From E2 up the notes are the same as on the tenor (no valves). The low notes follow the valve-side series:
// F valve fundamentals F1 E1 E♭1..., both valves D1 C♯1 C1 B0 B♭0..., and harmonic 2 of those series sounds an octave higher.
const NOTES = [
  ['B♭1', '', 'fa-as1', 1, 1, ''], ['B1', '', 'fa-b1', 4, 2, 'FG'], ['C2', '', 'fa-c2', 3, 2, 'FG'],
  ['C♯2', 'D♭2', 'fa-cs2', 2, 2, 'FG'], ['D2', '', 'fa-d2', 1, 2, 'FG'], ['D♯2', 'E♭2', 'fa-ds2', 3, 2, 'F'],
  ['E2', '', 'fa-e2', 7, 2, ''], ['F2', '', 'fa-f2', 6, 2, ''], ['F♯2', 'G♭2', 'fa-fs2', 5, 2, ''], ['G2', '', 'fa-g2', 4, 2, ''],
  ['G♯2', 'A♭2', 'fa-gs2', 3, 2, ''], ['A2', '', 'fa-a2', 2, 2, ''], ['A♯2', 'B♭2', 'fa-as2', 1, 2, ''], ['B2', '', 'fa-b2', 7, 3, ''],
  ['C3', '', 'fa-c3', 6, 3, ''], ['C♯3', 'D♭3', 'fa-cs3', 5, 3, ''], ['D3', '', 'fa-d3', 4, 3, ''], ['D♯3', 'E♭3', 'fa-ds3', 3, 3, ''],
  ['E3', '', 'fa-e3', 2, 3, ''], ['F3', '', 'fa-f3', 1, 3, ''], ['F♯3', 'G♭3', 'fa-fs3', 5, 4, ''], ['G3', '', 'fa-g3', 4, 4, ''],
  ['G♯3', 'A♭3', 'fa-gs3', 3, 4, ''], ['A3', '', 'fa-a3', 2, 4, ''], ['A♯3', 'B♭3', 'fa-as3', 1, 4, ''], ['B3', '', 'fa-b3', 4, 5, ''],
  ['C4', '', 'fa-c4', 3, 5, ''], ['C♯4', 'D♭4', 'fa-cs4', 2, 5, ''], ['D4', '', 'fa-d4', 1, 5, ''], ['D♯4', 'E♭4', 'fa-ds4', 3, 6, ''],
  ['E4', '', 'fa-e4', 2, 6, ''], ['F4', '', 'fa-f4', 1, 6, ''], ['F♯4', 'G♭4', 'fa-fs4', 5, 8, ''], ['G4', '', 'fa-g4', 4, 8, ''],
  ['G♯4', 'A♭4', 'fa-gs4', 3, 8, ''], ['A4', '', 'fa-a4', 2, 8, ''], ['A♯4', 'B♭4', 'fa-as4', 1, 8, ''],
];
const ORD = n => ({ 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th', 7: '7th', 8: '8th' }[n]);
const FUND = { 1: 'B♭', 2: 'A', 3: 'A♭', 4: 'G', 5: 'F♯', 6: 'F', 7: 'E' };
const VALVE_TXT = { '': '—', F: 'F', FG: 'F + G♭' };
const HIDE = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
const ROWS = NOTES.map(([n, alt, svg, pos, harm, v]) => {
  const w = n.includes('♯') || alt ? (n === 'B♭1' || n === 'C♯2' || n === 'D♯2' || n.endsWith('4') ? 97 : 96) : 88;
  const dots = [1, 2, 3, 4, 5, 6, 7].map(p => (p === pos ? '<b class="tm-dg-on">●</b>' : '<span class="tm-dg-off">○</span>')).join('');
  const where = v === 'FG' ? 'with both valves (F and G♭, which together give D)' : v === 'F' ? 'with the F valve' : '';
  const harmTxt = harm === 1 ? 'pedal tone (1st harmonic), no valves' : `${ORD(harm)} harmonic${where ? '' : ' above ' + FUND[pos]}`;
  const label = `${ORD(pos)} position${where ? ', ' + where : ''}, ${harmTxt}`;
  return `<tr><th scope="row">${n}${alt ? `<small>${alt}</small>` : ''}</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/${svg}.svg" width="${w}" height="92" alt="${n} in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib">${dots}<span style="${HIDE}">${label}</span></td><td class="tm-dg-suena">${harm === 1 ? '1st (pedal)' : ORD(harm)}</td><td>${VALVE_TXT[v]}</td></tr>`;
}).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/bass-trombone-notes/',
  esPath: '/diccionario-musical/notas-del-trombon-bajo/',
  title: 'Bass Trombone Notes: Slide Positions, Valves and Range',
  description: 'Bass trombone notes: the 7 slide positions, the two thumb valves (F, G♭ and D together), how they fill the low gap, clef and a chart of 37 notes.',
  h1: 'Bass Trombone Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Instruments', '/diccionario-musical/familias-de-instrumentos/'], ['Brass Instruments', '/diccionario-musical/instrumentos-de-viento-metal/']],
  scripts: ['tm-pent-nota', 'digitaciones-trombon-bajo-engine'],
  body: `
<p>The <strong>bass trombone</strong> is the low sibling of the <a href="/diccionario-musical/notas-del-trombon/">tenor trombone</a>. It has the same <strong>slide</strong> and the same <strong>seven positions</strong>, but a wider tube, for a deeper and bigger sound, and it adds <strong>two thumb valves</strong> that open up the low register. It does not transpose: what is written is what sounds, in <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a>. This page gives its notes, with the slide position and the valves for each one.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/trombon-bajo/instrumento.webp"><img src="/assets/img/trombon-bajo/instrumento.jpg" width="1400" height="485" loading="lazy" alt="A bass trombone with a wide bell, the slide and, in the middle, the two rotary valves with their thumb levers" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A two-valve bass trombone: wide bell, slide and the two rotary valves (with their levers) in the middle. Photo by <a href="https://commons.wikimedia.org/wiki/File:WANZ_Instrument_2024-09_IMG_7780_Rath_R9D_bass_trombone_(crop).jpg" rel="nofollow">Debbie Rawson / Jonathanischoice</a>, <a href="https://creativecommons.org/licenses/by/4.0/" rel="nofollow">CC BY 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The bass trombone at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Brass (mostly cylindrical tube, wider bore than the tenor)</td></tr>
<tr><th scope="row">Pitch</th><td>B♭ (valves in F, G♭ and D)</td></tr>
<tr><th scope="row">Transposition</th><td>None (concert pitch)</td></tr>
<tr><th scope="row">Range in the chart below</th><td>B♭1 (pedal tone) to B♭4, sounding; pedal tones go lower and advanced players go higher</td></tr>
<tr><th scope="row">Mechanism</th><td>Slide (7 positions) + 2 rotary valves worked by the thumb</td></tr>
<tr><th scope="row">Clef</th><td>Bass</td></tr>
<tr><th scope="row">Also called</th><td><em>Trombón bajo</em> (Spanish) · <em>trombone basso</em> (Italian) · <em>Bassposaune</em> (German) · <em>trombone basse</em> (French)</td></tr>
</tbody>
</table></div>

<h2>Slide, harmonics... and two valves</h2>

<p>The basic mechanism is the one of the tenor. The sound starts at the <strong>lips</strong>, which produce a <a href="/diccionario-musical/serie-armonica/">series of harmonics</a>, and the <strong>slide</strong> lengthens the tube in <strong>seven positions</strong> (each a half step lower; UK: semitone) to fill the gaps. From <strong>E2 upward, the positions of the bass trombone are the same as those of the tenor</strong>.</p>

<p>What is special about the bass trombone is the <strong>two valves</strong> (rotary valves worked by the left thumb). In the setup used here, <strong>B♭/F/G♭/D</strong> with independent valves, they work like this:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Valve</th><th>Changes the instrument to...</th></tr></thead>
<tbody>
<tr><td>1st (F)</td><td>F (a perfect 4th lower)</td></tr>
<tr><td>2nd (G♭)</td><td>G♭ (a major 3rd lower)</td></tr>
<tr><td>Both together</td><td>D</td></tr>
</tbody>
</table></div>

<p>Other setups exist, such as <strong>dependent</strong> systems (where the second valve only works together with the first) and different tunings for the second valve, so a fingering chart must always say which setup it is for.</p>

<p>The valves add tubing. This lets the player <strong>reach low notes</strong> that the slide alone cannot give, and also offers <strong>alternate positions</strong> that are more comfortable in many passages. Each valve makes the tube longer, so the slide positions used with the valves are <strong>farther apart</strong> than the standard ones: the number of the position is a guide for the arm, not an absolute distance.</p>

<h2>The low register: filling the gap</h2>

<p>Without valves, the trombone goes down to <strong>E2</strong> (7th position) and below that only to the <strong>pedal tones</strong> (B♭1 and lower). In between there is a <strong>gap</strong>: B1, C2, C♯2, D2 and E♭2 cannot be played. The valves of the bass trombone fill exactly this gap:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Note</th><th>Position + valves</th></tr></thead>
<tbody>
<tr><td>E♭2 (D♯2)</td><td>3rd · F valve</td></tr>
<tr><td>D2</td><td>1st · both valves (D)</td></tr>
<tr><td>C♯2</td><td>2nd · both valves</td></tr>
<tr><td>C2</td><td>3rd · both valves</td></tr>
<tr><td>B1</td><td>4th · both valves</td></tr>
</tbody>
</table></div>

<p>These are the <strong>preferred</strong> fingerings. There are alternatives (for example, C2 can also be played in a very long 6th position with the F valve). In every case the note is the 2nd harmonic of the series of the valve: for example, with both valves the series starts on D1, and its 2nd harmonic is D2. In the chart below you will see each note with the slide and the valves.</p>

<p>The <strong>pedal B♭1</strong> is the lowest note of the chart. It does not need valves: it is the fundamental of the 1st position. With both valves it can also be played in a very long 5th position. Below B♭1 come more pedal tones (A1 in 2nd position, A♭1 in 3rd and so on), which are very low and used only occasionally.</p>

<h2>The bass trombone in the band and the orchestra</h2>

<p>The bass trombone is the <strong>low voice of the trombone section</strong>. In the <strong>orchestra</strong> it completes the trombone trio from below and joins the <strong>tuba</strong> in the foundation of the brass. In the <strong>concert band</strong>, which is very present in the Valencian tradition, it adds a low sound with body and definition that supports the whole harmony. Compared with the tenor, its wider tube and larger bell give a rounder and more powerful sound in the low register, and the valves allow it to sustain the lowest notes of the repertoire.</p>

<div class="tm-table-wrap">
<table class="tm-table tm-digitaciones">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">All the notes of the bass trombone (B♭/F/G♭/D): 37 notes</caption>
<thead><tr><th scope="col">Note<small>written = sounding</small></th><th scope="col">On the staff<small>bass clef</small></th><th scope="col">Slide position<small><abbr title="1st position: slide closed">1</abbr> 2 3 4 5 6 <abbr title="7th position: slide fully extended">7</abbr></small></th><th scope="col">Harmonic</th><th scope="col">Valves</th></tr></thead>
<tbody>
${ROWS}
</tbody></table></div>
<p class="tm-nota-tabla"><strong>●</strong> marks the slide position: <strong>1st</strong> is the slide closed and <strong>7th</strong> the slide fully extended. The <strong>Harmonic</strong> column says which harmonic of the series gives the note, adjusted with the lips. The notes of the low register (B1 to E♭2) are played with the valves (F, G♭ or both together, which give D), and for them the harmonic is counted on the series of the valve. <strong>—</strong>: no valve. The bass trombone <strong>does not transpose</strong>: what is written is what sounds.</p>

<h2>Bass trombone fingerings</h2>

<p>The diagram shows the <strong>fixed mouthpiece</strong> on the left, the <strong>slide</strong> reaching toward the <strong>bell</strong> on the right, and the <strong>two valves</strong> (F and G♭) above. When you pick a note, the <strong>slide position</strong> is marked (ruler from 1 to 7) and the <strong>valves</strong> you need to press light up (if any are needed). Remember that one position serves for several notes: the lips do the rest by adjusting the harmonic.</p>

<p>Pick a note to see its <strong>position and valves</strong>, the note on the staff and its <strong>real bass trombone sound</strong>.</p>

<div id="tmtrombonbajo"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmTrombonBajoEngine)tmTrombonBajoEngine("tmtrombonbajo");});</script>

<p>To tune, use the <a href="/herramientas/afinador/trombon/">trombone tuner</a>. Note that it cannot read notes below about 40 Hz, which includes the lowest pedal tones of a bass trombone.</p>

<!-- FICHA-DIGITACIONES:inicio -->
<h2>Printable worksheet (PDF)</h2>
<p>The same table on paper, on one side of A4 in two columns, for the music stand. And a <strong>second sheet to fill in</strong>: the 37 notes with the slide position, harmonic and valves columns left blank, so you can write them yourself. The reference sheet works as the answer key.</p>
<figure class="tm-staff">
  <a href="/assets/img/digitaciones/fichas/ficha-digitaciones-trombon-bajo.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/digitaciones/fichas/preview-ficha-digitaciones-trombon-bajo.webp"><img src="/assets/img/digitaciones/fichas/preview-ficha-digitaciones-trombon-bajo.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet with the slide positions of the bass trombone"></picture></a>
  <figcaption>A4 sheet with the 37 notes and their slide position.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/digitaciones/fichas/ficha-digitaciones-trombon-bajo.pdf" target="_blank" rel="noopener">Download the positions (PDF)</a>
<a class="tm-btn" href="/assets/img/digitaciones/fichas/ficha-digitaciones-trombon-bajo-rellenar.pdf" target="_blank" rel="noopener">Download the fill-in sheet (PDF)</a></p>
<!-- FICHA-DIGITACIONES:fin -->

<h2>Common mistakes when learning bass trombone notes</h2>

<ul>
  <li><strong>Thinking there is one position per note.</strong> As on the tenor, there are only 7 positions: the same position gives several notes depending on the harmonic. The valves add alternatives, not a new position for every note.</li>
  <li><strong>Forgetting the valves in the low register.</strong> The notes from B1 to E♭2 <em>need</em> a valve. It is impossible to get them with the slide alone.</li>
  <li><strong>Confusing the position with the real length.</strong> With the valves, the physical "4th position" is longer than without them. The position number is a reference for the arm, not an absolute measure.</li>
  <li><strong>Thinking the valves transpose.</strong> They do not change the written note: they only lengthen the tube to reach the low register.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The bass trombone shares the <strong>slide and the 7 positions</strong> with the tenor, but has a wider tube and <strong>two thumb valves</strong>.</li>
  <li>In the <strong>B♭/F/G♭/D</strong> setup: the 1st valve gives F, the 2nd gives G♭ and <strong>both together give D</strong>.</li>
  <li>The valves <strong>fill the low gap chromatically</strong> (B1, C2, C♯2, D2, E♭2) between the pedal B♭1 and the E2 of the slide alone.</li>
  <li>It <strong>does not transpose</strong> (bass clef). It is the low voice of the trombone section.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>trombone basso</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>bass trombone</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Bassposaune</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>trombone basse</dd></div>
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
      <div class="tm-faq-q">What is the difference between the bass trombone and the tenor trombone?</div>
      <div class="tm-faq-a">The bass trombone uses the same slide and the same seven positions as the tenor, but it has a wider tube (and a bigger bell) for a deeper and more powerful sound, and it usually adds two thumb valves. Those valves reach low notes that the tenor does not have and fill in the low register chromatically. Both are normally written in bass clef at concert pitch (with tenor clef in high passages) and neither transposes, except the tenor trombone of British brass bands, which is written in treble clef and transposed.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the two valves of the bass trombone for?</div>
      <div class="tm-faq-a">In the usual B♭/F/G♭/D setup, the first valve changes the instrument to F and the second to G♭, and both together give D. They are used to go down to the low register and, above all, to fill the chromatic gap between the pedal B♭ and the low E (the notes B1, C2, C♯2, D2 and E♭2), which are out of reach with the slide alone.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the bass trombone transpose?</div>
      <div class="tm-faq-a">No. The bass trombone sounds exactly what is written, and it is read in bass clef. The valves do not change the written note: they only change the length of the tube so that low notes can be reached.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How low can the bass trombone play?</div>
      <div class="tm-faq-a">With both valves it plays chromatically down to B1, and the pedal B♭1 is available in first position. Below that are pedal tones (A1, A♭1 and lower), which are very low and used only occasionally. This low register is what defines the bass trombone against the tenor.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
